import Link from "next/link";
import { Layout } from "@/components";
import { ArrowLeft } from "lucide-react";


const faqData = {
  title: "SAT FAQ — Common Questions Answered",
  meta_title: "SAT FAQ: Registration, Scoring, Retakes & More",
  meta_description:
    "Answers to the most common SAT questions — registration, scoring, retakes, and how to prepare.",
  items: [
    {
      q: "How is the SAT scored?",
      a: "The SAT has two sections — Math, and Reading & Writing — each scored from 200 to 800, for a combined score of 400 to 1600.",
    },
    {
      q: "How many times can I retake the SAT?",
      a: "There's no official limit. Most students take it 1-2 times; colleges typically consider your highest score.",
    },
    {
      q: "When should I register for the SAT?",
      a: "Register at least a month before your preferred test date, since seats and locations fill up early.",
    },
    {
      q: "Is a calculator allowed on the SAT Math section?",
      a: "Yes — the current digital SAT allows a calculator (built-in or approved) for the entire Math section.",
    },
  ],
};

export const metadata = {
  title: faqData.meta_title,
  description: faqData.meta_description,
};

export default function SatFaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href="/sat" className="inline-flex items-center text-blue-700 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to SAT Guide
        </Link>

        <h1 className="text-4xl font-bold mb-10 text-neutral-900">{faqData.title}</h1>

        <div className="space-y-4">
          {faqData.items.map((item) => (
            <div key={item.q} className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-2 text-neutral-900">{item.q}</h2>
              <p className="text-neutral-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}