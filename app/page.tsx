import type { Metadata } from "next";

import { Hero } from "@/app/_components/home/hero";
import { CustomerTrust } from "@/app/_components/home/customer-trust";
import { IndustrySolutions } from "@/app/_components/home/industry-solutions";
import { Features } from "@/app/_components/sections/features";
import { Workflow } from "@/app/_components/home/workflow";
import { CustomerStories } from "@/app/_components/home/customer-stories";
import { Pricing } from "@/app/_components/home/pricing";
import { TrialSignup } from "@/app/_components/sections/trial-signup";
import { homeJsonLd } from "@/app/_lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <CustomerTrust />
      <IndustrySolutions />
      <Features />
      <Workflow />
      <CustomerStories>
        <Pricing />
      </CustomerStories>
      <TrialSignup />
    </>
  );
}
