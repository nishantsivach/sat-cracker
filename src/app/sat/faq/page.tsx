import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { getContentPage } from "@/utils/supabase/api/content_page";
import FaqAccordion from "./FaqAccordion";

import {
  ArrowLeft,
  HelpCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import {
  createMetadata,
  createWebPageSchema,
  createBreadcrumbSchema,
  createFAQSchema,
} from "@/lib/seo";

export async function generateMetadata() {
  const supabase = await createClient();

  const page = await getContentPage(supabase, "faq", "faq");

  if (!page) return {};

  return createMetadata({
    title: page.meta_title || page.title,
    description: page.meta_description || "",
    path: "/sat/faq",
  });
}

export default async function SatFaqPage() {
  const supabase = await createClient();

  const page = await getContentPage(supabase, "faq", "faq");

  if (!page) notFound();

  const items = page.data?.items ?? [];

  const webPageSchema = createWebPageSchema({
    title: page.meta_title || page.title,
    description: page.meta_description,
    path: "/sat/faq",
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
      path: "/sat/faq",
    },
  ]);

  const faqSchema = createFAQSchema(items);
  return (
    <Layout>
      <Script
        id="faq-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="faq-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="faq-schema"
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

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
              <HelpCircle className="w-5 h-5 text-site-accent" />
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {page.title}
              </h1>

              <p className="text-white/50 text-sm mt-0.5">
                Straight answers to common questions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-site-text mb-6">
          Answers to Your Most Common SAT Questions
        </h2>
        <FaqAccordion items={items} />

        {/* Bottom CTA */}
        <div className="mt-10 p-5 bg-white rounded-2xl border border-site-border/60 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-site-accent/10 flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5 text-site-accent" />
            </div>

            <p className="text-sm font-semibold text-site-text">
              Still have questions?
            </p>
          </div>

          <p className="text-xs text-site-muted mb-4">
            We read and reply to every message — no bots.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors"
            >
              Get in touch
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
      </section>
    </Layout>
  );
}