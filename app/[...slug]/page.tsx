import { notFound } from "next/navigation";

import { Container } from "@/app/_components/ui/container";
import { PlaceholderPage } from "@/app/_components/ui/placeholder-page";
import { NewsContent } from "@/app/tin-tuc/_components/news-content";
import { getCmsPage } from "@/app/_lib/newsApi";

// Pages not built yet: path -> title. When a page gets its own folder (app/<path>/page.tsx) it wins over this
// catch-all; delete its entry here. A published CMS page (REQ-046, BR-022) wins over this map; paths with neither return 404.
const titles = new Map(
  Object.entries({
    "bang-gia/tu-van-goi-phu-hop": "Tư vấn gói phù hợp",
    "tuyen-dung": "Tuyển dụng",
    "chinh-sach-bao-mat": "Chính sách bảo mật",
    "giai-phap": "Giải pháp",
    "giai-phap/ho-kinh-doanh": "Hộ kinh doanh",
    "giai-phap/ke-toan-dich-vu": "Kế toán dịch vụ",
    "giai-phap/san-xuat": "Sản xuất",
    "giai-phap/thuong-mai-dich-vu": "Thương mại – Dịch vụ",
    "giai-phap/xay-dung-xay-lap": "Xây dựng – Xây lắp",
    "khach-hang/cau-chuyen-khach-hang": "Câu chuyện khách hàng",
    "khach-hang/cong-ty-xay-dung-abc": "Công ty xây dựng ABC",
    "khach-hang/khach-hang-tieu-bieu": "Khách hàng tiêu biểu",
    "tai-nguyen/gui-yeu-cau-ho-tro": "Gửi yêu cầu hỗ trợ",
    "tai-nguyen/huong-dan-su-dung": "Hướng dẫn sử dụng",
    "tai-nguyen/tai-lieu": "Tài liệu",
    "tai-nguyen/trung-tam-tro-giup": "Trung tâm trợ giúp",
    "tinh-nang": "Tính năng",
    "tinh-nang/bao-cao-tai-chinh-quan-tri": "Báo cáo tài chính & quản trị",
    "tinh-nang/bao-mat-du-lieu": "Bảo mật dữ liệu",
    "tinh-nang/quan-ly-cong-no-ton-kho": "Quản lý công nợ – tồn kho",
    "tinh-nang/tu-dong-hach-toan": "Tự động hạch toán",
    "tinh-nang/tu-dong-lay-hoa-don": "Tự động lấy hóa đơn",
  }),
);

// Without ensureStatic, the first request for an unknown path gets the 200 app shell before notFound() runs; this waits for the real 404.
// instant = false: this page blocks on params on purpose, because a Suspense boundary would start the stream (status 200) before notFound().
export const ensureStatic = "navigation";
export const instant = false;

export const generateStaticParams = () => [...titles.keys()].map((path) => ({ slug: path.split("/") }));

// Trang tĩnh CMS (1–3 đoạn) trước, rồi tới trang chờ. Lỗi API: trang chờ vẫn hiện (và build không vỡ), còn lại ném ra error.tsx (REQ-049).
async function loadPage(slug: string[]) {
  const path = slug.join("/");
  const title = titles.get(path);
  const page = slug.length <= 3 ? await getCmsPage(path) : null;
  if (page === undefined && !title) throw new Error("News API unavailable");
  return { path, title, page: page ?? null };
}

export async function generateMetadata({ params }: PageProps<"/[...slug]">) {
  const { path, title, page } = await loadPage((await params).slug);
  if (!page) return { title };
  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || undefined,
    alternates: { canonical: `/${path}` },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const { title, page } = await loadPage((await params).slug);
  if (page) {
    return (
      <Container className="py-12 sm:py-16">
        <article className="max-w-3xl">
          <h1 className="text-3xl font-bold sm:text-4xl">{page.title}</h1>
          <NewsContent html={page.content} className="mt-6" />
        </article>
      </Container>
    );
  }
  if (!title) notFound();
  return <PlaceholderPage title={title} />;
}
