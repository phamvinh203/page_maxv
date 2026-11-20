import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

export function Pagination({ currentPage, totalPages, basePath, query }: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  /** Tham số giữ lại khi chuyển trang (vd `q`, `the`). */
  query?: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const params = new URLSearchParams(Object.entries(query ?? {}).filter((entry): entry is [string, string] => !!entry[1]));
    if (page > 1) params.set("page", String(page));
    return params.size ? `${basePath}?${params}` : basePath;
  };

  return (
    <nav aria-label="Phân trang" className="mt-8">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {currentPage > 1 ? (
            <Button asChild variant="outline" size="sm">
              <Link href={href(currentPage - 1)} rel="prev"><ChevronLeft aria-hidden="true" />Trước</Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled><ChevronLeft aria-hidden="true" />Trước</Button>
          )}
        </li>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <li key={page}>
            <Button asChild variant={page === currentPage ? "default" : "outline"} size="icon-sm">
              <Link href={href(page)} aria-label={`Trang ${page}`} aria-current={page === currentPage ? "page" : undefined}>
                {page}
              </Link>
            </Button>
          </li>
        ))}
        <li>
          {currentPage < totalPages ? (
            <Button asChild variant="outline" size="sm">
              <Link href={href(currentPage + 1)} rel="next">Sau<ChevronRight aria-hidden="true" /></Link>
            </Button>
          ) : (
            <Button variant="outline" size="sm" disabled>Sau<ChevronRight aria-hidden="true" /></Button>
          )}
        </li>
      </ul>
    </nav>
  );
}
