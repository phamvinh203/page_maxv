import type { MetadataRoute } from "next";

import { getNewsSitemap } from "@/app/_lib/newsApi";
import { site } from "@/app/_lib/seo";

// Only completed, indexable pages belong here; each page also sets robots index: true.
const paths = [
  "/",
  "/san-pham/maxv-hddt",
  "/san-pham/maxv-accounting",
  "/san-pham/maxv-hkd",
  "/san-pham/hoa-don-dien-tu",
  "/gioi-thieu",
  "/lien-he",
  "/dang-ky",
  "/tin-tuc",
];

// Tin tức (REQ-047): danh mục có ≥ 1 bài, mọi bài và trang tĩnh đã xuất bản; API lỗi thì chỉ còn trang tĩnh.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getNewsSitemap();
  return [
    ...paths.map((path) => ({ url: `${site.url}${path}` })),
    ...(news?.categories ?? []).map(({ slug, lastModified }) => ({ url: `${site.url}/tin-tuc/${slug}`, lastModified })),
    ...(news?.posts ?? []).map(({ categorySlug, slug, updatedAt }) => ({ url: `${site.url}/tin-tuc/${categorySlug}/${slug}`, lastModified: updatedAt })),
    ...(news?.pages ?? []).map(({ path, updatedAt }) => ({ url: `${site.url}/${path}`, lastModified: updatedAt })),
  ];
}
