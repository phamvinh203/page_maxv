import { ArrowRight, Award, Building2, ThumbsUp } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { customers } from "@/app/_data/customers";
import { CustomerLogos } from "./customer-logos";

const statistics = [
  { value: "5.000+", label: "Doanh nghiệp tin dùng", Icon: Building2 },
  { value: "98%", label: "Khách hàng hài lòng", Icon: ThumbsUp },
  { value: "12+", label: "Năm đồng hành", Icon: Award },
];

export function CustomerTrust() {
  return (
    <section
      aria-labelledby="customer-trust-heading"
      className="border-b border-border/60 bg-linear-to-b from-white to-muted/70"
    >
      <Container className="grid gap-7 py-8 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-8 lg:py-9">
        <div className="min-w-0">
          <h2
            id="customer-trust-heading"
            className="text-base leading-6 font-semibold text-foreground"
          >
            Được tin dùng bởi 5.000+ doanh nghiệp
          </h2>
          <div className="mt-4 flex items-start gap-4">
            <CustomerLogos customers={customers} />
            {/* shortcut: customer page URL is pending; connect it when supplied. */}
            <Button
              variant="link"
              size="sm"
              disabled
              className="mt-4 h-auto gap-1 px-0 py-0 text-xs font-medium disabled:opacity-100"
            >
              Xem thêm
              <ArrowRight aria-hidden="true" className="size-3" />
            </Button>
          </div>
        </div>

        <dl className="grid grid-cols-3 divide-x divide-border border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
          {statistics.map(({ value, label, Icon }) => (
            <div
              key={label}
              className="flex flex-col gap-2 px-2 text-center first:pl-0 last:pr-0 sm:px-4 sm:text-left"
            >
              <dt className="order-2 text-[11px] leading-5 text-muted-foreground sm:pl-10">
                {label}
              </dt>
              <dd className="order-1 flex flex-col items-center gap-2 text-xl leading-7 font-bold text-foreground sm:flex-row">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
