import { Store, Truck, Utensils, Wrench } from "lucide-react";
import { Heading } from "./heading";
import { Container } from "@/app/_components/ui/container";

export function BusinessTypes() {
  return (
    <section aria-labelledby="business-heading" className="pb-10">
      <Container>
        <Heading id="business-heading">Phù hợp nhiều <span className="text-blue-600">hoạt động kinh doanh</span></Heading>
        <p className="mt-2">Đáp ứng linh hoạt cho các mô hình hộ kinh doanh phổ biến.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Store, title: "Cửa hàng bán lẻ", description: "Tạp hóa, cửa hàng thực phẩm, thời trang, mỹ phẩm..." },
            { icon: Truck, title: "Thương mại", description: "Kinh doanh hàng hóa, phân phối, đại lý..." },
            { icon: Utensils, title: "Dịch vụ", description: "Ăn uống, làm đẹp, sửa chữa, dịch vụ cá nhân..." },
            { icon: Wrench, title: "Sản xuất nhỏ", description: "Sản xuất, gia công, chế biến quy mô hộ kinh doanh." },
          ].map(({ icon: Icon, title, description }) => <div key={title} className="overflow-hidden rounded-xl border border-sky-100 text-center"><div className="bg-linear-to-br from-sky-50 to-blue-100 py-5"><Icon aria-hidden="true" className="mx-auto size-16 text-blue-500" strokeWidth={1.25} /></div><div className="p-4"><h3 className="font-bold text-[#082967]">{title}</h3><p className="mt-1 text-sm text-blue-900/75">{description}</p></div></div>)}
        </div>
      </Container>
    </section>
  );
}
