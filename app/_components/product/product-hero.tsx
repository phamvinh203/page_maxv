import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Container } from "@/app/_components/ui/container";
import { heroImage } from "@/app/_lib/assets";
import { cn } from "@/app/_lib/utils";

type Cta = { label: string; href: string };

export function ProductHero({
  title,
  highlight,
  description,
  benefits,
  imageAlt,
  primary,
  secondary,
}: {
  title: string;
  highlight: string;
  description: string;
  benefits: string[];
  imageAlt?: string;
  primary: Cta;
  secondary: Cta;
}) {
  return (
    <section
      aria-labelledby="product-heading"
      className="overflow-hidden bg-linear-to-br from-[#f1fbff] to-[#e3f3ff]"
    >
      <Container
        className={cn(
          "grid items-center gap-6 pt-10 pb-6 sm:pt-14",
          imageAlt ? "lg:grid-cols-[1fr_1.15fr] lg:gap-0 lg:py-8" : "sm:pb-12 lg:py-14",
        )}
      >
        <div className="relative z-10 lg:py-8">
          <Badge variant="eyebrow">SẢN PHẨM</Badge>
          <h1
            id="product-heading"
            className="mt-4 text-[2rem] leading-[1.18] font-bold tracking-tight text-foreground sm:text-[2.625rem] xl:text-5xl"
          >
            {title}
            <span className="mt-1 block text-primary">{highlight}</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
            {description}
          </p>
          <div className="mt-6 flex flex-col gap-3 min-[360px]:flex-row sm:mt-7">
            <Button size="lg" asChild className="h-12 rounded-lg px-5 shadow-md shadow-primary/15 sm:px-6">
              <Link href={primary.href}>{primary.label} <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-12 rounded-lg border-primary/40 bg-white/40 px-6 text-primary">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-medium text-foreground/80 sm:mt-9">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>

        {imageAlt && (
          <div className="relative -mx-4 sm:-mx-6 lg:mx-0 lg:-mr-8">
            <Image
              src={heroImage}
              alt={imageAlt}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="h-auto w-full [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,black_12%)]"
            />
          </div>
        )}
      </Container>
    </section>
  );
}
