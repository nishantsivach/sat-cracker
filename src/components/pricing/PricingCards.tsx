import PlanCard from "./PlanCard";
import { plans } from "./data";

export default function PricingCards() {
  return (
    <section id="plans" className="py-28 bg-site-background">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-5 border border-site-border">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              Plans
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-text leading-[1.1] tracking-tight">
            Choose your
            <br />
            <span className="text-site-secondary">prep plan.</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl mx-auto">
            Start free, upgrade when ready. Every plan includes access to the core platform with no hidden fees.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-site-muted">
          All plans include future improvements. Upgrade or cancel anytime.
        </p>
      </div>
    </section>
  );
}