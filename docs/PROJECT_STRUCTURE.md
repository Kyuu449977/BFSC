# Bản đồ dự án

| Vị trí | Trách nhiệm |
|---|---|
| `src/` | Nguồn website, HTML và các file cấu hình công khai như robots/sitemap/manifest |
| `src/js/` | Logic trình duyệt, dữ liệu danh mục và bản dịch |
| `src/styles/` | Các lớp stylesheet theo chức năng; thứ tự ghép do build quy định |
| `src/images/`, `src/assets/` | Ảnh, font, SVG và giấy phép |
| `backend/` | Máy chủ Python, API và dữ liệu phía máy chủ |
| `api/` | Adapter API theo vị trí do nền tảng hosting yêu cầu |
| `scripts/` | Chỉ giữ package Python, build và allowlist xuất bản |
| `tools/assets/` | Công cụ quản lý ảnh chạy thủ công |
| `tools/country-qa/` | Môi trường Playwright; node_modules còn được kiểm thử sử dụng |
| `tools/*.cjs`, `tools/*.py` | Công cụ audit và đọc báo cáo còn tái sử dụng |
| `tests/` | Kiểm thử và fixture, không dùng làm nơi chứa ảnh/log |
| `docs/` | Hướng dẫn, kiến trúc, SEO và SYSTEM_REFERENCE.md |
| `docs/reports/` | Báo cáo và đầu vào metadata ảnh; audit ảnh là đầu vào bắt buộc của build |
| `artifacts/` | Đầu ra kiểm thử cục bộ, bỏ qua Git và không xuất bản |
| `public/` | Đầu ra build tự sinh, bỏ qua Git; máy chủ chỉ phục vụ allowlist |
| `.agents/`, `graphify-out/` | Skill, bộ nhớ và bản đồ mã nguồn cho bảo trì |
| `design-skills/` | Tài liệu thiết kế và nguồn tham khảo; không thuộc ứng dụng chạy |
| `.private/` | Sổ theo dõi riêng, không xóa/reset và không xuất bản |

Ở gốc chỉ giữ hướng dẫn chính, DESIGN.md/AGENTS.md, cấu hình công cụ/hosting và các lệnh chạy tương thích. Không chuyển `server.py`, `run_server.py`, `build_public.py`, file BAT hoặc cấu hình hosting: các đường dẫn này là giao diện vận hành hiện có.

## Đợt dọn 31/10/2026

359 file trực tiếp trong scripts (script sửa một lần và dữ liệu trung gian), 5 thư mục xuất/tạm và 3 bản danh sách cũ đã được chuyển khỏi dự án. Chúng không được import hoặc gọi từ build/backend/API/tests/công cụ đang giữ lại. Bộ kiểm thử trong tests được giữ nguyên, kể cả các bộ lịch sử.

Lưu trữ khôi phục cục bộ: `C:\Users\phamp\Downloads\New folder\BFSC-cleanup-archive-20261031-021119`. `manifest.json` ghi đường dẫn cũ và SHA-256 của 359 file scripts. Đây là chuyển ra ngoài có thể khôi phục, không xóa vĩnh viễn.

Công cụ tải ảnh được chuyển từ scripts/download_catalog_images.py sang tools/assets/download_catalog_images.py; đã sửa cách xác định gốc dự án và tạo thư mục đầu ra trước khi ghi. Lệnh mới: `python -B tools/assets/download_catalog_images.py`. Không chạy lại lệnh tải ảnh trong đợt này để giữ ảnh hiện tại.

Không đưa file sửa một lần trở lại scripts. Đầu ra QA mới đặt trong artifacts; dữ liệu làm đầu vào build có chủ đích đặt trong docs/reports và ghi rõ nơi sử dụng.
