# BFSC — đợt yêu cầu 5 tester / 5 IP, 29/10/2026

Trạng thái: **mới hoàn tất 1/5 lượt IP**. Không tính các báo cáo đợt trước vào 5 IP của đợt này.

Tester 1 GPT-6 Luna max xác minh public IP 89.124.11.6 qua api.ipify.org trong IAB, khớp kết quả manager đo. Quốc gia chưa xác minh (IPinfo bị rate limit).

Search Bún bò Huế, filter Breakfast, Load more 12/14 → 14/14, detail và Google Maps chạy được. Nút chọn 1 món đang bị khóa do sở thích Rice & Sticky rice đã lưu báo không có món phù hợp; chưa coi là lỗi mapping. Xem ip1.md và bfsc-ip1.jpg.

Panel khu vực lưu Việt Nam thủ công, Auto không chọn. Do đó lượt này kiểm tra hoạt động UI dưới IP VPN, **không xác nhận tự nhận quốc gia từ IP**.

Lượt 2–5 chưa chạy. Công cụ trình duyệt từ chối truy cập trang chrome-extension:// của Browsec bởi chính sách URL. Không tìm cách vòng qua chặn; cần người dùng đổi máy chủ/quốc gia thủ công và báo lại. Mỗi lượt tiếp theo phải đo public IP khác với các lượt trước rồi mới giao tester. Các tab cùng trình duyệt không được mặc định coi có IP độc lập.

Không chỉnh mã nguồn. Không kết luận đã hoàn tất 5 tester hay thử 5 quốc gia.
