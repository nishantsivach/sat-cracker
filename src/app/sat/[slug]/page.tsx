import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { getContentPage, getContentPageSlugsByType } from "@/utils/supabase/api/content_page";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  BookOpen,
  Trophy,
  Zap,
} from "lucide-react";
import { createStaticClient } from "@/utils/supabase/static";

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5 text-site-secondary" />,
  book: <BookOpen className="w-5 h-5 text-site-secondary" />,
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const supabase = await createStaticClient();
  const sectionSlugs = await getContentPageSlugsByType(supabase, "section");
  const logisticsSlugs = await getContentPageSlugsByType(supabase, "logistics");
  return [...sectionSlugs, ...logisticsSlugs].map((slug) => ({ slug }));
}

async function findPage(slug: string) {
  const supabase = await createStaticClient();
  return (
    (await getContentPage(supabase, "section", slug)) ??
    (await getContentPage(supabase, "logistics", slug))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return {};
  return { title: page.meta_title, description: page.meta_description };
}

export default async function SatSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) notFound();

  // Section page: Math or Reading & Writing
  if (page.type === "section") {
    const topics = page.data?.topics ?? [];
    const stats = page.data?.stats ?? [];

    return (
      <Layout>
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
              href="/sat"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SAT Guide
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {iconMap[page.data?.icon] ?? <BookOpen className="w-5 h-5 text-site-accent" />}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  {page.title}
                </h1>
                {page.data?.subtitle && (
                  <p className="text-white/50 text-sm mt-0.5">{page.data.subtitle}</p>
                )}
              </div>
            </div>

            {page.intro && (
              <p className="text-white/70 leading-relaxed max-w-2xl text-[15px]">
                {page.intro}
              </p>
            )}

            {stats.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-8">
                {stats.map((stat: { value: string; label: string }) => (
                  <div key={stat.label} className="flex items-center gap-2 text-sm">
                    <span className="text-xl font-black text-site-accent">
                      {stat.value}
                    </span>
                    <span className="text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Topic guides */}
        {topics.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 py-14">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-site-text">
                Topics you need to know
              </h2>
              <p className="text-site-muted text-sm mt-1">
                Start with the ones you struggle with most
              </p>
            </div>

            <div className="space-y-2">
              {topics.map((t: { title: string; href: string }, i: number) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group flex items-center justify-between p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-site-highlight flex items-center justify-center text-xs font-mono font-bold text-site-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-medium text-site-text group-hover:text-site-secondary transition-colors">
                      {t.title}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 p-6 bg-site-highlight rounded-2xl border border-site-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-site-primary flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-site-accent" />
                </div>
                <div>
                  <p className="font-bold text-site-primary">
                    Ready to start practicing?
                  </p>
                  <p className="text-sm text-site-muted mt-1">
                    Knowing the format is step one. Actually improving your score is what comes next.
                  </p>
                  <Link
                    href="/practice"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
                  >
                    Go to practice
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}
      </Layout>
    );
  }

  // Logistics page: Dates, Registration, Scoring, etc.
  const bodyParagraphs = page.body ? page.body.split("\n\n").filter(Boolean) : [];

  return (
    <Layout>
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
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            {page.title}
          </h1>
          {page.data?.subtitle && (
            <p className="text-white/50 text-sm mt-2">{page.data.subtitle}</p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        {bodyParagraphs.length > 0 ? (
          <div className="space-y-5">
            {bodyParagraphs.map((para: string, i: number) => (
              <div key={i} className="flex gap-4">
                <span className="w-7 h-7 rounded-lg bg-site-highlight flex items-center justify-center text-xs font-mono font-bold text-site-accent shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-site-text leading-relaxed text-[15px]">
                  {para}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-site-muted">No content available yet.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 p-6 bg-site-highlight rounded-2xl border border-site-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-site-primary flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <p className="font-bold text-site-primary">
                Ready to start practicing?
              </p>
              <p className="text-sm text-site-muted mt-1">
                Knowing the format is step one. Actually improving your score is what comes next.
              </p>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
              >
                Go to practice
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}