import { Container } from "@/app/_components/ui/container";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
    </Container>
  );
}
