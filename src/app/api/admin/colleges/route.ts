import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("college")
    .select("id, name, slug, avg_sat_score, is_published, updated_at")
    .order("name", { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ colleges: data }), { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { name, slug, avg_sat_score, sat_requirement_notes, meta_title, meta_description, is_published } =
    await req.json();

  if (!name || !slug) {
    return new Response(JSON.stringify({ error: "Name and slug are required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("college")
    .insert({
      name,
      slug,
      avg_sat_score: avg_sat_score || null,
      sat_requirement_notes: sat_requirement_notes || null,
      meta_title: meta_title || null,
      meta_description: meta_description || null,
      is_published: is_published ?? false,
    })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}