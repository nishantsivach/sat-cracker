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
  LogIn,
  Chrome,
  Eye,
  EyeOff,
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
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-site-primary to-site-secondary flex items-center justify-center mb-5 shadow-lg shadow-site-primary/20">
            <LogIn className="w-6 h-6 text-site-accent" />
          </div>
          <h1 className="text-3xl font-black text-site-text tracking-tight">
            Welcome back
          </h1>
          <p className="text-site-muted mt-2 text-sm">
            Your SAT prep is waiting.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl border border-site-border p-6 md:p-8 shadow-xl shadow-site-primary/[0.03]">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-site-border py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight hover:border-site-accent/20 transition-all group"
          >
            <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-site-border" />
            <span className="text-xs text-site-muted font-medium">
              or log in with email
            </span>
            <div className="flex-1 h-px bg-site-border" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-site-muted" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-2 focus:ring-site-accent/10 transition-all text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-site-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-2 focus:ring-site-accent/10 transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-site-muted hover:text-site-text transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-site-muted cursor-pointer">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded border-site-border text-site-secondary focus:ring-site-accent/20"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-site-secondary hover:text-site-primary transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-site-primary to-site-secondary text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-site-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Log in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-sm text-site-muted text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-site-secondary font-semibold hover:text-site-primary transition-colors underline underline-offset-2"
          >
            Sign up for free
          </Link>
        </p>
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