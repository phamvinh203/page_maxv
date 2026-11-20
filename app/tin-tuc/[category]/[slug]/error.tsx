"use client";

import { Container } from "@/app/_components/ui/container";
import { Button } from "@/app/_components/ui/button";

// API lỗi hoặc không phản hồi: thông báo thân thiện, không lộ chi tiết kỹ thuật (REQ-049, EC-13).
export default function Error({ retry }: { error: unknown; retry: () => void }) {
  return (
    <Container className="py-12 sm:py-16">
      <h1 className="text-2xl font-bold text-foreground">Không tải được nội dung</h1>
      <p className="mt-3 text-sm text-muted-foreground">Hệ thống đang bận hoặc tạm gián đoạn. Vui lòng thử lại sau ít phút.</p>
      <Button type="button" variant="outline" className="mt-6" onClick={() => retry()}>Thử lại</Button>
    </Container>
  );
}
