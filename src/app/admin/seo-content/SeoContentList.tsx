"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ExternalLink,
  FileText,
  AlertTriangle,
} from "lucide-react";

type ContentPage = {
  id: string;
  title: string;
  slug: string;
  type: "pillar" | "section" | "logistics" | "comparison" | "faq";
  updated_at: string;
};

export default function SeoContentList({
  initialPages,
}: {
  initialPages: ContentPage[];
}) {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = pages.filter((page) =>
    page.title.toLowerCase().includes(search.toLowerCase())
  );

  const deletePage = async (id: string) => {
    setBusyId(id);

    try {
      const res = await fetch(`/api/admin/seo-content/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setPages((prev) => prev.filter((p) => p.id !== id));
    } finally {
      setBusyId(null);
      setDeleteTarget(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            SEO Content
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {pages.length} page{pages.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <Link
          href="/admin/seo-content/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          New Page
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Title
              </th>

              <th className="hidden sm:table-cell text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Type
              </th>

              <th className="hidden md:table-cell text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Slug
              </th>

              <th className="hidden lg:table-cell text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Updated
              </th>

              <th className="text-right px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-site-border">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <FileText className="w-6 h-6 text-site-muted" />
                    </div>

                    <p className="text-site-muted text-sm">
                      {pages.length === 0
                        ? "No SEO pages yet."
                        : "No pages match your search."}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {filtered.map((page) => (
              <tr
                key={page.id}
                className="hover:bg-site-highlight/40 transition-colors"
              >
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-site-text">
                    {page.title}
                  </p>
                </td>

                <td className="hidden sm:table-cell px-5 py-3.5">
                  <span className="capitalize text-xs font-medium text-site-muted bg-site-highlight px-2 py-1 rounded-full">
                    {page.type.replace("-", " ")}
                  </span>
                </td>

                <td className="hidden md:table-cell px-5 py-3.5 text-site-muted font-mono text-xs">
                  {page.slug}
                </td>

                <td className="hidden lg:table-cell px-5 py-3.5 text-site-muted text-xs">
                  {new Date(page.updated_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={page.type === "pillar" ? `/${page.slug}` : `/sat/${page.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View live page"
                      className="p-2 rounded-lg text-site-muted hover:text-site-secondary hover:bg-site-highlight transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <Link
                      href={`/admin/seo-content/${page.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => setDeleteTarget(page.id)}
                      className="p-2 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>

              <div>
                <p className="text-sm font-bold text-site-text">
                  Delete this page?
                </p>

                <p className="text-xs text-site-muted mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-site-border text-sm font-semibold text-site-text hover:bg-site-highlight transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={() => deletePage(deleteTarget)}
                disabled={busyId === deleteTarget}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 disabled:opacity-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}