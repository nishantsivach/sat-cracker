"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Layout } from "@/components";
import {
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  Eye,
  EyeOff,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  async function handleGoogleLogin() {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`,
      },
    });
  }

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-site-background">
      {/* Page background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-site-primary/3 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-site-accent/3 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 items-center justify-center p-10 lg:p-16">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 bg-site-highlight border border-site-border/60 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-semibold tracking-wider text-site-accent uppercase">
              AI-Powered SAT Prep
            </span>
          </div>

          <h1 className="text-[2.5rem] lg:text-[3rem] font-black tracking-tight text-site-text leading-[1.06]">
            Your target score
            <br />
            <span className="bg-gradient-to-r from-site-secondary to-site-accent bg-clip-text text-transparent">
              is closer than you think.
            </span>
          </h1>

          <p className="mt-5 text-site-muted leading-relaxed text-[15px]">
            Log in to continue your personalized SAT prep journey. Your progress, study plan, and AI tutor are waiting.
          </p>

          <div className="mt-8 space-y-3.5">
            {[
              { icon: <Sparkles className="w-4 h-4" />, text: "AI-powered explanations that click" },
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Adaptive practice for your weak spots" },
              { icon: <CheckCircle2 className="w-4 h-4" />, text: "Track progress toward your goal score" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 text-site-text group cursor-default">
                <span className="w-9 h-9 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 shadow-sm group-hover:bg-site-accent/10 group-hover:scale-110 transition-all duration-300">
                  <span className="text-site-accent">{item.icon}</span>
                </span>
                <span className="text-[15px] font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-xs text-site-muted">
            <div className="flex -space-x-1.5">
              {["SK", "DP", "AC"].map((initials, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full bg-site-primary flex items-center justify-center text-[9px] font-bold text-white border-2 border-site-background"
                >
                  {initials}
                </div>
              ))}
            </div>
            <span>
              Joined by <span className="font-semibold text-site-text">25,000+</span> students
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 relative bg-gradient-to-br from-site-primary to-site-secondary flex items-center justify-center p-6 md:p-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-site-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        {/* Glass card */}
        <div className="relative w-full max-w-sm bg-white/[0.07] backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.02] pointer-events-none" />
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          <div className="relative z-10 p-7 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="relative w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-lg shadow-white/15">
                <GraduationCap className="w-6 h-6 text-site-primary" />
                <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-site-accent shadow-md flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </span>
              </div>

              <h2 className="text-xl font-black text-white tracking-tight">Welcome back</h2>
              <p className="text-white/50 mt-1 text-xs">Continue your SAT prep journey</p>
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2.5 border border-white/10 bg-white/5 backdrop-blur-sm py-2.5 rounded-xl font-semibold text-sm text-white hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-pointer"
            >
              <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/[0.08]" />
              <span className="text-[11px] text-white/40 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-white/[0.08]" />
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-3.5">
              {/* Email */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 block">
                  Email address
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === "email" ? "scale-[1.01]" : ""}`}>
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-4 focus:ring-site-accent/20 focus:border-site-accent/40 focus:bg-white/[0.08] transition-all text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1.5 block">
                  Password
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === "password" ? "scale-[1.01]" : ""}`}>
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-4 focus:ring-site-accent/20 focus:border-site-accent/40 focus:bg-white/[0.08] transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center pt-0.5">
                <label className="flex items-center gap-2 text-[11px] text-white/50 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="w-3 h-3 rounded border-white/20 bg-white/5 text-site-accent focus:ring-site-accent/30 cursor-pointer"
                  />
                  Remember me
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-site-accent hover:text-amber-300 font-medium transition-colors cursor-pointer"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-xs text-red-200 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-300 text-[9px] font-bold">!</span>
                  </span>
                  <span>{error}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-site-accent to-amber-400 text-site-primary font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-site-primary/30 border-t-site-primary rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Log in
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Footer link */}
            <p className="text-center text-[11px] text-white/40 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-site-accent hover:text-amber-300 transition-colors cursor-pointer"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-site-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </Layout>
  );
}