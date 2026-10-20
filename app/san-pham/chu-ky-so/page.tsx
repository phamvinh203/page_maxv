import type { Metadata } from "next";

import { TrialSignup } from "@/app/_components/sections/trial-signup";
import { FeatureGrid } from "@/app/_components/product/feature-grid";
import { ProductCtaCard } from "@/app/_components/product/product-cta-card";
import { ProductHero } from "@/app/_components/product/product-hero";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { chuKySo, chuKySoTopics } from "@/app/_data/chu-ky-so";

// shortcut: inherits noindex from the root layout until the digital signature offer (provider, packages) is confirmed; then set robots index: true and add the page to the sitemap.
export const metadata: Metadata = {
  title: "Chữ ký số – Xác thực cho hóa đơn và tờ khai điện tử",
  description:
    "Chữ ký số giúp doanh nghiệp xác thực người ký khi dùng hóa đơn điện tử, nộp tờ khai thuế điện tử và giao dịch với cơ quan nhà nước.",
};

export default function Page() {
  return (
    <>
      <ProductHero
        {...chuKySo}
        primary={{ label: "Xem MaxV HĐĐT", href: "/san-pham/maxv-hddt" }}
        secondary={{ label: "Liên hệ MaxV", href: "/lien-he" }}
      />

      <section aria-labelledby="signature-topics-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="signature-topics-heading" className="max-w-2xl lg:text-3xl">
            Chữ ký số dùng vào việc gì
          </SectionHeading>
          <FeatureGrid items={chuKySoTopics} className="md:grid-cols-3" />
        </Container>
      </section>

      <ProductCtaCard
        id="signature-hddt-heading"
        title="MaxV HĐĐT lưu và tải XML hóa đơn gốc đã ký số"
        description="Tải file XML đã ký số của từng hóa đơn từ Thuế điện tử để lưu trữ và đối chiếu."
      />

      <TrialSignup />
    </>
  );
}
