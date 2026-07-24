"use client";

import Link from "next/link";
import {
    ArrowRight,
    Crown,
    Flame,
    Sparkles,
    TrendingUp,
    Zap,
    Activity,
} from "lucide-react";

type HeroProps = {
    firstName: string;
    streak: number;
    overallAccuracy: number;
    totalAttempts: number;
    isPremium: boolean;
    planLabel: string;
    masteryPercentage: number;
};

export default function Hero({
    firstName,
    streak,
    overallAccuracy,
    totalAttempts,
    isPremium,
    planLabel,
    masteryPercentage,
}: HeroProps) {
    return (
        <section className="relative overflow-hidden bg-site-primary text-white">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-site-secondary/4 rounded-full blur-3xl translate-y-1/2" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
                <div className="grid gap-10 lg:grid-cols-[1fr_380px] items-center">
                    {/* Left */}
                    <div>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
                            <Activity className="w-3.5 h-3.5 text-site-accent" />
                            <span className="text-xs font-bold tracking-wider uppercase text-site-accent">
                                Dashboard
                            </span>
                            {streak > 0 && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span className="flex items-center gap-1 text-orange-300 text-xs font-semibold">
                                        <Flame className="w-3.5 h-3.5" />
                                        {streak}d streak
                                    </span>
                                </>
                            )}
                        </div>

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                            Hey
                            {firstName
                                ? `, ${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`
                                : ""}
                        </h1>

                        <p className="mt-4 text-white/50 text-[15px] max-w-lg leading-relaxed">
                            Your SAT prep at a glance. Keep pushing forward.
                        </p>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/practice"
                                className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-site-accent/20 cursor-pointer"
                            >
                                <Zap className="w-4 h-4" />
                                Practice
                                <ArrowRight className="w-4 h-4" />
                            </Link>

                            {!isPremium && (
                                <Link
                                    href="/pricing"
                                    className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 transition-all px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Upgrade
                                </Link>
                            )}
                        </div>

                        {/* Quick stats */}
                        <div className="mt-8 flex flex-wrap gap-6">
                            <div>
                                <p className="text-2xl font-black">{totalAttempts.toLocaleString()}</p>
                                <p className="mt-1 text-xs text-white/40">Questions</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black">{overallAccuracy}%</p>
                                <p className="mt-1 text-xs text-white/40">Accuracy</p>
                            </div>
                            <div>
                                <p className="text-2xl font-black">{masteryPercentage}%</p>
                                <p className="mt-1 text-xs text-white/40">Mastered</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Card — Premium Style */}
                    <div className="relative">
                        {/* Stacked shadow cards behind */}
                        <div className="absolute inset-0 bg-white/[0.02] rounded-3xl translate-x-3 translate-y-3" />
                        <div className="absolute inset-0 bg-white/[0.04] rounded-3xl translate-x-1.5 translate-y-1.5" />

                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-2xl p-6 md:p-7 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]">
                            {/* Top shine */}
                            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                            {/* Accuracy */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Accuracy</p>
                                    <p className="mt-1 text-4xl font-black">{overallAccuracy}%</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-site-accent/15 flex items-center justify-center shadow-sm">
                                    <TrendingUp className="w-5 h-5 text-site-accent" />
                                </div>
                            </div>

                            {/* Mastery progress */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-white/40">Mastery</span>
                                    <span className="text-white/60 font-medium">{masteryPercentage}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-site-accent/80 to-site-accent rounded-full transition-all duration-700"
                                        style={{ width: `${masteryPercentage}%` }}
                                    />
                                </div>
                            </div>

                            {/* Plan card */}
                            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${isPremium ? "bg-site-accent/20" : "bg-white/10"}`}>
                                            <Crown className={`w-4 h-4 ${isPremium ? "text-site-accent" : "text-white/50"}`} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Plan</p>
                                            <p className="text-sm font-bold">{planLabel}</p>
                                        </div>
                                    </div>
                                    {isPremium ? (
                                        <span className="text-[10px] font-bold text-site-success bg-green-500/15 px-2.5 py-1 rounded-full border border-green-500/20">
                                            Active
                                        </span>
                                    ) : (
                                        <Link
                                            href="/pricing"
                                            className="text-[10px] font-bold text-site-primary bg-site-accent px-2.5 py-1 rounded-full hover:bg-amber-400 transition-colors cursor-pointer shadow-sm"
                                        >
                                            Upgrade
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}