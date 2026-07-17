import { createClient } from "@/utils/supabase/server";
import { getRecentConversation, listConversations } from "@/utils/supabase/api/ai_conversation";
import { ChatClient } from "./ChatClient";


const WELCOME_MESSAGE = {
  role: "system" as const,
  content:
    "Hey! I'm your SAT prep tutor. Ask me anything — math problems, reading strategies, study plans, or test-day strategy. What's on your mind?",
};

type PageProps = {
  searchParams: Promise<{
    q?: string;
    selected?: string;
    correct?: string;
    topic?: string;
    explanation?: string;
  }>;
};

export default async function ChatPage({ searchParams }: PageProps) {
  const {
  q,
  selected,
  correct,
  topic,
  explanation,
} = await searchParams;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialMessages: { role: "system" | "user"; content: string }[] = [WELCOME_MESSAGE];
  let initialConversationId: string | null = null;
  let initialConversations: { id: string; title: string; updated_at: string }[] = [];
  let initialInput = "";

  if (user) {
    initialConversations = await listConversations(supabase, user.id);
  }


  if (q) {
  initialInput = `I'm stuck on this SAT question:

Question:
"${q}"

My answer:
"${selected}"

Correct answer:
"${correct}"

Topic:
"${topic ?? "Unknown"}"

Official explanation:
"${explanation ?? "Not available"}"

Can you explain:
1. Why my answer is wrong
2. Why the correct answer works
3. The SAT concept being tested
4. A shortcut or strategy I can remember?`;
} else if (user) {
    const recent = await getRecentConversation(supabase, user.id);
    if (recent && recent.messages.length > 0) {
      initialConversationId = recent.conversationId;
      initialMessages = recent.messages.map((m) => ({
        role: m.role === "assistant" ? ("system" as const) : ("user" as const),
        content: m.content,
      }));
    }
  }

  return (
    <ChatClient
      initialMessages={initialMessages}
      initialConversationId={initialConversationId}
      initialConversations={initialConversations}
      initialInput={initialInput}
      isLoggedIn={Boolean(user)}
    />
  );
}