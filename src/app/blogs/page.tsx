import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";

const PAGE_SIZE = 10;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = await createClient();

  const currentPage = parseInt((await searchParams)?.page || "1", 10);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // Get paginated blogs and total count
  const {
    data: blogs,
    error,
    count,
  } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md max-w-2xl">
            <h3 className="text-red-800 text-xl font-semibold mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-700">
              We couldn&apos;t load the blogs at this time: {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No Blogs Yet
          </h2>
          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </Layout>
    );
  }

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  const calculateReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0;
    return Math.max(1, Math.ceil(words / 200));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-12 text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SatCracker Blog
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Discover the latest insights, tutorials, and news from the
            SatCracker team
          </p>
        </div>

        {/* Featured blog */}
        {currentPage === 1 && blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Latest Post
            </h2>
            <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
              <Link href={`/blogs/${blogs[0].slug}`}>
                <h3 className="text-3xl font-bold text-gray-900 hover:text-blue-600 mb-3">
                  {blogs[0].title}
                </h3>
              </Link>
              <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(blogs[0].created_at)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{calculateReadTime(blogs[0].content)} min read</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-4">
                {blogs[0].content?.slice(0, 300)}...
              </p>
              <Link href={`/blogs/${blogs[0].slug}`}>
                <span className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                  Continue Reading <ChevronRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            </div>
          </div>
        )}

        {/* Blog grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            All Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(currentPage === 1 ? 1 : 0).map((blog) => (
              <article
                key={blog.slug}
                className="bg-white rounded-xl shadow-sm border p-6 flex flex-col justify-between"
              >
                <div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 mb-2">
                      {blog.title}
                    </h3>
                  </Link>
                  <div className="flex items-center text-gray-500 text-sm mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(blog.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{calculateReadTime(blog.content)} min read</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content?.slice(0, 150)}...
                  </p>
                </div>
                <Link href={`/blogs/${blog.slug}`}>
                  <span className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                    Read More <ChevronRight className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination controls */}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;
              const isActive = currentPage === page;
              return (
                <Link
                  key={page}
                  href={`?page=${page}`}
                  className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 border-gray-300"
                    }`}
                >
                  {page}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
