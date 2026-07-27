import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteName: "SATCracker",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  defaultTitle: "Digital SAT Prep, Practice Tests & AI Tutor | SATCracker",

  titleTemplate: "%s | SATCracker",

  defaultDescription:
    "Prepare for the Digital SAT with adaptive practice questions, full-length mock tests, AI tutoring, video lessons, and personalized progress tracking.",

  defaultOgImage: "/images/og/default-og.png",

  locale: "en_US",

  language: "en",

  themeColor: "#0F172A",

  organizationName: "SATCracker",
  
  author: "SATCracker",

  keywords: [
    "SAT Prep",
    "Digital SAT",
    "SAT Practice Tests",
    "SAT Mock Tests",
    "SAT Math",
    "SAT Reading",
    "SAT AI Tutor",
    "SAT Courses",
  ],

  twitterHandle: "@satcracker",
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