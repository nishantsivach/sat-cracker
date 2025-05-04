"use client";

import { useState, useRef, useEffect, ElementRef, FormEvent } from "react";
import {
  SendHorizonal,
  Plus,
  CheckCircle,
  Sparkles,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Layout } from "@/components";
import Link from "next/link";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Hi there! I'm your SATCracker AI tutor. How can I help with your SAT preparation today?",
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
      icon: <Sparkles className="h-4 w-4" />,
    },
    {
      id: "math",
      name: "Math",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 6h16M4 12h16M4 18h12" />
        </svg>
      ),
    },
    {
      id: "reading",
      name: "Reading & Writing",
      icon: <BookOpen className="h-4 w-4" />,
    },
  ];

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate sending a message and getting a response
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate typing indicator
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      let response;

      // Basic response logic based on subject and message content
      if (subject === "math") {
        if (
          input.toLowerCase().includes("equation") ||
          input.toLowerCase().includes("solve")
        ) {
          response = {
            role: "system",
            content:
              "In SAT math, equations can be solved by isolating the variable. For example, if you have 2x + 3 = 7, subtract 3 from both sides to get 2x = 4, then divide both sides by 2 to get x = 2. Would you like to practice with a specific equation?",
          };
        } else {
          response = {
            role: "system",
            content:
              "The SAT Math section tests concepts in algebra, problem-solving, data analysis, and some advanced math. What specific topic would you like help with?",
          };
        }
      } else if (subject === "reading") {
        response = {
          role: "system",
          content:
            "The Evidence-Based Reading and Writing section requires careful analysis of passages. Remember to focus on what the text directly states rather than making assumptions. Would you like some strategies for approaching reading passages?",
        };
      } else {
        // General responses
        if (
          input.toLowerCase().includes("study") ||
          input.toLowerCase().includes("plan")
        ) {
          response = {
            role: "system",
            content:
              "A good SAT study plan involves regular practice, reviewing your mistakes, and focusing on your weak areas. I recommend starting with a diagnostic test to identify your strengths and weaknesses. Would you like me to help you create a personalized study schedule?",
          };
        } else if (
          input.toLowerCase().includes("score") ||
          input.toLowerCase().includes("improve")
        ) {
          response = {
            role: "system",
            content:
              "To improve your SAT score, focus on understanding the patterns of questions that appear on the test. Regular practice with official SAT questions and careful review of your mistakes will help you make significant progress. What's your current score range?",
          };
        } else {
          response = {
            role: "system",
            content:
              "I'm here to help with any aspect of your SAT preparation! I can explain concepts, provide practice questions, offer test-taking strategies, or help you organize your study plan. What would you like to focus on today?",
          };
        }
      }

      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Layout disableFooter>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-4 sticky top-20">
              <h2 className="font-semibold text-neutral-800 mb-4">
                Select Topic
              </h2>
              <ul className="space-y-2">
                {subjects.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setSubject(item.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${
                        subject === item.id
                          ? "bg-blue-700 text-white"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                      {subject === item.id && (
                        <CheckCircle className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h2 className="font-semibold text-neutral-800 mb-4">
                  Resources
                </h2>
                <ul className="space-y-1">
                  <li>
                    <a
                      href="/practice"
                      className="text-blue-700 hover:underline text-sm flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Take practice test
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/blogs"
                      className="text-blue-700 hover:underline text-sm flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      Study materials
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/tips"
                      className="text-blue-700 hover:underline text-sm flex items-center gap-1"
                    >
                      <Plus className="h-3 w-3" />
                      SAT tips & tricks
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-[600px]">
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-blue-700 text-white"
                            : "bg-neutral-100 text-neutral-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-neutral-100 text-neutral-800 flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Typing...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input area */}
              <div className="border-t border-neutral-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors flex items-center gap-2"
                    disabled={input.trim() === ""}
                  >
                    <span>Send</span>
                    <SendHorizonal className="h-4 w-4" />
                  </button>
                </form>
                <div className="mt-2 text-xs text-neutral-500 text-center">
                  SATCracker AI will help you with SAT concepts and practice
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
