import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Bảo mật dữ liệu",
  "/tinh-nang/bao-mat-du-lieu",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Bảo mật dữ liệu</h1>
    </Container>
  );
}
