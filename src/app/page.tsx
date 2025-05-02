import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Layout } from "@/components";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from("blog_content")
    .select("title, slug, content, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pb-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight mb-4">
          Crack the SAT with Confidence
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-neutral-600">
          An AI-powered companion for smarter preparation — ask questions,
          explore curated blogs, and stay ahead of the curve.
        </p>
        <Link
          href="/chat"
          className="inline-block mt-8 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-700 transition"
        >
          Chat with SAT AI
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-14">
          What Can SATCracker Help You With?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["AI-Powered Chat", "Ask questions about SAT topics anytime."],
            [
              "Blog Suggestions",
              "Get recommended content based on your needs.",
            ],
            ["Concept Clarity", "Understand tough topics with ease."],
            ["Exam Tips", "Boost your test-taking strategies."],
            ["Updated Blogs", "Stay informed with fresh SAT content."],
            ["Smart Resources", "Discover the best materials quickly."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h4 className="text-xl font-medium mb-2">{title}</h4>
              <p className="text-sm text-neutral-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 px-6 bg-neutral-100 flex flex-col gap-10 items-center">
        <h3 className="text-3xl font-semibold text-center">
          Latest Blog Posts
        </h3>
        <div className="max-w-4xl flex flex-col gap-2 w-full">
          {blogs?.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog.slug}
              className="w-full"
            >
              <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg border hover:shadow-md transition">
                <h4 className="text-lg font-semibold text-neutral-800">
                  {blog.title}
                </h4>
                <p className="line-clamp-2 my-2">{blog.content}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
          <div className="text-center mt-6">
            <Link
              href="/blogs"
              className="text-neutral-700 underline hover:text-neutral-900 transition"
            >
              View All Blogs →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-neutral-800">
        <h3 className="text-3xl font-semibold text-center mb-10">FAQs</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold">What is SATCracker?</h4>
            <p className="text-sm text-neutral-600">
              Your AI assistant for smarter SAT preparation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Is it free?</h4>
            <p className="text-sm text-neutral-600">
              Yes. You can chat and access resources with no cost.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">How do I get started?</h4>
            <p className="text-sm text-neutral-600">
              Just click “Start Chat” above and ask your first question!
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
