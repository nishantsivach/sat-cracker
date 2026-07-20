import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("mock_test")
    .select("id, title, duration_minutes, is_published, created_at, mock_test_question(count)")
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  const tests = (data ?? []).map((t) => ({
    ...t,
    question_count: Array.isArray(t.mock_test_question) ? t.mock_test_question[0]?.count ?? 0 : 0,
  }));

  return new Response(JSON.stringify({ tests }), { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { title, duration_minutes, is_published } = await req.json();
  if (!title || !duration_minutes) {
    return new Response(JSON.stringify({ error: "Title and duration are required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("mock_test")
    .insert({ title, duration_minutes, is_published: is_published ?? false })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}