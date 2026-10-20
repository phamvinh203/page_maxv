import { Card, CardContent } from "@/app/_components/ui/card";
import { cn } from "@/app/_lib/utils";

// compact: the denser size used by the home workflow row.
export function StepCard({ index, title, description, compact = false }: {
  index: number;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <Card className="h-full border-border/70 shadow-xs">
      <CardContent className={cn("flex items-start gap-3", compact ? "p-4" : "p-5")}>
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground shadow-sm shadow-primary/20"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h3 className={cn("leading-6 font-semibold text-secondary-foreground", compact ? "text-xs" : "text-sm")}>{title}</h3>
          <p className={cn("mt-1 leading-6 text-muted-foreground", compact ? "text-[11px]" : "text-xs")}>{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
