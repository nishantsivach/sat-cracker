import { Target, Brain, BookOpen, Award } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "See where you actually stand",
    text: "Take a diagnostic that mirrors the real SAT. No sugar-coating — you'll know exactly what you're walking into and what needs work.",
    color: "bg-site-accent",
    ringColor: "ring-site-accent/20",
  },
  {
    number: "02",
    icon: Brain,
    title: "Get a plan that makes sense",
    text: "Our AI looks at your specific mistakes and builds a roadmap around what you actually need to fix. No generic schedules.",
    color: "bg-site-secondary",
    ringColor: "ring-site-secondary/20",
  },
  {
    number: "03",
    icon: BookOpen,
    title: "Practice what matters",
    text: "Stop doing random practice tests. Focus on the question types and concepts where you're losing points.",
    color: "bg-site-primary",
    ringColor: "ring-site-primary/20",
  },
  {
    number: "04",
    icon: Award,
    title: "Watch the numbers go up",
    text: "Track your progress week by week. Most students see real improvement within the first two weeks.",
    color: "bg-site-accent",
    ringColor: "ring-site-accent/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 bg-site-background relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1B2A4A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              How it works
            </span>
          </div>

          <h2 className="text-[2.5rem] md:text-[3.25rem] font-black text-site-text leading-[1.05] tracking-tight max-w-3xl">
            From diagnostic
            <span className="text-site-secondary"> to target score</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl">
            Four focused steps. No busywork. No guesswork. Just a clear path forward.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2 hidden md:block">
            <div className="h-full w-px bg-gradient-to-b from-site-accent/40 via-site-secondary/30 to-site-accent/40" />
          </div>

          {/* Mobile vertical line */}
          <div className="absolute left-9 top-3 bottom-3 w-px bg-site-border md:hidden" />

          <div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative ${
                    index < steps.length - 1 ? "mb-8 md:mb-10" : ""
                  }`}
                >
                  {/* Desktop: Center number badge */}
                  <div className="hidden md:flex absolute left-1/2 top-9 -translate-x-1/2 items-center justify-center z-10">
                    <div
                      className={`w-11 h-11 rounded-full ${step.color} border-[3px] border-site-background ring-2 ${step.ringColor} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white text-sm font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: Left number badge */}
                  <div className="md:hidden absolute left-9 top-9 -translate-x-1/2 z-10">
                    <div
                      className={`w-9 h-9 rounded-full ${step.color} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white text-xs font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div
                    className={`md:w-[calc(50%-2.75rem)] ${
                      isLeft
                        ? "md:mr-auto md:pr-6"
                        : "md:ml-auto md:pl-6"
                    } pl-20 md:pl-0`}
                  >
                    <div
                      className={`hidden md:block absolute top-9 h-px w-8 bg-site-border ${
                        isLeft
                          ? "right-[calc(50%+1.375rem)]"
                          : "left-[calc(50%+1.375rem)]"
                      }`}
                    />

                    <div className="group relative bg-white rounded-2xl border border-site-border p-6 md:p-7 hover:border-site-accent/25 hover:shadow-lg hover:shadow-site-accent/[0.06] transition-all duration-300">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="w-11 h-11 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-site-secondary" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-site-text group-hover:text-site-primary transition-colors leading-snug">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-[15px] text-site-muted leading-relaxed">
                            {step.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}