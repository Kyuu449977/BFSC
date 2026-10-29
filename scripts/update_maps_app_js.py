import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Add translation update
old_trans = """    if ($('themeBtn')) {
      $('themeBtn').setAttribute('aria-label', tDict.tool_theme);
      $('themeBtn').title = tDict.tool_theme;
    }"""

new_trans = """    if ($('themeBtn')) {
      $('themeBtn').setAttribute('aria-label', tDict.tool_theme);
      $('themeBtn').title = tDict.tool_theme;
    }
    if ($('mapsHeaderBtn')) {
      const mapsTitle = tDict.tool_maps || 'Tìm quán ăn gần bạn trên Google Maps';
      $('mapsHeaderBtn').setAttribute('aria-label', mapsTitle);
      $('mapsHeaderBtn').title = mapsTitle;
    }"""

assert old_trans in js, "old_trans not found"
js = js.replace(old_trans, new_trans)

# 2. Add click handler
old_click = """  $('themeBtn').onclick = () => open($('themeDialog'));"""

new_click = """  $('themeBtn').onclick = () => open($('themeDialog'));
  if ($('mapsHeaderBtn')) {
    $('mapsHeaderBtn').onclick = () => {
      const lang = document.documentElement.lang || 'vi';
      let query = 'quán ăn ngon gần đây';
      if (lang === 'ja') query = '近くの美味しいお店';
      else if (lang === 'ko') query = '근처 맛집';
      else if (lang === 'zh') query = '附近美食';
      else if (lang === 'en') query = 'good food near me';
      window.open(`https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query })}`, '_blank', 'noopener,noreferrer');
    };
  }"""

assert old_click in js, "old_click not found"
js = js.replace(old_click, new_click)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated mapsHeaderBtn in src/js/app.js successfully!")
