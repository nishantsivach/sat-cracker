import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import SeoContentForm from "../SeoContentForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit SEO Page",
};

export default async function EditSeoContentPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: page } = await supabase
    .from("content_page")
    .select(`
      id,
      title,
      slug,
      type,
      meta_title,
      meta_description,
      intro,
      body,
      data,
      is_published
    `)
    .eq("id", id)
    .single();

  if (!page) {
    notFound();
  }

  return (
    <SeoContentForm
      isEdit
      initialData={{
        id: page.id,
        title: page.title,
        slug: page.slug,
        type: page.type,
        meta_title: page.meta_title ?? "",
        meta_description: page.meta_description ?? "",
        intro: page.intro ?? "",
        body: page.body ?? "",
        data: JSON.stringify(page.data ?? {}, null, 2),
        is_published: page.is_published,
      }}
    />
  );
}