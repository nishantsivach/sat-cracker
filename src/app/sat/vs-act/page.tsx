import Link from "next/link";
import { Layout } from "@/components";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Brain,
  Beaker,
  Calculator,
  HelpCircle,
} from "lucide-react";

export const metadata = {
  title: "SAT vs ACT: Which Test Is Right for You?",
  description:
    "Compare the SAT and ACT, including sections, timing, scoring, and key differences to choose the right college admission test.",
};

const comparison = [
  {
    feature: "Total Time",
    sat: "2 hours 14 min",
    act: "2 hours 55 min",
    icon: Clock,
  },
  {
    feature: "Sections",
    sat: "Reading & Writing, Math",
    act: "English, Math, Reading, Science",
    icon: Brain,
  },
  {
    feature: "Math",
    sat: "Calculator allowed throughout",
    act: "Calculator with restrictions",
    icon: Calculator,
  },
  {
    feature: "Science",
    sat: "No separate section",
    act: "Dedicated Science section",
    icon: Beaker,
  },
  {
    feature: "Scoring",
    sat: "400 – 1600",
    act: "1 – 36 composite",
    icon: CheckCircle2,
  },
  {
    feature: "Time per Question",
    sat: "~1 minute 11 seconds",
    act: "~49 seconds",
    icon: Clock,
  },
];

const faqs = [
  {
    q: "Is the SAT easier than the ACT?",
    a: "Neither is universally easier. The SAT gives you more time per question — great if you like to think things through. The ACT is faster-paced but questions tend to be more straightforward. Take a practice test for both and see which feels better.",
  },
  {
    q: "Do colleges prefer one over the other?",
    a: "Nope. Every U.S. college that requires test scores accepts both equally. There's zero strategic advantage to picking one. Choose the test that plays to your strengths.",
  },
  {
    q: "Should I take both?",
    a: "Most students don't need to. Take a practice test for each (they're free online), then focus on the one where you score higher relative to your target. Splitting prep time between both usually leads to mediocre scores on both.",
  },
];

export default function SatVsActPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
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
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            SAT vs ACT
          </h1>
          <p className="text-white/50 text-sm">Which test actually fits you?</p>

          <p className="mt-5 text-white/70 leading-relaxed max-w-2xl text-[15px]">
            Both tests get you into college. The difference is in how they test
            you. One gives you time to think. The other rewards speed. Here&apos;s
            the honest comparison so you can pick the right one.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-14">
        {/* Quick verdict */}
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          <div className="bg-white border border-site-border rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                <Brain className="w-5 h-5 text-site-secondary" />
              </div>
              <h2 className="font-bold text-site-text">Pick the SAT if you</h2>
            </div>
            <ul className="space-y-2 text-sm text-site-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Like having time to work through problems
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Prefer a shorter test (2h 14m vs 2h 55m)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Want calculator access for all math
              </li>
            </ul>
          </div>

          <div className="bg-white border border-site-border rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                <Beaker className="w-5 h-5 text-site-accent" />
              </div>
              <h2 className="font-bold text-site-text">Pick the ACT if you</h2>
            </div>
            <ul className="space-y-2 text-sm text-site-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Work well under time pressure
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Enjoy science and data interpretation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                Prefer straightforward questions
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison table */}
        <div className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-site-text">
              Side-by-side comparison
            </h2>
            <p className="text-sm text-site-muted mt-1">
              The details that actually matter
            </p>
          </div>

          <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-site-highlight border-b border-site-border">
              <div className="p-4 text-sm font-bold text-site-muted uppercase tracking-wider">
                Feature
              </div>
              <div className="p-4 text-sm font-bold text-site-secondary">
                SAT
              </div>
              <div className="p-4 text-sm font-bold text-site-accent">
                ACT
              </div>
            </div>

            {/* Table rows */}
            {comparison.map((row, i) => {
              const RowIcon = row.icon;
              return (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${
                    i < comparison.length - 1 ? "border-b border-site-border" : ""
                  }`}
                >
                  <div className="p-4 flex items-center gap-2.5">
                    <RowIcon className="w-4 h-4 text-site-muted" />
                    <span className="text-sm font-medium text-site-text">
                      {row.feature}
                    </span>
                  </div>
                  <div className="p-4 text-sm text-site-text">{row.sat}</div>
                  <div className="p-4 text-sm text-site-text">{row.act}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-14">
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
                className="bg-white border border-site-border rounded-2xl p-5 md:p-6"
              >
                <h3 className="font-bold text-site-text mb-2">{faq.q}</h3>
                <p className="text-sm text-site-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

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
                className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/90 transition-colors"
              >
                Start practicing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sat"
                className="text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors"
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