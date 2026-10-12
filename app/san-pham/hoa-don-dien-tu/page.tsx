import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { TrialSignup } from "@/app/_components/home/trial-signup/trial-signup";
import { FeatureGrid } from "@/app/_components/product/feature-grid";
import { ProductHero } from "@/app/_components/product/product-hero";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { hoaDonDienTu, hoaDonTopics } from "@/app/_data/hoa-don-dien-tu";

export const metadata: Metadata = {
  title: "Hóa đơn điện tử – Quản lý hóa đơn mua vào, bán ra",
  description:
    "Quản lý hóa đơn điện tử mua vào, bán ra: đồng bộ từ Thuế điện tử, tải XML, PDF gốc, xuất Excel và lập tờ khai GTGT từ hóa đơn đã đồng bộ.",
  alternates: { canonical: "/san-pham/hoa-don-dien-tu" },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <ProductHero
        {...hoaDonDienTu}
        imageAlt="Giao diện MaxV trên laptop và điện thoại, có màn hình danh sách hóa đơn."
        primary={{ label: "Xem MaxV HĐĐT", href: "/san-pham/maxv-hddt" }}
        secondary={{ label: "Dùng thử miễn phí", href: "/dung-thu" }}
      />

      <section aria-labelledby="hddt-topics-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="hddt-topics-heading" className="max-w-2xl lg:text-3xl">
            Từ hóa đơn trên Thuế điện tử đến tờ khai
          </SectionHeading>
          <FeatureGrid items={hoaDonTopics} className="md:grid-cols-3" />
        </Container>
      </section>

      <section aria-labelledby="hddt-cta-heading" className="bg-linear-to-b from-white to-[#f6fbff] pb-12 sm:pb-14">
        <Container>
          <Card className="shadow-xs">
            <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 id="hddt-cta-heading" className="text-base leading-6 font-semibold text-foreground">
                  MaxV HĐĐT là công cụ quản lý hóa đơn điện tử của MaxV
                </h2>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  Xem đầy đủ tính năng đồng bộ, tải file, xuất Excel và quản lý nhiều công ty.
                </p>
              </div>
              <Button asChild className="h-10 shrink-0 rounded-lg">
                <Link href="/san-pham/maxv-hddt">Tìm hiểu MaxV HĐĐT <ArrowRight aria-hidden="true" /></Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>

      <TrialSignup />
    </>
  );
}
