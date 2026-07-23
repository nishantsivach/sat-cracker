import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { plan, status, current_period_end } = await req.json();

  const { error } = await supabase
    .from("subscription")
    .update({
      plan,
      status,
      current_period_end: current_period_end || null,
      cancel_at_period_end: false,
      provider: "stub",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Manual overrides don't come from a payment provider, so there's no
  // natural event_type for "admin changed this" — logging it as a
  // provider-agnostic note keeps the audit trail honest about who acted.
  await supabase.from("subscription_event").insert({
    user_id: userId,
    event_type: "created",
    provider: "stub",
    raw_payload: { manual_override: true, changed_by_admin: admin.id, plan, status },
  });

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}