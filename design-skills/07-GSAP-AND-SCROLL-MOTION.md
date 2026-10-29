# 07. CHUYỂN ĐỘNG NÂNG CAO VỚI GSAP & SCROLLTRIGGER
> Nguồn: `greensock/gsap-skills` - Bộ kỹ năng chính thức từ Greensock (GSAP Core, Timeline, ScrollTrigger)

---

## 🚀 Khi Nào Nên Dùng GSAP Thay Vì CSS Thuần?

CSS Animation xuất sắc cho các hiệu ứng đơn giản. Nhưng GSAP là lựa chọn số 1 khi:
1. **Cần xâu chuỗi hoạt ảnh phức tạp (Timeline Sequencing)**: Bước A xong mới đến bước B, bước C chạy song song với bước B sau 0.2s.
2. **Hiệu ứng gắn chặt với thao tác cuộn chuột (Scroll-driven animation với ScrollTrigger)**.
3. **Cần dừng, tua nhanh, đảo ngược hoặc điều khiển theo thời gian thực (pause, reverse, seek)**.
4. **Biến đổi hình dạng vector phức tạp (SVG Morphing & Path Animation)**.

---

## 🎯 Các Phương Thức Cốt Lõi

```javascript
// 1. gsap.to() - Chạy từ trạng thái hiện tại đến đích
gsap.to(".dish-card", {
  duration: 0.4,
  y: -6,
  opacity: 1,
  ease: "power2.out",
  stagger: 0.05 // Từng card xuất hiện so le cách nhau 0.05s
});

// 2. gsap.from() - Chạy từ một trạng thái khởi tạo về trạng thái ban đầu trong CSS
gsap.from(".hero-banner", {
  duration: 0.6,
  scale: 0.96,
  opacity: 0,
  ease: "power3.out"
});

// 3. gsap.timeline() - Tạo kịch bản chuỗi chuyển động hoàn hảo
const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.3 } });

tl.to(".modal-overlay", { opacity: 1, duration: 0.2 })
  .fromTo(".modal-content", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.1")
  .from(".modal-item", { y: 10, opacity: 0, stagger: 0.04 }, "-=0.15");
```

---

## 📜 Nghệ Thuật Cuộn Trang Với ScrollTrigger

ScrollTrigger biến thanh cuộn thành bộ điều khiển chuyển động:

```javascript
gsap.registerPlugin(ScrollTrigger);

// 1. Hiệu ứng ghim khung nhìn và cuộn qua từng phần (Pinning)
gsap.to(".food-highlight", {
  scrollTrigger: {
    trigger: ".food-highlight-container",
    start: "top top",     // Khi đỉnh container chạm đỉnh màn hình
    end: "+=1000",        // Giữ cố định trong 1000px cuộn chuột
    pin: true,            // Ghim chặt màn hình
    scrub: 1,             // Tua chuyển động mượt theo ngón tay cuộn
    markers: false        // Bật true khi debug
  },
  rotationY: 180,
  scale: 1.1
});

// 2. Responsive & Giảm chuyển động với gsap.matchMedia()
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  // Chỉ chạy hiệu ứng phức tạp trên máy tính
  gsap.to(".floating-ingredient", { y: -50, scrollTrigger: { scrub: true } });
});

mm.add("(prefers-reduced-motion: reduce)", () => {
  // Tự động vô hiệu hóa nếu người dùng bật giảm chuyển động
  gsap.set("*", { clearProps: "all" });
});
```
