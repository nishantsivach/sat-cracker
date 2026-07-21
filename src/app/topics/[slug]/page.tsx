import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Clock, BarChart3, ArrowRight } from "lucide-react";

const sectionHref: Record<string, string> = {
  math: "/sat/math",
  "reading-writing": "/sat/reading-writing",
};

const sectionLabel: Record<string, string> = {
  math: "SAT Math",
  "reading-writing": "SAT Reading & Writing",
};

function estimateReadTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: guide } = await supabase
    .from("topic_guide")
    .select("meta_title, meta_description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!guide) return {};
  return { title: guide.meta_title, description: guide.meta_description };
}

export default async function TopicGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guide } = await supabase
    .from("topic_guide")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!guide) notFound();

  const { data: relatedRaw } = await supabase
    .from("topic_guide_related")
    .select("related:related_topic_guide_id(name, slug)")
    .eq("topic_guide_id", guide.id);

  const related = (relatedRaw ?? [])
    .map((row) => (Array.isArray(row.related) ? row.related[0] : row.related))
    .filter((r): r is { name: string; slug: string } => Boolean(r));

  return (
    <Layout>
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href={sectionHref[guide.section]}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {sectionLabel[guide.section]}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              {sectionLabel[guide.section]}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {estimateReadTime(guide.body)}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">{guide.name}</h1>
          {guide.summary && (
            <p className="text-white/60 leading-relaxed max-w-2xl text-[15px]">{guide.summary}</p>
          )}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
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

        <article className="prose prose-lg max-w-none prose-headings:text-site-text prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-site-text prose-p:leading-relaxed prose-strong:text-site-primary prose-blockquote:border-site-accent prose-blockquote:text-site-muted prose-blockquote:italic prose-li:text-site-text prose-code:bg-site-highlight prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {guide.body}
          </ReactMarkdown>
        </article>

        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-site-border">
            <h2 className="text-lg font-bold text-site-text mb-4">Next topics to tackle</h2>
            <div className="space-y-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/topics/${r.slug}`}
                  className="group flex items-center justify-between p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
                    {r.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center">
          <p className="text-white font-bold">Ready to practice {guide.name.toLowerCase()}?</p>
          <p className="text-white/60 text-sm mt-1">Apply what you just learned with real SAT-style questions.</p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 mt-4 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-accent/90 transition-colors"
          >
            Start practicing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}