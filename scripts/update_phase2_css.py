import sys
sys.stdout.reconfigure(encoding='utf-8')

# 1. Update src/styles/interactions.css with 3D Flip Card & Custom Wheel styling
with open('src/styles/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

flip_css = """
/* ==========================================================================
   3D Flip Card Animation (Emil Kowalski Spring Physics & TCG Aesthetic)
   ========================================================================== */
.flip-card {
  perspective: 1200px;
  cursor: pointer;
  user-select: none;
  width: 100%;
  display: block;
  outline: none;
  border-radius: var(--radius-lg, 16px);
}

.flip-card:focus-visible {
  outline: 3px solid var(--accent, #f26419);
  outline-offset: 4px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  min-height: 400px;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
}

.flip-card[data-flipped='true'] .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-back,
.flip-card-front {
  width: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-lg, 16px);
  overflow: hidden;
}

.flip-card-back {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, var(--surface-card, #232830), var(--surface, #14171c));
  border: 2px solid var(--accent-gold, #e5b158);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35), inset 0 0 24px rgba(229, 177, 88, 0.12);
  z-index: 2;
  min-height: 380px;
}

.card-back-ornament {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px 16px;
  gap: 8px;
  position: relative;
  z-index: 1;
}

.card-back-glow {
  position: absolute;
  width: 140px;
  height: 140px;
  background: radial-gradient(circle, rgba(229, 177, 88, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: cardPulse 3s ease-in-out infinite alternate;
}

@keyframes cardPulse {
  0% { transform: scale(0.9); opacity: 0.6; }
  100% { transform: scale(1.15); opacity: 1; }
}

.card-back-symbol {
  font-size: 38px;
  line-height: 1;
  color: var(--accent-gold, #e5b158);
  filter: drop-shadow(0 2px 8px rgba(229, 177, 88, 0.5));
}

.card-back-brand {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #fff;
  margin-top: 4px;
}

.card-back-sub {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #9aa5b1;
  text-transform: uppercase;
}

.card-back-hint {
  margin-top: 18px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-gold, #e5b158);
  background: rgba(229, 177, 88, 0.15);
  border: 1px solid rgba(229, 177, 88, 0.4);
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  animation: cardBounce 2s ease-in-out infinite;
}

@keyframes cardBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.flip-card-front {
  transform: rotateY(180deg);
  display: flex;
}

.flip-card-front .result-card {
  width: 100%;
  margin: 0;
}

/* Custom Wheel Styling */
.custom-wheel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 16px;
  border-radius: 12px;
  background: var(--surface-card, #232830);
  border: 1.5px solid var(--accent, #f26419);
  color: var(--ink, #fff);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
}

.custom-wheel-btn:hover {
  background: var(--surface-hover, #2c323c);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(242, 100, 25, 0.2);
}

.custom-wheel-btn:active {
  transform: translateY(1px) scale(0.98);
}

.custom-wheel-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0 16px;
}

.custom-wheel-desc {
  font-size: 13px;
  color: var(--muted, #9aa5b1);
  line-height: 1.5;
  margin: 0;
}

.custom-wheel-input-area textarea {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: var(--surface, #14171c);
  border: 1px solid var(--border, #333a44);
  color: var(--ink, #fff);
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  box-sizing: border-box;
}

.custom-wheel-quick-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-subtle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  color: var(--ink, #fff);
  font-size: 12px;
  cursor: pointer;
  min-height: 36px;
}

.btn-subtle:hover {
  background: rgba(255, 255, 255, 0.12);
}

.custom-wheel-count-info {
  font-size: 12px;
  color: var(--accent-gold, #e5b158);
  font-weight: 500;
}

.custom-wheel-spin-action {
  width: 100%;
  min-height: 48px;
  font-size: 15px;
  font-weight: 700;
  margin-top: 6px;
}
"""

if ".flip-card" not in css:
    with open('src/styles/interactions.css', 'a', encoding='utf-8') as f:
        f.write(flip_css)
    print("Added 3D Flip Card & Custom Wheel CSS to src/styles/interactions.css")
else:
    print(".flip-card already exists in interactions.css")
