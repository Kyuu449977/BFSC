# Kiến trúc và quy tắc bảo trì

## Frontend

Các script ứng dụng là JavaScript thuần, nạp bằng `defer` theo thứ tự ở `src/index.html`. Riêng `theme-init.js` được nạp đồng bộ trước CSS để khôi phục màu và sáng/tối từ localStorage trước khi hiển thị nội dung; dùng chung trên cả trang thông tin.

### Ngôn ngữ

Nạp `data.js` → `dish-i18n.js` → `regional-dish-locales.js` trước các module render. Tên, mô tả và lời giới thiệu món phải đọc qua `getDishName`, `getDishDesc`, `getDishQuote` với ngôn ngữ hiển thị, kể cả picker, ảnh alt và Maps. Không dùng trực tiếp `dish.name` cho chữ của món tĩnh trên giao diện. Dữ liệu gốc vẫn dùng cho ID, tra cứu và thuật toán; thay ngôn ngữ không đổi vùng, giá hoặc collection.

`regional-dish-locales.js` sửa các locale trước đây chứa bản sao tiếng Việt. `UICopy` chứa các thông báo động, hỗ trợ tham số `{n}`/`{amount}` và ánh xạ lỗi nghiệp vụ tại lớp UI. Khi chưa có bản dịch quote riêng, dùng mô tả đã dịch và không hiển thị hai đoạn trùng nhau. Nội dung món do người dùng tự nhập được giữ nguyên; không suy đoán bản dịch hoặc sửa dữ liệu lưu.

`legal-copy.js` bổ sung chữ còn thiếu trên trang thông tin và dịch tên món trong credits theo ID; metadata tác giả, tiêu đề nguồn và giấy phép được giữ nguyên. Module này không sửa cơ chế thời gian/theme. Mỗi khóa/chỗ render mới cần đủ năm ngôn ngữ và test nội dung thực, không chỉ kiểm tra chuỗi khác rỗng.

Kiểm thử riêng: `node --test tests/localization-regression.test.cjs`, sau build chạy `node tests/localization-browser.cjs`; đặt `BFSC_TEST_ENGINE=webkit` để kiểm tra WebKit.

### Mobile và hiệu năng quay

`mobile-menu.js` quản lý disclosure của thanh công cụ dưới 900px: `aria-expanded`, `aria-controls`, `hidden`/`inert`, Escape, focus Safari và chuyển breakpoint. Không đổi thứ tự hay bỏ tám chức năng. Bottom navigation giữ nguyên.

`sponsors.js` đọc ba slot quảng cáo có key/kích thước tĩnh trong HTML. Hai slot 160×600 và 160×300 nằm trong luồng trang dưới 1584px; desktop rộng giữ vị trí hai bên. SDK của từng slot chạy trong iframe riêng để `atOptions`/`document.write` không xung đột. IntersectionObserver tải một lần khi gần viewport, CSS đổi vị trí mà không reparent iframe, resize/quay lại không remount quảng cáo. API/SDK ngoài origin không được SW cache. Khi SDK lỗi tải, slot chuyển sang thông báo nhỏ. Không scale iframe hoặc tự thay mã nhà cung cấp.

Gacha vẫn so điểm recent → trùng lượt trước → lịch sử phiên. Rank của mỗi ID chỉ đọc một lần mỗi lượt. Với triple unique cùng pool, chỉ duyệt mỗi tập hợp một lần; mọi tập hợp hợp lệ có cùng số hoán vị k!, nên reservoir đồng đều giữa tập hợp rồi Fisher–Yates đồng đều thứ tự giữ nguyên phân phối kết quả có thứ tự. Combo/repeat không giới hạn ngân sách dùng lấy mẫu độc lập giữa các pool có điểm tốt nhất: điểm cộng và không có ràng buộc tổng làm miền tối ưu là tích Descartes của các pool tối ưu. Khi có ngân sách, vẫn duyệt ứng viên hợp lệ và nhường main thread. Không áp dụng trọng số favorite/rarity.

Đóng spin dialog giải phóng DOM băng chuyền, RAF, timer và callback; runId chặn frame cũ. UI gộp sự kiện thay đổi collection để không render lại menu hai lần mỗi lượt thành công. Chỉ track roulette chuyển động, bỏ 32 pulse/filter vô hạn riêng trên thẻ bí ẩn.

Kiểm thử: `node tests/mobile-upgrade-browser.cjs`, hoặc `BFSC_TEST_ENGINE=webkit`; SDK quảng cáo được giả lập, 11 viewport và 120 lượt/engine, kiểm tra DOM/animation không tăng tuyến tính, heap Chromium sau GC, count đúng và SDK không tải lại khi quay/resize. Kết quả này không thay cho đo FPS hoặc quảng cáo live trên điện thoại thật.

- `data.js`: danh mục món và các mốc buổi theo giờ thiết bị.
- `dish-preferences.js`: sở thích theo tên món, localStorage tách thuộc tính, món ẩn và đánh dấu ăn gần đây; không đụng bộ sưu tập.
- `gacha.js`: tạo phương án hợp lệ, tính ngân sách, giảm lặp, công bố kết quả.
- `collection.js`: IndexedDB và chuyển dữ liệu bộ sưu tập cũ.
- `app.js`: kết nối DOM, trạng thái UI và các luồng sử dụng; chia 10 phần có tiêu đề.
- `animation.js`: dải quay không trùng hai thẻ liền nhau.
- `controls.js`: dropdown riêng (combobox/listbox), đồng bộ select nguồn, accordion có chuyển động; giữ semantics và giá trị form.
- `experience.js`: chuyển động, phản hồi nhấn và giảm chuyển động.
- `audio.js`: âm thanh ngắn, tắt tiếng và ngừng khi chuyển nền.
- `ui.js`: icon, ảnh lỗi, chia sẻ và cài PWA.
- `nearby.js`: liên kết Google Maps.
- `attribution.js`: tra cứu metadata kiểm kê theo ID món và đường dẫn ảnh, trả placeholder cho record cần rà soát, cùng ghi chú theo ngôn ngữ.

## CSS và build

Nguồn CSS được ghép theo `STYLE_SOURCES` trong `scripts/public_files.py`: base → themes → interactions → refinements → mobile → mobile-upgrade. Không có `@import` gây thêm lượt tải. Quy tắc giao diện hiện hành nằm tại `DESIGN.md`.

`python build_public.py` gọi `scripts/build_public.py`. Danh sách file xuất bản và ánh xạ nguồn nằm ở `scripts/public_files.py`. `/app.js` lấy từ `src/js/app.js`, `/style.css` được ghép từ `src/styles/`; các URL ảnh và tài nguyên giữ nguyên. Vì vậy không chạy server tĩnh trực tiếp từ `src/` hoặc gốc repository.

Chỉ `public/` là đầu ra website. Build xóa file cũ không còn trong danh sách tại đầu ra, không đụng nguồn. Không sửa file trong `public/`. Thêm tài nguyên mới phải cập nhật `PUBLIC_FILES`. Build sinh `public/sw-assets.js` từ allowlist, `assets/attribution-data.js` từ báo cáo kiểm kê và phần credits món ăn từ cùng metadata; `src/sw.js` nạp manifest bằng `importScripts`, chia shell bắt buộc và tài nguyên tùy chọn. Không đưa API hay tài nguyên bên ngoài vào cache. Báo cáo `docs/reports/image-attribution-audit.json` bao phủ toàn bộ 350 ID; đây là kiểm tra cấu trúc metadata, không phải xác minh độc lập nguồn ngoài. Mục cần rà soát dùng placeholder cục bộ cho tới khi có hồ sơ đủ trường. Tăng phiên bản cache khi thay đổi hành vi cache.

## Backend

Các file ở gốc chỉ là entry point. `backend/server.py` không build khi import; entry point chỉ build nếu `public/` chưa tồn tại. `BFSC_PUBLIC_ROOT` và `BFSC_DATA_ROOT` cho phép cấu hình thư mục public/dữ liệu riêng. API món ăn giới hạn body 2 MiB, kiểm tra vùng, bữa, giá, mô tả, ảnh và số dinh dưỡng; ghi JSON qua file tạm và atomic replace. `id` hoặc `idempotencyKey` UUID làm ID ổn định khi retry; dữ liệu JSON hỏng trả lỗi mà không bị ghi đè. Tests dùng thư mục dữ liệu tạm. `backend/run_server.py` dùng lại cùng máy chủ cho tunnel. Adapter Places được giữ để tương thích và kiểm thử; endpoint trả phí vẫn bị vô hiệu hóa. Dữ liệu riêng tại `backend/data/` không được xuất bản. Ngân sách API cũ vẫn dùng `.private/` tại gốc để không vô tình đổi vị trí sổ theo dõi.

## Lưu trữ và kiểm thử

Không đổi origin, URL công khai, khóa localStorage/sessionStorage hay tên IndexedDB khi sắp xếp file. Dữ liệu người dùng tiếp tục được giữ. Kiểm thử Node đọc `src/`, kiểm thử trình duyệt phục vụ `public/`, Python kiểm tra máy chủ và chính sách xuất bản. Dùng build trước browser test.

`archive/` giữ công cụ một lần, ảnh JPG/SVG cũ và tài liệu nghiên cứu không còn là đầu vào build. Không chạy lại chúng theo hướng dẫn hiện tại. `artifacts/` chỉ là ảnh chụp, log và kết quả kiểm thử. Cả hai được bỏ qua trong Git và không phục vụ qua web.
