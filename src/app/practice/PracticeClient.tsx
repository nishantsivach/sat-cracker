"use client";

import { useState } from "react";
import Link from "next/link";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/client";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Target,
  BarChart3,
  BookOpen,
  Timer,
} from "lucide-react";

type Question = {
  id: string;
  topic: string;
  stem: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Props = {
  questions: Question[];
  loadError: boolean;
  userId: string | null;
};

export function PracticeClient({ questions, loadError, userId }: Props) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  if (loadError) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <p className="text-site-error font-semibold">Couldn&apos;t load practice questions right now.</p>
        </div>
      </Layout>
    );
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <Target className="w-12 h-12 text-site-muted mx-auto mb-3" />
          <p className="text-site-muted">No practice questions available yet — check back soon.</p>
        </div>
      </Layout>
    );
  }

  const question = questions[current];
  const isLast = current === questions.length - 1;
  const progress = ((current + (selected !== null ? 1 : 0)) / questions.length) * 100;

  async function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = index;
      return updated;
    });
    const isCorrect = index === question.correctIndex;
    if (isCorrect) setScore((s) => s + 1);

    // Log the attempt for logged-in users only — RLS would reject an insert
    // from an anonymous session anyway, so this check just avoids a wasted
    // request. Guests can still practice; their attempts just aren't saved.
    if (userId) {
      const supabase = createClient();
      await supabase.from("attempt").insert({
        user_id: userId,
        question_id: question.id,
        selected_index: index,
        is_correct: isCorrect,
      });
    }
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setFinished(false);
  }

  function handleJumpTo(index: number) {
    setCurrent(index);
    setSelected(answers[index]);
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="h-px w-8 bg-site-accent" />
                <p className="text-xs font-semibold tracking-widest text-site-accent uppercase">
                  Practice Mode
                </p>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Practice Questions</h1>
              {!userId && (
                <p className="text-xs text-white/50 mt-1">
                  <Link href="/signup" className="underline hover:text-white">Sign up</Link> to save your progress.
                </p>
              )}
            </div>

            {!finished && (
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-white/60">
                  <BarChart3 className="w-4 h-4" />
                  <span>{score}/{current + (selected !== null ? 1 : 0)} correct</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/60">
                  <Timer className="w-4 h-4" />
                  <span>{current + 1} of {questions.length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-10">
        {!finished ? (
          <div className="space-y-6">
            <div className="flex items-center gap-1.5 flex-wrap">
              {questions.map((_, i) => {
                const isAnswered = answers[i] !== null;
                const isCorrect = isAnswered && answers[i] === questions[i].correctIndex;
                const isCurrent = i === current;

                return (
                  <button
                    key={i}
                    onClick={() => handleJumpTo(i)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                      isCurrent
                        ? "bg-site-primary text-white shadow-sm"
                        : isAnswered
                        ? isCorrect
                          ? "bg-green-50 text-site-success border border-green-200"
                          : "bg-red-50 text-site-error border border-red-200"
                        : "bg-white border border-site-border text-site-muted hover:border-site-secondary/40"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="h-1.5 bg-site-border rounded-full overflow-hidden">
              <div
                className="h-full bg-site-secondary transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="bg-white rounded-2xl border border-site-border p-6 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-site-muted bg-site-highlight rounded-lg px-3 py-1.5">
                  {question.topic}
                </span>
                <span className="text-xs text-site-muted font-mono">
                  {current + 1}/{questions.length}
                </span>
              </div>

              <p className="text-lg font-semibold text-site-text leading-relaxed mb-6">
                {question.stem}
              </p>

              <div className="space-y-2.5">
                {question.options.map((opt, i) => {
                  const isCorrect = i === question.correctIndex;
                  const isSelected = i === selected;
                  const showState = selected !== null;

                  let stateClasses = "border-site-border hover:border-site-secondary/40";
                  if (showState && isCorrect) stateClasses = "border-site-success bg-green-50";
                  else if (showState && isSelected && !isCorrect) stateClasses = "border-site-error bg-red-50";

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${stateClasses} ${
                        selected === null ? "cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          showState && isCorrect
                            ? "bg-site-success text-white"
                            : showState && isSelected && !isCorrect
                            ? "bg-site-error text-white"
                            : "bg-site-highlight text-site-muted"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm text-site-text flex-1">{opt}</span>
                      {showState && isCorrect && <CheckCircle2 className="w-5 h-5 text-site-success shrink-0" />}
                      {showState && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-site-error shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="mt-5 p-4 bg-site-highlight rounded-xl border border-site-border">
                  <p className="text-xs font-bold uppercase tracking-wider text-site-secondary mb-1.5">
                    Explanation
                  </p>
                  <p className="text-sm text-site-text leading-relaxed">{question.explanation}</p>
                </div>
              )}

              {selected !== null && (
                <button
                  onClick={handleNext}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-site-primary text-white px-5 py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-colors"
                >
                  {isLast ? "See your results" : "Next question"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-site-border p-8 md:p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
                {score === questions.length ? (
                  <CheckCircle2 className="w-8 h-8 text-site-success" />
                ) : (
                  <Target className="w-8 h-8 text-site-secondary" />
                )}
              </div>

              <p className="text-sm font-bold uppercase tracking-wider text-site-muted mb-2">
                Session complete
              </p>
              <p className="text-5xl font-bold text-site-primary mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-site-muted mb-2">
                {score === questions.length
                  ? "Perfect score. You're ready for the real thing."
                  : score >= questions.length / 2
                  ? "Solid work. Review the ones you missed and try again."
                  : "Keep at it. Every wrong answer is a chance to learn."}
              </p>

              <div className="mt-6 flex justify-center gap-2 flex-wrap">
                {questions.map((q, i) => {
                  const userAnswer = answers[i];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setFinished(false);
                        setCurrent(i);
                        setSelected(answers[i]);
                      }}
                      className={`w-10 h-10 rounded-xl text-xs font-mono font-bold transition-all ${
                        isCorrect
                          ? "bg-green-50 text-site-success border border-green-200 hover:bg-green-100"
                          : "bg-red-50 text-site-error border border-red-200 hover:bg-red-100"
                      }`}
                      title={`Q${i + 1}: ${isCorrect ? "Correct" : "Incorrect"}`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-site-muted mt-3">Click any question to review it</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 border border-site-border bg-white rounded-xl px-5 py-3 font-semibold text-sm hover:bg-site-highlight transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try again
              </button>
              <Link
                href="/sat"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-site-primary text-white rounded-xl px-5 py-3 font-bold text-sm hover:brightness-110 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                SAT Guide
              </Link>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}