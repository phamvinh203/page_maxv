import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Gửi yêu cầu hỗ trợ",
  "/tai-nguyen/gui-yeu-cau-ho-tro",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Gửi yêu cầu hỗ trợ</h1>
    </Container>
  );
}
