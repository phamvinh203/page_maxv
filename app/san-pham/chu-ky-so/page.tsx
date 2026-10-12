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
        secondary={{ label: "Liên hệ MaxV", href: "/ve-maxv/lien-he" }}
      />

      <section aria-labelledby="signature-topics-heading" className="py-12 sm:py-14">
        <Container>
          <SectionHeading id="signature-topics-heading" className="max-w-2xl lg:text-3xl">
            Chữ ký số dùng vào việc gì
          </SectionHeading>
          <FeatureGrid items={chuKySoTopics} className="md:grid-cols-3" />
        </Container>
      </section>

      <section aria-labelledby="signature-hddt-heading" className="bg-linear-to-b from-white to-[#f6fbff] pb-12 sm:pb-14">
        <Container>
          <Card className="shadow-xs">
            <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 id="signature-hddt-heading" className="text-base leading-6 font-semibold text-foreground">
                  MaxV HĐĐT lưu và tải XML hóa đơn gốc đã ký số
                </h2>
                <p className="mt-1 text-xs leading-6 text-muted-foreground">
                  Tải file XML đã ký số của từng hóa đơn từ Thuế điện tử để lưu trữ và đối chiếu.
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
