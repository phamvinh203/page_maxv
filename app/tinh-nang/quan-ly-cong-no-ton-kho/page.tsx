import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Quản lý công nợ – tồn kho",
  "/tinh-nang/quan-ly-cong-no-ton-kho",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Quản lý công nợ – tồn kho</h1>
    </Container>
  );
}
