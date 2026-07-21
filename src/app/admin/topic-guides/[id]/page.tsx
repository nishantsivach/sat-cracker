import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import TopicGuideForm from "../TopicGuideForm";
import RelatedGuidesManager from "./RelatedGuidesManager";

export default async function EditTopicGuidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: guide } = await supabase.from("topic_guide").select("*").eq("id", id).single();
  if (!guide) notFound();

  const { data: relatedRaw } = await supabase
    .from("topic_guide_related")
    .select("id, related:related_topic_guide_id(id, name)")
    .eq("topic_guide_id", id);

  const related = (relatedRaw ?? []).map((row) => ({
    id: row.id,
    guide: Array.isArray(row.related) ? row.related[0] : row.related,
  }));

  return (
    <div className="max-w-3xl">
      <TopicGuideForm
        mode="edit"
        guideId={guide.id}
        initialValues={{
          name: guide.name,
          slug: guide.slug,
          section: guide.section,
          summary: guide.summary ?? "",
          meta_title: guide.meta_title ?? "",
          meta_description: guide.meta_description ?? "",
          body: guide.body,
          is_published: guide.is_published,
        }}
      />

      <div className="mt-12 pt-10 border-t border-site-border">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-site-text">Related guides</h2>
          <p className="text-sm text-site-muted mt-1">
            Link other topic guides that students should explore next.
          </p>
        </div>
        <RelatedGuidesManager guideId={guide.id} initialRelated={related} />
      </div>
    </div>
  );
}