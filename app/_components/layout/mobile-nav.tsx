import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { ButtonLink } from "@/app/_components/ui/button-link";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose,
} from "@/app/_components/ui/sheet";
import { headerNavigation } from "@/app/_lib/navigation";

export function MobileNav() {
  return (
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
          {headerNavigation.map((group) => group.items ? (
            <details key={group.title} className="group border-b last:border-0">
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                {group.title}<ChevronDown aria-hidden="true" className="size-4 transition-transform group-open:rotate-180" />
              </summary>
              <ul className="space-y-1 pb-4">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link href={item.href} className="block rounded-md py-2 text-sm text-muted-foreground hover:text-primary focus-visible:outline-2 focus-visible:outline-primary">{item.label}</Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <div key={group.title} className="border-b last:border-0">
              <SheetClose asChild>
                <Link href={group.href} className="block py-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-primary">{group.title}</Link>
              </SheetClose>
            </div>
          ))}
        </nav>
        <div className="mt-auto grid gap-3 p-6">
          <SheetClose asChild>
            <Button variant="outline" asChild><Link href="/dang-nhap">Đăng nhập</Link></Button>
          </SheetClose>
          <SheetClose asChild>
            <ButtonLink href="/dung-thu">Dùng thử miễn phí</ButtonLink>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
