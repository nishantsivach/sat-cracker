import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";

import {
  Hero,
  HowItWorks,
  SatSections,
  Features,
  Blogs,
  Testimonials,
  FAQ,
  FinalCTA,
} from "@/components/landing";
import PremiumSection from "@/components/landing/PremiumSection";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { createMetadata, createOrganizationSchema, createWebPageSchema } from "@/lib/seo";
import Script from "next/script";

export const metadata = createMetadata({
  title: "AI-Powered SAT Prep | Practice Smarter",
  description:
    "Prepare for the SAT with AI-powered explanations, adaptive practice questions, and real progress tracking. 25,000+ students already prep smarter with SATCracker.",
  path: "/",
});

export default async function LandingPage() {
  const supabase = await createClient();


  const { data: rawBlogs } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  const blogs = (rawBlogs ?? []).map((b) => ({
    ...b,
    content: b.content?.slice(0, 300) ?? "",
  }));

  const organizationSchema = createOrganizationSchema();

  const webPageSchema = createWebPageSchema({
    title: "AI-Powered SAT Prep | Practice Smarter",
    description:
      "Prepare for the SAT with AI-powered explanations, adaptive practice questions, and real progress tracking. 25,000+ students already prep smarter with SATCracker.",
    path: "/",
  });
  return (
    <Layout>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />
      <Hero />

      <RevealOnScroll>
        <HowItWorks />
      </RevealOnScroll>

      <RevealOnScroll>
        <SatSections />
      </RevealOnScroll>

      <RevealOnScroll>
        <Features />
      </RevealOnScroll>

      <RevealOnScroll>
        <PremiumSection />
      </RevealOnScroll>

      <RevealOnScroll>
        <Blogs blogs={blogs} />
      </RevealOnScroll>

      <RevealOnScroll>
        <Testimonials />
      </RevealOnScroll>

      <RevealOnScroll>
        <FAQ />
      </RevealOnScroll>

      <RevealOnScroll>
        <FinalCTA />
      </RevealOnScroll>
    </Layout>
  );
}
