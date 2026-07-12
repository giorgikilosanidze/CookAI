import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

// Shared recipe pages (/recipe/[id]) are intentionally left out — they're
// unlisted links owned by users, not content we want indexed wholesale.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/generate`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/signin`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/signup`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
