import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Công ty xây dựng ABC",
  "/khach-hang/cong-ty-xay-dung-abc",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Công ty xây dựng ABC</h1>
    </Container>
  );
}
