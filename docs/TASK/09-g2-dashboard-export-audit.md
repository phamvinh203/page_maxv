# 09 (G2) — Dashboard số liệu, export lead và nhật ký

> Kế hoạch gốc: [2026-10-21-maxv-admin.md](../superpowers/plans/2026-10-21-maxv-admin.md) — các tham chiếu "mục N" trỏ tới file này. Thứ tự và phụ thuộc: [README.md](README.md).

**Chuỗi:** [API] → [UI] · **Phụ thuộc:** 06

## Task 19 — Dashboard số liệu, export lead và nhật ký

### Nghiệp vụ và nghiệm thu

**Mục tiêu/phạm vi:** theo dõi số liệu vận hành từ dữ liệu hệ thống, xuất danh sách lead có quyền và tra cứu lịch sử; không suy ra lượt truy cập, doanh thu hay tỷ lệ chuyển đổi khi chưa có nguồn dữ liệu.

**Quy tắc nghiệp vụ:** CSV chỉ có cột được phép; dashboard không lộ số lead cho người thiếu quyền xem. Chốt trước Task 19 định nghĩa từng chỉ số, trường ngày dùng để đếm, múi giờ Việt Nam và bộ lọc; đối chiếu bằng cùng một bộ dữ liệu thử đã biết.

**Tình huống ngoại lệ:** vượt 10.000 dòng thì yêu cầu thu hẹp bộ lọc, không cắt âm thầm; thiếu quyền export bị chặn ngay cả khi tự gọi URL. Ngày lọc dùng khoảng đầu bao gồm/cuối không bao gồm theo đặc tả, tránh đếm trùng ngày biên.

**Tiêu chí chấp nhận — UAT-14:** cho trước fixture có lead ở sát biên ngày Việt Nam và nhiều trạng thái; khi lọc dashboard/export; thì kết quả khớp định nghĩa chỉ số đã duyệt, CSV giữ tiếng Việt và dữ liệu không chạy thành công thức; audit thể hiện đúng người xuất và bộ lọc đã loại thông tin nhạy cảm.

### Công việc triển khai

- [ ] **[API]** endpoint mục 7.6. Test thiếu `leads.export` 403; export chỉ whitelist cột, CSV tiếng Việt/quote/formula đúng, vượt 10.000 dòng trả 422; 5 export/user/giờ; dashboard không trả số lead cho user thiếu `leads.view`.
- [ ] **[UI]** `/` dashboard (lead theo ngày/nguồn/sản phẩm, bài mới), nút xuất CSV ở `/leads` (mở được bằng Excel), `/audit-logs` lọc theo người/hành động/thời gian.
- [ ] Không có phần Site.

**Xong khi:** trên staging, đối chiếu số liệu dashboard với fixture đã biết; xuất CSV đúng bộ lọc, mở bằng Excel giữ tiếng Việt và không thực thi ô công thức; tài khoản thiếu quyền bị chặn cả khi gọi trực tiếp API; nhật ký lọc đúng người/hành động/thời gian. Lưu kết quả kiểm tra theo README.

