import { createClient } from "@/utils/supabase/server";
import TopicGuidesList from "./TopicGuidesList";

const PAGE_SIZE = 20;

export default async function AdminTopicGuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, Number(page) || 1);
  const supabase = await createClient();

  let query = supabase
    .from("topic_guide")
    .select("id, name, slug, section, is_published, updated_at", { count: "exact" })
    .order("updated_at", { ascending: false });

  if (search) query = query.ilike("name", `%${search}%`);

  const from = (currentPage - 1) * PAGE_SIZE;
  const { data, count } = await query.range(from, from + PAGE_SIZE - 1);

  return (
    <TopicGuidesList
      guides={data ?? []}
      totalCount={count ?? 0}
      currentPage={currentPage}
      pageSize={PAGE_SIZE}
      search={search ?? ""}
    />
  );
}