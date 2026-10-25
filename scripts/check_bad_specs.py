import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_download_specs.json', 'r', encoding='utf-8') as f:
    specs = json.load(f)

for s in specs:
    if s['id'] in ['ja_m_2', 'ja_m_4', 'ja_m_7', 'ja_m_9', 'ja_l_1']:
        print(s)
