"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Clock, ListChecks, AlertTriangle, ClipboardList } from "lucide-react";

type MockTest = {
  id: string;
  title: string;
  duration_minutes: number;
  is_published: boolean;
  question_count: number;
};

export default function MockTestsList({ initialTests }: { initialTests: MockTest[] }) {
  const [tests, setTests] = useState(initialTests);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const togglePublish = async (test: MockTest) => {
    setBusyId(test.id);
    const nextValue = !test.is_published;
    setTests((prev) =>
      prev.map((t) => (t.id === test.id ? { ...t, is_published: nextValue } : t))
    );
    try {
      const res = await fetch(`/api/admin/mock-tests/${test.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: test.title,
          duration_minutes: test.duration_minutes,
          is_published: nextValue,
        }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setTests((prev) =>
        prev.map((t) => (t.id === test.id ? { ...t, is_published: test.is_published } : t))
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteTest = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/mock-tests/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setTests((prev) => prev.filter((t) => t.id !== id));
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
          <h1 className="text-2xl font-bold text-site-text">Mock Tests</h1>
          <p className="text-sm text-site-muted mt-0.5">
            {tests.length} test{tests.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/mock-tests/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New mock test
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border border-site-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-site-border bg-site-highlight">
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Title
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider">
                Duration
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden sm:table-cell">
                Questions
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
            {tests.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <ClipboardList className="w-6 h-6 text-site-muted" />
                    </div>
                    <p className="text-site-muted text-sm">
                      No mock tests yet — create your first one.
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {tests.map((test) => (
              <tr key={test.id} className="hover:bg-site-highlight/40 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-site-text">{test.title}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className="flex items-center gap-1.5 text-xs text-site-muted">
                    <Clock className="w-3.5 h-3.5" />
                    {test.duration_minutes} min
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className="flex items-center gap-1.5 text-xs text-site-muted">
                    <ListChecks className="w-3.5 h-3.5" />
                    {test.question_count}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => togglePublish(test)}
                    disabled={busyId === test.id}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 cursor-pointer border ${
                      test.is_published
                        ? "bg-green-50 text-site-success border-green-200 hover:bg-green-100"
                        : "bg-site-highlight text-site-muted border-site-border hover:bg-site-border"
                    }`}
                  >
                    {test.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/mock-tests/${test.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(test.id)}
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

      {/* Delete confirmation popover */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete this mock test?</p>
                <p className="text-xs text-site-muted mt-1">
                  This action cannot be undone. All questions linked to this test will also be removed.
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
                onClick={() => deleteTest(deleteTarget)}
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