import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import {
  User,
  Target,
  Flame,
  Trophy,
  Settings,
  Mail,
  Calendar,
  ArrowRight,
  Clock,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

// Private, user-specific page — kept out of the sitemap and marked noindex.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Stats and activity are still mock data — they depend on the Practice
// Engine (Phase 4) and Mock Tests (Phase 6), which don't exist yet.
// Only identity fields (name, email, join date) are real, from Auth.
const mockStats = [
  { icon: Target, label: "Questions solved", value: "142", color: "text-site-secondary" },
  { icon: Flame, label: "Day streak", value: "6", color: "text-site-accent" },
  { icon: Trophy, label: "Best mock score", value: "1380", color: "text-site-primary" },
];

const mockActivity = [
  { action: "Completed Math Practice", detail: "Linear Equations — 85% accuracy", time: "2 hours ago" },
  { action: "Started Reading Practice", detail: "Command of Evidence", time: "Yesterday" },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already protects /profile, but this is a safe fallback in
  // case the page is ever reached without a session.
  if (!user) {
    redirect("/login?redirectTo=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, created_at")
    .eq("id", user.id)
    .single();

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Student";
  const joined = new Date(profile?.created_at || user.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <Layout>
      {/* Hero — dot-grid texture only, no blurred glow blob. */}
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

            <button
              disabled
              title="Coming soon"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 text-sm text-white/40 cursor-not-allowed shrink-0"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {mockStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group bg-white rounded-2xl border border-site-border p-6 hover:border-site-secondary/40 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  {stat.label === "Day streak" && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-site-accent bg-site-accent/10 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-site-text tracking-tight">{stat.value}</p>
                <p className="text-xs text-site-muted mt-1 capitalize">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
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
            href="/sat"
            className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-site-border hover:border-site-secondary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-site-secondary" />
              </div>
              <div>
                <p className="font-bold text-site-text text-sm">View SAT guide</p>
                <p className="text-xs text-site-muted">Section-by-section breakdown</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-secondary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-site-border p-6">
          <h2 className="text-lg font-bold text-site-text mb-5">Recent activity</h2>
          <div className="space-y-4">
            {mockActivity.map((activity, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 ${
                  i < mockActivity.length - 1 ? "pb-4 border-b border-site-border" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-site-highlight flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-site-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-site-text">{activity.action}</p>
                  <p className="text-xs text-site-muted mt-0.5">{activity.detail}</p>
                </div>
                <span className="text-xs text-site-muted shrink-0 mt-1">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs text-site-muted text-center">
          Name, email, and join date are real. Stats and activity below are
          still mock data until the Practice Engine (Phase 4) exists.
        </p>
      </section>
    </Layout>
  );
}