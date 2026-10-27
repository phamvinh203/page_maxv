import { CircleCheck, Database, FileText, Users } from "lucide-react";

import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import { accountingPricing } from "../data";
import { pricing } from "@/app/_data/pricing";

const [baseFeature, supportFeature] = accountingPricing.features;

export function PlanAccounting() {
  return (
    <section
      aria-labelledby="plan-accounting-heading"
      className="pb-12 sm:pb-16"
    >
      <Container>
        <div className="mb-8 text-center">
          <SectionHeading id="plan-accounting-heading">
            {accountingPricing.title}
          </SectionHeading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {accountingPricing.description}
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-3">
          {accountingPricing.plans.map((plan) => (
            <li key={plan.name} className="min-w-0">
              <Card className="h-full shadow-xs">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-4">
                    <Users aria-hidden="true" className="size-7" />
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {plan.users} người dùng đồng thời
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-primary">
                    <span className="text-3xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="align-top text-base font-semibold">đ</span>
                    <span className="text-xl font-semibold">/năm</span>
                  </p>

                  <ul className="mt-4 flex-1 space-y-3 border-t pt-5">
                    {[
                      baseFeature,
                      `Phù hợp doanh nghiệp quy mô ${plan.scale}`,
                      supportFeature,
                    ].map((text) => (
                      <li
                        key={text}
                        className="flex items-start gap-3 text-sm leading-5"
                      >
                        <CircleCheck
                          aria-hidden="true"
                          className="size-5 shrink-0 text-primary"
                        />
                        {text}
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href={pricing.consultHref}
                    className="mt-6 h-11 rounded-lg"
                    aria-label={`Nhận tư vấn gói ${plan.name}`}
                  >
                    Nhận tư vấn
                  </ButtonLink>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-primary/5 p-4 text-sm md:flex-row md:items-center">
          <p className="flex items-center gap-3 font-semibold md:border-r md:pr-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText aria-hidden="true" className="size-5" />
            </span>
            Đã bao gồm triển khai online và hỗ trợ online.
          </p>
          <p className="flex items-center gap-3 md:pl-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Database aria-hidden="true" className="size-5" />
            </span>
            Bộ số liệu thứ 2:{" "}
            <strong className="text-base text-primary">
              {accountingPricing.extraDataset}
            </strong>
          </p>
          <ButtonLink
            href={pricing.href}
            variant="link"
            iconClassName="size-4"
            className="h-auto px-0 py-0 md:ml-auto"
          >
            Xem bảng giá chi tiết
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
