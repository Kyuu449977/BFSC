# Locale, timezone, theme and footer smoke check

Date: 2026-10-29  
Target: `https://bfsc.netlify.app/`  
Method: browser UI only, separate in-app tab. No VPN, network, or IP changes.

## Coverage

- English language selection: **Pass with localization defects**. The main home content and selector changed to English, and the English setting was shown on the Privacy, Terms, and Open Source pages. Those routes loaded successfully at `/privacy`, `/terms`, and `/credits`.
- Timezone/region: **Pass**. Selecting `US-CA` and pressing Done changed the app pill to `US-CA · 12:52`, the daypart to `LUNCH`, and the menu to U.S. dishes priced in `$`. This is an app-level region/timezone preference and does not establish or change the visitor’s IP country. The Privacy page says the site does not request GPS permissions or transmit geographic coordinates.
- Footer pages: **Pass** for loading Privacy, Terms, and Open Source Credits.
- Theme: Light-mode contrast defect was independently confirmed by the manager. See `reviewer-light.jpg` and `reviewer-dark.jpg` in this folder.
- Currency conversion: **Not confirmed**. My timezone run showed `$` prices while the budget was `No limit`; I did not reproduce the reported `$50,000` display and do not count it as a confirmed bug.

## Confirmed issue: English localization is incomplete

**Severity: P2**  
**Steps:** Open the language selector → choose English → Done → inspect the home footer and Open Source Credits (`/credits`).  
**Expected:** User-facing copy and accessible names are English throughout the selected locale.  
**Actual:** Several strings remain Vietnamese. The home footer status still reads “Offline chưa khả dụng trên trình duyệt này.” The Credits page contains Vietnamese body text and headings, including “Một vài tài nguyên mã nguồn mở…”, “Font hỗ trợ tiếng Việt…”, “Ảnh chụp món ăn & thức uống”, and the Google Maps description. On the English home page, some accessible group names and food-image descriptions also remain Vietnamese (for example `Danh mục món ăn`, `Chọn món`, `Lọc thực đơn`, and dish alt text). The browser document title was mixed-language: “Today's Main Dishes · Ăn gì đây?”.  
**Evidence:** English page AX snapshots for `/` and `/credits`; visible footer screenshot during the run.

## Confirmed issue: Light theme has low-contrast dish cards

**Severity: P2**  
**Steps:** Open Appearance & Settings → select Light → Done.  
**Expected:** Dish titles and controls remain readable on their card backgrounds.  
**Actual:** The manager confirmed white or very pale dish-card backgrounds with white or very pale titles and controls, making content difficult to read.  
**Evidence:** `reviewer-light.jpg` (compare with `reviewer-dark.jpg`).

## Notes

- A saved `Rice & Sticky rice` preference remained active after switching to the U.S. menu and produced “No matching dishes.” Because test tabs share browser storage, this was treated as cross-tab/test-state interference rather than a product defect.
- The timezone menu opened from the `AUTO · time` pill. Repeated clicks on the header clock icon showed its tooltip but did not open the timezone dialog in my run; this was not counted as a confirmed defect because the pill provided a working entry point.
