"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { X } from "lucide-react";
import Image from "next/image";

import { maxvEmblem, phoneIcon, zaloIcon } from "@/app/_lib/assets";
import { contact } from "@/app/_lib/contact";

const linkClass =
  "flex items-center gap-3 rounded-lg p-2 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-primary";
const iconClass = "size-9 shrink-0";

export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Hover only for a real mouse: on touch the tap's click toggles instead, so the two never fight.
  const closeOnLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const focused = document.activeElement;
    // Keyboard focus inside the panel must survive: unmounting it would drop focus to <body>.
    if (focused?.matches(":focus-visible") && focused !== buttonRef.current && event.currentTarget.contains(focused)) return;
    setOpen(false);
  };

  return (
    <div
      className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={closeOnLeave}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        setOpen(false);
        buttonRef.current?.focus();
      }}
      // shortcut: tapping outside does not close on touch (iOS never blurs); add a document pointerdown listener if that bites.
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget) && setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label="Liên hệ hỗ trợ"
        aria-expanded={open}
        aria-controls={open ? "contact-panel" : undefined}
        // A mouse click only keeps it open (hover normally opened it already, and it still opens if hover never ran). Keyboard and touch clicks toggle.
        onClick={(event) => setOpen((event.nativeEvent as PointerEvent).pointerType === "mouse" || !open)}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
      >
        {open ? <X aria-hidden="true" className="size-6" /> : <Image src={maxvEmblem} alt="" sizes="56px" loading="eager" className="size-full rounded-full" />}
      </button>
      {/* After the button in the DOM so Tab goes button -> panel links; it is placed above visually. */}
      {open && (
        // The pb-3 gap sits inside this wrapper, so the pointer can travel from the button to the panel without leaving.
        <div
          id="contact-panel"
          tabIndex={-1}
          className="absolute right-0 bottom-full w-72 origin-bottom-right pb-3 outline-none animate-in fade-in-0 zoom-in-95 motion-reduce:animate-none"
        >
          <div className="rounded-xl border bg-popover p-4 shadow-lg">
            <p className="text-sm font-semibold text-foreground">Hỗ trợ MaxV</p>
            <p className="mt-1 text-xs text-muted-foreground">Chúng tôi sẵn sàng hỗ trợ bạn.</p>
            <div className="mt-3 space-y-1">
              {contact.zaloHref && (
                <a href={contact.zaloHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Image src={zaloIcon} alt="" className={iconClass} />
                  Chat qua Zalo
                </a>
              )}
              <a href={contact.hotlineHref} className={linkClass}>
                <Image src={phoneIcon} alt="" className={iconClass} />
                <span>
                  Gọi hotline
                  <span className="block text-xs font-normal text-muted-foreground">{contact.hotline}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
