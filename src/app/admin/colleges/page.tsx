import { createClient } from "@/utils/supabase/server";
import CollegesList from "./CollegesList";

const PAGE_SIZE = 20;

export default async function AdminCollegesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("college")
    .select("id, name, slug, avg_sat_score, is_published, updated_at", { count: "exact" })
    .order("name", { ascending: true });

  if (search) query = query.ilike("name", `%${search}%`);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  return (
    <CollegesList
      colleges={data ?? []}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
    />
  );
}