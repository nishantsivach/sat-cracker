import { Layout, VideoPlayer } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Lock,
  PlayCircle,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Crown,
} from "lucide-react";
import { checkIsPremium } from "@/utils/supabase/api/subscription";

type PageProps = { params: Promise<{ slug: string; lessonId: string }> };

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonId } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("course")
    .select("id, title, slug")
    .eq("slug", slug)
    .single();

  if (!course) notFound();

  const { data: lesson } = await supabase
    .from("lesson")
    .select("id, title, content, video_path, free_preview, module_id, order")
    .eq("id", lessonId)
    .single();

  if (!lesson) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPremium = user ? await checkIsPremium(supabase, user.id) : false;
  const hasAccess = lesson.free_preview || isPremium;

  const { data: nextLesson } = await supabase
    .from("lesson")
    .select("id, title, free_preview")
    .eq("module_id", lesson.module_id)
    .gt("order", lesson.order)
    .order("order", { ascending: true })
    .limit(1)
    .maybeSingle();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/8 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {course.title}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              Lesson
            </span>
            {lesson.free_preview && (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-green-300 bg-green-500/15 rounded-md px-2.5 py-1">
                <Sparkles className="w-3 h-3" />
                Free preview
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            {lesson.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      {hasAccess ? (
        <section className="max-w-3xl mx-auto px-6 py-12">
          {/* Video */}
          {lesson.video_path && (
            <div className="mb-10">
              <VideoPlayer
                src={supabase.storage.from("lesson-videos").getPublicUrl(lesson.video_path).data.publicUrl}
              />
            </div>
          )}

          {/* Article */}
          <article className="prose prose-lg max-w-none prose-headings:text-site-text prose-headings:font-bold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:text-site-text prose-p:leading-relaxed prose-p:text-[15px] prose-strong:text-site-primary prose-a:text-site-secondary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-site-accent prose-blockquote:text-site-muted prose-blockquote:italic prose-li:text-site-text prose-li:leading-relaxed prose-code:bg-site-highlight prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal prose-pre:bg-site-primary prose-pre:text-white/90 prose-img:rounded-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.content}
            </ReactMarkdown>
          </article>

          {/* Bottom navigation */}
          <div className="mt-16 pt-10 border-t border-site-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href={`/courses/${course.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to course
              </Link>

              {nextLesson ? (
                <Link
                  href={`/courses/${course.slug}/${nextLesson.id}`}
                  className="group inline-flex items-center gap-2 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
                >
                  Next lesson
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-sm text-site-muted">
                  <CheckCircle2 className="w-4 h-4 text-site-success" />
                  Module complete
                </div>
              )}
            </div>

            {/* Next lesson preview */}
            {nextLesson && (
              <div className="mt-4 p-4 bg-site-highlight rounded-xl border border-site-border flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">
                    {nextLesson.free_preview ? (
                      <PlayCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-site-muted" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-site-muted font-medium">Up next</p>
                    <p className="text-sm font-semibold text-site-text truncate">
                      {nextLesson.title}
                    </p>
                  </div>
                </div>
                {nextLesson.free_preview && (
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0 ml-3">
                    Free
                  </span>
                )}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Locked state */
        <section className="max-w-lg mx-auto px-6 py-14">
          <div className="bg-white rounded-2xl border border-site-border p-8 md:p-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-site-muted" />
            </div>

            {user ? (
              <>
                <h2 className="text-xl font-bold text-site-text mb-2">Premium lesson</h2>
                <p className="text-sm text-site-muted max-w-sm mx-auto leading-relaxed mb-8">
                  Upgrade to Premium to unlock all lessons, unlimited AI tutoring, and full mock tests.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center gap-2 bg-site-accent text-site-primary px-6 py-3 rounded-xl font-bold text-sm hover:brightness-105 transition-all cursor-pointer"
                  >
                    <Crown className="w-4 h-4" />
                    View plans
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center justify-center gap-2 border border-site-border px-6 py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to course
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-site-text mb-2">Sign in to continue</h2>
                <p className="text-sm text-site-muted max-w-sm mx-auto leading-relaxed mb-8">
                  Create a free account or sign in to access this lesson.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href={`/signup?redirectTo=/courses/${course.slug}/${lesson.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-site-primary text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors cursor-pointer"
                  >
                    Create free account
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex items-center justify-center gap-2 border border-site-border px-6 py-3 rounded-xl font-semibold text-sm text-site-text hover:bg-site-highlight transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to course
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}