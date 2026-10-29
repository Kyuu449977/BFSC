# 03. IMPECCABLE: 24 LỆNH & 61 QUY TẮC SÀN CHẤT LƯỢNG (CRAFT FLOOR)
> Nguồn: `pbakaus/impeccable` - Bộ tiêu chuẩn thanh lọc "AI Slop" hàng đầu thế giới của Peter Bakaus

---

## 🚫 Danh Sách Những Thứ BỊ CẤM HOÀN TOÀN (Absolute Bans)

Đây là những thói quen xấu phổ biến mà các AI thường vô thức tạo ra khi không có sự kiểm soát:

1. ❌ **CẤM Kicker / Eyebrow text**: Không bao giờ đặt một thẻ nhãn nhỏ chữ in hoa có khoảng cách rộng lơ lửng bên trên tiêu đề chính (ví dụ: `FEATURES`, `WHAT WE DO`). Hãy xóa bỏ thẻ nhãn đó và để bản thân tiêu đề nói lên sức nặng của nó.
2. ❌ **CẤM Card lồng bên trong Card (Nested Cards)**: Thẻ bao ngoài đã là một vùng chứa; đặt thêm thẻ con bên trong tạo ra cảm giác lộn xộn, vụng về và thiếu phân cấp.
3. ❌ **CẤM Gradient Text tùy tiện**: Chữ chuyển màu tím sang xanh (purple-to-blue gradient) là dấu hiệu kinh điển của giao diện AI rẻ tiền. Độ nhấn mạnh của tiêu đề phải đến từ độ đậm (font-weight), kích thước (font-size) hoặc màu đơn sắc tương phản cao.
4. ❌ **CẤM Emoji đóng giả làm Icon hệ thống**: Không dùng icon emoji (`🍔`, `🍣`, `🍕`) cho các điều hướng hoặc tính năng trang trọng; phải dùng bộ icon vector SVG thống nhất về nét vẽ (stroke-width) và phong cách (Lucide, Heroicons).
5. ❌ **CẤM Đổ bóng khối cứng không căn cứ (`4px 4px 0`)**: Trừ khi toàn bộ website theo đuổi phong cách Neobrutalism có chủ đích, còn lại không bao giờ dùng bóng cứng không làm nhòe.
6. ❌ **CẤM Kính mờ và viền màu lòe loẹt bừa bãi**: `backdrop-filter: blur()` và viền `border-left: 4px solid ...` trên thẻ alert chỉ được dùng khi có mục đích phân cấp rõ ràng, không dùng làm đồ trang trí chung.

---

## 💎 Sàn Chất Lượng Thiết Kế (The Craft Floor)

Một sản phẩm được coi là đạt chuẩn thủ công đỉnh cao (Out-of-Distribution Craft) khi thỏa mãn trọn vẹn các tiêu chí sau:

### 1. Phân Cấp Thị Giác & Khoảng Trắng (Hierarchy & Spacing)
- **Nhóm chặt, tách rộng (Tight groups, generous separation)**: Các thành phần có liên quan mật thiết (tiêu đề + mô tả) phải nằm sát nhau; các khối độc lập phải cách nhau một khoảng lớn rõ rệt.
- **Quy tắc tiêu đề**: Khoảng cách từ tiêu đề lên trên nội dung phía trước PHẢI LUÔN LỚN HƠN khoảng cách từ tiêu đề xuống đoạn văn của chính nó.

### 2. Định Dạng Bề Mặt Trình Duyệt (Browser Surfaces Theming)
Một chi tiết mà 99% các lập trình viên và AI bỏ quên:
- **Tùy biến thanh cuộn (Custom Scrollbar)**: Bắt buộc tạo thanh cuộn có màu sắc ăn nhập với giao diện (`scrollbar-color`, `::-webkit-scrollbar`).
- **Màu bôi đen chữ (`::selection`)**: Phải có màu nền và màu chữ trích từ bảng màu của dự án, không để màu xanh mặc định của Windows/Chrome.
- **Màu con trỏ soạn thảo (`caret-color`)**: Phải được đặt theo màu nhấn (accent color).
- **Vòng sáng bàn phím (`:focus-visible`)**: Hiện tức thì khi dùng phím Tab, sắc nét với độ tương phản cao, không bao giờ để vòng màu xanh mặc định mờ nhạt.

### 3. Đủ 5 Trạng Thái Giao Diện (The 5 States of UI)
Mọi thành phần tương tác (component, page) đều phải xử lý đầy đủ:
1. **Trạng thái Mặc định (Default)**
2. **Trạng thái Di chuột / Kích hoạt (Hover / Active / Focus)**
3. **Trạng thái Đang tải (Loading / Skeleton)**
4. **Trạng thái Trống (Empty state)**: Thân thiện, chỉ đường dẫn lối.
5. **Trạng thái Báo lỗi (Error state)**: Nêu rõ sự cố và cung cấp nút thử lại.

---

## 🛠️ 24 Lệnh Thực Thi Chuyên Biệt

| Nhóm | Lệnh | Ý Nghĩa Thực Thi |
| :--- | :--- | :--- |
| **Xây dựng** | `shape` | Phân tích UX/UI, luồng người dùng trước khi viết mã |
| | `document` | Tạo file `DESIGN.md` tự động từ codebase hiện có |
| | `extract` | Trích xuất các token và component tái sử dụng vào Design System |
| **Đánh giá** | `critique` | Đánh giá thiết kế với thang điểm chuyên gia UX |
| | `audit` | Quét kiểm tra chất lượng kỹ thuật (Accessibility, Performance, Responsive) |
| **Tinh chỉnh** | `polish` | Lượt kiểm tra và trau chuốt hoàn mỹ trước khi bàn giao |
| | `bolder` | Đẩy mạnh độ cá tính cho các giao diện quá mờ nhạt, an toàn |
| | `quieter` | Hạ bớt độ gắt gỏng, rối mắt cho các giao diện bị kích thích quá mức |
| | `distill` | Lược bỏ các chi tiết thừa thãi, đưa giao diện về bản chất tinh gọn |
| | `harden` | Đảm bảo tính sẵn sàng sản xuất: bẻ vỡ test layout với tên dài, đa ngôn ngữ |
| | `onboard` | Thiết kế luồng trải nghiệm người dùng lần đầu và màn hình chào mừng |
| **Nâng tầm** | `animate` | Thêm chuyển động có mục đích, mượt mà và có kiểm soát |
| | `colorize` | Bổ sung màu sắc chiến lược cho giao diện đơn điệu |
| | `typeset` | Cải tiến phân cấp kiểu chữ, độ giãn dòng và phông chữ |
| | `layout` | Căn chỉnh nhịp điệu không gian, khoảng cách và cấu trúc trang |
| | `delight` | Thêm các điểm chạm cảm xúc bất ngờ, đáng nhớ |
| | `clarify` | Chuẩn hóa câu từ thông báo lỗi, nhãn nút bấm cho rõ ràng, nhân văn |
| | `adapt` | Tối ưu hiển thị hoàn hảo trên mọi kích thước màn hình |
