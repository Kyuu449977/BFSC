# Ăn Gì Đây? — Baemin Gen Z & Real-World Food Design System

## Intent and Structure
Modern, youthful, and vibrant food discovery web app inspired by Baemin, GrabFood, and DoorDash.
Zero AI Slop: No muddy/monochromatic pseudo-luxury tones, no cluttered box-in-box, no emoji spam, no AI-broken layouts.
High-Appetite Visual Hierarchy: 
- Brand Primary: Baemin Mint (`#2AC1BC`) for brand identity, category filters, navigation active states, and crisp icon accents.
- Food Action / Appetite Accent: Coral Watermelon Red (`#FF5252`) for the primary spin button ("Gợi ý bữa ngon"), price tags, and hot highlights.
- Food photography is sacred: Pure white card surfaces (`#FFFFFF`) to keep dish colors fresh, warm, and delicious.
- Layout: 2-column Split-Hero on Desktop (`>= 900px`) and ergonomic vertical flow on Mobile with 0 wasted whitespace.

## Tokens (Baemin Gen Z Archetype)
Light (Porcelain Mint & Coral Red):
- Canvas: #F8FAFA (Fresh clean porcelain with subtle mint cool breeze)
- Surface / Card: #FFFFFF (Pure crisp white food card surface)
- Surface Hover: #F0FDFD (Soft mint water tint)
- Text Primary (Ink): #111827 (Deep modern charcoal)
- Text Secondary (Muted): #64748B (Slate grey)
- Brand Mint Primary: #2AC1BC (Baemin signature mint)
- Brand Mint Hover: #24ACA7
- Brand Mint Soft: rgba(42, 193, 188, 0.12)
- Food Action / Appetite Accent: #FF5252 (Coral Watermelon Red)
- Food Action Hover: #E04040
- Food Action Soft: rgba(255, 82, 82, 0.12)
- Gold / Amber Win Accent: #F59E0B (Honey amber)
- Border / Hairline: #E5E7EB (Clean modern border)

Dark (Midnight Teal & Warm Coral):
- Canvas: #0F172A (Deep slate midnight)
- Surface / Card: #1E293B (Dark slate card surface)
- Surface Hover: #334155
- Text Primary: #F8FAFC (Clean snow white)
- Text Secondary: #94A3B8 (Muted slate)
- Brand Mint Primary: #2DD4BF (Luminous electric teal)
- Brand Mint Hover: #14B8A6
- Brand Mint Soft: rgba(45, 212, 191, 0.15)
- Food Action Accent: #FF6B6B (Vibrant coral)
- Food Action Hover: #FA5252
- Food Action Soft: rgba(255, 107, 107, 0.15)
- Gold / Amber Win Accent: #FBBF24
- Border: #334155

Typography:
- Be Vietnam Pro (local), Body 16px/1.6, Secondary 14px/1.5, Caption 12px/1.4.
- Heading sizes: Desktop 34/26/20px, Mobile 26/20/17px. Letter-spacing -0.02em on headings.
- Spacing rhythm: 4/8/12/16/24/32/48px.
- Radius: Controls 12px/999px (pill), Cards 16px, Dialogs 20px. Target size >= 44px.
- Zero box-in-box: Maximum 1 outer border per section; use clean whitespace and elevation shadows.
- Physics: Sub-200ms tactile spring feedback, cubic-bezier(0.2, 0.9, 0.3, 1). Strict 3D/Canvas lock.

## Responsive and Motion
- 320–899px: Mobile ergonomic vertical flow with 3-tab bottom navigation bar.
- 900px+: Desktop Split-Hero layout (Left 55% controls & budget, Right 45% today's featured dish).
- Dialogs: Clean vertical flexbox stack, full width textarea, fixed header, independently scrolling body (`overflow-y: auto; min-h-0`).
- Only transform/opacity animate (150–220ms).
- Respect `prefers-reduced-motion` at all times.
