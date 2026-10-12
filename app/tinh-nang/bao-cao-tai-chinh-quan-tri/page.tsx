import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Báo cáo tài chính & quản trị",
  "/tinh-nang/bao-cao-tai-chinh-quan-tri",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Báo cáo tài chính & quản trị</h1>
    </Container>
  );
}
