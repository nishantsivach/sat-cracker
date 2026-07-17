import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Target,
  Info,
  ExternalLink,
} from "lucide-react";

const colleges: Record<
  string,
  {
    slug: string;
    name: string;
    avg_sat_score: number;
    sat_range?: string;
    sat_requirement_notes: string;
    meta_title: string;
    meta_description: string;
  }
> = {
  "harvard-university": {
    slug: "harvard-university",
    name: "Harvard University",
    avg_sat_score: 1520,
    sat_range: "1480-1580",
    sat_requirement_notes:
      "Harvard is test-optional, meaning you don't have to submit scores. But here's the reality: admitted students who do submit average around 1520. A strong SAT score can meaningfully strengthen your application, especially if other parts of your profile are average.",
    meta_title: "Harvard University SAT Requirements & Average Score",
    meta_description:
      "Harvard's SAT policy, average admitted SAT score, and what score range makes you a competitive applicant.",
  },
  "university-of-michigan": {
    slug: "university-of-michigan",
    name: "University of Michigan",
    avg_sat_score: 1435,
    sat_range: "1350-1530",
    sat_requirement_notes:
      "University of Michigan is test-optional through 2025. Admitted students who submit scores typically fall in the 1350-1530 range. If your score is below that, focus on strengthening other parts of your application before submitting.",
    meta_title: "University of Michigan SAT Requirements & Average Score",
    meta_description:
      "University of Michigan's SAT policy, average admitted SAT score, and how it factors into admissions.",
  },
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(colleges).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const college = colleges[slug];
  if (!college) return {};
  return { title: college.meta_title, description: college.meta_description };
}

export default async function CollegeSatPage({ params }: PageProps) {
  const { slug } = await params;
  const college = colleges[slug];
  if (!college) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${college.name} SAT Requirements`,
    description: college.meta_description,
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <GraduationCap className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                {college.name}
              </h1>
              <p className="text-white/50 text-sm mt-0.5">
                SAT requirements & average scores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        {/* Score card */}
        <div className="bg-white border border-site-border rounded-2xl p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-4 h-4 text-site-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-site-muted">
              Average Admitted Score
            </p>
          </div>

          <div className="flex items-end gap-6 flex-wrap">
            <div>
              <p className="text-5xl md:text-6xl font-black text-site-primary tracking-tight">
                {college.avg_sat_score}
              </p>
              <p className="text-sm text-site-muted mt-1">out of 1600</p>
            </div>

            {college.sat_range && (
              <div className="pb-1.5">
                <p className="text-xs text-site-muted uppercase font-semibold tracking-wider mb-1">
                  Middle 50% range
                </p>
                <p className="text-2xl font-bold text-site-text">
                  {college.sat_range}
                </p>
              </div>
            )}
          </div>

          {/* Score visualization */}
          <div className="mt-6 h-2 bg-site-highlight rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-site-secondary to-site-accent rounded-full"
              style={{
                width: `${(college.avg_sat_score / 1600) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-site-muted">400</span>
            <span className="text-[10px] text-site-muted">1600</span>
          </div>
        </div>

        {/* Requirements notes */}
        <div className="bg-site-highlight rounded-2xl border border-site-border p-6 md:p-8">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4 text-site-accent" />
            </div>
            <h2 className="text-lg font-bold text-site-text">
              What this means for you
            </h2>
          </div>

          <p className="text-site-text leading-relaxed text-[15px]">
            {college.sat_requirement_notes}
          </p>
        </div>

        {/* Action links */}
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <Link
            href="/sat/scoring"
            className="group flex items-center justify-between gap-2 p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all"
          >
            <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
              How SAT scoring works
            </span>
            <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/practice"
            className="group flex items-center justify-between gap-2 p-4 bg-site-primary text-white rounded-xl hover:bg-site-primary/95 transition-all"
          >
            <span className="text-sm font-medium">
              Practice to reach this score
            </span>
            <ArrowRight className="w-4 h-4 text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-xs text-site-muted text-center">
          Score data is based on recent admission cycles. Always check the
          college&apos;s official website for the latest requirements.{" "}
          <a
            href="#"
            className="text-site-secondary hover:underline inline-flex items-center gap-1"
          >
            Official site
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </section>
    </Layout>
  );
}