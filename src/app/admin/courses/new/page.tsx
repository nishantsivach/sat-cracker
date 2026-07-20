import CourseForm from "../CourseForm";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New course</h1>
      <CourseForm mode="create" />
    </div>
  );
}