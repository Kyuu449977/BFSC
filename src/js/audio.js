// Web Audio Sound System: SFX cues and rich, relaxing Lo-Fi Café Background Music (BGM).
class CSGOAudioSystem {
  constructor() {
    this.ctx = null;
    this._muted = false;
    this.voices = new Set();
    this.bgmVoices = new Set();
    this.lastTickTime = -1;
    this.bgmTimer = null;
    this.isBgmPlaying = false;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.stop();
    });
  }

  get isMuted() {
    return this._muted;
  }

  set isMuted(value) {
    this._muted = Boolean(value);
    if (this._muted) {
      this.stop();
    }
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
    if (this.ctx && ['suspended', 'interrupted'].includes(this.ctx.state)) {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  stop() {
    this.stopBgm();
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
      try { oscillator.disconnect(); gain.disconnect(); } catch (_) {}
    };
    oscillator.start(start);
    oscillator.stop(start + duration + 0.01);
  }

  playClick() {
    this.tone(620, 0, 0.065, 0.04);
  }

  playTick() {
    if (this.isMuted || document.hidden) return;
    this.ensureContext();
    if (!this.ctx || this.ctx.currentTime - this.lastTickTime < 0.085) return;
    this.lastTickTime = this.ctx.currentTime;
    this.tone(480, 0, 0.04, 0.025);
  }

  playCaseOpen() {
    this.tone(392, 0, 0.12, 0.05);
    this.tone(523.25, 0.06, 0.14, 0.05);
  }

  playWin() {
    this.stop();
    [523.25, 659.25, 783.99].forEach((frequency, index) =>
      this.tone(frequency, index * 0.07, 0.22, 0.045)
    );
  }

  /* Rich, audible, relaxing Lo-Fi Café BGM */
  startBgm() {
    if (this.isMuted || document.hidden || this.isBgmPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.isBgmPlaying = true;

    // Chord progression (Cmaj7 -> Am7 -> Dm7 -> G7)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23], // G7
    ];

    const melodySteps = [
      [523.25, 587.33, 659.25, 783.99],
      [440.00, 523.25, 659.25, 587.33],
      [587.33, 659.25, 698.46, 783.99],
      [392.00, 493.88, 587.33, 523.25],
    ];

    let bar = 0;

    const playBar = () => {
      if (!this.isBgmPlaying || this.isMuted || document.hidden) {
        this.stopBgm();
        return;
      }
      this.ensureContext();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const chord = chords[bar % chords.length];
      const melody = melodySteps[bar % melodySteps.length];

      // Soft warm chord pad
      chord.forEach((freq, idx) => {
        try {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.exponentialRampToValueAtTime(0.045, t + 0.12 + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 2.6);
          this.bgmVoices.add(osc);
          osc.onended = () => {
            this.bgmVoices.delete(osc);
            try { osc.disconnect(); gain.disconnect(); } catch (_) {}
          };
        } catch (_) {}
      });

      // Melodic notes
      melody.forEach((freq, i) => {
        try {
          const noteTime = t + 0.35 + i * 0.52;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, noteTime);

          gain.gain.setValueAtTime(0.0001, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.065, noteTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.9);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.95);
          this.bgmVoices.add(osc);
          osc.onended = () => {
            this.bgmVoices.delete(osc);
            try { osc.disconnect(); gain.disconnect(); } catch (_) {}
          };
        } catch (_) {}
      });

      bar = (bar + 1) % chords.length;
      this.bgmTimer = setTimeout(playBar, 2500);
    };

    playBar();
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    for (const voice of this.bgmVoices) {
      try { voice.stop(); } catch (_) {}
    }
    this.bgmVoices.clear();
  }

  toggleBgm() {
    if (this.isBgmPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isBgmPlaying;
  }
}

const audioSystem = new CSGOAudioSystem();
