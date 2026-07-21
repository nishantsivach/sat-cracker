"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, X, ArrowLeft, Save } from "lucide-react";

type Topic = { id: string; name: string; section: string };

type QuestionValues = {
  section: string;
  topic_id: string;
  stem: string;
  options: string[];
  correct_index: number;
  explanation: string;
  difficulty: string;
};

export default function QuestionForm({
  mode,
  questionId,
  initialValues,
}: {
  mode: "create" | "edit";
  questionId?: string;
  initialValues?: Partial<QuestionValues>;
}) {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [values, setValues] = useState<QuestionValues>({
    section: initialValues?.section ?? "math",
    topic_id: initialValues?.topic_id ?? "",
    stem: initialValues?.stem ?? "",
    options: initialValues?.options ?? ["", ""],
    correct_index: initialValues?.correct_index ?? 0,
    explanation: initialValues?.explanation ?? "",
    difficulty: initialValues?.difficulty ?? "medium",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/topics")
      .then((res) => (res.ok ? res.json() : { topics: [] }))
      .then((data) => setTopics(data.topics ?? []))
      .catch(() => {});
  }, []);

  const relevantTopics = topics.filter((t) => t.section === values.section);

  const updateOption = (index: number, value: string) => {
    setValues((prev) => ({
      ...prev,
      options: prev.options.map((o, i) => (i === index ? value : o)),
    }));
  };

  const addOption = () => {
    if (values.options.length >= 6) return;
    setValues((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (index: number) => {
    if (values.options.length <= 2) return;
    setValues((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
      correct_index:
        prev.correct_index >= index && prev.correct_index > 0
          ? prev.correct_index - 1
          : prev.correct_index,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOptions = values.options.map((o) => o.trim());
    if (!values.stem.trim() || cleanOptions.some((o) => !o)) {
      setError("Question text and all options are required.");
      return;
    }
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(
        mode === "create" ? "/api/admin/questions" : `/api/admin/questions/${questionId}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, options: cleanOptions }),
        }
      );

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }

      router.push("/admin/questions");
      router.refresh();
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
          href="/admin/questions"
          className="p-2 rounded-xl border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-site-muted" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-site-text">
            {mode === "create" ? "New question" : "Edit question"}
          </h1>
          <p className="text-sm text-site-muted mt-0.5">
            {mode === "create" ? "Add a new practice question" : "Update question details"}
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section + Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Section
              </label>
              <select
                value={values.section}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, section: e.target.value, topic_id: "" }))
                }
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
              >
                <option value="math">Math</option>
                <option value="reading-writing">Reading & Writing</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <select
                value={values.difficulty}
                onChange={(e) => setValues((prev) => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Topic <span className="text-site-muted font-normal normal-case tracking-normal">(optional)</span>
            </label>
            <select
              value={values.topic_id}
              onChange={(e) => setValues((prev) => ({ ...prev, topic_id: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text text-sm focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all cursor-pointer"
            >
              <option value="">No topic link</option>
              {relevantTopics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
            {relevantTopics.length === 0 && (
              <p className="text-[11px] text-site-muted mt-1.5">
                No topics available for this section yet.
              </p>
            )}
          </div>

          {/* Question stem */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Question stem
            </label>
            <textarea
              value={values.stem}
              onChange={(e) => setValues((prev) => ({ ...prev, stem: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
              placeholder="If 3x + 7 = 22, what is the value of x?"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Options{" "}
              <span className="text-site-muted font-normal normal-case tracking-normal">
                (select the correct one)
              </span>
            </label>
            <div className="space-y-2">
              {values.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none shrink-0">
                    <input
                      type="radio"
                      name="correct_index"
                      checked={values.correct_index === index}
                      onChange={() =>
                        setValues((prev) => ({ ...prev, correct_index: index }))
                      }
                      className="w-4 h-4 text-site-accent focus:ring-site-accent/20 cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold text-site-muted w-4">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </label>
                  <input
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
                  />
                  {values.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="p-2 rounded-lg text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {values.options.length < 6 && (
              <button
                type="button"
                onClick={addOption}
                className="flex items-center gap-1.5 text-xs font-semibold text-site-secondary hover:text-site-primary transition-colors mt-2 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add option
              </button>
            )}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-[11px] font-bold text-site-muted uppercase tracking-wider mb-1.5">
              Explanation
            </label>
            <textarea
              value={values.explanation}
              onChange={(e) => setValues((prev) => ({ ...prev, explanation: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted/50 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm resize-none"
              placeholder="Why the correct answer is correct..."
            />
          </div>

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
                  {mode === "create" ? "Create question" : "Save changes"}
                </>
              )}
            </button>
            <Link
              href="/admin/questions"
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