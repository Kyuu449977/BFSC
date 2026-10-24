# Bộ điều khiển và chuyển động riêng — 24/10/2026

## Thay đổi

- Module controls.js tự dựng combobox/listbox cho khẩu vị và danh sách cá nhân. Select gốc chỉ là nguồn giá trị đồng bộ, không mở popup mặc định. Popup có vị trí neo theo viewport, giới hạn chiều cao, cuộn riêng, dấu chọn và màu sáng/tối.
- Hỗ trợ mũi tên/Home/End, gõ đầu từ không dấu, Enter/Space, Escape, Tab và bấm ngoài. Label, role và trạng thái ARIA được đồng bộ. Menu theo vị trí khi trang cuộn, đóng khi neo ra khỏi màn hình hoặc viewport đổi kích thước.
- Checkbox có nét vẽ và chuyển trạng thái riêng; tooltip thay title mặc định, hiện khi hover hoặc focus bằng bàn phím. Không có ripple Material.
- Accordion có animation chiều cao 200ms và xử lý hủy/đảo trạng thái khi bấm nhanh; giải phóng tham chiếu tới kết quả cũ sau reroll. Dialog có entry ngắn hơn và exit CSS progressive enhancement trên trình duyệt hỗ trợ allow-discrete.
- Nhấn nút dùng độ lún nhỏ và opacity; kết quả xuất hiện với stagger nhẹ. Vòng quay giữ kết quả đã chọn, không trùng thẻ kề nhau, có điểm nhấn và giữ 140ms ở món trúng; skip và resize vẫn đúng kết quả.
- Giảm chuyển động và chuyển nền hoàn tất/hủy hiệu ứng, không để menu hoặc thao tác bị kẹt. Dùng Motion MIT cục bộ đã có cùng Web Animations/CSS của nền tảng; không thêm Google/Material UI hoặc CDN. Không thay đổi chức năng Maps.

## Kiểm chứng

25 Node tests và 19 Python tests đạt. Browser/offline, budget, personal, motion và mobile compact 8 kích thước đạt. Kiểm thử controls riêng bao gồm menu pointer/keyboard, typeahead, Escape/Tab, checkbox, bấm nhanh accordion, 6 kích thước popup, sáng/tối, tooltip và reduced motion. Đã xem ảnh chụp popup sáng/tối. Prettier và git diff --check đạt. Chưa kiểm thử trên thiết bị vật lý/Safari; exit dialog có fallback đóng tức thì trên trình duyệt chưa hỗ trợ transition rời top layer.

Cache v22 và danh sách public đã thêm controls.js. Preview8080 tiếp tục chạy; không triển khai công khai.
