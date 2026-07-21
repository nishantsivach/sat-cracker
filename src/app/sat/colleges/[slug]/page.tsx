import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Target,
  Info,
} from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: college } = await supabase
    .from("college")
    .select("meta_title, meta_description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!college) return {};
  return { title: college.meta_title, description: college.meta_description };
}

export default async function CollegeSatPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: college } = await supabase
    .from("college")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

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

      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
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
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{college.name}</h1>
              <p className="text-white/50 text-sm mt-0.5">SAT requirements & average scores</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-14">
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

            {/* {college.sat_range && (
              <div className="pb-1.5">
                <p className="text-xs text-site-muted uppercase font-semibold tracking-wider mb-1">
                  Middle 50% range
                </p>
                <p className="text-2xl font-bold text-site-text">{college.sat_range}</p>
              </div>
            )} */}
          </div>

          <div className="mt-6 h-2 bg-site-highlight rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-site-secondary to-site-accent rounded-full"
              style={{ width: `${(college.avg_sat_score / 1600) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-site-muted">400</span>
            <span className="text-[10px] text-site-muted">1600</span>
          </div>
        </div>

        {college.sat_requirement_notes && (
          <div className="bg-site-highlight rounded-2xl border border-site-border p-6 md:p-8">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-site-accent" />
              </div>
              <h2 className="text-lg font-bold text-site-text">What this means for you</h2>
            </div>

            <p className="text-site-text leading-relaxed text-[15px]">
              {college.sat_requirement_notes}
            </p>
          </div>
        )}

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
            <span className="text-sm font-medium">Practice to reach this score</span>
            <ArrowRight className="w-4 h-4 text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        </div>

        <p className="mt-8 text-xs text-site-muted text-center">
          Score data is based on recent admission cycles. Always check the college&apos;s official
          website for the latest requirements.
        </p>
      </section>
    </Layout>
  );
}