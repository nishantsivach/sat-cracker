import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import Link from "next/link";
import { Clock, FileText, ArrowRight, Target, Zap, Crown } from "lucide-react";
import { checkIsPremium } from "@/utils/supabase/api/subscription";
import { createMetadata } from "@/lib/seo";


export const metadata = createMetadata({
  title: "SAT Mock Tests — Free Full-Length Practice Tests",
  description: "Take full-length SAT mock tests that mirror the real digital SAT. Free tests available, plus premium tests for full coverage.",
  path: "/mock-tests",
});

export default async function MockTestsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPremium = user ? await checkIsPremium(supabase, user.id) : false;

  const { data: tests, error } = await supabase
    .from("mock_test")
    .select("id, title, duration_minutes, is_premium, mock_test_question(count)")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  const totalTests = tests?.length || 0;

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
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <Target className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Mock Tests
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            Full-length practice tests
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            Timed tests that mirror the real digital SAT. Get your score and section breakdown when you finish.
          </p>

          {totalTests > 0 && (
            <p className="mt-4 text-xs text-white/30">
              {totalTests} test{totalTests !== 1 ? "s" : ""} available
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-600 text-sm font-medium">
              Couldn&apos;t load mock tests right now. Please try again.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!error && (!tests || tests.length === 0) && (
          <div className="bg-white rounded-3xl border border-site-border/60 p-12 md:p-16 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
              <FileText className="w-7 h-7 text-site-muted" />
            </div>
            <h2 className="text-xl font-bold text-site-text mb-2">No mock tests yet</h2>
            <p className="text-site-muted max-w-sm mx-auto mb-6 text-sm">
              Full-length practice tests are being built. Check back soon or try the practice section.
            </p>
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer"
            >
              Go to practice
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Tests list */}
        {tests && tests.length > 0 && (
          <div className="space-y-3">
            {tests.map((test, index) => {
              const questionCount = test.mock_test_question?.[0]?.count ?? 0;
              return (
                <Link
                  key={test.id}
                  href={`/mock-tests/${test.id}`}
                  className="group flex items-center justify-between p-5 md:p-6 bg-white rounded-3xl border border-site-border/60 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 shadow-sm group-hover:bg-site-accent/10 transition-colors">
                      <span className="text-sm font-mono font-bold text-site-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-site-text group-hover:text-site-primary transition-colors truncate">
                          {test.title}
                        </h2>
                        {test.is_premium && !isPremium && (
                          <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            <Crown className="w-3 h-3 inline mr-0.5" />
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-site-muted mt-1">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {test.duration_minutes} min
                        </span>
                        <span className="w-1 h-1 rounded-full bg-site-border" />
                        <span className="flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          {questionCount} questions
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all shrink-0 ml-4" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {tests && tests.length > 0 && (
          <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-site-accent/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative">
              <div className="w-10 h-10 mx-auto rounded-xl bg-white/15 flex items-center justify-center mb-4 shadow-sm">
                <Zap className="w-5 h-5 text-site-accent" />
              </div>
              <p className="text-white font-bold text-sm">Want more practice?</p>
              <p className="text-white/50 text-xs mt-1">
                Warm up with individual questions before taking a full test.
              </p>
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 mt-4 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Practice questions
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}