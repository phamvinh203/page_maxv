# MaxV Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Đây là kế hoạch đề xuất để anh review, chưa phải hệ thống đã triển khai.

**Goal:** Vận hành nội dung website MaxV, xuất bản tin tức, tiếp nhận yêu cầu khách hàng và quản lý thông tin giới thiệu bằng admin có xác thực và dữ liệu lưu bền vững.

**Architecture:** Đề xuất admin cùng ứng dụng Next.js, API cùng origin tại `/api/v1`, database PostgreSQL và object storage cho ảnh. Server Components gọi service phía server trực tiếp; trình duyệt gọi Route Handlers; không gọi vòng HTTP vào chính ứng dụng. Website sản phẩm kế toán và hệ thống tài khoản sử dụng phần mềm là hệ thống bên ngoài, chỉ tích hợp khi có hợp đồng API thực tế.

**Tech Stack:** Next.js 16.4.0, React 19.3.0, TypeScript, Tailwind và UI components hiện có; PostgreSQL/object storage là hạ tầng đề xuất mới. Chưa chọn thư viện auth, database client hay nhà cung cấp storage vì cần đối chiếu hạ tầng đang vận hành trước khi cài dependency.

**Spec:** Yêu cầu của anh trong phiên làm việc ngày 21/10/2026 và phạm vi chức năng, hợp đồng API trong các mục 1–12 của tài liệu này. Tài liệu kết hợp đặc tả và checklist triển khai để frontend/backend dùng chung một hợp đồng.

**Revision 21/10/2026 (sau review đồng thời bởi backend/security/BA/QA):** sửa lệch hiện trạng (`/dang-ky` thay vì `/dung-thu`), thêm bảng `modules`/`consent_records`, mục security headers + CORS + health check, siết lockout admin và anti-spam lead, chính sách cookie/CSRF chặt hơn, index search, quy ước migration/seed, preview bản chưa lưu, hiệu chỉnh lead có kiểm soát, chốt test stack ở Task 0 và bổ sung test case; các câu hỏi mở gom ở mục 12.4.

## Global Constraints

- Chưa thay đổi code sản phẩm, cài dependency, tạo database hay triển khai dịch vụ trong bước lập kế hoạch.
- Đọc hướng dẫn Next.js tại `node_modules/next/dist/docs/` trước khi triển khai; project bật `cacheComponents` và `partialPrefetching`.
- Kiểm tra phiên và quyền ở mọi API/service quản trị; layout và ẩn nút không thay thế kiểm tra quyền.
- Không trả mật khẩu, session token, reset token, storage secret hoặc dữ liệu lead trong API công khai/log.
- Không dùng file TypeScript, JSON trong repo hoặc localStorage làm nơi lưu dữ liệu vận hành.
- Không đổi URL công khai hiện có khi di chuyển layout hoặc nguồn dữ liệu.
- Giai đoạn 1 chỉ có tài khoản `admin`; phân quyền `editor`/`sales` thuộc giai đoạn mở rộng được mô tả riêng.
- Mốc thời gian lưu UTC, hiển thị giờ Việt Nam `Asia/Ho_Chi_Minh`; ngày bài viết cũ `YYYY-MM-DD` giữ nguyên ý nghĩa ngày khi migrate.
- Không commit `.env.local`; tài liệu chỉ mô tả tên biến môi trường, không ghi giá trị bí mật.
- Security headers bắt buộc mọi response: HSTS ở production, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` cho admin/API, CSP khởi điểm `default-src 'self'; object-src 'none'; base-uri 'self'` điều chỉnh img-src theo media domain; triển khai qua `headers()` trong `next.config.ts` và kiểm tra ở production build.
- CORS mặc định từ chối: `/api/v1` không trả `Access-Control-Allow-Origin`; OPTIONS cross-origin trả 404; cấm mở ACAO kèm credentials; nếu bắt buộc mở sau này phải kèm `Vary: Origin`.
- Ứng dụng validate biến môi trường bắt buộc khi khởi động (fail-fast, liệt kê biến thiếu); thiếu `NEXT_PUBLIC_SITE_URL` hiện làm lỗi runtime toàn site, không chỉ SEO.

## Review Focus

1. Khách chưa đăng nhập gọi trực tiếp API hoặc đoán UUID không đọc được bản nháp, lead, audit log.
2. Hai người sửa cùng nội dung: yêu cầu cũ nhận `409`, không ghi đè thay đổi mới.
3. Gỡ/xóa bài sau khi đã cache: danh sách, URL chi tiết, sitemap và metadata không còn công khai bài đó.
4. Upload giả MIME, file ảnh lỗi, SVG có script và file quá lớn không được lưu như ảnh hợp lệ.
5. Form gửi lại do mạng lỗi không tạo nhiều lead; lỗi gửi email không làm mất lead đã lưu.

## 1. Hiện trạng và mục tiêu

| Nguồn hiện tại | Hiện trạng quan sát được | Đích cần đạt |
|---|---|---|
| `app/_data/news.ts` | 5 chuyên mục cố định, `newsPosts = []`, nội dung là `string[]` | Database bài viết, nội dung có cấu trúc, trạng thái xuất bản |
| `app/tin-tuc/_components/news-listing.tsx` | Đọc mảng, phân trang 9 bài, tìm kiếm disabled | Query bài đã xuất bản, tìm kiếm/phân trang server |
| `app/tin-tuc/[category]/[id]/page.tsx` | Tìm bài trong mảng; metadata và JSON-LD dựa vào bài | Query chung cho trang/SEO; bản nháp không công khai |
| `app/tin-tuc/_components/news-article.tsx` | Đọc lại mảng để lấy bài liên quan | Nhận bài và bài liên quan từ service |
| `app/lien-he/page.tsx` | Form hiển thị, submit disabled | Lưu yêu cầu tư vấn/hỗ trợ/hợp tác |
| `app/dang-ky/page.tsx` (URL `/dang-ky`) | Form đăng ký chưa nối backend; có trường mật khẩu, chưa có company/taxCode/chọn module | Giai đoạn đầu tiếp nhận yêu cầu dùng thử, chưa cấp tài khoản sản phẩm; giữ nguyên URL `/dang-ky` |
| `app/dang-nhap/page.tsx`, `app/quen-mat-khau/page.tsx` | Giao diện tài khoản khách hàng, chưa có auth | Giữ tách biệt với đăng nhập quản trị |
| `app/_data/customers.ts`, `customer-stories.ts` | Logo trong code, câu chuyện có nội dung mẫu | Quản lý nội dung đã được duyệt; không tự xuất bản mẫu |
| `app/_data/pricing.ts` | Một số giá chưa xác nhận | Quản lý giá hiển thị; không mặc định đây là giá thanh toán sản phẩm |
| `app/_lib/contact.ts`, `seo.ts` | Thông tin liên hệ/SEO trong code | Cấu hình nội dung; domain triển khai vẫn ở biến môi trường |
| `app/layout.tsx` | Header/footer/widget bao toàn ứng dụng | Layout website riêng, layout admin riêng |
| `app/sitemap.ts`, `app/robots.ts` | Sitemap tĩnh; root mặc định noindex | Sitemap lấy nội dung published; admin luôn noindex |
| `app/[...slug]/page.tsx` | Nhiều đường dẫn là placeholder | Chỉ mở trang thật khi có renderer và nội dung hợp lệ |

Ghi chú hiện trạng bổ sung: link header `/tra-cuu-mst` (`app/_lib/navigation.ts`) chưa có trang lẫn catch-all entry nên đang 404 — gỡ khỏi nav hoặc thêm placeholder trong đợt triển khai. Các nhóm URL `/giai-phap`, `/tinh-nang`, `/tai-nguyen`, `/tuyen-dung` (dữ liệu ở `app/_data/industry-solutions.ts`, `features.ts`) là placeholder không thuộc 8 key pages mục 7.3 và chưa có resource quản lý; giữ nguyên, nâng cấp theo đặc tả riêng khi có nhu cầu.

Thành công nghĩa là: người vận hành đăng nhập, đăng bài không sửa code, bài hiện ở website và sitemap; khách gửi form thành công, nhân viên thấy và cập nhật xử lý; thay đổi tồn tại qua deploy/restart.

## 2. Phạm vi và giai đoạn

### G1 — Admin dùng được ngay

- Đăng nhập/đăng xuất, xem phiên, đổi mật khẩu, khôi phục mật khẩu admin.
- Bài viết: danh sách, bộ lọc, tạo/sửa, nháp/xuất bản/gỡ xuất bản/lưu trữ, preview.
- Giữ cố định 5 chuyên mục hiện có; chỉ API đọc danh mục, chưa làm CRUD chuyên mục.
- Ảnh: upload, chọn, alt, danh sách, xóa ảnh chưa dùng.
- Lead từ liên hệ và yêu cầu dùng thử; ghi chú, trạng thái, tìm kiếm, chống gửi trùng.
- SEO bài viết và sitemap tự cập nhật; audit log cơ bản.
- Một quyền admin, tài khoản đầu tiên tạo qua lệnh vận hành an toàn, không có đăng ký admin công khai.
- Khuyến nghị tạo 2 tài khoản admin từ G1 (một tài khoản dự phòng, mật khẩu giữ trong kho kín), kèm lệnh vận hành break-glass đặt lại mật khẩu admin khi mất quyền truy cập email.
- Đánh dấu lead trùng tiềm năng (so khớp phone/email 30 ngày gần nhất) và lead `new` quá hạn chưa xử lý để nổi bật trong UI; cân nhắc email thông báo lead mới (đơn giản, không automation) — chốt ở mục 12.4 trước Task 5.

### G2 — Nhân viên tự cập nhật nội dung website

- Logo khách hàng, câu chuyện khách hàng và lời chứng thực.
- Nội dung trang chủ, giới thiệu, 4 trang sản phẩm, bảng giá, chính sách bảo mật.
- Cấu hình liên hệ, kênh mạng xã hội, SEO mặc định.
- Gói giá/module phục vụ hiển thị marketing.
- Dashboard số liệu nội bộ, xuất lead, quản lý tài khoản/role, audit log UI.

### G3 — Chỉ triển khai khi có nhu cầu và hệ thống nguồn

- Tạo tài khoản dùng thử thật trên backend MaxV.
- Đăng nhập/khôi phục mật khẩu khách hàng theo cơ chế của sản phẩm.
- Gửi email tự động theo nhu cầu, tích hợp CRM hoặc thông báo nội bộ.
- Kho tài liệu/hỗ trợ nghiệp vụ/tuyển dụng/tra cứu MST cần đặc tả riêng; các URL hiện là placeholder không đủ để suy ra nghiệp vụ.
- Lịch đăng bài, lịch sử phiên bản có khôi phục và quy trình duyệt nhiều cấp chưa thuộc G1/G2.

## 3. Quyết định kiến trúc

### 3.1 Các phương án

| Phương án | Ưu điểm | Chi phí/ràng buộc |
|---|---|---|
| Admin + API trong Next.js (đề xuất cho repo này) | Cùng origin, cùng kiểu dữ liệu/service, ít thành phần triển khai | Cần bổ sung database/auth/storage và vận hành backup |
| API trong backend MaxV đang có | Có thể tận dụng tài khoản, DB, vận hành sẵn | Chưa được xem backend; cần xác định quyền sở hữu dữ liệu và cơ chế auth trước |
| Headless CMS | Có sẵn giao diện biên tập/quản lý ảnh | Lead và tích hợp sản phẩm vẫn cần xử lý; phụ thuộc schema và cơ chế auth CMS |

Danh sách REST dưới đây là hợp đồng logic. Nếu backend MaxV sở hữu các resource này thì chuyển phần xử lý sang backend đó; Next.js chỉ làm frontend/BFF khi cần, không tạo hai database cùng sở hữu một dữ liệu.

### 3.2 Luồng xử lý

`Admin UI → /api/v1/admin/* → xác thực + quyền + validation → service → DB/storage`

`Public UI → /api/v1/public/* → validation + rate limit → service → DB`

`Public Server Component → service chỉ đọc published → DB → render/metadata/sitemap`

Mutation nội dung thực hiện: xác thực → kiểm tra dữ liệu/version → transaction lưu + audit → commit → invalidation cache. Lỗi cache không rollback dữ liệu đã commit; hệ thống phải có retry vận hành và cache hết hạn hữu hạn.

### 3.3 Layout

- Root layout chỉ giữ HTML/body/font/global metadata và CSS.
- Di chuyển các page công khai và catch-all vào `app/(site)/`; `(site)/layout.tsx` giữ Header/Footer/ContactWidget và main/skip link hiện có.
- `app/admin/login`, `forgot-password`, `reset-password` nằm ngoài layout bảo vệ.
- `app/admin/(protected)/layout.tsx` bọc nội dung cần session bằng Suspense theo tài liệu Next.js cài tại máy; không render dữ liệu riêng tư trong shell tĩnh.
- `app/_components`, `app/_data`, `app/_lib` vẫn giữ nguyên để giảm thay đổi import.
- `app/api`, `app/robots.ts`, `app/sitemap.ts`, ảnh metadata có thể giữ root. Kiểm tra lại canonical và đường dẫn tương đối sau khi di chuyển.

## 4. Quy ước API chung

### 4.1 URL, phân trang, response

- Prefix `/api/v1`; danh sách endpoint trong các bảng bên dưới viết đủ prefix.
- UUID là ID nội bộ; slug là định danh URL công khai, không phải UUID.
- JSON camelCase; thời gian ISO 8601 UTC; text UTF-8; request JSON tối đa 1 MiB trừ upload.
- Pagination: `page=1`, `pageSize=20`, tối đa 100. Bài công khai mặc định `pageSize=9`.
- `q`: trim, tối đa 200 ký tự. `sort` chỉ nhận whitelist từng resource; mặc định theo bảng resource.
- Bộ lọc nhiều giá trị dùng lặp tham số; tham số không hỗ trợ trả `422`, không đưa tên cột tùy ý vào SQL.
- `page`/`pageSize` không hợp lệ (không phải số nguyên dương, vượt mức tối đa) trả `422`; `page` vượt `totalPages` trả `200` với `data` rỗng và `meta` phản ánh đúng thực tế, không trả 404.

```json
{
  "data": [],
  "meta": { "page": 1, "pageSize": 20, "total": 0, "totalPages": 0 }
}
```

Chi tiết/create/update trả `{ "data": { ... } }`. Delete/logout thành công trả `204` không body. Create resource trả `201`; tiếp nhận lead trả `201`; export CSV trả file. Không bọc payload JSON cho response CSV.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu chưa hợp lệ.",
    "fields": { "title": "Tiêu đề tối đa 200 ký tự." },
    "requestId": "opaque-request-id"
  }
}
```

| HTTP | Code điển hình | Ý nghĩa |
|---|---|---|
| 400 | `INVALID_JSON` | Không parse được JSON |
| 401 | `UNAUTHENTICATED` | Chưa đăng nhập/phiên hết hạn |
| 403 | `FORBIDDEN`, `CSRF_FAILED` | Không có quyền hoặc nguồn request không hợp lệ |
| 404 | `NOT_FOUND` | Không tồn tại; cũng dùng cho bài chưa publish trong API public |
| 409 | `VERSION_CONFLICT`, `SLUG_CONFLICT`, `MEDIA_IN_USE`, `LAST_ADMIN`, `CONSENT_VERSION_CHANGED`, `IDEMPOTENCY_PAYLOAD_MISMATCH` | Xung đột dữ liệu/nghiệp vụ |
| 413 | `PAYLOAD_TOO_LARGE` | Vượt dung lượng |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Content-Type/file không hỗ trợ |
| 422 | `VALIDATION_ERROR`, `INVALID_STATE_TRANSITION` | Sai trường/trạng thái |
| 428 | `PRECONDITION_REQUIRED` | Mutation DELETE đòi `If-Match` mà request không gửi |
| 429 | `RATE_LIMITED` | Quá giới hạn; có `Retry-After` |
| 500/503 | `INTERNAL_ERROR`, `SERVICE_UNAVAILABLE` | Không lộ stack/query/secret; ghi requestId để tra log |

### 4.2 Quyền, phiên và đồng thời

- Cookie session tên `__Host-maxv_session`: HttpOnly, Secure, SameSite=Lax, Path=/ (prefix `__Host-` buộc Secure và chặn cookie từ subdomain); session server-side có thể thu hồi. Không lưu token vào localStorage.
- Phiên admin hết hạn sau 8 giờ, hết hạn do không hoạt động sau 30 phút; kiểm tra idle ở request đã xác thực, không cho polling tự kéo dài vô hạn.
- Mutation dùng JSON hoặc multipart, kiểm tra Origin cùng origin; yêu cầu CSRF token gắn với session qua header `X-CSRF-Token`. Login cũng kiểm tra Origin, chỉ nhận JSON.
- `GET /admin/auth/session` trả thông tin người dùng và CSRF token; token không phải session secret, không ghi log.
- Login luôn sinh session token mới, không tái sử dụng identifier nào từ request trước login (chống session fixation). CSRF token là random ≥128-bit gắn với session, rotate khi login và khi đổi mật khẩu, một token active mỗi session, vô hiệu khi logout.
- Có test regression cho ngoại lệ SameSite=Lax+POST (cookie mới set trong 2 phút vẫn được gửi kèm cross-site POST top-level): Origin check phải chặn ở mọi route mutation, kể cả khi một route quên kiểm tra.
- G1 chỉ `admin`; G2 `editor` quản lý nội dung/media, `sales` xử lý lead, `admin` toàn quyền. Preview cần quyền nội dung; sales không đọc draft.
- Record chỉnh sửa có `version` số nguyên. PATCH/PUT và hành động publish/archive/delete phải gửi version hiện đọc; update atomically `WHERE id AND version`, tăng version khi thành công.
- JSON mutation gửi `version` trong body; DELETE gửi `If-Match: "<version>"`. Không cho version của client thay đổi timestamp/actor.
- `Cache-Control: private, no-store` với mọi response auth/admin/preview/lead; không dùng shared cache cho session hoặc PII.

### 4.3 Health check

- `GET /api/v1/health`: public, không auth, không PII; trả `200` khi ứng dụng sống, `503` kèm tên dependency hỏng khi mất kết nối database. `GET /api/v1/health/ready` kiểm tra thêm storage để làm deployment gate. Không trả phiên bản/stack chi tiết.

## 5. Mô hình dữ liệu

Các bảng có UUID, createdAt, updatedAt trừ bảng liên kết. Nội dung có createdBy/updatedBy/version. Foreign key và unique constraint là bắt buộc ở DB, không chỉ kiểm tra trong UI.

| Bảng | Trường chính | Ràng buộc và index |
|---|---|---|
| `admin_users` | email, displayName, passwordHash/providerId, role, status | Email normalize lowercase unique; role admin/editor/sales; status active/disabled |
| `admin_sessions` | userId, tokenHash, expiresAt, lastActivityAt | Không lưu raw token; index tokenHash, expiresAt; thu hồi khi disable/reset mật khẩu |
| `admin_password_resets` | userId, tokenHash, expiresAt, usedAt | Token một lần, hết hạn 15 phút; không lưu raw token |
| `news_categories` | slug, label, description, sortOrder | Seed 5 slug hiện tại; G1/G2 không thêm/xóa/đổi slug |
| `posts` | categoryId, slug, title, excerpt, content, coverMediaId, featured, state, publishedAt, firstPublishedAt, seoTitle, seoDescription, version | Slug unique trong category; state draft/published/archived; index state+publishedAt, categoryId+state+publishedAt, GIN pg_trgm+unaccent cho tìm kiếm title/excerpt/content |
| `media` | storageKey, originalName, mimeType, sizeBytes, width, height, alt, status, uploadedBy | storageKey unique; status ready/deleting; URL dẫn xuất từ storageKey, không tin URL client gửi |
| `media_usages` | mediaId, resourceType, resourceId, field | Unique theo bộ trường; update trong transaction cùng nội dung; chặn xóa ảnh đang dùng |
| `leads` | type, topic, name, phone, email, company, taxCode, productKeys, message, sourcePath, utm, consentAt, consentVersion, status, assignedTo, version | type contact/trial; status new/contacted/qualified/closed/spam; index createdAt, status, assignedTo, pg_trgm các cột tìm kiếm (name/phone/email/company/taxCode); PII không public |
| `lead_notes` | leadId, authorId, body | Append-only, index leadId+createdAt; không cho chỉnh lịch sử ngầm |
| `lead_requests` | idempotencyKeyHash, payloadHash, ipHash, leadId, expiresAt | Unique key; lưu 24 giờ để chống retry trùng; ipHash (SHA-256 + pepper) chỉ phục vụ rate limit, không lưu raw IP |
| `consent_records` | leadRefHash, type, sourcePath, consentAt, consentVersion | Append-only bằng chứng đồng ý tách khỏi lead; chỉ lưu hash tham chiếu (không PII trực tiếp); retention dài hơn lead (đề xuất 3 năm), không xóa theo yêu cầu xóa PII của chủ dữ liệu |
| `customers` | name, logoMediaId, websiteUrl, sortOrder, visible, version | URL https/http hợp lệ; className từ code không phải trường editable |
| `customer_stories` | customerId, slug, title, excerpt, content, heroMediaId, results, testimonial, state, publishedAt, version | Slug unique; chỉ renderer hỗ trợ mới cho publish |
| `pages` | key, draftContent, publishedContent, draftSeo, publishedSeo, publishedAt, version | key whitelist cố định; sửa draft không đổi website live |
| `marketing_plans` | key, name, audience, priceAmount, currency, billingPeriod, priceMode, moduleKeys, featured, sortOrder, visible, version | key unique; priceMode free/fixed/from/contact; currency VND; giá lưu integer đồng |
| `modules` | key, label, shortLabel, comingSoon, sortOrder, version | key unique; seed 5 key hiện có trong `app/_data/pricing.ts`; `marketing_plans.moduleKeys` tham chiếu key của bảng này |
| `site_settings` | key, value, version | key cố định contact/social/seo; từng value có schema riêng |
| `audit_logs` | actorId, action, resourceType, resourceId, changedFields, requestId, result | Append-only; không lưu raw password/token/lead message hoặc snapshot PII; index (actorId, createdAt) và (resourceType, resourceId, createdAt) |

Email/password có thể do thư viện/provider auth sở hữu schema; không tạo bảng auth trùng nếu chọn provider. Các resource nghiệp vụ giữ hợp đồng tương đương.

### 5.1 Nội dung bài viết và trang

- Không nhận HTML tùy ý, script, iframe hoặc class Tailwind từ admin.
- Nội dung bài viết là danh sách block có schema: `paragraph { text }`, `heading { level: 2|3, text }`, `list { ordered, items: string[] }`, `image { mediaId, alt, caption? }`, `link { text, href }`.
- Tối đa 200 block/bài, 100.000 ký tự tổng văn bản, heading/paragraph không được rỗng. Link chỉ http/https hoặc đường dẫn nội bộ bắt đầu `/` nhưng không `//`.
- React render text escape mặc định; không dùng `dangerouslySetInnerHTML`. Khi cần rich text phức tạp phải có schema/sanitizer và test riêng trước khi mở định dạng.
- Trang marketing dùng section schema tương ứng từng trang hiện có, không tạo page builder tổng quát. Icon là key whitelist ánh xạ sang lucide trong code; không lưu React component trong DB.
- Bảng `pages` quản lý hero/features/FAQ/CTA theo trang. Giá lấy từ `marketing_plans`; liên hệ lấy từ settings; logo/câu chuyện lấy resource tương ứng. Không lưu hai bản cùng trường ở nhiều nguồn.

### 5.2 Xuất bản và URL

- Bài mới luôn draft. Publish phải có title, category hợp lệ, slug, excerpt, nội dung có text, cover ảnh ready với alt và SEO hợp lệ.
- `draft → published`, `published → draft` (unpublish), `draft|published → archived`, `archived → draft` (restore).
- PATCH bài published chỉnh bản live ngay và yêu cầu xác nhận UI; không có draft song song cho bài đã publish trong G1. Nếu cần chỉnh chưa công khai phải unpublish trước. Trang marketing G2 có draft/published riêng vì thường xuyên sửa trang đang hoạt động.
- Preview bản chưa lưu (stateless): `POST /api/v1/admin/posts/{id}/preview` nhận payload như PATCH (validate đầy đủ), trả DTO preview render từ nội dung gửi lên mà không ghi DB — cho phép xem trước bản sửa của bài published trước khi PATCH live. Runbook sửa khẩn cấp: lỗi hiển thị nhỏ → PATCH sau khi preview stateless; nội dung nghiêm trọng → unpublish ngay rồi sửa.
- `publishedAt` là lần xuất bản gần nhất, `firstPublishedAt` giữ lần đầu để JSON-LD datePublished; updatedAt dùng dateModified.
- Chặn thay slug/category của bài hoặc story đã từng publish. Tránh phát sinh URL chết; tính năng đổi URL+301 chỉ thêm khi có yêu cầu thực tế.
- `DELETE` chỉ xóa cứng record draft chưa từng publish hoặc archived chưa từng publish. Nội dung từng publish chỉ lưu trữ để giữ lịch sử. Gỡ công khai trả 404 ở URL public; không tự redirect về trang chủ.

### 5.3 Migration, seed và index search

- Một công cụ migration duy nhất cho toàn dự án; migration chạy bằng lệnh vận hành/CI trước khi roll code, ứng dụng không tự chạy migration khi start. Theo kiểu expand-contract: thêm cột/bảng trước, backfill, mới siết constraint; mỗi migration có rollback tương ứng.
- Seed idempotent bằng UPSERT theo slug/key (5 category, 5 module, marketing plans ở trạng thái hidden); chạy lại không tạo bản sao.
- Search tiếng Việt: pg_trgm + unaccent, GIN trgm index cho `posts` và các cột tìm kiếm của `leads`; index `audit_logs` theo mục 5.

## 6. Danh sách API G1 — bắt buộc

### 6.1 Xác thực admin

| Method | Endpoint | Input | Output / quy tắc |
|---|---|---|---|
| POST | `/api/v1/admin/auth/login` | email, password | 200 user + csrfToken; set cookie; sai thông tin trả 401 chung |
| GET | `/api/v1/admin/auth/session` | Cookie | 200 user {id,email,displayName,role}, csrfToken, expiresAt; không có session trả 401 |
| POST | `/api/v1/admin/auth/logout` | CSRF header | Thu hồi phiên hiện tại, clear cookie, 204; gọi lại vẫn 204 |
| POST | `/api/v1/admin/auth/change-password` | currentPassword, newPassword | 204; xác minh mật khẩu cũ, thu hồi mọi phiên, buộc login lại |
| POST | `/api/v1/admin/auth/forgot-password` | email | 202 cùng thông báo cho email có/không tồn tại; gửi reset qua provider email |
| POST | `/api/v1/admin/auth/reset-password` | token, newPassword | 204; token hết hạn/đã dùng trả lỗi chung; thu hồi mọi session |

Giới hạn bắt buộc trước khi bật endpoint (không còn là "đề xuất"): login 5 lần thất bại/15 phút theo IP+email và 30/IP/15 phút; forgot-password 3/email/giờ và 10/IP/giờ; dùng kho rate limit chia sẻ giữa các instance. Ngoài chiều IP, bắt buộc lockout tích lũy theo account: 10 lần sai liên tiếp khóa 15 phút, lũy tiến (30 phút, 1 giờ...), gửi email cảnh báo cho admin và ghi audit `AUTH_LOCKOUT`; mở khóa bằng chờ hết hạn hoặc reset-password — chống dò mật khẩu phân tán qua botnet vào tài khoản duy nhất. Cân nhắc 2FA (TOTP) cho admin: khuyến nghị mạnh từ G1, đánh giá bắt buộc ở G2 khi có nhiều user. Mật khẩu admin 12–128 ký tự, không trim/cắt ngầm. Không mở endpoint register admin. Lệnh bootstrap đọc email/password từ đầu vào kín, không đưa password vào argv hoặc log; chỉ chạy khi chưa có admin, và tài khoản tạo xong ở trạng thái `must_change_password` — bị chặn mọi API khác cho tới khi đổi mật khẩu lần đầu. Có thêm lệnh vận hành break-glass `reset-admin-password` (đầu vào kín, yêu cầu quyền truy cập hạ tầng, có audit) dùng khi mất quyền truy cập email của admin.

### 6.2 Chuyên mục và bài viết

| Method | Endpoint | Query/body | Chức năng |
|---|---|---|---|
| GET | `/api/v1/admin/news-categories` | Không | 5 category có id, slug, label, description, sortOrder |
| GET | `/api/v1/admin/posts` | q, categoryId, state, featured, page, pageSize, sort | Danh sách mọi trạng thái; sort updatedAt:desc mặc định, title:asc hoặc publishedAt:desc |
| POST | `/api/v1/admin/posts` | PostCreate | Tạo draft; 201 record |
| GET | `/api/v1/admin/posts/{id}` | UUID | Chi tiết đầy đủ gồm block, SEO, version |
| PATCH | `/api/v1/admin/posts/{id}` | PostPatch + version | Cập nhật field cho phép; không nhận state/actor/timestamp |
| POST | `/api/v1/admin/posts/{id}/publish` | version | Kiểm tra điều kiện, xuất bản, trả record mới |
| POST | `/api/v1/admin/posts/{id}/unpublish` | version | Về draft; loại khỏi mọi truy vấn public |
| POST | `/api/v1/admin/posts/{id}/archive` | version | Lưu trữ, gỡ công khai |
| POST | `/api/v1/admin/posts/{id}/restore` | version | Archived về draft |
| DELETE | `/api/v1/admin/posts/{id}` | If-Match version | Xóa cứng theo quy tắc mục 5.2; 204 |
| GET | `/api/v1/admin/posts/{id}/preview` | Cookie | DTO preview riêng tư; UI `/admin/posts/{id}/preview` render bằng renderer bài public |
| POST | `/api/v1/admin/posts/{id}/preview` | Payload như PostPatch | Preview bản chưa lưu (stateless), validate như PATCH, không ghi DB; xem trước bản sửa bài published |

PostCreate: `title` bắt buộc 1–200 ký tự; `categoryId` UUID bắt buộc; `slug` bắt buộc dạng `[a-z0-9]+(-[a-z0-9]+)*`, tối đa 160; `excerpt` tối đa 500; `content` danh sách block, draft cho rỗng; `coverMediaId` nullable; `featured` mặc định false; `seoTitle` tối đa 70; `seoDescription` tối đa 170. SEO có thể bỏ trống để fallback title/excerpt. Publish yêu cầu excerpt có nội dung. Slug tự gợi ý ở UI từ tiêu đề nhưng server kiểm tra uniqueness, không tự đổi slug khi sửa title.

Ví dụ tạo bài:

```json
{
  "title": "Hướng dẫn đồng bộ hóa đơn điện tử",
  "categoryId": "UUID-cua-tai-chinh-ke-toan",
  "slug": "huong-dan-dong-bo-hoa-don-dien-tu",
  "excerpt": "Các bước kết nối và đồng bộ hóa đơn trên MaxV.",
  "content": [{ "type": "paragraph", "text": "Nội dung đã được biên tập." }],
  "coverMediaId": "UUID-anh-da-upload",
  "featured": false,
  "seoTitle": "Hướng dẫn đồng bộ hóa đơn điện tử | MaxV",
  "seoDescription": "Hướng dẫn kết nối và kiểm tra dữ liệu hóa đơn trên MaxV."
}
```

Các chuỗi UUID trong ví dụ là nhãn minh họa, request thật phải dùng UUID hợp lệ.

### 6.3 Media

| Method | Endpoint | Input | Chức năng |
|---|---|---|---|
| POST | `/api/v1/admin/media` | multipart `file`, `alt` | Upload server-side lên object storage, 201 media |
| GET | `/api/v1/admin/media` | q theo tên/alt, page, pageSize | Danh sách ảnh ready, sort createdAt:desc |
| GET | `/api/v1/admin/media/{id}` | UUID | Metadata + usageCount + usage references admin được phép đọc |
| PATCH | `/api/v1/admin/media/{id}` | alt, version | Sửa alt, không thay binary tại cùng storageKey |
| DELETE | `/api/v1/admin/media/{id}` | If-Match version | Chỉ ảnh không được tham chiếu; đang dùng trả 409 |

- G1 nhận JPEG/PNG/WebP tối đa 5 MiB, 4096×4096 và tối đa 16 triệu pixel, alt 1–250 ký tự. Reject SVG/GIF/file executable, tên đường dẫn và MIME giả; kiểm tra magic bytes và decode ảnh phía server. SVG đang có trong repo vẫn được dùng tĩnh, không mở upload SVG mới.
- StorageKey do server sinh UUID, không dùng filename/path client. Public URL chỉ cho media ready; ảnh upload là tài nguyên công khai dù bài gắn ảnh còn draft, không upload tài liệu mật vào kho này.
- Backend upload và ghi DB có bù trừ khi một bên thất bại; job dọn orphan có tuổi >24 giờ, không xóa file đang pending request.
- Xóa chuyển status deleting trong transaction sau kiểm tra usage và khóa record; service gắn ảnh phải lock/check ready để không tạo reference trong lúc xóa. Xóa object idempotent rồi xóa DB; retry nếu storage lỗi, không báo thành công giả.
- Ảnh dùng URL bất biến; thay ảnh tạo media mới. Cấu hình Next Image remotePatterns chỉ domain/path storage được chọn; không cho arbitrary remote URL.
- Strip toàn bộ metadata EXIF và re-encode ảnh (JPEG/WebP chuẩn, không giữ metadata) trước khi lưu — xóa GPS/thời điểm chụp và payload nhúng trong file gốc, vì ảnh là công khai với URL bất biến.
- Bucket/CDN tắt directory listing cho anonymous; object được serve với `Content-Type` cố định theo mimeType đã validate, `X-Content-Type-Options: nosniff`, `Content-Disposition: inline; filename="media"`, `Cache-Control: public, max-age=31536000, immutable`.
- Giới hạn upload: tối đa 10 upload/phút/user và trần dung lượng theo user; từ chối sớm qua Content-Length trước khi đọc body.
- Job reconcile định kỳ quét media `status=deleting` quá 24 giờ: kiểm tra usage lần nữa rồi hoàn tất xóa object + DB, hoặc đưa về `ready` nếu object còn tồn tại và không có tham chiếu — tránh record kẹt vĩnh viễn khi process chết giữa chừng.
- UI upload hiển thị cảnh báo cố định "mọi ảnh upload là công khai ngay cả khi bài chưa đăng"; quy trình sự cố ảnh nhạy cảm (gỡ tham chiếu → xóa → purge CDN → audit sự cố) ghi trong runbook mục 12.2.

### 6.4 Lead quản trị

| Method | Endpoint | Input | Chức năng |
|---|---|---|---|
| GET | `/api/v1/admin/leads` | q, type, topic, status, assignedTo, from, to, page, pageSize | Danh sách sort createdAt:desc; q tìm tên/phone/email/company/taxCode |
| GET | `/api/v1/admin/leads/{id}` | UUID | Chi tiết, nguồn, consent, người phụ trách; không trả hash idempotency/IP |
| PATCH | `/api/v1/admin/leads/{id}` | status, assignedTo nullable, version | Đổi trạng thái/giao việc; G1 chỉ giao admin active; không sửa thông tin khách gửi |
| GET | `/api/v1/admin/leads/{id}/notes` | page, pageSize | Ghi chú theo createdAt:asc |
| POST | `/api/v1/admin/leads/{id}/notes` | body 1–2000 ký tự | 201 ghi chú append-only, actor từ session |

Ngày lọc from/to là ISO datetime, `from` inclusive, `to` exclusive; UI đổi khoảng ngày Việt Nam thành UTC trước khi gọi. Lead mới luôn `new`; có thể chuyển giữa các trạng thái trừ spam chỉ admin được đưa ra khỏi spam. Mọi chuyển trạng thái/giao việc có audit. Không có xóa lead thông thường trong G1; có quy trình xử lý yêu cầu xóa PII ở mục vận hành.

Quy tắc bổ sung:

- Khi tạo lead, server so khớp phone/email đã normalize với lead tạo trong 30 ngày gần nhất và gắn nhãn "có thể trùng" (không chặn); UI chi tiết hiển thị các lead trùng tiềm năng kèm trạng thái. G1 xử lý trùng bằng note + đóng lead phụ (`closed`); merge thật thuộc G3.
- PATCH cho phép hiệu chỉnh có kiểm soát `name/phone/email/company` kèm `reason` bắt buộc 1–500 ký tự: giá trị gốc và lý do lưu vào audit/note nội bộ, không ghi đè âm thầm — phục vụ dữ liệu khách gõ sai và yêu cầu chỉnh sửa theo Nghị định 13/2023.
- Lead `new` quá 4 giờ giờ hành chính chưa `contacted` được đánh dấu "quá hạn" và nổi bật trong UI; lead `topic=ho-tro` hiển thị đầu danh sách mặc định.

### 6.5 API công khai

| Method | Endpoint | Input | Output |
|---|---|---|---|
| GET | `/api/v1/public/news-categories` | Không | Category công khai theo sortOrder |
| GET | `/api/v1/public/posts` | q, category slug, featured, page, pageSize | Bài published; sort publishedAt:desc,id:desc; DTO danh sách không có body |
| GET | `/api/v1/public/posts/{category}/{slug}` | 2 slug | Chi tiết bài published và tối đa 4 bài liên quan cùng chuyên mục |
| POST | `/api/v1/public/leads` | LeadCreate, header Idempotency-Key | 201 `{data:{receiptId,message}}`; không echo PII |

PublicPostSummary: `id, slug, category {slug,label}, title, excerpt, cover {url,alt,width,height}|null, featured, publishedAt, href`.

PublicPostDetail bổ sung `content` đã resolve media an toàn, `firstPublishedAt`, `updatedAt`, `seo {title,description,canonical}`, `related`. Không expose email người biên tập, version, audit hoặc trạng thái draft.

LeadCreate:

```json
{
  "type": "contact",
  "topic": "tu-van",
  "name": "Nguyễn Văn A",
  "phone": "0900000000",
  "email": "khach@example.com",
  "company": "Công ty ABC",
  "taxCode": "0123456789",
  "productKeys": ["maxv-hddt"],
  "message": "Tôi muốn được tư vấn.",
  "sourcePath": "/lien-he",
  "utm": { "source": "google", "medium": "cpc", "campaign": "maxv" },
  "consent": true,
  "consentVersion": "privacy-v1",
  "website": ""
}
```

Quy tắc:

- type contact/trial; contact yêu cầu topic `tu-van|ho-tro|hop-tac`; trial topic không nhận. name 1–100, phone 8–20 ký tự sau normalize khoảng trắng/dấu phân cách, chỉ `+` đầu và chữ số; không ép Number làm mất số 0.
- contact: name/phone bắt buộc, email/company tùy chọn. trial: name/phone/email/company bắt buộc. email tối đa 254 và hợp lệ; company tối đa 200; message tối đa 5000.
- taxCode tùy chọn theo form hiện tại: `^\d{10}(-\d{3})?$`. Cần xác nhận nghiệp vụ nếu muốn nhận mã định danh khác trước khi mở rộng, không tuyên bố đây là kiểm chứng pháp lý mã số thuế.
- productKeys whitelist 4 key marketing `maxv-accounting|maxv-hddt|hoa-don-dien-tu|chu-ky-so`; form dùng thử có thêm `moduleKeys` whitelist `hddt|tokhai|dvc|accounting|hrm`. Không dùng chung hai loại key. Server chỉ cho chọn module đang mở dùng thử theo cấu hình; hiện accounting có soon=true.
- consent phải true; consentVersion phải khớp phiên bản chính sách đang hiển thị, sai phiên bản trả 409 `CONSENT_VERSION_CHANGED`. consentAt do server ghi. G1 phải xuất bản trang chính sách thật trước khi bật nhận lead.
- sourcePath là path nội bộ tối đa 300, không URL tùy ý; mỗi UTM tối đa 100, không đưa cookie/query có secret vào payload. Nguồn là dữ liệu attribution client cung cấp, không dùng để quyết định quyền.
- `website` honeypot phải rỗng; nếu không rỗng trả `201` với receiptId giả và không tạo lead (không tiết lộ rằng bị phát hiện); kèm kiểm tra tốc độ gửi và tín hiệu bot phía server. Không gửi PII tới analytics.
- `Idempotency-Key`: UUID do client sinh một lần mỗi lần gửi chủ động, giữ lại khi retry. Cùng key+payload trong 24h trả lại receipt cũ với 200; cùng key khác payload trả 409 `IDEMPOTENCY_PAYLOAD_MISMATCH`. Hai request đồng thời chỉ tạo một lead.
- Giới hạn bắt buộc trước khi bật form: 5 lần/IP/10 phút (IPv6 đếm theo prefix /64), trần toàn hệ thống 100 lead/10 phút (vượt trần trả 429 kèm alert vận hành) và chiều phụ theo `type`/`sourcePath`; trusted proxy phải được cấu hình, không tin X-Forwarded-For tùy ý. Khi tỷ lệ spam vượt ngưỡng do vận hành chốt, bật Turnstile/hCaptcha theo quy trình runbook cụ thể — không để ở mức "cân nhắc sau".
- IP lưu dạng `ipHash` (hash kèm pepper) trong `lead_requests`, tự xóa theo cửa sổ 24 giờ của idempotency; không đưa IP (kể cả hash) vào API response hay export.
- Không dedupe vĩnh viễn theo phone/email: khách có thể gửi nhu cầu mới hợp lệ.
- Form dùng thử thực tế nằm ở `/dang-ky` (không tồn tại `/dung-thu`); giữ nguyên URL `/dang-ky`. Nếu chọn luồng yêu cầu dùng thử G1 thì bỏ mật khẩu và đổi CTA thành “Gửi yêu cầu dùng thử”; không nhận/lưu mật khẩu trong lead; trường `password` nếu gửi lên bị strip, không lưu DB/audit. Google OAuth đang disabled tiếp tục disabled cho đến khi có tích hợp thật. Các trường `company`/`taxCode`/`moduleKeys` là trường mới cần bổ sung UI; option “Sản phẩm quan tâm” đổi value từ label tiếng Việt sang productKey slug khi nối backend.

## 7. API G2 — quản trị nội dung mở rộng

### 7.1 Khách hàng/logo

| Method | Endpoint | Payload/query | Quy tắc |
|---|---|---|---|
| GET | `/api/v1/admin/customers` | q, visible, page, pageSize | sort sortOrder:asc,id:asc |
| POST | `/api/v1/admin/customers` | name, logoMediaId, websiteUrl?, visible=false, sortOrder=0 | 201 draft hiển thị tắt |
| GET | `/api/v1/admin/customers/{id}` | UUID | Chi tiết + version |
| PATCH | `/api/v1/admin/customers/{id}` | Các trường trên + version | Không cho visible khi thiếu tên/logo/alt |
| DELETE | `/api/v1/admin/customers/{id}` | If-Match version | 409 nếu đang có story tham chiếu; ưu tiên ẩn |
| GET | `/api/v1/public/customers` | Không | Chỉ visible, trường công khai, theo thứ tự |

Chưa cần endpoint reorder riêng; sửa sortOrder qua PATCH. Khi trùng thứ tự dùng id để kết quả ổn định. name tối đa 200; websiteUrl chỉ http/https tối đa 2048, không credential trong URL. Các className logo hiện có giữ mapping trong UI theo key hoặc xử lý layout đồng nhất, không cho admin nhập CSS.

### 7.2 Câu chuyện khách hàng

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/v1/admin/customer-stories` | q, state, customerId, page, pageSize; sort updatedAt:desc |
| POST | `/api/v1/admin/customer-stories` | Tạo draft |
| GET | `/api/v1/admin/customer-stories/{id}` | Chi tiết |
| PATCH | `/api/v1/admin/customer-stories/{id}` | Sửa nội dung + version |
| POST | `/api/v1/admin/customer-stories/{id}/publish` | version; kiểm tra renderer và nội dung |
| POST | `/api/v1/admin/customer-stories/{id}/unpublish` | version; về draft |
| POST | `/api/v1/admin/customer-stories/{id}/archive` | version; lưu trữ |
| POST | `/api/v1/admin/customer-stories/{id}/restore` | version; về draft |
| DELETE | `/api/v1/admin/customer-stories/{id}` | If-Match; chỉ chưa từng publish |
| GET | `/api/v1/admin/customer-stories/{id}/preview` | Preview private |
| GET | `/api/v1/public/customer-stories` | page/pageSize; publishedAt:desc,id:desc |
| GET | `/api/v1/public/customer-stories/{slug}` | Chi tiết published |

Payload: customerId, slug, title tối đa 200, excerpt tối đa 500, content cùng block bài viết, heroMediaId, results tối đa 6 `{value: string<=30,label: string<=150}`, testimonial `{quote<=2000,name<=100,role<=200,avatarMediaId?}`, SEO như bài viết. Publish cần ít nhất một result đã xác minh hoặc testimonial đã được duyệt; nội dung mẫu ABC không được seed published.

Website bổ sung trang thật `/khach-hang/cau-chuyen-khach-hang`, `/khach-hang/khach-hang-tieu-bieu`, `/khach-hang/[slug]`; bỏ các entry tương ứng trong catch-all khi đã có renderer.

### 7.3 Nội dung trang cố định

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/v1/admin/pages` | key, title, trạng thái đã publish, updatedAt, version |
| GET | `/api/v1/admin/pages/{key}` | draftContent, publishedContent, draftSeo, publishedSeo |
| PUT | `/api/v1/admin/pages/{key}` | Thay toàn bộ draftContent/draftSeo + version theo schema key |
| POST | `/api/v1/admin/pages/{key}/publish` | version; copy draft thành published atomically |
| GET | `/api/v1/admin/pages/{key}/preview` | Draft render trong admin, private |
| GET | `/api/v1/public/pages/{key}` | Chỉ publishedContent/publishedSeo; chưa published trả 404 |

Không có POST tạo trang, DELETE trang hay chỉnh URL tùy ý. Các key cố định:

| key | URL | Nội dung editable |
|---|---|---|
| home | `/` | Hero, lợi ích, workflow, CTA; tham chiếu logo/story/giá từ resource gốc |
| about | `/gioi-thieu` | Giới thiệu, giá trị, nội dung công ty hiện có |
| maxv-accounting | `/san-pham/maxv-accounting` | Hero, tabs/features, steps, FAQ, testimonials, CTA theo các section hiện có |
| maxv-hddt | `/san-pham/maxv-hddt` | Hero, features, steps, CTA |
| hoa-don-dien-tu | `/san-pham/hoa-don-dien-tu` | Hero, topics, CTA |
| chu-ky-so | `/san-pham/chu-ky-so` | Hero, topics, CTA |
| pricing | `/bang-gia` | Heading, FAQ/CTA nếu có; giá không nhập lại ở đây |
| privacy | `/chinh-sach-bao-mat` | Nội dung chính sách và policyVersion; thay version buộc form lấy consent mới |

G1 chính sách privacy có thể là trang tĩnh đã duyệt. G2 migrate thành published page trước khi chuyển form sang đọc policyVersion ở dữ liệu này. Không được có hai nguồn version chính sách cùng hoạt động.

Mỗi key có schema riêng trong file `.schema.ts`, dựa vào data export/JSX hiện có, giới hạn array/text/media cụ thể trước khi viết endpoint. Không nhận blob JSON tùy ý chỉ vì cột DB là JSONB. Section sản phẩm nào đang nằm trong JSX phải tách dữ liệu ra trước rồi mới có trường admin tương ứng. G2 thực hiện từng trang, không yêu cầu chuyển toàn bộ trang trong một đợt deploy.

### 7.4 Bảng giá và module marketing

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/v1/admin/marketing-plans` | Tất cả gói, sortOrder:asc,id:asc |
| POST | `/api/v1/admin/marketing-plans` | Tạo gói hidden với key bất biến |
| GET | `/api/v1/admin/marketing-plans/{id}` | Chi tiết + version |
| PATCH | `/api/v1/admin/marketing-plans/{id}` | Cập nhật + version |
| DELETE | `/api/v1/admin/marketing-plans/{id}` | If-Match; không xóa gói đang dùng làm entry price, ưu tiên visible=false |
| GET | `/api/v1/admin/modules` | Danh mục key cố định và trạng thái available/coming-soon |
| PATCH | `/api/v1/admin/modules/{key}` | label, shortLabel, comingSoon, version |
| GET | `/api/v1/public/marketing-plans` | Gói visible và danh mục module công khai |

PlanInput: key dạng slug<=80 (chỉ create), name<=100, audience<=300, priceMode, priceAmount nullable integer >=0 <=1.000.000.000.000 VND, billingPeriod month/year/once/none, moduleKeys[], featured, sortOrder, visible, cta `{label<=100,href}`. contact dùng priceAmount=null; free dùng 0; fixed/from bắt buộc amount>0. CTA chỉ đường dẫn nội bộ whitelist hoặc https domain được duyệt, không javascript URL.

Một gói được chọn làm entry price qua trường `entryPlanId` trong page pricing; home và các chỗ hiển thị cùng mức giá đọc cùng nguồn. Seed gói có giá chưa xác nhận dưới trạng thái hidden hoặc contact, không biến giá mẫu thành cam kết kinh doanh. Sửa comingSoon trong CMS không tự bật chức năng thực ở backend sản phẩm.

Publish/sửa `visible` của marketing-plans và bài thuộc chuyên mục khuyến mãi yêu cầu role `admin` (không cần workflow duyệt nhiều cấp) — che rủi ro pháp lý của sai số tiền/điều kiện ưu đãi; thay đổi `priceAmount` của gói đang visible phải có audit.

### 7.5 Cấu hình website

| Method | Endpoint | Quyền/ý nghĩa |
|---|---|---|
| GET | `/api/v1/admin/settings/{key}` | admin; key contact/social/seo |
| PUT | `/api/v1/admin/settings/{key}` | admin; value có schema + version; áp dụng live và audit |
| GET | `/api/v1/public/site-config` | Chỉ trường công khai, không biến môi trường/secrets |

- contact: hotline, hotlineDisplay, email, address, businessHours. hotlineHref/mailto dẫn xuất ở server, không nhập lại nhiều trường dễ lệch.
- social: zaloUrl/facebookUrl/youtubeUrl nullable; URL https và domain đúng kênh.
- seo: siteName, defaultTitle, defaultDescription, defaultOgMediaId. canonical origin luôn lấy deployment config; không cho sửa origin trong CMS.
- public site-config bao gồm policyVersion để form G2 dùng, nhưng không trả cài đặt email/storage/DB.
- contact widget, footer, trang liên hệ và JSON-LD Organization phải cùng đọc nguồn cấu hình.

### 7.6 Nhân sự, dashboard, export và audit

| Method | Endpoint | Chức năng / quyền |
|---|---|---|
| GET | `/api/v1/admin/users` | admin; q, role, status, pagination |
| POST | `/api/v1/admin/users` | admin; email, displayName, role; tạo user disabled, gửi link kích hoạt qua luồng reset một lần |
| GET | `/api/v1/admin/users/{id}` | admin; thông tin user, không passwordHash |
| PATCH | `/api/v1/admin/users/{id}` | admin; displayName, role, status, version |
| POST | `/api/v1/admin/users/{id}/send-activation` | admin; gửi lại link kích hoạt user chưa active, không trả token |
| POST | `/api/v1/admin/users/{id}/revoke-sessions` | admin; thu hồi toàn bộ phiên |
| GET | `/api/v1/admin/dashboard` | admin; from/to; số bài, lead theo type/status và chuỗi lead theo ngày |
| GET | `/api/v1/admin/leads/export` | admin/sales; cùng bộ lọc lead, date range tối đa 90 ngày, tối đa 10.000 dòng |
| GET | `/api/v1/admin/audit-logs` | admin; actorId, action, resourceType, resourceId, from/to, pagination |
| DELETE | `/api/v1/admin/leads/{id}` | admin; If-Match version, lý do bắt buộc qua body JSON `{"reason"}` 1–300 ký tự (HTTP header không truyền được tiếng Việt); xóa PII theo yêu cầu hợp lệ |

Quản lý tài khoản: không tự disable hoặc tự hạ quyền; không disable/hạ quyền admin active cuối cùng kể cả hai request đồng thời. Kiểm tra và khóa trong transaction. Disable/đổi role lập tức thu hồi session. Kích hoạt dùng token scope activation riêng, 24h, chỉ dùng một lần; reset-password nhận token scope activation thì thiết lập password và chuyển active atomically. Email trùng trả 409 cho admin được phép quản lý user.

Dashboard không phải Google Analytics: không thể thống kê page view, doanh thu, conversion rate chính xác nếu chưa có nguồn sự kiện. Nếu thêm phân tích truy cập phải đặc tả dữ liệu/consent riêng.

Export CSV UTF-8 có BOM, attachment, escape dấu quote/newline và chống spreadsheet formula injection với ô bắt đầu `= + - @` hoặc ký tự điều khiển. Không vượt 10.000 thì âm thầm cắt: trả 422 yêu cầu thu hẹp bộ lọc. Export và xóa PII phải có audit không chứa nội dung PII. Route `leads/export` dùng segment tĩnh, không coi export là UUID. Export chỉ xuất whitelist cột: name, phone, email, company, taxCode, type, topic, status, createdAt, assignedTo, consentVersion — không xuất IP (kể cả hash) hay idempotency key. Giới hạn 5 export/user/giờ qua shared rate limit; audit export ghi actor, bộ lọc đã scrub, rowCount, timestamp để monitoring phát hiện hành vi rà soát dữ liệu. Cân nhắc yêu cầu re-auth (xác nhận mật khẩu) cho export trên 5.000 dòng.

Xóa lead đồng thời xóa notes/idempotency references trong transaction; xóa email job chưa gửi có PII nếu đã bổ sung job. Audit chỉ giữ ID mờ + loại hành động + actor + timestamp, không ghi lý do chứa PII. Bản backup tuân theo thời gian lưu tại mục 12, không cam kết xóa ngay mọi backup.

## 8. Hợp đồng tích hợp G3 với backend sản phẩm

Các đường dẫn bên dưới là endpoint mới đề xuất ở website, KHÔNG phải endpoint đã xác minh của backend MaxV. Không triển khai hoặc hứa hoạt động trước khi có tài liệu backend và môi trường thử nghiệm.

| Method | Endpoint website đề xuất | Backend sản phẩm cần cung cấp |
|---|---|---|
| POST | `/api/v1/public/trial-registrations` | Tạo tenant/tài khoản dùng thử idempotent, module được cấp, thời hạn, trạng thái provisioning |
| GET | `/api/v1/public/trial-registrations/{receiptId}` | Trạng thái pending/ready/failed; yêu cầu bằng chứng sở hữu qua session/token scoped, không public theo receipt đơn lẻ |
| POST | `/api/v1/account/auth/login` | Cơ chế đăng nhập sản phẩm và phiên/token hoặc luồng SSO |
| POST | `/api/v1/account/auth/logout` | Thu hồi phiên sản phẩm |
| GET | `/api/v1/account/auth/session` | Hồ sơ tài khoản/tenant và hạn dùng thử, không session admin |
| POST | `/api/v1/account/auth/forgot-password` | Reset account sản phẩm, response chống dò email |
| POST | `/api/v1/account/auth/reset-password` | Token reset của sản phẩm, chính sách an toàn tương ứng |

Ưu tiên redirect sang trang đăng nhập/dùng thử chính thức của sản phẩm nếu sản phẩm đã cung cấp, thay vì tự proxy toàn bộ auth. Refresh/OAuth/callback/webhook chỉ thêm theo protocol backend thật; không invent endpoint refresh hoặc Google callback khi chưa chọn cơ chế.

Nếu đăng ký sản phẩm cần password thì chỉ gửi trực tiếp tới auth provider/product backend qua TLS và không lưu vào lead/log/queue. Nếu provisioning bất đồng bộ thì cần job có retry/backoff, idempotency, timeout và xác minh webhook signature + timestamp + eventId chống replay. Failure provisioning không xóa lead; thông báo rõ trạng thái, không báo “đã tạo tài khoản” khi mới nhận yêu cầu.

## 9. Màn hình admin và API tương ứng

| Màn hình | URL | API/resource |
|---|---|---|
| Đăng nhập | `/admin/login` | auth/login, auth/session |
| Quên/đặt lại mật khẩu | `/admin/forgot-password`, `/admin/reset-password` | auth/forgot-password, reset-password |
| Bài viết | `/admin/posts` | posts list, news-categories |
| Tạo/sửa bài | `/admin/posts/new`, `/admin/posts/{id}/edit` | posts CRUD, publish actions, media |
| Xem trước | `/admin/posts/{id}/preview` | private preview; không cần link chia sẻ công khai |
| Thư viện ảnh | `/admin/media` | media CRUD |
| Yêu cầu khách hàng | `/admin/leads`, `/admin/leads/{id}` | leads, notes; G2 export |
| Đổi mật khẩu | `/admin/account` | auth/change-password |
| Khách hàng | `/admin/customers` | customers G2 |
| Câu chuyện | `/admin/customer-stories` và new/edit/preview | customer-stories G2 |
| Trang cố định | `/admin/pages`, `/admin/pages/{key}` | pages G2 |
| Gói giá | `/admin/marketing-plans` | marketing-plans/modules G2 |
| Cấu hình | `/admin/settings` | settings G2 |
| Tài khoản | `/admin/users` | users G2 |
| Nhật ký | `/admin/audit-logs` | audit-logs G2 |
| Tổng quan | `/admin` | G1 redirect /admin/posts; G2 dashboard |

UI bắt buộc có loading/empty/error, thông báo session hết hạn, lỗi trường, cảnh báo rời trang chưa lưu, xác nhận publish/gỡ/xóa, hỗ trợ keyboard và label. Khi 409 giữ nội dung đang nhập và cho tải bản mới, hiển thị diff với bản mới khi khả thi; không tự submit đè lần hai. Màn edit trang cố định hiển thị người giữ bản cập nhật gần nhất (updatedBy). Không cần UI phân quyền nếu G1 chỉ một role.

## 10. Cache, SEO và cập nhật website

- Ban đầu query published chạy request-time, dùng Suspense đúng hướng dẫn cài tại máy; admin luôn uncached. Chỉ thêm shared cache cho dữ liệu công khai khi đã có test invalidation.
- Nếu cache: tag theo `posts`, `post:{id}`, `stories`, `customers`, `page:{key}`, `settings:{key}`, `marketing-plans`. Cache có TTL hữu hạn với giới hạn trên cứng 5 phút, không cấu hình dài hơn.
- Route Handler không dùng `updateTag` (chỉ dành Server Actions); đọc API reference cài sẵn cho `revalidateTag`/`revalidatePath` trước khi chọn semantics. Gỡ bài phải hết hiệu lực ngay ở request tiếp theo; không dùng stale-while-revalidate còn trả bài cũ sau unpublish.
- Invalidate danh sách, bài liên quan, chi tiết, page liên quan, sitemap và metadata sau commit. Không chỉ refresh admin UI.
- Metadata và render lấy chung DTO, không query một bài theo hai tiêu chí khác nhau. Bài public có canonical `/tin-tuc/{category}/{slug}`, title/description, OpenGraph, Article JSON-LD với datePublished/dateModified.
- `[id]` hiện tại có thể đổi tên thành `[slug]` đồng bộ thư mục/type helper; URL thực giữ nguyên cấu trúc. Không để hai dynamic segment cùng cấp trùng route.
- Root mặc định noindex: chỉ trang published đã hoàn chỉnh mới opt-in `index:true`; draft/preview/admin noindex. Sitemap chỉ dùng URL published có renderer, có lastModified thực tế, không dùng giờ hiện tại cho mọi trang.
- Không chặn crawl admin rồi kỳ vọng crawler đọc noindex; noindex là metadata/header, auth mới là lớp bảo vệ. API private trả X-Robots-Tag noindex.
- Khi cần đảm bảo status 404 trước stream, kiểm tra hướng dẫn request-time/ensureStatic của bản Next.js đang cài và test production build; không sao chép cấu hình dynamic/force-static từ phiên bản khác.

## 11. Kế hoạch triển khai theo đầu việc

### Task 0 — Chốt hạ tầng và đóng băng hợp đồng G1

**Files:** Tạo `docs/admin-api.md`, `docs/admin-openapi.yaml`, `.env.example`; cập nhật `package.json` chỉ sau khi chọn thư viện thực tế. Không sửa `.env.local` để ghi secret vào tài liệu.

**Interfaces:** OpenAPI 3.1 mô tả mọi endpoint G1, UUID, DTO, error/status, securitySchemes cookie+CSRF, pagination; service nội bộ nhận input đã validate nhưng vẫn kiểm tra quyền ở entrypoint.

- [ ] Xác nhận có tái sử dụng backend/database/auth/storage/email MaxV hay không bằng tài liệu triển khai thực tế; chọn một nguồn sở hữu mỗi resource.
- [ ] Chốt G1 dùng “yêu cầu dùng thử”, chưa cấp account; chốt chính sách privacy được duyệt và tên version.
- [ ] Chọn auth library/provider được duy trì, database client và image decoder tương thích runtime đã chọn; ưu tiên hạ tầng sẵn có, không viết tự chế crypto/session.
- [ ] Viết OpenAPI G1 từ mục 4–6, kèm request/response/error examples và enum. Không tạo endpoint G2/G3 trong G1.
- [ ] Validate OpenAPI bằng validator được chọn, kiểm tra example theo schema; chỉ commit tài liệu và `.env.example` không secret.
- [ ] Chốt test stack ở Task 0 (không đợi Task 1): Vitest cho integration — gọi trực tiếp Route Handler qua `Request` dựng tay kèm cookie/CSRF header; Playwright cho e2e — multi-session bằng `browser.newContext()`; thêm `test:integration`, `test:e2e` vào `package.json`; quyết CI matrix (Node + service PostgreSQL).
- [ ] Đặc tả hạ tầng test DB: biến `TEST_DATABASE_URL` riêng, script reset (drop/create + migration + seed 5 categories/modules), test-bootstrap assert không trỏ production; e2e production smoke dùng biến build riêng.
- [ ] Đưa health endpoint (`/api/v1/health`, `/api/v1/health/ready`) vào OpenAPI.

### Task 1 — Database, session admin và layout

**Files:** Tạo `app/_lib/server/db.ts`, `app/_lib/server/auth.ts`, `app/_lib/server/api.ts`; migration trong `db/migrations/`; `scripts/bootstrap-admin.ts`; `app/admin/login/page.tsx`, `app/admin/(protected)/layout.tsx`, auth routes theo mục 6.1; chuyển page công khai sang `app/(site)/` theo mục 3.3, sửa root layout. Tạo `tests/integration/admin-auth.test.ts`, `tests/e2e/admin-auth.spec.ts`.

**Interfaces:** `requireAdminSession(): Promise<AdminSession>`; `requireRole(allowed: Role[]): Promise<AdminSession>`; `AdminSession={userId,role,sessionId}` chỉ server; `ApiError` dùng error envelope mục 4. Không tạo abstraction database chung ngoài nhu cầu query thật.

- [ ] Viết test chưa login gọi API posts/leads nhận 401, sai CSRF nhận 403, login sai có thông báo chung, logout thu hồi cookie/session, phiên hết hạn không đọc được dữ liệu.
- [ ] Chạy test xác nhận fail vì chưa có route/schema; dùng test DB riêng, không production.
- [ ] Tạo migration auth, password reset và audit; triển khai session theo thư viện đã chọn, bootstrap kín, limit login và reset.
- [ ] Tách layout; kiểm tra mọi URL site cũ vẫn giữ nguyên, admin không có header/footer marketing, shell không chứa PII.
- [ ] Kiểm tra reset token một lần, hết hạn 15 phút; đổi password thu hồi session; 2 browser không thấy session nhau.
- [ ] Test idle expiry 30 phút: `lastActivityAt` cách 31 phút → 401; polling GET session không kéo dài phiên; editor hết hạn giữa chừng vẫn giữ nội dung, hiện thông báo, login lại rồi submit không mất dữ liệu.
- [ ] Test login rate limit (6 lần sai → 429 kèm `Retry-After`), account lockout tích lũy kèm audit `AUTH_LOCKOUT`; test cross-site POST ngay sau login (ngoại lệ Lax+POST) bị Origin check chặn; test login sinh session token mới.
- [ ] Test bootstrap: admin đầu tiên bị ép đổi mật khẩu lần đầu (`must_change_password`) trước khi dùng API khác; lệnh break-glass reset-admin-password chạy được khi đã có admin (môi trường thử nghiệm).
- [ ] Validate env fail-fast khi khởi động (thiếu `NEXT_PUBLIC_SITE_URL` báo lỗi rõ ràng); security headers (HSTS, nosniff, X-Frame-Options) hiện diện ở production build.
- [ ] Chạy integration/e2e liên quan, lint/build; commit `feat: add admin authentication and isolated layout`.

### Task 2 — Media có kiểm tra và vòng đời file

**Files:** `app/_lib/server/media.ts`, `app/api/v1/admin/media/route.ts`, `app/api/v1/admin/media/[id]/route.ts`, `app/admin/(protected)/media/page.tsx`, `app/admin/_components/media-picker.tsx`, migration media/usages, `tests/integration/media.test.ts`.

**Interfaces:** `uploadMedia(file: File, alt: string, actor: AdminSession): Promise<MediaDto>`; `deleteUnusedMedia(id: string, version: number, actor: AdminSession): Promise<void>`; `MediaDto={id,url,alt,mimeType,width,height,sizeBytes,version}`.

- [ ] Test upload PNG thật thành công; MIME giả/SVG/ảnh decode lỗi/5 MiB+1 bị chặn; ảnh đang được tham chiếu không xóa được.
- [ ] Xác nhận test fail rồi triển khai DB/storage adapter nhỏ theo provider thật, decode/giới hạn ảnh và quy trình bù trừ mục 6.3.
- [ ] UI upload/chọn ảnh bằng components hiện có; lỗi upload giữ form người dùng.
- [ ] Test storage lỗi khi upload/xóa và attach cùng lúc delete; không mất ảnh đang dùng/không rò file mồ côi lâu dài.
- [ ] Test PATCH alt với version cũ trả 409; test strip EXIF (ảnh có GPS sau upload không còn metadata); test quota upload từ chối sớm qua Content-Length.
- [ ] Test bù trừ cụ thể: upload thành công storage nhưng ghi DB fail → object bị xóa/đánh dấu dọn (assert số object trong bucket); job dọn chỉ xóa orphan >24 giờ; job reconcile đưa media kẹt `deleting` >24 giờ về trạng thái nhất quán.
- [ ] Chạy test/lint/build; commit `feat: manage validated media uploads`.

### Task 3 — Bài viết, preview và xuất bản

**Files:** `app/_lib/server/posts.ts`, `app/_lib/server/posts.schema.ts`, `app/_lib/server/audit.ts`; từng `route.ts` trong `app/api/v1/admin/posts/` và news-categories; admin posts pages; `app/_components/sections/content-blocks.tsx`; migration categories/posts; `tests/integration/posts.test.ts`, `tests/e2e/admin-posts.spec.ts`.

**Interfaces:** `listPublishedPosts(input: PublicPostQuery): Promise<Paginated<PublicPostSummary>>`; `getPublishedPost(category: string, slug: string): Promise<PublicPostDetail|null>`; `getAdminPost(id: string, actor: AdminSession): Promise<AdminPost>`; `publishPost(id: string, version: number, actor: AdminSession): Promise<AdminPost>`; `ContentBlock` đúng union mục 5.1.

- [ ] Test tạo draft không public, publish đủ dữ liệu thành công, thiếu cover/excerpt bị 422; duplicate slug/category bị 409.
- [ ] Test version cũ không ghi đè, slug/category khóa sau lần publish đầu, unpublish/archive/restore đúng state, xóa bài đã từng publish bị chặn.
- [ ] Test PATCH-vs-PUBLISH: publish ở nơi khác làm tăng version → PATCH gửi version cũ nhận 409 và DB giữ bản mới; DELETE thiếu `If-Match` nhận 428, If-Match sai version nhận 409.
- [ ] Triển khai `POST /posts/{id}/preview` stateless và UI dùng nó xem trước bản sửa bài published trước khi PATCH live (kèm diff khi khả thi).
- [ ] Sau khi test fail, triển khai schema/query/transaction/audit/media usages và các endpoint mục 6.2.
- [ ] Viết renderer block dùng chung public/preview; test text `<script>` chỉ hiển thị text, javascript link bị reject; preview phải có session.
- [ ] Làm UI list/filter/editor/preview/actions; kiểm tra keyboard và thông báo lỗi trường.
- [ ] Chạy test/lint/build; commit `feat: add article editing and publishing`.

### Task 4 — Tin tức công khai, SEO, sitemap và tìm kiếm

**Files:** Sửa các page tin tức dưới `app/(site)/tin-tuc/`, `app/tin-tuc/_components/news-listing.tsx`, `news-article.tsx`, `app/_lib/seo.ts`, `app/sitemap.ts`, `app/_components/layout/header-search.tsx`, `mobile-nav.tsx`; tạo routes public posts/categories; thu gọn `app/_data/news.ts` còn dữ liệu UI cần thiết/kiểu tương thích tạm thời. Tests `tests/integration/public-posts.test.ts`, `tests/e2e/public-news.spec.ts`.

**Interfaces:** Dùng `listPublishedPosts`, `getPublishedPost` Task 3; NewsListing nhận dữ liệu phân trang, NewsArticle nhận post+related, không import newsPosts để tự lọc.

- [ ] Test pagination 9 bài mặc định, q tiếng Việt có dấu không lỗi, category không tồn tại 404, query injection không trở thành SQL; sort có tie-breaker.
- [ ] Xác nhận fail rồi thay mọi caller `newsPosts`, `categoryOf`, `postHref` có liên quan; giữ 5 chuyên mục và URL hiện có.
- [ ] Nối search header/mobile và listing cùng query `q`; thay filter giữ q, đổi q/category reset page=1; pagination giữ bộ lọc.
- [ ] Metadata/JSON-LD/sitemap đọc published cùng nguồn; thay `site.url` thành config được kiểm tra URL tại startup, không expose secret.
- [ ] Test publish → truy cập được và indexable → unpublish → public API/HTML/sitemap không lộ bài; kiểm tra cả production cache.
- [ ] Test production (`next build && next start`): client router cache — context 1 đã xem bài, context 2 unpublish, context 1 điều hướng nội bộ + reload đều nhận 404; publish bài mới xuất hiện ở `/sitemap.xml` và public API ở request tiếp theo không cần restart; unpublish bài nằm trong related của bài khác không còn trong response detail sau invalidation.
- [ ] Chạy test/lint/build; commit `feat: connect public news and SEO to published content`.

### Task 5 — Nhận và xử lý lead

**Files:** `app/_lib/server/leads.ts`, `leads.schema.ts`, routes public leads/admin leads/notes; admin lead pages; sửa `app/(site)/lien-he/page.tsx`, `app/(site)/dang-ky/page.tsx`, `app/_components/sections/trial-signup.tsx`; form client nhỏ tương ứng; tạo trang privacy thật; migrations leads/notes/lead_requests/consent_records; tests `tests/integration/leads.test.ts`, `tests/e2e/lead-forms.spec.ts`.

**Interfaces:** `createLead(input: LeadCreate, key: string, context: LeadRequestContext): Promise<{receiptId:string,replayed:boolean}>`; `updateLead(id: string, input: LeadPatch, actor: AdminSession): Promise<AdminLead>`; `addLeadNote(id: string, body: string, actor: AdminSession): Promise<LeadNote>`.

- [ ] Test thiếu consent/type sai/email sai/module chưa mở bị reject, phone giữ số 0, không nhận password field.
- [ ] Test hai request cùng key chỉ có một lead, cùng key khác payload 409; giả proxy không bỏ được rate limit.
- [ ] Test race đồng thời thật: `Promise.all` 5 request cùng Idempotency-Key → đúng 1 lead, 4 replay cùng receiptId; 6 request mỗi request một `X-Forwarded-For` khác nhau vẫn bị rate limit theo IP thật; rate-limit store là DB/Redis (assert config), không phải memory map.
- [ ] Test consent version sai trả 409 `CONSENT_VERSION_CHANGED` và không tạo lead; honeypot không rỗng trả 201 giả không tạo lead; payload có trường password bị strip.
- [ ] Test đánh dấu lead trùng (cùng phone trong 30 ngày) và PATCH hiệu chỉnh phone kèm reason lưu giá trị gốc vào audit.
- [ ] Test chưa login không đọc lead, cập nhật version cũ 409, note actor lấy từ server và không chấp nhận authorId client.
- [ ] Sau fail triển khai transaction lưu lead/idempotency, shared rate limit và audit. Không bắt buộc email thông báo để coi lead lưu thành công.
- [ ] Bật form liên hệ/dùng thử; bỏ password, đổi CTA yêu cầu dùng thử, xử lý pending/success/error/retry đúng key. Banner home dẫn tới form, không thu thêm một bộ dữ liệu rời rạc.
- [ ] Test e2e gửi form → thấy receipt → admin thấy lead đúng trường → ghi chú/đổi trạng thái → reload không mất dữ liệu.
- [ ] Chạy test/lint/build; commit `feat: capture and manage customer enquiries`.

### Task 6 — Logo/câu chuyện khách hàng (G2)

**Files:** `app/_lib/server/customers.ts`, `customer-stories.ts` và schema; routes mục 7.1/7.2; admin pages tương ứng; sửa `customer-trust.tsx`, `customer-stories.tsx`; tạo public customer pages dưới `app/(site)/khach-hang/`; migration customers/stories; `tests/integration/customers.test.ts`, `tests/e2e/customer-stories.spec.ts`.

**Interfaces:** Public customer/story DTO chỉ chứa approved/visible/published; story dùng ContentBlock Task 3; media usage dùng Task 2.

- [ ] Test logo hidden không ra public, customer có story không xóa được, archived story 404, URL sau publish không đổi.
- [ ] Implement endpoint/UI/render theo schema mục 7.1/7.2; seed logo thật, giữ câu chuyện mẫu ở draft và không dùng số liệu mẫu làm chứng thực.
- [ ] Xóa entry placeholder đã thay, cập nhật sitemap/metadata và home chỉ chọn story published.
- [ ] Chạy tests và kiểm tra link trang chủ/khách hàng; commit riêng module.

### Task 7 — Pages, settings và bảng giá (G2)

**Files:** `app/_lib/server/pages.ts`, `settings.ts`, `marketing-plans.ts`; `app/_lib/server/page-schemas/{key}.schema.ts` cho 8 key mục 7.3; routes mục 7.3–7.5; admin pages; sửa các home/product components và `_lib/contact.ts`, `_lib/seo.ts`; migrations pages/settings/plans; `tests/integration/pages.test.ts`, `settings.test.ts`, `marketing-plans.test.ts`.

**Interfaces:** `getPublishedPage(key: PageKey): Promise<PublishedPage|null>`; `publishPage(key: PageKey, version: number, actor: AdminSession): Promise<AdminPage>`; `getPublicSiteConfig(): Promise<PublicSiteConfig>`; `getPublicMarketingPlans(): Promise<PublicMarketingPlan[]>`.

- [ ] Tách dữ liệu từng page hiện có và viết schema field đúng section; mỗi page là một increment có kiểm tra riêng, không migrate tất cả trước khi có renderer.
- [ ] Test PUT draft không đổi live, publish invalid schema bị chặn, key lạ 404/422, unknown fields bị reject; ảnh draft/published đều được giữ usage.
- [ ] Test giá fixed/from không âm, free=0, contact=null, entry price nhất quán home/pricing, không đổi currency/giá bằng float.
- [ ] Implement pages/settings/plans endpoints và UI, không có JSON editor tự do cho người vận hành.
- [ ] Migrate approved content thành published; mẫu và giá chưa xác nhận không publish; xác nhận privacy version cùng nguồn consent.
- [ ] Kiểm tra hồi quy responsive/link/FAQ/CTA từng page và metadata; commit theo từng nhóm trang.

### Task 8 — Nhân sự, export, audit UI và dashboard (G2)

**Files:** `app/_lib/server/admin-users.ts`, `dashboard.ts`, `lead-export.ts`; routes mục 7.6; pages users/audit/dashboard; tests `tests/integration/admin-users.test.ts`, `lead-export.test.ts`, `dashboard.test.ts`.

**Interfaces:** Role union `admin|editor|sales`; `exportLeadsCsv(input: LeadFilter, actor: AdminSession): Promise<Response>`; dashboard DTO chỉ số thực có nguồn DB.

- [ ] Test editor không đọc lead/settings/users; sales không đọc draft/media; admin được phép; không chỉ test ẩn menu.
- [ ] Test sales gọi `GET /admin/posts/{id}/preview` trả 403; export chỉ chứa whitelist cột (không IP/idempotency key), giới hạn 5 export/user/giờ, audit ghi rowCount; DELETE lead với reason tiếng Việt qua body JSON hoạt động đúng.
- [ ] Test không tự hạ quyền/disable, hai request không làm mất admin cuối, disable thu hồi session lập tức, activation hết hạn/đã dùng không hoạt động lại.
- [ ] Test CSV dấu tiếng Việt/quote/newline/formula và vượt 10.000 dòng không bị cắt ngầm; API export luôn private/no-store.
- [ ] Implement endpoint/UI, audit việc export/xóa PII, xác nhận số dashboard đúng timezone/range và không giả số truy cập.
- [ ] Chạy tests/lint/build; commit riêng module.

### Task 9 — Kiểm tra phát hành và vận hành

**Files:** `docs/admin-runbook.md`, `docs/admin-release-checklist.md`, CI config theo nền tảng repo; scripts migration/seed/cleanup theo DB/storage đã chọn; `tests/e2e/admin-smoke.spec.ts`.

- [ ] Cập nhật OpenAPI theo implementation và kiểm tra không thiếu endpoint đã triển khai; mọi API admin có auth/role/CSRF thích hợp.
- [ ] Chạy bộ integration trên DB sạch + apply migration + seed; test bằng ít nhất hai session browser và user role khác nhau.
- [ ] Chạy `npm run lint`, `npm run build`, `npm run test:integration`, `npm run test:e2e`. Hai script test hiện chưa tồn tại: thêm test runner/dev dependencies ở Task 1 sau khi chọn công cụ; không coi các lệnh này đã chạy thành công trong bước lập kế hoạch.
- [ ] Test production bằng `npm run start`, không chỉ next dev: cache/unpublish, cookie Secure qua HTTPS, file upload, status 404, search/pagination, canonical/sitemap và route groups.
- [ ] Verify security headers ở production (HSTS, CSP, nosniff, X-Frame-Options) và health endpoint trả 503 khi DB down; chạy axe-core trên form public và admin (label, keyboard, focus-visible).
- [ ] Đo baseline hiệu năng: danh sách tin với 1.000 bài seed < 2s (P75, production), search `q` tiếng Việt < 2s, upload ảnh 5 MiB < 10s.
- [ ] Thử backup/restore staging, restart/redeploy không mất DB/ảnh, kiểm tra migration tương thích phiên bản app trước.
- [ ] Viết rollback từng migration và release; rollback code không làm mất dữ liệu admin vừa nhập. Bật form sau khi DB, privacy, rate limit và admin xử lý lead đều sẵn sàng.
- [ ] Chỉ đánh dấu complete khi có log kết quả kiểm tra; commit tài liệu vận hành không chứa secret.

## 12. Vận hành, lưu trữ và kiểm tra nghiệm thu

### 12.1 Biến cấu hình cần quản lý

| Biến/nhóm | Phạm vi |
|---|---|
| NEXT_PUBLIC_SITE_URL | Origin công khai hợp lệ, dùng metadata/canonical/sitemap |
| DATABASE_URL | Chỉ server; connection pool phù hợp deployment |
| AUTH_SECRET / auth provider credentials | Theo thư viện được chọn, chỉ server |
| STORAGE_ENDPOINT, STORAGE_BUCKET, STORAGE_ACCESS_KEY, STORAGE_SECRET_KEY | Chỉ server, quyền tối thiểu bucket media |
| MEDIA_PUBLIC_BASE_URL | Origin/path public cố định, đồng bộ Next Image config |
| EMAIL_FROM, email provider secret | Reset/activation; không expose ở site-config |
| Shared rate-limit connection | Database hoặc store dùng chung; không dùng Map memory cho nhiều instance |
| TEST_DATABASE_URL | Database riêng cho test; test-bootstrap assert khác DATABASE_URL |

Không mặc định biến env là admin setting. Secret được xoay vòng và tách staging/production. Log requestId và lỗi kỹ thuật đã scrub, không log body auth/lead, Cookie hoặc Authorization.

### 12.2 Lưu trữ và sự cố

- Đề xuất ban đầu: backup DB mỗi ngày, giữ 30 ngày; object storage bật cơ chế khôi phục theo khả năng provider. Mục tiêu RPO <=24 giờ, RTO <=4 giờ cần được kiểm chứng bằng restore staging, không phải SLA đã cam kết.
- Backup là điều kiện tiên quyết trước khi bật form nhận lead PII; số ngày retention lead phải đã được duyệt trước khi bật form — chưa duyệt thì chưa bật nhận lead.
- Runbook sự cố media nhạy cảm: gỡ tham chiếu/unpublish nếu cần → xóa media → purge/invalidate CDN theo provider → ghi audit sự cố; URL bất biến có thể còn tồn tại trong cache/bộ nhớ ngoài kiểm soát, phải nêu rõ trong phản hồi sự cố.
- Chính sách lưu lead đề xuất 180 ngày sau khi closed/spam, audit 180 ngày; phải được đơn vị vận hành duyệt trước khi chạy job xóa tự động. Khi chưa duyệt, không tự đặt cron xóa dữ liệu.
- Dọn session/reset/idempotency hết hạn và file orphan bằng job có log, retry, chế độ xem trước danh sách trước khi bật xóa tự động.
- Reset email lỗi: trả lỗi dịch vụ phù hợp nếu không enqueue được, không báo reset đã gửi thực tế; response không tiết lộ email tồn tại. Lead lưu thành công vẫn hiện ở admin dù email thông báo phụ trợ lỗi.
- Lỗi DB: form báo chưa gửi thành công, giữ dữ liệu ở state trình duyệt, retry với cùng idempotency key. Không lưu password/PII vào localStorage.
- Theo dõi 5xx, login thất bại tăng bất thường, tỷ lệ lead spam, dung lượng storage, job lỗi, migration lỗi và backup không chạy.

### 12.3 Nghiệm thu G1

- [ ] Admin login/logout/reset hoạt động; API trực tiếp bị chặn khi chưa có session hoặc CSRF.
- [ ] Tạo bài tiếng Việt, upload ảnh hợp lệ, preview, publish; danh sách/chi tiết/SEO/sitemap hiện đúng.
- [ ] Bài draft/archive không tìm thấy bằng public API, URL hay sitemap; hai người sửa không mất dữ liệu.
- [ ] Search header/mobile/listing và phân trang giữ query/category đúng.
- [ ] Form liên hệ/dùng thử lưu đúng dữ liệu/consent/nguồn, không nhận password, retry không tạo bản sao.
- [ ] Admin tìm lead, xem chi tiết, ghi chú và đổi trạng thái; dữ liệu không mất sau deploy.
- [ ] File giả ảnh/quá dung lượng và ảnh đang dùng không thể xóa/upload sai quy tắc.
- [ ] Trang privacy thật đã được duyệt; UI không hứa cấp tài khoản dùng thử nếu chưa tích hợp backend.
- [ ] Security headers hiện diện ở production; health endpoint phản ánh đúng trạng thái DB; env bắt buộc được validate khi khởi động.
- [ ] Audit log ghi đủ hành động chính sau kịch bản nghiệm thu: login, change-password, publish/unpublish, upload/delete media, đổi trạng thái lead, export, xóa PII.
- [ ] 429 kèm `Retry-After` hoạt động cho login throttle và lead rate limit trước khi bật form công khai; a11y cơ bản (label/keyboard) đạt trên form public và admin.
- [ ] lint/build/integration/e2e production smoke đạt; DB/storage backup và restore đã kiểm tra.

### 12.4 Phần cần xác nhận trước triển khai, không chặn việc review kế hoạch

1. Repo backend MaxV hiện có, stack/database/auth đã dùng và quyền truy cập tài liệu API.
2. Hạ tầng deploy website, database, storage, email và môi trường staging.
3. Danh sách nhân sự admin/editor/sales thực tế; G1 một quyền admin có đáp ứng vận hành không.
4. Dùng thử là gửi yêu cầu hay phải tạo tài khoản ngay; nếu ngay, cần hợp đồng tích hợp G3 trước.
5. Nội dung privacy, giá thật, quyền sử dụng logo/lời chứng thực và thời hạn lưu PII được duyệt.
6. SLA phản hồi lead theo topic (tu-van/ho-tro/hop-tac) và có kéo email thông báo lead mới từ G3 lên G1 không; ai theo dõi ngoài giờ hành chính.
7. URL và câu chữ trang dùng thử: giữ `/dang-ky`; xử lý lời hứa "dùng thử miễn phí 15 ngày" khi G1 chỉ nhận yêu cầu (bỏ "15 ngày" hay đổi mô tả quy trình) — cần người phụ trách kinh doanh duyệt.
8. Email vận hành: có dùng Gmail cá nhân hiện có làm `EMAIL_FROM` cho reset/activation không, hay cấp email tên miền riêng (deliverability và hình thức thương hiệu).
9. Quyền hiệu chỉnh dữ liệu liên hệ lead và quy trình đáp ứng yêu cầu truy xuất/chỉnh sửa/xóa của khách theo Nghị định 13/2023 — pháp lý duyệt cùng chính sách bảo mật.
10. Nội dung go-live: 5 chuyên mục đang trống, logo/câu chuyện đang là mẫu — ai sản xuất nội dung thật trước ngày bật form.
11. Tiêu chí "một admin là đủ": có tạo admin dự phòng từ G1 không, ai giữ mật khẩu dự phòng, quy trình break-glass ra sao.
12. Link `/tra-cuu-mst` trong header đang 404: gỡ khỏi nav hay xây trang ở G3.

Không xây ở đợt này: kế toán/hóa đơn/tồn kho/thanh toán, CRM đầy đủ, page builder kéo thả, đa ngôn ngữ, lịch đăng, automation marketing, tra cứu MST hoặc cổng support hoàn chỉnh. Mỗi phần cần nghiệp vụ và nguồn dữ liệu riêng; thêm endpoint không làm chúng tự hoạt động.
