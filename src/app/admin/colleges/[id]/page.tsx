import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CollegeForm from "../CollegeForm";

export default async function EditCollegePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: college } = await supabase.from("college").select("*").eq("id", id).single();
  if (!college) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit college</h1>
      <CollegeForm
        mode="edit"
        collegeId={college.id}
        initialValues={{
          name: college.name,
          slug: college.slug,
          avg_sat_score: college.avg_sat_score,
        //   sat_range: college.sat_range ?? "",
          sat_requirement_notes: college.sat_requirement_notes ?? "",
          meta_title: college.meta_title ?? "",
          meta_description: college.meta_description ?? "",
          is_published: college.is_published,
        }}
      />
    </div>
  );
}