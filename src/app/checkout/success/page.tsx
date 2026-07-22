import Link from "next/link";
import { Layout } from "@/components";
import { CheckCircle2, ArrowRight, BookOpen, Sparkles, Zap } from "lucide-react";

export const metadata = {
  title: "Subscription Activated | SATCracker",
  description:
    "Your SATCracker Premium subscription has been activated successfully.",
};

export default function CheckoutSuccessPage() {
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

        <div className="relative max-w-2xl mx-auto px-6 py-14 md:py-18 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-site-success/15 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-site-success" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            You&apos;re all set! 🎉
          </h1>
          <p className="text-white/60 leading-relaxed text-[15px] max-w-md mx-auto">
            Your Premium subscription is now active. You have full access to AI tutoring, complete courses, and mock tests.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        {/* Benefits */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-site-border p-5">
            <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-site-accent" />
            </div>
            <h3 className="font-bold text-site-text text-sm mb-1">Unlimited AI Tutor</h3>
            <p className="text-xs text-site-muted leading-relaxed">
              Ask unlimited SAT questions anytime.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-site-border p-5">
            <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-site-accent" />
            </div>
            <h3 className="font-bold text-site-text text-sm mb-1">Complete SAT Courses</h3>
            <p className="text-xs text-site-muted leading-relaxed">
              Unlock every lesson and premium resource.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/practice"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm hover:brightness-105 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Start practicing
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border bg-white rounded-xl px-6 py-3 font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
          >
            Go to dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}