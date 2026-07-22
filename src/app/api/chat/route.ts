import { NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";
import {
  hasReachedDailyLimit,
  createConversation,
  getConversationHistory,
  saveMessage,
} from "@/utils/supabase/api/ai_conversation";
import { checkIsPremium } from "@/utils/supabase/api/subscription";


const SYSTEM_PROMPT = `You are an expert, encouraging SAT tutor who helps students with every part of SAT preparation: Math, Reading & Writing, study planning, test-taking strategy, and general motivation.
Read each message and figure out what kind of help is being asked for — you don't need the student to tell you which subject or mode they're in.
When explaining a concept, walk through your reasoning step by step rather than jumping straight to the final answer.
Keep responses focused and exam-relevant. If a student seems stuck, ask a guiding question instead of immediately giving the answer.`;

export async function POST(req: NextRequest) {
  const { conversationId, message } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Message is required" }), { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let activeConversationId: string | null = conversationId ?? null;
  let history: { role: "user" | "assistant"; content: string }[] = [];

  if (user) {
    const isPremium = await checkIsPremium(supabase, user.id);
    
    if (await hasReachedDailyLimit(supabase, user.id, isPremium)) {
      return new Response(
        JSON.stringify({ error: "Daily message limit reached. Upgrade to Premium for unlimited messages." }),
        { status: 429 },
      );
    }

    if (!activeConversationId) {
      activeConversationId = (await createConversation(supabase, user.id, message)) ?? null;
    }

    if (activeConversationId) {
      history = await getConversationHistory(supabase, activeConversationId);
      await saveMessage(supabase, activeConversationId, "user", message);
    }
  }

  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: message },
      ],
    }),
  });

  if (!openaiResponse.ok || !openaiResponse.body) {
    return new Response(JSON.stringify({ error: "AI Tutor is temporarily unavailable." }), { status: 502 });
  }

  const reader = openaiResponse.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const data = trimmed.slice(5).trim();
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              fullText += delta;
              controller.enqueue(new TextEncoder().encode(delta));
            }
          } catch {
            // Ignore malformed SSE fragments
          }
        }
      }

      if (user && activeConversationId && fullText) {
        await saveMessage(supabase, activeConversationId, "assistant", fullText);
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Conversation-Id": activeConversationId ?? "",
    },
  });
}