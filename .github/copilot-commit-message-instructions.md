# Quy ước Commit Message

Dự án sử dụng chuẩn **Conventional Commits 1.0.0** để đảm bảo commit message nhất quán, dễ đọc và hỗ trợ các công cụ tự động như tạo CHANGELOG, Semantic Versioning và release automation.

## Định dạng

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Ví dụ:

```text
feat(auth): thêm chức năng đăng nhập
fix(upload): sửa lỗi khi tải tệp lên
docs(readme): cập nhật hướng dẫn cài đặt
```

`scope` là tùy chọn và được sử dụng để mô tả phạm vi thay đổi:

```text
feat(auth): thêm đăng nhập bằng Google
fix(payment): sửa lỗi thanh toán trùng lặp
refactor(user): đơn giản hóa logic xử lý hồ sơ
```

---

## Các loại Commit

### `feat` — Feature

Thêm một tính năng mới.

Ví dụ:

```text
feat(auth): thêm chức năng đăng nhập
feat(ui): thêm chế độ giao diện tối
```

`feat` thường tương ứng với **MINOR** trong Semantic Versioning.

### `fix` — Bug Fix

Sửa lỗi trong hệ thống.

Ví dụ:

```text
fix(auth): sửa lỗi refresh token
fix(footer): sửa liên kết không chính xác
```

`fix` thường tương ứng với **PATCH** trong Semantic Versioning.

### `refactor` — Refactor

Thay đổi cấu trúc hoặc cải tổ code mà không thêm tính năng mới và không sửa hành vi lỗi.

Ví dụ:

```text
refactor(chart): tái cấu trúc logic render biểu đồ
refactor(auth): đơn giản hóa logic xác thực
```

### `docs` — Documentation

Thêm hoặc cập nhật tài liệu.

Ví dụ:

```text
docs(readme): thêm hướng dẫn cài đặt
docs(api): cập nhật tài liệu API
```

### `style` — Code Style

Thay đổi format hoặc style code mà không làm thay đổi logic.

Ví dụ:

```text
style: format lại code theo ESLint
style(auth): sửa indentation không nhất quán
```

### `test` — Tests

Thêm, sửa hoặc tái cấu trúc test.

Ví dụ:

```text
test(auth): thêm unit test cho API đăng nhập
test(user): bổ sung test cho cập nhật hồ sơ
```

### `build` — Build System

Thay đổi liên quan đến dependency hoặc hệ thống build.

Ví dụ:

```text
build: cập nhật Prisma
build(deps): nâng phiên bản TypeScript
```

### `ci` — Continuous Integration

Thay đổi cấu hình hoặc script liên quan đến CI/CD.

Ví dụ:

```text
ci: thêm workflow kiểm tra pull request
ci(github): cập nhật workflow deploy
```

### `chore` — Maintenance

Các công việc bảo trì không trực tiếp thay đổi source code hoặc test.

Ví dụ:

```text
chore: cập nhật cấu hình development
chore(git): cập nhật .gitignore
```

### `perf` — Performance

Thay đổi nhằm cải thiện hiệu năng.

Ví dụ:

```text
perf(product): cải thiện tốc độ tải danh sách sản phẩm
perf(database): tối ưu truy vấn lấy danh sách người dùng
```

> `refactor`, `docs`, `style`, `test`, `build`, `ci`, `chore` và `perf` là các type bổ sung theo convention của dự án. Conventional Commits 1.0.0 yêu cầu ý nghĩa của `feat` và `fix`, đồng thời cho phép sử dụng thêm các type khác.

---

## Breaking Changes

Thay đổi không tương thích ngược phải được đánh dấu bằng `!` trước dấu `:` hoặc sử dụng footer `BREAKING CHANGE:`.

Ví dụ:

```text
feat(api)!: thay đổi cấu trúc response của API
```

Hoặc:

```text
feat(api): thay đổi cấu trúc response của API

BREAKING CHANGE: trường `user_name` đã được đổi thành `username`
```

Breaking change tương ứng với **MAJOR** trong Semantic Versioning.

---

## Body

Body được sử dụng khi phần mô tả ngắn chưa đủ để giải thích thay đổi.

Body phải cách dòng đầu tiên bằng một dòng trống.

Ví dụ:

```text
fix(auth): sửa lỗi refresh token

Refresh token trước đây không được kiểm tra thời gian hết hạn,
dẫn đến token hết hạn vẫn có thể được sử dụng.
```

---

## Footer

Footer chứa metadata bổ sung cho commit, chẳng hạn như breaking change hoặc tham chiếu issue.

Ví dụ:

```text
fix(auth): xử lý refresh token hết hạn

Refs: #123
```

Breaking change:

```text
feat(api): thay đổi authentication API

BREAKING CHANGE: endpoint `/login` được thay thế bằng `/auth/login`
```

---

## Quy tắc viết Commit Message

- Commit message phải bắt đầu bằng `type`.
- Có thể thêm `scope` trong dấu `()`.
- Sau `type` hoặc `scope` là dấu `:` và một khoảng trắng.
- Description phải ngắn gọn và mô tả chính xác thay đổi.
- Mỗi commit nên tập trung vào một thay đổi có ý nghĩa.
- Nếu thay đổi chứa nhiều nội dung độc lập, nên tách thành nhiều commit.
- Sử dụng `!` hoặc `BREAKING CHANGE:` khi có thay đổi không tương thích ngược.
- Không sử dụng emoji làm type để đảm bảo tương thích với Conventional Commits 1.0.0.

Tránh các commit message chung chung như:

```text
update code
fix bug
change something
update
```

Thay vào đó:

```text
feat(auth): thêm chức năng đăng nhập
fix(auth): sửa lỗi refresh token hết hạn
perf(product): cải thiện tốc độ tải danh sách sản phẩm
refactor(auth): tái cấu trúc module authentication
docs(api): cập nhật tài liệu API
build(deps): cập nhật Prisma
style: format code theo ESLint
test(auth): thêm test cho API đăng nhập
ci: thêm workflow kiểm tra pull request
chore: cập nhật cấu hình development
```

---

## Ví dụ Commit hoàn chỉnh

### Feature

```text
feat(auth): thêm đăng nhập bằng Google
```

### Bug Fix

```text
fix(payment): ngăn tạo giao dịch trùng lặp
```

### Có Scope

```text
feat(product): thêm bộ lọc theo danh mục
```

### Có Body

```text
perf(product): tối ưu truy vấn danh sách sản phẩm

Giảm số lượng database query khi tải thông tin
danh mục và hình ảnh của sản phẩm.
```

### Breaking Change

```text
feat(auth)!: thay đổi cấu trúc authentication API

BREAKING CHANGE: access token không còn được trả về trong response body.
Token được chuyển sang HTTP-only cookie.
```

### Tham chiếu Issue

```text
fix(upload): giới hạn kích thước tệp tải lên

Refs: #245
```

---

## Tóm tắt Type

```text
feat      Thêm tính năng mới
fix       Sửa lỗi
refactor  Tái cấu trúc code
docs      Thay đổi tài liệu
style     Format/style code
test      Thêm hoặc sửa test
build     Dependency hoặc build system
ci        CI/CD
chore     Công việc bảo trì
perf      Cải thiện hiệu năng
```

Cấu trúc khuyến nghị:

```text
<type>(<scope>): <description>
```

Ví dụ:

```text
feat(auth): thêm đăng nhập bằng Google
fix(product): sửa lỗi phân trang
refactor(order): đơn giản hóa logic tạo đơn hàng
docs(api): cập nhật authentication API
test(auth): thêm test refresh token
perf(database): tối ưu truy vấn sản phẩm
```