import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { handleSubscriptionEvent, scheduleCancelAtPeriodEnd } from "@/utils/supabase/api/subscription";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response(JSON.stringify({ error: "You must be signed in." }), { status: 401 });

  const { immediate } = await req.json().catch(() => ({ immediate: false }));

  try {
    if (immediate) {
      await handleSubscriptionEvent(supabase, {
        userId: user.id,
        eventType: "canceled",
        provider: "stub",
        rawPayload: { note: "Immediate cancellation requested by user" },
      });
    } else {

      await scheduleCancelAtPeriodEnd(supabase, user.id);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cancellation failed";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}