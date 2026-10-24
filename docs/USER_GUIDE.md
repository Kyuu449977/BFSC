# Hôm nay ăn gì?

Ứng dụng JavaScript thuần gợi ý 72 tên món Việt và đồ uống, với 89 lựa chọn theo buổi. Giao diện sáng, dùng tốt trên điện thoại, có bộ sưu tập lưu trong trình duyệt và hỗ trợ offline sau khi tải cache thành công qua HTTPS hoặc localhost.

## Chạy trên máy

```sh
python server.py
```

Mở http://localhost:8080. Server in thêm địa chỉ Wi-Fi để truy cập từ điện thoại cùng mạng. Có thể đổi cổng bằng biến môi trường `PORT`.

`npm start` gọi cùng server. File `CHAY_WEB_CHO_DIEN_THOAI.bat` chạy `run_server.py`: nếu có `cloudflared.exe`, công cụ này tạo thêm link Internet; nếu thiếu, local và Wi-Fi vẫn hoạt động. Chỉ triển khai thư mục `public/` được tạo bằng `python build_public.py`; không publish thư mục checkout. Vercel/Netlify/Render đã cấu hình build và publish thư mục này.

## Cách chọn món

- **Chọn 1 món / Chọn 3 món:** dùng danh mục đang chọn. Món chính tự theo giờ thiết bị: sáng 05–11h, trưa 11–14h, chiều 14–18h, tối các giờ còn lại.
- **Không trùng:** mặc định bật, chỉ áp dụng trong một lượt chọn ba món. Giữa các lượt, ưu tiên ít trùng lượt vừa công bố, rồi ưu tiên món ít xuất hiện; chọn ngẫu nhiên trong các phương án ngang nhau. Lịch sử lưu trong sessionStorage của tab, giữ qua tải lại; không dùng bộ sưu tập lâu dài làm trọng số. Khi ngân sách hoặc số món hạn chế, kết quả có thể phải lặp.
- **Tạo combo:** một món chính theo buổi + một món ăn vặt + một đồ uống. Có tổng “giá từ” dựa trên giá thấp nhất của từng món; giá thực tế tại quán có thể cao hơn.
- Kết quả được chọn trước hoạt ảnh và chỉ ghi bộ sưu tập một lần khi công bố. Bỏ qua hoặc chuyển tab kết thúc hoạt ảnh, không quay lại kết quả.
- Xem chi tiết thực đơn không cộng vào bộ sưu tập. Bộ sưu tập cũ ở `food_case_collection` được chuyển một lần sang IndexedDB `food_case_data`; các lượt tăng bộ đếm dùng giao dịch để không mất dữ liệu khi nhiều tab cùng chọn. localStorage vẫn có bản tương thích. Tùy chọn ngân sách, âm thanh và không trùng dùng các khóa `food_case_setting_*` độc lập; `food_case_settings` là bản tương thích.

## Kiểm tra

```sh
npm test
python -B tests/test_server.py
```

Kiểm tra trình duyệt dùng Playwright và Microsoft Edge đã cài trên Windows. Playwright chỉ phục vụ kiểm thử, không cần để chạy website. Cài bằng `npm install --no-save --package-lock=false playwright` nếu máy chưa có; hoặc trỏ `NODE_PATH` tới thư mục package đã có.

```sh
npm run test:browser
npm run benchmark
```

Browser QA dùng cổng 8097, benchmark dùng 8098; cần để hai cổng này trống. Script lưu ảnh và kết quả vào `artifacts/`. Benchmark so với Git revision gốc đã ghi trong script; có thể thay bằng biến `BASELINE_REF`.

## Cấu trúc

`src/js/data.js` chứa 89 lựa chọn theo buổi (72 tên món), có giá tham khảo. Món mới hướng tới phần ăn bình dân một người; chưa xác minh giá hoặc tình trạng bán tại từng quán Làng Đại học. `src/js/gacha.js` cung cấp `prepareSelection({ mode, unique, budget })`, `drawDishes({ mode, count, unique, budget, prepared })`, `drawCombo({ budget, prepared })` và `commitResults(results)`. Kết quả gồm `dish`, `source`, `sourceName`; commit bổ sung `isNew`, `count` và trả trạng thái lưu. Cần giữ nguyên danh sách kết quả đã rút để commit một lần; không tạo bản sao rồi commit lại. Trên trình duyệt, chờ `engine.ready` để hoàn tất chuyển dữ liệu và dùng `await engine.commitResults(results)` trước khi công bố kết quả. Nếu không truy cập được IndexedDB, vẫn chọn được món trong phiên nhưng báo không lưu được tiến độ.

`src/js/app.js` điều phối giao diện, hộp thoại native, trạng thái xử lý, bộ sưu tập và chia sẻ. `src/js/animation.js` chạy vòng quay 2,5 giây; chế độ giảm chuyển động công bố kết quả ngay.

Ảnh phục vụ website gồm 72 ảnh WebP chụp thật có nguồn và điều kiện sử dụng ghi trong `src/images/sources.json`. Các JPG cũ không còn được dùng làm ảnh phục vụ website. Khi đổi tài nguyên, tăng `CACHE_NAME` trong `src/sw.js`. Service worker không cache API hay nguồn bên ngoài; chỉ dùng HTML dự phòng cho điều hướng.

Website mở trực tiếp bằng đường dẫn trên Chrome, Safari hoặc trình duyệt khác. Nút Chia sẻ dùng bảng chia sẻ của thiết bị, hoặc sao chép link khi không hỗ trợ. Nút thêm vào màn hình chính dùng cài PWA khi trình duyệt hỗ trợ, có hướng dẫn thủ công cho các thiết bị khác; đây là tùy chọn, không bắt buộc. Dùng hosting HTTPS để cài ứng dụng và offline trên điện thoại.

Xem kết quả kiểm chứng và số đo tại [báo cáo tối ưu](artifacts/verification.md).

## Tìm quán trên Google Maps

Website dùng link mở Google Maps theo món ăn, không cần API key hay phương thức thanh toán. Xem địa chỉ, đánh giá và thực đơn trực tiếp trên Google Maps. Website không thu thập GPS và đã tắt route gọi API trả phí. Xem [hướng dẫn](GOOGLE_MAPS_SETUP.md).

## Giao diện ưu tiên điện thoại

Đã bỏ QR và gọi dịch vụ tạo mã. Icon Lucide và font Be Vietnam Pro được vendored cùng giấy phép, hoạt động offline. Thực đơn hiển thị 12 món mỗi đợt, có tải thêm, tìm kiếm tiếng Việt có/không dấu và lọc bộ sưu tập. Thanh điều hướng dưới cùng có safe area cho điện thoại; tablet/desktop dùng bố cục nhiều cột và hộp thoại phù hợp.

Xem [nguồn và giấy phép](OPEN_SOURCE.md). `npm run test:mobile` kiểm tra giao diện nhỏ, chia sẻ, cài đặt và tìm kiếm. Bản thay đổi này nằm trong workspace; không tự cập nhật website public hay index Google.

## Ngân sách tùy chọn

Mở **Ngân sách & tùy chọn**, nhập tổng tiền hoặc chọn mức nhanh. Để trống / Bỏ giới hạn để xem toàn bộ món. Chấp nhận `50000`, `50.000`, `50,000` hoặc `50 000`; số âm, số lẻ và ký tự khác không hợp lệ. Ngân sách 0 không có lựa chọn với dữ liệu hiện tại.

Theo lựa chọn của người dùng, bộ lọc dùng **giá thấp nhất** (`priceMin`) của mỗi khoảng giá tham khảo. Ngân sách tính cho tổng toàn bộ lượt, không phải cho từng món riêng lẻ. Giá tối đa có thể vượt ngân sách; đây không phải bảo đảm giá bán thực tế.

Ngay khi nhập, các nút chọn/reroll bị vô hiệu. Sau khi ngừng nhập 350ms, hệ thống liệt kê trước các lựa chọn hợp lệ cho 1 món, bộ 3 món và combo, rồi bật riêng những nút có phương án đủ tiền. Chọn 3 món không trùng tuân theo tùy chọn hiện tại. Không có phương án sẽ hiện mức tối thiểu cần có, không chọn trùng hoặc vượt tiền để lấp chỗ. Khi đang quay, khóa ô tiền và các điều khiển làm đổi kết quả.

Bộ lọc cũng áp dụng vào thực đơn. Không có ngân sách thì không lọc giá. Món thiếu giá hợp lệ sẽ bị loại khi có ngân sách. Chỉ lưu tùy chọn đã kiểm tra hợp lệ; bộ sưu tập cũ giữ nguyên.

`npm run test:budget` kiểm tra trình duyệt trên cổng 8095. `npm test` kiểm tra giá, toàn bộ các bộ món hợp lệ, ranh giới ngân sách, không trùng, dữ liệu thiếu giá và kết quả tính trước đã hết hiệu lực.

## Ảnh thật và hiệu ứng

89 lựa chọn dùng 72 ảnh chụp thật, không dùng hình vẽ SVG hoặc ảnh AI. Ảnh món mang tính tham khảo, cách chế biến và bao bì có thể khác theo vùng. Ảnh được lưu cục bộ và tải lười ở thực đơn. 66 ảnh Commons, 3 ảnh Cookbeo có điều kiện phi thương mại và ghi công, 3 ảnh từ Thanh Niên/Thật Là Ngon/Rau má Luck cần xác nhận quyền tái sử dụng trước khi đưa lên website công khai. Xem `src/credits.html#food-images`.

Motion 12.23.24 (MIT, từ motiondivision/motion trên GitHub) được lưu cục bộ. `src/js/experience.js` điều phối hiệu ứng nhấn/ripple, hiện thẻ theo nhịp, đổi món gợi ý và mở hộp thoại. Hiệu ứng hoàn tất rồi trả lại style cho CSS; hủy khi ẩn trang hoặc bật giảm chuyển động. Không thay đổi logic quay, ngân sách hay thời điểm commit kết quả. `npm run test:motion` kiểm tra bàn phím, focus, dọn ripple và giảm chuyển động.

## Các sửa lỗi theo báo cáo kiểm thử — 24/10/2026

- `server.py` tạo và phục vụ riêng `public/`, với allowlist trong `public_files.py`, dùng chung GET/HEAD; không listing hoặc đọc repo bằng tên chữ hoa/encoding. Khi sửa file nguồn, chạy lại `python build_public.py` rồi tải lại trang; nếu đổi allowlist, khởi động lại server. Không thêm file nội bộ vào allowlist. Build loại file đầu ra cũ không có trong danh sách.
- Không còn rewrite mọi URL về HTML trên hosting; asset không tồn tại phải 404. Cần xác minh HTTP/Content-Type sau deploy. Trên Render đã từng có catch-all trong dashboard, phải xóa rule cũ ở dashboard khi phát hành vì Blueprint có thể giữ rule đã tồn tại. Chưa deploy/kiểm tra production.
- Server preview có hàng chờ 128 kết nối, tối đa 32 luồng xử lý và timeout socket 10s. Header nosniff, frame DENY, referrer policy và CSP được bật trên server Python; Vercel/Netlify có cấu hình tương ứng. Đây không phải server production hay cơ chế chống DDoS.
- IndexedDB là nguồn bộ đếm chính. Tab khác được thông báo bằng BroadcastChannel/storage rồi đọc lại giao dịch; không ghi đè snapshot. Các tab phiên bản cũ cần tải lại để dùng cơ chế mới. Bộ sưu tập chỉ là món đã khám phá; số lần và giờ thiết bị không dùng cho phần thưởng/quyền lợi.
- Gợi ý thoát lọc bộ sưu tập. Trạng thái rỗng phân biệt ngân sách, từ khóa/danh mục và bộ sưu tập. Ô tiền lỗi nói rõ vẫn giữ ngân sách trước; có nút bỏ giới hạn ngay tại trạng thái rỗng. Ảnh lỗi chuyển sang khung thông báo local, không thay bằng ảnh món khác.
- Service worker v11 chỉ cache danh sách tài nguyên cố định, bỏ query khi tạo cache key, không cache API. Ảnh/font tùy chọn lỗi không chặn cài app shell; giao diện báo mức sẵn sàng offline. Không có ảnh offline nếu ảnh chưa từng tải thành công; lúc đó dùng placeholder.
- `npm run test:audit-fixes` dựng **Python server thật**, kiểm tra migration, nhiều tab tuần tự/đồng thời, settings, spam, ngân sách, ảnh lỗi, CSP, offline từng phần và burst IPv4 có điều tiết; cổng 8105 cần trống. Có thể chỉ định `PYTHON_BIN`. `python -B -m unittest discover -s tests -p 'test_*.py'` bao gồm HTTP GET/HEAD/encoding và kiểm tra gói public.

Chi tiết đối chiếu: [báo cáo xử lý](artifacts/AUDIT-REMEDIATION-2026-10-24.md). Bằng chứng kiểm tra ở `artifacts/audit-fixes-evidence.json`, không nằm trong gói public. Chưa kiểm tra thiết bị iOS/Android thật, screen reader thật hoặc chứng nhận WCAG.

## Bố cục điện thoại gọn hơn — 24/10/2026

Thẻ gợi ý trên điện thoại dùng ảnh nhỏ cạnh tên/giá; mô tả đầy đủ nằm trong chi tiết. Ba nút chọn món ở màn hình đầu tiên trên các kích thước đã kiểm tra. Ngân sách và tránh trùng nằm trong **Ngân sách & tùy chọn**, vẫn lưu và tính như trước. Trạng thái offline chuyển xuống footer.

Kết quả đặt tổng giá từ lên đầu, ba món dùng thẻ gọn; mở **Mô tả & nguồn ảnh** để xem nội dung đầy đủ. Nút **Chọn lại / Xong** và nút đóng đứng ngoài phần cuộn. Khóa cuộn nền khi mở dialog; reset phần cuộn khi chọn lại; báo lỗi lưu ngay trong dialog. Bố cục riêng cho màn hình ngang ngắn, safe area cho phần tai thỏ/home indicator, input tiền vẫn 16px.

`npm run test:mobile-compact` dựng Python server thật tại cổng 8107, dùng Edge giả lập touch/mobile để kiểm tra 8 viewport, vị trí CTA không bị thanh dưới che, toàn bộ tên/giá, dialog/cuộn/chi tiết/Maps, đổi ngân sách và viewport ngắn. Chưa thay thế QA iPhone/Android hoặc bàn phím ảo thật. Xem [báo cáo mobile](reports/MOBILE-UX-2026-10-24.md).


## Dải quay và thực đơn sinh viên — 24/10/2026

Dải quay dựng từ món trúng ra hai phía để không có hai ID món giống nhau kề nhau, kể cả cạnh món trúng. Nếu chỉ một món hợp lệ thì hiển thị một thẻ, không tạo dải lặp. Không đổi kết quả khi bỏ qua hoặc resize. Lịch sử giảm lặp giữa các lượt vẫn hoạt động.

Bổ sung 10 tên món mới với ảnh Commons: bánh bao nhân thịt, bánh giò, bánh canh, bún mắm, phá lấu bánh mì, bánh flan, chè đậu trắng, chè đậu đen, chè đậu xanh nha đam, bánh bò hấp. Món quen được bổ sung vào buổi phù hợp, tạo 89 lựa chọn với 58 tên khác nhau. Các mục lẩu/nướng/ốc lớn được điều chỉnh rõ sang phần nhỏ một người, giữ ID để bảo toàn bộ sưu tập. Giá mới là ước tính cho phần thường, không phải giá trực tiếp từ quán.

Tham khảo bối cảnh món ăn sinh viên: [Foody Làng Đại học](https://www.foody.vn/bai-viet/nhung-quan-an-ngon-nut-vach-o-lang-dai-hoc-thu-duc-4834), [Nhà Tốt](https://www.nhatot.com/kinh-nghiem/an-gi-o-lang-dai-hoc.html). Không dùng giá lịch sử trong các bài này làm báo giá hiện tại. Nguồn và giấy phép từng ảnh tại `src/images/sources.json` và `src/credits.html`.


## Màu giao diện

Bấm **Đổi giao diện** (biểu tượng lấp lánh) trên thanh điều hướng phía trên. Chọn Sáng, Tối hoặc Theo thiết bị, rồi chọn Cam đất, Xanh lá, Xanh biển hoặc Hồng mận. Các màu kết hợp với cả sáng và tối, giữ nguyên chức năng và ảnh món. Lưu bằng khóa `food_case_setting_theme` và `food_case_setting_appearance`, đồng bộ các tab khi sẵn sàng; trình duyệt chặn lưu vẫn đổi màu trong phiên hiện tại. `npm run test:theme` kiểm tra trên preview cổng 8080 đang chạy.


## Khẩu vị, yêu thích, món đã ăn và món ẩn

- Mở **Ngân sách & sở thích** để chọn Cơm & xôi, Món nước, Ăn nhẹ, Cay hoặc Thanh đạm. Lọc món chính của lượt 1/3 món và phần món chính trong combo; ăn vặt và đồ uống không chịu bộ lọc khẩu vị. Giá và đủ ba nhóm combo vẫn là điều kiện bắt buộc. Tags là kiểu phục vụ thông thường, không bảo đảm dị ứng, dinh dưỡng hoặc cách nấu của quán.
- Trong chi tiết hoặc kết quả món, bấm **Yêu thích**, **Đánh dấu đã ăn**, **Không thích · Ẩn món**. Các thao tác này không cộng bộ sưu tập. Yêu thích không tự tăng xác suất random.
- Tại Thực đơn, **Danh sách của tôi** cho xem yêu thích, đã ăn và món đã ẩn. Chọn Món đã ẩn, mở món và bấm **Khôi phục món**. Danh sách món đã ẩn bỏ qua ngân sách để luôn có thể phục hồi.
- Bật **Ưu tiên tránh món đã ăn trong 3 ngày** để ưu tiên các tổ hợp ít món mới ăn. Đây là ưu tiên mềm; nếu ít lựa chọn hợp ngân sách, món đã ăn có thể trở lại. Món ẩn luôn bị loại, không có fallback tự khôi phục.
- Các mục cùng tên món ở nhiều buổi dùng chung sở thích. Lưu cục bộ bằng khóa riêng từng thuộc tính, đồng bộ tab; chặn lưu vẫn dùng được trong bộ nhớ và có thông báo. Không có tài khoản hoặc đồng bộ Google.


## Bộ điều khiển và chuyển động riêng

Menu khẩu vị/danh sách cá nhân dùng dropdown riêng: mũi tên lên/xuống, Home/End, gõ đầu từ để tìm, Enter để chọn, Escape hoặc bấm ngoài để đóng, Tab để đi tiếp. Checkbox có dấu chọn tự thiết kế; tooltip, accordion, hộp thoại, nút và vòng quay có hiệu ứng đồng bộ. Chế độ giảm chuyển động của thiết bị được tôn trọng. Không thêm Google/Material UI hoặc CDN. Motion cục bộ hiện có được dùng cho một phần chuyển động; các bộ điều khiển do dự án tự viết.
