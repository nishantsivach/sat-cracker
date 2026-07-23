import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import {
  Hero,
  StatsGrid,
  Analytics,
  TopicAnalytics,
  Insights,
  Achievements,
  Journey,
} from "@/components/dashboard";
import type { Metadata } from "next";
import { getSubscription, checkIsPremium } from "@/utils/supabase/api/subscription";
import FadeIn from "@/components/ui/FadeIn";

type Topic = {
  name: string;
  section: string;
};

type ProgressRow = {
  attempts_count: number;
  correct_count: number;
  accuracy: number;
  last_practiced_at: string | null;
  topic: { name: string; section: string }[] | { name: string; section: string } | null;
};

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/dashboard");

  const subscription = await getSubscription(supabase, user.id);
  const currentPlan = subscription?.plan ?? "free";
  const isPremium = await checkIsPremium(supabase, user.id);

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
    .select(`attempts_count, correct_count, accuracy, last_practiced_at, topic:topic_id(name, section)`)
    .eq("user_id", user.id)
    .order("last_practiced_at", { ascending: false });

  const rows = (progress ?? []).map((row: ProgressRow) => {
    const topic = Array.isArray(row.topic) ? row.topic[0] : (row.topic as Topic | null);
    return {
      ...row,
      topicName: topic?.name ?? "Unknown topic",
      topicSection: topic?.section ?? "",
    };
  });

  const weakest = [...rows].sort((a, b) => a.accuracy - b.accuracy).slice(0, 3);
  const strongest = [...rows].sort((a, b) => b.accuracy - a.accuracy).slice(0, 3);
  const topicsMastered = rows.filter((r) => r.accuracy >= 80).length;
  const totalTopics = rows.length;
  const masteryPercentage = totalTopics > 0 ? Math.round((topicsMastered / totalTopics) * 100) : 0;

  const recentDays = rows.filter(
    (r) => r.last_practiced_at && new Date(r.last_practiced_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  const firstName = user.email?.split("@")[0] ?? "there";

  const chartData = [
    { day: "Mon", accuracy: 55 },
    { day: "Tue", accuracy: 65 },
    { day: "Wed", accuracy: 70 },
    { day: "Thu", accuracy: 75 },
    { day: "Fri", accuracy: overallAccuracy },
  ];

  return (
    <Layout>
      <FadeIn>
        <Hero
          firstName={firstName}
          streak={recentDays}
          overallAccuracy={overallAccuracy}
          totalAttempts={totalAttempts ?? 0}
          masteryPercentage={masteryPercentage}
          isPremium={isPremium}
          planLabel={planLabel}
        />
      </FadeIn>

      <FadeIn delay={0.1}>
        <StatsGrid
          totalAttempts={totalAttempts ?? 0}
          overallAccuracy={overallAccuracy}
          totalTopics={totalTopics}
          topicsMastered={topicsMastered}
          planLabel={planLabel}
          isPremium={isPremium}
        />
      </FadeIn>

      <FadeIn delay={0.15}>
        <Analytics chartData={chartData} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <TopicAnalytics weakest={weakest} strongest={strongest} />
      </FadeIn>

      <FadeIn delay={0.25}>
        <section className="max-w-5xl mx-auto px-6 mt-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <Insights
              overallAccuracy={overallAccuracy}
              streak={recentDays}
              weakestTopic={weakest[0]?.topicName}
              bestTopic={strongest[0]?.topicName}
            />
            <Achievements
              streak={recentDays}
              totalAttempts={totalAttempts ?? 0}
              overallAccuracy={overallAccuracy}
            />
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.3}>
        <Journey
          overallAccuracy={overallAccuracy}
          totalAttempts={totalAttempts ?? 0}
          streak={recentDays}
          weakestTopic={weakest[0]?.topicName}
        />
      </FadeIn>
    </Layout>
  );
}