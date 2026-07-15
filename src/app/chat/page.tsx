"use client";

import { useState, useRef, useEffect, ElementRef, FormEvent } from "react";
import {
  SendHorizonal,
  Plus,
  CheckCircle,
  Sparkles,
  BookOpen,
  Loader2,
  Calculator,
  MessageSquare,
  Zap,
} from "lucide-react";
import { Layout } from "@/components";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hey! I'm your SAT prep tutor. Ask me anything — math problems, reading strategies, or just where to start. I've got you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [subject, setSubject] = useState("general");
  const messagesEndRef = useRef<ElementRef<"div">>(null);

  const subjects = [
    {
      id: "general",
      name: "General Help",
      icon: <Sparkles className="w-4 h-4" />,
      desc: "Study tips & strategies",
    },
    {
      id: "math",
      name: "Math",
      icon: <Calculator className="w-4 h-4" />,
      desc: "Algebra, geometry & more",
    },
    {
      id: "reading",
      name: "Reading & Writing",
      icon: <BookOpen className="w-4 h-4" />,
      desc: "Passages & grammar",
    },
  ];

  const quickPrompts = [
    "Explain linear equations",
    "How do I improve my reading score?",
    "Create a 4-week study plan",
    "What's on the SAT Math section?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    setIsTyping(true);

    setTimeout(() => {
      let response;

      if (subject === "math") {
        if (
          input.toLowerCase().includes("equation") ||
          input.toLowerCase().includes("solve")
        ) {
          response = {
            role: "system",
            content:
              "Great question! For linear equations, the key is isolating the variable. Take **2x + 3 = 7**: subtract 3 from both sides → **2x = 4** → divide by 2 → **x = 2**. Want to try one together?",
          };
        } else {
          response = {
            role: "system",
            content:
              "The SAT Math section covers algebra, problem-solving, data analysis, and some advanced topics. What specific area feels tricky right now?",
          };
        }
      } else if (subject === "reading") {
        response = {
          role: "system",
          content:
            "For Reading & Writing, the biggest shift is this: don't assume anything. Every correct answer is directly supported by the passage. Read the question first, then hunt for evidence. Want me to walk through a sample passage?",
        };
      } else {
        if (
          input.toLowerCase().includes("study") ||
          input.toLowerCase().includes("plan")
        ) {
          response = {
            role: "system",
            content:
              "Smart move. The most effective study plans are built around consistency, not cramming. Start with a diagnostic test, then spend 30-45 minutes daily on your weak areas. Want me to help you map out the first week?",
          };
        } else if (
          input.toLowerCase().includes("score") ||
          input.toLowerCase().includes("improve")
        ) {
          response = {
            role: "system",
            content:
              "Score improvement comes down to three things: targeted practice, understanding your mistakes, and consistency. Most students see real gains within 4-6 weeks of daily practice. What's your current score range?",
          };
        } else {
          response = {
            role: "system",
            content:
              "I can help with that! Whether it's a specific math concept, reading strategy, test-day tips, or building a study schedule — just tell me what you need. What's on your mind?",
          };
        }
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <Layout disableFooter>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-2xl border border-site-border p-5 md:p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-site-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-site-accent" />
                </div>
                <h2 className="font-bold text-site-text">Focus area</h2>
              </div>

              <div className="space-y-2">
                {subjects.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSubject(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-left ${
                      subject === item.id
                        ? "bg-site-primary text-white shadow-md"
                        : "text-site-text hover:bg-site-highlight"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        subject === item.id
                          ? "bg-white/15"
                          : "bg-site-highlight"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p
                        className={`text-xs ${
                          subject === item.id
                            ? "text-white/60"
                            : "text-site-muted"
                        }`}
                      >
                        {item.desc}
                      </p>
                    </div>
                    {subject === item.id && (
                      <CheckCircle className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-site-border">
                <p className="text-xs font-bold uppercase tracking-wider text-site-muted mb-3">
                  Resources
                </p>
                <div className="space-y-1">
                  <Link
                    href="/practice"
                    className="flex items-center gap-2.5 text-sm text-site-text hover:text-site-secondary transition-colors py-2.5 px-3 rounded-lg hover:bg-site-highlight"
                  >
                    <Plus className="w-3.5 h-3.5 text-site-accent" />
                    Practice tests
                  </Link>
                  <Link
                    href="/sat"
                    className="flex items-center gap-2.5 text-sm text-site-text hover:text-site-secondary transition-colors py-2.5 px-3 rounded-lg hover:bg-site-highlight"
                  >
                    <Plus className="w-3.5 h-3.5 text-site-accent" />
                    SAT guide
                  </Link>
                  <Link
                    href="/blogs"
                    className="flex items-center gap-2.5 text-sm text-site-text hover:text-site-secondary transition-colors py-2.5 px-3 rounded-lg hover:bg-site-highlight"
                  >
                    <Plus className="w-3.5 h-3.5 text-site-accent" />
                    Study blog
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="lg:col-span-9 xl:col-span-9">
            <div className="bg-white rounded-2xl border border-site-border overflow-hidden flex flex-col h-[650px] md:h-[700px] shadow-sm">
              {/* Chat header */}
              <div className="px-5 md:px-6 py-4 border-b border-site-border flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-site-primary flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-site-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-site-text">
                      SAT Prep Tutor
                    </p>
                    <p className="text-xs text-site-muted flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Online · {subject === "math" ? "Math mode" : subject === "reading" ? "Reading mode" : "General mode"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 md:p-6">
                {messages.length === 1 && (
                  <div className="mb-8">
                    <p className="text-sm text-site-muted mb-4">
                      Try asking about:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => handleQuickPrompt(prompt)}
                          className="text-sm px-4 py-2.5 rounded-xl border border-site-border text-site-text hover:border-site-accent/30 hover:bg-site-highlight transition-all"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "system" && (
                        <div className="w-8 h-8 rounded-lg bg-site-highlight flex items-center justify-center shrink-0 mr-3 mt-1">
                          <Sparkles className="w-4 h-4 text-site-accent" />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed ${
                          message.role === "user"
                            ? "bg-site-primary text-white rounded-br-md"
                            : "bg-site-highlight text-site-text rounded-bl-md"
                        }`}
                      >
                        {message.content}
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
                        <span className="text-sm text-site-muted">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-site-border p-4 md:p-5 bg-white/80 backdrop-blur-sm">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      subject === "math"
                        ? "Ask a math question..."
                        : subject === "reading"
                        ? "Ask about reading or writing..."
                        : "Ask anything about the SAT..."
                    }
                    className="flex-1 px-4 py-3 rounded-xl border border-site-border bg-site-background text-site-text placeholder:text-site-muted focus:outline-none focus:border-site-accent/40 focus:ring-2 focus:ring-site-accent/10 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={input.trim() === ""}
                    className="px-5 py-3 bg-site-primary text-white rounded-xl hover:bg-site-primary/95 transition-all flex items-center gap-2 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <SendHorizonal className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}