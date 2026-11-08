document.addEventListener('DOMContentLoaded', () => {
  const slots = [...document.querySelectorAll('[data-ad-key]')];
  const mounted = new Set();
  function mount(slot) {
    if (mounted.has(slot) || !slot.getClientRects().length || document.hidden) return;
    const key = slot.dataset.adKey;
    const width = Number(slot.dataset.adWidth), height = Number(slot.dataset.adHeight);
    if (!/^[a-f0-9]{32}$/.test(key) || ![160, 300].includes(width) || ![250, 300, 600].includes(height)) return;
    mounted.add(slot);
    observer?.unobserve(slot);
    const frame = document.createElement('iframe');
    frame.width = String(width);
    frame.height = String(height);
    frame.title = typeof UICopy !== 'undefined' ? UICopy.text('sponsored') : 'Quảng cáo';
    frame.dataset.sponsorFrame = key;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;padding:0;width:${width}px;min-height:${height}px}iframe{border:0;display:block}</style></head><body><script>window.atOptions=${JSON.stringify({ key, format: 'iframe', height, width, params: {} })};<\/script><script src="https://bauval.org/22/${key}"><\/script></body></html>`;
    slot.append(frame);
    slot.dataset.adMounted = 'true';
  }
  const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) mount(entry.target);
  }, { rootMargin: '200px 0px' }) : null;
  for (const slot of slots) observer ? observer.observe(slot) : mount(slot);
});
