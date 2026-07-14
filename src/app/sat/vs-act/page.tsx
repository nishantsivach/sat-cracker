import Link from "next/link";
import { Layout } from "@/components";
import { ArrowRight, CheckCircle } from "lucide-react";

export const metadata = {
  title: "SAT vs ACT: Which Test Is Right for You?",
  description:
    "Compare the SAT and ACT, including sections, timing, scoring, and key differences to choose the right college admission test.",
};

const comparison = [
  {
    feature: "Test Length",
    sat: "2 hours 14 minutes",
    act: "2 hours 55 minutes (without Writing)",
  },
  {
    feature: "Sections",
    sat: "Reading & Writing, Math",
    act: "English, Math, Reading, Science",
  },
  {
    feature: "Math",
    sat: "Calculator allowed throughout",
    act: "Calculator allowed (with restrictions)",
  },
  {
    feature: "Science Section",
    sat: "No separate Science section",
    act: "Includes Science reasoning section",
  },
  {
    feature: "Scoring",
    sat: "400–1600",
    act: "1–36 composite score",
  },
];

const faqs = [
  {
    q: "Is the SAT easier than the ACT?",
    a: "Neither test is universally easier. Students who prefer more time per question may prefer the SAT, while students comfortable with fast-paced sections may prefer the ACT.",
  },
  {
    q: "Do colleges prefer the SAT or ACT?",
    a: "Most colleges accept both tests equally. Students should choose the exam that best matches their strengths.",
  },
  {
    q: "Should I take both SAT and ACT?",
    a: "Taking practice tests for both exams can help determine which test format works better for you.",
  },
];

export default function SatVsActPage() {
  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-6 py-16">

        <section className="mb-12">
          <h1 className="text-4xl font-bold text-site-text mb-4">
            SAT vs ACT: Which Test Should You Take?
          </h1>

          <p className="text-lg text-site-muted max-w-3xl">
            The SAT and ACT are both accepted college entrance exams. This
            guide compares their formats, scoring, sections, and helps you
            decide which test fits your strengths.
          </p>
        </section>

        <section className="mb-14 rounded-2xl border border-site-border bg-site-highlight p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-site-secondary">
            SAT vs ACT Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-site-border rounded-lg bg-white">
              <thead>
                <tr className="bg-site-surface">
                  <th className="p-4 text-left">Feature</th>
                  <th className="p-4 text-left">SAT</th>
                  <th className="p-4 text-left">ACT</th>
                </tr>
              </thead>

              <tbody>
                {comparison.map((item) => (
                  <tr key={item.feature} className="border-t">
                    <td className="p-4 font-medium">{item.feature}</td>
                    <td className="p-4">{item.sat}</td>
                    <td className="p-4">{item.act}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-site-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-5 text-site-secondary">
            Key Differences
          </h2>

          <ul className="space-y-3">
            {[
              "SAT focuses more on reasoning and problem-solving skills.",
              "ACT includes a dedicated Science section.",
              "SAT gives more time per question compared to ACT.",
              "Both exams are accepted by colleges across the United States.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle className="text-site-accent w-5 h-5 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-14 rounded-2xl border border-site-border bg-site-highlight p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-5 text-site-secondary">
            Which Test Should You Choose?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-site-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">
                Choose SAT if you:
              </h3>
              <ul className="space-y-2 text-site-muted">
                <li>• Prefer a shorter test</li>
                <li>• Like calculator access throughout Math</li>
                <li>• Prefer more time per question</li>
              </ul>
            </div>

            <div className="border border-site-border rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3">
                Choose ACT if you:
              </h3>
              <ul className="space-y-2 text-site-muted">
                <li>• Work well under time pressure</li>
                <li>• Prefer science-based questions</li>
                <li>• Like a traditional test format</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-14 rounded-2xl border border-site-border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-5 text-site-secondary">
            Frequently Asked Questions
          </h2>

          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="font-semibold">{faq.q}</h3>
                <p className="text-site-muted mt-1">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-site-border pt-8">
          <h2 className="font-bold text-xl mb-4">
            Related SAT Resources
          </h2>

          <div className="space-y-2">
            {[
              ["SAT Overview", "/sat"],
              ["SAT Math", "/sat/math"],
              ["SAT Reading & Writing", "/sat/reading-writing"],
              ["SAT Registration", "/sat/registration"],
              ["SAT Scoring", "/sat/scoring"],
            ].map(([title, href]) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 text-site-primary hover:text-site-secondary hover:underline"
              >
                {title}
                <ArrowRight className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}