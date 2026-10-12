import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileCheck2,
  Headphones,
  MonitorSmartphone,
  ReceiptText,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { heroImage } from "@/app/_lib/assets";

const benefits = [
  { label: "Kết nối hóa đơn TCT", Icon: FileCheck2 },
  { label: "Làm việc mọi nơi", Icon: MonitorSmartphone },
  { label: "Bảo mật dữ liệu", Icon: ShieldCheck },
  { label: "Hỗ trợ trực tiếp", Icon: Headphones },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="overflow-hidden bg-linear-to-br from-[#f1fbff] to-[#e3f3ff]"
    >
      <Container className="grid items-center gap-6 pt-10 pb-6 sm:pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-0 lg:py-8">
        <div className="relative z-10 lg:py-8">
          <Badge variant="eyebrow" className="max-w-full whitespace-normal sm:text-xs">
            PHẦN MỀM KẾ TOÁN ONLINE MAXV
          </Badge>

          <h1
            id="hero-heading"
            className="mt-4 text-[2rem] leading-[1.18] font-bold tracking-tight text-foreground sm:text-[2.625rem] xl:text-5xl"
          >
            Kế toán nhanh hơn.
            <span className="mt-1 block text-primary">
              Quản trị tài chính dễ hơn.
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
            Tự động lấy hóa đơn, hạch toán, quản lý công nợ – tồn kho – giá thành
            và lập báo cáo trên một nền tảng.
          </p>

          <div className="mt-6 flex flex-col gap-3 min-[360px]:flex-row sm:mt-7">
            <Button
              size="lg"
              asChild
              className="h-12 rounded-lg px-5 shadow-md shadow-primary/15 sm:px-6"
            >
              <Link href="/dung-thu">Dùng thử miễn phí <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="h-12 rounded-lg border-primary/40 bg-white/40 px-6 text-primary"
            >
              <Link href="/bang-gia">Xem bảng giá</Link>
            </Button>
          </div>

          <ul className="mt-7 grid grid-cols-2 gap-x-3 gap-y-4 sm:mt-9 sm:flex sm:flex-wrap sm:gap-x-5">
            {benefits.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-[11px] font-medium text-foreground/80"
              >
                <Icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-secondary-foreground"
                />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative -mx-4 sm:-mx-6 lg:mx-0 lg:-mr-8">
          <Image
            src={heroImage}
            alt="Phần mềm kế toán MaxV trên laptop và điện thoại, hiển thị tổng quan doanh thu, công nợ, tồn kho và hóa đơn."
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
            loading="eager"
            fetchPriority="high"
            className="h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_12%)]"
          />

          <div className="absolute top-2 right-4 flex max-w-52 items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-3 shadow-lg shadow-sky-900/10 sm:top-4 sm:right-6 sm:px-4 lg:top-3 lg:right-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <ReceiptText aria-hidden="true" className="size-5" />
            </span>
            <p className="text-[11px] leading-4 font-semibold text-secondary-foreground">
              Tự động lấy hóa đơn từ Tổng cục Thuế
            </p>
          </div>

          <div className="absolute bottom-9 left-4 flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-3 shadow-lg shadow-sky-900/10 sm:bottom-14 sm:left-6 sm:px-4 lg:bottom-12 lg:left-0">
            <Zap aria-hidden="true" className="size-6 shrink-0 text-primary" />
            <p className="text-xs leading-5 font-bold text-foreground">
              Tiết kiệm 70%
              <span className="block text-[10px] font-medium text-muted-foreground">
                thời gian nhập liệu
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
