import {
  Building2,
  FileDown,
  FileSpreadsheet,
  ListFilter,
  RefreshCw,
  Users,
} from "lucide-react";

// Copy mirrors what hdđt_maxv actually does (see its README); do not add capabilities the product lacks.
export const maxvHddt = {
  title: "MaxV HĐĐT",
  highlight: "Quản lý hóa đơn điện tử tự động",
  description:
    "Đồng bộ hóa đơn mua vào và bán ra trực tiếp từ Thuế điện tử, tải file XML, PDF gốc và xuất Excel chỉ với vài thao tác.",
  benefits: ["Kết nối Thuế điện tử", "Có trong mọi gói MaxV", "Dữ liệu tách riêng từng công ty"],
};

export const hddtFeatures = [
  {
    id: "dong-bo",
    title: "Đồng bộ từ Thuế điện tử",
    description:
      "Cập nhật hóa đơn mua vào, bán ra theo kỳ. Tiến trình chạy nền, hóa đơn được lưu sẵn để xem lại mà không cần đăng nhập lại.",
    Icon: RefreshCw,
  },
  {
    id: "tai-file",
    title: "Tải file hóa đơn đầy đủ",
    description:
      "Tải XML gốc đã ký số, PDF và HTML của từng hóa đơn, hoặc cả lô vào thư mục bạn chọn.",
    Icon: FileDown,
  },
  {
    id: "tra-cuu",
    title: "Tra cứu và lọc nhanh",
    description:
      "Lọc theo kỳ, mã số thuế, trạng thái; xem ngay hóa đơn thay thế, điều chỉnh liên quan trên bảng.",
    Icon: ListFilter,
  },
  {
    id: "xuat-excel",
    title: "Xuất Excel và sao lưu",
    description:
      "Xuất bảng hóa đơn ra Excel để gửi kế toán, sao lưu toàn bộ dữ liệu đã lưu ra file để cất giữ.",
    Icon: FileSpreadsheet,
  },
  {
    id: "kiem-tra-doanh-nghiep",
    title: "Kiểm tra doanh nghiệp theo MST",
    description:
      "Tra cứu thông tin doanh nghiệp theo mã số thuế ngay trong phần mềm, không cần mở thêm trang khác.",
    Icon: Building2,
  },
  {
    id: "nhieu-cong-ty",
    title: "Nhiều công ty, phân quyền rõ ràng",
    description:
      "Quản lý hóa đơn của nhiều MST với dữ liệu tách riêng. Mời nhân viên và phân quyền theo từng chức năng.",
    Icon: Users,
  },
];

export const hddtSteps = [
  {
    id: "chon-cong-ty",
    title: "Chọn công ty, đăng nhập Thuế điện tử",
    description: "Chọn mã số thuế cần làm việc và đăng nhập cổng Thuế điện tử để lấy dữ liệu.",
  },
  {
    id: "cap-nhat",
    title: "Cập nhật hóa đơn",
    description: "Một thao tác để lấy hóa đơn mua vào, bán ra theo kỳ; tải thêm chi tiết khi cần.",
  },
  {
    id: "xem-tai-xuat",
    title: "Xem, tải và xuất dữ liệu",
    description: "Lọc, xem tờ hóa đơn, tải XML hoặc PDF, xuất Excel để gửi cho kế toán và đối tác.",
  },
];
