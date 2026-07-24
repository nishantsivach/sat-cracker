import { Layout } from "@/components";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users, Zap } from "lucide-react";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About SATCracker | AI-Powered SAT Prep",
  description:
    "Learn how SATCracker helps students prepare for the SAT with AI tutoring, adaptive practice questions, courses, and progress tracking.",
  path: "/about",
});

export default function AboutPage() {
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

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
              About
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            We built this because
            <br />
            <span className="text-site-accent">SAT prep is broken.</span>
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            Most platforms charge a fortune for recycled content. Others give you answer keys without telling you why you got something wrong. We took a different approach.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* The problem */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-site-text mb-4">The problem with most SAT prep</h2>
          <div className="space-y-3 text-[15px] text-site-text leading-relaxed">
            <p>
              Walk into any bookstore and you&apos;ll find dozens of SAT prep books. Most of them are 500+ pages of dense content that hasn&apos;t changed meaningfully in years. Online platforms aren&apos;t much better — video lectures that take hours, generic practice sets, and score reports that tell you what you got wrong but not why.
            </p>
            <p>
              The result? Students spend months &ldquo;prepping&rdquo; without actually improving. They memorize tricks instead of understanding concepts. They do hundreds of practice questions but keep making the same mistakes.
            </p>
          </div>
        </div>

        {/* Our approach */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-site-text mb-4">How we&apos;re different</h2>
          <div className="space-y-3 text-[15px] text-site-text leading-relaxed">
            <p>
              We built SATCracker around one idea:{" "}
              <span className="font-semibold">
                understanding your mistakes is more important than practicing more questions.
              </span>{" "}
              Our AI doesn&apos;t just mark answers right or wrong — it explains the reasoning in plain English, spots patterns in your errors, and tells you exactly what to work on next.
            </p>
            <p>
              No gimmicks. No &ldquo;secret strategies.&rdquo; Just targeted practice with explanations that actually make sense.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Users, value: "25,000+", label: "Students", color: "text-site-secondary bg-site-secondary/10" },
            { icon: Target, value: "10,000+", label: "Questions", color: "text-site-accent bg-site-accent/10" },
            { icon: Zap, value: "+192", label: "Avg improvement", color: "text-site-primary bg-site-primary/10" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-site-border/60 p-5 text-center shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-black text-site-text">{stat.value}</p>
              <p className="text-xs text-site-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Who we are */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-site-text mb-4">Who&apos;s behind this</h2>
          <p className="text-[15px] text-site-text leading-relaxed">
            We&apos;re a small team of engineers and educators who&apos;ve been on both sides of the SAT — as students who stressed about scores and as tutors who helped others improve. We got tired of seeing students pay hundreds of dollars for prep that didn&apos;t deliver, so we built what we wish we&apos;d had.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-site-primary rounded-2xl p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-site-accent/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <h2 className="text-sm font-bold mb-2">See if it works for you</h2>
            <p className="text-white/50 text-xs mb-5">
              The first few practice sessions are free. No credit card, no commitment.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Start practicing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
              >
                Sign up free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}