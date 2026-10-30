import json
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from scripts import build_public

class AttributionBuildTests(unittest.TestCase):
    def test_credits_escape_metadata_and_render_unverified_items_explicitly(self):
        with tempfile.TemporaryDirectory() as directory:
            audit_path = Path(directory) / 'audit.json'
            audit_path.write_text(json.dumps({
                'schemaVersion': 1,
                'summary': {'total': 2, 'attributed': 1, 'reviewRequired': 1, 'regions': {'vi': {'total': 1, 'attributed': 0, 'reviewRequired': 1}, 'en': {'total': 1, 'attributed': 1, 'reviewRequired': 0}}},
                'entries': [
                    {'region': 'vi', 'id': 'bad_<id>', 'name': '<img src=x onerror=alert(1)>', 'file': 'images/a.webp', 'reviewRequired': True, 'reason': 'missing-source-record'},
                    {'region': 'en', 'id': 'known', 'name': 'Dish & drink', 'file': 'images/b.webp', 'reviewRequired': False,
                     'attribution': {'artist': 'A "Creator" & B', 'source': 'https://example.test/?q=\" onmouseover=\"alert(1)', 'license': 'CC <unknown>', 'title': '<script>alert(1)</script>', 'licenseUrl': 'javascript:alert(1)'}}
                ]
            }), encoding='utf-8')
            original = build_public.ATTRIBUTION_AUDIT
            build_public.ATTRIBUTION_AUDIT = audit_path
            try:
                result = build_public.render_credits('<main><!-- FOOD_IMAGE_CREDITS_START --><ol></ol><!-- FOOD_IMAGE_CREDITS_END --></main>')
            finally:
                build_public.ATTRIBUTION_AUDIT = original
        self.assertNotIn('<img src=x', result)
        self.assertNotIn('<script>alert(1)</script>', result)
        self.assertIn('&lt;img src=x onerror=alert(1)&gt;', result)
        self.assertIn('pending review', result)
        self.assertNotIn('href="javascript:', result)
        self.assertIn('Dish &amp; drink', result)
        self.assertIn('CC &lt;unknown&gt;', result)

    def test_checked_in_audit_has_382_unique_entries(self):
        report = json.loads((ROOT / 'docs/reports/image-attribution-audit.json').read_text(encoding='utf-8'))
        self.assertEqual(len(build_public.validate_attribution_audit(report)), 382)
        self.assertEqual(report['summary']['total'], 382)
        self.assertEqual(report['summary']['attributed'] + report['summary']['reviewRequired'], 382)

if __name__ == '__main__':
    unittest.main()
