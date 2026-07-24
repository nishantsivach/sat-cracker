"use client";

import { motion, type Variants } from "framer-motion";
import { BookOpen, Crown, Target, TrendingUp } from "lucide-react";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

type Props = {
  totalAttempts: number;
  overallAccuracy: number;
  totalTopics: number;
  topicsMastered: number;
  planLabel: string;
  isPremium: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
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
    render: () => (
      <AnimatedNumber value={totalAttempts} />
    ),
    subtitle: "Keep practicing daily",
    icon: Target,
    color: "text-site-secondary bg-site-secondary/10",
  },
  {
    title: "Accuracy",
    render: () => (
      <AnimatedNumber
        value={overallAccuracy}
        format={(n) => `${Math.round(n)}%`}
      />
    ),
    subtitle:
      overallAccuracy >= 80
        ? "Excellent"
        : overallAccuracy >= 60
        ? "Good progress"
        : "Keep going",
    icon: TrendingUp,
    color: "text-site-success bg-green-50",
    badge:
      overallAccuracy >= 70
        ? "Great"
        : undefined,
  },
  {
    title: "Topics",
    render: () => (
      <>
        <AnimatedNumber value={topicsMastered} />
        /
        <AnimatedNumber value={totalTopics} />
      </>
    ),
    subtitle:
      topicsMastered > 0
        ? `${topicsMastered} mastered`
        : "Start practicing",
    icon: BookOpen,
    color: "text-site-accent bg-site-accent/10",
  },
  {
    title: "Plan",
    render: () =>
      isPremium
        ? "Premium"
        : "Free",
    subtitle: planLabel,
    icon: Crown,
    color: isPremium
      ? "text-site-accent bg-site-accent/10"
      : "text-site-muted bg-site-highlight",
  },
];

export default function StatsGrid(props: Props) {
  return (
    <section className="max-w-5xl mx-auto px-6 -mt-10 relative z-20">
      <motion.div
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {cards(props).map((card) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{
                y: -4,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                group relative bg-white rounded-3xl
                border border-site-border/60
                p-5
                shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]
              "
            >
              <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-site-border/40 to-transparent" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-site-muted uppercase tracking-wider">
                  {card.title}
                </span>

                <div
                  className={`
                    w-9 h-9 rounded-xl
                    ${card.color}
                    flex items-center justify-center
                    shadow-sm
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  `}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-site-text tracking-tight">
                  {card.render()}
                </p>

                {card.badge && (
                  <span className="text-[10px] font-bold text-site-success bg-green-50 px-2 py-0.5 rounded-full shadow-sm">
                    {card.badge}
                  </span>
                )}
              </div>

              <p className="text-xs text-site-muted mt-1.5">
                {card.subtitle}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}