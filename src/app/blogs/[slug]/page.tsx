import { createClient } from "@/utils/supabase/server";
import ReactMarkdown from "react-markdown";

export default async function Instruments({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_content")
    .select()
    .eq("slug", params.slug)
    .single(); // assuming you're getting one item

  if (!data) {
    return <p>Not found.</p>;
  }

  return (
    <div className="prose mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  );
}
