import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

export default function PricingCTA() {
  return (
    <section className="relative overflow-hidden bg-site-primary py-20 md:py-24 text-white">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-site-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        {/* Icon */}
        <div className="w-10 h-10 mx-auto rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center mb-5 shadow-sm">
          <Sparkles className="w-4 h-4 text-site-accent" />
        </div>

        {/* Heading */}
        <h2 className="text-[2rem] md:text-[2.5rem] font-black leading-[1.08] tracking-tight">
          Ready to hit your
          <br />
          <span className="text-site-accent">target score?</span>
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-white/40 leading-relaxed text-[15px]">
          AI-powered tutoring, complete courses, full mock tests, and insights designed to get you there.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/checkout"
            className="group inline-flex items-center gap-2 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Get Premium
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/practice"
            className="inline-flex items-center px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium cursor-pointer"
          >
            Start free
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-5 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Instant access
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure checkout
          </span>
        </div>
      </div>
    </section>
  );
}