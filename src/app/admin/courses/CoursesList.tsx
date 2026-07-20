"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ExternalLink, BookOpen, AlertTriangle } from "lucide-react";

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  is_published: boolean;
  created_at: string;
};

export default function CoursesList({ initialCourses }: { initialCourses: Course[] }) {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState("");
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (course: Course) => {
    setBusyId(course.id);
    const nextValue = !course.is_published;
    setCourses((prev) =>
      prev.map((c) => (c.id === course.id ? { ...c, is_published: nextValue } : c))
    );
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: course.title,
          slug: course.slug,
          description: course.description,
          is_published: nextValue,
        }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === course.id ? { ...c, is_published: course.is_published } : c
        )
      );
    } finally {
      setBusyId(null);
    }
  };

  const deleteCourse = async (id: string) => {
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setBusyId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-site-text">Courses</h1>
          <p className="text-sm text-site-muted mt-0.5">
            {courses.length} course{courses.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          New course
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or slug..."
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
              <th className="text-left px-5 py-3.5 text-xs font-bold text-site-muted uppercase tracking-wider hidden md:table-cell">
                Slug
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-site-highlight flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-site-muted" />
                    </div>
                    <p className="text-site-muted text-sm">
                      {courses.length === 0
                        ? "No courses yet — create your first one."
                        : "No courses match your search."}
                    </p>
                  </div>
                </td>
              </tr>
            )}
            {filtered.map((course) => (
              <tr key={course.id} className="hover:bg-site-highlight/40 transition-colors">
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-site-text">{course.title}</p>
                  {course.description && (
                    <p className="text-xs text-site-muted mt-0.5 line-clamp-1">
                      {course.description}
                    </p>
                  )}
                </td>
                <td className="px-5 py-3.5 text-site-muted font-mono text-xs hidden md:table-cell">
                  {course.slug}
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => togglePublish(course)}
                    disabled={busyId === course.id}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 cursor-pointer ${
                      course.is_published
                        ? "bg-green-50 text-site-success border border-green-200 hover:bg-green-100"
                        : "bg-site-highlight text-site-muted border border-site-border hover:bg-site-border"
                    }`}
                  >
                    {course.is_published ? "Published" : "Draft"}
                  </button>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/courses/${course.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View live page"
                      className="p-2 rounded-lg text-site-muted hover:text-site-secondary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/admin/courses/${course.id}`}
                      title="Edit"
                      className="p-2 rounded-lg text-site-muted hover:text-site-primary hover:bg-site-highlight transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {confirmingId === course.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => deleteCourse(course.id)}
                          disabled={busyId === course.id}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 disabled:opacity-50 cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmingId(null)}
                          className="text-[11px] px-2.5 py-1 rounded-lg text-site-muted hover:bg-site-highlight cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmingId(course.id)}
                        title="Delete"
                        className="p-2 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation popover */}
      {confirmingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete this course?</p>
                <p className="text-xs text-site-muted mt-1">
                  This action cannot be undone. All modules and lessons in this course will also be deleted.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmingId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-site-text border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteCourse(confirmingId)}
                disabled={busyId === confirmingId}
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