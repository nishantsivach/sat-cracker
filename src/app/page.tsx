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
  title: "SAT Prep Courses, AI Tutor & Practice Tests | SATCracker",
  description:
    "Master the SAT with AI tutoring, adaptive practice, courses, and mock tests. SATCracker helps students improve scores with smarter preparation.",
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
  title: "SAT Prep Courses, AI Tutor & Practice Tests | SATCracker",
  description:
    "Master the SAT with AI tutoring, adaptive practice, courses, and mock tests. SATCracker helps students improve scores with smarter preparation.",
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
