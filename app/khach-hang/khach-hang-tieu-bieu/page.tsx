import { Container } from "@/app/_components/ui/container";
import { createPlaceholderMetadata } from "@/app/_lib/seo";

export const metadata = createPlaceholderMetadata(
  "Khách hàng tiêu biểu",
  "/khach-hang/khach-hang-tieu-bieu",
);

export default function Page() {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl">Khách hàng tiêu biểu</h1>
    </Container>
  );
}
