import { Sparkles } from "lucide-react";

const features = [
  {
    title: "AI tutor that actually explains things",
    text: "Not just answer keys. Step-by-step breakdowns that help you understand why you got something wrong — so you don't repeat the mistake.",
    accent: "bg-site-secondary",
    gradient: "from-site-secondary/[0.02] to-transparent",
  },
  {
    title: "Practice that adapts to you",
    text: "Questions get harder when you're ready, and drill deeper into topics where you struggle. No wasted time on stuff you already know.",
    accent: "bg-site-accent",
    gradient: "from-site-accent/[0.02] to-transparent",
  },
  {
    title: "See exactly where you stand",
    text: "Real-time analytics show your strengths, weak spots, and progress over time. No vague feedback — just clear data on what to work on next.",
    accent: "bg-site-primary",
    gradient: "from-site-primary/[0.02] to-transparent",
  },
  {
    title: "Timed practice that mimics test day",
    text: "Build stamina and pacing with full-length simulations. Walk into the real test knowing exactly how the clock feels.",
    accent: "bg-site-accent",
    gradient: "from-site-accent/[0.02] to-transparent",
  },
  {
    title: "Resources worth reading",
    text: "Study guides and strategies written for the current SAT format. No recycled tips from 2019.",
    accent: "bg-site-secondary",
    gradient: "from-site-secondary/[0.02] to-transparent",
  },
  {
    title: "A roadmap to your target score",
    text: "Personalized study plan based on your diagnostic results. Follow it, and the score improvement takes care of itself.",
    accent: "bg-site-primary",
    gradient: "from-site-primary/[0.02] to-transparent",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6 bg-site-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-site-accent/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 border border-site-secondary/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm border border-site-border/60">
            <Sparkles className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-primary uppercase">
              Why SATCracker
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-text leading-[1.1] tracking-tight">
            Everything you need.
            <br />
            <span className="text-site-secondary">Nothing you don&apos;t.</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl">
            AI explanations, adaptive practice, and real progress tracking —
            all built around how students actually prep.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={`group relative bg-gradient-to-b ${feature.gradient} rounded-3xl border border-site-border/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden`}
            >
              {/* Left accent line */}
              <div className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-r-full ${feature.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />

              {/* Content */}
              <div className="pl-2">
                <h3 className="text-sm font-bold text-site-text group-hover:text-site-primary transition-colors mb-2">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-site-muted leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}