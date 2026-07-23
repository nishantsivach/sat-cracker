"use client";

import { Activity, TrendingUp } from "lucide-react";
import AccuracyChart from "./charts/AccuracyChart";

type Props = {
  chartData: {
    day: string;
    accuracy: number;
  }[];
};

const weeklyData = [
  { day: "Mon", value: 80 },
  { day: "Tue", value: 30 },
  { day: "Wed", value: 100 },
  { day: "Thu", value: 60 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 15 },
  { day: "Sun", value: 0 },
];

export default function Analytics({ chartData }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-6 mt-10">
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Accuracy Trend */}
        <div className="lg:col-span-2 relative bg-white rounded-3xl border border-site-border/60 p-6 md:p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
          {/* Top shine */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-accent/20 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-site-text">Accuracy trend</h2>
              <p className="text-xs text-site-muted mt-0.5">Your performance over time</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-5 h-5 text-site-accent" />
            </div>
          </div>

          <AccuracyChart data={chartData} />
        </div>

        {/* Weekly Activity */}
        <div className="relative bg-white rounded-3xl border border-site-border/60 p-6 md:p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300">
          {/* Top shine */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-accent/20 to-transparent" />

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-bold text-site-text">Weekly activity</h2>
              <p className="text-xs text-site-muted mt-0.5">Practice consistency</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center shadow-sm">
              <Activity className="w-5 h-5 text-site-accent" />
            </div>
          </div>

          <div className="space-y-3">
            {weeklyData.map(({ day, value }) => (
              <div key={day} className="group">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-site-muted font-medium group-hover:text-site-text transition-colors">
                    {day}
                  </span>
                  <span className="text-site-text font-semibold">{value}%</span>
                </div>
                <div className="h-2 rounded-full bg-site-highlight overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 group-hover:opacity-90 ${
                      value >= 70
                        ? "bg-gradient-to-r from-site-success/70 to-site-success"
                        : value >= 30
                        ? "bg-gradient-to-r from-site-accent/70 to-site-accent"
                        : "bg-site-border"
                    }`}
                    style={{ width: `${Math.max(value, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-site-border/40">
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-site-success shadow-sm" />
              <span className="text-site-muted">High</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-site-accent shadow-sm" />
              <span className="text-site-muted">Medium</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-site-border shadow-sm" />
              <span className="text-site-muted">Low</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}