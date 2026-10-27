import { Banknote, ChartNoAxesColumnIncreasing, Package, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

export function DailyTools() {
  return (
    <section aria-labelledby="daily-heading" className="rounded-t-2xl bg-sky-50 py-10">
      <Container>
        <Heading id="daily-heading">Đủ công cụ <span className="text-blue-600">cho công việc mỗi ngày</span></Heading>
        <p className="mt-2">Từ bán hàng, mua hàng đến theo dõi công nợ, quản lý hàng hóa và tra cứu sổ sách.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: ShoppingCart, title: "Bán hàng – Doanh thu", description: "Ghi nhận doanh thu từ cửa hàng, dịch vụ, đơn hàng." },
            { icon: ShoppingBag, title: "Mua hàng – Chi phí", description: "Theo dõi chi phí mua hàng, chi phí hoạt động." },
            { icon: Banknote, title: "Thu tiền – Chi tiền", description: "Quản lý thu, chi theo ngày, dễ dàng đối chiếu." },
            { icon: Package, title: "Quản lý hàng hóa", description: "Quản lý tồn kho, vật liệu, dụng cụ, hàng hóa." },
            { icon: Users, title: "Theo dõi công nợ", description: "Quản lý công nợ khách hàng, nhà cung cấp." },
            { icon: ChartNoAxesColumnIncreasing, title: "Tra cứu sổ và báo cáo", description: "Xem sổ sách theo Thông tư 152 và các báo cáo quản trị phục vụ kinh doanh." },
          ].map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-5 rounded-xl border border-sky-100 bg-white p-5 shadow-sm"><Icon aria-hidden="true" className="size-16 shrink-0 rounded-full bg-sky-50 p-4 text-blue-600" /><div><h3 className="font-bold text-blue-600">{title}</h3><p className="mt-1 text-sm text-blue-900/75">{description}</p></div></div>
          ))}
        </div>
      </Container>
    </section>
  );
}
