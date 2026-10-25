import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/master_downloaded_meta.json', 'r', encoding='utf-8') as f:
    meta = json.load(f)

# Also check which ones were in tasks but not in meta (the 13 failed ones)
from curated_queries_ja import JA_QUERIES
from curated_queries_ko import KO_QUERIES
from curated_queries_zh import ZH_QUERIES
from curated_queries_en import EN_QUERIES
from curated_queries_vi import VI_QUERIES

all_ids = list(JA_QUERIES.keys()) + list(KO_QUERIES.keys()) + list(ZH_QUERIES.keys()) + list(EN_QUERIES.keys()) + list(VI_QUERIES.keys())

SUSPICIOUS_WORDS = [
    'tượng', 'đền', 'bản tấu', 'ronin', 'museum', 'nettop', 'dirt', 'empty', 'kunisada', 'statue',
    'chử đồng tử', 'khâm thiên giám', 'two boots restaurant', 'hopmonk tavern Sonoma', 'gelato',
    'preparation of cold brew', 'dạ trạch', 'bách diệp', 'da nem', 'hến trộn', 'masquerade', 'xinchuan'
]

needs_fix = []

for did in all_ids:
    if did not in meta:
        needs_fix.append((did, 'FAILED_DOWNLOAD', 'None'))
    else:
        title = meta[did]['file_title']
        lower = title.lower()
        matched_sus = [w for w in SUSPICIOUS_WORDS if w in lower]
        if matched_sus:
            needs_fix.append((did, f'SUSPICIOUS: {matched_sus}', title))

print(f"Total dishes needing targeted fix: {len(needs_fix)}")
for did, reason, title in needs_fix:
    print(f"  {did} | {reason} | {title}")
