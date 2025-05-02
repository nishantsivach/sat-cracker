import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function LandingPage() {
  const supabase = await createClient();

  const { data: blogs, error } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">
          Error loading blogs: {error.message}
        </p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">All Blogs</h1>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="p-5 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <Link href={`/blogs/${blog.slug}`}>
              <h2 className="text-2xl font-semibold text-blue-700 hover:underline">
                {blog.title}
              </h2>
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(blog.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="mt-2 text-gray-700 line-clamp-3">
              {blog.content?.slice(0, 200)}...
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
