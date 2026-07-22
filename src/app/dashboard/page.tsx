import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import {
  Target,
  TrendingUp,
  BarChart3,
  ArrowRight,
  BookOpen,
  Zap,
  Sparkles,
  Clock,
  CheckCircle2,
  Crown,
  Flame,
  Activity,
  Trophy,
  TrendingDown,
  ChevronRight,
  Star,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { getSubscription } from "@/utils/supabase/api/subscription";

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

  const subscription = await getSubscription(supabase, user.id);
  const currentPlan = subscription?.plan ?? "free";
  const isPremium = currentPlan !== "free";

  const planLabel =
    currentPlan === "premium_monthly"
      ? "Premium Monthly"
      : currentPlan === "premium_yearly"
        ? "Premium Yearly"
        : "Free Plan";

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
  const strongest = [...rows].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
  const bestTopic = strongest.length > 0 ? strongest[0] : null;

  const sectionLabel: Record<string, string> = {
    math: "Math",
    "reading-writing": "Reading & Writing",
  };

  const firstName = user.email?.split("@")[0] || "back";

  const recentDays = rows.filter(
    (r) => r.last_practiced_at && new Date(r.last_practiced_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const streak = recentDays > 0 ? recentDays : 0;
  const topicsMastered = rows.filter(r => r.accuracy >= 80).length;
  const totalTopics = rows.length;
  const masteryPercentage = totalTopics > 0 ? Math.round((topicsMastered / totalTopics) * 100) : 0;

  return (
    <Layout>
      {/* Hero Section - Enhanced with pattern & glow */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-site-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-18">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              {/* Enhanced badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
                <Activity className="w-3.5 h-3.5 text-site-accent" />
                <span className="text-xs font-bold tracking-wider uppercase text-site-accent">
                  Dashboard
                </span>
                {streak > 0 && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span className="text-xs font-semibold text-orange-300">{streak}d streak</span>
                    </div>
                  </>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                Hey{firstName ? `, ${firstName}` : ""}
              </h1>
              <p className="mt-3 text-white/60 text-[15px] max-w-lg leading-relaxed">
                Track your SAT progress and keep improving your score. You&apos;re doing great!
              </p>

              {totalAttempts != null && totalAttempts > 0 && (
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mt-5">
                  <span className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                    <Clock className="w-3.5 h-3.5" />
                    Active {recentDays} of 7 days
                  </span>
                  {bestTopic && (
                    <span className="flex items-center gap-1.5 bg-white/5 rounded-lg px-3 py-1.5 backdrop-blur-sm">
                      <Trophy className="w-3.5 h-3.5 text-site-accent" />
                      Best: {bestTopic.topicName} ({bestTopic.accuracy}%)
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
              {/* Plan badge with glow for premium */}
              <div
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-sm ${isPremium
                    ? "bg-site-accent text-site-primary shadow-lg shadow-site-accent/20"
                    : "bg-white/10 text-white/70 border border-white/10"
                  }`}
              >
                <Crown className={`w-3 h-3 ${isPremium ? "text-site-primary" : ""}`} />
                {planLabel}
                {isPremium && <CheckCircle2 className="w-3 h-3 opacity-70" />}
              </div>

              <div className="flex gap-3">
                {!isPremium && (
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-white/15 transition-all duration-300 border border-white/10"
                  >
                    <Sparkles className="w-4 h-4" />
                    Upgrade
                  </Link>
                )}
                <Link
                  href="/practice"
                  className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-lg shadow-site-accent/20"
                >
                  <Zap className="w-4 h-4" />
                  Practice
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        {!totalAttempts ? (
          /* Empty State - Enhanced */
          <div className="relative overflow-hidden bg-white rounded-3xl border border-site-border p-16 text-center shadow-sm">
            <div className="absolute top-0 right-0 w-48 h-48 bg-site-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="relative">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-8 shadow-sm">
                <Target className="w-10 h-10 text-site-accent" />
              </div>
              <h2 className="text-2xl font-bold text-site-text mb-3">Ready to start your journey?</h2>
              <p className="text-site-muted max-w-md mx-auto mb-10 text-[15px] leading-relaxed">
                Your practice stats, weak spots, and progress will show up here. Takes just a few minutes to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/practice"
                  className="inline-flex items-center justify-center gap-2 bg-site-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-site-primary/90 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <Zap className="w-4 h-4" />
                  Start practicing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/sat"
                  className="inline-flex items-center justify-center gap-2 border border-site-border px-8 py-3.5 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-all duration-300"
                >
                  <BookOpen className="w-4 h-4" />
                  SAT guide
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Upgrade banner for free users */}
            {!isPremium && (
              <div className="mb-8 p-0.5 rounded-2xl bg-gradient-to-r from-site-accent/20 via-site-accent/10 to-site-accent/20">
                <div className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-site-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-site-text">Unlock Premium Features</p>
                      <p className="text-xs text-site-muted mt-0.5">
                        Unlimited AI tutor, full courses, mock tests, and advanced analytics.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-site-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/90 transition-all duration-300 shrink-0 shadow-sm"
                  >
                    View plans
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Stats Grid - Enhanced cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                {
                  label: "Total Attempts",
                  value: totalAttempts.toLocaleString(),
                  icon: Target,
                  color: "text-site-secondary",
                  bgColor: "bg-site-highlight",
                },
                {
                  label: "Accuracy",
                  value: `${overallAccuracy}%`,
                  icon: TrendingUp,
                  color: "text-site-success",
                  bgColor: "bg-green-50",
                  trend: overallAccuracy >= 70 ? "Great!" : overallAccuracy >= 50 ? "Steady" : "Focus"
                },
                {
                  label: "Topics Covered",
                  value: rows.length,
                  icon: BookOpen,
                  color: "text-site-accent",
                  bgColor: "bg-amber-50",
                  subtitle: topicsMastered > 0 ? `${topicsMastered} mastered` : null
                },
                {
                  label: "Current Plan",
                  value: planLabel,
                  icon: Crown,
                  color: isPremium ? "text-site-accent" : "text-site-muted",
                  bgColor: isPremium ? "bg-amber-50" : "bg-site-highlight",
                },
              ].map((stat) => (
                <div key={stat.label} className="group bg-white rounded-2xl border border-site-border p-5 hover:shadow-md hover:border-site-accent/20 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-site-muted uppercase tracking-wider">{stat.label}</span>
                    <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-black text-site-text">{stat.value}</p>
                    {stat.trend && (
                      <span className="text-xs font-semibold text-site-muted bg-site-highlight px-2 py-0.5 rounded-full">
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  {stat.subtitle && (
                    <p className="text-xs text-site-muted mt-2">{stat.subtitle}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Overall Mastery Progress */}
            {totalTopics > 0 && (
              <div className="bg-white rounded-2xl border border-site-border p-6 mb-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-site-text">Overall Mastery</h3>
                    <p className="text-xs text-site-muted mt-1">Topics above 80% accuracy</p>
                  </div>
                  <span className="text-lg font-black text-site-text">{masteryPercentage}%</span>
                </div>
                <div className="w-full h-2.5 bg-site-highlight rounded-full overflow-hidden">
                  <div
                    className="h-full bg-site-accent rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${masteryPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-site-muted mt-3">
                  {topicsMastered} of {totalTopics} topics mastered
                </p>
              </div>
            )}

            {/* Weak + Strong row */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {weakest.length > 0 && (
                <div className="bg-white rounded-2xl border border-site-border p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-site-error" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-site-text">Need Improvement</h2>
                      <p className="text-xs text-site-muted">Focus on these topics</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {weakest.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-site-highlight/60 transition-all duration-200 group cursor-pointer">
                        <div className="min-w-0 flex-1 mr-3">
                          <p className="font-medium text-site-text text-sm truncate group-hover:text-site-accent transition-colors">{row.topicName}</p>
                          <p className="text-[11px] text-site-muted">
                            {sectionLabel[row.topicSection] || row.topicSection} · {row.attempts_count} attempts
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-sm font-bold text-site-error">{row.accuracy}%</span>
                          <ChevronRight className="w-3.5 h-3.5 text-site-muted group-hover:text-site-accent transition-colors" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {strongest.length > 0 && rows.length > 3 && (
                <div className="bg-white rounded-2xl border border-site-border p-6 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-site-success" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-site-text">Your Strengths</h2>
                      <p className="text-xs text-site-muted">Keep up the great work</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {strongest.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-site-highlight/60 transition-all duration-200">
                        <div className="min-w-0 flex-1 mr-3">
                          <p className="font-medium text-site-text text-sm truncate">{row.topicName}</p>
                          <p className="text-[11px] text-site-muted">
                            {sectionLabel[row.topicSection] || row.topicSection} · {row.attempts_count} attempts
                          </p>
                        </div>
                        <span className="text-sm font-bold text-site-success shrink-0">{row.accuracy}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* All topics - Enhanced table */}
            {rows.length > 0 && (
              <div className="bg-white rounded-2xl border border-site-border overflow-hidden mb-10">
                <div className="p-6 border-b border-site-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-bold text-site-text">All Topics Progress</h2>
                      <p className="text-xs text-site-muted mt-1">{rows.length} topics total</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-site-muted">
                      <span>Progress</span>
                      <span className="w-10 text-right">Score</span>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-site-border">
                  {rows.map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-4 px-6 hover:bg-site-highlight/40 transition-all duration-200 group">
                      <div className="min-w-0 flex-1 mr-4">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-site-text truncate group-hover:text-site-accent transition-colors">{row.topicName}</p>
                          {row.accuracy >= 80 && (
                            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-site-success bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              Mastered
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-site-muted mt-0.5">
                          {row.attempts_count} questions ·{" "}
                          {row.last_practiced_at
                            ? `Last practiced ${new Date(row.last_practiced_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
                            : "Not yet practiced"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="w-28 h-1.5 bg-site-highlight rounded-full overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${row.accuracy >= 80 ? "bg-site-success" : row.accuracy >= 50 ? "bg-site-accent" : "bg-site-error"
                              }`}
                            style={{ width: `${Math.max(row.accuracy, 5)}%` }}
                          />
                        </div>
                        <span
                          className={`text-sm font-bold w-10 text-right ${row.accuracy >= 80 ? "text-site-success" : row.accuracy >= 50 ? "text-site-accent" : "text-site-error"
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

            {/* Bottom CTA - Enhanced */}
            <div className="bg-site-primary rounded-2xl p-10 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-site-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
                  <Star className="w-3.5 h-3.5 text-site-accent" />
                  <span className="text-xs font-semibold text-site-accent">Keep the momentum going</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Ready for more practice?</h2>
                <p className="text-white/50 text-sm max-w-md mx-auto mb-8">
                  Even 15 minutes a day makes a difference. Stay consistent and watch your scores improve.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/practice"
                    className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-8 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-lg shadow-site-accent/20 transform hover:-translate-y-0.5"
                  >
                    Continue practicing
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/stats"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-white/15 transition-all duration-300 border border-white/10"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Detailed stats
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}