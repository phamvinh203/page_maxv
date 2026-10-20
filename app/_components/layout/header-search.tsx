"use client";

import { useState, type ReactNode } from "react";
import { Search, X } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

// Desktop only: the search replaces the nav while open, so `children` is the nav.
export function HeaderSearch({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 xl:flex">
      {open ? (
        // shortcut: /tin-tuc ignores ?q= until article search exists; point the action at the search endpoint then.
        <form
          action="/tin-tuc"
          role="search"
          className="flex flex-1 animate-in items-center gap-1 fade-in slide-in-from-right-8 duration-300"
          onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
        >
          <div className="relative flex-1">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <label htmlFor="header-search" className="sr-only">Tìm kiếm</label>
            <Input
              id="header-search"
              name="q"
              type="search"
              autoFocus
              placeholder="Tìm kiếm sản phẩm, bài viết..."
              className="h-10 rounded-full border-transparent bg-secondary/60 pl-10 shadow-none focus-visible:border-input focus-visible:bg-white focus-visible:ring-0 [&::-webkit-search-cancel-button]:hidden"
            />
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Đóng tìm kiếm" className="text-primary" onClick={() => setOpen(false)}>
            <X aria-hidden="true" />
          </Button>
        </form>
      ) : (
        <>
          <div className="flex flex-1 animate-in justify-center fade-in duration-300">{children}</div>
          <Button type="button" variant="ghost" size="icon" aria-label="Tìm kiếm" className="text-primary" onClick={() => setOpen(true)}>
            <Search aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}
