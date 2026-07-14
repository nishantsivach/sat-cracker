import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { ArrowLeft, ArrowRight, Calculator, BookOpen } from "lucide-react";


const sections = {
  math: {
    kind: "section" as const,
    title: "SAT Math",
    meta_title: "SAT Math Section Guide — Topics, Format & Practice",
    meta_description: "A complete guide to the SAT Math section: format, topics tested, and how to prepare.",
    icon: "calculator",
    intro:
      "The SAT Math section tests algebra, problem-solving and data analysis, and advanced math, split across calculator and non-calculator portions.",
    topics: [{ title: "Linear Equations", href: "/topics/linear-equations" }],
  },
  "reading-writing": {
    kind: "section" as const,
    title: "SAT Reading & Writing",
    meta_title: "SAT Reading & Writing Section Guide — Topics, Format & Practice",
    meta_description: "A complete guide to the SAT Reading & Writing section: format, topics tested, and how to prepare.",
    icon: "book",
    intro:
      "The SAT Reading & Writing section tests comprehension, grammar, and evidence-based analysis through short passages.",
    topics: [{ title: "Punctuation Rules", href: "/topics/punctuation-rules" }],
  },
};

const logistics = {
  dates: {
    kind: "logistics" as const,
    title: "SAT Test Dates 2026",
    meta_title: "SAT Test Dates 2026 — Full Schedule",
    meta_description: "Complete list of upcoming SAT test dates for 2026, with registration deadlines.",
    body: [
      "The SAT is offered multiple times a year, both in the U.S. and internationally.",
      "Check the College Board's official calendar for exact 2026 dates, since they can shift slightly by region.",
      "Register at least 4-6 weeks before your preferred date to guarantee a seat at your chosen test center.",
    ],
  },
  registration: {
    kind: "logistics" as const,
    title: "How to Register for the SAT",
    meta_title: "SAT Registration Guide — Step by Step",
    meta_description: "A step-by-step guide to registering for the SAT, including deadlines and fees.",
    body: [
      "Create a College Board account and choose a test date and center.",
      "Upload a recent photo that meets the ID requirements.",
      "Pay the registration fee online; fee waivers are available for eligible students.",
      "Late registration and standby options exist but carry extra fees and no guaranteed seat.",
    ],
  },
  scoring: {
    kind: "logistics" as const,
    title: "How the SAT Is Scored",
    meta_title: "SAT Scoring Explained — Sections & Total Score",
    meta_description: "How SAT scoring works — section scores, total score range, and what a good score looks like.",
    body: [
      "The SAT has two sections — Math, and Reading & Writing — each scored from 200 to 800.",
      "Your total score is the sum of both sections, ranging from 400 to 1600.",
      "Scores are based on the number of questions answered correctly — there's no penalty for wrong answers.",
    ],
  },
};

// TODO: once Supabase exists, this becomes one query against content_page
// (type IN section/logistics) instead of two mock objects.
const allPages = { ...sections, ...logistics };
type SlugKey = keyof typeof allPages;

const icons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="w-6 h-6 text-blue-700" />,
  book: <BookOpen className="w-6 h-6 text-purple-700" />,
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

  if (data.kind === "section") {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/sat" className="inline-flex items-center text-blue-700 hover:underline mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to SAT Guide
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="bg-neutral-50 p-3 rounded-lg">{icons[data.icon]}</div>
            <h1 className="text-4xl font-bold text-neutral-900">{data.title}</h1>
          </div>
          <p className="text-lg text-neutral-600 mb-10">{data.intro}</p>

          <div className="border-t border-neutral-200 pt-8">
            <h2 className="text-xl font-bold mb-4">Topic Guides</h2>
            <ul className="space-y-2">
              {data.topics.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="flex items-center justify-between p-4 bg-white border border-neutral-200 rounded-xl hover:shadow-md hover:border-blue-300 transition"
                  >
                    <span className="font-medium text-neutral-800">{t.title}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  }

  // kind === "logistics"
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/sat" className="inline-flex items-center text-blue-700 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to SAT Guide
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-neutral-900">{data.title}</h1>

        <div className="space-y-4">
          {data.body.map((para, i) => (
            <p key={i} className="text-neutral-700 leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}