import { ArrowDown, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";
import { maxvLogo } from "@/app/_lib/assets";
import { contact } from "@/app/_lib/contact";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Từ năm 2013, MaxV phát triển phần mềm kế toán và giải pháp quản trị phù hợp với doanh nghiệp Việt.",
  alternates: { canonical: "/gioi-thieu" },
};

const values = [
  { title: "Dễ sử dụng", text: "Giao diện thân thiện, thao tác đơn giản, phù hợp với người dùng kế toán tại doanh nghiệp Việt." },
  { title: "Phù hợp nghiệp vụ", text: "Bám sát quy trình kế toán và các quy định hiện hành, linh hoạt theo từng mô hình doanh nghiệp." },
  { title: "Đồng hành lâu dài", text: "Tư vấn, hướng dẫn và hỗ trợ trong suốt quá trình triển khai và sử dụng." },
];

const solutions = [
  { title: "Phần mềm kế toán doanh nghiệp", text: "Giải pháp kế toán toàn diện, đáp ứng đầy đủ nghiệp vụ cho doanh nghiệp vừa và nhỏ.", href: "/san-pham/maxv-accounting" },
  { title: "Kế toán hộ kinh doanh", text: "Giải pháp kế toán đơn giản, dễ sử dụng, phù hợp với hộ kinh doanh.", href: "/giai-phap/ho-kinh-doanh" },
  { title: "Hóa đơn điện tử & chữ ký số", text: "Hỗ trợ phát hành hóa đơn điện tử và tích hợp chữ ký số, đáp ứng quy định hiện hành.", href: "/san-pham/hoa-don-dien-tu" },
  { title: "Giải pháp bán hàng & dịch vụ IT", text: "Quản lý bán hàng, tồn kho và các dịch vụ IT hỗ trợ cho hoạt động của doanh nghiệp.", href: "/giai-phap" },
];

const company = [
  ["Mã số thuế", "0106200129"],
  ["Địa chỉ giao dịch", contact.address],
  ["Hotline", contact.hotlineDisplay],
  ["Email", contact.email],
];

export default function Page() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-linear-to-b from-sky-50 to-white py-10 lg:py-16">
        <Container className="relative grid items-center gap-6 lg:min-h-[440px] lg:grid-cols-[1.15fr_1fr] lg:gap-0">
          <div className="relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">Trang chủ</Link> / <span className="text-foreground">Giới thiệu</span>
            </nav>
            <Badge variant="eyebrow" className="mb-4">VỀ MAXV VIỆT NAM</Badge>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-[#08285d] lg:text-[42px] xl:text-[44px]">
              Đồng hành cùng kế toán.<br className="hidden lg:block" /> Phát triển cùng doanh nghiệp.
            </h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              Từ năm 2013, MaxV phát triển phần mềm kế toán và giải pháp quản trị phù hợp với doanh nghiệp Việt.
            </p>
            <Link href="#gioi-thieu" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
              Tìm hiểu về MaxV <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <Image
            src="/images/hero/about-maxv.svg"
            alt="Phần mềm kế toán MaxV trên laptop"
            width={1586}
            height={992}
            preload
            style={{
              maskImage: [
                "linear-gradient(to right, transparent, black 12%, black 90%, transparent)",
                "linear-gradient(to bottom, transparent, black 10%, black 87%, transparent)",
              ].join(", "),
              maskComposite: "intersect",
            }}
            className="pointer-events-none h-auto w-full lg:absolute lg:top-1/2 lg:-right-16 lg:w-[64%] lg:max-w-none lg:-translate-y-1/2"
          />
        </Container>
      </section>

      <section id="gioi-thieu" className="py-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div className="lg:border-r lg:pr-10">
            <p className="text-7xl font-bold text-primary">2013</p>
            <p className="mt-2 text-muted-foreground">Bắt đầu hành trình</p>
          </div>
          <div className="space-y-4 text-muted-foreground">
            <h2 className="text-2xl font-bold text-primary lg:text-3xl">Hiểu công việc kế toán. Xây dựng giải pháp thiết thực.</h2>
            <p>MaxV được thành lập với mong muốn mang đến phần mềm kế toán dễ sử dụng, phù hợp với đặc thù của doanh nghiệp Việt, đặc biệt là các doanh nghiệp vừa và nhỏ.</p>
            <p>Chúng tôi không chỉ phát triển phần mềm, mà còn đồng hành cùng khách hàng trong suốt quá trình triển khai và sử dụng, lắng nghe để hoàn thiện sản phẩm ngày càng tốt hơn.</p>
          </div>
        </Container>
      </section>

      <section className="bg-sky-50 py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Điều MaxV theo đuổi</p>
            <h2 className="mt-6 text-2xl font-bold text-primary lg:text-3xl">Để kế toán bớt thao tác, doanh nghiệp thêm chủ động.</h2>
          </div>
          <dl className="divide-y">
            {values.map((v) => (
              <div key={v.title} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-primary">{v.title}</dt>
                <dd className="text-sm text-muted-foreground">{v.text}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Giải pháp từ nhu cầu thực tế</p>
              <h2 className="mt-2 text-2xl font-bold text-primary lg:text-3xl">Các giải pháp chính của MaxV</h2>
            </div>
            <Link href="/san-pham/maxv-accounting" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
              Khám phá sản phẩm <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="mt-8 divide-y">
            {solutions.map((s, i) => (
              <li key={s.title}>
                <Link href={s.href} className="grid items-center gap-3 py-5 hover:text-primary sm:grid-cols-[3rem_1fr_1fr_1.5rem] sm:gap-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg font-semibold">{s.title}</span>
                  <span className="text-sm text-muted-foreground">{s.text}</span>
                  <ArrowRight className="hidden size-4 text-primary sm:block" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sky-50 py-12">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_2fr]">
          <div className="text-center">
            <Image src={maxvLogo} alt="MaxV" className="mx-auto h-auto w-40" />
            <p className="mt-3 font-semibold">MAXV VIỆT NAM</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Thông tin doanh nghiệp</h2>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[9rem_1fr]">
              <dt className="sm:col-span-2 font-semibold uppercase">Công ty cổ phần phần mềm MaxV Việt Nam</dt>
              {company.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground">{k}:</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-primary py-10 text-primary-foreground">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold">Trao đổi cùng MaxV về nhu cầu của bạn</h2>
            <p className="mt-1 text-sm opacity-90">Chúng tôi sẵn sàng lắng nghe và tư vấn giải pháp phù hợp cho doanh nghiệp của bạn.</p>
          </div>
          <ButtonLink href="/lien-he" variant="secondary" size="lg">Liên hệ tư vấn</ButtonLink>
        </Container>
      </section>
    </>
  );
}
