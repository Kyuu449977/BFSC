# P3 — Hồi quy và bàn giao responsive BFSC (30/10/2026)

## Kết quả

Hoàn tất giai đoạn kiểm thử hồi quy của kế hoạch responsive. Không xác nhận thêm lỗi sản phẩm cần sửa sau P2; P3 bổ sung công cụ trích báo cáo, fixture và kiểm tra đối chiếu, hướng dẫn và bằng chứng. Hash toàn bộ `src/` giữ nguyên từ đầu P3. Không thay clock/timezone, dữ liệu, giao diện đã chốt hoặc mã quảng cáo. Không deploy, commit/push hay dùng subagent.

Frontend vẫn là classic scripts. Cache giữ **v31** vì P3 không thay asset xuất bản. Đã build lại từ nguồn và xác nhận nội dung tái lập, không tăng cache vô cớ.

## Kiểm tra đã chạy trong P3

| Bộ kiểm tra | Kết quả | Phạm vi |
|---|---:|---|
| Audit regression fixtures | 2/2 | Chromium/WebKit: details đóng, clipping, overlap thật, control bị chặn, viewport sai |
| Ma trận responsive | 336/336 | Mỗi engine 168 ca: 80 nền, 32 chiều rộng đối chiếu, 34 menu, 12 quảng cáo, 10 tương tác |
| Đối chiếu báo cáo gốc | 54/54 nhóm có dòng đối chiếu | 216 quan sát/engine; bốn trạng thái đóng/mở; không đồng nghĩa 54 lỗi đã được giải quyết |
| Suite responsive bổ sung | Đạt cả hai engine | 10 viewport, 10 diagnostics, 30 lượt quay, 40 dialog và một ca chữ 200%/engine |
| Chữ 200% trong ma trận | 5 viewport × 2 theme/engine | 320/390/667/768/1440px, nội dung dài và các nút quan trọng |
| Node unit | 43/43 | Các contract hiện hành |
| Python | 29/29 | Build, backend, allowlist, attribution, dữ liệu tách biệt |
| Luồng chức năng | 4/4 trên Chromium | Custom reroll, thêm món fallback local và reload, timezone và language đa tab |
| PWA | 7/7 mỗi engine | Essential/optional lỗi, API không cache, update chờ form, cập nhật an toàn, offline combo, 382 tên món dịch offline |
| Cú pháp JS | 25 tệp đạt | 23 module trong src/js, SW và runner crosswalk |
| Build | 512 tệp khớp allowlist | HTML/CSS/SW khớp nguồn; manifest 30 essential + 481 optional, không trùng/thiếu |

Ma trận dùng các viewport chuẩn 320×568, 360×800, 375×667, 390×844, 430×932, 667×375, 844×390, 768×1024, 1024×768, 1440×900; thêm 500/752/1008/1424px. Hai theme; menu năm ngôn ngữ ở 390/768px. JSON có kích thước yêu cầu/thực, trạng thái, rectangles và hit-test. Không dùng kết quả lịch sử để tính pass P3.

Các suite dùng context và origin riêng, không sử dụng profile hoặc dữ liệu thật. API dùng fixture hoặc vùng dữ liệu tạm. Quảng cáo được giả lập theo SDK, không click quảng cáo. Ma trận/crosswalk cố định Date giờ trưa và RNG trong context test khi cần; không sửa mã thời gian hay đồng hồ hệ thống. Không dùng networkidle làm điều kiện app ready.

## Phân loại báo cáo visual diff

[Bảng đủ 54 nhóm](VISUAL-REPORT-CROSSWALK-P3-2026-10-30.md) ghi selector A, kích thước nhãn/thực, số cặp xuất/khai báo, kết luận và giới hạn cho từng nhóm. Báo cáo gốc được kiểm tra hash, giữ nguyên.

- 219 quan hệ được khai báo, chỉ 189 đối tác được xuất và có một số selector rút gọn; 30 cặp không có dữ liệu.
- 18 nhóm có giới hạn do xuất thiếu hoặc selector không rõ. Giữ trạng thái thiếu bằng chứng, không tự tạo selector hoặc coi là pass.
- Các overlap nhìn thấy đo lại nằm ở nhóm 320-07/320-11, liên quan nav cố định với main/container. Đã xem ảnh và xác nhận các control được xét có thể cuộn tới, hit-test/trial thành công.
- Nội dung details đóng không tham gia kết luận overlap nhìn thấy. Khi mở, các cặp xác định được không tái hiện che chữ/thao tác độc lập.
- 539 phát hiện công cụ gốc đã trừ khỏi baseline không có dữ liệu; không thể kết luận toàn bộ nhóm bị trừ là hợp lệ.

Runner không bỏ qua toàn bộ nav/iframe/details. Có assert viewport, layout ổn định, tràn ngang, số quan sát và page error. Raw candidates/reasons giữ trong JSON; cặp không duy nhất được ghi rõ. Đây là chẩn đoán có giới hạn, không phải chứng nhận mọi nội dung trang.

## Mã và bằng chứng bàn giao

- `tools/extract-visual-report.py`: đọc HTML như dữ liệu, trích findings và hash, không chạy nội dung HTML; chỉ ghi vào output được chỉ định.
- `tests/fixtures/visual-diff-2026-10-29.json`: dữ liệu đối chiếu có thể chạy lại mà không cần giữ file trong Downloads; không chứa ảnh base64.
- `tests/visual-report-crosswalk.cjs`: đo lại từng nhóm trên đúng chiều rộng thực, bốn trạng thái, hai engine chạy độc lập; probes control và ảnh các overlap nhìn thấy.
- `package.json`, `README.md`: lệnh chạy lại và tài liệu.
- `artifacts/responsive-p3/summary.json`: tổng hợp kết quả P3.
- `*-matrix.json`, `*-matrix.log`: ma trận chạy lại; ảnh theo ID trong `artifacts/responsive-p2/`.
- `*-crosswalk.json`, `crosswalk-summary.json`, `*-crosswalk-*.png`: từng nhóm/cặp, trạng thái và ảnh.
- `audit-fixtures.log`, `node.log`, `python.log`, `features.log`, `dialogs-responsive.log`, `*-pwa.log`, `syntax.json`: log đợt này.
- `build-verification.json`: tính tái lập, allowlist, manifest, hash nguồn và HTML gốc.

Bằng chứng trước/sau lỗi form sửa ở P2 vẫn ở `artifacts/responsive-p2/form-before.*` và `form-after.*`; P3 kiểm tra lại hồi quy form nhưng không tạo thêm một bản sửa sản phẩm.

Harness crosswalk ban đầu giả định bottom nav hiện ở tablet; đã sửa đúng CSS hiện hành (500px phải thao tác được, 752/1008px phải ẩn), giữ log trung gian riêng. Không sửa frontend hoặc nới điều kiện cho control đang hiển thị để làm test đạt.

## Chạy lại

Build hoàn tất trước browser tests, không build đồng thời khi suite đang đọc public.

```powershell
python -B build_public.py
node --test tests/responsive-audit-browser.cjs
node --test tests/*.test.cjs
python -B -m unittest discover -s tests -p "test_*.py"

$env:BFSC_P2_GROUP='all'
$env:BFSC_TEST_ENGINE='chromium'
node tests/responsive-p2-browser.cjs
node tests/visual-report-crosswalk.cjs
node tests/upgrade-pwa-browser.cjs

$env:BFSC_TEST_ENGINE='webkit'
node tests/responsive-p2-browser.cjs
node tests/visual-report-crosswalk.cjs
node tests/upgrade-pwa-browser.cjs

node tests/responsive-upgrade-browser.cjs
node tests/upgrade-features-browser.cjs
```

Có thể dùng `npm run test:responsive-crosswalk` cho một engine (tự build). Để trích lại đúng báo cáo đầu vào:

```powershell
python -B tools/extract-visual-report.py "C:/Users/phamp/Downloads/visual-diff-report-2026-10-29-15-31.html" tests/fixtures/visual-diff-2026-10-29.json
```

## Giới hạn còn lại

Chưa thử iPhone/Android thật, bàn phím hệ điều hành, pinch zoom/font OS hoặc creative/inventory quảng cáo live. Chữ 200% là fixture tăng cỡ các node có text, không thay thế toàn bộ zoom/placeholder của OS; form ở chiều cao thấp và chữ 200% được thử riêng, chưa khẳng định tổ hợp cả hai trên thiết bị thật. Crosswalk dùng light/vi và chiều cao 844px cố định; không tái dựng trạng thái động của ảnh chụp lịch sử.

Các suite giao diện dùng reduced motion để đo ổn định. P3 không thay roulette nên không chạy lại stress 120 lượt/engine chỉ để lặp kết quả cũ; 30 lượt quay/engine trong suite hồi quy không được dùng để khẳng định hiệu năng vô hạn hoặc FPS trên điện thoại. Không chứng nhận motion bình thường bằng các ca reduced-motion. Loader quảng cáo không thay đổi trong P3; fixtures không chứng minh mọi creative tương thích security headers/production.

Phần công việc P3 có thể kiểm chứng tại workspace đã hoàn tất; các giới hạn trên được giữ công khai thay vì gắn nhãn đã kiểm tra.
