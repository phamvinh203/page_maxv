import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";

export function ProductCtaCard({ id, title, description }: { id: string; title: string; description: string }) {
  return (
    <section aria-labelledby={id} className="bg-section-fade pb-12 sm:pb-14">
      <Container>
        <Card className="shadow-xs">
          <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 id={id} className="text-base leading-6 font-semibold text-foreground">{title}</h2>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
            </div>
            <ButtonLink href="/san-pham/maxv-hddt" className="h-10 shrink-0 rounded-lg">Tìm hiểu MaxV HĐĐT</ButtonLink>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
