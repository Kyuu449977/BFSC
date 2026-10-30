# Sửa tính đồng nhất ngôn ngữ — 29/10/2026

## Phạm vi

Thực hiện trực tiếp bởi agent chính, không sử dụng subagent trong đợt sửa này. Không sửa cách tính giờ, chọn múi giờ, xác định bữa hoặc quy tắc appearance theo giờ. Không đổi ID của 382 món tĩnh, giá, thuật toán quay, khóa lưu trữ hoặc dữ liệu người dùng. Không triển khai production.

## Nguyên nhân và thay đổi

- Nhiều ô dịch của danh mục Nhật/Hàn/Trung/Âu–Mỹ chứa nguyên tên tiếng Việt. Test cũ chỉ kiểm tra có chuỗi nên không phát hiện. `regional-dish-locales.js` bổ sung bảng tên đa ngôn ngữ cho 220 món quốc tế, giữ tên bản ngữ đúng và thay các bản dịch sai; sửa mô tả tiếng Anh bị gán tiếng Việt. Một số tên Việt còn sót trong locale Anh/Trung cũng được sửa.
- `getDishName` giữ các thông tin trong ngoặc đã dịch thay vì xóa mọi ngoặc cuối tên. `getDishQuote` dùng quote đã dịch hoặc mô tả đã dịch; UI không lặp hai đoạn giống nhau và không ghép quote tiếng Việt vào kết quả ngoại ngữ.
- Banner, card kết quả, ảnh alt, picker, tìm kiếm và liên kết Maps dùng tên theo ngôn ngữ hiển thị. Đổi ngôn ngữ render lại kết quả/picker đang mở mà không quay hoặc commit lại.
- Bổ sung chữ của vòng quay tự chọn, danh mục đồ uống, số mục đã chọn, form, tooltip/accessible name, bộ sưu tập rỗng, lỗi ngân sách/lưu, chia sẻ/cài đặt và offline. Lỗi nghiệp vụ được ánh xạ sang bản dịch ở lớp UI; không thay contract logic tiền.
- `legal-copy.js` sửa nội dung còn sót trên trang thông tin. Credits gắn ID món khi build và dịch tên theo ID; tác giả, giấy phép và tiêu đề nguồn trích dẫn vẫn nguyên văn. Không sửa module giờ/theme để làm việc này.
- Cập nhật allowlist/thứ tự classic scripts và cache v27. Manifest cache do build sinh chứa các module mới. Test cập nhật PWA đọc version thực tế, không hardcode v26; vẫn kiểm tra xóa cache cũ, giữ cache ứng dụng khác và có cache phiên bản mới.

## Kiểm chứng

| Kiểm tra | Kết quả |
|---|---|
| Node unit/regression | 40/40 đạt |
| Python backend/build | 29/29 đạt; có ResourceWarning của fixture HTTP nhưng không có test thất bại |
| Danh mục | 382 món × 5 ngôn ngữ; locale ngoại ngữ có trường dịch tường minh, không chứa chữ Việt; tên Nhật/Hàn/Trung có chữ viết đích |
| Chromium | 25 tổ hợp vùng/ngôn ngữ, rộng 320/390px; tìm kiếm, bộ sưu tập rỗng, lọc đồ uống, ngân sách sai, picker, kết quả, Maps và các dialog |
| WebKit | Cùng ma trận 25 tổ hợp và các luồng trên |
| Đổi ngôn ngữ trực tiếp | 5 lần mỗi engine, vùng không thay đổi |
| Trang thông tin | 3 trang × 5 ngôn ngữ mỗi engine; kiểm tra chữ UI và 382 tên trong credits |
| PWA Chromium/WebKit | 7 tình huống mỗi engine, gồm đổi ngôn ngữ khi offline và đủ 382 tên dịch |
| Cú pháp/build | Kiểm tra JS; build thành công; source, allowlist và output thống nhất |

Bằng chứng máy đọc được và ảnh nằm trong `artifacts/localization-qa/`; log Node/Python tại cùng thư mục. Kiểm chứng PWA ở `artifacts/upgrade-acceptance/chromium-pwa.json` và `webkit-pwa.json`.

## Chạy lại

```powershell
python -B build_public.py
node --test tests/*.test.cjs
python -B -m unittest discover -s tests -p "test_*.py"
node tests/localization-browser.cjs
$env:BFSC_TEST_ENGINE='webkit'
node tests/localization-browser.cjs
node tests/upgrade-pwa-browser.cjs
$env:BFSC_TEST_ENGINE='chromium'
node tests/upgrade-pwa-browser.cjs
```

Browser test dùng origin và browser context riêng, API fixture rỗng, chặn request ngoài. Không đọc/ghi bộ sưu tập, món thêm hay tùy chọn của người dùng thật. Build phải hoàn tất trước khi chạy browser test.

## Giới hạn và quy tắc bảo trì

- Nội dung tự nhập của người dùng được giữ nguyên, không gửi đến dịch vụ dịch và không tự thay bằng một tên đoán. Đây là nội dung người dùng, khác với chữ hệ thống và 382 món tĩnh được dịch sẵn.
- Một số mô tả bản ngữ sẵn có còn ngắn hoặc chung; kiểm tra tự động xác nhận đủ trường và ngôn ngữ hiển thị, không thay thế biên tập bởi người bản ngữ.
- Tên thương hiệu, ID kỹ thuật, ký hiệu tiền tệ, tên ngôn ngữ bản ngữ và metadata nguồn/giấy phép có thể giữ nguyên đúng chức năng. Ngôn ngữ không chuyển tỷ giá hoặc vùng ẩm thực.
- Không xác nhận đã thử trên iPhone/Android thật hoặc production. Request quảng cáo bên ngoài bị chặn trong kiểm thử và nội dung do nhà quảng cáo cung cấp không được dịch bởi ứng dụng.
- Khi thêm món/locale, kiểm tra bản dịch thực thay vì sao chép tên Việt vào trường ngoại ngữ. Mọi đường render chữ của món tĩnh phải qua helper dịch; thêm regression cho đường render mới.
