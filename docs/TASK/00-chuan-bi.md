# 00 — Chuẩn bị hạ tầng và hợp đồng API

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Repo:** `maxv-api`, `maxv-admin`, `page_maxv` · **Phụ thuộc:** không

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** chuẩn bị môi trường và hợp đồng chung để ba repo triển khai cùng một yêu cầu; chưa bàn giao chức năng quản trị hoàn chỉnh.

**Quy tắc nghiệp vụ:** chủ dự án chỉ định người chốt nghiệp vụ, giá, nội dung và vận hành. Quyết định đến hạn phải có tên người xác nhận; thông số kỹ thuật do dev/vận hành thống nhất trong phạm vi đã duyệt.

**Tình huống ngoại lệ:** thiếu email provider chỉ chặn tích hợp email; chưa chốt pricing chỉ chặn duyệt phần hợp đồng pricing. Staging chưa tách được dữ liệu production thì chưa cho nghiệm thu có ghi dữ liệu.

**Tiêu chí chấp nhận — UAT-00:** cho trước cấu hình staging riêng; khi deploy khung ứng dụng và ghi dữ liệu thử; thì xác nhận dữ liệu chỉ xuất hiện ở môi trường thử, có người chịu trách nhiệm vận hành và danh sách quyết định còn mở có task bị chặn rõ ràng.

## Task 0 — Chốt hạ tầng, tạo repo và đóng băng hợp đồng G1

**Repo:** tạo `maxv-api`, `maxv-admin`; `page_maxv` chỉ thêm `.env.example`.

- [ ] API là service Node.js mới `maxv-api` (đã chốt 27/10/2026), tách hẳn khỏi `be_maxv`; ghi rõ resource nào thuộc `maxv-api`, resource nào thuộc `be_maxv` (tài khoản khách hàng).
- [ ] Chọn framework HTTP Node.js, thư viện session/password hash được duy trì, image decoder (`sharp`); không tự chế crypto/session. **ORM: Prisma** (chốt 27/10/2026), ghim `prisma@6` + `@prisma/client@6` — nâng major chỉ sau khi đọc migration guide và chạy lại kiểm tra ở [thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.
- [ ] **Bảo mật server trước tiên** (Windows Server 2019, mục 3.5 kế hoạch gốc): bật Windows Defender Firewall mọi profile (ảnh chụp cấu hình cho thấy đang báo lỗi), inbound chỉ 80/443, RDP chỉ IP quản trị/VPN; bật Windows Update bản vá bảo mật.
- [ ] Cài PostgreSQL bản Windows (data dir ổ D:, `listen_addresses = 'localhost'`), Node.js LTS, IIS + URL Rewrite + ARR (bật proxy, `includePortInXForwardedFor = false`, cho phép server variable `HTTP_X_FORWARDED_PROTO`), WinSW cho service `maxv-api` chạy bằng `svc-maxv-api`.
- [ ] Tạo 3 site IIS + chứng chỉ TLS: `admin.maxv.vn` (file tĩnh + rewrite `/api/v1/admin`), `api.maxv.vn` (chỉ `/api/v1/public`, `/api/v1/health`), `media.maxv.vn` theo mục 3.5 kế hoạch gốc.
- [ ] Ảnh lưu trên ổ đĩa server (chốt 27/10/2026): tạo `D:\maxv-media\media`, phân quyền NTFS (`icacls`), loại trừ Defender, đặt `web.config` site `media.maxv.vn` theo [thiet-ke-api-db.md](thiet-ke-api-db.md) mục 4.1–4.3; thử mở một ảnh mẫu và một file `.tmp` (phải 404).
- [ ] Chốt nơi chứa backup ngoài server; cài `restic.exe`, `env.ps1`, `maxv-backup.ps1`, `maxv-backup-check.ps1` (UTF-8 có BOM) và 2 task Task Scheduler theo mục 4.5; chạy thử một lần backup và một lần khôi phục.
- [ ] Khởi tạo Prisma trong `maxv-api`: `prisma/schema.prisma` chỉ có `generator` + `datasource` (copy từ [prisma/schema.prisma](prisma/schema.prisma)), `src/lib/db.ts` một `PrismaClient` dùng chung, các script `db:migrate`, `db:migrate:create`, `db:deploy`, `db:seed`, `db:reset:test` theo mục 5.1. Model và migration thêm dần ở từng task API theo [thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2.
- [ ] Chốt domain/proxy theo mục 3.3 (`admin.maxv.vn` + proxy `/api/v1/admin`, domain API public) và ghi lại trong `maxv-api/README.md`.
- [ ] Chốt staging chạy cùng server hay máy riêng; tạo domain/site, service, DB, tài khoản DB, thư mục ảnh và cấu hình riêng với production. Deploy khung API/admin lên staging qua HTTPS; xác nhận kết nối chỉ đến DB/media staging, không gửi email thử tới khách thật; chặn index và giới hạn truy cập staging.
- [ ] Viết `maxv-api/openapi.yaml` (OpenAPI 3.1) cho mọi endpoint G1 mục 4–6 + health, kèm example/enum/error; validate bằng validator đã chọn. Không viết endpoint G2/G3 trong G1.
- [ ] Thiết lập sinh type từ OpenAPI cho `maxv-admin/src/api/types.ts` và `page_maxv/app/_lib/api-types.ts`.
- [ ] Chốt test stack: API — Vitest + gọi HTTP vào app in-process kèm cookie/CSRF; Admin — Vitest + Testing Library cho component, Playwright e2e chạy với API dev; Site — Playwright. CI: Node + service PostgreSQL.
- [ ] Hạ tầng test DB: `TEST_DATABASE_URL` riêng, `npm run db:reset:test` (`prisma migrate reset --force` = drop + migration + seed) trước bộ integration, test-bootstrap assert không trỏ production. CI chạy `prisma migrate deploy` + kiểm tra drift rỗng.
- [ ] `.env.example` cho cả 3 repo, không secret.

**Xong khi:** 2 repo chạy được khung ứng dụng ở dev và staging; kết nối thử DB staging thành công, cấu hình tách production; backup/restore thử đạt; CI chạy được. OpenAPI G1 được duyệt sau khi chốt các đầu vào ở README; phần chưa chốt phải ghi rõ và chặn task phụ thuộc. Health kiểm tra DB đầy đủ sẽ được bổ sung ở Task 1, không yêu cầu hoàn tất auth ở Task 0.

