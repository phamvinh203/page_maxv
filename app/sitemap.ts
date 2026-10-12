import type { MetadataRoute } from "next";

import { site } from "@/app/_lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only completed, indexable pages belong here.
  return [{ url: `${site.url}/` }];
}
