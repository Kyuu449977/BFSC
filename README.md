# Ăn gì đây?

Ứng dụng JavaScript thuần chọn món bình dân, có ngân sách, combo, bộ sưu tập, giao diện sáng/tối và offline.

## Chạy local

```sh
python server.py
```

Mở [localhost:8080](http://localhost:8080/). Máy chủ in địa chỉ LAN để mở bằng điện thoại cùng Wi-Fi. `python run_server.py` thêm tunnel nếu có Cloudflare; không có tunnel vẫn chạy local/LAN. Không mở trực tiếp các file trong `src/`.

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/js/` | JavaScript giao diện, chọn món, dữ liệu và lưu bộ sưu tập |
| `src/styles/` | CSS chia theo thành phần, tương tác, mobile và chủ đề |
| `src/assets/`, `src/images/` | Font, icon, thư viện và ảnh đang sử dụng |
| `src/` | Các trang HTML, manifest và service worker |
| `backend/` | Máy chủ Python, adapter Maps cũ và dữ liệu phía máy chủ |
| `scripts/` | Build, danh sách file được xuất bản và ánh xạ đường dẫn |
| `tests/` | Kiểm thử logic, trình duyệt và máy chủ |
| `tools/` | Công cụ kiểm tra ảnh và bản build |
| `docs/` | Hướng dẫn, kiến trúc, nguồn tài nguyên và báo cáo |
| `public/` | Đầu ra build tự sinh; không sửa trực tiếp |
| `artifacts/` | Kết quả kiểm thử tự sinh; bỏ qua trong Git |
| `archive/` | Ảnh gốc và công cụ nghiên cứu cũ giữ để khôi phục; không chạy hoặc xuất bản |

## Build và kiểm tra

```sh
python build_public.py
node --test tests/*.test.cjs
python -B -m unittest discover -s tests -p "test_*.py"
```

Kiểm thử trình duyệt cần Playwright và Microsoft Edge. Các lệnh `npm run test:browser`, `test:budget`, `test:mobile-compact`, `test:motion`, `test:audit-fixes` sẽ build trước khi chạy. `test:theme` cần preview8080 đang chạy.

Cài công cụ phát triển bằng `npm install`, sau đó dùng `npm run format` / `npm run format:check` (Prettier 3.6.2). Website không thêm thư viện chạy lúc sử dụng.

Chỉ triển khai **public/**. Giữ `server.py`, `run_server.py`, `build_public.py` tại gốc làm điểm chạy tương thích; phần triển khai nằm trong thư mục tương ứng.

- [Kiến trúc và quy tắc sửa mã](docs/ARCHITECTURE.md)
- [Hướng dẫn đầy đủ](docs/USER_GUIDE.md)
- [Nguồn tài nguyên](docs/OPEN_SOURCE.md)
- [Cấu hình Maps cũ](docs/GOOGLE_MAPS_SETUP.md) — chức năng hiện tại dùng link Maps, không gọi API trả phí.
