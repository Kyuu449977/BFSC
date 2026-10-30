# P1 — Kiểm tra responsive có ngữ cảnh

## Phạm vi và thay đổi

Hoàn thành P1 của kế hoạch dựa trên visual diff report. Chỉ thay tests, helper và hướng dẫn chạy; không sửa frontend/backend, dữ liệu, build đầu ra hoặc cache v30. Không sửa file báo cáo HTML gốc, không dùng subagent và không deploy. P2 (ma trận 160 tình huống và sửa lỗi sản phẩm được xác nhận) chưa được triển khai trong đợt này.

Helper `tests/helpers/responsive-audit.cjs` được dùng bởi hai suite responsive/mobile hiện có. Bộ regression riêng `tests/responsive-audit-browser.cjs` chạy Chromium và WebKit bằng Playwright hiện có. Không thêm dependency. Bộ regression browser có lệnh riêng, không đưa yêu cầu cài browser engine vào nhóm unit `tests/*.test.cjs`.

## Contract của helper

`auditPage(page, options)` nhận:

- `requested`: width/height thực sự yêu cầu; mặc định viewport của Playwright.
- `selectors`: phần tử bổ sung cần ghi trạng thái; phải xác định duy nhất một node.
- `pairs`: các cặp `{ id, a, b, expected? }` cần chẩn đoán. Đây là tập ứng viên có chủ đích, không phải quét mọi cặp DOM.
- `allowances`: quan hệ overlay/underlay cụ thể thuộc ba loại dropdown, native modal hoặc fixed navigation. Selector trùng khớp chưa đủ; trạng thái mở và cách định vị phải hợp lệ.
- `controls`: control quan trọng cần cuộn và thử actionability.
- `meta`: engine, scenario, bước tái hiện; `screenshot`: đường dẫn ảnh viewport. Caller tạo thư mục đầu ra trước khi gọi.
- `stabilityTimeout`: mặc định 3.000ms. Caller phải chờ ứng dụng sẵn sàng trước khi audit; helper chờ font và geometry ổn định qua hai frame liên tiếp, đồng thời không có animation hữu hạn liên quan còn chạy.

`probeControl(page, selector, options)` ghi trước/sau cuộn, hit-test năm điểm đại diện và `locator.click({ trial: true })`. Trial không kích hoạt chức năng ứng dụng. Regression fixture còn thực hiện click bình thường để chứng minh handler của nút tự do chạy, còn handler bị lớp chắn không chạy. Không force-click.

## Cách phân loại

### Đo viewport

Ghi requested width/height, inner width/height, clientWidth và scrollWidth. Width/height yêu cầu phải khớp chính xác actual; sai cả 1px cũng là `invalid-measurement`. Không kết luận breakpoint trong trường hợp này. Tràn ngang dùng `scrollWidth > clientWidth + 1px`.

Layout chưa ổn định trong timeout được ghi `unstable-layout-no-layout-conclusion`, không tự coi đã đạt hoặc cố định bằng sleep dài.

### Hiển thị và clipping

- Dùng `checkVisibility()` và trạng thái ancestor, gồm display, visibility, opacity và content-visibility.
- Loại nội dung trong details đang đóng, giữ summary là phần hiển thị hợp lệ.
- Tách `painted` (đủ điều kiện render trước clipping), `interactive` (không hidden/inert/disabled), `hasVisibleArea`, `inViewport` và `clipped`.
- Node inert vẫn có thể được hiển thị. Node dưới fold hoặc bị cắt trong vùng scroll không tự bị coi là vô hiệu hóa: thử cuộn tới trước khi kết luận.
- Lưu rawRect, visibleRect và clipChain. Root viewport được xét riêng, không biến mọi phần tử dưới fold thành nội dung không render.

### Ứng viên giao nhau

- `rejected`: không được vẽ, quan hệ cha/con, không giao nhau đáng kể hoặc vùng giao đã bị clipping loại bỏ.
- `intentional-overlap`: đúng quan hệ và trạng thái dropdown/modal/fixed navigation; vẫn phải kiểm chứng thao tác riêng.
- `visible-overlap`: vùng nhìn thấy của hai khối độc lập giao nhau; cần review, không tự khẳng định là lỗi UX.
- `insufficient-evidence`: selector thiếu/sai/không duy nhất hoặc vùng giao ngoài viewport cần quan sát bổ sung.

Giao mép rộng hoặc cao không quá 1px được ghi `edge-contact`. Không bỏ qua toàn bộ nav, iframe hoặc details. Mọi cặp đầu vào, rect gốc và lý do phân loại đều được giữ. `counts.raw` là số cặp đã xét, không phải số lỗi.

### Control

Các trạng thái gồm `actionable`, `partially-obstructed`, `interaction-blocked`, `not-interactive` và `insufficient-evidence`. Lưu tọa độ các điểm thử, selector thành phần chắn, kết quả trial, geometry/state trước và sau cuộn/trial. Phần tử con như span/SVG trong nút là hit hợp lệ. Trial có thể tự cuộn thêm, vì vậy có hit-test cuối sau trial.

Ảnh snapshot được chụp trước khi probe cuộn trang. Khi caller yêu cầu ảnh, mỗi probe có ảnh riêng sau trial. Ảnh và JSON gắn với đúng trạng thái; không dùng một ảnh cuối để minh họa mọi trạng thái trước đó.

## Kết quả kiểm chứng

- Regression fixtures: **2/2** đạt trên Chromium/WebKit. Tái hiện raw intersection **9.628px²** nhưng nội dung hidden bị loại; overlap thật được giữ, control bị chắn được phát hiện; có checks cho clipping, cuộn bên trong, inert, opacity, summary, vùng dưới fold, invalid viewport, selector lỗi và layout đang chuyển động.
- Unit hiện có: **43/43** đạt.
- Suite responsive: **10 viewport/engine**, thêm **10 snapshot diagnostics/engine**, giữ các kiểm tra 30 lượt quay, 40 dialog và phóng chữ 200% trên mỗi engine.
- Trong 40 cặp được xét mỗi engine: 35 bị loại có lý do, 5 là fixed navigation có chủ đích; 30 probe control đạt. Các số này chỉ mô tả tập ứng viên được kiểm tra.
- Suite mobile: **11 viewport/engine**, thêm **8 dropdown diagnostics/engine**; công cụ cuối menu được cuộn tới và trial được. Giữ stress **120 lượt/engine**, đúng **280** collection counts, SDK không remount theo lượt quay/resize; không có page error.

Khi phát triển, fixture selector `[invalid` được trình duyệt tự phục hồi và trả không có node, nên không phải selector syntax error như giả định ban đầu. Đã thay đầu vào bằng selector không hợp lệ `???`, giữ assertion kiểm tra phân loại invalid-selector. Log thất bại trung gian được giữ riêng, không dùng làm kết quả cuối.

## Chạy lại và bằng chứng

```powershell
python -B build_public.py
node --test tests/responsive-audit-browser.cjs
node --test tests/*.test.cjs
node tests/responsive-upgrade-browser.cjs
node tests/mobile-upgrade-browser.cjs
$env:BFSC_TEST_ENGINE='webkit'
node tests/mobile-upgrade-browser.cjs
```

Build xong trước browser tests. Các suite dùng context/API fixture riêng; không sửa dữ liệu người dùng thật. Diagnostics không click link ngoài hoặc quảng cáo.

- `artifacts/responsive-audit-p1/summary.json`: tổng hợp từ các JSON thực tế.
- `*-fixtures.json`, `fixtures-final.log`, `node.log`: regression và unit.
- `*-closed.png`, `*-expanded.png`, `*-blocked-control.png`: bằng chứng các fixture.
- `artifacts/responsive-qa/*-report.json`: các record `responsive-diagnostics`, ảnh audit và ảnh từng control.
- `artifacts/mobile-performance/*.json`: `dropdownDiagnostics` cùng regression mobile; ảnh riêng của dropdown và control cuối.

## Giới hạn

Helper là chẩn đoán theo các selector/cặp được chọn, không xác nhận toàn bộ 54 nhóm trong báo cáo gốc và không tuyên bố website hết lỗi. Bounding box/clipping là xấp xỉ hình chữ nhật; không phân tích pixel-mask của hình xoay hoặc nội dung creative trong iframe cross-origin. Hit-test lấy mẫu năm điểm không chứng minh toàn bộ bề mặt control không bị che. Nội dung overlay không nhận pointer vẫn có thể che thị giác và cần review bằng ảnh. Không dùng kết quả engine desktop thay cho kiểm tra iPhone/Android thật. Quảng cáo trong các suite dùng fixture hoặc bị chặn; chưa xác minh inventory live.
