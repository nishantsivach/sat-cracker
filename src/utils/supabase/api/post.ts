import { createClient } from "../server";

type Unpacked<T> = T extends (infer U)[] ? U : T;

export type PostType = Unpacked<
  Awaited<ReturnType<typeof getAllPosts>>["data"]
>;

export async function getAllPosts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false });

  return { data };
}
