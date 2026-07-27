import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";
import { SEO_CONFIG } from "@/lib/seo/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const BASE_URL = SEO_CONFIG.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "yearly", priority: 1 },
    { url: `${BASE_URL}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE_URL}/mock-tests`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/sat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sat/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/sat/vs-act`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const [{ data: posts }, { data: topics }, { data: colleges }, { data: courses }, { data: contentPages }] =
    await Promise.all([
      supabase.from("blog_content").select("slug, created_at").eq("is_published", true),
      supabase.from("topic_guide").select("slug, updated_at").eq("is_published", true),
      supabase.from("college").select("slug, updated_at").eq("is_published", true),
      supabase.from("course").select("slug, created_at").eq("is_published", true),
      supabase.from("content_page").select("slug, type").neq("type", "pillar").eq("is_published", true),
    ]);

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${BASE_URL}/blogs/${p.slug}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const topicRoutes: MetadataRoute.Sitemap = (topics ?? []).map((t) => ({
    url: `${BASE_URL}/topics/${t.slug}`,
    lastModified: new Date(t.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const collegeRoutes: MetadataRoute.Sitemap = (colleges ?? []).map((c) => ({
    url: `${BASE_URL}/sat/colleges/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const courseRoutes: MetadataRoute.Sitemap = (courses ?? []).map((c) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    lastModified: new Date(c.created_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const satContentRoutes: MetadataRoute.Sitemap = (contentPages ?? []).map((p) => ({
    url: `${BASE_URL}/sat/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...topicRoutes, ...collegeRoutes, ...courseRoutes, ...satContentRoutes];
}