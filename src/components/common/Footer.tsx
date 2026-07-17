"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  resources: [
    { label: "SAT Blog", href: "/blogs" },
    { label: "Practice Tests", href: "/practice" },
    { label: "SAT Guide", href: "/sat" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-site-border">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="SATCracker"
                width={200}
                height={56}
                className="h-14 w-auto"
                priority
              />
            </Link>

            <p className="text-sm text-site-muted leading-relaxed max-w-xs">
              AI-powered SAT prep that focuses on what actually matters —
              understanding your mistakes and improving your score.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-site-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-site-accent" />
              Trusted by 25,000+ students
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-site-muted mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-site-text hover:text-site-secondary transition-colors inline-flex items-center gap-1 group cursor-pointer"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-site-muted mb-4">
              Stay sharp
            </h3>
            <p className="text-sm text-site-muted mb-3 leading-relaxed">
              Weekly SAT tips and strategy breakdowns. No spam.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-site-background border border-site-border rounded-lg px-3.5 py-2.5 text-sm text-site-text placeholder:text-site-muted focus:outline-none focus:border-site-accent/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-site-primary text-white px-4 rounded-lg text-sm font-bold hover:bg-site-primary/90 transition-colors shrink-0 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-site-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-site-muted">
          <p>© {new Date().getFullYear()} SATCracker. All rights reserved.</p>
          <p>Made for students who actually want to improve.</p>
        </div>
      </div>
    </footer>
  );
}