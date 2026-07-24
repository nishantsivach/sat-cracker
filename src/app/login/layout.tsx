import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | SATCracker",
  description:
    "Log in to SATCracker to continue your SAT preparation with AI Tutor, courses, and mock tests.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}