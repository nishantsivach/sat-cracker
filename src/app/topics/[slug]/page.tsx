import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Clock, BarChart3, ArrowRight } from "lucide-react";

const topicGuides: Record<
  string,
  {
    slug: string;
    name: string;
    section: "math" | "reading-writing";
    sectionLabel: string;
    summary: string;
    meta_title: string;
    meta_description: string;
    body: string;
    readTime: string;
    related: { title: string; href: string }[];
  }
> = {
  "linear-equations": {
    slug: "linear-equations",
    name: "Linear Equations",
    section: "math",
    sectionLabel: "SAT Math",
    summary:
      "How to identify, set up, and solve linear equations on the SAT Math section — with examples you'll actually see on test day.",
    meta_title: "SAT Linear Equations: Formulas, Examples & Practice",
    meta_description:
      "Master SAT linear equations — key formulas, worked examples, and common mistakes to avoid.",
    readTime: "4 min read",
    body: `A linear equation is any equation where the variable appears only to the first power. On the SAT, these show up in about 8-10 questions across both Math modules.

## How to solve (every time)

**1. Combine like terms** on each side first.

**2. Move variables to one side**, constants to the other.

**3. Divide** by the coefficient of the variable.

## Example 1: Basic solve

Solve **2x + 3 = 7**:

- Subtract 3 from both sides: **2x = 4**
- Divide by 2: **x = 2**

## Example 2: Variables on both sides

Solve **3x - 5 = x + 7**:

- Subtract x from both sides: **2x - 5 = 7**
- Add 5 to both sides: **2x = 12**
- Divide by 2: **x = 6**

## SAT traps to watch for

- **Negative signs** — forgetting to distribute a negative across parentheses is the #1 mistake students make.
- **No solution** — if variables cancel and you get something like 0 = 5, there's no solution. The SAT loves this.
- **Infinite solutions** — if you end up with 0 = 0, any value of x works. Another SAT favorite.
- **Inequalities** — if you multiply or divide by a negative, flip the inequality sign.`,
    related: [
      { title: "Systems of Equations", href: "/topics/systems-of-equations" },
      { title: "Linear Inequalities", href: "/topics/linear-inequalities" },
      { title: "Quadratics", href: "/topics/quadratics" },
    ],
  },
  "punctuation-rules": {
    slug: "punctuation-rules",
    name: "Punctuation Rules",
    section: "reading-writing",
    sectionLabel: "SAT Reading & Writing",
    summary:
      "The comma, semicolon, and colon rules the SAT tests most often. Master these three and you've covered 80% of punctuation questions.",
    meta_title: "SAT Punctuation Rules: Commas, Semicolons & Colons",
    meta_description:
      "A quick-reference guide to the SAT's most commonly tested punctuation rules, with examples.",
    readTime: "3 min read",
    body: `The SAT tests a small, predictable set of punctuation rules. You don't need to memorize a grammar textbook — just these three patterns show up in roughly 4-5 questions per test.

## Commas (most common)

Use a comma **before a FANBOYS conjunction** (for, and, nor, but, or, yet, so) when it joins two complete sentences.

> *I studied for weeks, and my score improved by 150 points.*

**Don't use a comma** between a subject and its verb — the SAT tests this constantly.

> Wrong: *The student who studied hard, scored well.*
> Right: *The student who studied hard scored well.*

## Semicolons

A semicolon joins two complete sentences **without a conjunction**. Think of it as a soft period — both sides must be able to stand alone.

> *The test was difficult; I still finished early.*

If you can replace the semicolon with a period and both sides still work, it's correct.

## Colons

A colon introduces a list or explanation. **The part before the colon must be a complete sentence.**

> *The SAT tests three things: math, reading, and writing.*

If the part before the colon is a fragment, it's wrong.

> Wrong: *The three subjects are: math, reading, and writing.*`,
    related: [
      { title: "Command of Evidence", href: "/topics/command-of-evidence" },
      { title: "Transitions", href: "/topics/transitions" },
      { title: "Subject-Verb Agreement", href: "/topics/subject-verb-agreement" },
    ],
  },
};

const sectionHref: Record<string, string> = {
  math: "/sat/math",
  "reading-writing": "/sat/reading-writing",
};

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = topicGuides[slug];
  if (!guide) return {};
  return { title: guide.meta_title, description: guide.meta_description };
}

export default async function TopicGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = topicGuides[slug];
  if (!guide) notFound();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href={sectionHref[guide.section]}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {guide.sectionLabel}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              {guide.sectionLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {guide.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {guide.name}
          </h1>
          <p className="text-white/60 leading-relaxed max-w-2xl text-[15px]">
            {guide.summary}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        {/* Quick tip card */}
        <div className="bg-site-highlight rounded-2xl border border-site-border p-5 mb-10 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-site-accent/10 flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 text-site-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-site-text">Quick tip</p>
            <p className="text-sm text-site-muted mt-0.5">
              {guide.section === "math"
                ? "Most SAT math questions follow predictable patterns. Learn the pattern once, apply it everywhere."
                : "Don't memorize all grammar rules. Focus on the 3-4 punctuation rules the SAT actually tests repeatedly."}
            </p>
          </div>
        </div>

        {/* Markdown content */}
        <article className="prose prose-lg max-w-none prose-headings:text-site-text prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-site-text prose-p:leading-relaxed prose-strong:text-site-primary prose-blockquote:border-site-accent prose-blockquote:text-site-muted prose-blockquote:italic prose-li:text-site-text prose-code:bg-site-highlight prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {guide.body}
          </ReactMarkdown>
        </article>

        {/* Related topics */}
        {guide.related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-site-border">
            <h2 className="text-lg font-bold text-site-text mb-4">
              Next topics to tackle
            </h2>
            <div className="space-y-2">
              {guide.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="group flex items-center justify-between p-4 bg-white border border-site-border rounded-xl hover:border-site-accent/20 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-medium text-site-text group-hover:text-site-secondary transition-colors">
                    {r.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-site-muted group-hover:text-site-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center">
          <p className="text-white font-bold">
            Ready to practice {guide.name.toLowerCase()}?
          </p>
          <p className="text-white/60 text-sm mt-1">
            Apply what you just learned with real SAT-style questions.
          </p>
          <Link
            href="/practice"
            className="inline-flex items-center gap-2 mt-4 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-accent/90 transition-colors"
          >
            Start practicing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}