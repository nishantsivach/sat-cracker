import Link from "next/link";
import { Layout } from "@/components";
import { ArrowLeft, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Checkout Cancelled | SATCracker",
  description:
    "Your Premium checkout was cancelled. You can continue preparing for the SAT with the Free plan or upgrade anytime.",
};

export default function CheckoutCancelPage() {
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
          <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-6">
            <CreditCard className="w-8 h-8 text-site-accent" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Checkout cancelled
          </h1>
          <p className="text-white/60 leading-relaxed text-[15px] max-w-md mx-auto">
            No payment was processed. Your account and progress remain exactly as they were.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        {/* Info card */}
        <div className="bg-white rounded-2xl border border-site-border p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <h3 className="font-bold text-site-text text-sm mb-1">Your progress is safe</h3>
              <p className="text-xs text-site-muted leading-relaxed">
                Your account, SAT progress, completed lessons, and practice history remain available. You can upgrade to Premium anytime from your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/pricing"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer"
          >
            View plans
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/practice"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border bg-white rounded-xl px-6 py-3 font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
          >
            Continue free
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-site-muted hover:text-site-text transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to home
          </Link>
        </div>
      </section>
    </Layout>
  );
}