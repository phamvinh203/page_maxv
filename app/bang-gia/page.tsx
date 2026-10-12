import { Features } from "@/app/_components/home/features/features";
import { TrialSignup } from "@/app/_components/home/trial-signup/trial-signup";
import { Plans } from "@/app/_components/pricing/plans/plans";
import { Badge } from "@/app/_components/ui/badge";
import { Container } from "@/app/_components/ui/container";
import { pricing } from "@/app/_data/pricing";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

// shortcut: stays noindex until plan prices in _data/pricing.ts are confirmed; then use real metadata, add /bang-gia to the sitemap and offers to the JSON-LD.
export const metadata = createPlaceholderMetadata(
  "Bảng giá phần mềm kế toán",
  "/bang-gia",
  "Các gói phần mềm kế toán MaxV linh hoạt theo quy mô doanh nghiệp: Dùng thử, Cơ bản, Chuyên nghiệp, Toàn diện. Dùng thử miễn phí, không cần thanh toán.",
);

export default function Page() {
  return (
    <>
      <section aria-labelledby="pricing-heading" className="py-12 text-center sm:py-16">
        <Container>
          <Badge
            variant="outline"
            className="border-primary/25 bg-white/50 px-3 py-1 text-[10px] font-semibold tracking-wide text-primary"
          >
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
