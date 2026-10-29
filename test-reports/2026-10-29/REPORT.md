# Báo cáo kiểm thử BFSC — 29/10/2026

Website: https://bfsc.netlify.app/

Thực hiện: 3 tester GPT-6 Luna, reasoning max; manager rà soát kết luận và trực tiếp tái hiện lỗi giao diện. Thao tác website qua Computer Use trong in-app browser, không dùng mã nguồn hay gọi API để thay tương tác người dùng. Đây là lượt smoke test, không phải chứng nhận toàn bộ website.

## Lỗi đã xác nhận

### BFSC-01 — P2: Chế độ Light làm nội dung thẻ món khó đọc

- Bước tái hiện: mở trang chính → Appearance & Settings → Light → Done. Manager đối chiếu Dark → Done trên cùng tab.
- Mong đợi: tên món và mô tả tương phản rõ với nền thẻ trong cả hai chế độ.
- Thực tế: Light có thẻ trắng/kem nhưng tên món gần trắng, mô tả rất nhạt; một số nút cũng khó đọc. Dark hiển thị thẻ tối, chữ đọc được.
- Bằng chứng: reviewer-light.jpg và reviewer-dark.jpg trong thư mục này. Ảnh Light được chụp khi trạng thái gợi ý đã chuyển thành No matching dishes; ảnh reviewer-home.jpg còn cho thấy tên món thực tế bị nhạt trên thẻ trắng.
- Gợi ý kiểm tra khi fix (chưa xác minh mã nguồn): màu chữ/nền của featured card và các biến màu theo brightness; kiểm tra cả trạng thái có món và không có kết quả.

### BFSC-02 — P2: English chưa dịch đầy đủ nội dung và nhãn trợ năng

- Bước tái hiện: chọn English → Done → xem footer, mở Open Source Credits; kiểm tra tên truy cập của các nhóm điều khiển.
- Mong đợi: nội dung và nhãn điều khiển theo ngôn ngữ đã chọn.
- Thực tế: footer còn “Offline chưa khả dụng trên trình duyệt này.”; Credits còn các đoạn tiếng Việt; một số nhãn như “Danh mục món ăn”, “Chọn món”, “Lọc thực đơn” và alt ảnh vẫn tiếng Việt.
- Không coi tên thương hiệu hoặc tên món tiếng Việt tự thân là lỗi.
- Gợi ý fix: rà soát các chuỗi hard-code, aria-label và thông báo trạng thái theo locale.

## Luồng chạy được trong lượt thử

- Chọn 1 món, chọn 3 món, combo món chính + ăn vặt + đồ uống.
- Ngân sách nhanh 50.000đ: vẫn chọn được 1 món, khóa lượt 3 món khi tổng tối thiểu vượt ngân sách.
- Mở chi tiết món và thêm yêu thích.
- Các trang Privacy, Terms, Credits tải được.
- Chọn US-CA đổi giờ/buổi ăn và bộ thực đơn Mỹ với ký hiệu USD.

## Chưa kết luận và giới hạn

- **Chưa kiểm thử đa quốc gia bằng IP/VPN thực.** Máy liệt kê Cloudflare One Client nhưng khi mở không có cửa sổ điều khiển có thể thao tác; không thấy VPN khác sẵn dùng. Không đổi IP thành công và không xác minh quốc gia IP. Cài đặt US-CA trong website không thay thế kiểm thử này.
- Các tab dùng chung browser storage; ngân sách, sở thích, ngôn ngữ và khu vực bị ảnh hưởng bởi thao tác đồng thời. Vì vậy không xác nhận lỗi từ các thay đổi này.
- Tìm “phở” có kết quả Cao lầu và một số món/đồ uống khác: cần kiểm tra quy tắc dò từ khóa trước khi coi là lỗi relevance.
- Bộ lọc thực đơn, Xem thêm và sở thích cần chạy lại trong phiên tách biệt; lần thử hiện tại chưa đủ bằng chứng để kết luận pass/fail.
- Không ghi nhận tab quảng cáo phát sinh trong các luồng được báo cáo; không kiểm chứng cơ chế quảng cáo theo từng quốc gia.
- Chưa kiểm thử mobile/responsive, trình duyệt khác, offline thực hoặc chất lượng âm thanh.

## Báo cáo tester

- selection.md: chọn món, combo, ngân sách và sở thích.
- menu.md: tìm kiếm, chi tiết, yêu thích và các nghi vấn cần thử lại.
- locale.md: ngôn ngữ, khu vực, giao diện và footer.

Ưu tiên sửa BFSC-01, sau đó BFSC-02. Chạy lại nhóm bộ lọc trong phiên riêng và bổ sung ma trận quốc gia/IP khi có VPN chọn được quốc gia.
