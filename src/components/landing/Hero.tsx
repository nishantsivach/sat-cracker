import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Star,
  ShieldCheck,
  Zap,
} from "lucide-react";

const transformations = [
  { name: "Maya", before: 1180, after: 1420, days: 45 },
  { name: "Diego", before: 1020, after: 1310, days: 60 },
  { name: "Priya", before: 1340, after: 1490, days: 38 },
];

const proofPoints = [
  "SAT-format practice questions",
  "AI-powered explanations",
  "Personalized weak-area practice",
  "SAT score tracking",
];

export default function Hero() {
  return (
    <section
      className="relative bg-site-primary text-white overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Glow orbs — softer */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-site-secondary/6 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-site-accent/3 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        {/* LEFT */}
        <div className="min-h-[400px] lg:min-h-[500px]">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-site-accent shrink-0" />
            <span className="text-xs font-semibold tracking-wider text-site-accent uppercase whitespace-nowrap">
              AI-Powered SAT Prep
            </span>
          </div>

          <h1 className="text-[2.75rem] lg:text-[3.75rem] font-black leading-[1.02] tracking-tight">
  AI-Powered SAT Prep
  <br />
  <span className="bg-gradient-to-r from-site-accent via-amber-300 to-site-accent bg-clip-text text-transparent">
    Built to Improve Your Score
  </span>
</h1>

          <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg">
  Prepare for the SAT with AI tutoring, adaptive practice questions,
  and instant explanations designed to help you improve your score faster.
</p>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 min-h-[28px]">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-1.5 text-xs text-white/70 whitespace-nowrap"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-site-accent shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 max-w-lg" style={{ minHeight: "80px" }}>
            {transformations.map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm px-3 py-3 hover:bg-white/[0.06] transition-colors"
              >
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider truncate">
                  {t.name} · {t.days}d
                </p>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-sm text-white/40 line-through decoration-white/20">
                    {t.before}
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/30 shrink-0" />
                  <span className="text-lg font-black text-site-accent">
                    {t.after}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="group relative inline-flex items-center gap-2 bg-site-accent text-site-primary px-7 py-4 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/25 hover:shadow-xl hover:shadow-site-accent/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore SAT Prep Guide
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

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50" style={{ minHeight: "20px" }}>
            <div className="flex items-center gap-1">
              <div className="flex shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-site-accent text-site-accent" />
                ))}
              </div>
              <span className="ml-1 font-medium text-white/70 whitespace-nowrap">4.9/5</span>
              <span className="whitespace-nowrap">· 2,000+ students</span>
            </div>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>No credit card needed</span>
            </div>
          </div>

          <div className="mt-8 flex gap-10" style={{ minHeight: "48px" }}>
            {[
              { value: "25K+", label: "Students" },
              { value: "10K+", label: "Questions" },
              { value: "+192", label: "Avg improvement" },
            ].map((stat) => (
              <div key={stat.label} className="group cursor-default">
                <p className="text-2xl font-black group-hover:text-site-accent transition-colors">
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 mt-0.5 whitespace-nowrap">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Glassmorphism Panel */}
        <div
          className="relative lg:ml-auto w-full flex flex-col justify-center"
          style={{ maxWidth: "520px", minHeight: "460px" }}
        >
          <div className="flex justify-end mb-6">
            <div className="inline-flex items-center gap-2 bg-site-accent/20 backdrop-blur-md border border-site-accent/30 text-site-accent text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg shadow-site-accent/10">
              <span className="w-1.5 h-1.5 rounded-full bg-site-accent shrink-0" />
              3 tools, one demo
            </div>
          </div>

          {/* Glass Panel */}
          <div className="relative rounded-3xl overflow-hidden" style={{ height: "450px" }}>
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)]" />
            {/* Inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.01] rounded-3xl pointer-events-none" />
            {/* Top shine */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <div className="relative z-10 p-6 h-full">
              {/* Card 1 — top left */}
              <div
                className="absolute left-6 right-16 rounded-2xl bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.10)] p-5 overflow-hidden transition-all duration-300"
                style={{ top: "35px", height: "130px" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-300 rounded-t-2xl" />
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-site-text">SAT Smart Practice</span>
                    <p className="text-[10px] text-site-muted">Adaptive question sets</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    Live
                  </span>
                </div>
                <p className="text-[13px] text-site-text font-medium truncate">
                  If{" "}
                  <span className="font-mono bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-xs">
                    3x + 7 = 22
                  </span>
                  , what is <span className="font-mono">x</span>?
                </p>
                <div className="flex gap-2 mt-2">
                  <span className="text-[11px] bg-site-highlight text-site-muted px-2.5 py-1 rounded-lg">A · 3</span>
                  <span className="text-[11px] bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> B · 5
                  </span>
                  <span className="text-[11px] bg-red-50 text-red-600 px-2.5 py-1 rounded-lg opacity-60">C · 7</span>
                </div>
              </div>

              {/* Card 2 — middle right */}
              <div
                className="absolute left-18 right-5 rounded-2xl bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.10)] p-5 overflow-hidden transition-all duration-300"
                style={{ top: "180px", height: "108px" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300 rounded-t-2xl" />
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-sm font-bold text-site-text">Progress tracking</span>
                    <p className="text-[10px] text-site-muted">Real-time insights</p>
                  </div>
                  <span className="text-2xl font-black text-site-primary">1380</span>
                </div>
                <div className="h-2 bg-site-highlight rounded-full overflow-hidden">
                  <div className="h-full w-[76%] bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[11px] text-green-800 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +40 points this week
                  </p>
                  <p className="text-[10px] text-site-muted">76% to goal</p>
                </div>
              </div>

              {/* Card 3 — bottom left */}
              <div
                className="absolute left-6 right-16 rounded-2xl bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.10)] p-5 overflow-hidden transition-all duration-300"
                style={{ top: "300px", height: "115px" }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-300 rounded-t-2xl" />
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-bold text-site-text">AI tutor</span>
                    <p className="text-[10px] text-site-muted">Instant explanations</p>
                  </div>
                  <span className="flex items-center gap-1 text-[11px] text-site-muted whitespace-nowrap">
                    <Zap className="w-3 h-3 text-amber-500" />
                    2s response
                  </span>
                </div>
                <p className="text-[13px] text-site-text leading-relaxed italic">
                  &ldquo;Subtract 3, divide by 2 →{" "}
                  <span className="font-bold text-green-800">x = 2</span>. Most SAT problems follow this exact pattern.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}