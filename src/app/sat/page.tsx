import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { getContentPage } from "@/utils/supabase/api/content_page";
import {
  Calculator,
  BookOpen,
  Calendar,
  Trophy,
  HelpCircle,
  ArrowRight,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { cache } from "react";
import { createBreadcrumbSchema, createMetadata, createWebPageSchema } from "@/lib/seo";
import Script from "next/script";

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5 text-site-secondary" />,
  book: <BookOpen className="w-5 h-5 text-site-secondary" />,
  calendar: <Calendar className="w-5 h-5 text-site-accent" />,
  trophy: <Trophy className="w-5 h-5 text-site-accent" />,
  help: <HelpCircle className="w-5 h-5 text-site-secondary" />,
};

const getSatPillarPage = cache(async () => {
  const supabase = await createClient();
  return getContentPage(supabase, "pillar", "sat");
});


export async function generateMetadata() {
  const page = await getSatPillarPage();
  if (!page) return {};

  return createMetadata({
  title: page.meta_title || page.title,
  description: page.meta_description || page.intro,
  path: "/sat",
  keywords: [
    "SAT",
    "Digital SAT",
    "SAT Exam",
    "SAT Guide",
    "SAT Preparation",
  ],
});
}

export default async function SatPillarPage() {
  // const supabase = await createClient();
  const page = await getSatPillarPage();
  if (!page) notFound();

  const sections = page.data?.sections ?? [];
  const topicLinks = page.data?.topicLinks ?? [];
  const quickStats = page.data?.quickStats ?? [
    { value: "2", label: "Sections" },
    { value: "1600", label: "Max Score" },
    { value: "3 hrs", label: "Duration" },
    { value: "7x/yr", label: "Offered" },
  ];

  const webPageSchema = createWebPageSchema({
    title: page.title,
    description: page.meta_description || page.intro,
    path: "/sat",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "SAT", path: "/sat" },
  ]);

  return (
    <Layout>
      <Script
        id="sat-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="sat-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              SAT Guide
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {page.title || "SAT Exam Guide"}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Everything you need to know about the Digital SAT, including scoring, sections, timing, strategies and preparation resources.
          </p>

          {page.intro && (
            <p className="mt-5 text-white/60 leading-relaxed max-w-2xl text-[15px]">
              {page.intro}
            </p>
          )}

          {quickStats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-5">
              {quickStats.map((stat: { value: string; label: string }) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
                    <span className="text-site-accent text-sm font-bold">{stat.value}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                    <p className="text-[11px] text-white/40">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {sections.length > 0 && (
          <>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-4 shadow-sm border border-site-border/60">
                <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
                <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
                  Explore by section
                </span>
              </div>
              <h2 className="text-3xl font-black text-site-text tracking-tight">
                Everything you need,
                <span className="text-site-secondary"> in one place</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {sections.map(
                (s: { icon: string; title: string; href: string; desc: string; stat?: string }) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex items-start gap-4 p-5 bg-white rounded-3xl border border-site-border/60 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {iconMap[s.icon] ?? <BookOpen className="w-5 h-5 text-site-secondary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-bold text-site-text group-hover:text-site-primary transition-colors">
                          {s.title}
                        </h3>
                        {s.stat && (
                          <span className="text-[10px] font-mono font-bold text-site-muted bg-site-highlight rounded-md px-2 py-0.5 shrink-0">
                            {s.stat}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-site-muted mt-1 leading-relaxed">{s.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-0.5" />
                  </Link>
                )
              )}
            </div>
          </>
        )}

        {/* Topic Guides */}
        {topicLinks.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl border border-site-border/60 p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-site-accent/10 flex items-center justify-center shadow-sm">
                  <Sparkles className="w-4 h-4 text-site-accent" />
                </div>
                <h2 className="text-sm font-bold text-site-text">Popular topic guides</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {topicLinks.map((t: { title: string; href: string }) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-site-highlight/50 border border-transparent hover:border-site-accent/20 hover:bg-white hover:shadow-sm transition-all group cursor-pointer"
                  >
                    <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
                      {t.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-site-accent/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <p className="text-white font-bold text-sm">Ready to start practicing?</p>
            <p className="text-white/50 text-xs mt-1">
              Knowing the format is step one. Improving your score comes next.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 mt-4 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Start practicing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}