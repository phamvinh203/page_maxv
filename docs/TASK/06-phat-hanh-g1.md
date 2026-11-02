# 06 — Phát hành G1

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Phụ thuộc:** 03, 04, 05

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** bàn giao G1 để nhân viên vận hành với dữ liệu được duyệt. Test kỹ thuật đạt chưa thay cho xác nhận nghiệp vụ.

**Quy tắc nghiệp vụ:** chủ dự án chỉ định người ký xác nhận UAT, người nhập/duyệt giá và nội dung, người nhận lead và người trực xử lý sự cố. Dùng [UAT.md](UAT.md) để ghi kết quả; giá, privacy và người tiếp nhận lead phải sẵn sàng trước bật form.

**Tình huống ngoại lệ:** nếu không nhận/đọc được lead, lộ dữ liệu sai quyền, hiển thị sai giá đã duyệt hoặc thiếu đầu vào bắt buộc thì chưa phát hành phần bị ảnh hưởng. Nếu cần phát hành từng phần, chủ dự án xác nhận rõ phần mở/phần hoãn và cách ẩn CTA liên quan; không âm thầm đánh dấu toàn bộ G1 hoàn tất.

**Tiêu chí chấp nhận — UAT-11:** cho trước kết quả UAT G1 và dữ liệu phát hành đã duyệt; khi chủ dự án cùng vận hành kiểm tra bàn giao; thì có quyết định phát hành/hoãn, người tiếp nhận lead, đầu mối sự cố và bằng chứng smoke test. Không ghi đạt nếu còn tình huống G1 bị chặn.

## Task 16 — Phát hành G1

**Files:** `maxv-api/docs/runbook.md`, `docs/release-checklist.md`, CI/CD cả 3 repo; `tests/e2e/smoke.spec.ts` ở `maxv-admin` và `page_maxv`.

- [ ] OpenAPI khớp implementation; mọi endpoint admin có auth + quyền + CSRF; type ở dashboard/website sinh lại không lệch.
- [ ] `prisma migrate deploy` chạy hết migration trên DB sạch giống production; `prisma migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --script` rỗng (không drift).
- [ ] Chạy test API trên DB sạch + migration + seed; e2e dashboard với ít nhất 2 session và 3 vai trò; e2e website production build.
- [ ] Production: cookie Secure qua HTTPS, proxy `/api/v1/admin` đúng, CORS đúng mục 3.3, security headers, health 503 khi DB down, axe-core trên form public và dashboard.
- [ ] Hiệu năng: listing 1.000 bài seed < 2s (P75), search `q` < 2s, upload ảnh 5 MiB < 10s.
- [ ] Backup/restore production theo [thiet-ke-api-db.md](thiet-ke-api-db.md) mục 4.5: timer backup hằng ngày đã chạy thành công, cảnh báo khi lỗi hoạt động (giả lập đích backup không truy cập được trên staging, không làm hỏng kho backup thật), khôi phục thử DB + ảnh lên staging đạt RTO ≤ 4 giờ và reconcile báo 0 ảnh thiếu file; redeploy API không mất ảnh (thư mục ngoài code/volume).
- [ ] Runbook ghi commit phát hành của cả 3 repo, bản backup trước triển khai và thứ tự migration → API → admin/site. Trên staging, thử quay về code trước với schema đã mở rộng, giữ nguyên dữ liệu nhập sau triển khai; nếu không tương thích thì dùng migration sửa tiến, không xóa dữ liệu để đảo migration. Khôi phục backup là xử lý sự cố riêng, phải ghi rõ khoảng dữ liệu có thể mất.
- [ ] Server Windows: quét cổng từ ngoài chỉ thấy 80/443 (và RDP từ IP quản trị); `4000`, `5432` không truy cập được từ ngoài; service `maxv-api` tự chạy lại sau khi reboot server; IIS trả 404 cho `api.maxv.vn/api/v1/admin/*` và cho file `.tmp`/`web.config` ở `media.maxv.vn`; rate limit thấy đúng IP khách (không kèm port).
- [ ] Bật form lead công khai sau khi DB, privacy, rate limit và màn lead đều sẵn sàng; nghiệm thu mục 12.3.
- [ ] Kiểm tra các quyết định đến hạn trong README đã có người xác nhận và ngày chốt ở mục 12.4: privacy/retention, giá và nội dung thật, admin dự phòng, câu chữ dùng thử, xử lý link tra cứu MST. Quyết định chỉ phục vụ G2 có thể giữ chờ, không tự kéo thêm chức năng vào G1.

**Xong khi:** mọi kiểm tra trên đạt và có bằng chứng theo README; smoke test production sau phát hành đạt đăng nhập admin, đọc bài/giá và gửi lead thử từ cả hai form; ghi nhận và dọn lead thử theo quy trình vận hành.

