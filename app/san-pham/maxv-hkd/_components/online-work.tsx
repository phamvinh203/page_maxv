import Image from "next/image";
import { Cloud, Globe, Users } from "lucide-react";
import { Heading } from "./heading";
import { ButtonLink } from "@/app/_components/ui/button-link";

const onlineFeatures = [
  { icon: Globe, title: "Truy cập bằng trình duyệt", description: "Sử dụng trên máy tính, laptop, hoặc máy tính bảng." },
  { icon: Cloud, title: "Dữ liệu quản lý tập trung", description: "Thông tin được lưu trữ an toàn, dễ dàng truy cập và đồng bộ." },
  { icon: Users, title: "Phân quyền người dùng", description: "Phù hợp khi có nhiều người cùng tham gia quản lý." },
];

export function OnlineWork() {
  return (
    <section id="lam-viec-online" aria-labelledby="online-heading" className="grid items-center gap-6 py-8 lg:grid-cols-[1.1fr_1.3fr_.7fr] lg:py-12">
      <div>
        <p className="text-sm font-semibold text-blue-600">LÀM VIỆC MỌI LÚC, MỌI NƠI</p>
        <Heading id="online-heading">Làm việc online,<br />không phụ thuộc một máy tính.</Heading>
        <p className="mt-4">Chỉ cần trình duyệt web, bạn có thể truy cập MaxV HKD ở bất kỳ đâu để xem hóa đơn, ghi nhận thu chi và theo dõi sổ sách. Dữ liệu được quản lý tập trung, giúp bạn yên tâm khi sử dụng trên nhiều thiết bị.</p>
        <ButtonLink href="/tai-nguyen/huong-dan-su-dung" size="lg" className="mt-6">Khám phá cách sử dụng</ButtonLink>
      </div>
      <Image src="/images/ho_kinh_doanh/hkd_2.webp" alt="Theo dõi tổng quan kinh doanh trên laptop và thu chi trên điện thoại" width={1536} height={1024} sizes="(min-width: 1024px) 40vw, 100vw" className="w-full" />
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
        {onlineFeatures.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex gap-4"><Icon aria-hidden="true" className="size-12 shrink-0 rounded-xl border border-blue-100 p-2.5 text-blue-600" /><div><h3 className="font-semibold text-blue-600">{title}</h3><p className="mt-1 text-sm text-blue-900/65">{description}</p></div></div>
        ))}
      </div>
    </section>
  );
}
