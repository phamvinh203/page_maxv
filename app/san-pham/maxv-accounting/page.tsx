import { Check, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Plans } from "@/app/_components/sections/plans";
import { FeatureGrid } from "@/app/_components/sections/feature-grid";
import { ProductHero } from "@/app/san-pham/_components/product-hero";
import { Badge } from "@/app/_components/ui/badge";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import {
  accountingModules,
  accountingReasons,
  accountingSolutions,
  accountingTestimonials,
  maxvAccounting,
} from "@/app/_data/maxv-accounting";
import { pricing } from "@/app/_data/pricing";

export const metadata: Metadata = {
  title: "MaxV Accounting – Phần mềm kế toán online",
  description:
    "Phần mềm kế toán online với 7 phân hệ: tổng hợp, tiền, bán hàng, mua hàng, tồn kho, giá thành và hệ thống. Đang hoàn thiện, ra mắt dần.",
  alternates: { canonical: "/san-pham/maxv-accounting" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <ProductHero
        {...maxvAccounting}
        imageAlt="Phần mềm kế toán MaxV trên laptop và điện thoại, hiển thị tổng quan doanh thu, công nợ, tồn kho và hóa đơn."
        primary={{ label: "Xem bảng giá", href: "/bang-gia" }}
        secondary={{ label: "Tư vấn gói phù hợp", href: "/bang-gia/tu-van-goi-phu-hop" }}
      />

      <section aria-labelledby="accounting-solutions-heading" className="py-12 sm:py-14">
        <Container>
          <div className="text-center">
            <SectionHeading id="accounting-solutions-heading">Giải quyết mọi bài toán kế toán</SectionHeading>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Tối ưu quy trình, tiết kiệm thời gian, nâng cao hiệu quả quản trị
            </p>
          </div>
          <FeatureGrid
            stacked
            items={accountingSolutions}
            className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
          />
        </Container>
      </section>

      <section
        aria-labelledby="accounting-reasons-heading"
        className="bg-section-fade py-12 sm:py-14"
      >
        <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeading id="accounting-reasons-heading" className="lg:text-3xl">
              Vì sao doanh nghiệp nên chọn <span className="text-primary">MaxV Accounting</span>
            </SectionHeading>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
              Một nền tảng web cho kế toán tổng hợp, tiền, bán hàng, mua hàng, tồn kho và giá thành.
            </p>
            <ButtonLink
              href="/bang-gia/tu-van-goi-phu-hop"
              className="mt-6 h-11 rounded-lg"
            >
              Tư vấn gói phù hợp
            </ButtonLink>
          </div>
          <Card className="shadow-xs">
            <CardContent className="p-6">
              <ul className="space-y-4">
                {accountingReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3 text-sm leading-6 text-foreground">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {reason}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Container>
      </section>

      <section aria-labelledby="accounting-modules-heading" className="py-12 sm:py-14">
        <Container>
          <div className="text-center">
            <SectionHeading id="accounting-modules-heading">7 phân hệ kế toán trên một nền tảng</SectionHeading>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              MaxV Accounting đang được hoàn thiện và ra mắt dần. Trạng thái của từng phân hệ được ghi rõ trên thẻ.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accountingModules.map(({ id, title, description, items, status }) => (
              <li key={id} className="min-w-0">
                <Card className="h-full shadow-xs">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm leading-6 font-semibold text-foreground">{title}</h3>
                      <Badge variant="outline" className="shrink-0 text-[10px] text-primary">{status}</Badge>
                    </div>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
                    <ul className="mt-4 space-y-2">
                      {items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs leading-5 text-foreground">
                          <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="accounting-testimonials-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="accounting-testimonials-heading" className="text-center">
            Khách hàng nói gì về MaxV?
          </SectionHeading>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {accountingTestimonials.map(({ id, quote, name, role, initial, avatar }) => (
              <li key={id} className="min-w-0">
                <Card className="h-full shadow-xs">
                  <CardContent className="h-full p-6">
                    <figure className="flex h-full flex-col">
                      <Quote aria-hidden="true" className="size-7 text-primary" strokeWidth={1.75} />
                      <blockquote className="mt-4 flex-1 text-sm leading-7 text-foreground">{quote}</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        {avatar ? (
                          <Image src={avatar} alt="" width={44} height={44} className="size-11 shrink-0 rounded-full object-cover" />
                        ) : (
                          <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-semibold text-secondary-foreground">
                            {initial}
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-sm leading-5 font-semibold text-foreground">{name}</span>
                          <span className="block text-xs leading-5 text-muted-foreground">{role}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <div className="bg-section-fade pt-12 sm:pt-14">
        <Plans heading={{ title: "Gói phần mềm phù hợp với doanh nghiệp", description: pricing.description }} />
      </div>
    </>
  );
}
