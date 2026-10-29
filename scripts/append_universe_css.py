import sys

sys.stdout.reconfigure(encoding='utf-8')
with open(r'src/styles/interactions.css', 'r', encoding='utf-8') as f:
    css = f.read()

styles_to_add = '''
/* ==========================================================================
   Custom Wheel Alert & Universe Dish Dialog
   ========================================================================== */
.custom-wheel-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.18);
  border: 1px solid rgba(239, 68, 68, 0.55);
  color: #fca5a5;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  animation: wheelAlertShake 0.4s ease-in-out;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
}

.custom-wheel-alert[hidden] {
  display: none !important;
}

@keyframes wheelAlertShake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

.custom-wheel-universe-btn {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(56, 189, 248, 0.15));
  border-color: rgba(245, 158, 11, 0.4);
  color: #f59e0b;
  font-weight: 600;
}

.custom-wheel-universe-btn:hover {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(56, 189, 248, 0.25));
  border-color: rgba(245, 158, 11, 0.6);
  color: #fbbf24;
}

/* Universe Dish Dialog Modal */
.universe-dish-dialog {
  width: min(680px, 94vw);
  max-height: 85vh;
  border-radius: 16px;
  padding: 20px;
  background: var(--surface-card, #1a202c);
  color: var(--ink, #fff);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.15));
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
}

.universe-dish-dialog[open] {
  display: flex;
}

.universe-dialog-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  flex: 1;
  min-height: 0;
  margin-top: 10px;
}

.universe-search-bar {
  position: relative;
  display: flex;
  align-items: center;
}

.universe-search-bar input {
  width: 100%;
  padding: 10px 14px 10px 38px;
  border-radius: 10px;
  background: var(--surface, #10141d);
  border: 1px solid var(--border, #2d3748);
  color: var(--ink, #fff);
  font-size: 14px;
  box-sizing: border-box;
}

.universe-search-icon {
  position: absolute;
  left: 12px;
  color: var(--muted, #94a3b8);
  pointer-events: none;
}

.universe-category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.universe-tab {
  padding: 6px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid transparent;
  color: var(--muted, #94a3b8);
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.universe-tab:hover {
  background: rgba(255, 255, 255, 0.12);
  color: var(--ink, #fff);
}

.universe-tab.active {
  background: var(--orange, #f26419);
  color: #fff;
  font-weight: 600;
}

.universe-quick-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 4px;
}

.universe-link-btn {
  background: none;
  border: none;
  color: var(--accent-gold, #38bdf8);
  cursor: pointer;
  padding: 2px 4px;
  text-decoration: underline;
  font-size: 12px;
}

.universe-divider {
  margin: 0 4px;
  color: var(--muted, #64748b);
}

.universe-selected-badge {
  color: var(--accent-gold, #f59e0b);
  font-weight: 600;
}

.universe-dish-list {
  flex: 1;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid var(--border, #2d3748);
  background: rgba(0, 0, 0, 0.22);
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 8px;
  max-height: 380px;
}

.universe-dish-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--surface, #1e2633);
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
  transition: all 0.15s ease;
}

.universe-dish-item:hover {
  background: var(--surface-hover, #2a3447);
  border-color: rgba(255, 255, 255, 0.15);
}

.universe-dish-item.selected {
  background: rgba(242, 100, 25, 0.15);
  border-color: rgba(242, 100, 25, 0.6);
}

.universe-dish-item input[type="checkbox"] {
  width: 17px;
  height: 17px;
  accent-color: var(--orange, #f26419);
  cursor: pointer;
  flex-shrink: 0;
}

.universe-dish-item img {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.universe-dish-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  gap: 2px;
}

.universe-dish-name {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--ink, #fff);
}

.universe-dish-meta {
  font-size: 11px;
  color: var(--muted, #94a3b8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.universe-dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--border, rgba(255, 255, 255, 0.1));
}

.price-disclaimer {
  display: block;
  font-size: 11px;
  font-style: italic;
  color: var(--muted, #94a3b8);
  margin-top: 4px;
}
'''

if 'universe-dish-dialog' not in css:
    css += '\n' + styles_to_add
    with open(r'src/styles/interactions.css', 'w', encoding='utf-8') as f:
        f.write(css)
    print("Successfully appended Universe & Alert styles to interactions.css")
else:
    print("Universe styles already present in interactions.css")
