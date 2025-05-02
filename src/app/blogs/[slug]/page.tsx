import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation"; // for better error handling

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
    notFound(); // Next.js-native 404
  }

  return (
    <div className="prose mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  );
}
