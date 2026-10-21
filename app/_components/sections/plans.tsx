import { Check, Minus } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { modules, plans } from "@/app/_data/pricing";
import { cn } from "@/app/_lib/utils";

export function Plans() {
  return (
    <section aria-labelledby="plans-heading" className="pb-12 sm:pb-16">
      <Container>
        <h2 id="plans-heading" className="sr-only">Các gói phần mềm MaxV</h2>
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <li key={plan.id} className="min-w-0">
              <Card className="h-full shadow-xs">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  <p className="mt-1 min-h-12 text-xs leading-6 text-muted-foreground">{plan.audience}</p>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-1 text-primary">
                    <span className="min-h-4 w-full text-xs text-muted-foreground">{plan.from && "Chỉ từ"}</span>
                    <span className="text-3xl font-bold tracking-tight">{plan.price ?? "Liên hệ"}</span>
                    {plan.period && <span className="text-sm font-semibold">{plan.period}</span>}
                  </p>

                  <ButtonLink
                    href={plan.cta.href}
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-5 h-10 rounded-lg"
                  >
                    {plan.cta.label}
                  </ButtonLink>

                  <ul className="mt-6 space-y-3 border-t pt-6">
                    {modules.map((m) => {
                      const included = plan.modules.includes(m.key);
                      return (
                        <li key={m.key} className={cn("flex items-start gap-2 text-xs leading-5", !included && "text-muted-foreground/60")}>
                          {included
                            ? <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" strokeWidth={2.5} />
                            : <Minus aria-hidden="true" className="mt-0.5 size-4 shrink-0" />}
                          <span>
                            {m.label}
                            {m.soon && <Badge variant="outline" className="ml-1.5 px-1.5 py-0 text-[10px] text-primary">Sắp ra mắt</Badge>}
                            <span className="sr-only">{included ? " (có)" : " (không có)"}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
