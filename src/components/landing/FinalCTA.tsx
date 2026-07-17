import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-site-primary text-white text-center overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-site-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-site-secondary/15 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Gradient bridge to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/5 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        {/* Icon */}
        <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6">
          <Sparkles className="w-5 h-5 text-site-accent" />
        </div>

        {/* Heading */}
        <h2 className="text-[2.5rem] md:text-[3.25rem] font-black leading-[1.05] tracking-tight">
          Ready to actually
          <br />
          <span className="bg-gradient-to-r from-site-accent to-amber-300 bg-clip-text text-transparent">
            see results?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-white/50 leading-relaxed max-w-lg mx-auto text-[15px]">
          Most students waste months on random practice tests. You don&apos;t have to. 
          Start prepping with a system that actually works.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2.5 bg-site-accent text-site-primary px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Start practicing now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-5 text-sm text-white/30">
          Join 25,000+ students already prepping smarter
        </p>
      </div>
    </section>
  );
}