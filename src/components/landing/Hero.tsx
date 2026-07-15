"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Brain,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
} from "lucide-react";

const previewCards = [
  {
    id: "practice",
    title: "Smart Practice",
    subtitle: "Adaptive question sets",
    badge: "Live Demo",
    badgeColor: "bg-green-50 text-green-600",
    content: (
      <div className="space-y-5">
        <div className="flex items-center gap-2 text-xs text-site-muted">
          <Target className="w-3.5 h-3.5" />
          <span>Question 3 of 20</span>
          <span className="ml-auto flex items-center gap-1">
            <Clock className="w-3 h-3" />
            1:24
          </span>
        </div>

        <p className="text-[15px] font-semibold leading-relaxed">
          If{" "}
          <span className="font-mono bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-sm border border-amber-200">
            3x + 7 = 22
          </span>
          , what is the value of <span className="font-mono">x</span>?
        </p>

        <div className="space-y-2">
          {[
            { label: "A", value: "3", state: "default" },
            { label: "B", value: "5", state: "correct" },
            { label: "C", value: "7", state: "wrong" },
            { label: "D", value: "15", state: "default" },
          ].map((opt) => (
            <div
              key={opt.label}
              className={`group/opt flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                opt.state === "correct"
                  ? "border-green-400 bg-green-50/80 ring-1 ring-green-300 shadow-sm"
                  : opt.state === "wrong"
                  ? "border-red-300 bg-red-50/60 opacity-50"
                  : "border-site-border hover:border-site-secondary/40 hover:bg-site-highlight/60 hover:shadow-sm"
              }`}
            >
              <span
                className={`font-bold text-xs w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  opt.state === "correct"
                    ? "bg-green-500 text-white shadow-sm"
                    : opt.state === "wrong"
                    ? "bg-red-400 text-white"
                    : "bg-site-highlight text-site-muted group-hover/opt:bg-site-secondary/10 group-hover/opt:text-site-secondary"
                }`}
              >
                {opt.label}
              </span>
              <span className="font-medium flex-1">{opt.value}</span>
              {opt.state === "correct" && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {opt.state === "wrong" && (
                <span className="text-[10px] text-red-500 font-medium">Your pick</span>
              )}
            </div>
          ))}
        </div>

        <div className="p-3 bg-green-50/50 rounded-xl border border-green-200">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-green-600 mt-0.5 shrink-0" />
            <div className="text-xs text-site-text leading-relaxed">
              <span className="font-semibold">Correct!</span> Subtract 7 from
              both sides →{" "}
              <span className="font-mono font-semibold">3x = 15</span> → divide
              by 3 →{" "}
              <span className="font-bold text-green-600">x = 5</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    title: "Progress Dashboard",
    subtitle: "Real-time insights",
    badge: "Your Stats",
    badgeColor: "bg-purple-50 text-purple-600",
    content: (
      <div className="space-y-5">
        <div className="bg-gradient-to-br from-site-primary to-site-secondary rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                Current Score
              </p>
              <p className="text-3xl font-black">1380</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-white/60">
                Goal
              </p>
              <p className="text-lg font-bold">1450</p>
            </div>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full"
              style={{ width: "76%" }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px] text-white/60">
            <TrendingUp className="w-3 h-3 text-amber-400" />
            <span>+40 points this week</span>
          </div>
        </div>

        <div className="space-y-3">
          {[
            {
              label: "Math",
              score: 720,
              max: 800,
              color: "from-blue-500 to-blue-400",
            },
            {
              label: "Reading",
              score: 660,
              max: 800,
              color: "from-amber-500 to-amber-400",
            },
          ].map((section) => (
            <div
              key={section.label}
              className="bg-white rounded-xl p-3 border border-site-border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-site-text">
                  {section.label}
                </span>
                <span className="text-xs text-site-muted font-mono">
                  {section.score}/{section.max}
                </span>
              </div>
              <div className="h-2 bg-site-highlight rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${section.color} rounded-full`}
                  style={{ width: `${(section.score / section.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-site-muted bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Focus on Reading to reach your goal faster</span>
        </div>
      </div>
    ),
  },
  {
    id: "tutor",
    title: "AI Tutor",
    subtitle: "Instant explanations",
    badge: "Online Now",
    badgeColor: "bg-blue-50 text-blue-600",
    content: (
      <div className="space-y-3">
        <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-site-primary/5 to-site-secondary/5 rounded-xl border border-site-border">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-site-primary to-site-secondary flex items-center justify-center shrink-0 shadow-sm">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-site-text font-medium leading-relaxed">
              Can you explain how to approach linear equations on the SAT?
            </p>
            <p className="text-[10px] text-site-muted mt-1">Just now</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-site-text leading-relaxed">
              Great question! The key is isolating the variable. Take{" "}
              <span className="font-mono font-semibold bg-amber-100 px-1 rounded">
                2x + 3 = 7
              </span>
              : subtract 3 →{" "}
              <span className="font-mono">2x = 4</span> → divide by 2 →{" "}
              <span className="font-bold text-green-600">x = 2</span>. Most SAT
              problems follow this exact pattern.
            </p>
            <p className="text-[10px] text-site-muted mt-1">
              AI Tutor · Just now
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-site-background rounded-xl border border-site-border shadow-inner">
          <MessageCircle className="w-4 h-4 text-site-muted" />
          <span className="text-xs text-site-muted">
            Ask a follow-up question...
          </span>
        </div>
      </div>
    ),
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCard((prev) => (prev + 1) % previewCards.length);
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveCard(
      (prev) => (prev - 1 + previewCards.length) % previewCards.length
    );
    setTimeout(() => setIsAnimating(false), 400);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  const currentCard = previewCards[activeCard];

  return (
    <section className="relative bg-site-primary text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-site-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-semibold tracking-wider text-site-accent uppercase">
              AI-Powered SAT Prep
            </span>
          </div>

          <h1 className="text-[2.75rem] lg:text-[3.75rem] font-black leading-[1.02] tracking-tight">
            The SAT doesn&apos;t
            <br />
            test intelligence.
            <span className="block bg-gradient-to-r from-site-accent via-amber-300 to-site-accent bg-clip-text text-transparent">
              It tests preparation.
            </span>
          </h1>

          <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
            AI-powered explanations, adaptive practice, and real progress
            tracking — everything you need to walk in confident.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="group relative inline-flex items-center gap-2 bg-site-accent text-site-primary px-7 py-4 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/25 hover:shadow-site-accent/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start practicing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link
              href="/sat"
              className="inline-flex items-center px-7 py-4 rounded-xl border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
            >
              Explore SAT guide
            </Link>
          </div>

          <div className="mt-12 flex gap-10">
            {[
              { value: "25K+", label: "Students" },
              { value: "10K+", label: "Questions" },
              { value: "+192", label: "Avg improvement" },
            ].map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <p className="text-2xl font-black group-hover:text-site-accent transition-colors">
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:ml-auto max-w-sm w-full">
          <div className="absolute inset-0 bg-white/[0.03] rounded-2xl translate-x-4 translate-y-4 scale-95" />
          <div className="absolute inset-0 bg-white/[0.06] rounded-2xl translate-x-2 translate-y-2 scale-[0.975]" />

          <div className="relative">
            <div
              onClick={goToNext}
              className="relative w-full bg-white rounded-2xl shadow-2xl p-6 text-site-text min-h-[420px] flex flex-col text-left hover:shadow-2xl transition-shadow duration-500 cursor-pointer group/card overflow-hidden"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToNext();
                }
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-accent via-amber-400 to-site-secondary" />

              <div className="flex items-center justify-between mb-5 pt-1">
                <div>
                  <p className="text-sm font-bold text-site-text flex items-center gap-2">
                    {currentCard.title}
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-site-muted">
                    {currentCard.subtitle}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${currentCard.badgeColor}`}
                >
                  {currentCard.badge}
                </span>
              </div>

              <div
                key={activeCard}
                className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-400"
              >
                {currentCard.content}
              </div>

              <div className="mt-5 pt-4 border-t border-site-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {previewCards.map((_, index) => (
                    <span
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index === activeCard) return;
                        setIsAnimating(true);
                        setActiveCard(index);
                        setTimeout(() => setIsAnimating(false), 400);
                      }}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        activeCard === index
                          ? "w-6 h-1.5 bg-site-accent"
                          : "w-1.5 h-1.5 bg-site-border hover:bg-site-muted"
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          if (index === activeCard) return;
                          setIsAnimating(true);
                          setActiveCard(index);
                          setTimeout(() => setIsAnimating(false), 400);
                        }
                      }}
                      aria-label={`Go to card ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-site-muted">
                  <span>Swipe or tap</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white shadow-xl border border-site-border flex items-center justify-center text-site-text hover:text-site-primary hover:border-site-accent/30 hover:shadow-2xl transition-all z-10 hover:scale-105 active:scale-95"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-white shadow-xl border border-site-border flex items-center justify-center text-site-text hover:text-site-primary hover:border-site-accent/30 hover:shadow-2xl transition-all z-10 hover:scale-105 active:scale-95"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}