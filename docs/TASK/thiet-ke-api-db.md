# Thiết kế API, PostgreSQL và lưu ảnh — `maxv-api`

> Tài liệu chi tiết cho các file task 01–05. Bản dùng để code: [prisma/schema.prisma](prisma/schema.prisma) + [prisma/checks.sql](prisma/checks.sql) (mục 5); DDL mục 2 là bản đọc dễ, tương đương. Quy ước chung (envelope lỗi, phân trang, version, CSRF) ở mục 4 của [kế hoạch gốc](../superpowers/plans/2026-10-21-maxv-admin.md). Khi file này và kế hoạch gốc lệch nhau, **file này là bản đúng** cho tên cột, kiểu dữ liệu và JSON.

## 1. Đối chiếu dữ liệu đang có trong `page_maxv`

| Đang có trong code | Trường hiện tại | Thành trường API/DB |
|---|---|---|
| `app/_data/news.ts` → `newsCategories` | `slug`, `label`, `description`, `Icon` | `news_categories.slug/label/description/sort_order`. Icon giữ trong code website, map theo slug |
| `app/_data/news.ts` → `NewsPost` | `id` (dùng trong URL), `title`, `category`, `date` (`YYYY-MM-DD`), `content: string[]`, `featured?`, `image?` | `posts.slug` (thay `id` trong URL `/tin-tuc/{category}/{slug}`), `title`, `category_id`, `published_at`, `content` (JSONB block, đoạn văn cũ = block `paragraph`), `featured`, `cover_media_id` |
| `news-article.tsx` | 4 bài liên quan cùng chuyên mục | `related` trong response chi tiết, API tự tính |
| `news-listing.tsx` | Lọc `featured`, phân trang 9 bài | Query `featured=true`, `pageSize=9` |
| `maxv-accounting/data.ts` → `accountingPricing` | `title`, `description`, `features[]`, `extraDataset`, `plans[{name, users, price, scale}]` | `pricing_products.title/description/notes`, `pricing_plans.name/price_amount/specs/features` |
| `maxv-hkd/_components/pricing.tsx` | `[term, price]` ×3, "02 người dùng", ghi chú bộ số liệu thứ 2 | Mỗi kỳ hạn là một gói `pricing_plans` (`name="01 năm"`, `billing_period="once"`), ghi chú vào `notes` |
| `app/_data/pricing.ts` | 4 gói module | Bỏ (quyết định 27/10/2026) |
| `/lien-he` form | `topic` (`tu-van`/`ho-tro`/`hop-tac`), `name`, `phone`, `email`, `company`, `product` (**một** lựa chọn, đang là label), `message`, `consent` | `leads` `type=contact`; `product` đổi value sang slug → `product_key`. Form không có mã số thuế nên **không có cột tax_code** |
| Form tư vấn HKD | `name`, `phone`, `industry` (5 lựa chọn), `consent` | `leads` `type=consult`, `product_key='maxv-hkd'`, `industry` slug |
| `app/_lib/contact.ts` | hotline, email, address, zalo/facebook/youtube | G2 `site_settings` — chưa có bảng ở G1 |

Whitelist dùng chung (DB `CHECK` và validation API cùng một danh sách):

| Tên | Giá trị |
|---|---|
| Product key | `maxv-accounting`, `maxv-hddt`, `maxv-hkd`, `chu-ky-so`, `hoa-don-dien-tu` |
| Lead topic | `tu-van`, `ho-tro`, `hop-tac` |
| HKD industry | `ban-le` (Cửa hàng bán lẻ), `thuong-mai`, `dich-vu`, `san-xuat-nho`, `khac` |
| Permission | 15 key ở mục 6.6 kế hoạch gốc (G1 bỏ `settings.*` cho tới G2) |

## 2. PostgreSQL — bảng G1

PostgreSQL ≥ 15. Quy ước: khóa chính `uuid` (`gen_random_uuid()` có sẵn từ PG13), thời gian `timestamptz` lưu UTC, tên cột `snake_case` (API trả `camelCase`). Dùng `CHECK` thay cho `ENUM` để thêm giá trị bằng migration đơn giản.

### 2.1 Extension và hàm tìm kiếm tiếng Việt

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- unaccent() không IMMUTABLE nên không dùng được trong index; bọc lại.
CREATE OR REPLACE FUNCTION f_unaccent(text) RETURNS text
  LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
  AS $$ SELECT public.unaccent('public.unaccent', $1) $$;
```

Cột `search_text` ở `posts` và `leads` do service ghi lại mỗi lần lưu: `lower(f_unaccent(...))` của các trường cần tìm. Bỏ dấu **trước** rồi mới `lower`: với collation `C`, `lower('Đơn')` không đổi được `Đ`/`Ơ` (đã thử: `f_unaccent(lower('Hóa Đơn Điện Tử'))` ra `hoa Don Dien tu`, còn `lower(f_unaccent(...))` ra `hoa don dien tu`). Query `q` chuẩn hóa giống hệt rồi `search_text ILIKE '%' || $q || '%'`; index trigram dùng được cho ILIKE (đã kiểm tra bằng `EXPLAIN`).

Đã chạy toàn bộ SQL mục 2 trên PostgreSQL 18: schema tạo được, seed chạy lại không lỗi, các `CHECK` chặn đúng giá `fixed` = 0, `contact` có số tiền, CTA `javascript:`, lead `consult` thiếu sản phẩm, SĐT sai định dạng, slug sai, bài `published` thiếu `published_at`.

### 2.2 Admin, phân quyền, phiên, audit

```sql
CREATE TABLE admin_roles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL UNIQUE CHECK (length(name) BETWEEN 1 AND 100),
  description text CHECK (length(description) <= 300),
  is_system   boolean NOT NULL DEFAULT false,      -- "Quản trị viên": toàn quyền, không sửa/xóa
  version     integer NOT NULL DEFAULT 1,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE admin_role_permissions (
  role_id    uuid NOT NULL REFERENCES admin_roles(id) ON DELETE CASCADE,
  permission text NOT NULL CHECK (permission IN (
    'posts.view','posts.edit','posts.publish','posts.delete',
    'media.view','media.upload','media.delete',
    'pricing.view','pricing.edit',
    'leads.view','leads.update','leads.export',
    'users.view','users.manage','audit.view')),
  PRIMARY KEY (role_id, permission)
);

CREATE TABLE admin_users (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                text NOT NULL CHECK (email = lower(email) AND length(email) <= 254),
  display_name         text NOT NULL CHECK (length(display_name) BETWEEN 1 AND 100),
  password_hash        text,                         -- NULL khi còn 'invited'
  role_id              uuid NOT NULL REFERENCES admin_roles(id),
  status               text NOT NULL DEFAULT 'invited' CHECK (status IN ('invited','active','disabled')),
  must_change_password boolean NOT NULL DEFAULT false,
  failed_login_count   integer NOT NULL DEFAULT 0,
  locked_until         timestamptz,
  last_login_at        timestamptz,
  version              integer NOT NULL DEFAULT 1,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  CHECK (status = 'invited' OR password_hash IS NOT NULL)
);
CREATE UNIQUE INDEX admin_users_email_key ON admin_users (email);

CREATE TABLE admin_sessions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token_hash       bytea NOT NULL UNIQUE,            -- SHA-256 của token trong cookie
  csrf_token_hash  bytea NOT NULL,
  expires_at       timestamptz NOT NULL,             -- tạo + 8 giờ
  last_activity_at timestamptz NOT NULL DEFAULT now(),  -- idle 30 phút
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON admin_sessions (user_id);
CREATE INDEX ON admin_sessions (expires_at);

-- Gộp token kích hoạt và đặt lại mật khẩu (thay admin_password_resets trong kế hoạch gốc).
CREATE TABLE admin_tokens (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  scope      text NOT NULL CHECK (scope IN ('activation','password_reset')),
  token_hash bytea NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,                   -- activation 24h, reset 15 phút
  used_at    timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id            bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id      uuid REFERENCES admin_users(id),     -- NULL cho hành động hệ thống/khách
  action        text NOT NULL,                       -- 'post.publish', 'pricing_plan.update', 'AUTH_LOCKOUT'...
  resource_type text,
  resource_id   text,
  changes       jsonb,                               -- {"priceAmount":{"from":1650000,"to":1800000}}; không chứa PII/mật khẩu
  request_id    text,
  result        text NOT NULL DEFAULT 'success' CHECK (result IN ('success','failure')),
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON audit_logs (actor_id, created_at DESC);
CREATE INDEX ON audit_logs (resource_type, resource_id, created_at DESC);

-- Rate limit dùng chung giữa các instance. Đổi sang Redis khi có Redis; ponytail: một bảng là đủ cho tải website.
CREATE TABLE rate_limits (
  key          text PRIMARY KEY,                     -- 'login:ip:<hash>', 'lead:ip:<hash>'
  window_start timestamptz NOT NULL,
  count        integer NOT NULL
);
```

### 2.3 Ảnh

```sql
CREATE TABLE media (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_key   text NOT NULL UNIQUE,                -- 'media/2026/10/<uuid>.webp', do server sinh
  original_name text NOT NULL CHECK (length(original_name) <= 255),
  mime_type     text NOT NULL CHECK (mime_type IN ('image/webp','image/jpeg','image/png')),
  size_bytes    integer NOT NULL CHECK (size_bytes > 0),
  width         integer NOT NULL CHECK (width BETWEEN 1 AND 4096),
  height        integer NOT NULL CHECK (height BETWEEN 1 AND 4096),
  alt           text NOT NULL CHECK (length(alt) BETWEEN 1 AND 250),
  status        text NOT NULL DEFAULT 'ready' CHECK (status IN ('ready','deleting')),
  uploaded_by   uuid NOT NULL REFERENCES admin_users(id),
  version       integer NOT NULL DEFAULT 1,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON media (created_at DESC);

CREATE TABLE media_usages (
  media_id      uuid NOT NULL REFERENCES media(id),  -- không CASCADE: chặn xóa ảnh đang dùng
  resource_type text NOT NULL CHECK (resource_type IN ('post')),
  resource_id   uuid NOT NULL,
  field         text NOT NULL CHECK (field IN ('cover','content')),
  PRIMARY KEY (media_id, resource_type, resource_id, field)
);
CREATE INDEX ON media_usages (resource_type, resource_id);
```

URL ảnh không lưu trong DB: API trả `url = MEDIA_PUBLIC_BASE_URL + '/' + storage_key`. Đổi nơi lưu (mục 4.6) chỉ cần copy file và đổi biến môi trường.

### 2.4 Tin tức

```sql
CREATE TABLE news_categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,
  label       text NOT NULL,
  description text NOT NULL,
  sort_order  integer NOT NULL
);

CREATE TABLE posts (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id        uuid NOT NULL REFERENCES news_categories(id),
  slug               text NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 160),
  title              text NOT NULL CHECK (length(title) BETWEEN 1 AND 200),
  excerpt            text NOT NULL DEFAULT '' CHECK (length(excerpt) <= 500),
  content            jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(content) = 'array'),
  cover_media_id     uuid REFERENCES media(id),
  featured           boolean NOT NULL DEFAULT false,
  state              text NOT NULL DEFAULT 'draft' CHECK (state IN ('draft','published','archived')),
  published_at       timestamptz,
  first_published_at timestamptz,
  seo_title          text CHECK (length(seo_title) <= 70),
  seo_description    text CHECK (length(seo_description) <= 170),
  search_text        text NOT NULL DEFAULT '',
  created_by         uuid NOT NULL REFERENCES admin_users(id),
  updated_by         uuid NOT NULL REFERENCES admin_users(id),
  version            integer NOT NULL DEFAULT 1,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug),
  CHECK (state <> 'published' OR published_at IS NOT NULL)
);
CREATE INDEX ON posts (state, published_at DESC, id DESC);
CREATE INDEX ON posts (category_id, state, published_at DESC, id DESC);
CREATE INDEX posts_search_trgm ON posts USING gin (search_text gin_trgm_ops);
```

`content` là mảng block theo mục 5.1 kế hoạch gốc:

```json
[
  { "type": "paragraph", "text": "Đoạn văn." },
  { "type": "heading", "level": 2, "text": "Tiêu đề phụ" },
  { "type": "list", "ordered": false, "items": ["Ý 1", "Ý 2"] },
  { "type": "image", "mediaId": "6f1c…", "alt": "Mô tả ảnh", "caption": "Chú thích" },
  { "type": "link", "text": "Xem thêm", "href": "/san-pham/maxv-hddt" }
]
```

Schema block validate ở API (zod/ajv); DB chỉ kiểm tra là mảng.

### 2.5 Lead

```sql
CREATE TABLE leads (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type               text NOT NULL CHECK (type IN ('contact','consult')),
  topic              text CHECK (topic IN ('tu-van','ho-tro','hop-tac')),
  name               text NOT NULL CHECK (length(name) BETWEEN 1 AND 100),
  phone              text NOT NULL CHECK (phone ~ '^\+?[0-9]{8,20}$'),   -- đã normalize, giữ số 0 đầu
  email              text CHECK (email = lower(email) AND length(email) <= 254),  -- service lưu chữ thường
  company            text CHECK (length(company) <= 200),
  product_key        text CHECK (product_key IN ('maxv-accounting','maxv-hddt','maxv-hkd','chu-ky-so','hoa-don-dien-tu')),
  industry           text CHECK (industry IN ('ban-le','thuong-mai','dich-vu','san-xuat-nho','khac')),
  message            text CHECK (length(message) <= 5000),
  source_path        text NOT NULL CHECK (source_path LIKE '/%' AND length(source_path) <= 300),
  utm                jsonb,
  consent_at         timestamptz NOT NULL,
  consent_version    text NOT NULL,
  status             text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','qualified','closed','spam')),
  assigned_to        uuid REFERENCES admin_users(id),
  possible_duplicate boolean NOT NULL DEFAULT false,
  search_text        text NOT NULL DEFAULT '',
  version            integer NOT NULL DEFAULT 1,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (type = 'contact' AND topic IS NOT NULL) OR
    (type = 'consult' AND topic IS NULL AND product_key IS NOT NULL)
  )
);
CREATE INDEX ON leads (created_at DESC);
CREATE INDEX ON leads (status, created_at DESC);
CREATE INDEX ON leads (assigned_to);
CREATE INDEX ON leads (phone, created_at);          -- đánh dấu trùng 30 ngày
CREATE INDEX ON leads (email, created_at);            -- không dùng index biểu thức: Prisma không khai báo được
CREATE INDEX leads_search_trgm ON leads USING gin (search_text gin_trgm_ops);

CREATE TABLE lead_notes (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id    uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  author_id  uuid NOT NULL REFERENCES admin_users(id),
  body       text NOT NULL CHECK (length(body) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX ON lead_notes (lead_id, created_at);

CREATE TABLE lead_requests (                         -- chống gửi trùng, giữ 24 giờ
  idempotency_key_hash bytea PRIMARY KEY,
  payload_hash         bytea NOT NULL,
  lead_id              uuid REFERENCES leads(id) ON DELETE CASCADE,
  expires_at           timestamptz NOT NULL,
  created_at           timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE consent_records (                       -- bằng chứng đồng ý, không PII trực tiếp
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_ref_hash   bytea NOT NULL,
  type            text NOT NULL,
  source_path     text NOT NULL,
  consent_version text NOT NULL,
  consent_at      timestamptz NOT NULL
);
```

### 2.6 Giá cả

```sql
CREATE TABLE pricing_products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key         text NOT NULL UNIQUE CHECK (key IN ('maxv-accounting','maxv-hddt','maxv-hkd','chu-ky-so','hoa-don-dien-tu')),
  name        text NOT NULL,                         -- "MaxV Accounting"
  title       text NOT NULL DEFAULT '' CHECK (length(title) <= 200),       -- "Gói phần mềm phù hợp với doanh nghiệp"
  description text NOT NULL DEFAULT '' CHECK (length(description) <= 500),
  notes       jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(notes) = 'array' AND jsonb_array_length(notes) <= 5),
  sort_order  integer NOT NULL,                      -- thứ tự trên /bang-gia
  visible     boolean NOT NULL DEFAULT false,
  updated_by  uuid REFERENCES admin_users(id),
  version     integer NOT NULL DEFAULT 1,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pricing_plans (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     uuid NOT NULL REFERENCES pricing_products(id),
  name           text NOT NULL CHECK (length(name) BETWEEN 1 AND 100),   -- "MV01", "01 năm"
  description    text NOT NULL DEFAULT '' CHECK (length(description) <= 300),
  price_mode     text NOT NULL CHECK (price_mode IN ('fixed','from','free','contact')),
  price_amount   bigint,                                                  -- đồng, không float
  billing_period text NOT NULL DEFAULT 'year' CHECK (billing_period IN ('month','year','once','none')),
  specs          jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(specs) = 'array' AND jsonb_array_length(specs) <= 8),
  features       jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(features) = 'array' AND jsonb_array_length(features) <= 20),
  featured       boolean NOT NULL DEFAULT false,
  cta_label      text NOT NULL DEFAULT 'Nhận tư vấn' CHECK (length(cta_label) <= 100),
  cta_href       text NOT NULL DEFAULT '/lien-he' CHECK (cta_href ~ '^(/|#|https://)' AND cta_href !~* '^javascript:'),
  sort_order     integer NOT NULL DEFAULT 0,
  visible        boolean NOT NULL DEFAULT false,
  created_by     uuid NOT NULL REFERENCES admin_users(id),
  updated_by     uuid NOT NULL REFERENCES admin_users(id),
  version        integer NOT NULL DEFAULT 1,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  CHECK (
    (price_mode = 'contact' AND price_amount IS NULL) OR
    (price_mode = 'free'    AND price_amount = 0) OR
    (price_mode IN ('fixed','from') AND price_amount > 0 AND price_amount <= 1000000000000)
  )
);
CREATE INDEX ON pricing_plans (product_id, sort_order);
```

### 2.7 Seed

```sql
INSERT INTO news_categories (slug, label, description, sort_order) VALUES
  ('hoat-dong-cong-ty','Hoạt động công ty','Thông báo, sự kiện và hoạt động mới nhất từ MaxV Việt Nam.',1),
  ('khuyen-mai','Khuyến mãi','Chương trình ưu đãi và khuyến mãi dành cho khách hàng MaxV.',2),
  ('tai-chinh-ke-toan','Tài chính - kế toán','Kiến thức và hướng dẫn về kế toán, thuế và hóa đơn điện tử.',3),
  ('doanh-nghiep','Doanh nghiệp','Tin tức và kiến thức quản trị dành cho doanh nghiệp.',4),
  ('ung-dung-tai-lieu','Ứng dụng & Tài liệu','Hướng dẫn dùng ứng dụng và tài liệu tham khảo từ MaxV.',5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO pricing_products (key, name, sort_order) VALUES
  ('maxv-accounting','MaxV Accounting',1),
  ('maxv-hddt','MaxV HĐĐT',2),
  ('maxv-hkd','MaxV HKD',3),
  ('chu-ky-so','Chữ ký số',4),
  ('hoa-don-dien-tu','Hóa đơn điện tử',5)
ON CONFLICT (key) DO NOTHING;
-- Không seed pricing_plans: admin nhập giá trên dashboard.

-- 3 vai trò mẫu; quyền của "Quản trị viên" không lưu từng dòng, service coi is_system = toàn quyền.
INSERT INTO admin_roles (name, description, is_system) VALUES
  ('Quản trị viên','Toàn quyền',true),
  ('Biên tập viên','Bài viết, SEO, ảnh',false),
  ('Kinh doanh','Xử lý lead',false)
ON CONFLICT (name) DO NOTHING;
INSERT INTO admin_role_permissions (role_id, permission)
SELECT r.id, p FROM admin_roles r,
  unnest(ARRAY['posts.view','posts.edit','posts.publish','posts.delete','media.view','media.upload','media.delete','pricing.view']) p
WHERE r.name = 'Biên tập viên'
UNION ALL
SELECT r.id, p FROM admin_roles r,
  unnest(ARRAY['leads.view','leads.update','pricing.view']) p
WHERE r.name = 'Kinh doanh'
ON CONFLICT DO NOTHING;
```

### 2.8 Sơ đồ quan hệ

```
admin_roles 1─n admin_role_permissions
admin_roles 1─n admin_users 1─n admin_sessions / admin_tokens / lead_notes / audit_logs
news_categories 1─n posts n─1 media (cover)        media 1─n media_usages
leads 1─n lead_notes        leads 1─1 lead_requests        leads n─1 admin_users (assigned_to)
pricing_products 1─n pricing_plans
```

## 3. Request / response

Mọi endpoint có prefix `/api/v1`. JSON `camelCase`. Thành công: `{ "data": ... }` (danh sách kèm `meta`); lỗi: envelope `error` ở mục 4.1 kế hoạch gốc. Mutation admin cần cookie phiên + header `X-CSRF-Token`.

### 3.1 Xác thực admin

`POST /admin/auth/login`

```json
// request
{ "email": "admin@maxv.vn", "password": "••••••••••••" }
// 200 — đồng thời Set-Cookie: __Host-maxv_session=…; HttpOnly; Secure; SameSite=Lax; Path=/
{ "data": {
  "user": { "id": "0b6e…", "email": "admin@maxv.vn", "displayName": "Nguyễn Văn A",
            "role": { "id": "9c1d…", "name": "Quản trị viên" }, "mustChangePassword": false },
  "permissions": ["posts.view", "posts.edit", "…"],
  "csrfToken": "q8f3…",
  "expiresAt": "2026-10-28T09:00:00Z"
} }
// 401
{ "error": { "code": "UNAUTHENTICATED", "message": "Email hoặc mật khẩu không đúng.", "requestId": "…" } }
```

`GET /admin/auth/session` → cùng `data` như login (dashboard gọi khi tải trang). `POST /admin/auth/logout` → `204`.

`POST /admin/auth/change-password` `{ "currentPassword": "…", "newPassword": "…" }` → `204`.
`POST /admin/auth/forgot-password` `{ "email": "…" }` → `202` luôn cùng thông báo.
`POST /admin/auth/reset-password` `{ "token": "…", "newPassword": "…" }` → `204` (dùng cho cả kích hoạt và đặt lại).

### 3.2 Vai trò và nhân viên

`GET /admin/permissions`

```json
{ "data": [
  { "group": "Bài viết & SEO", "items": [
    { "key": "posts.view", "label": "Xem" }, { "key": "posts.edit", "label": "Tạo/Sửa" },
    { "key": "posts.publish", "label": "Xuất bản" }, { "key": "posts.delete", "label": "Xóa" } ] },
  { "group": "Giá cả", "items": [ { "key": "pricing.view", "label": "Xem" }, { "key": "pricing.edit", "label": "Sửa" } ] }
] }
```

`POST /admin/roles`

```json
// request
{ "name": "Cộng tác viên", "description": "Viết bài, không xuất bản", "permissions": ["posts.view", "posts.edit", "media.view", "media.upload"] }
// 201
{ "data": { "id": "5a2e…", "name": "Cộng tác viên", "description": "Viết bài, không xuất bản", "isSystem": false,
            "permissions": ["media.upload", "media.view", "posts.edit", "posts.view"], "userCount": 0, "version": 1 } }
```

`PATCH /admin/roles/{id}` `{ "permissions": [...], "version": 1 }` → `200` role mới; vai trò hệ thống → `409 SYSTEM_ROLE`.

`POST /admin/users`

```json
// request
{ "email": "sale1@maxv.vn", "displayName": "Trần Thị B", "roleId": "…kinh-doanh…" }
// 201 — gửi email kích hoạt
{ "data": { "id": "7d40…", "email": "sale1@maxv.vn", "displayName": "Trần Thị B",
            "role": { "id": "…", "name": "Kinh doanh" }, "status": "invited", "lastLoginAt": null, "version": 1 } }
```

`PATCH /admin/users/{id}` `{ "roleId": "…", "status": "disabled", "version": 3 }` → `200`; làm mất Quản trị viên cuối → `409 LAST_ADMIN`.

### 3.3 Ảnh

`POST /admin/media` — `multipart/form-data`: `file` (JPEG/PNG/WebP ≤ 5 MiB), `alt`.

```json
// 201
{ "data": { "id": "6f1c…", "url": "https://media.maxv.vn/media/2026/10/6f1c….webp", "alt": "Giao diện MaxV HĐĐT",
            "mimeType": "image/webp", "width": 1600, "height": 900, "sizeBytes": 184233,
            "originalName": "hddt.png", "usageCount": 0, "createdAt": "2026-10-27T03:10:00Z", "version": 1 } }
```

`GET /admin/media?q=hddt&page=1&pageSize=24` → danh sách + `meta`. `PATCH /admin/media/{id}` `{ "alt": "…", "version": 1 }`. `DELETE /admin/media/{id}` + `If-Match: "1"` → `204` hoặc `409 MEDIA_IN_USE`.

### 3.4 Bài viết — admin

`POST /admin/posts`

```json
// request
{ "title": "Hướng dẫn đồng bộ hóa đơn điện tử", "categoryId": "…tai-chinh-ke-toan…",
  "slug": "huong-dan-dong-bo-hoa-don-dien-tu", "excerpt": "Các bước kết nối và đồng bộ hóa đơn trên MaxV.",
  "content": [ { "type": "paragraph", "text": "Nội dung." } ],
  "coverMediaId": "6f1c…", "featured": false,
  "seoTitle": "Đồng bộ hóa đơn điện tử | MaxV", "seoDescription": "Hướng dẫn kết nối và kiểm tra dữ liệu hóa đơn trên MaxV." }
// 201
{ "data": { "id": "c3a9…", "state": "draft", "publishedAt": null, "firstPublishedAt": null,
            "category": { "id": "…", "slug": "tai-chinh-ke-toan", "label": "Tài chính - kế toán" },
            "cover": { "id": "6f1c…", "url": "https://media.maxv.vn/…", "alt": "…", "width": 1600, "height": 900 },
            "title": "…", "slug": "…", "excerpt": "…", "content": [ … ], "featured": false,
            "seoTitle": "…", "seoDescription": "…",
            "createdBy": { "id": "…", "displayName": "Nguyễn Văn A" }, "updatedBy": { "id": "…", "displayName": "Nguyễn Văn A" },
            "createdAt": "…", "updatedAt": "…", "version": 1 } }
```

`GET /admin/posts?q=hoa%20don&categoryId=…&state=draft&featured=true&page=1&pageSize=20&sort=updatedAt:desc` — item danh sách bỏ `content`.
`PATCH /admin/posts/{id}` — gửi trường cần đổi + `version`. `POST /admin/posts/{id}/publish|unpublish|archive|restore` `{ "version": 2 }` → bài mới. `POST /admin/posts/{id}/preview` body như PATCH → DTO như `GET /public/posts/{category}/{slug}`, không ghi DB.

### 3.5 Bài viết — public (website gọi)

`GET /public/posts?category=tai-chinh-ke-toan&q=hoa%20don&featured=true&page=1&pageSize=9`

```json
{ "data": [
  { "id": "c3a9…", "slug": "huong-dan-dong-bo-hoa-don-dien-tu",
    "category": { "slug": "tai-chinh-ke-toan", "label": "Tài chính - kế toán" },
    "title": "Hướng dẫn đồng bộ hóa đơn điện tử", "excerpt": "Các bước kết nối…",
    "cover": { "url": "https://media.maxv.vn/…", "alt": "…", "width": 1600, "height": 900 },
    "featured": false, "publishedAt": "2026-10-27T02:00:00Z",
    "href": "/tin-tuc/tai-chinh-ke-toan/huong-dan-dong-bo-hoa-don-dien-tu" } ],
  "meta": { "page": 1, "pageSize": 9, "total": 1, "totalPages": 1 } }
```

`GET /public/posts/{category}/{slug}` → summary trên + `content`, `firstPublishedAt`, `updatedAt`, `seo { title, description, canonical }`, `related` (tối đa 4 summary cùng chuyên mục). Bài chưa publish → `404`.
`GET /public/news-categories` → `[{ "slug", "label", "description" }]` theo `sort_order`.

Website map: `post.date` cũ = `publishedAt` (format ngày giờ Việt Nam), `post.image` = `cover.url`, `post.id` trong URL = `slug`, `post.content: string[]` = render `content` block.

### 3.6 Lead

`POST /public/leads` (trình duyệt gọi, header `Idempotency-Key: <uuid>`)

```json
// form /lien-he
{ "type": "contact", "topic": "tu-van", "name": "Nguyễn Văn A", "phone": "0900 000 000",
  "email": "khach@example.com", "company": "Công ty ABC", "productKey": "maxv-hddt",
  "message": "Tôi muốn được tư vấn.", "sourcePath": "/lien-he",
  "utm": { "source": "google", "medium": "cpc", "campaign": "maxv" },
  "consent": true, "consentVersion": "privacy-v1", "website": "" }
// form tư vấn MaxV HKD
{ "type": "consult", "productKey": "maxv-hkd", "name": "Lê Văn C", "phone": "0912345678",
  "industry": "ban-le", "sourcePath": "/san-pham/maxv-hkd",
  "consent": true, "consentVersion": "privacy-v1", "website": "" }
// 201 (gửi lại cùng key + cùng payload: 200 cùng receiptId)
{ "data": { "receiptId": "LD-7Q2K9F", "message": "MaxV đã nhận yêu cầu và sẽ liên hệ trong giờ làm việc." } }
// 422
{ "error": { "code": "VALIDATION_ERROR", "message": "Dữ liệu chưa hợp lệ.",
             "fields": { "phone": "Số điện thoại 8–20 chữ số." }, "requestId": "…" } }
```

`website` là ô bẫy bot (ẩn): khác rỗng → `201` giả, không lưu. Response không trả lại PII.

`GET /admin/leads?q=0900&type=contact&topic=ho-tro&productKey=maxv-hkd&status=new&assignedTo=…&from=2026-10-01T00:00:00Z&to=2026-11-01T00:00:00Z&page=1&pageSize=20`

```json
{ "data": [
  { "id": "a81f…", "type": "contact", "topic": "tu-van", "productKey": "maxv-hddt",
    "name": "Nguyễn Văn A", "phone": "0900000000", "email": "khach@example.com", "company": "Công ty ABC",
    "status": "new", "assignedTo": null, "possibleDuplicate": false, "overdue": true,
    "sourcePath": "/lien-he", "createdAt": "2026-10-27T03:00:00Z" } ],
  "meta": { "page": 1, "pageSize": 20, "total": 1, "totalPages": 1 } }
```

`GET /admin/leads/{id}` → thêm `message`, `industry`, `utm`, `consentAt`, `consentVersion`, `duplicates` (lead cùng SĐT/email 30 ngày: `id`, `status`, `createdAt`), `version`.
`PATCH /admin/leads/{id}` `{ "status": "contacted", "assignedTo": "7d40…", "version": 1 }`; sửa thông tin khách thì bắt buộc `"reason": "Khách báo nhầm số"`.
`POST /admin/leads/{id}/notes` `{ "body": "Đã gọi, hẹn demo thứ 5." }` → `201 { "data": { "id", "body", "author": { "id", "displayName" }, "createdAt" } }`.

### 3.7 Giá cả

`PATCH /admin/pricing/products/maxv-accounting`

```json
{ "title": "Gói phần mềm phù hợp với doanh nghiệp", "description": "Linh hoạt theo quy mô doanh nghiệp, chi phí tối ưu.",
  "notes": ["Bộ số liệu thêm: 800.000đ/năm"], "sortOrder": 1, "visible": true, "version": 1 }
```

`POST /admin/pricing/products/maxv-accounting/plans`

```json
// request
{ "name": "MV01", "description": "Doanh nghiệp quy mô nhỏ",
  "priceMode": "fixed", "priceAmount": 1650000, "billingPeriod": "year",
  "specs": [ { "label": "Người dùng đồng thời", "value": "02" }, { "label": "Quy mô", "value": "nhỏ" } ],
  "features": ["Đầy đủ các phân hệ nghiệp vụ", "Hỗ trợ triển khai và hướng dẫn sử dụng"],
  "featured": false, "cta": { "label": "Nhận tư vấn", "href": "/lien-he" }, "sortOrder": 1, "visible": false }
// 201
{ "data": { "id": "e2b7…", "productKey": "maxv-accounting", "name": "MV01", "…": "…", "version": 1 } }
// 422 khi fixed mà priceAmount = 0
{ "error": { "code": "VALIDATION_ERROR", "message": "Dữ liệu chưa hợp lệ.", "fields": { "priceAmount": "Giá phải lớn hơn 0." }, "requestId": "…" } }
```

`PATCH /admin/pricing/plans/{id}` `{ "priceAmount": 1800000, "version": 1 }` → audit ghi `{"priceAmount":{"from":1650000,"to":1800000}}`.

`GET /public/pricing` (website: `/bang-gia`, trang chủ) — chỉ phần mềm visible có ít nhất một gói visible:

```json
{ "data": [
  { "key": "maxv-accounting", "name": "MaxV Accounting", "href": "/san-pham/maxv-accounting",
    "title": "Gói phần mềm phù hợp với doanh nghiệp", "description": "…", "notes": ["Bộ số liệu thêm: 800.000đ/năm"],
    "plans": [
      { "id": "e2b7…", "name": "MV01", "description": "Doanh nghiệp quy mô nhỏ",
        "priceMode": "fixed", "priceAmount": 1650000, "billingPeriod": "year",
        "specs": [ { "label": "Người dùng đồng thời", "value": "02" } ],
        "features": ["Đầy đủ các phân hệ nghiệp vụ"], "featured": false,
        "cta": { "label": "Nhận tư vấn", "href": "/lien-he" } } ] },
  { "key": "maxv-hkd", "name": "MaxV HKD", "href": "/san-pham/maxv-hkd", "…": "…",
    "plans": [ { "name": "01 năm", "priceMode": "fixed", "priceAmount": 1000000, "billingPeriod": "once", "…": "…" } ] }
] }
```

`GET /public/pricing/{key}` → một phần tử như trên; phần mềm ẩn → `404`. API trả số, website định dạng (`1650000` → `1.650.000đ`, `contact` → "Liên hệ", `free` → "Miễn phí", `from` → "Từ 1.650.000đ").

## 4. Lưu ảnh trên ổ đĩa server — Windows Server 2019 + IIS (chốt 27/10/2026)

Server: Windows Server 2019 Standard (1809), 8 vCPU Xeon Platinum 8260, RAM 32 GB. Ảnh lưu thẳng trên ổ đĩa của server, IIS phục vụ file tĩnh. Ảnh re-encode WebP ~1600px thường 100–400 KB, 10 GB chứa hàng chục nghìn ảnh; rủi ro chính là **mất ổ** và **đầy ổ** — mục 4.4 và 4.5 xử lý.

Thiết kế giữ `storage_key` độc lập nơi lưu: chuyển sang R2/B2 sau này chỉ cần copy file theo cùng key và đổi biến môi trường (mục 4.6).

### 4.1 Thư mục và quyền NTFS

| Mục | Giá trị |
|---|---|
| Gốc site ảnh | `MEDIA_DIR=D:\maxv-media` — chứa `web.config` của site IIS `media.maxv.vn` (mục 4.3) |
| File ảnh | `D:\maxv-media\media\2026\10\<uuid>.webp` (= `MEDIA_DIR` + `storage_key`) |
| Ổ đĩa | Đặt trên ổ dữ liệu (D:), không phải ổ hệ điều hành C:, để đầy ảnh không làm treo Windows/PostgreSQL. Nếu server chỉ có một ổ, tạo phân vùng/ổ ảo riêng |
| Tài khoản | `svc-maxv-api` (local user chạy service API), `svc-maxv-backup` (chạy backup), App Pool `IIS AppPool\maxv-media` |
| Antivirus | Loại `D:\maxv-media\media` khỏi quét thời gian thực của Defender (ảnh đã được API decode/re-encode), tránh khóa file `.tmp` lúc `rename` |

```powershell
New-Item -ItemType Directory D:\maxv-media\media -Force
icacls D:\maxv-media /inheritance:r /grant:r "Administrators:(OI)(CI)F" "SYSTEM:(OI)(CI)F" "IIS AppPool\maxv-media:(OI)(CI)RX" "svc-maxv-backup:(OI)(CI)RX"
icacls D:\maxv-media\media /grant "svc-maxv-api:(OI)(CI)M"    # API chỉ ghi được trong \media, không sửa được web.config
Add-MpPreference -ExclusionPath D:\maxv-media\media
```

Giới hạn: **chỉ một instance API** ghi vào thư mục này (ponytail: một server; nhiều instance/nhiều server thì chuyển R2 theo mục 4.6).

### 4.2 Ghi và xóa file

`src/lib/storage.ts` chỉ có 2 hàm, chạy được trên Windows và Linux:

```ts
// ponytail: ghi ổ đĩa local; đổi sang S3/R2 chỉ cần viết lại 2 hàm này.
const root = path.resolve(MEDIA_DIR);

function fileOf(key: string) {
  const file = path.resolve(root, key);
  if (!file.startsWith(root + path.sep)) throw new Error("storage key ngoài MEDIA_DIR");
  return file;
}

export async function put(key: string, data: Buffer): Promise<void> {
  const file = fileOf(key);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, data, { flag: "wx" });
  for (let i = 0; ; i++) {
    try { await fs.rename(tmp, file); return; }          // file đích luôn mới (uuid), không ghi đè
    catch (e) {                                           // Windows: antivirus/indexer có thể giữ file vài trăm ms
      if (i >= 4 || !["EPERM", "EBUSY", "EACCES"].includes((e as NodeJS.ErrnoException).code ?? "")) {
        await fs.rm(tmp, { force: true });
        throw e;
      }
      await new Promise((r) => setTimeout(r, 200 * (i + 1)));
    }
  }
}

export async function remove(key: string): Promise<void> {
  await fs.rm(fileOf(key), { force: true });              // idempotent
}
```

- `key` luôn do server sinh (`media/YYYY/MM/<uuid>.webp`); `fileOf` vẫn chặn path traversal.
- Luồng upload: dashboard gửi file → API kiểm tra magic bytes, decode và re-encode bằng `sharp` (WebP, tối đa 4096 px, bỏ EXIF/GPS) → `put` → insert `media`. Insert DB lỗi thì `remove` file vừa ghi.
- Job hằng ngày: xóa `.tmp` > 1 giờ, file không có dòng `media` > 24 giờ, xử lý media kẹt `deleting`.

### 4.3 IIS phục vụ ảnh

Site IIS `media.maxv.vn`, physical path `D:\maxv-media`, App Pool riêng `maxv-media` ("No Managed Code"), binding HTTPS. `MEDIA_PUBLIC_BASE_URL=https://media.maxv.vn`. Domain riêng tách cookie của dashboard/API khỏi file ảnh.

`D:\maxv-media\web.config`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <directoryBrowse enabled="false" />
    <handlers>
      <clear />
      <add name="StaticFile" path="*" verb="GET,HEAD" modules="StaticFileModule" resourceType="File" requireAccess="Read" />
    </handlers>
    <security>
      <requestFiltering>
        <!-- chỉ trả ảnh; .tmp, web.config và mọi đuôi khác bị 404 -->
        <fileExtensions allowUnlisted="false">
          <add fileExtension=".webp" allowed="true" />
          <add fileExtension=".jpg" allowed="true" />
          <add fileExtension=".jpeg" allowed="true" />
          <add fileExtension=".png" allowed="true" />
        </fileExtensions>
        <verbs allowUnlisted="false">
          <add verb="GET" allowed="true" />
          <add verb="HEAD" allowed="true" />
        </verbs>
      </requestFiltering>
    </security>
    <staticContent>
      <remove fileExtension=".webp" />
      <mimeMap fileExtension=".webp" mimeType="image/webp" />
      <clientCache cacheControlMode="UseMaxAge" cacheControlMaxAge="365.00:00:00" cacheControlCustom="public, immutable" />
    </staticContent>
    <httpProtocol>
      <customHeaders>
        <add name="X-Content-Type-Options" value="nosniff" />
        <add name="Content-Disposition" value="inline; filename=&quot;media&quot;" />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

- IIS 10 trên Windows Server 2019 chưa có sẵn MIME `.webp`; `<remove>` + `<mimeMap>` thêm vào mà không lỗi trùng nếu đã có.
- Muốn CDN miễn phí sau này: trỏ `media.maxv.vn` qua proxy Cloudflare (gói Free), không đổi code.
- Website: `images.remotePatterns` cho `https://media.maxv.vn/media/**` trong `next.config.ts`.

### 4.4 Chống đầy ổ

- API kiểm tra dung lượng trống (`fs.statfs`, có trên Windows từ Node 18.15) trước mỗi upload; dưới `MEDIA_MIN_FREE_BYTES` (mặc định 2 GiB) thì từ chối `503` code `STORAGE_FULL`, không ghi dở.
- Cảnh báo khi ổ D: (ảnh) hoặc ổ chứa data PostgreSQL vượt 80%: Task Scheduler chạy script PowerShell kiểm tra `Get-Volume` mỗi giờ, gửi ping/email như backup (mục 4.5).
- Giới hạn upload theo mục 6.3 kế hoạch gốc (5 MiB/ảnh, 10 upload/phút/user) vẫn áp dụng; IIS chặn sớm bằng `maxAllowedContentLength` ~6 MB ở site API (mục 3.5 kế hoạch gốc).

### 4.5 Backup ảnh và database

Ảnh và DB backup **cùng một lịch** và **ra ngoài server**: backup nằm chung server thì hỏng server là mất cả hai. Windows Server Backup ra ổ khác chỉ là lớp phụ, không thay thế bản ngoài server.

| Mục | Quy định |
|---|---|
| Công cụ | `restic` bản Windows (`C:\maxv-backup\restic.exe`; mã hóa, incremental, chống trùng — ảnh bất biến nên mỗi lần chỉ đẩy ảnh mới) + `pg_dump.exe` đi kèm PostgreSQL |
| Nơi chứa backup | Ngoài server: server/NAS khác qua SFTP, hoặc bucket chỉ dùng làm kho backup (Backblaze B2 miễn phí 10 GB đủ giai đoạn đầu). Chốt ở mục 12.4 kế hoạch gốc |
| Lịch | Task Scheduler, hằng ngày 02:00 (server đặt múi giờ `SE Asia Standard Time`), chạy bằng `svc-maxv-backup`, "Run whether user is logged on or not" |
| Thứ tự | **Dump DB trước, rồi mới backup ảnh.** Ảnh không bao giờ bị sửa, nên mọi ảnh mà bản dump tham chiếu đều đã có trên ổ lúc backup ảnh chạy |
| Giữ lại | 7 bản ngày, 4 bản tuần, 6 bản tháng |
| Kiểm tra | `restic check` hằng tuần (task riêng); khôi phục thử lên staging hằng tháng và sau mỗi lần đổi cấu hình backup |
| Báo lỗi | Ping thành công/thất bại tới dịch vụ giám sát cron (ví dụ healthchecks.io gói free) hoặc email; không có ping trong 26 giờ là cảnh báo |
| Mục tiêu | RPO ≤ 24 giờ, RTO ≤ 4 giờ — phải đo được bằng lần khôi phục thử |

`C:\maxv-backup\env.ps1` (chỉ Administrators và `svc-maxv-backup` đọc được):

```powershell
$env:RESTIC_REPOSITORY    = 'sftp:backup@backup-host:/srv/restic/maxv'   # hoặc b2:<bucket>:maxv
$env:RESTIC_PASSWORD_FILE = 'C:\maxv-backup\restic-password.txt'
$env:PGPASSFILE           = 'C:\maxv-backup\pgpass.conf'                 # localhost:5432:maxv:maxv_backup:<mật khẩu>
$PgDump  = 'C:\Program Files\PostgreSQL\17\bin\pg_dump.exe'              # đúng bản PostgreSQL đã cài
$Restic  = 'C:\maxv-backup\restic.exe'
$HcUrl   = 'https://hc-ping.com/<uuid>'
```

`C:\maxv-backup\maxv-backup.ps1` — lưu mọi file `.ps1` dạng **UTF-8 có BOM**, hoặc chỉ dùng ký tự ASCII trong chuỗi: PowerShell 5.1 trên Server 2019 đọc file không BOM theo bảng mã ANSI nên tiếng Việt trong chuỗi bị vỡ (đã gặp khi chạy thử). Đã kiểm tra: 4 đoạn PowerShell trong mục này parse được, `Invoke-Native` bắt đúng mã thoát khác 0; `web.config` là XML hợp lệ (chưa áp lên IIS thật).

```powershell
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12   # PowerShell 5.1 trên Server 2019
. 'C:\maxv-backup\env.ps1'

function Invoke-Native([string]$Exe, [string[]]$Arguments) {
  & $Exe @Arguments
  if ($LASTEXITCODE -ne 0) { throw "$Exe exited with code $LASTEXITCODE" }   # exe ngoài lỗi không tự rơi vào catch
}

$stamp = (Get-Date).ToUniversalTime().ToString('yyyyMMddTHHmmssZ')
$dump  = "D:\maxv-backup-tmp\db-$stamp.dump"
try {
  # 1. Database trước (user maxv_backup chỉ có quyền đọc)
  Invoke-Native $PgDump @('--format=custom', '--no-owner', "--file=$dump", '--host=localhost', '--username=maxv_backup', 'maxv')
  # 2. Ảnh sau, cùng một snapshot với bản dump
  Invoke-Native $Restic @('backup', '--tag', 'maxv', '--host', 'maxv-api', $dump, 'D:\maxv-media\media')
  # 3. Giữ 7 ngày / 4 tuần / 6 tháng
  Invoke-Native $Restic @('forget', '--tag', 'maxv', '--keep-daily', '7', '--keep-weekly', '4', '--keep-monthly', '6', '--prune')
  Remove-Item $dump
  Invoke-WebRequest -UseBasicParsing -TimeoutSec 10 $HcUrl | Out-Null
}
catch {
  try { Invoke-WebRequest -UseBasicParsing -TimeoutSec 10 "$HcUrl/fail" | Out-Null } catch { }
  throw
}
```

Tạo task (chạy một lần bằng Administrator; `/RP *` hỏi mật khẩu của `svc-maxv-backup`):

```bat
schtasks /Create /TN "MaxV\Backup" /SC DAILY /ST 02:00 /RU svc-maxv-backup /RP * /RL LIMITED ^
  /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\maxv-backup\maxv-backup.ps1"
schtasks /Create /TN "MaxV\Backup check" /SC WEEKLY /D SUN /ST 04:00 /RU svc-maxv-backup /RP * /RL LIMITED ^
  /TR "powershell.exe -NoProfile -ExecutionPolicy Bypass -File C:\maxv-backup\maxv-backup-check.ps1"
```

`C:\maxv-backup\maxv-backup-check.ps1`:

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
. 'C:\maxv-backup\env.ps1'
& $Restic check
$suffix = if ($LASTEXITCODE -eq 0) { '' } else { '/fail' }
Invoke-WebRequest -UseBasicParsing -TimeoutSec 10 "$HcUrl$suffix" | Out-Null
```

`svc-maxv-backup` cần quyền đọc `D:\maxv-media`, ghi `D:\maxv-backup-tmp`, đọc `C:\maxv-backup`; không cần quyền Administrator.

Khôi phục (ghi thành `maxv-api/docs/runbook.md`, chạy PowerShell bằng Administrator):

1. `Stop-Service maxv-api` để không có upload mới.
2. `. C:\maxv-backup\env.ps1; & $Restic snapshots --tag maxv` → chọn snapshot; `& $Restic restore <id> --target D:\restore`.
3. `pg_restore.exe --clean --if-exists --no-owner --host=localhost --username=postgres --dbname=maxv D:\restore\D\maxv-backup-tmp\db-*.dump`.
4. `robocopy D:\restore\D\maxv-media\media D:\maxv-media\media /E`; chạy lại lệnh `icacls` ở mục 4.1.
5. Chạy job reconcile ở chế độ chỉ báo cáo: dòng `media` không có file (phải bằng 0), file không có dòng `media` (bỏ qua được).
6. `Start-Service maxv-api`, mở thử vài bài có ảnh trên website.

Lưu ý dữ liệu: ảnh đã xóa vẫn nằm trong backup tới hết thời hạn giữ (tối đa 6 tháng). Sự cố ảnh nhạy cảm phải xóa cả snapshot chứa ảnh đó (`restic forget <id> --prune`) và ghi vào báo cáo sự cố.

### 4.6 Chuyển sang object storage sau này

Khi cần nhiều instance API, CDN mạnh hơn hoặc ổ không đủ: tạo bucket R2/B2, `rclone copy D:\maxv-media\media r2:<bucket>/media`, viết lại 2 hàm `put`/`remove` bằng S3 SDK, đổi `MEDIA_PUBLIC_BASE_URL`. DB không phải migrate vì chỉ lưu `storage_key`.

### 4.7 Biến môi trường

| Nơi | Biến | Ví dụ |
|---|---|---|
| `maxv-api` | `MEDIA_DIR` | `D:\maxv-media` |
| `maxv-api` | `MEDIA_PUBLIC_BASE_URL` | `https://media.maxv.vn` |
| `maxv-api` | `MEDIA_MIN_FREE_BYTES` | `2147483648` |
| Backup | `RESTIC_REPOSITORY`, `RESTIC_PASSWORD_FILE`, `PGPASSFILE`, `$HcUrl` | `C:\maxv-backup\env.ps1` |
| `page_maxv` | `MEDIA_PUBLIC_BASE_URL` | đồng bộ `images.remotePatterns` |

## 5. Prisma (chốt 27/10/2026)

`maxv-api` dùng **Prisma ORM** cho schema, migration và truy vấn. File nguồn để copy vào repo `maxv-api`:

| File | Nội dung |
|---|---|
| [prisma/schema.prisma](prisma/schema.prisma) | 17 model của G1, tên bảng/cột `snake_case` qua `@@map`/`@map`, code dùng `camelCase` |
| [prisma/checks.sql](prisma/checks.sql) | Phần Prisma không khai báo được: hàm `f_unaccent` và toàn bộ `CHECK`, chia khối theo task 01–05 |

Đã kiểm tra trên Prisma 6.19.3 + PostgreSQL 18: `prisma validate` đạt; SQL sinh bởi `migrate diff --from-empty` + `checks.sql` chạy được; sau khi áp `checks.sql`, `migrate diff --from-url … --to-schema-datamodel` trả **rỗng** (Prisma không đòi xóa CHECK/hàm); các CHECK chặn đúng (email chữ hoa, product key lạ, giá `fixed` = 0, lead `consult` thiếu sản phẩm).

### 5.1 Phiên bản và cấu hình

- Ghim `prisma@6` và `@prisma/client@6` (đã kiểm tra). Prisma đã có bản major mới hơn với cách cấu hình khác (file config, driver adapter); chỉ nâng cấp khi đọc migration guide của bản đó và chạy lại kiểm tra ở mục 5 — quyết định ở Task 0.
- `previewFeatures = ["postgresqlExtensions"]` + `extensions = [pg_trgm, unaccent]`: migration đầu tiên tự `CREATE EXTENSION`.
- `binaryTargets = ["native", "windows"]`: Prisma Client build trên CI Linux vẫn chạy được trên Windows Server 2019.
- Script trong `package.json`:

| Script | Lệnh | Dùng khi |
|---|---|---|
| `db:migrate` | `prisma migrate dev` | Dev, tạo/áp migration |
| `db:migrate:create` | `prisma migrate dev --create-only` | Tạo migration để dán khối CHECK trước khi áp |
| `db:deploy` | `prisma migrate deploy` | CI/staging/production, trước khi chạy code mới |
| `db:seed` | `prisma db seed` (`prisma/seed.ts`) | Seed idempotent bằng `upsert` |
| `db:reset:test` | `prisma migrate reset --force` với `DATABASE_URL=$TEST_DATABASE_URL` | Trước bộ test integration |

### 5.2 Quy trình migration mỗi task

1. Thêm model của task vào `schema.prisma` (copy từ [prisma/schema.prisma](prisma/schema.prisma)), kèm field quan hệ ngược trên `AdminUser` nếu có.
2. `npm run db:migrate:create -- --name <ten>` → mở `prisma/migrations/<ts>_<ten>/migration.sql`.
3. Dán khối tương ứng từ [prisma/checks.sql](prisma/checks.sql) vào **cuối** file đó.
4. `npm run db:migrate` để áp; commit cả `schema.prisma` và thư mục migration.
5. Kiểm tra drift: `prisma migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --script` phải rỗng.

| Task | Migration | Model | Khối `checks.sql` |
|---|---|---|---|
| 1 | `auth` | `AdminRole`, `AdminUser`, `AdminSession`, `AdminToken`, `AuditLog`, `RateLimit` | `-- 01` + riêng hàm `f_unaccent` từ đầu khối `-- 03` (sau extension `unaccent`) |
| 3 | `rbac` | `AdminRolePermission` | `-- 02` |
| 5, 7 | `media`, `posts` | `Media`, `MediaUsage` / `NewsCategory`, `Post` | CHECK tương ứng trong `-- 03`, không lấy lại hàm `f_unaccent` đã tạo ở Task 1 |
| 10 | `leads` | `Lead`, `LeadNote`, `LeadRequest`, `ConsentRecord` | `-- 04` |
| 13 | `pricing` | `PricingProduct`, `PricingPlan` | `-- 05` |

Không sửa migration đã áp ở staging/production; thay đổi mới luôn là migration mới. Không có migration nào xóa cột/bảng ở G1; nếu cần thì làm theo expand-contract (mục 5.3 kế hoạch gốc).

### 5.3 Quy ước code với Prisma

| Việc | Cách làm |
|---|---|
| Một client | `src/lib/db.ts` export một `PrismaClient` dùng chung; không tạo client mỗi request |
| Khóa lạc quan | `const { count } = await db.post.updateMany({ where: { id, version }, data: { ...input, version: { increment: 1 } } })`; `count === 0` → đọc lại: không có bản ghi thì `404`, có thì `409 VERSION_CONFLICT` |
| Trùng unique | Bắt `Prisma.PrismaClientKnownRequestError` code `P2002` → `409 SLUG_CONFLICT` / email trùng / replay `Idempotency-Key` (đọc lại `lead_requests` trả receipt cũ) |
| Khóa dòng | Kiểm tra "không mất Quản trị viên cuối cùng", "ảnh đang dùng trước khi xóa": `db.$transaction(async (tx) => { await tx.$queryRaw\`SELECT id FROM admin_users WHERE … FOR UPDATE\`; … })` |
| Vi phạm CHECK | Validate bằng zod trước khi gọi Prisma; nếu vẫn lọt tới DB (lỗi `P2010`/`23514`) thì trả `422`, ghi log vì đó là thiếu validation |
| `BigInt` | `priceAmount`, `AuditLog.id` là `BigInt` trong JS; DTO chuyển `Number(priceAmount)` (an toàn, tối đa 1.000 tỷ < 2^53) và `String(id)`; không trả thẳng object Prisma ra JSON |
| `Json` | `content`, `specs`, `features`, `notes`, `utm` validate bằng zod khi ghi và khi đọc; type Prisma là `JsonValue`, không tin dữ liệu cũ |
| `search_text` | Service tính `lower(f_unaccent(...))` bằng `$queryRaw\`SELECT lower(f_unaccent(${text})) AS s\`` hoặc hàm JS bỏ dấu tương đương rồi ghi cùng lần lưu; query: `where: { searchText: { contains: normalize(q) } }` |
| Không lộ trường | Luôn `select` đúng trường của DTO (không `passwordHash`, `tokenHash`, `payloadHash`) |
| Audit | Ghi `auditLog.create` trong **cùng** `$transaction` với thay đổi nghiệp vụ |
| Enum | Giữ `String` + CHECK, type TS lấy từ zod (`z.enum([...])`) dùng chung cho validate; không dùng Prisma `enum` vì giá trị có dấu gạch (`tu-van`, `maxv-hkd`) |

### 5.4 Seed

`prisma/seed.ts` dùng `upsert` theo khóa tự nhiên, chạy lại không tạo bản sao (nội dung giống mục 2.7):

```ts
for (const [i, c] of categories.entries())
  await db.newsCategory.upsert({ where: { slug: c.slug }, update: {}, create: { ...c, sortOrder: i + 1 } });

for (const [i, p] of products.entries())
  await db.pricingProduct.upsert({ where: { key: p.key }, update: {}, create: { ...p, sortOrder: i + 1 } });

for (const r of roles)
  await db.adminRole.upsert({
    where: { name: r.name },
    update: {},
    create: { name: r.name, description: r.description, isSystem: r.isSystem,
              permissions: { create: r.permissions.map((permission) => ({ permission })) } },
  });
// Không seed pricingPlan, không seed admin user (tạo bằng scripts/bootstrap-admin.ts).
```
