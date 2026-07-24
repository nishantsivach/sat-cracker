import type { Metadata } from "next";
import { SEO_CONFIG } from "./config";
import { buildCanonical } from "./canonical";

type OpenGraphOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createOpenGraph({
  title,
  description,
  path,
  image,
  type = "website",
}: OpenGraphOptions): Metadata["openGraph"] {
  const imageUrl = image
    ? new URL(image, SEO_CONFIG.siteUrl).toString()
    : new URL(SEO_CONFIG.defaultOgImage, SEO_CONFIG.siteUrl).toString();

  return {
    type,
    locale: SEO_CONFIG.locale,
    siteName: SEO_CONFIG.siteName,
    title,
    description,
    url: buildCanonical(path),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}