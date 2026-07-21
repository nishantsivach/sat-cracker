import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function GET() {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { data, error } = await supabase
    .from("question")
    .select("id, section, stem, options, correct_index, explanation, difficulty, topic_id, topic(name), created_at")
    .order("created_at", { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ questions: data }), { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { section, stem, options, correct_index, explanation, difficulty, topic_id } = await req.json();

  if (!section || !stem || !Array.isArray(options) || options.length < 2) {
    return new Response(
      JSON.stringify({ error: "Section, stem, and at least 2 options are required" }),
      { status: 400 },
    );
  }
  if (typeof correct_index !== "number" || correct_index < 0 || correct_index >= options.length) {
    return new Response(JSON.stringify({ error: "correct_index must point at one of the options" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("question")
    .insert({
      section,
      stem,
      options,
      correct_index,
      explanation: explanation ?? null,
      difficulty: difficulty ?? "medium",
      topic_id: topic_id || null,
    })
    .select("id")
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}