"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  X,
  Search,
  Plus,
  GripVertical,
  ArrowLeftRight,
  Loader2,
} from "lucide-react";

type QuestionOption = {
  id: string;
  stem: string;
  section: string;
  difficulty: string;
};

type AssignedRow = {
  id: string;
  order: number;
  question: QuestionOption;
};

const SECTION_LABELS: Record<string, string> = {
  math: "Math",
  "reading-writing": "Reading & Writing",
};

export default function QuestionAssigner({
  mockTestId,
  initialAssigned,
}: {
  mockTestId: string;
  initialAssigned: AssignedRow[];
}) {
  const [assigned, setAssigned] = useState<AssignedRow[]>(
    [...initialAssigned].sort((a, b) => a.order - b.order)
  );
  const [allQuestions, setAllQuestions] = useState<QuestionOption[]>([]);
  const [search, setSearch] = useState("");
  const [loadingBank, setLoadingBank] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/questions")
      .then((res) => (res.ok ? res.json() : { questions: [] }))
      .then((data) => setAllQuestions(data.questions ?? []))
      .catch(() => setError("Couldn't load the question bank."))
      .finally(() => setLoadingBank(false));
  }, []);

  const assignedIds = useMemo(() => new Set(assigned.map((a) => a.question.id)), [assigned]);

  const availableQuestions = allQuestions.filter(
    (q) => !assignedIds.has(q.id) && q.stem.toLowerCase().includes(search.toLowerCase())
  );

  const assignQuestion = async (question: QuestionOption) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/mock-test-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mock_test_id: mockTestId,
          question_id: question.id,
          order: assigned.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Couldn't assign that question");
      setAssigned((prev) => [...prev, { id: data.id, order: prev.length, question }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const removeQuestion = async (rowId: string) => {
    setAssigned((prev) => prev.filter((a) => a.id !== rowId));
    await fetch(`/api/admin/mock-test-questions/${rowId}`, { method: "DELETE" }).catch(() => {});
  };

  const moveQuestion = async (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= assigned.length) return;

    const reordered = [...assigned];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    const withUpdatedOrders = reordered.map((row, i) => ({ ...row, order: i }));
    setAssigned(withUpdatedOrders);

    await Promise.all([
      fetch(`/api/admin/mock-test-questions/${withUpdatedOrders[index].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: index }),
      }),
      fetch(`/api/admin/mock-test-questions/${withUpdatedOrders[targetIndex].id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: targetIndex }),
      }),
    ]).catch(() => {});
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Assigned questions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-site-text flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-site-secondary" />
            Assigned
            <span className="text-xs font-normal text-site-muted">
              ({assigned.length})
            </span>
          </h3>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 mb-3">
            {error}
          </div>
        )}

        {assigned.length === 0 ? (
          <div className="border-2 border-dashed border-site-border rounded-xl px-4 py-10 text-center">
            <div className="w-10 h-10 mx-auto rounded-xl bg-site-highlight flex items-center justify-center mb-3">
              <GripVertical className="w-5 h-5 text-site-muted" />
            </div>
            <p className="text-sm text-site-muted">
              No questions assigned yet
            </p>
            <p className="text-xs text-site-muted mt-1">
              Add questions from the bank on the right.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {assigned.map((row, index) => (
              <div
                key={row.id}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-site-border hover:border-site-accent/20 transition-colors text-sm group"
              >
                <span className="text-xs font-mono font-bold text-site-muted w-6 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-site-text" title={row.question.stem}>
                  {row.question.stem}
                </span>
                <span className="text-[10px] text-site-muted bg-site-highlight rounded-md px-2 py-0.5 shrink-0 hidden sm:inline">
                  {SECTION_LABELS[row.question.section] ?? row.question.section}
                </span>
                <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => moveQuestion(index, -1)}
                    disabled={index === 0}
                    className="p-1 rounded-md text-site-muted hover:text-site-text hover:bg-site-highlight disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveQuestion(index, 1)}
                    disabled={index === assigned.length - 1}
                    className="p-1 rounded-md text-site-muted hover:text-site-text hover:bg-site-highlight disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeQuestion(row.id)}
                    className="p-1 rounded-md text-site-muted hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Question bank */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-site-text flex items-center gap-2">
            <Search className="w-4 h-4 text-site-accent" />
            Question bank
            <span className="text-xs font-normal text-site-muted">
              ({availableQuestions.length})
            </span>
          </h3>
        </div>

        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-site-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-site-border bg-white text-site-text placeholder:text-site-muted/60 focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all text-sm"
          />
        </div>

        <div className="space-y-1.5 max-h-[450px] overflow-y-auto pr-1">
          {loadingBank && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-site-muted" />
            </div>
          )}
          {!loadingBank && availableQuestions.length === 0 && (
            <div className="border border-site-border rounded-xl px-4 py-8 text-center">
              <p className="text-sm text-site-muted">
                {search ? "No matching questions." : "All questions have been assigned."}
              </p>
            </div>
          )}
          {availableQuestions.map((q) => (
            <div
              key={q.id}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-site-border hover:border-site-accent/20 transition-colors text-sm"
            >
              <span className="flex-1 truncate text-site-text" title={q.stem}>
                {q.stem}
              </span>
              <span className="text-[10px] text-site-muted bg-site-highlight rounded-md px-2 py-0.5 shrink-0 hidden sm:inline">
                {SECTION_LABELS[q.section] ?? q.section}
              </span>
              <button
                onClick={() => assignQuestion(q)}
                disabled={busy}
                className="p-1.5 rounded-lg text-site-accent hover:bg-site-accent/10 hover:text-amber-600 disabled:opacity-40 transition-colors cursor-pointer shrink-0"
                title="Add to test"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}