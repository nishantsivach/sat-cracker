import { createClient } from "@/utils/supabase/server";
import { PracticeClient } from "./PracticeClient";

export default async function PracticePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("question")
    .select("id, section, stem, options, correct_index, explanation, topic:topic_id(name)")
    .order("created_at", { ascending: true })
    .limit(10);

  const sectionLabel: Record<string, string> = {
    math: "Math",
    "reading-writing": "Reading & Writing",
  };

  const questions =
    data?.map((q) => ({
      id: q.id,
      topic: `${sectionLabel[q.section] ?? q.section}${q.topic?.[0]?.name ? ` · ${q.topic[0].name}` : ""}`,
      stem: q.stem,
      options: q.options as string[],
      correctIndex: q.correct_index,
      explanation: q.explanation ?? "",
    })) ?? [];

  return (
    <PracticeClient
      questions={questions}
      loadError={Boolean(error)}
      userId={user?.id ?? null}
    />
  );
}