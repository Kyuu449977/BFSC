# Đối chiếu và xử lý báo cáo kiểm thử “Ăn gì đây?”

Ngày xử lý: **24/10/2026, múi giờ Việt Nam**. Báo cáo gốc ngày 23/10/2026 được giữ nguyên tại [BAO-CAO.md](audit-2026-10-23/BAO-CAO.md).

## Kết quả

Đã sửa các phát hiện SEC-01/02/03, LOG-01, UX-01/02/03/04 và DOC-01 trong bản local. Đã kiểm chứng bằng Python server thật, không chỉ server giả lập của các script trình duyệt. Đây là kiểm thử các trường hợp cụ thể, không phải chứng nhận an toàn toàn diện hoặc xác nhận website production.

| Mã | Thay đổi | Kiểm chứng |
|---|---|---|
| SEC-01 | Tạo `public/` từ allowlist cố định trong `public_files.py`; server chỉ mở đúng file đã cho phép, kiểm tra đường dẫn resolve trước khi đọc | GET/HEAD tên thường/hoa, encoding, backslash, dot segments, trailing dot và ADS Windows đều từ chối source bằng 404 |
| SEC-02 | Không phục vụ checkout, tắt listing; build dọn file đầu ra cũ ngoài allowlist | `/tests/`, `/tools/`, `/artifacts/`, `/package.json`, bằng chứng nội bộ đều 404; gói public khớp đúng allowlist |
| SEC-03 | GET và HEAD gọi chung bước kiểm tra quyền; API HEAD không có body; bỏ header phiên bản Python | File nội bộ không còn trả metadata thực của file qua HEAD |
| LOG-01 | IndexedDB là nguồn chính; read-modify-write trong transaction, chuyển legacy một lần; BroadcastChannel/storage báo tab khác đọc lại DB | Từ 7 lượt cũ, thêm 69 lượt qua UI/API, gồm ghi đồng thời ở hai tab, kết thúc **76/76** ở cả hai tab sau reload |
| Settings nhiều tab | Mỗi tùy chọn có khóa riêng; không ghi đè trường khác bằng snapshot cũ | Ngân sách 100.000, không trùng và âm thanh thay ở các tab khác nhau vẫn giữ sau reload |
| UX-01 | Gợi ý thoát bộ sưu tập và khôi phục tiêu đề khám phá | `aria-pressed=false`, tiêu đề thực đơn đúng khi quay về Gợi ý |
| UX-02 | Phân biệt ngân sách/tìm kiếm/danh mục/bộ sưu tập; nút Bỏ giới hạn ngay ở trạng thái rỗng; input lỗi nói rõ còn giữ ngân sách trước | Số 0, `abc`, sửa lại, bỏ giới hạn, nút quay khóa đúng; nội dung không còn giả vờ theo số tiền lỗi |
| UX-03 | Ảnh lỗi chuyển một lần sang khung local ghi “Ảnh chưa tải được”, giữ tên/giá và kích thước | Chặn ảnh raster vẫn xem/chọn được món, fallback tải được; không có vòng lặp fallback |
| UX-04 | Nhãn “Xem món & tìm quán” khớp hành vi mở chi tiết; callout là liên kết về phần chọn món | Kiểm tra nhãn, href, Maps URLs và thao tác bàn phím |
| DOC-01 | Chính sách nêu IndexedDB, legacy localStorage, ngân sách, các khóa tùy chọn và cách xóa dữ liệu trình duyệt | Đối chiếu văn bản với lưu trữ thực tế; không thêm thao tác xóa tự động |

Nút quay giữ khóa tới khi commit xong, rồi mới công bố. API commit trên trình duyệt hiện cần `await`; các kiểm thử đã chờ hộp thoại kết quả thay vì giả định ghi đĩa đồng bộ. Bấm 1.000 lần trong một lượt vẫn chỉ thêm đúng 3 món; gọi commit lặp cùng danh sách không tăng thêm. Nếu cả lưu trữ không dùng được, ứng dụng báo không lưu và vẫn chọn được món trong phiên.

## Service worker và phục vụ tĩnh

- Cache **v11** chỉ nhận tài nguyên cố định, dùng key bỏ query; không cache API, file nội bộ hoặc URL tùy ý. 30 query khác nhau giữ nguyên **81 mục** trong ca thử thiếu một ảnh.
- Tách app shell bắt buộc khỏi ảnh/font tùy chọn; một ảnh lỗi không làm hỏng cài shell. UI hiển thị sẵn sàng offline hoặc phần ảnh/font chưa lưu. Đã chọn món được sau reload offline trong ca cài thiếu ảnh.
- Chỉ dùng HTML dự phòng cho navigation; ảnh/JSON không có trong cache không nhận HTML giả.
- Có CSP, nosniff, frame DENY và referrer policy trên Python server; Vercel/Netlify có cấu hình tương ứng. CSP còn cho inline style vì Motion/UI dùng style động; không cho inline script/eval.
- Vercel/Netlify/Render đổi output/publish sang `public/`; bỏ catch-all rewrite. Đã chạy riêng `python -m http.server ... --directory public`: chọn combo hoạt động, source/artifact/asset thiếu trả 404. Chưa xác minh response của deployment thật. Rule Render đã có trong dashboard cần xóa thủ công khi phát hành vì Blueprint có thể giữ rule cũ.

## Tải cục bộ và tài nguyên

Server preview dùng tối đa **32 luồng**, backlog **128**, timeout socket **10 giây**. Đo bổ sung trên Windows loopback tại bản local cổng 8080:

| Số request | Đồng thời | p50 (ms) | p95 (ms) | p99 (ms) | Lỗi |
|---|---|---|---|---|---|
| 100 | 20 | 8.78 | 12.89 | 14.36 | 0 |
| 100 | 100 | 25.87 | 32.69 | 33.27 | 0 |

Trang chủ vẫn trả 200 sau hai burst. CPU tiến trình tăng 0.125 giây giữa hai lần lấy mẫu; working set khoảng 24.1 → 24.6 MiB. Đây là snapshot trước/sau, không phải đo CPU utilization hoặc peak bộ nhớ tần suất cao. `PeakWorkingSet64` là đỉnh trong vòng đời tiến trình. Không coi các số này là throughput, SLA, khả năng chống DDoS hoặc so sánh trước/sau chuẩn hóa với báo cáo cũ.

## Các kiểm tra đã chạy

- **12/12** nhóm Node logic/dữ liệu/ảnh.
- **18/18** kiểm thử Python, gồm allowlist, GET/HEAD, encoding, toàn bộ asset public và tải có điều tiết.
- **6 script trình duyệt** đạt: browser, mobile-ui, budget-browser, motion-browser, places-browser, audit-fixes. Bộ audit-fixes tự dựng Python server thật, kiểm tra CSP cùng các ca nhiều tab, lưu trữ bị chặn, payload tìm kiếm, ngân sách, ảnh lỗi, offline từng phần và cache query.
- Smoke riêng trên public-only static server và server local 8080; ghi số đo/metadata tiến trình. Giao diện 320, 360, 390, 768, 844 ngang và 1440px theo các bộ đã chạy; không phát hiện tràn ngang trong các ca đó. Giữ focus/Escape, giảm chuyển động và hỗ trợ bàn phím.

Bằng chứng: [audit-fixes-evidence.json](audit-fixes-evidence.json), [public-smoke-evidence.json](public-smoke-evidence.json), [ảnh mobile](audit-fixes-mobile.png). Các file này chỉ nằm trong thư mục phát triển, không được publish.

## Phạm vi còn lại

- Chưa QA iPhone/Safari/Android, screen reader và mạng di động thật; chưa chạy axe/Lighthouse hoặc chứng nhận WCAG. Chưa đo tải/kiểm tra header của hosting production. Không có bước xuất bản trong đợt này.
- DATA-01 là đặc tính bộ sưu tập cá nhân và giờ thiết bị, không phải quyền tài khoản. Không dùng số lần/giờ này cho phần thưởng, thanh toán hoặc quyền lợi. DB và client vẫn có thể bị người dùng tự sửa.
- Giữ ngân sách theo giá thấp nhất như người dùng đã chọn. Tổng kết quả nhắc lại “ước tính tối thiểu”; giá thật có thể cao hơn. Footer tăng vùng chạm; hero mobile rút gọn, chưa A/B test.
- Chia sẻ vẫn là link website, không chia sẻ nguyên combo. Thêm thông báo khi link localhost chỉ mở trên máy hiện tại. Chưa thêm lọc chay/dị ứng/số người, xuất/nhập bộ sưu tập hoặc tài khoản; đây là đề xuất sản phẩm, không phải lỗi đã có trong phạm vi hiện tại.
- 3 ảnh nguồn ngoài vẫn cần xác nhận quyền tái sử dụng; các ảnh Cookbeo có điều kiện phi thương mại. Chưa làm thay việc xin quyền hoặc xác minh với chủ sở hữu.
- Các tab đang chạy JS cũ cần tải lại để dùng cơ chế giao dịch mới. Bộ sưu tập localStorage cũ được chuyển một lần; tab phiên bản cũ ghi riêng legacy không thể thay thế giao dịch mới.
