# SEO và từ khóa đa ngôn ngữ

Tên miền chuẩn đang giữ theo canonical/robots có sẵn: **https://angiday.app/**. Sitemap cũ dùng bfsc.netlify.app đã được đồng bộ. Trước khi phát hành, chủ website cần bảo đảm đây là tên miền production thực tế; khi đổi miền phải đổi canonical, Open Graph, JSON-LD, robots và sitemap cùng nhau. Đợt này chưa deploy hoặc gửi sitemap cho công cụ tìm kiếm.

## Cụm từ đã thêm vào metadata

Đây là các bản dịch mô tả đúng mục đích chọn món; chưa đo lượng tìm kiếm hoặc khẳng định đây là từ khóa phổ biến nhất.

| Ngôn ngữ | Ví dụ thị trường | Cụm từ |
|---|---|---|
| Việt | Việt Nam | ăn gì đây; hôm nay ăn gì; vòng quay món ăn |
| Anh | Mỹ, Anh, Úc, Canada, Singapore | what to eat today; random food picker; food wheel |
| Nhật | Nhật Bản | 今日何食べる; 食べ物ルーレット |
| Hàn | Hàn Quốc | 오늘 뭐 먹지; 음식 룰렛 |
| Trung giản thể/phồn thể | Trung Quốc, Đài Loan, Hong Kong | 今天吃什么; 随机选美食; 今天吃什麼; 美食轉盤 |
| Tây Ban Nha | Tây Ban Nha, Mexico | qué comer hoy; ruleta de comida |
| Pháp | Pháp, Canada | quoi manger aujourd’hui; roue des repas |
| Đức | Đức, Áo | was esse ich heute; Essensrad |
| Bồ Đào Nha | Brazil, Bồ Đào Nha | o que comer hoje; roleta de comida |
| Ý | Ý | cosa mangiare oggi; ruota del cibo |
| Indonesia | Indonesia | makan apa hari ini; pemilih makanan acak |
| Thái | Thái Lan | วันนี้กินอะไรดี; สุ่มอาหาร |
| Hindi | Ấn Độ | आज क्या खाएं |
| Nga | Nga | что поесть сегодня |
| Ả Rập | Ai Cập, Saudi Arabia | ماذا آكل اليوم |

## Thay đổi có thể kiểm chứng

- Trang chính và menu có title, description, Open Graph/Twitter riêng. Metadata mô tả 350 món, 5 vùng, ngân sách và liên kết Maps; bỏ tuyên bố “số 1” và tự tìm quán gần nhất.
- JSON-LD mô tả chức năng đang có; inLanguage chỉ khai báo 5 ngôn ngữ giao diện thực tế (vi/en/ja/ko/zh).
- Sitemap liệt kê 5 trang thật: trang chính, menu, nguồn ảnh, quyền riêng tư và điều khoản. Không đưa URL phân trang/bộ lọc vào sitemap.
- Bỏ hreflang ?lang= vì ứng dụng không đọc tham số đó và không có trang dịch riêng để crawler truy cập. Không tự tạo route hoặc tính năng ngôn ngữ mới.
- Các trang thông tin có canonical và description; giữ nội dung và hành vi hiện tại.

## Giới hạn

Google không sử dụng meta keywords để xếp hạng. Danh sách trên đáp ứng yêu cầu từ khóa nhưng không bảo đảm tăng lượt hiển thị quốc tế. Google chủ yếu xác định ngôn ngữ từ nội dung nhìn thấy; hiện ngôn ngữ được chọn trong trình duyệt, không phải URL dịch riêng. Muốn mở rộng SEO quốc tế thực chất cần nội dung bản địa hóa có địa chỉ riêng và hreflang đối ứng; đây là công việc ngoài phạm vi “không làm chức năng mới”, nên chưa triển khai.

Tài liệu chính thức: [Google về meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags), [website đa ngôn ngữ](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [khai báo phiên bản ngôn ngữ](https://developers.google.com/search/docs/specialty/international/localized-versions).


## Tích hợp bộ từ khóa mở rộng — 31/10/2026

Đã chọn140 cụm từ bộ3521 ứng viên:20 tiếng Việt và8 mỗi nhóm quốc tế, tổng16 nhóm ngôn ngữ/chữ viết (Trung giản thể/phồn thể tách riêng). Metadata keywords của trang chính và trang thực đơn sinh từ cùng nguồn nhận bộ chọn này. Tiêu đề/mô tả trang chính nhấn mạnh hôm nay ăn gì, vòng quay chọn món, bữa trưa/tối và ngân sách; thực đơn có mô tả riêng. Không chèn cả3521 ứng viên vào trang hoặc tạo nội dung ẩn.

Bản chọn chính xác: research/KEYWORDS-PUBLISHED-2026-10-31.json. Metadata keywords không mang lợi ích xếp hạng Google; không coi thay đổi này là bảo đảm tăng traffic. Chưa tạo các trang bản địa hóa ngoài5 ngôn ngữ UI, chưa deploy hoặc gửi sitemap. Cachev50; build và3 kiểm thử SEO đạt.
