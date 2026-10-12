// Scope mirrors the 7 accounting modules in hdđt_maxv (features/accounting/_shared/config).
// status reflects what is built today (13 pages: some catalogs, sales invoice); update it as modules ship.
export const maxvAccounting = {
  title: "MaxV Accounting",
  highlight: "Phần mềm kế toán online cho doanh nghiệp",
  description:
    "Quản lý kế toán tổng hợp, tiền, bán hàng, mua hàng, tồn kho và giá thành trên một nền tảng web, làm việc ở mọi nơi.",
  benefits: ["Làm việc mọi nơi", "Có trong gói Toàn diện", "Ra mắt dần từng phân hệ"],
};

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
