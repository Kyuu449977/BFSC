/* Attribution and safe image selection for the all-region dish catalog. */
const Attribution = (() => {
  const fallbackImage = 'assets/image-unavailable.svg';
  const records = window.BFSC_ATTRIBUTION_DATA || {};
  const messages = {
    vi: 'Ảnh đang dùng hình giữ chỗ vì nguồn hoặc giấy phép chưa được xác minh.',
    en: 'A placeholder is shown because this image source or license needs review.',
    ja: '画像の出典またはライセンスを確認中のため、仮画像を表示しています。',
    ko: '이미지 출처 또는 라이선스를 확인 중이므로 대체 이미지를 표시합니다.',
    zh: '图片来源或许可仍待核实，当前显示占位图。',
  };
  function recordFor(dish) {
    if (!dish || typeof dish !== 'object' || !dish.id) return null;
    const record = records[dish.id];
    if (!record || record.file !== dish.image) return null;
    return record;
  }
  function reviewRequired(dish) {
    if (dish && dish.isUserCustom) return false;
    const record = recordFor(dish);
    return !record || record.reviewRequired === true;
  }
  function imageFor(dish) {
    if (!dish || typeof dish !== 'object') return fallbackImage;
    if (dish.isUserCustom) return dish.image || fallbackImage;
    return reviewRequired(dish) ? fallbackImage : dish.image;
  }
  function note(language = 'vi') {
    return messages[language] || messages.vi;
  }
  function shortNote(language = 'vi') {
    return (
      {
        vi: 'Ảnh đang rà nguồn',
        en: 'Photo source under review',
        ja: '画像の出典を確認中',
        ko: '이미지 출처 확인 중',
        zh: '图片来源待核实',
      }[language] || 'Photo source under review'
    );
  }
  function metadataFor(dish) {
    const record = recordFor(dish);
    return record && !record.reviewRequired ? record.attribution || null : null;
  }
  return Object.freeze({ imageFor, reviewRequired, note, shortNote, metadataFor, fallbackImage });
})();
window.Attribution = Attribution;
