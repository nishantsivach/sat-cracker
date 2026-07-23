import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  PlayCircle,
  BookOpen,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type PageProps = { params: Promise<{ slug: string }> };

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("course")
    .select("id, title, slug, description")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!course) notFound();

  const { data: modules } = await supabase
    .from("module")
    .select("id, title, order, lesson(id, title, free_preview, order)")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  const allLessons = modules?.flatMap((m) => m.lesson || []) || [];
  const totalLessons = allLessons.length;
  const freeLessons = allLessons.filter((l) => l.free_preview).length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-site-primary text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-site-accent/6 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 py-14 md:py-18">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-site-accent bg-white/10 rounded-md px-2.5 py-1">
              Course
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <BookOpen className="w-3 h-3" />
              {totalLessons} lessons
            </span>
            {freeLessons > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-white/40">
                <Sparkles className="w-3 h-3" />
                {freeLessons} free
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
            {course.title}
          </h1>
          <p className="text-white/60 leading-relaxed max-w-2xl text-[15px]">
            {course.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl border border-site-border/60 p-5 text-center shadow-sm">
            <BookOpen className="w-5 h-5 text-site-secondary mx-auto mb-2" />
            <p className="text-2xl font-black text-site-text">{modules?.length || 0}</p>
            <p className="text-xs text-site-muted mt-1">Modules</p>
          </div>
          <div className="bg-white rounded-2xl border border-site-border/60 p-5 text-center shadow-sm">
            <PlayCircle className="w-5 h-5 text-site-secondary mx-auto mb-2" />
            <p className="text-2xl font-black text-site-text">{totalLessons}</p>
            <p className="text-xs text-site-muted mt-1">Lessons</p>
          </div>
          <div className="bg-white rounded-2xl border border-site-border/60 p-5 text-center shadow-sm">
            <Sparkles className="w-5 h-5 text-site-accent mx-auto mb-2" />
            <p className="text-2xl font-black text-site-text">{freeLessons}</p>
            <p className="text-xs text-site-muted mt-1">Free previews</p>
          </div>
        </div>

        {/* Modules & Lessons */}
        <div className="space-y-4">
          {modules?.map((module, moduleIndex) => {
            const lessons = [...(module.lesson || [])].sort((a, b) => a.order - b.order);
            const moduleNumber = String(moduleIndex + 1).padStart(2, "0");

            return (
              <div
                key={module.id}
                className="bg-white rounded-3xl border border-site-border/60 overflow-hidden shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                {/* Module header */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-site-accent bg-site-highlight rounded-lg px-2.5 py-1.5 shadow-sm">
                      {moduleNumber}
                    </span>
                    <div>
                      <h2 className="font-bold text-site-text text-sm">{module.title}</h2>
                      <p className="text-xs text-site-muted mt-0.5">
                        {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-site-muted" />
                </div>

                {/* Lessons list */}
                <div className="border-t border-site-border/60">
                  {lessons.map((lesson, lessonIndex) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${course.slug}/${lesson.id}`}
                      className={`flex items-center justify-between px-6 py-3.5 hover:bg-site-highlight/50 transition-colors cursor-pointer ${
                        lessonIndex < lessons.length - 1 ? "border-b border-site-border/40" : ""
                      }`}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                            lesson.free_preview ? "bg-green-50" : "bg-site-highlight"
                          }`}
                        >
                          {lesson.free_preview ? (
                            <PlayCircle className="w-3.5 h-3.5 text-green-600" />
                          ) : (
                            <Lock className="w-3 h-3 text-site-muted" />
                          )}
                        </span>
                        <span className="text-sm text-site-text truncate">{lesson.title}</span>
                      </span>

                      <span className="flex items-center gap-2 shrink-0 ml-3">
                        {lesson.free_preview ? (
                          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            Free
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium text-site-muted bg-site-highlight px-2 py-0.5 rounded-full">
                            Premium
                          </span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 p-6 bg-site-primary rounded-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-site-accent/8 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative">
            <p className="text-white font-bold text-sm">Ready to start learning?</p>
            <p className="text-white/50 text-xs mt-1">
              Try the free preview lessons or unlock the full course.
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <Link
                href="/practice"
                className="inline-flex items-center gap-2 bg-site-accent text-site-primary px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Start free preview
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors cursor-pointer"
              >
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}