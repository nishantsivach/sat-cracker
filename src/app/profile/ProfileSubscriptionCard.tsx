"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Crown, Sparkles, AlertTriangle, RotateCcw, ArrowRight, Loader2 } from "lucide-react";

const PLAN_LABEL: Record<string, string> = {
  free: "Free Plan",
  premium_monthly: "Premium Monthly",
  premium_yearly: "Premium Yearly",
};

export default function ProfileSubscriptionCard({
  plan,
  status,
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: {
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPremium = plan !== "free";
  const endDate = currentPeriodEnd
    ? new Date(currentPeriodEnd).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  const cancel = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ immediate: false }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Couldn't cancel");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  const reactivate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout/reactivate", { method: "POST" });
      if (!res.ok) throw new Error((await res.json()).error ?? "Couldn't reactivate");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-site-border p-6">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg font-bold text-site-text">Your plan</h2>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
            isPremium ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-site-highlight text-site-muted"
          }`}
        >
          <Crown className="w-3 h-3" />
          {PLAN_LABEL[plan] ?? plan}
        </span>
      </div>

      {!isPremium && (
        <>
          <p className="text-sm text-site-muted mt-3 mb-4">
            You&apos;re on the Free plan — upgrade for unlimited AI Tutor messages, every course, and all mock tests.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            View Premium plans
            <ArrowRight className="w-4 h-4" />
          </Link>
        </>
      )}

      {isPremium && cancelAtPeriodEnd && (
        <div className="mt-3">
          <p className="text-sm text-amber-700 flex items-center gap-1.5 mb-3">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Your plan ends {endDate ?? "soon"} — you&apos;ll keep full access until then.
          </p>
          <button
            onClick={reactivate}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-site-secondary hover:text-site-primary transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            Reactivate subscription
          </button>
        </div>
      )}

      {isPremium && !cancelAtPeriodEnd && status === "past_due" && (
        <p className="text-sm text-amber-700 flex items-center gap-1.5 mt-3">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          There&apos;s a payment issue on your account — access continues while we retry.
        </p>
      )}

      {isPremium && !cancelAtPeriodEnd && status !== "past_due" && (
        <div className="mt-3">
          {endDate && <p className="text-sm text-site-muted mb-3">Renews {endDate}</p>}
          {confirming ? (
            <div className="flex items-center gap-3">
              <button
                onClick={cancel}
                disabled={loading}
                className="text-sm font-bold text-red-500 hover:text-red-600 disabled:opacity-50"
              >
                {loading ? "Canceling..." : "Confirm cancel"}
              </button>
              <button onClick={() => setConfirming(false)} className="text-sm text-site-muted hover:text-site-text">
                Never mind
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="text-sm font-semibold text-site-muted hover:text-site-text underline underline-offset-2 transition-colors"
            >
              Cancel subscription
            </button>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
    </div>
  );
}