import {
  Banknote,
  BookOpen,
  Box,
  Building2,
  ChartColumn,
  Cog,
  Construction,
  Factory,
  FileSpreadsheet,
  Headset,
  HardDrive,
  House,
  LaptopMinimal,
  Lock,
  ShoppingCart,
  UserCog,
  UserRound,
  ChartNoAxesCombined,
  ClipboardList,
  Database,
  FileSearch,
  FileText,
  FolderOpen,
  Globe,
  Link2,
  Search,
  Settings,
  Users,
} from "lucide-react";

export const maxvAccounting = {
  eyebrow: "PHẦN MỀM KẾ TOÁN ONLINE",
  name: "MaxV Accounting",
  title: "Kế toán trực tuyến.",
  highlight: "Hạch toán ngay từ hóa đơn.",
  description: "Kết nối hóa đơn từ cơ quan thuế, xử lý chứng từ và quản lý tài chính trên một nền tảng.",
  highlights: [
    { title: "Làm việc qua trình duyệt", text: "Không cần cài đặt, truy cập mọi nơi", Icon: Globe },
    { title: "Lấy hóa đơn TCT", text: "Lấy hóa đơn điện tử từ cơ quan thuế", Icon: FileText },
    { title: "Đáp ứng TT99/2025/TT-BTC", text: "Hỗ trợ chế độ kế toán theo quy định hiện hành", Icon: Settings },
  ],
};

export const accountingTabs = [
  { label: "Tổng quan", href: "#tong-quan", Icon: Globe },
  { label: "Hóa đơn & hạch toán", href: "#hoa-don-hach-toan", Icon: FileText },
  { label: "Tính năng", href: "#tinh-nang", Icon: Settings },
  { label: "Báo giá", href: "#bao-gia", Icon: FolderOpen },
  { label: "Đánh giá", href: "#danh-gia", Icon: ClipboardList },
  { label: "Câu hỏi", href: "#cau-hoi", Icon: Search },
];

export const accountingOnline = [
  {
    title: "Truy cập qua Internet",
    text: "Làm việc trên trình duyệt web, không cần cài đặt phần mềm. Truy cập dễ dàng từ văn phòng, tại nhà hoặc khi đi công tác.",
    Icon: Globe,
  },
  {
    title: "Dữ liệu tập trung",
    text: "Dữ liệu kế toán được lưu trữ tập trung, giúp theo dõi, tra cứu và chia sẻ thông tin nhanh chóng, đồng bộ giữa các bộ phận.",
    Icon: Database,
  },
  {
    title: "Phân quyền người dùng",
    text: "Phân quyền theo vai trò, đơn vị, chức năng. Kế toán, quản lý có thể cùng làm việc trên một hệ thống với phạm vi truy cập phù hợp.",
    Icon: Users,
  },
];

export const invoiceBenefits = [
  { title: "Theo dõi hóa đơn mua vào – bán ra", text: "Lấy dữ liệu hóa đơn từ cơ quan thuế để theo dõi, tra cứu và đối chiếu." },
  { title: "Hạn chế nhập lại dữ liệu", text: "Tự động lấy thông tin hóa đơn, giảm thao tác nhập liệu thủ công." },
  { title: "Kiểm tra trước khi ghi sổ", text: "Kế toán kiểm tra, đối chiếu và xử lý trước khi lập chứng từ hạch toán." },
];

export const invoiceSteps = [
  { title: "Kết nối tài khoản", text: "Thiết lập kết nối với cổng hóa đơn điện tử của cơ quan thuế.", Icon: Link2 },
  { title: "Lấy hóa đơn", text: "Lấy hóa đơn mua vào, bán ra theo kỳ.", Icon: FileText },
  { title: "Kiểm tra dữ liệu", text: "Kế toán kiểm tra, đối chiếu thông tin hóa đơn.", Icon: FileSearch },
  { title: "Lập chứng từ hạch toán", text: "Lập chứng từ kế toán sau khi đã kiểm tra.", Icon: ClipboardList },
];

export const circularSupport = [
  { title: "Hệ thống tài khoản", text: "Cập nhật hệ thống tài khoản theo Thông tư 99/2025/TT-BTC.", Icon: BookOpen },
  { title: "Sổ kế toán", text: "Đáp ứng các sổ kế toán theo quy định.", Icon: FolderOpen },
  { title: "Báo cáo tài chính", text: "Hỗ trợ lập các báo cáo tài chính theo chế độ kế toán.", Icon: ChartNoAxesCombined },
];

export const accountingFeatures = [
  { title: "Kế toán tổng hợp", text: "Hạch toán chứng từ, tự động kết chuyển, lập báo cáo tài chính theo chế độ kế toán hiện hành.", Icon: FileSpreadsheet },
  { title: "Tiền mặt – Ngân hàng", text: "Quản lý thu chi tiền mặt, tiền gửi, đối chiếu và hạch toán tự động từ sao kê ngân hàng.", Icon: Banknote },
  { title: "Mua hàng – Bán hàng", text: "Quản lý đơn mua, đơn bán, hóa đơn, chứng từ liên quan và theo dõi doanh thu, chi phí.", Icon: ShoppingCart },
  { title: "Công nợ", text: "Theo dõi công nợ phải thu, phải trả, đối chiếu và nhắc hạn thanh toán.", Icon: Users },
  { title: "Quản lý tồn kho", text: "Quản lý nhập – xuất – tồn, kiểm soát số lượng, giá trị theo kho và theo vật tư, hàng hóa.", Icon: House },
  { title: "Tài sản – Công cụ dụng cụ", text: "Theo dõi tăng giảm, khấu hao tài sản cố định và quản lý công cụ dụng cụ.", Icon: Cog },
  { title: "Giá thành công trình", text: "Tập hợp chi phí theo từng công trình, hạng mục, theo dõi chi phí và hiệu quả thực hiện.", Icon: Construction },
  { title: "Giá thành sản xuất", text: "Tập hợp chi phí sản xuất, tính giá thành theo phương pháp phù hợp với đặc thù doanh nghiệp.", Icon: Factory },
  { title: "Thuế & Báo cáo tài chính", text: "Lập tờ khai thuế, quản lý chứng từ thuế và tự động tổng hợp các báo cáo tài chính, báo cáo quản trị.", Icon: ChartColumn },
];

export const postingSteps = [
  { title: "Chọn hóa đơn cần xử lý", text: "Lựa chọn hóa đơn đầu vào, đầu ra đã phát hành hoặc nhận từ nhà cung cấp." },
  { title: "Kiểm tra thông tin và tài khoản", text: "Đối chiếu thông tin hóa đơn, kiểm tra tài khoản hạch toán phù hợp." },
  { title: "Lập chứng từ liên quan", text: "Tự động đề xuất bút toán, có thể chỉnh sửa theo thực tế nghiệp vụ." },
  { title: "Rà soát và ghi sổ", text: "Kiểm tra lại thông tin, sau đó ghi sổ để cập nhật vào sổ sách và báo cáo." },
];

export const reportHighlights = [
  { title: "Theo dõi hạn thanh toán", text: "Cập nhật công nợ phải thu, phải trả, theo dõi hạn thanh toán và chủ động kế hoạch dòng tiền.", Icon: FileText },
  { title: "Tra cứu nhập – xuất – tồn", text: "Xem số liệu tồn kho theo thời gian thực, chi tiết theo kho, vật tư, hàng hóa.", Icon: Box },
  { title: "Tổng hợp chi phí theo đối tượng", text: "Tập hợp và phân tích chi phí theo công trình, dự án, bộ phận hoặc đơn hàng.", Icon: ChartColumn },
];

export const businessModels = [
  { title: "Thương mại – Dịch vụ", text: "Quản lý mua bán hàng hóa, dịch vụ, công nợ và doanh thu theo từng khách hàng, kênh bán.", Icon: ShoppingCart },
  { title: "Xây dựng – Xây lắp", text: "Theo dõi chi phí, giá thành theo công trình, hạng mục và tiến độ thực hiện.", Icon: Building2 },
  { title: "Sản xuất", text: "Quản lý nguyên vật liệu, sản xuất, tính giá thành theo phương pháp phù hợp với doanh nghiệp.", Icon: Factory },
  { title: "Kế toán dịch vụ", text: "Phù hợp với đơn vị cung cấp dịch vụ kế toán, quản lý nhiều doanh nghiệp trên cùng hệ thống.", Icon: LaptopMinimal },
];

export const onboardingSteps = [
  { title: "Trao đổi nhu cầu", text: "Tìm hiểu đặc thù hoạt động, quy mô và các nghiệp vụ cần triển khai.", Icon: Headset },
  { title: "Thiết lập và hướng dẫn", text: "Cấu hình hệ thống, hướng dẫn sử dụng phù hợp với từng bộ phận.", Icon: Settings },
  { title: "Hỗ trợ trong quá trình sử dụng", text: "Giải đáp vướng mắc, tư vấn nghiệp vụ khi phát sinh.", Icon: UserRound },
];

export const dataControls = [
  { title: "Phân quyền theo người dùng", text: "Thiết lập quyền truy cập theo từng người dùng, bộ phận và chức năng.", Icon: UserCog },
  { title: "Quản lý quyền truy cập", text: "Kiểm soát dữ liệu theo đơn vị, kho, chứng từ và từng phân hệ.", Icon: Lock },
  { title: "Trao đổi chính sách sao lưu khi triển khai", text: "Tư vấn và trao đổi phương án sao lưu dữ liệu phù hợp với hạ tầng và quy định của doanh nghiệp.", Icon: HardDrive },
];

export const accountingFaqs = [
  {
    q: "MaxV Accounting có cần cài đặt không?",
    a: "Không. Phần mềm chạy trên trình duyệt web, chỉ cần kết nối Internet là có thể làm việc ở văn phòng, tại nhà hoặc khi đi công tác.",
  },
  {
    q: "Phần mềm lấy hóa đơn từ cơ quan thuế như thế nào?",
    a: "Sau khi thiết lập kết nối với cổng hóa đơn điện tử của cơ quan thuế, bạn chọn kỳ và loại hóa đơn để lấy hóa đơn mua vào, bán ra về hệ thống.",
  },
  {
    q: "Nhiều người có thể cùng làm việc trên một dữ liệu không?",
    a: "Có. Dữ liệu được lưu tập trung và phân quyền theo vai trò, đơn vị, chức năng cho từng người dùng.",
  },
  {
    q: "Các phân hệ đã sẵn sàng chưa?",
    a: "MaxV Accounting đang được hoàn thiện và ra mắt dần. Liên hệ MaxV để biết các nghiệp vụ đã sẵn sàng cho doanh nghiệp của bạn.",
  },
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

// Display price from the design; confirm before publishing.
export const accountingPricing = {
  title: "Gói phần mềm phù hợp với doanh nghiệp",
  description: "Linh hoạt theo quy mô doanh nghiệp, chi phí tối ưu.",
  features: ["Đầy đủ các phân hệ nghiệp vụ", "Hỗ trợ triển khai và hướng dẫn sử dụng"],
  extraDataset: "800.000đ/năm",
  plans: [
    { name: "MV01", users: "02", price: "1.650.000", scale: "nhỏ" },
    { name: "MV02", users: "05", price: "2.500.000", scale: "vừa" },
    { name: "MV03", users: "10", price: "3.000.000", scale: "lớn" },
  ],
};
