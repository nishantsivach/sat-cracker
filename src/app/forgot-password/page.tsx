"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Layout } from "@/components";
import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  async function handleResetRequest(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-site-accent/20 to-site-accent/5 flex items-center justify-center mb-6">
              <Send className="w-9 h-9 text-site-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-site-text mb-3">
              Check your email
            </h1>
            <p className="text-site-muted leading-relaxed max-w-sm mx-auto">
              We sent a password reset link to{" "}
              <span className="text-site-text font-semibold">{email}</span>.
            </p>
            <p className="text-site-muted text-sm mt-2">
              Click the link in the email to reset your password. The link expires in 60 minutes.
            </p>
            <div className="mt-8 p-4 bg-white rounded-2xl border border-site-border text-left">
              <p className="text-xs font-bold text-site-muted uppercase tracking-wider mb-2">
                Didn&apos;t get the email?
              </p>
              <ul className="space-y-2 text-sm text-site-muted">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Wait a few minutes — emails can be delayed</li>
              </ul>
            </div>
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setSent(false)}
                className="text-site-secondary hover:text-site-primary font-medium text-sm transition-colors"
              >
                Try a different email
              </button>
              <br />
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-site-text hover:text-site-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="relative min-h-screen flex overflow-hidden">
        {/* Page background blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-site-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-site-accent/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 items-center justify-center p-10 lg:p-16">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 bg-site-highlight border border-site-border rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-site-accent" />
              <span className="text-xs font-semibold tracking-wider text-site-accent uppercase">
                AI-Powered SAT Prep
              </span>
            </div>

            <h1 className="text-[2.5rem] lg:text-[3rem] font-black tracking-tight text-site-text leading-[1.06]">
              Forgot your
              <br />
              <span className="bg-gradient-to-r from-site-secondary to-site-accent bg-clip-text text-transparent">
                password?
              </span>
            </h1>

            <p className="mt-5 text-site-muted leading-relaxed text-[15px]">
              No worries — it happens to the best of us. Enter your email and we&apos;ll send you a link to reset it.
            </p>

            <div className="mt-8 space-y-3.5">
              {[
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Check your email for the reset link" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Click the link to create a new password" },
                { icon: <CheckCircle2 className="w-4 h-4" />, text: "Log in and continue your prep" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3.5 text-site-text group cursor-default">
                  <span className="w-9 h-9 rounded-xl bg-site-highlight flex items-center justify-center shrink-0 group-hover:bg-site-accent/10 group-hover:scale-110 transition-all duration-300">
                    <span className="text-site-accent">{item.icon}</span>
                  </span>
                  <span className="text-[15px] font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm font-semibold text-site-muted hover:text-site-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-site-primary to-site-secondary flex items-center justify-center p-6 md:p-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }} />
          <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-site-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-site-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Glass card */}
          <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl shadow-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-white/[0.03] pointer-events-none" />
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            <div className="relative z-10 p-7 md:p-8">
              {/* Header with WHITE icon box */}
              <div className="text-center mb-6">
                <div className="relative w-14 h-14 mx-auto rounded-2xl bg-white flex items-center justify-center mb-4 shadow-lg shadow-white/20">
                  <Mail className="w-6 h-6 text-site-primary" />
                  <span className="absolute -right-1 -top-1 w-5 h-5 rounded-full bg-site-accent shadow-md flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  Reset your password
                </h2>
                <p className="text-white/50 mt-1 text-xs">
                  We&apos;ll send you a reset link
                </p>
              </div>

              <form onSubmit={handleResetRequest} className="space-y-4">
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-4 focus:ring-site-accent/20 focus:border-site-accent/40 focus:bg-white/10 transition-all text-sm"
                    />
                  </div>
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
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-site-accent to-amber-400 text-site-primary font-bold text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-site-primary/30 border-t-site-primary rounded-full animate-spin" />
                      Sending link...
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer link */}
              <p className="text-center text-[11px] text-white/40 mt-4">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-site-accent hover:text-amber-300 transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}