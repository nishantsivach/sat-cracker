import { SupabaseClient } from "@supabase/supabase-js";

export async function getContentPage(supabase: SupabaseClient, type: string, slug: string) {
  const { data } = await supabase
    .from("content_page")
    .select("*")
    .eq("type", type)
    .eq("slug", slug)
    .single();
  return data;
}

export async function getContentPageSlugsByType(supabase: SupabaseClient, type: string) {
  const { data } = await supabase.from("content_page").select("slug").eq("type", type);
  return (data ?? []).map((row) => row.slug as string);
}