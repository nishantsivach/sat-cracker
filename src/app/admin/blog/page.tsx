import { createClient } from "@/utils/supabase/server";
import BlogList from "./BlogList";

const PAGE_SIZE = 20;

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("blog_content")
    .select("id, title, slug, is_published, created_at", { count: "exact" })
    .order("created_at", { ascending: false });

  if (search) query = query.ilike("title", `%${search}%`);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  return (
    <BlogList
      posts={data ?? []}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
    />
  );
}