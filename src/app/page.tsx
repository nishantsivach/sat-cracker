import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";
import {
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <Layout>
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Background element - bubble patterns like answer sheets */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-500"></div>
          <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-red-500"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-yellow-500"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-green-500"></div>
        </div>

        {/* Floating SAT score elements */}
        <div className="absolute top-10 left-1/4 font-mono bg-white/80 px-3 py-1 rounded-lg shadow-sm border border-neutral-200 rotate-2">
          800
        </div>
        <div className="absolute bottom-20 right-1/4 font-mono bg-white/80 px-3 py-1 rounded-lg shadow-sm border border-neutral-200 -rotate-3">
          1600
        </div>
        <div className="absolute top-1/2 right-20 font-mono bg-white/80 px-3 py-1 rounded-lg shadow-sm border border-neutral-200 rotate-6">
          750
        </div>

        <div className="relative z-10">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium mb-6">
            #1 SAT Prep Companion
          </span>
          <h1 className="text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-800">
            Crack the SAT<span className="text-black">.</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-neutral-700 mb-6">
            Your AI-powered study partner for smarter SAT preparation —
            perfectly balancing
            <span className="font-medium text-blue-700"> Math</span> and
            <span className="font-medium text-purple-700">
              {" "}
              Evidence-Based Reading & Writing
            </span>
            .
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/chat"
              className="px-8 py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Start Practice Now</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/blogs"
              className="px-8 py-3 bg-white text-blue-700 border border-blue-200 rounded-full hover:bg-blue-50 transition shadow-sm hover:shadow-md"
            >
              Explore SAT Resources
            </Link>
          </div>

          {/* Score improvement ticker */}
          <div className="mt-12 bg-white/70 backdrop-blur-sm py-3 px-4 rounded-xl inline-flex items-center gap-3 border border-neutral-200 shadow-sm">
            <TrendingUp className="text-green-600 w-5 h-5" />
            <p className="text-sm font-medium">
              Students improve by{" "}
              <span className="text-green-600 font-bold">200+ points</span> on
              average
            </p>
          </div>
        </div>
      </section>

      {/* SAT Section Breakdown */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Master Every Section of the SAT
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Math Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <svg
                    className="w-8 h-8 text-blue-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Math</h3>
                  <p className="text-neutral-600 mb-4">
                    Conquer algebra, geometry, and data analysis with
                    confidence.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Problem-solving strategies",
                      "Calculator & non-calculator sections",
                      "Formula recall tips",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Reading & Writing Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-4 rounded-xl">
                  <BookOpen className="w-8 h-8 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Reading & Writing</h3>
                  <p className="text-neutral-600 mb-4">
                    Master comprehension, grammar, and analytical skills.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Passage analysis techniques",
                      "Grammar rule mastery",
                      "Evidence identification",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full font-medium">
            Powerful Tools
          </span>
          <h3 className="text-3xl font-bold mt-4">
            How SATCracker Boosts Your Score
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Brain className="w-8 h-8 text-blue-600" />,
              title: "AI-Powered Practice",
              desc: "Personalized question sets tailored to your weak areas.",
            },
            {
              icon: <Clock className="w-8 h-8 text-purple-600" />,
              title: "Time Management",
              desc: "Learn efficient test-taking strategies to maximize your time.",
            },
            {
              icon: <Target className="w-8 h-8 text-red-600" />,
              title: "Target Weak Areas",
              desc: "Focus your study time on concepts you need most.",
            },
            {
              icon: <BookOpen className="w-8 h-8 text-green-600" />,
              title: "Curated Resources",
              desc: "Access the best SAT content from our extensive library.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              ),
              title: "Score Insights",
              desc: "Get detailed analytics on your performance and progress.",
            },
            {
              icon: (
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              ),
              title: "24/7 Assistance",
              desc: "Ask questions anytime and get clear, helpful answers.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-neutral-200 flex flex-col items-start"
            >
              <div className="mb-4">{icon}</div>
              <h4 className="text-xl font-bold mb-2">{title}</h4>
              <p className="text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Question Preview */}
      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Sample SAT Questions</h3>
            <p className="text-neutral-600 mt-2">
              Try these to see how SATCracker helps you understand concepts
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Math - Medium
                </span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span className="text-sm text-neutral-500">1 min 30 sec</span>
                </div>
              </div>
              <p className="font-medium mb-4">
                If f(x) = 2x² - 3x + 1 and g(x) = x - 2, what is the value of
                f(g(3))?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["A) 1", "B) 3", "C) 7", "D) 11"].map((option) => (
                  <div
                    key={option}
                    className="border border-neutral-200 rounded-lg p-3 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-neutral-50 p-4 text-center">
              <Link
                href="/chat"
                className="text-blue-600 font-medium hover:text-blue-800 transition"
              >
                Get explanations in chat →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-6 flex flex-col items-center">
        <div className="text-center mb-12">
          <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full font-medium">
            Expert Content
          </span>
          <h3 className="text-3xl font-bold mt-4">Latest SAT Insights</h3>
        </div>

        <div className="max-w-4xl grid md:grid-cols-3 gap-6 w-full">
          {blogs?.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog.slug}
              className="w-full"
            >
              <div className="bg-white h-full rounded-xl border border-neutral-200 hover:shadow-md transition overflow-hidden flex flex-col">
                {/* Placeholder colored bar to simulate featured image */}
                <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-neutral-500 mb-2">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <h4 className="text-lg font-bold mb-2 text-neutral-800">
                    {blog.title}
                  </h4>
                  <p className="line-clamp-3 text-sm text-neutral-600 flex-1">
                    {blog.content}
                  </p>
                  <div className="mt-4 pt-3 border-t border-neutral-100">
                    <span className="text-blue-600 text-sm font-medium">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/blogs"
            className="px-6 py-2 border border-neutral-300 rounded-full hover:bg-neutral-50 transition flex items-center gap-2"
          >
            <span>View All SAT Resources</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold">Score Success Stories</h3>
            <p className="text-neutral-600 mt-3">
              See how students improved with SATCracker
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex J.",
                gain: "+210 points",
                quote:
                  "The practice questions perfectly targeted my weak areas in algebra. I went from 580 to 790 in Math!",
              },
              {
                name: "Taylor M.",
                gain: "+180 points",
                quote:
                  "The reading strategies helped me understand how to approach difficult passages. My EBRW score jumped from 620 to 800.",
              },
              {
                name: "Jordan L.",
                gain: "+230 points",
                quote:
                  "I used SATCracker for just 3 weeks before my test and improved from 1120 to 1350. The explanations were so clear!",
              },
            ].map(({ name, gain, quote }) => (
              <div
                key={name}
                className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold">{name}</span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                    {gain}
                  </span>
                </div>
                <p className="text-neutral-700 italic">&quot;{quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-neutral-800">
        <h3 className="text-3xl font-bold text-center mb-10">
          Common SAT Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              q: "What is SATCracker?",
              a: "SATCracker is an AI-powered SAT prep tool that helps you practice effectively, identify weak areas, and access quality resources to boost your score.",
            },
            {
              q: "Is it free to use?",
              a: "Yes! All features including AI chat, practice questions, and educational resources are completely free.",
            },
            {
              q: "How do I get started?",
              a: "Click the 'Start Practice Now' button above and begin by asking about any SAT topic you're struggling with.",
            },
            {
              q: "Can SATCracker help with specific SAT sections?",
              a: "Absolutely! Whether it's Math, Reading, or Writing & Language, our AI is trained on thousands of real SAT questions and explanations.",
            },
            {
              q: "How much can I improve my score?",
              a: "Students typically see improvements of 100-300 points with consistent practice, though results vary based on starting point and effort.",
            },
          ].map(({ q, a }) => (
            <div
              key={q}
              className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-lg mb-2">{q}</h4>
              <p className="text-neutral-600">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Boost Your SAT Score?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who&apos;ve improved their scores with
            SATCracker.
          </p>
          <Link
            href="/chat"
            className="inline-block px-8 py-4 bg-white text-blue-700 rounded-full font-bold shadow-lg hover:shadow-xl transition"
          >
            Start Your SAT Prep Journey
          </Link>
        </div>
      </section>
    </Layout>
  );
}
