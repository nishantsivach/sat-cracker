import type { Metadata } from "next";

// The practice page is a gated route in the roadmap (Phase 4) and currently
// shows dummy data — noindex keeps it out of search results until it holds
// real, unique, per-user content behind Auth.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return children;
}