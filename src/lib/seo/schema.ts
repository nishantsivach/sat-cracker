import { SEO_CONFIG } from "./config";
import { buildCanonical } from "./canonical";

type BaseSchemaOptions = {
  title: string;
  description: string;
  path: string;
};

type ArticleSchemaOptions = BaseSchemaOptions & {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
};

type FAQItem = {
  question: string;
  answer: string;
};


type CourseSchemaOptions = BaseSchemaOptions & {
  provider?: string;
};

/**
 * Organization Schema
 */
export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_CONFIG.organizationName,
    url: SEO_CONFIG.siteUrl,
    logo: buildCanonical("/logo.png"),
  };
}

/**
 * WebPage Schema
 */
export function createWebPageSchema({
  title,
  description,
  path,
}: BaseSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    headline: title,
    description,
    url: buildCanonical(path),
    inLanguage: SEO_CONFIG.language,
    isPartOf: {
      "@type": "WebSite",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
    },
  };
}

/**
 * Article Schema
 */
export function createArticleSchema({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  author,
  image,
}: ArticleSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: buildCanonical(path),

    image: image
      ? buildCanonical(image)
      : buildCanonical(SEO_CONFIG.defaultOgImage),

    author: {
      "@type": "Person",
      name: author ?? SEO_CONFIG.organizationName,
    },

    publisher: {
      "@type": "Organization",
      name: SEO_CONFIG.organizationName,
      logo: {
        "@type": "ImageObject",
        url: buildCanonical("/logo.png"),
      },
    },

    datePublished: publishedTime,
    dateModified: modifiedTime ?? publishedTime,

    inLanguage: SEO_CONFIG.language,
  };
}

/**
 * FAQ Schema
 */
export function createFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Course Schema
 */
export function createCourseSchema({
  title,
  description,
  path,
  provider,
}: CourseSchemaOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url: buildCanonical(path),

    provider: {
      "@type": "Organization",
      name: provider ?? SEO_CONFIG.organizationName,
    },
  };
}

