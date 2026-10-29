# 🍜 Ăn Gì Đây? (Hôm Nay Ăn Gì? - BFSC)

> **Vòng quay ẩm thực đa quốc gia, tự động theo thời gian thực — 100% JavaScript thuần, Offline PWA, Không phụ thuộc thư viện ngoài.**

[![Tests](https://img.shields.io/badge/Unit%20Tests-19%2F19%20PASS-brightgreen.svg)](#hệ-thống-kiểm-thử-chất-lượng)
[![Architecture](https://img.shields.io/badge/Architecture-Vanilla%20JS%20%7C%20PWA-orange.svg)](#kiến-trúc-hệ-thống)
[![Dishes](https://img.shields.io/badge/Dishes-333%20Curated%20Items-blue.svg)](#kho-dữ-liệu-ẩm-thực-5-quốc-gia)
[![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)](LICENSE)

---

## 📖 Mục lục

1. [Giới thiệu dự án](#giới-thiệu-dự-án)
2. [Tính năng nổi bật](#tính-năng-nổi-bật)
3. [Kho dữ liệu ẩm thực 5 quốc gia](#kho-dữ-liệu-ẩm-thực-5-quốc-gia)
4. [Cấu trúc thư mục dự án](#cấu-trúc-thư-mục-dự-án)
5. [Hướng dẫn cài đặt & khởi chạy](#hướng-dẫn-cài-đặt--khởi-chạy)
6. [Quy trình Build & Triển khai](#quy-trình-build--triển-khai)
7. [Hệ thống kiểm thử chất lượng](#hệ-thống-kiểm-thử-chất-lượng)
8. [Quy tắc bảo trì & phát triển mã nguồn](#quy-tắc-bảo-trì--phát-triển-mã-nguồn)
9. [Tài liệu tham khảo chuyên sâu](#tài-liệu-tham-khảo-chuyên-sâu)

---

## 🌟 Giới thiệu dự án

**Ăn Gì Đây?** là ứng dụng web hiện đại giải quyết câu hỏi muôn thuở mỗi ngày: *"Hôm nay ăn gì?"*. 

Ứng dụng kết hợp giữa **vòng quay Roulette / Gacha phong cách CS:GO** đầy kịch tính với **cơ sở dữ liệu ẩm thực phong phú của 5 quốc gia**, tự động nhận diện bữa ăn theo thời gian thực trong ngày, hỗ trợ đa tiền tệ, đa ngôn ngữ, quản lý ngân sách, và lưu trữ bộ sưu tập món ăn đã khám phá.

Điểm đặc biệt nhất của dự án là triết lý **Pure Web Fundamentals**:
- **Zero Runtime Dependencies**: Không sử dụng React, Vue, Angular, jQuery hay bất kỳ thư viện frontend đóng gói nào lúc chạy.
- **100% Offline PWA**: Tích hợp Service Worker hoàn chỉnh, lưu bộ nhớ đệm toàn bộ 333+ hình ảnh món ăn thực tế và toàn bộ mã nguồn, cho phép mở và quay thưởng ngay cả khi mất kết nối mạng.
- **Bảo vệ quyền riêng tư tuyệt đối**: Không thu thập dữ liệu cá nhân; mọi sở thích, lịch sử quay và bộ sưu tập đều được lưu trực tiếp trên thiết bị của người dùng (IndexedDB & LocalStorage).

---

## 🚀 Tính năng nổi bật

### 🎰 1. Vòng quay Gacha Roulette sống động
- Trục quay ngang đa thẻ với thuật toán giảm tốc vật lý tự nhiên (`cubic-bezier` deceleration curve).
- Thuật toán đảm bảo không bao giờ xuất hiện 2 thẻ giống nhau nằm liền kề trên dải quay.
- Hệ thống âm thanh độc quyền tổng hợp trực tiếp bằng **Web Audio API** (tiếng tạch tạch theo từng nhịp quay, nhạc reo chiến thắng khi trúng món).
- Phân loại độ hiếm rõ ràng:
  - 🥉 **3 Sao (Đồng - Phổ biến)**: Món ăn thường ngày, bình dân.
  - 🥈 **4 Sao (Bạc - Đặc sắc)**: Món ngon nổi tiếng, hương vị đặc trưng.
  - 🥇 **5 Sao (Vàng - Huyền thoại)**: Sơn hào hải vị, đặc sản trứ danh kèm hiệu ứng ánh kim lấp lánh và pháo hoa giấy chúc mừng.

### 🍱 2. Chế độ quay đa dạng & Quản lý ngân sách
- **Quay 1 món**: Quyết định nhanh món ăn chính xác cho bữa ăn tiếp theo.
- **Quay 3 món**: Đưa ra 3 phương án để người dùng dễ dàng cân nhắc lựa chọn.
- **Rút Combo thông minh**: Tự động ghép thành 1 mâm cơm trọn vẹn gồm **Món chính + Món ăn kèm/Ăn vặt + Đồ uống thanh mát**.
- **Bộ lọc ngân sách**: Đặt mức chi tiêu tối đa (theo đơn vị tiền tệ bản địa), thuật toán chỉ chọn lọc các món ăn hoặc combo nằm trong tầm giá cho phép.

### 🕒 3. Tách biệt độc lập: Múi giờ vs Ngôn ngữ hiển thị
- **Múi giờ khu vực (Timezone)**: Quyết định danh mục món ăn bản địa, bữa ăn tự động theo giờ địa phương, và đơn vị tiền tệ (`₫`, `¥`, `₩`, `$`).
- **Ngôn ngữ hiển thị (Display Language)**: Hỗ trợ 5 ngôn ngữ (**Tiếng Việt**, **English**, **日本語**, **한국어**, **中文**). Thay đổi ngôn ngữ sẽ dịch toàn bộ giao diện và tên món ăn mà **không làm thay đổi thực đơn hay giá tiền** của quốc gia đang chọn.

### 🎨 4. Hệ thống giao diện thông minh (Appearance System)
- **Chế độ hiển thị**:
  - ☀️ **Sáng (Light Mode)**
  - 🌙 **Tối (Dark Mode)**
  - ⏰ **Tự động theo thời gian thực (Real-time Auto)**: Tự động đổi màu nền và sắc thái theo giờ mặt trời mọc/lặn (Vàng nhạt buổi sáng → Cam ấm buổi trưa → Tím than buổi tối → Đen êm dịu lúc khuya).
- **Màu sắc chủ đạo (Accent Colors)**:
  - 🎨 **Màu hệ thống (`system`)**: Chuyển sắc gradient cam đất hiện đại.
  - 🧱 **Đỏ gạch (`brick`)**
  - 🍋 **Vàng chanh (`lemon`)**
  - 🍃 **Xanh lá (`green`)**
  - 🔮 **Tím mộng mơ (`purple`)**
  - 🌈 **Tự chọn màu tùy biến (`custom`)**: Bộ chọn mã màu Hex tích hợp, tự động tính toán độ tương phản văn bản đạt chuẩn WCAG.
- Chống giật giao diện (No FOUC) nhờ script `theme-init.js` nạp đồng bộ trước khi render CSS.

### 📖 5. Sổ tay ẩm thực & Sở thích cá nhân
- **Bộ sưu tập (Collections)**: Lưu trữ trong **IndexedDB**, theo dõi phần trăm thực đơn đã khám phá, số lần quay trúng từng món.
- **Món yêu thích**: Đánh dấu tim các món khoái khẩu để ưu tiên xuất hiện.
- **Món đã ăn gần đây**: Tự động giảm tỷ lệ lặp lại món ăn vừa ăn trong vài bữa trước.
- **Ẩn món (Blacklist)**: Loại bỏ các món gây dị ứng hoặc không hợp khẩu vị ra khỏi vòng quay.

### 📍 6. Tìm quán quanh đây (Nearby Google Maps)
- Một chạm mở ngay liên kết tìm kiếm địa điểm trên Google Maps với từ khóa chuẩn xác cho từng món ăn.
- Hoàn toàn miễn phí, không gọi API Google trả phí, đảm bảo 100% quyền riêng tư và tương thích trên mọi thiết bị.

---

## 🌏 Kho dữ liệu ẩm thực 5 quốc gia

Dự án sở hữu kho dữ liệu đồ sộ gồm **333 món ăn** được tuyển chọn công phu, chia đều theo 6 khung bữa: **Buổi Sáng**, **Buổi Trưa**, **Buổi Chiều**, **Buổi Tối**, **Món Ăn Vặt**, **Đồ Uống & Nước Ngọt**.

| Quốc gia | Mã vùng | Số lượng | Đơn vị tiền tệ | Món ăn tiêu biểu |
| :--- | :---: | :---: | :---: | :--- |
| 🇻🇳 **Việt Nam** | `vi` | 113 món | VNĐ (`₫`) | Phở bò tái nạm, Bún bò Huế, Cơm tấm sườn bì chả, Bánh mì chảo, Bánh căn Đà Lạt, Bánh lọt nước cốt dừa, Chè bưởi An Giang, Cà phê trứng Hà Nội... |
| 🇯🇵 **Nhật Bản** | `ja` | 55 món | JPY (`¥`) | Nigiri Sushi, Chirashizushi, Hakata Tonkotsu Ramen, Sanuki Udon, Katsudon, Hitsumabushi, Takoyaki, Okonomiyaki, Warabimochi, Melon soda float... |
| 🇰🇷 **Hàn Quốc** | `ko` | 55 món | KRW (`₩`) | Bossam thịt luộc, Dồi sụn Sundae chiên giòn, Rosé Tteokbokki, Samgyeopsal nướng, Samgyetang gà hầm sâm, Dolsot Bibimbap, Bánh cá Bungeoppang... |
| 🇨🇳 **Trung Quốc** | `zh` | 55 món | CNY (`¥`) | Tiểu Long Bao Thượng Hải, Bánh bao chiên Shengjianbao, Vịt quay Bắc Kinh, Đậu hũ Mapo Tofu, Mì bò Lan Châu, Há cảo tôm Har Gow, Bánh kẹp Jianbing... |
| 🇬🇧/🇺🇸 **Âu - Mỹ** | `en` | 55 món | USD (`$`) | Double Smash Cheeseburger, New York Pepperoni Pizza, Fish & Chips, Maine Lobster Roll, Philly Cheesesteak, Texas BBQ Brisket, New York Cheesecake... |

> **Quy chuẩn hình ảnh 100% thực tế:** Toàn bộ 333 món ăn đều sử dụng ảnh chụp món ăn thật đã qua chế biến từ nguồn mở **Wikimedia Commons & Wikipedia**, chuẩn hóa kích thước **640x480**, định dạng **WebP** chất lượng cao (dung lượng tối ưu 20-50KB/ảnh). Tuyệt đối không dùng ảnh minh họa chung chung hay ảnh vẽ nhân vật.

---

## 📁 Cấu trúc thư mục dự án

```text
BFSC/
├── src/                          # MÃ NGUỒN FRONTEND
│   ├── index.html                # Trang chính ứng dụng
│   ├── credits.html              # Trang thông tin bản quyền & cảm ơn
│   ├── privacy.html              # Chính sách bảo mật người dùng
│   ├── terms.html                # Điều khoản sử dụng
│   ├── manifest.json             # Cấu hình PWA Web App Manifest
│   ├── sw.js                     # Service Worker lưu bộ nhớ đệm offline
│   ├── theme-init.js             # Script khởi tạo theme đồng bộ trước CSS
│   ├── js/                       # Mô-đun JavaScript thuần
│   │   ├── app.js                # Điều phối giao diện chính (Controller)
│   │   ├── data.js               # CSDL món ăn 5 quốc gia & từ điển i18n
│   │   ├── gacha.js              # Động cơ Gacha, xác suất, ngân sách
│   │   ├── controls.js           # Dropdown, combobox, color picker chuẩn ARIA
│   │   ├── animation.js          # Hoạt ảnh trục quay roulette CS:GO
│   │   ├── audio.js              # Bộ tổng hợp âm thanh Web Audio API
│   │   ├── collection.js         # Quản lý sổ tay bộ sưu tập qua IndexedDB
│   │   ├── dish-preferences.js   # Quản lý danh sách ẩn, yêu thích, ăn gần đây
│   │   ├── experience.js         # Phản hồi xúc giác & giảm hiệu ứng chuyển động
│   │   ├── nearby.js             # Tạo liên kết tìm quán trên Google Maps
│   │   └── ui.js                 # Thông báo Toast, modal, cài đặt PWA
│   ├── styles/                   # Mã nguồn CSS chia theo mô-đun
│   │   ├── base.css              # Cấu trúc nền tảng & CSS Reset
│   │   ├── interactions.css      # Trạng thái hover, focus, animation
│   │   ├── mobile.css            # Tối ưu giao diện điện thoại di động
│   │   ├── refinements.css       # Tinh chỉnh thị giác, bóng đổ, bo góc
│   │   └── themes.css            # Biến màu sắc, Dark/Light & Auto theme
│   ├── assets/                   # Tài nguyên tĩnh
│   │   ├── brand.svg             # Logo ứng dụng
│   │   ├── icons.svg             # Hệ thống SVG Sprite Icons
│   │   ├── fonts/                # Web Fonts nhúng cục bộ (.woff2)
│   │   └── vendor/motion.js      # Thư viện hỗ trợ chuyển động nhẹ
│   └── images/                   # Kho hình ảnh WebP 640x480
│       ├── buoi_sang/, buoi_trua/... # Ảnh các món Việt Nam truyền thống
│       ├── regional/             # Ảnh các món ẩm thực quốc tế (ja, ko, zh, en)
│       └── sources.json          # Trích dẫn bản quyền và tác giả từng bức ảnh
├── backend/                      # MÃ NGUỒN MÁY CHỦ PYTHON
│   ├── server.py                 # Máy chủ HTTP chuẩn bảo mật CSP & allowlist
│   ├── run_server.py             # Hỗ trợ tích hợp Cloudflare Tunnel
│   ├── places_service.py         # Mock Places API (Maps-link mode)
│   ├── places_budget.py          # Xử lý ngân sách phía máy chủ
│   └── data/                     # Dữ liệu nội bộ máy chủ (không xuất bản)
├── scripts/                      # KỊCH BẢN BUILD & CÔNG CỤ
│   ├── build_public.py           # Kịch bản biên dịch tĩnh src/ -> public/
│   ├── public_files.py           # Danh mục Allowlist các file được phép xuất bản
│   └── master_replace_food_images.py # Pipeline tải & chuẩn hóa ảnh món ăn
├── tests/                        # HỆ THỐNG KIỂM THỬ TOÀN DIỆN
│   ├── test_server.py            # Unit test máy chủ HTTP
│   ├── test_public_security.py   # Kiểm thử bảo mật CSP & Allowlist
│   ├── test_places.py            # Kiểm thử dịch vụ địa điểm
│   ├── test_places_budget.py     # Kiểm thử tính toán ngân sách
│   └── *.test.cjs, *.cjs         # Bộ kiểm thử trình duyệt Playwright & Node.js
├── public/                       # THƯ MỤC BUILD OUTPUT (TỰ SINH - KHÔNG SỬA)
├── server.py                     # Entry point khởi chạy máy chủ nhanh
├── run_server.py                 # Entry point khởi chạy máy chủ kèm tunnel
├── build_public.py               # Entry point build tĩnh tại gốc dự án
├── package.json                  # Cấu hình lệnh kiểm thử và Prettier
├── vercel.json, netlify.toml     # Cấu hình triển khai đám mây
└── AI_SYSTEM_REFERENCE.md        # Tài liệu kiến trúc chuyên sâu dành riêng cho AI
```

---

## 💻 Hướng dẫn cài đặt & khởi chạy

### 1. Yêu cầu hệ thống
- **Python**: Phiên bản `3.10` trở lên (Khuyến nghị Python 3.12+).
- **Node.js** *(Tùy chọn, chỉ cần khi chạy kiểm thử Playwright hoặc format code)*: `18.0.0` trở lên.
- **Trình duyệt**: Bất kỳ trình duyệt hiện đại nào (Chrome, Edge, Firefox, Safari).

### 2. Khởi chạy máy chủ cục bộ (Local Server)
Tại thư mục gốc của dự án, mở terminal và chạy:

```bash
python server.py
```

Máy chủ sẽ tự động biên dịch `public/` và phục vụ tại:
- **Địa chỉ máy tính**: `http://localhost:8080`
- **Địa chỉ mạng Wi-Fi (LAN)**: Được in trực tiếp ra terminal (Ví dụ: `http://192.168.1.15:8080`), cho phép các thiết bị khác trong cùng mạng Wi-Fi (điện thoại, iPad) truy cập trực tiếp.

### 3. Phím tắt cho người dùng Windows
- Nhấp đúp chuột vào tệp **`CHAY_WEB_CHO_DIEN_THOAI.bat`** để tự động khởi động máy chủ và hiển thị địa chỉ IP kết nối trên điện thoại.

### 4. Khởi chạy với Cloudflare Tunnel (Chia sẻ ra Internet)
Nếu bạn có cài đặt Cloudflare Tunnel (`cloudflared`):
```bash
python run_server.py
```
Máy chủ sẽ tạo liên kết public an toàn HTTPS để gửi cho bạn bè trải nghiệm từ xa mà không cần mở cổng modem.

---

## 🛠️ Quy trình Build & Triển khai

### 1. Cơ chế Build an toàn (`build_public.py`)
Dự án áp dụng nguyên tắc **Allowlist Tuyệt Đối**:
- Kịch bản `scripts/build_public.py` đọc danh sách `PUBLIC_FILES` trong `scripts/public_files.py`.
- Ghép các file CSS theo đúng thứ tự nghiêm ngặt thành một file duy nhất `/style.css`:
  $$\text{base.css} \longrightarrow \text{interactions.css} \longrightarrow \text{mobile.css} \longrightarrow \text{refinements.css} \longrightarrow \text{themes.css}$$
- Sao chép các tệp HTML, JS, font, ảnh sang thư mục đích `public/`.
- Tự động dọn dẹp các tệp mồ côi không có trong danh sách xuất bản.

Để kích hoạt build thủ công:
```bash
python build_public.py
```

### 2. Triển khai lên Vercel / Netlify
Dự án được cấu hình sẵn sàng cho việc triển khai không máy chủ (Serverless / Static Hosting):
- **Vercel**: Sử dụng cấu hình `vercel.json` phục vụ thư mục tĩnh `public/` và endpoint `api/places.py`.
- **Netlify**: Sử dụng `netlify.toml` tự động chạy lệnh `python build_public.py` và xuất bản `public/`.

---

## 🧪 Hệ thống kiểm thử chất lượng

Dự án duy trì tỷ lệ vượt qua **100% tất cả các bài kiểm thử**:

### 1. Kiểm thử đơn vị Python (19 Tests)
Kiểm tra an ninh máy chủ, chính sách bảo vệ Content Security Policy (CSP), định dạng MIME, cơ chế từ chối duyệt thư mục trái phép, và logic tính toán ngân sách:

```bash
python -B -m unittest discover -s tests -p "test_*.py"
```

*Kết quả: `Ran 19 tests in 4.8s - OK`.*

### 2. Kiểm thử logic & Trình duyệt (Node.js & Playwright)
```bash
# Kiểm thử động cơ Gacha, logic chọn món, bộ sưu tập
node --test tests/*.test.cjs

# Kiểm thử giao diện trực quan trên trình duyệt Chromium/Edge
npm run test:browser
npm run test:theme
npm run test:mobile-compact
```

### 3. Kiểm tra định dạng mã nguồn (Code Formatting)
```bash
npm run format:check
npm run format
```

---

## ⚠️ Quy tắc bảo trì & phát triển mã nguồn

Nếu bạn là nhà phát triển (hoặc AI coding agent) đang chỉnh sửa dự án này, hãy tuân thủ **4 nguyên tắc bất di bất dịch**:

1. **Tuyệt đối KHÔNG sửa file trong `public/`**: Thư mục `public/` là sản phẩm tự động sinh ra từ build. Mọi thay đổi trực tiếp tại đây sẽ bị ghi đè hoàn toàn trong lần build tiếp theo. Hãy sửa trong `src/` hoặc `scripts/`.
2. **Luôn đăng ký tài nguyên mới**: Khi thêm bất kỳ tệp hình ảnh, font chữ hay script mới, bắt buộc phải:
   - Khai báo đường dẫn trong `scripts/public_files.py`.
   - Khai báo cache trong `src/sw.js` (nếu cần cache offline).
   - Chạy lệnh `python build_public.py`.
   - Khởi động lại `server.py` để server cập nhật danh mục cho phép trong bộ nhớ.
3. **Giữ vững triết lý JavaScript thuần**: Tuyệt đối không import thêm thư viện npm chạy ở frontend (như React, Axios, Lodash, Bootstrap). Mọi tính năng phải được viết bằng tiêu chuẩn ECMAScript hiện đại.
4. **Bảo tồn tính độc lập giữa Múi giờ và Ngôn ngữ**: Tuyệt đối không để việc đổi ngôn ngữ hiển thị làm thay đổi danh sách món ăn hay mệnh giá tiền tệ, và ngược lại.

---

## 📚 Tài liệu tham khảo chuyên sâu

- 🤖 **[AI_SYSTEM_REFERENCE.md](AI_SYSTEM_REFERENCE.md)**: Bản đặc tả kiến trúc kỹ thuật toàn diện dành riêng cho AI / LLM Agents (sơ đồ quan hệ phụ thuộc các file, luồng dữ liệu, hợp đồng kiểu dữ liệu, các bẫy logic cần tránh).
- 🏗️ **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Tài liệu kiến trúc gốc và hướng dẫn phân tầng ứng dụng.
- 📖 **[docs/USER_GUIDE.md](docs/USER_GUIDE.md)**: Sổ tay hướng dẫn chi tiết dành cho người dùng cuối.
- 🎨 **[docs/OPEN_SOURCE.md](docs/OPEN_SOURCE.md)**: Danh mục các tài nguyên mở, font chữ và giấy phép sử dụng trong dự án.

---

**Ăn Gì Đây?** — *Một bữa ngon, một ngày vui!* 🍲🥢
