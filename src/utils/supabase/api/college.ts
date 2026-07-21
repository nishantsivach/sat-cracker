import { SupabaseClient } from "@supabase/supabase-js";

export async function getCollege(supabase: SupabaseClient, slug: string) {
  const { data } = await supabase.from("college").select("*").eq("slug", slug).single();
  return data;
}

export async function getAllCollegeSlugs(supabase: SupabaseClient) {
  const { data } = await supabase.from("college").select("slug");
  return (data ?? []).map((row) => row.slug as string);
}