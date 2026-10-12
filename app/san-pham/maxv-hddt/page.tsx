import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { TrialSignup } from "@/app/_components/home/trial-signup/trial-signup";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { hddtFeatures, hddtSteps, maxvHddt } from "@/app/_data/maxv-hddt";
import { heroImage } from "@/app/_lib/assets";

export const metadata: Metadata = {
  title: "MaxV HĐĐT – Đồng bộ và quản lý hóa đơn điện tử",
  description:
    "Tự động đồng bộ hóa đơn mua vào, bán ra từ Thuế điện tử, tải XML, PDF gốc, xuất Excel và quản lý nhiều công ty trên một nền tảng. Dùng thử miễn phí.",
  alternates: { canonical: "/san-pham/maxv-hddt" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <section
        aria-labelledby="hddt-heading"
        className="overflow-hidden bg-linear-to-br from-[#f1fbff] to-[#e3f3ff]"
      >
        <Container className="grid items-center gap-6 pt-10 pb-6 sm:pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-0 lg:py-8">
          <div className="relative z-10 lg:py-8">
            <Badge variant="eyebrow">SẢN PHẨM</Badge>
            <h1
              id="hddt-heading"
              className="mt-4 text-[2rem] leading-[1.18] font-bold tracking-tight text-foreground sm:text-[2.625rem] xl:text-5xl"
            >
              {maxvHddt.title}
              <span className="mt-1 block text-primary">{maxvHddt.highlight}</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
              {maxvHddt.description}
            </p>
            <div className="mt-6 flex flex-col gap-3 min-[360px]:flex-row sm:mt-7">
              <Button size="lg" asChild className="h-12 rounded-lg px-5 shadow-md shadow-primary/15 sm:px-6">
                <Link href="/dung-thu">Dùng thử miễn phí <ArrowRight aria-hidden="true" /></Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="h-12 rounded-lg border-primary/40 bg-white/40 px-6 text-primary">
                <Link href="/bang-gia">Xem bảng giá</Link>
              </Button>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-medium text-foreground/80 sm:mt-9">
              {maxvHddt.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="relative -mx-4 sm:-mx-6 lg:mx-0 lg:-mr-8">
            <Image
              src={heroImage}
              alt="Giao diện MaxV trên laptop và điện thoại, có màn hình danh sách hóa đơn."
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_12%)]"
            />
          </div>
        </Container>
      </section>

      <section aria-labelledby="hddt-features-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="hddt-features-heading" className="max-w-2xl lg:text-3xl">
            Mọi thứ bạn cần để quản lý hóa đơn điện tử
          </SectionHeading>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hddtFeatures.map(({ id, title, description, Icon }) => (
              <li key={id} className="min-w-0">
                <Card className="h-full shadow-xs">
                  <CardContent className="flex items-start gap-3 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-secondary text-primary">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm leading-5 font-semibold text-foreground">{title}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="hddt-steps-heading"
        className="bg-linear-to-b from-white to-[#f6fbff] py-12 sm:py-14"
      >
        <Container>
          <SectionHeading id="hddt-steps-heading" className="lg:text-3xl">
            Quản lý hóa đơn trong ba bước
          </SectionHeading>
          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {hddtSteps.map(({ id, title, description }, index) => (
              <li key={id} className="min-w-0">
                <Card className="h-full border-border/70 shadow-xs">
                  <CardContent className="flex items-start gap-3 p-5">
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm leading-6 font-semibold text-secondary-foreground">{title}</h3>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TrialSignup />
    </>
  );
}
