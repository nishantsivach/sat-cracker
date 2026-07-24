import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import Script from "next/script";
import {
  createMetadata,
  createWebPageSchema,
  createBreadcrumbSchema,
} from "@/lib/seo";

export const metadata = createMetadata({
  title: "SAT College Requirements",
  description:
    "Browse SAT score requirements, average SAT scores, and admissions information for top colleges and universities.",
  path: "/sat/colleges",
});

export default async function CollegesPage() {
  const supabase = await createClient();

  const { data: colleges } = await supabase
    .from("college")
    .select("id, name, slug, avg_sat_score, is_published")
    .order("name", { ascending: true });

  const publishedColleges = (colleges ?? []).filter((c) => c.is_published);
  const unpublishedColleges = (colleges ?? []).filter((c) => !c.is_published);

  const webPageSchema = createWebPageSchema({
    title: "SAT College Requirements",
    description:
      "Browse SAT score requirements, average SAT scores, and admissions information for top colleges and universities.",
    path: "/sat/colleges",
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: "Home",
      path: "/",
    },
    {
      name: "SAT",
      path: "/sat",
    },
    {
      name: "Colleges",
      path: "/sat/colleges",
    },
  ]);

  return (
    <Layout>
      <Script
        id="college-list-webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema),
        }}
      />

      <Script
        id="college-list-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
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

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <GraduationCap className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Colleges
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            SAT score requirements
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            Find out what SAT score you need for your target colleges and universities.
          </p>

          {colleges && (
            <p className="mt-4 text-xs text-white/30">
              {colleges.length} college{colleges.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Published colleges */}
        {publishedColleges.length > 0 && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-site-text mb-4">
              Available colleges
            </h2>
            <div className="space-y-2">
              {publishedColleges.map((college) => (
                <Link
                  key={college.id}
                  href={`/sat/colleges/${college.slug}`}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-site-border/60 hover:border-site-accent/20 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-site-highlight flex items-center justify-center shadow-sm">
                      <GraduationCap className="w-4 h-4 text-site-secondary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-site-text">{college.name}</p>
                      {college.avg_sat_score && (
                        <p className="text-xs text-site-muted">
                          Avg SAT: {college.avg_sat_score}
                        </p>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-site-muted shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Coming soon */}
        {unpublishedColleges.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-site-text mb-4">Coming soon</h2>
            <div className="space-y-2">
              {unpublishedColleges.map((college) => (
                <div
                  key={college.id}
                  className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-site-border/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-site-highlight/50 flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-site-muted" />
                    </div>
                    <p className="text-sm text-site-muted">{college.name}</p>
                  </div>
                  <span className="text-[10px] font-medium text-site-muted bg-site-highlight px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(!colleges || colleges.length === 0) && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
              <GraduationCap className="w-7 h-7 text-site-muted" />
            </div>
            <p className="text-site-muted text-sm">No colleges available yet.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}