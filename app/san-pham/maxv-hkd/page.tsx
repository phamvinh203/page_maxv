import type { Metadata } from "next";

import { Container } from "@/app/_components/ui/container";
import { JsonLd } from "@/app/_components/ui/json-ld";
import { hkdBreadcrumbs, hkdFaqs, maxvHkd } from "@/app/san-pham/maxv-hkd/data";
import { breadcrumbJsonLd, faqJsonLd, softwareJsonLd } from "@/app/_lib/seo";
import { Hero } from "./_components/hero";
import { SectionNav } from "./_components/section-nav";
import { Overview } from "./_components/overview";
import { OnlineWork } from "./_components/online-work";
import { Invoices } from "./_components/invoices";
import { Books } from "./_components/books";
import { Entries } from "./_components/entries";
import { DailyTools } from "./_components/daily-tools";
import { Reports } from "./_components/reports";
import { BusinessTypes } from "./_components/business-types";
import { Onboarding } from "./_components/onboarding";
import { Pricing } from "./_components/pricing";
import { Reviews } from "./_components/reviews";
import { Faq } from "./_components/faq";
import { Consultation } from "./_components/consultation";

export const metadata: Metadata = {
  title: "MaxV HKD – Phần mềm kế toán hộ kinh doanh",
  description: maxvHkd.description,
  alternates: { canonical: maxvHkd.path },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <div className="text-[#103578] [&_section[id]]:scroll-mt-28">
      <JsonLd data={breadcrumbJsonLd(hkdBreadcrumbs, maxvHkd.path)} />
      <JsonLd data={faqJsonLd(hkdFaqs)} />
      <JsonLd data={softwareJsonLd(maxvHkd)} />
      <Hero />
      <Container>
        <SectionNav />
        <Overview />
        <OnlineWork />
      </Container>
      <Invoices />
      <Books />
      <Entries />
      <DailyTools />
      <Reports />
      <BusinessTypes />
      <Onboarding />
      <Pricing />
      {/* <Reviews /> */}
      <Faq />
      <Consultation />
    </div>
  );
}
