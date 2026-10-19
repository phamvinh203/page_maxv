import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/app/_components/ui/container";
import {
  facebookIcon,
  maxvLogo,
  youtubeIcon,
  zaloIcon,
} from "@/app/_lib/assets";
import { contact } from "@/app/_lib/contact";
import { footerNavigation } from "@/app/_lib/navigation";

const socials = [
  { label: "Facebook", icon: facebookIcon, href: contact.facebookHref },
  { label: "YouTube", icon: youtubeIcon, href: contact.youtubeHref },
  { label: "Zalo", icon: zaloIcon, href: contact.zaloHref },
];

export function Footer() {
  return (
    <footer className="bg-[#032544] text-white">
      <Container className="pt-10 pb-24 lg:pt-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-4 xl:grid-cols-[1.6fr_1fr_1.2fr_1.2fr_0.9fr_1.3fr] xl:gap-6">
          <div className="col-span-2 md:col-span-4 xl:col-span-1">
            <Link
              href="/"
              aria-label="MaxV – Trang chủ"
              className="inline-block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <Image
                src={maxvLogo}
                alt="MaxV"
                className="h-auto w-28 mix-blend-screen [filter:grayscale(1)_invert(1)_brightness(4)]"
                sizes="112px"
              />
            </Link>
            <p className="mt-3 text-xs leading-6 text-blue-100/90">
              Phần mềm kế toán Việt Nam
              <br />
              Đồng hành cùng doanh nghiệp
            </p>
          </div>
          {footerNavigation.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-3 text-sm font-semibold">{group.title}</h2>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded-sm text-xs leading-5 text-blue-100/85 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 md:col-span-4 xl:col-span-1">
            <h2 className="mb-3 text-sm font-semibold">
              Kết nối với chúng tôi
            </h2>
            <div className="flex gap-2">
              {socials.map(({ label, icon, href }) => {
                const image = (
                  <Image
                    src={icon}
                    alt=""
                    className="size-9 rounded-full object-cover"
                  />
                );
                return href ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {image}
                  </a>
                ) : (
                  <button
                    key={label}
                    type="button"
                    disabled
                    aria-label={label}
                    className="cursor-not-allowed"
                  >
                    {image}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-5 text-[11px] text-blue-100/75 md:flex-row md:items-center md:justify-between">
          <p>Copyright 2013 © maxv.vn . All Rights Reserved</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="inline-flex items-center gap-2">
              <Phone aria-hidden="true" className="size-4 text-blue-400" />
              Hotline: {contact.hotline}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail aria-hidden="true" className="size-4 text-blue-400" />
              {contact.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-blue-400" />
              {contact.address}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
