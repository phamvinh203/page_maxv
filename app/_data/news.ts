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

export type NewsPost = {
  id: string;
  title: string;
  category: NewsCategorySlug;
  date: string;
  content: string[];
  featured?: boolean;
  image?: string;
};

export const categoryOf = (slug: NewsCategorySlug) => newsCategories.find((category) => category.slug === slug)!;

export const postHref = ({ category, id }: Pick<NewsPost, "category" | "id">) => `/tin-tuc/${category}/${id}`;

// No articles yet; fill from a real source (CMS/API). The article route is request-time until then (no generateStaticParams).
export const newsPosts: NewsPost[] = [];

