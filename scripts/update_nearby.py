with open('src/js/nearby.js', 'r', encoding='utf-8') as f:
    text = f.read()

target = "link.href = `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: `quán ${dish.name} gần đây` })}`;"
replacement = """let query = `quán ${dish.name} gần đây`;
      if (lang === 'ja') query = `${dish.name} 近くのお店`;
      else if (lang === 'ko') query = `근처 ${dish.name} 맛집`;
      else if (lang === 'zh') query = `附近 ${dish.name}`;
      else if (lang === 'en') query = `${dish.name} near me`;
      link.href = `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query })}`;"""

if target in text:
    text = text.replace(target, replacement)
    with open('src/js/nearby.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Updated nearby.js with localized queries!')
else:
    print('Target not found in nearby.js')
