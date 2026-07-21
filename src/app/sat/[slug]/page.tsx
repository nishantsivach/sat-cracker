import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { getContentPage, getContentPageSlugsByType } from "@/utils/supabase/api/content_page";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  BookOpen,
  Zap,
  CheckCircle,
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
  const comparisonSlugs = await getContentPageSlugsByType(supabase, "comparison");
  const faqSlugs = await getContentPageSlugsByType(supabase, "faq");
  return [...sectionSlugs, ...logisticsSlugs, ...comparisonSlugs, ...faqSlugs].map((slug) => ({ slug }));
}

async function findPage(slug: string) {
  const supabase = await createStaticClient();
  return (
    (await getContentPage(supabase, "section", slug)) ??
    (await getContentPage(supabase, "logistics", slug)) ??
    (await getContentPage(supabase, "comparison", slug)) ??
    (await getContentPage(supabase, "faq", slug))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) return {};
  return { title: page.meta_title, description: page.meta_description };
}

function PageHero({
  title,
  subtitle,
  intro,
}: {
  title: string;
  subtitle?: string;
  intro?: string;
}) {
  return (
    <section className="bg-site-primary text-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
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

        <h1 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h1>
        {subtitle && <p className="text-white/50 text-sm mt-2">{subtitle}</p>}
        {intro && <p className="text-white/70 leading-relaxed max-w-2xl text-[15px] mt-4">{intro}</p>}
      </div>
    </section>
  );
}

function PracticeCTA() {
  return (
    <div className="mt-12 p-6 bg-site-highlight rounded-2xl border border-site-border">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-site-primary flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-site-accent" />
        </div>
        <div>
          <p className="font-bold text-site-primary">Ready to start practicing?</p>
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
  );
}

export default async function SatSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await findPage(slug);
  if (!page) notFound();

 
  if (page.type === "section") {
    const topics = page.data?.topics ?? [];
    const stats = page.data?.stats ?? [];

    return (
      <Layout>
        <section className="bg-site-primary text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
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
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{page.title}</h1>
                {page.data?.subtitle && <p className="text-white/50 text-sm mt-0.5">{page.data.subtitle}</p>}
              </div>
            </div>

            {page.intro && <p className="text-white/70 leading-relaxed max-w-2xl text-[15px]">{page.intro}</p>}

            {stats.length > 0 && (
              <div className="flex flex-wrap gap-6 mt-8">
                {stats.map((stat: { value: string; label: string }) => (
                  <div key={stat.label} className="flex items-center gap-2 text-sm">
                    <span className="text-xl font-black text-site-accent">{stat.value}</span>
                    <span className="text-white/50">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {topics.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 py-14">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-site-text">Topics you need to know</h2>
              <p className="text-site-muted text-sm mt-1">Start with the ones you struggle with most</p>
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

            <PracticeCTA />
          </section>
        )}
      </Layout>
    );
  }

  // ===== Comparison page =====
  if (page.type === "comparison") {
    const { comparisonTable = [], keyDifferences = [], chooseSat = [], chooseAct = [], faqs = [] } = page.data ?? {};

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f: { q: string; a: string }) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    return (
      <Layout>
        {faqs.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        )}
        <PageHero title={page.title} subtitle={page.data?.subtitle} intro={page.intro} />

        <section className="max-w-3xl mx-auto px-6 py-14 space-y-10">
          {comparisonTable.length > 0 && (
            <div className="bg-white border border-site-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-site-text mb-5">Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-site-highlight">
                      <th className="p-3 text-left rounded-l-lg">Feature</th>
                      <th className="p-3 text-left">This test</th>
                      <th className="p-3 text-left rounded-r-lg">Alternative</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row: { feature: string; sat: string; act: string }) => (
                      <tr key={row.feature} className="border-t border-site-border">
                        <td className="p-3 font-medium text-site-text">{row.feature}</td>
                        <td className="p-3 text-site-muted">{row.sat}</td>
                        <td className="p-3 text-site-muted">{row.act}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {keyDifferences.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-site-text mb-4">Key Differences</h2>
              <ul className="space-y-2.5">
                {keyDifferences.map((item: string) => (
                  <li key={item} className="flex gap-2.5 text-site-text">
                    <CheckCircle className="w-5 h-5 text-site-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(chooseSat.length > 0 || chooseAct.length > 0) && (
            <div className="grid md:grid-cols-2 gap-5">
              {chooseSat.length > 0 && (
                <div className="bg-white border border-site-border rounded-2xl p-6">
                  <h3 className="font-bold text-site-text mb-3">Choose this if you:</h3>
                  <ul className="space-y-1.5 text-sm text-site-muted">
                    {chooseSat.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {chooseAct.length > 0 && (
                <div className="bg-white border border-site-border rounded-2xl p-6">
                  <h3 className="font-bold text-site-text mb-3">Choose the alternative if you:</h3>
                  <ul className="space-y-1.5 text-sm text-site-muted">
                    {chooseAct.map((item: string) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {faqs.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-site-text mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((f: { q: string; a: string }) => (
                  <div key={f.q} className="bg-white border border-site-border rounded-xl p-5">
                    <h3 className="font-semibold text-site-text">{f.q}</h3>
                    <p className="text-sm text-site-muted mt-1.5">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <PracticeCTA />
        </section>
      </Layout>
    );
  }

  // ===== FAQ page =====
  if (page.type === "faq") {
    const items = page.data?.items ?? [];

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item: { q: string; a: string }) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    };

    return (
      <Layout>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageHero title={page.title} subtitle={page.data?.subtitle} intro={page.intro} />

        <section className="max-w-3xl mx-auto px-6 py-14">
          <div className="space-y-4">
            {items.map((item: { q: string; a: string }) => (
              <div key={item.q} className="bg-white border border-site-border rounded-xl p-6 shadow-sm">
                <h2 className="font-bold text-lg text-site-text mb-2">{item.q}</h2>
                <p className="text-site-muted">{item.a}</p>
              </div>
            ))}
          </div>

          <PracticeCTA />
        </section>
      </Layout>
    );
  }

  
  const bodyParagraphs = page.body ? page.body.split("\n\n").filter(Boolean) : [];

  return (
    <Layout>
      <PageHero title={page.title} subtitle={page.data?.subtitle} />

      <section className="max-w-3xl mx-auto px-6 py-14">
        {bodyParagraphs.length > 0 ? (
          <div className="space-y-5">
            {bodyParagraphs.map((para: string, i: number) => (
              <div key={i} className="flex gap-4">
                <span className="w-7 h-7 rounded-lg bg-site-highlight flex items-center justify-center text-xs font-mono font-bold text-site-accent shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-site-text leading-relaxed text-[15px]">{para}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-site-muted">No content available yet.</p>
          </div>
        )}

        <PracticeCTA />
      </section>
    </Layout>
  );
}