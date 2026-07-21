import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { title, slug, type, meta_title, meta_description, intro, body, data, is_published } = await req.json();

  if (!title?.trim() || !slug?.trim() || !type) {
    return new Response(JSON.stringify({ error: "Title, slug, and type are required" }), { status: 400 });
  }

  const { data: created, error } = await supabase
    .from("content_page")
    .insert({
      title,
      slug,
      type,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      intro: intro || null,
      body: body || null,
      data: data ?? {},
      is_published: is_published ?? true,
    })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: created.id }), { status: 201 });
}