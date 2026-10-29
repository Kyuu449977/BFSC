with open('src/styles/interactions.css', 'a', encoding='utf-8') as f:
    f.write('''
/* 08. Sub-filters for Drinks */
.drink-sub-filters {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 4px 0 12px;
  margin-top: 6px;
  margin-bottom: 8px;
}
.drink-sub-filters::-webkit-scrollbar {
  display: none;
}
.drink-sub-btn {
  white-space: nowrap;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 9999px;
  background: var(--surface-card, #1e242c);
  border: 1px solid var(--border, #333a44);
  color: var(--text-secondary, #94a3b8);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  scroll-snap-align: start;
  min-height: 38px;
}
.drink-sub-btn:hover {
  border-color: var(--accent-gold, #e5b158);
  color: var(--text-primary, #f1f5f9);
}
.drink-sub-btn[aria-pressed="true"] {
  background: var(--accent-gold, #e5b158);
  color: #1a1a1a;
  border-color: var(--accent-gold, #e5b158);
  font-weight: 600;
}
''')
print('Appended drink sub filters CSS.')
