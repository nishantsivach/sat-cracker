import Link from "next/link";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-white to-neutral-200 text-neutral-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 shadow-sm border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">SATCracker</h1>
          <Link
            href="/chat"
            className="px-4 py-2 rounded-xl bg-neutral-800 text-white hover:bg-neutral-700 transition"
          >
            Start Chat
          </Link>
        </div>
      </header>

      {/* Page content */}
      <main className="pt-32">{children}</main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-neutral-500 border-t mt-20">
        &copy; {new Date().getFullYear()} SATCracker. All rights reserved.
      </footer>
    </div>
  );
}
