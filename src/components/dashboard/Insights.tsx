"use client";

import { Brain, TrendingUp, AlertTriangle, Target } from "lucide-react";

type Props = {
  overallAccuracy: number;
  streak: number;
  weakestTopic?: string;
  bestTopic?: string;
};

export default function Insights({ overallAccuracy, streak, weakestTopic }: Props) {
  const insights = [
    {
      icon: TrendingUp,
      color: "text-site-success bg-green-50",
      title: "Performance",
      text:
        overallAccuracy >= 80
          ? "Excellent consistency. Keep practicing to stay above 80%."
          : overallAccuracy >= 60
          ? "You're improving steadily. Focused sessions can push you past 80%."
          : "Focus on fundamentals before increasing question volume.",
    },
    {
      icon: AlertTriangle,
      color: "text-site-error bg-red-50",
      title: "Focus area",
      text: weakestTopic
        ? `Spend 15–20 minutes on ${weakestTopic}. It currently needs the most attention.`
        : "Complete more practice to identify your weakest topic.",
    },
    {
      icon: Target,
      color: "text-site-secondary bg-site-secondary/10",
      title: "Next goal",
      text:
        streak >= 7
          ? "Maintain your streak and try a full-length SAT test."
          : `Reach a ${Math.max(streak + 1, 7)}-day streak to build a consistent habit.`,
    },
  ];

  return (
    <div className="relative bg-white rounded-3xl border border-site-border/60 p-6 md:p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-accent/20 to-transparent" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shadow-sm">
          <Brain className="w-5 h-5 text-site-accent" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-site-text">Study insights</h2>
          <p className="text-xs text-site-muted mt-0.5">Personalized recommendations</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl bg-site-highlight/50 p-4">
              <div className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center shrink-0 shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-site-text">{item.title}</h3>
                  <p className="mt-1 text-xs text-site-muted leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}