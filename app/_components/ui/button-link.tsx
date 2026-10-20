import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, "asChild"> & {
  href: string;
  iconClassName?: string;
};

// A Button rendered as a link with a trailing arrow. aria-label goes on the link; iconClassName sizes the arrow.
export function ButtonLink({ href, children, iconClassName, "aria-label": ariaLabel, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href} aria-label={ariaLabel}>{children} <ArrowRight aria-hidden="true" className={cn(iconClassName)} /></Link>
    </Button>
  );
}
