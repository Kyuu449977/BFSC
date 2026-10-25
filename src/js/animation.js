class FoodRoulette {
  constructor(track, viewport) {
    this.track = track;
    this.viewport = viewport;
    this.busy = false;
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
    const items = new Array(32),
      targetIndex = 26;
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
    this.done = done;
    this.progress = 0;
    const fragment = document.createDocumentFragment();
    const sequence = this.buildSequence(dish, pool);
    this.targetIndex = sequence.targetIndex;
    for (const item of sequence.items) {
      const card = document.createElement('div');
      card.className = 'reel-card';
      const img = new Image(130, 125);
      UI.imageFallback(img);
      img.src = item.image;
      const displayName = typeof getDishName === 'function' ? getDishName(item) : item.name;
      img.alt = displayName;
      img.decoding = 'async';
      const label = document.createElement('span');
      label.textContent = displayName;
      card.append(img, label);
      fragment.append(card);
    }
    this.track.replaceChildren(fragment);
    this.width = this.viewport.clientWidth;
    this.place(0);
    const started = performance.now();
    const animate = (now) => {
      if (!this.busy) return;
      this.progress = Math.min((now - started) / 2500, 1);
      this.place(this.progress);
      if (this.progress === 1) {
        this.track.children[this.targetIndex]?.setAttribute('data-winner', 'true');
        this.landTimer = setTimeout(() => this.finish(), 140);
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
    done();
  }
}
