import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";

export default async function BlogsPage() {
  const supabase = await createClient();
  const { data: blogs, error } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false });

  // Error handling with a more styled message
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

  // Empty state with illustration suggestion
  if (!blogs || blogs.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-screen p-6">
          <div className="text-center max-w-md">
            <div className="bg-gray-100 p-6 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 8l-7 5-7-5m14 6v3m-3-3v3m-6-3v3"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No Blogs Yet
            </h2>
            <p className="text-gray-500 mb-6">
              Stay tuned! We&apos;ll be adding exciting content soon.
            </p>
            <Link href="/">
              <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to Homepage
              </span>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate read time based on content length (average reading speed: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content?.split(/\s+/).length || 0;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? minutes : 1; // Minimum 1 minute read time
  };

  // Format date in a more readable way
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
        {/* Header section with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 mb-12 text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            SatCracker Blog
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Discover the latest insights, tutorials, and news from the
            SatCracker team
          </p>
        </div>

        {/* Featured blog (first/latest one) */}
        {blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Latest Post
            </h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="p-6 md:p-8">
                <Link href={`/blogs/${blogs[0].slug}`}>
                  <h3 className="text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors mb-3">
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
          </div>
        )}

        {/* Blog grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            All Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog.slug}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 flex flex-col h-full"
              >
                <div className="p-6 flex-1">
                  <Link href={`/blogs/${blog.slug}`}>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
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

                <div className="px-6 pb-6">
                  <Link href={`/blogs/${blog.slug}`}>
                    <span className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
