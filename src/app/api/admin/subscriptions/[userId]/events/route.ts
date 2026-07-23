import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("subscription_event")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ events: data ?? [] }), { status: 200 });
}