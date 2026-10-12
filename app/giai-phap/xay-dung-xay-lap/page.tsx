import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Xây dựng – Xây lắp",
  "/giai-phap/xay-dung-xay-lap",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Xây dựng – Xây lắp</h1>
    </Container>
  );
}
