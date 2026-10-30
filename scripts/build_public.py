"""Build a static-only public/ directory from the explicit file allowlist."""
from pathlib import Path
from urllib.parse import urlsplit
import html
import json
import os
import shutil
import tempfile
from scripts.public_files import PUBLIC_FILES, STYLE_SOURCES, source_path
ROOT = Path(__file__).resolve().parents[1]
ATTRIBUTION_AUDIT = ROOT / 'docs' / 'reports' / 'image-attribution-audit.json'
ATTRIBUTION_JS = 'assets/attribution-data.js'
PUBLIC_ROOT = ROOT / 'public'

def validate_attribution_audit(audit):
    if not isinstance(audit, dict) or audit.get('schemaVersion') != 1 or not isinstance(audit.get('entries'), list):
        raise RuntimeError('Invalid image attribution audit')
    seen = set()
    attributed = 0
    review_required = 0
    region_counts = {}
    for entry in audit['entries']:
        if not isinstance(entry, dict) or not isinstance(entry.get('id'), str) or not entry['id'] or entry['id'] in seen:
            raise RuntimeError('Invalid or duplicate image attribution entry')
        if not all(isinstance(entry.get(key), str) and entry[key].strip() for key in ('region', 'name', 'file')) or not isinstance(entry.get('reviewRequired'), bool):
            raise RuntimeError('Incomplete image attribution entry: ' + entry['id'])
        seen.add(entry['id'])
        region_counts[entry['region']] = region_counts.get(entry['region'], 0) + 1
        attribution = entry.get('attribution')
        if entry['reviewRequired']:
            review_required += 1
            if attribution is not None:
                raise RuntimeError('Review-required image has attribution fields: ' + entry['id'])
        elif not isinstance(attribution, dict) or not all(isinstance(attribution.get(key), str) and attribution[key].strip() for key in ('artist', 'license', 'source')) or not _safe_https_url(attribution.get('source')):
            raise RuntimeError('Attributed image is missing required metadata: ' + entry['id'])
        else:
            attributed += 1
    summary = audit.get('summary')
    if not isinstance(summary, dict) or summary.get('total') != len(seen) or summary.get('attributed') != attributed or summary.get('reviewRequired') != review_required or summary.get('regions') != {region: {'total': count, 'attributed': sum(1 for entry in audit['entries'] if entry['region'] == region and not entry['reviewRequired']), 'reviewRequired': sum(1 for entry in audit['entries'] if entry['region'] == region and entry['reviewRequired'])} for region, count in region_counts.items()}:
        raise RuntimeError('Image attribution audit summary does not match its entries')
    return seen

def _safe_https_url(value):
    parsed = urlsplit(value or '')
    return parsed.scheme == 'https' and bool(parsed.netloc)

def render_credits(template):
    start_marker = '<!-- FOOD_IMAGE_CREDITS_START -->'
    end_marker = '<!-- FOOD_IMAGE_CREDITS_END -->'
    if template.count(start_marker) != 1 or template.count(end_marker) != 1:
        raise RuntimeError('credits.html must contain one food image credits marker pair')
    if template.index(start_marker) > template.index(end_marker):
        raise RuntimeError('credits.html image credits markers are reversed')
    audit = json.loads(ATTRIBUTION_AUDIT.read_text(encoding='utf-8'))
    validate_attribution_audit(audit)
    items = []
    for entry in audit['entries']:
        dish = html.escape(entry['name'], quote=True)
        dish_id = html.escape(entry['id'], quote=True)
        region = html.escape(entry['region'], quote=True)
        attribution = entry.get('attribution')
        if entry['reviewRequired']:
            detail = 'Source and license details are missing or conflicting. The local placeholder is shown pending review.'
            items.append(f'<li data-dish-id="{dish_id}" data-review-required="true" data-region="{region}"><strong>{dish}</strong> <small>({dish_id}; {region})</small> — <span class="credit-review-note">{html.escape(detail)}</span></li>')
            continue
        title = attribution.get('title') or attribution['source']
        title_text = html.escape(title, quote=True)
        source_href = html.escape(attribution['source'], quote=True) if _safe_https_url(attribution['source']) else ''
        source_html = f'<a href="{source_href}" target="_blank" rel="noopener noreferrer">{title_text}</a>' if source_href else title_text
        artist = html.escape(attribution['artist'], quote=True)
        license_text = html.escape(attribution['license'], quote=True)
        license_url = attribution.get('licenseUrl', '')
        license_html = f'<a href="{html.escape(license_url, quote=True)}" target="_blank" rel="noopener noreferrer">{license_text}</a>' if _safe_https_url(license_url) else license_text
        items.append(f'<li data-dish-id="{dish_id}" data-review-required="false" data-region="{region}"><strong>{dish}</strong> <small>({dish_id}; {region})</small> — {source_html} · {artist} · {license_html}</li>')
    generated = '<ol class="photo-credits">\n' + '\n'.join(items) + '\n</ol>'
    before, rest = template.split(start_marker, 1)
    _, after = rest.split(end_marker, 1)
    return before + generated + after

def build_public():
    if PUBLIC_ROOT.is_symlink() or PUBLIC_ROOT.resolve() != ROOT.resolve() / 'public':
        raise RuntimeError('Unsafe public output directory')
    PUBLIC_ROOT.mkdir(exist_ok=True)
    wanted = set(PUBLIC_FILES)
    for name in PUBLIC_FILES:
        if name in {'sw-assets.js', ATTRIBUTION_JS}:
            continue
        relative = Path(name)
        if relative.is_absolute() or '..' in relative.parts:
            raise RuntimeError('Invalid public asset path')
        source = source_path(ROOT, name)
        if not source.resolve().is_relative_to(ROOT) or not source.is_file():
            raise RuntimeError('Missing or unsafe public asset: ' + name)
        destination = PUBLIC_ROOT / relative
        destination.parent.mkdir(parents=True, exist_ok=True)
        if not destination.parent.resolve().is_relative_to(PUBLIC_ROOT):
            raise RuntimeError('Unsafe public asset destination')
        with tempfile.NamedTemporaryFile(dir=destination.parent, prefix='.build-', delete=False) as temporary:
            temporary_path = Path(temporary.name)
            if name == 'style.css':
                for stylesheet in STYLE_SOURCES:
                    css = ROOT / 'src' / 'styles' / stylesheet
                    temporary.write(css.read_bytes())
                    temporary.write(b'\n')
            elif name == 'credits.html':
                temporary.write(render_credits(source.read_text(encoding='utf-8')).encode('utf-8'))
            else:
                with source.open('rb') as original:
                    shutil.copyfileobj(original, temporary)
        os.replace(temporary_path, destination)
    audit = json.loads(ATTRIBUTION_AUDIT.read_text(encoding='utf-8'))
    validate_attribution_audit(audit)
    attribution_map = {entry['id']: {key: value for key, value in entry.items() if key in {'file', 'reviewRequired', 'reason', 'attribution'}} for entry in audit['entries']}
    data_js = 'window.BFSC_ATTRIBUTION_DATA = ' + json.dumps(attribution_map, ensure_ascii=False, separators=(',', ':')).replace('<', r'\u003c').replace('>', r'\u003e').replace('&', r'\u0026') + ';\n'
    generated_attribution = PUBLIC_ROOT / ATTRIBUTION_JS
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=generated_attribution.parent, prefix='.build-', delete=False) as temporary:
        temporary.write(data_js)
        generated_attribution_temp = Path(temporary.name)
    os.replace(generated_attribution_temp, generated_attribution)
    # Service-worker cache input is generated from the same exact publish allowlist.
    essential = {'./', 'index.html', 'style.css', 'assets/brand.svg', 'assets/icons.svg', 'assets/image-unavailable.svg'}
    essential.add(ATTRIBUTION_JS)
    essential.update(name for name in PUBLIC_FILES if name.endswith('.js') and '/' not in name and name not in {'sw.js', 'sw-assets.js'})
    cache_assets = {'essential': sorted(name if name == './' else './' + name for name in essential),
                    'optional': sorted('./' + name for name in PUBLIC_FILES if name not in essential and name not in {'sw.js', 'sw-assets.js'})}
    manifest = 'self.__BFSC_ASSETS__ = ' + __import__('json').dumps(cache_assets, ensure_ascii=False, separators=(',', ':')) + ';\n'
    generated = PUBLIC_ROOT / 'sw-assets.js'
    with tempfile.NamedTemporaryFile(mode='w', encoding='utf-8', dir=PUBLIC_ROOT, prefix='.build-', delete=False) as temporary:
        temporary.write(manifest)
        generated_temp = Path(temporary.name)
    os.replace(generated_temp, generated)
    # Remove stale output files only, without following links or deleting the checkout.
    for folder, directories, filenames in os.walk(PUBLIC_ROOT, topdown=False, followlinks=False):
        for name in filenames:
            item = Path(folder) / name
            if not item.parent.resolve().is_relative_to(PUBLIC_ROOT):
                raise RuntimeError('Unsafe stale output path')
            if item.is_symlink() or item.relative_to(PUBLIC_ROOT).as_posix() not in wanted:
                item.unlink()
        for name in directories:
            item = Path(folder) / name
            if item.is_symlink():
                item.unlink()
            elif item.resolve().is_relative_to(PUBLIC_ROOT) and not any(item.iterdir()):
                item.rmdir()
    return PUBLIC_ROOT

if __name__ == '__main__':
    print('Static public directory:', build_public())
