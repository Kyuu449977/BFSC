# BFSC — catalog replacement and low-end performance, 2026-10-31

## Approved scope and result

The user explicitly approved using the 97 readable PDF entries: 12 main dishes,
12 snacks and 73 drinks. The supplied main/snack PDFs each contain one clipped
page, despite titles advertising 39 and 18 entries. No missing rows were guessed.
Other regions retain their 55 entries each: 317 built-in dishes in total.

The retained Vietnamese IDs and price metadata remain stable. Empty lunch,
afternoon and dinner groups have no retired dishes; their main-meal hero falls
back to the current breakfast list. Main selection continues to include all 12
main dishes at every time of day.

97 exact-name search images were downloaded, decoded, visually reviewed on
contact sheets, reduced to a maximum 640px edge and encoded as WebP. Image URLs
and source pages are recorded in `catalog-2026-10-31.json`. User approval to select
search-result images is recorded separately from license verification; no artist
or license was invented. Runtime display is approved while review status remains
visible. Unreviewed images in other regions retain their previous fallback.

Old catalog and server-contributed Vietnamese dishes were backed up outside the
checkout at `C:/Users/phamp/.codex/backups/BFSC-catalog-20261031-004344`.
Seven legacy server duplicates were removed from the active JSON and excluded
from browser fallback loading. Stored browser copies and old collection counts
are preserved for recovery. New contributions continue to load normally.

## Performance implementation

- Reuse roulette card nodes; low-memory/low-core devices use 12 rather than 32
  cards and 1.2s rather than 2.5s animation. Existing reduced-motion behavior,
  skip, winner selection and single-commit contracts remain intact.
- Two consecutive slow runs can select lightweight rendering for future runs.
  No device capability API is required. Audio behavior is unchanged.
- Cache catalog indexing by revision; return fresh dish objects to callers.
  Reuse universe-picker rows, debounce search by 120ms, remove stale row entries
  and batch initial custom-dish synchronization.
- Install only the PWA shell. Optional assets download at most two concurrently
  while a visible client is idle; pause scheduling when drawing or backgrounded.
  Missing assets are reported and do not prevent shell readiness. Cache v33.
- Cache parsed backend JSON by path, file identity, size and nanosecond timestamps;
  deep-copy returned data and invalidate after atomic writes. External edits,
  deleted files and corrupt content cannot silently reuse a stale response.
- Publish only retained Vietnamese image assets plus other required assets.

## Verification and limits

- `node --test tests/*.test.cjs`: 45 tests passed; catalog, localization, selection, lifecycle,
  transport and image provenance checks. Added low-memory and retired-data cases.
- `python -B -m unittest discover -s tests -p 'test_*.py'`: 31 tests passed; backend, validation,
  public-file safety, build attribution and cache invalidation checks.
- `node tests/upgrade-browser.cjs`: 25 region/language combinations, collection,
  responsive layout and offline combo passed.
- `node tests/upgrade-features-browser.cjs`: custom reroll, local save/reload and
  cross-tab language/timezone passed.
- `node tests/upgrade-pwa-browser.cjs`: partial image install, missing essential
  rejection, API cache exclusion, safe updates and offline localization passed.
- `node tests/catalog-performance-browser.cjs`: 390/768/1680px, all 97 images,
  12-card low-memory reel, skip, combo, row reuse/search, no overflow or page errors.
  Third-party ad requests are fulfilled with inert provider stubs for this check.

Repeated roulette harness, Edge/Chromium, 6x CPU slowdown, reported 4GB/4 cores,
30 full runs per variant: old 32-card animation totaled 79,938ms; new 12-card
animation totaled 38,261ms. Observed long tasks totaled 1,207ms versus 814ms
(32.6% lower). Each run left zero cards in the live track after release; no
page errors were recorded. The harness directly exercises roulette lifecycle;
this is a local simulated-device observation, not a physical-phone or production
performance guarantee. Network/provider execution was excluded from this profile.
Raw runs and screenshots are in local `artifacts/performance/`.

## Advertising and rollout

After optimization acceptance checks, restored the original Monetag delayed
loader and three lazy Adsterra units with their original keys/dimensions, CSP
permissions, publication entry and privacy disclosures. Final browser checks
observed all four provider requests. Live provider fill/popups and their execution
cost were not certified by the inert-stub tests.

Rebuilt the static output and restarted the local server at localhost:8080.
No hosting deployment or publication was performed. Existing PWA tabs need to
accept the app update to replace an older cached catalog.
