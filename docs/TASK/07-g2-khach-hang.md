# 07 (G2) — Logo và câu chuyện khách hàng

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** [API] → [UI] → [Site] · **Phụ thuộc:** 06 (dùng lại block editor, bộ chọn ảnh của 03)

## Task 17 — Logo và câu chuyện khách hàng

### Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** quản lý logo và câu chuyện được phép công khai; tái sử dụng media/editor, không thêm quy trình xin phép tự động.

**Quy tắc nghiệp vụ:** người phụ trách nội dung xác nhận quyền dùng logo/lời chứng thực trước bật visible/publish; nội dung mẫu giữ draft. Khôi phục story về draft; không tự công khai. Chốt quyền thao tác trước triển khai API theo checklist bên dưới.

**Tình huống ngoại lệ:** khách hàng đang có story không xóa được; ảnh đang dùng không xóa được. Chờ chốt trước Task 17: ẩn logo khách hàng có làm ẩn story đang publish hay không; thể hiện rõ trong mục 12.4 và test, không tự coi hai trạng thái là một.

**Tiêu chí chấp nhận — UAT-12:** cho trước logo/story có xác nhận nội dung; khi publish rồi archive story; thì website và sitemap hiện/ẩn đúng; logo hidden không hiện ở trang chủ; kiểm tra quan hệ ẩn khách hàng/story theo quyết định đã chốt.

### Công việc triển khai

- [ ] **[API — trước triển khai]** Chốt bảng endpoint → quyền cho customers/customer-stories (gồm quyền publish); cập nhật danh sách quyền, SQL CHECK, seed và OpenAPI G2 trước khi sinh type. Migration mở rộng `media_usages` cho logo, ảnh bìa và ảnh nội dung theo các giá trị đã chốt; test ảnh đang được tham chiếu không xóa được và endpoint thiếu quyền trả 403. Không sửa migration G1 đã áp.
- [ ] **[API]** `src/modules/{customers,customer-stories}/`, migration, endpoint mục 7.1/7.2. Test logo hidden không ra public, customer có story không xóa được, archived story 404, URL không đổi sau publish.
- [ ] **[UI]** `src/pages/customers/`, `src/pages/customer-stories/` (dùng lại block editor Task 8, media picker Task 6).
- [ ] **[Site]** sửa `app/_components/home/customer-trust.tsx`, `customer-stories.tsx`; tạo trang `/khach-hang/*` thật, xóa entry placeholder trong `app/[...slug]/page.tsx`, cập nhật sitemap. Câu chuyện mẫu giữ draft.

**Xong khi:** trên staging, admin tạo logo và story → publish → website và sitemap thấy story ở request tiếp theo; archive → trang chi tiết 404 và story biến khỏi listing/sitemap; logo hidden không hiện ở trang chủ. Lưu kết quả kiểm tra theo README.

