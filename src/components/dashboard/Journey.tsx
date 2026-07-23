"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Flame, Target, TrendingUp, Zap } from "lucide-react";

type Props = {
  overallAccuracy: number;
  totalAttempts: number;
  streak: number;
  weakestTopic?: string;
};

export default function Journey({ overallAccuracy, totalAttempts, streak, weakestTopic }: Props) {
  const estimatedScore = Math.min(1600, Math.round(900 + overallAccuracy * 7.5));
  const weeklyGoal = Math.min(100, Math.round((totalAttempts / 300) * 100));

  return (
    <section className="max-w-5xl mx-auto px-6 mt-10 mb-16">
      <div className="relative overflow-hidden rounded-3xl bg-site-primary text-white border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-site-accent/8 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <Zap className="w-3.5 h-3.5 text-site-accent" />
                <span className="text-xs font-bold tracking-wider uppercase text-site-accent">Your journey</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">Keep building momentum</h2>
              <p className="mt-3 text-white/50 text-[15px] max-w-lg leading-relaxed">
                Every practice session improves your SAT score. Stay consistent and keep moving toward your goal.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                  <TrendingUp className="w-5 h-5 text-site-accent mb-3" />
                  <p className="text-xs text-white/40">Est. SAT Score</p>
                  <p className="text-3xl font-black mt-1">{estimatedScore}</p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
                  <Flame className="w-5 h-5 text-orange-400 mb-3" />
                  <p className="text-xs text-white/40">Streak</p>
                  <p className="text-3xl font-black mt-1">{streak} days</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[340px]">
              <div className="rounded-2xl bg-white text-site-text p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shadow-sm">
                    <Target className="w-4 h-4 text-site-accent" />
                  </div>
                  <h3 className="text-sm font-bold">Today&apos;s goal</h3>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-site-muted">Weekly goal</span>
                    <span className="font-semibold text-site-text">{weeklyGoal}%</span>
                  </div>
                  <div className="h-2 bg-site-highlight rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-site-accent/70 to-site-accent rounded-full" style={{ width: `${weeklyGoal}%` }} />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex gap-3">
                    <Calendar className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-site-text">Practice today</p>
                      <p className="text-xs text-site-muted">Solve 20 SAT questions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Target className="w-4 h-4 text-site-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-site-text">Focus topic</p>
                      <p className="text-xs text-site-muted">{weakestTopic ?? "Start practicing"}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/practice"
                  className="flex items-center justify-center gap-2 bg-site-primary text-white rounded-xl py-2.5 text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
                >
                  Continue practice
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}