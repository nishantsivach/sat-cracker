import {
  Brain,
  Clock,
  TrendingUp,
  BarChart3,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI tutor that actually explains things",
    text: "Not just answer keys. Step-by-step breakdowns that help you understand why you got something wrong — so you don't repeat the mistake.",
  },
  {
    icon: Target,
    title: "Practice that adapts to you",
    text: "Questions get harder when you're ready, and drill deeper into topics where you struggle. No wasted time on stuff you already know.",
  },
  {
    icon: BarChart3,
    title: "See exactly where you stand",
    text: "Real-time analytics show your strengths, weak spots, and progress over time. No vague feedback — just clear data on what to work on next.",
  },
  {
    icon: Clock,
    title: "Timed practice that mimics test day",
    text: "Build stamina and pacing with full-length simulations. Walk into the real test knowing exactly how the clock feels.",
  },
  {
    icon: BookOpen,
    title: "Resources worth reading",
    text: "Study guides and strategies written for the current SAT format. No recycled tips from 2019.",
  },
  {
    icon: TrendingUp,
    title: "A roadmap to your target score",
    text: "Personalized study plan based on your diagnostic results. Follow it, and the score improvement takes care of itself.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 border border-site-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-5">
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
            all built around how students actually prep, not how textbooks say they should.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isLast = i === features.length - 1 || i === features.length - 2;
            const isRightColumn = i % 2 === 1;
            // Row index: 0,0,1,1,2,2 (pairs)
            const rowIndex = Math.floor(i / 2);
            // Zig-zag gradient: row 0 left (i=0), row 1 right (i=3), row 2 left (i=4)
            const hasGradient = (rowIndex === 0 && i === 0) || (rowIndex === 1 && i === 3) || (rowIndex === 2 && i === 4);

            return (
              <div
                key={feature.title}
                className={`group relative py-8 ${!isLast ? "border-b border-site-border" : ""
                  } ${!isRightColumn
                    ? "md:border-r md:pr-14 border-site-border"
                    : "md:pl-14"
                  } ${isRightColumn && i < features.length - 1 ? "border-b md:border-b border-site-border" : ""}`}
              >
                {hasGradient && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-site-accent/[0.06] to-site-accent/[0.15] pointer-events-none" />
                )}

                <div className="relative flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-site-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-site-text">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-site-muted leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}