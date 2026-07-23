"use client";

import { motion, type Variants } from "framer-motion";
import {
  Trophy,
  Flame,
  Target,
  Medal,
  CheckCircle2,
  Lock,
} from "lucide-react";

type Props = {
  streak: number;
  totalAttempts: number;
  overallAccuracy: number;
};

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};


const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 8,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};


export default function Achievements({
  streak,
  totalAttempts,
  overallAccuracy,
}: Props) {

  const achievements = [
    {
      icon: Trophy,
      title: "100 Questions",
      unlocked: totalAttempts >= 100,
      color: "text-site-accent bg-site-accent/10",
    },
    {
      icon: Flame,
      title: "7 Day Streak",
      unlocked: streak >= 7,
      color: "text-orange-500 bg-orange-50",
    },
    {
      icon: Target,
      title: "80% Accuracy",
      unlocked: overallAccuracy >= 80,
      color: "text-site-success bg-green-50",
    },
    {
      icon: Medal,
      title: "1000 Questions",
      unlocked: totalAttempts >= 1000,
      color: "text-site-secondary bg-site-secondary/10",
    },
  ];


  return (
    <div
      className="
        relative bg-white rounded-3xl
        border border-site-border/60
        p-6 md:p-7
        shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
        hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)]
        transition-all duration-300
      "
    >

      <div className="
        absolute top-0 left-6 right-6
        h-px
        bg-gradient-to-r
        from-transparent
        via-site-accent/20
        to-transparent
      "
      />


      <h2 className="text-sm font-bold text-site-text">
        Achievements
      </h2>

      <p className="text-xs text-site-muted mt-0.5 mb-6">
        Milestones you&apos;ve unlocked
      </p>



      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {achievements.map((badge) => {

          const Icon = badge.icon;


          return (
            <motion.div
              key={badge.title}
              variants={badgeVariants}
              whileHover={{
                y: -4,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`
                rounded-2xl
                border
                p-4
                cursor-default
                ${
                  badge.unlocked
                    ? "border-site-accent/20 bg-site-accent/[0.02]"
                    : "border-site-border/60 bg-white opacity-50"
                }
              `}
            >

              <div
                className={`
                  w-9 h-9
                  rounded-lg
                  flex items-center justify-center
                  shadow-sm
                  ${
                    badge.unlocked
                      ? badge.color
                      : "bg-site-highlight text-site-muted"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
              </div>


              <h3 className="
                mt-3
                text-xs
                font-semibold
                text-site-text
              ">
                {badge.title}
              </h3>


              <p className="
                flex items-center gap-1.5
                mt-1.5
                text-[11px]
              ">

                {badge.unlocked ? (
                  <>
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-site-success"
                    />

                    <span className="
                      text-site-success
                      font-medium
                    ">
                      Unlocked
                    </span>
                  </>
                ) : (
                  <>
                    <Lock
                      className="w-3.5 h-3.5 text-site-muted"
                    />

                    <span className="
                      text-site-muted
                    ">
                      Locked
                    </span>
                  </>
                )}

              </p>

            </motion.div>
          );

        })}

      </motion.div>

    </div>
  );
}