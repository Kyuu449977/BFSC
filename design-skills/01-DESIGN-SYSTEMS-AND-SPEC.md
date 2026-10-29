# 01. ĐẶC TẢ HỆ THỐNG THIẾT KẾ (DESIGN.MD SPECIFICATION)
> Nguồn: `google-labs-code/design.md` & `VoltAgent/awesome-design-md`

---

## 💡 Triết Lý Cốt Lõi: "Prose, Not Tokens"

Trong quá khứ, các hệ thống thiết kế thường chỉ liệt kê một danh sách cứng các mã màu HEX (`#ffffff`, `#000000`) và kích thước font (`16px`, `24px`). Điều này khiến AI tạo ra các giao diện vô hồn, chắp vá và rập khuôn.

Google DESIGN.md đưa ra triết lý đột phá:
1. **Linh hồn nằm ở lời văn (Prose)**: Đoạn văn mô tả mục đích, cảm xúc và bối cảnh sử dụng là nơi thiết kế thực sự sống. Các token sinh ra chỉ để bổ trợ cho lời văn.
2. **Hình mẫu cụ thể có giá trị hơn một chuỗi tính từ sáo rỗng**:
   - ❌ *Tránh viết*: "Trang web hiện đại, sạch sẽ, đáng tin cậy, cao cấp". (Những tính từ này mô tả một vùng chung chung vô định, khiến AI tạo ra sản phẩm trung bình, nhạt nhẽo).
   - ✅ *Hãy viết*: "Một cuốn sổ tay thực đơn quán ăn nhỏ ở phố cổ Kyoto thập niên 80. Trang giấy màu be ấm áp, mực in đen than, điểm xuyết một chút đỏ chu sa trên con dấu mộc, chữ in thanh mảnh không phô trương." -> Một câu văn duy nhất đã xác lập toàn bộ thế giới visual, từ chất liệu, độ tương phản, kiểu font cho đến màu nhấn.
3. **Giới hạn phủ định (Negative Constraints)**:
   - Khi một hình mẫu được định hình rõ ràng, các điều "CẤM" tự động xuất hiện mà không cần liệt kê dài dòng. Một cuốn sổ tay cổ điển tự khắc không có hiệu ứng phát sáng neon (glow), không có chuyển sắc tím xanh hào nhoáng (purple-blue gradient), không có card lồng card.

---

## 📐 Cấu Trúc File DESIGN.md Chuẩn Mực

Một file `DESIGN.md` chuẩn quốc tế gồm 6 phần:

````markdown
---
name: Tên Thế Giới Thiết Kế (Ví dụ: "Warm Izakaya Journal")
version: 1.0.0
---

## 1. Overview & Concept
[Mô tả hình mẫu cụ thể, đối tượng sử dụng, bối cảnh ánh sáng và cảm xúc chủ đạo]

## 2. Color System
```yaml
colors:
  surface-canvas: "#121417"
  surface-card: "#1b1f24"
  ink-primary: "#f4f6f8"
  ink-secondary: "#9aa5b1"
  accent-warm: "#f26419"
  accent-subtle: "#e5b158"
  border-hairline: "rgba(255, 255, 255, 0.08)"
```
<!-- Prose: Mô tả chính xác vai trò của từng màu -->
- **Canvas** {colors.surface-canvas}: Nền chính của cả ứng dụng, mang sắc đen than trầm ấm, không bao giờ dùng đen tuyệt đối (#000000).
- **Ink Primary** {colors.ink-primary}: Chữ tiêu đề và nội dung chính, trắng ngà ánh bạc dịu mắt cho ban đêm.
- **Accent Warm** {colors.accent-warm}: Chỉ dùng cho các hành động gọi nút bấm chính (CTA) và điểm nhấn của món ăn signature. Tuyệt đối không dùng làm màu nền cho các khung lớn.

## 3. Typography Hierarchy
```yaml
fonts:
  display: "'Cabinet Grotesk', system-ui, sans-serif"
  body: "'Be Vietnam Pro', -apple-system, sans-serif"
  mono: "'JetBrains Mono', monospace"
```
<!-- Prose: Cách dùng font -->
- **Display**: Dùng cho tên thương hiệu và tiêu đề chính. Tối đa 3.5rem. Tracking nhẹ -0.02em.
- **Body**: Đọc thoải mái ở 15-16px, line-height 1.6, độ dài một dòng tối ưu 60-70 ký tự (ch).
- **Mono**: Chỉ dùng cho giá tiền, mã đơn hàng, thông số dinh dưỡng; không dùng bừa bãi làm font trang trí.

## 4. Spacing & Spatial Rhythm
- Hệ thống bước nhảy 4px / 8px: `gap-2` (8px), `gap-4` (16px), `gap-6` (24px), `gap-8` (32px).
- **Quy tắc bất di bất dịch**: Khoảng cách bên trên một tiêu đề phải luôn lớn hơn khoảng cách bên dưới tiêu đề (để gắn chặt tiêu đề vào nội dung nó đại diện).

## 5. Elevation & Surfaces
- Một bề mặt chỉ khai báo độ nổi MỘT LẦN: Chọn **đường viền tinh tế (1px border)** HOẶC **đổ bóng mềm sâu (soft blurred shadow)**.
- Tuyệt đối cấm "ghost card" (vừa viền nổi vừa đổ bóng xù xì bọc nhau).
- Bán kính góc bo (Border Radius): Card từ 12px đến 16px. Nút dạng viên thuốc (pill) chỉ dùng cho tag hoặc action nhỏ.

## 6. Motion & Interactive Feedback
- Thời lượng chuyển động: 150ms – 250ms.
- Easing: Luôn dùng Exponential Ease-Out (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Chỉ animate 2 thuộc tính GPU: `transform` và `opacity`.
````

---

## 📚 Bộ Sưu Tập Mẫu Từ Awesome DESIGN.md

1. **Editorial Newspaper / Journal**: Chữ serif tinh tế, nền giấy ấm, đường phân cách thanh mảnh (hairline rules), tiêu đề đậm nét, trọng tâm vào chữ viết và nhiếp ảnh chất lượng cao.
2. **Swiss Grid / International Typographic**: Khung lưới bất đối xứng chuẩn xác, font Grotesk dứt khoát, mảng màu tương phản cao, trật tự thị giác rõ ràng.
3. **Japanese Modern Minimalist**: Không gian thở thoáng đãng (Ma), bảng màu đất tự nhiên (wasabi, than tre, gỗ hinoki), góc bo nhẹ nhàng, micro-interactions êm dịu.
4. **Dark Mode Craft Cockpit**: Tối giản tinh xảo, bề mặt xám chì phân tầng ánh sáng mờ, điểm nhấn dạ quang có chủ đích, số liệu monospaced sắc gọn.
5. **Vibrant Street Food Vibe**: Tràn đầy năng lượng, màu cam ấm kích thích vị giác, hình ảnh đồ ăn chiếm trọn tâm điểm, thẻ bo tròn mềm mại thân thiện.
