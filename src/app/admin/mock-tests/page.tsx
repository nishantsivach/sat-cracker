import { createClient } from "@/utils/supabase/server";
import MockTestsList from "./MockTestsList";

const PAGE_SIZE = 20;

export default async function AdminMockTestsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("mock_test")
    .select("id, title, duration_minutes, is_published, created_at, mock_test_question(count)", {
      count: "exact",
    })
    .order("created_at", { ascending: false });

  if (search) query = query.ilike("title", `%${search}%`);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  const tests = (data ?? []).map((t) => ({
    ...t,
    question_count: Array.isArray(t.mock_test_question) ? t.mock_test_question[0]?.count ?? 0 : 0,
  }));

  return (
    <MockTestsList
      tests={tests}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
    />
  );
}