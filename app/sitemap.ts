import type { MetadataRoute } from "next";

import { site } from "@/app/_lib/seo";

// Only completed, indexable pages belong here; each page also sets robots index: true.
const paths = [
  "/",
  "/san-pham/maxv-hddt",
  "/san-pham/maxv-accounting",
  "/san-pham/hoa-don-dien-tu",
  "/gioi-thieu",
  "/lien-he",
  "/dung-thu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
