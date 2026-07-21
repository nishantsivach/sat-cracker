"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ExternalLink, GraduationCap, AlertTriangle } from "lucide-react";
import Pagination from "@/components/common/Pagination";

type College = {
  id: string;
  name: string;
  slug: string;
  avg_sat_score: number | null;
  is_published: boolean;
};

export default function CollegesList({
  colleges,
  totalCount,
  currentPage,
  pageSize,
  search: initialSearch,
}: {
  colleges: College[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  search: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [localColleges, setLocalColleges] = useState(colleges);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => setLocalColleges(colleges), [colleges]);

  useEffect(() => {
    if (search === initialSearch) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    }, 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const togglePublish = async (college: College) => {
    setBusyId(college.id);
    const nextValue = !college.is_published;
    setLocalColleges((prev) =>
      prev.map((c) => (c.id === college.id ? { ...c, is_published: nextValue } : c))
    );
    try {
      const res = await fetch(`/api/admin/colleges/${college.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...college, is_published: nextValue }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setLocalColleges((prev) =>
        prev.map((c) => (c.id === college.id ? { ...c, is_published: college.is_published } : c))
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteCollege = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/colleges/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLocalColleges((prev) => prev.filter((c) => c.id !== id));
      router.refresh();
    } finally {
      setBusyId(null);
      setDeleteTarget(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-site-text">Colleges</h1>
          <p className="text-sm text-site-muted mt-0.5">
            {totalCount} college{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/colleges/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New college
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Name
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden sm:table-cell">
                Slug
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Avg SAT
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Status
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-site-border">
            {localColleges.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-site-muted" />
                    </div>
                    <p className="text-site-muted text-sm">
                      {totalCount === 0
                        ? "No colleges yet — add your first one."
                        : "No colleges match your search."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {localColleges.map((college) => (
              <tr key={college.id} className="hover:bg-site-highlight/40 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-site-text">{college.name}</p>
                </td>
                <td className="px-5 py-3.5 text-site-muted font-mono text-xs hidden sm:table-cell">
                  {college.slug}
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-bold text-site-secondary">
                    {college.avg_sat_score ?? "—"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => togglePublish(college)}
                    disabled={busyId === college.id}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 cursor-pointer border ${
                      college.is_published
                        ? "bg-green-50 text-site-success border-green-200 hover:bg-green-100"
                        : "bg-site-highlight text-site-muted border-site-border hover:bg-site-border"
                    }`}
                  >
                    {college.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/sat/colleges/${college.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View live page"
                      className="p-2 rounded-lg text-site-muted hover:text-site-secondary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/admin/colleges/${college.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(college.id)}
                      title="Delete"
                      className="p-2 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
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

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/admin/colleges"
          searchParams={{ search: search || undefined }}
        />
      </div>

      {/* Delete confirmation popover */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete this college?</p>
                <p className="text-xs text-site-muted mt-1">
                  This action cannot be undone. The college profile will be permanently removed.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-site-text border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCollege(deleteTarget)}
                disabled={busyId === deleteTarget}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
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