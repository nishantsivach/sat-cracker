import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import BlogForm from "../BlogForm";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase.from("blog_content").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit post</h1>
      <BlogForm
        mode="edit"
        postId={post.id}
        initialValues={{
          title: post.title,
          slug: post.slug,
          content: post.content,
          meta_title: post.meta_title ?? "",
          meta_description: post.meta_description ?? "",
          is_published: post.is_published,
        }}
      />
    </div>
  );
}