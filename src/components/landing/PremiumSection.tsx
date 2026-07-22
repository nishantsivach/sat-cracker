import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Zap, Crown } from "lucide-react";

const premiumFeatures = [
    "Unlimited AI SAT Tutor",
    "Complete SAT Courses with Video Lessons",
    "Full-Length SAT Practice Tests",
    "Detailed Answer Explanations",
    "Advanced SAT Performance Analytics",
    "Early Access to New SAT Resources",
];

const plans = [
    { label: "Free", href: "/practice", featured: false },
    { label: "Monthly", href: "/pricing", featured: true },
    { label: "Yearly", href: "/pricing", featured: false },
];

export const metadata = {
    title: "SAT Pricing | Premium SAT Prep Plans | SATCracker",
    description:
        "Compare SATCracker Free and Premium plans. Get unlimited AI SAT tutoring, full SAT courses, practice tests, analytics, and more.",
};

export default function PremiumSection() {
    return (
        <section className="relative py-28 bg-site-primary text-white overflow-hidden">
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, white 1.5px, transparent 1.5px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-site-secondary/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                    {/* Left */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                            <Crown className="w-3.5 h-3.5 text-site-accent" />
                            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
                                Premium
                            </span>
                        </div>

                        <h2 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.08] tracking-tight">
                            Everything You Need to
                            <br />
                            <span className="text-site-accent">
                                Achieve Your Target SAT Score
                            </span>
                        </h2>

                        <p className="mt-5 text-lg text-white/60 leading-relaxed max-w-lg">
                            Prepare for the SAT with unlimited AI tutoring, comprehensive SAT courses,
                            full-length practice tests, detailed answer explanations, and performance
                            insights designed to help you achieve your target SAT score.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="/pricing"
                                className="group inline-flex items-center gap-2 bg-site-accent text-site-primary px-6 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                            >
                                <Zap className="w-4 h-4" />
                                View Pricing
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/practice"
                                className="inline-flex items-center px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all text-sm font-medium cursor-pointer"
                            >
                                Start free
                            </Link>
                        </div>
                    </div>

                    <div className="relative">

                        <div className="absolute inset-0 bg-white/[0.03] rounded-3xl translate-x-3 translate-y-3" />
                        <div className="absolute inset-0 bg-white/[0.06] rounded-3xl translate-x-1.5 translate-y-1.5" />

                        <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                            <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="w-4 h-4 text-site-accent" />
                                <h3 className="text-lg font-bold">Everything in Premium</h3>
                            </div>

                            <div className="space-y-4">
                                {premiumFeatures.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-site-success shrink-0 mt-0.5" />
                                        <span className="text-sm text-white/80 leading-relaxed">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Plan selector */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">
                                    Choose your plan
                                </p>
                                <div className="grid grid-cols-3 gap-2">
                                    {plans.map((plan) => (
                                        <Link
                                            key={plan.label}
                                            href={plan.href}
                                            className={`rounded-xl p-3 text-center transition-all cursor-pointer ${plan.featured
                                                    ? "bg-site-accent text-site-primary font-bold shadow-lg shadow-site-accent/20"
                                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
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