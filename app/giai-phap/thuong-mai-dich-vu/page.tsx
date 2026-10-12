import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Thương mại – Dịch vụ",
  "/giai-phap/thuong-mai-dich-vu",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Thương mại – Dịch vụ</h1>
    </Container>
  );
}
