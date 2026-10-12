import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Kế toán dịch vụ",
  "/giai-phap/ke-toan-dich-vu",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Kế toán dịch vụ</h1>
    </Container>
  );
}
