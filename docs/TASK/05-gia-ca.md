# 05 — Giá cả theo phần mềm và /bang-gia

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** Task 13 [API] → Task 14 [UI] → Task 15 [Site] · **Phụ thuộc:** 02

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** kinh doanh cung cấp dữ liệu giá marketing đã duyệt, người có `pricing.edit` cập nhật; website dùng cùng nguồn giá. Không phải checkout và không thay đổi giá giao dịch ở `be_maxv`.

**Quy tắc nghiệp vụ:** gói mới mặc định ẩn; `fixed` là giá cố định > 0, `from` là giá từ > 0, `free` là miễn phí = 0, `contact` không có số tiền. Kỳ hạn hiển thị theo dữ liệu, không tự đổi giá năm thành giá tháng. Sửa giá gói đang hiện cần xem trước/xác nhận; sau lưu thành công có hiệu lực ở request tiếp theo, chưa có lịch hiệu lực tương lai.

**Chờ chốt trước hợp đồng pricing:** giá gồm/chưa gồm VAT, cách ghi phí khởi tạo/phí bổ sung, ý nghĩa giá "Từ" và cách chọn giá trang chủ khi các gói khác kỳ hạn. Ưu tiên ghi thông tin bằng `notes/specs` đã có; chỉ thêm trường/schema khi nghiệp vụ được duyệt thực sự cần. Không tự suy ra thuế suất hay xây bộ tính thuế.

**Tình huống ngoại lệ:** ẩn sản phẩm thì các gói không ra public; sản phẩm không có gói visible không hiện mục giá. API lỗi hiện liên hệ báo giá, không hiển thị 0đ thay thế. Hai người sửa cùng gói thì báo xung đột, không ghi đè.

**Tiêu chí chấp nhận — UAT-09:** cho trước bốn gói thử tương ứng bốn chế độ giá; khi xem trang sản phẩm và bảng giá; thì số tiền, kỳ hạn và ghi chú khớp dữ liệu đã duyệt. **UAT-10:** khi sửa giá hoặc ẩn gói trên admin; thì trang sản phẩm, bảng giá và trang chủ phản ánh đúng ở request tiếp theo theo phương án giá trang chủ đã chốt; tài khoản chỉ xem giá không sửa được.

**Quyết định 27/10/2026:**

- Giá không còn nằm trong code `page_maxv`. Toàn bộ gói và giá do admin nhập trên dashboard; không seed giá từ code.
- `/bang-gia` không có bộ gói riêng. Trang chỉ gom gói của 5 phần mềm ở `/san-pham/*`, lần lượt theo thứ tự admin sắp. 4 gói Dùng thử/Cơ bản/Chuyên nghiệp/Toàn diện trong `app/_data/pricing.ts` bị bỏ; nếu cần, admin tạo lại thành gói của phần mềm tương ứng.

## Task 13 [API] — Giá cả theo phần mềm

**Files:** `src/modules/pricing/{routes,service,schema}.ts`, migration Prisma `pricing`: model `PricingProduct`, `PricingPlan` + khối `-- 05` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); `priceAmount` là `BigInt`, DTO đổi sang `Number` (mục 5.3); `prisma/seed.ts` thêm chỉ 5 phần mềm (`maxv-accounting`, `maxv-hddt`, `maxv-hkd`, `chu-ky-so`, `hoa-don-dien-tu`), không seed gói; `tests/pricing.test.ts`.

**Endpoints:** mục 6.7.

- [ ] Trước khi code, xác nhận cách chọn giá trang chủ đã chốt ở mục 12.4; đồng bộ schema/DTO/OpenAPI và test theo đúng một phương án được duyệt. Không tự thêm cả hai cơ chế chọn giá.

- [ ] Test fixed/from > 0, free = 0, contact = null; số âm/float/chuỗi 422; CTA `javascript:` 422.
- [ ] Test gói hidden và phần mềm hidden không ra public API; `GET /public/pricing` theo `sortOrder` phần mềm rồi `sortOrder` gói; phần mềm chưa có gói visible không có trong `/public/pricing`.
- [ ] Test chỉ `pricing.view` không sửa được (403); version cũ 409; audit ghi giá cũ/mới.
- [ ] Commit `feat(api): product pricing`.

**Xong khi:** seed có đúng 5 phần mềm và không có gói; `/public/pricing` trả danh sách rỗng khi chưa nhập gói visible; test tạo gói bằng fixture riêng đọc được giá qua API → mở Task 14.

## Task 14 [UI] — Màn giá cả

**Files:** `src/pages/pricing/{products,product}.tsx`, `src/components/plan-form.tsx`, `src/components/price-preview.tsx`, `src/lib/format-price.ts`; `tests/e2e/pricing.spec.ts`.

**Dùng API:** Task 13.

- [ ] `/pricing`: 5 phần mềm, sắp xếp thứ tự hiển thị trên `/bang-gia`, bật/tắt từng phần mềm.
- [ ] `/pricing/{key}`: tiêu đề, mô tả, ghi chú; bảng gói (thêm/sửa/ẩn/xóa, thứ tự, nổi bật); form gói theo PlanInput (chế độ giá, số tiền định dạng khi nhập, kỳ hạn, thông số, tính năng, nút bấm).
- [ ] Xem trước bảng giá của phần mềm như trên website trước khi lưu; xác nhận khi bật hiện gói hoặc đổi giá gói đang hiện.
- [ ] Ẩn nút sửa khi chỉ có `pricing.view`.
- [ ] e2e: sửa giá MV01 → lưu → `/public/pricing` trả giá mới.
- [ ] Commit `feat(admin): pricing management`.

- [ ] Nhập giá thật cho các phần mềm trên staging (người phụ trách kinh doanh xác nhận) để Task 15 có dữ liệu so sánh giao diện.

**Xong khi:** chỉnh được giá cả 5 phần mềm trên dashboard staging → mở Task 15.

## Task 15 [Site] — Nối giá 5 trang sản phẩm, `/bang-gia` và trang chủ

**Files (`page_maxv`):** `app/_components/sections/price-plans.tsx` + `app/_lib/format-price.ts` dùng chung; sửa `app/bang-gia/page.tsx`, `app/san-pham/maxv-accounting/_components/plan-accounting.tsx`, `app/san-pham/maxv-hkd/_components/pricing.tsx` (tách giá khỏi JSX), các trang `maxv-hddt`, `chu-ky-so`, `hoa-don-dien-tu`, khối giá trang chủ (`app/_components/home/pricing.tsx`); xóa mọi giá trong code: `plans`/`pricing.price` ở `app/_data/pricing.ts`, `accountingPricing.plans`/`extraDataset` ở `app/san-pham/maxv-accounting/data.ts`, mảng giá trong `maxv-hkd/_components/pricing.tsx` (chỉ giữ tiêu đề/nhãn UI tĩnh nếu chưa chuyển sang API); `tests/e2e/pricing.spec.ts`.

**Dùng API:** `GET /public/pricing`, `/public/pricing/{key}`.

- [ ] Giao diện từng trang giữ nguyên: chụp ảnh trước/sau ở desktop và mobile để so sánh (dùng giá đã nhập ở Task 14).
- [ ] Sau task này `grep` giá (`000`, `price`) trong `app/` không còn số tiền cứng nào.
- [ ] API lỗi/timeout: mục giá hiện "Liên hệ để nhận báo giá" kèm link `/lien-he`, không làm hỏng cả trang.
- [ ] `/bang-gia` render lần lượt từng phần mềm visible theo thứ tự, phần mềm không có gói visible không hiện section.
- [ ] Trang sản phẩm chưa có gói visible ẩn mục giá; trang chủ hiện giá "Từ …" theo quyết định mục 12.4.
- [ ] Test production: sửa giá trên dashboard → trang sản phẩm, `/bang-gia`, trang chủ thấy giá mới ở request tiếp theo; ẩn gói → biến mất.
- [ ] Commit `feat(site): render pricing from API`.

**Xong khi:** cả 5 trang + `/bang-gia` + trang chủ đọc giá từ API trên staging → 05 hoàn tất.

