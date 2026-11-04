# Project Memory - Bữa Ăn Hôm Nay (BFSC)

## 1. Product Summary & Active Rules
- **Core Concept:** Vietnamese Food Discovery PWA combining daily meal suggestion roulette with Genshin Impact-style Gacha Wish ("Cầu Nguyện Ẩm Thực").
- **Gacha Engine:** 3-tier rarities (3★ Common, 4★ Rare, 5★ Legendary), multi-roll (10x), guarantee pity system, and cinematic video cutscenes.
- **Account & Inventory System (New):**
  - "Ước x10" (10-pull) & Inventory storage gated to logged-in users only.
  - Daily ticket quota: 20 pulls/day (`⚡ 20/20 vé`), auto-refreshed at 00:00.
  - 5% chance of rolling a brand-new dish; 95% duplicate drop converted into Breakthrough Shards ("Mảnh Đột Phá").
  - Star Breakthrough evolution: up to 5★ Hoàng Gia with visual glowing badge (`✦ ĐỘT PHÁ LÊN 5★! ✦`).
  - Python backend authoritative state (`backend/auth_service.py` + `backend/server.py`).

## 2. Architecture & Protected God Nodes
- **`src/js/engine.js`:** Pure deterministic food roulette & gacha math engine.
- **`src/js/wish-ui.js`:** Genshin-style wish presentation, cards grid, inspect overlay, and breakthrough badges.
- **`src/js/app.js`:** Central controller wiring UI buttons, gacha modal, and server API calls.
- **`src/js/auth.js` & `src/js/api.js`:** Frontend auth state, session management, and API client.
- **`backend/auth_service.py`:** Authoritative thread-safe ticket management, drop rates, shard evolution, and persistence (`backend/data/users.json`).
- **`backend/server.py`:** Standalone stdlib HTTP server with REST APIs (`/api/auth/login`, `/api/user/profile`, `/api/wish/roll`, `/api/user/inventory`) and static file serving.
- **`build_public.py` & `scripts/public_files.py`:** Build pipeline compiling `src/` to `public/`.

## 3. Recent Completed Changes
- Implemented full Account Gating, Daily 20-ticket limit, Star Evolution, and Inventory modals.
- Fixed button handlers so Guest clicking "Ước x10" prompts Login modal.
- Connected server-side gacha rolls to deduct tickets and persist dish cards & shards.
- Built and verified all 34 Python unittests (100% pass) and end-to-end API integration tests.

## 4. Next Deployment & Online Access
- Online Hosting: Render / Railway / Cloudflare Tunnel / Ngrok for public internet access.
