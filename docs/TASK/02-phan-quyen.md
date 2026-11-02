# 02 — Phân quyền, vai trò và nhân viên

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** Task 3 [API] → Task 4 [UI] · **Phụ thuộc:** 01

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** quản trị viên quản lý nhân viên và vai trò; mỗi nhân viên chỉ thao tác trong quyền được giao. Danh sách quyền là cố định, không có chức năng tự tạo permission.

| Vai trò mẫu | Thao tác nghiệp vụ theo seed G1 |
|---|---|
| Quản trị viên | Quản lý nhân viên, vai trò và toàn bộ chức năng; vai trò hệ thống không sửa/xóa |
| Biên tập viên | Xem/soạn/xuất bản/xóa bài theo trạng thái; quản lý ảnh; chỉ xem giá; không đọc lead/nhân viên |
| Kinh doanh | Xem/cập nhật lead, ghi chú và giao việc theo quyền; chỉ xem giá; không đọc bản nháp/ảnh/nhân viên |

**Quy tắc nghiệp vụ:** đây là vai trò mẫu của mục 6.6; xác nhận phân công thực tế trước seed, không ngầm thêm bước duyệt bài hai cấp. Khóa tài khoản không xóa lịch sử người thao tác; không cho mất Quản trị viên cuối cùng.

**Tình huống ngoại lệ:** vai trò còn người dùng không xóa được; quyền bị gỡ phải có hiệu lực ở request tiếp theo. Quy trình bàn giao lead khi khóa nhân viên còn chờ chốt tại task 04.

**Tiêu chí chấp nhận — UAT-02:** cho trước ba tài khoản theo ba vai trò; khi lần lượt đăng nhập và mở cả menu lẫn URL trực tiếp; thì chỉ đọc/sửa đúng phạm vi trên. **UAT-03:** khi quản trị viên khóa nhân viên đang đăng nhập, phiên của nhân viên mất hiệu lực, lịch sử thao tác vẫn còn.

## Task 3 [API] — Phân quyền, vai trò và nhân viên

**Files:** `src/modules/permissions/permissions.ts` (danh sách quyền cố định + nhãn), `src/modules/{roles,users}/`; migration Prisma `rbac`: model `AdminRolePermission` + khối `-- 02` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); `prisma/seed.ts` thêm Biên tập viên, Kinh doanh và quyền của chúng (mục 5.4); kiểm tra "Quản trị viên cuối cùng" dùng `$transaction` + `SELECT … FOR UPDATE` (mục 5.3); email mời/kích hoạt; `tests/rbac.test.ts`.

**Endpoints:** mục 6.6.

- [ ] Test mỗi endpoint admin trả 403 khi thiếu đúng quyền của nó (bảng endpoint → permission sinh tự động); Biên tập viên không đọc lead/users, Kinh doanh không đọc draft/media và không sửa giá.
- [ ] Test bỏ quyền khỏi vai trò → request tiếp theo của user đang đăng nhập bị 403; đổi vai trò/khóa user thu hồi phiên ngay.
- [ ] Test vai trò hệ thống không sửa/xóa (409 `SYSTEM_ROLE`), vai trò còn người dùng không xóa (409 `ROLE_IN_USE`), permission ngoài whitelist 422.
- [ ] Test không tự hạ quyền/khóa chính mình, hai request đồng thời không làm mất Quản trị viên cuối cùng, activation hết hạn/đã dùng không dùng lại được.
- [ ] Audit đủ hành động mục 6.6; commit `feat(api): roles and permissions`.

**Xong khi:** endpoint 6.6 chạy trên dev, `GET /admin/auth/session` trả `permissions` của user → mở Task 4.

## Task 4 [UI] — Màn nhân viên, vai trò và menu theo quyền

**Files:** `src/pages/users/`, `src/pages/roles/`, `src/auth/can.ts` (`can(permission)` đọc từ session), sidebar ẩn mục theo quyền; `tests/e2e/users-roles.spec.ts`.

**Dùng API:** Task 3.

- [ ] `/users`: danh sách, lọc vai trò/trạng thái, mời nhân viên, đổi vai trò, khóa/mở khóa, gửi lại link kích hoạt/đặt lại mật khẩu; xác nhận trước khi khóa.
- [ ] `/roles`: danh sách vai trò + số người dùng; `/roles/{id}` bảng tick quyền theo nhóm (mục 6.6); vai trò hệ thống chỉ xem.
- [ ] Màn kích hoạt tài khoản từ link email (đặt mật khẩu lần đầu).
- [ ] Hiện đúng lỗi `LAST_ADMIN`, `ROLE_IN_USE`, `SYSTEM_ROLE`, 409 version.
- [ ] e2e: Quản trị viên mời nhân viên vai trò Kinh doanh → nhân viên kích hoạt, đăng nhập → chỉ thấy menu thuộc quyền, vào thẳng URL khác bị 403.
- [ ] Commit `feat(admin): users and roles`.

**Xong khi:** tạo được nhân viên thật cho 3 vai trò trên staging → mở 03, 04, 05 (làm song song được).

