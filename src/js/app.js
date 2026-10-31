document.addEventListener('DOMContentLoaded', () => {
  const $ = (id) => document.getElementById(id);
  const TRANSLATIONS = {
    vi: {
      brand_name: 'Ăn gì đây',
      lang_modal_eyebrow: 'NGÔN NGỮ · LANGUAGE',
      lang_modal_title: 'Chọn ngôn ngữ',
      lang_modal_desc: 'Chọn ngôn ngữ hiển thị cho toàn bộ ứng dụng.',
      can_pick_from: 'Có thể chọn · từ',
      not_enough_dishes: 'Chưa đủ món',
      need_at_least: 'Cần ít nhất',
      dish_single_info: '1 món',
      dish_triple_info: '3 món',
      dish_combo_info: 'Combo',
      budget_unlimited_status: 'Không giới hạn ngân sách.',
      budget_label_prefix: 'Ngân sách',
      per_spin: 'lượt',
      dishes_eligible: 'món trong danh mục phù hợp',
      has_options: 'có lựa chọn',
      not_enough_money_dishes: 'chưa đủ tiền hoặc số món',
      not_enough_money: 'chưa đủ tiền',
      ref_photo: 'Ảnh tham khảo món ăn',
      try_remove_filters: 'Thử bỏ bớt bộ lọc',
      no_matching_dish: 'Chưa có món phù hợp',
      no_dish_budget_pref:
        'Chưa có món khớp ngân sách và sở thích. Hãy bỏ lọc khẩu vị, tăng ngân sách hoặc khôi phục món đã ẩn.',
      collection_note_tpl:
        'Đã khám phá {percent}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.',
      collection_toggle_title: 'Chỉ xem món đã thu thập',
      cat_all: 'Tất cả',
      cat_main: 'Món Chính',
      price_disclaimer: '* Giá tham khảo và có thể chênh lệch với thực tế',
      cat_morning: 'Buổi Sáng',
      cat_lunch: 'Buổi Trưa',
      cat_afternoon: 'Buổi Chiều',
      cat_dinner: 'Buổi Tối',
      cat_snacks: 'Món Ăn Vặt',
      cat_drinks: 'Đồ Uống & Nước Ngọt',
      lang_changed: 'Đã đổi ngôn ngữ: Tiếng Việt',

      brand_title: 'Ăn gì đây',
      brand_sub: 'Một bữa ngon, một ngày vui.',
      skip_link: 'Đến nội dung chính',
      offline: 'Đang offline',
      period_morning: 'BUỔI SÁNG · MÓN VIỆT MỖI NGÀY',
      period_lunch: 'BUỔI TRƯA · MÓN VIỆT MỖI NGÀY',
      period_afternoon: 'BUỔI CHIỀU · MÓN VIỆT MỖI NGÀY',
      period_dinner: 'BUỔI TỐI · MÓN VIỆT MỖI NGÀY',
      period_latenight: 'BUỔI KHUYA · MÓN VIỆT MỖI NGÀY',
      title_default: 'Hôm nay ăn gì?',
      title_main: 'Món chính hôm nay',
      title_snacks: 'Ăn vặt hôm nay',
      title_drinks: 'Thức uống thanh mát',
      slogan: 'Chọn nhóm món, để web gợi ý cho bạn.',
      latenight_notice: 'Gợi ý dành cho buổi khuya.',
      mode_main: 'Món chính',
      mode_snacks: 'Ăn vặt',
      mode_drinks: 'Đồ uống',
      hero_pick: 'GỢI Ý HÔM NAY',
      hero_price_note: 'giá tham khảo',
      hero_find_btn: 'Xem món & tìm quán',
      hero_caption: 'Hương vị Việt, lựa chọn mỗi ngày',
      btn_single: 'Chọn 1 món',
      btn_triple: 'Chọn 3 món',
      btn_combo: 'Tạo combo',
      budget_panel_title: 'Ngân sách & sở thích',
      budget_unlimited: 'Không giới hạn',
      budget_label: 'Tổng số tiền bạn muốn chi (đ)',
      budget_placeholder: 'Ví dụ: 100000',
      budget_clear: 'Bỏ giới hạn',
      budget_help:
        'Áp dụng cho cả lượt: 1 món, tổng 3 món hoặc tổng combo. Lọc theo giá thấp nhất trong khoảng tham khảo; giá thực tế có thể cao hơn.',
      craving_label: 'Hôm nay thèm món chính gì?',
      craving_all: 'Món nào cũng được',
      craving_rice: 'Cơm & xôi',
      craving_soup: 'Món nước',
      craving_light: 'Ăn nhẹ',
      craving_spicy: 'Cay',
      craving_mild: 'Thanh đạm',
      craving_note:
        'Áp dụng cho món chính, kể cả món chính trong combo. Khẩu vị và cách nấu tùy quán; không phải bộ lọc dị ứng hay dinh dưỡng.',
      avoid_recent_label: 'Ưu tiên tránh món đã ăn trong 3 ngày',
      avoid_recent_note: 'Nếu ít lựa chọn, món đã ăn vẫn có thể xuất hiện để giữ đúng ngân sách.',
      reset_taste_btn: 'Bỏ lọc khẩu vị',
      unique_label: 'Không trùng trong lượt chọn 3 món',
      combo_note_1: 'Combo = món chính + ăn vặt + đồ uống',
      combo_note_2:
        'Ưu tiên món khác lượt trước và ít xuất hiện trong tab này. Ngân sách ít lựa chọn vẫn có thể lặp.',
      menu_eyebrow: 'MỖI NGÀY MỘT HƯƠNG VỊ',
      menu_heading: 'Khám phá thực đơn',
      menu_toggle_title: 'Chỉ xem món đã thu thập',
      personal_view_label: 'Danh sách của tôi',
      view_all: 'Tất cả món',
      view_favorite: 'Yêu thích',
      view_eaten: 'Đã ăn',
      view_hidden: 'Món đã ẩn · có thể khôi phục',
      search_placeholder: 'Tìm món bạn đang thèm…',
      search_aria: 'Tìm món trong thực đơn',
      search_clear: 'Xóa tìm kiếm',
      filter_all: 'Tất cả',
      filter_rice: 'Cơm',
      filter_soup: 'Món nước',
      filter_pastry: 'Bánh',
      filter_snack: 'Ăn chơi',
      filter_drinks: 'Đồ uống',
      load_more: 'Xem thêm món',
      reset_menu_budget: 'Bỏ giới hạn ngân sách',
      reset_menu_filters: 'Xem tất cả món',
      callout_strong: 'Thấy món ngon? Tìm ngay quán gần bạn.',
      callout_desc: 'Chọn món rồi mở Google Maps để xem địa chỉ, đánh giá và thực đơn của quán.',
      footer_brand: 'Ăn gì đây.',
      footer_sub: 'Ăn ngon, chọn vui. Theo cách của bạn.',
      privacy: 'Quyền riêng tư',
      terms: 'Điều khoản',
      credits: 'Nguồn mở',
      offline_ready: 'Đã sẵn sàng offline.',
      offline_preparing: 'Đang chuẩn bị offline…',
      nav_home: 'Chọn món',
      nav_menu: 'Thực đơn',
      nav_collection: 'Bộ sưu tập',
      spin_eyebrow: 'MỘT CHÚT BẤT NGỜ',
      spin_title: 'Đang tìm món ngon…',
      spin_skip: 'Bỏ qua',
      spin_note: 'Một lựa chọn mới cho bữa ăn hôm nay.',
      result_eyebrow: 'BỮA NGON ĐANG CHỜ',
      result_single_title: 'Món ngon dành cho bạn',
      result_triple_title: 'Ba gợi ý cho bữa ăn',
      result_combo_title: 'Combo dành cho bạn',
      result_detail_title: 'Một món ngon để khám phá',
      result_maps_eyebrow: 'TỪ MÓN NGON ĐẾN QUÁN QUEN',
      result_maps_title: 'Tìm quán trên Google Maps',
      result_maps_note: 'Giá món chỉ là tham khảo. Xem thực đơn và xác nhận giá thực tế với quán.',
      btn_reroll: 'Chọn lại',
      btn_done: 'Xong',
      share_title: 'Gửi một bữa ngon',
      share_desc: 'Sao chép đường dẫn và gửi cho bạn bè. Mở trực tiếp trên bất kỳ thiết bị nào.',
      copy_link_btn: 'Sao chép đường dẫn',
      install_title: 'Luôn sẵn sàng khi bạn đói',
      install_desc: 'Thêm Ăn gì đây vào màn hình chính để mở nhanh như một ứng dụng.',
      install_understood: 'Đã hiểu',
      theme_heading: 'Cài đặt & Giao diện',
      lang_heading: 'Ngôn ngữ · Language',
      brightness_heading: 'Chế độ hiển thị',
      theme_color_heading: 'Màu giao diện',
      timezone_heading: 'Múi giờ khu vực',
      mode_light: 'Sáng',
      mode_dark: 'Tối',
      mode_system: 'Theo thiết bị',
      mode_auto: 'Tự động (Theo giờ)',
      custom_color_text: 'Tự chọn màu',
      color_system: 'Màu hệ thống',
      color_orange: 'Cam đất',
      color_green: 'Xanh lá',
      color_blue: 'Xanh biển',
      color_rose: 'Hồng mận',
      theme_note:
        'Màu chủ đạo kết hợp được với cả chế độ sáng và tối. Lựa chọn được lưu trên trình duyệt này.',
      tool_tz: 'Múi giờ khu vực',
      tool_theme: 'Đổi giao diện & cài đặt',
      tool_lang: 'Đổi ngôn ngữ (Language)',
      tool_bgm: 'Bật nhạc nền',
      tool_bgm_off: 'Tắt nhạc nền',
      tool_sound_on: 'Bật âm thanh',
      tool_sound_off: 'Tắt âm thanh',
      tool_share: 'Chia sẻ website',
      tool_install: 'Cài đặt ứng dụng',
      tz_modal_eyebrow: 'THỜI GIAN THEO KHU VỰC',
      tz_modal_title: 'Múi giờ khu vực',
      tz_modal_desc:
        'Chọn múi giờ để giao diện chuyển màu theo đúng buổi sáng, trưa, tối và đêm tại nơi bạn sống.',
      tz_auto: 'Tự động',
      tz_auto_desc: 'Theo giờ thiết bị',
      clock_prefix: 'Thời gian hiện tại:',
      sound_enabled: 'Đã bật âm thanh',
      sound_disabled: 'Đã tắt âm thanh',
      bgm_enabled: 'Đã bật nhạc nền thư giãn',
      bgm_disabled: 'Đã tắt nhạc nền',
      link_copied: 'Đã sao chép đường dẫn website!',
      act_fav: 'Yêu thích',
      act_fav_active: 'Đã yêu thích',
      act_eaten: 'Đánh dấu đã ăn',
      act_eaten_active: 'Đã ăn · bỏ đánh dấu',
      act_hide: 'Không thích · Ẩn món',
      act_restore: 'Khôi phục món',
      act_find_maps: 'Tìm quán',
      find_places_for: 'Tìm quán',
      on_google_maps: 'trên Google Maps',
      places_online:
        'Xem địa chỉ, đánh giá và thực đơn (nếu quán cung cấp) trên Google Maps. Google Maps sẽ xử lý vị trí theo quyền bạn cấp tại đó.',
      places_offline:
        'Tìm quán trên Google Maps cần kết nối Internet. Bạn vẫn có thể chọn món và xem bộ sưu tập offline.',
      is_new: 'Món mới',
      discovered: 'Đã khám phá',
      desc_and_source: 'Mô tả & nguồn ảnh',
      photo_source_license: 'Nguồn ảnh và giấy phép',
      fav_eaten_hide_title: 'Yêu thích, đã ăn & ẩn món',
      total_price_from: 'Tổng giá từ',
      min_estimate: 'ước tính tối thiểu',
      total_min_note: 'Tổng theo giá thấp nhất của các món. Giá thực tế có thể cao hơn.',
      round_budget_label: 'Ngân sách cả lượt',
      remains_from: 'Còn theo giá từ',
      actual_price_may_vary: 'Giá thực tế có thể cao hơn.',
      viewing: 'Đang xem',
      dishes_unit: 'món',
      discovered_unit: 'đã khám phá',
      collected: 'Đã thu thập',
      uncollected: 'Chưa thu thập',
      hidden_badge: 'Đang ẩn',
      dish_fallback_alt: 'Món gợi ý',
      no_match_filter: 'Chưa có món phù hợp bộ lọc',
      empty_menu_msg: 'Chưa có món trong danh sách này hoặc bộ lọc hiện tại.',
    },
    en: {
      brand_name: 'What To Eat',
      lang_modal_eyebrow: 'LANGUAGE SELECTION',
      lang_modal_title: 'Choose Language',
      lang_modal_desc: 'Select your preferred display language for the entire application.',
      can_pick_from: 'Available · from',
      not_enough_dishes: 'Not enough dishes',
      need_at_least: 'Need at least',
      dish_single_info: '1 dish',
      dish_triple_info: '3 dishes',
      dish_combo_info: 'Combo',
      budget_unlimited_status: 'Unlimited budget.',
      budget_label_prefix: 'Budget',
      per_spin: 'spin',
      dishes_eligible: 'dishes matching category',
      has_options: 'options available',
      not_enough_money_dishes: 'insufficient budget or dish count',
      not_enough_money: 'insufficient budget',
      ref_photo: 'Reference photo',
      try_remove_filters: 'Try removing filters',
      no_matching_dish: 'No matching dishes',
      no_dish_budget_pref:
        'No dishes match your budget and taste preferences. Remove filters, increase budget, or restore hidden dishes.',
      collection_note_tpl:
        'Discovered {percent}% of menu · These are suggested dishes, not eaten dishes. Saved in this browser.',
      collection_toggle_title: 'View collected dishes only',
      cat_all: 'All',
      cat_main: 'Main Dishes',
      price_disclaimer: '* Reference price, may vary in reality',
      cat_morning: 'Breakfast',
      cat_lunch: 'Lunch',
      cat_afternoon: 'Afternoon',
      cat_dinner: 'Dinner',
      cat_snacks: 'Snacks',
      cat_drinks: 'Drinks & Beverages',
      lang_changed: 'Language changed to English',

      brand_title: 'What to eat?',
      brand_sub: 'Delicious meals, happy days.',
      skip_link: 'Skip to main content',
      offline: 'Offline mode',
      period_morning: 'MORNING · DAILY VIETNAMESE FLAVORS',
      period_lunch: 'LUNCH · DAILY VIETNAMESE FLAVORS',
      period_afternoon: 'AFTERNOON · DAILY VIETNAMESE FLAVORS',
      period_dinner: 'DINNER · DAILY VIETNAMESE FLAVORS',
      period_latenight: 'LATE NIGHT · DAILY VIETNAMESE FLAVORS',
      title_default: 'What to eat today?',
      title_main: "Today's Main Dishes",
      title_snacks: "Today's Street Snacks",
      title_drinks: 'Refreshing Drinks',
      slogan: 'Choose a category and let us suggest a dish.',
      latenight_notice: 'Suggestions for a late-night meal.',
      mode_main: 'Main dishes',
      mode_snacks: 'Snacks',
      mode_drinks: 'Drinks',
      hero_pick: "TODAY'S PICK",
      hero_price_note: 'est. price',
      hero_find_btn: 'View dish & Find places',
      hero_caption: 'Vietnamese flavors, daily choice',
      btn_single: 'Pick 1 dish',
      btn_triple: 'Pick 3 dishes',
      btn_combo: 'Make combo',
      budget_panel_title: 'Budget & Preferences',
      budget_unlimited: 'No limit',
      budget_label: 'Total budget you want to spend (VND)',
      budget_placeholder: 'e.g. 100000',
      budget_clear: 'Clear limit',
      budget_help:
        'Applies to 1 dish, 3 dishes or combo total. Filters based on lowest reference price; actual price may vary.',
      craving_label: 'What craving today?',
      craving_all: 'Anything is fine',
      craving_rice: 'Rice & Sticky rice',
      craving_soup: 'Noodle Soup',
      craving_light: 'Light meal',
      craving_spicy: 'Spicy',
      craving_mild: 'Mild / Gentle',
      craving_note: 'Applies to main dishes and combo mains. Taste depends on each eatery.',
      avoid_recent_label: 'Avoid dishes eaten in the last 3 days',
      avoid_recent_note: 'If few choices remain, eaten dishes may still appear to meet budget.',
      reset_taste_btn: 'Reset taste filter',
      unique_label: 'No duplicate dishes in 3 dishes',
      combo_note_1: 'Combo = main + snack + drink',
      combo_note_2:
        'Prefers different dishes from previous spin. Budget with few options may repeat.',
      menu_eyebrow: 'A NEW FLAVOR EVERY DAY',
      menu_heading: 'Explore the Menu',
      menu_toggle_title: 'Show collected only',
      personal_view_label: 'My List',
      view_all: 'All Dishes',
      view_favorite: 'Favorites',
      view_eaten: 'Eaten',
      view_hidden: 'Hidden dishes · Can restore',
      search_placeholder: 'Search dishes or flavors…',
      search_aria: 'Search menu dishes',
      search_clear: 'Clear search',
      filter_all: 'All',
      filter_rice: 'Rice',
      filter_soup: 'Noodle Soup',
      filter_pastry: 'Pastry / Rolls',
      filter_snack: 'Snacks',
      filter_drinks: 'Drinks',
      load_more: 'Load more dishes',
      reset_menu_budget: 'Clear budget limit',
      reset_menu_filters: 'View all dishes',
      callout_strong: 'Found something yummy? Find places nearby.',
      callout_desc: 'Pick a dish then open Google Maps for address, reviews and menu.',
      footer_brand: 'What to eat?',
      footer_sub: 'Eat well, spin joyfully. Your way.',
      privacy: 'Privacy',
      terms: 'Terms',
      credits: 'Open Source',
      offline_ready: 'Ready for offline use.',
      offline_preparing: 'Preparing offline mode…',
      nav_home: 'Choose',
      nav_menu: 'Menu',
      nav_collection: 'Collection',
      spin_eyebrow: 'A LITTLE SURPRISE',
      spin_title: 'Finding delicious dish…',
      spin_skip: 'Skip',
      spin_note: "A fresh choice for today's meal.",
      result_eyebrow: 'DELICIOUS MEAL AWAITS',
      result_single_title: 'Your delicious dish',
      result_triple_title: 'Three suggestions for your meal',
      result_combo_title: 'Your custom combo',
      result_detail_title: 'A delicious dish to explore',
      result_maps_eyebrow: 'FROM TASTE TO TABLE',
      result_maps_title: 'Find places on Google Maps',
      result_maps_note: 'Prices are reference only. Check actual menu with the place.',
      btn_reroll: 'Spin again',
      btn_done: 'Done',
      share_title: 'Share a delicious meal',
      share_desc: 'Copy the link and send to friends. Opens on any device.',
      copy_link_btn: 'Copy link',
      install_title: "Always ready when you're hungry",
      install_desc: 'Add to home screen for instant app-like access.',
      install_understood: 'Got it',
      theme_heading: 'Settings & Appearance',
      lang_heading: 'Language',
      brightness_heading: 'Display Mode',
      theme_color_heading: 'Accent Color',
      timezone_heading: 'Region & Timezone',
      mode_light: 'Light',
      mode_dark: 'Dark',
      mode_system: 'System',
      mode_auto: 'Auto (By Time)',
      custom_color_text: 'Custom Color',
      color_system: 'System Theme',
      color_orange: 'Terracotta',
      color_green: 'Forest Green',
      color_blue: 'Ocean Blue',
      color_rose: 'Plum Rose',
      theme_note:
        'Accent color pairs with both light and dark modes. Settings are saved in this browser.',
      tool_tz: 'Region & Timezone',
      tool_theme: 'Appearance & Settings',
      tool_lang: 'Change Language',
      tool_bgm: 'Play BGM',
      tool_bgm_off: 'Stop BGM',
      tool_sound_on: 'Enable sound',
      tool_sound_off: 'Mute sound',
      tool_share: 'Share website',
      tool_install: 'Install App',
      tz_modal_eyebrow: 'REGIONAL TIMEZONE',
      tz_modal_title: 'Region & Timezone',
      tz_modal_desc:
        'Choose your timezone so the theme color shifts according to morning, lunch, dinner and late night where you live.',
      tz_auto: 'Auto',
      tz_auto_desc: 'Device local time',
      clock_prefix: 'Current time:',
      sound_enabled: 'Sound enabled',
      sound_disabled: 'Sound muted',
      bgm_enabled: 'Relaxing BGM started',
      bgm_disabled: 'BGM paused',
      link_copied: 'Website link copied to clipboard!',
      act_fav: 'Favorite',
      act_fav_active: 'Favorited',
      act_eaten: 'Mark as eaten',
      act_eaten_active: 'Eaten · Unmark',
      act_hide: 'Dislike · Hide',
      act_restore: 'Restore dish',
      act_find_maps: 'Find places',
      find_places_for: 'Find places for',
      on_google_maps: 'on Google Maps',
      places_online: 'View address, reviews and menu (if provided) on Google Maps.',
      places_offline: 'Finding places on Google Maps requires an Internet connection.',
      is_new: 'New',
      discovered: 'Discovered',
      desc_and_source: 'Description & Source',
      photo_source_license: 'Photo source and license',
      fav_eaten_hide_title: 'Favorite, Eaten & Hide',
      total_price_from: 'Total price from',
      min_estimate: 'minimum estimate',
      total_min_note: 'Total based on lowest prices of dishes. Actual price may vary.',
      round_budget_label: 'Round budget',
      remains_from: 'Remaining from',
      actual_price_may_vary: 'Actual price may vary.',
      viewing: 'Viewing',
      dishes_unit: 'dishes',
      discovered_unit: 'discovered',
      collected: 'Collected',
      uncollected: 'Not collected',
      hidden_badge: 'Hidden',
      dish_fallback_alt: 'Recommended dish',
      no_match_filter: 'No dishes match filter',
      empty_menu_msg: 'No dishes found in this list or current filter.',
    },
    ja: {
      brand_name: '何食べる？',
      lang_modal_eyebrow: '言語設定 · LANGUAGE',
      lang_modal_title: '言語を選択',
      lang_modal_desc: 'アプリ全体の表示言語を選択してください。',
      can_pick_from: '選択可能・目安',
      not_enough_dishes: '品数が足りません',
      need_at_least: '最低必要金額',
      dish_single_info: '1品',
      dish_triple_info: '3品',
      dish_combo_info: 'コンボ',
      budget_unlimited_status: '予算無制限。',
      budget_label_prefix: '予算',
      per_spin: '回',
      dishes_eligible: '件の該当料理',
      has_options: '選択肢あり',
      not_enough_money_dishes: '予算または品数不足',
      not_enough_money: '予算不足',
      ref_photo: '参考画像',
      try_remove_filters: 'フィルターを解除してください',
      no_matching_dish: '該当する料理がありません',
      no_dish_budget_pref:
        '予算や好みに合う料理がありません。味の指定を解除するか、予算を増やすか、非表示メニューを復元してください。',
      collection_note_tpl:
        'メニューの{percent}%を発見済み · 提案された料理であり、食べた料理ではありません。このブラウザに保存されます。',
      collection_toggle_title: '収集した料理のみ表示',
      cat_all: 'すべて',
      cat_main: 'メイン料理',
      price_disclaimer: '* 参考価格であり、実際と異なる場合があります',
      cat_morning: '朝食',
      cat_lunch: '昼食',
      cat_afternoon: '軽食・おやつ',
      cat_dinner: '夕食',
      cat_snacks: 'スナック・甘味',
      cat_drinks: 'ドリンク・飲料',
      lang_changed: '言語を日本語に変更しました',

      brand_title: '今日何食べる？',
      brand_sub: '美味しいご飯、楽しい一日。',
      skip_link: 'メインコンテンツへ移動',
      offline: 'オフライン',
      period_morning: '朝食 · 毎日のベトナム料理',
      period_lunch: '昼食 · 毎日のベトナム料理',
      period_afternoon: 'おやつ時 · 毎日のベトナム料理',
      period_dinner: '夕食 · 毎日のベトナム料理',
      period_latenight: '深夜 · 毎日のベトナム料理',
      title_default: '今日何食べる？',
      title_main: '今日のメイン料理',
      title_snacks: '今日のおやつ・軽食',
      title_drinks: '爽やかなドリンク',
      slogan: 'カテゴリーを選ぶと、おすすめの料理が見つかります。',
      latenight_notice: '夜食のおすすめ。',
      mode_main: 'メイン料理',
      mode_snacks: '軽食・おやつ',
      mode_drinks: '飲み物',
      hero_pick: '今日のおすすめ',
      hero_price_note: '参考価格',
      hero_find_btn: '料理を見る・店を探す',
      hero_caption: 'ベトナムの味、毎日の選択',
      btn_single: '1品選ぶ',
      btn_triple: '3品選ぶ',
      btn_combo: 'セット作成',
      budget_panel_title: '予算と好み',
      budget_unlimited: '上限なし',
      budget_label: '使いたい総予算（VND）',
      budget_placeholder: '例: 100000',
      budget_clear: 'リセット',
      budget_help:
        '1品、3品、またはセットの合計に適用されます。最低参考価格に基づきフィルタリングします。',
      craving_label: '今日の気分は？',
      craving_all: 'なんでもOK',
      craving_rice: 'ご飯・おこわ',
      craving_soup: '麺類・汁物',
      craving_light: '軽食',
      craving_spicy: 'スパイシー',
      craving_mild: 'あっさり',
      craving_note: 'メイン料理およびセットのメインに適用されます。味付けは店舗により異なります。',
      avoid_recent_label: '過去3日間に食べた料理を避ける',
      avoid_recent_note:
        '選択肢が少ない場合、予算を満たすために食べた料理が含まれることがあります。',
      reset_taste_btn: '好みのフィルターを解除',
      unique_label: '3品選択時に重複させない',
      combo_note_1: 'セット = メイン + 軽食 + 飲み物',
      combo_note_2:
        '前回のスピンと異なる料理を優先します。選択肢が少ない場合は重複する場合があります。',
      menu_eyebrow: '毎日新しい美味しさ',
      menu_heading: 'メニューを見る',
      menu_toggle_title: '獲得した料理のみ表示',
      personal_view_label: 'マイリスト',
      view_all: 'すべての料理',
      view_favorite: 'お気に入り',
      view_eaten: '食べた',
      view_hidden: '非表示の料理 · 復元可能',
      search_placeholder: '食べたい料理を検索…',
      search_aria: 'メニューから料理を検索',
      search_clear: '検索をクリア',
      filter_all: 'すべて',
      filter_rice: 'ご飯',
      filter_soup: '麺類',
      filter_pastry: 'バイン・粉物',
      filter_snack: 'おやつ',
      filter_drinks: 'ドリンク',
      load_more: 'もっと見る',
      reset_menu_budget: '予算の上限を解除',
      reset_menu_filters: 'すべての料理を見る',
      callout_strong: '美味しそう？近くのお店を検索。',
      callout_desc: '料理を選んでGoogleマップで場所、評価、メニューを確認。',
      footer_brand: '今日何食べる？',
      footer_sub: '美味しく楽しく、思いのままに。',
      privacy: 'プライバシー',
      terms: '利用規約',
      credits: 'オープンソース',
      offline_ready: 'オフライン利用が可能です。',
      offline_preparing: 'オフライン準備中…',
      nav_home: '料理を選ぶ',
      nav_menu: 'メニュー',
      nav_collection: 'コレクション',
      spin_eyebrow: 'ワクワクするサプライズ',
      spin_title: '美味しい料理を探しています…',
      spin_skip: 'スキップ',
      spin_note: '今日の食事に新しい選択を。',
      result_eyebrow: '美味しい料理が待っています',
      result_single_title: 'あなたにぴったりの一品',
      result_triple_title: '食事の3つの提案',
      result_combo_title: 'あなたへのセットメニュー',
      result_detail_title: '新しい美味しさを探索',
      result_maps_eyebrow: '美味しい料理から馴染みの店へ',
      result_maps_title: 'Googleマップで店を探す',
      result_maps_note: '価格は参考です。実際のメニューと価格は店舗でご確認ください。',
      btn_reroll: 'もう一度',
      btn_done: '完了',
      share_title: '美味しいご飯をシェア',
      share_desc: 'リンクをコピーして友達にシェア。どの端末でも直接開けます。',
      copy_link_btn: 'リンクをコピー',
      install_title: 'お腹が空いたらいつでも',
      install_desc: 'ホーム画面に追加してアプリのように素早く開けます。',
      install_understood: '了解',
      theme_heading: '設定と外観',
      lang_heading: '言語 · Language',
      brightness_heading: '表示モード',
      theme_color_heading: 'テーマカラー',
      timezone_heading: '地域・タイムゾーン',
      mode_light: 'ライト',
      mode_dark: 'ダーク',
      mode_system: 'システム連動',
      mode_auto: '自動（時間帯）',
      custom_color_text: 'カスタム色',
      color_system: 'システム規定',
      color_orange: 'オレンジ',
      color_green: 'グリーン',
      color_blue: 'ブルー',
      color_rose: 'ローズ',
      theme_note:
        'テーマカラーはライト・ダーク両方に対応しています。設定はこの端末に保存されます。',
      tool_tz: '地域・タイムゾーン',
      tool_theme: '外観・設定',
      tool_lang: '言語を切り替え',
      tool_bgm: 'BGM再生',
      tool_bgm_off: 'BGM停止',
      tool_sound_on: '効果音をオン',
      tool_sound_off: '効果音をミュート',
      tool_share: 'サイトをシェア',
      tool_install: 'アプリをインストール',
      tz_modal_eyebrow: '地域のタイムゾーン',
      tz_modal_title: '地域・タイムゾーン',
      tz_modal_desc:
        'お住まいのタイムゾーンを選択すると、朝・昼・夕方・夜の時刻に合わせて背景が自動で変化します。',
      tz_auto: '自動',
      tz_auto_desc: '端末の時刻',
      clock_prefix: '現在時刻:',
      sound_enabled: '効果音を有効にしました',
      sound_disabled: '効果音をミュートしました',
      bgm_enabled: 'BGMを再生しました',
      bgm_disabled: 'BGMを一時停止しました',
      link_copied: 'リンクをクリップボードにコピーしました！',
      act_fav: 'お気に入り',
      act_fav_active: 'お気に入り済み',
      act_eaten: '食べた記録',
      act_eaten_active: '食べた · 解除',
      act_hide: '非表示にする',
      act_restore: '料理を復元',
      act_find_maps: '店を探す',
      find_places_for: '店舗を検索：',
      on_google_maps: '（Googleマップ）',
      places_online: 'Googleマップで住所、レビュー、メニューを確認できます。',
      places_offline: 'Googleマップ検索にはインターネット接続が必要です。',
      is_new: '新登場',
      discovered: '獲得数',
      desc_and_source: '詳細と出典',
      photo_source_license: '画像ソースとライセンス',
      fav_eaten_hide_title: 'お気に入り・記録・非表示',
      total_price_from: '合計目安',
      min_estimate: '最低参考価格',
      total_min_note: '各料理の最低価格に基づく合計です。実際の価格は異なる場合があります。',
      round_budget_label: '今回の予算',
      remains_from: '予算の残り目安',
      actual_price_may_vary: '実際の価格は店舗にてご確認ください。',
      viewing: '表示中',
      dishes_unit: '品',
      discovered_unit: '獲得済み',
      collected: '獲得済み',
      uncollected: '未獲得',
      hidden_badge: '非表示',
      dish_fallback_alt: 'おすすめ料理',
      no_match_filter: '条件に合う料理がありません',
      empty_menu_msg: 'このリストまたはフィルターに該当する料理がありません。',
    },
    ko: {
      brand_name: '오늘 뭐 먹지?',
      lang_modal_eyebrow: '언어 설정 · LANGUAGE',
      lang_modal_title: '언어 선택',
      lang_modal_desc: '앱 전체에 표시될 언어를 선택하세요.',
      can_pick_from: '선택 가능 · 시작가',
      not_enough_dishes: '메뉴 부족',
      need_at_least: '최소 필요 금액',
      dish_single_info: '1개',
      dish_triple_info: '3개',
      dish_combo_info: '세트',
      budget_unlimited_status: '예산 무제한.',
      budget_label_prefix: '예산',
      per_spin: '회',
      dishes_eligible: '개의 해당 메뉴',
      has_options: '선택 가능',
      not_enough_money_dishes: '금액 또는 메뉴 수 부족',
      not_enough_money: '금액 부족',
      ref_photo: '참고 사진',
      try_remove_filters: '필터를 해제해보세요',
      no_matching_dish: '일치하는 메뉴 없음',
      no_dish_budget_pref:
        '예산과 취향에 맞는 메뉴가 없습니다. 맛 필터를 해제하거나 예산을 늘리거나 숨긴 메뉴를 복원해보세요.',
      collection_note_tpl:
        '메뉴의 {percent}% 발견 완료 · 추천된 메뉴이며 실제 식사 기록이 아닙니다. 이 브라우저에 저장됩니다.',
      collection_toggle_title: '수집한 메뉴만 보기',
      cat_all: '전체',
      cat_main: '메인 요리',
      price_disclaimer: '* 참고 가격이며 실제와 다를 수 있습니다',
      cat_morning: '아침',
      cat_lunch: '점심',
      cat_afternoon: '오후',
      cat_dinner: '저녁',
      cat_snacks: '간식·디저트',
      cat_drinks: '음료·소프트드링크',
      lang_changed: '언어가 한국어로 변경되었습니다',

      brand_title: '오늘 뭐 먹지?',
      brand_sub: '맛있는 한 끼, 즐거운 하루.',
      skip_link: '본문 바로가기',
      offline: '오프라인',
      period_morning: '아침 · 매일의 베트남 요리',
      period_lunch: '점심 · 매일의 베트남 요리',
      period_afternoon: '오후 · 매일의 베트남 요리',
      period_dinner: '저녁 · 매일의 베트남 요리',
      period_latenight: '심야 · 매일의 베트남 요리',
      title_default: '오늘 뭐 먹지?',
      title_main: '오늘의 메인 메뉴',
      title_snacks: '오늘의 간식·길거리음식',
      title_drinks: '시원한 음료',
      slogan: '종류를 고르면 메뉴를 추천해 드려요.',
      latenight_notice: '늦은 밤을 위한 추천입니다.',
      mode_main: '메인 요리',
      mode_snacks: '간식',
      mode_drinks: '음료',
      hero_pick: '오늘의 추천',
      hero_price_note: '참고 가격',
      hero_find_btn: '메뉴 보기 & 식당 찾기',
      hero_caption: '베트남의 맛, 매일의 선택',
      btn_single: '1개 선택',
      btn_triple: '3개 선택',
      btn_combo: '콤보 만들기',
      budget_panel_title: '예산 및 취향',
      budget_unlimited: '무제한',
      budget_label: '총 희망 예산 (동)',
      budget_placeholder: '예: 100000',
      budget_clear: '제한 해제',
      budget_help: '1개, 3개 또는 콤보 총액에 적용됩니다. 최저 참고 가격 기준으로 필터링됩니다.',
      craving_label: '오늘 어떤 음식이 당기시나요?',
      craving_all: '아무거나 좋아요',
      craving_rice: '밥 & 찹쌀밥',
      craving_soup: '국물 요리',
      craving_light: '가벼운 식사',
      craving_spicy: '매운맛',
      craving_mild: '담백한맛',
      craving_note: '메인 메뉴 및 콤보 메인에 적용됩니다. 맛과 조리법은 식당마다 다릅니다.',
      avoid_recent_label: '최근 3일 내 먹은 음식 제외',
      avoid_recent_note:
        '선택지가 적을 경우, 예산을 맞추기 위해 이미 먹은 메뉴가 포함될 수 있습니다.',
      reset_taste_btn: '취향 필터 해제',
      unique_label: '3개 선택 시 중복 제외',
      combo_note_1: '콤보 = 메인 + 간식 + 음료',
      combo_note_2: '이전 뽑기와 다른 메뉴를 우선합니다. 예산 제한 시 중복될 수 있습니다.',
      menu_eyebrow: '매일 색다른 풍미',
      menu_heading: '메뉴 탐색',
      menu_toggle_title: '수집한 요리만 보기',
      personal_view_label: '내 목록',
      view_all: '모든 메뉴',
      view_favorite: '즐겨찾기',
      view_eaten: '먹은 음식',
      view_hidden: '숨긴 메뉴 · 복원 가능',
      search_placeholder: '원하는 요리 검색…',
      search_aria: '메뉴 검색',
      search_clear: '검색 초기화',
      filter_all: '전체',
      filter_rice: '밥류',
      filter_soup: '면류',
      filter_pastry: '반류/떡',
      filter_snack: '간식거리',
      filter_drinks: '음료',
      load_more: '더 보기',
      reset_menu_budget: '예산 제한 해제',
      reset_menu_filters: '모든 메뉴 보기',
      callout_strong: '맛있어 보이나요? 근처 맛집을 찾아보세요.',
      callout_desc: '메뉴를 선택한 후 Google 지도에서 위치, 리뷰, 메뉴를 확인하세요.',
      footer_brand: '오늘 뭐 먹지?',
      footer_sub: '맛있고 즐겁게, 내 마음대로.',
      privacy: '개인정보 보호',
      terms: '이용약관',
      credits: '오픈 소스',
      offline_ready: '오프라인 사용 준비 완료.',
      offline_preparing: '오프라인 모드 준비 중…',
      nav_home: '음식 고르기',
      nav_menu: '메뉴',
      nav_collection: '컬렉션',
      spin_eyebrow: '기분 좋은 서프라이즈',
      spin_title: '맛있는 메뉴를 찾는 중…',
      spin_skip: '건너뛰기',
      spin_note: '오늘 한 끼를 위한 새로운 선택.',
      result_eyebrow: '맛있는 식사가 기다립니다',
      result_single_title: '추천 메뉴',
      result_triple_title: '식사를 위한 3가지 추천',
      result_combo_title: '추천 콤보',
      result_detail_title: '새로운 메뉴 탐색',
      result_maps_eyebrow: '맛있는 메뉴에서 단골집으로',
      result_maps_title: 'Google 지도에서 식당 찾기',
      result_maps_note: '가격은 참고용입니다. 실제 메뉴와 가격은 식당에서 확인하세요.',
      btn_reroll: '다시 뽑기',
      btn_done: '완료',
      share_title: '맛있는 식사 공유',
      share_desc: '링크를 복사하여 친구에게 보내세요. 어떤 기기에서든 바로 열립니다.',
      copy_link_btn: '링크 복사',
      install_title: '배고플 땐 언제나 준비 완료',
      install_desc: '홈 화면에 추가하여 앱처럼 빠르게 열어보세요.',
      install_understood: '확인',
      theme_heading: '설정 및 외관',
      lang_heading: '언어 · Language',
      brightness_heading: '화면 모드',
      theme_color_heading: '테마 색상',
      timezone_heading: '지역 및 시간대',
      mode_light: '라이트',
      mode_dark: '다크',
      mode_system: '기기 설정',
      mode_auto: '자동 (시간대별)',
      custom_color_text: '사용자 지정 색상',
      color_system: '시스템 기본',
      color_orange: '오렌지',
      color_green: '그린',
      color_blue: '블루',
      color_rose: '로즈',
      theme_note: '테마 색상은 라이트/다크 모드와 함께 적용됩니다. 브라우저에 저장됩니다.',
      tool_tz: '지역 및 시간대',
      tool_theme: '외관 및 설정',
      tool_lang: '언어 변경',
      tool_bgm: '배경음악 재생',
      tool_bgm_off: '배경음악 끄기',
      tool_sound_on: '효과음 켜기',
      tool_sound_off: '효과음 끄기',
      tool_share: '웹사이트 공유',
      tool_install: '앱 설치',
      tz_modal_eyebrow: '지역 시간대 설정',
      tz_modal_title: '지역 및 시간대',
      tz_modal_desc:
        '거주하시는 지역의 시간대를 선택하면 아침, 점심, 저녁, 심야 시간에 맞춰 화면 색상이 자동으로 바뀝니다.',
      tz_auto: '자동',
      tz_auto_desc: '기기 시간 기준',
      clock_prefix: '현재 시간:',
      sound_enabled: '효과음이 켜졌습니다',
      sound_disabled: '효과음이 꺼졌습니다',
      bgm_enabled: '배경음악이 켜졌습니다',
      bgm_disabled: '배경음악이 꺼졌습니다',
      link_copied: '웹사이트 링크가 복사되었습니다!',
      act_fav: '즐겨찾기',
      act_fav_active: '즐겨찾기됨',
      act_eaten: '먹음 표시',
      act_eaten_active: '먹음 · 취소',
      act_hide: '숨기기',
      act_restore: '메뉴 복원',
      act_find_maps: '식당 찾기',
      find_places_for: '식당 검색:',
      on_google_maps: '(Google 지도)',
      places_online: 'Google 지도에서 위치, 리뷰 및 메뉴를 확인하세요.',
      places_offline: 'Google 지도 검색을 이용하려면 인터넷 연결이 필요합니다.',
      is_new: '신메뉴',
      discovered: '발견',
      desc_and_source: '설명 및 출처',
      photo_source_license: '사진 출처 및 라이선스',
      fav_eaten_hide_title: '즐겨찾기·먹음·숨김',
      total_price_from: '예상 최저가',
      min_estimate: '최소 예상치',
      total_min_note: '메뉴별 최저가를 기준으로 한 합계입니다. 실제 가격은 다를 수 있습니다.',
      round_budget_label: '이번 예산',
      remains_from: '예상 잔액',
      actual_price_may_vary: '실제 가격은 식당에서 확인하세요.',
      viewing: '보기',
      dishes_unit: '개',
      discovered_unit: '발견됨',
      collected: '수집 완료',
      uncollected: '미수집',
      hidden_badge: '숨김',
      dish_fallback_alt: '추천 메뉴',
      no_match_filter: '조건에 맞는 메뉴가 없습니다',
      empty_menu_msg: '이 목록 또는 필터에 해당하는 메뉴가 없습니다.',
    },
    zh: {
      brand_name: '今天吃什么？',
      lang_modal_eyebrow: '语言选择 · LANGUAGE',
      lang_modal_title: '选择语言',
      lang_modal_desc: '请选择全站显示的语言。',
      can_pick_from: '可选 · 起价',
      not_enough_dishes: '菜品不足',
      need_at_least: '至少需要',
      dish_single_info: '1道菜',
      dish_triple_info: '3道菜',
      dish_combo_info: '组合',
      budget_unlimited_status: '预算无限制。',
      budget_label_prefix: '预算',
      per_spin: '轮',
      dishes_eligible: '道菜符合分类',
      has_options: '有可选菜品',
      not_enough_money_dishes: '金额或菜品不足',
      not_enough_money: '金额不足',
      ref_photo: '参考图片',
      try_remove_filters: '尝试清除筛选',
      no_matching_dish: '暂无合适菜品',
      no_dish_budget_pref: '没有符合预算和口味的菜品。请清除口味筛选、增加预算或恢复已隐藏菜品。',
      collection_note_tpl:
        '已探索 {percent}% 菜单 · 此为系统推荐菜品，非已吃记录。数据保存在此浏览器中。',
      collection_toggle_title: '仅查看已收集菜品',
      cat_all: '全部',
      cat_main: '主菜',
      price_disclaimer: '* 参考价格，实际可能有所差异',
      cat_morning: '早餐',
      cat_lunch: '午餐',
      cat_afternoon: '下午茶',
      cat_dinner: '晚餐',
      cat_snacks: '小吃点心',
      cat_drinks: '饮品饮料',
      lang_changed: '语言已切换为中文',

      brand_title: '今天吃什么？',
      brand_sub: '美味一餐，快乐一天。',
      skip_link: '跳转到主要内容',
      offline: '离线模式',
      period_morning: '早晨 · 每日越南风味',
      period_lunch: '午餐 · 每日越南风味',
      period_afternoon: '下午 · 每日越南风味',
      period_dinner: '晚餐 · 每日越南风味',
      period_latenight: '深夜 · 每日越南风味',
      title_default: '今天吃什么？',
      title_main: '今日主食推荐',
      title_snacks: '今日风味小吃',
      title_drinks: '清爽特色饮品',
      slogan: '选择分类，让我们为你推荐美食。',
      latenight_notice: '深夜餐食推荐。',
      mode_main: '主食',
      mode_snacks: '小吃',
      mode_drinks: '饮品',
      hero_pick: '今日推荐',
      hero_price_note: '参考价格',
      hero_find_btn: '查看菜品与寻店',
      hero_caption: '越南风味，每日精选',
      btn_single: '选1道菜',
      btn_triple: '选3道菜',
      btn_combo: '生成套餐',
      budget_panel_title: '预算与偏好',
      budget_unlimited: '不限',
      budget_label: '想要消费的总金额 (越南盾)',
      budget_placeholder: '例如: 100000',
      budget_clear: '清除限制',
      budget_help:
        '适用于单道菜、3道菜或套餐总额。根据最低参考价格进行筛选；实际价格可能略有浮动。',
      craving_label: '今天想吃什么口味？',
      craving_all: '都可以',
      craving_rice: '米饭与糯米饭',
      craving_soup: '汤面类',
      craving_light: '清淡小食',
      craving_spicy: '香辣',
      craving_mild: '清淡温和',
      craving_note: '适用于主食及套餐主食。烹饪风味因餐馆而异。',
      avoid_recent_label: '优先避免近3天吃过的菜品',
      avoid_recent_note: '若可选菜品较少，已吃过的菜品仍可能出现以符合预算。',
      reset_taste_btn: '重置口味筛选',
      unique_label: '3道菜不重复',
      combo_note_1: '套餐 = 主食 + 小吃 + 饮品',
      combo_note_2: '优先推荐不同于上一次的菜品。预算紧张时可能略有重复。',
      menu_eyebrow: '每日不同风味',
      menu_heading: '探索菜单',
      menu_toggle_title: '仅查看已收集菜品',
      personal_view_label: '我的清单',
      view_all: '全部菜品',
      view_favorite: '我的收藏',
      view_eaten: '已吃过',
      view_hidden: '已隐藏 · 可恢复',
      search_placeholder: '搜索想吃的菜品…',
      search_aria: '搜索菜单菜品',
      search_clear: '清空搜索',
      filter_all: '全部',
      filter_rice: '饭类',
      filter_soup: '汤面',
      filter_pastry: '饼类/糕点',
      filter_snack: '休闲小吃',
      filter_drinks: '饮品',
      load_more: '加载更多',
      reset_menu_budget: '清除预算限制',
      reset_menu_filters: '查看所有菜品',
      callout_strong: '发现心仪美食？立即查找附近餐馆。',
      callout_desc: '选择菜品并在Google地图上查看地址、评价与菜单。',
      footer_brand: '今天吃什么？',
      footer_sub: '吃得好，选得开心。随你心意。',
      privacy: '隐私政策',
      terms: '服务条款',
      credits: '开源许可',
      offline_ready: '离线模式已就绪。',
      offline_preparing: '正在准备离线缓存…',
      nav_home: '选菜',
      nav_menu: '菜单',
      nav_collection: '收藏',
      spin_eyebrow: '一点小惊喜',
      spin_title: '正在挑选美食…',
      spin_skip: '跳过',
      spin_note: '为今天的一餐带来新灵感。',
      result_eyebrow: '美味佳肴正等待着您',
      result_single_title: '为你挑选的美食',
      result_triple_title: '3道精选推荐',
      result_combo_title: '为你搭配的套餐',
      result_detail_title: '探索美味佳肴',
      result_maps_eyebrow: '从美食到心仪餐馆',
      result_maps_title: '在Google地图上查找餐馆',
      result_maps_note: '价格仅供参考，实际菜单及价格请与餐馆确认。',
      btn_reroll: '重新选择',
      btn_done: '完成',
      share_title: '分享一顿美食',
      share_desc: '复制链接分享给好友，任何设备均可直接打开。',
      copy_link_btn: '复制链接',
      install_title: '饥肠辘辘时，随时待命',
      install_desc: '添加到主屏幕，像App一样快速启动。',
      install_understood: '明白了',
      theme_heading: '设置与界面',
      lang_heading: '语言 · Language',
      brightness_heading: '显示模式',
      theme_color_heading: '主题色彩',
      timezone_heading: '地区与时区',
      mode_light: '明亮',
      mode_dark: '深色',
      mode_system: '跟随系统',
      mode_auto: '自动（按时段）',
      custom_color_text: '自定义颜色',
      color_system: '系统默认',
      color_orange: '橙色',
      color_green: '绿色',
      color_blue: '蓝色',
      color_rose: '玫红',
      theme_note: '主题色彩支持明亮与深色模式，设置将保存在当前浏览器中。',
      tool_tz: '地区与时区',
      tool_theme: '界面与设置',
      tool_lang: '切换语言',
      tool_bgm: '播放背景音乐',
      tool_bgm_off: '暂停背景音乐',
      tool_sound_on: '开启音效',
      tool_sound_off: '静音音效',
      tool_share: '分享网站',
      tool_install: '安装应用',
      tz_modal_eyebrow: '地区时区设定',
      tz_modal_title: '地区与时区',
      tz_modal_desc: '选择你所在地区的时区，界面将根据当地的早晨、中午、傍晚和深夜自动变换色彩。',
      tz_auto: '自动',
      tz_auto_desc: '跟随设备时间',
      clock_prefix: '当前时间:',
      sound_enabled: '音效已开启',
      sound_disabled: '音效已静音',
      bgm_enabled: '背景音乐已播放',
      bgm_disabled: '背景音乐已暂停',
      link_copied: '网站链接已复制到剪贴板！',
      act_fav: '收藏',
      act_fav_active: '已收藏',
      act_eaten: '标记为已吃',
      act_eaten_active: '已吃 · 取消',
      act_hide: '隐藏',
      act_restore: '恢复菜品',
      act_find_maps: '查找餐馆',
      find_places_for: '在Google地图查找',
      on_google_maps: '餐馆',
      places_online: '在Google地图上查看地址、评价与菜单。',
      places_offline: '在Google地图查找餐馆需要互联网连接。',
      is_new: '新品',
      discovered: '已探索',
      desc_and_source: '描述与来源',
      photo_source_license: '图片来源与许可',
      fav_eaten_hide_title: '收藏·吃过·隐藏',
      total_price_from: '最低预估总价',
      min_estimate: '最低预估',
      total_min_note: '根据各菜品最低参考价计算，实际价格可能有所变动。',
      round_budget_label: '本轮预算',
      remains_from: '预估结余',
      actual_price_may_vary: '实际价格请与餐馆确认。',
      viewing: '正在浏览',
      dishes_unit: '道菜',
      discovered_unit: '已探索',
      collected: '已收集',
      uncollected: '未收集',
      hidden_badge: '已隐藏',
      dish_fallback_alt: '推荐菜品',
      no_match_filter: '没有符合筛选条件的菜品',
      empty_menu_msg: '当前清单或筛选条件下未找到菜品。',
    },
  };
  window.I18N = TRANSLATIONS;
  const t = (key) => TRANSLATIONS[settings?.language || 'vi']?.[key] || TRANSLATIONS.vi[key] || key;
  const engine = gachaEngine;
  const nearby = new NearbyPlaces();
  const personal = engine.preferences;
  let personalView = 'all',
    personalSyncPending = false;
  let featuredDish = null;
  let languageBindingsReady = false;
  let visibleResultState = null;
  let collectionRefreshFrame = 0;
  let collectionRefreshPending = false;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // 01. Device preferences and validated storage
  function readSettings() {
    const value = {
      unique: true,
      muted: false,
      budget: null,
      theme: 'system',
      customColor: '#ff5722',
      appearance: 'auto',
      timezone: 'auto',
      language: 'vi',
    };
    const valid = (key, item) =>
      key === 'appearance'
        ? ['light', 'dark', 'system', 'auto'].includes(item)
        : key === 'theme'
          ? ['system', 'orange', 'green', 'blue', 'rose', 'custom'].includes(item)
          : key === 'customColor'
            ? typeof item === 'string' && /^#[0-9a-fA-F]{6}$/.test(item)
            : key === 'timezone'
              ? [
                  'auto',
                  'Asia/Ho_Chi_Minh',
                  'Asia/Tokyo',
                  'Asia/Seoul',
                  'Asia/Shanghai',
                  'Asia/Bangkok',
                  'Asia/Singapore',
                  'Europe/London',
                  'Europe/Paris',
                  'America/New_York',
                  'America/Los_Angeles',
                  'Australia/Sydney',
                ].includes(item)
              : key === 'language'
                ? ['vi', 'en', 'ja', 'ko', 'zh'].includes(item)
                : key === 'budget'
                  ? item === null ||
                    (typeof item === 'number' && Number.isFinite(item) && item >= 0)
                  : typeof item === 'boolean';
    const old = Settings.read();
    for (const key of Object.keys(value)) {
      if (valid(key, old[key])) value[key] = old[key];
      try {
        const saved = localStorage.getItem('food_case_setting_' + key);
        if (saved !== null) {
          const item = JSON.parse(saved);
          if (valid(key, item)) value[key] = item;
        }
      } catch (_) {}
    }
    return value;
  }
  let settings = readSettings();
  let subDrinkFilter = 'all';
  let searchTerm = '',
    collectionOnly = false,
    visibleCount = 12;
  let busy = false,
    filter = 'all',
    lastPeriod = '',
    lastAction = 'single',
    toastTimer,
    returnFocus;
  const HOME_PREVIEW_SIZE = 6, MENU_PAGE_SIZE = 12;
  const isMenuPage = location.pathname.endsWith('/menu.html');
  const menuParams = new URLSearchParams(location.search);
  let menuPageNumber = isMenuPage ? Math.max(1, Math.min(100000, Math.floor(Number(menuParams.get('page'))) || 1)) : 1;
  let menuFilterSignature = '';
  function menuPageUrl(page = 1) {
    const params = new URLSearchParams({page:String(page),category:filter,query:searchTerm,view:personalView,collection:String(collectionOnly),drink:subDrinkFilter});
    return 'menu.html?' + params;
  }
  const roulette = new FoodRoulette($('reelTrack'), $('reelViewport'));
  function syncCacheActivity() {
    navigator.serviceWorker?.controller?.postMessage({ type: 'CACHE_ACTIVITY', busy: busy || document.hidden });
  }
  document.addEventListener('visibilitychange', syncCacheActivity);
  setTimeout(syncCacheActivity, 1500);
  navigator.serviceWorker?.addEventListener('controllerchange', syncCacheActivity);

  function getRegionFromTimezone(tz) {
    let targetTz = tz;
    if (!targetTz || targetTz === 'auto') {
      try {
        targetTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Ho_Chi_Minh';
      } catch (_) {
        targetTz = 'Asia/Ho_Chi_Minh';
      }
    }
    const TIMEZONE_TO_REGION = {
      'Asia/Ho_Chi_Minh': 'vi',
      'Asia/Bangkok': 'vi',
      'Asia/Tokyo': 'ja',
      'Asia/Seoul': 'ko',
      'Asia/Shanghai': 'zh',
      'Asia/Beijing': 'zh',
      'Asia/Chongqing': 'zh',
      'Asia/Hong_Kong': 'zh',
      'Asia/Taipei': 'zh',
      'Europe/London': 'en',
      'Europe/Paris': 'en',
      'America/New_York': 'en',
      'America/Los_Angeles': 'en',
      'Australia/Sydney': 'en',
      'Asia/Singapore': 'en',
    };
    if (TIMEZONE_TO_REGION[targetTz]) return TIMEZONE_TO_REGION[targetTz];
    if (targetTz.startsWith('Asia/Tokyo')) return 'ja';
    if (targetTz.startsWith('Asia/Seoul')) return 'ko';
    if (
      targetTz.startsWith('Asia/Shanghai') ||
      targetTz.startsWith('Asia/Hong_Kong') ||
      targetTz.startsWith('Asia/Taipei')
    )
      return 'zh';
    if (
      targetTz.startsWith('America/') ||
      targetTz.startsWith('Europe/') ||
      targetTz.startsWith('Australia/')
    )
      return 'en';
    return 'vi';
  }

  function getCurrentRegion() {
    return getRegionFromTimezone(settings ? settings.timezone : 'auto');
  }

  if (typeof engine.setRegion === 'function') {
    engine.setRegion(getCurrentRegion());
  }
  let allDishes = engine.getAllDishesList();
  let lastFeaturedDishId = null;
  let lastFeaturedLang = null;
  let lastMenuSignature = '';
  let activeBudget = settings.budget,
    prepared = null,
    budgetPending = true,
    budgetTimer,
    budgetGeneration = 0,
    budgetInvalid = false,
    collectionReady = false,
    settingsSyncPending = false;

  const money = (amount, explicitRegion) => {
    const region =
      explicitRegion || (typeof getCurrentRegion === 'function' ? getCurrentRegion() : 'vi');
    if (typeof formatRegionalMoney === 'function') {
      return formatRegionalMoney(amount, region);
    }
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  function applyTimezoneRegion(tz) {
    const region = getRegionFromTimezone(tz || (settings ? settings.timezone : 'auto'));
    if (typeof engine.setRegion === 'function') {
      engine.setRegion(region);
      allDishes = engine.getAllDishesList();
      visibleCount = 12;
    }
    if ($('customDishPrice')) {
      $('customDishPrice').step = ['en', 'zh'].includes(region) ? '0.01' : '1';
    }
    const currencyCfg = (typeof getCurrencyConfig === 'function'
      ? getCurrencyConfig(region)
      : null) || { presets: [30000, 50000, 100000, 200000], placeholder: '100000', symbol: 'đ' };
    document.querySelectorAll('[data-budget]').forEach((btn, idx) => {
      if (currencyCfg.presets && currencyCfg.presets[idx] !== undefined) {
        const val = currencyCfg.presets[idx];
        btn.dataset.budget = String(val);
        btn.textContent =
          typeof formatRegionalMoney === 'function'
            ? formatRegionalMoney(val, region)
            : money(val, region);
      }
    });
    if ($('budgetInput')) $('budgetInput').placeholder = currencyCfg.placeholder || '100000';
    $('budgetInput').inputMode = ['en', 'zh'].includes(region) ? 'decimal' : 'numeric';
    const helpLang = settings.language || 'vi';
    if ($('budgetHelp'))
      $('budgetHelp').textContent = ['en', 'zh'].includes(region)
        ? UICopy.text('decimal', helpLang)
        : (TRANSLATIONS[helpLang] || TRANSLATIONS.vi).budget_help;
    const customPriceLabel = document.querySelector('label[for="customDishPrice"]');
    if (customPriceLabel)
      customPriceLabel.textContent = `${UICopy.text('price', helpLang)} (${currencyCfg.symbol})`;

    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) {
      const lang = (settings && settings.language) || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const baseLabel = (tDict.budget_label || '').replace(/\s*\([^)]*\)$/, '');
      budgetInputLabel.textContent = `${baseLabel} (${currencyCfg.symbol})`;
    }
  }
  $('budgetInput').value = activeBudget === null ? '' : String(activeBudget);
  function toast(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').classList.add('show');
    toastTimer = setTimeout(() => $('toast').classList.remove('show'), 4200);
  }
  function saveSettings(changes) {
    try {
      Settings.update(changes);
    } catch (_) {
      toast('Không lưu được tùy chọn. Thay đổi vẫn dùng trong phiên này.');
    }
  }
  function syncSettings() {
    if (busy || budgetPending || document.activeElement === $('budgetInput')) {
      settingsSyncPending = true;
      return;
    }
    settingsSyncPending = false;
    const previousRegion = engine.currentRegion;
    settings = readSettings();
    if (getRegionFromTimezone(settings.timezone) !== previousRegion) settings.budget = null;
    $('uniqueInput').checked = settings.unique;
    updateSound();
    updateTheme();
    applyTimezoneRegion(settings.timezone);
    applyLanguage(settings.language);
    $('budgetInput').value = settings.budget === null ? '' : String(settings.budget);
    scheduleBudget(0, false);
  }
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith('food_case_setting')) syncSettings();
  });
  $('budgetInput').addEventListener('blur', () => {
    if (settingsSyncPending && !budgetPending) syncSettings();
  });
  // 02. Appearance, sound, timezone and language controls
  function updateTimezoneUI() {
    const currentTz = settings.timezone || 'auto';

    // 1. Update aria-pressed on all timezone choices (both dialogs)
    document.querySelectorAll('[data-timezone-choice]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.timezoneChoice === currentTz));
    });

    // 2. Update live local time for each timezone button
    const tzList = [
      'auto',
      'Asia/Ho_Chi_Minh',
      'Asia/Tokyo',
      'Asia/Seoul',
      'Asia/Shanghai',
      'Asia/Bangkok',
      'Asia/Singapore',
      'Europe/London',
      'Europe/Paris',
      'America/New_York',
      'America/Los_Angeles',
      'Australia/Sydney',
    ];
    for (const tz of tzList) {
      document.querySelectorAll(`[data-tz-time="${tz}"]`).forEach((el) => {
        const info = AppearancePreferences.getTimeOfDayInfo(tz);
        const h = String(info.hour).padStart(2, '0');
        const m = String(info.minute).padStart(2, '0');
        el.textContent = `${h}:${m}`;
      });
    }

    // 3. Update home screen #tzPillText
    const pillText = $('tzPillText');
    if (pillText) {
      const info = AppearancePreferences.getTimeOfDayInfo(currentTz);
      const h = String(info.hour).padStart(2, '0');
      const m = String(info.minute).padStart(2, '0');
      const tzShort = {
        auto: 'AUTO',
        'Asia/Ho_Chi_Minh': 'VN',
        'Asia/Tokyo': 'JP',
        'Asia/Seoul': 'KR',
        'Asia/Shanghai': 'CN',
        'Asia/Bangkok': 'TH',
        'Asia/Singapore': 'SG',
        'Europe/London': 'UK',
        'Europe/Paris': 'EU',
        'America/New_York': 'US-NY',
        'America/Los_Angeles': 'US-CA',
        'Australia/Sydney': 'AU',
      };
      pillText.textContent = `${tzShort[currentTz] || 'TZ'} · ${h}:${m}`;
    }

    // 4. Update timezoneClock in themeDialog
    const clockEl = $('timezoneClock');
    if (clockEl) {
      const info = AppearancePreferences.getTimeOfDayInfo(currentTz);
      const h = String(info.hour).padStart(2, '0');
      const m = String(info.minute).padStart(2, '0');
      const lang = settings.language || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const pKey = 'period_' + info.period;
      const pText = (tDict[pKey] || info.period).split('·')[0].trim();
      clockEl.textContent = `🕒 ${tDict.clock_prefix} ${h}:${m} (${pText})`;
    }

    if ($('timezoneSelect')) {
      $('timezoneSelect').value = currentTz;
    }
  }

  function applyLanguage(lang) {
    if (lang) {
      settings.language = lang;
    }
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    document.documentElement.lang = lang;
    UICopy.apply(lang);
    document.querySelectorAll('.universe-tab').forEach((button) => {
      const category = button.dataset.category;
      const label = tDict['cat_' + category] || tDict.cat_all;
      if (category === 'all') {
        const count = $('universeCountAll');
        button.replaceChildren(
          document.createTextNode(label + ' ('),
          count,
          document.createTextNode(')')
        );
      } else button.textContent = label;
    });
    $('universeDishSearch').placeholder = tDict.search_placeholder;
    $('universeDishSearch').setAttribute('aria-label', tDict.search_aria);
    $('universeConfirmBtn').replaceChildren(
      document.createTextNode(UICopy.text('addWheel', lang) + ' ('),
      $('universeConfirmCount'),
      document.createTextNode(')')
    );
    $('customWheelUniverseBtn').title = UICopy.text('universe', lang);
    $('customWheelAlertText').textContent = UICopy.text('wheelShort', lang);
    const customPriceLabel = document.querySelector('label[for="customDishPrice"]');
    if (customPriceLabel)
      customPriceLabel.textContent = `${UICopy.text('price', lang)} (${getCurrencyConfig(getCurrentRegion()).symbol})`;
    const cancelDish = document.querySelector('#addDishForm [data-close]');
    if (cancelDish) cancelDish.textContent = UICopy.text('cancel', lang);
    $('customDishName').placeholder = UICopy.text('name', lang).replace(' *', '');
    $('customDishDesc').placeholder = UICopy.text('description', lang);

    const toolLabels = {
      vi: [
        'Múi giờ',
        'Ngôn ngữ',
        'Giao diện',
        'Bản đồ',
        'Cài đặt',
        'Chia sẻ',
        'Nhạc nền',
        'Âm thanh',
      ],
      en: ['Time zone', 'Language', 'Theme', 'Maps', 'Install', 'Share', 'Music', 'Sound'],
      ja: ['時刻', '言語', 'テーマ', '地図', 'インストール', '共有', '音楽', '音声'],
      ko: ['시간대', '언어', '테마', '지도', '설치', '공유', '음악', '소리'],
      zh: ['时区', '语言', '主题', '地图', '安装', '分享', '音乐', '声音'],
    };
    document.querySelectorAll('[data-tool-label]').forEach((el) => {
      const keys = ['timezone', 'language', 'theme', 'maps', 'install', 'share', 'bgm', 'sound'];
      el.textContent =
        (toolLabels[lang] || toolLabels.vi)[keys.indexOf(el.dataset.toolLabel)] || el.textContent;
    });

    for (const option of $('customDishMeal').options) {
      option.textContent =
        option.value === 'snacks'
          ? tDict.cat_snacks
          : option.value === 'drinks'
            ? tDict.cat_drinks
            : (tDict['period_' + option.value] || option.textContent).split('·')[0].trim();
    }
    // Header & Skip link
    const brandName = document.querySelector('.brand-name');
    if (brandName) brandName.textContent = tDict.brand_name || 'Ăn gì đây';
    const brandSub = document.querySelector('.brand-sub');
    if (brandSub) brandSub.textContent = tDict.brand_sub;
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) skipLink.textContent = tDict.skip_link;

    // Slogan & Late night notice
    const sloganEl = document.querySelector('.intro > p');
    if (sloganEl) sloganEl.textContent = tDict.slogan;
    const lateNightEl = document.querySelector('.latenight-text');
    if (lateNightEl) lateNightEl.textContent = tDict.latenight_notice;

    // Modes tabs
    const modeIcons = { main: 'utensils', snacks: 'cookie', drinks: 'coffee' };
    document.querySelectorAll('[data-mode]').forEach((b) => {
      const mode = b.dataset.mode;
      const label = tDict['mode_' + mode] || mode;
      b.replaceChildren(UI.icon(modeIcons[mode] || 'utensils'), document.createTextNode(label));
    });

    // Hero recommendation
    const heroTag = document.querySelector('.feature-tag');
    if (heroTag)
      heroTag.replaceChildren(UI.icon('sparkles'), document.createTextNode(tDict.hero_pick));
    const heroPriceNote = document.querySelector('.hero-price .note');
    if (heroPriceNote) heroPriceNote.textContent = tDict.hero_price_note;
    const heroFindBtn = $('findFeaturedBtn');
    if (heroFindBtn) {
      heroFindBtn.replaceChildren(
        UI.icon('map-pin'),
        document.createTextNode(tDict.hero_find_btn),
        UI.icon('arrow-up-right')
      );
    }
    const heroCaption = document.querySelector('.photo-caption');
    if (heroCaption) heroCaption.textContent = tDict.ref_photo || tDict.hero_caption;

    // Action buttons
    const singleBtn = $('singleBtn');
    if (singleBtn)
      singleBtn.replaceChildren(UI.icon('shuffle'), document.createTextNode(tDict.btn_single));
    const tripleBtn = $('tripleBtn');
    if (tripleBtn)
      tripleBtn.replaceChildren(UI.icon('layers'), document.createTextNode(tDict.btn_triple));
    const comboBtn = $('comboBtn');
    if (comboBtn)
      comboBtn.replaceChildren(UI.icon('sparkles'), document.createTextNode(tDict.btn_combo));
    const rerollBtn = $('rerollBtn');
    if (rerollBtn)
      rerollBtn.replaceChildren(
        UI.icon('rotate-ccw'),
        document.createTextNode(tDict.btn_spin_again || tDict.btn_reroll)
      );

    // Budget & Preferences text
    const budgetSummary = document.querySelector('#budgetPanel summary > span');
    if (budgetSummary) budgetSummary.textContent = tDict.budget_panel_title;
    const budgetLabel = $('budgetLabel');
    if (budgetLabel && activeBudget === null) budgetLabel.textContent = tDict.budget_unlimited;
    const budgetInputLabel = document.querySelector('label[for="budgetInput"]');
    if (budgetInputLabel) {
      const currencyCfg = (typeof getCurrencyConfig === 'function'
        ? getCurrencyConfig(getCurrentRegion())
        : null) || { symbol: 'đ' };
      const baseLabel = (tDict.budget_label || '').replace(/\s*\([^)]*\)$/, '');
      budgetInputLabel.textContent = `${baseLabel} (${currencyCfg.symbol})`;
    }
    const clearBudgetBtn = $('clearBudgetBtn');
    if (clearBudgetBtn) clearBudgetBtn.textContent = tDict.budget_clear;
    if ($('budgetHelp'))
      $('budgetHelp').textContent = ['en', 'zh'].includes(getCurrentRegion())
        ? UICopy.text('decimal', lang)
        : tDict.budget_help;

    // Taste Options
    const cravingLabel = document.querySelector(
      'label[for="cravingInput"], label[for="cravingInputControl"], #cravingInputLabel'
    );
    if (cravingLabel) cravingLabel.textContent = tDict.craving_label;
    const cravingMap = {
      all: tDict.craving_all,
      rice: tDict.craving_rice,
      soup: tDict.craving_soup,
      light: tDict.craving_light,
      spicy: tDict.craving_spicy,
      mild: tDict.craving_mild,
    };
    document.querySelectorAll('#cravingInput option').forEach((opt) => {
      if (cravingMap[opt.value]) opt.textContent = cravingMap[opt.value];
    });
    const cravingNote = document.querySelector('.taste-options > p.note:nth-of-type(1)');
    if (cravingNote) cravingNote.textContent = tDict.craving_note;
    const avoidRecentInput = $('avoidRecentInput');
    const avoidRecentLabel = avoidRecentInput?.closest('label');
    if (avoidRecentLabel) {
      avoidRecentLabel.replaceChildren(
        avoidRecentInput,
        document.createTextNode(tDict.avoid_recent_label)
      );
    }
    const avoidRecentNote = document.querySelector('.taste-options > p.note:nth-of-type(2)');
    if (avoidRecentNote) avoidRecentNote.textContent = tDict.avoid_recent_note;
    if ($('resetTasteBtn')) $('resetTasteBtn').textContent = tDict.reset_taste_btn;
    const uniqueInput = $('uniqueInput');
    const uniqueLabel = uniqueInput?.closest('label');
    if (uniqueLabel) {
      uniqueLabel.replaceChildren(uniqueInput, document.createTextNode(tDict.unique_label));
    }
    if ($('comboHelp')) $('comboHelp').textContent = tDict.combo_note_1;
    const comboNote2 = document.querySelector('.selection-options > .combo-note:nth-of-type(2)');
    if (comboNote2) comboNote2.textContent = tDict.combo_note_2;

    // Menu Section
    const menuEyebrow = document.querySelector('#menu .section-heading .eyebrow');
    if (menuEyebrow) menuEyebrow.textContent = tDict.menu_eyebrow;
    if ($('menuTitle'))
      $('menuTitle').textContent = collectionOnly ? tDict.nav_collection : tDict.menu_heading;
    if ($('collectionToggle')) $('collectionToggle').title = tDict.menu_toggle_title;
    const personalLabel = document.querySelector(
      'label[for="personalView"], label[for="personalViewControl"], #personalViewLabel'
    );
    if (personalLabel) personalLabel.textContent = tDict.personal_view_label;
    const viewMap = {
      all: tDict.view_all,
      favorite: tDict.view_favorite,
      eaten: tDict.view_eaten,
      hidden: tDict.view_hidden,
    };
    document.querySelectorAll('#personalView option').forEach((opt) => {
      if (viewMap[opt.value]) opt.textContent = viewMap[opt.value];
    });
    if ($('dishSearch')) {
      $('dishSearch').placeholder = tDict.search_placeholder;
      $('dishSearch').setAttribute('aria-label', tDict.search_aria);
    }
    if ($('clearSearch')) $('clearSearch').setAttribute('aria-label', tDict.search_clear);
    if ($('loadMoreBtn')) {
      $('loadMoreBtn').replaceChildren(
        document.createTextNode(tDict.load_more),
        UI.icon('arrow-right')
      );
    }
    if ($('resetMenuBudget')) $('resetMenuBudget').textContent = tDict.reset_menu_budget;
    if ($('resetMenuFilters')) $('resetMenuFilters').textContent = tDict.reset_menu_filters;

    // Filter Buttons in #filters
    if (typeof buildFilters === 'function') {
      buildFilters(lang);
    }
    if ($('collectionToggle'))
      $('collectionToggle').title = tDict.collection_toggle_title || 'Chỉ xem món đã thu thập';
    $('collectionToggle')?.setAttribute('aria-label', tDict.menu_toggle_title);
    if ($('collectionProgress'))
      $('collectionProgress').setAttribute(
        'aria-label',
        tDict.collection_progress_aria || UICopy.text('collectionProgress', lang)
      );

    // Callout & Footer
    const calloutStrong = document.querySelector('.maps-callout strong');
    if (calloutStrong) calloutStrong.textContent = tDict.callout_strong;
    const calloutDesc = document.querySelector('.maps-callout p');
    if (calloutDesc) calloutDesc.textContent = tDict.callout_desc;
    const footerBrand = document.querySelector('.footer-brand');
    if (footerBrand) footerBrand.textContent = tDict.brand_name || tDict.footer_brand;
    const footerSub = document.querySelector('footer > span');
    if (footerSub) footerSub.textContent = tDict.footer_sub;
    const legalLinks = document.querySelectorAll('.legal-links a');
    if (legalLinks[0]) legalLinks[0].textContent = tDict.privacy;
    if (legalLinks[1]) legalLinks[1].textContent = tDict.terms;
    if (legalLinks[2]) legalLinks[2].textContent = tDict.credits;
    if ($('offlineReadiness')) {
      $('offlineReadiness').textContent = navigator.onLine
        ? tDict.offline_ready
        : tDict.offline_preparing;
    }

    // Mobile Navigation
    const homeNavSpan = document.querySelector('#homeNav span:last-child');
    if (homeNavSpan) homeNavSpan.textContent = tDict.nav_home;
    const menuNavSpan = document.querySelector('#menuNav span:last-child');
    if (menuNavSpan) menuNavSpan.textContent = tDict.nav_menu;
    const collectionNavSpan = document.querySelector('#collectionNav span:last-child');
    if (collectionNavSpan) collectionNavSpan.textContent = tDict.nav_collection;

    // Spin Dialog
    const spinEyebrow = document.querySelector('#spinDialog .eyebrow');
    if (spinEyebrow) spinEyebrow.textContent = tDict.spin_eyebrow;
    if ($('spinTitle')) $('spinTitle').textContent = tDict.spin_title;
    if ($('skipBtn'))
      $('skipBtn').replaceChildren(
        document.createTextNode(tDict.spin_skip),
        UI.icon('arrow-right')
      );
    const spinNote = document.querySelector('#spinDialog .note');
    if (spinNote) spinNote.textContent = tDict.spin_note;

    // Result Dialog
    const nearbyEyebrow = document.querySelector('#nearbyPanel .eyebrow');
    if (nearbyEyebrow) nearbyEyebrow.textContent = tDict.result_maps_eyebrow;
    if ($('nearbyTitle')) $('nearbyTitle').textContent = tDict.result_maps_title;
    const nearbyNote = document.querySelector('#nearbyPanel .note');
    if (nearbyNote) nearbyNote.textContent = tDict.result_maps_note;
    if ($('rerollBtn'))
      $('rerollBtn').replaceChildren(
        UI.icon('rotate-ccw'),
        document.createTextNode(tDict.btn_reroll)
      );
    if ($('resultModalEyebrow'))
      $('resultModalEyebrow').textContent = tDict.result_eyebrow || 'BỮA NGON ĐANG CHỜ';
    if ($('resultDoneBtn'))
      $('resultDoneBtn').replaceChildren(document.createTextNode(tDict.btn_done), UI.icon('check'));
    const resultCloseBtn = document.querySelector(
      '#resultDialog .dialog-heading button[data-close]'
    );
    if (resultCloseBtn)
      resultCloseBtn.setAttribute('aria-label', tDict.close || UICopy.text('close', lang));

    // Share & Install Dialogs
    if ($('shareTitle')) $('shareTitle').textContent = tDict.share_title;
    const shareDesc = document.querySelector('#shareDialog > p');
    if (shareDesc) shareDesc.textContent = tDict.share_desc;
    const shareUrlLabel = document.querySelector('label[for="shareUrl"]');
    if (shareUrlLabel)
      shareUrlLabel.textContent = tDict.share_url_label || UICopy.text('shareUrl', lang);
    if ($('copyLinkBtn'))
      $('copyLinkBtn').replaceChildren(
        UI.icon('copy'),
        document.createTextNode(tDict.copy_link_btn)
      );
    const shareDone = document.querySelector('#shareDialog button[data-close]');
    if (shareDone)
      shareDone.replaceChildren(document.createTextNode(tDict.btn_done), UI.icon('check'));

    if ($('installTitle')) $('installTitle').textContent = tDict.install_title;
    const installDesc = document.querySelector('#installDialog > p');
    if (installDesc) installDesc.textContent = tDict.install_desc;
    const installUnderstood = document.querySelector('#installDialog button[data-close]');
    if (installUnderstood)
      installUnderstood.replaceChildren(
        document.createTextNode(tDict.install_understood),
        UI.icon('check')
      );

    // Theme Dialog Headings & Buttons
    if ($('appearanceTitle')) $('appearanceTitle').textContent = tDict.theme_heading;
    if ($('brightnessTitle')) $('brightnessTitle').textContent = tDict.brightness_heading;
    if ($('themeTitle')) $('themeTitle').textContent = tDict.theme_color_heading;
    if ($('timezoneTitle')) $('timezoneTitle').textContent = tDict.timezone_heading;
    if ($('themeNote')) $('themeNote').textContent = tDict.theme_note;
    if ($('themeDoneBtn'))
      $('themeDoneBtn').replaceChildren(document.createTextNode(tDict.btn_done), UI.icon('check'));

    // Language Dialog Headings & Buttons
    if ($('langModalEyebrow')) $('langModalEyebrow').textContent = tDict.lang_modal_eyebrow;
    if ($('langModalTitle')) $('langModalTitle').textContent = tDict.lang_modal_title;
    if ($('langModalDesc')) $('langModalDesc').textContent = tDict.lang_modal_desc;
    if ($('langDoneBtn'))
      $('langDoneBtn').replaceChildren(document.createTextNode(tDict.btn_done), UI.icon('check'));

    // Timezone Dialog Headings
    if ($('timezoneModalEyebrow')) $('timezoneModalEyebrow').textContent = tDict.tz_modal_eyebrow;
    if ($('timezoneModalTitle')) $('timezoneModalTitle').textContent = tDict.tz_modal_title;
    if ($('timezoneModalDesc')) $('timezoneModalDesc').textContent = tDict.tz_modal_desc;
    if ($('tzDoneBtn'))
      $('tzDoneBtn').replaceChildren(document.createTextNode(tDict.btn_done), UI.icon('check'));

    // Appearance choice buttons
    const appChoices = {
      light: tDict.mode_light,
      dark: tDict.mode_dark,
      system: tDict.mode_system,
      auto: tDict.mode_auto,
    };
    if ($('customColorLabel'))
      $('customColorLabel').textContent = tDict.custom_color_text || 'Tự chọn màu';
    document.querySelectorAll('[data-appearance-choice]').forEach((b) => {
      const choice = b.dataset.appearanceChoice;
      if (appChoices[choice]) b.textContent = appChoices[choice];
    });

    // Theme choice buttons
    const themeChoices = {
      system: tDict.color_system,
      orange: tDict.color_orange,
      green: tDict.color_green,
      blue: tDict.color_blue,
      rose: tDict.color_rose,
    };
    document.querySelectorAll('[data-theme-choice]').forEach((b) => {
      const choice = b.dataset.themeChoice;
      const dot = document.createElement('span');
      dot.className = 'theme-dot';
      dot.setAttribute('aria-hidden', 'true');
      b.replaceChildren(dot, document.createTextNode(themeChoices[choice] || choice));
    });

    // Language choice buttons
    document.querySelectorAll('[data-lang-choice]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.langChoice === lang));
    });

    // Tool buttons titles
    if ($('tzBtn')) {
      $('tzBtn').setAttribute('aria-label', tDict.tool_tz);
      $('tzBtn').title = tDict.tool_tz;
    }
    if ($('tzPill')) {
      $('tzPill').title = tDict.tool_tz;
      $('tzPill').setAttribute('aria-label', tDict.tool_tz);
    }
    if ($('themeBtn')) {
      $('themeBtn').setAttribute('aria-label', tDict.tool_theme);
      $('themeBtn').title = tDict.tool_theme;
    }
    if ($('mapsHeaderBtn')) {
      const mapsTitle = tDict.tool_maps || UICopy.text('mapsTool', lang);
      $('mapsHeaderBtn').setAttribute('aria-label', mapsTitle);
      $('mapsHeaderBtn').title = mapsTitle;
    }
    if ($('langBtn')) {
      $('langBtn').setAttribute('aria-label', tDict.tool_lang);
      $('langBtn').title = tDict.tool_lang;
    }
    if ($('shareBtn')) {
      $('shareBtn').title = tDict.tool_share;
      $('shareBtn').setAttribute('aria-label', tDict.tool_share);
      const sr = $('shareBtn').querySelector('.sr-only');
      if (sr) sr.textContent = tDict.tool_share;
    }
    if ($('installBtn')) {
      $('installBtn').title = tDict.tool_install;
      $('installBtn').setAttribute('aria-label', tDict.tool_install);
      const sr = $('installBtn').querySelector('.sr-only');
      if (sr) sr.textContent = tDict.tool_install;
    }

    document.dispatchEvent(new Event('bfsc-languagechange'));
    CustomControls.syncAll();
    updateSound();
    updateBgmButton();
    updateTimezoneUI();
    refreshPersonalActions();
    if (typeof nearby !== 'undefined' && nearby.updateStatus) nearby.updateStatus();
    if (typeof banner === 'function') banner();
    if (typeof menu === 'function') menu();
    // These bindings are initialized after the first startup language pass.
    if (languageBindingsReady) {
      updateCustomWheelCount();
      renderUniverseDishList();
      if ($('resultDialog').open && visibleResultState) {
        const { results, detail, resultBudget, saved } = visibleResultState;
        showResults(results, detail, resultBudget, saved);
      }
    }
    CustomControls.refresh();
  }

  function updateTheme() {
    AppearancePreferences.apply(settings);
    document
      .querySelectorAll('[data-appearance-choice]')
      .forEach((button) =>
        button.setAttribute(
          'aria-pressed',
          String(button.dataset.appearanceChoice === settings.appearance)
        )
      );
    document
      .querySelectorAll('[data-theme-choice]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.themeChoice === settings.theme))
      );
    document
      .querySelectorAll('[data-lang-choice]')
      .forEach((button) =>
        button.setAttribute('aria-pressed', String(button.dataset.langChoice === settings.language))
      );
    if ($('customThemeColor') && settings.customColor) {
      $('customThemeColor').value = settings.customColor;
    }
    if ($('customColorPreview') && settings.customColor) {
      $('customColorPreview').style.backgroundColor = settings.customColor;
    }
    updateTimezoneUI();
  }

  document.querySelectorAll('[data-theme-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.theme = button.dataset.themeChoice;
        updateTheme();
        saveSettings({ theme: settings.theme });
      })
  );

  const customColorEl = $('customThemeColor');
  if (customColorEl) {
    const onCustomColorChange = (e) => {
      const col = e.target.value;
      settings.theme = 'custom';
      settings.customColor = col;
      if ($('customColorPreview')) {
        $('customColorPreview').style.backgroundColor = col;
      }
      updateTheme();
      saveSettings({ theme: 'custom', customColor: col });
    };
    customColorEl.addEventListener('input', onCustomColorChange);
    customColorEl.addEventListener('change', onCustomColorChange);
  }
  document.querySelectorAll('[data-lang-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.language = button.dataset.langChoice;
        updateTheme();
        applyLanguage(settings.language);
        saveSettings({ language: settings.language });
        scheduleBudget(0, false);
        feature(featuredDish);
        banner();
        menu();
        const tDict = TRANSLATIONS[settings.language] || TRANSLATIONS.vi;
        toast(tDict.lang_changed || 'Đã đổi ngôn ngữ');
      })
  );

  // Timezone button wiring
  if ($('tzBtn')) $('tzBtn').onclick = () => open($('timezoneDialog'));
  if ($('tzPill')) $('tzPill').onclick = () => open($('timezoneDialog'));

  document.querySelectorAll('[data-timezone-choice]').forEach((btn) => {
    btn.onclick = () => {
      const tz = btn.dataset.timezoneChoice;
      settings.timezone = tz;
      AppearancePreferences.apply(settings);
      saveSettings({ timezone: tz });
      updateTimezoneUI();
      applyTimezoneRegion(tz);
      activeBudget = null;
      settings.budget = null;
      if ($('budgetInput')) $('budgetInput').value = '';
      saveSettings({ budget: null });
      scheduleBudget(0, false);
      banner();
      menu();
      const lang = settings.language || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      const name = btn.querySelector('.tz-city')?.textContent || tz;
      toast(`${tDict.timezone_heading}: ${name}`);
    };
  });

  if ($('timezoneSelect')) {
    $('timezoneSelect').onchange = (e) => {
      settings.timezone = e.target.value;
      AppearancePreferences.apply(settings);
      saveSettings({ timezone: settings.timezone });
      updateTimezoneUI();
      applyTimezoneRegion(settings.timezone);
      activeBudget = settings.budget = null;
      $('budgetInput').value = '';
      saveSettings({ budget: null });
      scheduleBudget(0, false);
      banner();
      menu();
      const lang = settings.language || 'vi';
      const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      toast(`${tDict.timezone_heading}: ${e.target.options[e.target.selectedIndex].text}`);
    };
  }

  $('themeBtn').onclick = () => open($('themeDialog'));
  if ($('mapsHeaderBtn')) {
    $('mapsHeaderBtn').onclick = () => {
      const lang = document.documentElement.lang || 'vi';
      let query = 'quán ăn ngon gần đây';
      if (lang === 'ja') query = '近くの美味しいお店';
      else if (lang === 'ko') query = '근처 맛집';
      else if (lang === 'zh') query = '附近美食';
      else if (lang === 'en') query = 'good food near me';
      window.open(
        `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query })}`,
        '_blank',
        'noopener,noreferrer'
      );
    };
  }
  if ($('langBtn')) {
    $('langBtn').onclick = () => open($('languageDialog'));
  }
  document.querySelectorAll('[data-appearance-choice]').forEach(
    (button) =>
      (button.onclick = () => {
        settings.appearance = button.dataset.appearanceChoice;
        updateTheme();
        saveSettings({ appearance: settings.appearance });
      })
  );
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (settings.appearance === 'system') updateTheme();
  });

  function updateSound() {
    audioSystem.isMuted = settings.muted;
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const label = settings.muted ? tDict.tool_sound_on : tDict.tool_sound_off;
    UI.button($('soundBtn'), settings.muted ? 'volume-x' : 'volume-2', label, true);
    $('soundBtn').setAttribute('aria-label', label);
    $('soundBtn').setAttribute('aria-pressed', String(settings.muted));
  }
  $('uniqueInput').checked = settings.unique;
  updateSound();
  updateTheme();
  applyTimezoneRegion(settings.timezone || 'auto');
  applyLanguage(settings.language || 'vi');
  setInterval(updateTimezoneUI, 10000);

  $('uniqueInput').onchange = (e) => {
    settings.unique = e.target.checked;
    saveSettings({ unique: settings.unique });
    scheduleBudget(0, false);
  };
  $('soundBtn').onclick = () => {
    settings.muted = !settings.muted;
    updateSound();
    saveSettings({ muted: settings.muted });
    const lang = settings.language || 'vi';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    if (!settings.muted) audioSystem.playClick();
    toast(settings.muted ? t.sound_disabled : t.sound_enabled);
  };
  // 03. Dialog lifecycle and keyboard focus
  const dialogFocus = new WeakMap();
  let savedScrollY = 0;
  function open(dialog, preserve = false) {
    CustomControls.closeAll();
    if (!preserve) returnFocus = document.activeElement;
    dialogFocus.set(dialog, document.activeElement);
    if (!document.querySelector('dialog[open]')) savedScrollY = scrollY;
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add('dialog-open');
    Experience.dialog(dialog);
  }
  function close(dialog, restore = true) {
    dialog.close();
    if (!document.querySelector('dialog[open]'))
      document.documentElement.classList.remove('dialog-open');
    let target = dialogFocus.get(dialog) || returnFocus;
    if (target?.closest('dialog') && !target.closest('dialog').open) target = $('mobileMenuBtn');
    if (restore && target?.isConnected) target.focus({ preventScroll: true });
    if (!document.querySelector('dialog[open]'))
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
  }
  $('spinDialog').addEventListener('close', () => roulette.release());
  document.querySelectorAll('dialog').forEach((dialog) => {
    dialog
      .querySelectorAll('[data-close]')
      .forEach((button) => (button.onclick = () => close(dialog)));
    dialog.addEventListener('cancel', (e) => {
      e.preventDefault();
      if (dialog === $('spinDialog')) roulette.skip();
      else close(dialog);
    });
  });
  // Personal taste controls and dish actions; collection counts are independent.
  function personalControls() {
    $('cravingInput').value = personal.craving;
    $('avoidRecentInput').checked = personal.avoidRecent;
    CustomControls.syncAll();
  }
  function personalChanged(saved = true) {
    personalControls();
    scheduleBudget(0, false);
    if (!saved) toast(UICopy.text('preferencesError'));
  }
  personalControls();
  $('cravingInput').onchange = (e) =>
    personalChanged(personal.configure('craving', e.target.value));
  $('avoidRecentInput').onchange = (e) =>
    personalChanged(personal.configure('avoidRecent', e.target.checked));
  $('resetTasteBtn').onclick = () => personalChanged(personal.configure('craving', 'all'));
  window.addEventListener('storage', (event) => {
    if (event.key !== null && !event.key.startsWith(personal.prefix)) return;
    if (busy) {
      personalSyncPending = true;
      return;
    }
    personal.reload();
    personalChanged();
    refreshPersonalActions();
  });
  function refreshPersonalActions() {
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    document.querySelectorAll('[data-personal-field]').forEach((button) => {
      const dish = allDishes.find((d) => d.id === button.dataset.dishId),
        state = personal.state(dish),
        field = button.dataset.personalField;
      const active = field === 'eaten' ? state.eaten > 0 : state[field];
      button.setAttribute('aria-pressed', String(active));
      button.textContent =
        field === 'favorite'
          ? active
            ? tDict.act_fav_active
            : tDict.act_fav
          : field === 'eaten'
            ? active
              ? tDict.act_eaten_active
              : tDict.act_eaten
            : active
              ? tDict.act_restore
              : tDict.act_hide;
    });
  }
  function personalActions(dish) {
    if (!Catalog.getDish(dish.id)) return document.createElement('div');
    const actions = document.createElement('div');
    actions.className = 'dish-personal-actions';
    for (const field of ['favorite', 'eaten', 'hidden']) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.personalField = field;
      button.dataset.dishId = dish.id;
      button.onclick = () => {
        if (busy) return;
        const state = personal.state(dish);
        const saved = personal.set(
          dish,
          field,
          field === 'eaten' ? (state.eaten ? 0 : Date.now()) : !state[field]
        );
        refreshPersonalActions();
        personalChanged(saved);
        if (saved && field === 'hidden')
          toast(
            personal.state(dish).hidden
              ? UICopy.text('hiddenNotice')
              : UICopy.text('restoredNotice')
          );
      };
      actions.append(button);
    }
    return actions;
  }
  $('personalView').onchange = (e) => {
    personalView = e.target.value;
    collectionOnly = false;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    visibleCount = 12;
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    menu();
  };
  // 04. Featured dish and category navigation
  function feature(dish) {
    featuredDish = dish || null;
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const isSame = dish && dish.id === lastFeaturedDishId && lang === lastFeaturedLang;
    lastFeaturedDishId = dish ? dish.id : null;
    lastFeaturedLang = lang;
    const captionEl = document.querySelector('.photo-caption');
    if (captionEl) {
      captionEl.textContent = '';
      captionEl.hidden = true;
    }
    $('findFeaturedBtn').disabled = !dish;
    document.querySelector('.hero').dataset.empty = String(!dish);
    const dName = dish
      ? typeof getDishName === 'function'
        ? getDishName(dish, lang)
        : dish.name
      : tDict.no_matching_dish || 'Chưa có món phù hợp';
    const dDesc = dish
      ? typeof getDishDesc === 'function'
        ? getDishDesc(dish, lang)
        : dish.desc
      : tDict.no_dish_budget_pref ||
        'Chưa có món khớp ngân sách và sở thích. Hãy bỏ lọc khẩu vị, tăng ngân sách hoặc khôi phục món đã ẩn.';
    $('featuredName').textContent = dName;
    $('featuredDesc').textContent = dDesc;
    $('featuredPrice').textContent = dish
      ? money(dish.price)
      : tDict.try_remove_filters || 'Thử bỏ bớt bộ lọc';
    if (!isSame) {
      UI.imageFallback($('featuredImage'));
      $('featuredImage').src = dish
        ? typeof Attribution !== 'undefined'
          ? Attribution.imageFor(dish)
          : dish.image
        : 'assets/brand.svg';
      Experience.feature(document.querySelector('.hero-copy'));
      Experience.feature($('featuredImage'));
    }
    $('featuredImage').alt = dish
      ? getDishName(dish, lang) + ' — ' + tDict.ref_photo
      : tDict.no_matching_dish || 'Chưa có món phù hợp bộ lọc';
  }
  function banner() {
    lastPeriod = getCurrentMealPeriod();
    const tz = settings.timezone || 'auto';
    const timeInfo = AppearancePreferences.getTimeOfDayInfo(tz);
    const isLate = timeInfo.isLateNight;
    const bannerEl = $('lateNightNotice');
    if (bannerEl) {
      bannerEl.hidden = !isLate;
    }
    const lang = settings.language || 'vi';
    const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

    if (isLate) {
      $('period').textContent = t.period_latenight;
      setTimeout(() => {
        toast(t.latenight_notice);
      }, 800);
    } else {
      const pKey = 'period_' + lastPeriod;
      $('period').textContent =
        t[pKey] || `${FOOD_DATABASE[lastPeriod].name.toUpperCase()} · MÓN VIỆT MỖI NGÀY`;
    }
    const group = engine.getCurrentBannerData();
    const modeTitles = {
      main: t.title_main || group.title,
      snacks: t.title_snacks || group.title,
      drinks: t.title_drinks || group.title,
    };
    const titleText = t.title_default;
    $('title').textContent = titleText;
    document.title = `${titleText} · ${t.brand_name}`;
    document
      .querySelectorAll('[data-mode]')
      .forEach((b) =>
        b.setAttribute('aria-pressed', String(b.dataset.mode === engine.currentMode))
      );
    feature(
      group.dishes.find(
        (d) =>
          personal.eligible(d, engine.currentMode === 'main' ? lastPeriod : engine.currentMode) &&
          (activeBudget === null || (engine.prices(d) && engine.prices(d).min <= activeBudget))
      )
    );
  }
  document.querySelectorAll('[data-mode]').forEach(
    (button) =>
      (button.onclick = () => {
        if (busy) return;
        engine.setMode(button.dataset.mode);
        banner();
        scheduleBudget(0, false);
      })
  );
  // 05. Collection progress and result cards
  function stats() {
    const s = engine.getCollectionStats();
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    $('collectionCount').textContent = `${s.unlocked} / ${s.total} ${tDict.dishes_unit || 'món'}`;
    $('collectionProgress').setAttribute('aria-valuemax', String(s.total));
    $('progressFill').style.width = `${s.percentage}%`;
    $('collectionProgress').setAttribute('aria-valuenow', String(s.unlocked));
    const tpl =
      tDict.collection_note_tpl ||
      'Đã khám phá {percent}% thực đơn · Đây là món đã gợi ý, không phải món đã ăn. Lưu trên trình duyệt này.';
    $('collectionNote').textContent = tpl.replace('{percent}', s.percentage);
  }
  function image(dish, lazy = true) {
    const img = new Image(400, 300);
    UI.imageFallback(img);
    img.src = typeof Attribution !== 'undefined' ? Attribution.imageFor(dish) : dish.image;
    img.alt = getDishName(dish) + ' — ' + t('ref_photo');
    img.loading = lazy ? 'lazy' : 'eager';
    img.decoding = 'async';
    return img;
  }
  function text(tag, content, className = '') {
    const el = document.createElement(tag);
    el.textContent = content == null ? '' : String(content);
    el.className = className;
    return el;
  }
  function showResults(results, detail = false, resultBudget = activeBudget, saved = true) {
    if (detail && busy) return;
    visibleResultState = { results, detail, resultBudget, saved };
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    $('resultSaveNotice').hidden = detail || saved;
    $('resultSaveNotice').textContent = saved
      ? ''
      : tDict.result_save_notice || UICopy.text('saveResultError', lang);
    $('resultTitle').textContent = detail
      ? tDict.result_detail_title
      : lastAction === 'combo'
        ? tDict.result_combo_title
        : results.length > 1
          ? tDict.result_triple_title
          : tDict.result_single_title;
    $('resultGrid').classList.toggle('single', results.length === 1);
    $('resultGrid').replaceChildren(
      ...results.map((result) => {
        const dish = result.dish,
          card = document.createElement('article');
        card.className = 'result-card';
        const body = document.createElement('div');
        body.className = 'dish-body';
        const catMap = {
          main: tDict.cat_main || 'Món Chính',
          morning: tDict.cat_main || 'Món Chính',
          lunch: tDict.cat_main || 'Món Chính',
          afternoon: tDict.cat_main || 'Món Chính',
          dinner: tDict.cat_main || 'Món Chính',
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };
        const mealId = dish.mealId || result.source;
        const pKey = 'period_' + mealId;
        const sourceName =
          catMap[mealId] || (tDict[pKey] ? tDict[pKey].split('·')[0].trim() : result.sourceName);
        const priceElem = text(
          'strong',
          `${tDict.hero_price_note || 'Giá tham khảo'}: ${money(dish.price)}`,
          'price'
        );
        const priceNote = document.createElement('em');
        priceNote.className = 'price-disclaimer';
        priceNote.textContent =
          tDict.price_disclaimer || '* Giá tham khảo và có thể chênh lệch với thực tế';

        body.append(
          text('span', sourceName, 'dish-source'),
          text('h3', typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name),
          priceElem,
          priceNote,
          text(
            'span',
            `${result.isNew ? '✨ ' + tDict.is_new + ' · ' : ''}${tDict.discovered}: x${engine.collection[dish.id] || 0}`,
            'collected'
          )
        );
        if (dish.imageCredit) body.append(text('span', tDict.ref_photo, 'image-note'));
        const more = document.createElement('details');
        more.className = 'dish-more';
        more.open = false;
        const summary = text('summary', tDict.desc_and_source);
        const credit = text('a', tDict.photo_source_license, 'image-note');
        credit.href = 'credits.html#food-images';
        credit.target = '_blank';
        credit.rel = 'noopener';
        const resDesc = typeof getDishDesc === 'function' ? getDishDesc(dish, lang) : dish.desc;
        more.append(summary, text('p', resDesc), credit);
        const quote = getDishQuote(dish, lang);
        if (quote && quote !== resDesc) more.insertBefore(text('blockquote', quote), credit);
        if (typeof Attribution !== 'undefined' && Attribution.reviewRequired(dish))
          more.append(text('p', Attribution.note(lang), 'image-note'));
        const actions = personalActions(dish);
        if (results.length === 1) body.append(actions);
        else {
          const personalMore = document.createElement('details');
          personalMore.className = 'personal-more';
          personalMore.append(text('summary', tDict.fav_eaten_hide_title), actions);
          body.append(personalMore);
        }
        body.append(more);
        card.append(image(dish, false), body);

        // 3D Flip Card Container
        const flipWrapper = document.createElement('div');
        flipWrapper.className = 'flip-card';
        flipWrapper.setAttribute('data-flipped', 'true');
        flipWrapper.setAttribute('role', 'group');
        flipWrapper.setAttribute(
          'aria-label',
          `${getDishName(dish, lang)} - ${UICopy.text('flip', lang)}`
        );

        const flipInner = document.createElement('div');
        flipInner.className = 'flip-card-inner';

        const cardBack = document.createElement('div');
        cardBack.className = 'flip-card-back';
        cardBack.innerHTML = `
          <div class="card-back-ornament">
            <div class="card-back-glow"></div>
            <div class="card-back-symbol">✦</div>
            <div class="card-back-brand">${tDict.brand_name}</div>
            <div class="card-back-sub">${tDict.result_single_title || 'BỮA NGON HÔM NAY'}</div>
            <div class="card-back-hint">👆 ${UICopy.text('flip', lang)}</div>
          </div>
        `;

        const cardFront = document.createElement('div');
        cardFront.className = 'flip-card-front';
        cardFront.append(card);

        flipInner.append(cardBack, cardFront);
        flipWrapper.append(flipInner);

        return flipWrapper;
      })
    );

    CustomControls.refresh();
    refreshPersonalActions();
    $('rerollBtn').hidden = detail;
    open($('resultDialog'), !detail);
    $('resultScroll').scrollTop = 0;
    nearby.setDishes(results);
    const total = engine.totalPrice(results);
    $('resultCost').hidden = detail || !total;
    if (total && !detail) {
      const label = text(
        'strong',
        `${tDict.total_price_from}: ` + money(total.min) + ` · ${tDict.min_estimate}`
      );
      const note = text(
        'p',
        resultBudget === null
          ? tDict.total_min_note
          : `${tDict.round_budget_label}: ` +
              money(resultBudget) +
              ` · ${tDict.remains_from}: ` +
              money(Math.max(0, resultBudget - total.min)) +
              `. ${tDict.actual_price_may_vary}`,
        'note'
      );
      $('resultCost').replaceChildren(label, note);
    }
    Experience.reveal($('resultGrid').children);
    updateControls();
  }
  // 06. Menu search, filters and pagination
  function normalize(value) {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .trim();
  }
  function menu() {
    cancelAnimationFrame(collectionRefreshFrame);
    collectionRefreshFrame = 0;
    collectionRefreshPending = false;
    allDishes = engine.getAllDishesList();
    CustomControls.syncAll();
    stats();
    if (typeof buildFilters === 'function') buildFilters(settings.language || 'vi');
    const lang = settings.language || 'vi';
    const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
    const query = normalize(searchTerm);
    const base = allDishes.filter(
      (dish) =>
        (personalView === 'hidden' ? personal.state(dish).hidden : !personal.state(dish).hidden) &&
        (personalView !== 'favorite' || personal.state(dish).favorite) &&
        (personalView !== 'eaten' || personal.state(dish).eaten > 0) &&
        (filter === 'all' ||
          (filter === 'main'
            ? ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId)
            : dish.mealId === filter)) &&
        (filter !== 'drinks' || subDrinkFilter === 'all' || dish.filter === subDrinkFilter) &&
        (!collectionOnly || engine.collection[dish.id] > 0) &&
        (!query ||
          normalize(
            dish.name +
              ' ' +
              (typeof getDishName === 'function' ? getDishName(dish, lang) : '') +
              ' ' +
              dish.type
          ).includes(query))
    );
    const filtered = base.filter(
      (dish) =>
        personalView === 'hidden' ||
        activeBudget === null ||
        (engine.prices(dish) && engine.prices(dish).min <= activeBudget)
    );
    const signature = JSON.stringify([filter, searchTerm, personalView, collectionOnly, subDrinkFilter, activeBudget, engine.currentRegion]);
    if (menuFilterSignature && signature !== menuFilterSignature) menuPageNumber = 1;
    menuFilterSignature = signature;
    const pageCount = Math.max(1, Math.ceil(filtered.length / MENU_PAGE_SIZE));
    menuPageNumber = Math.min(menuPageNumber, pageCount);
    const offset = isMenuPage ? (menuPageNumber - 1) * MENU_PAGE_SIZE : 0;
    const shown = filtered.slice(offset, offset + (isMenuPage ? MENU_PAGE_SIZE : HOME_PREVIEW_SIZE));
    const pager = $('menuPagination');
    if (pager) {
      pager.hidden = !isMenuPage || pageCount < 2;
      if (isMenuPage) {
        const labels = {vi:['Trước','Sau','Trang'],en:['Previous','Next','Page'],ja:['前へ','次へ','ページ'],ko:['이전','다음','페이지'],zh:['上一页','下一页','页']}[lang] || ['Previous','Next','Page'];
        const makeLink = (label, page, disabled) => {
          const link = document.createElement(disabled ? 'span' : 'a');
          link.textContent = label;
          if (!disabled) {
            link.href = menuPageUrl(page);
            link.onclick = (event) => {
              if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              menuPageNumber = page;
              history.pushState(null, '', menuPageUrl(page));
              menu();
              $('menu').scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth' });
            };
          } else link.setAttribute('aria-disabled','true');
          return link;
        };
        const status = document.createElement('span');
        status.textContent = `${labels[2]} ${menuPageNumber} / ${pageCount}`;
        status.setAttribute('aria-current','page');
        pager.replaceChildren(makeLink('← ' + labels[0],menuPageNumber-1,menuPageNumber===1),status,makeLink(labels[1] + ' →',menuPageNumber+1,menuPageNumber===pageCount));
        history.replaceState(null,'',menuPageUrl(menuPageNumber));
      }
    }
    $('menuTitle').textContent = collectionOnly ? tDict.nav_collection : tDict.menu_heading;
    $('collectionToggle').setAttribute('aria-pressed', String(collectionOnly));
    $('clearSearch').hidden = !searchTerm;
    const noCollection =
      collectionOnly && !allDishes.some((dish) => engine.collection[dish.id] > 0);
    const reason =
      personalView !== 'all'
        ? tDict.empty_menu_msg
        : noCollection
          ? tDict.empty_collection || UICopy.text('emptyCollection', lang)
          : base.length && activeBudget !== null
            ? tDict.no_match_filter + ' ' + money(activeBudget)
            : tDict.no_match_filter;
    $('menuStatus').textContent =
      (budgetInvalid
        ? (tDict.budget_invalid_prefix || UICopy.text('checkAmount', lang) + ': ') +
          (activeBudget === null ? tDict.budget_unlimited : money(activeBudget)) +
          '. '
        : '') +
      (filtered.length
        ? `${tDict.viewing} ${shown.length} / ${filtered.length} ${tDict.dishes_unit}` +
          (collectionOnly ? ' ' + tDict.discovered_unit : '')
        : reason);
    $('menuEmpty').hidden = filtered.length > 0;
    $('menuEmptyMessage').textContent = reason;
    $('resetMenuBudget').hidden = activeBudget === null && !budgetInvalid;
    $('resetMenuBudget').disabled = busy;
    $('resetMenuFilters').textContent = noCollection
      ? tDict.menu_heading
      : tDict.reset_menu_filters;
    $('loadMoreBtn').hidden = isMenuPage || shown.length >= filtered.length;
    $('menuGrid').replaceChildren(
      ...shown.map((dish) => {
        const card = document.createElement('button');
        card.className = 'dish-card';
        card.type = 'button';
        const thumb = document.createElement('span');
        thumb.className = 'dish-thumb';
        thumb.append(image(dish));
        const catMap = {
          main: tDict.cat_main || 'Món Chính',
          morning: tDict.cat_main || 'Món Chính',
          lunch: tDict.cat_main || 'Món Chính',
          afternoon: tDict.cat_main || 'Món Chính',
          dinner: tDict.cat_main || 'Món Chính',
          snacks: tDict.cat_snacks,
          drinks: tDict.cat_drinks,
        };
        const pKey = 'period_' + dish.mealId;
        const sourceName =
          catMap[dish.mealId] || (tDict[pKey] ? tDict[pKey].split('·')[0].trim() : dish.mealName);
        const source = text('span', sourceName, 'dish-source');
        thumb.append(source);
        if (dish.imageCredit) thumb.append(text('span', dish.imageCredit, 'illustration-tag'));
        const body = document.createElement('span');
        body.className = 'dish-body';
        const count = engine.collection[dish.id] || 0;
        const dName = typeof getDishName === 'function' ? getDishName(dish, lang) : dish.name;
        body.append(text('span', dName, 'dish-name'), text('span', money(dish.price), 'price'));
        const status = text(
          'span',
          count ? tDict.collected + ' · x' + count : tDict.uncollected + ' · x0',
          count ? 'collected' : 'uncollected'
        );
        if (count) status.prepend(UI.icon('check'));
        body.append(status);

        const personalState = personal.state(dish);
        if (personalState.favorite || personalState.eaten || personalState.hidden)
          body.append(
            text(
              'span',
              [
                personalState.favorite ? '♥ ' + tDict.act_fav : '',
                personalState.eaten ? tDict.act_eaten : '',
                personalState.hidden ? tDict.hidden_badge : '',
              ]
                .filter(Boolean)
                .join(' · '),
              'personal-badges'
            )
          );
        card.append(thumb, body);
        card.onclick = () => showResults([{ dish, sourceName: dish.mealName }], true);
        return card;
      })
    );
    Experience.reveal($('menuGrid').children);
  }

  function buildDrinkSubFilters(currentLang = settings.language || 'vi') {
    const subContainer = $('drinkSubFilters');
    if (!subContainer) return;
    const subTabs = [
      { id: 'all', label: UICopy.text('drinkAll', currentLang) },
      { id: 'tra_sua', label: UICopy.text('drinkMilk', currentLang) },
      { id: 'ca_phe_tra', label: UICopy.text('drinkCoffee', currentLang) },
      { id: 'sinh_to_nuoc_ep', label: UICopy.text('drinkJuice', currentLang) },
      { id: 'nuoc_ngot', label: UICopy.text('drinkSoda', currentLang) },
    ];
    subContainer.replaceChildren(
      ...subTabs.map((tab) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'drink-sub-btn';
        btn.textContent = tab.label;
        btn.setAttribute('aria-pressed', String(subDrinkFilter === tab.id));
        btn.onclick = () => {
          subDrinkFilter = tab.id;
          visibleCount = 12;
          subContainer
            .querySelectorAll('button')
            .forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          menu();
        };
        return btn;
      })
    );
  }

  function buildFilters(currentLang = settings.language || 'vi') {
    const tDict = TRANSLATIONS[currentLang] || TRANSLATIONS.vi;
    const filterMap = {
      all: tDict.cat_all || 'Tất cả',
      main: tDict.cat_main || 'Món Chính',
      snacks: tDict.cat_snacks || 'Món Ăn Vặt',
      drinks: tDict.cat_drinks || 'Đồ Uống & Nước Ngọt',
    };
    const filterIds = ['all', 'main', 'snacks', 'drinks'];
    const existing = $('filters').querySelectorAll('button');
    if (!existing.length) {
      filterIds.forEach((id) => {
        const button = text('button', filterMap[id] || id);
        button.dataset.filter = id;
        button.setAttribute('aria-pressed', String(id === filter));
        button.onclick = () => {
          filter = id;
          if (filter === 'drinks') {
            if ($('drinkSubFilters')) $('drinkSubFilters').hidden = false;
            buildDrinkSubFilters(settings.language || 'vi');
          } else {
            if ($('drinkSubFilters')) $('drinkSubFilters').hidden = true;
          }
          visibleCount = 12;
          $('filters')
            .querySelectorAll('button')
            .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
          menu();
        };
        $('filters').append(button);
      });
    } else {
      existing.forEach((b) => {
        const fid = b.dataset.filter;
        if (filterMap[fid]) b.textContent = filterMap[fid];
        b.setAttribute('aria-pressed', String(fid === filter));
      });
    }
  }
  buildFilters(settings.language || 'vi');
  // 07. Selection availability and budget calculation
  function updateControls() {
    const ready =
      collectionReady &&
      !busy &&
      !budgetPending &&
      prepared &&
      prepared.signature === engine.signature(engine.currentMode, settings.unique, activeBudget);
    $('singleBtn').disabled = !ready || !prepared.availability.single;
    $('tripleBtn').disabled = !ready || !prepared.availability.triple;
    $('comboBtn').disabled = !ready || !prepared.availability.combo;
    $('rerollBtn').disabled =
      lastAction === 'custom'
        ? busy
        : !ready ||
          !(lastAction === 'combo'
            ? prepared.availability.combo
            : lastAction === 'triple'
              ? prepared.availability.triple
              : prepared.availability.single);
    document
      .querySelectorAll(
        '[data-mode],#uniqueInput,#budgetInput,#clearBudgetBtn,[data-budget],#cravingInput,#avoidRecentInput,#resetTasteBtn,[data-personal-field],[data-timezone-choice],[data-lang-choice],#timezoneSelect,#langBtn,#tzBtn,#tzPill,#customWheelBtn,#addDishBtn'
      )
      .forEach((el) => (el.disabled = busy));
    $('budgetStatus').setAttribute('aria-busy', String(budgetPending));
    $('findFeaturedBtn').disabled = busy || !featuredDish;
    CustomControls.syncAll();
  }
  let statusBeforeDraw = '';
  function lock(value) {
    const wasBusy = busy;
    if (value && !wasBusy) statusBeforeDraw = $('budgetStatus').textContent;
    busy = value;
    syncCacheActivity();
    if (value) $('budgetStatus').textContent = UICopy.text('drawing');
    else if (wasBusy) $('budgetStatus').textContent = statusBeforeDraw;
    if (!value && personalSyncPending) {
      personalSyncPending = false;
      personal.reload();
      personalChanged();
      refreshPersonalActions();
    }
    if (!value && collectionRefreshPending && !collectionRefreshFrame) {
      collectionRefreshFrame = requestAnimationFrame(() => {
        collectionRefreshFrame = 0;
        if (!busy) menu();
      });
    }
    updateControls();
  }
  function parseBudget(value) {
    return Money.parseBudget(value, getCurrentRegion());
  }
  function scheduleBudget(delay = 220, persist = true, isDirectTyping = false) {
    clearTimeout(budgetTimer);
    const generation = ++budgetGeneration;
    budgetPending = true;
    prepared = null;
    budgetInvalid = false;
    document
      .querySelectorAll('[data-budget]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    if (isDirectTyping && delay >= 300) {
      $('budgetPreviewNote').hidden = false;
      $('budgetPreviewNote').textContent = UICopy.text('budgetPrevious', null, {
        amount: activeBudget === null ? UICopy.text('unlimited') : money(activeBudget),
      });
    } else {
      $('budgetPreviewNote').hidden = true;
    }
    $('budgetStatus').textContent = UICopy.text('budgetChecking');
    updateControls();
    budgetTimer = setTimeout(() => {
      try {
        const amount = parseBudget($('budgetInput').value);
        const plan = engine.prepareSelection({
          mode: engine.currentMode,
          unique: settings.unique,
          budget: amount,
        });
        if (generation !== budgetGeneration) return;
        activeBudget = amount;
        prepared = plan;
        settings.budget = amount;
        budgetInvalid = false;
        $('budgetPreviewNote').hidden = true;
        $('budgetInput').setAttribute('aria-invalid', 'false');
        document
          .querySelectorAll('[data-budget]')
          .forEach((button) =>
            button.setAttribute('aria-pressed', String(Number(button.dataset.budget) === amount))
          );
        const lang = settings.language || 'vi';
        const tDict = TRANSLATIONS[lang] || TRANSLATIONS.vi;
        $('budgetLabel').textContent =
          amount === null
            ? tDict.budget_unlimited
            : money(amount) + ' / ' + (tDict.per_spin || 'lượt');
        const info = (available, minimum) =>
          available
            ? (tDict.can_pick_from || 'Có thể chọn · từ') + ' ' + money(minimum)
            : minimum === null
              ? tDict.not_enough_dishes || 'Chưa đủ món'
              : (tDict.need_at_least || 'Cần ít nhất') + ' ' + money(minimum);
        $('singleBudgetInfo').textContent =
          (tDict.dish_single_info || '1 món') +
          ': ' +
          info(plan.availability.single, plan.minimums.single);
        $('tripleBudgetInfo').textContent =
          (tDict.dish_triple_info || '3 món') +
          ': ' +
          info(plan.availability.triple, plan.minimums.triple);
        $('comboBudgetInfo').textContent =
          (tDict.dish_combo_info || 'Combo') +
          ': ' +
          info(plan.availability.combo, plan.minimums.combo);
        $('budgetStatus').textContent =
          amount === null
            ? tDict.budget_unlimited_status || 'Không giới hạn ngân sách.'
            : (tDict.budget_label_prefix || 'Ngân sách ') +
              money(amount) +
              ' / ' +
              (tDict.per_spin || 'lượt') +
              ' · ' +
              plan.eligibleSingleCount +
              ' ' +
              (tDict.dishes_eligible || 'món trong danh mục phù hợp') +
              ' · ' +
              (tDict.dish_triple_info || '3 món') +
              ': ' +
              (plan.availability.triple
                ? tDict.has_options || 'có lựa chọn'
                : tDict.not_enough_money_dishes || 'chưa đủ tiền hoặc số món') +
              ' · Combo: ' +
              (plan.availability.combo
                ? tDict.has_options || 'có lựa chọn'
                : tDict.not_enough_money || 'chưa đủ tiền') +
              '.';
        const tasteLabel = $('cravingInput').selectedOptions[0]?.textContent || '';
        if (personal.craving !== 'all')
          $('budgetStatus').textContent +=
            ' · ' + (tDict.craving_label || 'Món chính') + ': ' + tasteLabel;
        if (!plan.eligibleSingleCount)
          $('budgetStatus').textContent +=
            ' ' +
            (tDict.no_dish_budget_pref ||
              'Không còn món phù hợp; bỏ lọc khẩu vị hoặc khôi phục món đã ẩn.');
        const eligible = plan.pools.single.map((item) => item.dish);
        if (!featuredDish || !eligible.some((d) => d.id === featuredDish.id)) feature(eligible[0]);
        menu();
        if (persist) saveSettings({ budget: amount });
      } catch (error) {
        budgetInvalid = true;
        $('budgetPreviewNote').hidden = false;
        $('budgetPreviewNote').textContent = UICopy.text('budgetInvalid', null, {
          amount: activeBudget === null ? UICopy.text('unlimited') : money(activeBudget),
        });
        $('budgetInput').setAttribute('aria-invalid', 'true');
        $('budgetStatus').textContent = UICopy.error(error.message);
        $('budgetLabel').textContent = UICopy.text('checkAmount');
        ['singleBudgetInfo', 'tripleBudgetInfo', 'comboBudgetInfo'].forEach(
          (id) => ($(id).textContent = '')
        );
        menu();
      } finally {
        if (generation === budgetGeneration) {
          budgetPending = false;
          updateControls();
          if (settingsSyncPending && !busy && document.activeElement !== $('budgetInput'))
            queueMicrotask(syncSettings);
        }
      }
    }, delay);
  }
  // 08. Draw, animate and publish results once
  async function choose(action) {
    if (busy || budgetPending || !prepared) return;
    lock(true);
    let results;
    try {
      results =
        action === 'combo'
          ? await engine.drawCombo({ budget: activeBudget, prepared })
          : await engine.drawDishes({
              count: action === 'triple' ? 3 : 1,
              unique: settings.unique,
              budget: activeBudget,
              prepared,
            });
    } catch (error) {
      lock(false);
      toast(UICopy.error(error.message));
      scheduleBudget(0, false);
      return;
    }
    const rollBudget = activeBudget;
    lastAction = action;
    if (!$('resultDialog').open) returnFocus = document.activeElement;
    else close($('resultDialog'), false);
    lock(true);
    audioSystem.playClick();
    const reveal = async () => {
      const outcome = await engine.commitResults(results);
      if ($('spinDialog').open) close($('spinDialog'), false);
      lock(false);
      feature(results[0].dish);
      menu();
      showResults(results, false, rollBudget, outcome.saved);
      if (settingsSyncPending) syncSettings();
      audioSystem.playWin(4);
      if (!outcome.saved) toast(UICopy.text('saveResultError'));
    };
    if (motion.matches) reveal();
    else {
      open($('spinDialog'), true);
      const pool = [
        ...new Map(
          Object.values(prepared.pools)
            .flat()
            .filter((item) => item.source === results[0].source)
            .map((item) => [item.dish.id, item.dish])
        ).values(),
      ];
      roulette.start(results[0].dish, pool, reveal);
    }
  }
  $('singleBtn').onclick = () => choose('single');
  $('tripleBtn').onclick = () => choose('triple');
  $('comboBtn').onclick = () => choose('combo');
  $('rerollBtn').onclick = () =>
    lastAction === 'custom' ? $('customWheelSpinActionBtn').click() : choose(lastAction);
  $('skipBtn').onclick = () => roulette.skip();
  $('resultMapBtn').onclick = () => {
    const links = $('placesLinks').querySelectorAll('a');
    if (links.length === 1) links[0].click();
    else $('nearbyPanel').scrollIntoView({behavior: motion.matches ? 'instant' : 'smooth', block:'start'});
  };
  motion.addEventListener('change', () => {
    if (motion.matches) roulette.skip();
  });
  setInterval(() => {
    if (!busy && !document.hidden && lastPeriod !== getCurrentMealPeriod()) {
      banner();
      scheduleBudget(0, false);
    }
  }, 1000);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) roulette.skip();
    else if (!busy && lastPeriod !== getCurrentMealPeriod()) {
      banner();
      scheduleBudget(0, false);
    }
  });
  // Vòng quay tự chọn (Custom Wheel) & Kho tàng Món từ Vũ Trụ
  function hideCustomWheelAlert() {
    const alertBox = $('customWheelAlert');
    if (alertBox) alertBox.hidden = true;
  }

  function showCustomWheelAlert(msg) {
    const alertBox = $('customWheelAlert');
    const alertText = $('customWheelAlertText');
    if (alertBox && alertText) {
      alertText.textContent = msg;
      alertBox.hidden = false;
      alertBox.style.animation = 'none';
      alertBox.offsetHeight;
      alertBox.style.animation = 'wheelAlertShake 0.4s ease-in-out';
    }
  }

  function updateCustomWheelCount() {
    if (!$('customWheelInput') || !$('customWheelCount')) return;
    const lines = $('customWheelInput')
      .value.split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    $('customWheelCount').textContent = UICopy.text('listCount', null, { n: lines.length });
    if (lines.length >= 2) hideCustomWheelAlert();
  }

  if ($('customWheelBtn')) {
    $('customWheelBtn').onclick = () => {
      open($('customWheelDialog'));
      updateCustomWheelCount();
      hideCustomWheelAlert();
    };
  }

  if ($('customWheelInput')) {
    $('customWheelInput').oninput = () => {
      updateCustomWheelCount();
      hideCustomWheelAlert();
    };
  }

  if ($('customWheelClearBtn')) {
    $('customWheelClearBtn').onclick = () => {
      if ($('customWheelInput')) {
        $('customWheelInput').value = '';
        updateCustomWheelCount();
        hideCustomWheelAlert();
      }
    };
  }

  // Món từ Vũ Trụ (Universe Dish Picker)
  const universeSelected = new Set();
  let universeActiveCategory = 'all';
  let universeSearchTerm = '';
  let universeSearchTimer;
  const universeRows = new Map();

  function renderUniverseDishList() {
    const listEl = $('universeDishList');
    if (!listEl) return;
    const currentList = allDishes || [];
    const currentIds = new Set(currentList.map(dish => dish.id));
    for (const id of universeRows.keys()) if (!currentIds.has(id)) universeRows.delete(id);
    const query = normalize(universeSearchTerm);

    const filtered = currentList.filter((dish) => {
      const isMain = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId);
      const isSnack = dish.mealId === 'snacks';
      const isDrink = dish.mealId === 'drinks';

      if (universeActiveCategory === 'main' && !isMain) return false;
      if (universeActiveCategory === 'snacks' && !isSnack) return false;
      if (universeActiveCategory === 'drinks' && !isDrink) return false;

      if (query) {
        const dishName = normalize(getDishName(dish));
        const dishType = normalize(dish.type || '');
        if (!dishName.includes(query) && !dishType.includes(query)) return false;
      }
      return true;
    });

    if ($('universeCountAll')) $('universeCountAll').textContent = currentList.length;
    if ($('universeSelectedBadge'))
      $('universeSelectedBadge').textContent = UICopy.text('selected', null, {
        n: universeSelected.size,
      });
    if ($('universeConfirmCount')) $('universeConfirmCount').textContent = universeSelected.size;

    listEl.replaceChildren(
      ...filtered.map((dish) => {
        const key = JSON.stringify([dish.id, getDishName(dish), dish.price, dish.image, dish.mealId, settings.language, engine.currentRegion]);
        const cached = universeRows.get(dish.id);
        if (cached?.key === key) {
          cached.item.classList.toggle('selected', universeSelected.has(dish.id));
          cached.item.querySelector('input').checked = universeSelected.has(dish.id);
          return cached.item;
        }
        const item = document.createElement('label');
        item.className = 'universe-dish-item' + (universeSelected.has(dish.id) ? ' selected' : '');

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = universeSelected.has(dish.id);

        const thumb = document.createElement('img');
        thumb.src = typeof Attribution !== 'undefined' ? Attribution.imageFor(dish) : dish.image;
        thumb.alt = getDishName(dish);
        thumb.loading = 'lazy';
        UI.imageFallback(thumb);

        const info = document.createElement('div');
        info.className = 'universe-dish-info';

        const name = document.createElement('span');
        name.className = 'universe-dish-name';
        name.textContent = getDishName(dish);

        const meta = document.createElement('span');
        meta.className = 'universe-dish-meta';
        const catLabel = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId)
          ? t('cat_main')
          : dish.mealId === 'snacks'
            ? t('cat_snacks')
            : t('cat_drinks');
        meta.textContent = `${catLabel} · ${money(dish.price)}`;

        info.append(name, meta);
        item.append(cb, thumb, info);

        item.onclick = (e) => {
          if (e.target !== cb) cb.checked = !cb.checked;
          if (cb.checked) {
            universeSelected.add(dish.id);
            item.classList.add('selected');
          } else {
            universeSelected.delete(dish.id);
            item.classList.remove('selected');
          }
          if ($('universeSelectedBadge'))
            $('universeSelectedBadge').textContent = UICopy.text('selected', null, {
              n: universeSelected.size,
            });
          if ($('universeConfirmCount'))
            $('universeConfirmCount').textContent = universeSelected.size;
        };

        universeRows.set(dish.id, { key, item });
        return item;
      })
    );
  }

  if ($('customWheelUniverseBtn')) {
    $('customWheelUniverseBtn').onclick = () => {
      universeSelected.clear();
      const currentLines = ($('customWheelInput')?.value || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      for (const line of currentLines) {
        const dish = allDishes.find((d) => getDishName(d) === line);
        if (dish) universeSelected.add(dish.id);
      }

      open($('universeDishDialog'));
      renderUniverseDishList();
    };
  }

  document.querySelectorAll('.universe-tab').forEach((tab) => {
    tab.onclick = () => {
      document.querySelectorAll('.universe-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      universeActiveCategory = tab.dataset.category || 'all';
      renderUniverseDishList();
    };
  });

  if ($('universeDishSearch')) {
    $('universeDishSearch').oninput = (e) => {
      universeSearchTerm = e.target.value.trim();
      clearTimeout(universeSearchTimer);
      universeSearchTimer = setTimeout(renderUniverseDishList, 120);
    };
  }

  if ($('universeSelectAllBtn')) {
    $('universeSelectAllBtn').onclick = () => {
      const currentList = allDishes || [];
      const query = normalize(universeSearchTerm);
      currentList.forEach((dish) => {
        const isMain = ['morning', 'lunch', 'afternoon', 'dinner', 'main'].includes(dish.mealId);
        const isSnack = dish.mealId === 'snacks';
        const isDrink = dish.mealId === 'drinks';
        if (universeActiveCategory === 'main' && !isMain) return;
        if (universeActiveCategory === 'snacks' && !isSnack) return;
        if (universeActiveCategory === 'drinks' && !isDrink) return;
        if (query) {
          const dishName = normalize(getDishName(dish));
          const dishType = normalize(dish.type || '');
          if (!dishName.includes(query) && !dishType.includes(query)) return;
        }
        universeSelected.add(dish.id);
      });
      renderUniverseDishList();
    };
  }

  if ($('universeDeselectAllBtn')) {
    $('universeDeselectAllBtn').onclick = () => {
      universeSelected.clear();
      renderUniverseDishList();
    };
  }

  if ($('universeConfirmBtn')) {
    $('universeConfirmBtn').onclick = () => {
      if (universeSelected.size === 0) {
        toast(UICopy.text('pickNone'));
        return;
      }
      if ($('customWheelInput')) {
        $('customWheelInput').value = Array.from(universeSelected)
          .map((id) => {
            const dish = Catalog.getDish(id);
            return dish ? getDishName(dish) : null;
          })
          .filter(Boolean)
          .join('\n');
        updateCustomWheelCount();
        hideCustomWheelAlert();
      }
      close($('universeDishDialog'));
      toast(UICopy.text('pickLoaded', null, { n: universeSelected.size }));
    };
  }

  if ($('customWheelSpinActionBtn')) {
    $('customWheelSpinActionBtn').onclick = () => {
      const lines = ($('customWheelInput')?.value || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      if (lines.length === 0) {
        showCustomWheelAlert(UICopy.text('wheelEmpty'));
        return;
      }
      if (lines.length < 2) {
        showCustomWheelAlert(UICopy.text('wheelShort'));
        return;
      }
      if (busy) return;
      lastAction = 'custom';
      lock(true);
      hideCustomWheelAlert();
      if ($('resultDialog').open) close($('resultDialog'), false);
      close($('customWheelDialog'));

      // Pick winner
      const winnerName = lines[Math.floor(Math.random() * lines.length)];
      const matched = (allDishes || []).find(
        (d) =>
          normalize(getDishName(d)) === normalize(winnerName) ||
          normalize(d.name) === normalize(winnerName)
      );

      const winnerDish = matched || {
        id: 'custom_wheel_' + Date.now(),
        name: winnerName,
        rarity: 4,
        mealId: 'main',
        type: UICopy.text('customType'),
        image: 'assets/brand.svg',
        price: 0,
        desc: UICopy.text('customDesc'),
        quote: '',
        calories: 350,
      };

      // Construct reel candidates
      const reelPool = [];
      for (let i = 0; i < 20; i++) {
        const itemN = lines[i % lines.length];
        const m = (allDishes || []).find(
          (d) =>
            normalize(getDishName(d)) === normalize(itemN) || normalize(d.name) === normalize(itemN)
        );
        reelPool.push(m || { id: 'reel_' + i, name: itemN, rarity: 3, image: 'assets/brand.svg' });
      }

      const revealCustom = () => {
        lock(false);
        if ($('spinDialog').open) close($('spinDialog'), false);
        showResults([{ dish: winnerDish, isNew: false }], false);
        audioSystem.playWin(4);
      };
      if (motion.matches) revealCustom();
      else {
        open($('spinDialog'), true);
        roulette.start(winnerDish, reelPool, revealCustom);
      }
    };
  }

  // Custom Dish Submission & Synchronization (Backend Server + LocalStorage)
  function showCustomDishError(message, field) {
    const notice = $('customDishFormError');
    notice.textContent = message;
    notice.hidden = !message;
    if (field) {
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', 'customDishFormError');
      field.focus();
    }
  }
  let customUploadedImageBase64 = '';

  if ($('addDishBtn')) {
    $('addDishBtn').onclick = () => {
      showCustomDishError('');
      open($('addDishDialog'));
    };
  }

  if ($('customDishImageInput')) {
    $('customDishImageInput').onchange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        showCustomDishError(UICopy.text('tooLarge'), $('customDishImageInput'));
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => showCustomDishError(UICopy.text('invalid'), $('customDishImageInput'));
      reader.onload = (re) => {
        const img = new Image();
        img.onerror = () => showCustomDishError(UICopy.text('invalid'), $('customDishImageInput'));
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width,
            h = img.height;
          const maxDim = 640;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
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

  let customSubmissionPending = false,
    customSubmissionKey = '',
    customSubmissionId = null;
  if ($('addDishForm')) {
    $('addDishForm').addEventListener('input', () => {
      showCustomDishError('');
      $('addDishForm')
        .querySelectorAll('[aria-invalid]')
        .forEach((el) => el.removeAttribute('aria-invalid'));
    });
    $('addDishForm').onsubmit = async (e) => {
      e.preventDefault();
      if (customSubmissionPending) return;
      const name = $('customDishName').value.trim();
      if (!name) return;
      const mealId = $('customDishMeal').value || 'morning';
      let price;
      try {
        price = Money.parseBudget($('customDishPrice').value, getCurrentRegion()) ?? 0;
      } catch (error) {
        showCustomDishError(error.message);
        return;
      }
      const desc = $('customDishDesc').value.trim() || UICopy.text('customAdded');

      const payload = {
        region: getCurrentRegion(),
        name,
        mealId,
        price,
        desc,
        image: customUploadedImageBase64 || 'assets/brand.svg',
        type: UICopy.text('customType'),
        rarity: 4,
        calories: 350,
      };

      const submissionKey = JSON.stringify(payload);
      if (submissionKey !== customSubmissionKey || !customSubmissionId) {
        customSubmissionKey = submissionKey;
        customSubmissionId = CustomDishes.uuid();
      }
      payload.id = customSubmissionId;
      customSubmissionPending = true;
      $('submitCustomDishBtn').disabled = true;
      try {
        const saved = await CustomDishes.save(payload);
        addDishToRuntime(saved.dish);
        toast(UICopy.text(saved.local ? 'savedLocal' : 'savedServer'));
      } catch (error) {
        showCustomDishError(error.message);
        return;
      } finally {
        customSubmissionPending = false;
        $('submitCustomDishBtn').disabled = false;
      }
      customSubmissionId = null;

      close($('addDishDialog'));
      $('addDishForm').reset();
      customUploadedImageBase64 = '';
      if ($('customDishImagePreview')) $('customDishImagePreview').hidden = true;
    };
  }

  function addDishToRuntime(dish, render = true) {
    if (!dish || !dish.id) return;
    Catalog.upsertCustom(dish);
    engine.store?.registerIds([dish.id]);
    if (render) {
      personal.syncAllDishes(Catalog.getAllDishes());
      allDishes = engine.getAllDishesList();
      visibleCount = 12;
      scheduleBudget(0, false);
      menu();
    }
  }

  // Load backend and local custom dishes on initialization
  async function loadInitialCustomDishes() {
    const dishes = await CustomDishes.load();
    for (const dish of dishes) addDishToRuntime(dish, false);
    if (dishes.length) {
      personal.syncAllDishes(Catalog.getAllDishes());
      allDishes = engine.getAllDishesList();
      visibleCount = 12;
      scheduleBudget(0, false);
      menu();
    }
  }
  loadInitialCustomDishes();

  $('findFeaturedBtn').onclick = () => {
    if (featuredDish)
      showResults(
        [
          {
            dish: featuredDish,
            sourceName:
              allDishes.find((d) => d.id === featuredDish.id)?.mealName ||
              engine.getCurrentBannerData().name,
          },
        ],
        true
      );
  };
  $('dishSearch').addEventListener('input', (event) => {
    searchTerm = event.target.value;
    visibleCount = 12;
    menu();
  });
  $('clearSearch').onclick = () => {
    $('dishSearch').value = '';
    searchTerm = '';
    visibleCount = 12;
    menu();
    $('dishSearch').focus();
  };
  $('loadMoreBtn').onclick = () => {
    location.assign(menuPageUrl(1));
  };
  // 09. Navigation and collection views
  function setView(view) {
    ['homeNav', 'menuNav', 'collectionNav'].forEach((id) => $(id).removeAttribute('aria-current'));
    $(
      view === 'home' ? 'homeNav' : view === 'collection' ? 'collectionNav' : 'menuNav'
    ).setAttribute('aria-current', 'page');
  }
  $('homeNav').onclick = (event) => {
    if (isMenuPage) { event.preventDefault(); location.assign('./'); return; }
    collectionOnly = false;
    personalView = 'all';
    $('personalView').value = 'all';
    menu();
    setView('home');
  };
  $('menuNav').onclick = (event) => {
    if (!isMenuPage) { event.preventDefault(); location.assign(menuPageUrl(1)); return; }
    collectionOnly = false;
    visibleCount = 12;
    menu();
    setView('menu');
  };
  $('collectionNav').onclick = () => {
    if (!isMenuPage) { location.assign('menu.html?page=1&category=all&collection=true'); return; }
    personalView = 'all';
    $('personalView').value = 'all';
    collectionOnly = true;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    visibleCount = 12;
    menu();
    setView('collection');
    $('menu').scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth' });
  };
  $('collectionToggle').onclick = () => {
    collectionOnly = !collectionOnly;
    visibleCount = 12;
    menu();
    setView(collectionOnly ? 'collection' : 'menu');
  };
  $('budgetInput').addEventListener('input', () => scheduleBudget(350, true, true));
  $('clearBudgetBtn').onclick = () => {
    if (activeBudget === null && !budgetInvalid && $('budgetInput').value === '') {
      return;
    }
    $('budgetInput').value = '';
    scheduleBudget(180, true, false);
  };
  document.querySelectorAll('[data-budget]').forEach(
    (button) =>
      (button.onclick = () => {
        const targetAmount = Number(button.dataset.budget);
        if (
          activeBudget === targetAmount &&
          !budgetInvalid &&
          $('budgetInput').value === String(targetAmount)
        ) {
          return;
        }
        $('budgetInput').value = button.dataset.budget;
        scheduleBudget(180, true, false);
      })
  );
  $('resetMenuBudget').onclick = () => {
    if (!busy) {
      $('budgetInput').value = '';
      scheduleBudget(0);
    }
  };
  $('resetMenuFilters').onclick = () => {
    personalView = 'all';
    $('personalView').value = 'all';
    collectionOnly = false;
    filter = 'all';
    searchTerm = '';
    $('dishSearch').value = '';
    visibleCount = 12;
    $('filters')
      .querySelectorAll('button')
      .forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === 'all')));
    menu();
    setView('menu');
  };
  document.addEventListener('foodcollectionchange', () => {
    collectionRefreshPending = true;
    if (!busy && !collectionRefreshFrame)
      collectionRefreshFrame = requestAnimationFrame(() => {
        collectionRefreshFrame = 0;
        if (!busy) menu();
      });
  });
  engine.ready.then(() => {
    collectionReady = true;
    menu();
    updateControls();
  });
  // 10. Sharing, installation and offline readiness
  languageBindingsReady = true;
  new BrowserActions(open, toast);
  banner();
  menu();
  scheduleBudget(0, false);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data?.type === 'OFFLINE_STATUS')
        $('offlineReadiness').textContent = event.data.ready
          ? event.data.missing
            ? UICopy.text('offlinePartial')
            : UICopy.text('offlineReady')
          : UICopy.text('offlineMissing');
    });
    const checkOffline = () =>
      navigator.serviceWorker.controller?.postMessage({ type: 'OFFLINE_STATUS' });
    navigator.serviceWorker.addEventListener('controllerchange', checkOffline);
    window.addEventListener('online', checkOffline);
    window.addEventListener('load', () =>
      navigator.serviceWorker
        .register('./sw.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const worker = registration.installing;
            worker?.addEventListener('statechange', () => {
              if (worker.state === 'redundant')
                $('offlineReadiness').textContent = UICopy.text('offlineMissing');
            });
          });
          const offerUpdate = () => {
            if (
              !navigator.serviceWorker.controller ||
              !registration.waiting ||
              document.getElementById('updateAppBtn')
            )
              return;
            const button = document.createElement('button');
            button.id = 'updateAppBtn';
            button.textContent =
              {
                vi: 'Có bản mới · Cập nhật',
                en: 'Update available',
                ja: '更新があります',
                ko: '업데이트 가능',
                zh: '有可用更新',
              }[settings.language] || 'Update available';
            button.onclick = () => {
              const dirty = $('addDishDialog').open || $('customWheelDialog').open;
              if (busy || budgetPending || dirty) {
                toast(UICopy.text('updateWait'));
                return;
              }
              navigator.serviceWorker.addEventListener(
                'controllerchange',
                () => location.reload(),
                { once: true }
              );
              registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
            };
            $('offlineReadiness').after(button);
          };
          offerUpdate();
          registration.addEventListener('updatefound', () =>
            registration.installing?.addEventListener('statechange', offerUpdate)
          );
          checkOffline();
          navigator.serviceWorker.ready.then(checkOffline);
        })
        .catch(() => {
          $('offlineReadiness').textContent = UICopy.text('offlineUnavailable');
        })
    );
  } else $('offlineReadiness').textContent = UICopy.text('offlineUnavailable');

  // BGM control and gesture auto-start
  function updateBgmButton() {
    const btn = $('bgmBtn');
    if (btn) {
      const playing = audioSystem.isBgmPlaying;
      const lang = settings.language || 'vi';
      const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      btn.setAttribute('aria-pressed', String(playing));
      btn.classList.toggle('is-playing', playing);
      btn.setAttribute('aria-label', playing ? t.tool_bgm_off : t.tool_bgm);
      btn.title = playing ? t.tool_bgm_off : t.tool_bgm;
    }
  }

  if ($('bgmBtn')) {
    $('bgmBtn').onclick = () => {
      const isPlaying = audioSystem.toggleBgm();
      const lang = settings.language || 'vi';
      const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;
      updateBgmButton();
      toast(isPlaying ? t.bgm_enabled : t.bgm_disabled);
    };
  }

  function autoStartBgmOnGesture() {
    const handleGesture = () => {
      audioSystem.ensureContext();
      if (!settings.muted && !audioSystem.isBgmPlaying) {
        audioSystem.startBgm();
        updateBgmButton();
      }
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
    window.addEventListener('click', handleGesture, { once: true, passive: true });
    window.addEventListener('touchstart', handleGesture, { once: true, passive: true });
    window.addEventListener('keydown', handleGesture, { once: true, passive: true });
  }
  autoStartBgmOnGesture();
  window.applyLanguage = applyLanguage;
  window.applyTimezoneRegion = applyTimezoneRegion;
  window.getRegionFromTimezone = getRegionFromTimezone;
  window.getCurrentRegion = getCurrentRegion;
  function restoreMenuLocation(menuParams = new URLSearchParams(location.search)) {
    menuPageNumber = Math.max(1, Math.min(100000, Math.floor(Number(menuParams.get('page'))) || 1));
    filter = 'all';
    personalView = 'all';
    subDrinkFilter = 'all';
    if (['all','main','snacks','drinks'].includes(menuParams.get('category'))) filter = menuParams.get('category');
    searchTerm = (menuParams.get('query') || '').slice(0, 200);
    if (['all','hidden','favorite','eaten'].includes(menuParams.get('view'))) personalView = menuParams.get('view');
    collectionOnly = menuParams.get('collection') === 'true';
    if (['all','tra_sua','ca_phe_tra','sinh_to_nuoc_ep','nuoc_ngot'].includes(menuParams.get('drink'))) subDrinkFilter = menuParams.get('drink');
    $('dishSearch').value = searchTerm;
    $('personalView').value = personalView;
    buildDrinkSubFilters();
    $('drinkSubFilters').hidden = filter !== 'drinks';
    document.querySelectorAll('a[href="#home"]').forEach(link => link.href = './');
    const lang = settings.language || 'vi';
    $('menuBackLink').textContent = ({vi:'← Về trang chính',en:'← Back to home',ja:'← ホームへ',ko:'← 홈으로',zh:'← 返回首页'})[lang];
    menuFilterSignature = '';
    menu();
    setView(collectionOnly ? 'collection' : 'menu');
  }
  if (isMenuPage) {
    restoreMenuLocation(menuParams);
    window.addEventListener('popstate', () => {
      restoreMenuLocation();
      $('menu').scrollIntoView({ behavior: 'instant' });
    });
  }
  window.engine = engine;
});
