import type { ComponentProps } from "react";

import { SectionHeading } from "@/app/_components/ui/section-heading";
import { cn } from "@/app/_lib/utils";

export function Heading({ className, ...props }: ComponentProps<"h2">) {
  return <SectionHeading className={cn("mt-2 text-3xl text-[#082967] sm:text-4xl", className)} {...props} />;
}
