---
name: ui-ux-master-designer
description: "Master UI/UX design and frontend craftsmanship skill for web apps, landing pages, dashboards, and mobile views. Synthesizes knowledge from 12 elite design repositories (UI/UX Pro Max, Impeccable 61 rules, Hallmark 57 criteria, Google DESIGN.md, Emil Kowalski spring physics, GSAP, Canvas UI WebGL, Taste Skill). Use whenever the user asks to design, style, restyle, refine, animate, review, or polish user interfaces, create pages or components, or improve visual appeal and avoid AI slop."
---

# Master UI/UX Designer & Craft Engineer

Kỹ năng tối thượng dành cho AI Coding Agent trong việc kiến tạo, thẩm định và nâng cấp giao diện người dùng đạt chuẩn chất lượng bảo tàng, chắt lọc tinh hoa từ 12 kho vũ khí thiết kế quốc tế.

## 🧭 Quy Trình 5 Bước Khi Thiết Kế Giao Diện

Mỗi khi người dùng yêu cầu tạo mới hoặc sửa giao diện:

### Bước 1: Xác Định Chế Độ & Linh Hồn (Mode & Concept)
1. Xác định 1 trong 4 chế độ:
   - **Persuade**: Landing page, trang giới thiệu -> Hình ảnh lớn, CTA ấn tượng.
   - **Operate**: Bảng điều khiển, quản trị, bộ lọc -> Gọn gàng, độ tương phản cao, thao tác nhanh.
   - **Read**: Bài viết, hướng dẫn, công thức -> Tối ưu kích thước chữ, đọc êm mắt.
   - **Experience**: Thư viện ẩm thực, triển lãm -> Chuyển động mượt, không gian rộng.
2. Tìm kiếm **hình mẫu cụ thể (Specific Reference)** theo triết lý Google DESIGN.md: Tránh dùng tính từ sáo rỗng "đẹp, hiện đại, sang chọng"; hãy gắn thiết kế với một thế giới có thật (ví dụ: "Quán cà phê cổ điển Sài Gòn", "Quầy bar Izakaya Tokyo đêm mưa").

### Bước 2: Thiết Lập Hệ Thống Token Chuẩn Mực
1. Khai báo 100% màu sắc và font chữ qua biến CSS tại `:root`.
2. Tuân thủ bảng màu 60-30-10:
   - 60% Nền canvas (tránh đen tuyệt đối `#000000` hoặc trắng gắt `#ffffff`).
   - 30% Bề mặt thẻ card và thanh điều hướng (surfaces).
   - 10% Điểm nhấn (accent warm/cool) cho nút chính và trạng thái kích hoạt.
3. Đảm bảo tỷ lệ tương phản chữ WCAG AA: chữ thường ≥ 4.5:1, chữ lớn ≥ 3:1.

### Bước 3: Diệt Trừ AI Slop (Impeccable & Hallmark Bans)
- ❌ **CẤM** kicker / eyebrow label lơ lửng trên tiêu đề.
- ❌ **CẤM** card lồng bên trong card (nested cards).
- ❌ **CẤM** gradient text tím sang xanh tùy tiện.
- ❌ **CẤM** dùng icon emoji thay cho icon SVG nhất quán.
- ❌ **CẤM** `transition: all`. Không bao giờ animate `width`, `height`, `top`, `left`.
- ❌ **CẤM** `overflow: hidden` trên body; luôn dùng `overflow-x: clip`.

### Bước 4: Hoạt Ảnh Vi Mô & Vật Lý (Emil Kowalski & GSAP)
1. Thao tác hàng trăm lần/ngày (phím tắt): **0ms, không animate**.
2. Thao tác hover/click thường xuyên: **< 150ms**.
3. Modal, drawer, thông báo: **200ms – 300ms**, dùng spring physics mềm mại.
4. Tuyệt đối **không bao giờ `scale(0)`**; luôn bắt đầu từ `scale(0.95)` + `opacity: 0`.
5. Chỉ animate thuộc tính GPU: `transform` và `opacity`.
6. Luôn cung cấp fallback `@media (prefers-reduced-motion: reduce)`.

### Bước 5: Hoàn Thiện Bề Mặt Trình Duyệt (Browser Surfaces)
1. Tùy biến thanh cuộn (`scrollbar-color`) theo màu giao diện.
2. Tùy biến màu bôi đen chữ (`::selection`) và con trỏ soạn thảo (`caret-color`).
3. Đảm bảo vòng sáng bàn phím (`:focus-visible`) sắc nét, nổi bật.
4. Kiểm tra trên 3 kích thước: Mobile (375px), Tablet (768px), Desktop (1280px+).
