import { ChartNoAxesColumnIncreasing, ChevronDown, ChevronLeft, ChevronRight, Info, BookOpen, FileCheck2, Search } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

export function Reports() {
  return (
    <section aria-labelledby="report-heading" className="py-10 sm:py-12">
      <Container>
        <Heading id="report-heading">Xem số liệu rõ ràng, <span className="text-blue-600">chủ động đối chiếu</span></Heading>
        <p className="mt-2">Cập nhật số liệu theo thời gian thực, dễ dàng tra cứu và đối chiếu với chứng từ.</p>
        <div className="mt-5 grid items-center gap-8 lg:grid-cols-[1.8fr_1fr]">
          <figure className="min-w-0 rounded-xl border-4 border-sky-100 bg-white p-4 shadow-lg shadow-sky-100/70">
            <figcaption className="flex flex-wrap items-center justify-between gap-3 font-bold text-[#082967]">Sổ doanh thu bán hàng hóa, dịch vụ (S2b-HKD)<span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-normal text-blue-600">Minh họa giao diện</span></figcaption>
            <div className="my-4 flex flex-wrap justify-between gap-3 text-xs"><span className="inline-flex items-center gap-4 rounded-md border border-blue-100 px-3 py-2">Kỳ: Tháng 04/2025 <ChevronDown aria-hidden="true" className="size-3" /></span><span className="inline-flex items-center gap-2 rounded-md border border-blue-100 px-3 py-2 text-blue-900/50"><Search aria-hidden="true" className="size-3" />Tìm kiếm...</span></div>
            <div className="overflow-x-auto rounded-md border border-blue-100">
              <table className="w-full min-w-[520px] text-left text-xs">
                <thead className="bg-sky-50"><tr>{["Ngày", "Số chứng từ", "Diễn giải", "Doanh thu (VND)"].map(label => <th key={label} scope="col" className="px-3 py-3 font-medium last:text-right">{label}</th>)}</tr></thead>
                <tbody>{[
                  ["01/04/2025", "BH0001", "Bán hàng tại cửa hàng", "3.200.000"],
                  ["03/04/2025", "BH0002", "Bán hàng online", "1.850.000"],
                  ["05/04/2025", "BH0003", "Dịch vụ sửa chữa", "2.500.000"],
                  ["10/04/2025", "BH0004", "Bán hàng tại cửa hàng", "4.100.000"],
                ].map(row => <tr key={row[1]} className="border-t border-blue-100">{row.map((cell, index) => <td key={index} className="px-3 py-3 last:text-right last:font-semibold">{cell}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs"><span aria-hidden="true" className="flex items-center gap-2"><ChevronLeft className="size-4 text-blue-300" /><span className="rounded bg-blue-600 px-3 py-1.5 text-white">1</span><span className="rounded border border-blue-100 px-3 py-1.5">2</span><span className="rounded border border-blue-100 px-3 py-1.5">3</span><ChevronRight className="size-4 text-blue-300" /></span><span>Tổng: 4 dòng</span></div>
          </figure>
          <div className="grid gap-7">
            {[
              { icon: ChartNoAxesColumnIncreasing, title: "Theo dõi phát sinh theo kỳ", description: "Xem doanh thu, chi phí, thu chi theo ngày, tháng, quý." },
              { icon: FileCheck2, title: "Đối chiếu doanh thu và chứng từ", description: "Dễ dàng đối chiếu số liệu với hóa đơn, chứng từ mua, bán." },
              { icon: BookOpen, title: "Tổng hợp sổ sách theo nhu cầu", description: "Tra cứu các sổ theo Thông tư 152 và các báo cáo quản trị để nắm tình hình kinh doanh." },
            ].map(({ icon: Icon, title, description }) => <div key={title} className="flex gap-5"><Icon aria-hidden="true" className="size-16 shrink-0 rounded-full bg-sky-50 p-4 text-blue-600" /><div><h3 className="font-bold text-blue-600">{title}</h3><p className="mt-1 text-sm text-blue-900/75">{description}</p></div></div>)}
          </div>
        </div>
        <p className="mt-5 flex items-start gap-4 rounded-xl bg-blue-50 p-4 text-sm"><Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-blue-600" /><span>Số liệu hiển thị bao gồm sổ sách theo Thông tư 152 và các báo cáo quản trị phục vụ hoạt động kinh doanh.<br />Phần mềm không áp đặt một mẫu báo cáo duy nhất cho mọi hộ kinh doanh.</span></p>
      </Container>
    </section>
  );
}
