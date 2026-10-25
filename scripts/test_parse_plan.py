import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md', 'r', encoding='utf-8') as f:
    text = f.read()

pattern = r'^\s*\d+\.\s+\*\*([^*]+)\*\*\s+\|\s+\*([^*]+)\*\s+\|\s+([^|]+)\|\s*(.+)$'
matches = re.findall(pattern, text, re.MULTILINE)
print(f'Total dishes matched in implementation_plan.md: {len(matches)}')
for i, m in enumerate(matches[:10]):
    print(f'{i+1}: {m[0]} | {m[1]} | {m[2]} | {m[3][:50]}...')
