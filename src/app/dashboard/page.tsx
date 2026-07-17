import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import {
  Target,
  TrendingUp,
  AlertTriangle,
  BarChart3,
  ArrowRight,
  BookOpen,
  Zap,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

type Topic = {
  name: string;
  section: string;
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/dashboard");
  }

  const { count: totalAttempts } = await supabase
    .from("attempt")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: totalCorrect } = await supabase
    .from("attempt")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_correct", true);

  const overallAccuracy =
    totalAttempts && totalAttempts > 0
      ? Math.round(((totalCorrect ?? 0) / totalAttempts) * 100)
      : 0;

  const { data: progress } = await supabase
    .from("progress")
    .select("attempts_count, correct_count, accuracy, last_practiced_at, topic:topic_id(name, section)")
    .eq("user_id", user.id)
    .order("last_practiced_at", { ascending: false });

  const rows = (progress ?? []).map((row) => {
    const topic = Array.isArray(row.topic) ? row.topic[0] : (row.topic as Topic | null);
    return {
      ...row,
      topicName: topic?.name ?? "Unknown topic",
      topicSection: topic?.section ?? "",
    };
  });

  const weakest = [...rows].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  const strongest = [...rows].sort((a, b) => b.accuracy - a.accuracy).slice(0, 1);

  const sectionLabel: Record<string, string> = {
    math: "Math",
    "reading-writing": "Reading & Writing",
  };

  const firstName = user.email?.split("@")[0] || "back";

  // Calculate streak (simplified — you can enhance with actual streak logic)
  const recentDays = rows.filter(
    (r) => r.last_practiced_at && new Date(r.last_practiced_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

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
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-site-secondary/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-4">
                <BarChart3 className="w-3.5 h-3.5 text-site-accent" />
                <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
                  Dashboard
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Hey{firstName ? `, ${firstName}` : ""} 
              </h1>
            </div>

            {/* Quick action */}
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-site-accent/20 shrink-0"
            >
              <Zap className="w-4 h-4" />
              Practice now
            </Link>
          </div>

          {totalAttempts && totalAttempts > 0 && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                Active {recentDays} of last 7 days
              </span>
              {strongest.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-site-success" />
                  Best: {strongest[0].topicName} ({strongest[0].accuracy}%)
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        {!totalAttempts ? (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-site-border p-10 md:p-16 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-site-accent/10 to-site-accent/5 flex items-center justify-center mb-6">
              <Target className="w-9 h-9 text-site-accent" />
            </div>
            <h2 className="text-2xl font-black text-site-text mb-3">
              Ready to start?
            </h2>
            <p className="text-site-muted max-w-sm mx-auto mb-8 leading-relaxed">
              Your practice stats, weak spots, and progress will show up here. Takes just a few minutes to get going.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/practice"
                className="inline-flex items-center justify-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors"
              >
                Start practicing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sat"
                className="inline-flex items-center justify-center gap-2 border border-site-border px-6 py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors"
              >
                Explore SAT guide
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats grid */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {/* Attempts */}
              <div className="group relative bg-white rounded-2xl border border-site-border p-6 hover:border-site-accent/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-secondary to-site-secondary/50" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-5 h-5 text-site-secondary" />
                  </div>
                </div>
                <p className="text-3xl font-black text-site-text tracking-tight">
                  {totalAttempts.toLocaleString()}
                </p>
                <p className="text-xs text-site-muted mt-1">Questions attempted</p>
              </div>

              {/* Accuracy */}
              <div className="group relative bg-white rounded-2xl border border-site-border p-6 hover:border-site-accent/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-success to-site-success/50" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-5 h-5 text-site-success" />
                  </div>
                  {overallAccuracy >= 80 && (
                    <span className="text-[10px] font-bold text-site-success bg-green-50 px-2.5 py-1 rounded-full">
                      Excellent
                    </span>
                  )}
                  {overallAccuracy >= 70 && overallAccuracy < 80 && (
                    <span className="text-[10px] font-bold text-site-accent bg-amber-50 px-2.5 py-1 rounded-full">
                      Good
                    </span>
                  )}
                </div>
                <p className="text-3xl font-black text-site-text tracking-tight">
                  {overallAccuracy}%
                </p>
                <p className="text-xs text-site-muted mt-1">Overall accuracy</p>
              </div>

              {/* Topics */}
              <div className="group relative bg-white rounded-2xl border border-site-border p-6 hover:border-site-accent/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-site-accent to-site-accent/50" />
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-site-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-5 h-5 text-site-accent" />
                  </div>
                </div>
                <p className="text-3xl font-black text-site-text tracking-tight">
                  {rows.length}
                </p>
                <p className="text-xs text-site-muted mt-1">Topics practiced</p>
              </div>
            </div>

            {/* Weak + Strong row */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Weak topics */}
              {weakest.length > 0 && (
                <div className="bg-white rounded-2xl border border-site-border p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-site-error" />
                    </div>
                    <h2 className="font-bold text-site-text">Need work</h2>
                  </div>
                  <div className="space-y-2">
                    {weakest.map((row, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl bg-site-highlight"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[10px] font-mono font-bold text-site-muted shrink-0">
                            {i + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="font-medium text-site-text text-sm truncate">
                              {row.topicName}
                            </p>
                            <p className="text-[11px] text-site-muted">
                              {sectionLabel[row.topicSection] || row.topicSection}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="w-14 h-1.5 bg-white rounded-full overflow-hidden">
                            <div
                              className="h-full bg-site-error rounded-full"
                              style={{ width: `${row.accuracy}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-site-error w-8 text-right">
                            {row.accuracy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strong topics */}
              {strongest.length > 0 && rows.length > 3 && (
                <div className="bg-white rounded-2xl border border-site-border p-6 md:p-7">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-site-success" />
                    </div>
                    <h2 className="font-bold text-site-text">Your strengths</h2>
                  </div>
                  <div className="space-y-2">
                    {[...rows]
                      .sort((a, b) => b.accuracy - a.accuracy)
                      .slice(0, 3)
                      .map((row, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-site-highlight"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center text-[10px] font-mono font-bold text-site-muted shrink-0">
                              {i + 1}
                            </span>
                            <div className="min-w-0">
                              <p className="font-medium text-site-text text-sm truncate">
                                {row.topicName}
                              </p>
                              <p className="text-[11px] text-site-muted">
                                {sectionLabel[row.topicSection] || row.topicSection}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="w-14 h-1.5 bg-white rounded-full overflow-hidden">
                              <div
                                className="h-full bg-site-success rounded-full"
                                style={{ width: `${row.accuracy}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-site-success w-8 text-right">
                              {row.accuracy}%
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* All topics */}
            {rows.length > 0 && (
              <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-4 h-4 text-site-secondary" />
                  <h2 className="font-bold text-lg text-site-text">All topics</h2>
                  <span className="text-xs text-site-muted ml-auto">{rows.length} topics</span>
                </div>
                <div className="space-y-1">
                  {rows.map((row, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-site-highlight/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-xs font-mono text-site-muted shrink-0 w-6">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-site-text truncate">
                              {row.topicName}
                            </p>
                            {row.accuracy >= 80 && (
                              <span className="text-[9px] font-bold text-site-success bg-green-50 px-1.5 py-0.5 rounded hidden sm:inline">
                                Strong
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-site-muted">
                            {row.attempts_count} questions ·{" "}
                            {row.last_practiced_at
                              ? new Date(row.last_practiced_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })
                              : "—"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-4">
                        <div className="w-20 h-2 bg-site-highlight rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full ${
                              row.accuracy >= 80
                                ? "bg-site-success"
                                : row.accuracy >= 50
                                ? "bg-site-accent"
                                : "bg-site-error"
                            }`}
                            style={{ width: `${Math.max(row.accuracy, 5)}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-bold w-10 text-right ${
                            row.accuracy >= 80
                              ? "text-site-success"
                              : row.accuracy >= 50
                              ? "text-site-accent"
                              : "text-site-error"
                          }`}
                        >
                          {row.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Note */}
            {totalAttempts > rows.reduce((sum, r) => sum + r.attempts_count, 0) && (
              <p className="text-xs text-site-muted text-center -mt-4 mb-8">
                Some questions aren&apos;t linked to a topic yet. They count toward your total but won&apos;t show above.
              </p>
            )}

            {/* Bottom CTA */}
            <div className="bg-gradient-to-br from-site-primary to-site-secondary rounded-2xl p-8 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-site-accent/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="relative">
                <div className="w-12 h-12 mx-auto rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-site-accent" />
                </div>
                <h2 className="text-xl font-bold">Keep the momentum going</h2>
                <p className="text-white/60 text-sm mt-1 max-w-sm mx-auto">
                  Consistent practice is how scores improve. Even 15 minutes a day makes a difference.
                </p>
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 mt-5 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors shadow-lg shadow-black/10"
                >
                  <Zap className="w-4 h-4" />
                  Continue practicing
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}