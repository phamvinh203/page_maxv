import type { Metadata } from "next";

import { FeatureGrid } from "@/app/_components/sections/feature-grid";
import { ProductCtaCard } from "@/app/san-pham/_components/product-cta-card";
import { ProductHero } from "@/app/san-pham/_components/product-hero";
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

      <ProductCtaCard
        id="hddt-cta-heading"
        title="MaxV HĐĐT là công cụ quản lý hóa đơn điện tử của MaxV"
        description="Xem đầy đủ tính năng đồng bộ, tải file, xuất Excel và quản lý nhiều công ty."
      />
    </>
  );
}
