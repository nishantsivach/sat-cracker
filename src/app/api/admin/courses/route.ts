import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("course")
    .select("id, title, slug, description, is_published, created_at")
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ courses: data }), { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { title, slug, description, is_published } = await req.json();
  if (!title || !slug) {
    return new Response(JSON.stringify({ error: "Title and slug are required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("course")
    .insert({ title, slug, description: description ?? null, is_published: is_published ?? false })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}