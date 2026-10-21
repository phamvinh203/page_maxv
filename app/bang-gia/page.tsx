import { Features } from "@/app/_components/sections/features";
import { TrialSignup } from "@/app/_components/sections/trial-signup";
import { Plans } from "@/app/_components/sections/plans";
import { Badge } from "@/app/_components/ui/badge";
import { Container } from "@/app/_components/ui/container";
import { plans, pricing } from "@/app/_data/pricing";

// shortcut: inherits noindex from the root layout until plan prices in _data/pricing.ts are confirmed; then set robots index: true, add /bang-gia to the sitemap and offers to the JSON-LD.
export const metadata = {
  title: "Bảng giá phần mềm kế toán",
  alternates: { canonical: "/bang-gia" },
  description: `Các gói phần mềm kế toán MaxV linh hoạt theo quy mô doanh nghiệp: ${plans.map((p) => p.name).join(", ")}. Dùng thử miễn phí, không cần thanh toán.`,
};

export default function Page() {
  return (
    <>
      <section aria-labelledby="pricing-heading" className="py-12 text-center sm:py-16">
        <Container>
          <Badge variant="eyebrow">
            BẢNG GIÁ
          </Badge>
          <h1 id="pricing-heading" className="mx-auto mt-3 max-w-2xl text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {pricing.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            {pricing.description}
          </p>
        </Container>
      </section>
      <Plans />
      <Features />
      <TrialSignup />
    </>
  );
}
