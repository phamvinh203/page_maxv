/**
 * Mục lục bài viết (REQ-072, BR-051): danh sách H2 → H3 lồng nhau, thu gọn được nhờ <details> (không cần JS).
 */
import type { TocItem } from "@/app/tin-tuc/_components/news-content";

export function NewsToc({ items }: { items: TocItem[] }) {
  // H3 gắn vào H2 đứng trước; H3 đứng đầu bài (chưa có H2) thành mục cấp 1.
  const groups: { item: TocItem; children: TocItem[] }[] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (item.level === 3 && last) last.children.push(item);
    else groups.push({ item, children: [] });
  }

  return (
    <nav aria-label="Mục lục" className="mt-6">
      <details open className="rounded-lg border bg-muted/40 p-4 text-sm">
        <summary className="cursor-pointer font-semibold text-foreground">Mục lục</summary>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5">
          {groups.map(({ item, children }) => (
            <li key={item.id}>
              <TocLink item={item} />
              {children.length > 0 && (
                <ol className="mt-1.5 list-[lower-alpha] space-y-1 pl-5">
                  {children.map((child) => (
                    <li key={child.id}><TocLink item={child} /></li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

function TocLink({ item }: { item: TocItem }) {
  return <a href={`#${item.id}`} className="text-primary hover:underline">{item.label}</a>;
}
