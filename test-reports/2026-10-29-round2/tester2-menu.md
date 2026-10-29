# Tester 2/5 — Menu regression (BFSC)

- Date: 2026-10-29
- Site: https://bfsc.netlify.app/
- Browser: separate IAB tab
- Scope: search, category filter, Load more

## Results

### Search — PASS

- Steps: filled `#dishSearch` with `Bún bò Huế`.
- Expected: only matching dish(es) appear.
- Actual: `Viewing 1 / 1 dishes`; the single result was Bún bò Huế. `Clear search` restored `Viewing 12 / 113 dishes`.
- Severity: none.

### Category filter — pointer click did not apply (S2)

- Steps: from the unfiltered menu, clicked the semantic `Lunch` button inside `#filters`.
- Expected: `Lunch` becomes selected and the grid shows only lunch dishes.
- Actual after click: filter state remained `All=selected`, `Lunch=unselected`; grid remained `Viewing 12 / 113 dishes` with Breakfast cards. The `Lunch` control was visible, enabled, and had `pointer-events:auto`.
- Control check: pressing Enter on the same button applied the filter: `Lunch=selected`, `All=unselected`, `Viewing 12 / 15 dishes`, with all visible cards labeled Lunch.
- Impact: mouse/pointer activation appears not to apply this filter; keyboard activation works.

### Load more — pointer click did not apply (S2)

- Steps: with Lunch selected and `Viewing 12 / 15 dishes`, clicked `#loadMoreBtn` (visible and enabled).
- Expected: show all 15 lunch dishes and remove the button.
- Actual after click: remained at `Viewing 12 / 15 dishes`; button remained visible. Screenshot in the CUA run output showed the last cards and still-visible Load more button.
- Control check: pressing Enter on `#loadMoreBtn` changed the count to `Viewing 15 / 15 dishes`, added the final three lunch items, and removed the button.
- Impact: mouse/pointer activation appears not to load more; keyboard activation works.

## Notes and cleanup

- The first click on `Clear search` coincided with BGM changing from off to on. It was restored to off (`Play BGM`, Value 0 / “BGM paused”) before continuing.
- No timezone, language, theme, budget, taste preferences, favorites, or hidden-dish controls were changed. No ads were clicked. No IP or country conclusion was tested or inferred.
- Screenshot evidence was displayed by the CUA tool during the run, but the available screenshot API returned inline images without a local export path; no screenshot file was saved alongside this report.
