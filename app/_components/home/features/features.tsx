import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
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
          <Button
            size="lg"
            asChild
            className="mt-6 h-11 rounded-lg shadow-sm shadow-primary/15"
          >
            <Link href="/tinh-nang">Khám phá tính năng <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>

        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
          {features.map(({ id, title, description, Icon }) => (
            <li key={id} className="min-w-0">
              <Card className="h-full border-white/80 bg-white/90 shadow-xs">
                <CardContent className="flex items-start gap-3 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs leading-5 font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
