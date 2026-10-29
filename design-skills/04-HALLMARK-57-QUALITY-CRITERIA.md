# 04. BẢNG 57 TIÊU CHÍ CHẤT LƯỢNG THIẾT KẾ HALLMARK
> Nguồn: `nutlope/hallmark` - Được xây dựng bởi Hassan El Mghari (Together AI)

Hallmark sinh ra với mục tiêu cao nhất: Đảm bảo giao diện do AI tạo ra trông như một **tác phẩm thiết kế được chăm chút thủ công bởi chuyên gia**, hoàn toàn không có dấu vết của mã tự sinh (un-generated feel).

---

## 🏛️ Sàn Chất Lượng Bắt Buộc (The Floor)

Những quy tắc này có tính chất cưỡng chế trong mọi sản phẩm:

| STT | Quy Tắc | Lý Do Kỹ Thuật & Thẩm Mỹ |
| :---: | :--- | :--- |
| **1** | Mọi màu sắc và font chữ phải khai báo qua biến CSS Token tại `:root`. | Ngăn ngừa việc rải rác mã HEX trực tiếp trong CSS làm mất kiểm soát theme. |
| **2** | **CẤM `transition: all`**. Không bao giờ animate `width`, `height`, `top`, `left`. | Tránh gây hiện tượng drop-frame và re-layout trên trình duyệt. Chỉ animate `transform` và `opacity`. |
| **3** | Không bao giờ lồng một từ in nghiêng (*italic*) bên trong tiêu đề chữ đứng (roman). | Kiểu dáng chữ lai tạp này là thói quen rập khuôn của AI nhằm tạo cảm giác "nghệ thuật" giả tạo. |
| **4** | Dùng `overflow-x: clip` trên cả `html` và `body`. Không dùng `hidden`, không dùng `100vw`. | `clip` triệt tiêu thanh cuộn ngang ngoài ý muốn mà không chặn tính năng `position: sticky`. |
| **5** | Khung lưới ảnh phải dùng `minmax(0, 1fr)`. Tiêu đề phải có `overflow-wrap: break-word; min-width: 0`. | Ngăn ngừa việc văn bản dài làm biến dạng khung lưới trên màn hình hẹp. |
| **6** | Mọi phần tử tương tác phải có `:focus-visible` xuất hiện tức thì. | Đảm bảo khả năng tiếp cận hoàn hảo cho người dùng điều hướng bằng bàn phím. |
| **7** | Mọi chuyển động phải có fallback `@media (prefers-reduced-motion: reduce)`. | Tôn trọng người dùng bị rối loạn tiền đình hoặc nhạy cảm với chuyển động. |
| **8** | Không bao giờ bịa đặt số liệu thống kê, lời chứng thực (testimonial) hay logo đối tác giả. | Thông tin giả mạo làm mất uy tín hoàn toàn của sản phẩm. Chỉ dùng dữ liệu thật hoặc bỏ trống. |
| **9** | Không viết hoa cách dòng rộng (tracked capitals) cho nhãn nhỏ. | Nhãn phụ, danh mục, badge phải dùng chữ thường hoặc viết hoa đầu câu với độ rộng chuẩn. |
| **10** | Không gắn mũi tên dính liền chữ link (`Xem thêm →`) hay chấm trạng thái trang trí vô nghĩa. | Sử dụng khoảng cách có chủ đích và thành phần icon riêng biệt. |
| **11** | Không bao giờ dùng chuyển sắc tím-xanh, không card lồng card, không emoji làm icon. | Bộ ba lỗi thẩm mỹ phổ biến nhất của các AI tạo sinh giao diện. |
| **12** | Khung Hero (tiêu đề, 1 câu mô tả, nút CTA) phải nhìn thấy trọn vẹn ở 1280×800 không cần cuộn. | Nắm bắt 100% sự chú ý của người dùng trong màn hình đầu tiên (Above the fold). |
| **13** | Khoảng 80 từ cho một khung nhìn màn hình. | Tránh quá tải thông tin; văn bản ngắn gọn, cô đọng, súc tích. |
| **14** | Vùng chứa chính (Container) phải giới hạn độ rộng tối đa và căn giữa. | Ở màn hình 1920px trở lên, khoảng trống hai bên lề mở rộng ra, không làm phình vỡ lưới nội dung. |

---

## 🔍 Checklist Kiểm Thử 4 Giai Đoạn

### Giai đoạn 1: Khung Bố Cục (Scaffold)
- [ ] Không có thanh cuộn ngang ở bất kỳ kích thước màn hình nào (từ 320px đến 2560px).
- [ ] Khung chữ không bị cắt cụt hay tràn viền (overflow clip).
- [ ] Tỷ lệ lưới nhất quán (12 cột hoặc 8 cột).

### Giai đoạn 2: Kiểu Chữ & Tương Phản (Typography & Contrast)
- [ ] Độ tương phản đạt chuẩn WCAG AA (chữ thường ≥ 4.5:1, chữ lớn ≥ 3:1).
- [ ] Không quá 2 họ phông chữ trên toàn bộ giao diện (1 phông tiêu đề, 1 phông nội dung).
- [ ] Phân cấp cỡ chữ theo thang bậc rõ rệt (ví dụ: 14px -> 16px -> 20px -> 28px -> 40px).

### Giai đoạn 3: Tương Tác & Phản Hồi (Interaction & States)
- [ ] Nút bấm có hiệu ứng phản hồi khi ấn xuống (`:active { transform: scale(0.98); }`).
- [ ] Thẻ card có độ nảy nhẹ nhàng khi di chuột (`translateY(-2px)` hoặc `-4px`).
- [ ] Các thông báo lỗi xuất hiện êm ái, có màu sắc cảnh báo rõ ràng.

### Giai đoạn 4: Chữ Nghĩa & Bản Quyền (Copywriting & Truth)
- [ ] Không có chữ Latinh giả lập (Lorem Ipsum).
- [ ] Mọi nút bấm đều mô tả đúng hành động (ví dụ: "Quay Món Ăn", "Xem Bản Đồ", thay vì "Nhấn Vào Đây").
- [ ] Hình ảnh đúng tên món ăn, đúng bản quyền, không dùng ảnh chụp cẩu thả.
