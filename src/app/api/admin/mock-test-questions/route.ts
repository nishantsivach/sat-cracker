import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireAdmin } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const admin = await requireAdmin(supabase);
  if (!admin) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const { mock_test_id, question_id, order } = await req.json();
  if (!mock_test_id || !question_id) {
    return new Response(JSON.stringify({ error: "mock_test_id and question_id are required" }), { status: 400 });
  }

  const { data, error } = await supabase
    .from("mock_test_question")
    .insert({ mock_test_id, question_id, order: order ?? 0 })
    .select("id")
    .single();

  if (error) {
    const message = error.code === "23505" ? "That question is already in this test." : error.message;
    return new Response(JSON.stringify({ error: message }), { status: 400 });
  }
  return new Response(JSON.stringify({ id: data.id }), { status: 201 });
}