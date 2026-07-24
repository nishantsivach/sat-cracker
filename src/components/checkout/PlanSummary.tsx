import { CheckCircle2, Crown } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
};

interface PlanSummaryProps {
  plan: Plan;
}

const premiumFeatures = [
  "Unlimited AI SAT Tutor",
  "Complete SAT Courses",
  "Video Lessons",
  "Unlimited Practice Questions",
  "Full-Length Mock Tests",
  "Detailed Answer Explanations",
  "Advanced Performance Analytics",
  "Priority Access to New Features",
];

const freeFeatures = [
  "SAT Guide",
  "Blog Articles",
  "Free Practice Questions",
  "20 AI Messages / Day",
  "Preview Lessons",
  "Selected Mock Tests",
];

export default function PlanSummary({ plan }: PlanSummaryProps) {
  const features = plan.id === "free" ? freeFeatures : premiumFeatures;

  return (
    <div className="rounded-2xl border border-site-border bg-white p-6 md:p-8">
      {/* Plan header */}
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-site-accent/10 flex items-center justify-center shrink-0">
          <Crown className="w-5 h-5 text-site-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-site-text">{plan.name}</h2>
          <p className="text-sm text-site-muted mt-0.5">{plan.description}</p>
        </div>
      </div>

      {/* Price */}
      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-black text-site-text">
          ${plan.price}
        </span>
        <span className="text-sm text-site-muted">{plan.period}</span>
      </div>

      <div className="my-6 border-t border-site-border" />

      {/* Features */}
      <h3 className="text-sm font-bold text-site-text mb-4">
        What&apos;s included
      </h3>

      <ul className="space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-site-success shrink-0" />
            <span className="text-sm text-site-text leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}