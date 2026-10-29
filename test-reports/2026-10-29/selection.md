# Báo cáo kiểm thử BFSC — chọn món, combo, ngân sách và sở thích

- **Ngày:** 2026-10-29
- **URL:** https://bfsc.netlify.app/
- **Cách kiểm thử:** thao tác bằng giao diện trong một tab IAB riêng; không dùng fetch, shell hay mã nguồn để tương tác với website; không click quảng cáo.
- **Kết luận:** các luồng chọn món và combo hoạt động. Ngân sách 50.000đ giới hạn đúng luồng 3 món và vẫn cho phép luồng 1 món. Không xác nhận được kết quả bộ lọc sở thích do trạng thái dùng chung bị tab khác thay đổi trong lúc thử.

## Kết quả đã xác nhận

### Chọn 1 món — PASS

1. Nhấn **Chọn 1 món**.
2. Màn hình hoạt ảnh hiện **Đang tìm món ngon…** và nút **Bỏ qua**.
3. Nhấn **Bỏ qua** để tới kết quả.

**Actual:** một món được trả về (lượt đầu: **Ốc hương xào bơ tỏi**); kết quả có giá ước tính, mô tả, tùy chọn yêu thích/đã ăn/ẩn món và tìm quán. Bộ sưu tập tăng từ 0 lên 1 món sau khi chọn xong.

**Expected:** hiện đúng một kết quả và các thao tác cho món đó. Đạt.

### Chọn 3 món — PASS

1. Đóng kết quả trước, nhấn **Chọn 3 món**.
2. Nhấn **Bỏ qua** trong hoạt ảnh.

**Actual:** hiện đúng 3 món: **Bò né hoa thiên lý**, **Cháo sườn sụn non**, **Lẩu bò nhúng giấm**. Kết quả có giá từng món và các liên kết tìm quán.

**Expected:** hiện ba gợi ý. Đạt.

### Tạo combo — PASS

1. Đóng kết quả trước, nhấn **Tạo combo**.
2. Nhấn **Bỏ qua** trong hoạt ảnh.

**Actual:** combo có đủ ba nhóm được mô tả trong giao diện: món chính (**Mì gà quay da giòn**), ăn vặt (**Bánh cam · Bánh tiêu**) và đồ uống (**Trà Lài Kem Cheese**).

**Expected:** combo gồm món chính + ăn vặt + đồ uống. Đạt.

### Ngân sách nhanh 50.000đ — PASS

1. Mở **Ngân sách & sở thích**.
2. Chọn ngân sách nhanh **50.000đ**.
3. Kiểm tra trạng thái nút và chọn 1 món.

**Actual:** giao diện báo 1 món khả dụng từ 30.000đ; 3 món cần ít nhất 100.000đ và nút **Chọn 3 món** bị vô hiệu hóa; combo vẫn khả dụng từ 43.000đ. Kết quả 1 món có **Tổng giá từ 40.000đ**, **ngân sách 50.000đ**, còn từ **10.000đ**; món hiển thị giá ước tính 50.000đ và ghi giá thực tế có thể thay đổi.

**Expected:** áp ngân sách cho từng lượt chọn và khóa lượt 3 món khi tối thiểu vượt mức. Đạt. Giao diện giải thích tổng dùng giá thấp nhất trong khoảng tham khảo, nên không coi khác biệt giữa tổng tối thiểu và giá ước tính của món là lỗi xác nhận.

## Sở thích — chưa kết luận

Danh sách sở thích hiển thị các lựa chọn **Món nào cũng được**, **Cơm & xôi**, **Món nước**, **Ăn nhẹ**, **Cay**, **Thanh đạm**. Khi chọn **Món nước** và **Cơm & xôi**, giao diện có lúc báo không có món và khóa các nút. Tuy nhiên trạng thái giá/ngân sách/ngôn ngữ/múi giờ thay đổi giữa các lần chụp mà tôi không thao tác, phù hợp với việc nhiều tab kiểm thử dùng chung storage. Vì vậy đây **không phải lỗi được xác nhận**; cần chạy lại riêng sau khi môi trường không còn bị các tab khác ghi đè.

## Bằng chứng và phạm vi

- Bằng chứng quan sát được trong trace giao diện: modal kết quả 1 món, modal 3 món, modal combo, và modal ngân sách 50.000đ với tổng tối thiểu 40.000đ.
- Không lưu ảnh JPG riêng vì chưa có lỗi trong phạm vi này được xác nhận.
- Không thay đổi VPN/network và không click quảng cáo có chủ ý.
