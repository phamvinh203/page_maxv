import { Hero } from "@/app/_components/home/hero/hero";
import { CustomerTrust } from "@/app/_components/home/customer-trust/customer-trust";
import { IndustrySolutions } from "@/app/_components/home/industry-solutions/industry-solutions";
import { Features } from "@/app/_components/home/features/features";

export default function Home() {
  return (
    <>
      <Hero />
      <CustomerTrust />
      <IndustrySolutions />
      <Features />
    </>
  );
}
