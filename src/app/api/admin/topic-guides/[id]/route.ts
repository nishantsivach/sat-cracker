import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { name, slug, section, summary, meta_title, meta_description, body, is_published } =
    await req.json();

  const { error } = await supabase
    .from("topic_guide")
    .update({
      name,
      slug,
      section,
      summary,
      meta_title,
      meta_description,
      body,
      is_published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { error } = await supabase.from("topic_guide").delete().eq("id", id);
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}