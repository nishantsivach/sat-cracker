import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the SATCracker team — questions, feedback, or support requests.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}