import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/js/app.js', 'r', encoding='utf-8') as f:
    js = f.read()

custom_dish_logic = """
  // Custom Dish Submission & Synchronization (Backend Server + LocalStorage)
  let customUploadedImageBase64 = '';

  if ($('addDishBtn')) {
    $('addDishBtn').onclick = () => {
      open($('addDishDialog'));
    };
  }

  if ($('customDishImageInput')) {
    $('customDishImageInput').onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (re) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width, h = img.height;
          const maxDim = 640;
          if (w > maxDim || h > maxDim) {
            if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
            else { w = Math.round((w * maxDim) / h); h = maxDim; }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          customUploadedImageBase64 = canvas.toDataURL('image/webp', 0.82);
          if ($('customDishPreviewImg')) $('customDishPreviewImg').src = customUploadedImageBase64;
          if ($('customDishImagePreview')) $('customDishImagePreview').hidden = false;
        };
        img.src = re.target.result;
      };
      reader.readAsDataURL(file);
    };
  }

  if ($('customDishRemoveImgBtn')) {
    $('customDishRemoveImgBtn').onclick = () => {
      customUploadedImageBase64 = '';
      if ($('customDishImageInput')) $('customDishImageInput').value = '';
      if ($('customDishImagePreview')) $('customDishImagePreview').hidden = true;
    };
  }

  if ($('addDishForm')) {
    $('addDishForm').onsubmit = async (e) => {
      e.preventDefault();
      const name = $('customDishName').value.trim();
      if (!name) return;
      const mealId = $('customDishMeal').value || 'morning';
      const price = parseInt($('customDishPrice').value, 10) || 0;
      const desc = $('customDishDesc').value.trim() || 'Món ăn do bạn tự tay thêm vào thực đơn.';

      const payload = {
        name,
        mealId,
        price,
        desc,
        image: customUploadedImageBase64 || 'images/brand.svg',
        type: 'Món tự thêm',
        rarity: 4,
        calories: 350
      };

      try {
        const resp = await fetch('/api/custom-dishes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (resp.ok) {
          const resData = await resp.json();
          const createdDish = resData.dish || payload;
          addDishToRuntime(createdDish);
        } else {
          fallbackSaveLocalDish(payload);
        }
      } catch (_) {
        fallbackSaveLocalDish(payload);
      }

      close($('addDishDialog'));
      $('addDishForm').reset();
      customUploadedImageBase64 = '';
      if ($('customDishImagePreview')) $('customDishImagePreview').hidden = true;
      toast('Đã thêm món mới vào thực đơn thành công!');
    };
  }

  function fallbackSaveLocalDish(dishData) {
    dishData.id = 'custom_' + Date.now();
    dishData.isUserCustom = true;
    try {
      const local = JSON.parse(localStorage.getItem('food_custom_dishes') || '[]');
      local.push(dishData);
      localStorage.setItem('food_custom_dishes', JSON.stringify(local));
    } catch (_) {}
    addDishToRuntime(dishData);
  }

  function addDishToRuntime(dish) {
    if (!dish || !dish.id) return;
    if (!allDishes.some(d => d.id === dish.id)) {
      allDishes.push(dish);
    }
    const currentDb = typeof FOOD_DATABASE !== 'undefined' ? FOOD_DATABASE : null;
    if (currentDb && currentDb[dish.mealId] && Array.isArray(currentDb[dish.mealId].dishes)) {
      if (!currentDb[dish.mealId].dishes.some(d => d.id === dish.id)) {
        currentDb[dish.mealId].dishes.push(dish);
      }
    }
    menu();
    updateControls();
  }

  // Load backend and local custom dishes on initialization
  async function loadInitialCustomDishes() {
    try {
      const resp = await fetch('/api/custom-dishes');
      if (resp.ok) {
        const serverDishes = await resp.json();
        if (Array.isArray(serverDishes)) {
          serverDishes.forEach(addDishToRuntime);
        }
      }
    } catch (_) {}
    try {
      const local = JSON.parse(localStorage.getItem('food_custom_dishes') || '[]');
      if (Array.isArray(local)) {
        local.forEach(addDishToRuntime);
      }
    } catch (_) {}
  }
  loadInitialCustomDishes();
"""

target_pos = """  $('findFeaturedBtn').onclick = () => {"""
assert target_pos in js, "target_pos not found in src/js/app.js"
js = js.replace(target_pos, custom_dish_logic + "\n  $('findFeaturedBtn').onclick = () => {")

with open('src/js/app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated Custom Dish logic in src/js/app.js successfully!")
