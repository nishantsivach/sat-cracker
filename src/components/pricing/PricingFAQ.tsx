"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You can cancel your Premium subscription at any time from your account dashboard. Your Premium access will remain active until the end of your current billing period.",
  },
  {
    question: "What's included in the Free plan?",
    answer:
      "The Free plan includes SAT guides, blog articles, practice questions, preview lessons, selected mock tests, and a daily AI SAT Tutor message limit.",
  },
  {
    question: "What do I get with Premium?",
    answer:
      "Premium unlocks unlimited AI SAT Tutor access, complete SAT courses, video lessons, full-length mock tests, detailed answer explanations, advanced analytics, and future premium resources.",
  },
  {
    question: "What's the difference between Monthly and Yearly plans?",
    answer:
      "Both plans include the same Premium features. The Yearly plan offers better value with annual billing and is ideal for students preparing over several months.",
  },
  {
    question: "Will I lose my progress if my subscription expires?",
    answer:
      "No. Your learning progress stays in your account. If your Premium subscription expires, you'll simply lose access to Premium-only features until you subscribe again.",
  },
  {
    question: "Can I upgrade later?",
    answer:
      "Absolutely. You can start with the Free plan and upgrade to Premium whenever you're ready. No pressure, no deadlines.",
  },
];

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-site-highlight py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 border border-site-border shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-site-accent" />
            <span className="text-xs font-bold tracking-[0.2em] text-site-primary uppercase">
              FAQ
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-site-primary leading-[1.1] tracking-tight">
            Common questions
            <br />
            <span className="text-site-secondary">about pricing.</span>
          </h2>

          <p className="mt-4 text-site-muted text-lg leading-relaxed max-w-lg">
            Everything you need to know before choosing a plan.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3" role="region" aria-label="Frequently asked questions">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 ${
                openIndex === index
                  ? "bg-white border-site-accent/20 shadow-lg shadow-site-accent/5"
                  : "bg-white/60 border-site-border hover:border-site-accent/20 hover:bg-white"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer"
              >
                <span
                  className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                    openIndex === index ? "text-site-primary" : "text-site-text"
                  }`}
                >
                  {faq.question}
                </span>

                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    openIndex === index
                      ? "bg-site-accent text-white rotate-180"
                      : "bg-site-highlight text-site-muted hover:bg-site-accent/10 hover:text-site-primary"
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
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-[15px] text-site-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}