import { SEO_CONFIG } from "./config";

/**
 * Builds an absolute canonical URL.
 *
 * Examples:
 * "/"              -> https://satcracker.com/
 * "/sat"           -> https://satcracker.com/sat
 * "sat/faq"        -> https://satcracker.com/sat/faq
 */
export function buildCanonical(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, SEO_CONFIG.siteUrl).toString();
}