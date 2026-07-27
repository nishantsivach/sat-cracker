import { notFound } from "next/navigation";
import { Layout } from "@/components";
import {
  PlanSummary,
  OrderSummary,
  CheckoutActions,
} from "@/components/checkout";
import { checkoutPlans } from "@/components/checkout/data";
import { ShieldCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";

type PageProps = {
  searchParams: Promise<{
    plan?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Checkout",
  description:
    "Complete your SATCracker Premium subscription and unlock unlimited AI tutoring, SAT courses, mock tests, and more.",
  path: "/checkout",
  noIndex: true,
});

export default async function CheckoutPage({
  searchParams,
}: PageProps) {
  const { plan = "monthly" } = await searchParams;

  const selectedPlan =
    checkoutPlans[plan as keyof typeof checkoutPlans];

  if (!selectedPlan) {
    notFound();
  }

  return (
    <Layout>
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

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Secure Checkout
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Complete your subscription
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            One step away from unlimited AI tutoring, complete courses, and full mock tests.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] items-start">
          {/* Left */}
          <PlanSummary plan={selectedPlan} />

          {/* Right — entire column sticky */}
          <div className="sticky top-24 space-y-6">
            <OrderSummary plan={selectedPlan} />
            <CheckoutActions plan={selectedPlan} />
          </div>
        </div>
      </section>
    </Layout>
  );
}