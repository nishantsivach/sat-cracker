import { createClient } from "@/utils/supabase/server";
import QuestionsList from "./QuestionsList";

export default async function AdminQuestionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("question")
    .select("id, section, stem, options, correct_index, explanation, difficulty, topic_id, topic(name), created_at")
    .order("created_at", { ascending: false });

  const questions = (data ?? []).map((q) => ({
    ...q,
    topic: Array.isArray(q.topic) ? q.topic[0] ?? null : q.topic,
  }));

  return <QuestionsList initialQuestions={questions} />;
}