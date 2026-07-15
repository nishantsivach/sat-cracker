import Link from "next/link";
import { Layout } from "@/components";
import {
  Calculator,
  BookOpen,
  Calendar,
  Trophy,
  HelpCircle,
  ArrowRight,
  Clock,
  BarChart3,
} from "lucide-react";

const pillarData = {
  slug: "sat",
  title: "SAT Exam Guide 2026",
  subtitle: "Everything you actually need to know",
  meta_title:
    "SAT Exam Guide 2026 — Structure, Scoring, Dates & How to Prepare",
  meta_description:
    "Everything you need to know about the SAT: test structure, scoring, registration dates, and a section-by-section prep strategy.",
  intro:
    "The SAT isn't about being a genius. It's about knowing what's on the test and preparing the right way. Two sections. 1600 points total. Here's how it breaks down.",
  sections: [
    {
      icon: "calculator",
      title: "Math",
      href: "/sat/math",
      desc: "Algebra, problem-solving, data analysis, and advanced math — broken down by topic.",
      stat: "58 questions",
    },
    {
      icon: "book",
      title: "Reading & Writing",
      href: "/sat/reading-writing",
      desc: "Comprehension, grammar, and evidence-based analysis. Learn what they're actually testing.",
      stat: "54 questions",
    },
    {
      icon: "trophy",
      title: "Scoring",
      href: "/sat/scoring",
      desc: "How each section is scored and what counts toward that 1600.",
      stat: "200-800 per section",
    },
    {
      icon: "calendar",
      title: "Test Dates & Registration",
      href: "/sat/dates",
      desc: "Upcoming dates and how to sign up without messing it up.",
      stat: "7 dates/year",
    },
    {
      icon: "help",
      title: "SAT vs ACT",
      href: "/sat/vs-act",
      desc: "Not sure which test to take? Compare them side by side.",
      stat: "Pick the right one",
    },
    {
      icon: "book",
      title: "College Requirements",
      href: "/sat/colleges/harvard-university",
      desc: "What score you actually need for your target schools.",
      stat: "Find your target",
    },
    {
      icon: "help",
      title: "FAQ",
      href: "/sat/faq",
      desc: "Straight answers to the most common SAT questions.",
      stat: "No fluff",
    },
  ],
  quickStats: [
    { value: "2", label: "Sections", icon: BookOpen },
    { value: "1600", label: "Max Score", icon: Trophy },
    { value: "3 hrs", label: "Duration", icon: Clock },
    { value: "7x/yr", label: "Offered", icon: Calendar },
  ],
  topicLinks: [
    { title: "Linear Equations", href: "/topics/linear-equations" },
    { title: "Systems of Equations", href: "/topics/systems-of-equations" },
    { title: "Punctuation Rules", href: "/topics/punctuation-rules" },
    { title: "Command of Evidence", href: "/topics/command-of-evidence" },
  ],
};

const icons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5 text-site-secondary" />,
  book: <BookOpen className="w-5 h-5 text-site-secondary" />,
  calendar: <Calendar className="w-5 h-5 text-site-accent" />,
  trophy: <Trophy className="w-5 h-5 text-site-accent" />,
  help: <HelpCircle className="w-5 h-5 text-site-secondary" />,
};

export const metadata = {
  title: pillarData.meta_title,
  description: pillarData.meta_description,
};

export default function SatPillarPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pillarData.title,
    description: pillarData.meta_description,
    about: "SAT Exam Preparation",
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero section */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              SAT Guide
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight">
            {pillarData.title}
          </h1>
          <p className="mt-3 text-lg text-white/50 font-medium">
            {pillarData.subtitle}
          </p>

          <p className="mt-6 text-white/70 leading-relaxed max-w-2xl text-lg">
            {pillarData.intro}
          </p>

          {/* Quick stats */}
          <div className="mt-10 flex flex-wrap gap-8">
            {pillarData.quickStats.map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <StatIcon className="w-4 h-4 text-site-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-black">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-site-highlight rounded-full px-4 py-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              Explore by section
            </span>
          </div>
          <h2 className="text-3xl font-black text-site-text tracking-tight">
            Everything you need,
            <span className="text-site-secondary"> in one place</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillarData.sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-site-border hover:border-site-accent/25 hover:shadow-lg hover:shadow-site-accent/[0.04] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                {icons[s.icon]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-site-text group-hover:text-site-primary transition-colors">
                    {s.title}
                  </h3>
                  {s.stat && (
                    <span className="text-[11px] font-mono text-site-muted bg-site-highlight rounded-md px-2 py-0.5 shrink-0">
                      {s.stat}
                    </span>
                  )}
                </div>
                <p className="text-sm text-site-muted mt-1 leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Topic guides */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="bg-site-highlight rounded-2xl border border-site-border p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-site-accent" />
            <h2 className="text-xl font-bold text-site-text">
              Popular topic guides
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            {pillarData.topicLinks.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="flex items-center justify-between gap-2 px-4 py-3 bg-white rounded-xl border border-site-border hover:border-site-accent/20 hover:shadow-sm transition-all group"
              >
                <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
                  {t.title}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}