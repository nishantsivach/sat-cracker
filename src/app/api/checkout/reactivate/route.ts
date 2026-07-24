import { createClient } from "@/utils/supabase/server";
import { undoCancelAtPeriodEnd } from "@/utils/supabase/api/subscription";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return new Response(JSON.stringify({ error: "You must be signed in." }), { status: 401 });

  try {
    await undoCancelAtPeriodEnd(supabase, user.id);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Couldn't reactivate subscription";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}