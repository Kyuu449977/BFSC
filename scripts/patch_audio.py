with open('src/js/audio.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Replace init check
old_init = """  init() {
    if (this.ctx) return;"""
new_init = """  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }"""
code = code.replace(old_init, new_init)

# 2. Update startBgm to async with resume check
old_start_bgm = """  startBgm() {
    if (this.isMuted || document.hidden || this.isBgmPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;
    this.isBgmPlaying = true;"""
new_start_bgm = """  async startBgm() {
    if (this.isMuted || document.hidden || this.isBgmPlaying) return;
    this.ensureContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      try { await this.ctx.resume(); } catch (_) {}
    }
    this.isBgmPlaying = true;"""
code = code.replace(old_start_bgm, new_start_bgm)

# 3. Add clock reset in scheduleNotes
old_sched_head = """    const scheduleNotes = () => {
      if (!this.isBgmPlaying || this.isMuted || document.hidden || !this.ctx) {
        this.stopBgm();
        return;
      }

      // Schedule up to 1.5 seconds in advance"""
new_sched_head = """    const scheduleNotes = () => {
      if (!this.isBgmPlaying || this.isMuted || document.hidden || !this.ctx) {
        this.stopBgm();
        return;
      }
      if (nextBarTime < this.ctx.currentTime) {
        nextBarTime = this.ctx.currentTime + 0.05;
      }

      // Schedule up to 1.5 seconds in advance"""
code = code.replace(old_sched_head, new_sched_head)

# 4. Boost bass, pad, and melody gains
code = code.replace(
    "gain.gain.exponentialRampToValueAtTime(0.05, barTime + offset + 0.02);",
    "gain.gain.exponentialRampToValueAtTime(0.075, barTime + offset + 0.02);"
)
code = code.replace(
    "gain.gain.exponentialRampToValueAtTime(0.022, barTime + 0.15 + idx * 0.03);",
    "gain.gain.exponentialRampToValueAtTime(0.035, barTime + 0.15 + idx * 0.03);"
)
code = code.replace(
    "gain.gain.exponentialRampToValueAtTime(0.038, noteTime + 0.02);",
    "gain.gain.exponentialRampToValueAtTime(0.08, noteTime + 0.02);"
)

with open('src/js/audio.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("audio.js patched successfully!")
