/**
 * Lớp dữ liệu Tin tức: đọc API công khai `/public/news/*` của be_maxv phía server,
 * cache bằng "use cache" + cacheLife("news") (≤ 60 giây, ADR-004, NFR-05).
 */
import { cacheLife } from "next/cache";

import { env } from "@/app/_lib/env";

const NEWS_API = `${env("API_BASE_URL")}/public/news`;

export type MediaRef = { id: string; url: string; alt: string; width: number | null; height: number | null };
export type NewsCategory = { name: string; slug: string; description: string | null; icon: string; sortOrder: number; postCount: number };
export type PostCard = {
  title: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  summary: string;
  publishedAt: string;
  image: MediaRef | null;
};
export type NewsTag = { name: string; slug: string };
export type PublicPost = PostCard & {
  content: string;
  tags: NewsTag[];
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string;
  allowComments: boolean;
  commentCount: number;
  related: PostCard[];
  /** Cài đặt trang của bài (BR-051, BR-052 — Đợt 3). */
  layout: "DEFAULT" | "FULL_WIDTH";
  hideNavUntilScroll: boolean;
  showToc: boolean;
};
export type PostPage = { items: PostCard[]; total: number; page: number; pageSize: number; tag: NewsTag | null };
type CommentBase = { id: string; authorName: string; isAdmin: boolean; content: string; createdAt: string };
export type PublicComment = CommentBase & { replies: CommentBase[] };
export type CommentPage = { items: PublicComment[]; total: number; page: number; pageSize: number; commentCount: number };
export type CmsPage = {
  title: string;
  path: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  publishedAt: string;
  updatedAt: string;
};
export type NewsSitemap = {
  categories: { slug: string; lastModified: string }[];
  posts: { categorySlug: string; slug: string; updatedAt: string }[];
  pages: { path: string; updatedAt: string }[];
};

/** Gọi API; 404 → null. Lỗi khác hoặc quá 5 giây thì ném, nên lỗi không bị cache và lần sau thử lại. */
async function getJson<T>(path: string): Promise<T | null> {
  const res = await fetch(`${NEWS_API}${path}`, { signal: AbortSignal.timeout(5000) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`News API ${res.status} ${path}`);
  return ((await res.json()) as { data: T }).data;
}

/** Danh mục cho menu, tab và route (REQ-040). */
export async function getNewsCategories(): Promise<NewsCategory[]> {
  "use cache";
  cacheLife("news");
  // shortcut: API lỗi → [] được cache 1 chu kỳ (menu hiện link "Tin tức" trơn) để layout và build không vỡ; tự hồi sau ≤ 60 giây.
  return (await getJson<NewsCategory[]>("/categories").catch(() => null)) ?? [];
}

/** Danh sách bài đã xuất bản (REQ-041..043). Ném lỗi khi API hỏng, người gọi tự bắt (REQ-049). */
export async function listNewsPosts(filter: { category?: string; tag?: string; q?: string; page: number }): Promise<PostPage | null> {
  "use cache";
  cacheLife("news");
  const query = new URLSearchParams({ page: String(filter.page), pageSize: "9" });
  if (filter.category) query.set("category", filter.category);
  if (filter.tag) query.set("tag", filter.tag);
  if (filter.q) query.set("q", filter.q);
  return getJson<PostPage>(`/posts?${query}`);
}

/** Tối đa 5 bài nổi bật (BR-032). */
export async function getFeaturedPosts(): Promise<PostCard[]> {
  "use cache";
  cacheLife("news");
  // shortcut: API lỗi → ẩn khối nổi bật trong 1 chu kỳ cache thay vì làm hỏng khung trang (REQ-049).
  return (await getJson<PostCard[]>("/posts/featured").catch(() => null)) ?? [];
}

/** Chi tiết bài theo slug; null nếu không có hoặc chưa xuất bản. */
export async function getNewsPost(slug: string): Promise<PublicPost | null> {
  "use cache";
  cacheLife("news");
  return getJson<PublicPost>(`/posts/${encodeURIComponent(slug)}`);
}

/** Bình luận đã duyệt của bài (REQ-045), 20 bình luận gốc mỗi trang. */
export async function listPostComments(slug: string, page: number): Promise<CommentPage | null> {
  "use cache";
  cacheLife("news");
  return getJson<CommentPage>(`/posts/${encodeURIComponent(slug)}/comments?page=${page}`);
}

/** Trang tĩnh đã xuất bản theo đường dẫn (REQ-046); null nếu không có, undefined nếu API lỗi. */
export async function getCmsPage(path: string): Promise<CmsPage | null | undefined> {
  "use cache";
  cacheLife("news");
  // Route [...slug] là ensureStatic 'navigation': lỗi ném ra trong lúc prerender làm hỏng build, nên trả undefined
  // (được cache 1 chu kỳ) để trang tự chọn trang chờ hoặc error.tsx.
  return getJson<CmsPage>(`/pages?path=${encodeURIComponent(path)}`).catch(() => undefined);
}

/** Dữ liệu sitemap (REQ-047). */
export async function getNewsSitemap(): Promise<NewsSitemap | null> {
  "use cache";
  cacheLife("news");
  // shortcut: API lỗi → sitemap chỉ còn trang tĩnh trong 1 chu kỳ cache, không làm hỏng /sitemap.xml.
  return getJson<NewsSitemap>("/sitemap").catch(() => null);
}

/** Đường dẫn bài trên website (BR-012). */
export const postHref = ({ categorySlug, slug }: Pick<PostCard, "categorySlug" | "slug">) => `/tin-tuc/${categorySlug}/${slug}`;
