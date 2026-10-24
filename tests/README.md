# Kiểm thử

- `*.test.cjs`: logic chọn món, dải quay, âm thanh, giá và ảnh; đọc nguồn trong src/.
- `*-browser.cjs`, `browser.cjs`, `mobile-ui.cjs`, `audit-fixes.cjs`: Playwright/Edge; phục vụ public/ hoặc tự chạy Python server. Build trước khi gọi trực tiếp bằng Node.
- `test_*.py`: unittest máy chủ, chính sách xuất bản và adapter Places.
- `benchmark.cjs`: công cụ so sánh với Git ref lịch sử, chỉ dùng khi cần đo; không phải điều kiện pass cho mỗi lần sửa.

Chạy từ gốc dự án. `npm run test:...` tự build trước browser test; `test:theme` còn cần preview cổng 8080. Dùng `python -B` để tránh tạo bytecode. Không làm yếu assertion khi sắp xếp lại đường dẫn.
