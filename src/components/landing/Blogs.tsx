import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

interface Blog {
  title: string;
  slug: string;
  content: string;
  created_at: string;
}

function getReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}

export default function Blogs({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="py-28 px-6 bg-site-highlight relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-72 h-72 border border-site-accent/8 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-5 shadow-sm border border-site-border/60">
              <BookOpen className="w-3.5 h-3.5 text-site-accent" />
              <span className="text-xs font-bold tracking-wider text-site-primary uppercase">
                SAT Learning Hub
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-site-primary leading-[1.1] tracking-tight">
              Actually useful
              <br />
              <span className="text-site-secondary">SAT resources</span>
            </h2>

            <p className="mt-4 text-site-muted text-lg leading-relaxed">
              No recycled tips from 2015. Just practical strategies and 
              study guides written by people who understand the current SAT.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-site-secondary font-semibold text-sm hover:text-site-primary transition-colors shrink-0 cursor-pointer"
          >
            Browse all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {blogs.map((blog, index) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog.slug}
              className="group block"
            >
              <article className="relative bg-white rounded-3xl border border-site-border/60 overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                {/* Image area */}
                <div className="relative h-36 bg-site-primary overflow-hidden">
                  {/* Pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                      backgroundImage: "linear-gradient(45deg, white 2px, transparent 2px)",
                      backgroundSize: "20px 20px",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-site-primary via-site-primary to-site-secondary/80" />
                  
                  {/* Decorative circles */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-full border border-white/10" />
                  <div className="absolute bottom-3 right-10 w-5 h-5 rounded-full border border-white/10" />

                  {/* Category badge */}
                  <div className="absolute bottom-3 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-site-accent bg-white/15 backdrop-blur-sm rounded-md px-2 py-1">
                      Article {index + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Top shine */}
                  <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-site-border/30 to-transparent" />

                  {/* Meta */}
                  <div className="flex items-center gap-2 text-xs text-site-muted mb-3">
                    <time dateTime={blog.created_at} className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {new Date(blog.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-site-border" />
                    <span>{getReadTime(blog.content)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-site-text group-hover:text-site-secondary transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 text-xs text-site-muted leading-relaxed line-clamp-2 flex-1">
                    {blog.content.replace(/<[^>]*>/g, "").substring(0, 120)}
                    {blog.content.length > 120 ? "..." : ""}
                  </p>

                  {/* Read more */}
                  <div className="mt-4 pt-4 border-t border-site-border/60 flex items-center gap-1.5 text-xs font-semibold text-site-secondary group-hover:text-site-primary transition-colors">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        {blogs.length > 3 && (
          <div className="mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-white border border-site-border/60 rounded-xl px-6 py-3 text-sm font-semibold text-site-primary hover:border-site-accent/30 hover:shadow-md transition-all cursor-pointer"
            >
              See all {blogs.length} articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}