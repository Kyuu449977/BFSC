# Ăn gì đây — Food discovery application

## Intent and structure
Quick selection is the primary task. One prominent action per area. Main navigation:
Choose, Menu, Collection. All secondary tools live in the Settings dialog.
Home has six preview cards; menu/collection have twelve per page without document reload.
Do not restore the removed introduction panel. No external fonts, frameworks or WebGL.

## Tokens
Light: canvas #F5F7F4, surface #FCFDFC, text #19251F, secondary #526458,
accent #1F6D4D, accent text #FFFFFF, border #D8E2DA.
Dark: canvas #131B17, surface #1C2821, text #EDF3EE, secondary #B0C2B5,
accent #85D6AC, accent text #13251A, border #35473B.
System uses this palette. Saved orange/green/blue/rose/custom accents remain supported.
Automatic appearance still follows time; system appearance follows OS preference.

Be Vietnam Pro (local), body 16px/1.6, secondary 14px/1.5, captions 13px.
Heading sizes 36/28/22px desktop, 30/24/20px mobile. Spacing 4/8/12/16/24/32/48px.
Control radius 12px, cards/dialogs 16px. Controls at least 44px; focus ring 3px.
Photographs 4:3 with reserved space. No neon shadows, decorative vines or boxed eyebrows.

## Responsive and motion
320–639px: two card columns, bottom navigation, controls precede featured image.
640–1099px: three columns. 1100px+: four columns; desktop choose/feature split.
Content maximum 1120px. Dialogs have fixed header/actions and an independently scrolling body.
Use safe areas and visual viewport sizing; min-width/min-height zero on scroll/grid children.
Only transform/opacity animate, typically 150–220ms, with reduced-motion support.
Low-end roulette keeps twelve reusable cards/1.2s; normal remains 32/2.5s.

## States and invariants
Every flow covers initial, pending, empty/prerequisite, error and success states.
Specific inline errors, preserved input on failure, no silent success on storage errors.
Keep all five languages, data IDs, prices, persisted keys and selection probabilities.
Ads retain keys/dimensions, remain outside primary controls, do not remount on pagination.
Validate all supported accent palettes for WCAG AA 4.5:1 text contrast.

## Compact layout refinement (2026-10-31)
Menu heading groups collection/add controls; wraps on small screens. Card text padding 12px, gap 4px, no flex-grown text body. Home spacing 12px, desktop rows content-sized except remaining budget row. Mobile featured card uses a 104px photo column and natural-height text. Settings width up to 580px, desktop label/action rows, stacked mobile groups, content-driven height. Preserve 44px targets and 4:3 photos.

Menu status/back link share a wrapping summary row. Below 768px, the menu title owns a full row so action buttons cannot squeeze its text.

Content-shaped frames: home60/40 at1024+, stacked horizontal feature below; result single800px/40:60, multi960px/three columns900+. Card metadata wraps naturally; custom640px with count/action row.

Choose-first home supersedes 60/40: centered720px action column at all sizes, horizontal small hero below; primary60px/18px, stable translated question, secondary outlined. Time/night metadata follows selection.

Soft surface update: control16px, card/dialog24px, pill999px and primary20px radii. Mode pills share a subtle group surface; menu cards use surface separation with transparent borders. Preserve readable spacing and first-screen actions.

Translucent treatment requested: cards use86% surface, dialogs94%, page subtle accent wash. Blur limited to dialogs12px and backdrop4px; text and primary controls stay opaque.

Featured card supersedes inset thumbnail: full-height left image40% desktop/96px below768, CSS mask opaque to50% then transparent; content begins16px beyond image; failed-image layout removes reserved width. No animation or duplicate background download.
