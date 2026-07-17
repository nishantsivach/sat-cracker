"use client";

import { useState, useRef, useEffect, ElementRef, FormEvent } from "react";
import {
  SendHorizonal,
  Plus,
  Sparkles,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Trash2,
  Pencil,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Layout } from "@/components";
import { createClient } from "@/utils/supabase/client";
import {
  getConversationHistory,
  deleteConversation,
  renameConversation,
} from "@/utils/supabase/api/ai_conversation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = { role: "user" | "system"; content: string };
type ConversationSummary = { id: string; title: string; updated_at: string };

type Props = {
  initialMessages: Message[];
  initialConversationId: string | null;
  initialConversations: ConversationSummary[];
  initialInput?: string;
  isLoggedIn: boolean;
};

const WELCOME_MESSAGE: Message = {
  role: "system",
  content:
    "Hey! I'm your SAT prep tutor. Ask me anything — math problems, reading strategies, study plans, or test-day strategy. What's on your mind?",
};

export function ChatClient({
  initialMessages,
  initialConversationId,
  initialConversations,
  initialInput = "",
  isLoggedIn,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [conversations, setConversations] = useState<ConversationSummary[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(initialConversationId);
  const [input, setInput] = useState(initialInput);
  const [isTyping, setIsTyping] = useState(false);
  const [switchingConversation, setSwitchingConversation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ConversationSummary | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const messagesEndRef = useRef<ElementRef<"div">>(null);
  const deletePopoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (deletePopoverRef.current && !deletePopoverRef.current.contains(e.target as Node)) {
        setDeleteTarget(null);
      }
    };
    if (deleteTarget) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [deleteTarget]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleNewChat() {
    setActiveConversationId(null);
    setMessages([WELCOME_MESSAGE]);
    setErrorMsg(null);
    setInput("");
  }

  async function handleSelectConversation(id: string) {
    if (id === activeConversationId) return;
    setSwitchingConversation(true);
    setErrorMsg(null);

    const supabase = createClient();
    const history = await getConversationHistory(supabase, id);

    setMessages(
      history.map((m) => ({
        role: m.role === "assistant" ? "system" : "user",
        content: m.content,
      }))
    );
    setActiveConversationId(id);
    setSwitchingConversation(false);
  }

  function startRename(c: ConversationSummary) {
    setRenamingId(c.id);
    setRenameValue(c.title);
  }

  async function commitRename(id: string) {
    const trimmed = renameValue.trim();
    setRenamingId(null);
    if (!trimmed) return;

    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, title: trimmed } : c)));

    const supabase = createClient();
    const success = await renameConversation(supabase, id, trimmed);
    if (!success) setErrorMsg("Couldn't rename that conversation.");
  }

  async function handleDeleteConversation(id: string) {
    const supabase = createClient();
    const success = await deleteConversation(supabase, id);
    if (!success) {
      setErrorMsg("Couldn't delete that conversation. Please try again.");
      setDeleteTarget(null);
      return;
    }

    setConversations((prev) => prev.filter((c) => c.id !== id));
    setDeleteTarget(null);

    if (id === activeConversationId) {
      handleNewChat();
    }
  }

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const isNewConversation = !activeConversationId;

    setErrorMsg(null);
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("q")) {
        url.searchParams.delete("q");
        url.searchParams.delete("selected");
        url.searchParams.delete("correct");
        url.searchParams.delete("topic");
url.searchParams.delete("explanation");
url.searchParams.delete("questionId");
        router.replace(url.pathname + (url.search ? `?${url.searchParams}` : ""), { scroll: false });
      }
    }
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeConversationId, message: trimmed }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setErrorMsg(data.error ?? "Daily message limit reached.");
        setIsTyping(false);
        return;
      }

      if (!res.ok || !res.body) {
        setErrorMsg("Something went wrong. Please try again.");
        setIsTyping(false);
        return;
      }

      const returnedConversationId = res.headers.get("X-Conversation-Id");

      if (returnedConversationId) {
        if (isNewConversation) {
          setActiveConversationId(returnedConversationId);
          setConversations((prev) => [
            { id: returnedConversationId, title: trimmed.slice(0, 60), updated_at: new Date().toISOString() },
            ...prev,
          ]);
        } else {
          setConversations((prev) => {
            const match = prev.find((c) => c.id === returnedConversationId);
            if (!match) return prev;
            return [
              { ...match, updated_at: new Date().toISOString() },
              ...prev.filter((c) => c.id !== returnedConversationId),
            ];
          });
        }
      }

      setMessages((prev) => [...prev, { role: "system", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });

        if (firstChunk) {
          setIsTyping(false);
          firstChunk = false;
        }

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <Layout disableFooter>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-2xl border border-site-border p-5 md:p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-site-primary flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-site-accent" />
                </div>
                <h2 className="font-bold text-site-text">SAT AI Tutor</h2>
              </div>

              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 bg-site-primary text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-site-primary/95 transition-colors mb-6 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                New chat
              </button>

              {isLoggedIn && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-site-muted mb-3">
                    Recent conversations
                  </p>
                  {conversations.length === 0 ? (
                    <p className="text-xs text-site-muted px-1">Your conversations will show up here.</p>
                  ) : (
                    <div className="space-y-0.5 max-h-[320px] overflow-y-auto">
                      {conversations.map((c) => (
                        <div key={c.id} className="group relative">
                          {renamingId === c.id ? (
                            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-site-highlight border border-site-secondary/20">
                              <input
                                autoFocus
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitRename(c.id);
                                  if (e.key === "Escape") setRenamingId(null);
                                }}
                                onBlur={() => commitRename(c.id)}
                                className="flex-1 min-w-0 bg-white text-sm px-2 py-1 rounded-lg border border-site-border focus:outline-none"
                              />
                              <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => commitRename(c.id)}
                                className="p-1 rounded-md text-site-success shrink-0 hover:bg-green-50 cursor-pointer"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSelectConversation(c.id)}
                              className={`w-full flex items-center gap-2.5 pl-3 pr-2 py-2.5 rounded-xl text-left text-sm transition-colors cursor-pointer ${
                                c.id === activeConversationId
                                  ? "bg-site-highlight text-site-text font-semibold"
                                  : "text-site-muted hover:bg-site-highlight/60 hover:text-site-text"
                              }`}
                            >
                              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate flex-1">{c.title}</span>
                              <span className="hidden group-hover:flex items-center gap-0.5 shrink-0">
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    startRename(c);
                                  }}
                                  className="p-1 rounded-md hover:bg-white text-site-muted hover:text-site-secondary transition-all cursor-pointer"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </span>
                                <span
                                  role="button"
                                  tabIndex={0}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteTarget(c);
                                  }}
                                  className="p-1 rounded-md hover:bg-red-50 text-site-muted hover:text-site-error transition-all cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </span>
                              </span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!isLoggedIn && (
                <div className="pt-5 border-t border-site-border">
                  <p className="text-xs text-site-muted">
                    <Link href="/signup" className="text-site-secondary font-semibold hover:underline cursor-pointer">
                      Sign up
                    </Link>{" "}
                    to save conversations and get a higher daily message limit.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-5 border-t border-site-border">
                <p className="text-xs font-bold uppercase tracking-wider text-site-muted mb-3">Resources</p>
                <div className="space-y-1">
                  {[
                    { href: "/practice", label: "Practice tests" },
                    { href: "/sat", label: "SAT guide" },
                    { href: "/blogs", label: "Study blog" },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 text-sm text-site-text hover:text-site-secondary transition-colors py-2.5 px-3 rounded-lg hover:bg-site-highlight cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-site-accent" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 xl:col-span-9">
            <div className="bg-white rounded-2xl border border-site-border overflow-hidden flex flex-col h-[650px] md:h-[700px] shadow-sm">
              <div className="px-5 md:px-6 py-4 border-b border-site-border flex items-center justify-between bg-white/90">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-site-primary flex items-center justify-center">
                    <MessagesSquare className="w-4 h-4 text-site-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-site-text">SAT Prep Tutor</p>
                    <p className="text-xs text-site-muted flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Online
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 md:p-6">
                {switchingConversation ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin text-site-muted" />
                  </div>
                ) : (
                  <div className="space-y-5">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "system" && (
                          <div className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 mr-3 mt-1">
                            <Sparkles className="w-4 h-4 text-site-accent" />
                          </div>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                            message.role === "user"
                              ? "bg-site-primary text-white rounded-br-md whitespace-pre-wrap"
                              : "bg-site-highlight text-site-text rounded-bl-md prose prose-sm max-w-none prose-p:my-1.5 prose-headings:my-2"
                          }`}
                        >
                          {message.role === "system" ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
                          ) : (
                            message.content
                          )}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 mr-3 mt-1">
                          <Sparkles className="w-4 h-4 text-site-accent" />
                        </div>
                        <div className="bg-site-highlight rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-site-muted" />
                          <span className="text-sm text-site-muted">Thinking...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="px-5 md:px-6 pb-2">
                  <p className="text-xs text-site-error bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                </div>
              )}

              <div className="border-t border-site-border p-4 md:p-5 bg-white/90">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    placeholder="Ask anything about the SAT..."
                    className="flex-1 px-4 py-3 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted focus:outline-none focus:border-site-accent/40 focus:ring-4 focus:ring-site-accent/10 transition-all disabled:opacity-60 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={input.trim() === "" || isTyping}
                    className="px-5 py-3 bg-site-primary text-white rounded-xl hover:bg-site-primary/95 transition-all flex items-center gap-2 font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <SendHorizonal className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div
            ref={deletePopoverRef}
            className="bg-white rounded-2xl border border-site-border shadow-2xl p-6 w-full max-w-sm mx-4 animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-site-error" />
              </div>
              <div>
                <p className="text-sm font-bold text-site-text">Delete conversation?</p>
                <p className="text-xs text-site-muted mt-1">
                  This will permanently delete &ldquo;{deleteTarget.title}&rdquo; and all its messages.
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-site-text border border-site-border hover:bg-site-highlight transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteConversation(deleteTarget.id)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}