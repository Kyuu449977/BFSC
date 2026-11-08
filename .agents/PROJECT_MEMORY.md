# Project Memory - Bữa Ăn Hôm Nay (BFSC)

## 1. Product Summary & Active Rules
- **Core Concept:** Vietnamese Culinary Discovery Web App / PWA inspired by Michelin Guide, Kinfolk, and NYT Cooking.
- **Michelin Editorial Design System:**
  - Light mode: Warm porcelain canvas (`#FBF9F5`), truffle black ink (`#181D1A`), Terracotta Red accent (`#B84324`), warm hairline dividers (`#EAE5DC`).
  - Dark mode: Truffle charcoal canvas (`#141615`), warm ivory ink (`#F5EFEB`), Champagne Gold accent (`#D4AF37`), subtle borders (`#2A2E2B`).
  - Typography: Editorial serif headings with elegant tracking; clean humanist sans body.
  - Zero AI Slop: Human, mature copywriting; no rainbow gradients or cheesy emojis ("Vũ trụ mang bất ngờ💫").
- **Roulette Mechanism (High Performance 60FPS Engine):**
  - Classic CSGO horizontal case-opening reel (`FoodRoulette`) with quartic ease-out deceleration (`1 - (1-p)^4`).
  - Snappy 1.6s spin + 0.45s gold pulse landing pause (~2.0s total cycle).
  - Hardware-accelerated GPU layer isolation, crisp dish imagery fallback to `assets/brand.svg`.
- **Streamlined Luxury UX & Impeccable Craft:**
  - Button Hierarchy: 1 Hero CTA (`#singleBtn`: "Gợi ý bữa ngon" with compass icon) on top, 2 secondary twin buttons (`#tripleBtn`: "3 món cân bằng", `#comboBtn`: "Thực đơn Combo") in a balanced grid below.
  - Elevated Budget Panel: Distinct card container, status badge, pill preset chips with warm accent glow.
  - 3-Tab Bottom Navigation Bar on Mobile: `[ 🧭 Gợi ý ]  [ 📖 Thực đơn ]  [ ⚙ Cài đặt ]`.
  - Zero collection clutter; clean contextual modal dish profile; WCAG AA contrast.

## 2. Live Deployments & Hosting
- **Netlify (Main Production):** `https://bfsc.netlify.app`
- **Render (Blueprint Web Service):** Configured via `render.yaml` (`hom-nay-an-gi`).
- **Local Dev Server:** `http://localhost:8080` (Active).

## 3. Architecture & God Nodes
- **`src/js/theme-init.js`:** Synchronous theme initialization with terracotta and champagne gold palette.
- **`src/js/animation.js`:** `FoodRoulette` engine rendering real dish cards on `#reelTrack` with CSGO ease-out physics.
- **`src/js/app.js`:** Central controller wiring roulette spin dialog, translations, filters, and meal periods.
- **`src/styles/base.css`:** Michelin Editorial tokens, serif headings, hero button hierarchy, luxury card styling.
- **`src/styles/mobile.css`:** 3-tab ergonomic bottom navigation bar on mobile screens.
- **`src/styles/interactions.css`:** GPU-isolated spin dialog, CSGO win pulse keyframes, elevated budget panel.
- **`src/styles/refinements.css`:** High-performance menu grid with CSS containment (`contain: content;`).
- **`build_public.py` & `scripts/public_files.py`:** Public compilation pipeline.

## 4. Recent Completed Changes
- **Michelin Editorial Redesign & Modal Layout Bug Fix:**
  1. Fixed Custom Wheel Modal (`#customWheelDialog`) layout breakdown: Removed faulty `.custom-wheel-content{grid-template-columns:minmax(0,1fr) auto}` that squeezed descriptions and count info into 20px vertical strips; unified into clean vertical flexbox stack with toolbar.
  2. Updated `DESIGN.md` & CSS tokens to Michelin Editorial palette (Terracotta Red `#B84324`, Truffle Ink `#181D1A`, Champagne Gold `#D4AF37`, Warm Porcelain `#FBF9F5`).
  3. Purged cheesy AI copywriting: "Bữa Ăn Hôm Nay" replaces "Hôm nay ăn gì?", "Khám phá hương vị Việt qua từng gợi ý tinh tuyển mỗi ngày" replaces "Vũ trụ sẽ mang bất ngờ tới cho bạn💫".
  4. Redesigned action layout: Hero CTA (`Gợi ý bữa ngon`) + twin secondary buttons (`3 món cân bằng`, `Thực đơn Combo`).
  5. Fixed reel image rendering & elevated budget panel with tactile pill presets and luxury card styling.
  6. Built static assets with `build_public.py`, passed all 34/34 tests (`python -m unittest discover tests`), updated graphify knowledge graph.
  7. Restored full ads system (Monetag deferred loader, Adsterra shelf banner, CSP network permissions) and pushed successfully to GitHub `origin/main` (`b42b944`).
  8. Capped Monetag OnClick redirect to strictly 1 time per session (`sessionStorage` check + `window.open` interception + script removal upon redirect); eliminated mobile & desktop whitespace voids (`.app` margin 10px, header/footer/hero padding compacting, `.ad-shelf-section` padding reduction & `:empty` collapse, `.filters` horizontal scroll ribbon).
