"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export type FaqItem = {
  q: string;
  a: string;
};

type Props = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-site-muted text-sm">
          No FAQs available yet.
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-3"
      role="region"
      aria-label="Frequently asked questions"
    >
      {items.map((faq, index) => (
        <div
          key={index}
          className={`rounded-3xl border transition-all duration-200 ${
            openIndex === index
              ? "bg-white border-site-accent/20 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)]"
              : "bg-white/50 border-site-border/60 hover:border-site-accent/15 hover:bg-white hover:shadow-sm"
          }`}
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? -1 : index)
            }
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4 cursor-pointer"
          >
            <span
              className={`text-sm md:text-base font-bold transition-colors duration-200 ${
                openIndex === index
                  ? "text-site-primary"
                  : "text-site-text"
              }`}
            >
              {faq.q}
            </span>

            <span
              className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                openIndex === index
                  ? "bg-site-accent text-white rotate-180 shadow-sm"
                  : "bg-white border border-site-border/60 text-site-muted"
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
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] text-site-muted leading-relaxed">
                {faq.a}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}