import { CheckCircle2, BookOpen, FileText, Tag } from "lucide-react";
import { Heading } from "./heading";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";

export function Entries() {
  return (
    <section aria-labelledby="entry-heading" className="py-10 sm:py-12">
      <Container className="grid items-center gap-8 lg:grid-cols-[1fr_1.5fr_.7fr]">
        <div>
          <Heading id="entry-heading">Từ hóa đơn đến <span className="text-blue-600">ghi nhận nghiệp vụ</span></Heading>
          <p className="mt-4">Kết nối hóa đơn điện tử từ cơ quan thuế, hoặc nhập chứng từ mua, bán phát sinh. Ghi nhận doanh thu, chi phí đơn giản, đúng với hoạt động thực tế của hộ kinh doanh.</p>
          <ButtonLink href="/lien-he" size="lg" className="mt-5">Đăng ký xem demo</ButtonLink>
        </div>
        <figure className="overflow-hidden rounded-2xl border-[6px] border-blue-200 bg-white shadow-lg shadow-blue-100">
          <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-100 px-5 py-4"><span className="font-bold text-[#082967]">Nhập chứng từ chi phí</span><span className="rounded-full bg-sky-50 px-3 py-1 text-xs text-blue-600">Minh họa giao diện</span></figcaption>
          <dl className="space-y-4 p-5 text-sm">
            {[["Ngày", "15/04/2025"], ["Đối tượng", "Công ty TNHH Minh Phát"], ["Nội dung", "Mua hàng hóa phục vụ kinh doanh"], ["Số tiền", "2.500.000 VND"]].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[70px_1fr] items-center gap-3"><dt>{label}</dt><dd className="rounded-md border border-blue-100 bg-sky-50/40 px-3 py-2">{value}</dd></div>
            ))}
          </dl>
          <div aria-hidden="true" className="flex justify-end gap-3 px-5 pb-5 text-sm"><span className="rounded-md border border-blue-400 px-4 py-2 text-blue-600">Kiểm tra</span><span className="rounded-md bg-blue-600 px-4 py-2 text-white">Lưu chứng từ</span></div>
        </figure>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
          {[
            { icon: FileText, title: "Chọn hóa đơn hoặc nhập chứng từ" },
            { icon: CheckCircle2, title: "Kiểm tra thông tin phát sinh" },
            { icon: Tag, title: "Phân loại doanh thu, chi phí" },
            { icon: BookOpen, title: "Ghi nhận và kiểm tra sổ" },
          ].map(({ icon: Icon, title }) => (
            <li key={title} className="flex items-center gap-4"><Icon aria-hidden="true" className="size-14 shrink-0 rounded-full bg-sky-50 p-3.5 text-blue-600" /><span className="text-sm font-semibold">{title}</span></li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
