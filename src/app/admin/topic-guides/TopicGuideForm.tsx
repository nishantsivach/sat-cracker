"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

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
  section: string;
  summary: string;
  meta_title: string;
  meta_description: string;
  body: string;
  is_published: boolean;
};

export default function TopicGuideForm({
  mode,
  guideId,
  initialValues,
}: {
  mode: "create" | "edit";
  guideId?: string;
  initialValues?: Partial<Values>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    name: initialValues?.name ?? "",
    slug: initialValues?.slug ?? "",
    section: initialValues?.section ?? "math",
    summary: initialValues?.summary ?? "",
    meta_title: initialValues?.meta_title ?? "",
    meta_description: initialValues?.meta_description ?? "",
    body: initialValues?.body ?? "",
    is_published: initialValues?.is_published ?? false,
  });
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [bodyTab, setBodyTab] = useState<"write" | "preview">("write");
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
    if (!values.name.trim() || !values.slug.trim() || !values.body.trim()) {
      setError("Name, slug, and body are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "create"
          ? "/api/admin/topic-guides"
          : `/api/admin/topic-guides/${guideId}`,
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
        router.push(`/admin/topic-guides/${data.id}`);
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
          href="/admin/topic-guides"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {mode === "create" ? "New topic guide" : "Edit topic guide"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {mode === "create"
              ? "Create an in-depth SAT topic guide"
              : `Editing: ${initialValues?.name ?? ""}`}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name + Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                value={values.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="Linear Equations"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Section
              </label>
              <select
                value={values.section}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, section: e.target.value }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
              >
                <option value="math">Math</option>
                <option value="reading-writing">Reading & Writing</option>
              </select>
            </div>
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
              placeholder="linear-equations"
            />
            <p className="text-[11px] text-site-muted mt-1.5">
              Auto-fills from name — edit manually if needed.
            </p>
          </div>

          {/* Summary */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Summary
            </label>
            <textarea
              value={values.summary}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, summary: e.target.value }))
              }
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
              placeholder="Brief description shown at the top of the page and in search results."
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

          {/* Body with Write/Preview tabs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider">
                Body <span className="text-site-muted font-normal normal-case tracking-normal">(markdown)</span>
              </label>
              <div className="flex items-center gap-1 bg-site-highlight rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setBodyTab("write")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    bodyTab === "write"
                      ? "bg-white text-site-text shadow-sm"
                      : "text-site-muted hover:text-site-text"
                  }`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Write
                </button>
                <button
                  type="button"
                  onClick={() => setBodyTab("preview")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    bodyTab === "preview"
                      ? "bg-white text-site-text shadow-sm"
                      : "text-site-muted hover:text-site-text"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Preview
                </button>
              </div>
            </div>

            {bodyTab === "write" ? (
              <textarea
                value={values.body}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, body: e.target.value }))
                }
                rows={16}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text font-mono text-sm placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all resize-none"
                placeholder={"## A heading\n\nBody text with **bold** and a worked example."}
              />
            ) : (
              <div className="rounded-xl border border-site-border bg-white px-5 py-4 prose prose-sm max-w-none min-h-[350px]">
                {values.body.trim() ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                  >
                    {values.body}
                  </ReactMarkdown>
                ) : (
                  <p className="text-site-muted text-sm">Nothing to preview yet.</p>
                )}
              </div>
            )}
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
                  {mode === "create" ? "Create guide" : "Save changes"}
                </>
              )}
            </button>
            <Link
              href="/admin/topic-guides"
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