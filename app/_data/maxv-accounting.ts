import {
  ChartNoAxesCombined,
  FileCheck2,
  LayoutGrid,
  MonitorSmartphone,
  RefreshCw,
  ShieldCheck,
  Users,
  WandSparkles,
} from "lucide-react";

// Scope mirrors the 7 accounting modules in hdđt_maxv (features/accounting/_shared/config).
// status reflects what is built today (13 pages: some catalogs, sales invoice); update it as modules ship.
// Copy only claims the product supports; customer counts and circular support from maxv.vn are left out until confirmed.
export const maxvAccounting = {
  eyebrow: "PHẦN MỀM KẾ TOÁN ONLINE",
  title: "Phần mềm kế toán online",
  highlight: "MaxV Accounting",
  description:
    "Giải pháp kế toán cho doanh nghiệp: tổng hợp, tiền, bán hàng, mua hàng, tồn kho và giá thành trên một nền tảng web, làm việc ở mọi nơi.",
  chips: [
    { label: "Thuế điện tử", hint: "Đồng bộ hóa đơn", Icon: FileCheck2 },
    { label: "Làm việc mọi nơi", hint: "Trên nền tảng web", Icon: MonitorSmartphone },
    { label: "Bảo mật", hint: "Dữ liệu tách riêng", Icon: ShieldCheck },
    { label: "7 phân hệ", hint: "Ra mắt dần", Icon: LayoutGrid },
  ],
};

export const accountingSolutions = [
  {
    id: "hach-toan",
    title: "Tự động hạch toán",
    description: "Bút toán kết chuyển, phân bổ tự động và đối chiếu số liệu giữa các sổ.",
    Icon: WandSparkles,
  },
  {
    id: "thue-dien-tu",
    title: "Kết nối Thuế điện tử",
    description: "Đồng bộ hóa đơn mua vào, bán ra từ Thuế điện tử bằng MaxV HĐĐT.",
    Icon: RefreshCw,
  },
  {
    id: "bao-cao",
    title: "Báo cáo đa dạng",
    description: "Báo cáo theo từng phân hệ: tổng hợp, bán hàng, mua hàng, tồn kho, giá thành.",
    Icon: ChartNoAxesCombined,
  },
  {
    id: "quan-ly",
    title: "Quản lý linh hoạt",
    description: "Phân quyền theo chứng từ, quản lý theo phòng ban và nhiều công ty.",
    Icon: Users,
  },
  {
    id: "moi-noi",
    title: "Làm việc mọi nơi",
    description: "Truy cập mọi lúc, mọi nơi chỉ cần trình duyệt web.",
    Icon: MonitorSmartphone,
  },
  {
    id: "an-toan",
    title: "Dữ liệu an toàn",
    description: "Dữ liệu từng công ty được tách riêng, hỗ trợ sao lưu và khôi phục.",
    Icon: ShieldCheck,
  },
];

export const accountingReasons = [
  "Giao diện hiện đại, dễ sử dụng trên nền tảng web",
  "Đồng bộ hóa đơn từ Thuế điện tử, giảm nhập liệu thủ công",
  "Dữ liệu từng công ty tách riêng, có sao lưu và khôi phục",
  "Phân quyền chi tiết cho từng nhân viên và chứng từ",
  "Đội ngũ hỗ trợ trực tiếp, phản hồi nhanh chóng",
];

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  initial: string;
  avatar?: string;
};

// Customer quotes supplied by the site owner (from the live maxv.vn page).
// avatar: square photo under /images/testimonials/ (e.g. "/images/testimonials/tan-ke-toan.jpg"); without it the initial is shown.
export const accountingTestimonials: Testimonial[] = [
  {
    id: "tan-ke-toan",
    quote:
      "Dùng phần mềm kế toán Maxv giúp công việc kế toán của công ty tôi được tự động hóa hiệu quả hơn rất nhiều. Cảm ơn Maxv!",
    name: "Bà Tân (Tân Kế Toán)",
    role: "Giám đốc, Tân Kế Toán",
    initial: "T",
    // avatar: "./images/",
  },
  {
    id: "mitasp",
    quote:
      "Cảm ơn Maxv đã mang đến giải pháp hỗ trợ doanh nghiệp chuyên nghiệp, nhiều tiện ích và giúp công việc kế toán dễ dàng hơn.",
    name: "Ông Đào Trung Hiếu",
    role: "Giám đốc, Mitasp",
    initial: "H",
    // avatar: "./images/",
  },
  {
    id: "office-360",
    quote:
      "Maxv Accounting giúp Office360 quản lý nhiều doanh nghiệp nhanh chóng, hiệu quả hơn trong công việc kế toán. Cảm ơn Maxv!",
    name: "Ông Nguyễn Văn Nam",
    role: "Giám đốc, Office 360",
    initial: "N",
    // avatar: "./images/",
  },
];

export const accountingModules = [
  {
    id: "he-thong",
    title: "Hệ thống",
    description: "Thiết lập và kiểm soát số liệu kế toán.",
    items: ["Năm tài chính, thông tin công ty", "Khóa số liệu", "Phân quyền theo chứng từ"],
    status: "Sắp ra mắt",
  },
  {
    id: "tong-hop",
    title: "Tổng hợp",
    description: "Hạch toán tổng hợp và hệ thống tài khoản.",
    items: ["Phiếu kế toán", "Bút toán kết chuyển, phân bổ tự động", "Danh mục tài khoản, tiền tệ, phòng ban"],
    status: "Đang hoàn thiện",
  },
  {
    id: "tien",
    title: "Tiền",
    description: "Thu chi tiền mặt và ngân hàng.",
    items: ["Phiếu thu, phiếu chi", "Giấy báo có, giấy báo nợ", "Tỷ giá ghi sổ, khế ước"],
    status: "Sắp ra mắt",
  },
  {
    id: "ban-hang",
    title: "Bán hàng",
    description: "Từ hóa đơn bán hàng đến công nợ khách hàng.",
    items: ["Hóa đơn bán hàng, hóa đơn dịch vụ", "Phân bổ tiền thu, bù trừ công nợ", "Danh mục khách hàng, hợp đồng"],
    status: "Đang hoàn thiện",
  },
  {
    id: "mua-hang",
    title: "Mua hàng",
    description: "Mua hàng trong nước, nhập khẩu và công nợ nhà cung cấp.",
    items: ["Hóa đơn mua hàng trong nước, nhập khẩu", "Phiếu xuất trả lại nhà cung cấp", "Phân bổ tiền trả, bù trừ công nợ"],
    status: "Sắp ra mắt",
  },
  {
    id: "ton-kho",
    title: "Tồn kho",
    description: "Nhập xuất kho và tính giá tồn kho.",
    items: ["Phiếu nhập kho, xuất kho, điều chuyển", "Tính giá trung bình, nhập trước xuất trước", "Danh mục hàng hóa, kho, đơn vị tính"],
    status: "Đang hoàn thiện",
  },
  {
    id: "gia-thanh",
    title: "Giá thành",
    description: "Tính giá thành sản phẩm cho doanh nghiệp sản xuất.",
    items: ["Định mức nguyên vật liệu", "Lệnh sản xuất", "Phân bổ chi phí, tính giá thành"],
    status: "Sắp ra mắt",
  },
];
