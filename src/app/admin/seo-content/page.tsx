import { createClient } from "@/utils/supabase/server";
import SeoContentList from "./SeoContentList";

export default async function AdminSeoContentPage() {
  const supabase = await createClient();

  const { data: pages } = await supabase
    .from("content_page")
    .select("id, title, slug, type, updated_at")
    .order("updated_at", { ascending: false });

  return <SeoContentList initialPages={pages ?? []} />;
}