import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";

import { DesktopNav } from "@/app/_components/layout/desktop-nav";
import { MobileNav } from "@/app/_components/layout/mobile-nav";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { maxvLogo } from "@/app/_lib/assets";

export function Header() {
  return (
    <header className="relative z-40 border-b border-border/60 bg-white">
      <Container className="flex h-18 items-center justify-between gap-2 sm:gap-4 lg:h-20">
        <Link href="/" aria-label="MaxV – Trang chủ" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Image src={maxvLogo} alt="MaxV" className="h-auto w-24 sm:w-28 lg:w-32" sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px" loading="eager" />
        </Link>

        <DesktopNav />

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" disabled aria-label="Tìm kiếm" className="hidden text-primary disabled:opacity-100 xl:inline-flex">
            <Search aria-hidden="true" />
          </Button>
          <Button variant="outline" asChild className="hidden h-10 rounded-lg border-input px-5 text-primary sm:inline-flex"><Link href="/dang-nhap">Đăng nhập</Link></Button>
          <Button asChild className="h-10 rounded-lg px-3 text-xs shadow-sm shadow-primary/20 sm:px-5 sm:text-sm">
            <Link href="/dung-thu" aria-label="Dùng thử miễn phí"><span className="sm:hidden">Dùng thử</span><span className="hidden sm:inline">Dùng thử miễn phí</span> <ArrowRight aria-hidden="true" /></Link>
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
