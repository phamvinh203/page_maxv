"use client";

/**
 * "Ẩn điều hướng trước khi cuộn" (REQ-073, BR-052): thanh điều hướng ẩn ở đầu trang, hiện và dính trên cùng
 * khi cuộn từ 200 px. CSS nằm trong globals.css, chỉ áp khi trang có phần tử `[data-hide-nav]` đang gắn cờ.
 * Phần tử đánh dấu render sẵn từ server nên lần tải đầu không nháy header. Khi rời trang (kể cả trang được
 * Next giữ ẩn nhờ cacheComponents) effect dọn gỡ cờ trên phần tử và `data-nav-shown` trên <html> (BUG-006).
 */
import { useEffect, useRef } from "react";

const SHOW_AFTER_PX = 200;

export function HideNavUntilScroll() {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const marker = markerRef.current;
    marker?.setAttribute("data-hide-nav", "");
    const onScroll = () => root.toggleAttribute("data-nav-shown", window.scrollY >= SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.removeAttribute("data-nav-shown");
      marker?.removeAttribute("data-hide-nav");
    };
  }, []);

  return <span ref={markerRef} data-hide-nav="" hidden />;
}
