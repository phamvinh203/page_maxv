# 08 (G2) — Trang cố định và cấu hình website

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** [API] → [UI] → [Site] · **Phụ thuộc:** 06

## Task 18 — Trang cố định và cấu hình website

### Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** sửa nội dung các trang đã định nghĩa và cấu hình dùng chung; không có page builder hay tạo loại trang tùy ý.

**Quy tắc nghiệp vụ:** trang có draft/live riêng; lưu nháp không thay nội dung công khai. Giá vẫn thuộc pricing, logo/story thuộc resource riêng; không nhập lại các dữ liệu này vào nội dung trang. Privacy chỉ có một nguồn phiên bản khi chuyển từ G1 sang G2.

**Tình huống ngoại lệ:** schema sai không publish; người không có quyền không sửa/publish. Chốt trước Task 18 người duyệt thay đổi privacy, cách phối hợp cập nhật policyVersion giữa form/API và xử lý form đang mở theo lỗi consentVersion đã quy định.

**Tiêu chí chấp nhận — UAT-13:** cho trước trang đã publish; khi lưu draft thì live không đổi; khi publish hợp lệ thì live đổi. Cập nhật liên hệ phải đồng nhất các vị trí dùng chung; form mở với privacy cũ yêu cầu xác nhận bản mới trước khi tiếp nhận.

### Công việc triển khai

- [ ] **[API — trước triển khai]** Chốt bảng endpoint → quyền cho pages/settings, gồm lưu draft và publish; cập nhật whitelist quyền/SQL CHECK, seed và OpenAPI G2, sinh lại type. Nếu schema trang/cấu hình có ảnh, mở rộng `media_usages` và cập nhật tham chiếu cùng transaction; dùng migration mới, test ảnh đang dùng không xóa được. Test gọi trực tiếp API thiếu quyền trả 403.
- [ ] **[API]** `src/modules/{pages,settings}/` + schema riêng từng page key mục 7.3; endpoint mục 7.3/7.5. Test PUT draft không đổi live, publish schema sai bị chặn, key lạ 404, field lạ bị reject.
- [ ] **[UI]** `src/pages/pages/{key}` form theo schema từng trang (không có JSON editor tự do), `src/pages/settings/`.
- [ ] **[Site]** từng trang một: tách dữ liệu ra khỏi JSX → đọc `/public/pages/{key}`; `app/_lib/contact.ts`, `seo.ts`, footer, contact widget đọc `/public/site-config`. Kiểm tra hồi quy responsive/link/FAQ/CTA từng trang.

**Xong khi:** trên staging, lưu draft không đổi trang live, publish cập nhật đúng trang ở request tiếp theo; đổi liên hệ cập nhật đồng nhất footer, widget, trang liên hệ và JSON-LD Organization. Chuyển privacy theo mục 7.3 kế hoạch gốc, chỉ có một nguồn policyVersion. Lưu kết quả kiểm tra theo README.

