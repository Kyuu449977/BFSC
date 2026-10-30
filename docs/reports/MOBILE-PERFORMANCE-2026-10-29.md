# Menu mobile, banner và hiệu năng quay — 29/10/2026

## Đã sửa

- Menu công cụ thu gọn bằng nút SVG ba gạch dưới 900px, kể cả điện thoại xoay ngang. Mở ra vẫn đủ tám công cụ; hỗ trợ Escape, click ngoài, `hidden`/`inert`, focus trả về trigger trên Safari và tự khôi phục khi chuyển desktop. Giữ bottom navigation.
- Hai mã banner dọc cũ 160×600 và 160×300 hiển thị trong vùng tài trợ sau thực đơn trên mobile/tablet, không còn bị ẩn toàn bộ dưới 1584px. Từ 360px hai slot vừa hàng 160+8+160 trong 328px nội dung; ở 320px xếp dọc. Desktop đủ rộng tiếp tục treo hai bên. Banner kệ 300×250 được giữ tại vị trí cũ và chỉ tải khi đủ rộng.
- Mỗi SDK banner có document/`atOptions` riêng, tải khi gần viewport và chỉ một lần. Quay/resize không tạo lại iframe. SDK lỗi tải có thông báo gọn, không che hoặc khóa chức năng.
- Triple unique chỉ xét mỗi tập hợp một lần thay vì k! hoán vị, rồi shuffle đều; cache điểm recent/overlap/history theo ID cho mỗi lượt. Combo và repeat không ngân sách dùng lấy mẫu độc lập trong pool tối ưu. Nhánh ngân sách vẫn lọc tổng giá chính xác. Có test mô hình nhỏ đối chiếu toàn bộ miền kết quả hợp lệ; không nới quy tắc random.
- Dọn track/RAF/timer sau đóng roulette; chặn callback frame cũ bằng runId; bỏ pulse/filter vô hạn trên 32 thẻ; gộp render collection/menu trùng trong cùng lượt.
- Giữ sửa dịch trước đó, không sửa logic giờ/múi giờ, ID món, giá, bộ sưu tập hoặc dữ liệu người dùng. Không dùng subagent, không deploy.

## Số đo và kiểm chứng

Đo engine trên cùng máy, cùng dữ liệu, bằng Node trước/sau; đây là số đo phòng thử, không phải FPS điện thoại:

| Lượt không giới hạn ngân sách | Trước | Sau |
|---|---:|---:|
| 1 món | 4,91ms | 4,85ms |
| 3 món unique | 456,83ms | 82,57ms |
| Combo | 510,98ms | 3,02ms |

- Node: **43/43** đạt, gồm ba regression về tối ưu random. Python: **29/29** đạt.
- Chromium và WebKit: **11 viewport/engine**, từ 320×568 đến 1920×1080, gồm các màn ngang điện thoại. Hai banner giữ đúng kích thước gốc, không tràn; menu/focus/breakpoint hoạt động.
- Stress UI có motion: **120 lượt/engine** (single/triple/combo luân phiên), vừa skip vừa chạy animation hoàn chỉnh. Mỗi engine ghi đúng **280** count. Track sau đóng luôn 0 thẻ, DOM/animation không tăng theo số lượt, SDK từng banner vẫn 1 request sau quay và resize.
- Chromium sau GC: heap từ **4.935.000** byte tại lượt 20 tới **5.098.168** byte tại lượt 120; DOM 962 → 969, animation đang hoạt động 10 → 10. WebKit: DOM 958 → 969, animation 3 → 4. Có warm-up và hoạt ảnh ngắn còn chạy lúc chụp; không kết luận có thể chạy vô hạn.
- Quảng cáo bị chặn vẫn quay được, có thông báo và không gây overflow. Xác nhận SDK-shaped fixture chạy được dưới **security headers thật của Python server**, không thay CSP để né lỗi. Preview server đã được khởi động lại để nhận allowlist có hai module mới.
- Dịch: kiểm tra lại 25 tổ hợp vùng/ngôn ngữ trên Chromium/WebKit với thao tác mở Menu thật; trang thông tin và chuyển ngôn ngữ vẫn đạt.
- PWA: **7 tình huống/engine** đạt, gồm update an toàn, API không cache, essential/optional lỗi và 382 tên dịch khi offline. Cache release là **v28**.
- Responsive suite: 10 viewport, 30 lượt, 40 dialog và phóng chữ 200% trên mỗi engine đều đạt.

## Bằng chứng và chạy lại

- `artifacts/mobile-performance/chromium.json`, `webkit.json`: ma trận viewport, stress và lỗi.
- `baseline-engine.json`, `optimized-engine.json`: số đo engine.
- `real-server-sponsors.json`: smoke dưới Python CSP thật, dùng SDK fixture.
- `chromium-mobile-menu-closed.png`, `chromium-mobile-menu-open.png`, `chromium-mobile-sponsors.png`: ảnh UI; có bản WebKit tương ứng. Chữ trong banner là **fixture**, không phải quảng cáo live.
- `node.log`, `python.log`: kết quả unit/backend.
- Dịch và PWA: `artifacts/localization-qa/` và `artifacts/upgrade-acceptance/*-pwa.json`.

```powershell
python -B build_public.py
node --test tests/*.test.cjs
python -B -m unittest discover -s tests -p "test_*.py"
node tests/mobile-upgrade-browser.cjs
$env:BFSC_TEST_ENGINE='webkit'
node tests/mobile-upgrade-browser.cjs
node tests/localization-browser.cjs
node tests/upgrade-pwa-browser.cjs
$env:BFSC_TEST_ENGINE='chromium'
node tests/localization-browser.cjs
node tests/upgrade-pwa-browser.cjs
node tests/responsive-upgrade-browser.cjs
```

Chạy build xong trước browser tests. Tests dùng context/origin riêng và API fixture, không sửa dữ liệu người dùng thật. Helper `tests/helpers/mobile-tools.cjs` mở menu bằng nút thật thay vì force-click công cụ bị ẩn; không bỏ assertion.

## Chưa xác minh

Không có iPhone/Android thật hoặc production để đo FPS/nhiệt/CPU. QA quảng cáo dùng SDK fixture hoặc chủ động chặn request; chưa xác minh inventory/creative live của nhà cung cấp, không click quảng cáo. Hiển thị quảng cáo thực còn phụ thuộc mạng, ad blocker và nhà cung cấp. Các phép đo hữu hạn không bảo đảm hiệu năng vô hạn trên mọi thiết bị. Nội dung người dùng tự nhập và metadata tác giả/giấy phép vẫn nguyên văn.
