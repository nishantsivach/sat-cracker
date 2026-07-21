"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Target } from "lucide-react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type Values = {
  name: string;
  slug: string;
  avg_sat_score: string;
  sat_requirement_notes: string;
  meta_title: string;
  meta_description: string;
  is_published: boolean;
};

export default function CollegeForm({
  mode,
  collegeId,
  initialValues,
}: {
  mode: "create" | "edit";
  collegeId?: string;
  initialValues?: Partial<Values>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    name: initialValues?.name ?? "",
    slug: initialValues?.slug ?? "",
    avg_sat_score: initialValues?.avg_sat_score ?? "",
    sat_requirement_notes: initialValues?.sat_requirement_notes ?? "",
    meta_title: initialValues?.meta_title ?? "",
    meta_description: initialValues?.meta_description ?? "",
    is_published: initialValues?.is_published ?? false,
  });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (name: string) => {
    setValues((prev) => ({
      ...prev,
      name,
      slug: slugTouched ? prev.slug : slugify(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim() || !values.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/colleges" : `/api/admin/colleges/${collegeId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            avg_sat_score: values.avg_sat_score ? Number(values.avg_sat_score) : null,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      if (mode === "create") {
        const data = await res.json();
        router.push(`/admin/colleges/${data.id}`);
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
          href="/admin/colleges"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {mode === "create" ? "New college" : "Edit college"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {mode === "create"
              ? "Add a college profile with SAT requirements"
              : `Editing: ${initialValues?.name ?? ""}`}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* College name */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              College name
            </label>
            <input
              value={values.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
              placeholder="Harvard University"
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
              placeholder="harvard-university"
            />
            <p className="text-[11px] text-site-muted mt-1.5">
              Auto-fills from name — edit manually if needed.
            </p>
          </div>

          {/* Average SAT score */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Average SAT score{" "}
              <span className="text-site-muted font-normal normal-case tracking-normal">
                (optional)
              </span>
            </label>
            <div className="relative">
              <Target className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-site-muted" />
              <input
                type="number"
                min={400}
                max={1600}
                value={values.avg_sat_score}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, avg_sat_score: e.target.value }))
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="1520"
              />
            </div>
            <p className="text-[11px] text-site-muted mt-1.5">
              Enter a score between 400 and 1600.
            </p>
          </div>

          {/* Requirement notes */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Requirement notes
            </label>
            <textarea
              value={values.sat_requirement_notes}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  sat_requirement_notes: e.target.value,
                }))
              }
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
              placeholder="Is the school test-optional? What score range is competitive?"
            />
          </div>

          {/* Meta title + description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Meta title
              </label>
              <input
                value={values.meta_title}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, meta_title: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="SEO title"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Meta description
              </label>
              <input
                value={values.meta_description}
                onChange={(e) =>
                  setValues((prev) => ({
                    ...prev,
                    meta_description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="SEO description"
              />
            </div>
          </div>

          {/* Published toggle */}
          <label className="flex items-center gap-3 text-sm text-site-text cursor-pointer select-none">
            <input
              type="checkbox"
              checked={values.is_published}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  is_published: e.target.checked,
                }))
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
                  {mode === "create" ? "Create college" : "Save changes"}
                </>
              )}
            </button>
            <Link
              href="/admin/colleges"
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