import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/app/_components/ui/button";

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, "asChild"> & { href: string };

// A Button rendered as a link with a trailing arrow.
export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children} <ArrowRight aria-hidden="true" /></Link>
    </Button>
  );
}
