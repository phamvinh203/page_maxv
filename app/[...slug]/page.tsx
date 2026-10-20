import { notFound } from "next/navigation";

import { PlaceholderPage } from "@/app/_components/ui/placeholder-page";

// Pages not built yet: path -> title. When a page gets its own folder (app/<path>/page.tsx) it wins over this
// catch-all; delete its entry here. Paths missing from this map return 404.
const titles = new Map(
  Object.entries({
    "bang-gia/tu-van-goi-phu-hop": "Tư vấn gói phù hợp",
    "dang-nhap": "Đăng nhập",
    "dung-thu": "Dùng thử miễn phí",
    "tuyen-dung": "Tuyển dụng",
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

export async function generateMetadata({ params }: PageProps<"/[...slug]">) {
  return { title: titles.get((await params).slug.join("/")) };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const title = titles.get((await params).slug.join("/"));
  if (!title) notFound();
  return <PlaceholderPage title={title} />;
}
