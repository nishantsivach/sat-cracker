import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { getTopicGuide, getAllTopicGuideSlugs, getRelatedTopicGuides } from "@/utils/supabase/api/topic_guide";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import { ArrowLeft, ArrowRight, Clock, BarChart3, Zap } from "lucide-react";
import { createStaticClient } from "@/utils/supabase/static";

const sectionHref: Record<string, string> = {
  math: "/sat/math",
  "reading-writing": "/sat/reading-writing",
};

const sectionLabel: Record<string, string> = {
  math: "SAT Math",
  "reading-writing": "SAT Reading & Writing",
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const supabase = await createStaticClient();
  const slugs = await getAllTopicGuideSlugs(supabase);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createStaticClient();
  const guide = await getTopicGuide(supabase, slug);
  if (!guide) return {};
  return { title: guide.meta_title, description: guide.meta_description };
}

export default async function TopicGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createStaticClient();
  const guide = await getTopicGuide(supabase, slug);
  if (!guide) notFound();

  const related = await getRelatedTopicGuides(supabase, guide.related_slugs ?? []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.name,
    description: guide.meta_description,
    about: guide.section === "math" ? "SAT Math" : "SAT Reading & Writing",
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href={sectionHref[guide.section]}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {sectionLabel[guide.section]}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              {sectionLabel[guide.section]}
            </span>
            {guide.read_time && (
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                {guide.read_time}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {guide.name}
          </h1>
          {guide.summary && (
            <p className="text-white/60 leading-relaxed max-w-2xl text-[15px]">
              {guide.summary}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        {/* Quick tip card */}
        <div className="bg-site-highlight rounded-2xl border border-site-border p-5 mb-10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-site-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-site-text">Quick tip</p>
            <p className="text-sm text-site-muted mt-0.5">
              {guide.section === "math"
                ? "Most SAT math questions follow predictable patterns. Learn the pattern once, apply it everywhere."
                : "Don't memorize all grammar rules. Focus on the 3-4 punctuation rules the SAT actually tests repeatedly."}
            </p>
          </div>
        </div>

        {/* Markdown content */}
        <article className="prose prose-lg max-w-none prose-headings:text-site-text prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:text-site-text prose-p:leading-relaxed prose-p:text-[15px] prose-strong:text-site-primary prose-a:text-site-secondary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-site-accent prose-blockquote:text-site-muted prose-blockquote:italic prose-li:text-site-text prose-li:leading-relaxed prose-code:bg-site-highlight prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal prose-pre:bg-site-primary prose-pre:text-white/90 prose-img:rounded-2xl">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {guide.body}
          </ReactMarkdown>
        </article>

        {/* Related topics */}
        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-site-border">
            <h2 className="text-lg font-bold text-site-text mb-4">
              Next topics to tackle
            </h2>
            <div className="space-y-2">
              {related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-center justify-between p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all cursor-pointer"
                >
                  <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
                    {r.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center">
          <div className="w-10 h-10 mx-auto rounded-xl bg-white/15 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-site-accent" />
          </div>
          <p className="text-white font-bold">
            Ready to practice {guide.name?.toLowerCase()}?
          </p>
          <p className="text-white/60 text-sm mt-1">
            Apply what you just learned with real SAT-style questions.
          </p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 mt-4 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Start practicing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}