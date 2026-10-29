# Tester 5/5 — Keyboard and accessibility (Chrome)

- URL: https://bfsc.netlify.app/
- Browser: Chrome, dedicated tab session “🧪 BFSC bàn phím”
- Network note: WARP was Connected; egress IP recorded as 104.28.210.150. Country was not verified.
- Scope: read-only keyboard/modal checks, plus the requested Chrome comparison for the lunch filter and Load more. No budget, language, timezone, theme, favorite, eaten, or hidden-item control was changed.

## Results

- **Tab order — confirmed.** Tab reached the skip link, site link, timezone, language, and theme controls in order. Continued Tab navigation reached the meal category controls, filter controls, search, and menu cards. The focused element was exposed in the accessibility snapshot.
- **Dish details and Escape — confirmed.** With the Buổi Trưa filter selected, Tab focus reached the Cơm tấm card. Enter opened the dish dialog with its description, image, price, and actions. Escape closed it and returned focus to the same card. No detail action was toggled.
- **Timezone dialog — confirmed.** Enter on the focused timezone header button opened timezoneDialog; Escape closed it and returned focus to the trigger. The automatic option was already selected.
- **Language dialog — confirmed.** Enter on the focused language button opened languageDialog; Escape closed it and returned focus. Tiếng Việt was already selected.
- **Theme dialog — confirmed.** Enter on the focused theme button opened themeDialog; Escape closed it and returned focus. Tự động (Theo giờ) was already selected. No option was changed.
- **Lunch filter semantic click — works in Chrome.** The accessibility snapshot presented Buổi Trưa as a checkbox, but the DOM is a button with aria-pressed; getByRole checkbox for Buổi Trưa found no match. getByRole button for Buổi Trưa and click selected it and updated the menu to 12 / 15 lunch dishes.
- **Load more semantic click — works in Chrome.** From 12 / 15, one click on the Xem thêm món button updated the visible count to 15 / 15. This confirms the IAB report is environment-specific to the tested IAB path; it should not be generalized to Chrome.
- **Image alt/title spot check — no mismatch found.** The featured Bún đậu mắm tôm image alt matched the dish and its bun_dau.webp source. The 15 visible lunch card image alts matched their dish names. Image title attributes were blank.

## Shared-session observations and limits

- The first page snapshot showed no budget limit; later snapshots showed 50.000đ / lượt. This tester did not open or change budget/preferences. Parent confirmed the collection count change from 21 to 23 came from tester 4 spinning dishes in the shared app, not this test.
- End state is the Buổi Trưa filter selected with all 15 lunch results expanded. No screenshot was saved because no visual bug was observed.
- Tested one dish card for keyboard opening; no random-meal picker was used.
