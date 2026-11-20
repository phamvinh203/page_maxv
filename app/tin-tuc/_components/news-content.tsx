import { cn } from "@/app/_lib/utils";

export type TocItem = { level: 2 | 3; id: string; label: string };

const NAMED_ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };

/** Giải mã entity HTML thành chữ thường để nhãn mục lục render dạng text (RVW-024); entity lạ giữ nguyên. */
export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] !== "#") return NAMED_ENTITIES[code.toLowerCase()] ?? match;
    const point = code[1] === "x" || code[1] === "X" ? parseInt(code.slice(2), 16) : Number(code.slice(1));
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : match;
  });
}

/**
 * Gắn id neo `muc-1`, `muc-2`… cho các tiêu đề H2/H3 và trả mục lục (BR-051).
 * Đánh số theo thứ tự nên tiêu đề trùng chữ hay toàn dấu tiếng Việt vẫn có neo ổn định (EC-23).
 * Nhãn mục lục = nội dung tiêu đề bỏ thẻ rồi giải mã entity, render dạng chữ (không dùng HTML).
 */
export function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  let count = 0;
  const out = html.replace(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const id = `muc-${++count}`;
    const label = decodeEntities(inner.replace(/<[^>]*>/g, "")).trim();
    if (label) toc.push({ level: Number(level) as 2 | 3, id, label });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: out, toc };
}

// HTML đã được be_maxv lọc bằng sanitize-html trước khi lưu (BR-009, ADR-003) nên render thẳng. Kiểu chữ: lớp .news-content trong globals.css.
export function NewsContent({ html, className }: { html: string; className?: string }) {
  return <div className={cn("news-content", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
