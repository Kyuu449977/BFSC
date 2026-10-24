# Khẩu vị và danh sách cá nhân — 24/10/2026

## Hành vi

Bổ sung chọn kiểu món chính Cơm & xôi, Món nước, Ăn nhẹ, Cay, Thanh đạm trong Ngân sách & sở thích. Tags được khai báo trong dữ liệu; không suy ra dị ứng hoặc dinh dưỡng. Áp dụng trong 1/3 món chính và phần chính của combo, giữ nguyên các điều kiện giá/đủ nhóm. Không còn phương án thì khóa nút và cho phép bỏ bộ lọc, không chọn món ngoài điều kiện.

Chi tiết món có Yêu thích, Đánh dấu đã ăn và Không thích/Ẩn món. Các món cùng tên ở nhiều buổi dùng chung trạng thái. Tất cả độc lập với bộ sưu tập khám phá: xem chi tiết hoặc đánh dấu không cộng số lần gợi ý. Yêu thích không thay đổi trọng số random. Đã ăn lưu lần đánh dấu gần nhất, có thể bỏ đánh dấu. Món ẩn bị loại từ mọi pool quay, có danh sách riêng và nút khôi phục; danh sách ẩn bỏ qua ngân sách để không mắc kẹt khi phục hồi.

Ưu tiên tránh đã ăn 3 ngày là tùy chọn tắt mặc định; khi bật, chọn các phương án hợp ngân sách ít món đã ăn gần đây nhất trước khi xét độ lặp phiên. Món đã ăn vẫn có thể xuất hiện nếu chỉ còn những phương án đó. Không thể ưu tiên mà vượt ngân sách hoặc lén chọn món ẩn.

Sở thích dùng localStorage tách khóa theo thuộc tính, đồng bộ tab và hoãn áp dụng khi đang quay. Chặn lưu vẫn dùng trong bộ nhớ và có thông báo. Không thêm API, tài khoản hoặc đồng bộ Google. Cache v21 thêm module dish-preferences.js.

## Kiểm chứng

25 Node tests, 19 Python tests, browser/offline, budget, personal-browser, mobile compact 8 kích thước và theme đều đạt. Kiểm tra gồm lưu/reload, cross-tab, canonical cùng tên khác buổi, dữ liệu hỏng/bị chặn, ẩn hết không fallback, ưu tiên ăn gần đây, combo đúng nhóm/giá, giữ bộ sưu tập, dialog và focus. Prettier và git diff --check đạt. Chưa kiểm thử trên thiết bị vật lý.
