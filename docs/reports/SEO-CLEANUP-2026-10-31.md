# SEO và dọn cấu trúc — 31/10/2026

Đã thực hiện theo phạm vi bổ sung từ khóa nhiều ngôn ngữ và dọn dự án; không thêm chức năng người dùng. Chưa deploy.

- [SEO và danh sách cụm từ theo 15 ngôn ngữ](../SEO.md).
- [Cấu trúc và vị trí lưu trữ khôi phục](../PROJECT_STRUCTURE.md).
- 359 file lịch sử được đưa khỏi scripts, còn 3 file phục vụ build/package. Công cụ tải ảnh còn dùng được chuyển sang tools/assets.
- 5 thư mục xuất/tạm và 3 danh sách cũ được chuyển ra ngoài; không xóa vĩnh viễn. Manifest và SHA-256 đã đối chiếu cho 359 file scripts.
- Giữ entrypoint chạy/build và cấu hình hosting ở gốc; tài liệu hợp đồng chuyển vào docs. Không chỉnh logic runtime, dữ liệu danh mục, API, localStorage/IndexedDB hoặc cấu hình quảng cáo.
- Sửa .vercelignore để giữ đầu vào audit ảnh bắt buộc cho build và loại nguồn nghiên cứu/agent không cần gửi lên hosting. Chưa chạy deploy để xác minh nền tảng từ xa.

| Kiểm chứng | Kết quả |
|---|---|
| python -B build_public.py | Thành công |
| node --test tests/*.test.cjs | 45/45 đạt |
| python -B -m unittest discover -s tests -p "test_*.py" | 34/34 đạt |
| node tests/menu-page-browser.cjs | Đạt ở 390/1440 px, giữ phân trang tại chỗ, lịch sử và tải lại; không ảnh lỗi/pageerror |
| node tests/upgrade-pwa-browser.cjs | Đạt cập nhật an toàn, offline, lỗi ảnh tùy chọn và bảo vệ shell |
| Preview HTTP | Trang chính/menu/sitemap/privacy trả 200, nội dung đã cập nhật |
| Công cụ ảnh | Compile thành công; không chạy tải ảnh để tránh thay ảnh hiện tại |
| git diff --check | Đạt |

Kiểm thử API dùng dữ liệu tạm theo suite hiện có. Cảnh báo ResourceWarning của Python liên quan dọn đối tượng HTTPError trong test không làm test thất bại. Không kiểm chứng thứ hạng tìm kiếm, lượng tìm kiếm hoặc hành vi quảng cáo production. Tên miền chuẩn được giữ là angiday.app theo canonical hiện có; cần khớp hosting thực tế khi phát hành.

Meta keywords không được Google dùng để xếp hạng. Việc tìm thấy trên thị trường quốc tế còn phụ thuộc nội dung, lập chỉ mục và những trang bản địa hóa thật; không tạo các trang đó trong phạm vi này.
