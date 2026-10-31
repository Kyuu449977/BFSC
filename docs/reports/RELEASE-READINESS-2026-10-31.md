# Kiểm tra trước công khai — 31/10/2026

Kết luận: các luồng đã kiểm chứng ổn định cho nhánh thử nghiệm; chưa khuyến nghị công khai như bản phát hành chính thức. Chưa commit/push/deploy.

## Đã đạt

- Build local và build nguồn sạch trong thư mục tạm không có public/node_modules: thành công,484 file đầu ra.
-45/45 JS và34/34 Python tests. Python có ResourceWarning dọn HTTPError trong tests, không thất bại.
- Redesign50 bố cục,12 bảng màu, các luồng1/3/combo/custom/picker/add-form không ghi máy chủ, focus và zoom200%; không pageerror.
- Menu390/1440:6 món trang chính,12 món/trang, không reload, lịch sử/tải lại; không ảnh lỗi.
- Featured fade40 bố cục, tải chậm/lỗi/khôi phục và mô tả mở rộng.
- Choose-first60 tổ hợp, tiêu đề ổn định và hành động đầu màn hình.
- Custom reroll/local fallback/reload, ngôn ngữ và timezone giữa tab.
- PWA cập nhật an toàn/offline, giữ dữ liệu/cache khác, không cache API.
- Performance harness390/768/1680:130 ảnh, light reel12, combo3, tái sử dụng kho món; yêu cầu quảng cáo đúng cấu hình trong mô phỏng, không pageerror.
- git diff --check sạch.

## Các việc cần chốt trước phát hành cộng đồng

1. Audit350 mục đều reviewRequired;130 ảnh displayApproved do người dùng chấp nhận lấy từ kết quả tìm kiếm nhưng chưa xác minh giấy phép. Việc cho phép hiển thị không phải bằng chứng có quyền phân phối lại trong repository công khai. Cần thay bằng ảnh có quyền chia sẻ hoặc xác minh từng nguồn trước khi phát hành ảnh thật.220 mục còn lại dùng fallback theo chính sách hiện tại.
2. package.json khai báoMIT nhưng không có LICENSE ở gốc. Chủ dự án cần xác nhận giấy phép mã nguồn và thông tin chủ sở hữu trước khi thêm; tài sản bên thứ ba không tự thuộcMIT.
3. Monetag vàAdsterra đang bật. Bộ kiểm thử chặn/giả lập quảng cáo ngoài, chưa chứng nhận pop-up, chuyển trang hoặc nội dung quảng cáo thật. Cần kiểm tra production/staging trên điện thoại trước công khai.
4. Git hiện có727 mục xóa,47 sửa,32 mục untracked (một số là thư mục chứa nhiều file). Nhiều thay đổi từ các đợt trước, chưa tạo commit. Phải rà staged diff và đưa đủ nguồn/ảnh/audit/build/tests mới vào commit; nếu chỉ push commit cũ thì không có bản hiện tại.
5. Canonical/robots/sitemap đang dùngangiday.app. Phải đối chiếu tên miền hosting thực tế; chưa xác nhậnDNS/SSL hoặc bản production.

## Rà dữ liệu và bí mật

Không phát hiện mẫu private key/GitHub token/OpenAI key trong các file văn bản thuộc tập git tracked+untracked đang xét (giới hạn3MiB/file). Hai chuỗi giốngAWS access key nằm trongURL ảnh ký sẵn của CDNPharmacity, không có bằng chứng đây là khóa bí mật của dự án; nên chuẩn hóa URL nguồn không kèm chữ ký khi có đường dẫn nguồn ổn định. Quét này không kiểm tra toàn bộ lịch sửGit và không bảo đảm không có loại bí mật khác.

.env và.private không có file đượcGit theo dõi theo truy vấn đã chạy. .env.example chỉ chứa tên biến với giá trị rỗng. backend/data/custom-dishes.json là danh sách rỗng; venue-menus.json rỗng; dish-search.json chứa106 tên/truy vấn món. Dữ liệu này đượcGit theo dõi có chủ đích hiện tại; khi chạy cộng đồng không đưa dữ liệu gửi lên sau này trở lạiGit.

## Giới hạn và bàn giao

Chưa chứng nhận thiết bị vật lý, quảng cáo thật, cấu hìnhSSL/domain production, lịch sửGit hoặc mọi test legacy trongpackage.json. TestPlaywright dùngtools/country-qa và một số suite dùng kênhmsedge; cộng tác viên cần cài dependencies/browser tương ứng. Không chỉnh thuật toán, dữ liệu người dùng hay tắt quảng cáo trong đợt kiểm tra.
