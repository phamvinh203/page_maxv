import { ClipboardCheck, FileInput, FileOutput } from "lucide-react";

// Overview page: only describe what MaxV HĐĐT and the GTGT return (tokhai) module really do.
// There is no invoice issuing or digital signing in the product; do not add copy about them.
export const hoaDonDienTu = {
  title: "Hóa đơn điện tử",
  highlight: "Quản lý hóa đơn mua vào, bán ra trên một nền tảng",
  description:
    "Đồng bộ hóa đơn từ Thuế điện tử, tải file gốc, xuất Excel và lập tờ khai GTGT từ chính những hóa đơn đã đồng bộ.",
  benefits: ["Đồng bộ từ Thuế điện tử", "Tải XML, PDF, xuất Excel", "Lập tờ khai GTGT từ hóa đơn"],
};

export const hoaDonTopics = [
  {
    id: "mua-vao",
    title: "Hóa đơn mua vào",
    description:
      "Cập nhật hóa đơn đầu vào theo kỳ từ Thuế điện tử, lọc theo mã số thuế và trạng thái, tải XML gốc và PDF của từng hóa đơn.",
    Icon: FileInput,
  },
  {
    id: "ban-ra",
    title: "Hóa đơn bán ra",
    description:
      "Theo dõi hóa đơn đầu ra của doanh nghiệp trên Thuế điện tử, xem hóa đơn thay thế và điều chỉnh liên quan ngay trên bảng.",
    Icon: FileOutput,
  },
  {
    id: "to-khai-gtgt",
    title: "Tờ khai GTGT 01",
    description:
      "Đánh dấu kê khai và chỉ tiêu tăng giảm trên từng hóa đơn, lập tờ khai 01/GTGT và xuất Excel kèm bảng kê.",
    Icon: ClipboardCheck,
  },
];
