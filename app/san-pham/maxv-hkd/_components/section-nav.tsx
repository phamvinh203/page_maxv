import Link from "next/link";
import { BookOpen, CircleHelp, FileText, House, Star, Tag } from "lucide-react";

export function SectionNav() {
  return (
    <nav aria-label="Nội dung MaxV HKD" className="my-3 flex overflow-x-auto rounded-2xl bg-sky-50 px-3 text-sm text-blue-600">
      {[
        { icon: House, label: "Tổng quan", href: "#tong-quan" },
        { icon: FileText, label: "Hóa đơn", href: "#hoa-don" },
        { icon: BookOpen, label: "Sổ sách TT152", href: "#so-sach" },
        { icon: Tag, label: "Báo giá", href: "#bao-gia" },
        { icon: Star, label: "Đánh giá", href: "#danh-gia" },
        { icon: CircleHelp, label: "Câu hỏi", href: "#cau-hoi" },
      ].map(({ icon: Icon, label, href }) => (
        <Link key={label} href={href} className="flex min-w-max flex-1 items-center justify-center gap-3 border-b-2 border-transparent px-5 py-5 font-medium transition-colors hover:border-blue-600 hover:bg-blue-100/50 focus-visible:outline-2 focus-visible:outline-blue-600"><Icon aria-hidden="true" className="size-6" />{label}</Link>
      ))}
    </nav>
  );
}
