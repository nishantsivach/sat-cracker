import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Log In",
  description: "Log in to SATCracker to continue your SAT preparation with AI Tutor, courses, and mock tests.",
  path: "/login",
  noIndex: true,
})

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}