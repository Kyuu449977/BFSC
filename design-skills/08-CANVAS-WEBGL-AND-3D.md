# 08. CANVAS UI (WEBGL TRÊN DOM TƯƠNG TÁC) & SCROLL WORLD (3D SEAMLESS)
> Nguồn: `DavidHDev/canvas-ui` & `oso95/scroll-world`

---

## 🌊 1. Canvas UI: WebGL Shaders Chạy Trực Tiếp Trên HTML Thật

Trước đây, khi dùng WebGL hoặc Canvas 3D (Three.js), toàn bộ giao diện biến thành một bức tranh phẳng (canvas), khiến người dùng không thể bôi đen chữ, không bấm được link hay điền form bình thường.

**Canvas UI giải quyết triệt để vấn đề này**:
- Sử dụng cơ chế kết hợp WebGL/WebGPU và HTML-in-canvas.
- **Văn bản vẫn bôi đen được, link vẫn bấm được, form input vẫn gõ bình thường**.
- Phía sau hoặc phủ lên trên là các shader đồ họa đỉnh cao:
  - **Fluid Simulation (Mô phỏng chất lỏng)**: Chuột di chuyển tạo ra sóng nước hoặc khói uốn lượn quanh các thẻ món ăn.
  - **Glass Refraction (Kính mờ khúc xạ)**: Khiến các phần tử phía dưới bị bẻ cong quang học theo góc nhìn thực tế.
  - **Force Field (Trường lực hạt)**: Hàng nghìn hạt bụi sao dạt ra khi đưa chuột vào card thực đơn.
  - **Shatter / Decrypt Reveal**: Hiệu ứng chữ vỡ vụn hoặc giải mã ký tự kiểu ma trận.

### Mã Minh Họa (Vanilla JS / WebGL):
```html
<!-- DOM vẫn hoàn toàn tương tác và thân thiện với SEO -->
<div class="interactive-surface relative">
  <canvas class="canvas-webgl-layer absolute inset-0 pointer-events-none"></canvas>
  <div class="dom-content relative z-10">
    <h2>Thực Đơn Đêm Tokyo</h2>
    <p>Nhấp vào đây để khám phá các món xiên que nướng thơm lừng.</p>
    <button class="btn-primary">Đặt Ngay</button>
  </div>
</div>
```

---

## 🌌 2. Scroll World: Cuộn Trang 3D Không Cắt Cảnh (Seamless 3D Flight)

Scroll World là kỹ thuật tạo landing page đưa người dùng vào một **chuyến bay 3D liên tục**:
- Khi người dùng cuộn chuột, camera 3D bay từ bầu trời vào thẳng cánh cửa một quán ăn, lướt qua quầy bar nơi đầu bếp đang chuẩn bị sushi, rồi bay xuyên qua làn khói thơm để mở ra bàn tiệc lẩu nghi ngút.
- **Không có vết cắt cảnh (Zero-cut)**: Mọi chuyển tiếp cảnh diễn ra mượt mà theo từng pixel cuộn chuột.
- Kết hợp hoàn hảo giữa 3D Scene (Three.js / WebGL) và GSAP ScrollTrigger để đồng bộ hóa tốc độ ngón tay người dùng.
