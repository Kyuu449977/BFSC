import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\phamp\.gemini\antigravity\brain\6248ef8e-086a-489b-bbec-839a53c5dd9e\implementation_plan.md', 'r', encoding='utf-8') as f:
    text = f.read()

headers = re.findall(r'^###+\s+(.+)$', text, re.MULTILINE)
for h in headers[:25]:
    print(h)
