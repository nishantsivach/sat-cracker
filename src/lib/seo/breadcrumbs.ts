import { buildCanonical } from "./canonical";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

/**
 * Creates BreadcrumbList JSON-LD schema.
 *
 * Example:
 * createBreadcrumbSchema([
 *   { name: "Home", path: "/" },
 *   { name: "SAT", path: "/sat" },
 *   { name: "Digital SAT", path: "/sat/digital-sat" },
 * ]);
 */
export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  if (items.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildCanonical(item.path),
    })),
  };
}