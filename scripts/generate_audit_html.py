import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/all_dishes_dump.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

html = ['''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>All Dishes Visual Audit</title>
<style>
body { font-family: sans-serif; background: #121212; color: #fff; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.card { background: #1e1e1e; border-radius: 8px; overflow: hidden; border: 1px solid #333; }
.card img { width: 100%; height: 160px; object-fit: cover; display: block; }
.info { padding: 8px 12px; }
.info h4 { margin: 0 0 4px; font-size: 14px; }
.info p { margin: 0; font-size: 11px; color: #aaa; }
.reg-title { margin-top: 40px; margin-bottom: 16px; border-bottom: 2px solid #555; padding-bottom: 8px; }
</style>
</head>
<body>
<h1>Dish Image Audit</h1>
''']

for reg, dishes in data.items():
    html.append(f'<h2 class="reg-title">Region: {reg.upper()} ({len(dishes)} dishes)</h2><div class="grid">')
    for d in dishes:
        img_src = '/' + d['image'] if not d['image'].startswith('/') else d['image']
        html.append(f'''<div class="card">
<img src="{img_src}" alt="{d['name']}" loading="lazy">
<div class="info">
<h4>{d['name']}</h4>
<p>ID: {d['id']} | Region: {d['region']}</p>
<p>{d['desc'][:60]}...</p>
</div>
</div>''')
    html.append('</div>')

html.append('</body></html>')

with open('public/audit.html', 'w', encoding='utf-8') as f:
    f.write('\n'.join(html))

print('Saved public/audit.html')
