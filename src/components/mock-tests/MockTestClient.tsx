"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Trophy,
  BarChart3,
  AlertTriangle,
} from "lucide-react";

type Question = {
  id: string;
  section: "math" | "reading-writing";
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Props = {
  mockTestId: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  userId: string;
};

const sectionLabel: Record<string, string> = {
  math: "Math",
  "reading-writing": "Reading & Writing",
};

export function MockTestClient({
  mockTestId,
  durationMinutes,
  questions,
  userId,
}: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showSubmitWarning, setShowSubmitWarning] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    total: number;
    breakdown: Record<string, { correct: number; total: number }>;
  } | null>(null);

  const unansweredCount = answers.filter((a) => a === null).length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const totalSeconds = durationMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsLeft;
  const progressPercent = (elapsedSeconds / totalSeconds) * 100;

  const handleSubmit = useCallback(async () => {
    if (submitted || submitting) return;

    if (unansweredCount > 0 && !showSubmitWarning) {
      setShowSubmitWarning(true);
      return;
    }

    setSubmitting(true);
    setShowSubmitWarning(false);

    const breakdown: Record<string, { correct: number; total: number }> = {};
    let score = 0;

    questions.forEach((q, i) => {
      const selected = answers[i];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) score += 1;

      if (!breakdown[q.section])
        breakdown[q.section] = { correct: 0, total: 0 };
      breakdown[q.section].total += 1;
      if (isCorrect) breakdown[q.section].correct += 1;
    });

    const supabase = createClient();

    const attemptRows = questions
      .map((q, i) => {
        const selected = answers[i];
        if (selected === null) return null;
        return {
          user_id: userId,
          question_id: q.id,
          mock_test_id: mockTestId,
          selected_index: selected,
          is_correct: selected === q.correctIndex,
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (attemptRows.length > 0) {
      await supabase.from("attempt").insert(attemptRows);
    }

    await supabase.from("result").insert({
      user_id: userId,
      mock_test_id: mockTestId,
      score,
      total_questions: questions.length,
      section_breakdown: breakdown,
    });

    setResult({ score, total: questions.length, breakdown });
    setSubmitted(true);
    setSubmitting(false);
  }, [answers, questions, userId, mockTestId, submitted, submitting, unansweredCount, showSubmitWarning]);

  useEffect(() => {
    if (submitted) return;
    if (secondsLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, submitted, handleSubmit]);

  if (questions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-site-muted">This test has no questions yet.</p>
      </div>
    );
  }

  if (submitted && result) {
    const percentage = Math.round((result.score / result.total) * 100);
    const getGradeEmoji = (pct: number) => {
      if (pct >= 90) return "🏆";
      if (pct >= 70) return "👏";
      if (pct >= 50) return "💪";
      return "📚";
    };

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-site-border p-8 md:p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-site-accent/10 to-site-accent/5 flex items-center justify-center mb-5">
            <Trophy className="w-8 h-8 text-site-accent" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-site-muted mb-2">
            Test Complete
          </p>
          <p className="text-6xl font-black text-site-primary mb-2 tracking-tight">
            {result.score}
            <span className="text-2xl text-site-muted font-bold">/{result.total}</span>
          </p>
          <p className="text-site-muted text-lg">
            {getGradeEmoji(percentage)} {percentage}% correct
          </p>
          <div className="mt-6 h-2 bg-site-highlight rounded-full overflow-hidden max-w-xs mx-auto">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                percentage >= 70 ? "bg-site-success" : percentage >= 50 ? "bg-site-accent" : "bg-site-error"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-site-secondary" />
            <h2 className="font-bold text-site-text">Section breakdown</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(result.breakdown).map(([section, stats]) => {
              const sectionPct = Math.round((stats.correct / stats.total) * 100);
              return (
                <div key={section} className="flex items-center gap-3">
                  <span className="text-sm text-site-text w-32 shrink-0">
                    {sectionLabel[section] ?? section}
                  </span>
                  <div className="flex-1 h-2 bg-site-highlight rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${sectionPct >= 70 ? "bg-site-success" : "bg-site-accent"}`}
                      style={{ width: `${sectionPct}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-site-secondary w-16 text-right">
                    {stats.correct}/{stats.total}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/mock-tests"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border bg-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-site-highlight transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            More tests
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-site-primary text-white rounded-xl px-5 py-3 font-bold text-sm hover:bg-site-primary/95 transition-colors"
          >
            View dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[current];
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLowTime = secondsLeft < 300; 
  const isCritical = secondsLeft < 60;

  return (
    <div className="space-y-6">

      {showSubmitWarning && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-bold text-amber-800 mb-1">
              {unansweredCount} question{unansweredCount !== 1 ? "s" : ""} unanswered
            </p>
            <p className="text-sm text-amber-700">
              Unanswered questions will be marked as incorrect. You can go back and answer them now.
            </p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => setShowSubmitWarning(false)}
                className="text-sm font-semibold text-amber-800 hover:text-amber-900 transition-colors"
              >
                Go back
              </button>
              <button
                onClick={() => {
                  setShowSubmitWarning(false);
                  handleSubmit();
                }}
                className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
              >
                Submit anyway
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-site-border p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-site-muted">
              {sectionLabel[question.section]}
            </span>
            <span className="mx-2 text-site-border">·</span>
            <span className="text-sm text-site-text font-medium">
              {current + 1} of {questions.length}
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono font-bold text-sm transition-colors ${
              isCritical
                ? "bg-red-50 text-site-error"
                : isLowTime
                ? "bg-amber-50 text-amber-700"
                : "bg-site-highlight text-site-text"
            }`}
          >
            <Clock className={`w-4 h-4 ${isCritical ? "animate-pulse" : ""}`} />
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Timer progress bar */}
        <div className="h-1.5 bg-site-highlight rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 linear ${
              isCritical
                ? "bg-site-error"
                : isLowTime
                ? "bg-amber-500"
                : "bg-site-secondary"
            }`}
            style={{ width: `${100 - progressPercent}%` }}
          />
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3 text-xs text-site-muted">
          <span>{answeredCount} answered</span>
          {unansweredCount > 0 && (
            <>
              <span className="w-1 h-1 rounded-full bg-site-border" />
              <span className="text-amber-600">{unansweredCount} left</span>
            </>
          )}
          <span className="w-1 h-1 rounded-full bg-site-border" />
          <span>{Math.round(progressPercent)}% time used</span>
        </div>
      </div>

      {/* Question navigator */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {questions.map((_, i) => {
          const isAnswered = answers[i] !== null;
          const isCurrent = i === current;
          return (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                isCurrent
                  ? "bg-site-primary text-white shadow-sm ring-2 ring-site-primary/20"
                  : isAnswered
                  ? "bg-site-highlight text-site-secondary border border-site-border hover:bg-site-secondary/10"
                  : "bg-white border border-site-border text-site-muted hover:border-site-accent/30"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
        <p className="text-lg font-semibold text-site-text leading-relaxed mb-6">
          {question.stem}
        </p>

        <div className="space-y-2.5">
          {question.options.map((opt, i) => {
            const isSelected = answers[current] === i;
            return (
              <button
                key={i}
                onClick={() =>
                  setAnswers((prev) => {
                    const updated = [...prev];
                    updated[current] = i;
                    return updated;
                  })
                }
                className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                  isSelected
                    ? "border-site-secondary bg-site-secondary/5 ring-1 ring-site-secondary/20"
                    : "border-site-border hover:border-site-secondary/30 hover:bg-site-highlight/50"
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-site-secondary text-white"
                      : "bg-site-highlight text-site-muted"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-site-text flex-1">{opt}</span>
                {isSelected && (
                  <CheckCircle2 className="w-4 h-4 text-site-secondary shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          {current > 0 && (
            <button
              onClick={() => setCurrent((c) => c - 1)}
              className="inline-flex items-center justify-center gap-2 border border-site-border px-5 py-3 rounded-xl font-semibold text-sm hover:bg-site-highlight transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          {current < questions.length - 1 ? (
            <button
              onClick={() => setCurrent((c) => c + 1)}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-site-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors"
            >
              Next question
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-site-accent text-site-primary px-5 py-3 rounded-xl font-bold text-sm hover:bg-amber-400 transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-site-primary/30 border-t-site-primary rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit test
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}