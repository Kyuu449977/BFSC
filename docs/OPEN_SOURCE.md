# Tài nguyên mã nguồn mở

Website dùng tài nguyên được lưu cục bộ, không tải thư viện hoặc font từ CDN lúc người dùng mở trang.

- **Lucide Icons — ISC:** 23 icon SVG được gộp thành `assets/icons.svg`. Nguồn [lucide-icons/lucide](https://github.com/lucide-icons/lucide), commit `9f20b2b8f99cd9fe89bbfcbe883ee5b664ebb595`. Giữ nguyên thông báo quyền tại `assets/licenses/lucide-LICENSE.txt` (bao gồm các thông báo Feather có liên quan).
- **Be Vietnam Pro — SIL Open Font License 1.1:** font từ package `@fontsource/be-vietnam-pro` phiên bản `5.3.0`, nguồn [Fontsource](https://fontsource.org/fonts/be-vietnam-pro). Chỉ lưu các subset Latin, Latin Extended và Vietnamese ở trọng lượng 400/600/700, định dạng WOFF2, `font-display: swap`. Giấy phép tại `assets/licenses/be-vietnam-pro-LICENSE.txt`.
- **Google Maps attribution:** logo nguyên bản từ bộ attribution assets chính thức đã có trong dự án; không phải bộ dữ liệu địa điểm. Tính năng tìm quán chỉ mở Maps URLs.

Phiên bản, nguồn và danh sách file được ghi trong `assets/sources.json`. Không thêm framework hoặc thư viện JavaScript chạy ngoài vào website. Icon ứng dụng được vẽ bằng mã nguồn trong dự án; nội dung món và khoảng giá hiện có được giữ nguyên.

## Motion — MIT

Bản JavaScript thuần Motion 12.23.24, nguồn https://github.com/motiondivision/motion, file phân phối `assets/vendor/motion.js`; giấy phép tại `assets/licenses/motion-LICENSE.md`. Không cần React hoặc gọi CDN khi mở website. Phiên bản và SHA-256 ghi trong `assets/sources.json`.

## Hình món ăn

48 ảnh chụp thật dạng WebP, không dùng SVG minh họa món ăn hoặc ảnh AI. 42 ảnh Commons giữ giấy phép của từng ảnh. 3 ảnh Cookbeo dùng cho mục đích phi thương mại, giữ watermark và ghi rõ “Ảnh: cookbeo.com” theo https://cookbeo.com/license.html. 3 ảnh Thanh Niên, Thật Là Ngon và Rau má Luck có nguồn rõ ràng nhưng chưa xác minh quyền tái sử dụng; metadata đánh dấu `rightsReviewRequired`. Cần xác nhận quyền trước khi xuất bản công khai hoặc thay bằng ảnh có quyền phù hợp.

Nguồn, tác giả, URL bản gốc, giấy phép/điều kiện và biến đổi của từng hình nằm trong `images/sources.json`, hiển thị ở `credits.html#food-images`. Các nguồn có điều kiện riêng được ghi công thêm ở thẻ món và kết quả. Ảnh là tham khảo món, không phải ảnh quán từ Maps; bao bì đồ uống có thể khác thị trường Việt Nam. Không áp dụng giấy phép mã nguồn website lên ảnh.

Script SVG cũ `tools/apply_food_images.py` đã vô hiệu để không khôi phục hình vẽ. Khi thay ảnh, kiểm tra đúng món bằng mắt, cập nhật metadata và tăng cache version trong `sw.js`.
