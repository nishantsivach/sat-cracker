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
  Brain,
  Beaker,
  Calculator,
  Clock,
  BarChart3,
} from "lucide-react";

type ComparisonRow = { feature: string; sat: string; act: string };
type Faq = { q: string; a: string };

const iconMap: Record<string, React.ReactNode> = {
  "Total Time": <Clock className="w-4 h-4" />,
  Sections: <Brain className="w-4 h-4" />,
  Math: <Calculator className="w-4 h-4" />,
  Science: <Beaker className="w-4 h-4" />,
  Scoring: <CheckCircle2 className="w-4 h-4" />,
  "Time per Question": <Clock className="w-4 h-4" />,
};

export async function generateMetadata() {
  const supabase = await createClient();
  const page = await getContentPage(supabase, "comparison", "vs-act");
  if (!page) return {};
  return { title: page.meta_title, description: page.meta_description };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
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
          <p className="text-white/50 text-sm">
            Which test actually fits you?
          </p>

          {page.intro && (
            <p className="mt-5 text-white/60 leading-relaxed max-w-2xl text-[15px]">
              {page.intro}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        {/* Quick verdict */}
        {(chooseSat.length > 0 || chooseAct.length > 0) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            {chooseSat.length > 0 && (
              <div className="bg-white rounded-2xl border border-site-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                    <Brain className="w-5 h-5 text-site-secondary" />
                  </div>
                  <h2 className="font-bold text-site-text">Pick the SAT if you</h2>
                </div>
                <ul className="space-y-2 text-sm text-site-muted">
                  {chooseSat.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {chooseAct.length > 0 && (
              <div className="bg-white rounded-2xl border border-site-border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                    <Beaker className="w-5 h-5 text-site-accent" />
                  </div>
                  <h2 className="font-bold text-site-text">Pick the ACT if you</h2>
                </div>
                <ul className="space-y-2 text-sm text-site-muted">
                  {chooseAct.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Comparison table */}
        {comparisonTable.length > 0 && (
          <div className="mb-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-site-text">
                Side-by-side comparison
              </h2>
              <p className="text-sm text-site-muted mt-1">
                The details that actually matter
              </p>
            </div>

            <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-site-highlight border-b border-site-border">
                <div className="p-4 text-sm font-bold text-site-muted uppercase tracking-wider">
                  Feature
                </div>
                <div className="p-4 text-sm font-bold text-site-secondary">SAT</div>
                <div className="p-4 text-sm font-bold text-site-accent">ACT</div>
              </div>

              {comparisonTable.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${
                    i < comparisonTable.length - 1 ? "border-b border-site-border" : ""
                  }`}
                >
                  <div className="p-4 flex items-center gap-2.5">
                    {iconMap[row.feature] ?? <BarChart3 className="w-4 h-4 text-site-muted" />}
                    <span className="text-sm font-medium text-site-text">
                      {row.feature}
                    </span>
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
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-site-text mb-5">
              Key differences
            </h2>
            <div className="bg-white rounded-2xl border border-site-border p-6">
              <ul className="space-y-3">
                {keyDifferences.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-site-text leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* FAQ */}
        {faqs.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-5 h-5 text-site-accent" />
              <h2 className="text-2xl font-bold text-site-text">
                Common questions
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-site-border p-5 md:p-6"
                >
                  <h3 className="font-bold text-site-text mb-2">{faq.q}</h3>
                  <p className="text-sm text-site-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-site-highlight rounded-2xl border border-site-border p-6 md:p-8">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-site-text">
              The best way to decide?
            </h2>
            <p className="text-sm text-site-muted mt-2 leading-relaxed">
              Take a free practice test for both. Compare your scores. Go with
              the one that feels better. Overthinking it is the only wrong move.
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