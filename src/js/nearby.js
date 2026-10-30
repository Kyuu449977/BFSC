// Open Google Maps directly. No Places API, API key or location collection.
class NearbyPlaces {
  constructor() {
    this.status = document.getElementById('placesStatus');
    this.dishes = [];
    window.addEventListener('online', () => this.updateStatus());
    window.addEventListener('offline', () => this.updateStatus());
    this.updateStatus();
  }

  updateStatus() {
    if (!this.status) return;
    const lang = document.documentElement.lang || 'vi';
    const t = window.I18N?.[lang] || window.I18N?.vi;
    this.status.textContent = navigator.onLine
      ? t?.places_online ||
        'Xem địa chỉ, đánh giá và thực đơn (nếu quán cung cấp) trên Google Maps. Google Maps sẽ xử lý vị trí theo quyền bạn cấp tại đó.'
      : t?.places_offline ||
        'Tìm quán trên Google Maps cần kết nối Internet. Bạn vẫn có thể chọn món và xem bộ sưu tập offline.';
  }

  setDishes(results) {
    this.dishes = results;
    const lang = document.documentElement.lang || 'vi';
    const t = window.I18N?.[lang] || window.I18N?.vi;
    const prefix = t?.find_places_for || 'Tìm quán';
    const onMaps = t?.on_google_maps || 'trên Google Maps';
    const dishes = [...new Map(results.map((result) => [result.dish.id, result.dish])).values()];
    const links = dishes.map((dish) => {
      const link = document.createElement('a');
      link.className = 'maps-search maps-dish-link';
      const label = document.createElement('span');
      const name = getDishName(dish, lang);
      label.textContent = `${prefix} ${name} ${onMaps}`;
      link.append(UI.icon('map-pin'), label, UI.icon('arrow-up-right'));
      let query = `quán ${name} gần đây`;
      if (lang === 'ja') query = `${name} 近くのお店`;
      else if (lang === 'ko') query = `근처 ${name} 맛집`;
      else if (lang === 'zh') query = `附近 ${name}`;
      else if (lang === 'en') query = `${name} near me`;
      link.href = `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query })}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    });
    document.getElementById('placesLinks').replaceChildren(...links);
    this.updateStatus();
  }
}
