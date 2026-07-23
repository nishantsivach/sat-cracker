const steps = [
  {
    number: "01",
    title: "See where you actually stand",
    text: "Take a diagnostic that mirrors the real SAT. No sugar-coating — you'll know exactly what you're walking into and what needs work.",
    accent: "border-l-site-accent",
    badge: "bg-site-accent",
    gradient: "from-site-accent/5 to-transparent",
  },
  {
    number: "02",
    title: "Get a plan that makes sense",
    text: "Our AI looks at your specific mistakes and builds a roadmap around what you actually need to fix. No generic schedules.",
    accent: "border-l-site-secondary",
    badge: "bg-site-secondary",
    gradient: "from-site-secondary/5 to-transparent",
  },
  {
    number: "03",
    title: "Practice what matters",
    text: "Stop doing random practice tests. Focus on the question types and concepts where you're losing points.",
    accent: "border-l-site-primary",
    badge: "bg-site-primary",
    gradient: "from-site-primary/5 to-transparent",
  },
  {
    number: "04",
    title: "Watch the numbers go up",
    text: "Track your progress week by week. Most students see real improvement within the first two weeks.",
    accent: "border-l-site-accent",
    badge: "bg-site-accent",
    gradient: "from-site-accent/5 to-transparent",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-6 bg-site-background relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1B2A4A 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 border border-site-border/60 shadow-sm">
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
            Four focused steps. No busywork. No guesswork.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 hidden md:block">
            <div className="h-full w-px bg-gradient-to-b from-site-accent/30 via-site-secondary/25 to-site-accent/30" />
          </div>

          {/* Mobile vertical line */}
          <div className="absolute left-9 top-4 bottom-4 w-px bg-site-border md:hidden" />

          <div>
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative ${index < steps.length - 1 ? "mb-6 md:mb-10" : ""}`}
                >
                  {/* Desktop: Number badge on timeline */}
                  <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 items-center justify-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full ${step.badge} ring-[3px] ring-site-background flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)]`}
                    >
                      <span className="text-white text-sm font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Mobile: Number badge */}
                  <div className="md:hidden absolute left-9 top-10 -translate-x-1/2 z-10">
                    <div
                      className={`w-8 h-8 rounded-full ${step.badge} ring-[3px] ring-site-background flex items-center justify-center shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)]`}
                    >
                      <span className="text-white text-xs font-mono font-bold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Card Container */}
                  <div
                    className={`md:w-[calc(50%-2.5rem)] ${
                      isLeft ? "md:mr-auto md:pr-5" : "md:ml-auto md:pl-5"
                    } pl-20 md:pl-0`}
                  >
                    {/* Connector line */}
                    <div
                      className={`hidden md:block absolute top-10 h-px w-8 bg-site-border ${
                        isLeft
                          ? "right-[calc(50%+1.25rem)]"
                          : "left-[calc(50%+1.25rem)]"
                      }`}
                    />

                    <div
                      className={`group relative bg-gradient-to-b ${step.gradient} rounded-2xl border border-site-border/60 border-l-4 ${step.accent} p-5 md:p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300`}
                    >
                      <h3 className="text-base font-bold text-site-text group-hover:text-site-primary transition-colors leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] text-site-muted leading-relaxed">
                        {step.text}
                      </p>
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