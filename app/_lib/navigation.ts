import { industrySolutions } from "@/app/_data/industry-solutions";
import { newsCategories } from "@/app/_data/news";

export const productLinks = [
  { label: "MaxV Accounting", href: "/san-pham/maxv-accounting" },
  { label: "MaxV HĐĐT", href: "/san-pham/maxv-hddt" },
  { label: "Hóa đơn điện tử", href: "/san-pham/hoa-don-dien-tu" },
  { label: "Chữ ký số", href: "/san-pham/chu-ky-so" },
];

const solutionLinks = industrySolutions.map(({ title, href }) => ({ label: title, href }));

const customerLinks = [
  { label: "Câu chuyện khách hàng", href: "/khach-hang/cau-chuyen-khach-hang" },
  { label: "Khách hàng tiêu biểu", href: "/khach-hang/khach-hang-tieu-bieu" },
];

const newsLinks = newsCategories.map(({ label, slug }) => ({ label, href: `/tin-tuc/${slug}` }));

const supportLinks = [
  { label: "Trung tâm trợ giúp", href: "/tai-nguyen/trung-tam-tro-giup" },
  { label: "Hướng dẫn sử dụng", href: "/tai-nguyen/huong-dan-su-dung" },
  { label: "Tài liệu", href: "/tai-nguyen/tai-lieu" },
  { label: "Gửi yêu cầu hỗ trợ", href: "/tai-nguyen/gui-yeu-cau-ho-tro" },
];

const companyLinks = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Tuyển dụng", href: "/tuyen-dung" },
  { label: "Liên hệ", href: "/lien-he" },
];

export const headerNavigation = [
  { title: "Giới thiệu", href: "/gioi-thieu" },
  { title: "Sản phẩm", items: productLinks },
  { title: "Báo giá", href: "/bang-gia" },
  { title: "Hỗ trợ", items: supportLinks },
  { title: "Tin tức", items: newsLinks },
  { title: "Khách hàng", items: customerLinks },
  { title: "Tra cứu MST", href: "/tra-cuu-mst" },
  { title: "Liên hệ", href: "/lien-he" },
];

export const footerNavigation = [
  { title: "Sản phẩm", items: productLinks },
  { title: "Giải pháp", items: solutionLinks },
  { title: "Hỗ trợ", items: supportLinks },
  { title: "Về MaxV", items: companyLinks },
];
