import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Tự động hạch toán",
  "/tinh-nang/tu-dong-hach-toan",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Tự động hạch toán</h1>
    </Container>
  );
}
