# 06. HOẠT ẢNH VI MÔ & VẬT LÝ CHUYỂN ĐỘNG (MICRO-INTERACTIONS & MOTION PHYSICS)
> Nguồn: `emilkowalski/skills` - Triết lý chuyển động của Emil Kowalski (Tác giả thư viện Sonner, Kỹ sư thiết kế tương tác tại Vercel & Linear)

---

## ⚡ 4 Cấp Độ Tần Suất: "Cái Này Có Nên Animate Không?"

Lỗi phổ biến nhất khi làm hiệu ứng là: **Thêm chuyển động vào những thứ không nên chuyển động**.

| Tần Suất Sử Dụng | Quyết Định Chuyển Động | Ví Dụ Điển Hình |
| :--- | :--- | :--- |
| **100+ lần/ngày** (Thao tác cực kỳ thường xuyên) | **TUYỆT ĐỐI KHÔNG ANIMATE**. Mở/đóng tức thì trong 0ms. | Phím tắt bàn phím, Command Palette (Raycast/Spotlight), gõ phím, chuyển tab nhanh. |
| **Hàng chục lần/ngày** (Thường xuyên) | **Gần như vô hình** (Dưới 150ms, siêu nhẹ hoặc không làm). | Hiệu ứng rê chuột (hover), đổi màu nút bấm, chọn mục trong danh sách. |
| **Thỉnh thoảng** (Vài lần trong một phiên) | **Hoạt ảnh tiêu chuẩn** (200ms – 300ms, Spring physics mềm). | Mở Modal hộp thoại, mở Drawer trượt từ cạnh, Toast thông báo nổi lên. |
| **Hiếm khi / Lần đầu** (Cột mốc đặc biệt) | **Ngân sách dành cho Sự Thích Thú (Delight Budget)** (400ms – 600ms). | Màn hình chúc mừng (Confetti khi quay trúng món ngon), Onboarding lần đầu, mở huy hiệu bí mật. |

---

## 📐 5 Quy Tắc Vàng Về Hoạt Ảnh (Golden Rules)

### 1. Tuyệt Đối CẤM `scale(0)`
- Trong thế giới thực, không có vật thể nào phóng to từ hư vô kích thước số 0. Hiệu ứng phóng to từ 0 (`scale(0) -> scale(1)`) nhìn cực kỳ giả tạo và thô thiển.
- **Quy chuẩn đúng**: Bắt đầu từ `scale(0.95)` hoặc `scale(0.97)` kết hợp với `opacity: 0`. Cảm giác xuất hiện sẽ mềm mại, tinh tế như một lớp kính nổi lên.

### 2. Chỉ Animate Thuộc Tính Phần Cứng GPU (`transform` & `opacity`)
- `transform` và `opacity` chạy trực tiếp trên card đồ họa (GPU Composite), không bao giờ gây giật lag trình duyệt.
- **CẤM animate các thuộc tính kích thước**: `width`, `height`, `margin`, `padding`, `top`, `left` vì chúng ép trình duyệt phải tính toán lại toàn bộ bố cục (Layout Reflow & Repaint).

### 3. Gốc Biến Đổi (`transform-origin`) Phải Nằm Tại Nút Kích Hoạt
- Đối với Tooltip, Menu thả xuống, Popover: Gốc biến đổi phải bắt đầu ngay tại vị trí con trỏ chuột hoặc nút bấm vừa ấn, tạo cảm giác mầm sống nảy nở từ chính điểm chạm.
- Riêng Modal hộp thoại thì đặt ở giữa màn hình (`transform-origin: center`).

### 4. Luôn Dùng Đường Cong Giảm Tốc (Exponential Ease-Out)
- Hiệu ứng xuất hiện phải **bắt đầu nhanh và phanh từ từ** để người dùng không phải chờ đợi.
- Công thức CSS Easing chuẩn mực:
  ```css
  /* Ease-Out mềm mại tự nhiên */
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  ```
- Không bao giờ dùng `ease-in` cho các chuyển động xuất hiện vào màn hình (bắt đầu chậm chạp khiến giao diện cảm giác bị ì ạch).

### 5. Tương Thích `prefers-reduced-motion`
Mọi chuyển động đều phải tắt ngay lập tức nếu người dùng cài đặt giảm chuyển động trên hệ điều hành:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🧮 Bảng Thông Số Lò Xo Vật Lý Chuẩn (Spring Presets)

Khi dùng thư viện chuyển động (Motion / Framer Motion / GSAP):

| Mục Đích | Độ Cứng (Stiffness) | Độ Giảm Chấn (Damping) | Khối Lượng (Mass) | Cảm Giác Đem Lại |
| :--- | :---: | :---: | :---: | :--- |
| **Snappy (Nút bấm, Toggle)** | 400 | 30 | 0.8 | Nhanh, dứt khoát, phản hồi tức thì |
| **Gentle (Modal, Drawer, Menu)** | 250 | 25 | 1.0 | Êm ái, thanh lịch, sang trọng |
| **Bouncy (Thành tựu, Quay thưởng)** | 300 | 18 | 1.0 | Có độ nảy nhẹ, vui tươi, phấn khích |
| **Subtle (Hover card món ăn)** | 200 | 20 | 0.5 | Nổi nhẹ nhàng, tinh tế |
