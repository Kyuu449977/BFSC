with open('src/styles/themes.css', 'r', encoding='utf-8') as f:
    text = f.read()

hero_css = """
/* ==========================================================================
   Hero Section Gradient Image Reveal Effect
   Left copy sits cleanly on solid web theme surface; moving right smoothly
   reveals the dish illustration through a gradient fade.
   ========================================================================== */
.hero {
  position: relative !important;
  display: block !important;
  background: var(--hero-surface, #fff) !important;
  border-radius: 25px;
  overflow: hidden !important;
  border: 1px solid var(--border);
  box-shadow: 0 10px 35px rgba(93, 52, 16, 0.05);
  min-height: 380px;
}

:root[data-appearance='dark'] .hero {
  --hero-surface: #23282f;
}

:root[data-theme='orange'][data-time-period='dinner'] .hero {
  --hero-surface: #17263c;
}

:root[data-theme='orange'][data-time-period='latenight'] .hero {
  --hero-surface: #132238;
}

.hero-copy {
  position: relative !important;
  z-index: 3 !important;
  max-width: 54% !important;
  padding: 38px !important;
  background: transparent !important;
  box-sizing: border-box;
}

.hero-photo {
  position: absolute !important;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 66% !important;
  height: 100% !important;
  z-index: 1 !important;
  overflow: hidden !important;
  pointer-events: none;
}

.hero-photo img {
  width: 100% !important;
  height: 100% !important;
  min-height: 100% !important;
  object-fit: cover !important;
  display: block;
  mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.3) 26%, rgba(0, 0, 0, 0.8) 55%, #000 82%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 0.3) 26%, rgba(0, 0, 0, 0.8) 55%, #000 82%);
}

.hero-photo::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    90deg,
    var(--hero-surface, #fff) 0%,
    color-mix(in srgb, var(--hero-surface, #fff) 80%, transparent) 26%,
    color-mix(in srgb, var(--hero-surface, #fff) 30%, transparent) 55%,
    transparent 80%
  );
  pointer-events: none;
}

@media (max-width: 760px) {
  .hero {
    display: flex !important;
    flex-direction: column !important;
    min-height: auto;
  }
  .hero-copy {
    max-width: 100% !important;
    padding: 24px 20px 20px !important;
  }
  .hero-photo {
    position: relative !important;
    width: 100% !important;
    height: 240px !important;
  }
  .hero-photo img {
    mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 30%, #000 70%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 30%, #000 70%);
  }
  .hero-photo::before {
    background: linear-gradient(to bottom, var(--hero-surface, #fff) 0%, transparent 45%);
  }
}
"""

# Append to themes.css
if 'Hero Section Gradient Image Reveal Effect' not in text:
    text = text.strip() + '\n\n' + hero_css.strip() + '\n'
    with open('src/styles/themes.css', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Updated themes.css with hero gradient reveal effect')
else:
    print('Hero CSS already present')
