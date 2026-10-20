import { FeatureGrid } from "@/app/_components/sections/feature-grid";
import { Badge } from "@/app/_components/ui/badge";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { features } from "@/app/_data/features";

export function Features() {
  return (
    <section
      id="tinh-nang"
      aria-labelledby="features-heading"
      className="bg-linear-to-br from-[#f0faff] to-[#e5f5ff] py-12 sm:py-14"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.7fr] lg:gap-12">
        <div>
          <Badge variant="eyebrow">
            VÌ SAO CHỌN MAXV?
          </Badge>
          <SectionHeading
            id="features-heading"
            className="mt-3 max-w-lg lg:text-3xl"
          >
            Hệ sinh thái kế toán toàn diện trên một nền tảng
          </SectionHeading>
          <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">
            Không chỉ là phần mềm kế toán, MaxV còn là trợ thủ đắc lực giúp
            doanh nghiệp tối ưu quy trình, tiết kiệm chi phí và nâng cao hiệu
            quả quản trị.
          </p>
          <ButtonLink
            href="/tinh-nang"
            size="lg"
            className="mt-6 h-11 rounded-lg shadow-sm shadow-primary/15"
          >
            Khám phá tính năng
          </ButtonLink>
        </div>

        <FeatureGrid items={features} tinted className="min-[480px]:grid-cols-2 xl:grid-cols-3" />
      </Container>
    </section>
  );
}
