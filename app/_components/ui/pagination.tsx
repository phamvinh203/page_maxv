import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

export function Pagination({ currentPage, totalPages, basePath }: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) => page === 1 ? basePath : `${basePath}?page=${page}`;

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
