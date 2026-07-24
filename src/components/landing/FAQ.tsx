"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "What actually is SATCracker?",
    a: "It's an AI-powered SAT prep tool focused on one thing: helping you understand why you got questions wrong. No endless video lectures, no generic tips — just targeted practice that adapts to your weak spots.",
  },
  {
    q: "How's the AI different from Googling answers?",
    a: "Google gives you the what. Our AI gives you the why. It spots patterns in your mistakes, then explains concepts in a way that actually clicks. Think of it as having a tutor who remembers every question you've ever struggled with.",
  },
  {
    q: "Does it cover both Math and Reading & Writing?",
    a: "Yes — full coverage. Math spans algebra through advanced topics. Reading & Writing covers passages, grammar, and command of evidence. Both sections get the same AI-powered explanations.",
  },
  {
    q: "What's the catch with pricing?",
    a: "Honest answer: the core features are free, including AI explanations and practice. Advanced features like detailed analytics and custom study plans are part of paid plans. But we don't gatekeep the learning tools behind a paywall.",
  },
  {
    q: "Real talk — how fast can I improve my score?",
    a: "Depends entirely on you. We've seen students jump 150+ points in a month with consistent daily practice. We've also seen people stay flat because they crammed last minute. The tools work. The variable is how you use them.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-28 px-6 bg-site-highlight relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-site-accent/8 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 border border-site-accent/4 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm border border-site-border/60">
            <HelpCircle className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              FAQ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-primary leading-[1.1] tracking-tight">
            No marketing speak.
            <br />
            <span className="text-site-secondary">
              Just honest answers.
            </span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-lg">
            Questions students actually ask — answered without the corporate filter.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3" role="region" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-3xl border transition-all duration-200 ${
                openIndex === index
                  ? "bg-white border-site-accent/20 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
                  : "bg-white/50 border-site-border/60 hover:border-site-accent/15 hover:bg-white hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer"
              >
                <span
                  className={`text-sm md:text-base font-bold transition-colors duration-200 ${
                    openIndex === index ? "text-site-primary" : "text-site-text"
                  }`}
                >
                  {faq.q}
                </span>

                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                    openIndex === index
                      ? "bg-site-accent text-white rotate-180 shadow-sm"
                      : "bg-white border border-site-border/60 text-site-muted group-hover:text-site-primary group-hover:border-site-accent/30"
                  }`}
                  aria-hidden="true"
                >
                  {openIndex === index ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] text-site-muted leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-5 bg-white rounded-2xl border border-site-border/60 text-center shadow-sm">
          <p className="text-sm text-site-text font-medium">
            Still have questions?
          </p>
          <p className="text-xs text-site-muted mt-1">
            We read and reply to every message — no bots.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
          >
            Get in touch
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}