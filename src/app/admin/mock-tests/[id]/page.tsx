import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import MockTestForm from "../MockTestForm";
import QuestionAssigner from "./QuestionAssigner";

export default async function EditMockTestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: test } = await supabase.from("mock_test").select("*").eq("id", id).single();
  if (!test) notFound();

  const { data: assignedRaw } = await supabase
    .from("mock_test_question")
    .select("id, order, question(id, stem, section, difficulty)")
    .eq("mock_test_id", id)
    .order("order", { ascending: true });

  const assigned = (assignedRaw ?? []).map((row) => ({
    id: row.id,
    order: row.order,
    question: Array.isArray(row.question) ? row.question[0] : row.question,
  }));

  return (
    <div className="max-w-4xl">
      <MockTestForm
        mode="edit"
        testId={test.id}
        initialValues={{
          title: test.title,
          duration_minutes: test.duration_minutes,
          is_published: test.is_published,
        }}
      />

      <div className="mt-12 pt-10 border-t border-site-border">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-site-text">Questions</h2>
          <p className="text-sm text-site-muted mt-1">
            Add and arrange questions for this mock test. Drag to reorder or use the arrow buttons.
          </p>
        </div>
        <QuestionAssigner mockTestId={test.id} initialAssigned={assigned} />
      </div>
    </div>
  );
}