import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Trung tâm trợ giúp",
  "/tai-nguyen/trung-tam-tro-giup",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Trung tâm trợ giúp</h1>
    </Container>
  );
}
