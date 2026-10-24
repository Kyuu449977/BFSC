// Short, quiet Web Audio cues. No downloads or background audio.
class CSGOAudioSystem {
  constructor() {
    this.ctx = null;
    this._muted = false;
    this.voices = new Set();
    this.lastTickTime = -1;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
    });
  }
  get isMuted() {
    return this._muted;
  }
  set isMuted(value) {
    this._muted = Boolean(value);
    if (this._muted) this.stop();
  }
  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    } catch (_) {}
  }
  ensureContext() {
    if (this.isMuted || document.hidden) return;
    this.init();
    if (this.ctx && ['suspended', 'interrupted'].includes(this.ctx.state))
      this.ctx.resume().catch(() => {});
  }
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
  stop() {
    for (const voice of this.voices) {
      try {
        voice.stop();
      } catch (_) {}
    }
    this.voices.clear();
  }
  tone(frequency, delay = 0, duration = 0.1, volume = 0.035) {
    if (this.isMuted || document.hidden) return;
    this.ensureContext();
    if (!this.ctx || this.voices.size >= 8) return;
    const oscillator = this.ctx.createOscillator(),
      gain = this.ctx.createGain();
    const start = this.ctx.currentTime + delay;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(this.ctx.destination);
    this.voices.add(oscillator);
    oscillator.onended = () => {
      this.voices.delete(oscillator);
      oscillator.disconnect();
      gain.disconnect();
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.01);
  }
  playClick() {
    this.tone(620, 0, 0.065, 0.025);
  }
  playTick() {
    if (this.isMuted || document.hidden) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.currentTime - this.lastTickTime < 0.085) return;
    this.lastTickTime = this.ctx.currentTime;
    this.tone(420, 0, 0.035, 0.016);
  }
  playCaseOpen() {
    this.tone(392, 0, 0.12);
    this.tone(523.25, 0.06, 0.14);
  }
  playWin() {
    this.stop();
    [523.25, 659.25, 783.99].forEach((frequency, index) =>
      this.tone(frequency, index * 0.07, 0.22, 0.035)
    );
  }
}
const audioSystem = new CSGOAudioSystem();
