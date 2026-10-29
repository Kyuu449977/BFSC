import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'src/styles/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

seo_styles = '''
/* ==========================================================================
   SEO Information Section & Structured Card UI
   ========================================================================== */
.seo-intro {
  margin: 48px auto 24px;
  padding: 28px 24px;
  border-radius: 18px;
  background: var(--surface-card, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 1040px;
  box-sizing: border-box;
}

.seo-intro-content h2 {
  font-size: 19px;
  font-weight: 700;
  color: var(--orange, #f26419);
  margin-top: 0;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.seo-intro-content > p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted, #94a3b8);
  margin-bottom: 24px;
}

.seo-intro-content > p strong {
  color: var(--ink, #fff);
}

.seo-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.seo-feature-item {
  padding: 16px;
  border-radius: 12px;
  background: var(--surface, rgba(0, 0, 0, 0.22));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.06));
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.seo-feature-item:hover {
  transform: translateY(-2px);
  border-color: rgba(242, 100, 25, 0.35);
}

.seo-feature-icon {
  font-size: 24px;
  display: block;
  margin-bottom: 8px;
}

.seo-feature-item strong {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink, #fff);
  margin-bottom: 6px;
}

.seo-feature-item p {
  font-size: 12px;
  line-height: 1.55;
  color: var(--muted, #94a3b8);
  margin: 0;
}
'''

if '.seo-intro' not in css:
    css += '\n' + seo_styles
    with open(r'src/styles/interactions.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print('Successfully added SEO styling to interactions.css!')
else:
    print('SEO styling already in interactions.css')
