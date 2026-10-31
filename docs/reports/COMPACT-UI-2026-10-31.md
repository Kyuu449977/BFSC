# Thu gọn giao diện — 31/10/2026

Đã gom tiêu đề thực đơn, bộ sưu tập và thêm món; giảm đệm card và khoảng cách các hàng. Cài đặt dùng hàng nhãn–nút trên desktop và xếp dọc theo nội dung trên điện thoại. Món gợi ý mobile dùng ảnh cạnh thông tin. Giữ ảnh 4:3, vùng bấm, ID/hook và logic hiện có. Cache v42; chưa deploy.

Kiểm chứng: build thành công; 45 JS tests; 50 bố cục và 12 bảng màu; các luồng chọn một/ba món/combo, vòng tự chọn, kho món, biểu mẫu không ghi máy chủ, cài đặt và zoom 200%; phân trang 390/1440 và lịch sử; controls bàn phím/dropdown; PWA/offline. Không pageerror trong bộ nghiệm thu. git diff --check sạch.

## Nghiệm thu bổ sung

Đã gom số món và liên kết quay về cùng hàng trên desktop; mobile tự xuống hàng. Sửa tiêu đề mobile bị ép giữa các nút: tiêu đề có toàn bộ chiều ngang, các nút ở hàng sau. Không đổi ID, API hoặc dữ liệu.

| Tiêu chí định lượng ở 1440px | Trước | Sau | Giảm | Kết quả |
|---|---:|---:|---:|---|
| Từ đầu khu vực thực đơn đến card đầu tiên | 434,19px | 284,59px | 34,45% | Đạt >=25% |
| Chiều cao cài đặt mặc định | 658,89px | 463,39px | 29,67% | Đạt >=20% |

Baseline được dựng lại từ DOM/CSS trước thu gọn đã đọc trong phiên, không phải bản build cũ lưu nguyên vẹn. Chỉ so sánh hai khu vực nêu trên, cùng font, dữ liệu, viewport và điều kiện chặn quảng cáo ngoài. Các tỷ lệ không đại diện tất cả ngôn ngữ/thiết bị.

Lệnh kiểm chứng bổ sung: `node tests/compact-ui-browser.cjs`. Đạt 25 tổ hợp 5 kích thước × 5 ngôn ngữ cho thực đơn/cài đặt, không tràn ngang; tiêu đề mobile đủ chiều rộng; tìm kiếm không kết quả và khôi phục; 12 card. Đã chạy lại redesign (50 bố cục, 12 bảng màu, các luồng), phân trang và PWA sau thay đổi; không pageerror. Không ghi món thử lên máy chủ.

Ảnh trước/sau desktop: `artifacts/compact-ui/menu-before-1440.png`, `menu-after-1440.png`, `settings-before-1440.png`, `settings-after-1440.png`. Mobile: `menu-after-390.png`. Số đo và ma trận: `artifacts/compact-ui/acceptance.json`. Ảnh trang chính/kết quả và cài đặt theo sáng/tối tiếp tục nằm tại `artifacts/redesign/`.

Giữ các hộp kết quả, kho món và biểu mẫu vốn có cơ chế cuộn/nút hành động; không ép chúng vào chiều cao nhỏ cố định. Kiểm tra lại các luồng tương tác thay vì thu nhỏ mọi hộp đồng loạt. Chưa kiểm tra thiết bị vật lý hoặc quảng cáo production; chưa deploy.
