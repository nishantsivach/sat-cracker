import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { getContentPage } from "@/utils/supabase/api/content_page";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Calculator,
  Clock,
  BarChart3,
  Beaker,
} from "lucide-react";
import { cache } from "react";
import { createBreadcrumbSchema, createFAQSchema, createMetadata, createWebPageSchema } from "@/lib/seo";
import Script from "next/script";

const getVsActPage = cache(async () => {
  const supabase = await createClient();
  return getContentPage(supabase, "comparison", "vs-act");
});


type ComparisonRow = { feature: string; sat: string; act: string };
type Faq = { q: string; a: string };

const iconMap: Record<string, React.ReactNode> = {
  "Total Time": <Clock className="w-4 h-4" />,
  Sections: <BarChart3 className="w-4 h-4" />,
  Math: <Calculator className="w-4 h-4" />,
  Science: <Beaker className="w-4 h-4" />,
  Scoring: <CheckCircle2 className="w-4 h-4" />,
  "Time per Question": <Clock className="w-4 h-4" />,
};

export async function generateMetadata() {
  const page = await getVsActPage();

  if (!page) return {};

  return createMetadata({
    title: page.meta_title || page.title,
    description: page.meta_description || page.intro,
    path: "/sat/vs-act",
  });
}

export default async function SatVsActPage() {
  const supabase = await createClient();
  const page = await getContentPage(supabase, "comparison", "vs-act");
  if (!page) notFound();

  const { comparisonTable, keyDifferences, chooseSat, chooseAct, faqs } = page.data as {
    comparisonTable: ComparisonRow[];
    keyDifferences: string[];
    chooseSat: string[];
    chooseAct: string[];
    faqs: Faq[];
  };

  const webPageSchema = createWebPageSchema({
    title: page.meta_title || page.title,
    description: page.meta_description || page.intro,
    path: "/sat/vs-act",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: "Home",
      path: "/",
    },
    {
      name: "SAT",
      path: "/sat",
    },
    {
      name: page.title,
      path: "/sat/vs-act",
    },
  ]);

  const faqSchema = createFAQSchema(
    (faqs ?? []).map((faq) => ({
      question: faq.q,
      answer: faq.a,
    }))
  );

  return (
    <Layout>
      <Script
        id="vs-act-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="vs-act-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="vs-act-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
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
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {page.title || "SAT vs ACT"}
          </h1>
          <p className="text-white/50 text-sm">Which test actually fits you?</p>

          {page.intro && (
            <p className="mt-5 text-white/60 leading-relaxed max-w-2xl text-[15px]">
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick verdict */}
        {(chooseSat.length > 0 || chooseAct.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {chooseSat.length > 0 && (
              <div className="group relative bg-white rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                {/* Left accent line */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full bg-site-secondary opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="pl-2">
                  <h2 className="text-sm font-bold text-site-text mb-4">Pick the SAT if you</h2>
                  <ul className="space-y-2">
                    {chooseSat.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-site-text">
                        <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {chooseAct.length > 0 && (
              <div className="group relative bg-white rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 overflow-hidden">
                {/* Left accent line */}
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full bg-site-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="pl-2">
                  <h2 className="text-sm font-bold text-site-text mb-4">Pick the ACT if you</h2>
                  <ul className="space-y-2">
                    {chooseAct.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-site-text">
                        <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        {comparisonTable.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-site-text mb-4">Side-by-side comparison</h2>

            <div className="bg-white rounded-2xl border border-site-border/60 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 bg-site-highlight border-b border-site-border/60">
                <div className="p-4 text-xs font-bold text-site-muted uppercase tracking-wider">Feature</div>
                <div className="p-4 text-xs font-bold text-site-secondary">SAT</div>
                <div className="p-4 text-xs font-bold text-site-accent">ACT</div>
              </div>

              {comparisonTable.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${i < comparisonTable.length - 1 ? "border-b border-site-border/40" : ""
                    } hover:bg-site-highlight/30 transition-colors`}
                >
                  <div className="p-4 flex items-center gap-2.5">
                    {iconMap[row.feature] ?? <BarChart3 className="w-4 h-4 text-site-muted" />}
                    <span className="text-sm font-medium text-site-text">{row.feature}</span>
                  </div>
                  <div className="p-4 text-sm text-site-text">{row.sat}</div>
                  <div className="p-4 text-sm text-site-text">{row.act}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key differences */}
        {keyDifferences.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-site-text mb-4">Key differences</h2>
            <div className="bg-white rounded-2xl border border-site-border/60 p-6 shadow-sm">
              <ul className="space-y-2.5">
                {keyDifferences.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                    <span className="text-site-text leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shadow-sm">
                <HelpCircle className="w-4 h-4 text-site-accent" />
              </div>
              <h2 className="text-sm font-bold text-site-text">Common questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-site-border/60 p-5 md:p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-site-text mb-2">{faq.q}</h3>
                  <p className="text-xs text-site-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-site-border/60 p-6 md:p-8 shadow-sm">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-sm font-bold text-site-text">The best way to decide?</h2>
            <p className="text-xs text-site-muted mt-2 leading-relaxed">
              Take a free practice test for both. Compare your scores. Go with the one that feels better.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
              >
                Start practicing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sat"
                className="text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
              >
                SAT Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}