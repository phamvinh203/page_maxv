import { FileCheck2, Landmark, ReceiptText } from "lucide-react";

// Overview page: the product has no digital-signing feature or certificate offering yet.
// Keep copy general plus what MaxV HĐĐT really does (download signed invoice XML); add offer details once confirmed.
export const chuKySo = {
  title: "Chữ ký số",
  highlight: "Xác thực người ký cho hóa đơn và tờ khai điện tử",
  description:
    "Chữ ký số giúp doanh nghiệp xác thực người ký và đảm bảo tài liệu điện tử không bị thay đổi khi làm việc với hóa đơn điện tử và cơ quan thuế.",
  benefits: ["Ký hóa đơn điện tử", "Nộp tờ khai thuế điện tử", "Giao dịch với cơ quan nhà nước"],
};

export const chuKySoTopics = [
  {
    id: "hoa-don",
    title: "Hóa đơn điện tử",
    description:
      "Hóa đơn điện tử được ký số để xác thực người bán và đảm bảo nội dung hóa đơn không bị chỉnh sửa.",
    Icon: ReceiptText,
  },
  {
    id: "to-khai",
    title: "Tờ khai thuế điện tử",
    description:
      "Doanh nghiệp dùng chữ ký số khi nộp tờ khai và thực hiện các giao dịch thuế qua mạng.",
    Icon: FileCheck2,
  },
  {
    id: "co-quan",
    title: "Giao dịch điện tử khác",
    description:
      "Chữ ký số còn được dùng để ký hợp đồng điện tử và làm việc với các cổng dịch vụ công trực tuyến.",
    Icon: Landmark,
  },
];
