# Google Maps không cần API key

Website hiện dùng **link mở Google Maps trực tiếp**, theo lựa chọn không thêm phương thức thanh toán.

## Cách dùng

1. Chọn một món, chọn ba món hoặc tạo combo. Cũng có thể bấm “Tìm quán bán món này” trên thẻ gợi ý.
2. Trong màn hình kết quả, bấm **Tìm quán [tên món] trên Google Maps**.
3. Google Maps mở ở tab hoặc ứng dụng riêng với từ khóa món ăn và “gần đây”. Cho phép Google Maps sử dụng vị trí tại chính dịch vụ đó nếu bạn muốn tìm quanh vị trí hiện tại.
4. Xem địa chỉ, điểm đánh giá, ảnh/thực đơn và giá (nếu quán có cung cấp) trên Google Maps. Liên hệ quán để xác nhận món và giá.

Không cần Google Cloud project, API key, billing hay thẻ thanh toán cho tính năng link này. Xem [tài liệu Maps URLs của Google](https://developers.google.com/maps/documentation/urls/get-started).

## Điều đã thay đổi

- Website không yêu cầu GPS, không lưu hoặc gửi tọa độ.
- Không gọi `/api/places`, không tải dữ liệu Google Places hoặc hiển thị danh sách quán trong web.
- Đã tắt endpoint trả phí trên cả local Python server và Vercel Function; kể cả đặt key trong biến môi trường, route này cũng không gọi Google. `GET /api/places` trả `configured: false, mode: maps-link`; `POST` trả 410 `API_DISABLED`.
- Bộ chọn món, bộ sưu tập và offline vẫn hoạt động. Tìm kiếm quán trên Maps cần Internet.
- Các module adapter/bộ đếm API cũ được giữ trong mã nguồn để tham khảo, nhưng không được route đang chạy sử dụng để tìm quán. Không cần cấu hình chúng.

## Chạy

```sh
python server.py
```

Mở http://localhost:8080 rồi tải lại trang để nhận giao diện mới. Có thể dùng hosting static; không cần backend cho việc mở Maps.

Nếu trước đây đã tự tạo tài khoản trả phí/dịch vụ khác trong Google Cloud, chuyển website sang link Maps không tự hủy hoặc thay đổi các tài khoản/dịch vụ đó. Trong phiên này chưa có API key được cấu hình cho web.
