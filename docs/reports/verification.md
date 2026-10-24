# Kết quả kiểm chứng

## Hiệu năng

Đo ba lần cho mỗi bản, cùng Headless Microsoft Edge, viewport 390×844, localhost, không throttle, browser context mới mỗi lượt và chặn service worker để đo tải lạnh. Bản trước lấy trực tiếp từ Git revision gốc; bản sau dùng mã làm việc. Dữ liệu gốc: `performance.json`.

| Chỉ số | Trước (trung vị) | Sau (trung vị) |
|---|---:|---:|
| Sự kiện tải trang hoàn tất | 104 ms | 76 ms |
| Giao diện dùng được | 1.983 ms | 113 ms |
| Tài nguyên truyền tới lúc đo | 213.558 byte | 370.756 byte |
| Tổng dung lượng 48 ảnh món | 3.486.784 byte (JPG) | 1.456.350 byte (WebP) |
| Thời lượng vòng quay mặc định | 5.500 ms + 600 ms chờ | 2.500 ms |

Thời gian giao diện dùng được đo khi màn hình chờ cũ ẩn hoặc nút chọn món mới hiển thị. Mức cải thiện này chủ yếu đến từ bỏ thời gian chờ giả; không phải phép đo Core Web Vitals hay cam kết trên mạng di động. Ảnh WebP giảm 58,2% tổng dung lượng. Dữ liệu tải đầu tăng do phiên bản mới đưa thực đơn ra trang chính và trình duyệt tải sẵn một phần ảnh lazy, trong khi bản cũ giấu thực đơn trong modal. Vì vậy không khẳng định mọi chỉ số mạng đều giảm.

## Kiểm thử đã qua

- 5 nhóm Node tests: 48 món, chọn đúng nhóm, tránh trùng, không sửa dữ liệu nguồn, combo, commit một lần, dữ liệu cũ/hỏng, lưu bị chặn, thiếu món và các mốc giờ.
- 2 Python tests: phục vụ HTML/API và server local vẫn chạy khi thiếu cloudflared.
- Browser QA ở 360, 390, 768, 1440 px: không tràn ngang; chọn ba món, bấm nhanh, combo ba nhóm, skip, resize khi quay, Escape/trả focus, giảm chuyển động, xem món chưa thu thập x0, ghi nhớ âm thanh và QR LAN.
- Browser QA: chế độ lưu trữ bị chặn vẫn chọn được món; phiên bản phục vụ tĩnh không có API vẫn tạo combo.
- Offline sau precache: tải lại và chọn món được; API không lấy từ cache, ảnh thiếu không bị thay bằng HTML. Cache phiên bản cũ được dọn, cache ứng dụng khác được giữ.
- Không có lỗi JavaScript trong luồng browser QA. `git diff --check` qua.

## Giới hạn

Chưa kiểm chứng trên thiết bị iOS/Android thật, mạng di động thật hoặc các nền tảng hosting thực tế. Chưa kiểm thử tunnel public do không có cloudflared.exe; nhánh thiếu tunnel đã qua kiểm thử. Không triển khai lên Internet. Ảnh món giữ nguyên nguồn gốc dự án, chỉ đổi định dạng và kích thước; một số ảnh gốc có thể không khớp hoàn toàn tên món.

## Bổ sung Google Maps và vị trí

- Đã qua 8 Python tests (adapter Places và HTTP/server), 6 nhóm Node tests và hai bộ browser QA.
- Browser Places QA dùng tọa độ giả và response fixture: không tự xin GPS; opt-in, danh sách, rating, menu có nguồn, thiếu giá, attribution, liên kết an toàn, bốn kích thước màn hình, đổi bán kính/bộ lọc, đổi món combo, hủy response cũ, quota, danh sách rỗng, offline, xóa vị trí, thiếu key và từ chối quyền.
- Không đọc vị trí thực của người dùng và không gọi API Google tính phí. Chưa có key nên chưa xác thực dữ liệu quán trực tiếp từ Google. Ảnh `places-mobile-fixture.png` là ảnh kiểm thử, không phải quán thực tế.
- Đã thêm adapter cho local Python và Vercel Python Function. Cấu hình Vercel chưa được triển khai thật. Netlify/Render static cần backend để có danh sách quán trong web.
- Phép đo hiệu năng ở phần trước thuộc giai đoạn tối ưu giao diện, trước khi thêm tích hợp Places; không dùng để khẳng định số đo của tính năng mới.

## Bổ sung chặn hạn mức

13 Python tests đã qua, gồm giới hạn 25 lượt/24 giờ, 900 lượt/35 ngày, giao dịch đồng thời, bộ đếm còn sau khi nạp module mới (mô phỏng restart), hết cửa sổ thời gian, lỗi lưu trữ, chặn serverless và xác nhận không gọi Google sau khi hết lượt. Lượt gọi lỗi vẫn được tính vào bộ đếm dự phòng. Browser Places QA cũng đã qua. Không thay đổi quota Google Cloud hay gọi API Google thật trong bước này.

## Chuyển sang link Google Maps không cần thanh toán

Chế độ hiện tại là `maps-link`: frontend không gọi Places API hoặc xin GPS; server local và Vercel Function trả 410 cho POST `/api/places`, kể cả khi có key trong biến môi trường. Không còn giao diện quota, bộ lọc API hoặc thông báo yêu cầu kết nối key.

13 Python tests đã qua (gồm xác nhận route không gọi Google dù có key). Browser QA mới xác nhận link đúng món cho một món/combo, không có key trong URL, không gọi Places API, không xin GPS, không tràn ngang tại 360/390/768/1440 px và thông báo offline. Bộ browser QA chọn món/offline cũ cũng qua. Kết quả quán được xem bên ngoài trên Google Maps; website không hiển thị hoặc lưu danh sách quán.

## Giao diện mobile và tài nguyên nguồn mở

Xem báo cáo hiện tại tại `mobile-optimization.md`. Đã bỏ QR, bổ sung Web Share/copy, hướng dẫn PWA, tìm món và phân trang, icon/font cục bộ kèm giấy phép. Các bài kiểm thử mobile, Maps links và offline đã qua; số đo hiệu năng ở các phần cũ không đại diện cho phiên bản giao diện mới này.

## Bổ sung ngân sách và hình món — 23/10/2026

- Giữ nguyên 48 tên món, nội dung và khoảng giá; thêm `priceMin`, `priceMax` dạng số. Theo yêu cầu dùng **giá thấp nhất**, không bảo đảm giá tại quán hoặc giá cao nhất nằm trong ngân sách. Tổng ngân sách áp dụng cả lượt, gồm tổng 3 món/combo.
- Liệt kê trước mọi bộ hợp lệ, chọn ngẫu nhiên trong danh sách; không có bộ sẽ khóa nút tương ứng và báo số tiền tối thiểu. Không tự tắt không trùng hoặc bỏ qua ngân sách. Tách chuẩn bị, chọn và commit bộ sưu tập.
- Debounce 350ms, khóa các nút chọn ngay khi nhập; kiểm tra định dạng, dùng giá trị mới nhất, lưu tùy chọn hợp lệ, khóa ô tiền khi quay. Bộ tính trước hết hiệu lực khi đổi buổi, danh mục, ngân sách hoặc không trùng.
- 39 ảnh có nguồn Commons; 9 SVG có nhãn cho các món chưa có ảnh phù hợp. Đã xem bảng tổng hợp 48 hình tại `food-images-final.png`. Ảnh món mang tính tham khảo, bao bì đồ uống có thể khác thị trường; không phải ảnh quán tìm trên Maps. Nguồn/giấy phép/biến đổi tại `../images/sources.json` và `../credits.html#food-images`.
- 12 nhóm kiểm thử Node đã qua (giá cả, tính toàn bộ bộ món, ranh giới, không trùng, nguồn không đổi, thiếu giá, bộ tính cũ, collection và ảnh); 13 kiểm thử Python đã qua.
- Browser regression/offline, Maps, mobile và ngân sách đã qua: 320/360/390/768/1440px và ngang 844px, không tràn ngang; nhập nhanh/sai/số 0/định dạng ngăn nghìn, lưu lại/tắt giới hạn, ba món/combo trong ngân sách, quay/resize/bỏ qua. Không gọi Places API/GPS.
- Cache nâng v8 → v9, tải sẵn toàn bộ hình đang dùng và metadata; kiểm tra dọn cache cũ/offline thành công. Không xuất bản.

### Đo thời gian tính bộ món

`budget-performance.json`: Node trên chính máy phát triển, 100 lượt cho mỗi tổ hợp danh mục × không trùng × ngân sách (18 trường hợp). P95 lớn nhất 1.271 ms. Đây là số đo xử lý JavaScript trên máy này, không phải tải trang, điểm Lighthouse hoặc cam kết cho điện thoại. 350ms là thời gian debounce chờ ngừng nhập, không phải thời gian tính toán bắt buộc. Không đo lại tải trang trước/sau cho riêng thay đổi ảnh này; các số đo tải trang ở các mục trước thuộc phiên bản được ghi tại mục đó.

## Ảnh chụp thật và hiệu ứng Motion — 23/10/2026

Mục này thay thế trạng thái 39 ảnh / 9 SVG ở mục trước. Cả 48 mục hiện dùng ảnh WebP chụp thật; 9 minh họa đã ngừng được tham chiếu. Nguồn: 42 Commons, 3 Cookbeo được cho phép dùng phi thương mại khi ghi công, 3 Thanh Niên/Thật Là Ngon/Rau má Luck chưa xác minh quyền tái sử dụng và được đánh dấu trong metadata. Chưa xuất bản công khai. Cách trình bày món/bao bì có thể khác phiên bản địa phương.

Dùng bản JavaScript thuần Motion 12.23.24 từ motiondivision/motion, MIT, vendored và ghi SHA-256. Hiệu ứng nhấn/ripple, đổi gợi ý, thẻ món xuất hiện theo nhịp và mở hộp thoại. Chỉ animate transform/opacity bằng Web Animations; không đọc kích thước mỗi frame. Ripple đọc hình học một lần khi bấm rồi dọn sau khi hoàn tất. Hoàn tất/hủy hiệu ứng trả style về CSS để hover không bị ghi đè. Giảm chuyển động hoặc ẩn trang dừng các hiệu ứng đang chạy. Ngân sách/vòng quay/commit không phụ thuộc các hoạt ảnh trang trí.

Đã qua: 12 nhóm Node; browser regression/offline/cache upgrade; Maps links; 6 viewport mobile/tablet/desktop; budget debounce/quay/bỏ qua/resize; kiểm thử mới Motion cho pointer, Space, focus/Escape, ripple cleanup, lọc nhanh, đổi giảm chuyển động giữa hoạt ảnh. Không có request tới CDN hoặc lỗi JavaScript lúc chạy. Snapshot giao diện: `professional-mobile.png`; bảng 48 hình: `food-images-final.png`. Không đo điểm Lighthouse hoặc cam kết FPS cho đợt này.

## Xử lý báo cáo kiểm thử — 24/10/2026

Xem [đối chiếu và bằng chứng](AUDIT-REMEDIATION-2026-10-24.md): public root + GET/HEAD allowlist, IndexedDB đa tab, empty state/ảnh dự phòng, chính sách dữ liệu, cache v11 có giới hạn. 12 nhóm Node, 18 Python, 6 script trình duyệt và smoke phục vụ public đạt; còn giới hạn thiết bị thật, production và quyền ảnh như báo cáo chi tiết.

## Giao diện điện thoại gọn — 24/10/2026

Xem [báo cáo mobile](MOBILE-UX-2026-10-24.md): CTA được đưa lên màn hình đầu tiên, tùy chọn mở rộng, modal có phần cuộn riêng và hành động luôn hiện; kiểm tra 8 viewport touch/mobile, giữ chức năng cũ. Cache v12.

## Tinh chỉnh thiết kế và âm thanh — 24/10/2026

- Bảng màu kem/cam đất thống nhất, thanh chọn danh mục có trạng thái rõ; thẻ món cùng nhịp ảnh, tên hai dòng và thông tin bộ sưu tập.
- Ngân sách nhanh phản ánh lựa chọn bằng `aria-pressed`; giữ nguyên kiểm tra tổng tiền theo mức giá thấp nhất.
- Hiệu ứng nhấn, hover, chuyển hộp thoại dùng Motion cục bộ hiện có; tôn trọng giảm chuyển động.
- Âm báo dùng tiếng sine ngắn, âm lượng thấp hơn; tắt tiếng dừng cả âm đã lên lịch. Không tạo AudioContext trước khi có yêu cầu phát âm; dừng khi chuyển nền; tối đa 8 tiếng đồng thời.
- Cache v13 cập nhật tài nguyên giao diện. Không phát hành website trong lần sửa này.
- Kiểm tra tự động 8 kích thước, ngang/dọc, keyboard/focus, giảm chuyển động, ngân sách, bộ sưu tập và offline. Chưa kiểm chứng trên thiết bị iOS/Android vật lý hoặc đo cảm nhận âm thanh trên loa thật.

## Dải quay và thực đơn sinh viên — 24/10/2026

- Dải 32 thẻ không có món trùng kề nhau; dựng từ kết quả ở vị trí 26 ra hai phía. Một món hợp lệ chỉ có một thẻ. 1.700 dải thử với pool 2–18 món đều đạt; kiểm tra trình duyệt xác nhận resize/bỏ qua vẫn đúng thẻ trúng.
- 69 lựa chọn theo buổi, 58 tên món khác nhau; thêm 10 tên mới, 10 ảnh Commons đã kiểm tra trực quan và ghi công. Giá món mới là ước tính phần thường một người, không xác nhận giá tại quán.
- Các phần lẩu/nướng/ốc lớn đổi rõ sang phần nhỏ, giữ ID dữ liệu cũ. Tổng bộ sưu tập cập nhật động.
- 20 kiểm thử Node, 18 kiểm thử Python, browser/offline, ngân sách và 8 kích thước mobile đều đạt. 10 URL ảnh mới trên preview8080 trả 200. Cache v15. Không xuất bản.
