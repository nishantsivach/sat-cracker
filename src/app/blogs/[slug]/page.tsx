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
  BookOpen,
  CheckCircle,
  Edit3,
  Brain,
} from "lucide-react";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogPost({ params }: PageProps) {
  const supabase = await createClient();
  const slug = (await params).slug;

  const { data, error } = await supabase
    .from("blog_content")
    .select()
    .eq("slug", slug)
    .single();

  if (!data || error) {
    notFound();
  }

  // Calculate read time (average reading speed: 200 words per minute)
  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes > 0 ? minutes : 1; // Minimum 1 minute read time
  };

  // Format date in a reader-friendly way
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const readTime = calculateReadTime(data.content);

  return (
    <Layout>
      <div className="bg-site-highlight border-b-4 border-site-primary overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-site-primary rounded-full"
              style={{
                width: "20px",
                height: "20px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Multiple choice pattern decoration */}
        <div className="absolute left-0 top-0 h-full w-16 md:w-24 flex flex-col justify-center items-center gap-6 opacity-10">
          {["A", "B", "C", "D", "E"].map((letter) => (
            <div key={letter} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-site-secondary flex items-center justify-center font-bold">
                {letter}
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
          {/* Back navigation */}
          <div className="mb-6">
            <Link
              href="/blogs"
              className="inline-flex items-center text-site-primary hover:text-site-secondary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to all articles</span>
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-site-secondary">
            {data.title}
          </h1>

          {/* Reading metrics banner styled like an SAT score report */}
          <div className="bg-white border-2 border-site-border rounded-lg p-4 mb-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-6 text-site-secondary">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-site-primary" />
                <span>
                  {formatDate(data?.created_at || new Date().toISOString())}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-site-primary" />
                <span>{readTime} min read</span>
              </div>
              {data.author && (
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-site-highlight border border-site-border flex items-center justify-center mr-2">
                    <span className="text-xs font-bold text-site-secondary">
                      {data.author.name?.substring(0, 2).toUpperCase() || "ST"}
                    </span>
                  </div>
                  <span>{data.author.name || "SatCracker Team"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative">
        {/* SAT test section icon */}
        <div className="hidden md:flex absolute top-6 right-6 flex-col items-center text-site-primary opacity-20">
          <BookOpen className="w-12 h-12" />
          <div className="mt-2 text-xs font-bold">SAT SECTION</div>
        </div>

        {/* Content container */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Main content area styled like SAT test paper */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-8 mb-8 relative">
            {/* Margin line like test booklet */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-site-primary"></div>

            {/* SAT-like section heading */}
            <div className="mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-site-primary" />
                  <span className="font-bold text-site-secondary uppercase text-sm">
                    Expert Knowledge
                  </span>
                </div>
              </div>
            </div>

            {/* Markdown content */}
            <article className="prose lg:prose-lg prose-headings:text-site-secondary prose-headings:font-bold prose-a:text-site-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-md prose-img:shadow-md max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {data.content}
              </ReactMarkdown>
            </article>
          </div>

          {/* Footer with SAT theme */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex justify-between items-center flex-wrap gap-6">
              <Link
                href="/blogs"
                className="inline-flex items-center px-4 py-2 rounded-md bg-site-primary text-white hover:bg-site-secondary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to study materials
              </Link>

              {/* SAT-themed action buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition-colors">
                  <Edit3 className="h-4 w-4" />
                  <span>Take Notes</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded bg-green-100 hover:bg-green-200 text-green-700 text-sm transition-colors">
                  <CheckCircle className="h-4 w-4" />
                  <span>Mark as Studied</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 rounded bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-sm transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>Practice Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
