import { Layout } from "@/components";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users, Zap } from "lucide-react";

export const metadata = {
  title: "About SATCracker | AI-Powered SAT Preparation",
  description:
    "SATCracker helps students prepare for the SAT with AI-powered explanations, adaptive practice, and real progress tracking.",
};

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
            We&apos;re building the
            <br />
            <span className="text-site-accent">smartest way to prep.</span>
          </h1>
          <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
            SATCracker was built for students who want to stop guessing and start improving. No fluff, no busywork — just targeted practice that works.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Mission */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-site-text mb-4">Our mission</h2>
          <p className="text-site-text leading-relaxed text-[15px]">
            Most SAT prep is either too expensive or too generic. We believe every student deserves access to personalized, AI-powered preparation that actually explains the &quot;why&quot; behind every answer — not just whether you got it right or wrong.
          </p>
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

        {/* Story */}
        <div className="mb-12">
          <h2 className="text-sm font-bold text-site-text mb-4">How it started</h2>
          <p className="text-site-text leading-relaxed text-[15px] mb-4">
            SATCracker started with a simple observation: students were spending hundreds of hours on SAT prep but not seeing proportional score improvements. The problem wasn&apos;t effort — it was efficiency.
          </p>
          <p className="text-site-text leading-relaxed text-[15px]">
            By combining AI that actually explains concepts with adaptive practice that targets weak spots, we help students spend less time studying and more time improving. Every feature is built around one question: &quot;Does this actually help students score higher?&quot;
          </p>
        </div>

        {/* CTA */}
        <div className="bg-site-primary rounded-2xl p-6 md:p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-site-accent/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <h2 className="text-sm font-bold mb-2">Ready to start improving?</h2>
            <p className="text-white/50 text-xs mb-5">
              Join thousands of students who&apos;ve already made the switch to smarter prep.
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