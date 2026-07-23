import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-28 md:py-32 px-6 bg-site-primary text-white text-center overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-site-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-site-secondary/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

      {/* Gradient bridge to footer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white/[0.03] pointer-events-none" />

      <div className="relative max-w-xl mx-auto">
        {/* Icon */}
        <div className="w-11 h-11 mx-auto rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6 shadow-sm">
          <Sparkles className="w-5 h-5 text-site-accent" />
        </div>

        {/* Heading */}
        <h2 className="text-[2.25rem] md:text-[3rem] font-black leading-[1.08] tracking-tight">
          Ready to actually
          <br />
          <span className="bg-gradient-to-r from-site-accent to-amber-300 bg-clip-text text-transparent">
            see results?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-white/40 leading-relaxed max-w-md mx-auto text-[15px]">
          Most students waste months on random practice tests. You don&apos;t have to. 
          Start prepping with a system that actually works.
        </p>

        {/* Button */}
        <div className="mt-7">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2.5 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-site-accent/20 hover:shadow-xl hover:shadow-site-accent/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            Start practicing now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust line */}
        <p className="mt-5 text-xs text-white/25">
          Join 25,000+ students already prepping smarter
        </p>
      </div>
    </section>
  );
}