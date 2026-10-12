import { ArrowRight, ChartNoAxesCombined, Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { pricing } from "@/app/_data/pricing";

export function Pricing() {
  return (
    <Card id="bang-gia" className="min-w-0 gap-0 border-white/80 py-0 shadow-xs">
      <CardContent className="flex h-full flex-col p-6 sm:p-7">
        <h2 className="text-base leading-6 font-semibold">{pricing.title}</h2>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          {pricing.description}
        </p>
        <div className="relative mt-auto pt-8 pb-6">
          <div aria-hidden="true" className="absolute right-0 bottom-0 text-primary/10">
            <ChartNoAxesCombined className="size-24" strokeWidth={1.5} />
            <span className="absolute top-0 right-0 flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-sm">
              <Check className="size-4" strokeWidth={2.5} />
            </span>
          </div>
          <div className="relative">
            <p className="text-xs text-muted-foreground">Chỉ từ</p>
            <p className="mt-2 flex flex-wrap items-baseline gap-x-1 text-primary">
              <span className="text-4xl font-bold tracking-tight">
                {pricing.price}<span className="text-xl">{pricing.currency}</span>
              </span>
              <span className="text-sm font-semibold">{pricing.period}</span>
            </p>
          </div>
        </div>
        {pricing.href ? (
          <Button asChild variant="link" className="h-auto self-start px-0 py-0 text-xs">
            <Link href={pricing.href}>
              Xem bảng giá chi tiết <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
          </Button>
        ) : (
          <Button disabled variant="link" className="h-auto self-start px-0 py-0 text-xs disabled:opacity-100">
            Xem bảng giá chi tiết <ArrowRight aria-hidden="true" className="size-3.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
