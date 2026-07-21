import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import QuestionForm from "../QuestionForm";

export default async function EditQuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: question } = await supabase.from("question").select("*").eq("id", id).single();
  if (!question) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit question</h1>
      <QuestionForm
        mode="edit"
        questionId={question.id}
        initialValues={{
          section: question.section,
          topic_id: question.topic_id ?? "",
          stem: question.stem,
          options: question.options,
          correct_index: question.correct_index,
          explanation: question.explanation ?? "",
          difficulty: question.difficulty,
        }}
      />
    </div>
  );
}