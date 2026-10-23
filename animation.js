// ============================================================
// HỆ THỐNG VÒNG QUAY MỞ HÒM PHONG CÁCH CS:GO (CASE OPENING REEL)
// VÀ HỆ THỐNG BẮN PHÁO HOA CHÚC MỪNG (FIREWORKS CELEBRATION)
// ============================================================

class CSGOCaseRoulette {
  constructor(reelTrackId, reelContainerId) {
    this.track = document.getElementById(reelTrackId);
    this.container = document.getElementById(reelContainerId);
    this.isSpinning = false;
    this.onCompleteCallback = null;
    this.winningItem = null;

    this.cardWidth = 150;
    this.cardGap = 10;
    this.totalCards = 65;
    this.winningIndex = 48; // Vị trí món trúng trong dải băng chuyền

    this.currentTranslateX = 0;
    this.targetTranslateX = 0;
    this.startTime = 0;
    this.duration = 5500; // 5.5 giây xoay kịch tính
    this.lastTickIndex = -1;
    this.rafId = null;

    this.updateCardDimensions();
    window.addEventListener('resize', () => this.updateCardDimensions());
  }

  updateCardDimensions() {
    if (window.innerWidth <= 860) {
      this.cardWidth = 120;
      this.cardGap = 10;
    } else {
      this.cardWidth = 150;
      this.cardGap = 10;
    }
    this.measuredStep = this.cardWidth + this.cardGap;
  }

  // Khởi tạo dải thẻ quà CS:GO cho vòng quay (bỏ sao theo yêu cầu)
  buildReel(winningDish, allDishes) {
    this.updateCardDimensions();
    this.winningItem = winningDish;
    this.track.innerHTML = '';
    this.track.style.transition = 'none';
    this.track.style.transform = 'translate3d(0px, 0px, 0px)';
    this.currentTranslateX = 0;
    this.lastTickIndex = -1;

    // Danh sách món trước và sau món chiến thắng
    for (let i = 0; i < this.totalCards; i++) {
      let dish;
      if (i === this.winningIndex) {
        dish = winningDish;
      } else {
        dish = allDishes[Math.floor(Math.random() * allDishes.length)];
      }

      const card = document.createElement('div');
      card.className = `csgo-card csgo-tier-${dish.rarity}`;
      card.dataset.index = i;
      card.innerHTML = `
        <div class="csgo-card-rarity-bar"></div>
        <div class="csgo-card-img-wrap">
          <img class="csgo-card-img" src="${dish.image}" alt="${dish.name}" loading="lazy" />
        </div>
        <div class="csgo-card-info">
          <div class="csgo-card-name">${dish.name}</div>
          <div class="csgo-card-type">${dish.type}</div>
        </div>
      `;
      this.track.appendChild(card);
    }
  }

  // Bắt đầu quay
  start(winningDish, allDishes, onComplete) {
    if (this.isSpinning) return;
    this.isSpinning = true;
    this.onCompleteCallback = onComplete;
    if (this.finishSpinTimeout) {
      clearTimeout(this.finishSpinTimeout);
      this.finishSpinTimeout = null;
    }

    this.buildReel(winningDish, allDishes);

    // Đo kích thước thực tế từ DOM để chuẩn xác 100% trên mọi màn hình Điện thoại / Tablet / PC
    const cards = this.track.querySelectorAll('.csgo-card');
    const winningCardEl = cards[this.winningIndex];
    const actualCardWidth = (winningCardEl && winningCardEl.offsetWidth > 0)
      ? winningCardEl.offsetWidth
      : this.cardWidth;

    if (cards.length > 1 && cards[1].offsetLeft > cards[0].offsetLeft) {
      this.measuredStep = cards[1].offsetLeft - cards[0].offsetLeft;
    } else {
      this.measuredStep = actualCardWidth + this.cardGap;
    }

    const containerWidth = this.container.offsetWidth;

    // Tính toán điểm dừng chính xác ngay giữa kim chỉ tâm
    const randomOffset = (Math.random() - 0.5) * (actualCardWidth * 0.65);
    const centerOffset = containerWidth / 2;
    const cardCenter = (winningCardEl && winningCardEl.offsetLeft > 0)
      ? (winningCardEl.offsetLeft + (actualCardWidth / 2))
      : ((this.winningIndex * this.measuredStep) + (actualCardWidth / 2));

    this.targetTranslateX = -(cardCenter - centerOffset + randomOffset);
    this.startTime = performance.now();

    // Phát âm thanh mở case
    audioSystem.playCaseOpen();

    // Vòng lặp vật lý hãm đà (Deceleration Curve)
    cancelAnimationFrame(this.rafId);
    this.animate();
  }

  // Hàm nội suy Bezier Easing: bắt đầu nhanh, hãm phanh từ từ rồi dừng êm dịu
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3.8);
  }

  animate() {
    if (!this.isSpinning) return;

    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);

    const ease = this.easeOutCubic(progress);
    this.currentTranslateX = this.targetTranslateX * ease;

    this.track.style.transform = `translate3d(${this.currentTranslateX}px, 0px, 0px)`;

    // Gõ tiếng TICK khi thẻ đi qua kim tâm
    const step = this.measuredStep || (this.cardWidth + this.cardGap);
    const centerPos = -this.currentTranslateX + (this.container.offsetWidth / 2);
    const currentCardIdx = Math.floor(centerPos / step);

    if (currentCardIdx !== this.lastTickIndex && currentCardIdx >= 0 && currentCardIdx < this.totalCards) {
      this.lastTickIndex = currentCardIdx;
      audioSystem.playTick();
    }

    if (progress < 1) {
      this.rafId = requestAnimationFrame(() => this.animate());
    } else {
      this.finishSpin();
    }
  }

  // Bỏ qua (Skip) ngay lập tức tới kết quả
  skip() {
    if (!this.isSpinning) return;
    cancelAnimationFrame(this.rafId);
    this.currentTranslateX = this.targetTranslateX;
    this.track.style.transform = `translate3d(${this.targetTranslateX}px, 0px, 0px)`;
    this.finishSpin();
  }

  finishSpin() {
    this.isSpinning = false;
    cancelAnimationFrame(this.rafId);

    // Đánh dấu thẻ chiến thắng phát sáng rực rỡ
    const winningCard = this.track.querySelector(`[data-index="${this.winningIndex}"]`);
    if (winningCard) {
      winningCard.classList.add('winner-glow');
    }

    // Phát âm thanh chiến thắng
    audioSystem.playWin(this.winningItem ? this.winningItem.rarity : 3);

    // Chờ 0.6 giây để ngắm kim dừng trên món rồi hiển thị thẻ trúng
    this.finishSpinTimeout = setTimeout(() => {
      if (this.onCompleteCallback) {
        this.onCompleteCallback(this.winningItem);
      }
    }, 600);
  }
}

// ============================================================
// HỆ THỐNG BẮN PHÁO HOA & CONFETTI CHÚC MỪNG (CANVAS HIGH-PERF)
// ============================================================
class CelebrationFireworks {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.isActive = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  launch(durationMs = 3200) {
    if (!this.canvas) return;
    this.resize();
    this.canvas.style.display = 'block';
    this.isActive = true;

    const colors = ['#ff3838', '#ff9f1a', '#ffd32a', '#2ed573', '#1e90ff', '#ff4757', '#9b59b6', '#00d2d3', '#ffffff', '#e056fd'];

    const spawnFirework = (x, y) => {
      const count = 55 + Math.floor(Math.random() * 30);
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.5 + Math.random() * 7.5;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 3 + Math.random() * 4,
          color: Math.random() > 0.25 ? color : colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.012 + Math.random() * 0.015,
          gravity: 0.13,
          isConfetti: Math.random() > 0.45,
          rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 14
        });
      }
    };

    const w = this.canvas.width;
    const h = this.canvas.height;
    // Đợt 1: Pháo hoa bùng nổ trung tâm và 2 bên
    spawnFirework(w * 0.5, h * 0.32);
    spawnFirework(w * 0.25, h * 0.38);
    spawnFirework(w * 0.75, h * 0.38);

    // Đợt 2: Tiếp tục bắn sau 350ms
    setTimeout(() => {
      if (this.isActive) {
        spawnFirework(w * 0.4, h * 0.28);
        spawnFirework(w * 0.6, h * 0.28);
      }
    }, 350);

    // Đợt 3: Bắn pháo hoa rực rỡ sau 700ms
    setTimeout(() => {
      if (this.isActive) {
        spawnFirework(w * 0.5, h * 0.22);
        spawnFirework(w * 0.2, h * 0.35);
        spawnFirework(w * 0.8, h * 0.35);
      }
    }, 700);

    const startTime = performance.now();
    cancelAnimationFrame(this.animationId);

    const loop = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.alpha -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.globalAlpha = Math.max(0, p.alpha);
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;

        if (p.isConfetti) {
          this.ctx.fillRect(-p.size, -p.size / 2, p.size * 2, p.size);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
      }

      if (performance.now() - startTime < durationMs || this.particles.length > 0) {
        this.animationId = requestAnimationFrame(loop);
      } else {
        this.stop();
      }
    };

    loop();
  }

  stop() {
    this.isActive = false;
    cancelAnimationFrame(this.animationId);
    this.particles = [];
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.canvas.style.display = 'none';
    }
  }
}
