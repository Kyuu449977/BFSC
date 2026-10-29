# 02. HƯỚNG DẪN UI/UX PRO MAX (192 QUY TẮC & 79 PHONG CÁCH)
> Nguồn: `nextlevelbuilder/ui-ux-pro-max-skill` (Hỗ trợ song ngữ & tiếng Việt chính thức)

---

## 🎯 4 Chế Độ Trải Nghiệm Người Dùng (Modes)

Trước khi viết bất kỳ dòng mã HTML/CSS nào, phải xác định giao diện thuộc chế độ nào:

| Chế Độ | Mục Tiêu Người Dùng | Loại Giao Diện Phù Hợp | Trọng Tâm Thiết Kế |
| :--- | :--- | :--- | :--- |
| **Persuade** | Thuyết phục hành động (mua hàng, đăng ký) | Landing Page, Bán hàng, Giới thiệu sản phẩm | Hình ảnh ấn tượng, CTA nổi bật, social proof chân thực |
| **Operate** | Hoàn thành tác vụ công việc nhanh chóng | Dashboard, Admin, Bảng điều khiển, Công cụ lọc | Quét thông tin nhanh, độ tương phản cao, thao tác bàn phím, bảng dữ liệu chuẩn |
| **Read** | Tiếp nhận và thấu hiểu tri thức | Tài liệu hướng dẫn, Blog, Báo cáo, Công thức món ăn | Tối ưu cỡ chữ đọc, khoảng cách dòng thoáng, độ rộng cột 65-75 ký tự |
| **Experience** | Đắm chìm vào tác phẩm nghệ thuật | Thư viện ẩm thực, Portfolio, 3D Showcase | Khung hình lớn, chuyển động mượt mà, giao diện lùi lại làm nền |

---

## 🎨 79 Phong Cách Thiết Kế Tiêu Biểu

UI/UX Pro Max cung cấp 79 phong cách đã được hệ thống hóa, chia thành các nhóm chính:

### 1. Nhóm Tối Giản & Hiện Đại (Modern & Minimal)
- **Swiss Style**: Dựa trên lưới toán học, font Helvetica/Grotesk dứt khoát, phân cấp thứ bậc hoàn hảo.
- **Apple Minimalist**: Nền trắng sáng hoặc xám bạc, viền cực mảnh, góc bo chuẩn mực `12px - 20px`, bóng đổ tán rộng siêu mịn.
- **Scandinavian Soft**: Tông màu pastel nhẹ, gỗ sáng, cảm giác ấm cúng, thư thái.

### 2. Nhóm Đậm Cá Tính (Bold & Expressive)
- **Neobrutalism**: Viền đen đậm `2px - 3px`, bóng đen cứng góc 90 độ hoặc 45 độ, màu sắc bão hòa mạnh, nút bấm nổi khối cơ học.
- **Cyberpunk / Futuristic**: Tông màu tối sâu, ánh sáng neon tím/cyan, các đường cắt góc vát (chamfered corners).
- **Retro / Vintage / Kissaten**: Giấy cũ ngả vàng, font serif cổ điển, viền đứt nét hoặc dập nổi, tông nâu đất và cam cháy.

### 3. Nhóm Ẩm Thực & Đời Sống (Food & Lifestyle - Áp dụng xuất sắc cho app "Ăn Gì Đây?")
- **Warm Gourmet**: Nền tối ấm hoặc màu kem bơ, ảnh món ăn có độ bão hòa cao và ánh sáng ven (rim light), điểm nhấn màu cam nghệ hoặc đỏ rượu vang kích thích vị giác.
- **Street Food Energy**: Trẻ trung, rực rỡ, sử dụng các huy hiệu (badges) vui tươi, font chữ có độ bo mềm, tạo cảm giác gần gũi, thèm ăn ngay tức thì.

---

## 🧠 Các Quy Tắc Suy Luận Vàng (Gold Reasoning Rules)

### 1. Quy tắc Phối Màu 60 - 30 - 10
- **60% Màu Chủ Đạo (Dominant)**: Nền trang và không gian trống (Canvas/Background).
- **30% Màu Thứ Cấp (Secondary)**: Thẻ card, thanh điều hướng, bảng biểu (Surfaces & Containers).
- **10% Màu Điểm Nhấn (Accent)**: Nút hành động chính (Primary CTA), trạng thái kích hoạt (Active tab), giá trị nổi bật nhất.

### 2. Quy tắc Khả Năng Tiếp Cận (Accessibility & Contrast)
- Tỷ lệ tương phản chữ thường trên nền phải luôn đạt tối thiểu **4.5:1** (WCAG AA).
- Tỷ lệ tương phản chữ lớn (trên 24px hoặc đậm trên 18.5px) tối thiểu **3.0:1**.
- Trong chế độ tối (Dark Mode), chữ phụ (secondary text) phải pha một chút sắc thái của màu nền, không bao giờ dùng xám xịt nguyên chất `#888888`.

### 3. Bố Cục Thích Ứng (Responsive Patterns)
- **Mobile First**: Luôn đảm bảo vùng chạm của ngón tay (Touch Target) tối thiểu **44x44px** hoặc **48x48px**.
- Thanh điều hướng trên di động nên đặt ở đáy màn hình (Bottom Navigation Bar) để ngón tay cái dễ bấm.
- Lưới sản phẩm: Di động 1 hoặc 2 cột; Máy tính bảng 2 hoặc 3 cột; Máy tính bàn 4 cột (tối đa 1200px - 1440px có căn giữa).

### 4. Quy tắc Tránh Lỗi Phổ Biến
- Không bao giờ đặt hai nút hành động chính (Primary Button) cạnh nhau. Một nút là Primary, nút còn lại phải là Secondary (Outline hoặc Ghost).
- Báo lỗi phải đi kèm cách khắc phục (Ví dụ: Thay vì "Lỗi", hãy ghi "Không tìm thấy món ăn phù hợp với bộ lọc, hãy thử bỏ bớt tiêu chí").
- Trạng thái trống (Empty State) phải có hình minh họa hoặc icon thân thiện, kèm theo gợi ý hành động cụ thể.
