import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

type Item = { id: string; title: string; description: string; Icon: LucideIcon };

export function FeatureGrid({
  items,
  className,
  stacked = false,
}: {
  items: Item[];
  className?: string;
  stacked?: boolean;
}) {
  return (
    <ul className={cn("mt-8 grid grid-cols-1 gap-4", className)}>
      {items.map(({ id, title, description, Icon }) => (
        <li key={id} className="min-w-0">
          <Card className="h-full shadow-xs">
            <CardContent className={cn("flex items-start gap-3 p-5", stacked && "flex-col items-center gap-4 p-6 text-center")}>
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-secondary text-primary", stacked && "size-14 rounded-2xl")}>
                <Icon aria-hidden="true" className={cn("size-5", stacked && "size-7")} strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm leading-5 font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
