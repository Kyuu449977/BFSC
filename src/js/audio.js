/**
 * Audio System - Sound effects and background music disabled.
 * Provides silent no-op implementations for all audio hooks.
 */
class SilentAudioSystem {
  constructor() {
    this._muted = true;
    this.isBgmPlaying = false;
    this.wasBgmPlaying = false;
  }

  get isMuted() {
    return true;
  }

  set isMuted(_) {
    this._muted = true;
  }

  ensureContext() {}
  playClick() {}
  playTick() {}
  playWin() {}
  playDramaticStinger() {}
  startBgm() {}
  stopBgm() {}
  stopSfx() {}
  stop() {}
  toggleBgm() {
    return false;
  }
  toggleSound() {
    return false;
  }
}

window.audioSystem = new SilentAudioSystem();
