import type { MetadataRoute } from "next";

import { site } from "@/app/_lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    // Crawlers need access to placeholder pages to read their noindex metadata.
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
