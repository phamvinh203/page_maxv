import {
  FileCheck2,
  Headphones,
  MonitorSmartphone,
  ReceiptText,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { ProductHero } from "@/app/san-pham/_components/product-hero";

const benefits = [
  { label: "Kết nối hóa đơn TCT", Icon: FileCheck2 },
  { label: "Làm việc mọi nơi", Icon: MonitorSmartphone },
  { label: "Bảo mật dữ liệu", Icon: ShieldCheck },
  { label: "Hỗ trợ trực tiếp", Icon: Headphones },
];

export function Hero() {
  return (
    <ProductHero
      eyebrow="PHẦN MỀM KẾ TOÁN ONLINE MAXV"
      eyebrowClassName="max-w-full whitespace-normal sm:text-xs"
      title="Kế toán nhanh hơn."
      highlight="Quản trị tài chính dễ hơn."
      description="Tự động lấy hóa đơn, hạch toán, quản lý công nợ – tồn kho – giá thành và lập báo cáo trên một nền tảng."
      imageAlt="Phần mềm kế toán MaxV trên laptop và điện thoại, hiển thị tổng quan doanh thu, công nợ, tồn kho và hóa đơn."
      primary={{ label: "Dùng thử miễn phí", href: "/dung-thu" }}
      secondary={{ label: "Xem bảng giá", href: "/bang-gia" }}
      below={
        <ul className="mt-7 grid grid-cols-2 gap-x-3 gap-y-4 sm:mt-9 sm:flex sm:flex-wrap sm:gap-x-5">
          {benefits.map(({ label, Icon }) => (
            <li key={label} className="flex items-center gap-2 text-[11px] font-medium text-foreground/80">
              <Icon aria-hidden="true" className="size-4 shrink-0 text-secondary-foreground" />
              {label}
            </li>
          ))}
        </ul>
      }
      overlay={
        <>
          <div className="absolute top-2 right-4 flex max-w-52 items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-3 shadow-lg shadow-sky-900/10 sm:top-4 sm:right-6 sm:px-4 lg:top-3 lg:right-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <ReceiptText aria-hidden="true" className="size-5" />
            </span>
            <p className="text-[11px] leading-4 font-semibold text-secondary-foreground">
              Tự động lấy hóa đơn từ Tổng cục Thuế
            </p>
          </div>

          <div className="absolute bottom-9 left-4 flex items-center gap-2.5 rounded-xl border border-white/80 bg-white/95 px-3 py-3 shadow-lg shadow-sky-900/10 sm:bottom-14 sm:left-6 sm:px-4 lg:bottom-12 lg:left-0">
            <Zap aria-hidden="true" className="size-6 shrink-0 text-primary" />
            <p className="text-xs leading-5 font-bold text-foreground">
              Tiết kiệm 70%
              <span className="block text-[10px] font-medium text-muted-foreground">
                thời gian nhập liệu
              </span>
            </p>
          </div>
        </>
      }
    />
  );
}
