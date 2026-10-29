# BFSC: kiểm thử IP quốc gia tự động

Đã lưu cấu hình 5 quốc gia GB, ES, US, PL, DE tại `.private/country-proxies.json` (được Git bỏ qua). Không commit hoặc chia sẻ file này. Danh sách quốc gia hiện do Webshare cung cấp; chỉ khi chạy xác minh mới kết luận được quốc gia IP đầu ra.

Môi trường trên máy này đã cài Playwright 1.64.1 và Chromium. Chạy `run-country-qa.cmd` trong thư mục này để chạy lại, không cần cấu hình IP bằng tay. Mã thoát khác 0 có nghĩa có lượt bị chặn hoặc thất bại; đọc results.json để phân biệt lỗi proxy với lỗi website.

Cài trên máy khác (cần Node.js/npm), chạy từ thư mục `tools/country-qa`:

```powershell
npm install
npx playwright install chromium
npm run validate
npm test
# Muốn nhìn trình duyệt chạy:
npm test -- --headed
```

Runner tạo 5 browser process với proxy xác thực riêng, context mới không dùng cookie, profile hoặc Browsec của người dùng. Không đổi VPN hay proxy hệ thống. Nó đo IP/quốc gia từ chính context qua api.country.is, dừng lượt sai quốc gia/trùng IP, rồi mở BFSC. Sau thử nó đo lại để phát hiện IP thay đổi. Không tự chuyển sang kết nối trực tiếp hoặc bỏ qua lỗi TLS/CAPTCHA.

Các bước smoke: trang chính có thẻ món, ghi lại khu vực/món gợi ý, Xem thêm (nếu có), mở chi tiết, Escape đóng, phát hiện pageerror. Popup phát sinh được đóng và đếm. **Đây là các kịch bản xác định sẵn, không phải 5 AI tester hay kiểm thử toàn diện.** Không giả lập timezone, GPS, country header hoặc phản hồi API để làm giả IP quốc gia. Runner chỉ ghi khu vực web hiển thị; chưa tự kết luận mapping IP → menu vì cần xác định hợp đồng chức năng.

Kết quả và ảnh: `artifacts/country-qa/<timestamp>/`. Chỉ ghi country/IP/status/stage vào báo cáo, không ghi proxy password hoặc raw exception. Endpoint quốc gia có thể giới hạn truy cập hoặc trả định vị khác Webshare; trường hợp đó bị chặn, không tính là lỗi BFSC. Mỗi lượt dùng hạn mức 1GB/tháng của gói free; theo dõi usage tại Webshare. Không chạy lịch tự động mặc định.

Lượt thực tế 29/10/2026: GB, ES, US, DE xác minh đúng IP/quốc gia và qua smoke test. PL bị chặn vì api.country.is nhận IP là PT, khác quốc gia Webshare ghi. Xem `artifacts/country-qa/2026-10-28T20-49-18-396Z/REVIEW.md`. Đây là bộ kiểm thử độc lập, không điều khiển các tab đang mở trong chat. Không có lịch chạy định kỳ được tạo.
