import type { Metadata } from "next";

import { Hero } from "@/app/_components/home/hero/hero";
import { CustomerTrust } from "@/app/_components/home/customer-trust/customer-trust";
import { IndustrySolutions } from "@/app/_components/home/industry-solutions/industry-solutions";
import { Features } from "@/app/_components/home/features/features";
import { Workflow } from "@/app/_components/home/workflow/workflow";
import { CustomerStories } from "@/app/_components/home/customer-stories/customer-stories";
import { TrialSignup } from "@/app/_components/home/trial-signup/trial-signup";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function Home() {
  return (
    <>
      <Hero />
      <CustomerTrust />
      <IndustrySolutions />
      <Features />
      <Workflow />
      <CustomerStories />
      <TrialSignup />
    </>
  );
}
