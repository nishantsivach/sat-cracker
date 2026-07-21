import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CourseForm from "../CourseForm";
import ModulesEditor from "./ModulesEditor";

export default async function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase.from("course").select("*").eq("id", id).single();
  if (!course) notFound();

  const { data: modules } = await supabase
    .from("module")
    .select("id, title, order, lesson(id, title, content, free_preview, order)")
    .eq("course_id", id)
    .order("order", { ascending: true })
    .order("order", { ascending: true, foreignTable: "lesson" });

  return (
    <div className="max-w-3xl">
      <CourseForm
        mode="edit"
        courseId={course.id}
        initialValues={{
          title: course.title,
          slug: course.slug,
          description: course.description ?? "",
          is_published: course.is_published,
        }}
      />

      <div className="mt-12 pt-10 border-t border-site-border">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-site-text">Modules & lessons</h2>
          <p className="text-sm text-site-muted mt-1">
            Organize your course content into modules and lessons.
          </p>
        </div>
        <ModulesEditor courseId={course.id} initialModules={modules ?? []} />
      </div>
    </div>
  );
}