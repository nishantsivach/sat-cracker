"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/client";
import { getContentPage } from "@/utils/supabase/api/content_page";
import {
  ArrowLeft,
  Plus,
  Minus,
  HelpCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

type FaqItem = { q: string; a: string };

export default function SatFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [page, setPage] = useState<{
    title: string;
    meta_title: string;
    meta_description: string;
    data: { items: FaqItem[] };
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useState(() => {
    async function loadPage() {
      const supabase = createClient();
      const data = await getContentPage(supabase, "faq", "faq");
      setPage(data);
      setLoading(false);
    }
    loadPage();
  });

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-site-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!page) notFound();

  const items = page.data?.items ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
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

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {page.title || "SAT FAQ"}
              </h1>
              <p className="text-white/50 text-sm mt-0.5">
                Straight answers to common questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
              <HelpCircle className="w-7 h-7 text-site-muted" />
            </div>
            <p className="text-site-muted">No FAQs available yet.</p>
          </div>
        ) : (
          <div className="space-y-3" role="region" aria-label="Frequently asked questions">
            {items.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 ${
                  openIndex === index
                    ? "bg-white border-site-accent/20 shadow-lg shadow-site-accent/5"
                    : "bg-white/60 border-site-border hover:border-site-accent/20 hover:bg-white"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer"
                >
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                      openIndex === index ? "text-site-primary" : "text-site-text"
                    }`}
                  >
                    {faq.q}
                  </span>

                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      openIndex === index
                        ? "bg-site-accent text-white rotate-180"
                        : "bg-site-highlight text-site-muted hover:bg-site-accent/10 hover:text-site-primary"
                    }`}
                    aria-hidden="true"
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className={`grid transition-all duration-200 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-[15px] text-site-muted leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-white rounded-2xl border border-site-border text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-site-accent" />
            <p className="text-sm font-semibold text-site-text">
              Still have questions?
            </p>
          </div>
          <p className="text-sm text-site-muted mb-4">
            We read and reply to every message — no bots.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
            >
              Get in touch
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
      </section>
    </Layout>
  );
}