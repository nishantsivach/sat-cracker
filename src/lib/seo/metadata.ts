import type { Metadata } from "next";
import { SEO_CONFIG, DEFAULT_ROBOTS } from "./config";
import { buildCanonical } from "./canonical";
import { createOpenGraph } from "./openGraph";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const pageTitle = title ?? SEO_CONFIG.defaultTitle;

  const pageDescription =
    description ?? SEO_CONFIG.defaultDescription;

  const canonical = buildCanonical(path);

  return {
    title: pageTitle,
    description: pageDescription,

    icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
    alternates: {
      canonical,
    },

    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : DEFAULT_ROBOTS,

    openGraph: createOpenGraph({
      title: pageTitle,
      description: pageDescription,
      path,
      image,
      type,
    }),

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [
        image
          ? buildCanonical(image)
          : buildCanonical(SEO_CONFIG.defaultOgImage),
      ],
    },
  };
}