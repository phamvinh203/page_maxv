# TASK — MaxV Admin

**Dành cho người sử dụng/chủ dự án:** [Chức năng dự kiến bàn giao và cách sử dụng](CHUC-NANG-VA-CACH-SU-DUNG.md).

Đây là **kế hoạch công việc sẽ triển khai**, không phải báo cáo hệ thống đã có. Các đường dẫn, endpoint, migration và bài test trong task là đầu ra cần tạo hoặc sửa khi thực hiện; schema/SQL đính kèm là bản thiết kế tham chiếu. Kết quả kiểm tra bản thiết kế không thay cho nghiệm thu code và môi trường triển khai.

Mỗi file là **một chức năng**, gồm đủ các bước theo thứ tự cố định: **[API]** trong `maxv-api` → **[UI]** trong `maxv-admin` → **[Site]** trong `page_maxv` (nếu chức năng có phần công khai). Bước sau chỉ bắt đầu khi bước trước đạt mục "Xong khi".

**Thiết kế bảng PostgreSQL, request/response, lưu ảnh, Prisma:** [thiet-ke-api-db.md](thiet-ke-api-db.md). Schema Prisma và SQL CHECK để copy vào `maxv-api`: [prisma/schema.prisma](prisma/schema.prisma), [prisma/checks.sql](prisma/checks.sql).

Đặc tả còn lại (quy ước API, quy tắc bảo mật) nằm trong kế hoạch gốc [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md); các tham chiếu "mục N" trong các file task trỏ tới file đó.

## 3 repo

| Repo | Công nghệ | Vai trò |
|---|---|---|
| `maxv-api` | Node.js + TypeScript, Prisma, PostgreSQL | Service API mới, giữ toàn bộ dữ liệu và quyền |
| `maxv-admin` | React SPA | Dashboard quản trị, chỉ gọi `/api/v1/admin/*` |
| `page_maxv` | Next.js (repo này) | Website, chỉ gọi `/api/v1/public/*`; không còn giá/bài viết cứng trong code |

## Thứ tự

| File | Chức năng | Chuỗi | Phụ thuộc |
|---|---|---|---|
| [00-chuan-bi.md](00-chuan-bi.md) | Hạ tầng, tạo repo, OpenAPI G1 | Task 0 | — |
| [01-dang-nhap-admin.md](01-dang-nhap-admin.md) | Đăng nhập admin, khung dashboard | Task 1 [API] → 2 [UI] | 00 |
| [02-phan-quyen.md](02-phan-quyen.md) | Phân quyền, vai trò, nhân viên | Task 3 [API] → 4 [UI] | 01 |
| [03-bai-viet-seo.md](03-bai-viet-seo.md) | Ảnh, bài viết, SEO, `/tin-tuc` | Task 5 [API] → 6 [UI] → 7 [API] → 8 [UI] → 9 [Site] | 02 |
| [04-lead.md](04-lead.md) | Lead từ form liên hệ và form tư vấn HKD | Task 10 [API] → 11 [UI] → 12 [Site] | 02 |
| [05-gia-ca.md](05-gia-ca.md) | Giá 5 phần mềm, `/bang-gia`, trang chủ | Task 13 [API] → 14 [UI] → 15 [Site] | 02 |
| [06-phat-hanh-g1.md](06-phat-hanh-g1.md) | Nghiệm thu và bật production G1 | Task 16 | 03, 04, 05 |
| [07-g2-khach-hang.md](07-g2-khach-hang.md) | Logo, câu chuyện khách hàng | Task 17 [API → UI → Site] | 06 |
| [08-g2-trang-va-cau-hinh.md](08-g2-trang-va-cau-hinh.md) | Trang cố định, cấu hình website | Task 18 [API → UI → Site] | 06 |
| [09-g2-dashboard-export-audit.md](09-g2-dashboard-export-audit.md) | Dashboard số liệu, export, nhật ký | Task 19 [API → UI] | 06 |

```
00 → 01 → 02 ─┬→ 03 ─┐
              ├→ 04 ─┼→ 06 → 07, 08, 09 (G2)
              └→ 05 ─┘
```

03, 04, 05 độc lập nhau, làm song song được nếu đủ người; trong mỗi file vẫn giữ đúng thứ tự API → UI → Site.

Hàm tìm kiếm dùng chung `f_unaccent` được tạo từ Task 1, trước khi tách ba nhánh. Nếu nhiều người làm song song, phải tích hợp migration và schema chung trước khi nghiệm thu; không sửa migration đã áp.

## Quyết định cần chốt

Danh sách câu hỏi giữ tại [mục 12.4 kế hoạch gốc](../superpowers/plans/2026-10-21-maxv-admin.md). Bảng dưới xác định thời điểm chốt, không mặc định các câu hỏi đã có đáp án. Khi bắt đầu task liên quan, ghi tên người phụ trách thực tế, quyết định và ngày chốt vào mục 12.4; phần không phụ thuộc vẫn có thể làm trước.

| Quyết định | Người phụ trách chốt | Chốt trước |
|---|---|---|
| Staging, nơi backup ngoài server | Người vận hành | Hoàn tất Task 0 |
| Email provider và địa chỉ gửi reset/kích hoạt | Người vận hành + chủ dự án | Tích hợp email Task 1, dùng lại ở Task 3 |
| Nhân sự và vai trò | Chủ dự án | Seed và nghiệm thu Task 3–4 |
| Cách chọn giá trang chủ | Người phụ trách kinh doanh | Đóng băng hợp đồng pricing ở Task 0; nếu chưa chốt thì để phần pricing của OpenAPI chờ duyệt, chưa mở Task 13 |
| SLA theo topic, giờ làm việc và phạm vi email thông báo lead | Người phụ trách kinh doanh | Logic lead quá hạn ở Task 10 |
| Privacy, thời hạn lưu dữ liệu và quy trình hiệu chỉnh/xóa | Chủ dự án + người phụ trách pháp lý | Thiết kế xử lý dữ liệu Task 10; duyệt trước bật form Task 16 |
| Giá thật, nội dung và quyền dùng logo/lời chứng thực | Người phụ trách nội dung/kinh doanh | Nghiệm thu Task 14–16; logo/story trước publish Task 17 |
| Admin dự phòng, câu chữ dùng thử và link tra cứu MST | Chủ dự án + người vận hành/kinh doanh | Nghiệm thu phát hành Task 16 |

## Cách dùng phần nghiệp vụ và UAT

Các mục nghiệp vụ bổ sung trong mỗi file diễn giải phạm vi đã có, không mở thêm tính năng. Quy tắc ghi **chờ chốt** chưa được phép dùng làm yêu cầu chính thức; chốt tại mục 12.4 kế hoạch gốc, rồi đồng bộ task, hợp đồng API và thiết kế DB nếu có thay đổi.

[UAT.md](UAT.md) là bảng nghiệm thu của người dùng nghiệp vụ, khác với test tự động của dev. Mỗi tình huống có mã để truy ngược về task; người được giao phải bổ sung tên thực tế, kết quả và bằng chứng khi chạy. Chỉ chạy tình huống có đầu vào đã chốt; không ghi đạt cho tình huống đang bị chặn.

Các quyết định chi tiết bổ sung (chuyển trạng thái/bàn giao lead, VAT/kỳ hạn, ẩn logo/story, privacy G2 và định nghĩa chỉ số) được theo dõi tại mục 12.4, câu 13–17. Vai trò được giao trong bảng UAT chịu trách nhiệm phối hợp chốt trước task tương ứng; đây chưa phải quyết định đã duyệt.

## Ghi nhận tiến độ

Giữ `- [ ]` cho việc dự kiến; chỉ đánh dấu `- [x]` sau khi thực hiện và kiểm tra đạt. Một file xong khi mọi checkbox đã tick và mục "Xong khi" cuối file đạt ở môi trường được chỉ định (dev, staging hoặc production). Không tick chỉ vì đã viết xong đặc tả.

Khi bàn giao, ghi ngay cuối task: người phụ trách, commit của từng repo liên quan, ngày/môi trường kiểm tra, lệnh kiểm tra và kết quả (hoặc link CI). Không ghi secret hay dữ liệu khách hàng thật. Checkbox chưa tick chỉ có nghĩa là chưa có xác nhận trong tài liệu, không chứng minh code chưa tồn tại.

## Khi tài liệu lệch nhau

- Tên cột, kiểu dữ liệu và JSON: theo [thiet-ke-api-db.md](thiet-ke-api-db.md); giữ schema Prisma, SQL CHECK và ví dụ request/response đồng bộ khi sửa.
- Phạm vi, nghiệp vụ và bảo mật: theo kế hoạch gốc; các file task mô tả thứ tự thực hiện và nghiệm thu, không tự thay đổi hợp đồng.
- Nếu hai nguồn trên còn mâu thuẫn, ghi rõ điểm cần chốt và sửa các tài liệu liên quan trước khi code phần đó. Khi đã có OpenAPI ở `maxv-api`, cập nhật cùng thay đổi và sinh lại type cho hai giao diện.
