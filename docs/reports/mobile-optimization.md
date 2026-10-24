# Cập nhật giao diện ưu tiên điện thoại

## Trải nghiệm

- Bỏ QR và toàn bộ luồng gọi dịch vụ tạo mã. Mở website trực tiếp bằng đường dẫn trong trình duyệt.
- Chia sẻ bằng bảng chia sẻ của thiết bị nếu hỗ trợ; có sao chép link và hộp thoại sao chép thủ công khi clipboard bị chặn.
- Thêm tùy chọn lưu lên màn hình chính. Dùng prompt cài PWA khi trình duyệt cung cấp; có hướng dẫn Safari/iOS và hướng dẫn menu thủ công khi không có prompt. Không tự yêu cầu cài lúc tải trang.
- Bố cục điện thoại có thanh điều hướng dưới cùng, safe area, hộp thoại dạng sheet, tìm kiếm cỡ chữ 16px để tránh phóng to tự động trên iPhone. Manifest không khóa màn hình dọc.
- Thực đơn hiển thị 12 thay vì 48 thẻ ban đầu, tải thêm mỗi lần 12, tìm theo tên/loại món có hoặc không dấu; có trạng thái rỗng và bộ sưu tập riêng.
- Nút chọn món xuất hiện trong màn hình đầu ở viewport 390×844 đã kiểm tra. Link Maps vẫn mở trực tiếp theo từng món, không gọi API trả phí hoặc xin GPS.

## Nguồn mở

Lucide Icons được lấy ở commit cố định `9f20b2b8f99cd9fe89bbfcbe883ee5b664ebb595`, 23 icon gộp thành một SVG sprite. Font Be Vietnam Pro dùng package Fontsource 5.3.0, chỉ giữ subset Latin/Latin Extended/Vietnamese và ba độ đậm. Mọi tài nguyên được lưu cùng dự án, giấy phép ở `assets/licenses/`, nguồn ở `assets/sources.json` và `OPEN_SOURCE.md`. Website không gọi CDN để tải font/icon.

## Kiểm chứng

- `node tests/mobile-ui.cjs`: 320×740, 360×800, 390×844, 844×390, 768×1024 và 1440×900; không tràn ngang; điều hướng bộ sưu tập, tải thêm, tìm không dấu, trạng thái không tìm thấy; chia sẻ native/copy/manual; prompt cài đặt giả lập, hướng dẫn iOS, ẩn nút khi standalone. Không có request bên ngoài, tài nguyên 404 hoặc lỗi JS trong luồng này.
- `node tests/browser.cjs`: quay x1/x3/combo, skip/resize, lưu tùy chọn, trả focus, chia sẻ dự phòng, cache upgrade và offline; font tiếng Việt và SVG icon vẫn tải được khi offline.
- `node tests/places-browser.cjs`: link Maps đúng từng món, không có API key/GPS, không gọi Places API.
- 6 nhóm Node tests và 13 Python tests đã qua. `git diff --check` qua.
- Ảnh: `mobile-home.png`, `tablet-home.png`, `preview-desktop.png`.

Các kiểm tra dùng trình duyệt desktop với viewport và một số API/UA giả lập. Chưa xác minh trên iPhone/Android thật; khả năng chia sẻ/cài app phụ thuộc trình duyệt và HTTPS. Không tự triển khai bản public hoặc thay đổi tài khoản Google Cloud. Dữ liệu và ảnh món gốc được giữ; một số ảnh gốc có thể chưa mô tả đúng món.
