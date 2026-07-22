import { Layout } from "@/components";
import {
  PricingHero,
  PricingCards,
  PricingComparison,
  PricingFAQ,
  PricingCTA,
} from "@/components/pricing";

export const metadata = {
  title: "SAT Pricing | Premium SAT Prep Plans | SATCracker",
  description:
    "Compare SATCracker Free and Premium plans. Unlock unlimited AI SAT tutoring, full SAT courses, practice tests, and advanced analytics.",
};

export default function PricingPage() {
  return (
    <Layout>
      <PricingHero />
      <PricingCards />
      <PricingComparison />
      <PricingFAQ />
      <PricingCTA />
    </Layout>
  );
}