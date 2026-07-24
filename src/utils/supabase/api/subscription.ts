import { SupabaseClient } from "@supabase/supabase-js";

export type SubscriptionPlan = "free" | "premium_monthly" | "premium_yearly";
export type SubscriptionStatus = "active" | "past_due" | "canceled" | "expired";
export type SubscriptionProvider = "stub" | "stripe" | "razorpay";

export type SubscriptionEventType =
  | "created"
  | "renewed"
  | "canceled"
  | "payment_failed"
  | "expired"
  | "reactivated";

export type SubscriptionEventInput = {
  userId: string;
  eventType: SubscriptionEventType;
  provider: SubscriptionProvider;
  plan?: SubscriptionPlan;
  currentPeriodEnd?: string | null;
  providerCustomerId?: string | null;
  providerSubscriptionId?: string | null;
  rawPayload?: Record<string, unknown>;
};

// ---- Reads ----

export async function getSubscription(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase.from("subscription").select("*").eq("user_id", userId).maybeSingle();
  return data;
}

// Prefer this over re-deriving "is this user premium" from raw
// plan/status/current_period_end in application code — it calls the same
// is_premium() SQL function RLS policies use, so there's one source of
// truth instead of two copies of the logic that can drift apart.
export async function checkIsPremium(supabase: SupabaseClient, userId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_premium", { check_user_id: userId });
  if (error) return false;
  return Boolean(data);
}

export async function getSubscriptionHistory(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from("subscription_event")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

// ---- Writes ----
// Every write path (stub checkout today, real provider webhooks later)
// should go through this single function rather than writing to
// `subscription` directly — that's what keeps the two integrations from
// duplicating "what does a 'renewed' event actually change" logic.
export async function handleSubscriptionEvent(supabase: SupabaseClient, input: SubscriptionEventInput) {
  const { userId, eventType, provider, plan, currentPeriodEnd, providerCustomerId, providerSubscriptionId, rawPayload } =
    input;

  const statusByEvent: Record<SubscriptionEventType, SubscriptionStatus> = {
    created: "active",
    renewed: "active",
    reactivated: "active",
    payment_failed: "past_due",
    canceled: "canceled",
    expired: "expired",
  };

  const updates: Record<string, unknown> = {
    user_id: userId,
    status: statusByEvent[eventType],
    provider,
    updated_at: new Date().toISOString(),
  };

  if (plan) updates.plan = plan;
  if (currentPeriodEnd !== undefined) updates.current_period_end = currentPeriodEnd;
  if (providerCustomerId !== undefined) updates.provider_customer_id = providerCustomerId;
  if (providerSubscriptionId !== undefined) updates.provider_subscription_id = providerSubscriptionId;

  // "canceled" via handleSubscriptionEvent means immediate cancellation.
  // Cancel-at-period-end is a separate, softer action — see
  // scheduleCancelAtPeriodEnd() below — that doesn't go through this event
  // log path since nothing has actually lapsed yet.
  if (eventType === "canceled") updates.cancel_at_period_end = false;

  const { error: upsertError } = await supabase.from("subscription").upsert(updates, { onConflict: "user_id" });
  if (upsertError) throw upsertError;

  const { error: eventError } = await supabase.from("subscription_event").insert({
    user_id: userId,
    event_type: eventType,
    provider,
    raw_payload: rawPayload ?? {},
  });
  if (eventError) throw eventError;
}

// The "cancel, but keep access until the period ends" path — distinct from
// handleSubscriptionEvent's immediate "canceled" status, since the user's
// premium access (via is_premium()) should continue until current_period_end.
export async function scheduleCancelAtPeriodEnd(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase
    .from("subscription")
    .update({ cancel_at_period_end: true, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  if (error) throw error;

  await supabase.from("subscription_event").insert({
    user_id: userId,
    event_type: "canceled",
    provider: "stub",
    raw_payload: { note: "cancel_at_period_end scheduled, access continues until current_period_end" },
  });
}

export async function undoCancelAtPeriodEnd(supabase: SupabaseClient, userId: string) {
  const { error } = await supabase
    .from("subscription")
    .update({ cancel_at_period_end: false, updated_at: new Date().toISOString() })
    .eq("user_id", userId);
  if (error) throw error;

  await supabase.from("subscription_event").insert({
    user_id: userId,
    event_type: "reactivated",
    provider: "stub",
    raw_payload: { note: "cancel_at_period_end undone" },
  });
}