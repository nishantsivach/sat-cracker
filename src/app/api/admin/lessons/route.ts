import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { module_id, title, content, free_preview, order } = await req.json();
  if (!module_id || !title) {
    return new Response(JSON.stringify({ error: "module_id and title are required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("lesson")
    .insert({
      module_id,
      title,
      content: content ?? null,
      free_preview: free_preview ?? false,
      order: order ?? 0,
    })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}