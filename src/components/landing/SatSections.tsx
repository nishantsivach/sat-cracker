import { BookOpen, CheckCircle, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

const sections = [
  {
    icon: Calculator,
    title: "SAT Math",
    subtitle: "Algebra to advanced — all of it",
    description:
      "No tricks. Just solid math prep that covers what actually shows up on test day.",
    points: [
      "Algebra & linear equations",
      "Problem solving & data analysis",
      "Advanced math concepts",
      "Calculator & no-calculator strategies",
    ],
    button: "Practice Math",
    href: "/sat/math",
    stat: "58 questions",
    color: "bg-site-secondary",
    lightBg: "from-site-secondary/5",
    accentBar: "from-site-secondary to-site-secondary/60",
  },
  {
    icon: BookOpen,
    title: "Reading & Writing",
    subtitle: "Comprehension that clicks",
    description:
      "Stop overthinking passages. Learn to spot what the SAT is actually testing.",
    points: [
      "Passage analysis without the stress",
      "Grammar rules that repeat every test",
      "Evidence-based reasoning",
      "Time-saving reading strategies",
    ],
    button: "Practice Reading",
    href: "/sat/reading-writing",
    stat: "54 questions",
    color: "bg-site-accent",
    lightBg: "from-site-accent/5",
    accentBar: "from-site-accent to-site-accent/60",
  },
];

export default function SatSections() {
  return (
    <section className="py-28 px-6 bg-site-highlight relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-site-accent/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm border border-site-border/60">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              SAT Sections
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-text leading-[1.1] tracking-tight">
            Two sections.
            <br />
            <span className="text-site-secondary">One target score.</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl">
            Everything you need to know about both SAT sections — broken down 
            without the textbook fluff.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="group relative bg-white rounded-3xl border border-site-border/60 p-8 md:p-10 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                {/* Top shine */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-${section.accentBar.split(" ")[1]}/20 to-transparent`} />
                
                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${section.lightBg} via-transparent to-transparent`} />

                <div className="relative">
                  {/* Icon + stat */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-11 h-11 rounded-xl ${section.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-mono font-bold text-site-muted bg-site-highlight rounded-lg px-3 py-1.5 shadow-sm">
                      {section.stat}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-site-text group-hover:text-site-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-site-muted font-medium mt-1">
                    {section.subtitle}
                  </p>
                  <p className="mt-3 text-site-muted leading-relaxed text-[15px]">
                    {section.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-site-success shrink-0 mt-0.5" />
                        <span className="text-sm text-site-text leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={section.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-site-text group-hover:text-site-primary transition-colors"
                  >
                    {section.button}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}