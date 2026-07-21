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

const iconMap: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5 text-site-secondary" />,
  book: <BookOpen className="w-5 h-5 text-site-secondary" />,
  calendar: <Calendar className="w-5 h-5 text-site-accent" />,
  trophy: <Trophy className="w-5 h-5 text-site-accent" />,
  help: <HelpCircle className="w-5 h-5 text-site-secondary" />,
};

export async function generateMetadata() {
  const supabase = await createClient();
  const page = await getContentPage(supabase, "pillar", "sat");
  if (!page) return {};
  return { title: page.meta_title, description: page.meta_description };
}

export default async function SatPillarPage() {
  const supabase = await createClient();
  const page = await getContentPage(supabase, "pillar", "sat");
  if (!page) notFound();

  const sections = page.data?.sections ?? [];
  const topicLinks = page.data?.topicLinks ?? [];
  const quickStats = page.data?.quickStats ?? [
    { value: "2", label: "Sections" },
    { value: "1600", label: "Max Score" },
    { value: "3 hrs", label: "Duration" },
    { value: "7x/yr", label: "Offered" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.meta_description,
    about: "SAT Exam Preparation",
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
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

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
            Everything you actually need to know
          </p>

          {page.intro && (
            <p className="mt-5 text-white/60 leading-relaxed max-w-2xl text-[15px]">
              {page.intro}
            </p>
          )}

          {quickStats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-6">
              {quickStats.map((stat: { value: string; label: string }) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <span className="text-site-accent text-sm font-bold">
                      {stat.value}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-[11px] text-white/50">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-4xl mx-auto px-6 py-14 md:py-18">
        {sections.length > 0 && (
          <>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-4">
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
                    className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-site-border hover:border-site-accent/25 hover:shadow-lg hover:shadow-site-accent/[0.04] transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-11 h-11 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {iconMap[s.icon] ?? <BookOpen className="w-5 h-5 text-site-secondary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-bold text-site-text group-hover:text-site-primary transition-colors">
                          {s.title}
                        </h3>
                        {s.stat && (
                          <span className="text-[11px] font-mono text-site-muted bg-site-highlight rounded-md px-2 py-0.5 shrink-0">
                            {s.stat}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-site-muted mt-1 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </Link>
                )
              )}
            </div>
          </>
        )}

        {/* Topic Guides */}
        {topicLinks.length > 0 && (
          <div className="mt-14">
            <div className="bg-site-highlight rounded-2xl border border-site-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-site-accent" />
                <h2 className="text-xl font-bold text-site-text">
                  Popular topic guides
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {topicLinks.map((t: { title: string; href: string }) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="flex items-center justify-between gap-2 px-4 py-3 bg-white rounded-xl border border-site-border hover:border-site-accent/20 hover:shadow-sm transition-all group cursor-pointer"
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
        <div className="mt-12 p-6 bg-site-primary rounded-2xl text-center">
          <p className="text-white font-bold">Ready to start practicing?</p>
          <p className="text-white/60 text-sm mt-1">
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
      </section>
    </Layout>
  );
}