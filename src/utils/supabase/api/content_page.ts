import { SupabaseClient } from "@supabase/supabase-js";

export async function getContentPage(
  supabase: SupabaseClient,
  type: string,
  slug: string
) {
  const { data, error } = await supabase
    .from("content_page")
    .select("*")
    .eq("type", type)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getContentPagesByType(
  supabase: SupabaseClient,
  type: string
) {
  const { data, error } = await supabase
    .from("content_page")
    .select("*")
    .eq("type", type)
    .eq("is_published", true)
    .order("title");

  if (error) {
    return [];
  }

  return data;
}

export async function getAllContentPages(
  supabase: SupabaseClient
) {
  const { data, error } = await supabase
    .from("content_page")
    .select("*")
    .eq("is_published", true)
    .order("updated_at", { ascending: false });

  if (error) {
    return [];
  }

  return data;
}

export async function getContentPageSlugsByType(
  supabase: SupabaseClient,
  type: string
) {
  const { data } = await supabase
    .from("content_page")
    .select("slug")
    .eq("type", type)
    .eq("is_published", true);

  return data?.map((x) => x.slug) ?? [];
}