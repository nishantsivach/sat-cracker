import type { MetadataRoute } from "next";
import { createClient } from "@/utils/supabase/server";
import { SEO_CONFIG } from "@/lib/seo/config";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const BASE_URL = SEO_CONFIG.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/practice`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mock-tests`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sat`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/sat/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sat/vs-act`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const [
    { data: posts },
    { data: topics },
    { data: colleges },
    { data: courses },
    { data: contentPages },
  ] = await Promise.all([
    supabase
      .from("blog_content")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: false }),

    supabase
      .from("topic_guide")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: false }),

    supabase
      .from("college")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: false }),

    supabase
      .from("course")
      .select("slug, updated_at")
      .eq("is_published", true)
      .order("updated_at", { ascending: false }),

    supabase
      .from("content_page")
      .select("slug, type, updated_at")
      .neq("type", "pillar")
      .eq("is_published", true)
      .order("updated_at", { ascending: false }),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: new Date(post.updated_at ?? new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const topicRoutes: MetadataRoute.Sitemap = (topics ?? []).map((topic) => ({
    url: `${BASE_URL}/topics/${topic.slug}`,
    lastModified: new Date(topic.updated_at ?? new Date()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const collegeRoutes: MetadataRoute.Sitemap = (colleges ?? []).map((college) => ({
    url: `${BASE_URL}/sat/colleges/${college.slug}`,
    lastModified: new Date(college.updated_at ?? new Date()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const courseRoutes: MetadataRoute.Sitemap = (courses ?? []).map((course) => ({
    url: `${BASE_URL}/courses/${course.slug}`,
    lastModified: new Date(course.updated_at ?? new Date()),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const satContentRoutes: MetadataRoute.Sitemap = (contentPages ?? []).map((page) => ({
    url: `${BASE_URL}/sat/${page.slug}`,
    lastModified: new Date(page.updated_at ?? new Date()),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...topicRoutes,
    ...collegeRoutes,
    ...courseRoutes,
    ...satContentRoutes,
  ];
}