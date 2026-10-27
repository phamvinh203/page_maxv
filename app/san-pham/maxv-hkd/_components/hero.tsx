import Image from "next/image";
import Link from "next/link";
import { ArrowDown, BookOpen, FileText, ThumbsUp } from "lucide-react";
import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";
import { hkdBreadcrumbs } from "@/app/_data/maxv-hkd";

const benefits = [
  { icon: ThumbsUp, title: "Dễ sử dụng", description: "Giao diện thân thiện, dễ làm quen" },
  { icon: FileText, title: "Kết nối hóa đơn cơ quan thuế", description: "Lấy hóa đơn, giảm nhập liệu thủ công" },
  { icon: BookOpen, title: "Hỗ trợ TT152/2025/TT-BTC", description: "Ghi chép, quản lý sổ sách theo quy định" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-sky-50">
      <div className="absolute inset-0 -z-10 mx-auto hidden max-w-[1440px] lg:block">
        <div className="absolute inset-y-0 right-0 w-[62%]">
          <Image src="/images/ho_kinh_doanh/hkd_1.webp" alt="MaxV HKD trên laptop với danh sách hóa đơn điện tử" fill sizes="(min-width: 1440px) 893px, 62vw" className="object-contain object-right-bottom" fetchPriority="high" />
          <div className="absolute inset-0 bg-linear-to-r from-sky-50 via-transparent via-20% to-transparent" />
          <span className="absolute right-5 bottom-3 rounded-full border border-white bg-sky-50/90 px-3 py-1 text-xs text-blue-700 shadow-sm">Minh họa giao diện</span>
        </div>
      </div>
      <Container className="pt-5 pb-8 lg:pb-12">
        <Breadcrumbs items={hkdBreadcrumbs} className="text-blue-600" />
        <div className="mt-6 max-w-xl lg:max-w-[49%]">
          <p className="inline-block rounded-full border border-blue-300 px-3 py-1 text-xs font-semibold text-blue-600">PHẦN MỀM KẾ TOÁN HỘ KINH DOANH</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-[#082967] sm:text-6xl">MaxV HKD</h1>
          <p className="mt-2 text-3xl leading-tight font-bold tracking-tight text-blue-600 sm:text-4xl">Dễ ghi chép.<br />Dễ quản lý. Chủ động sổ sách.</p>
          <p className="mt-4 max-w-lg text-base sm:text-lg">Phần mềm kế toán online cho hộ kinh doanh, hỗ trợ hóa đơn, thu chi và sổ sách theo Thông tư 152/2025/TT-BTC.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ButtonLink href="/dang-ky" size="lg">Dùng thử miễn phí</ButtonLink>
            <ButtonLink href="/lien-he" size="lg" variant="outline" className="border-blue-500 text-blue-600">Xem demo</ButtonLink>
            <Link href="#bao-gia" className="inline-flex items-center gap-2 p-2 text-sm font-medium text-blue-600 underline underline-offset-8">Xem báo giá <ArrowDown aria-hidden="true" className="size-4" /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-2">
                <Icon aria-hidden="true" className="size-9 shrink-0 rounded-full bg-blue-100 p-2 text-blue-600" />
                <div><p className="text-xs font-bold">{title}</p><p className="mt-1 text-xs text-blue-900/70">{description}</p></div>
              </div>
            ))}
          </div>
        </div>
        <Image src="/images/ho_kinh_doanh/hkd_1.webp" alt="Minh họa giao diện quản lý hóa đơn MaxV HKD" width={1536} height={1024} sizes="100vw" fetchPriority="high" className="mt-6 rounded-xl lg:hidden" />
      </Container>
    </section>
  );
}
