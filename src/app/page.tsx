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

export default async function LandingPage() {
  const supabase = await createClient();

  const { data: blogs } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  return (
    <Layout>
      <Hero />

      <HowItWorks />

      <SatSections />

      <Features />

      <Blogs blogs={blogs ?? []} />

      <Testimonials />

      <FAQ />

      <FinalCTA />
    </Layout>
  );
}
