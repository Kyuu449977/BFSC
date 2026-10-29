import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Update showResults to wrap in 3D Flip Card
old_map = """        body.append(more);
        card.append(image(dish, false), body);
        return card;
      })
    );"""

new_map = """        body.append(more);
        card.append(image(dish, false), body);

        // 3D Flip Card Container
        const flipWrapper = document.createElement('div');
        flipWrapper.className = 'flip-card';
        flipWrapper.setAttribute('data-flipped', detail ? 'true' : 'false');
        flipWrapper.setAttribute('tabindex', '0');
        flipWrapper.setAttribute('role', 'button');
        flipWrapper.setAttribute('aria-label', `${typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name} - Chạm để lật bài`);

        const flipInner = document.createElement('div');
        flipInner.className = 'flip-card-inner';

        const cardBack = document.createElement('div');
        cardBack.className = 'flip-card-back';
        cardBack.innerHTML = `
          <div class=\"card-back-ornament\">
            <div class=\"card-back-glow\"></div>
            <div class=\"card-back-symbol\">✦</div>
            <div class=\"card-back-brand\">ĂN GÌ ĐÂY</div>
            <div class=\"card-back-sub\">${tDict.result_single_title || 'BỮA NGON HÔM NAY'}</div>
            <div class=\"card-back-hint\">👆 Chạm để lật bài</div>
          </div>
        `;

        const cardFront = document.createElement('div');
        cardFront.className = 'flip-card-front';
        cardFront.append(card);

        flipInner.append(cardBack, cardFront);
        flipWrapper.append(flipInner);

        flipWrapper.onclick = (e) => {
          if (e.target.closest('button') || e.target.closest('a') || e.target.closest('summary')) return;
          const isFlipped = flipWrapper.getAttribute('data-flipped') === 'true';
          flipWrapper.setAttribute('data-flipped', isFlipped ? 'false' : 'true');
          if (window.audioSystem && !window.audioSystem.isMuted) {
            window.audioSystem.tone(520, 0, 0.05, 0.03);
          }
        };

        flipWrapper.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flipWrapper.click();
          }
        };

        return flipWrapper;
      })
    );

    // Auto-flip after 600ms suspense if newly rolled
    if (!detail) {
      setTimeout(() => {
        document.querySelectorAll('#resultGrid .flip-card').forEach((el, idx) => {
          setTimeout(() => {
            el.setAttribute('data-flipped', 'true');
            if (window.audioSystem && !window.audioSystem.isMuted) {
              window.audioSystem.tone(587.33, 0, 0.08, 0.035);
            }
          }, idx * 140);
        });
      }, 600);
    }"""

assert old_map in js, "old_map not found in js"
js = js.replace(old_map, new_map)

# 2. Add Custom Wheel handlers right before findFeaturedBtn click
target_hook = """  $('findFeaturedBtn').onclick = () => {"""

custom_wheel_code = """  // Vòng quay tự chọn (Custom Wheel)
  if ($('customWheelBtn')) {
    $('customWheelBtn').onclick = () => {
      open($('customWheelDialog'));
      updateCustomWheelCount();
    };
  }

  function updateCustomWheelCount() {
    if (!$('customWheelInput') || !$('customWheelCount')) return;
    const lines = $('customWheelInput').value.split('\\n').map(s => s.trim()).filter(Boolean);
    $('customWheelCount').textContent = `${lines.length} món trong danh sách`;
  }

  if ($('customWheelInput')) {
    $('customWheelInput').oninput = updateCustomWheelCount;
  }

  if ($('customWheelClearBtn')) {
    $('customWheelClearBtn').onclick = () => {
      if ($('customWheelInput')) {
        $('customWheelInput').value = '';
        updateCustomWheelCount();
      }
    };
  }

  if ($('customWheelAddRandomBtn')) {
    $('customWheelAddRandomBtn').onclick = () => {
      const sample = [];
      const currentList = allDishes || [];
      if (currentList.length) {
        for (let i = 0; i < 3; i++) {
          const rand = currentList[Math.floor(Math.random() * currentList.length)];
          if (rand && !sample.includes(rand.name)) sample.push(rand.name);
        }
      }
      const cur = $('customWheelInput').value.trim();
      $('customWheelInput').value = (cur ? cur + '\\n' : '') + sample.join('\\n');
      updateCustomWheelCount();
    };
  }

  if ($('customWheelSpinActionBtn')) {
    $('customWheelSpinActionBtn').onclick = () => {
      const lines = $('customWheelInput').value.split('\\n').map(s => s.trim()).filter(Boolean);
      if (lines.length < 2) {
        toast('Vui lòng nhập ít nhất 2 món vào danh sách để quay nhé!');
        return;
      }
      close($('customWheelDialog'));

      // Pick winner
      const winnerName = lines[Math.floor(Math.random() * lines.length)];
      const matched = (allDishes || []).find(d => normalize(d.name) === normalize(winnerName));

      const winnerDish = matched || {
        id: 'custom_wheel_' + Date.now(),
        name: winnerName,
        rarity: 4,
        mealId: activeMeal,
        type: 'Món tự chọn của bạn',
        image: 'images/brand.svg',
        price: 0,
        desc: 'Món ăn do bạn tự nhập vào vòng quay tùy chọn hôm nay. Chúc bạn có một bữa ăn ngon miệng!',
        quote: 'Vũ trụ đã lựa chọn món này cho bạn!',
        calories: 350,
      };

      // Construct reel candidates
      const reelPool = [];
      for (let i = 0; i < 20; i++) {
        const itemN = lines[i % lines.length];
        const m = (allDishes || []).find(d => normalize(d.name) === normalize(itemN));
        reelPool.push(m || { id: 'reel_' + i, name: itemN, rarity: 3, image: 'images/brand.svg' });
      }

      open($('spinDialog'), true);
      roulette.start(winnerDish, reelPool, () => {
        if ($('spinDialog').open) close($('spinDialog'), false);
        showResults([{ dish: winnerDish, isNew: false }], false);
        audioSystem.playWin(4);
      });
    };
  }

  $('findFeaturedBtn').onclick = () => {"""

assert target_hook in js, "target_hook not found in js"
js = js.replace(target_hook, custom_wheel_code)

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated 3D Flip Card and Custom Wheel logic in src/js/app.js successfully!")
