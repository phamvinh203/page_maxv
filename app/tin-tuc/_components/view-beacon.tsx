"use client";

/**
 * Gửi tín hiệu "đã xem" bài viết (REQ-070, ADR-009): trình duyệt gọi thẳng API để BE thấy IP thật,
 * chạy sau khi trang đã hiển thị, lỗi thì bỏ qua (AC-VIEW-06). BE tự chống trùng 24h và lọc bot.
 */
import { useEffect, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export function ViewBeacon({ slug }: { slug: string }) {
  // Ghi slug đã gửi: chặn gửi 2 lần do StrictMode ở dev, nhưng vẫn gửi khi chuyển sang bài khác.
  const sentSlug = useRef<string | null>(null);

  useEffect(() => {
    if (!API_URL || sentSlug.current === slug) return;
    sentSlug.current = slug;
    fetch(`${API_URL}/public/news/posts/${encodeURIComponent(slug)}/view`, {
      method: "POST",
      keepalive: true,
      credentials: "omit",
    }).catch(() => {});
  }, [slug]);

  return null;
}
