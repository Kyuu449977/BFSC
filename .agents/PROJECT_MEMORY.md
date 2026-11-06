# Project Memory - Bữa Ăn Hôm Nay (BFSC)

## 1. Product Summary & Active Rules
- **Core Concept:** Vietnamese Food Discovery PWA combining daily meal suggestion roulette with Genshin Impact-style Gacha Wish ("Cầu Nguyện Ẩm Thực").
- **Gacha Engine:** 3-tier rarities (3★ Common, 4★ Rare, 5★ Legendary), multi-roll (10x), guarantee pity system, and cinematic video cutscenes.
- **Account & Inventory System:**
  - "Ước x10" (10-pull) & Inventory storage gated to logged-in users only.
  - Daily ticket quota: 20 pulls/day (`⚡ 20/20 vé`), auto-refreshed at 00:00.
  - 5% chance of rolling a brand-new dish; 95% duplicate drop converted into Breakthrough Shards ("Mảnh Đột Phá").
  - Star Breakthrough evolution: up to 5★ Hoàng Gia with visual glowing badge (`✦ ĐỘT PHÁ LÊN 5★! ✦`).
  - Google Sign-In: Google Identity Services integration with real name, email, avatar parsing.
- **Clean Experience:** 100% ad-free. All third-party advertising scripts (Monetag, Adsterra, PropellerAds, Bauval) and banner slots have been completely removed.

## 2. Live Deployments
- **Netlify (Main Production):** `https://bfsc.netlify.app` (100% Free, auto-deployed from GitHub `main`).
- **Local Dev Server:** `http://localhost:8080` (and `http://192.168.1.4:8080`).

## 3. Architecture & God Nodes
- **`src/js/engine.js`:** Pure deterministic food roulette & gacha math engine.
- **`src/js/wish-ui.js`:** Genshin-style wish presentation, cards grid, inspect overlay, and breakthrough badges.
- **`src/js/app.js`:** Central controller wiring UI buttons, gacha modal, and server API calls.
- **`src/js/auth.js` & `src/js/api.js`:** Frontend auth state, session management, and API client with LocalEngine fallback.
- **`backend/auth_service.py` & `backend/server.py`:** Python backend service.
- **`build_public.py` & `scripts/public_files.py`:** Build pipeline compiling `src/` to `public/`.
