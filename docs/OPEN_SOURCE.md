# Tài nguyên mã nguồn mở

Website dùng tài nguyên được lưu cục bộ, không tải thư viện hoặc font từ CDN lúc người dùng mở trang.

- **Lucide Icons — ISC:** 23 icon SVG được gộp thành `assets/icons.svg`. Nguồn [lucide-icons/lucide](https://github.com/lucide-icons/lucide), commit `9f20b2b8f99cd9fe89bbfcbe883ee5b664ebb595`. Giữ nguyên thông báo quyền tại `assets/licenses/lucide-LICENSE.txt` (bao gồm các thông báo Feather có liên quan).
- **Be Vietnam Pro — SIL Open Font License 1.1:** font từ package `@fontsource/be-vietnam-pro` phiên bản `5.3.0`, nguồn [Fontsource](https://fontsource.org/fonts/be-vietnam-pro). Chỉ lưu các subset Latin, Latin Extended và Vietnamese ở trọng lượng 400/600/700, định dạng WOFF2, `font-display: swap`. Giấy phép tại `assets/licenses/be-vietnam-pro-LICENSE.txt`.
- **Google Maps attribution:** logo nguyên bản từ bộ attribution assets chính thức đã có trong dự án; không phải bộ dữ liệu địa điểm. Tính năng tìm quán chỉ mở Maps URLs.

Phiên bản, nguồn và danh sách file được ghi trong `assets/sources.json`. Không thêm framework hoặc thư viện JavaScript chạy ngoài vào website. Icon ứng dụng được vẽ bằng mã nguồn trong dự án; nội dung món và khoảng giá hiện có được giữ nguyên.

## Chuyển động native

Website hiện dùng Web Animations API và CSS; Motion không được nạp hoặc xuất bản trong build mới. File và giấy phép Motion cũ được giữ trong nguồn để tham khảo lịch sử, không phải dependency frontend.

## Ảnh và metadata

382 ID món tham chiếu ảnh cục bộ. Kiểm kê hiện có 118 mục có metadata đầy đủ về mặt cấu trúc và 264 mục cần rà nguồn/giấy phép; đây không phải xác minh từng nguồn trên Internet. Runtime dùng placeholder khi metadata thiếu hoặc mâu thuẫn, giữ nguyên ảnh gốc và ID.

Metadata gốc ở `src/images/sources.json`; bản đối chiếu theo ID/đường dẫn ở `docs/reports/image-attribution-audit.json`. Build sinh credits và runtime attribution từ bản đối chiếu, có escape HTML. Không bịa tác giả, URL hay giấy phép; ảnh không tự được cấp phép theo mã nguồn ứng dụng.

Khi cập nhật ảnh, xác minh đúng món và nguồn, cập nhật metadata/audit, đăng ký allowlist rồi build và tăng cache version. Script nghiên cứu cũ không thuộc quy trình build chính thức.
