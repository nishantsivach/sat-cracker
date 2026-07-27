import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { RetryButton } from "@/components/common/RetryButton";
import { createMetadata } from "@/lib/seo";
import { Metadata } from "next";

const PAGE_SIZE = 10;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1", 10);

  const supabase = await createClient();
  const { count } = await supabase
    .from("blog_content")
    .select("*", { count: "exact", head: true })
    .eq("is_published", true);

  const description =
    count && count > 0
      ? `Read ${count} article${count !== 1 ? "s" : ""} on SAT prep strategy, test-day tips, and score improvement from SATCracker.`
      : "SAT prep strategy, test-day tips, and score improvement guides from SATCracker.";

  return createMetadata({
    title: currentPage > 1 ? `SAT Prep Blog — Page ${currentPage}` : "SAT Prep Blog",
    description,
    path: currentPage > 1 ? `/blogs?page=${currentPage}` : "/blogs",
  });
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = await createClient();

  const currentPage = parseInt((await searchParams)?.page || "1", 10);
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

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
        <div className="flex flex-col justify-center items-center min-h-[60vh] px-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
            <h3 className="text-red-800 text-lg font-bold mb-2">Couldn&apos;t load blogs</h3>
            <p className="text-red-600 text-sm mb-4">{error.message}</p>
            <RetryButton className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center min-h-[60vh] px-6">
          <div className="w-16 h-16 rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
            <BookOpen className="w-7 h-7 text-site-muted" />
          </div>
          <h2 className="text-xl font-bold text-site-text mb-2">No articles yet</h2>
          <p className="text-site-muted mb-6">Check back soon for SAT tips and guides.</p>
          <Link
            href="/"
            className="px-5 py-2.5 bg-site-primary text-white rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
          >
            Back to home
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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stripFormatting = (raw: string) => {
    return (
      raw
        ?.replace(/<[^>]*>/g, "")
        .replace(/[#*_`>~-]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .substring(0, 180) || ""
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <BookOpen className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Blog
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            SAT tips, strategies & guides
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            Practical advice for the SAT — written for students who want to improve, not just read.
          </p>

          {count ? (
            <p className="mt-4 text-xs text-white/30">
              {count} article{count !== 1 ? "s" : ""}
            </p>
          ) : null}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured post */}
        {currentPage === 1 && blogs.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-bold text-site-text mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
              Latest article
            </h2>

            <Link
              href={`/blogs/${blogs[0].slug}`}
              className="group block bg-white rounded-3xl border border-site-border/60 p-6 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 text-xs text-site-muted mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(blogs[0].created_at)}
                </span>
                <span className="w-1 h-1 rounded-full bg-site-border" />
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {calculateReadTime(blogs[0].content)} min read
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-site-text group-hover:text-site-secondary transition-colors mb-3">
                {blogs[0].title}
              </h3>

              <p className="text-site-muted leading-relaxed text-[15px] line-clamp-3 mb-5">
                {stripFormatting(blogs[0].content)}
              </p>

              <span className="inline-flex items-center gap-2 text-sm font-bold text-site-secondary group-hover:text-site-primary transition-colors">
                Read article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        )}

        {/* All articles */}
        <div>
          <h2 className="text-sm font-bold text-site-text mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            {currentPage === 1 ? "More articles" : `Page ${currentPage}`}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogs.slice(currentPage === 1 ? 1 : 0).map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group bg-white rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="flex items-center gap-2 text-xs text-site-muted mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {formatDate(blog.created_at)}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-site-border" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {calculateReadTime(blog.content)} min
                  </span>
                </div>

                <h3 className="text-sm font-bold text-site-text group-hover:text-site-secondary transition-colors mb-2 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-site-muted leading-relaxed line-clamp-2 mb-5 flex-1">
                  {stripFormatting(blog.content)}
                </p>

                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-site-secondary group-hover:text-site-primary transition-colors mt-auto">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}`}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-site-text bg-white border border-site-border/60 rounded-xl hover:border-site-accent/30 hover:bg-site-highlight transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Link>
            )}

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => {
                const page = i + 1;
                const isActive = currentPage === page;

                if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                  return (
                    <Link
                      key={page}
                      href={`?page=${page}`}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-site-primary text-white shadow-sm"
                          : "text-site-text bg-white border border-site-border/60 hover:border-site-accent/30 hover:bg-site-highlight"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                }

                if (page === 2 || page === totalPages - 1) {
                  return (
                    <span key={page} className="w-10 h-10 flex items-center justify-center text-site-muted text-sm">
                      ...
                    </span>
                  );
                }

                return null;
              })}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}`}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-site-text bg-white border border-site-border/60 rounded-xl hover:border-site-accent/30 hover:bg-site-highlight transition-all cursor-pointer"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}