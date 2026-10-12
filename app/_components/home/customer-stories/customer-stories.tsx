import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, Quote, UserRound } from "lucide-react";

import { Pricing } from "@/app/_components/home/pricing/pricing";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { customerStory, customerTestimonial } from "@/app/_data/customer-stories";

export function CustomerStories() {
  return (
    <section
      id="khach-hang"
      aria-labelledby="customer-stories-heading"
      className="bg-linear-to-r from-[#dceef8] to-[#edf9ff] py-8 sm:py-10"
    >
      <Container className="grid gap-5 md:grid-cols-2 xl:grid-cols-[1.1fr_1fr_1fr]">
        <article className="relative isolate min-w-0 overflow-hidden rounded-xl bg-[#073b68] p-6 text-white sm:p-7">
          {customerStory.image ? (
            <Image
              src={customerStory.image}
              alt=""
              fill
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
              unoptimized={customerStory.image.startsWith("https://")}
              className="-z-20 object-cover"
            />
          ) : (
            <Building2 aria-hidden="true" className="absolute right-0 bottom-0 -z-20 size-64 text-white/10" strokeWidth={0.75} />
          )}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-[#032544]/90 to-[#0068d9]/30" />
          <Badge variant="outline" className="border-white/30 bg-white/5 text-[10px] text-white">
            CÂU CHUYỆN KHÁCH HÀNG
          </Badge>
          <h2 id="customer-stories-heading" className="mt-3 text-xl leading-7 font-bold">
            {customerStory.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-white/90">
            {customerStory.description}
          </p>
          {customerStory.href ? (
            <Button asChild size="sm" className="mt-5 rounded-lg">
              <Link href={customerStory.href}>
                Xem chi tiết <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          ) : (
            <Button disabled size="sm" className="mt-5 rounded-lg disabled:opacity-100">
              Xem chi tiết <ArrowRight aria-hidden="true" />
            </Button>
          )}
          <dl className="mt-6 grid grid-cols-2 gap-3">
            {customerStory.results.map(({ value, label }) => (
              <div key={label} className="rounded-lg border border-white/70 bg-white/95 p-3">
                <dt className="text-2xl font-bold text-primary">{value}</dt>
                <dd className="mt-1 text-[10px] leading-4 text-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </article>

        <Card className="min-w-0 gap-0 border-white/80 py-0 shadow-xs">
          <CardContent className="flex h-full flex-col p-6 sm:p-7">
            <figure className="flex flex-1 flex-col">
              <Quote aria-hidden="true" className="mb-4 size-8 text-primary/20" />
              <blockquote className="text-sm leading-7 text-foreground">
                “{customerTestimonial.quote}”
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-6">
                <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-secondary text-primary">
                  {customerTestimonial.avatar ? (
                    <Image
                      src={customerTestimonial.avatar}
                      alt=""
                      fill
                      sizes="40px"
                      unoptimized={customerTestimonial.avatar.startsWith("https://")}
                      className="object-cover"
                    />
                  ) : (
                    <UserRound aria-hidden="true" className="size-5" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-xs leading-5 font-semibold">{customerTestimonial.name}</p>
                  <p className="mt-1 text-[10px] leading-5 text-muted-foreground">{customerTestimonial.role}</p>
                </div>
              </figcaption>
            </figure>
          </CardContent>
        </Card>

        <div className="grid min-w-0 md:col-span-2 xl:col-span-1">
          <Pricing />
        </div>
      </Container>
    </section>
  );
}
