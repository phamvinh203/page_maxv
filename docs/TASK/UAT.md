# UAT — Nghiệm thu nghiệp vụ MaxV Admin

Đây là kế hoạch kiểm tra sau khi có bản triển khai. Mọi dòng hiện **Chưa chạy**; vai trò trong bảng chưa thay cho tên người được giao thực tế. Không dùng bảng này để xác nhận hệ thống hiện đã hoạt động.

## Cách thực hiện

1. Chủ dự án điền tên người thực hiện và người xác nhận cho từng dòng trước buổi UAT. Nội dung tình huống nằm tại mục "Nghiệp vụ và nghiệm thu" của file task được liên kết.
2. Chỉ chạy khi task API/UI/Site liên quan đã qua kiểm tra kỹ thuật, staging tách production và các quyết định đầu vào đã chốt. Dùng tài khoản đủ vai trò và dữ liệu giả; không đưa thông tin khách hàng thật vào bằng chứng.
3. Ghi kết quả: **Chưa chạy / Bị chặn / Đạt / Không đạt**, kèm ngày, phiên bản hoặc commit của các repo, dữ liệu/điều kiện thử và link bằng chứng. Khi không đạt, ghi bước tái hiện, kết quả mong đợi/thực tế và link lỗi ngay dưới bảng; chạy lại sau khi sửa.
4. UAT-00–11 phục vụ G1; UAT-12–14 phục vụ G2. Không chặn G1 vì G2 chưa chạy. Test build/CI và kiểm tra bảo mật/backup vẫn theo checklist kỹ thuật, không thay thế bằng UAT.

## Phân công và kết quả

| Mã / task | Tình huống | Vai trò thực hiện → xác nhận | Tên thực tế (thực hiện / xác nhận) | Kết quả | Ngày / phiên bản / bằng chứng |
|---|---|---|---|---|---|
| [UAT-00 / 00](00-chuan-bi.md) | Staging và đầu vào triển khai | Vận hành → chủ dự án | Chưa giao | Chưa chạy | — |
| [UAT-01 / 01](01-dang-nhap-admin.md) | Đăng nhập, đổi mật khẩu, reset, đăng xuất | Nhân viên thử → quản trị viên | Chưa giao | Chưa chạy | — |
| [UAT-02 / 02](02-phan-quyen.md) | Phạm vi ba vai trò, truy cập URL trực tiếp | Ba vai trò thử → chủ dự án | Chưa giao | Chưa chạy | — |
| [UAT-03 / 02](02-phan-quyen.md) | Khóa nhân viên, thu hồi phiên, giữ lịch sử | Quản trị viên → chủ dự án | Chưa giao | Chưa chạy | — |
| [UAT-04 / 03](03-bai-viet-seo.md) | Nháp, publish, gỡ bài và SEO | Biên tập viên → phụ trách nội dung | Chưa giao | Chưa chạy | — |
| [UAT-05 / 03](03-bai-viet-seo.md) | Hai người sửa bài, không ghi đè | Hai biên tập viên → phụ trách nội dung | Chưa giao | Chưa chạy | — |
| [UAT-06 / 04](04-lead.md) | Hai form gửi đúng nguồn và consent | Nhân viên thử → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |
| [UAT-07 / 04](04-lead.md) | Retry không tạo lead trùng | Nhân viên thử cùng dev mô phỏng lỗi mạng → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |
| [UAT-08 / 04](04-lead.md) | Xử lý, giao lead, ghi chú và bàn giao khi khóa user | Kinh doanh + quản trị viên → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |
| [UAT-09 / 05](05-gia-ca.md) | Chế độ giá, kỳ hạn, VAT/phí theo nội dung đã duyệt | Người sửa giá → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |
| [UAT-10 / 05](05-gia-ca.md) | Sửa/ẩn giá đồng nhất các trang, chặn sửa trái quyền | Người sửa giá + người chỉ xem → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |
| [UAT-11 / 06](06-phat-hanh-g1.md) | Bàn giao và quyết định phát hành | Vận hành + các đầu mối nghiệp vụ → chủ dự án | Chưa giao | Chưa chạy | — |
| [UAT-12 / 07](07-g2-khach-hang.md) | Logo/story được duyệt, publish/archive | Người có quyền G2 đã chốt → phụ trách nội dung | Chưa giao | Chưa chạy | — |
| [UAT-13 / 08](08-g2-trang-va-cau-hinh.md) | Draft/live, cấu hình và privacy | Người có quyền G2 đã chốt → phụ trách nội dung/privacy | Chưa giao | Chưa chạy | — |
| [UAT-14 / 09](09-g2-dashboard-export-audit.md) | Chỉ số, biên ngày, CSV và audit | Người có quyền xem/export → phụ trách kinh doanh | Chưa giao | Chưa chạy | — |

## Ghi nhận lỗi và quyết định phát hành

Khi có lỗi, ghi: mã UAT, bước tái hiện, mong đợi/thực tế, mức ảnh hưởng, người xử lý, link lỗi, kết quả chạy lại. Không thêm dữ liệu nhạy cảm hoặc mật khẩu vào ghi nhận.

Trước phát hành G1, hoàn thành UAT-00–10 và dùng UAT-11 để ghi quyết định: người xác nhận, ngày, phiên bản, phạm vi mở/hoãn và lý do. Lỗi mất dữ liệu, sai quyền, sai giá hoặc không tiếp nhận được lead phải được xử lý trước khi mở chức năng bị ảnh hưởng. Phát hành một phần cần xác nhận phạm vi, vẫn giữ task bị hoãn là chưa hoàn thành.

Sau buổi kiểm tra, dọn dữ liệu và tài khoản thử theo runbook; giữ bằng chứng đã loại thông tin nhạy cảm.
