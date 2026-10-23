// ============================================================
// HỆ THỐNG GACHA: RANDOM 100% HOÀN TOÀN NGẪU NHIÊN (KHÔNG TỈ LỆ)
// HỖ TRỢ 3 MỤC TÁCH BIỆT: MÓN CHÍNH • ĐỒ ĂN VẶT • CÁC LOẠI NƯỚC UỐNG
// ============================================================

class GachaEngine {
  constructor() {
    this.currentMode = 'main'; // 'main', 'snacks', 'drinks'
    this.animator = null;
    this.currentDish = null;
    this.collection = this.loadCollection();
  }

  loadCollection() {
    try {
      return JSON.parse(localStorage.getItem('food_case_collection') || '{}');
    } catch (e) {
      return {};
    }
  }

  saveCollection() {
    try {
      localStorage.setItem('food_case_collection', JSON.stringify(this.collection));
    } catch (e) {
      console.warn('Cannot save collection to localStorage', e);
    }
  }

  // Đặt chế độ chọn vòng quay: 'main', 'snacks', hoặc 'drinks'
  setMode(mode) {
    this.currentMode = mode;
  }

  // Lấy key vòng quay hiện tại
  getActiveBannerKey() {
    if (this.currentMode === 'snacks') return 'snacks';
    if (this.currentMode === 'drinks') return 'drinks';
    return getCurrentMealPeriod();
  }

  getCurrentBannerData() {
    return FOOD_DATABASE[this.getActiveBannerKey()];
  }

  // RANDOM HOÀN TOÀN NGẪU NHIÊN 100% ĐỒNG ĐỀU (KHÔNG TỈ LỆ)
  rollSingleDish() {
    const banner = this.getCurrentBannerData();
    const pool = banner.dishes;

    const randomIndex = Math.floor(Math.random() * pool.length);
    const chosenDish = pool[randomIndex];
    this.currentDish = chosenDish;

    // Ghi nhận vào bộ sưu tập
    const isNew = !this.collection[chosenDish.id] || this.collection[chosenDish.id] === 0;
    this.collection[chosenDish.id] = (this.collection[chosenDish.id] || 0) + 1;
    this.saveCollection();

    return {
      dish: chosenDish,
      isNew: isNew,
      count: this.collection[chosenDish.id]
    };
  }

  // Lấy toàn bộ danh sách món của tất cả các buổi, ăn vặt và đồ uống
  getAllDishesList() {
    const all = [];
    const keys = ['morning', 'lunch', 'afternoon', 'dinner', 'snacks', 'drinks'];
    keys.forEach(key => {
      const group = FOOD_DATABASE[key];
      if (group && group.dishes) {
        group.dishes.forEach(d => {
          all.push({
            ...d,
            mealId: group.id,
            mealName: group.name
          });
        });
      }
    });
    return all;
  }

  getCollectionStats() {
    const allDishes = this.getAllDishesList();
    const total = allDishes.length;
    let unlocked = 0;
    allDishes.forEach(d => {
      if (this.collection[d.id] && this.collection[d.id] > 0) {
        unlocked++;
      }
    });

    return {
      total,
      unlocked,
      percentage: Math.round((unlocked / total) * 100)
    };
  }
}

const gachaEngine = new GachaEngine();
