/* Fixed-size provider units keep their original keys and dimensions. Each SDK
 * runs in its own document so parser-time document.write/atOptions cannot collide.
 * Moving between mobile and desktop uses CSS, never remounting a live advert. */
document.addEventListener('DOMContentLoaded', () => {
  const slots = [...document.querySelectorAll('[data-ad-key]')];
  const mounted = new Set();
  function mount(slot) {
    if (mounted.has(slot) || !slot.getClientRects().length || document.hidden) return;
    const key = slot.dataset.adKey;
    const width = Number(slot.dataset.adWidth),
      height = Number(slot.dataset.adHeight);
    if (
      !/^[a-f0-9]{32}$/.test(key) ||
      ![160, 300].includes(width) ||
      ![250, 300, 600].includes(height)
    )
      return;
    mounted.add(slot);
    observer?.unobserve(slot);
    const frame = document.createElement('iframe');
    frame.width = String(width);
    frame.height = String(height);
    frame.title = UICopy.text('sponsored');
    frame.dataset.sponsorFrame = key;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;padding:0;width:${width}px;min-height:${height}px}iframe{border:0;display:block}</style></head><body><script>window.atOptions=${JSON.stringify({ key, format: 'iframe', height, width, params: {} })};<\/script><script src="https://bauval.org/22/${key}" onerror='parent.postMessage({type:"BFSC_AD_FAILED",key:"${key}"},${JSON.stringify(location.origin)})'><\/script></body></html>`;
    slot.append(frame);
    slot.dataset.adMounted = 'true';
  }
  const observer =
    typeof IntersectionObserver === 'function'
      ? new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) mount(entry.target);
          },
          { rootMargin: '200px 0px' }
        )
      : null;
  for (const slot of slots) observer ? observer.observe(slot) : mount(slot);
  window.addEventListener('message', (event) => {
    if (event.origin !== location.origin || event.data?.type !== 'BFSC_AD_FAILED') return;
    const slot = slots.find((slot) => slot.dataset.adKey === event.data.key);
    const frame = slot?.querySelector('[data-sponsor-frame]');
    if (!frame || event.source !== frame.contentWindow) return;
    const note = document.createElement('p');
    note.dataset.copy = 'sponsorUnavailable';
    note.textContent = UICopy.text('sponsorUnavailable');
    slot.replaceChildren(note);
    slot.dataset.adState = 'unavailable';
  });
  // Resizing can reveal the existing 300px shelf on small phones. No SDK refresh.
  window.addEventListener(
    'resize',
    () => {
      if (!observer) for (const slot of slots) mount(slot);
    },
    { passive: true }
  );
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden)
      for (const slot of slots) {
        if (observer && !mounted.has(slot)) observer.observe(slot);
        else if (!observer) mount(slot);
      }
  });
  document.addEventListener('bfsc-languagechange', () => {
    for (const slot of slots)
      slot.querySelector('[data-sponsor-frame]')?.setAttribute('title', UICopy.text('sponsored'));
  });
});
