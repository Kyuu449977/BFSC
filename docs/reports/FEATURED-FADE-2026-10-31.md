# Ảnh hòa vào nền card gợi ý

Ảnh hiện có được đặt sát mép trái, cắt theo bo góc của card và dùng mask gradient để hòa vào nền. Vùng ảnh40% trên desktop,96px trên điện thoại. Nội dung giữ khoảng cách16px sau vùng ảnh. Card cao theo nội dung; ảnh tải lỗi ẩn và nội dung dùng toàn chiều rộng.

Baseline nguyên bản: artifacts/featured-fade/before (styles và ảnh toàn trang). Ảnh sau: artifacts/featured-fade/after-desktop.png và after-mobile.png. Dữ liệu kiểm chứng: acceptance.json cùng thư mục.

Đạt40 trường hợp4 kích thước ×5 ngôn ngữ ×2 chế độ; không tràn ngang/ảnh chồng chữ; ảnh phủ hết chiều cao; mask tồn tại; tải chậm không đổi chiều cao; lỗi ảnh thu gọn và ảnh hợp lệ khôi phục; mở mô tả không tràn. Đạt thêm choose-first60, redesign50 bố cục/12 bảng màu và PWA/offline. Chữ nằm ngoài vùng ảnh, giữ các màu chữ/nền đã kiểm tra tương phản của hệ thống. Không đổi chức năng, nguồn ảnh hay nhà cung cấp quảng cáo. Cachev49, chưa deploy.
