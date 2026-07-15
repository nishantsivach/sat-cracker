import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative py-28 md:py-36 px-6 bg-site-primary text-white text-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-site-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-site-secondary/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white/10 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8">
          <Sparkles className="w-6 h-6 text-site-accent" />
        </div>

        <h2 className="text-[2.5rem] md:text-[3.5rem] font-black leading-[1.05] tracking-tight">
          Ready to actually
          <br />
          <span className="bg-gradient-to-r from-site-accent to-amber-300 bg-clip-text text-transparent">
            see results?
          </span>
        </h2>

        <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-lg mx-auto">
          Most students waste months on random practice tests. You don&apos;t have to. 
          Start prepping with a system that actually works.
        </p>

        <div className="mt-10">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-3 bg-site-accent text-site-primary px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-site-accent/25 hover:shadow-site-accent/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Start practicing now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="mt-6 text-sm text-white/40">
          Join 25,000+ students already prepping smarter
        </p>
      </div>
    </section>
  );
}