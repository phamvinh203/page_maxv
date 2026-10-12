// Display price from the design; confirm the actual plan and price before publishing.
export const pricing = {
  title: "Gói phần mềm phù hợp với mọi nhu cầu",
  description: "Linh hoạt theo quy mô doanh nghiệp, chi phí tối ưu.",
  price: "138.000",
  currency: "đ",
  period: "/tháng",
  href: "/bang-gia",
};

// Module keys mirror MODULES in maxv_v2/be_maxv/src/constants/modules.ts (hddt is always on in the product).
type ModuleKey = "hddt" | "tokhai" | "dvc" | "accounting" | "hrm";

export const modules: { key: ModuleKey; label: string; soon?: boolean }[] = [
  { key: "hddt", label: "Hóa đơn điện tử – đồng bộ từ Thuế điện tử" },
  { key: "tokhai", label: "Tờ khai thuế GTGT 01" },
  { key: "dvc", label: "Dịch vụ công – tờ khai, giấy nộp tiền" },
  { key: "accounting", label: "Kế toán – bán hàng, tồn kho, tổng hợp", soon: true },
  { key: "hrm", label: "Nhân sự – chấm công, tiền lương, thuế TNCN" },
];

type Plan = {
  id: string;
  name: string;
  audience: string;
  price: string | null;
  period?: string;
  from?: boolean;
  featured?: boolean;
  modules: ModuleKey[];
  cta: { label: string; href: string };
};

// shortcut: only the entry price is known; price: null renders "Liên hệ". Add real prices and MST/user limits when confirmed.
export const plans: Plan[] = [
  {
    id: "dung-thu",
    name: "Dùng thử",
    audience: "Trải nghiệm MaxV trước khi quyết định",
    price: "Miễn phí",
    modules: ["hddt", "tokhai", "dvc"],
    cta: { label: "Đăng ký dùng thử", href: "/dung-thu" },
  },
  {
    id: "co-ban",
    name: "Cơ bản",
    audience: "Hộ kinh doanh, doanh nghiệp nhỏ",
    price: `${pricing.price}${pricing.currency}`,
    from: true,
    featured: true,
    period: pricing.period,
    modules: ["hddt", "tokhai"],
    cta: { label: "Dùng thử miễn phí", href: "/dung-thu" },
  },
  {
    id: "chuyen-nghiep",
    name: "Chuyên nghiệp",
    audience: "Kế toán dịch vụ, quản lý nhiều MST",
    price: null,
    modules: ["hddt", "tokhai", "dvc"],
    cta: { label: "Tư vấn gói phù hợp", href: "/bang-gia/tu-van-goi-phu-hop" },
  },
  {
    id: "toan-dien",
    name: "Toàn diện",
    audience: "Doanh nghiệp vừa, cần kế toán và nhân sự",
    price: null,
    modules: ["hddt", "tokhai", "dvc", "accounting", "hrm"],
    cta: { label: "Tư vấn gói phù hợp", href: "/bang-gia/tu-van-goi-phu-hop" },
  },
];
