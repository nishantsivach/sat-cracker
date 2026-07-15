import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  BookOpen,
  Trophy,
} from "lucide-react";

const sections = {
  math: {
    kind: "section" as const,
    title: "SAT Math",
    subtitle: "What's actually on the test",
    meta_title: "SAT Math Section Guide — Topics, Format & Practice",
    meta_description:
      "A complete guide to the SAT Math section: format, topics tested, and how to prepare.",
    icon: "calculator",
    stats: [
      { value: "58", label: "Questions" },
      { value: "80 min", label: "Time" },
      { value: "200-800", label: "Score range" },
    ],
    intro:
      "Algebra, problem-solving, data analysis, and advanced math — split across calculator and no-calculator portions. No trick questions, just the fundamentals done well.",
    topics: [
      { title: "Linear Equations", href: "/topics/linear-equations" },
      { title: "Systems of Equations", href: "/topics/systems-of-equations" },
      { title: "Quadratics", href: "/topics/quadratics" },
    ],
  },
  "reading-writing": {
    kind: "section" as const,
    title: "SAT Reading & Writing",
    subtitle: "What's actually on the test",
    meta_title:
      "SAT Reading & Writing Section Guide — Topics, Format & Practice",
    meta_description:
      "A complete guide to the SAT Reading & Writing section: format, topics tested, and how to prepare.",
    icon: "book",
    stats: [
      { value: "54", label: "Questions" },
      { value: "64 min", label: "Time" },
      { value: "200-800", label: "Score range" },
    ],
    intro:
      "Short passages. Straightforward questions. Tests your ability to understand what you read, fix grammar mistakes, and analyze arguments — not memorize vocabulary.",
    topics: [
      { title: "Punctuation Rules", href: "/topics/punctuation-rules" },
      { title: "Command of Evidence", href: "/topics/command-of-evidence" },
      { title: "Transitions", href: "/topics/transitions" },
    ],
  },
};

const logistics = {
  dates: {
    kind: "logistics" as const,
    title: "SAT Test Dates 2026",
    subtitle: "Plan ahead so you're not scrambling",
    meta_title: "SAT Test Dates 2026 — Full Schedule",
    meta_description:
      "Complete list of upcoming SAT test dates for 2026, with registration deadlines.",
    body: [
      "The SAT is offered 7 times a year — typically in March, May, June, August, October, November, and December.",
      "International dates can vary, so always double-check the College Board's official calendar for your region.",
      "Register at least 4-6 weeks before your target date. Seats fill up, especially in busy testing areas.",
    ],
  },
  registration: {
    kind: "logistics" as const,
    title: "How to Register for the SAT",
    subtitle: "Don't mess this part up",
    meta_title: "SAT Registration Guide — Step by Step",
    meta_description:
      "A step-by-step guide to registering for the SAT, including deadlines and fees.",
    body: [
      "Create a free College Board account at collegeboard.org — you'll need a valid email and a recent photo that meets their requirements.",
      "Pick your test date and center. Popular centers fill up fast, so have a backup location in mind.",
      "Pay the registration fee online (fee waivers available for eligible students through your school counselor).",
      "Late registration and standby testing are options, but they cost extra and don't guarantee a seat. Avoid if you can.",
    ],
  },
  scoring: {
    kind: "logistics" as const,
    title: "How the SAT Is Scored",
    subtitle: "Where those numbers come from",
    meta_title: "SAT Scoring Explained — Sections & Total Score",
    meta_description:
      "How SAT scoring works — section scores, total score range, and what a good score looks like.",
    body: [
      "Two sections — Math and Reading & Writing. Each scored from 200 to 800. Add them together for your total out of 1600.",
      "You get points for correct answers. Wrong answers? No penalty. So never leave anything blank — guess strategically.",
      "Your raw score gets converted to a scaled score through a process called equating, which adjusts for slight differences in difficulty across test dates.",
    ],
  },
  "vs-act": {
    kind: "logistics" as const,
    title: "SAT vs ACT",
    subtitle: "Pick the test that plays to your strengths",
    meta_title: "SAT vs ACT — Which Test Should You Take?",
    meta_description:
      "Compare the SAT and ACT side by side to decide which test is right for you.",
    body: [
      "The SAT gives you more time per question than the ACT. If you hate rushing, the SAT might feel better.",
      "The ACT has a Science section. The SAT doesn't. If data analysis and graphs stress you out, SAT wins.",
      "Both tests are accepted by every U.S. college. There's no strategic advantage to one over the other — pick what suits you.",
    ],
  },
};

const allPages = { ...sections, ...logistics };
type SlugKey = keyof typeof allPages;

const icons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-5 h-5 text-site-secondary" />,
  book: <BookOpen className="w-5 h-5 text-site-secondary" />,
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(allPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const data = allPages[slug as SlugKey];
  if (!data) return {};
  return { title: data.meta_title, description: data.meta_description };
}

export default async function SatSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const data = allPages[slug as SlugKey];
  if (!data) notFound();

  // Section page: Math or Reading & Writing
  if (data.kind === "section") {
    return (
      <Layout>
        {/* Hero */}
        <section className="bg-site-primary text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

          <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
            <Link
              href="/sat"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SAT Guide
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                {icons[data.icon]}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                  {data.title}
                </h1>
                <p className="text-white/50 text-sm mt-0.5">{data.subtitle}</p>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed max-w-2xl text-[15px]">
              {data.intro}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-6 mt-8">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="text-xl font-black text-site-accent">
                    {stat.value}
                  </span>
                  <span className="text-white/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topic guides */}
        <section className="max-w-3xl mx-auto px-6 py-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-site-text">
              Topics you need to know
            </h2>
            <p className="text-site-muted text-sm mt-1">
              Start with the ones you struggle with most
            </p>
          </div>

          <div className="space-y-2">
            {data.topics.map((t, i) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-center justify-between p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-site-highlight flex items-center justify-center text-xs font-mono font-bold text-site-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium text-site-text group-hover:text-site-secondary transition-colors">
                    {t.title}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            {data.title}
          </h1>
          <p className="text-white/50 text-sm mt-2">{data.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <div className="space-y-5">
          {data.body.map((para, i) => (
            <div key={i} className="flex gap-4">
              <span className="w-7 h-7 rounded-lg bg-site-highlight flex items-center justify-center text-xs font-mono font-bold text-site-accent shrink-0 mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-site-text leading-relaxed text-[15px]">
                {para}
              </p>
            </div>
          ))}
        </div>

        {/* CTA after content */}
        <div className="mt-12 p-6 bg-site-highlight rounded-2xl border border-site-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-site-primary flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <p className="font-bold text-site-primary">
                Ready to start practicing?
              </p>
              <p className="text-sm text-site-muted mt-1">
                Knowing the format is step one. Actually improving your score is
                what comes next.
              </p>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 mt-3 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors"
              >
                Go to practice
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}