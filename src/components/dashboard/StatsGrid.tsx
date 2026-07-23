"use client";

import { BookOpen, Crown, Target, TrendingUp } from "lucide-react";

type Props = {
  totalAttempts: number;
  overallAccuracy: number;
  totalTopics: number;
  topicsMastered: number;
  planLabel: string;
  isPremium: boolean;
};

const cards = ({
  totalAttempts,
  overallAccuracy,
  totalTopics,
  topicsMastered,
  planLabel,
  isPremium,
}: Props) => [
  {
    title: "Questions",
    value: totalAttempts.toLocaleString(),
    subtitle: "Keep practicing daily",
    icon: Target,
    color: "text-site-secondary bg-site-secondary/10",
  },
  {
    title: "Accuracy",
    value: `${overallAccuracy}%`,
    subtitle:
      overallAccuracy >= 80
        ? "Excellent"
        : overallAccuracy >= 60
        ? "Good progress"
        : "Keep going",
    icon: TrendingUp,
    color: "text-site-success bg-green-50",
    badge: overallAccuracy >= 70 ? "Great" : undefined,
  },
  {
    title: "Topics",
    value: `${topicsMastered}/${totalTopics}`,
    subtitle: topicsMastered > 0 ? `${topicsMastered} mastered` : "Start practicing",
    icon: BookOpen,
    color: "text-site-accent bg-site-accent/10",
  },
  {
    title: "Plan",
    value: isPremium ? "Premium" : "Free",
    subtitle: planLabel,
    icon: Crown,
    color: isPremium ? "text-site-accent bg-site-accent/10" : "text-site-muted bg-site-highlight",
  },
];

export default function StatsGrid(props: Props) {
  return (
    <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards(props).map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="group relative bg-white rounded-3xl border border-site-border/60 p-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top shine */}
              <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-site-border/40 to-transparent" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-site-muted uppercase tracking-wider">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl ${card.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-site-text tracking-tight">
                  {card.value}
                </p>
                {card.badge && (
                  <span className="text-[10px] font-bold text-site-success bg-green-50 px-2 py-0.5 rounded-full shadow-sm">
                    {card.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-site-muted mt-1.5">{card.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}