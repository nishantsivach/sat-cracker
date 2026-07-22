import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Plan = {
    id: string;
    name: string;
    price: string;
    period: string;
    description: string;
    button: string;
    featured: boolean;
    badge?: string;
    features: string[];
};

interface PlanCardProps {
    plan: Plan;
    currentPlan: string;
}

export default function PlanCard({ plan, currentPlan }: PlanCardProps) {
    const isCurrentPlan = currentPlan === plan.id;

    return (
        <div
            className={`relative flex flex-col rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
                plan.featured
                    ? "border-site-accent bg-site-primary text-white shadow-lg shadow-site-accent/15 scale-[1.02]"
                    : isCurrentPlan
                    ? "border-site-border bg-white ring-2 ring-site-success/20"
                    : "border-site-border bg-white hover:border-site-accent/20 hover:shadow-md"
            }`}
        >
            {/* Badge */}
            {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-site-accent px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-site-primary shadow-md">
                        {plan.badge}
                    </span>
                </div>
            )}

            {/* Current plan indicator */}
            {isCurrentPlan && (
                <div className="absolute top-3 right-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-site-success/10 border border-site-success/20 px-2.5 py-1 text-[10px] font-bold text-site-success">
                        <CheckCircle2 className="w-3 h-3" />
                        Current
                    </span>
                </div>
            )}

            {/* Plan Name */}
            <h3 className="text-lg font-bold">{plan.name}</h3>

            {/* Description */}
            <p className="mt-2 text-sm leading-relaxed opacity-70">
                {plan.description}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-sm opacity-60">{plan.period}</span>
            </div>

            {/* CTA */}
            {isCurrentPlan ? (
                <div className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-site-success/10 border border-site-success/20 px-5 py-2.5 text-sm font-bold text-site-success cursor-default">
                    <CheckCircle2 className="w-4 h-4" />
                    Current plan
                </div>
            ) : (
                <Link
                    href={plan.id === "free" ? "/practice" : `/checkout?plan=${plan.id}`}
                    className={`group mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                        plan.featured
                            ? "bg-site-accent text-site-primary hover:brightness-105"
                            : "bg-site-primary text-white hover:bg-site-primary/95"
                    }`}
                >
                    {plan.button}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            )}

            {/* Divider */}
            <div
                className={`my-6 border-t ${
                    plan.featured ? "border-white/10" : "border-site-border"
                }`}
            />

            {/* Features */}
            <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2
                            className={`mt-0.5 h-4 w-4 shrink-0 ${
                                plan.featured ? "text-site-accent" : "text-site-success"
                            }`}
                        />
                        <span className="text-sm leading-relaxed opacity-80">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}