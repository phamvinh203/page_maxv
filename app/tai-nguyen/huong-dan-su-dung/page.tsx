import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Hướng dẫn sử dụng",
  "/tai-nguyen/huong-dan-su-dung",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Hướng dẫn sử dụng</h1>
    </Container>
  );
}
