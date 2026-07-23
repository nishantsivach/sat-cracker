import Link from "next/link";
import { ArrowRight, Crown, ShieldCheck } from "lucide-react";

export default function PricingHero() {
  return (
    <section className="relative overflow-hidden bg-site-primary text-white">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-6 py-14 md:py-18">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
          <Crown className="w-3.5 h-3.5 text-site-accent" />
          <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
            Pricing
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Simple pricing for
          <br />
          <span className="text-site-accent">serious SAT prep.</span>
        </h1>

        {/* Description */}
        <p className="mt-4 text-white/60 leading-relaxed max-w-xl text-[15px]">
          Start free, upgrade when ready. Premium unlocks unlimited AI tutoring, complete courses, full mock tests, and advanced insights.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="#plans"
            className="group inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            Compare plans
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/practice"
            className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium cursor-pointer"
          >
            Start free
          </Link>

          <span className="flex items-center gap-1.5 text-xs text-white/35 ml-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  );
}