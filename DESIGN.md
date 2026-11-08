# Bữa Ăn Hôm Nay — Michelin Editorial Design System

## Intent and Structure
Culinary editorial design inspired by Kinfolk, Michelin Guide, and NYT Cooking.
Zero AI Slop: No cheesy AI chat prompts, no gradient abuse, no emoji spam, no nested "box-in-box".
One clear visual anchor on the Home screen: Primary "Gợi ý bữa ngon" (Terracotta accent) flanked by balanced secondary actions ("3 món cân bằng", "Thực đơn Combo").
Main navigation: Choose, Menu, Settings. Secondary tools live in the Settings dialog.

## Tokens (Michelin Editorial Archetype)
Light (Ivory Silk & Terracotta):
- Canvas: #FBF9F5 (Warm linen silk paper)
- Surface: #FFFFFF (Pure porcelain card surface)
- Surface Hover: #F4EFEB (Subtle warm stone tint)
- Text Primary (Ink): #181D1A (Deep charcoal truffle ink)
- Text Secondary (Muted): #606863 (Warm riverbed gray)
- Accent (Primary Terracotta): #B84324 (Rich fired terracotta clay)
- Accent Hover: #A2371B
- Accent Text: #FFFFFF
- Accent Soft: rgba(184, 67, 36, 0.10)
- Gold Win Accent: #D4AF37 (Champagne Gold)
- Border / Hairline: #EAE5DC (Refined editorial hairline divider)

Dark (Obsidian & Champagne):
- Canvas: #0E1210 (Deep midnight noir)
- Surface: #151C18 (Dark charcoal silk)
- Surface Hover: #1D2621
- Text Primary: #F2F5F3 (Warm bone white)
- Text Secondary: #9CA8A0
- Accent: #D4AF37 (Warm champagne gold)
- Accent Hover: #E5C158
- Accent Text: #0E1210
- Accent Soft: rgba(212, 175, 55, 0.12)
- Border: #26332B

Typography:
- Be Vietnam Pro (local), Body 16px/1.6, Secondary 14px/1.5, Caption 12px/1.4.
- Heading sizes: Desktop 36/28/22px, Mobile 28/22/18px. Letter-spacing -0.02em on headings.
- Spacing rhythm: 4/8/12/16/24/32/48px.
- Radius: Controls 12px/999px (pill), Cards 16px, Dialogs 20px. Target size >= 44px.
- Zero box-in-box: Maximum 1 outer border per section; use whitespace and tonal surfaces for separation.
- Physics: Sub-200ms tactile spring feedback, cubic-bezier(0.22, 1, 0.36, 1). Strict 3D/Canvas lock.

## Responsive and Motion
- 320–639px: Mobile vertical flow with bottom 3-tab navigation bar.
- 640–1099px: Three columns in menu grid; stacked hero on tablet.
- 1100px+: Desktop editorial spread. Content maximum 1120px.
- Dialogs: Fixed header/actions, independently scrolling body (`overflow-y: auto; min-h-0`).
- Only transform/opacity animate (150–220ms).
- Respect `prefers-reduced-motion` at all times.
