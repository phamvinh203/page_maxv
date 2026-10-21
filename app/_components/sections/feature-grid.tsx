import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

type Item = { id: string; title: string; description: string; Icon: LucideIcon };

// tinted: for a grid placed on a tinted section background (no top margin, translucent cards, smaller titles).
export function FeatureGrid({
  items,
  className,
  tinted = false,
}: {
  items: Item[];
  className?: string;
  tinted?: boolean;
}) {
  return (
    <ul className={cn(!tinted && "mt-8", "grid grid-cols-1 gap-4", className)}>
      {items.map(({ id, title, description, Icon }) => (
        <li key={id} className="min-w-0">
          <Card className={cn("h-full", tinted && "border-white/80 bg-white/90", "shadow-xs")}>
            <CardContent className={"flex items-start gap-3 p-5"}>
              <span className={"flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-secondary text-primary"}>
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <h3 className={cn(tinted ? "text-xs" : "text-sm", "leading-5 font-semibold text-foreground")}>{title}</h3>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
