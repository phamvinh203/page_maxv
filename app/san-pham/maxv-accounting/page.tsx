import { ArrowDown, ArrowRight, CircleCheck, Info, PlayCircle, Plus, Quote, ReceiptText } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PlanAccounting } from "@/app/_components/sections/plan-accounting";
import { Badge } from "@/app/_components/ui/badge";
import { Breadcrumbs } from "@/app/_components/ui/breadcrumbs";
import { Button } from "@/app/_components/ui/button";
import { ButtonLink } from "@/app/_components/ui/button-link";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Container } from "@/app/_components/ui/container";
import { JsonLd } from "@/app/_components/ui/json-ld";
import { SectionHeading } from "@/app/_components/ui/section-heading";
import {
  accountingFaqs,
  accountingFeatures,
  accountingOnline,
  accountingTabs,
  accountingTestimonials,
  businessModels,
  circularSupport,
  dataControls,
  invoiceBenefits,
  invoiceSteps,
  maxvAccounting,
  onboardingSteps,
  postingSteps,
  reportHighlights,
} from "@/app/_data/maxv-accounting";
import { breadcrumbJsonLd, faqJsonLd, softwareJsonLd } from "@/app/_lib/seo";
import heroImage from "@/public/images/products/product_1.webp";
import onlineImage from "@/public/images/products/product_2.webp";
import invoiceImage from "@/public/images/products/product_3.webp";
import postingImage from "@/public/images/products/product_4.webp";
import reportImage from "@/public/images/products/product_5.webp";

export const metadata: Metadata = {
  title: "MaxV Accounting – Phần mềm kế toán online",
  description:
    "Kế toán trực tuyến, hạch toán ngay từ hóa đơn: lấy hóa đơn từ cơ quan thuế, xử lý chứng từ và quản lý tài chính trên một nền tảng web.",
  alternates: { canonical: "/san-pham/maxv-accounting" },
  robots: { index: true, follow: true },
};

const path = "/san-pham/maxv-accounting";
const breadcrumbs = [{ label: "Trang chủ", href: "/" }, { label: "Sản phẩm" }, { label: maxvAccounting.name }];

const { eyebrow, name, title, highlight, description, highlights } = maxvAccounting;

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs, path)} />
      <JsonLd data={faqJsonLd(accountingFaqs)} />
      <JsonLd data={softwareJsonLd({ name, description, path })} />
      <section aria-labelledby="product-heading" className="overflow-hidden bg-hero-tint">
        <Container className="pt-6">
          <Breadcrumbs
            className="text-muted-foreground"
            items={breadcrumbs}
          />
        </Container>
        <Container className="grid items-center gap-8 pt-8 pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pb-14">
          <div>
            <Badge variant="eyebrow">{eyebrow}</Badge>
            <p className="mt-4 text-xl font-bold text-secondary-foreground sm:text-2xl">{name}</p>
            <h1
              id="product-heading"
              className="mt-3 text-[2rem] leading-[1.18] font-bold tracking-tight text-secondary-foreground sm:text-[2.625rem] lg:text-[2.5rem] xl:text-[2.75rem]"
            >
              {title}
              <span className="block text-primary">{highlight}</span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">{description}</p>
            <div className="mt-7 flex flex-col gap-3 min-[360px]:flex-row">
              <ButtonLink href="/dang-ky" size="lg" className="h-12 rounded-lg px-6 shadow-md shadow-primary/15">
                Dùng thử miễn phí
              </ButtonLink>
              <Button variant="outline" size="lg" asChild className="h-12 rounded-lg border-primary/40 bg-white/60 px-6 text-primary">
                <Link href="#hoa-don-hach-toan">
                  <PlayCircle aria-hidden="true" className="fill-primary text-white" /> Xem demo
                </Link>
              </Button>
            </div>
            <Link href="#bao-gia" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4">
              Xem báo giá <ArrowDown aria-hidden="true" className="size-4" />
            </Link>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {highlights.map(({ title, text, Icon }) => (
                <li key={title} className="flex items-start gap-2">
                  <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
                  <p className="text-xs leading-5 font-semibold text-secondary-foreground">
                    {title}
                    <span className="mt-1 block font-normal text-muted-foreground">{text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={heroImage}
            alt="Phần mềm kế toán MaxV trên laptop, kết nối hóa đơn điện tử từ cơ quan thuế."
            sizes="(min-width: 1280px) 660px, (min-width: 1024px) 52vw, 100vw"
            loading="eager"
            fetchPriority="high"
            placeholder="blur"
            className="h-auto w-full rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_8%)]"
          />
        </Container>
      </section>

      <Container className="relative z-10 -mt-6">
        <nav aria-label="Nội dung trang" className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <ul className="flex min-w-max justify-between px-2 lg:min-w-0">
            {accountingTabs.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center gap-2 px-4 py-4 text-sm font-medium text-secondary-foreground transition-colors hover:text-primary"
                >
                  <Icon aria-hidden="true" className="size-4 text-primary" /> {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <section id="tong-quan" aria-labelledby="online-heading" className="scroll-mt-4 py-12 sm:py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading id="online-heading" className="text-secondary-foreground">Online để làm việc linh hoạt hơn</SectionHeading>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {name} giúp doanh nghiệp và kế toán làm việc hiệu quả trên cùng một nền tảng, chỉ với trình duyệt web.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {accountingOnline.map(({ title, text, Icon }) => (
                <li key={title} className="min-w-0">
                  <Card className="h-full shadow-xs">
                    <CardContent className="p-5">
                      <Icon aria-hidden="true" className="size-8 text-primary" />
                      <h3 className="mt-5 text-sm font-semibold text-secondary-foreground">{title}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{text}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={onlineImage}
            alt="Kế toán làm việc trên cùng một nền tảng từ văn phòng công ty, từ xa và tại chi nhánh."
            sizes="(min-width: 1024px) 40vw, 100vw"
            placeholder="blur"
            className="h-auto w-full rounded-2xl"
          />
        </Container>
      </section>

      <section id="hoa-don-hach-toan" aria-labelledby="invoice-heading" className="scroll-mt-4 bg-hero-tint py-12 sm:py-16">
        <Container>
          <Badge variant="eyebrow">MINH HỌA QUY TRÌNH</Badge>
          <SectionHeading id="invoice-heading" className="mt-4 text-secondary-foreground">
            Kết nối Tổng cục Thuế.
            <span className="block text-primary">Đưa hóa đơn vào quy trình kế toán.</span>
          </SectionHeading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Lấy <strong className="text-foreground">hóa đơn mua vào, bán ra</strong> từ cổng hóa đơn điện tử của cơ quan thuế.
          </p>

          <div className="mt-8 grid items-center gap-4 lg:grid-cols-[2.4fr_1fr]">
            <Image
              src={invoiceImage}
              alt="Màn hình lấy hóa đơn từ cơ quan thuế trong MaxV Accounting."
              sizes="(min-width: 1024px) 70vw, 100vw"
              placeholder="blur"
              className="h-auto w-full rounded-xl shadow-sm"
            />
            <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {invoiceBenefits.map(({ title, text }) => (
                <li key={title} className="flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xs">
                  <CircleCheck aria-hidden="true" className="size-7 shrink-0 fill-primary text-white" />
                  <p className="text-sm leading-6 font-semibold text-secondary-foreground">
                    {title}
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">{text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {invoiceSteps.map(({ title, text, Icon }, index) => (
              <li key={title} className="relative min-w-0">
                <Card className="h-full shadow-xs">
                  <CardContent className="flex items-start gap-3 p-5">
                    <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <Icon aria-hidden="true" className="size-6 text-primary" />
                      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < invoiceSteps.length - 1 && (
                  <ArrowRight aria-hidden="true" className="absolute top-1/2 -right-4 hidden size-4 -translate-y-1/2 text-primary lg:block" />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid items-center gap-6 rounded-2xl border border-white bg-white/60 p-6 lg:grid-cols-[1fr_1.3fr] lg:p-8">
            <div className="flex items-center gap-5">
              <span aria-hidden="true" className="relative flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <ReceiptText className="size-10 text-primary" />
                <CircleCheck className="absolute -right-1 -bottom-1 size-7 fill-primary text-white" />
              </span>
              <div>
                <Badge variant="eyebrow">HỖ TRỢ CHẾ ĐỘ KẾ TOÁN</Badge>
                <h3 className="mt-3 text-xl font-bold text-secondary-foreground sm:text-2xl">Đáp ứng Thông tư 99/2025/TT-BTC</h3>
                <p className="mt-2 text-sm text-muted-foreground">Hỗ trợ doanh nghiệp áp dụng chế độ kế toán phù hợp.</p>
              </div>
            </div>
            <div>
              <ul className="grid gap-4 sm:grid-cols-3">
                {circularSupport.map(({ title, text, Icon }) => (
                  <li key={title} className="rounded-xl border bg-white p-4 shadow-xs">
                    <Icon aria-hidden="true" className="size-6 text-primary" />
                    <h4 className="mt-3 text-sm font-semibold text-secondary-foreground">{title}</h4>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <Info aria-hidden="true" className="size-4 shrink-0 text-primary" /> Lựa chọn chế độ kế toán theo đối tượng áp dụng.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="tinh-nang" aria-labelledby="features-heading" className="scroll-mt-4 bg-section-fade py-12 sm:py-16">
        <Container>
          <SectionHeading id="features-heading" className="text-secondary-foreground">Đầy đủ nghiệp vụ trên một nền tảng</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Từ chứng từ phát sinh đến báo cáo quản trị</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accountingFeatures.map(({ title, text, Icon }) => (
              <li key={title} className="flex items-start gap-4 rounded-xl border bg-white p-5 shadow-xs">
                <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="posting-heading" className="py-12 sm:py-16">
        <Container>
          <SectionHeading id="posting-heading" className="text-secondary-foreground">Hạch toán trực tiếp từ hóa đơn</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Giảm thao tác nhập liệu, đảm bảo chính xác số liệu.</p>
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[2.2fr_1fr]">
            <Image
              src={postingImage}
              alt="Minh họa nghiệp vụ: chọn hóa đơn trong danh sách và hạch toán Nợ/Có trong MaxV Accounting."
              sizes="(min-width: 1024px) 66vw, 100vw"
              placeholder="blur"
              className="h-auto w-full"
            />
            <div>
              <ol className="ml-4 space-y-6 border-l-2 border-dashed border-primary/30 pl-8">
                {postingSteps.map(({ title, text }, index) => (
                  <li key={title} className="relative">
                    <span aria-hidden="true" className="absolute top-0 -left-[3.0625rem] flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground ring-4 ring-white">
                      {index + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                  </li>
                ))}
              </ol>
              <ButtonLink href="/lien-he" className="mt-8 h-11 w-full rounded-lg">Đăng ký xem demo</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="report-heading" className="bg-hero-tint py-12 sm:py-16">
        <Container className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading id="report-heading" className="text-secondary-foreground lg:text-3xl">Nắm rõ công nợ, tồn kho và chi phí</SectionHeading>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Cập nhật số liệu kịp thời, phục vụ điều hành và ra quyết định.</p>
            <ul className="mt-8 space-y-6">
              {reportHighlights.map(({ title, text, Icon }) => (
                <li key={title} className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-white shadow-xs">
                    <Icon className="size-6 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Image
            src={reportImage}
            alt="Minh họa báo cáo công nợ phải thu khách hàng trong MaxV Accounting."
            sizes="(min-width: 1024px) 52vw, 100vw"
            placeholder="blur"
            className="h-auto w-full"
          />
        </Container>
      </section>

      <section aria-labelledby="models-heading" className="py-12 sm:py-16">
        <Container>
          <SectionHeading id="models-heading" className="text-secondary-foreground">Phù hợp với mô hình doanh nghiệp của bạn</SectionHeading>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Linh hoạt đáp ứng đặc thù ngành nghề và quy mô hoạt động.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {businessModels.map(({ title, text, Icon }) => (
              <li key={title} className="rounded-xl border bg-white p-5 shadow-xs">
                <Icon aria-hidden="true" className="mx-auto size-14 text-primary" strokeWidth={1.25} />
                <h3 className="mt-4 text-sm font-semibold text-secondary-foreground">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="onboarding-heading" className="pb-12 sm:pb-16">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading id="onboarding-heading" className="text-secondary-foreground lg:text-3xl">
              Triển khai có hướng dẫn.
              <span className="block">Sử dụng có người đồng hành.</span>
            </SectionHeading>
            <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">Đồng hành cùng doanh nghiệp trong suốt quá trình sử dụng.</p>
            <ol className="mt-6 space-y-5">
              {onboardingSteps.map(({ title, text, Icon }, index) => (
                <li key={title} className="flex items-start gap-3">
                  <Icon aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-primary" />
                  <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-primary text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Card className="shadow-xs">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-secondary-foreground">Chủ động quản lý dữ liệu</h2>
              <p className="mt-2 text-sm text-muted-foreground">Kiểm soát truy cập và trao đổi chính sách sao lưu phù hợp với nhu cầu.</p>
              <ul className="mt-5 space-y-3">
                {dataControls.map(({ title, text, Icon }) => (
                  <li key={title} className="flex items-start gap-4 rounded-xl border p-4">
                    <Icon aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-secondary-foreground">{title}</h3>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Container>
      </section>

      <div id="bao-gia" className="scroll-mt-4 bg-section-fade pt-12 sm:pt-14">
        <PlanAccounting />
      </div>

      <section id="danh-gia" aria-labelledby="accounting-testimonials-heading" className="scroll-mt-4 py-12 sm:py-14">
        <Container>
          <SectionHeading id="accounting-testimonials-heading" className="text-center">
            Khách hàng nói gì về MaxV?
          </SectionHeading>
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {accountingTestimonials.map(({ id, quote, name, role, initial, avatar }) => (
              <li key={id} className="min-w-0">
                <Card className="h-full shadow-xs">
                  <CardContent className="h-full p-6">
                    <figure className="flex h-full flex-col">
                      <Quote aria-hidden="true" className="size-7 text-primary" strokeWidth={1.75} />
                      <blockquote className="mt-4 flex-1 text-sm leading-7 text-foreground">{quote}</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        {avatar ? (
                          <Image src={avatar} alt="" width={44} height={44} className="size-11 shrink-0 rounded-full object-cover" />
                        ) : (
                          <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-base font-semibold text-secondary-foreground">
                            {initial}
                          </span>
                        )}
                        <span className="min-w-0">
                          <span className="block text-sm leading-5 font-semibold text-foreground">{name}</span>
                          <span className="block text-xs leading-5 text-muted-foreground">{role}</span>
                        </span>
                      </figcaption>
                    </figure>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="cau-hoi" aria-labelledby="faq-heading" className="scroll-mt-4 pb-12 sm:pb-16">
        <Container className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div>
            <SectionHeading id="faq-heading" className="text-primary">Câu hỏi thường gặp</SectionHeading>
            <p className="mt-3 text-sm text-muted-foreground">Những điều doanh nghiệp thường hỏi về {name}.</p>
          </div>
          <div className="divide-y rounded-2xl border bg-white px-6">
            {accountingFaqs.map(({ q, a }) => (
              <details key={q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium [&::-webkit-details-marker]:hidden">
                  {q}<Plus className="size-4 shrink-0 text-primary transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="explore-heading" className="bg-brand-banner py-8 text-white">
        <Container className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="explore-heading" className="text-xl font-bold sm:text-2xl">Khám phá MaxV trên nhu cầu thực tế của doanh nghiệp</h2>
            <p className="mt-2 text-sm text-white/85">Để lại thông tin, chúng tôi sẽ tư vấn giải pháp phù hợp với đặc thù và quy mô của bạn.</p>
          </div>
          <ButtonLink href="/lien-he" variant="outline" className="h-11 shrink-0 rounded-lg border-white bg-white text-primary hover:bg-white/90">
            Nhận tư vấn demo
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
