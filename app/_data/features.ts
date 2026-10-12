import {
  ChartNoAxesCombined,
  Headphones,
  Package,
  ReceiptText,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";

export const features = [
  {
    id: "tu-dong-lay-hoa-don",
    title: "Tự động lấy hóa đơn",
    description: "Kết nối trực tiếp với TCT, tự động đồng bộ hóa đơn.",
    Icon: ReceiptText,
  },
  {
    id: "tu-dong-hach-toan",
    title: "Tự động hạch toán",
    description: "Giảm 80% thời gian nhập liệu, hạn chế sai sót.",
    Icon: WandSparkles,
  },
  {
    id: "quan-ly-cong-no-ton-kho",
    title: "Quản lý công nợ – tồn kho",
    description: "Theo dõi tức thì, chính xác, chủ động dòng tiền và hàng hóa.",
    Icon: Package,
  },
  {
    id: "bao-cao-tai-chinh-quan-tri",
    title: "Báo cáo tài chính & quản trị",
    description: "Số liệu trực quan, hỗ trợ ra quyết định.",
    Icon: ChartNoAxesCombined,
  },
  {
    id: "bao-mat-du-lieu",
    title: "Bảo mật dữ liệu",
    description: "Cloud hiện đại, sao lưu tự động, an toàn tuyệt đối.",
    Icon: ShieldCheck,
  },
  {
    id: "ho-tro-truc-tiep",
    title: "Hỗ trợ trực tiếp",
    description: "Đội ngũ chuyên gia, phản hồi nhanh chóng.",
    Icon: Headphones,
  },
];
