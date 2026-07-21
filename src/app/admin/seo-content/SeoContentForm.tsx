"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Save, ArrowLeft, FileText, Info, Eye, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type SeoContent = {
  id?: string;
  title: string;
  slug: string;
  type: "pillar" | "section" | "logistics" | "comparison" | "faq";
  meta_title: string;
  meta_description: string;
  intro: string;
  body: string;
  data: string;
  is_published: boolean;
};

type Props = {
  initialData?: SeoContent;
  isEdit?: boolean;
};

export default function SeoContentForm({ initialData, isEdit = false }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [bodyTab, setBodyTab] = useState<"write" | "preview">("write");

  const [form, setForm] = useState<SeoContent>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    type: initialData?.type ?? "section",
    meta_title: initialData?.meta_title ?? "",
    meta_description: initialData?.meta_description ?? "",
    intro: initialData?.intro ?? "",
    body: initialData?.body ?? "",
    data: initialData?.data ?? "{}",
    is_published: initialData?.is_published ?? true,
  });

  const updateField = (key: keyof SeoContent, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit() {
    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!form.slug.trim()) {
      alert("Slug is required.");
      return;
    }

    let parsedData = {};
    try {
      parsedData = form.data.trim() ? JSON.parse(form.data) : {};
    } catch {
      alert("Extra JSON Data must be valid JSON.");
      return;
    }

    setBusy(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        type: form.type,
        meta_title: form.meta_title,
        meta_description: form.meta_description,
        intro: form.intro,
        body: form.body,
        data: parsedData,
        is_published: form.is_published,
      };

      const response = await fetch(
        isEdit ? `/api/admin/seo-content/${initialData?.id}` : "/api/admin/seo-content",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Failed");
      router.push("/admin/seo-content");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/seo-content"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {isEdit ? "Edit SEO page" : "New SEO page"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            Manage SEO content for public SAT pages.
          </p>
        </div>
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-4 h-4 text-site-secondary" />
            <h2 className="font-bold text-site-text">Basic information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="SAT Exam Guide"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Slug
              </label>
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text font-mono text-sm placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all"
                placeholder="sat-guide"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) => updateField("type", e.target.value as SeoContent["type"])}
                disabled={isEdit && initialData?.type === "pillar"}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {/* Pillar is only ever shown if this row already is one —
                    there should only ever be one pillar page (/sat), and it
                    already exists, so it's excluded when creating new pages. */}
                {isEdit && initialData?.type === "pillar" && <option value="pillar">Pillar</option>}
                <option value="section">Section</option>
                <option value="comparison">Comparison</option>
                <option value="faq">FAQ</option>
                <option value="logistics">Logistics</option>
              </select>
              {isEdit && initialData?.type === "pillar" && (
                <p className="text-[11px] text-site-muted mt-1.5">
                  This is the SAT pillar page — its type can&apos;t be changed.
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-3 text-sm text-site-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, is_published: e.target.checked }))
                  }
                  className="w-4 h-4 rounded border-site-border text-site-accent focus:ring-site-accent/20 cursor-pointer"
                />
                <div>
                  <p className="font-medium">Published</p>
                  <p className="text-xs text-site-muted">
                    Uncheck to save this page as a draft.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <Info className="w-4 h-4 text-site-accent" />
            <h2 className="font-bold text-site-text">SEO metadata</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Meta title
              </label>
              <input
                value={form.meta_title}
                onChange={(e) => updateField("meta_title", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="SAT Guide | Everything You Need"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Meta description
              </label>
              <textarea
                rows={3}
                value={form.meta_description}
                onChange={(e) => updateField("meta_description", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
                placeholder="Meta description..."
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
          <h2 className="font-bold text-site-text mb-5">Content</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Intro
              </label>
              <textarea
                rows={4}
                value={form.intro}
                onChange={(e) => updateField("intro", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
                placeholder="Brief introduction text..."
              />
            </div>

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
                  rows={14}
                  value={form.body}
                  onChange={(e) => updateField("body", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text font-mono text-sm placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all resize-none"
                  placeholder={"## A heading\n\nBody text with **bold**..."}
                />
              ) : (
                <div className="rounded-xl border border-site-border bg-white px-5 py-4 prose prose-sm max-w-none min-h-[350px]">
                  {form.body.trim() ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {form.body}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-site-muted text-sm">Nothing to preview yet.</p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Extra JSON data
              </label>
              <textarea
                rows={8}
                value={form.data}
                onChange={(e) => updateField("data", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text font-mono text-sm placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all resize-none"
                placeholder='{"key": "value"}'
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pb-10">
          <button
            onClick={handleSubmit}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-site-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? "Update SEO page" : "Create SEO page"}
              </>
            )}
          </button>
          <Link
            href="/admin/seo-content"
            className="px-4 py-2.5 text-sm font-semibold text-site-muted hover:text-site-text transition-colors cursor-pointer"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}