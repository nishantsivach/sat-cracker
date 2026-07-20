import { createClient } from "@/utils/supabase/server";
import MockTestsList from "./MockTestsList";


export default async function AdminMockTestsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("mock_test")
    .select("id, title, duration_minutes, is_published, created_at, mock_test_question(count)")
    .order("created_at", { ascending: false });

  const tests = (data ?? []).map((t) => ({
    ...t,
    question_count: Array.isArray(t.mock_test_question) ? t.mock_test_question[0]?.count ?? 0 : 0,
  }));

  return <MockTestsList initialTests={tests} />;
}