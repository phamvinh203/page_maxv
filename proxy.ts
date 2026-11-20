/**
 * Proxy: trả 404 thật cho `/tin-tuc/{danh-mục-không-tồn-tại}` (REQ-041, BUG-003).
 * Trang danh sách đọc searchParams nên không dùng được ensureStatic; notFound() ở đó chạy sau khi stream đã trả 200.
 */
import { NextResponse, type NextRequest } from "next/server";

import { env } from "@/app/_lib/env";

const TTL_MS = 60_000; // khớp cacheLife("news"): danh mục mới lên web chậm nhất ~60 giây (NFR-05)

// shortcut: cache trong bộ nhớ tiến trình (mỗi tiến trình Node tự tải lại sau 60 giây); đổi sang cache chung nếu chạy nhiều instance.
let cache: { slugs: Set<string>; at: number } | undefined;

/** Slug các danh mục đang có, lấy từ API công khai và giữ 60 giây. */
async function categorySlugs(): Promise<Set<string>> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.slugs;
  const res = await fetch(`${env("API_BASE_URL")}/public/news/categories`, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error(`News API ${res.status}`);
  const { data } = (await res.json()) as { data: { slug: string }[] };
  cache = { slugs: new Set(data.map((category) => category.slug)), at: Date.now() };
  return cache.slugs;
}

export async function proxy(request: NextRequest) {
  const slugs = await categorySlugs().catch(() => undefined);
  // API lỗi: cho qua, trang tự xử lý như cũ (not-found + noindex).
  if (!slugs || slugs.has(request.nextUrl.pathname.split("/")[2])) return NextResponse.next();
  // Đường 4 đoạn chỉ khớp [...slug] (ensureStatic) → notFound() với mã 404 thật.
  return NextResponse.rewrite(new URL("/tin-tuc/_/_/_", request.url));
}

export const config = { matcher: "/tin-tuc/:category" };
