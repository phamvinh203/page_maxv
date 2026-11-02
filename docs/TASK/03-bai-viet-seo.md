# 03 — Bài viết, ảnh và SEO

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** Task 5 [API] ảnh → Task 6 [UI] ảnh → Task 7 [API] bài viết → Task 8 [UI] bài viết → Task 9 [Site] · **Phụ thuộc:** 02

## Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** người có quyền soạn và xuất bản nội dung thật lên tin tức; quản lý ảnh và SEO. Không có lịch đăng hay quy trình duyệt hai cấp trong G1.

| Thao tác | Kết quả nghiệp vụ theo đặc tả hiện có |
|---|---|
| Tạo bài | Bản nháp, chưa xuất hiện trên website |
| Xuất bản | Đủ dữ liệu bắt buộc và có quyền publish; xuất hiện ở request tiếp theo |
| Sửa bài đang công khai | Xem trước rồi xác nhận; lưu thành công cập nhật nội dung live, không tạo bản nháp song song |
| Gỡ bài | Về draft, biến khỏi public và sitemap |
| Lưu trữ/khôi phục | archived không công khai; khôi phục về draft, không tự xuất bản lại |
| Xóa | Chỉ bài chưa từng xuất bản; bài đã từng xuất bản không xóa cứng |

**Tình huống ngoại lệ:** hai người sửa cùng bài thì bản cũ không ghi đè bản mới, nội dung đang nhập được giữ. Ảnh upload có URL công khai ngay cả khi bài còn nháp; ảnh đang được tham chiếu không xóa được. Slug/chuyên mục khóa sau lần xuất bản đầu để giữ URL.

**Tiêu chí chấp nhận — UAT-04:** cho trước bản nháp đủ dữ liệu; khi người có quyền xuất bản; thì website, chi tiết và sitemap cùng thấy bài. Khi gỡ, chi tiết trả 404, listing/sitemap không còn bài. **UAT-05:** cho trước hai phiên cùng sửa bài; khi phiên thứ nhất lưu, phiên thứ hai lưu bản cũ; thì báo xung đột, không mất nội dung nhập và không ghi đè dữ liệu mới.

## Task 5 [API] — Media

**Files:** `src/modules/media/`, `src/lib/storage.ts` (2 hàm `put`/`remove` ghi ổ đĩa, theo [thiet-ke-api-db.md](thiet-ke-api-db.md) mục 4.2), migration Prisma `media`: model `Media`, `MediaUsage` + phần `media`/`media_usages` trong khối `-- 03` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); job dọn orphan/reconcile; `tests/media.test.ts`.

**Endpoints:** mục 6.3.

- [ ] Test upload PNG thật thành công; MIME giả/SVG/ảnh decode lỗi/5 MiB+1 bị chặn; ảnh đang được tham chiếu không xóa được (409 `MEDIA_IN_USE`).
- [ ] Test strip EXIF (ảnh có GPS sau upload không còn metadata); quota upload từ chối sớm qua Content-Length; PATCH alt version cũ trả 409.
- [ ] Test bù trừ: ghi file OK nhưng ghi DB fail → file bị xóa; ghi dở để lại `.tmp` không bao giờ được IIS trả ra (request filtering chặn đuôi `.tmp`); job chỉ xóa file không có dòng `media` > 24 giờ; media kẹt `deleting` > 24 giờ về trạng thái nhất quán.
- [ ] Test ổ dưới `MEDIA_MIN_FREE_BYTES` → upload trả 503 `STORAGE_FULL`, không ghi file.
- [ ] Test key ngoài `MEDIA_DIR` (path traversal) bị chặn trong `put`/`remove`.
- [ ] Commit `feat(api): validated media uploads`.

**Xong khi:** upload/list/xóa ảnh được qua API dev, URL ảnh public mở được → mở Task 6.

## Task 6 [UI] — Thư viện ảnh và bộ chọn ảnh

**Files:** `src/pages/media/`, `src/components/media-picker.tsx`, `src/components/image-upload.tsx`; `tests/e2e/media.spec.ts`.

**Dùng API:** Task 5.

- [ ] `/media`: lưới ảnh, tìm theo tên/alt, upload (kéo thả + chọn file, kiểm tra loại/dung lượng phía client để báo sớm), sửa alt, xóa ảnh chưa dùng, hiện nơi đang dùng.
- [ ] Cảnh báo cố định "mọi ảnh upload là công khai ngay cả khi bài chưa đăng".
- [ ] `media-picker`: dialog chọn/upload ảnh, trả `{mediaId, url, alt}` cho form khác dùng (Task 8, Task 17).
- [ ] Lỗi upload giữ nguyên form; ẩn nút upload/xóa khi thiếu `media.upload`/`media.delete`.
- [ ] Commit `feat(admin): media library`.

**Xong khi:** upload và chọn ảnh từ dashboard staging → mở Task 7.

## Task 7 [API] — Bài viết (admin + public)

**Files:** `src/modules/posts/{routes,service,schema}.ts`, `src/modules/news-categories/`, migration Prisma `posts`: model `NewsCategory`, `Post` (index GIN trigram khai báo trong schema) + phần `posts` trong khối `-- 03` của [prisma/checks.sql](prisma/checks.sql) ([thiet-ke-api-db.md](thiet-ke-api-db.md) mục 5.2); `prisma/seed.ts` thêm 5 chuyên mục; khóa lạc quan bằng `updateMany({ where: { id, version } })`, trùng slug bắt `P2002` (mục 5.3); `tests/posts.test.ts`, `tests/public-posts.test.ts`.

**Endpoints:** mục 6.2 và phần posts/news-categories của mục 6.5.

Hàm `f_unaccent` thuộc migration `auth` ở Task 1; khi lấy khối `-- 03`, chỉ thêm CHECK của posts, không tạo lại hàm.

- [ ] Test tạo draft không public, publish đủ dữ liệu thành công, thiếu cover/excerpt 422; trùng slug trong chuyên mục 409.
- [ ] Test version cũ không ghi đè (PATCH sau publish ở nơi khác → 409, DB giữ bản mới); slug/category khóa sau lần publish đầu; unpublish/archive/restore đúng state; xóa bài từng publish bị chặn; DELETE thiếu `If-Match` 428.
- [ ] Test `POST /posts/{id}/preview` stateless không ghi DB; block `<script>` chỉ là text, link `javascript:` bị reject.
- [ ] Test public: phân trang 9 bài, `q` tiếng Việt có dấu, chuyên mục không tồn tại 404, sort có tie-breaker, draft/archived không ra public API.
- [ ] Audit publish/unpublish/archive/delete; commit `feat(api): posts and public news`.

**Xong khi:** tạo/publish bài bằng API dev và đọc được qua `GET /public/posts` → mở Task 8.

## Task 8 [UI] — Soạn, xem trước và xuất bản bài

**Files:** `src/pages/posts/{list,edit,preview}.tsx`, `src/components/block-editor/` (paragraph/heading/list/image/link theo mục 5.1), `src/components/post-preview.tsx`, `src/components/seo-fields.tsx`; `tests/e2e/posts.spec.ts`.

**Dùng API:** Task 7, media picker Task 6.

- [ ] `/posts`: lọc chuyên mục/trạng thái/nổi bật, tìm kiếm, sắp xếp, phân trang.
- [ ] `/posts/new`, `/posts/{id}/edit`: tiêu đề, slug gợi ý từ tiêu đề (khóa sau lần publish đầu), chuyên mục, tóm tắt, ảnh bìa, block editor, nổi bật; khối SEO (seoTitle ≤70, seoDescription ≤170, xem trước kết quả Google, đếm ký tự).
- [ ] Nút Lưu nháp / Xuất bản / Gỡ / Lưu trữ / Khôi phục / Xóa theo state và quyền (`posts.publish` riêng với `posts.edit`); xác nhận trước khi publish/gỡ/xóa; sửa bài đang publish phải xem trước rồi xác nhận.
- [ ] Xem trước bằng `post-preview` gọi preview stateless; cảnh báo rời trang chưa lưu; 409 giữ nội dung đang nhập và cho tải bản mới.
- [ ] e2e: Biên tập viên tạo bài tiếng Việt có ảnh → xem trước → xuất bản → thấy trạng thái published; Kinh doanh không vào được `/posts`.
- [ ] Commit `feat(admin): post editor and publishing`.

**Xong khi:** đăng được bài thật từ dashboard staging → mở Task 9.

## Task 9 [Site] — Nối tin tức, SEO, sitemap và tìm kiếm

**Files (`page_maxv`):** `app/_lib/api.ts`, `app/_lib/api-types.ts`; sửa `app/tin-tuc/page.tsx`, `app/tin-tuc/[category]/page.tsx`, `app/tin-tuc/[category]/[id]/page.tsx`, `app/tin-tuc/_components/news-listing.tsx`, `news-article.tsx`, `app/_lib/seo.ts`, `app/sitemap.ts`, `app/_components/layout/header-search.tsx`, `mobile-nav.tsx`; `next.config.ts` (`images.remotePatterns` media domain); thu gọn `app/_data/news.ts` còn nhãn chuyên mục/UI; `tests/e2e/public-news.spec.ts`.

**Dùng API:** `GET /public/news-categories`, `/public/posts`, `/public/posts/{category}/{slug}`.

- [ ] `api.ts`: fetch server-side tới `MAXV_API_URL`, timeout, 404 → `notFound()`, lỗi 5xx → trang lỗi; không cache (mục 10).
- [ ] Thay mọi caller `newsPosts`, `categoryOf`, `postHref`; giữ 5 chuyên mục và URL hiện có; NewsListing nhận dữ liệu phân trang, NewsArticle nhận post + related từ API.
- [ ] Nối ô tìm kiếm header/mobile và listing cùng `q`; đổi `q`/chuyên mục reset `page=1`; phân trang giữ bộ lọc.
- [ ] Metadata, Article JSON-LD (datePublished/dateModified), canonical và sitemap đọc cùng DTO từ API; bài published mới opt-in index.
- [ ] Test production (`next build && next start`): publish trên dashboard → bài hiện ở listing/chi tiết/sitemap ở request tiếp theo; unpublish → 404 và biến khỏi sitemap/related.
- [ ] Commit `feat(site): connect news to public API`.

**Xong khi:** bài đăng từ dashboard hiện trên website staging kèm SEO đúng → 03 hoàn tất.

