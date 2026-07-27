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
  keywords,
  type = "website",
  noIndex = false,
}: CreateMetadataOptions): Metadata {
  const pageTitle = title ?? SEO_CONFIG.defaultTitle;
  const pageDescription =
    description ?? SEO_CONFIG.defaultDescription;

  return {
    metadataBase: new URL(SEO_CONFIG.siteUrl),

    title: pageTitle,
    description: pageDescription,

    keywords,

    authors: [
      {
        name: SEO_CONFIG.author,
      },
    ],

    publisher: SEO_CONFIG.organizationName,

    themeColor: SEO_CONFIG.themeColor,

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
    },

    alternates: {
      canonical: buildCanonical(path),
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
      creator: SEO_CONFIG.twitterHandle,
      images: [
        image
          ? buildCanonical(image)
          : buildCanonical(SEO_CONFIG.defaultOgImage),
      ],
    },
  };
}