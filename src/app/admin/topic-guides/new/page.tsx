import TopicGuideForm from "../TopicGuideForm";

export default function NewTopicGuidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New topic guide</h1>
      <TopicGuideForm mode="create" />
    </div>
  );
}