import type { Metadata } from "next";

import { FeatureGrid } from "@/app/_components/product/feature-grid";
import { ProductHero } from "@/app/_components/product/product-hero";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { hddtFeatures, hddtSteps, maxvHddt } from "@/app/_data/maxv-hddt";

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
      <ProductHero
        {...maxvHddt}
        imageAlt="Giao diện MaxV trên laptop và điện thoại, có màn hình danh sách hóa đơn."
        primary={{ label: "Dùng thử miễn phí", href: "/dung-thu" }}
        secondary={{ label: "Xem bảng giá", href: "/bang-gia" }}
      />

      <section aria-labelledby="hddt-features-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="hddt-features-heading" className="max-w-2xl lg:text-3xl">
            Mọi thứ bạn cần để quản lý hóa đơn điện tử
          </SectionHeading>
          <FeatureGrid items={hddtFeatures} className="sm:grid-cols-2 lg:grid-cols-3" />
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
    </>
  );
}
