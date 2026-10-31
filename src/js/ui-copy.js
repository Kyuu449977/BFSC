/* Copy added by the upgrade; keys stay independent from region and currency. */
const UICopy = (() => {
  const messages = {
    vi: {
      addTitle: 'Thêm món của bạn',
      name: 'Tên món ăn / thức uống *',
      meal: 'Bữa ăn / danh mục',
      price: 'Giá tham khảo',
      description: 'Mô tả hương vị / ghi chú',
      image: 'Ảnh món ăn · tối đa 10 MiB',
      save: 'Lưu món vào thực đơn',
      cancel: 'Hủy',
      removeImage: 'Xóa ảnh',
      storage:
        'Có máy chủ hỗ trợ: món và ảnh bạn gửi được lưu vào danh mục dùng chung. Trên hosting tĩnh hoặc khi mất kết nối, món chỉ được lưu trên trình duyệt này.',
      duplicate:
        'Mỗi dòng là một lượt chọn. Dòng trùng làm tăng khả năng được chọn; vòng tự chọn không áp dụng ngân sách hoặc bộ lọc khẩu vị.',
      decimal:
        'Ví dụ: 12.50 hoặc 1,200.50. Dùng dấu chấm cho phần lẻ và dấu phẩy cho hàng nghìn. Để trống nếu không giới hạn.',
      drawing: 'Đang chọn món phù hợp…',
      savedLocal: 'Đã lưu món trên trình duyệt này.',
      savedServer: 'Đã thêm món vào danh mục dùng chung.',
      invalid: 'Thông tin món chưa hợp lệ. Hãy kiểm tra tên, giá, danh mục và ảnh.',
      tooLarge: 'Ảnh hoặc nội dung món vượt giới hạn cho phép.',
      response: 'Máy chủ trả phản hồi chưa hợp lệ. Vui lòng thử lại.',
      storageError: 'Không lưu được món trên thiết bị. Kiểm tra dung lượng và quyền lưu trữ.',
      seoTitle: 'Ăn Gì Đây? — Chọn một bữa ngon theo cách của bạn',
      seoDescription:
        'Khám phá 350 món thuộc năm vùng ẩm thực. Chọn một món, ba gợi ý hoặc combo; tùy chỉnh ngân sách, khẩu vị và giao diện theo ý bạn.',
      seoRandom: 'Gợi ý ngẫu nhiên có giảm lặp',
      seoRandomDesc: 'Chọn món chính, ăn vặt, đồ uống hoặc combo và xem kết quả sau vòng quay.',
      seoCustom: 'Vòng quay tự chọn',
      seoCustomDesc: 'Nhập danh sách riêng hoặc thêm món từ thực đơn vào vòng quay.',
      seoMaps: 'Tìm quán trên Google Maps',
      seoMapsDesc: 'Mở Google Maps theo tên món; xem địa chỉ, đánh giá và chỉ đường tại đó.',
      seoTheme: 'Âm thanh và giao diện của bạn',
      seoThemeDesc:
        'Chọn màu, sáng/tối, theo thiết bị hoặc theo thời gian; bật tắt nhạc tùy thích.',
    },
    en: {
      addTitle: 'Add your dish',
      name: 'Dish / drink name *',
      meal: 'Meal / category',
      price: 'Reference price',
      description: 'Flavor description / notes',
      image: 'Dish photo · up to 10 MiB',
      save: 'Save dish',
      cancel: 'Cancel',
      removeImage: 'Remove photo',
      storage:
        'With a supporting server, submitted dishes and photos join the shared catalog. On static hosting or without a connection, the dish is saved only in this browser.',
      duplicate:
        'Each line is one entry. Repeated lines increase its chance; custom spins do not apply catalog budgets or taste filters.',
      decimal:
        'Examples: 12.50 or 1,200.50. Use a decimal point and commas for thousands. Leave blank for no limit.',
      drawing: 'Choosing a suitable dish…',
      savedLocal: 'Saved in this browser.',
      savedServer: 'Added to the shared catalog.',
      invalid: 'Please check the dish name, price, category and photo.',
      tooLarge: 'The photo or dish content exceeds the allowed size.',
      response: 'The server returned an invalid response. Please try again.',
      storageError: 'Storage is unavailable. Check free space and browser permissions.',
      seoTitle: 'What to eat? — Find a meal your way',
      seoDescription:
        'Explore 350 dishes across five food regions. Pick one dish, three suggestions or a combo, with your own budget, tastes and appearance.',
      seoRandom: 'Random picks with less repetition',
      seoRandomDesc:
        'Choose mains, snacks, drinks or a combo and reveal the result after the spin.',
      seoCustom: 'Your own food wheel',
      seoCustomDesc: 'Enter a personal list or add dishes from the menu to your wheel.',
      seoMaps: 'Find places on Google Maps',
      seoMapsDesc: 'Open Maps with the dish name to see addresses, reviews and directions there.',
      seoTheme: 'Your sound and appearance',
      seoThemeDesc:
        'Choose colors and light, dark, device or time-based appearance; switch music on or off.',
    },
    ja: {
      addTitle: '料理を追加',
      name: '料理・飲み物の名前 *',
      meal: '食事・カテゴリ',
      price: '参考価格',
      description: '味の説明・メモ',
      image: '料理の写真 · 最大10 MiB',
      save: '料理を保存',
      cancel: 'キャンセル',
      removeImage: '写真を削除',
      storage:
        '対応するサーバーがある場合、送信した料理と写真は共有メニューに保存されます。静的ホスティングやオフライン時は、このブラウザだけに保存されます。',
      duplicate:
        '1行が1口です。同じ行を繰り返すと選ばれる確率が上がります。自由入力の抽選には予算・好みのフィルターは適用されません。',
      decimal:
        '例：12.50、1,200.50。小数はピリオド、桁区切りはカンマを使います。空欄なら上限なし。',
      drawing: '条件に合う料理を選んでいます…',
      savedLocal: 'このブラウザに保存しました。',
      savedServer: '共有メニューに追加しました。',
      invalid: '料理名、価格、カテゴリ、写真を確認してください。',
      tooLarge: '写真または内容がサイズ上限を超えています。',
      response: 'サーバーの応答が不正です。もう一度お試しください。',
      storageError: '保存できません。空き容量とブラウザの権限を確認してください。',
      seoTitle: '何食べる？ — あなたらしい一食を',
      seoDescription:
        '5つの地域から350品を探索。1品、3つの候補、セットを予算と好みに合わせて選べます。',
      seoRandom: '繰り返しを抑えたランダム提案',
      seoRandomDesc: '主食、おやつ、飲み物、セットを選んで抽選結果を楽しめます。',
      seoCustom: '自分だけの料理ルーレット',
      seoCustomDesc: 'リストを入力するか、メニューから料理を追加できます。',
      seoMaps: 'Googleマップでお店を探す',
      seoMapsDesc: '料理名でマップを開き、住所、口コミ、経路を確認できます。',
      seoTheme: '好みの音と画面',
      seoThemeDesc: '色や明暗、端末・時間に応じた表示を選び、音楽も切り替えられます。',
    },
    ko: {
      addTitle: '내 음식 추가',
      name: '음식 / 음료 이름 *',
      meal: '식사 / 분류',
      price: '참고 가격',
      description: '맛 설명 / 메모',
      image: '음식 사진 · 최대 10 MiB',
      save: '음식 저장',
      cancel: '취소',
      removeImage: '사진 삭제',
      storage:
        '지원 서버가 있으면 제출한 음식과 사진이 공유 메뉴에 저장됩니다. 정적 호스팅이나 연결이 없을 때는 이 브라우저에만 저장됩니다.',
      duplicate:
        '한 줄이 한 항목입니다. 같은 줄을 반복하면 선택 확률이 높아집니다. 직접 입력한 목록에는 예산과 취향 필터가 적용되지 않습니다.',
      decimal:
        '예: 12.50 또는 1,200.50. 소수점은 마침표, 천 단위는 쉼표를 사용하세요. 비워 두면 제한이 없습니다.',
      drawing: '조건에 맞는 음식을 고르는 중…',
      savedLocal: '이 브라우저에 저장했습니다.',
      savedServer: '공유 메뉴에 추가했습니다.',
      invalid: '이름, 가격, 분류와 사진을 확인하세요.',
      tooLarge: '사진이나 내용이 허용 크기를 초과했습니다.',
      response: '서버 응답이 올바르지 않습니다. 다시 시도하세요.',
      storageError: '저장할 수 없습니다. 여유 공간과 브라우저 권한을 확인하세요.',
      seoTitle: '오늘 뭐 먹지? — 나에게 맞는 한 끼',
      seoDescription:
        '다섯 지역의 음식 350가지를 살펴보세요. 예산과 취향에 맞춰 한 가지, 세 가지 추천 또는 세트를 고를 수 있습니다.',
      seoRandom: '반복을 줄인 무작위 추천',
      seoRandomDesc: '주식, 간식, 음료 또는 세트를 선택하고 룰렛 결과를 확인하세요.',
      seoCustom: '나만의 음식 룰렛',
      seoCustomDesc: '목록을 직접 입력하거나 메뉴에서 음식을 추가하세요.',
      seoMaps: 'Google 지도에서 식당 찾기',
      seoMapsDesc: '음식 이름으로 지도를 열어 주소, 리뷰와 길찾기를 확인하세요.',
      seoTheme: '내가 고르는 소리와 화면',
      seoThemeDesc: '색상, 밝기, 기기 또는 시간 기반 화면과 음악을 선택하세요.',
    },
    zh: {
      addTitle: '添加你的菜品',
      name: '菜品 / 饮品名称 *',
      meal: '餐段 / 分类',
      price: '参考价格',
      description: '风味描述 / 备注',
      image: '菜品照片 · 最大10 MiB',
      save: '保存菜品',
      cancel: '取消',
      removeImage: '删除照片',
      storage:
        '有配套服务器时，提交的菜品和照片会保存到共享菜单。使用静态托管或没有网络时，仅保存于此浏览器。',
      duplicate: '每行是一项。重复行会增加被选中的概率；自定义抽取不使用菜单预算或口味筛选。',
      decimal: '例如12.50或1,200.50。小数使用点，千位使用逗号；留空表示不限预算。',
      drawing: '正在选择符合条件的菜品…',
      savedLocal: '已保存于此浏览器。',
      savedServer: '已添加到共享菜单。',
      invalid: '请检查菜名、价格、分类和照片。',
      tooLarge: '照片或内容超过大小限制。',
      response: '服务器响应无效，请重试。',
      storageError: '无法保存，请检查剩余空间和浏览器权限。',
      seoTitle: '今天吃什么？— 找到适合你的一餐',
      seoDescription: '探索五个地区的350道菜品，按预算和口味选择一道菜、三个建议或套餐。',
      seoRandom: '减少重复的随机建议',
      seoRandomDesc: '选择主食、小吃、饮品或套餐，转动后查看结果。',
      seoCustom: '你的专属美食转盘',
      seoCustomDesc: '输入自己的清单，或从菜单中添加菜品。',
      seoMaps: '在Google地图上找餐馆',
      seoMapsDesc: '按菜名打开地图，在地图中查看地址、评价和路线。',
      seoTheme: '你的声音与界面',
      seoThemeDesc: '选择颜色、明暗、设备或时间模式，并随时开关音乐。',
    },
  };
  // Every row supplies all five locales; no Vietnamese fallback for these UI paths.
  const extra = `
mapsAction|Tìm quán|Find restaurants|お店を探す|식당 찾기|查找餐馆
dishInfo|Thông tin món|Dish details|料理の情報|음식 정보|菜品信息
priceInfo|Phân loại và giá|Category and price|分類と価格|분류 및 가격|分类与价格
photoInfo|Ảnh minh họa|Dish photo|料理の写真|음식 사진|菜品图片
settingsTitle|Cài đặt|Settings|設定|설정|设置
settingsAppearance|Giao diện|Appearance|表示|화면|外观
settingsRegion|Ngôn ngữ và vùng giờ|Language and time zone|言語とタイムゾーン|언어 및 시간대|语言与时区
settingsAudio|Âm thanh|Audio|音声|오디오|声音
settingsApp|Ứng dụng và chia sẻ|App and sharing|アプリと共有|앱 및 공유|应用与分享
settingsMaps|Tìm quán|Find restaurants|お店を探す|식당 찾기|查找餐馆
advancedFilters|Bộ lọc nâng cao|More filters|詳細フィルター|추가 필터|更多筛选
flip|Chạm để lật bài|Tap to reveal|タップしてめくる|탭하여 공개|轻触翻牌
menuLabel|Cài đặt|Settings|設定|설정|设置
addDish|Thêm món mới|Add a dish|料理を追加|음식 추가|添加菜品
tools|Công cụ và giao diện|Tools and appearance|ツールと表示|도구와 화면|工具与外观
mapsTool|Tìm quán trên Google Maps|Find restaurants on Google Maps|Googleマップでお店を探す|Google 지도에서 식당 찾기|在Google地图查找餐馆
collectionProgress|Tiến độ bộ sưu tập|Collection progress|コレクションの進捗|컬렉션 진행도|收藏进度
emptyCollection|Bạn chưa khám phá món nào.|You haven't discovered any dishes yet.|まだ料理を発見していません。|아직 발견한 음식이 없습니다.|你还没有探索任何菜品。
categories|Danh mục món ăn|Dish categories|料理の分類|음식 분류|菜品分类
recommended|Món gợi ý|Recommended dish|おすすめの料理|추천 음식|推荐菜品
choose|Chọn món|Choose a dish|料理を選ぶ|음식 선택|选择菜品
quickBudget|Ngân sách nhanh|Quick budgets|予算プリセット|빠른 예산|快捷预算
menuFilters|Lọc thực đơn|Menu filters|メニューフィルター|메뉴 필터|菜单筛选
drinkFilters|Phân loại đồ uống|Drink categories|飲み物の分類|음료 분류|饮品分类
quickNav|Điều hướng nhanh|Quick navigation|クイックナビゲーション|빠른 탐색|快捷导航
brandHome|Về đầu trang|Back to top|ページ先頭へ|맨 위로|返回顶部
invalidMoney|Ngân sách phải là số tiền hợp lệ.|Enter a valid budget amount.|有効な予算額を入力してください。|유효한 예산 금액을 입력하세요.|请输入有效预算金额。
staleSelection|Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.|The menu or budget changed. Please wait for recalculation.|メニューまたは予算が変わりました。再計算をお待ちください。|메뉴나 예산이 변경되었습니다. 다시 계산할 때까지 기다리세요.|菜单或预算已变更，请等待重新计算。
noSelection|Không có lựa chọn phù hợp. Hãy bỏ bớt bộ lọc hoặc khôi phục món đã ẩn.|No matching choices. Remove filters or restore hidden dishes.|条件に合う料理がありません。フィルターを解除するか料理を再表示してください。|조건에 맞는 음식이 없습니다. 필터를 해제하거나 숨긴 음식을 복원하세요.|没有匹配选项，请取消筛选或恢复隐藏菜品。
notUnique|Không đủ món khác nhau. Hãy chọn ít món hơn hoặc cho phép trùng.|Not enough distinct dishes. Choose fewer or allow repeats.|異なる料理が足りません。品数を減らすか重複を許可してください。|서로 다른 음식이 부족합니다. 개수를 줄이거나 중복을 허용하세요.|不同菜品不足，请减少数量或允许重复。
invalidSelection|Yêu cầu chọn món không hợp lệ.|Invalid selection request.|抽選の指定が不正です。|선택 요청이 올바르지 않습니다.|选菜请求无效。
mystery|Thẻ bài bí ẩn|Mystery card|秘密のカード|미스터리 카드|神秘卡牌
sponsorUnavailable|Quảng cáo hiện chưa tải được.|Advertisement unavailable right now.|広告を読み込めません。|현재 광고를 불러올 수 없습니다.|广告暂时无法加载。
sponsored|GỢI Ý TÀI TRỢ|SPONSORED|スポンサー|스폰서|赞助内容
selected|Đã chọn: {n} món|Selected: {n} dishes|選択済み：{n}品|선택: {n}개|已选：{n}道
listCount|{n} món trong danh sách|{n} entries in the list|リストに{n}件|목록에 {n}개|清单中有{n}项
wheelTitle|Vòng quay tự chọn|Custom food wheel|自分だけの料理ルーレット|나만의 음식 룰렛|自定义美食转盘
wheelEyebrow|TÙY CHỈNH THEO Ý BẠN|MAKE IT YOURS|自分好みに|내 취향대로|随心自定义
wheelDesc|Nhập mỗi lựa chọn trên một dòng, hoặc chọn món từ thực đơn.|Enter one option per line, or choose dishes from the menu.|1行に1つ入力するか、メニューから選んでください。|한 줄에 하나씩 입력하거나 메뉴에서 고르세요.|每行输入一个选项，或从菜单中选择。
wheelExample|Ví dụ:\\nCơm gà\\nMì xào\\nTrà sữa|Example:\\nChicken rice\\nStir-fried noodles\\nMilk tea|例：\\nチキンライス\\n焼きそば\\nミルクティー|예:\\n닭고기 덮밥\\n볶음면\\n밀크티|例如：\\n鸡肉饭\\n炒面\\n奶茶
universe|Chọn từ thực đơn|Choose from menu|メニューから選ぶ|메뉴에서 선택|从菜单选择
universeEyebrow|KHO TÀNG MÓN NGON|EXPLORE THE MENU|料理を探そう|맛있는 메뉴 탐색|探索美食菜单
clearAll|Xóa hết|Clear all|すべて消去|모두 지우기|全部清空
spinNow|Bắt đầu quay|Start spinning|ルーレットを回す|룰렛 시작|开始转动
selectAll|Chọn tất cả|Select all|すべて選択|모두 선택|全选
deselectAll|Bỏ chọn|Deselect all|選択解除|선택 해제|取消全选
addWheel|Thêm vào vòng quay|Add to wheel|ルーレットに追加|룰렛에 추가|加入转盘
pickNone|Bạn chưa chọn món nào.|You haven't selected any dishes.|料理が選択されていません。|선택한 음식이 없습니다.|尚未选择菜品。
pickLoaded|Đã thêm {n} món vào vòng quay.|Added {n} dishes to the wheel.|ルーレットに{n}品追加しました。|룰렛에 {n}개를 추가했습니다.|已将{n}道菜加入转盘。
wheelEmpty|Hãy nhập danh sách hoặc chọn món từ thực đơn.|Enter a list or choose dishes from the menu.|リストを入力するか、メニューから選んでください。|목록을 입력하거나 메뉴에서 고르세요.|请输入清单或从菜单选择。
wheelShort|Cần ít nhất 2 dòng để quay.|Enter at least 2 lines to spin.|抽選には2行以上必要です。|룰렛을 돌리려면 두 줄 이상 입력하세요.|至少输入两行才能转动。
customType|Món tự chọn|Custom choice|自分の選択肢|직접 입력한 선택|自定义选项
customDesc|Lựa chọn do bạn nhập vào vòng quay.|An option you entered in your custom wheel.|自分のルーレットに入力した選択肢です。|직접 룰렛에 입력한 선택입니다.|这是你在自定义转盘中输入的选项。
customAdded|Món do người dùng thêm.|A dish contributed by a user.|ユーザーが追加した料理です。|사용자가 추가한 음식입니다.|用户添加的菜品。
contribute|ĐÓNG GÓP THỰC ĐƠN|CONTRIBUTE A DISH|料理を追加|음식 등록|添加菜品
previewImage|Xem trước ảnh món ăn|Dish image preview|料理画像のプレビュー|음식 사진 미리보기|菜品图片预览
drinkAll|Tất cả đồ uống|All drinks|すべての飲み物|모든 음료|全部饮品
drinkMilk|Trà sữa & Matcha|Milk tea & matcha|ミルクティー・抹茶|밀크티와 말차|奶茶与抹茶
drinkCoffee|Cà phê & Trà trái cây|Coffee & fruit tea|コーヒー・フルーツティー|커피와 과일차|咖啡与水果茶
drinkJuice|Sinh tố & Nước ép|Smoothies & juices|スムージー・ジュース|스무디와 주스|冰沙与果汁
drinkSoda|Nước ngọt & Giải khát|Soft drinks & refreshments|ソフトドリンク|탄산음료와 청량음료|汽水与清凉饮品
preferencesError|Không lưu được sở thích. Thay đổi chỉ dùng trong phiên này.|Preferences could not be saved. Changes apply to this session only.|好みを保存できません。このセッションのみ適用されます。|취향을 저장하지 못했습니다. 현재 세션에만 적용됩니다.|无法保存偏好，更改仅适用于本次会话。
hiddenNotice|Đã ẩn món. Khôi phục trong Thực đơn → Món đã ẩn.|Dish hidden. Restore it in Menu → Hidden dishes.|料理を非表示にしました。メニューの非表示一覧で戻せます。|음식을 숨겼습니다. 메뉴의 숨긴 음식에서 복원하세요.|已隐藏菜品，可在菜单的隐藏菜品中恢复。
restoredNotice|Đã khôi phục món vào vòng quay.|Dish restored to the wheel.|料理を抽選対象に戻しました。|음식을 룰렛에 복원했습니다.|菜品已恢复到转盘。
saveResultError|Không lưu được bộ sưu tập. Kết quả vẫn dùng trong phiên này.|Collection could not be saved. Results remain available in this session.|コレクションを保存できません。結果はこのセッションで利用できます。|컬렉션을 저장하지 못했습니다. 결과는 현재 세션에서 볼 수 있습니다.|无法保存收藏，结果仍可在本次会话中使用。
budgetChecking|Đang kiểm tra ngân sách cho 1 món, 3 món và combo…|Checking budgets for one dish, three dishes and a combo…|1品・3品・セットの予算を確認中…|한 가지, 세 가지와 세트 예산 확인 중…|正在检查单道菜、三道菜和套餐预算…
budgetPrevious|Đang kiểm tra số tiền. Nội dung vẫn theo ngân sách trước: {amount}.|Checking the amount. Content still uses the previous budget: {amount}.|金額を確認中です。表示は前の予算（{amount}）を使用しています。|금액을 확인 중입니다. 이전 예산 {amount} 기준으로 표시합니다.|正在检查金额，内容仍使用之前的预算：{amount}。
budgetInvalid|Số tiền không hợp lệ. Nội dung vẫn theo ngân sách trước: {amount}. Hãy sửa số tiền hoặc bỏ giới hạn.|Invalid amount. Content still uses the previous budget: {amount}. Correct the amount or remove the limit.|金額が不正です。表示は前の予算（{amount}）を使用しています。修正するか上限を解除してください。|금액이 잘못되었습니다. 이전 예산 {amount} 기준입니다. 금액을 수정하거나 한도를 해제하세요.|金额无效，内容仍使用之前的预算：{amount}。请修改金额或取消限制。
checkAmount|Kiểm tra số tiền|Check the amount|金額を確認|금액 확인|检查金额
unlimited|Không giới hạn|Unlimited|上限なし|제한 없음|不限
offlinePartial|Chọn món offline sẵn sàng · một số ảnh/font chưa lưu.|Offline selection is ready; some images/fonts are not cached.|オフライン抽選を利用できます。一部の画像・フォントは未保存です。|오프라인 선택이 준비되었습니다. 일부 사진과 글꼴은 저장되지 않았습니다.|离线选菜已就绪，部分图片或字体尚未缓存。
offlineReady|Đã sẵn sàng offline|Ready for offline use|オフライン利用可能|오프라인 사용 준비 완료|离线使用已就绪
offlineNotice|Đang offline|You're offline|オフラインです|오프라인 상태|当前离线
offlineMissing|Chưa sẵn sàng offline. Hãy tải lại khi có mạng.|Offline use is not ready. Reload when online.|オフライン準備ができていません。オンラインで再読み込みしてください。|오프라인 준비가 안 됐습니다. 연결 후 새로고침하세요.|离线尚未就绪，请联网后重新加载。
offlineUnavailable|Trình duyệt này chưa hỗ trợ offline.|Offline use is unavailable in this browser.|このブラウザではオフライン機能を利用できません。|이 브라우저에서는 오프라인 기능을 사용할 수 없습니다.|此浏览器暂不支持离线功能。
updateWait|Hãy hoàn tất thao tác trước khi cập nhật.|Finish your current action before updating.|操作を完了してから更新してください。|현재 작업을 마친 뒤 업데이트하세요.|请先完成当前操作再更新。
updateAvailable|Có bản mới · Cập nhật|Update available|更新があります|업데이트 가능|有可用更新
installed|Đã thêm ứng dụng vào thiết bị.|App added to your device.|アプリを端末に追加しました。|기기에 앱을 추가했습니다.|已将应用添加到设备。
installing|Đang thêm ứng dụng vào thiết bị…|Adding the app to your device…|アプリを端末に追加中…|기기에 앱 추가 중…|正在将应用添加到设备…
localLink|Liên kết localhost chỉ mở trên máy này; hãy dùng liên kết LAN hoặc HTTPS cho thiết bị khác.|A localhost link only opens on this computer; use a LAN or HTTPS link on other devices.|localhostリンクはこの端末専用です。他の端末にはLANまたはHTTPSリンクを使ってください。|localhost 링크는 이 컴퓨터에서만 열립니다. 다른 기기에서는 LAN 또는 HTTPS 링크를 사용하세요.|localhost链接仅在本机打开，其他设备请使用局域网或HTTPS链接。
shareText|Chưa biết ăn gì? Cùng chọn một món ngon nhé.|Not sure what to eat? Let's find something delicious.|何を食べる？おいしい一品を見つけよう。|뭘 먹을지 고민되나요? 맛있는 음식을 골라 보세요.|不知道吃什么？一起来选道美食。
linkCopied|Đã sao chép đường dẫn.|Link copied.|リンクをコピーしました。|링크를 복사했습니다.|链接已复制。
shareUrl|Đường dẫn website|Website link|サイトのリンク|웹사이트 링크|网站链接
copyManually|Chọn và sao chép đường dẫn bên dưới.|Select and copy the link below.|下のリンクを選択してコピーしてください。|아래 링크를 선택하여 복사하세요.|请选择并复制下方链接。
installIos1|Mở website bằng Safari trên iPhone hoặc iPad.|Open the website in Safari on your iPhone or iPad.|iPhoneまたはiPadのSafariでサイトを開きます。|아이폰이나 아이패드의 Safari에서 웹사이트를 여세요.|在iPhone或iPad的Safari中打开网站。
installIos2|Chạm Chia sẻ rồi chọn “Thêm vào Màn hình chính”.|Tap Share, then Add to Home Screen.|共有をタップし「ホーム画面に追加」を選びます。|공유를 누른 뒤 홈 화면에 추가를 선택하세요.|轻触分享，然后选择添加到主屏幕。
installIos3|Chọn “Thêm” để hoàn tất.|Tap Add to finish.|「追加」をタップして完了します。|추가를 눌러 완료하세요.|轻触添加以完成。
installOther1|Mở menu trình duyệt trên thiết bị.|Open your browser menu.|ブラウザのメニューを開きます。|브라우저 메뉴를 여세요.|打开浏览器菜单。
installOther2|Chọn “Cài đặt ứng dụng” hoặc “Thêm vào màn hình chính” nếu có.|Choose Install app or Add to Home Screen if available.|「アプリをインストール」または「ホーム画面に追加」を選びます。|앱 설치 또는 홈 화면에 추가가 있으면 선택하세요.|如有安装应用或添加到主屏幕选项，请选择。
installOther3|Bạn vẫn dùng được website đầy đủ mà không cần cài.|All website features work without installation.|インストールなしでもすべての機能を利用できます。|설치 없이도 모든 웹사이트 기능을 사용할 수 있습니다.|无需安装也可使用网站全部功能。
defaultLanguage|Mặc định|Default|既定|기본|默认
customColor|Tự chọn màu|Custom color|カスタムカラー|사용자 색상|自定义颜色
close|Đóng|Close|閉じる|닫기|关闭
`;
  for (const row of extra.trim().split('\n')) {
    const [key, ...values] = row.split('|');
    ['vi', 'en', 'ja', 'ko', 'zh'].forEach((lang, i) => {
      if (!values[i]) throw new Error(`Missing UI translation: ${key}/${lang}`);
      messages[lang][key] = values[i].replace(/\\n/g, '\n');
    });
  }
  function text(key, language, values = {}) {
    const lang =
      language || (typeof document !== 'undefined' ? document.documentElement.lang : 'en');
    const message = messages[lang]?.[key] || messages.vi[key] || key;
    return message.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }
  function apply(language) {
    const setLabel = (node, label) => {
      const icon = node.tagName === 'BUTTON' && node.querySelector(':scope > svg.icon');
      if (icon) node.replaceChildren(icon, document.createTextNode(label));
      else node.textContent = label;
    };
    document.querySelectorAll('[data-copy]').forEach((node) => {
      setLabel(node, text(node.dataset.copy, language));
    });
    const labels = {
      '#customWheelTitle': 'wheelTitle',
      '#customWheelDialog .eyebrow': 'wheelEyebrow',
      '.custom-wheel-desc': 'wheelDesc',
      '#customWheelUniverseBtn': 'universe',
      '#customWheelClearBtn': 'clearAll',
      '#customWheelSpinActionBtn': 'spinNow',
      '#universeDishTitle': 'universe',
      '#universeDishDialog .eyebrow': 'universeEyebrow',
      '#universeSelectAllBtn': 'selectAll',
      '#universeDeselectAllBtn': 'deselectAll',
      '#universeDishDialog .universe-dialog-footer [data-close]': 'cancel',
      '#addDishDialog .eyebrow': 'contribute',
      '#customColorText': 'customColor',
      '[data-lang-choice="vi"] .lang-sub': 'defaultLanguage',
      '#updateAppBtn': 'updateAvailable',
      '#offlineStatus': 'offlineNotice',
      '#customWheelBtn': 'wheelTitle',
      '#addDishBtn': 'addDish',
      '#installDialog > [data-close]': 'close',
    };
    Object.entries(labels).forEach(([selector, key]) => {
      document.querySelectorAll(selector).forEach((node) => {
        const label = text(key, language);
        setLabel(node, label);
        if (node.hasAttribute('title')) node.title = label;
        if (node.dataset.tooltip) node.dataset.tooltip = label;
      });
    });
    document
      .querySelectorAll('dialog [data-close][aria-label]')
      .forEach((node) => node.setAttribute('aria-label', text('close', language)));
    document
      .getElementById('customWheelInput')
      ?.setAttribute('placeholder', text('wheelExample', language));
    document
      .getElementById('customDishPreviewImg')
      ?.setAttribute('alt', text('previewImage', language));
    document
      .getElementById('customThemeColor')
      ?.setAttribute('aria-label', text('customColor', language));
    document.getElementById('customDishPrice')?.setAttribute('placeholder', '0');
    const aria = {
      '.tools': 'tools',
      '.modes': 'categories',
      '.hero': 'recommended',
      '.choose': 'choose',
      '.budget-presets': 'quickBudget',
      '#filters': 'menuFilters',
      '#drinkSubFilters': 'drinkFilters',
      '.mobile-nav': 'quickNav',
      '.brand': 'brandHome',
      '#mobileMenuBtn': 'menuLabel',
      '.ad-shelf-label': 'sponsored',
      '.ad-shelf-section': 'sponsored',
      '.side-vine-slot': 'sponsored',
      '.responsive-sponsors': 'sponsored',
      '.seo-intro': 'seoTitle',
      '#placesLinks': 'mapsAction',
    };
    Object.entries(aria).forEach(([selector, key]) =>
      document
        .querySelectorAll(selector)
        .forEach((node) => node.setAttribute('aria-label', text(key, language)))
    );
    const selected = document.getElementById('universeSelectedBadge');
    if (selected)
      selected.textContent = text('selected', language, {
        n: document.querySelectorAll('#universeDishList input:checked').length,
      });
  }
  function error(message, language) {
    const keys = {
      'Ngân sách phải là số tiền hợp lệ.': 'invalidMoney',
      'Thực đơn hoặc ngân sách vừa thay đổi. Vui lòng chờ tính lại.': 'staleSelection',
      'Không có lựa chọn phù hợp với ngân sách hoặc sở thích. Hãy bỏ bớt bộ lọc hoặc khôi phục món đã ẩn.':
        'noSelection',
      'Không đủ món khác nhau. Hãy chọn ít món hơn hoặc tắt tùy chọn không trùng.': 'notUnique',
      'Yêu cầu chọn món không hợp lệ.': 'invalidSelection',
    };
    return keys[message] ? text(keys[message], language) : message;
  }
  return { text, apply, error };
})();
