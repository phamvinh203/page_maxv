import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Info, ArrowRight, FileText } from "lucide-react";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";

export function Pricing() {
  return (
    <section id="bao-gia" aria-labelledby="pricing-heading" className="relative isolate overflow-hidden bg-sky-50 py-12">
      <div className="absolute inset-0 -z-10 mx-auto hidden max-w-[1440px] lg:block">
        <div className="absolute inset-y-0 right-0 w-[52%]">
          <Image src="/images/ho_kinh_doanh/hkd_1.webp" alt="Minh họa phần mềm MaxV HKD lưu trữ trên Cloud" fill sizes="(min-width: 1440px) 749px, 52vw" className="object-contain object-right-bottom" />
          <div className="absolute inset-0 bg-linear-to-r from-sky-50 via-transparent via-20% to-transparent" />
          <span className="absolute right-5 bottom-3 rounded-full border border-white bg-sky-50/90 px-3 py-1 text-xs text-blue-700 shadow-sm">Minh họa giao diện</span>
        </div>
      </div>
      <Container>
        <div className="lg:max-w-[58%]">
          <p className="inline-block rounded-full border border-blue-400 px-4 py-1 text-xs font-semibold text-blue-600">BÁO GIÁ PHẦN MỀM MAXV HKD</p>
          <h2 id="pricing-heading" className="mt-4 text-4xl font-bold tracking-tight text-[#082967] sm:text-5xl">Báo giá MaxV HKD</h2>
          <p className="mt-3 text-lg"><strong>02 người dùng</strong> · Lưu trữ trên Cloud Server MaxV</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[["01 năm", "1.000.000"], ["02 năm", "1.800.000"], ["03 năm", "2.500.000"]].map(([term, price]) => (
              <div key={term} className="rounded-xl border border-sky-100 bg-white p-4 text-center shadow-sm">
                <h3 className="flex items-center justify-center gap-3 text-xl font-bold text-blue-600"><CalendarDays aria-hidden="true" className="size-12 rounded-full bg-sky-50 p-3" />{term}</h3>
                <p className="my-4 whitespace-nowrap text-2xl font-bold tracking-tight text-[#082967]">{price}<span className="text-lg">đ</span></p>
                <ButtonLink href="#tu-van-hkd" className="w-full">Nhận tư vấn</ButtonLink>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-start gap-3 text-sm"><Info aria-hidden="true" className="size-5 shrink-0 text-blue-600" />Giá tham khảo theo website MaxV – xác nhận khi đăng ký.</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm"><p className="flex gap-3"><FileText aria-hidden="true" className="size-5 shrink-0 text-blue-600" /><span><strong>Bộ số liệu thứ 2:</strong> Liên hệ xác nhận kỳ phí.</span></p><Link href="/bang-gia" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:underline">Xem báo giá chi tiết <ArrowRight aria-hidden="true" className="size-4" /></Link></div>
        </div>
      </Container>
    </section>
  );
}
