// Open Google Maps directly. No Places API, API key or location collection.
class NearbyPlaces {
  constructor() {
    this.status = document.getElementById('placesStatus');
    window.addEventListener('online', () => this.updateStatus());
    window.addEventListener('offline', () => this.updateStatus());
    this.updateStatus();
  }

  updateStatus() {
    this.status.textContent = navigator.onLine
      ? 'Xem địa chỉ, đánh giá và thực đơn (nếu quán cung cấp) trên Google Maps. Google Maps sẽ xử lý vị trí theo quyền bạn cấp tại đó.'
      : 'Tìm quán trên Google Maps cần kết nối Internet. Bạn vẫn có thể chọn món và xem bộ sưu tập offline.';
  }

  setDishes(results) {
    const dishes = [...new Map(results.map((result) => [result.dish.id, result.dish])).values()];
    const links = dishes.map((dish) => {
      const link = document.createElement('a');
      link.className = 'maps-search maps-dish-link';
      const label = document.createElement('span');
      label.textContent = `Tìm quán ${dish.name} trên Google Maps`;
      link.append(UI.icon('map-pin'), label, UI.icon('arrow-up-right'));
      link.href = `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query: `quán ${dish.name} gần đây` })}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      return link;
    });
    document.getElementById('placesLinks').replaceChildren(...links);
    this.updateStatus();
  }
}
