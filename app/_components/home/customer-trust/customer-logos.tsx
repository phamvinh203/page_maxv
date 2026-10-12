"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import type { Customer } from "@/app/_data/customers";
import { cn } from "@/app/_lib/utils";

function CustomerLogo({ customer }: { customer: Customer }) {
  const [failed, setFailed] = useState(false);
  const content = customer.logo && !failed ? (
    <Image
      src={customer.logo}
      alt={customer.name}
      width={112}
      height={40}
      className="h-10 w-28 object-contain"
      // Small logos load directly, including remote URLs without an optimization allowlist.
      unoptimized
      onError={() => setFailed(true)}
    />
  ) : (
    <span className={cn("text-xl leading-7 font-extrabold whitespace-nowrap", customer.className)}>
      {customer.name}
    </span>
  );

  return (
    <li className="flex h-12 shrink-0 items-center">
      {customer.href ? (
        <a
          href={customer.href}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {content}
        </a>
      ) : content}
    </li>
  );
}

export function CustomerLogos({ customers }: { customers: Customer[] }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    if (!viewport || !list) return;

    const observer = new ResizeObserver(() => {
      setOverflow(list.scrollWidth > viewport.clientWidth);
    });
    observer.observe(viewport);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-w-0 flex-1">
      <div
        ref={viewportRef}
        role="region"
        aria-label="Logo các đối tác"
        tabIndex={overflow ? 0 : undefined}
        className="group overflow-x-auto rounded-sm px-1 py-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div
          className={cn(
            "flex w-max",
            overflow && "animate-partner-scroll group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none",
          )}
          style={{ animationPlayState: paused ? "paused" : undefined }}
        >
          <ul
            ref={listRef}
            aria-label="Khách hàng tiêu biểu"
            className="flex shrink-0 items-center gap-6 pr-6"
          >
            {customers.map((customer) => (
              <CustomerLogo key={`${customer.name}:${customer.logo}`} customer={customer} />
            ))}
          </ul>
          {overflow && (
            <ul aria-hidden="true" inert className="flex shrink-0 items-center gap-6 pr-6 motion-reduce:hidden">
              {customers.map((customer) => (
                <CustomerLogo key={`${customer.name}:${customer.logo}`} customer={customer} />
              ))}
            </ul>
          )}
        </div>
      </div>
      {overflow && (
        <Button
          variant="ghost"
          size="sm"
          aria-label={paused ? "Tiếp tục cuộn logo" : "Tạm dừng cuộn logo"}
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
          className="mt-1 h-7 px-2 text-[10px] text-muted-foreground motion-reduce:hidden"
        >
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          {paused ? "Tiếp tục" : "Tạm dừng"}
        </Button>
      )}
    </div>
  );
}
