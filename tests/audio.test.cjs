const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function setup() {
  const listeners = {},
    oscillators = [];
  const param = { setValueAtTime() {}, exponentialRampToValueAtTime() {} };
  class AudioContext {
    constructor() {
      this.currentTime = 1;
      this.state = 'running';
    }
    createOscillator() {
      const voice = {
        frequency: param,
        connect() {},
        disconnect() {},
        start() {},
        stop() {
          this.stopped = true;
        },
      };
      oscillators.push(voice);
      return voice;
    }
    createGain() {
      return { gain: param, connect() {}, disconnect() {} };
    }
  }
  const document = { hidden: false, addEventListener: (name, fn) => (listeners[name] = fn) };
  const context = vm.createContext({ window: { AudioContext }, document });
  vm.runInContext(
    fs.readFileSync('src/js/audio.js', 'utf8') + '\nglobalThis.sound = audioSystem;',
    context
  );
  return { sound: context.sound, document, listeners, oscillators };
}
test('audio is created only on request and mute stops scheduled voices', () => {
  const { sound, oscillators } = setup();
  assert.equal(sound.ctx, null);
  sound.playWin();
  assert.equal(sound.voices.size, 3);
  sound.isMuted = true;
  assert.equal(sound.voices.size, 0);
  assert.ok(oscillators.every((v) => v.stopped));
  sound.playClick();
  assert.equal(oscillators.length, 3);
  sound.isMuted = false;
  sound.playClick();
  assert.equal(oscillators.length, 4);
});
test('hidden page cancels cues; tick and voice counts are bounded', () => {
  const { sound, document, listeners, oscillators } = setup();
  sound.playTick();
  sound.playTick();
  assert.equal(oscillators.length, 1);
  for (let i = 0; i < 30; i++) sound.playClick();
  assert.equal(sound.voices.size, 8);
  document.hidden = true;
  listeners.visibilitychange();
  assert.equal(sound.voices.size, 0);
  sound.playWin();
  assert.equal(sound.voices.size, 0);
});
