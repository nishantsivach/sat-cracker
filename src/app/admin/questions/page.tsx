import { createClient } from "@/utils/supabase/server";
import QuestionsList from "./QuestionsList";

const PAGE_SIZE = 20;

export default async function AdminQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; section?: string }>;
}) {
  const { page, search, section } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("question")
    .select(
      "id, section, stem, options, correct_index, explanation, difficulty, topic_id, topic(name), created_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (search) query = query.ilike("stem", `%${search}%`);
  if (section && section !== "all") query = query.eq("section", section);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  const questions = (data ?? []).map((q) => ({
    ...q,
    topic: Array.isArray(q.topic) ? q.topic[0] ?? null : q.topic,
  }));

  return (
    <QuestionsList
      questions={questions}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
      section={section ?? "all"}
    />
  );
}