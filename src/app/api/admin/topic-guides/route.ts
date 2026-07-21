import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("topic_guide")
    .select("id, name, slug, section, is_published, updated_at")
    .order("updated_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ guides: data }), { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { name, slug, section, summary, meta_title, meta_description, body, is_published } =
    await req.json();

  if (!name || !slug || !section || !body) {
    return new Response(
      JSON.stringify({ error: "Name, slug, section, and body are required" }),
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("topic_guide")
    .insert({
      name,
      slug,
      section,
      summary: summary ?? null,
      meta_title: meta_title ?? null,
      meta_description: meta_description ?? null,
      body,
      is_published: is_published ?? false,
    })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}