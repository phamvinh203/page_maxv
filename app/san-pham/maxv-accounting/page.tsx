import { Check } from "lucide-react";
import type { Metadata } from "next";

import { TrialSignup } from "@/app/_components/home/trial-signup/trial-signup";
import { ProductHero } from "@/app/_components/product/product-hero";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { accountingModules, maxvAccounting } from "@/app/_data/maxv-accounting";

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

      <section aria-labelledby="accounting-modules-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="accounting-modules-heading" className="max-w-2xl lg:text-3xl">
            7 phân hệ kế toán trên một nền tảng
          </SectionHeading>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            MaxV Accounting đang được hoàn thiện và ra mắt dần. Trạng thái của từng phân hệ được ghi rõ trên thẻ.
          </p>
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

      <TrialSignup />
    </>
  );
}
