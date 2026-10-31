# Project memory

## 2026-10-30 — Strict Architect Coder installation

- User requested reading and installing https://github.com/Skill-AI-private/Strict-architect-coder.git for this project.
- Installed the upstream v4.0 skill into `C:/Users/phamp/.codex/skills/strict-architect-coder` using the Codex skill installer.
- Updated `.agents/skills/strict-architect-coder/SKILL.md` and `references/` from that installation; backed up the prior project skill outside the repository under `C:/Users/phamp/.codex/backups/`.
- Added root `AGENTS.md` to route relevant project work through the skill.
- Existing `graphify-out/` and other project skills were preserved. No application code was changed and no Graphify regeneration was run.
- Workflow: inspect context and dependencies, plan changes according to complexity, implement within scope, verify, and record decisions here. User instructions and higher-priority agent instructions take precedence.

## 2026-10-30 — Advertising disabled

- Removed delayed Monetag loader/verification and all three Adsterra slots from src/index.html.
- Replaced src/js/sponsors.js with an inert compatibility comment and removed it from the publish allowlist/cache manifest. Existing ad CSS is unused; no ad markup remains.
- Removed ad-domain CSP permissions in Python, Netlify and Vercel; updated privacy text in all five languages and README. Bumped service-worker cache v31 to v32 and rebuilt public output.
- Verified: 43 JavaScript unit tests, 2 server tests, syntax checks, git diff --check, and Chromium/Edge at 390px and 1440px after clicking single draw: result shown, zero ad requests, zero page errors. Live server restarted and HTTP/CSP verified.
- Existing browser/PWA tabs may need refresh and acceptance of the app update to replace older cached assets. No deployment performed.

## 2026-10-31 — Approved catalog replacement, optimization and advertising restoration

- User explicitly authorized implementation of the prior performance plan, replacing Vietnamese dishes from three PDFs, and restoring advertisements after optimization. No hosting deployment authorized/performed.
- Main/snack PDFs are single clipped pages. After clarification user explicitly chose the 97 readable entries: 12 main, 12 snacks, 73 drinks. Other regions remain 55 each (317 built-in total).
- Retained IDs/prices/translations; archived old data outside repo in C:/Users/phamp/.codex/backups/BFSC-catalog-20261031-004344. Removed 7 server duplicates and suppress their legacy browser fallback IDs, preserving stored copies and old collection counts.
- Downloaded, visually checked and compressed 97 search-result images with user authorization. Recorded exact provenance and unverified license status, separately enabling approved display; never fabricated a license. Sources: docs/reports/catalog-2026-10-31.json. Human editing list: docs/reports/VIETNAM-CATALOG-2026-10-31.md.
- Optimized adaptive low-end roulette (12 cards/1.2s; normal remains 32/2.5s), bounded reusable nodes, catalog index, universe row reuse/debounce, initial custom import batching, idle two-request optional PWA cache, backend parsed JSON cache with external-edit/corruption checks. Cache v33.
- Restored original Monetag/three Adsterra units, keys, CSP and privacy disclosures after optimization checks. Browser ad tests use inert provider stubs, not live fill/popup certification.
- Verified 45 JS unit tests, 31 Python tests, 25 region/language browser matrix, custom flow and PWA checks, and 390/768/1680px final browser smoke. Repeated low-end harness: 30 runs per variant, 6x CPU, long tasks 1207ms -> 814ms (32.6% lower), zero retained live reel cards/page errors; simulation is not a real-device guarantee.
- Full report: docs/reports/PERFORMANCE-CATALOG-2026-10-31.md. Local server restarted on localhost:8080 (PID 26528). Existing PWA clients need to accept the update; no production publish.

## 2026-10-31 — Drinks: remove people and hands from illustrations

- User requested checking drink images and replacing any containing people or human hands.
- Visually reviewed all 73 Vietnamese drinks. Replaced 9 images: brown-sugar pearl milk tea, roasted milk tea, mangosteen tea, pink guava chia tea, strawberry tea, hand-pounded lemon tea, dirty matcha, coconut/kumquat drink, coconut coffee (including a blurred person/body in its background).
- Selected new source images without visible people/hands, retained dish IDs, names, prices, paths and all other images. Kept max-640px WebP and updated source provenance in the catalog manifest and attribution audit. Advertising unchanged.
- Original 9 files and provenance backed up at C:/Users/phamp/.codex/backups/BFSC-drink-images-20261031-010450. Review hashes/source records: docs/reports/drink-image-review-2026-10-31.json.
- Rebuilt public output; cache v34. Image/provenance tests passed (2 JS + 2 Python). Existing PWA clients need to accept update or refresh for current images. No hosting deploy.

## 2026-10-31 — Full revised food PDFs and separate menu page

- New versions at the same PDF paths contain all 39 main and 18 snack rows. User authorized replacement and search-result images; also requested that “Xem thêm món” open another page with the same label.
- Vietnam now has 130 dishes (morning 13, lunch 9, afternoon 8, dinner 9, snacks 18, drinks 73); all-region catalog 350. Reused matching IDs, translations and existing search imagery; downloaded/visually checked 33 additional images. The 73 drinks remain intact; previous 9 drink replacement hashes verified unchanged.
- Backup: C:/Users/phamp/.codex/backups/BFSC-food-update-20261031-011553. Catalog provenance and human inventory updated under docs/reports/.
- Added menu.html to publish allowlist and essential offline shell, generated from the shared index template. Source mapping is explicit in scripts/public_files.py; do not edit public/menu.html directly.
- Home always shows at most 12 cards. Existing “Xem thêm món” button navigates to the separate page in the same tab. Menu page renders 12 cards per page, query/category/collection/personal/drink filters in URL, previous/next navigation and home link; hidden home/SEO sections avoid extending that page. Cache v35.
- Verified 45 JS unit tests, 31 Python tests, dedicated mobile/desktop pagination test (390/1440px), 130 image loads, search/empty state, reload and return navigation; PWA suite and direct offline page-2 navigation passed. No app errors. Ads unchanged; no hosting deployment.
- Local server restarted with new allowlist (PID 23696).

## 2026-10-31 — Remove redundant introduction panel

- User requested removing the illustrated introduction panel with four feature cards. Removed the entire seo-intro section from the shared index source, therefore also from generated menu.html. Existing optional copy selectors tolerate missing nodes. Cache v36; rebuilt static output.

## 2026-10-31 — Pagination without document reload

- User requested switching menu pages without reloading. Normal Previous/Next clicks now update the 12-card list in place, push the URL into history and scroll to the menu; modified clicks retain native link behavior.
- Popstate restores category, query, personal/collection/drink filters and page. First-load restoration uses the captured incoming URL so startup rendering cannot erase its parameters.
- Kept separate menu.html navigation from home. Cache v37; rebuilt public output.
- Verified mobile/desktop pagination integration: zero document navigation requests and preserved window marker during page switches, Back/Forward restore content, explicit reload restores page 2, search/empty state and return-home still pass; no page errors. Syntax and diff checks passed.

## 2026-10-31 — Approved discovery UI redesign implemented

- User approved the full two-skill redesign plan (discovery app, quick selection first). Added DESIGN.md with tokens and compatibility rules.
- Replaced six old stylesheet scopes and changed concatenation order so mobile rules follow components. Shared green-neutral light/dark surfaces; saved theme/appearance options and local font preserved. No framework/dependency added.
- Reordered actual DOM for action-first mobile and desktop choice/feature split. Home six previews, menu twelve. Desktop navigation and phone bottom navigation; Collection opens the menu collection route.
- Moved all eight tools into settingsDialog (five groups), retaining existing IDs. Updated mobile-menu controller for native dialog at all viewports. Modal select/tooltip portals now live in owning dialogs; closed-parent focus returns to settings trigger.
- Results prioritize image/name, have a fixed primary Maps action and secondary reroll/done. Picker, add-dish sections, settings and legal views use shared styles. Five-language labels/copy updated; appearance still respects auto/system. No restored intro panel.
- Preserved all 350 dishes, prices, IDs, storage keys, selection logic, backend contracts, drink image hashes and ad keys/dimensions. Cache v39; public rebuilt. No deployment.
- Verified 45 JS unit + 31 Python tests; 50 visual/layout combinations; 12 palette contrast combinations >=4.5; keyboard/control suite; 25 region-language browser combinations; pagination/no-reload/history, custom flows and PWA suite; 15 legal-page language layouts; no page errors in acceptance.
- Repeated low-end reel harness: 30 runs each, 6x CPU, long tasks 1207ms -> 720ms; live track empty after every release. Simulation excludes live ad execution and does not certify physical devices.
- Report docs/reports/REDESIGN-2026-10-31.md; screenshots artifacts/redesign/. Existing local server remains running; browser/PWA clients should accept update.


## 2026-10-31 — Multilingual search metadata and safe project cleanup

- User authorized SEO keywords across countries/languages and folder cleanup, expressly without new features or functionality changes.
- Added relevant keyword phrases in 15 languages (Chinese simplified/traditional variants); no search-volume claim. Corrected home description/JSON-LD to actual 350-dish/5-region behavior, removed unsupported automatic-nearby and old effect claims. Five real UI languages retained; no new routes or translation features.
- scripts.build_public.render_menu gives menu its own title, description, canonical and sharing metadata. Sitemap now uses existing canonical angiday.app consistently across five actual routes; removed nonfunctional ?lang hreflangs. Legal pages get descriptions/canonicals. Cache v40, public rebuilt. Domain must match actual production when publishing; no deployment.
- Archived 359 historical scripts/data files, five generated/temp folders and three root list dumps outside repo at C:/Users/phamp/Downloads/New folder/BFSC-cleanup-archive-20261031-021119; manifest SHA-256 checked for all 359 script files. Recursive permanent deletion was rejected by automatic execution policy; reversible external moves succeeded instead. Keep archive for recovery.
- scripts now contains only __init__, build_public and public_files. Reusable image downloader moved to tools/assets/download_catalog_images.py; root resolution updated, output directory created before writing. No image download/replacement performed.
- Moved AI_SYSTEM_REFERENCE.md to docs/SYSTEM_REFERENCE.md and updated its stale 382 count to 350 and known report reference. docs/PROJECT_STRUCTURE.md and docs/SEO.md document ownership and SEO limits. Keep design-skills research, tools/country-qa dependencies, skill/graph files, tests, actual data and .private state.
- .vercelignore now retains mandatory docs/reports/image-attribution-audit.json build input while excluding design research/agent graphs. Public allowlist unchanged. Root startup/build/hosting paths unchanged; runtime scripts, IDs, storage, catalog, prices, API and ad settings untouched.
- Verification: build; 45 JS tests; 34 Python tests (31 existing + 3 SEO contracts); menu/browser mobile390 + desktop1440 including no-reload/history/reload; PWA safe update/offline checks, no page errors; live home/menu/sitemap/privacy HTTP200; downloader compile; git diff --check clean.
- Graphify snapshot predates this cleanup; its historical paths are not current file existence evidence. Current source/docs take precedence. No graph regeneration needed for runtime logic (unchanged).

## 2026-10-31 — Compact UI refinement
- Implemented approved compact/readable direction: grouped menu add button into heading; reduced menu spacing/card body padding; compact home rows, mobile horizontal featured card; settings label/action rows with natural mobile height. IDs, runtime JS, catalog/API/storage/ads unchanged. Cache v41 rebuilt.
- Verified 45 JS tests, redesign browser 50 layouts/12 palettes and selection/custom/settings/add-form/200% zoom flows, menu 390/1440 no-reload/history, controls keyboard/popup suite, PWA suite, diff check. Browser inspection used fresh 127.0.0.1 origin after discovering local server was stopped and old localhost content was cached. Started server in exec session 73113.
- No precise same-viewport before/after percentage measurement retained; do not claim acceptance percentage targets proved. Current screenshots artifacts/redesign/home-390-dark.png and home-1440-light.png; report docs/reports/COMPACT-UI-2026-10-31.md.

## 2026-10-31 — Compact plan acceptance completed
- Supersedes prior missing-baseline note: added reproducible reconstructed pre-compact menu/settings fixture in tests/compact-ui-browser.cjs (not an archived full build). Measured menu 434.19 -> 284.59px (34.45%) and settings 658.89 -> 463.39px (29.67%), at1440. Added before/after artifacts/compact-ui and acceptance.json.
- Grouped menu status/back link; fixed squeezed mobile heading using full-width heading row; added heading-width assertion, 25 menu/settings viewport-language combinations, empty search/recovery. All pass; reran redesign 50 layouts/12 palettes and flows, menu history and PWA successfully. Cache v42. Updated compact report. No new features/data changes/deployment.

## 2026-10-31 — Content-shaped frames
Implemented approved layout: desktop home 60/40, below1024 stacked with horizontal feature; single result max800/40:60, multi max960/three columns at900; menu price/status wrap; custom wheel max640/five-line resizable input/count beside action desktop. Cachev43. Saved exact original HTML/CSS and screenshots before edits in artifacts/frame-layout/before. Passed redesign50 layouts/12palettes/flows, menu390/1440 history, PWA. Desktop1440x900 single resultScroll client581=scroll581 (no internal overflow); screenshot artifacts/frame-layout/result-desktop.png. No API/data/storage/ad changes or deployment. Physical devices/live ads unverified.

## 2026-10-31 — Choose-first home
Approved plan implemented: centered home max720px, stable localized title_default across modes, primary60px/18px, outlined secondary actions, budget then custom wheel, time/night metadata after selection, small horizontal hero. Five slogans updated. Preserved IDs/API/catalog/storage/pagination/ad config. Cachev44, no deployment.
Exact baseline HTML/CSS/app and screenshots saved before edits under artifacts/choose-first/before. New tests/choose-first-browser.cjs verifies60 viewport/language/appearance combinations, title stability across modes and first-screen primary at320x568/secondary at390x844. Passed45 JS tests, redesign50 layouts/12palettes/flows including200%zoom, menu390/1440/history and PWA. Visually inspected after390/1440 screenshots. No physical-device/live-ad certification.

## 2026-10-31 — Hide failed photos, remove persistent review badge
User requested no always-visible review badge and hiding unloadable photos. Featured caption hidden; result review note moved into existing source disclosure; menu review badge removed. UI.imageFallback hides failed image rather than substituting SVG; CSS collapses hero/menu slots and single result column. Reinitializing image restores visibility. Metadata/source audit untouched. Cachev45 built. Passed image tests, menu390/1440, browser simulated404 collapse+valid-image restore, diff check.

## 2026-10-31 — Softer UX surfaces
User requested less boxy appearance and better content space. Added shared control16/card24/dialog24/pill radii; grouped mode pills on subtle accent surface, round filter pills, softened primary20px, removed budget divider and heavy menu card border, balanced text padding with smaller mobile inset. Existing IDs/data/runtime selection unchanged. Cachev46 built.
Verified choose-first60 combinations/first-screen criteria, redesign50 layouts/12palettes/all flows/200%zoom; controls pointer/keyboard/popup/reduced motion; menu390/1440 no-reload/history; diff clean. Inspected mobile home screenshot; copies artifacts/soft-ux/home-390.png and home-1440.png. Original styles saved artifacts/soft-ux/before/styles. No deployment.

## 2026-10-31 — Screenshot-specific polish
User flagged duplicate color swatches and edge-flush feature image. Custom color is now one labeled pill/native circular input, redundant preview hidden but ID preserved; palette dots show actual green/blue/rose. Featured photo inset12px, rounded16px, centered beside copy; mobile80px thumb with12px gap, price wraps. Cachev47. Build, redesign50/12 and choose-first60 pass; diff check; screenshots artifacts/detail-polish/theme-390.png and featured-390.png.

## 2026-10-31 — Restore translucent visual treatment
User explicitly chose restoring prior soft/translucent look. Added palette-derived glass surfaces (cards86%, dialogs94%), subtle page accent wash and dialog12px/backdrop4px blur; text and primary buttons remain opaque. No exact historical stylesheet available, treatment restores requested direction on current layout. No per-card blur. Cachev48 built. Passed redesign50 layouts/12palette checks/flows and choose-first60 matrix; inspected settings screenshot; diff clean.

## 2026-10-31 — Featured image fades into card
Implemented approved static fade using existing featuredImage in absolute left layer with CSS mask opaque through50% then transparent. Desktop40%, mobile96px, text outside image with16px inset. Removed obsolete hero thumbnail mobile/tablet rules; failed image collapses left padding and restores normally. No second request/library/runtime changes. Cachev49 built. Saved true baseline styles and screenshots artifacts/featured-fade/before. Passed featured-fade40 viewport/language/appearance cases, slow/error/recovery/expanded text, choose-first60, redesign50/12, PWA, diff check. Visually inspected cropped mobile/desktop images. Report docs/reports/FEATURED-FADE-2026-10-31.md; no deployment.

## 2026-10-31 — Curated keyword integration
User requested integrating expanded keyword research. Selected140 phrases (20vi+8 per15 international language/script groups) in meta keywords; updated home title/descriptions and menu description. Exact selection docs/research/KEYWORDS-PUBLISHED-2026-10-31.json; full3521 remain research, no hidden text/new pages/languages. Google ignores meta keywords; titles/descriptions are natural user-facing search copy, not guaranteed traffic. Cachev50 built,3 SEO tests and diff check pass. Fixed encoding issue caught during initial SEO check; no remaining failure. No hosting deployment.

## 2026-10-31 — Public release readiness review
Built local+fresh source-only export484files;45JS/34Python, redesign50/12, menu, fade40, choose-first60, upgrade custom/crosstab, PWA and catalog-performance390/768/1680 all pass; diff clean. Recommendation: test branch ready, public release pending130 image redistribution rights, root LICENSE(owner decision), live-ad/staging/domain checks. Git727deleted/47modified/32untracked entries; no commit/push. Pattern scan no private/GitHub/OpenAI key hits;2AWS-like matches are signed third-party image URLs, no secret claim/history audit. Report docs/reports/RELEASE-READINESS-2026-10-31.md.

## 2026-10-31 — Git publication authorized
User explicitly requested reviewing all changes then pushing after readiness caveats. Reviewed runtime/build/backend/data changes and classified historical cleanup. origin/main matched local HEAD before commit. Preparing full source/catalog/tests/docs/skills update, excluding ignored private data/build/artifacts/dependencies. Prior image-rights/root-license/live-ad caveats remain documented; no claim production release certified.

## 2026-10-31 — Project cleanup and filter plan executed
- User approved the cleanup plan.
- Removed residual `.agents/skills/strict-architect-coder/SKILL.md.bak` and purged all `__pycache__` directories.
- Updated `.gitignore` with `*.bak` and `*.tmp`.
- Preserved 100% of core application code (`src/`, `backend/`, `api/`), launch interfaces (`server.py`, `run_server.py`, `build_public.py`, `CHAY_WEB_CHO_DIEN_THOAI.bat`), tests, docs, and multi-assistant rules.
- Verified: 34 Python unit tests pass (100% OK), `python build_public.py` successfully generates `public/`.

## 2026-10-31 — Social preview (OG image) and immutable cache optimization
- Generated standard 1200x630 PNG `src/assets/og-image.png` with brand colors (#131B17 / #B94625).
- Registered `assets/og-image.png` in `scripts/public_files.py` `PUBLIC_FILES`.
- Updated `src/index.html` with explicit `og:image` PNG 1200x630 tags and `twitter:image`.
- Added immutable Cache-Control headers (1 year) for `/assets/` and `/images/` in `vercel.json` and `netlify.toml`.
- Verified: `python build_public.py` successfully generated `public/assets/og-image.png`; 34 Python unit tests passed (100% OK); git diff clean.
