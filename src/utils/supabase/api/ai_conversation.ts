import { SupabaseClient } from "@supabase/supabase-js";

export const FREE_DAILY_MESSAGE_LIMIT = 2;

export async function getMessageCountToday(supabase: SupabaseClient, userId: string): Promise<number> {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from("ai_message")
    .select("*, ai_conversation!inner(user_id)", { count: "exact", head: true })
    .eq("ai_conversation.user_id", userId)
    .eq("role", "user")
    .gte("created_at", startOfDay.toISOString());

  return count ?? 0;
}

export async function hasReachedDailyLimit(
  supabase: SupabaseClient,
  userId: string,
  isPremium: boolean,
): Promise<boolean> {
  if (isPremium) return false;
  const count = await getMessageCountToday(supabase, userId);
  return count >= FREE_DAILY_MESSAGE_LIMIT;
}

export async function createConversation(supabase: SupabaseClient, userId: string, title: string) {
  const { data } = await supabase
    .from("ai_conversation")
    .insert({ user_id: userId, title: title.slice(0, 60) })
    .select("id")
    .single();
  return data?.id as string | undefined;
}

export async function listConversations(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase
    .from("ai_conversation")
    .select("id, title, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  return (data ?? []) as { id: string; title: string; updated_at: string }[];
}


export async function getRecentConversation(supabase: SupabaseClient, userId: string) {
  const { data: conversation } = await supabase
    .from("ai_conversation")
    .select("id")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!conversation) return null;

  const messages = await getConversationHistory(supabase, conversation.id);
  return { conversationId: conversation.id as string, messages };
}

export async function getConversationHistory(supabase: SupabaseClient, conversationId: string) {
  const { data } = await supabase
    .from("ai_message")
    .select("role, content")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(20);
  return (data ?? []) as { role: "user" | "assistant"; content: string }[];
}

export async function renameConversation(supabase: SupabaseClient, conversationId: string, newTitle: string) {
  const { error } = await supabase
    .from("ai_conversation")
    .update({ title: newTitle.slice(0, 60) })
    .eq("id", conversationId);
  return !error;
}

export async function deleteConversation(supabase: SupabaseClient, conversationId: string) {
  const { error } = await supabase.from("ai_conversation").delete().eq("id", conversationId);
  return !error;
}

export async function saveMessage(
  supabase: SupabaseClient,
  conversationId: string,
  role: "user" | "assistant",
  content: string,
) {
  await supabase.from("ai_message").insert({ conversation_id: conversationId, role, content });
  await supabase.from("ai_conversation").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
}