# 04 — Lead từ form liên hệ và form tư vấn

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** Task 10 [API] → Task 11 [UI] → Task 12 [Site] · **Phụ thuộc:** 02

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** nhận yêu cầu từ hai form và theo dõi xử lý; chưa quản lý cơ hội bán hàng, hợp đồng, doanh thu hay gộp lead tự động.

| Quy tắc | Hành vi đã có trong đặc tả |
|---|---|
| Tạo mới | Trạng thái `new`; lưu đúng nguồn form và bằng chứng consent |
| Đổi trạng thái | Có `leads.update`; các trạng thái `new/contacted/qualified/closed/spam`; chỉ admin được đưa lead ra khỏi spam |
| Giao việc | Người nhận đang active và có `leads.update`; không dùng tên/email tự nhập làm người phụ trách |
| Có thể trùng | So phone/email chuẩn hóa trong 30 ngày; cảnh báo, vẫn nhận yêu cầu; xử lý bằng ghi chú và đóng lead phụ, không merge |
| Ghi chú/hiệu chỉnh | Ghi chú chỉ thêm; sửa thông tin liên hệ cần lý do, không ghi đè âm thầm |
| Gửi lại | Retry cùng key và cùng nội dung trong 24 giờ trả cùng receipt, không tạo thêm lead |

**Chờ chốt trước Task 10:** ý nghĩa nghiệp vụ và điều kiện chuyển từng trạng thái (có bắt buộc ghi chú khi đóng/spam không); ai được đưa vào spam; bàn giao lead khi nhân viên bị khóa/nghỉ việc (giữ người cũ, bỏ giao hay chuyển người mới); người chịu trách nhiệm tiếp nhận lead chưa giao. Ghi tại mục 12.4, không tự tạo chức năng tự động phân công.

**Tình huống ngoại lệ:** consentVersion thay đổi thì báo cần đọc/xác nhận chính sách mới; lỗi mạng giữ dữ liệu và cho retry; cùng key nhưng đã sửa nội dung thì báo xung đột, không coi là retry hợp lệ. Khi SLA/giờ làm việc chưa chốt, chưa nghiệm thu nhãn quá hạn. Mốc 4 giờ trong kế hoạch gốc là giá trị dự kiến cần xác nhận cùng cách tính lịch làm việc.

**Tiêu chí chấp nhận — UAT-06:** cho trước dữ liệu thử hợp lệ và consent đúng phiên bản; khi gửi từng form; thì nhận xác nhận và thấy đúng nguồn ở dashboard. **UAT-07:** khi retry cùng yêu cầu sau mất phản hồi; thì chỉ có một lead. **UAT-08:** khi Kinh doanh đổi trạng thái, giao người hợp lệ và thêm ghi chú; thì tải lại vẫn giữ dữ liệu và đúng người thao tác. Kiểm tra bàn giao khi khóa người nhận theo quyết định đã chốt, không mặc định tự giao lại.

## Task 10 [API] — Nhận và quản lý lead

**Files:** `src/modules/leads/{routes,service,schema}.ts`, migration Prisma `leads`: model `Lead`, `LeadNote`, `LeadRequest`, `ConsentRecord` + khối `-- 04` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); replay `Idempotency-Key` bắt `P2002` trên `lead_requests`; email lưu chữ thường; CORS cho `POST /public/leads` đúng origin website; `tests/leads.test.ts`.

**Endpoints:** mục 6.4 và `POST /public/leads` mục 6.5.

- [ ] Chốt SLA theo topic (cách tính giờ làm việc/ngoài giờ), retention và quy trình hiệu chỉnh/xóa theo README trước khi viết logic tương ứng; ghi quyết định ở mục 12.4 kế hoạch gốc. Tìm kiếm dùng `f_unaccent` từ Task 1, không chờ migration posts của Task 7.

- [ ] Test thiếu consent/type sai/email sai/productKey ngoài whitelist bị reject; `consult` thiếu productKey bị reject; phone giữ số 0; trường password bị strip.
- [ ] Test idempotency: `Promise.all` 5 request cùng key → đúng 1 lead, 4 replay cùng receiptId; cùng key khác payload 409.
- [ ] Test rate limit theo IP thật (giả `X-Forwarded-For` không vượt được), store chia sẻ; honeypot không rỗng trả 201 giả không tạo lead; consentVersion sai 409.
- [ ] Test đánh dấu lead trùng 30 ngày, lead quá hạn; PATCH hiệu chỉnh phone kèm reason lưu giá trị gốc vào audit; note actor lấy từ session.
- [ ] Test CORS: origin website được phép, origin lạ không có ACAO; `/admin/leads` không mở CORS.
- [ ] Commit `feat(api): lead capture and management`.

**Xong khi:** gửi lead bằng công cụ HTTP và đọc được qua `/admin/leads` → mở Task 11.

## Task 11 [UI] — Màn xử lý lead

**Files:** `src/pages/leads/{list,detail}.tsx`, `src/components/lead-status-badge.tsx`; `tests/e2e/leads.spec.ts`.

**Dùng API:** Task 10.

- [ ] `/leads`: lọc loại (liên hệ/tư vấn), chủ đề, sản phẩm, trạng thái, người phụ trách, khoảng ngày (giờ Việt Nam → UTC); tìm tên/SĐT/email/công ty (G1 không thu thập MST); lead quá hạn và "có thể trùng" nổi bật; `ho-tro` lên đầu mặc định.
- [ ] `/leads/{id}`: thông tin khách, nguồn form/trang, UTM, consent; đổi trạng thái, giao người xử lý (chỉ nhân viên có `leads.update`); ghi chú append-only; danh sách lead trùng tiềm năng; hiệu chỉnh thông tin liên hệ bắt buộc nhập lý do.
- [ ] Ẩn thao tác khi thiếu `leads.update`; 409 version giữ thay đổi đang nhập.
- [ ] e2e: tạo lead qua API → Kinh doanh thấy trong danh sách → ghi chú, đổi trạng thái → reload không mất.
- [ ] Commit `feat(admin): lead inbox`.

**Xong khi:** nhân viên Kinh doanh xử lý được lead trên staging → mở Task 12.

## Task 12 [Site] — Nối form liên hệ và form tư vấn HKD

**Files (`page_maxv`):** `app/lien-he/page.tsx` + form client nhỏ `app/lien-he/_components/contact-form.tsx`; `app/san-pham/maxv-hkd/_components/consultation-form.tsx` (bỏ `mailto:`); dùng chung `app/_lib/submit-lead.ts` (sinh Idempotency-Key, retry cùng key, map lỗi); trang `/chinh-sach-bao-mat` thật; `tests/e2e/lead-forms.spec.ts`.

**Dùng API:** `POST /public/leads` qua `NEXT_PUBLIC_MAXV_API_URL`.

- [ ] Form liên hệ gửi `type=contact`, option "Sản phẩm quan tâm" dùng productKey slug; form HKD gửi `type=consult`, `productKey="maxv-hkd"`, `industry`.
- [ ] Trạng thái pending/thành công/lỗi/retry; lỗi mạng giữ dữ liệu đã nhập và retry cùng key; honeypot `website` ẩn; consent + consentVersion.
- [ ] Bỏ `disabled` nút gửi ở `/lien-he` chỉ khi API production, trang privacy và Task 11 đã sẵn sàng.
- [ ] e2e: gửi từng form trên staging → thấy thông báo thành công → lead hiện ở dashboard đúng nguồn.
- [ ] Commit `feat(site): submit contact and consultation forms to API`.

**Xong khi:** lead từ cả 2 form hiện ở dashboard staging → 04 hoàn tất.

