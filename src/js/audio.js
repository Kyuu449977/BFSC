// Web Audio Sound System: SFX cues and rich, upbeat, multi-section culinary BGM.
class CSGOAudioSystem {
  constructor() {
    this.ctx = null;
    this._muted = false;
    this.voices = new Set();
    this.bgmNodes = new Set();
    this.lastTickTime = -1;
    this.schedulerTimer = null;
    this.isBgmPlaying = false;
    this.wasBgmPlaying = false;
    this.bgmGain = null;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.wasBgmPlaying = this.isBgmPlaying;
        this.stopBgm();
        this.stopSfx();
      } else if (this.wasBgmPlaying && !this._muted) {
        this.startBgm();
      }
    });

    const unlockAudio = () => {
      this.ensureContext();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    window.addEventListener('keydown', unlockAudio, { passive: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true });
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
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);
      }
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

  stopSfx() {
    for (const voice of this.voices) {
      try { voice.stop(); } catch (_) {}
    }
    this.voices.clear();
  }

  stop() {
    this.stopBgm();
    this.stopSfx();
  }

  tone(frequency, delay = 0, duration = 0.1, volume = 0.035) {
    if (this.isMuted || document.hidden) return;
    this.ensureContext();
    if (!this.ctx || this.voices.size >= 8) return;
    try {
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
    } catch (_) {}
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

  playWin(rarity = 4) {
    this.stopSfx();
    const notes = rarity >= 5 ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      this.tone(freq, idx * 0.07, 0.26, 0.048);
    });
  }

  /* Upbeat, Stimulating, 32-Bar Cheerful Culinary BGM */
  async startBgm() {
    if (this.isMuted || document.hidden || this.isBgmPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume(); } catch (_) {}
    }
    this.isBgmPlaying = true;

    // Upbeat tempo: 124 BPM -> 1 beat = 0.48387s; 1 bar (4 beats) = 1.93548s
    const beatLen = 60 / 124;
    const barLen = beatLen * 4;

    // 32-bar chords progression
    // Part 1: Intro & Sunny Breakfast (Bars 0-7)
    // Part 2: Street Market Walk (Bars 8-15)
    // Part 3: Golden Cooking Feast (Bars 16-23)
    // Part 4: Sweet Treat Reverie (Bars 24-31)
    const chordProgression = [
      // Section 1
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 698.46], // G7
      [329.63, 392.00, 493.88, 587.33], // Em7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 698.46], // G7
      [261.63, 329.63, 392.00, 523.25], // Cmaj7
      [261.63, 329.63, 392.00, 466.16], // C7

      // Section 2
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [349.23, 392.00, 493.88, 587.33], // G/F
      [329.63, 392.00, 493.88, 659.25], // Em7
      [220.00, 277.18, 329.63, 392.00], // A7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 659.25], // G13
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [261.63, 329.63, 392.00, 466.16], // C7

      // Section 3 (Climax)
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 698.46], // G7
      [261.63, 329.63, 392.00, 523.25], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [233.08, 293.66, 349.23, 440.00], // Bbmaj7
      [392.00, 493.88, 587.33, 698.46], // G7
      [261.63, 329.63, 392.00, 523.25], // Cmaj7
      [220.00, 277.18, 329.63, 392.00], // A7

      // Section 4 (Sweet Outro Loop)
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [329.63, 415.30, 493.88, 587.33], // E7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 369.99, 440.00, 523.25], // D7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [392.00, 493.88, 587.33, 698.46], // G7
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [261.63, 329.63, 392.00, 523.25], // C
    ];

    // Melodic Motifs (32 bars of lively melodic phrases)
    const melodyLines = [
      // Sec 1
      [659.25, 783.99, 880.00, 1046.50],
      [987.77, 880.00, 783.99, 698.46],
      [659.25, 783.99, 659.25, 587.33],
      [523.25, 659.25, 783.99, 880.00],
      [880.00, 783.99, 698.46, 659.25],
      [587.33, 698.46, 783.99, 880.00],
      [783.99, 659.25, 587.33, 523.25],
      [587.33, 659.25, 783.99, 932.33],

      // Sec 2
      [880.00, 1046.50, 880.00, 783.99],
      [698.46, 783.99, 880.00, 987.77],
      [1046.50, 987.77, 880.00, 783.99],
      [880.00, 740.00, 659.25, 587.33],
      [698.46, 783.99, 880.00, 698.46],
      [783.99, 880.00, 987.77, 1046.50],
      [1046.50, 783.99, 659.25, 523.25],
      [587.33, 659.25, 783.99, 932.33],

      // Sec 3
      [880.00, 987.77, 1046.50, 1174.66],
      [1174.66, 1046.50, 987.77, 880.00],
      [783.99, 880.00, 1046.50, 783.99],
      [659.25, 783.99, 880.00, 659.25],
      [932.33, 880.00, 783.99, 698.46],
      [783.99, 880.00, 987.77, 1046.50],
      [1046.50, 880.00, 783.99, 659.25],
      [740.00, 880.00, 987.77, 1108.73],

      // Sec 4
      [880.00, 698.46, 783.99, 880.00],
      [987.77, 830.61, 783.99, 659.25],
      [880.00, 783.99, 659.25, 523.25],
      [740.00, 880.00, 987.77, 740.00],
      [698.46, 783.99, 880.00, 698.46],
      [783.99, 987.77, 880.00, 698.46],
      [659.25, 783.99, 880.00, 1046.50],
      [1046.50, 783.99, 659.25, 523.25],
    ];

    // Bass notes for each bar
    const bassLines = [
      174.61, 196.00, 164.81, 110.00, 146.83, 196.00, 130.81, 130.81,
      174.61, 174.61, 164.81, 110.00, 146.83, 196.00, 130.81, 130.81,
      146.83, 196.00, 130.81, 110.00, 116.54, 196.00, 130.81, 110.00,
      146.83, 164.81, 110.00, 146.83, 146.83, 196.00, 130.81, 130.81
    ];

    let currentBar = 0;
    let nextBarTime = this.ctx.currentTime + 0.05;

    const scheduleNotes = () => {
      if (!this.isBgmPlaying || this.isMuted || document.hidden || !this.ctx) {
        this.stopBgm();
        return;
      }
      if (nextBarTime < this.ctx.currentTime) {
        nextBarTime = this.ctx.currentTime + 0.05;
      }

      // Schedule up to 1.5 seconds in advance
      while (nextBarTime < this.ctx.currentTime + 1.5) {
        const barIdx = currentBar % 32;
        const barTime = nextBarTime;
        const chord = chordProgression[barIdx];
        const melody = melodyLines[barIdx];
        const bassNote = bassLines[barIdx];

        // 1. Warm plucked bass note on beat 1 & beat 3
        [0, beatLen * 2].forEach((offset) => {
          try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(bassNote, barTime + offset);
            gain.gain.setValueAtTime(0.0001, barTime + offset);
            gain.gain.exponentialRampToValueAtTime(0.075, barTime + offset + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, barTime + offset + beatLen * 1.6);
            osc.connect(gain);
            gain.connect(this.bgmGain);
            osc.start(barTime + offset);
            osc.stop(barTime + offset + beatLen * 1.7);
            this.bgmNodes.add(osc);
            osc.onended = () => {
              this.bgmNodes.delete(osc);
              try { osc.disconnect(); gain.disconnect(); } catch (_) {}
            };
          } catch (_) {}
        });

        // 2. Soft atmospheric pad chord
        chord.forEach((freq, idx) => {
          try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, barTime);
            gain.gain.setValueAtTime(0.0001, barTime);
            gain.gain.exponentialRampToValueAtTime(0.035, barTime + 0.15 + idx * 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, barTime + barLen * 0.95);
            osc.connect(gain);
            gain.connect(this.bgmGain);
            osc.start(barTime);
            osc.stop(barTime + barLen);
            this.bgmNodes.add(osc);
            osc.onended = () => {
              this.bgmNodes.delete(osc);
              try { osc.disconnect(); gain.disconnect(); } catch (_) {}
            };
          } catch (_) {}
        });

        // 3. Cheerful melodic notes (4 beats)
        melody.forEach((freq, step) => {
          try {
            const noteTime = barTime + step * beatLen;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            // Blended cheerful timbre (triangle wave for chime-like marimba)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, noteTime);
            gain.gain.setValueAtTime(0.0001, noteTime);
            gain.gain.exponentialRampToValueAtTime(0.08, noteTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + beatLen * 0.85);
            osc.connect(gain);
            gain.connect(this.bgmGain);
            osc.start(noteTime);
            osc.stop(noteTime + beatLen * 0.9);
            this.bgmNodes.add(osc);
            osc.onended = () => {
              this.bgmNodes.delete(osc);
              try { osc.disconnect(); gain.disconnect(); } catch (_) {}
            };
          } catch (_) {}
        });

        currentBar++;
        nextBarTime += barLen;
      }
    };

    scheduleNotes();
    this.schedulerTimer = setInterval(scheduleNotes, 250);
  }

  stopBgm() {
    this.isBgmPlaying = false;
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    for (const node of this.bgmNodes) {
      try { node.stop(); } catch (_) {}
    }
    this.bgmNodes.clear();
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