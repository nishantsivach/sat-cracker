import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getSubscription, handleSubscriptionEvent, SubscriptionPlan } from "@/utils/supabase/api/subscription";

const PLAN_DURATIONS: Record<Extract<SubscriptionPlan, "premium_monthly" | "premium_yearly">, number> = {
  premium_monthly: 30,
  premium_yearly: 365,
};


export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response(JSON.stringify({ error: "You must be signed in to subscribe." }), { status: 401 });

  const body = await req.json();

if (
  body.plan !== "premium_monthly" &&
  body.plan !== "premium_yearly"
) {
  return new Response(
    JSON.stringify({ error: "Invalid plan" }),
    { status: 400 }
  );
}

const plan: keyof typeof PLAN_DURATIONS = body.plan;

  const days = PLAN_DURATIONS[plan];
  const currentPeriodEnd = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

  const existing = await getSubscription(supabase, user.id);
  const eventType = existing && existing.plan !== "free" ? "renewed" : "created";

  try {
    await handleSubscriptionEvent(supabase, {
      userId: user.id,
      eventType,
      provider: "stub",
      plan,
      currentPeriodEnd,
      providerCustomerId: `stub_cust_${user.id}`,
      providerSubscriptionId: `stub_sub_${crypto.randomUUID()}`,
      rawPayload: { note: "Stub checkout — no real payment provider yet", plan },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true, plan, currentPeriodEnd }), { status: 200 });
}