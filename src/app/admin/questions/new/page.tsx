import QuestionForm from "../QuestionForm";

export default function NewQuestionPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New question</h1>
      <QuestionForm mode="create" />
    </div>
  );
}