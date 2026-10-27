import { Quote, Info, UserRound } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

export function Reviews() {
  return (
    <section id="danh-gia" aria-labelledby="reviews-heading" className="mt-2 rounded-2xl bg-linear-to-br from-sky-50 to-sky-100/70 py-10">
      <Container>
        <p className="inline-block rounded-full border border-blue-400 px-4 py-1 text-xs font-semibold text-blue-600">TRẢI NGHIỆM NGƯỜI DÙNG</p>
        <div className="mt-3 flex flex-wrap items-center gap-5"><Heading id="reviews-heading">Trải nghiệm từ người dùng</Heading><span className="rounded-full border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">Nội dung mẫu – chờ xác thực</span></div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            ["Tôi muốn ghi chép thu chi đơn giản và xem lại dễ dàng.", "Chủ cửa hàng"],
            ["Có hóa đơn tập trung sẽ giúp tôi kiểm tra công việc thuận tiện hơn.", "Hộ thương mại"],
            ["Tôi cần được hướng dẫn chọn sổ phù hợp khi bắt đầu.", "Hộ dịch vụ"],
          ].map(([quote, role]) => <figure key={role} className="flex flex-col rounded-xl bg-white p-6"><Quote aria-hidden="true" className="size-10 fill-blue-100 text-blue-100" /><blockquote className="my-3 flex-1 text-lg italic">{quote}</blockquote><figcaption className="mt-3 flex items-center gap-3 text-sm"><UserRound aria-hidden="true" className="size-12 shrink-0 rounded-full bg-blue-50 p-2.5" /><span><strong>Mẫu phản hồi</strong> · {role}</span></figcaption></figure>)}
        </div>
        <p className="mt-4 flex items-center gap-4 rounded-xl bg-blue-100/70 p-4 text-sm"><Info aria-hidden="true" className="size-5 shrink-0 text-blue-600" />Thay bằng phản hồi khách hàng đã được xác nhận trước khi công bố.</p>
      </Container>
    </section>
  );
}
