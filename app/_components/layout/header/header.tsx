"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, Search } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import {
  NavigationMenu, NavigationMenuContent, NavigationMenuItem,
  NavigationMenuList, NavigationMenuTrigger,
} from "@/app/_components/ui/navigation-menu";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/app/_components/ui/sheet";
import { maxvLogo } from "@/app/_lib/assets";
import { headerNavigation } from "@/app/_lib/navigation";

export function Header() {
  return (
    <header className="relative z-40 border-b border-border/60 bg-white">
      <Container className="flex h-18 items-center justify-between gap-2 sm:gap-4 lg:h-20">
        <Link href="/" aria-label="MaxV – Trang chủ" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <Image src={maxvLogo} alt="MaxV" className="h-auto w-24 sm:w-28 lg:w-32" sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 96px" loading="eager" />
        </Link>

        <NavigationMenu aria-label="Điều hướng chính" viewport={false} className="hidden xl:flex">
          <NavigationMenuList className="gap-0">
            {headerNavigation.map((group) => (
              <NavigationMenuItem key={group.title}>
                <NavigationMenuTrigger className="px-3 text-xs font-medium text-foreground">{group.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-60 p-2">
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <button type="button" disabled className="w-full cursor-not-allowed rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground">{item}</button>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" disabled aria-label="Tìm kiếm" className="hidden text-primary disabled:opacity-100 xl:inline-flex">
            <Search aria-hidden="true" />
          </Button>
          <Button variant="outline" disabled className="hidden h-10 rounded-lg border-input px-5 text-primary disabled:opacity-100 sm:inline-flex">Đăng nhập</Button>
          <Button disabled aria-label="Dùng thử miễn phí" className="h-10 rounded-lg px-3 text-xs shadow-sm shadow-primary/20 disabled:opacity-100 sm:px-5 sm:text-sm">
            <span className="sm:hidden">Dùng thử</span><span className="hidden sm:inline">Dùng thử miễn phí</span> <ArrowRight aria-hidden="true" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Mở menu" className="xl:hidden"><Menu className="size-5" aria-hidden="true" /></Button>
            </SheetTrigger>
            <SheetContent className="w-[min(90vw,380px)] gap-0 overflow-y-auto">
              <SheetHeader className="border-b p-6">
                <SheetTitle className="text-xl text-primary">Menu MaxV</SheetTitle>
                <SheetDescription>Sản phẩm, giải pháp và hỗ trợ doanh nghiệp.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Điều hướng di động" className="px-6 py-3">
                {headerNavigation.map((group) => (
                  <details key={group.title} className="group border-b last:border-0">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                      {group.title}<ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="space-y-1 pb-4">
                      {group.items.map((item) => <li key={item}><button type="button" disabled className="w-full cursor-not-allowed py-2 text-left text-sm text-muted-foreground">{item}</button></li>)}
                    </ul>
                  </details>
                ))}
              </nav>
              <div className="mt-auto grid gap-3 p-6">
                <Button variant="outline" disabled className="disabled:opacity-100">Đăng nhập</Button>
                <Button disabled className="disabled:opacity-100">Dùng thử miễn phí <ArrowRight aria-hidden="true" /></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Container>
    </header>
  );
}
