// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/utils/supabase/api";

const BASE_URL = "https://satcracker.com";

const TOPIC_SLUGS = ["linear-equations", "punctuation-rules"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: posts } = await getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sat`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sat/math`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sat/reading-writing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
     {
      url: `${BASE_URL}/sat/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sat/dates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sat/registration`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sat/scoring`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = TOPIC_SLUGS.map((slug) => ({
    url: `${BASE_URL}/topics/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const dynamicPostRoutes: MetadataRoute.Sitemap =
    posts?.map((post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post.created_at || new Date()),
      changeFrequency: "monthly",
      priority: 0.5,
    })) || [];

  return [...staticRoutes, ...dynamicPostRoutes, ...topicRoutes];
}
