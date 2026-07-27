import type { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Admin & API
          "/admin",
          "/api",

          // Auth & User
          "/auth",
          "/dashboard",
          "/profile",
          "/account",
          "/settings",

          // Student Features
          "/chat",
          "/checkout",

          // Internal/System
          "/_next",
        ],
      },
    ],
    sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
    host: SEO_CONFIG.siteUrl,
  };
}