import Link from "next/link";
import { ArrowRight, BookOpen, Calculator, FileText } from "lucide-react";
import { Heading } from "./heading";

const features = [
  { icon: FileText, title: "Hóa đơn tập trung", description: "Tập hợp hóa đơn mua vào, bán ra về một nơi, dễ tìm kiếm và tra cứu khi cần.", href: "#hoa-don", color: "bg-sky-50", iconColor: "text-blue-500 bg-blue-100" },
  { icon: Calculator, title: "Thu chi rõ ràng", description: "Ghi nhận thu tiền, chi tiền hằng ngày, phân loại theo mục đích giúp bạn nắm được tình hình kinh doanh.", href: "#lam-viec-online", color: "bg-orange-50", iconColor: "text-orange-500 bg-orange-100" },
  { icon: BookOpen, title: "Sổ sách dễ tra cứu", description: "Ghi chép, quản lý sổ sách theo Thông tư 152/2025/TT-BTC, dễ dàng xem lại khi cần.", href: "#so-sach", color: "bg-emerald-50", iconColor: "text-emerald-600 bg-emerald-100" },
];

export function Overview() {
  return (
    <section id="tong-quan" aria-labelledby="overview-heading" className="pt-10 pb-8 sm:pt-12">
      <p className="text-sm font-semibold text-blue-600">GIẢI QUYẾT NHỮNG BĂN KHOĂN THƯỜNG GẶP</p>
      <Heading id="overview-heading">Bớt nhập liệu, dễ theo dõi việc kinh doanh</Heading>
      <p className="mt-3 max-w-3xl text-lg">MaxV HKD giúp bạn quản lý hóa đơn, thu chi và sổ sách một cách đơn giản, rõ ràng, phù hợp với nhu cầu thực tế của hộ kinh doanh.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description, href, color, iconColor }) => (
          <Link key={title} href={href} className={`group relative flex gap-5 rounded-2xl p-6 pb-14 transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-blue-600 ${color}`}>
            <div className={`flex size-20 shrink-0 items-center justify-center rounded-2xl ${iconColor}`}><Icon aria-hidden="true" className="size-12" strokeWidth={1.5} /></div>
            <div><h3 className="text-xl font-bold text-[#082967]">{title}</h3><p className="mt-2 text-sm text-blue-900/75">{description}</p></div>
            <span className="absolute right-5 bottom-4 rounded-full border border-blue-100 bg-white p-3 text-blue-600 transition-transform group-hover:translate-x-1"><ArrowRight aria-hidden="true" className="size-4" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
