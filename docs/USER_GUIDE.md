# Hướng dẫn dùng Ăn Gì Đây?

## Chọn món

Chọn Món chính, Ăn vặt hoặc Đồ uống rồi bấm Chọn 1 món hoặc Chọn 3 món. Combo gồm một món chính, một món ăn vặt và một đồ uống. Món chính được chọn trong toàn bộ bốn bữa của vùng hiện hành.

Kết quả đã được xác định trước vòng quay. Bỏ qua hoặc chuyển nền sẽ kết thúc hoạt ảnh, không chọn lại món. Bộ sưu tập ghi nhận món đã được gợi ý; đánh dấu Đã ăn là thao tác riêng.

## Vùng và ngôn ngữ

Múi giờ quyết định vùng thực đơn và tiền tệ. Đổi ngôn ngữ không đổi danh mục hoặc tiền. Đổi sang vùng tiền tệ khác bỏ ngân sách cũ để tránh dùng nhầm con số. Thông tin bữa theo giờ dùng cho banner.

## Ngân sách và sở thích

Ngân sách áp dụng tổng giá thấp nhất tham khảo cho cả lượt; giá thật tại quán có thể cao hơn. Để trống để bỏ giới hạn. VND/JPY/KRW dùng số nguyên; USD/CNY dùng dấu chấm thập phân, ví dụ 12.50, và dấu phẩy phân cách nghìn, ví dụ 1,200.50.

Món ẩn bị loại khỏi lượt quay. Danh sách Món đã ẩn cho phép khôi phục và không bị ngân sách ngăn truy cập. Yêu thích không tăng xác suất. Tránh món đã ăn trong ba ngày là ưu tiên mềm; món vẫn có thể xuất hiện nếu không có lựa chọn khác phù hợp.

## Vòng tự chọn và thêm món

Vòng tự chọn nhận ít nhất hai dòng; mỗi dòng là một vé, nên dòng trùng làm tăng xác suất. Vòng này không áp dụng ngân sách/khẩu vị của danh mục. Chọn lại tiếp tục quay danh sách riêng, không chuyển về vòng chuẩn.

Form thêm món nhận ảnh tối đa 10 MiB và chuẩn hóa thành WebP. Nếu có backend hỗ trợ, món/ảnh được lưu vào danh mục chung; nếu static hosting hoặc mất kết nối, món chỉ lưu trong trình duyệt. Lỗi validation không được coi là lưu thành công. Không tự đồng bộ món local lên server.

## Giao diện và âm thanh

Trên màn hình dưới 900px, bấm nút ba gạch **Menu** ở đầu trang để mở tám công cụ. Escape hoặc chạm ra ngoài sẽ thu gọn. Thanh Gợi ý / Thực đơn / Bộ sưu tập phía dưới vẫn dùng trực tiếp. Trên desktop, các công cụ hiển thị sẵn.

Menu mở thành bảng xổ nổi ngay dưới header, mỗi chức năng một hàng dọc có icon và nhãn. Bảng đè lên nội dung thay vì làm trang dài thêm hoặc đẩy banner/nút quay xuống, có cuộn riêng khi màn hình thấp.

Hai banner dọc được đặt trong vùng tài trợ sau thực đơn trên điện thoại/tablet, không che nút quay. Chúng giữ kích thước gốc; màn hình nhỏ sẽ xếp dọc. Khi gần vùng tài trợ, mỗi banner mới tải một lần; quay lại không tải lại quảng cáo. Quảng cáo bị chặn hoặc lỗi không ngăn sử dụng website.

Chọn bảng màu hoặc màu tùy chọn, cùng chế độ Sáng/Tối/Theo thiết bị/Tự động theo thời gian. Màu tương tác có thể được điều chỉnh từ màu bạn chọn để bảo đảm chữ dễ đọc. Các tùy chọn được giữ khi reload nếu trình duyệt cho lưu.

Âm thanh chỉ khởi tạo sau tương tác được trình duyệt cho phép. Có nút nhạc nền và mute. Chuyển nền dừng tiếng; reduced motion bỏ hoạt ảnh quay.

## Offline, cập nhật và Maps

Lần tải online chuẩn bị app shell và tài nguyên offline. Trạng thái footer phân biệt shell sẵn sàng với ảnh/font còn thiếu. Có bản mới thì bấm Cập nhật sau khi hoàn tất lượt quay hoặc form. Không phải mọi ảnh đều đã lưu chỉ vì đang online.

Tìm quán mở Google Maps theo tên món. Website không xin GPS; đánh giá, vị trí và chỉ đường được xem tại Google Maps. Tính năng này cần mạng.

Ảnh có nguồn hoặc giấy phép chưa được rà đủ sẽ hiển thị placeholder có chú thích. Các file gốc và món vẫn được giữ.

Bộ sưu tập/sở thích chủ yếu nằm trong trình duyệt; xóa dữ liệu trang có thể xóa chúng. Đổi thiết bị hoặc origin không tự chuyển dữ liệu. Hướng dẫn chạy và kiểm thử nằm ở README gốc.
