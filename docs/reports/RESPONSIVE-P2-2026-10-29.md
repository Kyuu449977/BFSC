# P2 — Kiểm chứng responsive và sửa lỗi form (29/10/2026)

## Thay đổi thực tế

Tái hiện tại viewport 320×360: footer sticky của form thêm món đè lên phần dưới ô tên món. Helper ghi `partially-obstructed`, hai trong năm điểm hit-test trúng footer. Đây là lỗi thao tác thật, khác với giao nhau bounding box của nội dung đã ẩn.

Đã tách vùng `.custom-dish-fields` cuộn độc lập bên trong form. Header và các nút Hủy/Lưu nằm ngoài vùng cuộn, trong flex dialog giới hạn theo visual viewport. Giữ nguyên ID, label, validation, submit và dữ liệu. Không dùng che overflow ngang của trang. Cache tăng v30 → v31 để phát hành HTML/CSS mới đồng bộ.

Nguồn liên quan:
- `src/index.html`: cấu trúc form, chuyển ghi chú lưu trữ vào vùng nội dung.
- `src/styles/mobile-upgrade.css`: layout riêng cho dialog thêm món.
- `src/sw.js`: cache version.
- `tests/responsive-p2-browser.cjs`: ma trận hồi quy mới.

Sau sửa, cùng phép đo 320×360 đạt `actionable`, cả năm điểm trúng ô nhập. Ảnh/JSON trước và sau: `artifacts/responsive-p2/form-before.*`, `form-after.*`. Test chức năng thêm món thực, fallback local và reload cũng đã đạt. Không sửa logic thời gian, random, tiền hoặc lưu trữ trong P2.

## Phạm vi ma trận

Mỗi engine chạy các nhóm sau:

| Nhóm | Số ca | Nội dung |
|---|---:|---|
| base | 80 | 10 viewport × sáng/tối × bốn trạng thái đóng/mở mô tả và ngân sách |
| comparison | 32 | 500, 752, 1008, 1424px × sáng/tối × bốn trạng thái |
| menu | 34 | Bảy chiều rộng kể cả 899/900/901px; năm ngôn ngữ ở 390/768px, sáng/tối |
| ads | 12 | 320/390/768/1024px × thành công/chậm/bị chặn |
| interaction | 10 | Năm viewport × sáng/tối: ngân sách sai/0, tìm rỗng, form khi chiều cao giảm, kết quả, nội dung dài, chữ 200% |
| Tổng | 168 | Chromium và WebKit chạy độc lập |

10 viewport nền: 320×568, 360×800, 375×667, 390×844, 430×932, 667×375, 844×390, 768×1024, 1024×768, 1440×900.

Kiểm tra trang không tràn ngang, mô tả hiển thị không đè ảnh, ngân sách không đè menu/quảng cáo. Control được cuộn tới bằng thao tác bình thường, hit-test năm điểm và trial click. Menu phải dọc, tám công cụ, không đẩy nội dung, cuộn tới công cụ cuối; Escape, Tab, trả focus và đóng bằng click ngoài. Quảng cáo giữ kích thước/ID, hai banner mobile; lượt quay vẫn hoàn tất khi SDK chậm hoặc bị chặn; mỗi SDK chỉ mount một lần trong ca thử.

Font 200% là fixture nhân cỡ chữ của node có text, không phải phép đo zoom trình duyệt/OS hoàn chỉnh. Form khi bàn phím mở được mô phỏng bằng giảm chiều cao viewport tối đa 360px; không đồng nhất với bàn phím thật. Hai phép kiểm tra này chạy riêng, chưa khẳng định tổ hợp form + bàn phím + chữ 200% trên thiết bị thật.

## Kết quả lượt cuối

- Chromium: **168/168 đạt**, không page error.
- WebKit: **168/168 đạt**, không page error.
- Tổng: **336/336 ca**; đầy đủ năm nhóm trong bảng, không bỏ qua ca thất bại.
- Node **43/43**, Python **29/29**, test thêm món/fallback/reload đạt; PWA **7/7 mỗi engine**.
- Build **512 tệp**, không thiếu/thừa so với allowlist; HTML, CSS ghép và SW khớp nguồn. Chi tiết `build-verification.json`.

## Cô lập và tính tái lập

Suite dùng HTTP server ephemeral đọc public, browser context/storage mới, API GET fixture rỗng. Các request ngoài bị chặn trừ SDK quảng cáo giả lập. Không click quảng cáo, không gửi món lên server thật. Service worker bị chặn trong ma trận layout; vòng đời PWA chạy ở suite riêng.

Date cố định giờ trưa và RNG có seed **chỉ trong context test**, tránh toast giờ khuya xuất hiện không xác định. Không thay clock hoặc thuật toán production. Reduced motion bật để tập trung đo layout/interaction; không dùng ma trận này để chứng minh hiệu năng roulette liên tục.

Các lỗi harness đã sửa minh bạch:
- Click ngoài menu ban đầu trúng ảnh nằm dưới dropdown: chọn điểm thực sự ngoài panel, không force click, không sửa sản phẩm.
- SDK bị chặn có thể gỡ iframe ngay: chờ cờ mount và thông báo unavailable thay vì chờ iframe thoáng qua.
- WebKit có thể giữ Promise `document.fonts.ready` khi iframe quảng cáo đang chờ: dùng điều kiện `document.fonts.status === loaded` với timeout của Playwright; vẫn yêu cầu font tải xong, không bỏ assertion. Nhóm quảng cáo WebKit đã chạy lại đủ 12 ca sau sửa harness.
- SDK cố ý giữ chậm khiến `goto` chờ load bị deadlock: chờ DOMContentLoaded và app ready; vẫn giữ SDK chậm đến khi quay xong.

Log/JSON thất bại trung gian và baseline được giữ riêng; không dùng làm bằng chứng lượt cuối.

## Chạy lại

```powershell
python -B build_public.py
$env:BFSC_TEST_ENGINE='chromium'
$env:BFSC_P2_GROUP='all'
node tests/responsive-p2-browser.cjs
$env:BFSC_TEST_ENGINE='webkit'
node tests/responsive-p2-browser.cjs
```

Hoặc `npm run test:responsive-p2` (build trước khi chạy). Có thể chọn nhóm riêng qua BFSC_P2_GROUP. Không build đồng thời với suite đang đọc public.

JSON mỗi engine/nhóm và ảnh nằm trong `artifacts/responsive-p2/`. Báo cáo tổng hợp cuối được ghi vào `summary.json`. Unit log: `node-final.log` (43/43); Python: `python-final.log` (29/29). PWA riêng: `artifacts/upgrade-acceptance/chromium-pwa.json`, `webkit-pwa.json` (7 kiểm tra/engine, cache v31). Các kết quả này được chạy trong đợt P2, không lấy báo cáo lịch sử làm pass mới.

## Giới hạn

Chưa kiểm tra iPhone/Android thật, bàn phím hệ điều hành, creative/inventory quảng cáo live hoặc production. Giả lập SDK chứng minh container và cách xử lý lỗi, không chứng minh mọi quảng cáo bên thứ ba. Chưa lập crosswalk kết luận toàn bộ 54 nhóm cảnh báo của báo cáo visual-diff gốc. Hit-test lấy mẫu và cặp selector là phạm vi hữu hạn; ảnh không chứng minh mọi trạng thái. P2 không thay thế QA release toàn diện hoặc phép đo hiệu năng dài hạn. Không deploy.
