# Tester 4 — BFSC ngân sách (2026-10-29)

## Môi trường
- URL: https://bfsc.netlify.app/; Chrome tab riêng “🧪 BFSC ngân sách”.
- WARP vẫn Connected; IP mới xác nhận: 104.28.210.150 (baseline 171.250.165.90). Quốc gia chưa xác minh.
- Không đổi timezone, ngôn ngữ, giao diện; không chủ ý bấm quảng cáo.

## Kết quả
- Chọn nhanh 50.000đ: UI xác nhận 50.000đ/lượt, 9 món phù hợp; 1 món có thể chọn từ 30.000đ; 3 món cần ít nhất 100.000đ nên nút bị disable; combo có thể chọn từ 43.000đ.
- “Chọn 1 món” chạy thành công: Cháo lòng bánh hỏi. Dialog báo tổng từ 35.000đ, còn 15.000đ.
- “Tạo combo” chạy thành công: Miến gà đồi nấm hương + Bánh cam · Bánh tiêu + Trà đá vỉa hè; tổng tối thiểu 48.000đ, còn 2.000đ. UI ghi rõ đây là giá tối thiểu và giá thực tế có thể cao hơn.
- “Cơm & xôi”: chọn được trong sở thích, nhưng ở ngân sách 50.000đ UI báo 0 món phù hợp và disable lựa chọn. Danh sách đang hiện Xôi xéo 25.000đ (Buổi Sáng), nên cần xem lại mapping sở thích/danh mục; chưa xác nhận được Xôi xéo có thuộc nhóm món chính mà bộ chọn dùng hay không.
- “Bỏ lọc khẩu vị” reset thành “Món nào cũng được” và khôi phục 9 món phù hợp.

## Quan sát phụ
- Sau tương tác mở bảng ngân sách, trạng thái nhạc nền đổi từ “Bật nhạc nền” (0) sang “Tắt nhạc nền” (1). Tôi đã bấm lại đúng control; AX xác nhận “Đã tắt nhạc nền” (0), khôi phục trạng thái ban đầu.
- Việc chọn kết quả tăng bộ sưu tập từ 21 lên 23/113; UI mô tả đây là món đã gợi ý, không phải món đã ăn.

## Evidence
- Screenshot JPEG: [tester4-budget.jpg](tester4-budget.jpg)
