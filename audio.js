// ============================================================
// HỆ THỐNG ÂM THANH WEBAUDIO API CHO MỞ HÒM CS:GO
// Âm thanh tiếng "Click/Tick" xoay vòng quay cơ học cực bắt tai
// và âm thanh Fanfare chiến thắng theo độ hiếm
// ============================================================

class CSGOAudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isInitialized = false;
    this.lastTickTime = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && (this.ctx.state === 'suspended' || this.ctx.state === 'interrupted')) {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Tiếng bấm nút
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Tiếng TICK kinh điển khi vạch kim lướt qua từng món hàng CS:GO
  playTick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Giới hạn tần suất tick tránh rè khi quay siêu tốc
    if (now - this.lastTickTime < 0.025) return;
    this.lastTickTime = now;

    // Transient click kết hợp tần số cao & gỗ gõ
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.022);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  }

  // Tiếng mở hòm khởi động (tiếng mở nắp khóa case)
  playCaseOpen() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [350, 480, 720];
    freqs.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const st = now + idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, st);
      gain.gain.setValueAtTime(0.1, st);
      gain.gain.exponentialRampToValueAtTime(0.001, st + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(st);
      osc.stop(st + 0.15);
    });
  }

  // Tiếng khi kim dừng lại ở món trúng thưởng (Reveal Fanfare)
  playWin(rarity = 3) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    if (rarity === 5) {
      // 5 SAO (Đặc biệt Hoàng Kim / Special Knife CS:GO): Tiếng rền vang chiến thắng
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = i < 3 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, now);
        filter.frequency.exponentialRampToValueAtTime(500, now + 1.8);

        gain.gain.setValueAtTime(0.15 / (i * 0.5 + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 2.0);
      });
    } else if (rarity === 4) {
      // 4 SAO (Covert Đỏ / Hồng): Hợp âm hân hoan
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + idx * 0.06;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.1, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(st);
        osc.stop(st + 0.9);
      });
    } else {
      // 3 SAO: Tiếng chuông thanh nhẹ
      const blueNotes = [587.33, 783.99, 1046.50];
      blueNotes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const st = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.08, st);
        gain.gain.exponentialRampToValueAtTime(0.001, st + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(st);
        osc.stop(st + 0.6);
      });
    }
  }
}

const audioSystem = new CSGOAudioSystem();

// Tự động mở khóa Web Audio API ngay lần chạm đầu tiên trên thiết bị di động (iOS / Android)
['touchstart', 'pointerdown'].forEach(evt => {
  window.addEventListener(evt, () => {
    audioSystem.ensureContext();
  }, { once: true, passive: true });
});
