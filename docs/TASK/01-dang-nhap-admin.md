# 01 — Đăng nhập admin và khung dashboard

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** Task 1 [API] → Task 2 [UI] · **Phụ thuộc:** 00

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** nhân viên truy cập dashboard bằng tài khoản admin riêng; không dùng tài khoản khách hàng của `be_maxv`.

**Quy tắc nghiệp vụ:** tài khoản bootstrap phải đổi mật khẩu trước khi làm việc; đăng xuất/đổi mật khẩu thu hồi phiên theo đặc tả. Quên mật khẩu dùng thông báo chung, không tiết lộ email có tài khoản hay không.

**Tình huống ngoại lệ:** link reset hết hạn/đã dùng không đặt lại được mật khẩu. Khi phiên hết hạn trong lúc nhập form, thông báo rõ và giữ nội dung đang nhập theo Task 2; không tự lưu thay đổi khi đăng nhập lại.

**Tiêu chí chấp nhận — UAT-01:** cho trước tài khoản bootstrap; khi đăng nhập lần đầu; thì phải đổi mật khẩu trước khi vào chức năng khác. Sau đăng xuất, quay lại URL quản trị không được đọc dữ liệu; link reset đã dùng không dùng lần hai.

## Task 1 [API] — Khung API, database, xác thực admin

**Files:** `src/lib/{db,auth,errors,audit}.ts`, `src/modules/auth/`, migration Prisma `auth`: model `AdminRole`, `AdminUser`, `AdminSession`, `AdminToken`, `AuditLog`, `RateLimit` + khối `-- 01` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); `prisma/seed.ts` tạo vai trò "Quản trị viên"; `scripts/bootstrap-admin.ts`, `scripts/reset-admin-password.ts`; middleware security headers, Origin/CSRF check, rate limit dùng store chia sẻ; `GET /api/v1/health`, `/health/ready`; `tests/auth.test.ts`.

**Endpoints:** mục 6.1 (`login`, `session`, `logout`, `change-password`, `forgot-password`, `reset-password`).

- [ ] Migration `auth` tạo hàm tìm kiếm dùng chung `f_unaccent` sau khi có extension `unaccent` (lấy riêng phần hàm từ khối `-- 03` của `checks.sql`, không lấy CHECK media/posts); Task 7 không tạo lại. Kiểm tra hàm chạy được trên DB sạch để Task 10 không phụ thuộc task bài viết.
- [ ] Chốt email provider/địa chỉ gửi theo README; cấu hình môi trường test gửi tới hộp thư thử, kiểm tra link reset nhận được và lỗi gửi không lộ tài khoản có tồn tại hay không.

**Interfaces:** `requireSession(req): AdminSession`; `requirePermission(p: Permission)` (Task 3 bổ sung bảng quyền, Task 1 tạm cho Quản trị viên mọi quyền); `AdminSession={userId,roleId,permissions,sessionId}`; error envelope mục 4.1.

- [ ] Test chưa login gọi API admin nhận 401, sai CSRF/Origin nhận 403, login sai có thông báo chung, logout thu hồi session, phiên hết hạn không đọc được dữ liệu.
- [ ] Test idle expiry 30 phút (`lastActivityAt` cách 31 phút → 401), polling `GET session` không kéo dài phiên; login sinh session token mới.
- [ ] Test reset token một lần, hết hạn 15 phút; đổi mật khẩu thu hồi mọi session.
- [ ] Test rate limit login (6 lần sai → 429 kèm `Retry-After`), lockout tích lũy kèm audit `AUTH_LOCKOUT`; cross-site POST ngay sau login bị Origin check chặn.
- [ ] Test bootstrap: admin đầu tiên ở `must_change_password`, bị chặn API khác tới khi đổi mật khẩu; break-glass `reset-admin-password` chạy được (môi trường thử).
- [ ] Env fail-fast; security headers có ở production build; health trả 503 khi DB down.
- [ ] Cập nhật OpenAPI nếu có lệch; commit `feat(api): admin authentication`.

**Xong khi:** gọi được các endpoint 6.1 trên dev bằng công cụ HTTP, test xanh → mở Task 2.

## Task 2 [UI] — Khung dashboard, đăng nhập và tài khoản

**Files:** khởi tạo `maxv-admin` (Vite + React + TypeScript + Tailwind + radix-ui), `src/api/client.ts`, `src/auth/session-context.tsx`, `src/layouts/{auth-layout,app-layout}.tsx`, `src/pages/{login,forgot-password,reset-password,account}/`, cấu hình proxy dev `/api/v1/admin` → API dev; `tests/e2e/auth.spec.ts`.

**Dùng API:** Task 1.

- [ ] `client.ts`: luôn `credentials: "include"`, gắn `X-CSRF-Token` cho mutation, 401 → về `/login` giữ đường dẫn quay lại, 403 → trang 403, 409 → trả lỗi cho form tự xử lý, 429 → hiện thời gian chờ.
- [ ] Layout app: sidebar + header (tên user, đăng xuất), trang 403/404, thông báo phiên hết hạn không mất nội dung form đang nhập.
- [ ] Màn đăng nhập, quên/đặt lại mật khẩu, đổi mật khẩu (`/account`), màn bắt buộc đổi mật khẩu lần đầu.
- [ ] Không lưu token/PII vào localStorage; CSRF token chỉ trong bộ nhớ.
- [ ] e2e: login → thấy layout → logout; login sai → thông báo chung; phiên hết hạn → về login → login lại quay đúng trang.
- [ ] Build file tĩnh, chạy sau reverse proxy staging; commit `feat(admin): app shell and authentication`.

**Xong khi:** đăng nhập dashboard trên staging bằng tài khoản bootstrap → mở Task 3 ([02-phan-quyen.md](02-phan-quyen.md)).

