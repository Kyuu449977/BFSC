# Ăn Gì Đây? — BFSC

Website chọn món ăn bằng vòng quay, hỗ trợ 382 món tĩnh thuộc Việt Nam, Nhật Bản, Hàn Quốc, Trung Quốc và Âu–Mỹ. Người dùng có thể thêm món riêng, lọc ngân sách/khẩu vị, xem bộ sưu tập và mở Google Maps theo tên món.

## Chạy và build

Yêu cầu Python 3.10+ để build/preview. Frontend không cần npm hoặc bundler. Node/Playwright chỉ dùng cho phát triển và kiểm thử.

```sh
python -B build_public.py
python -B server.py
```

Mở địa chỉ localhost hoặc LAN được in ra. `PORT` đổi cổng preview. Sau khi sửa nguồn, build lại; khởi động lại preview nếu đổi allowlist. Service worker và cài PWA cần HTTPS hoặc localhost; HTTP LAN vẫn dùng được phần website mà trình duyệt cho phép.

`python -B run_server.py` hỗ trợ Cloudflare Tunnel nếu executable tùy chọn có sẵn. Không cần tunnel để dùng trong mạng LAN.

## Công nghệ và cấu trúc

HTML5, CSS, classic JavaScript ES6, Web Animations, Web Audio và service worker; không React/Vue, ES Modules, bundler hoặc thư viện frontend lúc chạy. Các tích hợp quảng cáo bên ngoài được giữ.

- `src/`: nguồn HTML, CSS, JavaScript và tài nguyên.
- `src/js/money.js`, `catalog.js`, `settings.js`: tiền tệ, danh mục và cài đặt.
- `src/js/gacha.js`, `collection.js`, `dish-preferences.js`: chọn món, lưu bộ sưu tập và sở thích.
- `src/js/custom-dishes.js`: validation, API và lưu món local khi không có backend.
- `src/js/theme-init.js`, `controls.js`, `experience.js`, `audio.js`: giao diện và tương tác native.
- `src/js/mobile-menu.js`, `sponsors.js`: menu công cụ thu gọn và banner theo kích thước màn hình, tải một lần khi gần vùng nhìn thấy.
- `src/js/dish-i18n.js`, `regional-dish-locales.js`, `ui-copy.js`, `legal-copy.js`: bản dịch món, chữ giao diện và trang thông tin; không thay ID món. Ngôn ngữ hiển thị độc lập với vùng ẩm thực và tiền tệ.
- `backend/`: preview/API Python. `backend/data/` không được xuất bản như file tĩnh.
- `scripts/build_public.py`, `scripts/public_files.py`: build và allowlist.
- `public/`: đầu ra tự sinh; không sửa trực tiếp.
- `tests/`: unit, integration và browser QA.
- `artifacts/`: log/ảnh cục bộ; không publish.

CSS được ghép theo thứ tự base → interactions → mobile → refinements → themes → mobile-upgrade.

## Hành vi sản phẩm

- Vùng quyết định danh mục và tiền tệ; ngôn ngữ chỉ đổi nội dung hiển thị. Main gom bốn nhóm bữa, không giới hạn một bữa hiện tại. Bữa theo timezone dùng cho bối cảnh/banner.
- Giờ sáng 04–11, trưa 11–14, chiều 14–17, tối 17–22; khuya dùng nhóm dinner.
- Random ưu tiên tránh món mới ăn nếu bật, rồi giảm trùng lượt trước, cân bằng lịch sử phiên và random khi hòa. Favorite/rarity không tăng xác suất.
- Ngân sách theo tổng giá thấp nhất tham khảo; giá thực tế có thể cao hơn. VND/JPY/KRW là số nguyên; USD/CNY có tối đa hai số thập phân. Không chuyển tỷ giá khi đổi vùng.
- Kết quả chọn trước animation và chỉ commit một lần. Skip không random lại. Vòng tự nhập là luồng riêng; dòng trùng tăng số vé và không chịu bộ lọc catalog.
- Bộ sưu tập dùng IndexedDB `food_case_data`, store `state`, key `collection`; giữ mirror `food_case_collection`. Không đổi các khóa lưu cũ. Dữ liệu chưa nhận diện không tự bị xóa.
- Appearance system theo thiết bị; auto theo thời gian. Màu custom được giữ cho trang trí, màu tương tác được điều chỉnh để đủ tương phản.
- Google Maps dùng URL tìm kiếm; không xin GPS hoặc gọi Places trả phí.

## Món tự thêm và API

Local Python hỗ trợ GET/POST `/api/custom-dishes`. Dữ liệu và ảnh gửi lên máy chủ thuộc danh mục chung. Trên static hosting hoặc khi mạng/API không sẵn sàng, món được lưu ở trình duyệt. Validation 4xx không được che bằng fallback.

API nhận UUID trong `id` hoặc `idempotencyKey`, region, mealId, name, price, desc và các trường phụ. Cùng ID/cùng nội dung là retry; cùng ID khác nội dung trả 409. Body tối đa 2 MiB. Ảnh upload tối đa 10 MiB trước xử lý, resize cạnh dài 640px và encode WebP. Backend kiểm tra dữ liệu, giới hạn request, khóa cập nhật và atomic replace; file JSON hỏng không bị ghi đè.

`BFSC_PUBLIC_ROOT` và `BFSC_DATA_ROOT` hỗ trợ preview/test với thư mục riêng. Import server không tự build. Test API dùng data root tạm.

GET `/api/places` trả maps-link; POST trả 410, kể cả khi có key. Vercel chỉ có function Places hiện hành. Netlify/Render static không có API lưu món; frontend dùng local fallback. Chưa deploy trong đợt nâng cấp.

## PWA, tài nguyên và ghi công

Build tạo `sw-assets.js` từ allowlist: app shell bắt buộc, ảnh/font tùy chọn. Không cache API hay quảng cáo. Ảnh thiếu không chặn shell; UI báo số tài nguyên chưa lưu. Bản mới chờ người dùng cập nhật và không reload khi đang quay hoặc nhập form.

Metadata ảnh được đối chiếu theo đường dẫn tại `docs/reports/image-attribution-audit.json`. Có 118 mục có metadata cấu trúc đầy đủ và 264 mục cần rà nguồn/giấy phép; nhóm cần rà dùng placeholder trong UI, giữ nguyên file gốc và ID. Đây không phải xác minh quyền sử dụng độc lập. Credits và runtime metadata sinh trong build, có escape HTML. Giấy phép font/icon/thư viện lịch sử nằm trong `src/assets/licenses/`.

Thêm món/asset phải cập nhật nguồn, metadata và allowlist; build tự sinh cache manifest. Tăng version cache khi phát hành thay đổi tài nguyên.

## Kiểm thử và bàn giao

Kiểm tra cảnh báo responsive: `node --test tests/responsive-audit-browser.cjs` (alias `npm run test:responsive-audit`). Helper chỉ phục vụ tests, phân biệt nội dung ẩn/clipping/overlay với lỗi che thao tác; xem `docs/reports/RESPONSIVE-AUDIT-P1-2026-10-29.md` để đọc schema và giới hạn.

Ma trận P2: `npm run test:responsive-p2`; đặt `BFSC_TEST_ENGINE=webkit` để chạy WebKit. Có thể đặt `BFSC_P2_GROUP` thành `base`, `comparison`, `menu`, `ads` hoặc `interaction` để chạy riêng từng nhóm. Suite dùng server/storage và quảng cáo giả lập riêng, lưu JSON/ảnh trong `artifacts/responsive-p2/`. Phạm vi và kết quả: [báo cáo P2](docs/reports/RESPONSIVE-P2-2026-10-29.md).

Đối chiếu báo cáo visual diff: `npm run test:responsive-crosswalk` (đặt `BFSC_TEST_ENGINE=webkit` cho WebKit). Dùng fixture dữ liệu đã trích từ HTML, không chạy mã trong báo cáo gốc. Cách chạy lại toàn bộ nghiệm thu, kết quả và giới hạn: [báo cáo P3](docs/reports/RESPONSIVE-P3-2026-10-30.md); [bảng 54 nhóm](docs/reports/VISUAL-REPORT-CROSSWALK-P3-2026-10-30.md).

```sh
node --test tests/*.test.cjs
python -B -m unittest discover -s tests -p "test_*.py"
python -B build_public.py
node tests/upgrade-browser.cjs
node tests/upgrade-features-browser.cjs
node tests/upgrade-pwa-browser.cjs
```

Browser scripts dùng Playwright hiện có trong `tools/country-qa/node_modules`. Cài engine tương ứng trong môi trường QA nếu thiếu. Đặt `BFSC_TEST_ENGINE=webkit` để chạy ma trận/PWA trên WebKit. Các lệnh npm trong package.json chỉ là shortcut khi npm có sẵn.

Báo cáo nâng cấp: [docs/reports/UPGRADE-2026-10-29.md](docs/reports/UPGRADE-2026-10-29.md). Log/ảnh nằm trong `artifacts/upgrade-acceptance/` và `artifacts/responsive-qa/`.

Kiểm thử desktop engine không thay thế iPhone/Android vật lý, bàn phím ảo thật hoặc production. Browser QA chính chặn mã quảng cáo ngoài; hành vi thực của nhà cung cấp được ghi là chưa xác minh.
