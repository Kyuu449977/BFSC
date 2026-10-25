import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

reg_idx = text.find('const REGIONAL_DATABASES')
reg_part = text[reg_idx:]

for region in ['ja', 'ko', 'zh', 'en']:
    print(f'=== Region: {region} ===')
    pattern = rf"{region}:\s*\{{([^}}]+(?:\{{[^}}]*\}}[^}}]*)*)\}}"
    # Let's search meal periods under region
    r_idx = reg_part.find(f'{region}:')
    if r_idx != -1:
        chunk = reg_part[r_idx:r_idx+4000]
        # find bannerName, title, etc.
        meals = re.findall(r'(morning|lunch|afternoon|dinner|snacks|drinks):\s*\{', chunk)
        print('Meals found:', meals)
