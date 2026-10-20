import { Award, Building2, ThumbsUp } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";
import { customers, type Customer } from "@/app/_data/customers";
import { cn } from "@/app/_lib/utils";

const statistics = [
  { value: "5.000+", label: "Doanh nghiệp tin dùng", Icon: Building2 },
  { value: "98%", label: "Khách hàng hài lòng", Icon: ThumbsUp },
  { value: "12+", label: "Năm đồng hành", Icon: Award },
];

function CustomerLogo({ customer }: { customer: Customer }) {
  const content = customer.logo ? (
    <Image
      src={customer.logo}
      alt={customer.name}
      width={112}
      height={40}
      className="h-10 w-28 object-contain"
      // Small logos load directly, including remote URLs without an optimization allowlist.
      unoptimized
    />
  ) : (
    <span className={cn("text-xl leading-7 font-extrabold whitespace-nowrap", customer.className)}>
      {customer.name}
    </span>
  );

  return (
    <li className="flex h-12 items-center">
      {customer.href ? (
        <a
          href={customer.href}
          className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {content}
        </a>
      ) : content}
    </li>
  );
}

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
            <ul aria-label="Khách hàng tiêu biểu" className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6">
              {customers.map((customer) => (
                <CustomerLogo key={customer.name} customer={customer} />
              ))}
            </ul>
            <ButtonLink
              href="/khach-hang/khach-hang-tieu-bieu"
              variant="link"
              size="sm"
              iconClassName="size-3"
              className="mt-4 h-auto gap-1 px-0 py-0 text-xs font-medium"
            >
              Xem thêm
            </ButtonLink>
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
