import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("blog_content")
    .select("title, meta_title, meta_description")
    .eq("slug", slug)
    .single();

  if (!data) return {};

  return {
    title: data.meta_title || data.title,
    description: data.meta_description || "",
  };
}

export default async function BlogPost({ params }: PageProps) {
  const supabase = await createClient();
  const slug = (await params).slug;

  const { data, error } = await supabase
    .from("blog_content")
    .select()
    .eq("slug", slug)
    .single();

  if (!data || error) notFound();

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? minutes : 1;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const readTime = calculateReadTime(data.content);

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

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              Article
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {readTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-[1.1] mb-4">
            {data.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(data?.created_at || new Date().toISOString())}
            </span>
            {data.author && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>By {data.author.name || "SATCracker Team"}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Article body */}
        <article className="prose prose-lg max-w-none prose-headings:text-site-text prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:text-site-text prose-p:leading-relaxed prose-p:text-[15px] prose-strong:text-site-primary prose-a:text-site-secondary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-site-accent prose-blockquote:text-site-muted prose-blockquote:italic prose-li:text-site-text prose-li:leading-relaxed prose-code:bg-site-highlight prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal prose-pre:bg-site-primary prose-pre:text-white/90 prose-img:rounded-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {data.content}
          </ReactMarkdown>
        </article>

        {/* Bottom navigation */}
        <div className="mt-16 pt-10 border-t border-site-border/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
              >
                Practice now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sat"
                className="inline-flex items-center gap-2 border border-site-border/60 rounded-xl px-5 py-2.5 text-sm font-semibold text-site-text hover:border-site-accent/20 hover:bg-site-highlight transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                SAT Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}