import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a free SATCracker account — AI-powered SAT prep, practice questions, and progress tracking.",
  alternates: { canonical: "/signup" },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}