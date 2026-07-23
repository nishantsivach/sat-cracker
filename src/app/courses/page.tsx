import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import {
    BookOpen,
    ArrowRight,
    GraduationCap,
    Sparkles,
    CheckCircle2,
    Lock
} from "lucide-react";
import { checkIsPremium } from "@/utils/supabase/api/subscription";

export const metadata = {
    title: "SAT Courses — Structured Prep by Section",
    description:
        "Browse structured SAT courses covering Math and Reading & Writing, with free preview lessons in every course.",
};

export default async function CoursesPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
    
    const isPremium = user ? await checkIsPremium(supabase, user.id) : false;

    const { data: rawCourses, error } = await supabase
        .from("course")
        .select("id, title, slug, description, module(lesson(id, free_preview))")
        .eq("is_published", true)
        .order("created_at", { ascending: true });

    const courses = (rawCourses ?? []).map((course) => {
        const modules = Array.isArray(course.module) ? course.module : [];
        const lessons = modules.flatMap((m) => (Array.isArray(m.lesson) ? m.lesson : []));
        const freeCount = lessons.filter((l) => l.free_preview).length;
        return { ...course, totalLessons: lessons.length, freeLessons: freeCount };
    });

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

                <div className="relative max-w-4xl mx-auto px-6 py-14 md:py-18">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-5">
                        <GraduationCap className="w-3.5 h-3.5 text-site-accent" />
                        <span className="text-xs font-bold tracking-wider text-site-accent uppercase">
                            Courses
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
                        Structured SAT prep,
                        <br />
                        <span className="text-site-accent">section by section.</span>
                    </h1>
                    <p className="text-white/60 leading-relaxed max-w-xl text-[15px]">
                        Every course includes free preview lessons so you can try before you commit. No surprises, just solid prep.
                    </p>

                    {courses && (
                        <p className="mt-4 text-xs text-white/30">
                            {courses.length} course{courses.length !== 1 ? "s" : ""} available
                        </p>
                    )}
                </div>
            </section>

            {/* Content */}
            <section className="max-w-4xl mx-auto px-6 py-12">
                {/* Error state */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <p className="text-red-600 text-sm font-medium">
                            Couldn&apos;t load courses right now. Please try again.
                        </p>
                    </div>
                )}

                {/* Empty state */}
                {!error && (!courses || courses.length === 0) && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-site-highlight flex items-center justify-center mb-5">
                            <BookOpen className="w-7 h-7 text-site-muted" />
                        </div>
                        <h2 className="text-xl font-bold text-site-text mb-2">No courses yet</h2>
                        <p className="text-site-muted text-sm max-w-sm mx-auto">
                            We&apos;re building structured SAT courses. Check back soon or explore our free resources.
                        </p>
                        <Link
                            href="/sat"
                            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-site-secondary hover:text-site-primary transition-colors cursor-pointer"
                        >
                            Explore SAT Guide
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {/* Courses grid */}
                {courses && courses.length > 0 && (
                    <div className="grid sm:grid-cols-2 gap-5">
                        {courses.map((course, index) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.slug}`}
                                className="group relative bg-white rounded-3xl border border-site-border/60 p-6 md:p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
                            >
                                {/* Top shine */}
                                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-site-border/40 to-transparent" />

                                {/* Recommended accent bar */}
                                {index === 0 && (
                                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-site-accent via-amber-400 to-site-secondary" />
                                )}

                                {/* Icon + badge row */}
                                <div className="flex items-center justify-between mb-4 pt-1">
                                    <div className="w-10 h-10 rounded-xl bg-site-highlight flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                        <BookOpen className="w-5 h-5 text-site-secondary" />
                                    </div>
                                    {index === 0 && (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-site-accent bg-site-accent/10 px-2.5 py-1 rounded-full">
                                            <Sparkles className="w-3 h-3" />
                                            Recommended
                                        </span>
                                    )}
                                </div>

                                {/* Content */}
                                <h2 className="text-sm font-bold text-site-text mb-2 group-hover:text-site-primary transition-colors">
                                    {course.title}
                                </h2>
                                <p className="text-xs text-site-muted leading-relaxed mb-6 flex-1">
                                    {course.description}
                                </p>

                                {/* Bottom row */}
                                <div className="flex items-center justify-between pt-4 border-t border-site-border/60">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-site-secondary group-hover:text-site-primary transition-colors">
                                        View course
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </span>

                                    {isPremium ? (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-site-success bg-green-50 px-2.5 py-1 rounded-full">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Full access
                                        </span>
                                    ) : course.freeLessons > 0 ? (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-site-accent bg-site-accent/10 px-2.5 py-1 rounded-full">
                                            <Sparkles className="w-3 h-3" />
                                            {course.freeLessons} free
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-site-muted bg-site-highlight px-2.5 py-1 rounded-full">
                                            <Lock className="w-3 h-3" />
                                            Premium
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                {courses && courses.length > 0 && (
                    <div className="mt-10 p-6 bg-white rounded-2xl border border-site-border/60 text-center shadow-sm">
                        <p className="text-sm font-bold text-site-text">Not sure where to start?</p>
                        <p className="text-xs text-site-muted mt-1">
                            Take a diagnostic test and we&apos;ll recommend the right course for you.
                        </p>
                        <Link
                            href="/practice"
                            className="inline-flex items-center gap-2 mt-4 bg-site-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-site-primary/95 transition-colors cursor-pointer"
                        >
                            Start diagnostic
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
            </section>
        </Layout>
    );
}