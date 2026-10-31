"""Search metadata contracts for the existing static routes."""
import json
import re
import sys
import unittest
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts.build_public import render_menu


class Head(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.metadata = {}
        self.canonical = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta':
            self.metadata[attrs.get('name', attrs.get('property'))] = attrs.get('content')
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = attrs['href']


class SearchMetadataTests(unittest.TestCase):
    def test_menu_has_distinct_identity_and_preserves_app_hooks(self):
        source = (ROOT / 'src/index.html').read_text(encoding='utf-8')
        menu = render_menu(source)
        home_head, menu_head = Head(source), Head(menu)
        self.assertEqual(home_head.canonical, 'https://angiday.app/')
        self.assertEqual(menu_head.canonical, 'https://angiday.app/menu.html')
        self.assertEqual(menu_head.metadata['og:url'], menu_head.canonical)
        self.assertNotEqual(home_head.metadata['description'], menu_head.metadata['description'])
        self.assertIn('Thực đơn', menu_head.metadata['og:title'])
        self.assertEqual(re.findall(r'\bid="([^"]+)"', source), re.findall(r'\bid="([^"]+)"', menu))
        self.assertEqual(re.findall(r'<script[^>]+src="([^"]+)"', source), re.findall(r'<script[^>]+src="([^"]+)"', menu))

    def test_sitemap_matches_existing_canonical_routes(self):
        ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        sitemap = ET.parse(ROOT / 'src/sitemap.xml')
        locations = [item.text for item in sitemap.findall('.//s:loc', ns)]
        self.assertEqual(set(locations), {'https://angiday.app/' + path for path in ['', 'menu.html', 'credits.html', 'privacy.html', 'terms.html']})
        self.assertNotIn('?lang=', (ROOT / 'src/sitemap.xml').read_text(encoding='utf-8'))
        for name in ['credits', 'privacy', 'terms']:
            head = Head((ROOT / f'src/{name}.html').read_text(encoding='utf-8'))
            self.assertIn(head.canonical, locations)
            self.assertTrue(head.metadata['description'])

    def test_structured_data_claims_only_existing_languages(self):
        source = (ROOT / 'src/index.html').read_text(encoding='utf-8')
        data = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', source, re.S)[1])
        for entry in data['@graph']:
            self.assertEqual(entry['inLanguage'], ['vi', 'en', 'ja', 'ko', 'zh'])
        self.assertNotIn('tự động tìm quán ngon gần nhất', source)
        keywords = Head(source).metadata['keywords']
        for phrase in ['what to eat today', '今日何食べる', '오늘 뭐 먹지', 'qué comer hoy', 'आज क्या खाएं', 'ماذا آكل اليوم']:
            self.assertIn(phrase, keywords)


if __name__ == '__main__':
    unittest.main()
