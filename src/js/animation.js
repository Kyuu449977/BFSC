class FoodRoulette {
  constructor(track, viewport) {
    this.track = track;
    this.viewport = viewport;
    this.busy = false;
    this.runId = 0;
    const device = typeof navigator === 'undefined' ? {} : navigator;
    this.light = (device.deviceMemory > 0 && device.deviceMemory <= 4) ||
      (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4);
    this.slowRuns = 0;
    this.cardCache = [];
    this.onResize = () => {
      if (this.busy) {
        this.width = this.viewport.clientWidth;
        this.place(this.progress || 0);
      }
    };
    window.addEventListener('resize', this.onResize);
  }
  buildSequence(dish, pool) {
    const options = [...new Map([...pool, dish].map((item) => [item.id, item])).values()];
    // One eligible dish: show it once rather than fake a strip of repeated cards.
    if (options.length === 1) return { items: [dish], targetIndex: 0 };
    const items = new Array(this.light ? 12 : 32),
      targetIndex = this.light ? 8 : 26;
    items[targetIndex] = dish;
    const pickOther = (neighbor) => {
      const eligible = options.filter((item) => item.id !== neighbor.id);
      return eligible[Math.floor(Math.random() * eligible.length)];
    };
    // Build outward from the actual result, protecting both neighboring cards.
    for (let i = targetIndex - 1; i >= 0; i--) items[i] = pickOther(items[i + 1]);
    for (let i = targetIndex + 1; i < items.length; i++) items[i] = pickOther(items[i - 1]);
    return { items, targetIndex };
  }
  start(dish, pool, done) {
    if (this.busy) return;
    this.busy = true;
    const runId = ++this.runId;
    this.done = done;
    this.progress = 0;
    const fragment = document.createDocumentFragment();
    const sequence = this.buildSequence(dish, pool);
    this.targetIndex = sequence.targetIndex;
    for (let index = 0; index < sequence.items.length; index++) {
      const cached = this.cardCache[index];
      if (cached) {
        cached.removeAttribute('data-winner');
        cached.setAttribute('aria-label', UICopy.text('mystery'));
        cached.querySelector('.reel-card-title').textContent = window.I18N?.[document.documentElement.lang]?.brand_name || 'Ăn Gì Đây?';
        fragment.append(cached);
        continue;
      }
      const card = document.createElement('div');
      card.className = 'reel-card reel-card-mystery';
      card.setAttribute('aria-label', UICopy.text('mystery'));

      const inner = document.createElement('div');
      inner.className = 'reel-card-back';

      const pattern = document.createElement('div');
      pattern.className = 'reel-card-pattern';

      const icon = document.createElement('div');
      icon.className = 'reel-card-icon';
      icon.textContent = '✨';

      const title = document.createElement('div');
      title.className = 'reel-card-title';
      title.textContent = window.I18N?.[document.documentElement.lang]?.brand_name || 'Ăn Gì Đây?';

      const question = document.createElement('div');
      question.className = 'reel-card-q';
      question.textContent = '???';

      inner.append(pattern, icon, title, question);
      card.append(inner);
      this.cardCache[index] = card;
      fragment.append(card);
    }
    this.track.classList.toggle('reel-light', this.light);
    this.track.replaceChildren(fragment);
    this.width = this.viewport.clientWidth;
    this.place(0);
    const started = performance.now();
    const duration = this.light ? 1200 : 2500;
    let previous = started, frames = 0, slowFrames = 0;
    const animate = (now) => {
      if (!this.busy || this.runId !== runId) return;
      if (!document.hidden) {
        frames++;
        if (now - previous > 40) slowFrames++;
      }
      previous = now;
      this.progress = Math.min((now - started) / duration, 1);
      this.place(this.progress);
      if (this.progress === 1) {
        this.track.children[this.targetIndex]?.setAttribute('data-winner', 'true');
        if (!this.light && frames >= 10) {
          this.slowRuns = slowFrames / frames > 0.2 ? this.slowRuns + 1 : 0;
          if (this.slowRuns >= 2) this.light = true;
        }
        this.landTimer = setTimeout(() => this.finish(), this.light ? 60 : 140);
      } else this.frame = requestAnimationFrame(animate);
    };
    this.frame = requestAnimationFrame(animate);
  }
  place(progress) {
    // Only resize events read geometry; animation frames use the cached width.
    const target = this.targetIndex * 140 + 65 - this.width / 2;
    this.track.style.transform = `translate3d(${-target * (1 - Math.pow(1 - progress, 4))}px,0,0)`;
  }
  skip() {
    if (this.busy) {
      this.width = this.viewport.clientWidth;
      this.place(1);
      this.finish();
    }
  }
  finish() {
    if (!this.busy) return;
    this.busy = false;
    cancelAnimationFrame(this.frame);
    clearTimeout(this.landTimer);
    const done = this.done;
    this.done = null;
    done?.();
  }
  release() {
    if (this.busy) return;
    cancelAnimationFrame(this.frame);
    clearTimeout(this.landTimer);
    this.frame = null;
    this.landTimer = null;
    this.done = null;
    this.track.replaceChildren();
    this.track.style.removeProperty('transform');
  }
}
