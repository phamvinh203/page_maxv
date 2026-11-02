# MaxV Admin — Chức năng dự kiến bàn giao và cách sử dụng

Tài liệu dành cho chủ dự án, quản trị viên, nhân viên nội dung và kinh doanh. Đây là mô tả kết quả sau khi hoàn thành các task, chưa phải xác nhận các chức năng đã được lập trình hoặc đưa vào sử dụng. Tên nút/menu dưới đây mô tả thao tác dự kiến; giao diện chi tiết sẽ được hoàn thiện khi triển khai.

## 1. Hệ thống sẽ dùng để làm gì?

Nhân viên dùng dashboard quản trị để quản lý bài viết, ảnh, bảng giá và yêu cầu khách hàng gửi từ website. Dữ liệu được phép công khai sẽ xuất hiện trên website MaxV; dữ liệu khách hàng và nội dung nháp chỉ người có quyền mới xem được.

Đăng ký/đăng nhập của khách hàng sử dụng sản phẩm vẫn thuộc hệ thống tài khoản khách hàng hiện có, tách với tài khoản nhân viên quản trị.

## 2. Các chức năng sẽ hoàn thành

### Giai đoạn 1 — Quản trị và vận hành cơ bản

| Nhóm chức năng | Người sử dụng | Có thể làm gì? | Kết quả |
|---|---|---|---|
| Tài khoản quản trị | Mọi nhân viên được cấp tài khoản | Đăng nhập, đăng xuất, đổi mật khẩu, quên/đặt lại mật khẩu, kích hoạt tài khoản được mời | Truy cập dashboard bằng tài khoản riêng |
| Nhân viên và phân quyền | Quản trị viên | Mời nhân viên, gán/đổi vai trò, khóa/mở khóa, quản lý vai trò và bảng quyền | Mỗi nhân viên làm đúng phần việc được giao |
| Thư viện ảnh | Người có quyền ảnh | Upload, tìm ảnh, sửa mô tả thay thế, chọn ảnh cho nội dung, xóa ảnh chưa được dùng | Dùng lại ảnh và quản lý nơi đang sử dụng |
| Bài viết và SEO | Người có quyền bài viết | Tạo nháp, soạn nội dung, chọn chuyên mục/ảnh bìa, nhập SEO, xem trước, xuất bản, gỡ, lưu trữ và khôi phục | Tin tức xuất hiện trên website, tìm kiếm và sitemap theo trạng thái công khai |
| Giá theo phần mềm | Người có quyền sửa giá | Tạo/sửa gói, số tiền, kỳ hạn, tính năng, ghi chú, nút liên hệ; sắp thứ tự, bật/ẩn sản phẩm và gói | Trang sản phẩm, bảng giá tổng hợp và trang chủ dùng cùng nguồn giá |
| Form tiếp nhận yêu cầu | Khách truy cập website | Gửi form liên hệ hoặc form tư vấn MaxV HKD, xác nhận chính sách bảo mật | Yêu cầu được ghi nhận và nhân viên thấy trong dashboard |
| Xử lý yêu cầu khách hàng | Người có quyền lead | Tìm/lọc, xem chi tiết, đổi trạng thái, giao người xử lý, thêm ghi chú, hiệu chỉnh thông tin liên hệ có lý do | Theo dõi được tiến trình xử lý và người phụ trách |
| Bàn giao vận hành | Chủ dự án và người vận hành | Nghiệm thu, kiểm tra dữ liệu thật, backup/restore, theo dõi sự cố theo quy trình | Đủ điều kiện đưa G1 vào sử dụng |

Giá quản lý cho 5 phần mềm: **MaxV Accounting, MaxV HĐĐT, MaxV HKD, Chữ ký số và Hóa đơn điện tử**. Đây là giá giới thiệu trên website, không tự thay đổi giá thanh toán trong hệ thống sản phẩm.

### Giai đoạn 2 — Nội dung mở rộng và báo cáo

| Nhóm chức năng | Người sử dụng | Có thể làm gì? | Kết quả |
|---|---|---|---|
| Logo và câu chuyện khách hàng | Người được cấp quyền G2 | Quản lý logo, soạn/xuất bản/gỡ/lưu trữ câu chuyện khách hàng | Website giới thiệu khách hàng và nội dung đã được phép công khai |
| Nội dung trang cố định | Người được cấp quyền G2 | Sửa các phần nội dung đã định nghĩa, lưu nháp, xuất bản | Cập nhật trang mà không sửa code cho các trường được hỗ trợ |
| Cấu hình website | Người được cấp quyền cấu hình | Cập nhật liên hệ, mạng xã hội và cấu hình SEO theo biểu mẫu | Các vị trí dùng chung hiển thị thông tin đồng nhất |
| Dashboard số liệu | Người có quyền xem tương ứng | Xem các chỉ số được định nghĩa từ lead và bài viết | Theo dõi hoạt động tiếp nhận và nội dung |
| Xuất lead | Người có quyền xuất dữ liệu | Lọc danh sách, xuất CSV mở bằng Excel | Tổng hợp dữ liệu được phép phục vụ công việc |
| Tra cứu nhật ký | Người có quyền nhật ký | Lọc theo người thao tác, hành động và thời gian | Kiểm tra ai đã thay đổi dữ liệu |

Việc ghi nhận các thay đổi quan trọng đã nằm trong G1; màn tra cứu nhật ký được bàn giao ở G2. Quyền chi tiết cho các chức năng G2 sẽ được chốt trước khi triển khai.

## 3. Thứ tự sử dụng khi bắt đầu vận hành

### Bước 1 — Quản trị viên thiết lập tài khoản

1. Nhận tài khoản quản trị đầu tiên qua quy trình bàn giao.
2. Đăng nhập dashboard và đổi mật khẩu bắt buộc lần đầu.
3. Vào phần nhân viên/vai trò, kiểm tra quyền đã được duyệt.
4. Mời nhân viên, chọn vai trò phù hợp với nhiệm vụ.
5. Nhân viên mở link kích hoạt trong email, đặt mật khẩu và đăng nhập.
6. Kiểm tra nhân viên chỉ thấy và thao tác được đúng chức năng được giao.

**Kết quả:** mỗi người có tài khoản riêng, không dùng chung mật khẩu quản trị.

Vai trò mẫu: **Quản trị viên** quản lý toàn hệ thống; **Biên tập viên** quản lý bài viết/ảnh và xem giá; **Kinh doanh** xử lý lead và xem giá. Người sửa giá cần được cấp `pricing.edit`; vai trò Kinh doanh mẫu không mặc định có quyền này. Chỉ người có quyền xuất mới được xuất lead ở G2.

### Bước 2 — Chuẩn bị ảnh và đăng bài viết

1. Người làm nội dung vào thư viện ảnh, tải ảnh được phép công khai và nhập mô tả thay thế phù hợp.
2. Vào bài viết, tạo bài mới, nhập tiêu đề, chuyên mục và tóm tắt.
3. Chọn ảnh bìa từ thư viện, soạn nội dung và thông tin SEO.
4. Lưu nháp nếu chưa hoàn thiện; xem trước để kiểm tra nội dung, ảnh và liên kết.
5. Người có quyền xuất bản xác nhận xuất bản.
6. Mở website kiểm tra bài trong danh sách, trang chi tiết và kết quả tìm kiếm nội bộ.
7. Khi cần sửa bài đang công khai, xem trước và xác nhận trước khi lưu. Lưu thành công sẽ cập nhật nội dung công khai.
8. Khi cần ngừng hiển thị, gỡ bài hoặc lưu trữ. Khôi phục bài lưu trữ sẽ đưa về nháp; cần xuất bản lại để công khai.

**Kết quả:** bài nháp không ra website; bài xuất bản hiển thị ở lần tải trang tiếp theo. Bài đã từng xuất bản không xóa cứng; đường dẫn và chuyên mục được khóa sau lần xuất bản đầu.

**Lưu ý:** ảnh upload có URL công khai ngay cả khi bài còn nháp. Ảnh đang được nội dung tham chiếu không xóa được.

### Bước 3 — Nhập và công khai bảng giá

1. Phụ trách kinh doanh xác nhận giá, kỳ hạn, ghi chú VAT/phí và nội dung được phép công khai.
2. Người có quyền sửa giá vào mục giá, chọn một trong 5 phần mềm.
3. Tạo gói, nhập tên, tính năng/thông số, kỳ hạn và chế độ giá: cố định, từ, miễn phí hoặc liên hệ.
4. Nhập số tiền khi chế độ yêu cầu; thêm ghi chú và nút hành động phù hợp.
5. Xem trước, kiểm tra thứ tự và bật hiển thị gói/sản phẩm khi đã được duyệt. Gói mới mặc định ẩn.
6. Mở trang sản phẩm, trang bảng giá tổng hợp và trang chủ để kiểm tra.
7. Khi đổi giá gói đang hiện, xác nhận thay đổi trước khi lưu; khi ngừng giới thiệu gói, chuyển sang ẩn.

**Kết quả:** website hiển thị giá từ dashboard ở lần tải tiếp theo. Sản phẩm không có gói đang hiện sẽ không có mục giá; lỗi tải giá sẽ hiển thị liên hệ nhận báo giá.

Cách chọn giá trang chủ và nội dung VAT/phí còn cần xác nhận theo kế hoạch. Chưa có chức năng hẹn ngày áp dụng giá trong G1.

### Bước 4 — Bật form và tiếp nhận yêu cầu

1. Chủ dự án/vận hành xác nhận trang chính sách bảo mật, thời hạn lưu dữ liệu, backup và người tiếp nhận lead đã sẵn sàng.
2. Chạy thử cả form liên hệ và form tư vấn HKD, kiểm tra yêu cầu xuất hiện đúng nguồn trong dashboard.
3. Sau nghiệm thu, người vận hành bật form công khai theo quy trình phát hành.
4. Khách truy cập website, chọn nhu cầu/sản phẩm, nhập thông tin và xác nhận chính sách trước khi gửi.
5. Khách nhận thông báo hệ thống đã tiếp nhận; nhân viên vào danh sách lead để kiểm tra yêu cầu mới.

**Kết quả:** yêu cầu mới có trạng thái `new`. Thông báo gửi thành công là xác nhận tiếp nhận, không phải xác nhận đã tư vấn hoặc đã tạo tài khoản sản phẩm.

Khi lỗi mạng, khách có thể thử gửi lại theo cơ chế retry của form mà không tạo thêm cùng yêu cầu. Thông báo email lead mới chưa được mặc định đưa vào G1; nhân viên cần kiểm tra dashboard theo phân công.

### Bước 5 — Nhân viên xử lý lead

1. Vào danh sách yêu cầu, lọc lead mới, người phụ trách, sản phẩm hoặc khoảng ngày.
2. Mở chi tiết để xem thông tin khách, nội dung, nguồn form và các yêu cầu có thể trùng.
3. Người có quyền giao việc chọn nhân viên đang hoạt động và có quyền xử lý lead.
4. Liên hệ khách qua kênh làm việc hiện có, sau đó cập nhật trạng thái tương ứng trên dashboard.
5. Thêm ghi chú về nội dung trao đổi và bước cần làm tiếp; ghi chú đã lưu không sửa/xóa theo chức năng thông thường.
6. Nếu khách cung cấp sai thông tin, người có quyền hiệu chỉnh nhập giá trị đúng và lý do.
7. Với yêu cầu có thể trùng, kiểm tra trước khi xử lý; ghi chú và đóng lead phụ khi phù hợp. Hệ thống chưa có chức năng gộp lead tự động.
8. Khi kết thúc xử lý, chuyển trạng thái theo quy tắc nghiệp vụ được xác nhận.

**Kết quả:** trạng thái, người phụ trách và ghi chú được giữ sau khi tải lại; thay đổi có ghi nhận người thao tác.

Các trạng thái dự kiến: `new` (mới), `contacted` (đã liên hệ), `qualified` (đủ điều kiện), `closed` (đã đóng), `spam`. Ý nghĩa chi tiết, điều kiện chuyển, SLA và cách bàn giao khi nhân viên nghỉ việc/khóa tài khoản cần được chốt trước triển khai logic tương ứng. Chỉ admin được đưa lead ra khỏi spam.

### Bước 6 — Quản lý nhân viên trong quá trình vận hành

1. Khi nhân viên đổi công việc, quản trị viên cập nhật vai trò/quyền phù hợp.
2. Khi nhân viên nghỉ hoặc cần ngừng truy cập, thực hiện bàn giao lead theo quy trình đã chốt rồi khóa tài khoản.
3. Tài khoản bị khóa không tiếp tục sử dụng phiên đăng nhập; lịch sử thao tác vẫn được giữ.
4. Khi cần cấp lại quyền truy cập, quản trị viên kiểm tra và mở khóa theo phân công.

**Kết quả:** quyền phản ánh đúng nhiệm vụ hiện tại; không xóa lịch sử người đã làm việc. Hệ thống ngăn việc làm mất Quản trị viên cuối cùng.

## 4. Cách dùng các chức năng bổ sung ở G2

### 4.1. Công khai logo và câu chuyện khách hàng

1. Xác nhận quyền sử dụng logo/lời chứng thực với phụ trách nội dung.
2. Upload ảnh, tạo thông tin khách hàng và chọn logo.
3. Bật logo hiển thị khi thông tin đã được duyệt.
4. Tạo story, liên kết khách hàng, nhập nội dung và chọn ảnh.
5. Lưu nháp, kiểm tra rồi xuất bản bằng tài khoản có quyền.
6. Kiểm tra website; gỡ hoặc lưu trữ story khi cần ngừng công khai.

**Kết quả:** nội dung mẫu vẫn nháp; story được duyệt mới công khai. Ảnh/khách hàng đang có tham chiếu không được xóa tùy ý. Quan hệ giữa ẩn logo và ẩn story phải theo quyết định được chốt trước Task 17.

### 4.2. Sửa nội dung trang và cấu hình liên hệ

1. Chọn trang đã được hỗ trợ, sửa các trường nội dung trong biểu mẫu.
2. Lưu nháp để hoàn thiện mà chưa đổi nội dung đang công khai.
3. Kiểm tra rồi xuất bản bằng tài khoản có quyền.
4. Với thông tin dùng chung như hotline/email/địa chỉ, sửa ở phần cấu hình website.
5. Kiểm tra các trang và vị trí dùng chung đã cập nhật đúng.
6. Nếu đổi chính sách bảo mật, thực hiện quy trình duyệt và cập nhật phiên bản đã chốt; form đang mở với bản cũ phải xác nhận lại bản mới.

**Kết quả:** nội dung trang và cấu hình cập nhật theo nguồn quản lý tương ứng. Giá vẫn sửa ở mục giá; logo/story vẫn sửa ở mục khách hàng. Không có chức năng kéo thả hoặc tạo loại trang tùy ý.

### 4.3. Xem số liệu, xuất lead và kiểm tra nhật ký

1. Vào dashboard, chọn bộ lọc để xem các chỉ số thuộc quyền của mình.
2. Khi cần danh sách làm việc, vào lead, lọc đúng phạm vi rồi chọn xuất CSV.
3. Mở CSV bằng Excel và sử dụng theo quy định bảo vệ dữ liệu; không chia sẻ cho người không có quyền.
4. Nếu vượt 10.000 dòng, thu hẹp bộ lọc rồi xuất lại; hệ thống không âm thầm cắt dữ liệu.
5. Khi cần kiểm tra một thay đổi, người có quyền vào nhật ký, lọc người thao tác, hành động và thời gian.

**Kết quả:** số liệu khớp định nghĩa đã duyệt; xuất được các cột cho phép; tra cứu được lịch sử quan trọng. Dashboard chưa có thống kê doanh thu/lượt truy cập khi chưa có nguồn dữ liệu tương ứng.

## 5. Thứ tự công việc hằng ngày theo vai trò

| Vai trò | Thứ tự làm việc gợi ý |
|---|---|
| Quản trị viên | Đăng nhập → kiểm tra nhu cầu cấp/đổi/khóa tài khoản → rà soát quyền và phân công → phối hợp xử lý sự cố; G2 thêm tra cứu nhật ký |
| Người làm nội dung | Chuẩn bị ảnh → soạn nháp → xem trước → xuất bản theo quyền → kiểm tra website → sửa/gỡ nội dung khi cần |
| Người quản lý giá | Nhận giá được duyệt → chọn sản phẩm/gói → sửa và xem trước → xác nhận lưu/bật hiển thị → kiểm tra các trang |
| Nhân viên kinh doanh | Kiểm tra lead mới/được giao → liên hệ khách → ghi chú → cập nhật trạng thái → theo dõi việc tiếp theo; G2 xuất dữ liệu khi có quyền |
| Người vận hành | Theo dõi hệ thống và backup theo runbook → kiểm tra cảnh báo → xử lý sự cố → khôi phục thử theo lịch |

Các quy trình nội dung, giá và lead có thể diễn ra độc lập sau khi thiết lập tài khoản; không phải đăng bài rồi mới được nhập giá hoặc xử lý lead.

## 6. Cách xác nhận đã bàn giao đủ chức năng

Đối chiếu các nhóm chức năng ở mục 2 với task liên quan, chạy tình huống trong [bảng UAT](UAT.md) và ghi người xác nhận, phiên bản, ngày và bằng chứng. Chỉ coi nhóm chức năng hoàn thành khi đạt tiêu chí nghiệm thu tương ứng; G2 chưa hoàn thành không đồng nghĩa G1 chưa thể bàn giao.

- Tài khoản: [01](01-dang-nhap-admin.md); nhân viên/quyền: [02](02-phan-quyen.md).
- Ảnh/bài viết/SEO: [03](03-bai-viet-seo.md); form/lead: [04](04-lead.md); giá: [05](05-gia-ca.md).
- Phát hành/vận hành G1: [06](06-phat-hanh-g1.md).
- Khách hàng/story: [07](07-g2-khach-hang.md); trang/cấu hình: [08](08-g2-trang-va-cau-hinh.md); số liệu/export/nhật ký: [09](09-g2-dashboard-export-audit.md).

Các quyết định còn mở và thứ tự triển khai được quản lý tại [README](README.md). Tài liệu này diễn giải cách sử dụng, không tự thay đổi phạm vi hoặc hợp đồng đã duyệt.
