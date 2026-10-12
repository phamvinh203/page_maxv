import { Bell, Building2, Calculator, FileText, Gift } from "lucide-react";

export const newsOverview = {
  label: "Tin tức",
  description: "Cập nhật thông báo, sự kiện, hướng dẫn kế toán và các thông tin mới nhất từ MaxV Việt Nam.",
};

export const newsCategories = [
  {
    slug: "hoat-dong-cong-ty",
    label: "Hoạt động công ty",
    description: "Thông báo, sự kiện và hoạt động mới nhất từ MaxV Việt Nam.",
    Icon: Bell,
  },
  {
    slug: "khuyen-mai",
    label: "Khuyến mãi",
    description: "Chương trình ưu đãi và khuyến mãi dành cho khách hàng MaxV.",
    Icon: Gift,
  },
  {
    slug: "tai-chinh-ke-toan",
    label: "Tài chính - kế toán",
    description: "Kiến thức và hướng dẫn về kế toán, thuế và hóa đơn điện tử.",
    Icon: Calculator,
  },
  {
    slug: "doanh-nghiep",
    label: "Doanh nghiệp",
    description: "Tin tức và kiến thức quản trị dành cho doanh nghiệp.",
    Icon: Building2,
  },
  {
    slug: "ung-dung-tai-lieu",
    label: "Ứng dụng & Tài liệu",
    description: "Hướng dẫn dùng ứng dụng và tài liệu tham khảo từ MaxV.",
    Icon: FileText,
  },
] as const;

export type NewsCategorySlug = (typeof newsCategories)[number]["slug"];

type NewsPost = {
  id: string;
  title: string;
  category: NewsCategorySlug;
  featured?: boolean;
  image?: string;
  href?: string;
};

// Sample titles from the design (maxv.vn); replace with real articles before publishing.
// image: a /images/news/... path; href: the full article (the card shows "Đọc thêm" once it is set).
export const newsPosts: NewsPost[] = [
  { id: "nghi-le-quoc-khanh-2026", title: "THÔNG BÁO LỊCH NGHỈ LỄ QUỐC KHÁNH 02/09/2026", category: "hoat-dong-cong-ty" },
  { id: "nghi-le-hung-vuong-2026", title: "Lịch nghỉ lễ Giỗ tổ Hùng Vương 30-04 01-05 2026", category: "hoat-dong-cong-ty" },
  { id: "nghi-tet-nguyen-dan-2026", title: "THÔNG BÁO LỊCH NGHỈ TẾT NGUYÊN ĐÁN 2026", category: "hoat-dong-cong-ty" },
  { id: "nghi-tet-duong-lich-2026", title: "THÔNG BÁO LỊCH NGHỈ TẾT DƯƠNG LỊCH 2026", category: "hoat-dong-cong-ty" },
  { id: "nghi-le-quoc-khanh-2025", title: "THÔNG BÁO NGHỈ LỄ QUỐC KHÁNH 2/9/2025", category: "hoat-dong-cong-ty" },
  { id: "nghi-le-30-4-2025", title: "THÔNG BÁO NGHỈ LỄ 30/4 & 1/5 2025", category: "hoat-dong-cong-ty" },
  { id: "nghi-le-hung-vuong-2025", title: "THÔNG BÁO NGHỈ LỄ GIỖ TỔ HÙNG VƯƠNG 2025", category: "hoat-dong-cong-ty" },
  { id: "nghi-tet-nguyen-dan-2025", title: "THÔNG BÁO LỊCH NGHỈ TẾT NGUYÊN ĐÁN 2025", category: "hoat-dong-cong-ty" },
  { id: "phu-nu-viet-nam-20-10", title: "Chúc mừng ngày phụ nữ Việt Nam 20/10", category: "hoat-dong-cong-ty" },
  {
    id: "sai-sot-to-khai-thue",
    title: "Những sai sót thường gặp khi lập tờ khai thuế và cách hạn chế",
    category: "tai-chinh-ke-toan",
    featured: true,
  },
  {
    id: "luu-tru-hoa-don-khoa-hoc",
    title: "Cách lưu trữ hóa đơn điện tử khoa học và an toàn cho doanh nghiệp",
    category: "tai-chinh-ke-toan",
    featured: true,
  },
  {
    id: "sai-lam-luu-tru-hoa-don",
    title: "7 Sai lầm thường gặp khi kế toán lưu trữ hóa đơn điện tử",
    category: "tai-chinh-ke-toan",
    featured: true,
  },
];
