import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Crown } from "lucide-react";

const premiumFeatures = [
    "Unlimited AI SAT Tutor",
    "Complete SAT courses with video lessons",
    "Full-length SAT practice tests",
    "Detailed answer explanations",
    "Advanced performance analytics",
    "Early access to new resources",
];

const plans = [
    { label: "Free", href: "/practice", featured: false },
    { label: "Monthly", href: "/pricing", featured: true },
    { label: "Yearly", href: "/pricing", featured: false },
];

export default function PremiumSection() {
    return (
        <section className="relative py-28 bg-site-primary text-white overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-site-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6">
                <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-center">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                            <Crown className="w-3.5 h-3.5 text-site-accent" />
                            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
                                Premium
                            </span>
                        </div>

                        <h2 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.08] tracking-tight">
                            Unlock your full
                            <br />
                            <span className="text-site-accent">SAT potential.</span>
                        </h2>

                        <p className="mt-5 text-white/50 text-[15px] leading-relaxed max-w-lg">
                            Start free, upgrade when ready. Premium gives you unlimited AI tutoring, complete courses, full mock tests, and insights that actually help.
                        </p>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <Link
                                href="/pricing"
                                className="group inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                            >
                                <Zap className="w-4 h-4" />
                                Explore plans
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/practice"
                                className="inline-flex items-center px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium cursor-pointer"
                            >
                                Start free
                            </Link>
                        </div>
                    </div>

                    {/* Right — Glass card */}
                    <div className="relative">
                        {/* Stacked shadow cards behind */}
                        <div className="absolute inset-0 bg-white/[0.02] rounded-3xl translate-x-3 translate-y-3" />
                        <div className="absolute inset-0 bg-white/[0.04] rounded-3xl translate-x-1.5 translate-y-1.5" />

                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-2xl p-6 md:p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]">
                            {/* Top shine */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            <div className="flex items-center gap-2 mb-5">
                                <div className="w-8 h-8 rounded-lg bg-site-accent/15 flex items-center justify-center shadow-sm">
                                    <Sparkles className="w-4 h-4 text-site-accent" />
                                </div>
                                <h3 className="text-sm font-bold">Everything in Premium</h3>
                            </div>

                            <div className="space-y-3">
                                {premiumFeatures.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-site-success shrink-0 mt-0.5" />
                                        <span className="text-sm text-white/70 leading-relaxed">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Plan selector */}
                            <div className="mt-6 pt-5 border-t border-white/10">
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-3">
                                    Choose your plan
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {plans.map((plan) => (
                                        <Link
                                            key={plan.label}
                                            href={plan.href}
                                            className={`rounded-xl p-2.5 text-center transition-all cursor-pointer ${
                                                plan.featured
                                                    ? "bg-site-accent text-site-primary font-bold shadow-lg shadow-site-accent/20"
                                                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                                            }`}
                                        >
                                            <p className="text-xs font-semibold">{plan.label}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}