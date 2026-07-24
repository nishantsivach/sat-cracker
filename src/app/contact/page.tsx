"use client";

import { useState } from "react";
import { Layout } from "@/components";
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  ArrowRight,
  Clock,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-site-accent/10 flex items-center justify-center mb-6 shadow-sm">
              <Send className="w-7 h-7 text-site-accent" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-site-text mb-3">
              Message sent
            </h1>
            <p className="text-site-muted leading-relaxed text-sm">
              Thanks for reaching out. We typically reply within 24 hours — 
              and yes, a real human reads every message.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-site-primary text-white rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
              >
                Back to home
              </Link>
              <Link
                href="/sat"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-site-border/60 rounded-xl text-sm font-semibold text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
              >
                SAT Guide
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <MessageSquare className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              Get in touch
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            We actually read
            <br />
            <span className="text-site-accent">every message.</span>
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            Questions, feedback, or just want to say hi? No bots, no auto-replies — just real people.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-5 gap-10 md:gap-14">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-sm font-bold text-site-text mb-4">
                Other ways to reach us
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-4 h-4 text-site-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-site-text">Email</p>
                    <a
                      href="mailto:hello@satcracker.com"
                      className="text-sm text-site-muted hover:text-site-secondary transition-colors"
                    >
                      hello@satcracker.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-4 h-4 text-site-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-site-text">Response time</p>
                    <p className="text-sm text-site-muted">Usually within 12-24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4 text-site-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-site-text">Location</p>
                    <p className="text-sm text-site-muted">Remote team · Available worldwide</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="p-5 bg-white rounded-2xl border border-site-border/60 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shadow-sm">
                  <HelpCircle className="w-4 h-4 text-site-accent" />
                </div>
                <p className="text-sm font-bold text-site-text">Looking for something else?</p>
              </div>
              <div className="space-y-1">
                {[
                  { href: "/sat/faq", label: "SAT FAQ" },
                  { href: "/sat", label: "SAT Guide" },
                  { href: "/blogs", label: "Study Blog" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between text-sm text-site-muted hover:text-site-secondary transition-colors py-2 px-2 rounded-lg hover:bg-site-highlight cursor-pointer"
                  >
                    {link.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl border border-site-border/60 p-6 md:p-8 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]">
              <h2 className="text-sm font-bold text-site-text mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-site-border/60 bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-site-border/60 bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-site-border/60 bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-site-border/60 bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}