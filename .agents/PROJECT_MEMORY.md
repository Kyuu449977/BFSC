# Project Memory - Bữa Ăn Hôm Nay (BFSC)

## 1. Product Summary & Active Rules
- **Core Concept:** Vietnamese Food Discovery Web App / PWA with high-performance CSGO horizontal roulette reel and real-world food app UX (Baemin, GrabFood, DoorDash).
- **Baemin Gen Z & Appetite-Driven Design System:**
  - Light mode: Fresh porcelain canvas (`#F8FAFA`), crisp white food cards (`#FFFFFF`), signature Baemin Mint (`#2AC1BC`) for brand/navigation/filters, Coral Watermelon Red (`#FF5252`) for food CTAs & prices, Honey Amber (`#F59E0B`) for highlights, clean hairlines (`#E5E7EB`).
  - Dark mode: Slate midnight (`#0F172A`), dark slate cards (`#1E293B`), electric teal (`#2DD4BF`), vibrant coral (`#FF6B6B`), border (`#334155`).
  - Zero AI Slop: No drab monochromatic pseudo-luxury palettes; food card surfaces remain 100% pure white to preserve appetizing dish colors.
- **Roulette Mechanism (High Performance 60FPS Engine):**
  - Classic CSGO horizontal case-opening reel (`FoodRoulette`) with quartic ease-out deceleration (`1 - (1-p)^4`).
  - Snappy 1.6s spin + 0.45s gold pulse landing pause (~2.0s total cycle).
  - Hardware-accelerated GPU layer isolation, crisp dish imagery fallback to `assets/brand.svg`.
- **Layout Architecture:**
  - Desktop (`>= 900px`): Split-Hero 2-column layout. Left column (55%) = spin controls + budget selector; Right column (45%) = Today's featured dish showcase.
  - Mobile (`< 900px`): Ergonomic full-width vertical stack with 3-tab bottom navigation (`Gợi ý`, `Thực đơn`, `Cài đặt`).
  - Custom Wheel Modal (`#customWheelDialog`): Full-width 100% textarea, top-aligned description, horizontal quick-action toolbar, non-overflowing coral CTA button.

## 2. Live Deployments & Hosting
- **Netlify (Main Production):** `https://bfsc.netlify.app`
- **Render (Blueprint Web Service):** Configured via `render.yaml` (`hom-nay-an-gi`).
- **Local Dev Server:** `http://localhost:8080` (Active).

## 3. Architecture & God Nodes
- **`src/js/theme-init.js`:** Synchronous theme initialization with Baemin Mint and Coral Red palette.
- **`src/js/animation.js`:** `FoodRoulette` engine rendering real dish cards on `#reelTrack` with CSGO ease-out physics.
- **`src/js/app.js`:** Central controller wiring roulette spin dialog, translations, filters, and meal periods.
- **`src/styles/base.css`:** Baemin Gen Z tokens, Split-Hero desktop grid, button hierarchy, clean cards.
- **`src/styles/mobile.css`:** 3-tab ergonomic bottom navigation bar on mobile screens.
- **`src/styles/interactions.css`:** GPU-isolated spin dialog, CSGO win pulse keyframes, custom wheel modal layout.
- **`src/styles/refinements.css`:** High-performance menu grid with CSS containment (`contain: content;`).
- **`build_public.py` & `scripts/public_files.py`:** Public compilation pipeline.

## 4. Recent Completed Changes
- **Baemin Gen Z Redesign & Real-World Food Web Optimization:**
  1. Replaced drab, monochromatic Michelin palette with vibrant, youth-appealing Baemin Mint (`#2AC1BC`) + Coral Watermelon Red (`#FF5252`) + Porcelain White (`#F8FAFA`).
  2. Fixed Custom Wheel Modal (`#customWheelDialog`): 100% full-width input, eliminated vertical text squishing, balanced toolbar buttons, mobile touch comfort.
  3. Implemented Desktop Split-Hero layout (`@media (min-width: 900px)`): 2-column layout placing interactive controls on the left and sticky Today's Pick showcase on the right.
  4. Built static assets with `build_public.py`, passed all 34/34 automated unit tests, updated graphify knowledge graph.
