"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components";
import { ArrowLeft, Plus, Minus, HelpCircle } from "lucide-react";

const faqData = {
  title: "SAT FAQ",
  subtitle: "Straight answers to common questions",
  meta_title: "SAT FAQ: Registration, Scoring, Retakes & More",
  meta_description:
    "Answers to the most common SAT questions — registration, scoring, retakes, and how to prepare.",
  items: [
    {
      q: "How is the SAT scored?",
      a: "Two sections — Math and Reading & Writing — each scored from 200 to 800. Add them together and you get your total out of 1600. Right answers earn points. Wrong answers? No penalty. So never leave anything blank.",
    },
    {
      q: "How many times can I take the SAT?",
      a: "As many times as you want. No official limit. Most students take it 2-3 times — once to get a baseline, then again after focused prep. Colleges typically look at your highest score, so retaking usually works in your favor.",
    },
    {
      q: "When should I register?",
      a: "At least 4-6 weeks before your target date. Popular test centers fill up fast, especially in major cities. Late registration exists but costs extra. Don't be that person paying rush fees.",
    },
    {
      q: "Calculator or no calculator?",
      a: "The digital SAT lets you use a calculator for the entire Math section. There's a built-in Desmos calculator on the test, or you can bring your own approved one. Either way, you're covered.",
    },
    {
      q: "What's a good SAT score?",
      a: "Depends on your goals. A 1200 puts you above average nationally. A 1400+ makes you competitive for most universities. For Ivy League schools, aim for 1500+. But 'good' means whatever gets you into your target schools.",
    },
    {
      q: "How long should I prep?",
      a: "Most students need 6-12 weeks of consistent practice. Not cramming — actual spaced-out study sessions. 30-60 minutes a day beats 6 hours every Saturday. Consistency wins every time.",
    },
    {
      q: "SAT vs ACT — which one should I take?",
      a: "SAT gives you more time per question. ACT has a Science section. Take a practice test for both and see which feels better. Colleges don't prefer one over the other, so pick what suits your style.",
    },
    {
      q: "Do colleges still care about the SAT?",
      a: "Many are test-optional, but here's the truth: a strong score still helps. If you can submit a 1400+, it strengthens your application. If your score is below a school's average, focus on other parts of your app.",
    },
  ],
};

export default function SatFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
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

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {faqData.title}
              </h1>
              <p className="text-white/50 text-sm mt-0.5">
                {faqData.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-3">
          {faqData.items.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 ${
                openIndex === index
                  ? "bg-white border-site-accent/20 shadow-lg shadow-site-accent/5"
                  : "bg-white/60 border-site-border hover:border-site-accent/20 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left"
              >
                <span
                  className={`text-base md:text-lg font-semibold pr-8 transition-colors duration-200 ${
                    openIndex === index ? "text-site-primary" : "text-site-text"
                  }`}
                >
                  {faq.q}
                </span>

                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    openIndex === index
                      ? "bg-site-accent text-white rotate-180"
                      : "bg-site-highlight text-site-muted"
                  }`}
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-site-muted leading-relaxed text-[15px]">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-6 bg-site-highlight rounded-2xl border border-site-border text-center">
          <p className="text-site-text font-semibold">
            Still have questions?
          </p>
          <p className="text-sm text-site-muted mt-1">
            Check out the full SAT guide or jump into practice.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <Link
              href="/sat"
              className="text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors"
            >
              SAT Guide →
            </Link>
            <Link
              href="/practice"
              className="text-sm font-semibold text-site-accent hover:text-site-primary transition-colors"
            >
              Start Practicing →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}