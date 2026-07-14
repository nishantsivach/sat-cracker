import Link from "next/link";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, BookOpen } from "lucide-react";


const topicGuides: Record<
  string,
  {
    slug: string;
    name: string;
    section: "math" | "reading-writing";
    summary: string;
    meta_title: string;
    meta_description: string;
    body: string;
    related: { title: string; href: string }[];
  }
> = {
  "linear-equations": {
    slug: "linear-equations",
    name: "Linear Equations",
    section: "math",
    summary: "How to identify, set up, and solve linear equations on the SAT Math section.",
    meta_title: "SAT Linear Equations: Formulas, Examples & Practice",
    meta_description:
      "Master SAT linear equations — key formulas, worked examples, and common mistakes to avoid.",
    body: `A linear equation is any equation that can be written in the form **ax + b = c**, where the variable appears only to the first power.

## Key steps to solve
1. Combine like terms on each side.
2. Move variable terms to one side, constants to the other.
3. Divide by the coefficient of the variable.

## Example
Solve **2x + 3 = 7**:
- Subtract 3 from both sides: 2x = 4
- Divide by 2: x = 2

## Common mistakes
- Forgetting to distribute a negative sign across parentheses.
- Flipping the inequality sign incorrectly (for linear inequalities).`,
    related: [{ title: "Punctuation Rules", href: "/topics/punctuation-rules" }],
  },
  "punctuation-rules": {
    slug: "punctuation-rules",
    name: "Punctuation Rules",
    section: "reading-writing",
    summary: "The comma, semicolon, and colon rules the SAT tests most often.",
    meta_title: "SAT Punctuation Rules: Commas, Semicolons & Colons",
    meta_description:
      "A quick-reference guide to the SAT's most commonly tested punctuation rules, with examples.",
    body: `The SAT Reading & Writing section tests a small, predictable set of punctuation rules.

## Commas
Use a comma before a coordinating conjunction (FANBOYS) joining two independent clauses.

## Semicolons
A semicolon joins two independent clauses without a conjunction.

## Colons
A colon introduces a list or explanation, and must follow a complete independent clause.`,
    related: [{ title: "Linear Equations", href: "/topics/linear-equations" }],
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
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link href={sectionHref[guide.section]} className="inline-flex items-center text-site-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to {guide.section === "math" ? "Math" : "Reading & Writing"}
        </Link>

        <div className="flex items-center gap-2 mb-3 text-site-primary">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase">SAT Topic Guide</span>
        </div>

        <h1 className="text-4xl font-bold mb-3 text-site-text">{guide.name}</h1>
        <p className="text-lg text-site-muted mb-10">{guide.summary}</p>

        <article className="prose lg:prose-lg prose-headings:text-site-secondary prose-a:text-site-primary max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {guide.body}
          </ReactMarkdown>
        </article>

        {guide.related.length > 0 && (
          <div className="border-t border-site-border mt-12 pt-6">
            <h2 className="font-semibold text-site-text mb-3">Related Topics</h2>
            <ul className="space-y-1">
              {guide.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-site-primary hover:underline">
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}