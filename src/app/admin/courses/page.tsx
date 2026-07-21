import { createClient } from "@/utils/supabase/server";
import CoursesList from "./CoursesList";

const PAGE_SIZE = 20;

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("course")
    .select("id, title, slug, description, is_published, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) query = query.ilike("title", `%${search}%`);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  return (
    <CoursesList
      courses={data ?? []}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
    />
  );
}