import { Info, BookOpen, FileText } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

export function Books() {
  return (
    <section id="so-sach" aria-labelledby="books-heading" className="bg-linear-to-br from-white to-sky-100/70 py-10 sm:py-12">
      <Container>
        <Heading id="books-heading">Sổ sách theo Thông tư <span className="text-blue-600">152/2025/TT-BTC</span></Heading>
        <p className="mt-2">Lựa chọn sổ phù hợp với phương pháp tính thuế và hoạt động thực tế.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["S2b-HKD", "Doanh thu bán hàng hóa, dịch vụ"],
            ["S2c-HKD", "Chi tiết doanh thu, chi phí"],
            ["S2d-HKD", "Chi tiết vật liệu, dụng cụ, sản phẩm, hàng hóa"],
            ["S2e-HKD", "Chi tiết tiền"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-xl border border-sky-100 bg-white/90 p-5 text-center shadow-sm">
              <BookOpen aria-hidden="true" className="mx-auto mb-2 size-16 rounded-2xl bg-sky-50 p-4 text-blue-600" />
              <h3 className="text-lg font-bold text-[#082967]">{title}</h3><p className="mx-auto mt-1 max-w-56 text-sm">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-col gap-4 rounded-xl bg-blue-50 p-4 text-sm sm:flex-row sm:items-center">
          <Info aria-hidden="true" className="size-5 shrink-0 text-blue-600" />
          <p className="flex-1">Danh mục trên minh họa nhóm sổ theo phương pháp tính thuế tương ứng; không áp dụng đồng loạt cho mọi hộ kinh doanh.</p>
          <p className="flex items-center gap-3 sm:max-w-72 sm:border-l sm:border-blue-400 sm:pl-5"><FileText aria-hidden="true" className="size-6 shrink-0 text-blue-600" />Sổ theo dõi nghĩa vụ thuế khác khi thuộc đối tượng áp dụng.</p>
        </div>
      </Container>
    </section>
  );
}
