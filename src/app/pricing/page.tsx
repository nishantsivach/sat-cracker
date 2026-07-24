import { Layout } from "@/components";
import {
  PricingHero,
  PricingCards,
  PricingComparison,
  PricingFAQ,
  PricingCTA,
} from "@/components/pricing";
import { getSubscription } from "@/utils/supabase/api/subscription";
import { createClient } from "@/utils/supabase/server";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "SAT Pricing Plans | Premium SAT Prep | SATCracker",
  description:
    "Compare SATCracker pricing plans and unlock premium SAT prep features including AI tutoring, SAT courses, practice tests, and progress analytics.",
  path: "/pricing",
});

export default async function PricingPage() {

    const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const subscription = user
    ? await getSubscription(supabase, user.id)
    : null;


  return (
    <Layout>
      <PricingHero />
      <PricingCards currentPlan={subscription?.plan ?? "free"} />
      <PricingComparison />
      <PricingFAQ />
      <PricingCTA />
    </Layout>
  );
}