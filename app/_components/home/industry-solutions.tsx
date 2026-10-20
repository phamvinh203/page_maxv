import Image from "next/image";

import { Badge } from "@/app/_components/ui/badge";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { industrySolutions } from "@/app/_data/industry-solutions";

export function IndustrySolutions() {
  return (
    <section
      id="giai-phap"
      aria-labelledby="industry-solutions-heading"
      className="bg-background py-12 sm:py-16"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Badge
              variant="secondary"
              className="px-3 py-1 text-[10px] font-semibold tracking-wide"
            >
              GIẢI PHÁP THEO NGÀNH NGHỀ
            </Badge>
            <SectionHeading
              id="industry-solutions-heading"
              className="mt-3 max-w-3xl lg:text-3xl"
            >
              Giải pháp kế toán phù hợp với từng doanh nghiệp
            </SectionHeading>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              MaxV mang đến các giải pháp kế toán chuyên biệt, đáp ứng đúng nhu
              cầu và đặc thù của từng ngành nghề, giúp doanh nghiệp vận hành
              hiệu quả hơn.
            </p>
          </div>
          <ButtonLink
            href="/giai-phap"
            variant="link"
            className="h-auto shrink-0 px-0 py-0 text-sm lg:mb-2"
          >
            Xem tất cả giải pháp
          </ButtonLink>
        </div>

        <ul className="mt-7 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {industrySolutions.map(({ id, title, description, image, href, Icon }) => (
            <li key={id} className="min-w-0">
              <Card className="h-full overflow-hidden shadow-xs transition-shadow hover:shadow-md">
                <div className="relative aspect-[2/1] bg-secondary">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1280px) 230px, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
                      unoptimized={image.startsWith("https://")}
                      className="object-cover"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="flex h-full flex-col items-center justify-center gap-2 bg-linear-to-br from-secondary to-accent"
                    >
                      <Icon className="size-10 text-primary/35" strokeWidth={1.5} />
                      <span className="text-[10px] text-secondary-foreground/70">
                        Ảnh ngành nghề
                      </span>
                    </div>
                  )}
                </div>
                <span className="relative ml-5 -mt-5 flex size-10 items-center justify-center rounded-xl border-4 border-white bg-secondary text-primary shadow-xs">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <CardContent className="flex flex-1 flex-col px-5 pt-4 pb-5">
                  <h3 className="text-sm leading-6 font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 mb-5 text-xs leading-6 text-muted-foreground">
                    {description}
                  </p>
                  <ButtonLink
                    href={href}
                    variant="link"
                    aria-label={`Tìm hiểu thêm về ${title}`}
                    iconClassName="size-3.5"
                    className="mt-auto h-auto self-start px-0 py-0 text-xs"
                  >
                    Tìm hiểu thêm
                  </ButtonLink>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
