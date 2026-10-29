# Tester 3/5 — details and Maps flow

- Site: https://bfsc.netlify.app/
- Date: 2026-10-29
- Scope: read-only, separate IAB tab. No settings, preferences, local storage, VPN, or IP changes were made. No ads were intentionally clicked.

## Confirmed passes

- Opened detail modals for three distinct dishes: Phở tái lăn, Bún bò Huế, and Xôi xéo. Each showed the dish name, description, price, favorite/eaten/hidden controls, and a Maps link for the same dish.
- The Google Maps links carried matching searches and loaded matching Maps results:
  - Phở tái lăn: `query=Phở tái lăn near me`
  - Bún bò Huế: `query=Bún bò Huế near me`
  - Xôi xéo: `query=Xôi xéo near me`
- Closing each Maps tab returned to the BFSC tab. The generated Maps and ad tabs were closed after observation.
- Escape closed a detail modal. The modal’s `Đóng` button also closed it.
- Footer `Privacy` navigation opened `/privacy`; `Back to dish picker` returned to `/`. After the page settled, the English UI and existing 8/113 collection count returned.

## Confirmed issue symptom

Clicking the Bún bò Huế Maps link opened the correct Maps search, but also spawned three unexpected third-party tabs: two `ay267.com/afu.php` pages displaying an ADEX human-verification prompt and one `hola.org/lp/vpn4` VPN promotion. Clicking the Xôi xéo Maps link spawned one `hola.org/lp/vpn4` tab. No ad controls were clicked; all these tabs were closed. Phở tái lăn did not spawn an observed ad tab. The extra-tab symptom is confirmed; the source/cause was not investigated.

## Suspected / unverified

- BGM appeared enabled (`Stop BGM`, value 1) after the first page interaction, despite starting disabled (value 0). No music control was clicked. After footer navigation/reload it showed disabled again. This may be site autoplay behavior; playback itself was not verified.
- Initial home recommendation showed “No matching dishes” with the visible `Rice & Sticky rice` craving text while menu cards remained available. Per scope, filters/preferences were not changed, so whether that state is intended was not tested.

## Evidence limits

The IAB accessibility state confirmed the Maps query URLs, loaded Maps result titles, modal contents, footer destinations, and unexpected ad-tab URLs. No standalone screenshot file was saved for the transient ad tabs.
