import { SupabaseClient } from "@supabase/supabase-js";

export async function getTopicGuide(supabase: SupabaseClient, slug: string) {
  const { data } = await supabase.from("topic_guide").select("*").eq("slug", slug).single();
  return data;
}

export async function getAllTopicGuideSlugs(supabase: SupabaseClient) {
  const { data } = await supabase.from("topic_guide").select("slug");
  return (data ?? []).map((row) => row.slug as string);
}


export async function getRelatedTopicGuides(supabase: SupabaseClient, slugs: string[]) {
  if (slugs.length === 0) return [];
  const { data } = await supabase.from("topic_guide").select("slug, name").in("slug", slugs);
  return (data ?? []).map((row) => ({ title: row.name as string, href: `/topics/${row.slug}` }));
}