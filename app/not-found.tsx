import Link from "next/link";

import { Button } from "@/app/_components/ui/button";

export const metadata = {
  title: "Không tìm thấy trang",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-7xl font-bold tracking-tight text-primary sm:text-8xl">404</p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Không tìm thấy trang
      </h1>
      <p className="max-w-md text-muted-foreground">
        Trang bạn tìm kiếm không tồn tại hoặc đã được di chuyển. Vui lòng kiểm tra lại
        đường dẫn hoặc quay về trang chủ.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/">Trở về trang chủ</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/lien-he">Liên hệ hỗ trợ</Link>
        </Button>
      </div>
    </section>
  );
}
