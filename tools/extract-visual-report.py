"""Extract inert findings only; never execute the supplied HTML report."""
import argparse
import hashlib
import html
import json
import re
from pathlib import Path


def extract(report):
    source = report.read_text(encoding='utf-8')
    groups, widths = [], []
    sections = re.finditer(
        r'<section class="bp-section" id="bp-(\d+)">(.*?)(?=<section class="bp-section"|</section></section>)',
        source, re.S,
    )
    for section in sections:
        requested = int(section[1])
        heading = html.unescape(re.search(r'<h3[^>]*>(.*?)</h3>', section[2], re.S)[1])
        actual_match = re.search(r'actual window width (\d+)px', heading)
        actual = int(actual_match[1]) if actual_match else requested
        widths.append({'requested': requested, 'actual': actual, 'heading': heading})
        for index, block in enumerate(re.split(r'<div class="finding sev-[a-z]">', section[2])[1:], 1):
            title = html.unescape(re.search(r'<h4 class="finding-title">(.*?)</h4>', block, re.S)[1])
            codes = [html.unescape(s) for s in re.findall(r'<code>(.*?)</code>', block, re.S)]
            pair = re.fullmatch(r'Block "(.*?)" overlaps with "(.*?)" \(intersection (\d+)px²\)', codes[0])
            if pair:
                a, partners, count = pair[1], [pair[2]], 1
            else:
                count = int(re.search(r'overlaps (\d+) blocks', title)[1])
                a = codes[0].split('×', 1)[0].strip()
                partners = codes[1:] or [p.strip() for p in codes[0].split('×', 1)[1].split(',') if p.strip() != '…']
            if not partners or len(partners) > count:
                raise ValueError('Invalid exported group: ' + title)
            groups.append({
                'id': f'{requested}-{index:02}', 'requestedWidth': requested,
                'actualWidth': actual, 'title': title, 'originalSummary': codes[0],
                'a': a, 'partners': partners, 'partnerSelectorSource': 'full' if pair or len(codes) > 1 else 'abbreviated', 'originalPartnerCount': count,
                'omittedPartners': count - len(partners),
            })
    if len(groups) != 54 or [w['requested'] for w in widths] != [320, 768, 1024, 1440]:
        raise ValueError('Unexpected report structure; review before using this extractor')
    return {'schemaVersion': 1, 'sha256': hashlib.sha256(report.read_bytes()).hexdigest(),
            'widths': widths, 'groups': groups,
            'limits': 'Export truncates some groups to eight partners; omitted selectors cannot be reconstructed.'}


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('report', type=Path)
    parser.add_argument('output', type=Path)
    args = parser.parse_args()
    result = extract(args.report)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"Extracted {len(result['groups'])} groups; original HTML unchanged")
