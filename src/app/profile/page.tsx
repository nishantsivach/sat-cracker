import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getSubscription } from "@/utils/supabase/api/subscription";
import { Layout } from "@/components";
import { User, Target, BarChart3, ArrowRight, Mail, Calendar, Settings } from "lucide-react";
import Link from "next/link";
import ProfileSubscriptionCard from "./ProfileSubscriptionCard";
import ProfileSettingsForm from "./ProfileSettingsForm";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirectTo=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .single();

  const subscription = await getSubscription(supabase, user.id);

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Student";
  const joined = new Date(profile?.created_at || user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-16">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <User className="w-7 h-7 text-site-accent" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{displayName}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1.5 text-xs text-white/50">
                    <Mail className="w-3 h-3" />
                    {user.email}
                  </span>
                  <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                  <span className="flex items-center gap-1.5 text-xs text-white/50">
                    <Calendar className="w-3 h-3" />
                    Member since {joined}
                  </span>
                </div>
              </div>
            </div>

            <a
              href="#settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-sm text-white transition-colors shrink-0"
            >
              <Settings className="w-4 h-4" />
              Settings
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14 space-y-6">
        <ProfileSubscriptionCard
          plan={subscription?.plan ?? "free"}
          status={subscription?.status ?? "active"}
          currentPeriodEnd={subscription?.current_period_end ?? null}
          cancelAtPeriodEnd={subscription?.cancel_at_period_end ?? false}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/practice"
            className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-site-border hover:border-site-secondary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-site-primary flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-site-text text-sm">Continue practicing</p>
                <p className="text-xs text-site-muted">Pick up where you left off</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-secondary group-hover:translate-x-0.5 transition-all" />
          </Link>

          <Link
            href="/dashboard"
            className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-site-border hover:border-site-secondary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-site-secondary" />
              </div>
              <div>
                <p className="font-bold text-site-text text-sm">View your progress</p>
                <p className="text-xs text-site-muted">Stats, weak topics, and mastery</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-secondary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        <ProfileSettingsForm initialName={profile?.full_name || ""} />
      </section>
    </Layout>
  );
}