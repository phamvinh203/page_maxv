import { Container } from "@/app/_components/ui/container";

export default function Loading() {
  return (
    <Container className="py-8 sm:py-10">
      <p role="status" className="text-sm text-muted-foreground">Đang tải bài viết...</p>
    </Container>
  );
}
