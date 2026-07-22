import { redirect, notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import { MockTestClient } from "@/components/mock-tests/MockTestClient";
import { checkIsPremium } from "@/utils/supabase/api/subscription";
import Link from "next/link";
import { Lock, Crown, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type PageProps = { params: Promise<{ id: string }> };

export default async function MockTestPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirectTo=/mock-tests/${id}`);
  }

  const { data: test } = await supabase
    .from("mock_test")
    .select("id, title, duration_minutes, is_premium")
    .eq("id", id)
    .single();

  if (!test) notFound();

  const isPremiumUser = await checkIsPremium(supabase, user.id);

  // Premium gate
  if (test.is_premium && !isPremiumUser) {
    return (
      <Layout>
        {/* Hero */}
        <section className="bg-site-primary text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto px-6 py-14 md:py-18 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-site-accent" />
            </div>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
              Premium test
            </h1>
            <p className="text-white/60 leading-relaxed text-[15px] max-w-md mx-auto">
              &ldquo;{test.title}&rdquo; is available exclusively for Premium members. Upgrade to unlock all mock tests.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-lg mx-auto px-6 py-12">
          <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 text-center">
            <div className="w-12 h-12 mx-auto rounded-xl bg-site-accent/10 flex items-center justify-center mb-5">
              <Crown className="w-6 h-6 text-site-accent" />
            </div>
            <h2 className="text-lg font-bold text-site-text mb-2">Unlock Premium</h2>
            <p className="text-sm text-site-muted leading-relaxed mb-6">
              Get unlimited access to all mock tests, complete SAT courses, AI tutoring, and advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm hover:brightness-105 transition-all cursor-pointer"
              >
                View plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/mock-tests"
                className="inline-flex items-center justify-center gap-2 border border-site-border px-6 py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Back to mock tests
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Load questions for users with access
  const { data: testQuestions } = await supabase
    .from("mock_test_question")
    .select("order, question:question_id(id, section, stem, options, correct_index, explanation)")
    .eq("mock_test_id", id)
    .order("order", { ascending: true });

  const questions =
    testQuestions
      ?.map((tq) => {
        const q = Array.isArray(tq.question) ? tq.question[0] : tq.question;
        if (!q) return null;
        return {
          id: q.id,
          section: q.section as "math" | "reading-writing",
          stem: q.stem,
          options: q.options as string[],
          correctIndex: q.correct_index,
          explanation: q.explanation ?? "",
        };
      })
      .filter((q): q is NonNullable<typeof q> => q !== null) ?? [];

  const mathCount = questions.filter((q) => q.section === "math").length;
  const readingCount = questions.filter((q) => q.section === "reading-writing").length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Mock Test
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {test.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
              {test.duration_minutes} minutes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              {questions.length} questions
            </span>
            {mathCount > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                {mathCount} Math
              </span>
            )}
            {readingCount > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                {readingCount} Reading & Writing
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10">
        <MockTestClient
          mockTestId={test.id}
          title={test.title}
          durationMinutes={test.duration_minutes}
          questions={questions}
          userId={user.id}
        />
      </section>
    </Layout>
  );
}