import Image from "next/image";
import { Cloud, FileCheck2, FileText, Link2, Search } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

const invoiceFeatures = [
  { icon: FileText, title: "Theo dõi hóa đơn mua vào, bán ra", description: "Tổng hợp hóa đơn từ cơ quan thuế để thuận tiện tra cứu và đối chiếu." },
  { icon: Search, title: "Kiểm tra thông tin trước khi ghi nhận", description: "Xem lại đầy đủ thông tin hóa đơn trước khi đưa vào sổ sách." },
  { icon: FileCheck2, title: "Dùng dữ liệu hóa đơn để lập chứng từ", description: "Sau khi kiểm tra, bạn có thể sử dụng thông tin hóa đơn để ghi nhận nghiệp vụ." },
];
const steps = [
  { icon: Link2, title: "Kết nối", description: "Kết nối với cổng hóa đơn điện tử của cơ quan thuế." },
  { icon: Cloud, title: "Lấy hóa đơn", description: "Chọn thời gian và lấy hóa đơn về phần mềm." },
  { icon: Search, title: "Kiểm tra", description: "Xem lại thông tin hóa đơn, đối chiếu khi cần thiết." },
  { icon: FileText, title: "Ghi nhận nghiệp vụ", description: "Sử dụng dữ liệu hóa đơn để lập chứng từ thu chi." },
];

export function Invoices() {
  return (
    <section id="hoa-don" aria-labelledby="invoice-heading" className="rounded-t-2xl bg-linear-to-br from-sky-50 via-[#e6f5ff] to-sky-50 py-10 sm:py-12">
      <Container>
        <p className="text-sm font-semibold text-blue-600">KẾT NỐI HÓA ĐƠN ĐIỆN TỬ</p>
        <Heading id="invoice-heading">Kết nối Tổng cục Thuế.<br />Lấy hóa đơn, giảm nhập liệu thủ công.</Heading>
        <p className="mt-3 max-w-3xl text-lg">Khai thác hóa đơn từ cổng hóa đơn điện tử của cơ quan thuế để đưa vào phần mềm, giúp bạn tiết kiệm thời gian và hạn chế nhập liệu.</p>
        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[1.8fr_1fr]">
          <Image src="/images/ho_kinh_doanh/hkd_3.webp" alt="Giao diện tra cứu hóa đơn mua vào và bán ra, có ngày hóa đơn, đơn vị, tổng tiền và trạng thái" width={1916} height={821} sizes="(min-width: 1024px) 60vw, 100vw" className="w-full rounded-xl" />
          <div className="grid gap-3">
            {invoiceFeatures.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-4 rounded-xl bg-white/90 p-5"><Icon aria-hidden="true" className="size-14 shrink-0 rounded-xl bg-sky-50 p-3 text-blue-600" /><div><h3 className="font-bold text-[#082967]">{title}</h3><p className="mt-1 text-sm text-blue-900/65">{description}</p></div></div>
            ))}
          </div>
        </div>
        <ol aria-label="Quy trình lấy và sử dụng hóa đơn" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="flex gap-4 rounded-xl bg-white/90 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">{String(index + 1).padStart(2, "0")}</span>
              <div><Icon aria-hidden="true" className="mb-2 size-10 rounded-xl bg-sky-50 p-2 text-blue-600" /><h3 className="font-bold text-[#082967]">{title}</h3><p className="mt-1 text-sm text-blue-900/65">{description}</p></div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
