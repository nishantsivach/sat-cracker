import { ShieldCheck, Receipt } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
};

interface OrderSummaryProps {
  plan: Plan;
}

export default function OrderSummary({ plan }: OrderSummaryProps) {
  const total = plan.price;

  return (
    <div className="rounded-2xl border border-site-border bg-white p-6 md:p-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shrink-0">
          <Receipt className="w-5 h-5 text-site-accent" />
        </div>
        <div>
          <h2 className="text-base font-bold text-site-text">Order summary</h2>
          <p className="text-xs text-site-muted mt-0.5">Review your subscription</p>
        </div>
      </div>

      {/* Line items */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-site-muted">Plan</span>
          <span className="text-sm font-semibold text-site-text">{plan.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-site-muted">Billing</span>
          <span className="text-sm text-site-text">
            {plan.period === "Forever" ? "One time" : plan.period.replace("/", "")}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-site-muted">Subtotal</span>
          <span className="text-sm text-site-text">${plan.price}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-site-muted">Tax</span>
          <span className="text-sm text-site-text">$0</span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-site-border" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-site-text">Total</span>
        <span className="text-2xl font-black text-site-text">${total}</span>
      </div>

      {plan.id !== "free" && (
        <p className="mt-1.5 text-xs text-site-muted">
          Renews every {plan.period.replace("/", "")}
        </p>
      )}

      {/* Trust */}
      <div className="mt-6 rounded-xl bg-site-highlight p-4">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 text-site-success shrink-0" />
          <div>
            <p className="text-xs font-semibold text-site-text">Secure checkout</p>
            <p className="mt-0.5 text-xs text-site-muted leading-relaxed">
              Payment processing coming soon. You&apos;ll be redirected to a secure gateway in a future release.
            </p>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-4 space-y-1.5 text-xs text-site-muted">
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-site-success" />
          Cancel anytime
        </p>
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-site-success" />
          Instant activation
        </p>
        <p className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-site-success" />
          Progress saved forever
        </p>
      </div>
    </div>
  );
}