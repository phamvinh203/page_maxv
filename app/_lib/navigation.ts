const productLinks = [
  { label: "MaxV Accounting", href: "/san-pham/maxv-accounting" },
  { label: "MaxV HĐĐT", href: "/san-pham/maxv-hddt" },
  { label: "Hóa đơn điện tử", href: "/san-pham/hoa-don-dien-tu" },
  { label: "Chữ ký số", href: "/san-pham/chu-ky-so" },
];

const solutionLinks = [
  { label: "Thương mại – Dịch vụ", href: "/giai-phap/thuong-mai-dich-vu" },
  { label: "Xây dựng – Xây lắp", href: "/giai-phap/xay-dung-xay-lap" },
  { label: "Sản xuất", href: "/giai-phap/san-xuat" },
  { label: "Hộ kinh doanh", href: "/giai-phap/ho-kinh-doanh" },
  { label: "Kế toán dịch vụ", href: "/giai-phap/ke-toan-dich-vu" },
];

const featureLinks = [
  { label: "Tự động lấy hóa đơn", href: "/tinh-nang/tu-dong-lay-hoa-don" },
  { label: "Tự động hạch toán", href: "/tinh-nang/tu-dong-hach-toan" },
  { label: "Quản lý công nợ – tồn kho", href: "/tinh-nang/quan-ly-cong-no-ton-kho" },
  { label: "Báo cáo tài chính & quản trị", href: "/tinh-nang/bao-cao-tai-chinh-quan-tri" },
  { label: "Bảo mật dữ liệu", href: "/tinh-nang/bao-mat-du-lieu" },
];

const customerLinks = [
  { label: "Câu chuyện khách hàng", href: "/khach-hang/cau-chuyen-khach-hang" },
  { label: "Khách hàng tiêu biểu", href: "/khach-hang/khach-hang-tieu-bieu" },
];

const supportLinks = [
  { label: "Trung tâm trợ giúp", href: "/tai-nguyen/trung-tam-tro-giup" },
  { label: "Hướng dẫn sử dụng", href: "/tai-nguyen/huong-dan-su-dung" },
  { label: "Tài liệu", href: "/tai-nguyen/tai-lieu" },
  { label: "Gửi yêu cầu hỗ trợ", href: "/tai-nguyen/gui-yeu-cau-ho-tro" },
];

const companyLinks = [
  { label: "Giới thiệu", href: "/ve-maxv/gioi-thieu" },
  { label: "Tuyển dụng", href: "/ve-maxv/tuyen-dung" },
  { label: "Liên hệ", href: "/ve-maxv/lien-he" },
];

export const headerNavigation = [
  { title: "Sản phẩm", items: productLinks },
  { title: "Giải pháp", items: solutionLinks },
  { title: "Tính năng", items: featureLinks },
  { title: "Bảng giá", href: "/bang-gia" },
  { title: "Khách hàng", items: customerLinks },
  { title: "Tài nguyên", items: supportLinks },
];

export const footerNavigation = [
  { title: "Sản phẩm", items: productLinks },
  { title: "Giải pháp", items: solutionLinks },
  { title: "Hỗ trợ", items: supportLinks },
  { title: "Về MaxV", items: companyLinks },
];
