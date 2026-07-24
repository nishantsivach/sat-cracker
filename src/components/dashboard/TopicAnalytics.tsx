"use client";

import { TrendingDown, Trophy, ArrowRight, Target } from "lucide-react";
import Link from "next/link";
import TopicDistribution from "./charts/TopicDistribution";

type Topic = {
  topicName: string;
  accuracy: number;
};

type Props = {
  weakest: Topic[];
  strongest: Topic[];
  distribution: { name: string; value: number }[];
};

export default function TopicAnalytics({ weakest, strongest, distribution }: Props) {


  return (
    <section className="max-w-5xl mx-auto px-6 mt-10">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Distribution Card */}
        <div className="relative bg-gradient-to-b from-white to-site-accent/[0.02] rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-border/50 to-transparent" />

          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-xl bg-site-accent/10 flex items-center justify-center shadow-sm">
              <Target className="w-4 h-4 text-site-accent" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-site-text">Distribution</h3>
              <p className="text-[11px] text-site-muted">Performance by section</p>
            </div>
          </div>

          <div className="flex justify-center mb-5">
            <TopicDistribution data={distribution} />
          </div>

          <div className="space-y-2.5 pt-5 border-t border-site-border/40">
            {distribution.map((item) => (
              <div key={item.name} className="flex items-center gap-3 text-xs">
                <div
                  className="w-3 h-3 rounded-full shadow-sm shrink-0"
                  style={{
                    backgroundColor:
                      item.name === "Math" ? "#2E5EAA" : item.name === "Reading" ? "#C89B3C" : "#1B2A4A",
                  }}
                />
                <span className="text-site-muted flex-1 font-medium">{item.name}</span>
                <span className="font-bold text-site-text">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Focus Areas Card */}
        <div className="relative bg-gradient-to-b from-red-50/30 to-white rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-error/20 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-50/80 flex items-center justify-center shadow-sm">
                <TrendingDown className="w-4 h-4 text-site-error" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-site-text">Focus areas</h3>
                <p className="text-[11px] text-site-muted">Priority to improve</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-site-error bg-red-50 px-2.5 py-1 rounded-full">
              {weakest.length}
            </span>
          </div>

          {weakest.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <TrendingDown className="w-6 h-6 text-site-muted" />
              </div>
              <p className="text-xs text-site-muted font-medium">No weak areas</p>
              <p className="text-[11px] text-site-muted mt-0.5">Keep up the great work!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {weakest.map((topic, i) => (
                <Link
                  key={topic.topicName}
                  href={`/practice?topic=${encodeURIComponent(topic.topicName)}`}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-red-50/60 hover:shadow-sm transition-all group cursor-pointer"
                >
                  <span className="text-[10px] font-mono font-bold text-site-error w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-semibold text-site-text truncate group-hover:text-site-error transition-colors">
                        {topic.topicName}
                      </p>
                      <span className="text-xs font-bold text-site-error ml-2">{topic.accuracy}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-red-50 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-site-error/70 to-site-error h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(topic.accuracy, 5)}%` }}
                      />
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-site-muted group-hover:text-site-error group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Strengths Card */}
        <div className="relative bg-gradient-to-b from-green-50/30 to-white rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-success/20 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-50/80 flex items-center justify-center shadow-sm">
                <Trophy className="w-4 h-4 text-site-success" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-site-text">Strengths</h3>
                <p className="text-[11px] text-site-muted">Topics you excel in</p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-site-success bg-green-50 px-2.5 py-1 rounded-full">
              {strongest.length}
            </span>
          </div>

          {strongest.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-3 shadow-sm">
                <Trophy className="w-6 h-6 text-site-muted" />
              </div>
              <p className="text-xs text-site-muted font-medium">No strengths yet</p>
              <p className="text-[11px] text-site-muted mt-0.5">Keep practicing to excel!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {strongest.map((topic, i) => (
                <div
                  key={topic.topicName}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 hover:bg-green-50/60 hover:shadow-sm transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-green-50/80 flex items-center justify-center shrink-0 shadow-sm">
                    {topic.accuracy >= 80 ? (
                      <Trophy className="w-3.5 h-3.5 text-site-success" />
                    ) : (
                      <span className="text-[9px] font-bold text-site-success">
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-semibold text-site-text truncate">{topic.topicName}</p>
                      <span className="text-xs font-bold text-site-success ml-2">{topic.accuracy}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-green-50 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-site-success/70 to-site-success h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(topic.accuracy, 5)}%` }}
                      />
                    </div>
                  </div>
                  {topic.accuracy >= 80 && (
                    <span className="text-[9px] font-bold text-site-success bg-green-100 px-2 py-0.5 rounded-full shrink-0">
                      ★ Mastered
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}