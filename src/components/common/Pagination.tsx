import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
};

function buildHref(basePath: string, params: Record<string, string | undefined>, page: number) {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) usp.set(key, value);
  });
  usp.set("page", String(page));
  return `${basePath}?${usp.toString()}`;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-xs text-site-muted">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-1.5">
        <Link
          href={buildHref(basePath, searchParams, Math.max(1, currentPage - 1))}
          aria-disabled={currentPage === 1}
          className={`p-2 rounded-lg border border-site-border bg-white text-site-text hover:bg-site-highlight transition-colors cursor-pointer ${
            currentPage === 1 ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </Link>

        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`e-${i}`} className="px-2 text-xs text-site-muted">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(basePath, searchParams, p)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                p === currentPage
                  ? "bg-site-primary text-white shadow-sm"
                  : "border border-site-border bg-white text-site-text hover:bg-site-highlight"
              }`}
            >
              {p}
            </Link>
          )
        )}

        <Link
          href={buildHref(basePath, searchParams, Math.min(totalPages, currentPage + 1))}
          aria-disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border border-site-border bg-white text-site-text hover:bg-site-highlight transition-colors cursor-pointer ${
            currentPage === totalPages ? "pointer-events-none opacity-30" : ""
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}