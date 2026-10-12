import type { ComponentProps } from "react";

import { cn } from "@/app/_lib/utils";

export function SectionHeading({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
