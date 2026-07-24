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

export const metadata = {
  title: "SAT Pricing | Premium SAT Prep Plans | SATCracker",
  description:
    "Compare SATCracker Free and Premium plans. Unlock unlimited AI SAT tutoring, full SAT courses, practice tests, and advanced analytics.",
};

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