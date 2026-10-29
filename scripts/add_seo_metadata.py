import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'src/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Head section
old_head_meta = '''    <meta
      name="description"
      content="Chọn món Việt theo buổi, khám phá 89 lựa chọn món ăn bình dân và tìm quán trên Google Maps. Dùng ngay trên điện thoại, không cần quét mã."
    />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Ăn gì đây?" />
    <script src="theme-init.js"></script>
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="images/icons/icon-192.png" />
    <link rel="icon" href="assets/brand.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/fonts/fonts.css" />
    <link rel="stylesheet" href="style.css" />
    <title>Ăn gì đây? — Một bữa ngon, một ngày vui</title>'''

new_head_meta = '''    <title>Ăn gì đây? — Hôm nay ăn gì? Vòng quay random món ăn & Quán ngon gần bạn</title>
    <meta
      name="description"
      content="Ăn gì đây? Ứng dụng vòng quay random món ăn, thực đơn món chính, đồ ăn vặt hot trend và thức uống giải khát số 1 Việt Nam. Giúp bạn quyết định hôm nay ăn gì trong tích tắc, tự động tìm quán ngon gần nhất trên Google Maps!"
    />
    <meta
      name="keywords"
      content="ăn gì đây, hôm nay ăn gì, trưa nay ăn gì, tối nay ăn gì, sáng nay ăn gì, ăn gì hôm nay, vòng quay random món ăn, vòng quay ăn gì, gợi ý món ăn, món ngon mỗi ngày, món ăn việt nam, đồ ăn vặt hot trend, thức uống giải khát, trà sữa, quán ăn gần đây, bánh tráng trộn, phở bò, cơm tấm"
    />
    <meta name="author" content="Ăn Gì Đây" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="https://angiday.app/" />

    <!-- Open Graph / Facebook / Zalo / Telegram Previews -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Ăn Gì Đây?" />
    <meta property="og:title" content="Ăn gì đây? — Hôm nay ăn gì? Vòng quay random món ăn & Quán ngon gần bạn" />
    <meta
      property="og:description"
      content="Không còn đau đầu nghĩ món! Vòng quay random món chính, đồ ăn vặt hot trend và thức uống mát lạnh, tự động tìm đường đến quán ngon trên Google Maps."
    />
    <meta property="og:url" content="https://angiday.app/" />
    <meta property="og:image" content="https://angiday.app/assets/brand.svg" />
    <meta property="og:image:alt" content="Ăn Gì Đây? - Vòng quay chọn món ăn" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:locale:alternate" content="en_US" />
    <meta property="og:locale:alternate" content="ja_JP" />
    <meta property="og:locale:alternate" content="ko_KR" />
    <meta property="og:locale:alternate" content="zh_CN" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Ăn gì đây? — Hôm nay ăn gì? Vòng quay random món ăn" />
    <meta
      name="twitter:description"
      content="Vòng quay ngẫu nhiên món chính, đồ ăn vặt và thức uống giải khát, tự động tìm quán ngon gần nhất."
    />
    <meta name="twitter:image" content="https://angiday.app/assets/brand.svg" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Ăn gì đây?" />
    <script src="theme-init.js"></script>
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="images/icons/icon-192.png" />
    <link rel="icon" href="assets/brand.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="assets/fonts/fonts.css" />
    <link rel="stylesheet" href="style.css" />

    <!-- Schema.org JSON-LD Structured Data for Search Engines -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebApplication",
          "@id": "https://angiday.app/#webapp",
          "name": "Ăn Gì Đây?",
          "alternateName": ["Hôm Nay Ăn Gì", "Vòng Quay Ăn Gì", "What To Eat Today"],
          "url": "https://angiday.app/",
          "description": "Ứng dụng vòng quay random món ăn, thực đơn món chính, đồ ăn vặt hot trend và đồ uống giải khát, tự động tìm quán ngon gần bạn trên Google Maps.",
          "applicationCategory": "FoodAndDrinkApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "inLanguage": ["vi", "en", "ja", "ko", "zh"],
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "VND"
          },
          "featureList": [
            "Vòng quay random món chính, ăn vặt và đồ uống",
            "Vòng quay tự chọn tùy biến với kho tàng Món từ Vũ Trụ",
            "Hiệu ứng thẻ bài 3D Flip Card bí ẩn",
            "Tìm quán ăn gần nhất trên Google Maps trong 1 chạm",
            "Âm nhạc nền vui tươi kích thích vị giác",
            "Chế độ hiển thị sáng/tối tự động đồng bộ theo buổi trong ngày"
          ]
        },
        {
          "@type": "WebSite",
          "@id": "https://angiday.app/#website",
          "url": "https://angiday.app/",
          "name": "Ăn Gì Đây?",
          "description": "Một bữa ngon, một ngày vui. Giải pháp chọn món ăn hàng ngày cho người Việt.",
          "inLanguage": "vi-VN"
        }
      ]
    }
    </script>'''

c_norm = content.replace('\r\n', '\n')
t_norm = old_head_meta.replace('\r\n', '\n')
assert t_norm in c_norm, 'old_head_meta not found'
content = c_norm.replace(t_norm, new_head_meta, 1)

# 2. Add SEO Section right above <footer>
old_footer = '      <footer>'
new_footer = '''      <!-- SEO Information Section -->
      <section class="seo-intro" aria-label="Giới thiệu Ăn Gì Đây">
        <div class="seo-intro-content">
          <h2>Ăn Gì Đây? — Vòng Quay Random Món Ăn & Gợi Ý Bữa Ngon Hôm Nay</h2>
          <p>
            Bạn đang băn khoăn tự hỏi <strong>"Hôm nay ăn gì?", "Trưa nay ăn gì?", "Tối nay ăn gì?"</strong>? 
            <strong>Ăn Gì Đây?</strong> là ứng dụng thông minh giúp bạn chọn món ngẫu nhiên trong 1 nốt nhạc, 
            tổng hợp trọn vẹn hơn 100+ món chính đặc sắc khắp 3 miền, hơn 37 món ăn vặt đường phố hot trend và hơn 73 loại đồ uống thanh mát.
          </p>
          <div class="seo-features-grid">
            <div class="seo-feature-item">
              <span class="seo-feature-icon">✨</span>
              <strong>Vòng Quay Random Món Ăn</strong>
              <p>Quay 1 món, 3 món hoặc Combo (Món chính + Ăn vặt + Đồ uống) cùng hiệu ứng thẻ bài 3D bí ẩn.</p>
            </div>
            <div class="seo-feature-item">
              <span class="seo-feature-icon">🌌</span>
              <strong>Vòng Quay Tự Chọn & Món Vũ Trụ</strong>
              <p>Tự nhập món bạn thích hoặc chọn nhanh từ menu web để quay ngẫu nhiên theo nhu cầu riêng.</p>
            </div>
            <div class="seo-feature-item">
              <span class="seo-feature-icon">📍</span>
              <strong>Tìm Quán Ngon Gần Bạn</strong>
              <p>Xem vị trí, chỉ đường và đánh giá quán ăn trên Google Maps chỉ với 1 thao tác chạm.</p>
            </div>
            <div class="seo-feature-item">
              <span class="seo-feature-icon">🎵</span>
              <strong>Nhạc Nền Vui Tươi & Giao Diện Theo Buổi</strong>
              <p>Âm nhạc kích thích cảm giác ngon miệng và màu nền tự động chuyển đổi theo thời gian thực.</p>
            </div>
          </div>
        </div>
      </section>

      <footer>'''

assert old_footer in content, 'old_footer not found'
content = content.replace(old_footer, new_footer, 1)

with open(r'src/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Successfully added comprehensive SEO metadata, JSON-LD, OpenGraph, and semantic SEO content to src/index.html!')
