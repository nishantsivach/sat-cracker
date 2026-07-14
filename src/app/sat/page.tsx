import Link from "next/link";
import { Layout } from "@/components";
import { Calculator, BookOpen, Calendar, Trophy, HelpCircle, ArrowRight } from "lucide-react";


const pillarData = {
  slug: "sat",
  title: "SAT Exam Guide 2026: Structure, Scoring, Dates & Prep Strategy",
  meta_title: "SAT Exam Guide 2026 — Structure, Scoring, Dates & How to Prepare",
  meta_description:
    "Everything you need to know about the SAT: test structure, scoring, registration dates, and a section-by-section prep strategy.",
  intro:
    "The SAT is a standardized test used by U.S. colleges to evaluate applicants. It has two sections — Math, and Reading & Writing — each scored out of 800, for a combined score out of 1600.",
  sections: [
    { icon: "calculator", title: "Math", href: "/sat/math", desc: "Algebra, problem-solving, data analysis, and advanced math." },
    { icon: "book", title: "Reading & Writing", href: "/sat/reading-writing", desc: "Comprehension, grammar, and evidence-based analysis." },
    { icon: "calendar", title: "Test Dates", href: "/sat/dates", desc: "Upcoming SAT test dates." },
    { icon: "calendar", title: "Registration", href: "/sat/registration", desc: "How to register for the SAT." },
    { icon: "trophy", title: "Scoring", href: "/sat/scoring", desc: "How the SAT is scored, section by section." },
    { icon: "help", title: "FAQ", href: "/sat/faq", desc: "Common questions about the SAT, answered." },
  ],
  topicLinks: [
    { title: "Linear Equations", href: "/topics/linear-equations" },
    { title: "Punctuation Rules", href: "/topics/punctuation-rules" },
  ],
};

const icons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-6 h-6 text-blue-700" />,
  book: <BookOpen className="w-6 h-6 text-purple-700" />,
  calendar: <Calendar className="w-6 h-6 text-green-700" />,
  trophy: <Trophy className="w-6 h-6 text-amber-700" />,
  help: <HelpCircle className="w-6 h-6 text-red-700" />,
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4 text-neutral-900">{pillarData.title}</h1>
        <p className="text-lg text-neutral-600 mb-12">{pillarData.intro}</p>

        <div className="grid md:grid-cols-2 gap-5 mb-14">
          {pillarData.sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-start gap-4 p-5 bg-white border border-neutral-200 rounded-xl hover:shadow-md hover:border-blue-300 transition"
            >
              <div className="bg-neutral-50 p-3 rounded-lg">{icons[s.icon]}</div>
              <div>
                <h2 className="font-semibold text-lg text-neutral-900">{s.title}</h2>
                <p className="text-sm text-neutral-600">{s.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-400 ml-auto mt-2" />
            </Link>
          ))}
        </div>

        <div className="border-t border-neutral-200 pt-8">
          <h2 className="text-xl font-bold mb-4">Popular Topic Guides</h2>
          <ul className="space-y-2">
            {pillarData.topicLinks.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="text-blue-700 hover:underline">
                  {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}