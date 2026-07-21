"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, HelpCircle, AlertTriangle } from "lucide-react";
import Pagination from "@/components/common/Pagination";

type Question = {
  id: string;
  section: string;
  stem: string;
  options: string[];
  correct_index: number;
  difficulty: string;
  topic: { name: string } | null;
};

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-600 border-red-200",
};

const SECTION_LABELS: Record<string, string> = {
  math: "Math",
  "reading-writing": "Reading & Writing",
};

export default function QuestionsList({
  questions,
  totalCount,
  currentPage,
  pageSize,
  search: initialSearch,
  section: initialSection,
}: {
  questions: Question[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  search: string;
  section: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearch);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [localQuestions, setLocalQuestions] = useState(questions);

  useEffect(() => setLocalQuestions(questions), [questions]);

  const navigate = (nextSearch: string, nextSection: string) => {
    const params = new URLSearchParams();
    if (nextSearch) params.set("search", nextSearch);
    if (nextSection !== "all") params.set("section", nextSection);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (search === initialSearch) return;
    const timeout = setTimeout(() => navigate(search, initialSection), 400);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const deleteQuestion = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/questions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setLocalQuestions((prev) => prev.filter((q) => q.id !== id));
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
          <h1 className="text-2xl font-bold text-site-text">Questions</h1>
          <p className="text-sm text-site-muted mt-0.5">
            {totalCount} question{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/questions/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New question
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative max-w-sm flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search question text..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
          />
        </div>
        <select
          value={initialSection}
          onChange={(e) => navigate(search, e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
        >
          <option value="all">All sections</option>
          <option value="math">Math</option>
          <option value="reading-writing">Reading & Writing</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Question
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden md:table-cell">
                Section
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden lg:table-cell">
                Topic
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Difficulty
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-site-border">
            {localQuestions.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <HelpCircle className="w-6 h-6 text-site-muted" />
                    </div>
                    <p className="text-site-muted text-sm">
                      {totalCount === 0
                        ? "No questions yet — add your first one."
                        : "No questions match your filters."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {localQuestions.map((q) => (
              <tr key={q.id} className="hover:bg-site-highlight/40 transition-colors">
                <td className="px-5 py-3.5 max-w-md">
                  <p className="font-medium text-site-text truncate" title={q.stem}>
                    {q.stem}
                  </p>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <span className="text-xs text-site-muted">
                    {SECTION_LABELS[q.section] ?? q.section}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className="text-xs text-site-muted">
                    {q.topic?.name ?? "—"}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                      DIFFICULTY_COLORS[q.difficulty] ?? "bg-site-highlight text-site-muted border-site-border"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/questions/${q.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(q.id)}
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
          basePath="/admin/questions"
          searchParams={{
            search: search || undefined,
            section: initialSection !== "all" ? initialSection : undefined,
          }}
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
                <p className="text-sm font-bold text-site-text">Delete this question?</p>
                <p className="text-xs text-site-muted mt-1">
                  This action cannot be undone. The question will be permanently removed.
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
                onClick={() => deleteQuestion(deleteTarget)}
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