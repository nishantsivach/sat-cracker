import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteName: "SATCracker",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  defaultTitle: "SATCracker — AI-Powered SAT Prep | Practice Smarter",

  titleTemplate: "%s | SATCracker",

  defaultDescription:
    "Prepare for the SAT with AI-powered explanations, adaptive practice questions, and real progress tracking.",

  defaultOgImage: "/images/og/default-og.png",

  locale: "en_US",

  language: "en",

  themeColor: "#0F172A",

  organizationName: "SATCracker",
} as const;

export const DEFAULT_ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};