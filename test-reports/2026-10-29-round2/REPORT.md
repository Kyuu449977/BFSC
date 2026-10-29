# BFSC — kiểm thử đổi IP thực, 29/10/2026

Nhóm gồm 5 tester GPT-6 Luna, reasoning max, và manager/reviewer. Chạy hai đợt do giới hạn 3 subagent đồng thời. Thao tác website bằng Computer Use; không sửa mã nguồn.

## Đổi IP đã xác minh

| Mạng | IP công khai trên Chrome | Quốc gia |
|---|---|---|
| Trước WARP | 171.250.165.90 | VN theo IPinfo |
| Sau WARP Connected | 104.28.210.150 | Chưa xác minh; IPinfo/ipapi bị rate limit |

Tester đo trước/sau trong cùng tab api.ipify.org trên Chrome của máy Windows. Manager đọc lại IP mới và lưu ảnh ip-after-warp.jpg. WARP vẫn Connected ở lần quan sát gần nhất; không tự ngắt kết nối mạng do người dùng đã bật.

BFSC ban đầu lưu region China thủ công. Tester chuyển về Auto, có nhãn “Theo giờ thiết bị”, rồi reload sau đổi IP. Website vẫn hiện AUTO, buổi khuya và thực đơn Việt Nam. **Không đủ căn cứ kết luận nhận diện IP sai:** chưa xác minh quốc gia của IP mới; hai IP khác nhau không đồng nghĩa hai quốc gia khác nhau. Chưa kiểm tra phiên sạch hoàn toàn không có dữ liệu đã lưu.

## Phân công và kết quả

- Tester 1: Chrome baseline/post-WARP, chứng minh đổi IP thực. Chi tiết tester1-ip.md.
- Tester 2: IAB search/filter/Xem thêm. Tìm Bún bò Huế trả 1/1 và xóa tìm kiếm về 12/113. Ghi nhận click không phản hồi với Lunch và Load more nhưng Enter hoạt động. Reviewer hạ kết luận thành hiện tượng riêng của môi trường IAB sau đối chiếu Chrome; không coi là lỗi chung đã xác nhận. Chi tiết tester2-menu.md.
- Tester 3: IAB chi tiết ba món, liên kết Maps đúng truy vấn, đóng modal/Escape và footer hoạt động. Chi tiết tester3-details.md.
- Tester 4: Chrome sau đổi IP: ngân sách 50.000đ cho phép 1 món (tối thiểu 35.000đ) và combo (tối thiểu 48.000đ), khóa 3 món cần ít nhất 100.000đ. Reset khẩu vị hoạt động. Chi tiết tester4-budget.md và tester4-budget.jpg.
- Tester 5: Chrome sau đổi IP: Tab/Enter mở các hộp thoại timezone/language/theme và chi tiết Cơm tấm; Escape đóng và trả focus. Click Buổi Trưa hoạt động (12/15), click Xem thêm hoạt động (15/15). Không tìm thấy lệch alt/tên món trong spot check. Chi tiết tester5-keyboard.md.

## Hiện tượng đã ghi nhận

- Sở thích Cơm & xôi tại ngân sách 50.000đ trả 0 món dù menu có Xôi xéo 25.000đ. Chưa xác minh món này có thuộc tập món chính của generator tại buổi khuya; cần kiểm tra mapping và điều kiện buổi ăn, chưa gán lỗi xác nhận.
- Trạng thái nút nhạc nền từ tắt sang bật sau tương tác không liên quan được nhiều tester ghi nhận. Tester 4 đã tắt lại qua UI. Chưa xác minh âm thanh thực sự phát và chưa phân biệt hành vi chủ đích tự phát sau gesture với lỗi, nên ghi nhận để developer xem lại.

Mở Maps từ Bún bò Huế tạo thêm các tab ay267/ADEX và quảng bá Hola VPN; mở từ Xôi xéo cũng có tab Hola. Tester đóng các tab quảng cáo và quay về BFSC, không bấm quảng cáo. Đây là hiện tượng mở tab phụ đã quan sát; chưa xác minh nguồn gốc là mã website hay thành phần trình duyệt. Không quy kết nguyên nhân hoặc lỗ hổng.

## Giới hạn

Chỉ kết quả Chrome được dùng để kết luận IP của máy qua WARP. Kết quả IAB là hồi quy UI, không mặc định coi dùng cùng đường mạng. Các tester được phân quyền đổi trạng thái để giảm nhiễu storage: chỉ tester 1 đổi region, sau đó chỉ tester 4 đổi budget/preferences. Những lỗi Light/English trong báo cáo lượt trước không tự động coi đã tái hiện ở lượt này.

Đây là smoke test hai IP, chưa phải kiểm thử thành công nhiều quốc gia hoặc nhiều VPN.
