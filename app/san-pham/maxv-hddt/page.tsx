import type { Metadata } from "next";

import { StepCard } from "@/app/_components/sections/step-card";
import { FeatureGrid } from "@/app/_components/sections/feature-grid";
import { ProductHero } from "@/app/san-pham/_components/product-hero";
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
        primary={{ label: "Dùng thử miễn phí", href: "/dang-ky" }}
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
        className="bg-section-fade py-12 sm:py-14"
      >
        <Container>
          <SectionHeading id="hddt-steps-heading" className="lg:text-3xl">
            Quản lý hóa đơn trong ba bước
          </SectionHeading>
          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {hddtSteps.map(({ id, title, description }, index) => (
              <li key={id} className="min-w-0">
                <StepCard index={index} title={title} description={description} />
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
