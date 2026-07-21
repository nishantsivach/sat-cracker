import CollegeForm from "../CollegeForm";

export default function NewCollegePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New college</h1>
      <CollegeForm mode="create" />
    </div>
  );
}