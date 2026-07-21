"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type CourseValues = {
  title: string;
  slug: string;
  description: string;
  is_published: boolean;
};

export default function CourseForm({
  mode,
  courseId,
  initialValues,
}: {
  mode: "create" | "edit";
  courseId?: string;
  initialValues?: Partial<CourseValues>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<CourseValues>({
    title: initialValues?.title ?? "",
    slug: initialValues?.slug ?? "",
    description: initialValues?.description ?? "",
    is_published: initialValues?.is_published ?? false,
  });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (title: string) => {
    setValues((prev) => ({
      ...prev,
      title,
      slug: slugTouched ? prev.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim() || !values.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/courses" : `/api/admin/courses/${courseId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      if (mode === "create") {
        const data = await res.json();
        router.push(`/admin/courses/${data.id}`);
      } else {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/courses"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {mode === "create" ? "New course" : "Edit course"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {mode === "create"
              ? "Create a new SAT course"
              : `Editing: ${initialValues?.title ?? ""}`}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              value={values.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
              placeholder="SAT Math Foundations"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Slug
            </label>
            <input
              value={values.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setValues((prev) => ({ ...prev, slug: e.target.value }));
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text font-mono text-sm placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all"
              placeholder="sat-math-foundations"
            />
            <p className="text-[11px] text-site-muted mt-1.5">
              Auto-fills from title — edit manually if needed.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              value={values.description}
              onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
              placeholder="What students will learn in this course..."
            />
          </div>

          {/* Published toggle */}
          <label className="flex items-center gap-3 text-sm text-site-text cursor-pointer select-none">
            <input
              type="checkbox"
              checked={values.is_published}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, is_published: e.target.checked }))
              }
              className="w-4 h-4 rounded border-site-border text-site-accent focus:ring-site-accent/20 cursor-pointer"
            />
            <div>
              <p className="font-medium">Published</p>
              <p className="text-xs text-site-muted">Visible to students</p>
            </div>
          </label>

          {/* Error */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-site-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === "create" ? "Create course" : "Save changes"}
                </>
              )}
            </button>
            <Link
              href="/admin/courses"
              className="px-4 py-2.5 text-sm font-semibold text-site-muted hover:text-site-text transition-colors cursor-pointer"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}