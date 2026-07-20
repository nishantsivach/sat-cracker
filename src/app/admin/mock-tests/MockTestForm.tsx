"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Clock } from "lucide-react";

type Values = { title: string; duration_minutes: number; is_published: boolean };

export default function MockTestForm({
  mode,
  testId,
  initialValues,
}: {
  mode: "create" | "edit";
  testId?: string;
  initialValues?: Partial<Values>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>({
    title: initialValues?.title ?? "",
    duration_minutes: initialValues?.duration_minutes ?? 60,
    is_published: initialValues?.is_published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.title.trim() || values.duration_minutes <= 0) {
      setError("Title and a valid duration are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/mock-tests" : `/api/admin/mock-tests/${testId}`,
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
        router.push(`/admin/mock-tests/${data.id}`);
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
          href="/admin/mock-tests"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {mode === "create" ? "New mock test" : "Edit mock test"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {mode === "create"
              ? "Create a full-length practice test"
              : `Editing: ${initialValues?.title ?? ""}`}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              value={values.title}
              onChange={(e) => setValues((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
              placeholder="SAT Practice Test 2"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Duration <span className="text-site-muted font-normal normal-case tracking-normal">(minutes)</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-site-muted" />
              <input
                type="number"
                min={1}
                value={values.duration_minutes}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, duration_minutes: Number(e.target.value) }))
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                placeholder="60"
              />
            </div>
            <p className="text-[11px] text-site-muted mt-1.5">
              Total time students have to complete the test.
            </p>
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
                  {mode === "create" ? "Create mock test" : "Save changes"}
                </>
              )}
            </button>
            <Link
              href="/admin/mock-tests"
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