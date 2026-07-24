"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Medal, Star } from "lucide-react";

const students = [
  {
    name: "Alex Chen",
    role: "SAT Student",
    before: "1180",
    after: "1390",
    gain: "+210",
    text: "The AI explanations actually made sense. Finally understood what I was doing wrong in Math.",
    initials: "AC",
    highlight: true,
  },
  {
    name: "Sarah Kim",
    role: "High School Junior",
    before: "1240",
    after: "1420",
    gain: "+180",
    text: "Ngl the personalized practice was clutch. Focused on my weak spots and it showed.",
    initials: "SK",
    highlight: false,
  },
  {
    name: "David Park",
    role: "SAT Aspirant",
    before: "1120",
    after: "1350",
    gain: "+230",
    text: "The study roadmap was a game-changer. Knew exactly what to hit before test day.",
    initials: "DP",
    highlight: false,
  },
  {
    name: "Maria Garcia",
    role: "High School Senior",
    before: "1260",
    after: "1480",
    gain: "+220",
    text: "Went from stressed to confident. The adaptive practice knew exactly what I needed to work on.",
    initials: "MG",
    highlight: false,
  },
  {
    name: "James Wilson",
    role: "SAT Student",
    before: "1050",
    after: "1280",
    gain: "+230",
    text: "Never thought I'd break 1200. The step-by-step explanations changed everything for me.",
    initials: "JW",
    highlight: false,
  },
  {
    name: "Emily Torres",
    role: "Junior",
    before: "1320",
    after: "1510",
    gain: "+190",
    text: "The timed practice tests were a game-changer. Walked into the real test feeling ready.",
    initials: "ET",
    highlight: true,
  },
  {
    name: "Ryan Patel",
    role: "SAT Aspirant",
    before: "1150",
    after: "1360",
    gain: "+210",
    text: "Math was always my weak spot. The AI tutor broke down concepts in a way that finally clicked.",
    initials: "RP",
    highlight: false,
  },
  {
    name: "Zoe Williams",
    role: "High School Student",
    before: "1280",
    after: "1450",
    gain: "+170",
    text: "Reading comprehension used to destroy me. Now I actually know what to look for in passages.",
    initials: "ZW",
    highlight: false,
  },
  {
    name: "Kevin O'Brien",
    role: "Senior",
    before: "1090",
    after: "1310",
    gain: "+220",
    text: "Two months of consistent practice with SATCracker and I jumped over 200 points. Worth every minute.",
    initials: "KO",
    highlight: false,
  },
  {
    name: "Priya Sharma",
    role: "SAT Student",
    before: "1340",
    after: "1530",
    gain: "+190",
    text: "The personalized study plan kept me on track. Didn't waste time on stuff I already knew.",
    initials: "PS",
    highlight: true,
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const cardsPerView = 3;
  const totalSlides = Math.ceil(students.length / cardsPerView);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      if (!scrollRef.current) return;

      const cardWidth = scrollRef.current.scrollWidth / students.length;
      const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        const nextScroll = nextIndex * cardWidth;

        if (nextScroll >= maxScroll) {
          scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
          return 0;
        } else {
          scrollRef.current?.scrollTo({ left: nextScroll, behavior: "smooth" });
          return nextIndex;
        }
      });
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused]);

  return (
    <section className="py-28 px-6 bg-site-background relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1B2A4A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm border border-site-border/60">
            <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              Student Results
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-black text-site-primary leading-[1.05] tracking-tight">
            Scores don&apos;t lie.
            <br />
            <span className="text-site-secondary">
              These results do the talking.
            </span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-xl">
            {students.length}+ students who showed up, did the work, and got the scores they wanted.
          </p>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 3000)}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {students.map((student, index) => (
            <article
              key={student.name}
              className="group relative bg-white rounded-3xl border border-site-border/60 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 snap-start shrink-0 w-[340px] md:w-[380px]"
            >
              {/* Top shine */}
              <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-site-border/40 to-transparent" />

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-site-accent/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative p-6 h-full flex flex-col min-h-[300px]">
                {/* Top row: Avatar + Score */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm ${
                      index % 3 === 0
                        ? "bg-site-primary"
                        : index % 3 === 1
                        ? "bg-site-secondary"
                        : "bg-site-accent"
                    }`}
                  >
                    {student.initials}
                  </div>

                  <div className="text-right">
                    <span className="text-[2rem] font-black text-site-primary leading-none tracking-tight">
                      {student.after}
                    </span>
                    <div className="flex items-center justify-end gap-1.5 mt-1">
                      <span className="text-xs text-site-muted line-through">
                        {student.before}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-site-accent" />
                      <span className="text-xs font-bold text-site-accent">
                        {student.gain}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-site-text leading-relaxed mb-5 flex-1 text-sm">
                  <span className="text-site-accent/25 text-2xl leading-none font-serif">
                    &ldquo;
                  </span>
                  {student.text}
                </blockquote>

                {/* Bottom: Name + badge */}
                <div className="flex items-center justify-between pt-4 border-t border-site-border/60">
                  <div>
                    <div className="text-site-primary font-semibold text-xs">
                      {student.name}
                    </div>
                    <div className="text-site-muted text-[11px]">
                      {student.role}
                    </div>
                  </div>

                  {student.highlight ? (
                    <div className="flex items-center gap-1.5 bg-site-accent/10 px-2.5 py-1 rounded-lg">
                      <Medal className="w-3.5 h-3.5 text-site-accent" />
                      <span className="text-[10px] font-bold text-site-accent">
                        Top Improver
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-site-accent text-site-accent"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!scrollRef.current) return;
                const cardWidth = scrollRef.current.scrollWidth / students.length;
                scrollRef.current.scrollTo({
                  left: i * cardWidth * cardsPerView,
                  behavior: "smooth",
                });
                setCurrentIndex(i * cardsPerView);
              }}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                Math.floor(currentIndex / cardsPerView) === i
                  ? "w-5 h-2 bg-site-accent"
                  : "w-2 h-2 bg-site-border hover:bg-site-muted"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Bottom trust row */}
        <div className="mt-16 pt-14 border-t border-site-border/60">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {students.slice(0, 5).map((s, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-lg border-2 border-site-background bg-white flex items-center justify-center text-[10px] font-bold text-site-primary shadow-sm"
                  >
                    {s.initials}
                  </div>
                ))}
                <div className="w-9 h-9 rounded-lg border-2 border-site-background bg-site-highlight flex items-center justify-center text-[10px] font-bold text-site-muted shadow-sm">
                  +{students.length - 5}
                </div>
              </div>
              <div>
                <div className="text-2xl font-black text-site-primary">
                  {students.length * 800}+
                </div>
                <div className="text-sm text-site-muted">students prepping smarter</div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-black text-site-accent">+192</div>
                <div className="text-sm text-site-muted">avg improvement</div>
              </div>
              <div className="w-px h-10 bg-site-border/60" />
              <div className="text-center">
                <div className="text-2xl font-black text-site-primary">4.9</div>
                <div className="text-sm text-site-muted">out of 5 rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}