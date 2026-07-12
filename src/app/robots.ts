import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/siteUrl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API routes and the private cookbook aren't for crawlers.
      disallow: ["/api/", "/saved"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
