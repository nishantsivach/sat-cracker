import { createClient } from "@/utils/supabase/server";
import CoursesList from "./CoursesList";

export default async function AdminCoursesPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("course")
    .select("id, title, slug, description, is_published, created_at")
    .order("created_at", { ascending: false });

  return <CoursesList initialCourses={courses ?? []} />;
}