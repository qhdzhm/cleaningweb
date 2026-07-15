import type { MetadataRoute } from "next";
import { SITE } from "@/lib/contact";
import { allPosts } from "@/lib/posts";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-static";

// Generated from the content lists, so a new service page or post can never be
// left out and lastmod can't go stale the way the old hand-written file did.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts();
  const newestPost = posts[0]?.updated ?? posts[0]?.date;

  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Service pages are the commercial intent — rank them above the blog.
    ...SERVICES.map((service) => ({
      url: `${SITE}/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE}/blog`,
      lastModified: newestPost ? new Date(newestPost) : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `${SITE}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
