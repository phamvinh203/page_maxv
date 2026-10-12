import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Hóa đơn điện tử",
  "/san-pham/hoa-don-dien-tu",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Hóa đơn điện tử</h1>
    </Container>
  );
}
