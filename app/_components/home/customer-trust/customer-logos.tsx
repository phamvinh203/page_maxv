import Image from "next/image";

import type { Customer } from "@/app/_data/customers";
import { cn } from "@/app/_lib/utils";

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

export function CustomerLogos({ customers }: { customers: Customer[] }) {
  return (
    <ul aria-label="Khách hàng tiêu biểu" className="flex min-w-0 flex-1 flex-wrap items-center gap-x-6">
      {customers.map((customer) => (
        <CustomerLogo key={customer.name} customer={customer} />
      ))}
    </ul>
  );
}
