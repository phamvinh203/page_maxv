# MaxV Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Đây là kế hoạch đề xuất để anh review, chưa phải hệ thống đã triển khai.

**Goal:** Vận hành nội dung website MaxV, xuất bản tin tức, tiếp nhận yêu cầu khách hàng và quản lý thông tin giới thiệu bằng admin có xác thực và dữ liệu lưu bền vững.

**Architecture:** 3 phần tách repo/triển khai, chi tiết ở mục 3:

| Phần | Công nghệ | Trách nhiệm |
|---|---|---|
| **API** (`maxv-api`) | Node.js + TypeScript, PostgreSQL, ảnh lưu trên ổ đĩa server | Sở hữu toàn bộ dữ liệu và nghiệp vụ: auth admin, phân quyền, bài viết, media, lead, giá cả. Expose `/api/v1/admin/*` cho dashboard và `/api/v1/public/*` cho website |
| **Dashboard admin** (`maxv-admin`) | React SPA (TypeScript) | Chỉ là giao diện quản trị, gọi `/api/v1/admin/*`; không có DB, không chứa nghiệp vụ |
| **Website** (repo này, `page_maxv`) | Next.js 16.4.3 | Chỉ gọi `/api/v1/public/*`: đọc bài/giá để render, gửi lead từ form. Không có admin, không có DB, không có Route Handler nghiệp vụ |

Website sản phẩm và hệ thống tài khoản khách hàng (`be_maxv`) là hệ thống bên ngoài; đăng ký/đăng nhập khách hàng đã gọi thẳng `be_maxv`.

**Tech Stack:** API: Node.js LTS + TypeScript, PostgreSQL, chạy trên Windows Server 2019 + IIS, ảnh trên ổ đĩa server do IIS phục vụ (chốt 27/10/2026, mục 3.5); ORM/migration: Prisma 6 (chốt 27/10/2026, schema ở `docs/TASK/prisma/`); framework HTTP và auth/session library chốt ở Task 0. Admin: React + TypeScript (đề xuất Vite + React Router), Tailwind + radix-ui giống website để dùng lại kiểu UI. Website: Next.js 16.4.3, React 19.3.0 như hiện tại, không thêm dependency backend.

**Spec:** Yêu cầu của anh trong phiên làm việc ngày 21/10/2026 và phạm vi chức năng, hợp đồng API trong các mục 1–12 của tài liệu này. Tài liệu kết hợp đặc tả và checklist triển khai để frontend/backend dùng chung một hợp đồng.

**Revision 21/10/2026 (sau review đồng thời bởi backend/security/BA/QA):** sửa lệch hiện trạng (`/dang-ky` thay vì `/dung-thu`), thêm bảng `modules`/`consent_records`, mục security headers + CORS + health check, siết lockout admin và anti-spam lead, chính sách cookie/CSRF chặt hơn, index search, quy ước migration/seed, preview bản chưa lưu, hiệu chỉnh lead có kiểm soát, chốt test stack ở Task 0 và bổ sung test case; các câu hỏi mở gom ở mục 12.4.

**Revision 27/10/2026 (chốt phạm vi admin với anh):** G1 gồm 4 nhóm — (1) đăng nhập admin + phân quyền nhân viên theo vai trò/quyền (mục 6.6), (2) đăng bài + SEO, (3) quản lý giá cả theo từng phần mềm MaxV Accounting, MaxV HĐĐT, MaxV HKD, Chữ ký số, Hóa đơn điện tử, `/bang-gia` là trang tổng hợp giá các phần mềm theo thứ tự (mục 6.7, thay `marketing_plans`/`modules` cũ), (4) lead từ form liên hệ và form tư vấn MaxV HKD. Cập nhật hiện trạng: `/dang-ky`, `/dang-nhap` đã gọi thẳng backend `be_maxv` (`hddt.maxv.vn/api/v1`) nên không còn là lead `trial` và nằm ngoài admin này. Kiến trúc chốt: API Node.js riêng, dashboard admin React riêng, website Next.js này chỉ gọi API public; task tách ra thư mục `docs/TASK/`, mỗi file một chức năng theo chuỗi API → UI admin → nối website. API là service mới; giá chỉ nhập ở admin, không còn trong code website; `/bang-gia` chỉ gom gói của các trang sản phẩm.

## Global Constraints

- Chưa thay đổi code sản phẩm, cài dependency, tạo database hay triển khai dịch vụ trong bước lập kế hoạch.
- Website: đọc hướng dẫn Next.js tại `node_modules/next/dist/docs/` trước khi sửa; project bật `cacheComponents` và `partialPrefetching`. Website không import code/DB của API, chỉ gọi HTTP `/api/v1/public/*`.
- API là nơi duy nhất kiểm tra phiên và quyền; dashboard ẩn menu/nút chỉ để tiện dùng, không thay thế kiểm tra quyền ở API.
- Hợp đồng chung giữa 3 phần là OpenAPI `maxv-api/openapi.yaml`; dashboard và website sinh type từ file này, không tự định nghĩa lại DTO bằng tay.
- Không trả mật khẩu, session token, reset token, storage secret hoặc dữ liệu lead trong API công khai/log.
- Không dùng file TypeScript, JSON trong repo hoặc localStorage làm nơi lưu dữ liệu vận hành.
- Không đổi URL công khai hiện có khi di chuyển layout hoặc nguồn dữ liệu.
- Phân quyền có từ G1: quyền cố định trong code, admin tạo vai trò bằng cách chọn quyền và gán một vai trò cho mỗi nhân viên (mục 6.6). Mọi API kiểm tra quyền cụ thể, không kiểm tra theo tên vai trò.
- Mốc thời gian lưu UTC, hiển thị giờ Việt Nam `Asia/Ho_Chi_Minh`; ngày bài viết cũ `YYYY-MM-DD` giữ nguyên ý nghĩa ngày khi migrate.
- Không commit `.env.local`; tài liệu chỉ mô tả tên biến môi trường, không ghi giá trị bí mật.
- Security headers bắt buộc mọi response: HSTS ở production, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` cho admin/API, CSP khởi điểm `default-src 'self'; object-src 'none'; base-uri 'self'` điều chỉnh img-src theo media domain; API đặt header bằng middleware, dashboard qua cấu hình web server phục vụ file tĩnh, website qua `headers()` trong `next.config.ts`; kiểm tra ở production build.
- CORS theo mục 3.3: `/api/v1/admin/*` không mở CORS (dashboard cùng origin qua reverse proxy); `/api/v1/public/leads` chỉ cho origin website, không credentials, kèm `Vary: Origin`; các GET public không cần CORS vì website gọi từ server.
- API và website validate biến môi trường bắt buộc khi khởi động (fail-fast, liệt kê biến thiếu); thiếu `NEXT_PUBLIC_SITE_URL` hiện làm lỗi runtime toàn site, không chỉ SEO.

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
| `app/san-pham/maxv-hkd/_components/consultation-form.tsx` | Submit mở `mailto:`, dữ liệu không tới server | Gửi `POST /public/leads` như form liên hệ, admin thấy trong danh sách lead |
| `app/(auth)/dang-ky`, `app/(auth)/dang-nhap` | Đã nối `be_maxv` qua `app/(auth)/_components/auth-form.tsx` (`/auth/register`, `/auth/login`) | Ngoài phạm vi admin; tài khoản khách hàng thuộc `be_maxv` |
| `app/(auth)/quen-mat-khau/page.tsx` | Form hiển thị, submit disabled | Nối API reset mật khẩu của `be_maxv` khi backend có; không thuộc admin |
| `app/_data/customers.ts`, `customer-stories.ts` | Logo trong code, câu chuyện có nội dung mẫu | Quản lý nội dung đã được duyệt; không tự xuất bản mẫu |
| `app/_data/pricing.ts` | 4 gói dạng module (Dùng thử/Cơ bản/Chuyên nghiệp/Toàn diện), 3 gói `price: null`; giá "từ 138.000đ/tháng" dùng ở trang chủ | Bỏ 4 gói và giá cứng; `/bang-gia` chỉ gom gói của 5 phần mềm từ API (mục 6.7) |
| `app/san-pham/maxv-accounting/data.ts` | `accountingPricing`: MV01–MV03 (users, scale, price chuỗi) và `extraDataset` | Xóa giá khỏi code; admin nhập gói của `maxv-accounting` |
| `app/san-pham/maxv-hkd/_components/pricing.tsx` | Giá 01/02/03 năm viết thẳng trong JSX | Xóa giá khỏi JSX; admin nhập gói của `maxv-hkd` |
| `app/san-pham/maxv-hddt`, `chu-ky-so`, `hoa-don-dien-tu` | Chưa có giá | Chỉ hiện mục giá khi admin tạo gói visible |
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
- Lead từ form liên hệ `/lien-he` và form tư vấn MaxV HKD; ghi chú, trạng thái, giao người xử lý, tìm kiếm, chống gửi trùng.
- SEO bài viết và sitemap tự cập nhật; audit log cơ bản.
- Phân quyền: quản lý nhân viên (mời, đổi vai trò, khóa/mở khóa), vai trò tạo từ danh sách quyền cố định, 3 vai trò mẫu (mục 6.6).
- Giá cả: admin chọn phần mềm, tạo/sửa/ẩn các gói giá; trang sản phẩm và `/bang-gia` cùng đọc một nguồn (mục 6.7).
- Tài khoản Quản trị viên đầu tiên tạo qua lệnh vận hành an toàn, không có đăng ký admin công khai.
- Khuyến nghị tạo 2 tài khoản admin từ G1 (một tài khoản dự phòng, mật khẩu giữ trong kho kín), kèm lệnh vận hành break-glass đặt lại mật khẩu admin khi mất quyền truy cập email.
- Đánh dấu lead trùng tiềm năng (so khớp phone/email 30 ngày gần nhất) và lead `new` quá hạn chưa xử lý để nổi bật trong UI; cân nhắc email thông báo lead mới (đơn giản, không automation) — chốt ở mục 12.4 trước Task 10.

### G2 — Nhân viên tự cập nhật nội dung website

- Logo khách hàng, câu chuyện khách hàng và lời chứng thực.
- Nội dung trang chủ, giới thiệu, 4 trang sản phẩm, bảng giá, chính sách bảo mật.
- Cấu hình liên hệ, kênh mạng xã hội, SEO mặc định.
- Dashboard số liệu nội bộ, xuất lead, audit log UI.

### G3 — Chỉ triển khai khi có nhu cầu và hệ thống nguồn

- Tạo tài khoản dùng thử thật trên backend MaxV.
- Đăng nhập/khôi phục mật khẩu khách hàng theo cơ chế của sản phẩm.
- Gửi email tự động theo nhu cầu, tích hợp CRM hoặc thông báo nội bộ.
- Kho tài liệu/hỗ trợ nghiệp vụ/tuyển dụng/tra cứu MST cần đặc tả riêng; các URL hiện là placeholder không đủ để suy ra nghiệp vụ.
- Lịch đăng bài, lịch sử phiên bản có khôi phục và quy trình duyệt nhiều cấp chưa thuộc G1/G2.

## 3. Quyết định kiến trúc

### 3.1 Ba phần và ranh giới

| | API `maxv-api` (Node.js) | Dashboard `maxv-admin` (React) | Website `page_maxv` (Next.js) |
|---|---|---|---|
| Gọi tới | PostgreSQL, thư mục ảnh trên ổ đĩa, email provider | Chỉ `/api/v1/admin/*` | Chỉ `/api/v1/public/*` |
| Dữ liệu | Sở hữu duy nhất | Không lưu, chỉ state trên màn hình | Không lưu; `app/_data` chỉ còn nhãn/UI tĩnh |
| Auth | Session admin, quyền, CSRF | Gửi cookie + header CSRF, xử lý 401/403 | Không có auth admin |
| Triển khai | Windows Service Node.js sau IIS (URL Rewrite + ARR) | File tĩnh trên IIS | Như hiện tại trên cùng server |

Danh sách REST ở mục 4–7 là hợp đồng của `maxv-api`, một service Node.js mới (chốt 27/10/2026), có database riêng. `be_maxv` giữ tài khoản khách hàng; `maxv-api` giữ dữ liệu website và tài khoản admin; không bên nào ghi vào database của bên kia.

### 3.2 Luồng xử lý

`Dashboard React → /api/v1/admin/* → xác thực + quyền + validation → service → DB/storage`

`Website (server, lúc render) → GET /api/v1/public/* → chỉ đọc published/visible → DB → website render/metadata/sitemap`

`Website (trình duyệt, form) → POST /api/v1/public/leads → validation + rate limit → DB`

Mutation nội dung thực hiện ở API: xác thực → kiểm tra dữ liệu/version → transaction lưu + audit → commit. Website đọc request-time (mục 10) nên thay đổi hiện ở request tiếp theo; nếu sau này thêm cache thì API gọi webhook revalidate của website sau commit, lỗi webhook không rollback dữ liệu.

### 3.3 Domain, cookie và CORS

- Đề xuất: `admin.maxv.vn` phục vụ file tĩnh của dashboard, IIS (URL Rewrite + ARR) chuyển `admin.maxv.vn/api/v1/admin/*` sang `maxv-api` (mục 3.5). Dashboard và API admin cùng origin nên không cần CORS, cookie `__Host-maxv_session` host-only, SameSite=Lax.
- `api.maxv.vn` (hoặc proxy dưới domain website) cho `/api/v1/public/*`. Website gọi GET từ server bằng biến `MAXV_API_URL`; form lead gọi từ trình duyệt bằng `NEXT_PUBLIC_MAXV_API_URL`, nên `POST /api/v1/public/leads` mở CORS chỉ cho origin website, không credentials.
- `/api/v1/admin/*` không bao giờ trả `Access-Control-Allow-Origin`. Nếu buộc phải tách domain dashboard và API, chỉ mở ACAO đúng origin dashboard + `Access-Control-Allow-Credentials: true` + `Vary: Origin`, và cookie đổi sang `Domain` dùng chung — ghi lại quyết định ở Task 0.

### 3.4 Website sau khi nối API

- Không di chuyển layout, không thêm `app/admin`, không thêm `app/api` nghiệp vụ. URL công khai giữ nguyên.
- Thêm `app/_lib/api.ts`: hàm fetch server-side tới `MAXV_API_URL`, timeout, map lỗi 404 → `notFound()`, lỗi 5xx → trang lỗi, type sinh từ OpenAPI.
- `app/_data/news.ts`, `pricing.ts`, `accountingPricing` thu gọn chỉ còn nhãn/UI tĩnh; dữ liệu bài và giá lấy từ API.
- Ảnh từ media domain cần thêm `images.remotePatterns` đúng domain/path storage trong `next.config.ts`.

### 3.5 Triển khai trên Windows Server 2019 + IIS

Server hiện có (chốt 27/10/2026): Windows Server 2019 Standard 1809, 8 vCPU Xeon Platinum 8260, RAM 32 GB. Cả 3 phần và PostgreSQL chạy chung server này; tài nguyên dư cho tải website. Windows Server 2019 còn bản vá bảo mật tới hết hỗ trợ mở rộng (tháng 1/2029) — lên kế hoạch nâng cấp OS trước mốc đó.

| Thành phần | Cách chạy | Nghe ở |
|---|---|---|
| PostgreSQL | Windows service, data dir trên ổ D:, `listen_addresses = 'localhost'` | `127.0.0.1:5432` |
| `maxv-api` | Windows Service bằng WinSW (`node dist/server.js`), chạy bằng local user `svc-maxv-api` (không dùng LocalSystem), tự khởi động lại khi lỗi, log ra `D:\maxv-api\logs` | `127.0.0.1:4000` |
| `maxv-admin` | File tĩnh build từ Vite, IIS site `admin.maxv.vn` | IIS 443 |
| API public | IIS site `api.maxv.vn` chỉ chuyển `/api/v1/public/*` và `/api/v1/health` sang `127.0.0.1:4000`; `/api/v1/admin/*` trả 404 ở domain này | IIS 443 |
| Ảnh | IIS site `media.maxv.vn`, physical path `D:\maxv-media` (`docs/TASK/thiet-ke-api-db.md` mục 4) | IIS 443 |
| `page_maxv` | Như cách deploy hiện tại; gọi API bằng `MAXV_API_URL=http://127.0.0.1:4000` (nội bộ, không qua TLS) | — |

Không dùng `iisnode` (đã ngừng phát triển). IIS cần cài thêm module **URL Rewrite** và **Application Request Routing (ARR)**, bật "Enable proxy" ở cấp server.

`admin.maxv.vn` — `web.config` trong thư mục build dashboard:

```xml
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="admin-api" stopProcessing="true">
          <match url="^api/v1/admin/(.*)" />
          <serverVariables>
            <set name="HTTP_X_FORWARDED_PROTO" value="https" />
          </serverVariables>
          <action type="Rewrite" url="http://127.0.0.1:4000/api/v1/admin/{R:1}" />
        </rule>
        <rule name="spa" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering>
        <requestLimits maxAllowedContentLength="6291456" />  <!-- 6 MB, khớp giới hạn ảnh 5 MiB -->
      </requestFiltering>
    </security>
  </system.webServer>
</configuration>
```

Cấu hình bắt buộc khi IIS đứng trước API:

- Cho phép server variable `HTTP_X_FORWARDED_PROTO` (IIS Manager → URL Rewrite → View Server Variables), nếu không rule báo lỗi 500.
- ARR: bật thêm client IP vào `X-Forwarded-For` và **tắt kèm port** (`includePortInXForwardedFor = false`); mặc định ARR gửi `ip:port`, làm rate limit theo IP sai.
- API chỉ tin `X-Forwarded-For`/`X-Forwarded-Proto` khi request đến từ `127.0.0.1` (trusted proxy = loopback). Nhờ `X-Forwarded-Proto: https`, API mới đặt được cookie `Secure`.
- API so `Origin` với `ADMIN_ORIGIN`, không dựa vào `Host` (ARR có thể đổi Host thành `127.0.0.1:4000`).
- Chứng chỉ TLS gắn ở IIS cho cả 3 domain; HSTS bật ở IIS.

Tường lửa và bảo mật server:

- Ảnh chụp cấu hình server cho thấy **Firewall & Network Protection đang báo lỗi (tường lửa có thể đang tắt)**. Bật Windows Defender Firewall cho mọi profile trước khi đưa API/DB lên.
- Inbound chỉ mở 80/443. RDP 3389 chỉ cho IP quản trị hoặc qua VPN. Không mở 4000 (API) và 5432 (PostgreSQL) ra ngoài; hai dịch vụ này cũng chỉ nghe `127.0.0.1`.
- Bật Windows Update tự động cho bản vá bảo mật; giữ Defender bật (chỉ loại trừ thư mục ảnh như mục 4.1 file thiết kế).

Deploy `maxv-api`: build trên CI → copy artifact lên server → `npm ci --omit=dev` → `npx prisma migrate deploy` → `Restart-Service maxv-api`. Prisma Client sinh trên Linux CI phải có engine Windows: `binaryTargets = ["native", "windows"]` trong `schema.prisma` (hoặc chạy `prisma generate` ngay trên server).

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
| 409 | `VERSION_CONFLICT`, `SLUG_CONFLICT`, `MEDIA_IN_USE`, `LAST_ADMIN`, `ROLE_IN_USE`, `SYSTEM_ROLE`, `CONSENT_VERSION_CHANGED`, `IDEMPOTENCY_PAYLOAD_MISMATCH` | Xung đột dữ liệu/nghiệp vụ |
| 413 | `PAYLOAD_TOO_LARGE` | Vượt dung lượng |
| 415 | `UNSUPPORTED_MEDIA_TYPE` | Content-Type/file không hỗ trợ |
| 422 | `VALIDATION_ERROR`, `INVALID_STATE_TRANSITION` | Sai trường/trạng thái |
| 428 | `PRECONDITION_REQUIRED` | Mutation DELETE đòi `If-Match` mà request không gửi |
| 429 | `RATE_LIMITED` | Quá giới hạn; có `Retry-After` |
| 500/503 | `INTERNAL_ERROR`, `SERVICE_UNAVAILABLE`, `STORAGE_FULL` (ổ ảnh dưới ngưỡng trống) | Không lộ stack/query/secret; ghi requestId để tra log |

### 4.2 Quyền, phiên và đồng thời

- Cookie session tên `__Host-maxv_session`: HttpOnly, Secure, SameSite=Lax, Path=/ (prefix `__Host-` buộc Secure và chặn cookie từ subdomain); session server-side có thể thu hồi. Dashboard React không đọc/lưu token (cookie HttpOnly), không lưu token hay PII vào localStorage; CSRF token chỉ giữ trong bộ nhớ, lấy lại từ `GET /admin/auth/session` khi tải trang.
- Phiên admin hết hạn sau 8 giờ, hết hạn do không hoạt động sau 30 phút; kiểm tra idle ở request đã xác thực, không cho polling tự kéo dài vô hạn.
- Mutation admin dùng JSON hoặc multipart, kiểm tra Origin đúng origin dashboard; yêu cầu CSRF token gắn với session qua header `X-CSRF-Token`. Login cũng kiểm tra Origin, chỉ nhận JSON.
- `GET /admin/auth/session` trả thông tin người dùng và CSRF token; token không phải session secret, không ghi log.
- Login luôn sinh session token mới, không tái sử dụng identifier nào từ request trước login (chống session fixation). CSRF token là random ≥128-bit gắn với session, rotate khi login và khi đổi mật khẩu, một token active mỗi session, vô hiệu khi logout.
- Có test regression cho ngoại lệ SameSite=Lax+POST (cookie mới set trong 2 phút vẫn được gửi kèm cross-site POST top-level): Origin check phải chặn ở mọi route mutation, kể cả khi một route quên kiểm tra.
- Quyền kiểm tra theo permission key ở mục 6.6 (`requirePermission("posts.publish")`), đọc quyền của vai trò từ DB mỗi request để đổi quyền có hiệu lực ngay. Preview cần `posts.view`; vai trò không có quyền này không đọc được draft.
- Record chỉnh sửa có `version` số nguyên. PATCH/PUT và hành động publish/archive/delete phải gửi version hiện đọc; update atomically `WHERE id AND version`, tăng version khi thành công.
- JSON mutation gửi `version` trong body; DELETE gửi `If-Match: "<version>"`. Không cho version của client thay đổi timestamp/actor.
- `Cache-Control: private, no-store` với mọi response auth/admin/preview/lead; không dùng shared cache cho session hoặc PII.

### 4.3 Health check

- `GET /api/v1/health`: public, không auth, không PII; trả `200` khi ứng dụng sống, `503` kèm tên dependency hỏng khi mất kết nối database. `GET /api/v1/health/ready` kiểm tra thêm storage để làm deployment gate. Không trả phiên bản/stack chi tiết.

## 5. Mô hình dữ liệu

DDL PostgreSQL đầy đủ, ví dụ request/response và phương án lưu ảnh: [thiet-ke-api-db.md](../../TASK/thiet-ke-api-db.md). Bảng dưới là tóm tắt; khi lệch thì file đó là bản đúng.

Các bảng có UUID, createdAt, updatedAt trừ bảng liên kết. Nội dung có createdBy/updatedBy/version. Foreign key và unique constraint là bắt buộc ở DB, không chỉ kiểm tra trong UI.

| Bảng | Trường chính | Ràng buộc và index |
|---|---|---|
| `admin_users` | email, displayName, passwordHash/providerId, roleId, status, lastLoginAt | Email normalize lowercase unique; roleId FK `admin_roles`; status invited/active/disabled; không xóa cứng để audit giữ tên người thao tác |
| `admin_roles` | name, description, isSystem, version | name unique; `isSystem=true` chỉ cho "Quản trị viên" (toàn quyền, không sửa/xóa); xóa chỉ khi không còn user dùng |
| `admin_role_permissions` | roleId, permission | Unique (roleId, permission); permission thuộc whitelist mục 6.6, CHECK hoặc validate ở service |
| `admin_sessions` | userId, tokenHash, expiresAt, lastActivityAt | Không lưu raw token; index tokenHash, expiresAt; thu hồi khi disable/reset mật khẩu |
| `admin_tokens` | userId, scope activation/password_reset, tokenHash, expiresAt, usedAt | Token một lần (activation 24h, reset 15 phút); không lưu raw token; thay bảng `admin_password_resets` |
| `news_categories` | slug, label, description, sortOrder | Seed 5 slug hiện tại; G1/G2 không thêm/xóa/đổi slug |
| `posts` | categoryId, slug, title, excerpt, content, coverMediaId, featured, state, publishedAt, firstPublishedAt, seoTitle, seoDescription, version | Slug unique trong category; state draft/published/archived; index state+publishedAt, categoryId+state+publishedAt, GIN pg_trgm+unaccent cho tìm kiếm title/excerpt/content |
| `media` | storageKey, originalName, mimeType, sizeBytes, width, height, alt, status, uploadedBy | storageKey unique; status ready/deleting; URL dẫn xuất từ storageKey, không tin URL client gửi |
| `media_usages` | mediaId, resourceType, resourceId, field | Unique theo bộ trường; update trong transaction cùng nội dung; chặn xóa ảnh đang dùng |
| `leads` | type, topic, name, phone, email, company, industry, productKey, message, sourcePath, utm, consentAt, consentVersion, status, assignedTo, version | type contact (`/lien-he`)/consult (form tư vấn trang sản phẩm, hiện là MaxV HKD); status new/contacted/qualified/closed/spam; index createdAt, status, assignedTo, pg_trgm các cột tìm kiếm (name/phone/email/company); PII không public |
| `lead_notes` | leadId, authorId, body | Append-only, index leadId+createdAt; không cho chỉnh lịch sử ngầm |
| `lead_requests` | idempotencyKeyHash, payloadHash, ipHash, leadId, expiresAt | Unique key; lưu 24 giờ để chống retry trùng; ipHash (SHA-256 + pepper) chỉ phục vụ rate limit, không lưu raw IP |
| `consent_records` | leadRefHash, type, sourcePath, consentAt, consentVersion | Append-only bằng chứng đồng ý tách khỏi lead; chỉ lưu hash tham chiếu (không PII trực tiếp); retention dài hơn lead (đề xuất 3 năm), không xóa theo yêu cầu xóa PII của chủ dữ liệu |
| `customers` | name, logoMediaId, websiteUrl, sortOrder, visible, version | URL https/http hợp lệ; className từ code không phải trường editable |
| `customer_stories` | customerId, slug, title, excerpt, content, heroMediaId, results, testimonial, state, publishedAt, version | Slug unique; chỉ renderer hỗ trợ mới cho publish |
| `pages` | key, draftContent, publishedContent, draftSeo, publishedSeo, publishedAt, version | key whitelist cố định; sửa draft không đổi website live |
| `pricing_products` | key, name, title, description, notes, sortOrder, visible, version | key cố định seed 5 phần mềm `maxv-accounting|maxv-hddt|maxv-hkd|chu-ky-so|hoa-don-dien-tu`, không tạo/xóa qua API; sortOrder là thứ tự trên `/bang-gia`; notes tối đa 5 dòng |
| `pricing_plans` | productId, name, description, priceMode, priceAmount, billingPeriod, specs, features, featured, cta, sortOrder, visible, version | FK productId; priceMode free/fixed/from/contact; currency VND; giá lưu integer đồng, không lưu chuỗi đã định dạng; index (productId, sortOrder) |
| `site_settings` | key, value, version | key cố định contact/social/seo; từng value có schema riêng |
| `audit_logs` | actorId, action, resourceType, resourceId, changedFields, requestId, result | Append-only; không lưu raw password/token/lead message hoặc snapshot PII; index (actorId, createdAt) và (resourceType, resourceId, createdAt) |

Email/password có thể do thư viện/provider auth sở hữu schema; không tạo bảng auth trùng nếu chọn provider. Các resource nghiệp vụ giữ hợp đồng tương đương.

### 5.1 Nội dung bài viết và trang

- Không nhận HTML tùy ý, script, iframe hoặc class Tailwind từ admin.
- Nội dung bài viết là danh sách block có schema: `paragraph { text }`, `heading { level: 2|3, text }`, `list { ordered, items: string[] }`, `image { mediaId, alt, caption? }`, `link { text, href }`.
- Tối đa 200 block/bài, 100.000 ký tự tổng văn bản, heading/paragraph không được rỗng. Link chỉ http/https hoặc đường dẫn nội bộ bắt đầu `/` nhưng không `//`.
- React render text escape mặc định; không dùng `dangerouslySetInnerHTML`. Khi cần rich text phức tạp phải có schema/sanitizer và test riêng trước khi mở định dạng.
- Trang marketing dùng section schema tương ứng từng trang hiện có, không tạo page builder tổng quát. Icon là key whitelist ánh xạ sang lucide trong code; không lưu React component trong DB.
- Bảng `pages` quản lý hero/features/FAQ/CTA theo trang. Giá lấy từ `pricing_plans`; liên hệ lấy từ settings; logo/câu chuyện lấy resource tương ứng. Không lưu hai bản cùng trường ở nhiều nguồn.

### 5.2 Xuất bản và URL

- Bài mới luôn draft. Publish phải có title, category hợp lệ, slug, excerpt, nội dung có text, cover ảnh ready với alt và SEO hợp lệ.
- `draft → published`, `published → draft` (unpublish), `draft|published → archived`, `archived → draft` (restore).
- PATCH bài published chỉnh bản live ngay và yêu cầu xác nhận UI; không có draft song song cho bài đã publish trong G1. Nếu cần chỉnh chưa công khai phải unpublish trước. Trang marketing G2 có draft/published riêng vì thường xuyên sửa trang đang hoạt động.
- Preview bản chưa lưu (stateless): `POST /api/v1/admin/posts/{id}/preview` nhận payload như PATCH (validate đầy đủ), trả DTO preview render từ nội dung gửi lên mà không ghi DB — cho phép xem trước bản sửa của bài published trước khi PATCH live. Runbook sửa khẩn cấp: lỗi hiển thị nhỏ → PATCH sau khi preview stateless; nội dung nghiêm trọng → unpublish ngay rồi sửa.
- `publishedAt` là lần xuất bản gần nhất, `firstPublishedAt` giữ lần đầu để JSON-LD datePublished; updatedAt dùng dateModified.
- Chặn thay slug/category của bài hoặc story đã từng publish. Tránh phát sinh URL chết; tính năng đổi URL+301 chỉ thêm khi có yêu cầu thực tế.
- `DELETE` chỉ xóa cứng record draft chưa từng publish hoặc archived chưa từng publish. Nội dung từng publish chỉ lưu trữ để giữ lịch sử. Gỡ công khai trả 404 ở URL public; không tự redirect về trang chủ.

### 5.3 Migration, seed và index search

- Một công cụ migration duy nhất: Prisma Migrate (`prisma migrate deploy` ở CI/production). CHECK và hàm không khai báo được trong schema thì dán vào migration tạo bằng `--create-only` (`docs/TASK/thiet-ke-api-db.md` mục 5.2); migration chạy bằng lệnh vận hành/CI trước khi roll code, ứng dụng không tự chạy migration khi start. Theo kiểu expand-contract: thêm cột/bảng trước, backfill, mới siết constraint; mỗi migration ghi cách phục hồi. G1 không xóa cột/bảng: ưu tiên quay về code tương thích với schema mở rộng hoặc migration sửa tiến; không đảo migration bằng cách xóa dữ liệu vừa nhập. Khôi phục backup phải ghi rõ khoảng dữ liệu có thể mất (checklist phát hành ở `docs/TASK/06-phat-hanh-g1.md`).
- Seed idempotent bằng UPSERT theo slug/key (5 category, 5 pricing product, 3 vai trò mẫu; không seed gói giá); chạy lại không tạo bản sao.
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
| GET | `/api/v1/admin/posts/{id}/preview` | Cookie | DTO preview riêng tư; dashboard `/posts/{id}/preview` render bằng component preview (mục 9) |
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
| POST | `/api/v1/admin/media` | multipart `file`, `alt` | Upload server-side, ghi vào thư mục ảnh trên ổ đĩa server, 201 media |
| GET | `/api/v1/admin/media` | q theo tên/alt, page, pageSize | Danh sách ảnh ready, sort createdAt:desc |
| GET | `/api/v1/admin/media/{id}` | UUID | Metadata + usageCount + usage references admin được phép đọc |
| PATCH | `/api/v1/admin/media/{id}` | alt, version | Sửa alt, không thay binary tại cùng storageKey |
| DELETE | `/api/v1/admin/media/{id}` | If-Match version | Chỉ ảnh không được tham chiếu; đang dùng trả 409 |

- G1 nhận JPEG/PNG/WebP tối đa 5 MiB, 4096×4096 và tối đa 16 triệu pixel, alt 1–250 ký tự. Reject SVG/GIF/file executable, tên đường dẫn và MIME giả; kiểm tra magic bytes và decode ảnh phía server. SVG đang có trong repo vẫn được dùng tĩnh, không mở upload SVG mới.
- StorageKey do server sinh UUID, không dùng filename/path client. Public URL chỉ cho media ready; ảnh upload là tài nguyên công khai dù bài gắn ảnh còn draft, không upload tài liệu mật vào kho này.
- Backend upload và ghi DB có bù trừ khi một bên thất bại; job dọn orphan có tuổi >24 giờ, không xóa file đang pending request.
- Xóa chuyển status deleting trong transaction sau kiểm tra usage và khóa record; service gắn ảnh phải lock/check ready để không tạo reference trong lúc xóa. Xóa file idempotent rồi xóa DB; retry nếu xóa file lỗi, không báo thành công giả.
- Ảnh dùng URL bất biến; thay ảnh tạo media mới. Cấu hình Next Image remotePatterns chỉ domain/path storage được chọn; không cho arbitrary remote URL.
- Strip toàn bộ metadata EXIF và re-encode ảnh (JPEG/WebP chuẩn, không giữ metadata) trước khi lưu — xóa GPS/thời điểm chụp và payload nhúng trong file gốc, vì ảnh là công khai với URL bất biến.
- IIS phục vụ ảnh ở `media.maxv.vn`: tắt directory browsing, chỉ trả đuôi webp/jpg/png, `Content-Type` theo đuôi, `X-Content-Type-Options: nosniff`, `Content-Disposition: inline; filename="media"`, `Cache-Control: public, max-age=31536000, immutable` (cấu hình mẫu ở `docs/TASK/thiet-ke-api-db.md` mục 4.3, `web.config`).
- Giới hạn upload: tối đa 10 upload/phút/user và trần dung lượng theo user; từ chối sớm qua Content-Length trước khi đọc body.
- Job reconcile định kỳ quét media `status=deleting` quá 24 giờ: kiểm tra usage lần nữa rồi hoàn tất xóa object + DB, hoặc đưa về `ready` nếu object còn tồn tại và không có tham chiếu — tránh record kẹt vĩnh viễn khi process chết giữa chừng.
- UI upload hiển thị cảnh báo cố định "mọi ảnh upload là công khai ngay cả khi bài chưa đăng"; quy trình sự cố ảnh nhạy cảm (gỡ tham chiếu → xóa → purge cache Cloudflare nếu có, xóa snapshot backup chứa ảnh → audit sự cố) ghi trong runbook mục 12.2.

### 6.4 Lead quản trị

| Method | Endpoint | Input | Chức năng |
|---|---|---|---|
| GET | `/api/v1/admin/leads` | q, type, topic, status, assignedTo, from, to, page, pageSize | Danh sách sort createdAt:desc; q tìm tên/phone/email/company |
| GET | `/api/v1/admin/leads/{id}` | UUID | Chi tiết, nguồn, consent, người phụ trách; không trả hash idempotency/IP |
| PATCH | `/api/v1/admin/leads/{id}` | status, assignedTo nullable, version | Đổi trạng thái/giao việc; chỉ giao nhân viên active có quyền `leads.update`; không sửa thông tin khách gửi |
| GET | `/api/v1/admin/leads/{id}/notes` | page, pageSize | Ghi chú theo createdAt:asc |
| POST | `/api/v1/admin/leads/{id}/notes` | body 1–2000 ký tự | 201 ghi chú append-only, actor từ session |

Ngày lọc from/to là ISO datetime, `from` inclusive, `to` exclusive; UI đổi khoảng ngày Việt Nam thành UTC trước khi gọi. Lead mới luôn `new`; có thể chuyển giữa các trạng thái trừ spam chỉ admin được đưa ra khỏi spam. Mọi chuyển trạng thái/giao việc có audit. Không có xóa lead thông thường trong G1; có quy trình xử lý yêu cầu xóa PII ở mục vận hành.

Quy tắc bổ sung:

- Khi tạo lead, server so khớp phone/email đã normalize với lead tạo trong 30 ngày gần nhất và gắn nhãn "có thể trùng" (không chặn); UI chi tiết hiển thị các lead trùng tiềm năng kèm trạng thái. G1 xử lý trùng bằng note + đóng lead phụ (`closed`); merge thật thuộc G3.
- PATCH cho phép hiệu chỉnh có kiểm soát `name/phone/email/company` kèm `reason` bắt buộc 1–500 ký tự: giá trị gốc và lý do lưu vào audit/note nội bộ, không ghi đè âm thầm — phục vụ dữ liệu khách gõ sai và yêu cầu chỉnh sửa theo Nghị định 13/2023.
- Dự kiến: lead `new` quá 4 giờ giờ hành chính chưa `contacted` được đánh dấu "quá hạn" và nổi bật trong UI; mốc thời gian, lịch làm việc/ngày nghỉ và cách tính cần chốt tại mục 12.4 câu 6 trước triển khai logic quá hạn. Lead `topic=ho-tro` hiển thị đầu danh sách mặc định.

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
  "productKey": "maxv-hddt",
  "message": "Tôi muốn được tư vấn.",
  "sourcePath": "/lien-he",
  "utm": { "source": "google", "medium": "cpc", "campaign": "maxv" },
  "consent": true,
  "consentVersion": "privacy-v1",
  "website": ""
}
```

Quy tắc:

- type contact/consult; contact yêu cầu topic `tu-van|ho-tro|hop-tac`; consult không nhận topic, bắt buộc đúng một productKey (form MaxV HKD gửi `maxv-hkd`). name 1–100, phone 8–20 ký tự sau normalize khoảng trắng/dấu phân cách, chỉ `+` đầu và chữ số; không ép Number làm mất số 0.
- contact: name/phone bắt buộc, email/company tùy chọn. consult: name/phone bắt buộc, `industry` tùy chọn theo whitelist option của form HKD. email tối đa 254 và hợp lệ; company tối đa 200; message tối đa 5000.
- Không nhận mã số thuế: form hiện tại không có trường này (bỏ `taxCode`, thêm khi form có).
- `productKey` (một giá trị, vì form chỉ cho chọn một sản phẩm) thuộc whitelist trùng key `pricing_products`: `maxv-accounting|maxv-hddt|maxv-hkd|hoa-don-dien-tu|chu-ky-so`. Không nhận `moduleKeys`; đăng ký dùng thử đi thẳng `be_maxv`, không qua lead.
- consent phải true; consentVersion phải khớp phiên bản chính sách đang hiển thị, sai phiên bản trả 409 `CONSENT_VERSION_CHANGED`. consentAt do server ghi. G1 phải xuất bản trang chính sách thật trước khi bật nhận lead.
- sourcePath là path nội bộ tối đa 300, không URL tùy ý; mỗi UTM tối đa 100, không đưa cookie/query có secret vào payload. Nguồn là dữ liệu attribution client cung cấp, không dùng để quyết định quyền.
- `website` honeypot phải rỗng; nếu không rỗng trả `201` với receiptId giả và không tạo lead (không tiết lộ rằng bị phát hiện); kèm kiểm tra tốc độ gửi và tín hiệu bot phía server. Không gửi PII tới analytics.
- `Idempotency-Key`: UUID do client sinh một lần mỗi lần gửi chủ động, giữ lại khi retry. Cùng key+payload trong 24h trả lại receipt cũ với 200; cùng key khác payload trả 409 `IDEMPOTENCY_PAYLOAD_MISMATCH`. Hai request đồng thời chỉ tạo một lead.
- Giới hạn bắt buộc trước khi bật form: 5 lần/IP/10 phút (IPv6 đếm theo prefix /64), trần toàn hệ thống 100 lead/10 phút (vượt trần trả 429 kèm alert vận hành) và chiều phụ theo `type`/`sourcePath`; trusted proxy phải được cấu hình, không tin X-Forwarded-For tùy ý. Khi tỷ lệ spam vượt ngưỡng do vận hành chốt, bật Turnstile/hCaptcha theo quy trình runbook cụ thể — không để ở mức "cân nhắc sau".
- IP lưu dạng `ipHash` (hash kèm pepper) trong `lead_requests`, tự xóa theo cửa sổ 24 giờ của idempotency; không đưa IP (kể cả hash) vào API response hay export.
- Không dedupe vĩnh viễn theo phone/email: khách có thể gửi nhu cầu mới hợp lệ.
- `/dang-ky` đã tạo tài khoản thật trên `be_maxv` nên không gửi lead; trường `password` nếu lọt vào payload lead bị strip, không lưu DB/audit. Form HKD bỏ `mailto:`, gửi `type=consult`; form `/lien-he` đổi value option “Sản phẩm quan tâm” từ label tiếng Việt sang productKey slug khi nối backend.

### 6.6 Phân quyền và nhân viên

Quyền cố định trong code (mỗi quyền đều có code kiểm tra đi kèm, admin không tạo quyền mới):

| Chức năng | Xem | Tạo/Sửa | Xuất bản | Xóa |
|---|---|---|---|---|
| Bài viết & SEO | `posts.view` | `posts.edit` | `posts.publish` | `posts.delete` |
| Thư viện ảnh | `media.view` | `media.upload` | | `media.delete` |
| Giá cả | `pricing.view` | `pricing.edit` | | |
| Lead | `leads.view` | `leads.update` (trạng thái, ghi chú, giao việc) | | |
| Xuất lead | `leads.export` | | | |
| Cấu hình website (G2) | `settings.view` | `settings.edit` | | |
| Nhân viên & vai trò | `users.view` | `users.manage` | | |
| Nhật ký thao tác | `audit.view` | | | |

`posts.publish` tách khỏi `posts.edit` để cộng tác viên viết bài mà chưa được đăng; `leads.export` tách riêng vì file chứa PII.

Vai trò seed:

| Vai trò | Quyền |
|---|---|
| Quản trị viên (`isSystem`) | Toàn bộ, kể cả quyền thêm sau; không sửa/xóa |
| Biên tập viên | `posts.*`, `media.*`, `pricing.view` |
| Kinh doanh | `leads.view`, `leads.update`, `pricing.view` |

| Method | Endpoint | Quyền | Chức năng |
|---|---|---|---|
| GET | `/api/v1/admin/permissions` | `users.view` | Danh sách quyền cố định (key, nhóm, nhãn tiếng Việt) để render bảng tick |
| GET | `/api/v1/admin/roles` | `users.view` | Vai trò kèm số nhân viên đang dùng |
| POST | `/api/v1/admin/roles` | `users.manage` | name 1–100, description ≤300, permissions[] thuộc whitelist; 201 |
| GET | `/api/v1/admin/roles/{id}` | `users.view` | Chi tiết + permissions + version |
| PATCH | `/api/v1/admin/roles/{id}` | `users.manage` | name/description/permissions + version; vai trò hệ thống trả 409 `SYSTEM_ROLE` |
| DELETE | `/api/v1/admin/roles/{id}` | `users.manage` | If-Match; còn nhân viên dùng trả 409 `ROLE_IN_USE` |
| GET | `/api/v1/admin/users` | `users.view` | q, roleId, status, pagination |
| POST | `/api/v1/admin/users` | `users.manage` | email, displayName, roleId; tạo user `invited`, gửi email kích hoạt một lần; email trùng 409 |
| GET | `/api/v1/admin/users/{id}` | `users.view` | Thông tin user, lastLoginAt; không passwordHash |
| PATCH | `/api/v1/admin/users/{id}` | `users.manage` | displayName, roleId, status, version |
| POST | `/api/v1/admin/users/{id}/send-activation` | `users.manage` | Gửi lại link kích hoạt user `invited`, không trả token |
| POST | `/api/v1/admin/users/{id}/reset-password` | `users.manage` | Gửi link đặt lại mật khẩu; admin không tự đặt mật khẩu cho người khác |
| POST | `/api/v1/admin/users/{id}/revoke-sessions` | `users.manage` | Thu hồi toàn bộ phiên |

Quy tắc:

- Luôn còn ít nhất một user active giữ vai trò Quản trị viên: không tự hạ quyền/khóa chính mình, không khóa/hạ Quản trị viên cuối cùng kể cả hai request đồng thời (kiểm tra và khóa trong transaction, lỗi `LAST_ADMIN`).
- Đổi vai trò hoặc khóa user thu hồi ngay mọi phiên của user đó. Sửa quyền của vai trò có hiệu lực ở request tiếp theo vì quyền đọc từ DB mỗi request.
- Không xóa cứng user; khóa (`disabled`) để audit vẫn hiện tên người đã thao tác.
- Audit: mời/khóa/mở khóa user, đổi vai trò user, tạo/sửa/xóa vai trò (ghi danh sách quyền trước/sau).
- Kích hoạt dùng token scope activation riêng, 24h, một lần; đặt mật khẩu và chuyển active atomically.
- UI ẩn menu/nút theo quyền chỉ để tiện dùng; API vẫn trả 403 khi thiếu quyền.

### 6.7 Giá cả theo phần mềm và `/bang-gia`

Mỗi phần mềm (`pricing_products`, 5 key cố định) có danh sách gói (`pricing_plans`) do admin tạo. Giao diện mỗi trang giữ trong code; admin chỉ sửa dữ liệu. Trang sản phẩm đọc gói của phần mềm đó; `/bang-gia` hiện lần lượt từng phần mềm visible theo `sortOrder`, mỗi phần mềm là một section với các gói visible của nó. Phần mềm chưa có gói visible không hiện mục giá.

| Method | Endpoint | Quyền | Chức năng |
|---|---|---|---|
| GET | `/api/v1/admin/pricing/products` | `pricing.view` | 5 phần mềm kèm số gói, sortOrder, visible |
| GET | `/api/v1/admin/pricing/products/{key}` | `pricing.view` | Thông tin phần mềm + toàn bộ gói (cả hidden) |
| PATCH | `/api/v1/admin/pricing/products/{key}` | `pricing.edit` | title, description, notes, sortOrder, visible + version |
| POST | `/api/v1/admin/pricing/products/{key}/plans` | `pricing.edit` | Tạo gói, mặc định visible=false; 201 |
| PATCH | `/api/v1/admin/pricing/plans/{id}` | `pricing.edit` | Sửa gói + version |
| DELETE | `/api/v1/admin/pricing/plans/{id}` | `pricing.edit` | If-Match; ưu tiên ẩn; không xóa gói đang chọn làm giá trang chủ |
| GET | `/api/v1/public/pricing` | Public | Các phần mềm visible theo sortOrder, mỗi phần mềm kèm gói visible |
| GET | `/api/v1/public/pricing/{key}` | Public | Một phần mềm + gói visible; phần mềm hidden trả 404 |

PlanInput: `name` 1–100 (ví dụ `MV01`, `01 năm`, `Cơ bản`); `description` ≤300; `priceMode` free/fixed/from/contact; `priceAmount` integer ≥0 ≤1.000.000.000.000 VND — contact dùng null (hiện "Liên hệ"), free dùng 0 (hiện "Miễn phí"), fixed/from bắt buộc >0 (from hiện "Từ …"); `billingPeriod` month/year/once/none; `specs` tối đa 8 `{label≤50, value≤100}` (ví dụ Người dùng: 02, Quy mô: nhỏ); `features` tối đa 20 dòng ≤150; `featured`; `cta {label≤100, href}` chỉ đường dẫn nội bộ/anchor hoặc https domain được duyệt, không `javascript:`; `sortOrder`; `visible`. ProductPatch `notes` tối đa 5 dòng ≤300 (ví dụ "Bộ số liệu thêm: 800.000đ/năm", "Giá tham khảo, xác nhận khi đăng ký").

Quyết định 27/10/2026:

- Giá không còn nằm trong code `page_maxv`. Seed chỉ tạo 5 phần mềm, không seed gói; admin nhập toàn bộ gói và giá trên dashboard. Sau Task 15, mọi giá cứng trong `app/_data/pricing.ts`, `app/san-pham/maxv-accounting/data.ts`, `app/san-pham/maxv-hkd/_components/pricing.tsx` bị xóa.
- `/bang-gia` không có bộ gói riêng, chỉ gom gói của 5 phần mềm ở `/san-pham/*`. 4 gói Dùng thử/Cơ bản/Chuyên nghiệp/Toàn diện hiện có bị bỏ; admin tạo lại thành gói của phần mềm tương ứng nếu cần.

Quy tắc: giá định dạng khi render (`1650000` → `1.650.000đ`), không lưu chuỗi đã định dạng, không dùng float. Mọi thay đổi `priceAmount`/`priceMode`/`visible` ghi audit kèm giá trị cũ và mới. Website đọc giá request-time nên sửa giá hiện ngay ở trang sản phẩm tương ứng, `/bang-gia` và trang chủ (mục 10). Giá hiển thị là giá marketing, không phải giá thanh toán trong `be_maxv`.

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
| pricing | `/bang-gia` | Heading, FAQ/CTA nếu có; giá và thứ tự phần mềm quản lý ở mục 6.7, không nhập lại ở đây |
| privacy | `/chinh-sach-bao-mat` | Nội dung chính sách và policyVersion; thay version buộc form lấy consent mới |

G1 chính sách privacy có thể là trang tĩnh đã duyệt. G2 migrate thành published page trước khi chuyển form sang đọc policyVersion ở dữ liệu này. Không được có hai nguồn version chính sách cùng hoạt động.

Mỗi key có schema riêng trong file `.schema.ts`, dựa vào data export/JSX hiện có, giới hạn array/text/media cụ thể trước khi viết endpoint. Không nhận blob JSON tùy ý chỉ vì cột DB là JSONB. Section sản phẩm nào đang nằm trong JSX phải tách dữ liệu ra trước rồi mới có trường admin tương ứng. G2 thực hiện từng trang, không yêu cầu chuyển toàn bộ trang trong một đợt deploy.

### 7.4 Bảng giá

Đã chuyển lên G1, xem mục 6.7. Bảng `marketing_plans`/`modules` và endpoint `marketing-plans`/`modules` cũ bỏ. Giá trang chủ ("Từ …/tháng") đọc từ một gói được chọn, cách chọn chốt ở mục 12.4.

### 7.5 Cấu hình website

| Method | Endpoint | Quyền/ý nghĩa |
|---|---|---|
| GET | `/api/v1/admin/settings/{key}` | `settings.view`; key contact/social/seo |
| PUT | `/api/v1/admin/settings/{key}` | `settings.edit`; value có schema + version; áp dụng live và audit |
| GET | `/api/v1/public/site-config` | Chỉ trường công khai, không biến môi trường/secrets |

- contact: hotline, hotlineDisplay, email, address, businessHours. hotlineHref/mailto dẫn xuất ở server, không nhập lại nhiều trường dễ lệch.
- social: zaloUrl/facebookUrl/youtubeUrl nullable; URL https và domain đúng kênh.
- seo: siteName, defaultTitle, defaultDescription, defaultOgMediaId. canonical origin luôn lấy deployment config; không cho sửa origin trong CMS.
- public site-config bao gồm policyVersion để form G2 dùng, nhưng không trả cài đặt email/storage/DB.
- contact widget, footer, trang liên hệ và JSON-LD Organization phải cùng đọc nguồn cấu hình.

### 7.6 Dashboard, export và audit

Quản lý nhân viên và vai trò đã chuyển lên G1, xem mục 6.6.

| Method | Endpoint | Chức năng / quyền |
|---|---|---|
| GET | `/api/v1/admin/dashboard` | Đăng nhập; from/to; chỉ trả số liệu thuộc quyền user (số bài cần `posts.view`, lead cần `leads.view`): lead theo type/status/sản phẩm và chuỗi lead theo ngày |
| GET | `/api/v1/admin/leads/export` | `leads.export`; cùng bộ lọc lead, date range tối đa 90 ngày, tối đa 10.000 dòng |
| GET | `/api/v1/admin/audit-logs` | `audit.view`; actorId, action, resourceType, resourceId, from/to, pagination |
| DELETE | `/api/v1/admin/leads/{id}` | Quản trị viên; If-Match version, lý do bắt buộc qua body JSON `{"reason"}` 1–300 ký tự (HTTP header không truyền được tiếng Việt); xóa PII theo yêu cầu hợp lệ |

Dashboard không phải Google Analytics: không thể thống kê page view, doanh thu, conversion rate chính xác nếu chưa có nguồn sự kiện. Nếu thêm phân tích truy cập phải đặc tả dữ liệu/consent riêng.

Export CSV UTF-8 có BOM, attachment, escape dấu quote/newline và chống spreadsheet formula injection với ô bắt đầu `= + - @` hoặc ký tự điều khiển. Không vượt 10.000 thì âm thầm cắt: trả 422 yêu cầu thu hẹp bộ lọc. Export và xóa PII phải có audit không chứa nội dung PII. Route `leads/export` dùng segment tĩnh, không coi export là UUID. Export chỉ xuất whitelist cột: name, phone, email, company, productKey, industry, type, topic, status, createdAt, assignedTo, consentVersion — không xuất IP (kể cả hash) hay idempotency key. Giới hạn 5 export/user/giờ qua shared rate limit; audit export ghi actor, bộ lọc đã scrub, rowCount, timestamp để monitoring phát hiện hành vi rà soát dữ liệu. Cân nhắc yêu cầu re-auth (xác nhận mật khẩu) cho export trên 5.000 dòng.

Xóa lead đồng thời xóa notes/idempotency references trong transaction; xóa email job chưa gửi có PII nếu đã bổ sung job. Audit chỉ giữ ID mờ + loại hành động + actor + timestamp, không ghi lý do chứa PII. Bản backup tuân theo thời gian lưu tại mục 12, không cam kết xóa ngay mọi backup.

## 8. Hợp đồng tích hợp G3 với backend sản phẩm

Cập nhật 27/10/2026: đăng ký và đăng nhập khách hàng đã gọi thẳng `be_maxv` (`POST /api/v1/auth/register`, `POST /api/v1/auth/login`, cookie phiên của `hddt.maxv.vn`, MFA chuyển sang trang login của hddt), nên các dòng `account/auth/login`, `session`, `logout` và `trial-registrations` dưới đây không cần làm ở website. Còn lại quên/đặt lại mật khẩu khách hàng, chờ endpoint thật của `be_maxv`.

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

## 9. Màn hình dashboard React (`maxv-admin`) và API tương ứng

URL dưới đây là route của dashboard tại `admin.maxv.vn` (React Router). Mỗi màn hình chỉ gọi `/api/v1/admin/*` đã liệt kê; task UI ở mục 11 chỉ bắt đầu sau khi task API tương ứng đạt nghiệm thu.

| Màn hình | URL | API/resource |
|---|---|---|
| Đăng nhập | `/login` | auth/login, auth/session |
| Quên/đặt lại mật khẩu | `/forgot-password`, `/reset-password` | auth/forgot-password, reset-password |
| Bài viết | `/posts` | posts list, news-categories |
| Tạo/sửa bài | `/posts/new`, `/posts/{id}/edit` | posts CRUD, publish actions, media |
| Xem trước | `/posts/{id}/preview` | private preview; không cần link chia sẻ công khai |
| Thư viện ảnh | `/media` | media CRUD |
| Yêu cầu khách hàng | `/leads`, `/leads/{id}` | leads, notes; lọc theo nguồn form/sản phẩm; G2 export |
| Đổi mật khẩu | `/account` | auth/change-password |
| Giá cả | `/pricing` | Danh sách 5 phần mềm, kéo/sửa thứ tự hiển thị trên `/bang-gia`, bật/tắt |
| Gói giá của phần mềm | `/pricing/{key}` | Thông tin + ghi chú phần mềm, bảng gói (thêm/sửa/ẩn/xóa, thứ tự, nổi bật), xem trước như trang công khai |
| Nhân viên | `/users` | users G1: mời, đổi vai trò, khóa/mở khóa, gửi lại link kích hoạt/đặt lại mật khẩu |
| Vai trò | `/roles`, `/roles/{id}` | roles, permissions G1: bảng tick quyền theo nhóm |
| Khách hàng | `/customers` | customers G2 |
| Câu chuyện | `/customer-stories` và new/edit/preview | customer-stories G2 |
| Trang cố định | `/pages`, `/pages/{key}` | pages G2 |
| Cấu hình | `/settings` | settings G2 |
| Nhật ký | `/audit-logs` | audit-logs G2 |
| Tổng quan | `/` | G1 redirect tới màn đầu tiên user có quyền (bài viết hoặc lead); G2 dashboard |

UI bắt buộc có loading/empty/error, thông báo session hết hạn, lỗi trường, cảnh báo rời trang chưa lưu, xác nhận publish/gỡ/xóa, hỗ trợ keyboard và label. Khi 409 giữ nội dung đang nhập và cho tải bản mới, hiển thị diff với bản mới khi khả thi; không tự submit đè lần hai. Màn edit trang cố định hiển thị người giữ bản cập nhật gần nhất (updatedBy). Menu admin chỉ hiện mục user có quyền xem; vào thẳng URL không có quyền thì hiện trang 403, không lộ dữ liệu.

Xem trước bài/giá render trong dashboard bằng component React riêng mô phỏng giao diện website (cùng Tailwind token), không nhúng website bằng iframe và không có URL preview công khai. Có thể lệch nhỏ so với trang thật; nếu cần khớp tuyệt đối thì tách block renderer thành package dùng chung ở G2.

## 10. Cache, SEO và cập nhật website

- Ban đầu website gọi API public request-time (`fetch` không cache), dùng Suspense đúng hướng dẫn Next.js cài tại máy. Sửa bài/giá trong dashboard hiện ở request tiếp theo, không cần cơ chế invalidation.
- API public trả `Cache-Control` ngắn hoặc `no-store`; response admin luôn `private, no-store`.
- Chỉ thêm cache ở website khi đo được cần thiết và đã có test invalidation: tag theo `posts`, `post:{id}`, `stories`, `customers`, `page:{key}`, `settings:{key}`, `pricing`, `pricing:{key}`, TTL tối đa 5 phút. Khi đó website thêm một Route Handler duy nhất `POST /api/revalidate` (secret dùng chung với API, chỉ gọi `revalidateTag`), API gọi sau commit; lỗi webhook ghi log + retry, không rollback dữ liệu. Gỡ bài phải hết hiệu lực ở request tiếp theo; không dùng stale-while-revalidate trả bài cũ sau unpublish.
- Metadata và render lấy chung DTO, không query một bài theo hai tiêu chí khác nhau. Bài public có canonical `/tin-tuc/{category}/{slug}`, title/description, OpenGraph, Article JSON-LD với datePublished/dateModified.
- `[id]` hiện tại có thể đổi tên thành `[slug]` đồng bộ thư mục/type helper; URL thực giữ nguyên cấu trúc. Không để hai dynamic segment cùng cấp trùng route.
- Root mặc định noindex: chỉ trang published đã hoàn chỉnh mới opt-in `index:true`; draft/preview/admin noindex. Sitemap chỉ dùng URL published có renderer, có lastModified thực tế, không dùng giờ hiện tại cho mọi trang.
- Không chặn crawl admin rồi kỳ vọng crawler đọc noindex; noindex là metadata/header, auth mới là lớp bảo vệ. API private trả X-Robots-Tag noindex.
- Khi cần đảm bảo status 404 trước stream, kiểm tra hướng dẫn request-time/ensureStatic của bản Next.js đang cài và test production build; không sao chép cấu hình dynamic/force-static từ phiên bản khác.

## 11. Kế hoạch triển khai theo đầu việc

Danh sách task nằm trong thư mục [`docs/TASK/`](../../TASK/README.md), mỗi file là một chức năng gồm đủ các bước **[API]** (`maxv-api`) → **[UI]** (`maxv-admin`) → **[Site]** (`page_maxv`). Thứ tự, phụ thuộc và cách đánh dấu tiến độ xem [README](../../TASK/README.md).

| File | Chức năng | Task |
|---|---|---|
| `00-chuan-bi.md` | Hạ tầng, tạo repo, OpenAPI G1 | 0 |
| `01-dang-nhap-admin.md` | Đăng nhập admin, khung dashboard | 1 [API] → 2 [UI] |
| `02-phan-quyen.md` | Phân quyền, vai trò, nhân viên | 3 [API] → 4 [UI] |
| `03-bai-viet-seo.md` | Ảnh, bài viết, SEO, `/tin-tuc` | 5 → 6 → 7 → 8 → 9 [Site] |
| `04-lead.md` | Lead form liên hệ và tư vấn HKD | 10 [API] → 11 [UI] → 12 [Site] |
| `05-gia-ca.md` | Giá 5 phần mềm, `/bang-gia`, trang chủ | 13 [API] → 14 [UI] → 15 [Site] |
| `06-phat-hanh-g1.md` | Phát hành G1 | 16 |
| `07`–`09` (G2) | Khách hàng; trang cố định, cấu hình; dashboard, export, audit | 17, 18, 19 |

Đặc tả (mục 1–10, 12) vẫn ở file này; khi đặc tả đổi thì cập nhật file task liên quan trong cùng commit.

## 12. Vận hành, lưu trữ và kiểm tra nghiệm thu

### 12.1 Biến cấu hình cần quản lý

| Repo | Biến/nhóm | Phạm vi |
|---|---|---|
| `maxv-api` | DATABASE_URL | Connection pool phù hợp deployment |
| `maxv-api` | SESSION_SECRET / auth library credentials | Theo thư viện được chọn |
| `maxv-api` | MEDIA_DIR, MEDIA_MIN_FREE_BYTES | Thư mục ảnh trên ổ đĩa (`D:\maxv-media`), ngưỡng trống tối thiểu trước khi nhận upload |
| `maxv-api` | MEDIA_PUBLIC_BASE_URL | Origin/path public cố định của ảnh |
| `maxv-api` | EMAIL_FROM, email provider secret | Reset/activation/mời nhân viên |
| `maxv-api` | ADMIN_ORIGIN, SITE_ORIGIN | Origin check admin và CORS `POST /public/leads` |
| `maxv-api` | Shared rate-limit connection | Database hoặc store dùng chung; không dùng Map memory cho nhiều instance |
| `maxv-api` | TEST_DATABASE_URL | Database riêng cho test; test-bootstrap assert khác DATABASE_URL |
| `maxv-admin` | VITE_API_BASE | Mặc định `/api/v1/admin` (cùng origin qua proxy); không chứa secret vì build ra file tĩnh |
| `page_maxv` | NEXT_PUBLIC_SITE_URL | Origin công khai, dùng metadata/canonical/sitemap |
| `page_maxv` | MAXV_API_URL | Chỉ server; gọi GET `/api/v1/public/*` khi render |
| `page_maxv` | NEXT_PUBLIC_MAXV_API_URL | Trình duyệt gửi `POST /public/leads` |
| `page_maxv` | NEXT_PUBLIC_HDDT_URL | Đã có; đăng ký/đăng nhập khách hàng `be_maxv` |
| `page_maxv` | MEDIA_PUBLIC_BASE_URL | Đồng bộ `images.remotePatterns` |

Không mặc định biến env là admin setting. Secret được xoay vòng và tách staging/production. Log requestId và lỗi kỹ thuật đã scrub, không log body auth/lead, Cookie hoặc Authorization.

### 12.2 Lưu trữ và sự cố

- Backup DB và ảnh cùng một script hằng ngày bằng `restic` ra ngoài VPS: dump DB trước rồi mới backup thư mục ảnh, giữ 7 ngày/4 tuần/6 tháng, `restic check` hằng tuần, khôi phục thử staging hằng tháng, cảnh báo khi không có lần backup thành công trong 26 giờ. Script và quy trình khôi phục ở `docs/TASK/thiet-ke-api-db.md` mục 4.5. Mục tiêu RPO <=24 giờ, RTO <=4 giờ cần được kiểm chứng bằng restore staging, không phải SLA đã cam kết.
- Backup là điều kiện tiên quyết trước khi bật form nhận lead PII; số ngày retention lead phải đã được duyệt trước khi bật form — chưa duyệt thì chưa bật nhận lead.
- Runbook sự cố media nhạy cảm: gỡ tham chiếu/unpublish nếu cần → xóa media → purge cache Cloudflare nếu có → xóa snapshot backup chứa ảnh (`restic forget <id> --prune`) → ghi audit sự cố; URL bất biến có thể còn tồn tại trong cache/bộ nhớ ngoài kiểm soát, phải nêu rõ trong phản hồi sự cố.
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
- [ ] Form liên hệ và form tư vấn HKD lưu đúng dữ liệu/consent/nguồn, không nhận password, retry không tạo bản sao; HKD không còn mở `mailto:`.
- [ ] Nhân viên có quyền lead tìm lead, xem chi tiết, ghi chú và đổi trạng thái; dữ liệu không mất sau deploy.
- [ ] Quản trị viên mời nhân viên, tạo vai trò bằng bảng tick quyền, đổi vai trò; nhân viên chỉ thấy và gọi được chức năng thuộc quyền; không thể mất Quản trị viên cuối cùng.
- [ ] Admin sửa gói giá của từng phần mềm; trang sản phẩm, `/bang-gia` (theo thứ tự phần mềm) và trang chủ hiện giá mới, gói ẩn không hiện; audit ghi giá cũ/mới.
- [ ] File giả ảnh/quá dung lượng và ảnh đang dùng không thể xóa/upload sai quy tắc.
- [ ] Trang privacy thật đã được duyệt trước khi bật nhận lead.
- [ ] Security headers hiện diện ở production; health endpoint phản ánh đúng trạng thái DB; env bắt buộc được validate khi khởi động.
- [ ] Audit log ghi đủ hành động chính sau kịch bản nghiệm thu: login, change-password, publish/unpublish, upload/delete media, đổi trạng thái lead, sửa giá, mời/khóa nhân viên, đổi vai trò/quyền, export, xóa PII.
- [ ] 429 kèm `Retry-After` hoạt động cho login throttle và lead rate limit trước khi bật form công khai; a11y cơ bản (label/keyboard) đạt trên form public và admin.
- [ ] lint/build/integration/e2e production smoke đạt; backup DB + thư mục ảnh ra ngoài VPS chạy hằng ngày và đã khôi phục thử thành công.

### 12.4 Phần cần xác nhận trước triển khai, không chặn việc review kế hoạch

Các câu dưới là đầu vào cần chốt khi thực hiện kế hoạch, không phải bằng chứng code còn thiếu. Thời điểm chốt và vai trò phụ trách nằm ở [README task](../../TASK/README.md); ghi thêm tên người phụ trách thực tế, quyết định và ngày chốt ngay dưới câu tương ứng. Chỉ chặn phần việc phụ thuộc vào quyết định, không chặn toàn bộ dự án.

1. ~~API đặt ở đâu~~ — đã chốt 27/10/2026: service Node.js mới `maxv-api`, database riêng.
2. Hạ tầng đã chốt (27/10/2026): một Windows Server 2019 + IIS chạy cả API, PostgreSQL, dashboard, website; ảnh trên ổ đĩa server (mục 3.5). Còn phải chốt: staging chạy chung server (site/DB/service riêng) hay máy khác; email provider; nơi chứa backup ngoài server cho `restic` (server/NAS khác qua SFTP, hoặc bucket Backblaze B2 chỉ làm kho backup).
3. Danh sách nhân sự thực tế và vai trò của từng người, để chỉnh 3 vai trò mẫu ở mục 6.6 trước khi seed.
4. Giá "Từ …/tháng" trên trang chủ: tự lấy gói rẻ nhất đang visible, hay admin chọn một gói cụ thể. (4 gói ở `/bang-gia` đã chốt 27/10/2026: bỏ, `/bang-gia` chỉ gom gói của các trang sản phẩm.)
5. Nội dung privacy, giá thật, quyền sử dụng logo/lời chứng thực và thời hạn lưu PII được duyệt.
6. SLA phản hồi lead theo topic (tu-van/ho-tro/hop-tac) và có kéo email thông báo lead mới từ G3 lên G1 không; ai theo dõi ngoài giờ hành chính.
7. Câu chữ "dùng thử miễn phí 15 ngày" trên site phải khớp thời hạn dùng thử thật mà `be_maxv` cấp khi đăng ký — người phụ trách kinh doanh xác nhận.
8. Email vận hành: có dùng Gmail cá nhân hiện có làm `EMAIL_FROM` cho reset/activation không, hay cấp email tên miền riêng (deliverability và hình thức thương hiệu).
9. Quyền hiệu chỉnh dữ liệu liên hệ lead và quy trình đáp ứng yêu cầu truy xuất/chỉnh sửa/xóa của khách theo Nghị định 13/2023 — pháp lý duyệt cùng chính sách bảo mật.
10. Nội dung go-live: 5 chuyên mục đang trống, logo/câu chuyện đang là mẫu — ai sản xuất nội dung thật trước ngày bật form.
11. Tiêu chí "một admin là đủ": có tạo admin dự phòng từ G1 không, ai giữ mật khẩu dự phòng, quy trình break-glass ra sao.
12. Link `/tra-cuu-mst` trong header đang 404: gỡ khỏi nav hay xây trang ở G3.
13. Lead — phụ trách kinh doanh phối hợp quản trị viên chốt trước Task 10: ý nghĩa/điều kiện chuyển từng trạng thái, ai được đưa vào spam, khi nào bắt buộc ghi chú; cách bàn giao lead khi người phụ trách bị khóa/nghỉ việc và ai theo dõi lead chưa giao. Không mặc định bổ sung tự động phân công.
14. Giá — phụ trách kinh doanh chốt trước duyệt hợp đồng pricing ở Task 0/triển khai Task 13: VAT đã gồm/chưa gồm, phí khởi tạo/bổ sung, ý nghĩa giá "Từ" và so sánh gói khác kỳ hạn. Ưu tiên notes/specs hiện có, không thêm bộ tính thuế hoặc lịch giá tương lai vào G1.
15. Khách hàng/story — phụ trách nội dung chốt trước Task 17: khi ẩn logo khách hàng thì story đang publish có tiếp tục công khai không; đồng bộ hành vi public và tiêu chí nghiệm thu theo một quyết định.
16. Privacy G2 — chủ dự án cùng người phụ trách nội dung/privacy chốt trước Task 18: người duyệt chính sách, cách phối hợp chuyển nguồn policyVersion giữa API/form và xử lý form mở với phiên bản cũ; không để hai nguồn version cùng hoạt động.
17. Số liệu G2 — phụ trách kinh doanh chốt trước Task 19: định nghĩa từng chỉ số, trường ngày để đếm, múi giờ Việt Nam, bộ lọc và fixture đối chiếu. Không suy ra doanh thu/conversion từ dữ liệu lead khi chưa có nguồn tương ứng.

Không xây ở đợt này: kế toán/hóa đơn/tồn kho/thanh toán, CRM đầy đủ, page builder kéo thả, đa ngôn ngữ, lịch đăng, automation marketing, tra cứu MST hoặc cổng support hoàn chỉnh. Mỗi phần cần nghiệp vụ và nguồn dữ liệu riêng; thêm endpoint không làm chúng tự hoạt động.
