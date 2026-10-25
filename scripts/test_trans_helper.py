import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

# Helper to produce clean names for all 5 languages
def make_translations(country, native_name, vi_name, desc):
    # Strip any trailing (..) from vi_name to make a clean Vietnamese title
    clean_vi = re.sub(r'\s*\([^)]*\)$', '', vi_name).strip()
    
    # Base English name
    clean_en = ""
    # Check if native_name is already english
    if country == 'en':
        clean_en = native_name
    else:
        # Extract English term from vi_name if present in parens
        m_paren = re.search(r'\(([^)]+)\)', vi_name)
        if m_paren and re.match(r'^[A-Za-z0-9\s\-\'\.]+$', m_paren.group(1)):
            clean_en = m_paren.group(1).strip()
        else:
            clean_en = clean_vi

    # For Japanese dishes:
    if country == 'ja':
        ja_name = native_name
        ko_name = clean_vi
        zh_name = re.sub(r'\([^)]*\)', '', native_name).strip()
    elif country == 'ko':
        ja_name = clean_vi
        ko_name = native_name
        zh_name = clean_vi
    elif country == 'zh':
        ja_name = clean_vi
        ko_name = clean_vi
        zh_name = native_name
    elif country == 'en':
        ja_name = native_name
        ko_name = native_name
        zh_name = native_name

    return {
        'vi': {'name': clean_vi, 'desc': desc},
        'en': {'name': clean_en if clean_en else native_name, 'desc': f"Authentic and delicious {clean_en or native_name} prepared with fresh ingredients."},
        'ja': {'name': ja_name if country == 'ja' else (native_name if country == 'ja' else clean_vi), 'desc': f"本場の味わいを楽しめる絶品料理。一口ごとに広がる豊かな旨味。"},
        'ko': {'name': ko_name if country == 'ko' else (native_name if country == 'ko' else clean_vi), 'desc': f"신선한 재료로 정성을 다해 만든 정통 요리. 풍부한 감칠맛과 풍미."},
        'zh': {'name': zh_name if country == 'zh' else (native_name if country == 'zh' else clean_vi), 'desc': f"地道风味与精选食材的完美融合，色香味俱全。"}
    }

print("make_translations helper defined!")
