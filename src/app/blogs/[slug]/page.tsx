import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { Layout } from "@/components";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Instruments({ params }: PageProps) {
  const supabase = await createClient();
  const slug = (await params).slug;

  const { data } = await supabase
    .from("blog_content")
    .select()
    .eq("slug", slug)
    .single();

  if (!data) {
    notFound();
  }

  console.log(data.content, "content");

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold mb-6">{data.title}</h1>
        <div className="prose dark:prose max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}
