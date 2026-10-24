# Kiến trúc và quy tắc bảo trì

## Frontend

Các script ứng dụng là JavaScript thuần, nạp bằng `defer` theo thứ tự ở `src/index.html`. Riêng `theme-init.js` được nạp đồng bộ trước CSS để khôi phục màu và sáng/tối từ localStorage trước khi hiển thị nội dung; dùng chung trên cả trang thông tin.

- `data.js`: danh mục món và các mốc buổi theo giờ thiết bị.
- `dish-preferences.js`: sở thích theo tên món, localStorage tách thuộc tính, món ẩn và đánh dấu ăn gần đây; không đụng bộ sưu tập.
- `gacha.js`: tạo phương án hợp lệ, tính ngân sách, giảm lặp, công bố kết quả.
- `collection.js`: IndexedDB và chuyển dữ liệu bộ sưu tập cũ.
- `app.js`: kết nối DOM, trạng thái UI và các luồng sử dụng; chia 10 phần có tiêu đề.
- `animation.js`: dải quay không trùng hai thẻ liền nhau.
- `controls.js`: dropdown riêng (combobox/listbox), đồng bộ select nguồn, accordion có chuyển động; giữ semantics và giá trị form.
- `experience.js`: chuyển động, phản hồi nhấn và giảm chuyển động.
- `audio.js`: âm thanh ngắn, tắt tiếng và ngừng khi chuyển nền.
- `ui.js`: icon, ảnh lỗi, chia sẻ và cài PWA.
- `nearby.js`: liên kết Google Maps.

## CSS và build

Nguồn CSS được ghép **đúng thứ tự** `base.css` → `interactions.css` → `mobile.css` → `refinements.css` → `themes.css` thành một `/style.css`. Không có `@import` gây thêm lượt tải. `base.css` chứa thành phần nền và quy tắc responsive ban đầu; `mobile.css` chứa bố cục mobile chi tiết, `refinements.css` chứa tinh chỉnh thị giác, `themes.css` chứa sáng/tối và màu người dùng.

`python build_public.py` gọi `scripts/build_public.py`. Danh sách file xuất bản và ánh xạ nguồn nằm ở `scripts/public_files.py`. `/app.js` lấy từ `src/js/app.js`, `/style.css` được ghép từ `src/styles/`; các URL ảnh và tài nguyên giữ nguyên. Vì vậy không chạy server tĩnh trực tiếp từ `src/` hoặc gốc repository.

Chỉ `public/` là đầu ra website. Build xóa file cũ không còn trong danh sách tại đầu ra, không đụng nguồn. Không sửa file trong `public/`. Thêm tài nguyên mới phải cập nhật danh sách xuất bản và cache ở `src/sw.js`, tăng phiên bản cache khi thay đổi tài nguyên.

## Backend

Các file ở gốc chỉ là entry point. `backend/server.py` phục vụ danh sách public cho phép, API thông tin máy chủ và các header bảo vệ. `backend/run_server.py` dùng lại cùng máy chủ cho tunnel. Adapter Places được giữ để tương thích và kiểm thử; endpoint trả phí vẫn bị vô hiệu hóa. Dữ liệu riêng tại `backend/data/` không được xuất bản. Ngân sách API cũ vẫn dùng `.private/` tại gốc để không vô tình đổi vị trí sổ theo dõi.

## Lưu trữ và kiểm thử

Không đổi origin, URL công khai, khóa localStorage/sessionStorage hay tên IndexedDB khi sắp xếp file. Dữ liệu người dùng tiếp tục được giữ. Kiểm thử Node đọc `src/`, kiểm thử trình duyệt phục vụ `public/`, Python kiểm tra máy chủ và chính sách xuất bản. Dùng build trước browser test.

`archive/` giữ công cụ một lần, ảnh JPG/SVG cũ và tài liệu nghiên cứu không còn là đầu vào build. Không chạy lại chúng theo hướng dẫn hiện tại. `artifacts/` chỉ là ảnh chụp, log và kết quả kiểm thử. Cả hai được bỏ qua trong Git và không phục vụ qua web.
