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
  EyeOff,
} from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Get college regardless of publish status for metadata
  const { data: college } = await supabase
    .from("college")
    .select("meta_title, meta_description, is_published")
    .eq("slug", slug)
    .single();

  if (!college) return {};
  
  const title = college.is_published 
    ? college.meta_title 
    : `${college.meta_title || "College"} - Coming Soon`;
    
  return { 
    title, 
    description: college.meta_description 
  };
}

export default async function CollegeSatPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get college data regardless of publish status
  const { data: college } = await supabase
    .from("college")
    .select("*")
    .eq("slug", slug)
    .single();

  // College doesn't exist at all
  if (!college) notFound();

  // College exists but is not published
  if (!college.is_published) {
    return (
      <Layout>
        {/* Hero */}
        <section className="bg-site-primary text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
            <Link
              href="/sat"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to SAT Guide
            </Link>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-site-accent" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight">{college.name}</h1>
                <p className="text-white/50 text-sm mt-0.5">Coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Content */}
        <section className="max-w-lg mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl border border-site-border/60 p-8 md:p-10 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-6">
              <EyeOff className="w-7 h-7 text-site-muted" />
            </div>
            
            <h2 className="text-xl font-bold text-site-text mb-2">
              College profile coming soon
            </h2>
            <p className="text-sm text-site-muted leading-relaxed mb-2">
              We&apos;re currently working on the SAT requirements page for{" "}
              <span className="font-semibold text-site-text">{college.name}</span>.
            </p>
            <p className="text-xs text-site-muted">
              Check back soon or explore other available colleges.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <Link
                href="/sat/colleges"
                className="inline-flex items-center justify-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer"
              >
                Browse colleges
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sat"
                className="inline-flex items-center justify-center gap-2 border border-site-border/60 px-6 py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
              >
                SAT Guide
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // College is published — show full page
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
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/sat"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SAT Guide
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-site-accent" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">{college.name}</h1>
              <p className="text-white/50 text-sm mt-0.5">SAT requirements & average scores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Score card */}
        <div className="bg-white rounded-3xl border border-site-border/60 p-6 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shadow-sm">
              <Target className="w-4 h-4 text-site-accent" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-site-muted">
              Average Admitted Score
            </p>
          </div>

          <div className="flex items-end gap-6 flex-wrap">
            <div>
              <p className="text-5xl md:text-6xl font-black text-site-primary tracking-tight">
                {college.avg_sat_score ?? "—"}
              </p>
              <p className="text-sm text-site-muted mt-1">out of 1600</p>
            </div>

            {college.sat_range && (
              <div className="pb-1.5">
                <p className="text-xs text-site-muted uppercase font-semibold tracking-wider mb-1">
                  Middle 50% range
                </p>
                <p className="text-2xl font-bold text-site-text">{college.sat_range}</p>
              </div>
            )}
          </div>

          {/* Score visualization */}
          <div className="mt-6 h-2 bg-site-highlight rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-site-secondary to-site-accent rounded-full"
              style={{ width: `${college.avg_sat_score ? (college.avg_sat_score / 1600) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[10px] text-site-muted">400</span>
            <span className="text-[10px] text-site-muted">1600</span>
          </div>
        </div>

        {/* Requirements notes */}
        {college.sat_requirement_notes && (
          <div className="bg-white rounded-2xl border border-site-border/60 p-6 md:p-7 mb-8 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shrink-0 shadow-sm">
                <Info className="w-4 h-4 text-site-accent" />
              </div>
              <h2 className="text-sm font-bold text-site-text">What this means for you</h2>
            </div>

            <p className="text-sm text-site-text leading-relaxed">
              {college.sat_requirement_notes}
            </p>
          </div>
        )}

        {/* Action links */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <Link
            href="/sat/scoring"
            className="group flex items-center justify-between gap-2 p-4 bg-white rounded-xl border border-site-border/60 hover:border-site-accent/20 hover:shadow-sm transition-all cursor-pointer"
          >
            <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
              How SAT scoring works
            </span>
            <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>

          <Link
            href="/practice"
            className="group flex items-center justify-between gap-2 p-4 bg-site-primary text-white rounded-xl hover:bg-site-primary/95 transition-all cursor-pointer"
          >
            <span className="text-sm font-medium">Practice to reach this score</span>
            <ArrowRight className="w-4 h-4 text-site-accent group-hover:translate-x-0.5 transition-all shrink-0" />
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-site-muted text-center">
          Score data is based on recent admission cycles. Always check the college&apos;s official website for the latest requirements.
        </p>
      </section>
    </Layout>
  );
}