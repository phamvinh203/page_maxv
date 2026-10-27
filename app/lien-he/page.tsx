import {
  ArrowRight,
  BookOpen,
  Box,
  Clock,
  ExternalLink,
  Handshake,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Plus,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/app/_components/ui/badge";
import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { Button } from "@/app/_components/ui/button";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Container } from "@/app/_components/ui/container";
import { Input } from "@/app/_components/ui/input";
import { contact } from "@/app/_lib/contact";
import { productLinks } from "@/app/_lib/navigation";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Trao đổi nhu cầu, nhận tư vấn hoặc kết nối với đội ngũ hỗ trợ MaxV.",
  alternates: { canonical: "/lien-he" },
  robots: { index: true, follow: true },
};

const topics = [
  { value: "tu-van", label: "Tư vấn sản phẩm", Icon: Box },
  { value: "ho-tro", label: "Hỗ trợ sử dụng", Icon: Headphones },
  { value: "hop-tac", label: "Hợp tác", Icon: Handshake },
];

const resources = [
  { title: "Hướng dẫn sử dụng", text: "Tìm hiểu cách sử dụng các tính năng trên phần mềm MaxV.", href: "/tai-nguyen/huong-dan-su-dung", Icon: BookOpen },
  { title: "Gửi yêu cầu hỗ trợ", text: "Gửi yêu cầu đến đội ngũ kỹ thuật khi cần hỗ trợ trong quá trình sử dụng.", href: "/tai-nguyen/gui-yeu-cau-ho-tro", Icon: Headphones },
];

const faqs = [
  { q: "Tôi nên chọn tư vấn hay hỗ trợ sử dụng?", a: "Chọn tư vấn nếu bạn chưa dùng MaxV và cần tìm giải pháp phù hợp; chọn hỗ trợ sử dụng nếu đang dùng và gặp vấn đề cần giải đáp." },
  { q: "Cần chuẩn bị thông tin gì khi liên hệ?", a: "Họ tên, số điện thoại, tên doanh nghiệp và mô tả ngắn nhu cầu của bạn là đủ để đội ngũ MaxV liên hệ lại." },
  { q: "Tôi có thể tìm hiểu bảng giá ở đâu?", a: "Bạn có thể xem các gói và mức giá tại trang Bảng giá." },
];

const fieldClass = "mt-2 h-11 rounded-lg bg-white";
const labelClass = "text-sm font-medium";

export default function Page() {
  return (
    <>
      <section className="relative isolate overflow-hidden rounded-lg bg-[#eaf7ff] bg-[radial-gradient(ellipse_at_35%_90%,white_0%,transparent_65%),linear-gradient(115deg,#e4f5ff_0%,#f4fbff_48%,#cceaff_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 right-[-8%] -z-10 h-[36rem] w-[55rem] -rotate-12 rounded-[50%] border-[45px] border-white/25" />
        <Container className="relative grid items-center gap-2 py-7 sm:py-8 lg:min-h-80 lg:grid-cols-[1.2fr_1fr] lg:gap-0">
          <div className="relative z-10">
            <Breadcrumbs className="mb-6 text-sm text-muted-foreground" items={[{ label: "Trang chủ", href: "/" }, { label: "Liên hệ" }]} />
            <Badge variant="eyebrow" className="mb-4 border-sky-300 bg-white/60 px-3 py-0.5 text-xs font-bold text-primary shadow-[inset_0_0_0_2px_white]">KẾT NỐI VỚI MAXV</Badge>
            <h1 className="text-3xl font-extrabold leading-[1.18] tracking-tight text-[#08285d] sm:text-4xl lg:text-[46px] xl:text-[50px]">
              Bạn cần giải pháp.<br />
              <span className="text-[#0073ed] lg:whitespace-nowrap">MaxV sẵn sàng lắng nghe.</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#657fa5] lg:text-lg">Trao đổi nhu cầu, nhận tư vấn hoặc kết nối với đội ngũ hỗ trợ.</p>
          </div>
          <Image
            src="/images/hero/contact-conversation.svg"
            alt=""
            aria-hidden="true"
            width={600}
            height={320}
            className="pointer-events-none mx-auto -mt-2 h-auto w-full max-w-[440px] lg:absolute lg:inset-y-0 lg:-right-5 lg:my-auto lg:w-[46%] lg:max-w-none"
          />
        </Container>
      </section>

      <section className="pb-12">
        <Container className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0a6cf0] to-[#0047b8] p-8 text-white">
              <div aria-hidden="true" className="absolute -right-10 -bottom-16 size-52 rounded-full border-[28px] border-white/10" />
              <h2 className="text-3xl font-bold">Kết nối trực tiếp</h2>
              <p className="mt-3 text-blue-50">Đội ngũ MaxV luôn sẵn sàng lắng nghe và hỗ trợ bạn.</p>

              <div className="mt-8 flex items-start gap-4 border-b border-white/20 pb-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20"><Phone aria-hidden="true" /></span>
                <div>
                  <p className="text-sm">Hotline tư vấn</p>
                  <p className="text-3xl font-bold">{contact.hotlineDisplay}</p>
                  <Button asChild variant="secondary" className="mt-3 text-primary"><a href={contact.hotlineHref}><Phone aria-hidden="true" />Gọi cho MaxV</a></Button>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-white/20 py-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20"><Mail aria-hidden="true" /></span>
                <div className="min-w-0">
                  <p className="text-sm">Email liên hệ</p>
                  <p className="text-xl font-bold break-all">{contact.email}</p>
                  <a href={`mailto:${contact.email}`} className="mt-2 inline-flex items-center gap-2 text-sm underline">Gửi email <ArrowRight className="size-4" aria-hidden="true" /></a>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20"><Clock aria-hidden="true" /></span>
                <div>
                  <p className="text-sm font-medium">Hỗ trợ trong giờ hành chính</p>
                  <p className="mt-1 text-sm text-blue-50">Thứ 2 – Thứ 6, 8:00 – 17:30</p>
                </div>
              </div>
            </div>

            <div className="relative isolate flex items-start gap-4 overflow-hidden rounded-2xl border bg-sky-50/60 p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-primary"><MapPin className="size-5" aria-hidden="true" /></span>
              <div className="relative z-10 min-w-0 flex-1 sm:pr-28">
                <h3 className="font-semibold">Văn phòng MaxV</h3>
                <p className="mt-1 text-sm text-muted-foreground">{contact.address}</p>
                <Button asChild variant="outline" className="mt-4 text-primary">
                  <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Công Ty Phần Mềm Kế Toán Maxv Việt Nam")}`} target="_blank" rel="noopener noreferrer">
                    Mở Google Maps <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <Image
                src="/images/customers/office-location.svg"
                alt=""
                aria-hidden="true"
                width={180}
                height={220}
                className="pointer-events-none absolute right-0 bottom-0 -z-10 h-auto w-28 opacity-40 sm:w-36 sm:opacity-100"
              />
            </div>
          </div>

          {/* shortcut: no backend yet, so the form is display-only; wire a server action when lead intake exists. */}
          <form className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-primary">Bạn muốn MaxV hỗ trợ điều gì?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Hãy cho chúng tôi biết nhu cầu của bạn. Đội ngũ MaxV sẽ liên hệ lại trong thời gian sớm nhất.</p>

            <fieldset className="mt-6 grid gap-3 sm:grid-cols-3">
              <legend className="sr-only">Chủ đề cần trao đổi</legend>
              {topics.map(({ value, label, Icon }, i) => (
                <label key={value} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border bg-white px-3 py-3 text-sm font-medium has-checked:border-primary has-checked:bg-primary has-checked:text-primary-foreground has-focus-visible:ring-2 has-focus-visible:ring-primary">
                  <input type="radio" name="topic" value={value} defaultChecked={i === 0} className="sr-only" />
                  <Icon className="size-5" aria-hidden="true" />{label}
                </label>
              ))}
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Họ và tên <span className="text-red-500">*</span></label>
                <Input id="name" name="name" required placeholder="Nhập họ và tên của bạn" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Số điện thoại <span className="text-red-500">*</span></label>
                <Input id="phone" name="phone" type="tel" required placeholder="Nhập số điện thoại" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <Input id="email" name="email" type="email" placeholder="Nhập email của bạn" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="company" className={labelClass}>Tên doanh nghiệp</label>
                <Input id="company" name="company" placeholder="Nhập tên doanh nghiệp" className={fieldClass} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="product" className={labelClass}>Sản phẩm quan tâm</label>
              <select id="product" name="product" defaultValue="" className={`${fieldClass} w-full border border-input px-3 text-sm text-muted-foreground`}>
                <option value="" disabled>Chọn sản phẩm hoặc dịch vụ</option>
                {productLinks.map(({ label }) => <option key={label}>{label}</option>)}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className={labelClass}>Nội dung cần trao đổi</label>
              <textarea id="message" name="message" rows={4} placeholder="Chia sẻ ngắn gọn nhu cầu của bạn..." className="mt-2 w-full rounded-lg border border-input px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50" />
            </div>

            <label className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" name="consent" required className="size-4" />
              Tôi đồng ý với <Link href="/chinh-sach-bao-mat" className="text-primary underline">chính sách bảo mật</Link>
            </label>

            <Button type="submit" disabled className="mt-6 h-12 w-full rounded-lg text-base disabled:opacity-100">
              Gửi yêu cầu tư vấn <ArrowRight aria-hidden="true" />
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Thông tin được sử dụng để tiếp nhận và phản hồi yêu cầu của bạn.</p>
          </form>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <div className="rounded-2xl bg-sky-50/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-primary">Bạn đang sử dụng MaxV?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Truy cập nhanh các tài nguyên hữu ích để được hỗ trợ tốt hơn.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {resources.map(({ title, text, href, Icon }) => (
                <Link key={href} href={href} className="flex items-center gap-4 rounded-xl bg-white p-5 hover:shadow-md">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-sky-50 text-primary"><Icon aria-hidden="true" /></span>
                  <span className="flex-1">
                    <span className="block font-semibold text-primary">{title}</span>
                    <span className="block text-sm text-muted-foreground">{text}</span>
                  </span>
                  <ArrowRight className="size-8 shrink-0 rounded-full bg-sky-50 p-2 text-primary" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-12">
        <Container className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <h2 className="text-2xl font-bold text-primary lg:text-3xl">Một vài điều bạn có thể muốn biết</h2>
            <p className="mt-3 text-sm text-muted-foreground">Dưới đây là những câu hỏi thường gặp khi liên hệ với MaxV.</p>
          </div>
          <div className="divide-y rounded-2xl border bg-white px-6">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {q}<Plus className="size-4 text-primary transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden rounded-t-xl bg-[linear-gradient(110deg,#d9f0ff_0%,#edf8ff_65%,#c9eaff_100%)]">
        <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-28 w-44 sm:w-80 lg:w-96">
          <svg viewBox="0 0 360 112" fill="none" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMaxYMin slice">
            <ellipse cx="183" cy="87" rx="181" ry="42" transform="rotate(-20 183 87)" stroke="white" strokeOpacity="0.9" strokeWidth="1.5" />
            <path d="M73 113C123 72 194 45 266 27" stroke="#3b97ff" strokeWidth="1.5" />
            <path d="M-8 91C89 42 215 6 344 0" stroke="white" strokeOpacity="0.35" />
            <circle cx="127" cy="33" r="4" fill="#65baff" />
          </svg>
          <Image
            src="/images/logo/Logo-Maxv-01.svg"
            alt=""
            width={80}
            height={80}
            className="absolute top-3 right-10 size-16 drop-shadow-[0_6px_8px_#349bdb33] sm:right-20 sm:size-20"
          />
        </div>
        <Container className="relative flex min-h-28 flex-wrap items-center justify-between gap-5 py-5 pr-24 sm:pr-40 lg:pr-72">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-primary sm:text-2xl">Cùng tìm giải pháp phù hợp<br />với doanh nghiệp bạn.</h2>
          <ButtonLink
            href="/san-pham/maxv-accounting"
            variant="outline"
            size="lg"
            className="rounded-lg border-primary bg-white text-primary hover:bg-sky-50"
          >
            Khám phá sản phẩm
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
