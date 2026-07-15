"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Layout } from "@/components";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Chrome,
  CheckCircle2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setCheckEmail(true);
  }

  async function handleGoogleSignup() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?redirectTo=/profile`,
      },
    });
  }

  if (checkEmail) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-site-accent/20 to-site-accent/5 flex items-center justify-center mb-6">
              <Sparkles className="w-9 h-9 text-site-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-site-text mb-3">
              Check your inbox
            </h1>
            <p className="text-site-muted leading-relaxed max-w-sm mx-auto">
              We sent a confirmation link to{" "}
              <span className="text-site-text font-semibold">{email}</span>.
            </p>
            <p className="text-site-muted text-sm mt-2">
              Click it to activate your account and start prepping.
            </p>
            <div className="mt-8 p-4 bg-white rounded-2xl border border-site-border text-left">
              <p className="text-xs font-bold text-site-muted uppercase tracking-wider mb-2">
                What happens next?
              </p>
              <ul className="space-y-2">
                {[
                  "Check your email for the confirmation link",
                  "Click the link to verify your account",
                  "Log in and start practicing",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-site-text">
                    <span className="w-5 h-5 rounded-full bg-site-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-site-accent">
                        {i + 1}
                      </span>
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-site-muted mt-6">
              Didn&apos;t get it? Check spam or{" "}
              <button
                onClick={() => setCheckEmail(false)}
                className="text-site-secondary hover:underline font-medium"
              >
                use a different email
              </button>
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  const passwordChecks = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
  ];

  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-site-primary to-site-secondary flex items-center justify-center mb-5 shadow-lg shadow-site-primary/20">
              <Sparkles className="w-6 h-6 text-site-accent" />
            </div>
            <h1 className="text-3xl font-black text-site-text tracking-tight">
              Get started for free
            </h1>
            <p className="text-site-muted mt-2 text-sm">
              No credit card. No commitment. Just prep.
            </p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl border border-site-border p-6 md:p-8 shadow-xl shadow-site-primary/[0.03]">
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 border border-site-border py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight hover:border-site-accent/20 transition-all group"
            >
              <Chrome className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-site-border" />
              <span className="text-xs text-site-muted font-medium">
                or sign up with email
              </span>
              <div className="flex-1 h-px bg-site-border" />
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full name */}
              <div>
                <label className="block text-xs font-bold text-site-muted uppercase tracking-wider mb-1.5">
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-site-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Aditi Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-2 focus:ring-site-accent/10 transition-all text-sm"
                  />
                </div>
              </div>

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
                    minLength={6}
                    placeholder="Create a strong password"
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

                {password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {passwordChecks.map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            check.met
                              ? "text-site-success"
                              : "text-site-border"
                          }`}
                        />
                        <span
                          className={
                            check.met ? "text-site-muted" : "text-site-muted/40"
                          }
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create free account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-sm text-site-muted text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-site-secondary font-semibold hover:text-site-primary transition-colors underline underline-offset-2"
            >
              Log in
            </Link>
          </p>

          <p className="text-xs text-site-muted/60 text-center mt-4">
            Trusted by 25,000+ students
          </p>
        </div>
      </div>
    </Layout>
  );
}