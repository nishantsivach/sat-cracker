"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
};

interface CheckoutActionsProps {
  plan: Plan;
}

export default function CheckoutActions({ plan }: CheckoutActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push(`/checkout/success?plan=${plan.id}`);
  };

  return (
    <div className="rounded-2xl border border-site-border bg-white p-6 md:p-7">
      <h3 className="text-base font-bold text-site-text">Complete checkout</h3>
      <p className="mt-1.5 text-xs text-site-muted leading-relaxed">
        Payment processing coming soon. You&apos;ll be redirected to a secure gateway in a future release.
      </p>

      <button
        onClick={handleContinue}
        disabled={loading}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-site-primary px-6 py-3 text-sm font-bold text-white hover:bg-site-primary/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            Continue to payment
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <Link
        href="/pricing"
        className="mt-3 flex w-full items-center justify-center rounded-xl border border-site-border px-6 py-2.5 text-sm font-semibold text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
      >
        Back to pricing
      </Link>

      <button
        onClick={() => router.push("/checkout/cancel")}
        className="mt-2 w-full text-center text-xs text-site-muted hover:text-site-text transition-colors cursor-pointer"
      >
        Cancel checkout
      </button>

      <div className="mt-6 pt-5 border-t border-site-border flex items-center justify-center gap-1.5 text-xs text-site-muted">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Secured by SSL encryption</span>
      </div>
    </div>
  );
}