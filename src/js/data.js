// Món ăn Việt bình dân. Giá tham khảo; không phải báo giá trực tiếp của quán.
const FOOD_DATABASE = {
  morning: {
    id: 'morning',
    name: 'Buổi Sáng',
    title: 'Hôm nay ăn gì cho bữa sáng?',
    bannerName: 'Bữa sáng đậm vị Việt',
    subtitle: 'Nạp năng lượng khởi đầu ngày mới tràn đầy hứng khởi',
    featured5Star: 'Phở tái lăn',
    bannerImage: 'images/buoi_sang/pho_bo.webp',
    theme: {
      accent: '#c84a28',
      bgGlow: 'rgba(200, 74, 40, 0.15)',
      heroSurface: '#fffaf8',
      border: '#f0dcd5',
    },
    dishes: [
      {
        id: 'sang_5_1',
        name: 'Phở tái lăn',
        rarity: 5,
        type: 'Món nước · bò xào',
        image: 'images/buoi_sang/pho_bo.webp',
        desc: 'Thịt bò xào lăn lửa lớn dậy mùi tỏi, gừng; chan nước dùng phở bò truyền thống thanh ngọt thơm ngát.',
        quote: 'Bò xào lăn lửa lớn xém cạnh đậm đà, nước dùng thơm ngát quế hồi.',
        calories: 450,
        tags: ['phở', 'bò', 'nước', 'hà nội'],
        price: 55000,
        priceRange: [45000, 70000],
        priceMin: 45000,
        priceMax: 70000,
      },
      {
        id: 'sang_5_2',
        name: 'Bún bò Huế',
        rarity: 5,
        type: 'Món nước cay thơm',
        image: 'images/buoi_sang/bun_bo_hue.webp',
        desc: 'Nước dùng ninh xương bò và mắm ruốc, thơm mùi sả ớt; ăn cùng bắp bò, giò heo và chả cua vàng ươm.',
        quote: 'Mùi sả nồng nàn quyện ruốc Huế cay xé lưỡi, giò heo béo ngậy.',
        calories: 520,
        tags: ['bún bò', 'huế', 'cay', 'đậm đà'],
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
      },
      {
        id: 'sang_5_3',
        name: 'Bánh mì chảo',
        rarity: 5,
        type: 'Món chảo xèo xèo',
        image: 'images/buoi_sang/banh_mi_chao.webp',
        desc: 'Chảo gang nóng hổi gồm trứng ốp la, pate thơm bùi, xúc xích, xíu mại và sốt tiêu đen sánh đậm đà chấm bánh mì.',
        quote: 'Chảo gang bưng ra còn sôi xèo xèo, lòng đỏ trứng béo ngậy chấm bánh mì giòn tan.',
        calories: 580,
        tags: ['bánh mì', 'chảo', 'trứng', 'pate'],
        price: 45000,
        priceRange: [35000, 60000],
        priceMin: 35000,
        priceMax: 60000,
      },
      {
        id: 'sang_4_1',
        name: 'Bánh cuốn',
        rarity: 4,
        type: 'Bánh tráng hấp nóng',
        image: 'images/buoi_sang/banh_cuon.webp',
        desc: 'Vỏ bánh tráng mỏng mềm mướt bọc nhân thịt băm mộc nhĩ nấm hương, rắc hành phi thơm nức ăn kèm chả lụa nước mắm chua ngọt.',
        quote: 'Vỏ mỏng tang mềm mướt, hành phi giòn rụm thơm nức mũi.',
        calories: 380,
        tags: ['bánh cuốn', 'chả lụa', 'hành phi', 'nhẹ bụng'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'sang_4_2',
        name: 'Hủ tiếu Nam Vang',
        rarity: 4,
        type: 'Hủ tiếu nước / khô',
        image: 'images/buoi_sang/hu_tieu.webp',
        desc: 'Sợi hủ tiếu dai dai chan nước dùng xương hầm mực khô thanh ngọt, ăn cùng tôm tươi, gan heo, thịt băm và trứng cút.',
        quote: 'Nước lèo ngọt thanh từ xương ống và tôm khô, sợi hủ tiếu dai mướt.',
        calories: 460,
        tags: ['hủ tiếu', 'nam vang', 'sài gòn', 'tôm'],
        price: 45000,
        priceRange: [40000, 55000],
        priceMin: 40000,
        priceMax: 55000,
      },
      {
        id: 'sang_4_3',
        name: 'Xôi xéo',
        rarity: 4,
        type: 'Xôi nếp béo bùi',
        image: 'images/buoi_sang/xoi_xeo.webp',
        desc: 'Xôi nếp cái hoa vàng đồ nghệ vàng ươm, đậu xanh xắt lát mỏng mịn béo ngậy, rưới mỡ gà thơm nức và rắc hành phi giòn.',
        quote: 'Đậu xanh thái mỏng mịn như lụa, mỡ gà vàng óng béo ngậy thơm nức.',
        calories: 420,
        tags: ['xôi', 'nếp', 'đậu xanh', 'hà nội'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'sang_3_1',
        name: 'Bánh mì pate',
        rarity: 3,
        type: 'Bánh mì kẹp truyền thống',
        image: 'images/buoi_sang/banh_mi_pate.webp',
        desc: 'Bánh mì nướng giòn rụm phết ngập pate gan béo bùi, chả lụa, bơ trứng gà, dưa leo ngò rí và sốt tương ớt chua ngọt cay nồng.',
        quote: 'Pate thơm nức béo ngậy cắn ngập miệng trong ổ bánh mì nóng giòn rụm.',
        calories: 360,
        tags: ['bánh mì', 'pate', 'nhanh gọn', 'tiện lợi'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'sang_3_2',
        name: 'Bún riêu cua',
        rarity: 3,
        type: 'Món bún chua thanh',
        image: 'images/buoi_sang/bun_rieu.webp',
        desc: 'Tô bún riêu cua đồng thơm lừng mùi giấm bỗng chua thanh, gạch cua xốp mềm béo ngậy ăn cùng đậu rán, cà chua và rau sống.',
        quote: 'Nước dùng chua dịu giấm bỗng, gạch cua béo ngậy tan ngay đầu lưỡi.',
        calories: 430,
        tags: ['bún riêu', 'cua', 'chua thanh', 'dân dã'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'sv_morning_banh_bao',
        name: 'Bánh bao nhân thịt',
        rarity: 3,
        type: 'Bánh hấp tiện lợi',
        image: 'images/sinh_vien/banh_bao.webp',
        desc: 'Bánh bao bốc khói nghi ngút, vỏ bột xốp mềm thơm mùi sữa bọc nhân thịt heo băm mộc nhĩ nấm hương và hai quả trứng cút.',
        quote: 'Cắn ngập chiếc bánh nóng hổi béo ngậy nhân thịt và trứng cút.',
        calories: 320,
        tags: ['bánh bao', 'trứng cút', 'ấm bụng', 'sáng'],
        price: 15000,
        priceRange: [12000, 20000],
        priceMin: 12000,
        priceMax: 20000,
      },
      {
        id: 'sv_morning_banh_gio',
        name: 'Bánh giò',
        rarity: 3,
        type: 'Bánh lá hấp mềm mịn',
        image: 'images/sinh_vien/banh_gio.webp',
        desc: 'Bánh bột gạo tẻ mềm mịn mướt bọc nhân thịt băm mộc nhĩ thơm nồng hạt tiêu đen, ăn cùng chả cốm hoặc giò lụa.',
        quote: 'Bột bánh giò mềm mượt núng nính, nhân thịt băm đậm đà cay thơm mùi tiêu.',
        calories: 310,
        tags: ['bánh giò', 'bột gạo', 'ấm nóng', 'truyền thống'],
        price: 15000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'more_morning_banh_uot',
        name: 'Bánh ướt',
        rarity: 3,
        type: 'Bánh mỏng thanh nhẹ',
        image: 'images/binh_dan/banh_uot.webp',
        desc: 'Từng lớp bánh ướt mỏng mềm mịn tráng tươi, ăn cùng chả lụa giòn sần sật, nem chua, giá đỗ chần, rau thơm và nước mắm chua ngọt.',
        quote: 'Bánh ướt mềm thanh nhẹ ăn kèm chả quế thơm phức và nước mắm chua ngọt.',
        calories: 300,
        tags: ['bánh ướt', 'chả lụa', 'sài gòn', 'thanh mát'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'more_morning_banh_mi_xiu_mai',
        name: 'Bánh mì xíu mại',
        rarity: 3,
        type: 'Bánh mì chấm nước súp',
        image: 'images/binh_dan/banh_mi_xiu_mai.webp',
        desc: 'Chén nước súp xíu mại thơm lừng khói bốc nghi ngút, viên xíu mại thịt heo mềm mọng nước, da heo giòn béo chấm bánh mì nóng giòn.',
        quote: 'Viên xíu mại mềm mọng tan trong miệng, nước súp cay nồng béo bùi.',
        calories: 420,
        tags: ['bánh mì', 'xíu mại', 'đà lạt', 'súp'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'sang_banh_tam_bi',
        name: 'Bánh tằm bì',
        rarity: 4,
        type: 'Đặc sản Tây Nam Bộ',
        image: 'images/regional/banh_tam_bi.webp',
        desc: 'Sợi bánh tằm dẻo mềm phủ bì heo xắt nhuyễn, thịt ba chỉ nạc mỡ đan xen, chan nước cốt dừa béo ngậy và nước mắm chua ngọt tỏi ớt.',
        quote: 'Sự kết hợp độc đáo giữa vị mặn của mắm và béo ngậy thơm nức của nước cốt dừa.',
        calories: 450,
        tags: ['bánh tằm', 'bì', 'miền tây', 'cốt dừa'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'sang_banh_uot_long_ga',
        name: 'Bánh ướt lòng gà',
        rarity: 4,
        type: 'Đặc sản phố núi Đà Lạt',
        image: 'images/regional/banh_uot_long_ga.webp',
        desc: 'Bánh ướt tráng mềm mượt ăn kèm thịt gà ta xé phay giòn dai, lòng mề gà bùi bùi, trứng non vàng ươm và nước mắm chua ngọt cay xè.',
        quote: 'Bánh ướt thanh mát hòa cùng thịt gà ta thả vườn giòn ngọt đậm vị cao nguyên.',
        calories: 440,
        tags: ['bánh ướt', 'lòng gà', 'đà lạt', 'đặc sản'],
        price: 40000,
        priceRange: [35000, 50000],
        priceMin: 35000,
        priceMax: 50000,
      },
    ],
  },
  lunch: {
    id: 'lunch',
    name: 'Buổi Trưa',
    title: 'Hôm nay ăn gì cho bữa trưa?',
    bannerName: 'Bữa trưa no tròn vị',
    subtitle: 'Nạp năng lượng bền bỉ cho một buổi chiều làm việc hiệu quả',
    featured5Star: 'Cơm tấm sườn bì chả',
    bannerImage: 'images/buoi_trua/com_tam.webp',
    theme: {
      accent: '#af4023',
      bgGlow: 'rgba(175, 64, 35, 0.15)',
      heroSurface: '#fff9f6',
      border: '#ebd6cd',
    },
    dishes: [
      {
        id: 'trua_5_1',
        name: 'Cơm tấm',
        rarity: 5,
        type: 'Cơm sườn nướng than hoa',
        image: 'images/buoi_trua/com_tam.webp',
        desc: 'Hạt cơm tấm thơm dẻo ăn cùng miếng sườn cốt lết nướng than hoa vàng ruộm óng ả sốt ướp mật ong, chả trứng béo bùi và bì heo giòn.',
        quote: 'Mùi khói sườn nướng than hoa thơm lừng góc phố, miếng sườn mọng nước mặn ngọt.',
        calories: 650,
        tags: ['cơm tấm', 'sườn nướng', 'sài gòn', 'kinh điển'],
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
      },
      {
        id: 'trua_5_2',
        name: 'Bún chả',
        rarity: 5,
        type: 'Bún thịt nướng than Hà Nội',
        image: 'images/buoi_trua/bun_cha.webp',
        desc: 'Tô nước mắm pha chua ngọt ấm nóng thả những viên chả băm nướng xém cạnh, chả miếng ba chỉ nướng thơm lừng ăn cùng bún tươi và rau ghém.',
        quote: 'Chả viên nướng xém thơm nức mũi mùi than củi, chấm ngập bún tươi lá tía tô.',
        calories: 540,
        tags: ['bún chả', 'hà nội', 'thịt nướng', 'nước mắm'],
        price: 50000,
        priceRange: [40000, 60000],
        priceMin: 40000,
        priceMax: 60000,
      },
      {
        id: 'trua_5_3',
        name: 'Cơm gà xối mỡ',
        rarity: 5,
        type: 'Cơm chiên gà da giòn',
        image: 'images/buoi_trua/com_ga.webp',
        desc: 'Hạt cơm chiên đảo vàng ruộm tơi xốp ăn kèm góc đùi gà xối mỡ da giòn rụm màu cánh gián, thịt bên trong mềm ngọt mọng nước chấm nước tương ớt.',
        quote: 'Miếng da gà xối mỡ giòn rôm rốp cắn đã miệng, cơm chiên vàng thơm phức.',
        calories: 680,
        tags: ['cơm gà', 'xối mỡ', 'da giòn', 'no lâu'],
        price: 45000,
        priceRange: [40000, 60000],
        priceMin: 40000,
        priceMax: 60000,
      },
      {
        id: 'trua_4_1',
        name: 'Mì Quảng',
        rarity: 4,
        type: 'Mì nước sệt đậm đà',
        image: 'images/buoi_trua/mi_quang.webp',
        desc: 'Sợi mì gạo cán dẹt vàng óng chan chút nước lèo tôm thịt hầm cô đặc đậm đà, ăn cùng tôm đất, trứng cút, đậu phộng rang và bánh tráng mè nướng.',
        quote: 'Sợi mì gạo dai dai đẫm sốt tôm thịt sánh vàng, bẻ miếng bánh tráng mè giòn rụm.',
        calories: 490,
        tags: ['mì quảng', 'đà nẵng', 'quảng nam', 'đậu phộng'],
        price: 40000,
        priceRange: [35000, 50000],
        priceMin: 35000,
        priceMax: 50000,
      },
      {
        id: 'trua_4_2',
        name: 'Bún thịt nướng',
        rarity: 4,
        type: 'Bún trộn sài gòn',
        image: 'images/buoi_trua/bun_thit_nuong.webp',
        desc: 'Tô bún tươi đầy đặn thịt heo nướng than mè thơm nức, chả giò giòn tan, mỡ hành xanh mướt, đậu phộng rang và đồ chua rưới nước mắm chua ngọt.',
        quote: 'Thịt nướng thơm ngát mùi sả mè, chả giò giòn tan quyện mỡ hành béo ngậy.',
        calories: 530,
        tags: ['bún thịt nướng', 'chả giò', 'mỡ hành', 'chua ngọt'],
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
      },
      {
        id: 'trua_3_1',
        name: 'Cơm rang dưa bò',
        rarity: 3,
        type: 'Cơm chiên đậm đà',
        image: 'images/buoi_trua/com_rang.webp',
        desc: 'Hạt cơm đảo săn giòn vàng óng xào cùng dưa cải chua giòn sần sật và từng lát bắp bò xào tỏi mềm ngọt đậm đà gia vị.',
        quote: 'Vị chua thanh giòn sần sật của dưa cải cân bằng trọn vẹn vị béo ngậy của thịt bò xào.',
        calories: 560,
        tags: ['cơm rang', 'dưa bò', 'hà nội', 'chua ngọt'],
        price: 45000,
        priceRange: [40000, 55000],
        priceMin: 40000,
        priceMax: 55000,
      },
      {
        id: 'trua_3_2',
        name: 'Phở trộn',
        rarity: 3,
        type: 'Phở khô chua ngọt',
        image: 'images/buoi_trua/pho_tron.webp',
        desc: 'Bánh phở tươi trộn đều tay cùng thịt gà xé phay hoặc bò xào mềm ngọt, đậu phộng rang giòn, hành phi thơm nức và nước sốt tương chua ngọt thanh mát.',
        quote: 'Sợi phở tươi mềm mướt quyện đẫm sốt chua ngọt, ăn kèm đu đủ chua cực kỳ thanh nhẹ.',
        calories: 460,
        tags: ['phở trộn', 'thanh mát', 'chua ngọt', 'mùa hè'],
        price: 40000,
        priceRange: [35000, 50000],
        priceMin: 35000,
        priceMax: 50000,
      },
      {
        id: 'sv_lunch_banh_canh',
        name: 'Bánh canh',
        rarity: 3,
        type: 'Món nước sợi dai tròn',
        image: 'images/sinh_vien/banh_canh.webp',
        desc: 'Tô bánh canh sợi bột gạo mềm dai trong veo chan nước dùng súp cua hầm xương ngọt lịm, ăn cùng thịt cua, chả cá và khoanh giò heo.',
        quote: 'Sợi bánh canh tròn mướt dẻo dai bơi trong nước lèo sền sệt ngọt thanh vị tôm cua.',
        calories: 440,
        tags: ['bánh canh', 'chả cá', 'nước súp', 'bình dân'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'sv_lunch_bun_mam',
        name: 'Bún mắm',
        rarity: 4,
        type: 'Đặc sản miền Tây sông nước',
        image: 'images/sinh_vien/bun_mam.webp',
        desc: 'Tô bún mắm đậm đà mùi mắm cá linh cá sặc nức mũi, ăn cùng thịt heo quay giòn bì, tôm tươi, mực giòn, cà tím và rau đắng bông súng.',
        quote: 'Hương mắm cá miền Tây nồng đượm khó cưỡng, ngập tràn hải sản và thịt heo quay.',
        calories: 550,
        tags: ['bún mắm', 'miền tây', 'heo quay', 'hải sản'],
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
      },
      {
        id: 'trua_cao_lau',
        name: 'Cao lầu Hội An',
        rarity: 4,
        type: 'Đặc sản phố cổ Hội An',
        image: 'images/regional/cao_lau.webp',
        desc: 'Sợi mì ngâm tro củi cù lao chàm dai giòn sần sật, thịt xíu mềm ngọt ngấm gia vị, tóp mỡ chiên giòn tan và chút nước xốt đậm đà rau sống Trà Quế.',
        quote: 'Từng sợi mì cao lầu màu vàng tro dai giòn sần sật mang trọn hồn phố cổ Hội An.',
        calories: 470,
        tags: ['cao lầu', 'hội an', 'thịt xá xíu', 'rau thơm'],
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
      },
      {
        id: 'more_lunch_com_chien',
        name: 'Cơm chiên thập cẩm',
        rarity: 3,
        type: 'Cơm chiên hạt tơi',
        image: 'images/binh_dan/com_chien.webp',
        desc: 'Cơm hạt tơi xốp rang vàng giòn đều tay cùng trứng gà, lạp xưởng Mai Quế Lộ, tôm khô, đậu hà lan ngọt và cà rốt xắt hạt lựu.',
        quote: 'Từng hạt cơm vàng óng rực rỡ xào thơm nức mùi trứng và lạp xưởng truyền thống.',
        calories: 560,
        tags: ['cơm chiên', 'thập cẩm', 'trứng', 'lạp xưởng'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'more_lunch_com_ca_man',
        name: 'Cơm cá mặn',
        rarity: 3,
        type: 'Cơm niêu chiên cá mặn',
        image: 'images/binh_dan/com_ca_man.webp',
        desc: 'Cơm niêu đất chiên xém đáy giòn tan trộn đều thịt cá thu mặn xé nhuyễn thơm lừng, ức gà xé, gừng tươi thái chỉ và tiêu đen cay nồng.',
        quote: 'Thịt cá mặn thơm nồng mằn mặn hòa cùng miếng cháy giòn tan khó lòng quên được.',
        calories: 520,
        tags: ['cơm chiên', 'cá mặn', 'gừng', 'đặc sản'],
        price: 40000,
        priceRange: [35000, 50000],
        priceMin: 35000,
        priceMax: 50000,
      },
      {
        id: 'more_lunch_bun_thai',
        name: 'Bún cá cay Hải Phòng',
        rarity: 4,
        type: 'Đặc sản đất Cảng',
        image: 'images/binh_dan/bun_thai.webp',
        desc: 'Tô bún cá rô đồng chiên giòn rụm trong nước dùng cay nồng chua ngọt đặc sản đất Cảng, ăn kèm dọc mùng giòn sần sật và thì là thơm ngát.',
        quote: 'Cá chiên giòn rụm chan nước dùng chua cay cay cực kỳ đã miệng.',
        calories: 460,
        tags: ['bún cá', 'hải phòng', 'dọc mùng', 'chua cay'],
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
      },
      {
        id: 'trua_bun_ca',
        name: 'Bún cá Nha Trang',
        rarity: 4,
        type: 'Bún cá thanh ngọt vị biển',
        image: 'images/regional/bun_ca.webp',
        desc: 'Bún cá nước trong veo nấu từ xương cá cờ ngọt lịm, chả cá thu chiên vàng dai giòn, sứa biển tươi giòn sần sật ăn kèm rau sống và ớt xiêm.',
        quote: 'Nước dùng trong veo ngọt lịm từ cá biển, chả cá dai giòn không hề tanh.',
        calories: 420,
        tags: ['bún cá', 'nha trang', 'sứa', 'thanh mát'],
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
      },
      {
        id: 'trua_com_hen',
        name: 'Cơm hến xứ Huế',
        rarity: 4,
        type: 'Đặc sản Cồn Hến xứ Huế',
        image: 'images/regional/com_hen.webp',
        desc: 'Bát cơm nguội trộn thịt hến xào đậm đà, tóp mỡ chiên phồng giòn rụm, bắp chuối thái mỏng, đậu phộng rang bùi và thìa mắm ruốc cay xè.',
        quote: 'Vị cay xé lưỡi đặc trưng của ớt và mắm ruốc Huế hòa cùng thịt hến xào thơm lừng.',
        calories: 430,
        tags: ['cơm hến', 'huế', 'tóp mỡ', 'cay nồng'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
    ],
  },
  afternoon: {
    id: 'afternoon',
    name: 'Buổi Chiều',
    title: 'Hôm nay ăn gì cho bữa xế?',
    bannerName: 'Bữa xế giòn rụm',
    subtitle: 'Nạp năng lượng tức thì với những món ăn đường phố cuốn hút',
    featured5Star: 'Bánh xèo miền Tây',
    bannerImage: 'images/buoi_chieu/banh_xeo.webp',
    theme: {
      accent: '#9d355f',
      bgGlow: 'rgba(157, 53, 95, 0.15)',
      heroSurface: '#fdf8fa',
      border: '#ebd6e0',
    },
    dishes: [
      {
        id: 'chieu_5_1',
        name: 'Bánh xèo',
        rarity: 5,
        type: 'Bánh xèo giòn rụm',
        image: 'images/buoi_chieu/banh_xeo.webp',
        desc: 'Vành bánh xèo to tròn mỏng tang màu vàng ươm giòn rụm, nhân ngập tôm đất, thịt ba chỉ, giá đỗ cuộn trọn trong lá cải xanh và rau rừng.',
        quote: 'Tiếng xèo xèo vui tai trên chảo gang, vành bánh giòn tan cuộn ngập lá cải non.',
        calories: 520,
        tags: ['bánh xèo', 'giòn', 'miền tây', 'rau sống'],
        price: 45000,
        priceRange: [35000, 60000],
        priceMin: 35000,
        priceMax: 60000,
      },
      {
        id: 'chieu_5_2',
        name: 'Gỏi cuốn',
        rarity: 5,
        type: 'Món cuốn thanh mát',
        image: 'images/buoi_chieu/goi_cuon.webp',
        desc: 'Bánh tráng mỏng cuộn tròn căng mọng tôm sú luộc đỏ au, thịt ba rọi mỏng mềm, bún tươi, hẹ xanh chấm ngập bát tương đen đậu phộng béo bùi.',
        quote: 'Cuốn tôm thịt trong veo nhìn rõ sắc hồng của tôm, chấm đẫm tương bơ đậu phộng.',
        calories: 280,
        tags: ['gỏi cuốn', 'tôm thịt', 'thanh đạm', 'healthy'],
        price: 30000,
        priceRange: [25000, 40000],
        priceMin: 25000,
        priceMax: 40000,
      },
      {
        id: 'chieu_4_1',
        name: 'Bánh khọt',
        rarity: 4,
        type: 'Bánh nướng khuôn giòn',
        image: 'images/buoi_chieu/banh_khot.webp',
        desc: 'Từng chiếc bánh tròn nhỏ nướng giòn rụm trên khuôn đất nung, đặt con tôm tươi cong tớn, rắc bột tôm cháy và mỡ hành thơm nức.',
        quote: 'Bánh khọt giòn rụm từ khuôn đất, cắn miếng tôm tươi giòn ngọt bùi.',
        calories: 420,
        tags: ['bánh khọt', 'vũng tàu', 'tôm', 'giòn tan'],
        price: 40000,
        priceRange: [35000, 50000],
        priceMin: 35000,
        priceMax: 50000,
      },
      {
        id: 'chieu_4_2',
        name: 'Bột chiên',
        rarity: 4,
        type: 'Bột chiên trứng giòn',
        image: 'images/buoi_chieu/bot_chien.webp',
        desc: 'Những khối bột gạo chiên cháy cạnh giòn tan trên chảo gang phẳng, đập thêm hai quả trứng gà vàng ươm, rắc hành lá ăn cùng đu đủ bào chua ngọt.',
        quote: 'Miếng bột giòn rụm bên ngoài mềm dẻo bên trong quyện trứng gà béo ngậy.',
        calories: 460,
        tags: ['bột chiên', 'trứng', 'sài gòn', 'ăn xế'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'chieu_3_1',
        name: 'Bánh bột lọc',
        rarity: 3,
        type: 'Bánh trần trong suốt',
        image: 'images/buoi_chieu/banh_bot_loc.webp',
        desc: 'Lớp vỏ bột năng luộc chín trong suốt dai giòn nhìn thấu con tôm sông đỏ au và miếng thịt mỡ kho đậm đà, chấm nước mắm ớt cay xé lưỡi.',
        quote: 'Vỏ bánh trong suốt dai giòn sần sật, cắn ngập con tôm đất thơm bùi.',
        calories: 320,
        tags: ['bánh bột lọc', 'huế', 'tôm', 'cay nồng'],
        price: 30000,
        priceRange: [25000, 40000],
        priceMin: 25000,
        priceMax: 40000,
      },
      {
        id: 'chieu_3_2',
        name: 'Súp cua',
        rarity: 3,
        type: 'Súp sền sệt bổ dưỡng',
        image: 'images/buoi_chieu/sup_cua.webp',
        desc: 'Bát súp nóng sánh đặc bốc khói đầy ắp thịt cua biển xé, trứng cút, bắp ngọt, nấm tuyết và nửa quả trứng bắc thảo béo ngậy ngập dầu mè tiêu đen.',
        quote: 'Súp cua sánh mịn nóng bỏng tay, trứng bắc thảo béo bùi ăn lúc xế chiều cực đã.',
        calories: 290,
        tags: ['súp cua', 'trứng bắc thảo', 'nóng hổi', 'bổ dưỡng'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'chieu_banh_can',
        name: 'Bánh căn Đà Lạt',
        rarity: 4,
        type: 'Bánh khuôn đất nung',
        image: 'images/regional/banh_can.webp',
        desc: 'Cặp bánh nướng khuôn đất giòn xốp nhân trứng cút béo bùi, chấm chén xíu mại ngập mỡ hành và ớt cay thơm nức mùi phố núi.',
        quote: 'Bánh căn giòn xốp nướng mộc mạc chấm ngập chén súp xíu mại cay nồng ấm bụng.',
        calories: 380,
        tags: ['bánh căn', 'đà lạt', 'xíu mại', 'trứng cút'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'chieu_banh_cong',
        name: 'Bánh cống Sóc Trăng',
        rarity: 4,
        type: 'Đặc sản miền Tây giòn xốp',
        image: 'images/regional/banh_cong.webp',
        desc: 'Chiếc bánh hình ống chiên ngập dầu vàng ươm giòn rụm nhân thịt băm đậu xanh bùi bùi, trên mặt là con tôm đất nguyên vỏ giòn tan cuộn rau cải cay.',
        quote: 'Vỏ bánh cống giòn tan thơm lừng vị đậu xanh, cắn ngập tôm đất ngọt lịm.',
        calories: 420,
        tags: ['bánh cống', 'sóc trăng', 'tôm', 'giòn tan'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'sv_afternoon_pha_lau',
        name: 'Phá lấu bánh mì',
        rarity: 4,
        type: 'Đặc sản lòng hầm nước dừa',
        image: 'images/sinh_vien/pha_lau.webp',
        desc: 'Chén phá lấu lòng bò nấu nước cốt dừa màu nâu cánh gián béo ngậy thơm nức ngũ vị hương, chấm bánh mì giòn tan ăn cùng nước tắc ớt chua cay.',
        quote: 'Lòng bò ninh mềm giòn sần sật béo ngậy nước cốt dừa, chấm ngập bánh mì nóng.',
        calories: 480,
        tags: ['phá lấu', 'bánh mì', 'nước dừa', 'sài gòn'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'chieu_banh_duc_nong',
        name: 'Bánh đúc nóng Hà Nội',
        rarity: 4,
        type: 'Bánh đúc dẻo quánh',
        image: 'images/regional/banh_duc.webp',
        desc: 'Bát bánh đúc bột gạo nấu sánh dẻo quánh, phủ ngập thịt heo xào mộc nhĩ nấm hương thơm lừng hạt tiêu, chan nước mắm chua ngọt ấm nóng và rau mùi.',
        quote: 'Bột bánh đúc dẻo quánh tan trong miệng hòa cùng vị mặn ngọt ấm áp của nước mắm.',
        calories: 340,
        tags: ['bánh đúc', 'nóng', 'hà nội', 'ấm bụng'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'chieu_banh_dap',
        name: 'Bánh đập hến xào',
        rarity: 3,
        type: 'Đặc sản Quảng Nam',
        image: 'images/regional/banh_dap.webp',
        desc: 'Bánh tráng nướng giòn rụm kẹp lớp bánh ướt mỏng mềm ở giữa, đập vỡ đôi xúc cùng đĩa hến xào hành răm thơm nức mũi chấm mắm nêm đậm đà.',
        quote: 'Tiếng đập bánh tráng giòn tan quyện lớp bánh ướt mềm, xúc trọn thìa hến xào cay nồng.',
        calories: 360,
        tags: ['bánh đập', 'hến xào', 'miền trung', 'mắm nêm'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
    ],
  },
  dinner: {
    id: 'dinner',
    name: 'Buổi Tối',
    title: 'Hôm nay ăn gì cho bữa tối?',
    bannerName: 'Bữa tối sum họp gia đình',
    subtitle: 'Những món nóng ấm, trọn vẹn yêu thương sau một ngày dài',
    featured5Star: 'Lẩu cua đồng bắp bò',
    bannerImage: 'images/buoi_toi/lau_thai.webp',
    theme: {
      accent: '#af4023',
      bgGlow: 'rgba(175, 64, 35, 0.15)',
      heroSurface: '#fff9f6',
      border: '#ebd6cd',
    },
    dishes: [
      {
        id: 'toi_5_1',
        name: 'Lẩu cua đồng bắp bò',
        rarity: 5,
        type: 'Món ăn gia đình · nhóm nhỏ',
        image: 'images/regional/vi/toi_5_1.webp',
        desc: 'Nồi lẩu riêu cua đồng thơm lừng gạch cua béo ngậy, bắp bò tươi giòn, đậu rán vàng ươm và rau mồng tơi mướt xanh.',
        quote: 'Nước lẩu riêu cua đồng chua thanh thơm ngậy, nhúng thịt bò hoa chuối ngon quên lối về.',
        calories: 520,
        tags: ['lẩu', 'cua đồng', 'bắp bò', 'tối'],
        price: 90000,
        priceRange: [75000, 120000],
        priceMin: 75000,
        priceMax: 120000,
      },
      {
        id: 'toi_5_2',
        name: 'Bún đậu mắm tôm',
        rarity: 5,
        type: 'Mẹt bún thập cẩm Hà Nội',
        image: 'images/buoi_toi/bun_dau.webp',
        desc: 'Mẹt bún lá cắt miếng, đậu mơ rán lướt ván giòn vỏ mềm ruột, chả cốm dẻo thơm, thịt chân giò luộc chấm bát mắm tôm đánh sủi bọt quất ớt cay nồng.',
        quote: 'Bát mắm tôm đánh sủi bọt thơm lừng cay xè, miếng đậu mơ nóng giòn chấm ngập lối.',
        calories: 580,
        tags: ['bún đậu', 'mắm tôm', 'chả cốm', 'hà nội'],
        price: 55000,
        priceRange: [45000, 70000],
        priceMin: 45000,
        priceMax: 70000,
      },
      {
        id: 'toi_5_3',
        name: 'Bò nướng lá lốt',
        rarity: 5,
        type: 'Món nướng than hoa thơm lừng',
        image: 'images/regional/vi/toi_5_3.webp',
        desc: 'Từng cuốn thịt bò băm tẩm ướp gia vị cuộn trong lá lốt bánh tẻ nướng than hoa xèo xèo thơm nức mũi, rắc đậu phộng mỡ hành cuộn bánh tráng rau sống.',
        quote: 'Hương lá lốt nướng than củi ngào ngạt lan tỏa cả góc phố, chấm mắm nêm đậm đà.',
        calories: 510,
        tags: ['bò nướng', 'lá lốt', 'mỡ hành', 'mắm nêm'],
        price: 65000,
        priceRange: [50000, 80000],
        priceMin: 50000,
        priceMax: 80000,
      },
      {
        id: 'toi_4_1',
        name: 'Ốc hương xào bơ tỏi',
        rarity: 4,
        type: 'Hải sản xào thơm ngậy',
        image: 'images/regional/vi/toi_4_1.webp',
        desc: 'Từng con ốc hương tươi sống xào lửa lớn cùng bơ thơm ngậy, tỏi phi vàng giòn rụm và ớt sừng cay nhẹ, chấm bánh mì giòn tan ăn đêm.',
        quote: 'Ốc hương giòn sần sật ngọt lịm đẫm sốt bơ tỏi sánh vàng quyến rũ.',
        calories: 420,
        tags: ['ốc hương', 'bơ tỏi', 'hải sản', 'ăn đêm'],
        price: 70000,
        priceRange: [55000, 90000],
        priceMin: 55000,
        priceMax: 90000,
      },
      {
        id: 'toi_4_2',
        name: 'Bò né hoa thiên lý',
        rarity: 4,
        type: 'Bò xào chảo gang nóng',
        image: 'images/buoi_toi/bo_ne.webp',
        desc: 'Miếng thịt bò mềm ngọt ướp tỏi xì dầu xào xèo xèo trên chảo gang cùng hoa thiên lý xanh mướt ngọt bùi, trứng ốp la lòng đào và bánh mì nóng.',
        quote: 'Bò né xèo xèo khói nghi ngút, hoa thiên lý ngọt bùi chấm bánh mì giòn rụm.',
        calories: 540,
        tags: ['bò né', 'hoa thiên lý', 'chảo gang', 'bổ dưỡng'],
        price: 55000,
        priceRange: [45000, 70000],
        priceMin: 45000,
        priceMax: 70000,
      },
      {
        id: 'toi_3_1',
        name: 'Cháo sườn sụn non',
        rarity: 3,
        type: 'Cháo bột xay mịn ấm bụng',
        image: 'images/buoi_toi/chao_suon.webp',
        desc: 'Bát cháo bột gạo xay ninh xương sánh mịn như kem, miếng sườn sụn non giòn sần sật ăn cùng quẩy giòn tan và ruốc thịt đậm đà rắc tiêu tía tô.',
        quote: 'Bát cháo sườn sánh mịn bốc khói ấm bụng đêm đông, quẩy giòn ngập ngụa.',
        calories: 380,
        tags: ['cháo sườn', 'ấm bụng', 'quẩy', 'hà nội'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'toi_3_2',
        name: 'Miến gà đồi nấm hương',
        rarity: 3,
        type: 'Miến dong nước dùng thanh ngọt',
        image: 'images/buoi_toi/mien_ga.webp',
        desc: 'Sợi miến dong dai mướt trong veo chan nước dùng gà ta luộc thanh ngọt vàng óng mỡ gà, thịt gà xé phay giòn dai và nấm hương thơm lừng lá chanh.',
        quote: 'Nước luộc gà ta vàng óng ngọt thanh tao, sợi miến dong dai ngon không bị nát.',
        calories: 420,
        tags: ['miến gà', 'thanh ngọt', 'ấm bụng', 'lá chanh'],
        price: 45000,
        priceRange: [35000, 55000],
        priceMin: 35000,
        priceMax: 55000,
      },
      {
        id: 'toi_mi_vit_tiem',
        name: 'Mì gà quay da giòn',
        rarity: 4,
        type: 'Món mì sợi tươi ngũ vị',
        image: 'images/regional/vi/toi_mi_vit_tiem.webp',
        desc: 'Sợi mì trứng tươi dai giòn ăn cùng góc đùi gà quay ngũ vị da giòn rụm màu nâu cánh gián, chan nước dùng xương hầm thanh ngọt và cải thìa.',
        quote: 'Da gà giòn thơm ngũ vị, thịt mềm mọng nước ăn cùng sợi mì trứng dai ngon.',
        calories: 580,
        tags: ['mì', 'gà quay', 'ngũ vị', 'bữa tối'],
        price: 55000,
        priceRange: [45000, 70000],
        priceMin: 45000,
        priceMax: 70000,
      },
      {
        id: 'toi_chao_long',
        name: 'Cháo lòng bánh hỏi',
        rarity: 4,
        type: 'Đặc sản Phú Yên Bình Định',
        image: 'images/regional/chao_long.webp',
        desc: 'Bát cháo huyết ninh nhừ ấm nóng rắc tiêu hành thơm lừng, đĩa lòng heo tươi luộc dồi sụn giòn béo ăn kèm đĩa bánh hỏi mỡ hành và chén mắm ớt.',
        quote: 'Cháo huyết thơm nồng ấm áp kết hợp lòng luộc giòn sần sật và bánh hỏi mỡ hành.',
        calories: 510,
        tags: ['cháo lòng', 'bánh hỏi', 'bình định', 'đặc sản'],
        price: 45000,
        priceRange: [35000, 60000],
        priceMin: 35000,
        priceMax: 60000,
      },
      {
        id: 'toi_lau_bo',
        name: 'Lẩu bò nhúng giấm',
        rarity: 5,
        type: 'Lẩu chua ngọt thanh mát',
        image: 'images/regional/lau_bo.webp',
        desc: 'Nồi nước dùng giấm gạo nấu nước dừa tươi thanh ngọt chua dịu điểm sả ớt, nhúng bắp bò hoa tươi tái mềm cuộn bánh tráng rau sống chấm mắm nêm.',
        quote: 'Thịt bò bắp nhúng giấm vừa chín tới mềm ngọt mọng nước chấm mắm nêm cay xè.',
        calories: 560,
        tags: ['lẩu bò', 'nhúng giấm', 'mắm nêm', 'cuốn'],
        price: 85000,
        priceRange: [70000, 110000],
        priceMin: 70000,
        priceMax: 110000,
      },
      {
        id: 'toi_nem_nuong',
        name: 'Nem nướng Ninh Hòa',
        rarity: 4,
        type: 'Đặc sản Nha Trang',
        image: 'images/regional/nem_nuong.webp',
        desc: 'Từng thanh nem thịt nướng than hoa óng ả thơm nức, bánh tráng chiên giòn rụm cuộn cùng xoài xanh, dưa leo chấm bát nước sốt tương tôm nếp ấm nóng.',
        quote: 'Nem nướng thơm lừng vị ngọt tự nhiên, nước chấm tương nếp tôm thịt vàng cam béo bùi.',
        calories: 490,
        tags: ['nem nướng', 'ninh hòa', 'nha trang', 'nước chấm nếp'],
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
      },
      {
        id: 'more_dinner_bun_hen',
        name: 'Bún bò giò heo Huế',
        rarity: 4,
        type: 'Món bún cay thơm nồng',
        image: 'images/regional/vi/more_dinner_bun_hen.webp',
        desc: 'Tô bún bò cay thơm nồng sả ớt ruốc Huế, khoanh giò heo hầm mềm béo ngậy và chả cua vàng ươm chuẩn vị cố đô.',
        quote: 'Khoanh giò heo ninh nhừ béo ngậy, nước súp cay nồng đậm đà sả ruốc.',
        calories: 550,
        tags: ['bún bò', 'giò heo', 'huế', 'bữa tối'],
        price: 50000,
        priceRange: [40000, 65000],
        priceMin: 40000,
        priceMax: 65000,
      },
    ],
  },
  snacks: {
    id: 'snacks',
    name: 'Món Ăn Vặt',
    title: 'Hôm nay ăn vặt món gì?',
    bannerName: 'Ăn vặt đường phố hot trend',
    subtitle: '37 món ăn vặt đường phố cay nồng, giòn rụm bùng nổ vị giác',
    featured5Star: 'Bánh tráng trộn khô bò',
    bannerImage: 'images/do_an_vat/banh_trang_tron.webp',
    theme: {
      accent: '#286743',
      bgGlow: 'rgba(40, 103, 67, 0.15)',
      heroSurface: '#f8faf9',
      border: '#dce6df',
    },
    dishes: [
      {
        id: 'vat_banh_trang_tron',
        name: 'Bánh tráng trộn',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_tron.webp',
        desc: 'Bánh tráng dẻo cắt sợi trộn đều cùng muối tôm Tây Ninh, khô bò đen, tép sấy, trứng cút, xoài băm, rau răm và rưới nước sốt tắc chua ngọt.',
        quote: 'Chua cay mặn ngọt bùng nổ trong từng sợi bánh tráng thấm đẫm sốt khô bò.',
        calories: 320,
        tags: ['bánh tráng', 'khô bò', 'sài gòn', 'ăn vặt'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_banh_trang_nuong',
        name: 'Bánh tráng nướng Đà Lạt',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_nuong.webp',
        desc: 'Được mệnh danh là pizza Việt Nam: nướng than hoa vàng giòn cùng trứng cút, hành hoa, phô mai, xúc xích và sốt bơ mayonnaise.',
        quote: 'Vỏ bánh tráng mỏng tang giòn rụm, nhân trứng phô mai béo ngậy thơm nức mũi.',
        calories: 360,
        tags: ['bánh tráng', 'nướng', 'đà lạt', 'phô mai'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_banh_trang_cuon_bo',
        name: 'Bánh tráng cuộn sốt bơ',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_cuon_bo.webp',
        desc: 'Bánh tráng phơi sương cuộn chặt tay với tép sấy, khô bò, trứng cút và ngập tràn sốt bơ dầu trứng vàng óng béo ngậy.',
        quote: 'Từng cuốn bánh tráng đẫm sốt bơ trứng dẻo mịn khiến ai nấy đều mê mẩn.',
        calories: 380,
        tags: ['bánh tráng cuộn', 'bơ trứng', 'ăn vặt'],
        price: 25000,
        priceRange: [20000, 30000],
        priceMin: 20000,
        priceMax: 30000,
      },
      {
        id: 'vat_banh_trang_cham_me',
        name: 'Bánh tráng chấm sốt me bơ',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_cham_me.webp',
        desc: 'Bánh tráng dẻo mềm xé sợi chấm vào chén sốt me sệt chua thanh pha bơ béo, đậu phộng rang và hành phi giòn.',
        quote: 'Nước sốt me sánh quyện chua ngọt kích thích tột độ vị giác.',
        calories: 290,
        tags: ['bánh tráng', 'sốt me', 'chua ngọt'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_banh_trang_kep',
        name: 'Bánh tráng kẹp Đà Nẵng',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_kep.webp',
        desc: 'Bánh tráng kẹp nhân pate gan, trứng ốp la hoặc bò khô nướng giòn trên lửa than, chấm nước sốt bò cay nồng.',
        quote: 'Pate gan béo bùi tan chảy trong lớp bánh tráng nướng giòn tan.',
        calories: 340,
        tags: ['đà nẵng', 'pate', 'bánh tráng kẹp'],
        price: 22000,
        priceRange: [18000, 30000],
        priceMin: 18000,
        priceMax: 30000,
      },
      {
        id: 'vat_ca_vien_chien_mam',
        name: 'Cá viên chiên sốt nước mắm',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/ca_vien_chien_mam.webp',
        desc: 'Mẹt cá viên, bò viên, tôm viên, xúc xích và đậu bắp chiên phồng đảo sốt nước mắm tỏi ớt kẹo lại đậm đà thơm ngát.',
        quote: 'Mùi tỏi ớt xào mắm kẹo thơm lừng phủ đều từng viên chả dai giòn sần sật.',
        calories: 420,
        tags: ['cá viên', 'nước mắm', 'chiên xù'],
        price: 35000,
        priceRange: [25000, 50000],
        priceMin: 25000,
        priceMax: 50000,
      },
      {
        id: 'vat_nem_chua_ran',
        name: 'Nem chua rán Hà Nội',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/nem_chua_ran.webp',
        desc: 'Nem chua tẩm bột chiên xù vàng ruộm, bên ngoài giòn tan bên trong dai dẻo ngậy thịt, chấm tương ớt cay xè chuẩn vị ngõ phố Hà Nội.',
        quote: 'Món ăn vặt kinh điển của bao thế hệ học sinh sinh viên đất Hà thành.',
        calories: 350,
        tags: ['hà nội', 'nem chua rán', 'chiên xù'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'vat_chan_ga_sa_tac',
        name: 'Chân gà sả tắc chua cay',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/chan_ga_sa_tac.webp',
        desc: 'Chân gà rút xương ngâm ngập nước mắm chua ngọt, sả cây xắt lát, quất thơm lừng và ớt xiêm xanh giòn sần sật.',
        quote: 'Vị giòn sần sật ngấm đều hương thơm sả tắc và vị chua cay đậm đà.',
        calories: 280,
        tags: ['chân gà', 'sả tắc', 'chua cay'],
        price: 45000,
        priceRange: [35000, 60000],
        priceMin: 35000,
        priceMax: 60000,
      },
      {
        id: 'vat_banh_mi_muoi_ot',
        name: 'Bánh mì nướng muối ớt',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_mi_muoi_ot.webp',
        desc: 'Bánh mì cán dẹp quét muối ớt nướng than giòn rụm, phủ chà bông, xúc xích, mỡ hành, sốt bơ và mayonnaise ngậy béo.',
        quote: 'Giòn tan rôm rốp cay mặn thơm nức từng miếng cắn.',
        calories: 310,
        tags: ['bánh mì', 'muối ớt', 'mỡ hành'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_khoai_lang_lac',
        name: 'Khoai lang lắc phô mai',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/khoai_lang_lac.webp',
        desc: 'Khoai lang mật vàng ươm cắt thanh chiên giòn rụm, lắc đều bột phô mai mặn ngọt béo thơm lừng khó cưỡng.',
        quote: 'Vị ngọt bùi tự nhiên của khoai mật hòa quyện bột phô mai thơm ngậy.',
        calories: 320,
        tags: ['khoai lang', 'phô mai', 'lắc'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_khoai_tay_lac',
        name: 'Khoai tây lắc xí muội phô mai',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/khoai_tay_lac.webp',
        desc: 'Khoai tây chiên giòn tan lắc bột xí muội chua ngọt hoặc bột phô mai thơm béo, món ăn kèm lý tưởng trong mọi cuộc tụ tập.',
        quote: 'Giòn rụm đậm vị chua mặn ngọt xí muội ăn hoài không ngán.',
        calories: 310,
        tags: ['khoai tây', 'xí muội', 'phô mai'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_xoai_lac',
        name: 'Xoài non lắc muối tôm chua cay',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/xoai_lac.webp',
        desc: 'Xoài keo non giòn tan thái miếng lắc cùng nước mắm đường cay kẹo và muối ớt tôm Tây Ninh siêu đã miệng.',
        quote: 'Vị chua thanh mát lành bừng tỉnh từng nơron vị giác.',
        calories: 180,
        tags: ['xoài lắc', 'muối tôm', 'chua cay'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_coc_lac',
        name: 'Cóc bao tử lắc muối ớt',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/coc_lac.webp',
        desc: 'Cóc non giòn sần sật không hạt ngâm chua ngọt lắc cùng muối ớt hạt to đậm đà giòn rôm rốp.',
        quote: 'Cắn một miếng cóc non giòn sần sật đã khát tan biến cảm giác buồn ngủ.',
        calories: 160,
        tags: ['cóc lắc', 'muối ớt', 'ăn vặt'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_bap_xao_bo',
        name: 'Bắp xào bơ tép hành',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/bap_xao_bo.webp',
        desc: 'Hạt bắp ngọt xào bơ béo ngậy cùng ruốc tép khô, hành lá và rưới tương ớt cay nhẹ nóng hổi trên chảo gang.',
        quote: 'Mùi bơ ngào ngạt lan tỏa khắp góc phố mỗi chiều tan tầm.',
        calories: 330,
        tags: ['bắp xào', 'bơ tép', 'nóng hổi'],
        price: 20000,
        priceRange: [15000, 30000],
        priceMin: 15000,
        priceMax: 30000,
      },
      {
        id: 'vat_pho_mai_que',
        name: 'Phô mai que chiên xù kéo sợi',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/pho_mai_que.webp',
        desc: 'Lớp vỏ bột xù vàng óng giòn rụm bọc lấy nhân phô mai mozzarella béo ngậy có thể kéo sợi dài vô tận.',
        quote: 'Kéo sợi phô mai dai béo chấm chút tương ớt cay cay thơm ngọt.',
        calories: 380,
        tags: ['phô mai que', 'kéo sợi', 'mozzarella'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_trung_cut_lon_me',
        name: 'Trứng cút lộn xào me chua ngọt',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/trung_cut_lon_me.webp',
        desc: 'Những quả trứng cút lộn béo ngậy áo đều nước sốt me sánh kẹo chua ngọt, phủ đậu phộng giòn và rau răm thơm mát.',
        quote: 'Nước sốt me sánh đặc quyện trọn từng quả cút lộn đậm đà.',
        calories: 360,
        tags: ['cút lộn', 'sốt me', 'ăn vặt'],
        price: 30000,
        priceRange: [25000, 40000],
        priceMin: 25000,
        priceMax: 40000,
      },
      {
        id: 'vat_hot_vit_lon_me',
        name: 'Hột vịt lộn xào me rau răm',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/hot_vit_lon_me.webp',
        desc: 'Món ăn vặt giàu dinh dưỡng: hột vịt lộn ngọt đậm đà rim sốt me chua cay, rắc đậu phộng rang và hành phi thơm lừng.',
        quote: 'Vị béo bùi của trứng lộn hòa quyện sốt me đậm đà khó quên.',
        calories: 390,
        tags: ['vịt lộn', 'sốt me', 'bổ dưỡng'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_bo_bia_man',
        name: 'Bò bía mặn chấm tương ngọt',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/bo_bia_man.webp',
        desc: 'Cuốn bò bía củ sắn luộc ngọt nước, lạp xưởng chiên xắt lát, tép khô, rau thơm chấm vào bát tương đen béo đậu phộng.',
        quote: 'Cắn ngập răng cảm nhận vị giòn ngọt của củ sắn và béo bùi tương đen.',
        calories: 270,
        tags: ['bò bía', 'lạp xưởng', 'củ sắn'],
        price: 20000,
        priceRange: [15000, 30000],
        priceMin: 15000,
        priceMax: 30000,
      },
      {
        id: 'vat_ga_lac_pho_mai',
        name: 'Gà viên popcorn lắc phô mai',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/ga_lac_pho_mai.webp',
        desc: 'Thịt ức gà tẩm ướp cắt miếng vừa miệng chiên vàng giòn rụm rồi lắc ngập bột phô mai mặn béo thơm lừng.',
        quote: 'Từng viên gà giòn rụm bên ngoài mọng nước bên trong đượm vị phô mai.',
        calories: 390,
        tags: ['gà lắc', 'popcorn', 'phô mai'],
        price: 35000,
        priceRange: [30000, 45000],
        priceMin: 30000,
        priceMax: 45000,
      },
      {
        id: 'vat_da_heo_chay_toi',
        name: 'Da heo chiên giòn cháy tỏi ớt',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/da_heo_chay_toi.webp',
        desc: 'Da heo phơi khô chiên phồng xốp rụm áo đều lớp nước mắm tỏi ớt kẹo dẻo mặn ngọt the cay cực kỳ đưa miệng.',
        quote: 'Giòn xốp rôm rốp vị mắm tỏi cay nồng lai rai quên sầu.',
        calories: 410,
        tags: ['da heo', 'cháy tỏi', 'giòn cay'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_banh_ga_pho_mai',
        name: 'Bánh gà phô mai tan chảy',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_ga_pho_mai.webp',
        desc: 'Thịt gà băm nhuyễn tẩm ướp cuộn phô mai mozzarella chiên xù vàng ươm, cắn vào phô mai nóng hổi tan chảy béo ngậy.',
        quote: 'Phô mai tan chảy tràn ngập bên trong vỏ gà chiên giòn rụm.',
        calories: 360,
        tags: ['bánh gà', 'phô mai', 'hot trend'],
        price: 30000,
        priceRange: [25000, 40000],
        priceMin: 25000,
        priceMax: 40000,
      },
      {
        id: 'vat_xien_que_nuong',
        name: 'Xiên que nướng thập cẩm',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/xien_que_nuong.webp',
        desc: 'Đĩa xiên que nướng than hoa thơm nức: hồ lô nướng, xúc xích đức, nem lụi, chả cá chiên quết sốt mật ong thơm lừng.',
        quote: 'Thơm lừng khói than hoa cùng vị ngọt đậm đà của xiên que nướng.',
        calories: 410,
        tags: ['xiên que', 'nướng', 'hồ lô'],
        price: 35000,
        priceRange: [25000, 50000],
        priceMin: 25000,
        priceMax: 50000,
      },
      {
        id: 'vat_tau_hu_tran_chau',
        name: 'Tàu hũ trân châu đường đen',
        rarity: 4,
        type: 'Ăn vặt tráng miệng',
        image: 'images/do_an_vat/tau_hu_tran_chau.webp',
        desc: 'Tàu hũ non mềm mịn núng nính ăn cùng trân châu đen dai dẻo, rưới nước sốt đường đen đậm vị và nước cốt dừa béo bùi.',
        quote: 'Tàu hũ mềm tan như kem quyện trân châu đường đen ngọt thanh mát lành.',
        calories: 260,
        tags: ['tàu hũ', 'trân châu', 'đường đen'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_banh_trang_lui',
        name: 'Bánh tráng lụi Tây Nguyên',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_trang_lui.webp',
        desc: 'Bánh tráng cuốn nhân thịt băm mộc nhĩ nướng hoặc cuộn xiên lụi chấm vào chén sốt me sệt cay thơm đậm chất núi rừng.',
        quote: 'Vị dai mềm của bánh tráng hòa cùng sốt me sánh đỏ đặc trưng.',
        calories: 310,
        tags: ['bánh tráng lụi', 'tây nguyên', 'sốt me'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_tokbokki_pho_mai',
        name: 'Tokbokki phô mai sốt cay Hàn',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/tokbokki_pho_mai.webp',
        desc: 'Bánh gạo dẻo dai sốt tương ớt gochujang đỏ rực thơm nồng, phủ ngập phô mai mozzarella kéo sợi và chả cá Hàn Quốc.',
        quote: 'Vị cay nồng quyến rũ hòa tan cùng phô mai dẻo dai ấm nóng.',
        calories: 430,
        tags: ['tokbokki', 'bánh gạo', 'phô mai'],
        price: 35000,
        priceRange: [28000, 45000],
        priceMin: 28000,
        priceMax: 45000,
      },
      {
        id: 'vat_muc_rim_me',
        name: 'Mực rim me sa tế cay ngọt',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/muc_rim_me.webp',
        desc: 'Mực cơm khô rim ngập sốt me kẹo dẻo sa tế ớt, thơm dai ngọt thịt ăn hoài không biết chán trong những buổi hàn huyên.',
        quote: 'Mực dai ngọt đậm đà thấm đều từng giọt me sa tế cay nồng.',
        calories: 320,
        tags: ['mực rim', 'sa tế', 'đặc sản'],
        price: 45000,
        priceRange: [35000, 60000],
        priceMin: 35000,
        priceMax: 60000,
      },
      {
        id: 'vat_goi_cuon_tom_thit',
        name: 'Gỏi cuốn tôm thịt bánh tráng',
        rarity: 5,
        type: 'Ăn vặt thanh đạm',
        image: 'images/do_an_vat/goi_cuon_tom_thit.webp',
        desc: 'Bánh tráng dẻo cuộn tôm sú đỏ au, thịt ba rọi luộc thái mỏng, bún tươi và hẹ lá, chấm tương đen xay nhuyễn béo ngậy.',
        quote: 'Món ăn vặt thanh nhẹ mát lành nức tiếng ẩm thực đường phố Việt Nam.',
        calories: 220,
        tags: ['gỏi cuốn', 'tôm thịt', 'thanh đạm'],
        price: 25000,
        priceRange: [20000, 35000],
        priceMin: 20000,
        priceMax: 35000,
      },
      {
        id: 'vat_banh_crepe_sau_rieng',
        name: 'Bánh crepe sầu riêng kem lạnh',
        rarity: 5,
        type: 'Ăn vặt tráng miệng',
        image: 'images/do_an_vat/banh_crepe_sau_rieng.webp',
        desc: 'Vỏ bánh crepe lá dứa mềm mịn gói trọn cơm sầu riêng Ri6 tươi béo ngậy và lớp kem tươi thanh mát bồng bềnh.',
        quote: 'Cắn ngập chân răng lớp sầu riêng thơm lừng béo ngậy mát lạnh.',
        calories: 380,
        tags: ['crepe', 'sầu riêng', 'ngọt béo'],
        price: 35000,
        priceRange: [25000, 45000],
        priceMin: 25000,
        priceMax: 45000,
      },
      {
        id: 'vat_trung_long_dao',
        name: 'Trứng gà lòng đào muối tiêu chanh',
        rarity: 3,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/trung_long_dao.webp',
        desc: 'Trứng gà ta luộc canh chuẩn phút lòng đào dẻo quánh béo ngậy, chấm muối tiêu chanh ớt và ăn kèm lá rau răm.',
        quote: 'Lòng đỏ dẻo quánh béo mượt tan ngay đầu lưỡi.',
        calories: 150,
        tags: ['lòng đào', 'trứng gà', 'tiêu chanh'],
        price: 15000,
        priceRange: [10000, 20000],
        priceMin: 10000,
        priceMax: 20000,
      },
      {
        id: 'vat_doi_sun_nuong',
        name: 'Dồi sụn nướng than hoa',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/doi_sun_nuong.webp',
        desc: 'Dồi sụn nhồi thịt sườn sụn non và rau thơm nướng xém cạnh trên than hồng giòn sần sật thơm nức mũi.',
        quote: 'Sụn non sần sật bùi béo nướng than hoa thơm ngát cả góc phố.',
        calories: 390,
        tags: ['dồi sụn', 'nướng than', 'ăn vặt'],
        price: 35000,
        priceRange: [25000, 45000],
        priceMin: 25000,
        priceMax: 45000,
      },
      {
        id: 'vat_nem_lui_nuong',
        name: 'Nem lụi nướng sả thơm lừng',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/nem_lui_nuong.webp',
        desc: 'Thịt heo quết nhuyễn bọc quanh cây sả nướng than thơm lừng, cuốn bánh tráng rau sống và chấm nước lèo gan bùi béo.',
        quote: 'Vị thịt nướng sả đậm đà quyện nước chấm tương gan đậu phộng sánh mịn.',
        calories: 380,
        tags: ['nem lụi', 'nướng sả', 'huế'],
        price: 40000,
        priceRange: [30000, 55000],
        priceMin: 30000,
        priceMax: 55000,
      },
      {
        id: 'vat_banh_bao_chien',
        name: 'Bánh bao chiên giòn trứng cút',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_bao_chien.webp',
        desc: 'Bánh bao nhân thịt băm, mộc nhĩ và trứng cút chiên vàng ươm vỏ ngoài giòn rụm, bên trong xốp mềm thơm phức.',
        quote: 'Vỏ giòn rụm bên trong ngập nhân thịt trứng cút ấm nóng.',
        calories: 310,
        tags: ['bánh bao chiên', 'trứng cút', 'ấm nóng'],
        price: 20000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
      {
        id: 'vat_banh_bot_loc_chien',
        name: 'Bánh bột lọc chiên giòn rụm',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/banh_bot_loc_chien.webp',
        desc: 'Bánh bột lọc tôm thịt đem chiên phồng giòn tan vỏ ngoài, bên trong dẻo dai chấm nước mắm ớt chua ngọt siêu dính.',
        quote: 'Lạ miệng với lớp vỏ chiên giòn giòn dai dai đậm đà vị tôm.',
        calories: 320,
        tags: ['bột lọc chiên', 'giòn rụm', 'tôm thịt'],
        price: 25000,
        priceRange: [20000, 30000],
        priceMin: 20000,
        priceMax: 30000,
      },
      {
        id: 'vat_kho_ga_la_chanh',
        name: 'Khô gà lá chanh cay giòn',
        rarity: 4,
        type: 'Ăn vặt đóng gói',
        image: 'images/do_an_vat/kho_ga_la_chanh.webp',
        desc: 'Thịt gà xé sợi sấy khô giòn đượm ớt cay nồng và lá chanh thơm ngát, món ăn vặt quốc dân của giới trẻ.',
        quote: 'Cay cay ngọt ngọt thoang thoảng hương lá chanh ăn hoài không ngơi tay.',
        calories: 290,
        tags: ['khô gà', 'lá chanh', 'ăn vặt'],
        price: 35000,
        priceRange: [25000, 50000],
        priceMin: 25000,
        priceMax: 50000,
      },
      {
        id: 'vat_kho_bo_den',
        name: 'Khô bò đen sốt tắc cay ngọt',
        rarity: 5,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/kho_bo_den.webp',
        desc: 'Khô bò đen dẻo dai tẩm gia vị ngũ vị hương rim sốt tắc chua ngọt, rắc đậu phộng rang và rau răm thơm lừng.',
        quote: 'Món ăn vặt tuổi thơ gắn liền với những buổi chiều tan trường.',
        calories: 330,
        tags: ['khô bò', 'sốt tắc', 'tuổi thơ'],
        price: 40000,
        priceRange: [30000, 55000],
        priceMin: 30000,
        priceMax: 55000,
      },
      {
        id: 'vat_ha_cao_chien',
        name: 'Há cảo chiên giòn giấm tương',
        rarity: 4,
        type: 'Ăn vặt đường phố',
        image: 'images/do_an_vat/ha_cao_chien.webp',
        desc: 'Há cảo nhân tôm thịt vỏ mỏng chiên ngập dầu giòn rụm, rắc hành phi và chấm tương đen pha giấm đỏ chua thanh.',
        quote: 'Vỏ giòn tan bọc trọn nhân tôm thịt ngọt lịm chấm giấm đỏ đậm vị.',
        calories: 320,
        tags: ['há cảo', 'chiên giòn', 'tôm thịt'],
        price: 30000,
        priceRange: [25000, 40000],
        priceMin: 25000,
        priceMax: 40000,
      },
      {
        id: 'vat_banh_flan',
        name: 'Bánh flan caramel cà phê dừa',
        rarity: 4,
        type: 'Ăn vặt tráng miệng',
        image: 'images/do_an_vat/banh_flan.webp',
        desc: 'Bánh flan trứng sữa mềm mịn béo ngậy, rưới cà phê đen đậm vị và đá bào mát lạnh thơm nức mùi đường thắng caramel.',
        quote: 'Mềm mịn tan ngay đầu lưỡi cùng vị đắng nhẹ của cà phê hòa quyện caramel.',
        calories: 240,
        tags: ['bánh flan', 'caramel', 'tráng miệng'],
        price: 18000,
        priceRange: [15000, 25000],
        priceMin: 15000,
        priceMax: 25000,
      },
    ],
  },
  drinks: {
    id: 'drinks',
    name: 'Đồ Uống & Nước Ngọt',
    title: 'Hôm nay uống gì giải khát?',
    bannerName: 'Đồ uống giải khát mát lạnh',
    subtitle: '73 món giải khát, trà sữa, sinh tố và cà phê tuyển chọn',
    featured5Star: 'Cà phê trứng Hà Nội',
    bannerImage: 'images/do_uong/nuoc_ca_phe_trung.webp',
    theme: {
      accent: '#245f93',
      bgGlow: 'rgba(36, 95, 147, 0.15)',
      heroSurface: '#f8fafc',
      border: '#dbe5ef',
    },
    dishes: [
        {
                "id": "nuoc_coca_original",
                "name": "Coca-Cola Original",
                "rarity": 3,
                "type": "Nước ngọt có gas truyền thống",
                "image": "images/do_uong/nuoc_coca_original.webp",
                "desc": "Vị cola nguyên bản kinh điển sủi bọt mát lạnh, mang lại cảm giác sảng khoái tức thì bừng tỉnh năng lượng.",
                "quote": "Bật nắp lon mát lạnh, sủi bọt đã khát đánh tan cơn khát.",
                "calories": 140,
                "tags": [
                        "coca",
                        "cola",
                        "nước ngọt",
                        "có gas",
                        "đóng lon",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_coca_zero",
                "name": "Coca-Cola Zero Sugar",
                "rarity": 3,
                "type": "Nước ngọt không calo",
                "image": "images/do_uong/nuoc_coca_zero.webp",
                "desc": "Vị cola đậm đà sảng khoái trọn vẹn nhưng không đường, không calo, thích hợp cho người ăn kiêng và giữ dáng.",
                "quote": "Thỏa mãn vị giác không lo calo, sảng khoái mát lạnh từng ngụm.",
                "calories": 0,
                "tags": [
                        "coca zero",
                        "không đường",
                        "zero sugar",
                        "nước ngọt",
                        "ăn kiêng",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_pepsi_original",
                "name": "Pepsi Cola Original",
                "rarity": 3,
                "type": "Nước ngọt có gas vị ngọt thanh",
                "image": "images/do_uong/nuoc_pepsi_original.webp",
                "desc": "Vị ngọt đậm đà thanh mát đặc trưng với lớp gas sủi tăm mạnh mẽ, giải nhiệt cực đã trong những ngày oi bức.",
                "quote": "Sự kết hợp hoàn hảo giữa vị ngọt thanh và độ ga bùng nổ.",
                "calories": 150,
                "tags": [
                        "pepsi",
                        "cola",
                        "nước ngọt",
                        "có gas",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_pepsi_zero_chanh",
                "name": "Pepsi Zero Calorie Chanh",
                "rarity": 3,
                "type": "Nước ngọt vị chanh không đường",
                "image": "images/do_uong/nuoc_pepsi_zero_chanh.webp",
                "desc": "Vị cola không calo kết hợp cùng tinh dầu chanh vàng thơm nồng, sảng khoái nhân đôi và không lo tăng cân.",
                "quote": "Chanh vàng the mát hòa quyện cùng cola sủi bọt mát lạnh.",
                "calories": 0,
                "tags": [
                        "pepsi",
                        "chanh",
                        "zero calorie",
                        "không đường",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_7up",
                "name": "7Up Chanh Tự Nhiên",
                "rarity": 3,
                "type": "Nước ngọt có gas hương chanh",
                "image": "images/do_uong/nuoc_7up.webp",
                "desc": "Hương chanh tự nhiên thanh mát dịu nhẹ cùng độ ga sủi bọt lăn tăn, giúp thanh lọc cảm giác ngấy và giải nhiệt hiệu quả.",
                "quote": "Chanh mát dịu dàng, từng ngụm mát lạnh xua tan oi nóng.",
                "calories": 140,
                "tags": [
                        "7up",
                        "chanh",
                        "nước ngọt",
                        "thanh mát",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_sprite",
                "name": "Sprite Vị Chanh",
                "rarity": 3,
                "type": "Nước ngọt vị chanh sảng khoái",
                "image": "images/do_uong/nuoc_sprite.webp",
                "desc": "Hương vị chanh sảng khoái mát lạnh bùng nổ ngay đầu lưỡi, thức uống quốc dân khi ăn kèm các món nướng và cay nóng.",
                "quote": "Vị chanh chua ngọt sủi bọt, cân bằng hoàn hảo mọi bữa ăn đậm vị.",
                "calories": 140,
                "tags": [
                        "sprite",
                        "chanh",
                        "sảng khoái",
                        "nước ngọt",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_mirinda_soda_kem",
                "name": "Mirinda Soda Kem",
                "rarity": 3,
                "type": "Soda hương kem béo thơm",
                "image": "images/do_uong/nuoc_mirinda_soda_kem.webp",
                "desc": "Hương kem soda béo ngọt thơm ngát kết hợp cùng ga sủi sảng khoái, màu xanh ngọc bích bắt mắt ngọt ngào tuổi thơ.",
                "quote": "Hương vani kem béo ngọt ngào quyện cùng bọt gas mát rượi.",
                "calories": 160,
                "tags": [
                        "mirinda",
                        "soda kem",
                        "ngọt ngào",
                        "tuổi thơ",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_mirinda_cam",
                "name": "Mirinda Cam",
                "rarity": 3,
                "type": "Nước ngọt hương cam bùng nổ",
                "image": "images/do_uong/nuoc_mirinda_cam.webp",
                "desc": "Vị cam ngọt đậm thơm lừng bùng nổ với sắc cam rực rỡ, mang lại niềm vui tươi tắn cho mọi cuộc vui bè bạn.",
                "quote": "Vị cam đậm đà ngọt mát, rạng rỡ từng khoảnh khắc giải lao.",
                "calories": 160,
                "tags": [
                        "mirinda",
                        "cam",
                        "trái cây",
                        "có gas",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_fanta_cam",
                "name": "Fanta Hương Cam",
                "rarity": 3,
                "type": "Nước ngọt hương trái cây",
                "image": "images/do_uong/nuoc_fanta_cam.webp",
                "desc": "Hương cam tươi vui nhộn sủi tăm lấp lánh, vị ngọt ngào dễ chịu hợp gu mọi lứa tuổi từ trẻ nhỏ tới người lớn.",
                "quote": "Sắc cam tươi tắn, hương vị trái cây ngập tràn năng lượng.",
                "calories": 150,
                "tags": [
                        "fanta",
                        "cam",
                        "trái cây",
                        "nước ngọt",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_xa_xi_chuong_duong",
                "name": "Xá xị Chương Dương",
                "rarity": 3,
                "type": "Hương xá xị thảo mộc truyền thống",
                "image": "images/do_uong/nuoc_xa_xi_chuong_duong.webp",
                "desc": "Hương xá xị thảo mộc nồng nàn truyền thống lâu đời của đất Sài Gòn, dư vị cay ấm ngọt thanh không thể trộn lẫn.",
                "quote": "Vị xá xị thảo mộc nồng nàn ký ức Sài Gòn xưa.",
                "calories": 145,
                "tags": [
                        "xá xị",
                        "chương dương",
                        "thảo mộc",
                        "truyền thống",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_mirinda_xa_xi",
                "name": "Mirinda Xá xị",
                "rarity": 3,
                "type": "Xá xị sủi bọt đậm đà",
                "image": "images/do_uong/nuoc_mirinda_xa_xi.webp",
                "desc": "Vị xá xị sủi bọt đậm đà hiện đại, the mát đầu lưỡi kích thích dịch vị và giải tỏa ngay cơn khát mùa hè.",
                "quote": "Thơm cay nhẹ vị xá xị, ngọt mát và sảng khoái tới giọt cuối cùng.",
                "calories": 150,
                "tags": [
                        "mirinda",
                        "xá xị",
                        "sủi bọt",
                        "nước ngọt",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_red_bull",
                "name": "Red Bull (Bò Húc)",
                "rarity": 3,
                "type": "Nước tăng lực năng lượng",
                "image": "images/do_uong/nuoc_red_bull.webp",
                "desc": "Nước tăng lực lon vàng trứ danh chứa taurine và vitamin nhóm B, đánh thức sự tập trung và tiếp thêm sức mạnh bền bỉ.",
                "quote": "Nạp năng lượng đỉnh cao, bứt phá mọi giới hạn làm việc và học tập.",
                "calories": 180,
                "tags": [
                        "red bull",
                        "bò húc",
                        "tăng lực",
                        "tập trung",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 18000,
                "priceRange": [
                        14400,
                        23400
                ],
                "priceMin": 14400,
                "priceMax": 23400
        },
        {
                "id": "nuoc_monster_energy",
                "name": "Monster Energy",
                "rarity": 3,
                "type": "Nước tăng lực hương vị Mỹ",
                "image": "images/do_uong/nuoc_monster_energy.webp",
                "desc": "Tăng lực phong cách Mỹ với hương vị mạnh mẽ bùng nổ, giúp giữ vững phong độ tỉnh táo suốt đêm dài.",
                "quote": "Năng lượng bùng nổ mạnh mẽ cho những cú đêm tỉnh táo.",
                "calories": 210,
                "tags": [
                        "monster",
                        "energy",
                        "tăng lực",
                        "mạnh mẽ",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 32000,
                "priceRange": [
                        25600,
                        41600
                ],
                "priceMin": 25600,
                "priceMax": 41600
        },
        {
                "id": "nuoc_sting_dau",
                "name": "Sting Dâu tây Đỏ",
                "rarity": 3,
                "type": "Nước tăng lực nhân sâm dâu",
                "image": "images/do_uong/nuoc_sting_dau.webp",
                "desc": "Vị dâu tây ngọt thơm ngào ngạt kết hợp tinh chất nhân sâm và gas sủi bọt, nước uống biểu tượng giới trẻ học đường.",
                "quote": "Sắc đỏ năng lượng, thơm nức mùi dâu tây quyện nhân sâm bổ dưỡng.",
                "calories": 200,
                "tags": [
                        "sting",
                        "dâu",
                        "nhân sâm",
                        "tăng lực",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_revive",
                "name": "Nước bù khoáng Revive",
                "rarity": 3,
                "type": "Nước thể thao bù điện giải",
                "image": "images/do_uong/nuoc_revive.webp",
                "desc": "Bổ sung nước, muối khoáng và các vitamin thiết yếu bị hao hụt khi vận động, giúp cơ thể lấy lại cân bằng tức thì.",
                "quote": "Cấp nước và muối khoáng thần tốc, tái tạo sức sống cho cơ thể.",
                "calories": 90,
                "tags": [
                        "revive",
                        "bù khoáng",
                        "thể thao",
                        "điện giải",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 15000,
                "priceRange": [
                        12000,
                        19500
                ],
                "priceMin": 12000,
                "priceMax": 19500
        },
        {
                "id": "nuoc_tra_sua_truyen_thong",
                "name": "Trà sữa Hồng trà Truyền thống",
                "rarity": 4,
                "type": "Hồng trà sữa cổ điển",
                "image": "images/do_uong/nuoc_tra_sua_truyen_thong.webp",
                "desc": "Cốt hồng trà đen tuyển chọn ủ đậm vị hòa quyện cùng sữa béo thơm mịn, hương vị chuẩn mực của mọi tín đồ trà sữa.",
                "quote": "Vị chát dịu của hồng trà đượm mùi sữa béo ngọt ngào khó quên.",
                "calories": 320,
                "tags": [
                        "trà sữa",
                        "hồng trà",
                        "truyền thống",
                        "béo ngậy",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_tra_sua_oolong",
                "name": "Trà sữa Ô Long Đậm Vị",
                "rarity": 4,
                "type": "Trà sữa Oolong rang thơm",
                "image": "images/do_uong/nuoc_tra_sua_oolong.webp",
                "desc": "Hương trà ô long rang lửa sâu đượm khói, hậu vị ngọt sâu lưu luyến kết hợp sữa tươi thanh béo trang nhã.",
                "quote": "Hương khói ô long thanh tao hòa cùng vị sữa béo êm dịu.",
                "calories": 300,
                "tags": [
                        "trà sữa",
                        "ô long",
                        "oolong",
                        "đậm vị",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_sua_lai",
                "name": "Trà sữa Hoa Lài (Jasmine)",
                "rarity": 3,
                "type": "Trà sữa hương hoa lài",
                "image": "images/do_uong/nuoc_tra_sua_lai.webp",
                "desc": "Hương hoa lài thanh khiết thoang thoảng dịu nhẹ trên nền trà xanh tinh túy quyện sữa non mịn màng.",
                "quote": "Thơm ngát hương hoa lài sớm mai, nhẹ bụng và thanh mát vị giác.",
                "calories": 280,
                "tags": [
                        "trà sữa",
                        "hoa lài",
                        "jasmine",
                        "thơm dịu",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_tra_sua_thiet_quan_am",
                "name": "Trà sữa Thiết Quan Âm",
                "rarity": 3,
                "type": "Trà sữa danh trà Đài Loan",
                "image": "images/do_uong/nuoc_tra_sua_thiet_quan_am.webp",
                "desc": "Dòng trà danh bất hư truyền với hương hoa lan tự nhiên và độ đậm trà vượt trội, mang đến trải nghiệm trà sữa đỉnh cao.",
                "quote": "Đậm đà phong vị trà đạo kết hợp sữa béo thượng hạng.",
                "calories": 310,
                "tags": [
                        "thiết quan âm",
                        "trà sữa",
                        "đài loan",
                        "cao cấp",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_tra_sua_earl_grey",
                "name": "Trà sữa Bá Tước Earl Grey",
                "rarity": 3,
                "type": "Trà sữa hương cam Bergamot",
                "image": "images/do_uong/nuoc_tra_sua_earl_grey.webp",
                "desc": "Cốt hồng trà Anh Quốc ướp hương tinh dầu cam Bergamot tinh tế chuẩn vị quý tộc châu Âu, thanh lịch và quý phái.",
                "quote": "Hương cam Bergamot quý tộc thơm lừng quyện cùng sữa tươi béo mịn.",
                "calories": 290,
                "tags": [
                        "bá tước",
                        "earl grey",
                        "trà sữa",
                        "châu âu",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 42000,
                "priceRange": [
                        33600,
                        54600
                ],
                "priceMin": 33600,
                "priceMax": 54600
        },
        {
                "id": "nuoc_tra_sua_thai_do",
                "name": "Trà sữa Thái Đỏ",
                "rarity": 3,
                "type": "Trà sữa Thái thơm thảo mộc",
                "image": "images/do_uong/nuoc_tra_sua_thai_do.webp",
                "desc": "Hương trà Thái đỏ nồng nàn thảo mộc quế hồi quyện sữa đặc béo ngậy, sắc cam cam rực rỡ mang phong vị đường phố Bangkok.",
                "quote": "Hương hồi quế ấm nồng hòa cùng vị sữa đặc béo ngậy.",
                "calories": 310,
                "tags": [
                        "thái đỏ",
                        "trà thái",
                        "trà sữa",
                        "bangkok",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 28000,
                "priceRange": [
                        22400,
                        36400
                ],
                "priceMin": 22400,
                "priceMax": 36400
        },
        {
                "id": "nuoc_tra_sua_thai_xanh",
                "name": "Trà sữa Thái Xanh",
                "rarity": 3,
                "type": "Trà sữa Thái thơm mát",
                "image": "images/do_uong/nuoc_tra_sua_thai_xanh.webp",
                "desc": "Trà xanh Thái Lan thanh mát thảo mộc kết hợp sữa béo, màu xanh ngọc bích êm đềm giải nhiệt tuyệt hảo.",
                "quote": "Màu xanh ngọc dịu mắt, thơm mát hương thảo mộc giải ngấy tức thì.",
                "calories": 290,
                "tags": [
                        "thái xanh",
                        "trà thái",
                        "mát lạnh",
                        "trà sữa",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 28000,
                "priceRange": [
                        22400,
                        36400
                ],
                "priceMin": 22400,
                "priceMax": 36400
        },
        {
                "id": "nuoc_tra_sua_khoai_mon",
                "name": "Trà sữa Khoai Môn (Taro)",
                "rarity": 4,
                "type": "Trà sữa béo bùi khoai môn",
                "image": "images/do_uong/nuoc_tra_sua_khoai_mon.webp",
                "desc": "Sắc tím pastel mơ màng cùng vị bùi béo ngọt dịu của củ khoai môn nghiền mịn, thức uống ngọt ngào ấm áp.",
                "quote": "Thơm bùi vị khoai môn dẻo, sánh mịn ngọt ngào nơi đầu lưỡi.",
                "calories": 360,
                "tags": [
                        "khoai môn",
                        "taro",
                        "trà sữa",
                        "béo bùi",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_sua_socola",
                "name": "Trà sữa Socola Đậm Đà",
                "rarity": 3,
                "type": "Trà sữa cacao nguyên chất",
                "image": "images/do_uong/nuoc_tra_sua_socola.webp",
                "desc": "Vị đắng nhẹ quyến rũ của bột cacao nguyên chất hòa lẫn sữa ngọt béo và cốt trà, làm say đắm tín đồ socola.",
                "quote": "Socola đen nồng nàn quyện cùng sữa béo ngọt ngào mê hoặc.",
                "calories": 370,
                "tags": [
                        "socola",
                        "cacao",
                        "trà sữa",
                        "đậm đà",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_sua_bac_ha",
                "name": "Trà sữa Bạc Hà The Mát",
                "rarity": 3,
                "type": "Trà sữa vị the mát sảng khoái",
                "image": "images/do_uong/nuoc_tra_sua_bac_ha.webp",
                "desc": "Cảm giác the mát sảng khoái lan tỏa khắp vòm họng kết hợp cùng vị trà sữa ngọt béo, bừng tỉnh tinh thần.",
                "quote": "Hơi thở bạc hà the mát kết hợp cùng sữa béo ngọt ngào tuyệt đỉnh.",
                "calories": 310,
                "tags": [
                        "bạc hà",
                        "mint",
                        "trà sữa",
                        "the mát",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_sua_tuoi_tran_chau_duong_den",
                "name": "Sữa tươi Trân châu Đường đen",
                "rarity": 5,
                "type": "Sữa tươi thanh trùng mật mía",
                "image": "images/do_uong/nuoc_sua_tuoi_tran_chau_duong_den.webp",
                "desc": "Từng viên trân châu dẻo quánh nấu mật mía đường nâu ấm nóng rót quanh thành ly, hòa cùng sữa tươi Đà Lạt mát lạnh béo ngậy.",
                "quote": "Vân đường nâu óng ả quyện cùng sữa tươi thanh trùng dẻo dai từng ngụm.",
                "calories": 420,
                "tags": [
                        "sữa tươi",
                        "trân châu đường đen",
                        "đường nâu",
                        "hot trend",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_tra_sua_tran_chau_duong_den",
                "name": "Trà sữa Trân châu Đường đen",
                "rarity": 3,
                "type": "Trà sữa mật mía đậm đà",
                "image": "images/do_uong/nuoc_tra_sua_tran_chau_duong_den.webp",
                "desc": "Biến tấu cốt trà đen đậm đà phối cùng trân châu ngào đường nâu dẻo dai bùi bùi, thơm nồng đượm vị mật mía.",
                "quote": "Cốt trà đượm vị kết hợp trân châu đường đen dẻo dính ngon khó cưỡng.",
                "calories": 400,
                "tags": [
                        "trà sữa",
                        "trân châu",
                        "đường đen",
                        "mật mía",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 42000,
                "priceRange": [
                        33600,
                        54600
                ],
                "priceMin": 33600,
                "priceMax": 54600
        },
        {
                "id": "nuoc_tra_sua_kem_cheese",
                "name": "Trà sữa Kem Cheese Macchiato",
                "rarity": 4,
                "type": "Trà sữa phủ lớp váng phô mai",
                "image": "images/do_uong/nuoc_tra_sua_kem_cheese.webp",
                "desc": "Lớp kem phô mai Macchiato đánh bông mặn mặn béo ngậy phủ dầy trên bề mặt trà sữa đậm đà, uống nghiêng góc 45 độ chuẩn điệu.",
                "quote": "Váng kem phô mai béo mặn sánh mịn hòa cùng trà sữa mát lạnh.",
                "calories": 390,
                "tags": [
                        "kem cheese",
                        "macchiato",
                        "phô mai",
                        "trà sữa",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_tra_sua_kem_trung_chay",
                "name": "Trà sữa Kem Trứng Cháy",
                "rarity": 4,
                "type": "Kem trứng khò lửa caramel",
                "image": "images/do_uong/nuoc_tra_sua_kem_trung_chay.webp",
                "desc": "Lớp kem trứng custard vàng ươm rắc đường nâu khò lửa xém cạnh giòn tan thơm lừng mùi caramel, béo ngậy bậc nhất.",
                "quote": "Mặt caramel khò xém giòn tan trên nền kem trứng béo mịn ngây ngất.",
                "calories": 430,
                "tags": [
                        "kem trứng",
                        "khò cháy",
                        "caramel",
                        "trà sữa",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 48000,
                "priceRange": [
                        38400,
                        62400
                ],
                "priceMin": 38400,
                "priceMax": 62400
        },
        {
                "id": "nuoc_tra_sua_nuong",
                "name": "Trà sữa Nướng Hoàng Gia",
                "rarity": 3,
                "type": "Trà nướng hương caramel xém",
                "image": "images/do_uong/nuoc_tra_sua_nuong.webp",
                "desc": "Lá trà được sấy nướng nhiệt độ cao tỏa ra mùi caramel cháy nhẹ đặc trưng, hòa cùng sữa ngọt thanh không ngấy.",
                "quote": "Mùi trà nướng caramel độc đáo thơm nức mũi, đậm đà sâu lắng.",
                "calories": 340,
                "tags": [
                        "trà sữa nướng",
                        "caramel",
                        "hoàng gia",
                        "độc đáo",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_tra_dao_cam_sa",
                "name": "Trà Đào Cam Sả Tươi",
                "rarity": 5,
                "type": "Trà trái cây quốc dân",
                "image": "images/do_uong/nuoc_tra_dao_cam_sa.webp",
                "desc": "Cốt trà thanh ngọt kết hợp cùng lát cam vàng mọng nước, hương sả tươi ấm nồng và miếng đào ngâm giòn sần sật.",
                "quote": "Vị chua thanh của cam, ngọt dịu của đào quyện hương sả thư thái.",
                "calories": 180,
                "tags": [
                        "trà đào",
                        "cam sả",
                        "giải nhiệt",
                        "trái cây",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_tra_dao_mieng",
                "name": "Trà Đào Giòn Miếng",
                "rarity": 3,
                "type": "Trà đào truyền thống",
                "image": "images/do_uong/nuoc_tra_dao_mieng.webp",
                "desc": "Trà đen ướp hương đào thơm ngát, kèm 3-4 miếng đào vàng giòn tan ngọt lịm nhai đã miệng cùng đá mát lạnh.",
                "quote": "Đào giòn sần sật ngọt ngào trong làn nước trà thơm ngát.",
                "calories": 160,
                "tags": [
                        "trà đào",
                        "đào miếng",
                        "giòn",
                        "thanh mát",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_tra_vai_lai",
                "name": "Trà Vải Hoa Lài",
                "rarity": 3,
                "type": "Trà hoa quả nhiệt đới",
                "image": "images/do_uong/nuoc_tra_vai_lai.webp",
                "desc": "Những trái vải thiều mọng nước ngọt lịm kết hợp hoàn hảo cùng nền trà hoa lài ngát hương, thanh khiết dịu dàng.",
                "quote": "Ngọt thơm vị vải thiều mọng nước hòa cùng hương lài thanh khiết.",
                "calories": 170,
                "tags": [
                        "trà vải",
                        "vải thiều",
                        "hoa lài",
                        "ngọt thanh",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_mang_cut",
                "name": "Trà Măng Cụt Nhiệt Đới",
                "rarity": 3,
                "type": "Đặc sản mùa quả miền Tây",
                "image": "images/do_uong/nuoc_tra_mang_cut.webp",
                "desc": "Múi măng cụt trắng nõn chua ngọt thanh tao thả trong nền trà hoa quả tươi mát, thức uống mùa hè thanh nhiệt giải độc.",
                "quote": "Chua thanh tao nhã vị nữ hoàng trái cây măng cụt miền nhiệt đới.",
                "calories": 150,
                "tags": [
                        "măng cụt",
                        "trà măng cụt",
                        "nhiệt đới",
                        "thanh nhiệt",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_tra_oi_hong_hat_chia",
                "name": "Trà Ổi Hồng Hạt Chia",
                "rarity": 3,
                "type": "Trà trái cây giàu vitamin C",
                "image": "images/do_uong/nuoc_tra_oi_hong_hat_chia.webp",
                "desc": "Sắc hồng ruby kiêu sa cùng hương ổi xá lị nồng nàn quyến rũ, bổ sung hạt chia thanh lọc cơ thể và làm đẹp da.",
                "quote": "Hương ổi hồng ngào ngạt cùng hạt chia thanh mát đẹp dáng sáng da.",
                "calories": 140,
                "tags": [
                        "ổi hồng",
                        "hạt chia",
                        "trà ổi",
                        "vitamin c",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_dua_luoi",
                "name": "Trà Dưa Lưới Mát Lạnh",
                "rarity": 3,
                "type": "Trà hoa quả thanh ngọt",
                "image": "images/do_uong/nuoc_tra_dua_luoi.webp",
                "desc": "Hương dưa lưới cantaloupe thơm lừng ngọt lành mọng nước, xua tan cái oi bức mùa hè chỉ với một ngụm mát lạnh.",
                "quote": "Ngọt mát thuần khiết như vừa cắn trọn miếng dưa lưới mọng nước.",
                "calories": 130,
                "tags": [
                        "dưa lưới",
                        "melon",
                        "thanh mát",
                        "trái cây",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_tra_dau_tay_dam",
                "name": "Trà Dâu Tây Dầm Tươi",
                "rarity": 3,
                "type": "Trà dâu tây Đà Lạt",
                "image": "images/do_uong/nuoc_tra_dau_tay_dam.webp",
                "desc": "Dâu tây Đà Lạt dầm nhuyễn sốt mứt chua chua ngọt ngọt, kết hợp trà ô long thanh khiết bắt mắt sắc đỏ ruby tươi tắn.",
                "quote": "Chua ngọt bùng nổ vị dâu tây tươi mọng nước trên nền trà thanh tao.",
                "calories": 160,
                "tags": [
                        "dâu tây",
                        "trà dâu",
                        "đà lạt",
                        "chua ngọt",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_tra_chanh_gia_tay",
                "name": "Trà Chanh Giã Tay Quảng Đông",
                "rarity": 4,
                "type": "Trà chanh tinh dầu bùng nổ",
                "image": "images/do_uong/nuoc_tra_chanh_gia_tay.webp",
                "desc": "Chanh nước hoa Quảng Đông giã tay trực tiếp với đá để ép trọn tinh dầu thơm nức, vị chua thanh sảng khoái kích thích vị giác.",
                "quote": "Tinh dầu chanh tươi bùng nổ thơm nức mũi, chua ngọt sảng khoái.",
                "calories": 120,
                "tags": [
                        "trà chanh",
                        "giã tay",
                        "quảng đông",
                        "giải nhiệt",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_tra_tac_xi_muoi",
                "name": "Trà Tắc Xí Muội Mật Ong",
                "rarity": 3,
                "type": "Giải khát thảo mộc dân gian",
                "image": "images/do_uong/nuoc_tra_tac_xi_muoi.webp",
                "desc": "Quả tắc (quất) tươi vắt nước thơm lừng kết hợp xí muội mặn mặn ngọt ngọt và mật ong rừng ấm họng, giải ngấy số 1.",
                "quote": "Chua dịu xen lẫn vị mặn ngọt cổ điển, ấm họng giải nhiệt tuyệt vời.",
                "calories": 110,
                "tags": [
                        "trà tắc",
                        "xí muội",
                        "mật ong",
                        "dân gian",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_matcha_latte",
                "name": "Matcha Latte Nhật Bản",
                "rarity": 5,
                "type": "Matcha Uji nguyên chất đánh sữa",
                "image": "images/do_uong/nuoc_matcha_latte.webp",
                "desc": "Bột trà xanh Uji Kyoto hảo hạng đánh chổi chasen tạo bọt mịn màng, hòa vào dòng sữa tươi thanh mát béo dịu.",
                "quote": "Vị chát thanh tao nguyên bản quyện cùng sữa tươi mềm mịn như lụa.",
                "calories": 240,
                "tags": [
                        "matcha",
                        "latte",
                        "nhật bản",
                        "uji",
                        "trà xanh",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_matcha_kem_cheese",
                "name": "Matcha Kem Cheese Macchiato",
                "rarity": 3,
                "type": "Matcha phủ váng sữa phô mai",
                "image": "images/do_uong/nuoc_matcha_kem_cheese.webp",
                "desc": "Màu xanh ngọc bích của matcha thanh khiết tương phản lớp kem phô mai trắng muốt sánh mịn mặn mặn ngậy béo.",
                "quote": "Matcha chát dịu thanh tao bên dưới lớp kem cheese béo mặn tuyệt mỹ.",
                "calories": 310,
                "tags": [
                        "matcha",
                        "kem cheese",
                        "macchiato",
                        "phô mai",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 48000,
                "priceRange": [
                        38400,
                        62400
                ],
                "priceMin": 38400,
                "priceMax": 62400
        },
        {
                "id": "nuoc_matcha_nuoc_dua",
                "name": "Matcha Nước Dừa Tươi (Cloud)",
                "rarity": 3,
                "type": "Biến tấu nước dừa thanh mát",
                "image": "images/do_uong/nuoc_matcha_nuoc_dua.webp",
                "desc": "Sự giao thoa thanh tao giữa nước dừa xiêm ngọt lịm tự nhiên và tầng màng matcha xanh mướt nổi bồng bềnh phía trên.",
                "quote": "Nước dừa ngọt lành nâng đỡ lớp matcha thanh khiết bồng bềnh như mây.",
                "calories": 160,
                "tags": [
                        "matcha",
                        "nước dừa",
                        "cloud",
                        "healthy",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_dirty_matcha",
                "name": "Dirty Matcha Espresso",
                "rarity": 3,
                "type": "Cà phê rót tầng matcha",
                "image": "images/do_uong/nuoc_dirty_matcha.webp",
                "desc": "Shot cà phê Espresso nóng đậm đặc rót tràn tầng lên ly sữa matcha ướp lạnh, vị đắng kép hòa quyện đầy mê hoặc.",
                "quote": "Vị đắng thơm của cà phê hòa cùng chát dịu matcha trên nền sữa mát lạnh.",
                "calories": 220,
                "tags": [
                        "dirty matcha",
                        "espresso",
                        "cà phê",
                        "matcha",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 50000,
                "priceRange": [
                        40000,
                        65000
                ],
                "priceMin": 40000,
                "priceMax": 65000
        },
        {
                "id": "nuoc_strawberry_matcha",
                "name": "Strawberry Matcha Latte Ba Tầng",
                "rarity": 4,
                "type": "Dâu tây sữa tươi và matcha",
                "image": "images/do_uong/nuoc_strawberry_matcha.webp",
                "desc": "Ba tầng màu sắc nghệ thuật: mứt dâu tây đỏ thắm ở đáy, sữa tươi trắng muốt ở giữa và lớp matcha xanh ngọc trên cùng.",
                "quote": "Bữa tiệc sắc màu: dâu ngọt ngào, sữa béo thơm và matcha thanh lịch.",
                "calories": 270,
                "tags": [
                        "strawberry matcha",
                        "dâu tây",
                        "3 tầng",
                        "nghệ thuật",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 52000,
                "priceRange": [
                        41600,
                        67600
                ],
                "priceMin": 41600,
                "priceMax": 67600
        },
        {
                "id": "nuoc_matcha_frappuccino",
                "name": "Matcha Frappuccino Đá Xay",
                "rarity": 3,
                "type": "Matcha tuyết phủ kem tươi",
                "image": "images/do_uong/nuoc_matcha_frappuccino.webp",
                "desc": "Matcha thượng hạng xay nhuyễn cùng đá tuyết và sữa béo ngậy, phủ chóp kem bông whipping cream béo ngậy xốp mềm.",
                "quote": "Tuyết matcha mịn màng mát buốt chân răng phủ kem tươi béo ngậy.",
                "calories": 380,
                "tags": [
                        "matcha",
                        "đá xay",
                        "frappuccino",
                        "whipping cream",
                        "drinks",
                        "tra_sua"
                ],
                "filter": "tra_sua",
                "price": 55000,
                "priceRange": [
                        44000,
                        71500
                ],
                "priceMin": 44000,
                "priceMax": 71500
        },
        {
                "id": "nuoc_sinh_to_bo",
                "name": "Sinh Tố Bơ Sáp Đắk Lắk",
                "rarity": 5,
                "type": "Sinh tố béo ngậy sánh mịn",
                "image": "images/do_uong/nuoc_sinh_to_bo.webp",
                "desc": "Bơ sáp Tây Nguyên dẻo quánh xay cùng sữa đặc và sữa tươi tạo nên độ sánh mịn béo ngậy trứ danh đánh thức vị giác.",
                "quote": "Bơ sáp vàng ươm béo ngậy dẻo quánh, sánh mịn ngon ngất ngây.",
                "calories": 340,
                "tags": [
                        "sinh tố",
                        "bơ sáp",
                        "đắk lắk",
                        "béo ngậy",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_sinh_to_xoai",
                "name": "Sinh Tố Xoài Cát Hòa Lộc",
                "rarity": 4,
                "type": "Sinh tố xoài chín ngọt lịm",
                "image": "images/do_uong/nuoc_sinh_to_xoai.webp",
                "desc": "Xoài cát chín mọng thơm lừng, thịt quả vàng tươi ngọt đậm hòa cùng sữa đặc sánh mịn mát lạnh ngất ngây.",
                "quote": "Thơm lừng hương xoài cát chín cây, ngọt lịm tự nhiên từng ngụm.",
                "calories": 260,
                "tags": [
                        "sinh tố",
                        "xoài",
                        "cát hòa lộc",
                        "ngọt lịm",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_sinh_to_dau",
                "name": "Sinh Tố Dâu Tây Tươi",
                "rarity": 4,
                "type": "Sinh tố trái cây mọng nước",
                "image": "images/do_uong/nuoc_sinh_to_dau.webp",
                "desc": "Dâu tây tươi mọng xay nhuyễn mang sắc hồng đáng yêu, vị chua ngọt hài hòa bổ sung lượng vitamin C dồi dào.",
                "quote": "Sắc hồng quyến rũ, vị chua ngọt thanh dịu xua tan mệt mỏi.",
                "calories": 220,
                "tags": [
                        "sinh tố",
                        "dâu tây",
                        "chua ngọt",
                        "đẹp da",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_sinh_to_chuoi",
                "name": "Sinh Tố Chuối Sữa Tươi",
                "rarity": 3,
                "type": "Sinh tố giàu kali năng lượng",
                "image": "images/do_uong/nuoc_sinh_to_chuoi.webp",
                "desc": "Chuối tiêu chín ngọt đậm đà kết hợp sữa tươi thanh trùng, thức uống lành mạnh giàu năng lượng cho ngày mới.",
                "quote": "Chuối chín ngọt bùi hòa sữa tươi ngậy, nạp đầy năng lượng hứng khởi.",
                "calories": 250,
                "tags": [
                        "sinh tố",
                        "chuối",
                        "sữa tươi",
                        "năng lượng",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 30000,
                "priceRange": [
                        24000,
                        39000
                ],
                "priceMin": 24000,
                "priceMax": 39000
        },
        {
                "id": "nuoc_sinh_to_mang_cau",
                "name": "Sinh Tố Mãng Cầu Xiêm",
                "rarity": 3,
                "type": "Sinh tố chua ngọt thanh mát",
                "image": "images/do_uong/nuoc_sinh_to_mang_cau.webp",
                "desc": "Thịt mãng cầu xiêm dai dai vị chua ngọt thanh thoát xay cùng sữa đá, thức uống giải ngấy cực kỳ được yêu thích.",
                "quote": "Vị chua thanh mát lành của mãng cầu xiêm, uống một ngụm là sảng khoái.",
                "calories": 240,
                "tags": [
                        "sinh tố",
                        "mãng cầu",
                        "chua ngọt",
                        "thanh mát",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_sinh_to_sapoche",
                "name": "Sinh Tố Sapoche (Hồng Xiêm)",
                "rarity": 3,
                "type": "Sinh tố ngọt lịm vị mật",
                "image": "images/do_uong/nuoc_sinh_to_sapoche.webp",
                "desc": "Hồng xiêm chín mọng thơm bùi ngọt đậm đà như mật mía xay nhuyễn cùng sữa đá, món sinh tố kinh điển miền Nam.",
                "quote": "Ngọt lịm vị mật hồng xiêm chín cây, thơm bùi béo ngậy khó cưỡng.",
                "calories": 290,
                "tags": [
                        "sapoche",
                        "hồng xiêm",
                        "ngọt mật",
                        "sinh tố",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_sinh_to_bo_xoai",
                "name": "Sinh Tố Bơ - Xoài Kết Hợp",
                "rarity": 3,
                "type": "Sinh tố nhiệt đới mix vị",
                "image": "images/do_uong/nuoc_sinh_to_bo_xoai.webp",
                "desc": "Sự giao thoa hoàn mỹ giữa độ béo ngậy dẻo mịn của bơ sáp và hương thơm ngọt ngào của xoài cát chín vàng.",
                "quote": "Bơ béo ngậy hòa quyện xoài thơm ngọt, hương vị nhiệt đới ngập tràn.",
                "calories": 310,
                "tags": [
                        "bơ xoài",
                        "mix vị",
                        "nhiệt đới",
                        "sinh tố",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 42000,
                "priceRange": [
                        33600,
                        54600
                ],
                "priceMin": 33600,
                "priceMax": 54600
        },
        {
                "id": "nuoc_sinh_to_chuoi_dau",
                "name": "Sinh Tố Chuối - Dâu Tây",
                "rarity": 3,
                "type": "Sinh tố chua ngọt cân bằng",
                "image": "images/do_uong/nuoc_sinh_to_chuoi_dau.webp",
                "desc": "Vị chuối ngọt bùi đằm thắm kết hợp ăn ý cùng dâu tây chua thanh mọng nước, thức uống dinh dưỡng đẹp dáng.",
                "quote": "Sự cân bằng tuyệt mỹ giữa vị bùi của chuối và chua dịu của dâu tây.",
                "calories": 260,
                "tags": [
                        "chuối dâu",
                        "healthy",
                        "đẹp dáng",
                        "sinh tố",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_sinh_to_chuoi_bo_dau_phong",
                "name": "Sinh Tố Chuối - Bơ Đậu Phộng",
                "rarity": 3,
                "type": "Sinh tố thể thao giàu Protein",
                "image": "images/do_uong/nuoc_sinh_to_chuoi_bo_dau_phong.webp",
                "desc": "Thức uống hoàn hảo cho người tập gym: chuối chín giàu khoáng chất xay cùng bơ đậu phộng béo bùi đậm đà.",
                "quote": "Bơ đậu phộng thơm bùi béo ngậy tiếp thêm sức mạnh thể lực bền bỉ.",
                "calories": 390,
                "tags": [
                        "gym",
                        "protein",
                        "bơ đậu phộng",
                        "chuối",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 45000,
                "priceRange": [
                        36000,
                        58500
                ],
                "priceMin": 36000,
                "priceMax": 58500
        },
        {
                "id": "nuoc_sinh_to_berry_mix",
                "name": "Sinh Tố Berry Mix (Dâu, Việt Quất, Mâm Xôi)",
                "rarity": 3,
                "type": "Sinh tố siêu chống oxy hóa",
                "image": "images/do_uong/nuoc_sinh_to_berry_mix.webp",
                "desc": "Tập hợp các loại quả mọng thượng hạng giàu chất chống oxy hóa, mang sắc tím đỏ quyến rũ và vị chua ngọt tinh tế.",
                "quote": "Bộ ba quả mọng đỏ tím rực rỡ, thanh lọc cơ thể tươi trẻ làn da.",
                "calories": 210,
                "tags": [
                        "berry",
                        "việt quất",
                        "mâm xôi",
                        "detox",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 48000,
                "priceRange": [
                        38400,
                        62400
                ],
                "priceMin": 38400,
                "priceMax": 62400
        },
        {
                "id": "nuoc_sinh_to_xoai_chanh_day",
                "name": "Sinh Tố Xoài - Chanh Dây",
                "rarity": 3,
                "type": "Sinh tố chua ngọt nhiệt đới",
                "image": "images/do_uong/nuoc_sinh_to_xoai_chanh_day.webp",
                "desc": "Vị ngọt đậm của xoài cát được nâng tầm bởi vị chua thanh nồng nàn của chanh leo tươi, bừng tỉnh mọi giác quan.",
                "quote": "Chua ngọt bừng tỉnh giác quan, hương chanh dây ngào ngạt tươi mát.",
                "calories": 220,
                "tags": [
                        "xoài",
                        "chanh dây",
                        "chanh leo",
                        "nhiệt đới",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        },
        {
                "id": "nuoc_sinh_to_bo_sau_rieng",
                "name": "Sinh Tố Bơ - Sầu Riêng Béo Ngậy",
                "rarity": 4,
                "type": "Đỉnh cao béo ngậy miền nhiệt đới",
                "image": "images/do_uong/nuoc_sinh_to_bo_sau_rieng.webp",
                "desc": "Cơm sầu riêng Ri6 thơm lừng nức mũi kết hợp cùng bơ sáp béo ngậy, món sinh tố xa xỉ thỏa mãn tín đồ sầu riêng.",
                "quote": "Độ béo ngậy bùng nổ, hương thơm sầu riêng nồng nàn quyến rũ ngây ngất.",
                "calories": 450,
                "tags": [
                        "sầu riêng",
                        "bơ sầu riêng",
                        "béo ngậy",
                        "đặc sản",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 50000,
                "priceRange": [
                        40000,
                        65000
                ],
                "priceMin": 40000,
                "priceMax": 65000
        },
        {
                "id": "nuoc_dua_xiem_got_vo",
                "name": "Nước Dừa Xiêm Gọt Vỏ",
                "rarity": 3,
                "type": "Nước dừa tươi nguyên chất",
                "image": "images/do_uong/nuoc_dua_xiem_got_vo.webp",
                "desc": "Trái dừa xiêm Bến Tre gọt vỏ uống liền, nước ngọt thanh mát lành tinh khiết từ lòng đất, bù điện giải tự nhiên.",
                "quote": "Ngọt thanh thuần khiết từ thiên nhiên, mát rượi từng giọt nước dừa tươi.",
                "calories": 60,
                "tags": [
                        "nước dừa",
                        "dừa xiêm",
                        "bến tre",
                        "thuần khiết",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_dua_tac_dua_thom",
                "name": "Nước Dừa Tắc / Dừa Thơm Khóm",
                "rarity": 3,
                "type": "Giải khát đường phố Sài Gòn",
                "image": "images/do_uong/nuoc_dua_tac_dua_thom.webp",
                "desc": "Nước dừa tươi hòa cùng mứt tắc thơm dẻo hoặc khóm xào đường, thêm chút cơm dừa giòn giòn nhai vui miệng.",
                "quote": "Cơm dừa giòn sần sật quyện nước dừa tắc chua ngọt đường phố Sài Gòn.",
                "calories": 95,
                "tags": [
                        "dừa tắc",
                        "dừa thơm",
                        "sài gòn",
                        "đường phố",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 20000,
                "priceRange": [
                        16000,
                        26000
                ],
                "priceMin": 16000,
                "priceMax": 26000
        },
        {
                "id": "nuoc_cam_vat",
                "name": "Nước Cam Sành Vắt Tươi",
                "rarity": 4,
                "type": "Nước ép giàu Vitamin C tự nhiên",
                "image": "images/do_uong/nuoc_cam_vat.webp",
                "desc": "Cam sành mọng nước vắt tươi nguyên chất, tép cam vàng óng hòa cùng chút đá mát lạnh giúp tăng cường sức đề kháng.",
                "quote": "Từng tép cam vàng mọng nước, chua ngọt sảng khoái bổ sung vitamin C.",
                "calories": 110,
                "tags": [
                        "nước cam",
                        "cam vắt",
                        "vitamin c",
                        "đề kháng",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_ep_buoi_hong",
                "name": "Nước Ép Bưởi Hồng Tươi",
                "rarity": 4,
                "type": "Nước ép hỗ trợ giữ dáng",
                "image": "images/do_uong/nuoc_ep_buoi_hong.webp",
                "desc": "Tép bưởi da xanh hồng hào ép chậm nguyên chất, vị chua ngọt thanh nhẹ chứa enzyme tự nhiên hỗ trợ tiêu hóa và giảm mỡ.",
                "quote": "Thanh mát vị bưởi hồng, hỗ trợ giữ dáng và thanh lọc cơ thể.",
                "calories": 90,
                "tags": [
                        "nước ép",
                        "bưởi hồng",
                        "giảm cân",
                        "đẹp dáng",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_ep_dua_hau",
                "name": "Nước Ép Dưa Hấu Đỏ",
                "rarity": 4,
                "type": "Nước ép cấp nước tức thì",
                "image": "images/do_uong/nuoc_ep_dua_hau.webp",
                "desc": "Dưa hấu chín đỏ mọng ngọt dịu mát lịm, cấp nước và làm dịu ngay cơn khát cháy cổ trong những ngày nắng nóng đỉnh điểm.",
                "quote": "Sắc đỏ ngọt lịm mát lòng, cấp nước tức thì cho cơ thể căng tràn sức sống.",
                "calories": 85,
                "tags": [
                        "dưa hấu",
                        "nước ép",
                        "cấp nước",
                        "mát lịm",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_ep_dua_thom",
                "name": "Nước Ép Dứa (Thơm) Mật",
                "rarity": 3,
                "type": "Nước ép chua ngọt đậm đà",
                "image": "images/do_uong/nuoc_ep_dua_thom.webp",
                "desc": "Dứa mật chín vàng ươm ép tươi nguyên chất, vị chua ngọt thơm lừng chứa enzyme bromelain hỗ trợ tiêu hóa tuyệt vời.",
                "quote": "Chua ngọt đậm đà thơm ngát hương dứa, kích thích vị giác thèm ăn.",
                "calories": 100,
                "tags": [
                        "nước ép",
                        "dứa",
                        "thơm",
                        "tiêu hóa",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_ep_tao",
                "name": "Nước Ép Táo Xanh & Táo Đỏ",
                "rarity": 3,
                "type": "Nước ép ngọt thanh sảng khoái",
                "image": "images/do_uong/nuoc_ep_tao.webp",
                "desc": "Táo giòn tươi ép chậm giữ trọn dinh dưỡng, vị ngọt thanh tự nhiên và hương thơm dịu nhẹ tiếp thêm năng lượng tích cực.",
                "quote": "Ngọt thanh sảng khoái vị táo tươi, mỗi ngày một ly cho cơ thể khỏe mạnh.",
                "calories": 115,
                "tags": [
                        "táo",
                        "nước ép táo",
                        "apple juice",
                        "ngọt thanh",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 35000,
                "priceRange": [
                        28000,
                        45500
                ],
                "priceMin": 28000,
                "priceMax": 45500
        },
        {
                "id": "nuoc_ep_oi",
                "name": "Nước Ép Ổi Hạt Lựu",
                "rarity": 4,
                "type": "Hàm lượng Vitamin C vượt trội",
                "image": "images/do_uong/nuoc_ep_oi.webp",
                "desc": "Ổi tươi giòn ép lấy nước thơm nồng nàn, hàm lượng vitamin C cao gấp 4 lần cam giúp tăng cường miễn dịch và sáng da.",
                "quote": "Vị chát ngọt nhẹ thơm nồng nàn, vua hàm lượng vitamin C tự nhiên.",
                "calories": 95,
                "tags": [
                        "ổi",
                        "nước ép ổi",
                        "vitamin c",
                        "miễn dịch",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_ep_ca_rot",
                "name": "Nước Ép Cà Rốt Tươi",
                "rarity": 3,
                "type": "Nước ép sáng mắt đẹp da",
                "image": "images/do_uong/nuoc_ep_ca_rot.webp",
                "desc": "Cà rốt Đà Lạt tươi ngọt ép cùng chút đá, giàu beta-carotene chuyển hóa thành vitamin A nuôi dưỡng đôi mắt sáng ngời.",
                "quote": "Sắc cam tươi sáng, giàu dưỡng chất nuôi dưỡng đôi mắt sáng tinh anh.",
                "calories": 80,
                "tags": [
                        "cà rốt",
                        "nước ép cà rốt",
                        "sáng mắt",
                        "beta carotene",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_ep_ca_chua",
                "name": "Nước Ép Cà Chua Tươi",
                "rarity": 3,
                "type": "Nước ép chống oxy hóa",
                "image": "images/do_uong/nuoc_ep_ca_chua.webp",
                "desc": "Cà chua chín mọng giàu lycopene chống lão hóa và bảo vệ tim mạch, vị chua thanh mát nhẹ nhàng cho vóc dáng thon gọn.",
                "quote": "Lycopene dồi dào từ cà chua chín đỏ, gìn giữ nét thanh xuân tươi trẻ.",
                "calories": 70,
                "tags": [
                        "cà chua",
                        "nước ép cà chua",
                        "lycopene",
                        "đẹp da",
                        "drinks",
                        "sinh_to_nuoc_ep"
                ],
                "filter": "sinh_to_nuoc_ep",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_mia_sieu_sach",
                "name": "Nước Mía Tươi Siêu Sạch",
                "rarity": 3,
                "type": "Giải khát quốc dân đường phố",
                "image": "images/do_uong/nuoc_mia_sieu_sach.webp",
                "desc": "Mía tím ép tươi cùng trái quất (tắc) thơm ngát tạo nên ly nước mía sủi bọt ngọt lịm giải nhiệt quốc dân của người Việt.",
                "quote": "Ngọt lịm mát rượi từng ngụm nước mía tươi ép quất thơm nức hè về.",
                "calories": 130,
                "tags": [
                        "nước mía",
                        "siêu sạch",
                        "quốc dân",
                        "giải nhiệt",
                        "drinks",
                        "nuoc_ngot"
                ],
                "filter": "nuoc_ngot",
                "price": 12000,
                "priceRange": [
                        9600,
                        15600
                ],
                "priceMin": 9600,
                "priceMax": 15600
        },
        {
                "id": "nuoc_ca_phe_den_da",
                "name": "Cà Phê Đen Pha Phin",
                "rarity": 3,
                "type": "Cà phê Robusta truyền thống",
                "image": "images/do_uong/nuoc_ca_phe_den_da.webp",
                "desc": "Hạt cà phê Robusta Buôn Ma Thuột rang mộc pha phin truyền thống, đắng đậm đà nồng nàn đánh thức trọn vẹn trí não.",
                "quote": "Từng giọt cà phê phin tí tách, đắng đậm đà mạnh mẽ tinh thần.",
                "calories": 15,
                "tags": [
                        "cà phê",
                        "đen đá",
                        "pha phin",
                        "robusta",
                        "đậm đà",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 20000,
                "priceRange": [
                        16000,
                        26000
                ],
                "priceMin": 16000,
                "priceMax": 26000
        },
        {
                "id": "nuoc_ca_phe_sua_da",
                "name": "Cà Phê Sữa Đá Sài Gòn",
                "rarity": 5,
                "type": "Cà phê sữa đá huyền thoại",
                "image": "images/do_uong/nuoc_ca_phe_sua_da.webp",
                "desc": "Sự hòa quyện kinh điển giữa cà phê phin đậm đắng và sữa đặc béo ngọt, thức uống được Bloomberg bình chọn ngon nhất thế giới.",
                "quote": "Hương vị cà phê sữa đá trứ danh Sài Gòn, ngọt béo đắng êm say đắm lòng người.",
                "calories": 180,
                "tags": [
                        "cà phê",
                        "sữa đá",
                        "sài gòn",
                        "huyền thoại",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 25000,
                "priceRange": [
                        20000,
                        32500
                ],
                "priceMin": 20000,
                "priceMax": 32500
        },
        {
                "id": "nuoc_bac_xiu",
                "name": "Bạc Xỉu Ba Tầng Sài Gòn",
                "rarity": 4,
                "type": "Nhiều sữa ít cà phê béo ngậy",
                "image": "images/do_uong/nuoc_bac_xiu.webp",
                "desc": "Ly bạc xỉu ba tầng đẹp mắt gồm sữa đặc, sữa tươi và lớp cà phê bồng bềnh, ngọt ngào dành cho ai yêu thích vị sữa thơm bùi.",
                "quote": "Nhiều sữa ít cà phê, ngọt ngào dịu êm cho một buổi sáng thảnh thơi.",
                "calories": 210,
                "tags": [
                        "bạc xỉu",
                        "ba tầng",
                        "cà phê sữa",
                        "ngọt béo",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 28000,
                "priceRange": [
                        22400,
                        36400
                ],
                "priceMin": 22400,
                "priceMax": 36400
        },
        {
                "id": "nuoc_ca_phe_trung",
                "name": "Cà Phê Trứng Hà Nội",
                "rarity": 5,
                "type": "Đặc sản cà phê thủ đô",
                "image": "images/do_uong/nuoc_ca_phe_trung.webp",
                "desc": "Lòng đỏ trứng gà tươi đánh bông mịn như nhung bồng bềnh trên cốt cà phê phin nóng hổi, vị béo ngậy không hề tanh.",
                "quote": "Lớp kem trứng mềm mịn như nhung hòa cùng giọt cà phê đắng nồng ấm lòng.",
                "calories": 260,
                "tags": [
                        "cà phê trứng",
                        "hà nội",
                        "đặc sản",
                        "kem trứng",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 40000,
                "priceRange": [
                        32000,
                        52000
                ],
                "priceMin": 32000,
                "priceMax": 52000
        },
        {
                "id": "nuoc_ca_phe_cot_dua",
                "name": "Cà Phê Cốt Dừa Hải Phòng",
                "rarity": 4,
                "type": "Cà phê tuyết nước cốt dừa",
                "image": "images/do_uong/nuoc_ca_phe_cot_dua.webp",
                "desc": "Nước cốt dừa thơm béo xay nhuyễn cùng đá tuyết mịn như kem, rót cà phê đen lên bề mặt tạo sự hòa quyện khó quên.",
                "quote": "Tuyết cốt dừa béo ngậy thơm lừng tan chảy trong vị đắng dịu cà phê.",
                "calories": 280,
                "tags": [
                        "cốt dừa",
                        "cà phê dừa",
                        "hải phòng",
                        "đá xay",
                        "drinks",
                        "ca_phe_tra"
                ],
                "filter": "ca_phe_tra",
                "price": 38000,
                "priceRange": [
                        30400,
                        49400
                ],
                "priceMin": 30400,
                "priceMax": 49400
        }
],
  },
};const DISH_STYLE_TAGS = {
  rice: [
    'Cơm tấm',
    'Cơm gà xối mỡ',
    'Cơm rang dưa bò',
    'Cơm chiên thập cẩm',
    'Cơm cá mặn',
    'Xôi xéo',
  ],
  soup: [
    'Phở tái lăn',
    'Bún bò Huế',
    'Hủ tiếu Nam Vang',
    'Bún riêu cua',
    'Mì Quảng',
    'Bánh canh',
    'Bún mắm',
    'Bún Thái',
    'Bún hến',
    'Súp cua',
    'Lẩu Thái mini',
    'Cháo sườn',
    'Miến gà',
  ],
  light: [
    'Bánh cuốn',
    'Bánh mì pate',
    'Bánh bao nhân thịt',
    'Bánh giò',
    'Bánh ướt',
    'Bánh mì xíu mại',
    'Gỏi cuốn',
    'Bánh bột lọc',
    'Súp cua',
    'Cháo sườn',
  ],
  spicy: ['Bún bò Huế', 'Bún Thái', 'Lẩu Thái mini'],
  mild: ['Bánh cuốn', 'Bánh ướt', 'Gỏi cuốn', 'Súp cua', 'Cháo sườn', 'Miến gà'],
};
for (const group of Object.values(FOOD_DATABASE)) {
  for (const dish of group.dishes)
    dish.tags = Object.keys(DISH_STYLE_TAGS).filter((tag) =>
      DISH_STYLE_TAGS[tag].includes(dish.name)
    );
}

function getCurrentMealPeriod() {
  let tz = 'auto';
  try {
    tz = JSON.parse(localStorage.getItem('food_case_setting_timezone')) || 'auto';
  } catch (_) {}
  if (typeof getTimeOfDayInfo === 'function') {
    const info = getTimeOfDayInfo(tz);
    if (info.period === 'latenight') return 'dinner';
    return info.period;
  }
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 14) return 'lunch';
  if (hour >= 14 && hour < 17) return 'afternoon';
  return 'dinner';
}

// Multi-language dish names and descriptions (en, ja, ko, zh)
const DISH_TRANSLATIONS = {
  "chieu_3_1": {
    en: { name: "Clear Tapioca Shrimp Dumplings", desc: "Translucent chewy tapioca dumplings stuffed with savory caramelized shrimp and pork belly, sprinkled with fried shallots." },
    ja: { name: "バイン・ボット・ロック - タピオカ海老餃子", desc: "ぷるぷる透明なタピオカ粉の皮に、甘辛く煮た小海老と豚肉を包んだフエ伝統の絶品点心。" },
    ko: { name: "반 봇 록 - 투명 타피오카 새우 덤플링", desc: "쫀득하고 투명한 타피오카 피에 조린 새우와 삼겹살을 넣어 바나나잎에 찐 후에식 만두." },
    zh: { name: "晶莹透明木薯鲜虾饺", desc: "通体晶亮弹牙木薯皮，内裹浓郁焦糖香炒小河虾与五花肉，软糯咸鲜。" },
  },
  "chieu_3_2": {
    en: { name: "Vietnamese Crab and Asparagus Soup", desc: "Comforting velvety soup filled with shredded crab meat, quail eggs, sweet corn, shiitake mushrooms, and cilantro." },
    ja: { name: "スップ・クア - 蟹肉のとろみスープ", desc: "たっぷりの本蟹肉、うずら卵、スイートコーン、キノコが入った熱々で優しい味わいのとろみスープ。" },
    ko: { name: "숩 꾸아 - 게살 계란 수프", desc: "부드러운 게살, 메추리알, 옥수수, 버섯이 듬뿍 들어간 속 편하고 따뜻한 영양 보양 수프." },
    zh: { name: "越式鲜蟹肉浓稠羹汤", desc: "拆丝鲜蟹肉配鹌鹑蛋、甜玉米粒与香菇丝，汤羹丝滑浓醇，暖胃润喉。" },
  },
  "chieu_4_1": {
    en: { name: "Mini Crispy Savory Pancakes", desc: "Bite-sized crispy coconut rice cakes topped with sweet shrimp and scallion oil, wrapped in leafy herbs." },
    ja: { name: "バイン・コット - ミニ海老パンケーキ", desc: "ココナッツ香る一口サイズのカリカリ生地にプリプリの海老をのせ、青パパイヤ入りタレとともに。" },
    ko: { name: "반 콧 - 미니 새우 바삭 팬케이크", desc: "코코넛 향이 감도는 한입 크기 바삭한 쌀 반죽 위에 통새우와 파기름을 얹은 붕따우 명물." },
    zh: { name: "头顿椰香脆皮虾盏", desc: "小巧圆盏铁模煎至底部酥脆，上面镶嵌鲜甜整虾与翠绿葱油，裹生菜食用。" },
  },
  "chieu_4_2": {
    en: { name: "Fried Rice Flour Cakes with Eggs", desc: "Cubed rice flour cakes fried golden and crisp in a hot pan, coated with beaten eggs, green onions, and sweet soy sauce." },
    ja: { name: "ボット・チエン - 揚げ米粉餅の卵とじ", desc: "表面をカリカリに焼き上げた四角い米粉餅に卵を絡め、細切り青パパイヤと甘口醤油で。" },
    ko: { name: "봇 치엔 - 쌀떡 계란 부침", desc: "주사위 모양의 쌀떡을 철판에 바삭하게 구워 계란을 입힌 후 파파야 채와 특제 간장소스를 뿌려 먹습니다." },
    zh: { name: "西贡香煎米糕炒鸡蛋", desc: "白米糕切方块铁板煎至金黄焦脆，裹满金黄蛋液，佐甜酱油与青木瓜丝。" },
  },
  "chieu_5_1": {
    en: { name: "Crispy Vietnamese Pancake", desc: "Giant golden crispy turmeric crepe folded with shrimp, pork belly, and bean sprouts, served with mustard greens and herbs." },
    ja: { name: "バインセオ - ベトナム風お好み焼き", desc: "ターメリック入りの極薄サクサク生地に海老や豚肉、もやしを挟み、たっぷりの葉野菜で巻いて召し上がれ。" },
    ko: { name: "반 쎄오 - 베트남식 바삭 부침개", desc: "쌀가루와 강황으로 튀기듯 부쳐낸 바삭한 전 안에 새우, 돼지고기, 숙주를 넣고 쌈 채소에 싸 먹습니다." },
    zh: { name: "金黄酥脆越式黄煎饼", desc: "椰浆姜黄酥脆薄皮，包入鲜虾、五花肉与爽脆豆芽，用芥菜新鲜包裹蘸特调水蘸汁。" },
  },
  "chieu_5_2": {
    en: { name: "Fresh Summer Spring Rolls", desc: "Translucent rice paper rolls filled with boiled shrimp, sliced pork, vermicelli, and aromatic herbs, paired with peanut sauce." },
    ja: { name: "生春巻き", desc: "透き通るライスペーパーで海老、豚肉、米麺、ミントを巻き、濃厚な自家製ピーナッツ味噌ダレで。" },
    ko: { name: "고이 꾸온 - 베트남 생월남쌈", desc: "투명한 라이스페이퍼에 탱글탱글한 새우, 돼지고기, 쌀국수, 신선한 야채를 말아 고소한 땅콩소스에 찍어 먹습니다." },
    zh: { name: "鲜虾猪肉越式生春卷", desc: "晶莹透亮薄米纸卷入甜虾、白切肉、米粉与清香薄荷，蘸醇滑秘制花生酱。" },
  },
  "hl_freeze_socola": {
    en: { name: "Chocolate Ice Blended Freeze", desc: "Decadent dark chocolate blended with milk and ice, topped with whipped cream and bittersweet chocolate curls." },
    ja: { name: "ハイランズ・ショコラフリーズ", desc: "濃厚なダークチョコレートとミルクの極上アイスブレンドに、ホイップとチョコソースをデコレーション。" },
    ko: { name: "하이랜즈 초콜릿 프리즈", desc: "진한 다크 초콜릿을 얼음과 함께 블렌딩하고 풍성한 휘핑크림을 올린 달콤한 프라페." },
    zh: { name: "高原咖啡 浓郁双重巧克力冰沙", desc: "精纯可可与鲜奶冰块强力细碎，顶覆现打香草奶油与浓黑巧克力碎。" },
  },
  "hl_freeze_tra_xanh": {
    en: { name: "Green Tea Ice Blended Freeze", desc: "Rich Japanese matcha blended with ice, milk, whipped cream, and chewy herbal grass jelly cubes." },
    ja: { name: "ハイランズ・抹茶フリーズ", desc: "濃厚な抹茶とミルクのスムージーに、たっぷりのホイップクリームとプルプルの仙草ゼリーをトッピング。" },
    ko: { name: "하이랜즈 그린티 프리즈", desc: "진한 녹차 블렌디드 음료 위에 부드러운 휘핑크림과 쫄깃한 젤리를 얹은 시원한 프라페." },
    zh: { name: "高原咖啡 浓香抹茶雪顶冰沙", desc: "浓郁抹茶与鲜奶冰沙细腻融合，顶覆轻柔鲜奶油与清爽仙草冻。" },
  },
  "hl_phin_sua_da": {
    en: { name: "Traditional Phin Iced Milk Coffee", desc: "Slow-dripped dark roast coffee brewed in traditional Vietnamese metal phin filters, blended with sweet condensed milk over ice." },
    ja: { name: "ハイランズ・伝統フィン練乳アイスコーヒー", desc: "伝統のアルミ製フィルター(フィン)で濃いめに抽出した深煎りコーヒーと、甘い練乳の黄金比率。" },
    ko: { name: "하이랜즈 핀 연유 아이스커피", desc: "베트남 전통 금속 핀으로 진하게 내린 원두커피에 달콤한 연유와 얼음을 섞은 정통 커피." },
    zh: { name: "高原咖啡 经典滴漏炼乳冰咖啡", desc: "传统金属滤壶慢滴深烘特浓咖啡，融入细腻香甜炼乳与爽脆冰块。" },
  },
  "hl_phindi_hanh_nhan": {
    en: { name: "PhinDi Almond Iced Coffee", desc: "Modern light-roasted drip coffee shaken with creamy milk and aromatic toasted almond syrup." },
    ja: { name: "ハイランズ・フィンディ アーモンドコーヒー", desc: "伝統のフィンコーヒーにまろやかなアーモンドの香ばしさとミルクをブレンドした新感覚コーヒー。" },
    ko: { name: "하이랜즈 핀디 아몬드 커피", desc: "진한 베트남 핀 커피에 고소한 아몬드 향과 부드러운 우유가 어우러진 모던 스타일 커피." },
    zh: { name: "高原咖啡 杏仁特调滴漏咖啡", desc: "经典慢滴浓缩咖啡结合浓郁烘烤杏仁香气与丝滑牛奶，优雅怡人。" },
  },
  "hl_tra_sen_vang": {
    en: { name: "Golden Lotus Tea", desc: "Highlands signature oolong tea topped with creamy milk foam, whole sweet lotus seeds, and crunchy water chestnut bits." },
    ja: { name: "ハイランズ・ゴールデンロータスティー", desc: "香り高い烏龍茶ベースに、なめらかなミルクフォーム、ほくほくの蓮の実とシャキシャキのクワイを浮かべた名物。" },
    ko: { name: "하이랜즈 골든 연꽃차", desc: "향긋한 우롱차에 부드러운 밀크폼, 달콤하게 졸인 연꽃 씨앗과 아삭한 물밤을 더한 시그니처 티." },
    zh: { name: "高原咖啡 黄金莲子乌龙茶", desc: "醇香乌龙茶底覆以丝滑浓郁奶盖，搭配软糯清甜莲子与脆爽马蹄粒。" },
  },
  "more_afternoon_banh_mi_xiu_mai": {
    en: { name: "Baguette with Meatball Stew", desc: "Tender seasoned pork meatballs simmered in rich tomato broth, served with crisp warm baguette for dipping." },
    ja: { name: "ミートボール・バインミー", desc: "トマトベースの特製スープで煮込んだ柔らかい肉団子に、焼きたてバインミーを浸して食べるダラット名物。" },
    ko: { name: "반미 시우마이 - 미트볼 바게트", desc: "토마토 소스에 푹 끓인 부드러운 돼지고기 미트볼에 바삭한 바게트를 찍어 먹는 든든한 한 끼." },
    zh: { name: "番茄鲜肉丸法棍", desc: "酸甜茄汁文火慢煨软嫩猪肉丸，配酥香法棍面包蘸浓郁汤汁。" },
  },
  "more_afternoon_banh_uot": {
    en: { name: "Wet Steamed Rice Sheets", desc: "Warm, silky sheets of steamed rice crepe served with Vietnamese pork sausage (chả lụa), herbs, and sweet fish sauce." },
    ja: { name: "バイン・ウオット - 蒸し生春巻き皮", desc: "つるりとした薄い米粉シートに、ベトナムハムやハーブを添え、特製ヌクマムをかけて。" },
    ko: { name: "반 uot - 얇은 쌀전병", desc: "부드럽고 얇은 쌀 전병 위에 베트남 햄(짜루아)과 허브를 곁들여 느억맘 소스에 비벼 먹습니다." },
    zh: { name: "越式素蒸粉皮", desc: "薄透温热滑嫩蒸粉皮，配越式扎肉火腿与香菜，浇淋甜咸温和鱼露。" },
  },
  "more_dinner_bun_hen": {
    en: { name: "Hue Baby Clam Vermicelli", desc: "Rice vermicelli bowl served with seasoned baby clams, crunchy pork cracklings, peanuts, and savory clam broth." },
    ja: { name: "ブン・ヘン - シジミ和え麺", desc: "小ぶりなシジミの旨味、カリカリの豚皮揚げ、ピーナッツ、ハーブを混ぜ、温かいシジミスープとともに。" },
    ko: { name: "분 헨 - 후에식 재첩 비빔국수", desc: "작은 재첩 살과 바삭한 돼지껍질 튀김, 땅콩을 쌀국수와 비벼 시원한 재첩 육수를 곁들이는 후에 요리." },
    zh: { name: "顺化小蚬肉干拌粉", desc: "鲜香清甜小蚬肉配炸猪皮、脆花生与新鲜薄荷，附带一碗醇鲜蚬子原汤。" },
  },
  "more_dinner_bun_thai": {
    en: { name: "Seafood Tom Yum Noodle Soup", desc: "Spicy and sour Thai-style broth packed with fresh shrimp, squid, clams, mushrooms, and herbs over vermicelli." },
    ja: { name: "ブン・タイ - トムヤム海鮮麺", desc: "レモングラスとタマリンドの甘酸っぱくスパイシーなスープに、海老やイカなど海の幸がたっぷり。" },
    ko: { name: "분 타이 - 똠얌 해물 쌀국수", desc: "매콤새콤한 똠얌 육수에 싱싱한 새우, 오징어, 조개와 향신채를 듬뿍 넣은 해물 쌀국수." },
    zh: { name: "泰式冬阴功海鲜米粉", desc: "酸辣开胃冬阴功汤底，融汇香茅与南姜香气，大虾鱿鱼鲜嫩爽口。" },
  },
  "more_dinner_com_ca_man": {
    en: { name: "Claypot Salted Fish Fried Rice", desc: "Aromatic fried rice tossed with shredded savory salted fish and tender minced chicken in a hot claypot." },
    ja: { name: "塩漬け魚と鶏肉の土鍋炒飯", desc: "香ばしい塩魚のほぐし身と鶏ひき肉を強火で炒め、土鍋でおこげの風味を引き出した絶品飯。" },
    ko: { name: "껌 까 만 - 짠 생선 치킨 볶음밥", desc: "짭조름한 염장 생선 살과 닭고기를 넣고 볶아내 감칠맛과 불향이 일품인 볶음밥." },
    zh: { name: "咸鱼鸡粒热煲炒饭", desc: "地道咸鱼拆肉金黄爆香，与鲜鸡肉粒同炒，焦香四溢镬气十足。" },
  },
  "more_dinner_com_chien": {
    en: { name: "Special Combination Fried Rice", desc: "Fragrant jasmine fried rice wok-tossed with Chinese sausage, shrimp, pork, eggs, and sweet peas." },
    ja: { name: "五目パラパラ炒飯", desc: "中華ソーセージ、海老、卵、野菜を強火でパラパラに炒め上げた王道ベトナムチャーハン。" },
    ko: { name: "껌 치엔 텁껌 - 모둠 볶음밥", desc: "소시지, 새우, 돼지고기, 계란, 채소를 센 불에 볶아 고소한 풍미가 가득한 전통 볶음밥." },
    zh: { name: "扬州风味什锦炒饭", desc: "越式腊肠粒、大虾仁、鲜鸡蛋与甜青豆大火爆炒，粒粒金黄喷香。" },
  },
  "more_drinks_ca_cao": {
    en: { name: "Rich Vietnamese Hot Cocoa", desc: "Steaming hot mug of pure Ben Tre cocoa blended with sweet condensed milk." },
    ja: { name: "濃厚ホットベトナムココア", desc: "ベトナム産の上質なベンチェココアを使い、甘い練乳で仕上げた心温まるホットチョコレート。" },
    ko: { name: "벤째 수제 핫초코", desc: "베트남 벤째산 프리미엄 카카오와 달콤한 연유가 어우러져 깊고 풍부한 핫초콜릿 음료." },
    zh: { name: "槟椥特浓热可可", desc: "精选越南槟椥特级纯可可粉，与甜美炼乳热泡，浓醇醇厚丝滑入心。" },
  },
  "more_drinks_chanh_day": {
    en: { name: "Iced Passion Fruit Juice", desc: "Tart and aromatic fresh passion fruit pulp stirred with light sugar syrup over ice." },
    ja: { name: "パッションフルーツジュース", desc: "プチプチ食感の種と鮮烈な酸味がたまらない、南国の恵みたっぷりのパッションフルーツドリンク。" },
    ko: { name: "패션후르츠 생과일주스", desc: "톡톡 씹히는 씨앗과 상큼하고 강렬한 향이 입안을 가득 채우는 패션후르츠 주스." },
    zh: { name: "黄金百香果特调冰饮", desc: "新鲜百香果籽果浆金黄诱人，酸香扑鼻，冰爽提神。" },
  },
  "more_drinks_dua_hau": {
    en: { name: "Chilled Fresh Watermelon Juice", desc: "Sweet, hydrating pure watermelon juice served ice cold without added sugar." },
    ja: { name: "スイカ生ジュース", desc: "みずみずしいスイカをそのまま搾った、砂糖不使用の体に染み渡る天然ジュース。" },
    ko: { name: "시원한 수박 생과일주스", desc: "달콤하고 시원한 제철 수박을 그대로 갈아 갈증을 단숨에 없애주는 주스." },
    zh: { name: "清甜生榨无糖西瓜汁", desc: "大红多汁西瓜原汁原味鲜榨，天然多汁冰镇畅饮。" },
  },
  "more_drinks_nuoc_cam": {
    en: { name: "Freshly Squeezed Orange Juice", desc: "Sweet and tangy fresh Vietnamese green oranges pressed to order over ice." },
    ja: { name: "生搾りオレンジジュース", desc: "ベトナム特産の緑のオレンジをその場でキュッと絞った、果肉入りのジューシーなジュース。" },
    ko: { name: "착즙 생오렌지주스", desc: "베트남 생오렌지를 그 자리에서 바로 짜내어 과육과 과즙이 살아있는 상큼한 주스." },
    zh: { name: "鲜剥手榨天然绿皮橙汁", desc: "越南本土多汁绿橙现点现榨，保留粒粒橙茸果肉。" },
  },
  "more_drinks_nuoc_sam": {
    en: { name: "Saigon 24-Herb Refreshing Tea", desc: "Traditional sweet herbal infusion brewed from cane sugar, corn silk, seaweed, and cooling medicinal roots." },
    ja: { name: "サイゴン伝統ハーブ薬膳茶", desc: "サトウキビ、とうもろこしのひげ、海藻など24種の天然草本を煮出した、すっきりとした甘さの伝統健康茶。" },
    ko: { name: "사이공 전통 24가지 허브 냉차", desc: "사탕수수와 옥수수수염 등 24가지 천연 한방 약재를 정성껏 끓여낸 정통 약선차." },
    zh: { name: "西贡二十四味清凉草本水", desc: "玉米须、甘蔗与天然药草古法熬炼，回甘微甜，消暑降火。" },
  },
  "more_drinks_sinh_to_xoai": {
    en: { name: "Hoa Loc Mango Smoothie", desc: "Tropical golden smoothie blended from sweet Cat Hoa Loc mangoes and fresh milk." },
    ja: { name: "完熟マンゴースムージー", desc: "ベトナムが誇る甘美な「ホアロックマンゴー」を贅沢に使った、濃厚でとろけるようなフルーツスムージー。" },
    ko: { name: "호아록 완숙 망고 스무디", desc: "달콤하고 향이 뛰어난 호아록 망고를 듬뿍 넣어 부드럽고 과즙미 넘치는 트로피컬 스무디." },
    zh: { name: "和禄香芒冰纯奶昔", desc: "名产和禄芒果肉厚香甜，搭配鲜奶碎冰打磨，金黄柔滑果香浓烈。" },
  },
  "more_drinks_sua_dau_nanh": {
    en: { name: "Pandan Soy Milk", desc: "Warm or iced freshly pressed soybean milk infused with fragrant green pandan leaves." },
    ja: { name: "パンダン香る自家製豆乳", desc: "毎朝搾りたての大豆の旨味に、東洋のバニラ「パンダンリーフ」の甘い香りをまとわせた優しい豆乳。" },
    ko: { name: "판단 잎 향 수제 두유", desc: "신선한 생 대두를 갈아 은은하고 달콤한 판단 잎 향을 입힌 부드럽고 건강한 홈메이드 두유." },
    zh: { name: "现磨班兰叶香浓纯豆浆", desc: "选用优质黄豆每日现磨，天然斑斓叶汁注入缕缕青草香气。" },
  },
  "more_drinks_tra_da": {
    en: { name: "Street-side Iced Jasmine Tea", desc: "Lightly brewed unsweetened iced tea served in tall glasses on every Vietnamese street corner." },
    ja: { name: "トラ・ダー - ベトナム風冷たいジャスミン茶", desc: "ベトナムの街角どこでも見かける、食事の後にすっきりと渇きを潤す氷入りのお茶。" },
    ko: { name: "짜 다 - 베트남식 시원한 냉차", desc: "베트남 길거리 식당 어디서나 식사와 함께 가볍고 시원하게 마시는 국민 냉차." },
    zh: { name: "街头经典清凉免费冰茶", desc: "清淡纯净茶香配满杯冰粒，去油解腻，越南市井地道风情。" },
  },
  "more_lunch_bun_hen": {
    en: { name: "Hue Baby Clam Vermicelli", desc: "Rice vermicelli bowl served with seasoned baby clams, crunchy pork cracklings, peanuts, and savory clam broth." },
    ja: { name: "ブン・ヘン - シジミ和え麺", desc: "小ぶりなシジミの旨味、カリカリの豚皮揚げ、ピーナッツ、ハーブを混ぜ、温かいシジミスープとともに。" },
    ko: { name: "분 헨 - 후에식 재첩 비빔국수", desc: "작은 재첩 살과 바삭한 돼지껍질 튀김, 땅콩을 쌀국수와 비벼 시원한 재첩 육수를 곁들이는 후에 요리." },
    zh: { name: "顺化小蚬肉干拌粉", desc: "鲜香清甜小蚬肉配炸猪皮、脆花生与新鲜薄荷，附带一碗醇鲜蚬子原汤。" },
  },
  "more_lunch_bun_thai": {
    en: { name: "Seafood Tom Yum Noodle Soup", desc: "Spicy and sour Thai-style broth packed with fresh shrimp, squid, clams, mushrooms, and herbs over vermicelli." },
    ja: { name: "ブン・タイ - トムヤム海鮮麺", desc: "レモングラスとタマリンドの甘酸っぱくスパイシーなスープに、海老やイカなど海の幸がたっぷり。" },
    ko: { name: "분 타이 - 똠얌 해물 쌀국수", desc: "매콤새콤한 똠얌 육수에 싱싱한 새우, 오징어, 조개와 향신채를 듬뿍 넣은 해물 쌀국수." },
    zh: { name: "泰式冬阴功海鲜米粉", desc: "酸辣开胃冬阴功汤底，融汇香茅与南姜香气，大虾鱿鱼鲜嫩爽口。" },
  },
  "more_lunch_com_ca_man": {
    en: { name: "Claypot Salted Fish Fried Rice", desc: "Aromatic fried rice tossed with shredded savory salted fish and tender minced chicken in a hot claypot." },
    ja: { name: "塩漬け魚と鶏肉の土鍋炒飯", desc: "香ばしい塩魚のほぐし身と鶏ひき肉を強火で炒め、土鍋でおこげの風味を引き出した絶品飯。" },
    ko: { name: "껌 까 만 - 짠 생선 치킨 볶음밥", desc: "짭조름한 염장 생선 살과 닭고기를 넣고 볶아내 감칠맛과 불향이 일품인 볶음밥." },
    zh: { name: "咸鱼鸡粒热煲炒饭", desc: "地道咸鱼拆肉金黄爆香，与鲜鸡肉粒同炒，焦香四溢镬气十足。" },
  },
  "more_lunch_com_chien": {
    en: { name: "Special Combination Fried Rice", desc: "Fragrant jasmine fried rice wok-tossed with Chinese sausage, shrimp, pork, eggs, and sweet peas." },
    ja: { name: "五目パラパラ炒飯", desc: "中華ソーセージ、海老、卵、野菜を強火でパラパラに炒め上げた王道ベトナムチャーハン。" },
    ko: { name: "껌 치엔 텁껌 - 모둠 볶음밥", desc: "소시지, 새우, 돼지고기, 계란, 채소를 센 불에 볶아 고소한 풍미가 가득한 전통 볶음밥." },
    zh: { name: "扬州风味什锦炒饭", desc: "越式腊肠粒、大虾仁、鲜鸡蛋与甜青豆大火爆炒，粒粒金黄喷香。" },
  },
  "more_morning_banh_mi_xiu_mai": {
    en: { name: "Baguette with Meatball Stew", desc: "Tender seasoned pork meatballs simmered in rich tomato broth, served with crisp warm baguette for dipping." },
    ja: { name: "ミートボール・バインミー", desc: "トマトベースの特製スープで煮込んだ柔らかい肉団子に、焼きたてバインミーを浸して食べるダラット名物。" },
    ko: { name: "반미 시우마이 - 미트볼 바게트", desc: "토마토 소스에 푹 끓인 부드러운 돼지고기 미트볼에 바삭한 바게트를 찍어 먹는 든든한 한 끼." },
    zh: { name: "番茄鲜肉丸法棍", desc: "酸甜茄汁文火慢煨软嫩猪肉丸，配酥香法棍面包蘸浓郁汤汁，暖心治愈。" },
  },
  "more_morning_banh_uot": {
    en: { name: "Wet Steamed Rice Sheets", desc: "Warm, silky sheets of steamed rice crepe served with Vietnamese pork sausage (chả lụa), herbs, and sweet fish sauce." },
    ja: { name: "バイン・ウオット - 蒸し生春巻き皮", desc: "つるりとした薄い米粉シートに、ベトナムハムやハーブを添え、特製ヌクマムをかけて。" },
    ko: { name: "반 uot - 얇은 쌀전병", desc: "부드럽고 얇은 쌀 전병 위에 베트남 햄(짜루아)과 허브를 곁들여 느억맘 소스에 비벼 먹습니다." },
    zh: { name: "越式素蒸粉皮", desc: "薄透温热滑嫩蒸粉皮，配越式扎肉火腿与香菜，浇淋甜咸温和鱼露。" },
  },
  "nuoc_3_1": {
    en: { name: "Vietnamese Iced Milk Coffee", desc: "Iconic dark-roasted drip coffee stirred with luscious sweetened condensed milk over crushed ice." },
    ja: { name: "カフェ・スア・ダー - 練乳アイスコーヒー", desc: "じっくり抽出した深煎りコーヒーに甘い練乳を合わせ、氷をたっぷり入れたベトナム定番の味。" },
    ko: { name: "카페 쓰어다 - 연유 아이스커피", desc: "진하게 내린 베트남 원두커피에 달콤한 연유와 얼음을 듬뿍 넣은 국민 커피." },
    zh: { name: "经典越南炼乳冰咖啡", desc: "深烘咖啡慢滴萃取，与甜美炼乳黄金交融，盛入满杯碎冰。" },
  },
  "nuoc_3_2": {
    en: { name: "Fresh Sugarcane Juice with Kumquat", desc: "Pure sweet sugarcane freshly pressed with a splash of sour kumquat over crushed ice." },
    ja: { name: "搾りたてサトウキビジュース", desc: "新鮮なサトウキビを専用機械でその場で搾り、少量のキンカン果汁を加えた自然な甘さのドリンク。" },
    ko: { name: "느억 미아 - 착즙 사탕수수 주스", desc: "신선한 천연 사탕수수를 갓 짜내고 상큼한 금귤을 살짝 더한 자연 그대로의 달콤한 주스." },
    zh: { name: "清冽原榨金橘甘蔗汁", desc: "新鲜原根甘蔗压榨，特调滴入小金橘汁去腻提清，天然甘美。" },
  },
  "nuoc_3_3": {
    en: { name: "Pennywort Herb Juice with Mung Bean", desc: "Cooling earthy pennywort herb blended with smooth sweet mung bean milk over crushed ice." },
    ja: { name: "ツボクサと緑豆のヘルシージュース", desc: "デトックス効果の高いツボクサ(ラウ・マー)の搾り汁に、優しい甘さのすりつぶし緑豆を加えた定番ドリンク。" },
    ko: { name: "병풀 녹두 건강음료", desc: "몸의 열을 식혀주는 건강한 병풀 생즙에 고소하고 달콤한 녹두를 블렌딩한 인기 웰빙 음료." },
    zh: { name: "清热鲜榨雷公根绿豆沙", desc: "翠绿雷公根草本原汁，搭配绵密香滑绿豆沙，清凉去燥。" },
  },
  "nuoc_4_1": {
    en: { name: "Hue Salted Cream Coffee", desc: "Intense Vietnamese coffee topped with a thick cloud of velvety sea salt whipped cream." },
    ja: { name: "塩コーヒークリーム", desc: "濃厚なベトナムドリップコーヒーに、ほんのり塩味の効いたクリーミーなホイップを重ねたフエ発祥の人気ドリンク。" },
    ko: { name: "솔트 크림 커피", desc: "진한 드립 커피 위에 짭조름하고 부드러운 소금 생크림 폼을 얹어 완벽한 단짠을 자랑하는 후에 명물." },
    zh: { name: "顺化海盐奶盖冰咖啡", desc: "深厚纯正越式滴漏，覆以微咸轻柔海盐鲜奶油，咸甜醇滑余韵悠长。" },
  },
  "nuoc_4_2": {
    en: { name: "Creamy Avocado Smoothie", desc: "Decadent Da Lat ripe avocado blended silky smooth with sweetened condensed milk and crushed ice." },
    ja: { name: "濃厚アボカドスムージー", desc: "ダラット産の完熟アボカドを練乳とミルクとともにクリーミーに仕上げた、ベトナムを代表する贅沢スムージー。" },
    ko: { name: "달랏 아보카도 스무디", desc: "달랏산 완숙 아보카도에 연유와 우유를 넣어 버터처럼 부드럽고 고소하게 갈아낸 베트남 필수 음료." },
    zh: { name: "大叻特浓牛油果奶昔", desc: "优选高山熟透牛油果，与香甜炼乳鲜奶细打至冰淇淋般顺滑绵密。" },
  },
  "nuoc_4_3": {
    en: { name: "Tropical Fruit Medley Iced Tea", desc: "Vibrant cold-brewed tea packed with fresh slices of watermelon, orange, apple, strawberry, and chia seeds." },
    ja: { name: "トロピカルフルーツティー", desc: "スイカ、オレンジ、リンゴ、イチゴなどの生フルーツがグラスいっぱいに詰まった爽快フルーツティー。" },
    ko: { name: "열대과일 모둠 아이스티", desc: "수박, 오렌지, 사과, 딸기 등 싱싱한 생과일이 듬뿍 들어간 시원한 비타민 폭탄 티." },
    zh: { name: "满满阳光热带水果茶", desc: "西瓜、鲜橙、青苹果与草莓鲜切入杯，茉莉茶底清爽澎湃。" },
  },
  "nuoc_5_3": {
    en: { name: "Fresh Chilled Young Coconut", desc: "Sweet young coconut water served straight from the shell with tender spoonable coconut jelly flesh." },
    ja: { name: "採れたてフレッシュヤングココナッツ", desc: "冷やしたヤングココナッツの実をそのまま割り、天然の果汁と柔らかい果肉をスプーンで。" },
    ko: { name: "신선한 생 영 코코넛 워터", desc: "시원하게 냉장 보관된 야자수를 통째로 열어 달콤한 천연 과즙과 부드러운 과육을 맛보세요." },
    zh: { name: "冰爽原只新鲜青椰水", desc: "原只嫩青椰现开，椰水清冽甘甜如泉，嫩滑椰肉入口即化。" },
  },
  "nuoc_bac_xiu": {
    en: { name: "Saigon Layered White Coffee", desc: "Three-tiered sweet treat layered with condensed milk, fresh milk, and a light crown of dark Vietnamese coffee." },
    ja: { name: "サイゴン・バクシウ 3層ホワイトコーヒー", desc: "練乳、フレッシュミルク、ドリップコーヒーが美しい層をなす、甘党に愛されるサイゴン名物。" },
    ko: { name: "박씨우 - 사이공 3단 화이트커피", desc: "달콤한 연유와 신선한 우유 층 위에 진한 커피 거품을 띄운 부드럽고 달콤한 커피." },
    zh: { name: "西贡经典三色白咖啡", desc: "底层香甜炼乳、中层鲜牛奶、上层浮动微苦黑咖啡，层次分明奶香浓郁。" },
  },
  "nuoc_ca_phe_den_da": {
    en: { name: "Iced Black Coffee", desc: "Strong, aromatic Vietnamese dark roast phin coffee poured over clear ice cubes." },
    ja: { name: "ベトナム・アイスブラックコーヒー", desc: "深煎りロブスタ豆の力強い苦味と香ばしさをシンプルに氷で味わう、大人の定番コーヒー。" },
    ko: { name: "카페 덴 다 - 베트남 아이스 블랙커피", desc: "진하게 로스팅한 베트남 원두의 깊은 풍미를 얼음과 함께 즐기는 강렬한 블랙커피." },
    zh: { name: "越式浓黑冰咖啡", desc: "纯正罗布斯塔深烘原豆慢滤，冰爽甘苦交织，咖啡因充沛提神。" },
  },
  "nuoc_ca_phe_trung": {
    en: { name: "Hanoi Egg Coffee", desc: "Rich dark Vietnamese drip coffee crowned with a luscious custard of whipped egg yolks and condensed milk." },
    ja: { name: "ハノイ・エッグコーヒー", desc: "苦味のある濃厚ドリップコーヒーの上に、卵黄と練乳をふわふわに泡立てたカスタードクリームをたっぷり。" },
    ko: { name: "하노이 에그커피", desc: "진한 베트남 커피 위에 달걀노른자와 연유를 곱게 크림화하여 얹은 하노이의 대표 디저트 커피." },
    zh: { name: "河内经典蛋黄奶盖咖啡", desc: "慢滴浓黑咖啡注入杯底，盖满金黄打发至丝绸般的蛋黄炼乳浓奶霜，香浓无腥。" },
  },
  "nuoc_chanh_muoi": {
    en: { name: "Preserved Salted Lemonade", desc: "Traditional cured salted lime muddled with sugar and cold sparkling water." },
    ja: { name: "塩レモネード", desc: "塩漬け発酵させた丸ごとライムを潰し、砂糖と水で割ったベトナム伝統の健康ドリンク。" },
    ko: { name: "소금 절임 레모네이드", desc: "소금에 절인 라임을 으깨어 설탕과 물, 얼음과 함께 즐기는 단짠 청량 음료." },
    zh: { name: "越式古法咸柠檬冰饮", desc: "海盐天然发酵整颗咸柠檬捣碎，配以纯正白糖水与碎冰。" },
  },
  "nuoc_coca_zero": {
    en: { name: "Coca-Cola Zero Sugar", desc: "Zero-calorie, zero-sugar crisp Coca-Cola served chilled over ice." },
    ja: { name: "コカ・コーラ ゼロ", desc: "カロリーゼロ、糖類ゼロで罪悪感なく爽快感を味わえる人気炭酸。" },
    ko: { name: "코카콜라 제로", desc: "부담 없는 제로 칼로리로 즐기는 깔끔하고 시원한 탄산음료." },
    zh: { name: "可口可乐 零度无糖", desc: "无糖零卡路里，畅爽气泡口感不减。" },
  },
  "nuoc_milo_dam": {
    en: { name: "Milo Lava Crush with Boba", desc: "Crushed ice drenched in ultra-rich malt chocolate Milo fudge, condensed milk, cocoa powder, and pearls." },
    ja: { name: "濃厚ミロ氷・タピオカのせ", desc: "たっぷりの氷に超濃厚ミロチョコソース、練乳、ココアパウダー、タピオカを豪快にトッピングした悪魔的スイーツ。" },
    ko: { name: "마일로 용암 빙수", desc: "초콜릿 맥아 마일로 소스와 연유, 카카오 파우더, 쫄깃한 버블을 얼음 위에 쏟아부은 달콤함의 끝판왕." },
    zh: { name: "西贡熔岩阿华田美禄碎冰", desc: "浓黑美禄可可厚浆浇淋满碗碎冰，撒特浓可可粉与Q弹波霸粉圆。" },
  },
  "nuoc_mirinda_xa_xi": {
    en: { name: "Mirinda Sarsaparilla Root Beer", desc: "Traditional herbal sarsaparilla root soda with an aromatic wintergreen and anise spiced profile." },
    ja: { name: "ミリンダ サルサパリラ・サシ", desc: "ハーブの香りと独特の清涼感がクセになる、ベトナム伝統のルートビア風炭酸飲料。" },
    ko: { name: "미린다 사르사파릴라 루트비어", desc: "은은한 허브와 향신료의 독특하고 시원한 풍미가 매력적인 베트남식 전통 탄산음료." },
    zh: { name: "美年达 沙示汽水", desc: "南洋风情沙示香气，草本清凉透彻，独具风味。" },
  },
  "nuoc_ngot_1": {
    en: { name: "Coca-Cola Classic", desc: "Ice-cold original Coca-Cola served with crushed ice and a fresh lemon slice." },
    ja: { name: "コカ・コーラ", desc: "氷いっぱいのグラスに注いだ、弾ける炭酸と爽快な味わいの定番コーラ。" },
    ko: { name: "코카콜라", desc: "살얼음 가득한 잔에 따라 마시는 시원하고 짜릿한 오리지널 탄산음료." },
    zh: { name: "可口可乐 经典原味", desc: "加冰纯爽，经典气泡在舌尖迸发，解腻畅爽。" },
  },
  "nuoc_ngot_2": {
    en: { name: "Pepsi Classic", desc: "Crisp, sweet, and revitalizing chilled Pepsi over ice." },
    ja: { name: "ペプシコーラ", desc: "キレのある甘みと弾ける炭酸で喉を潤す、冷たいペプシ。" },
    ko: { name: "펩시 콜라", desc: "달콤하고 시원한 청량감으로 갈증을 한 번에 해소해 주는 탄산음료." },
    zh: { name: "百事可乐 劲爽原味", desc: "气泡强劲，冰爽甜润，畅快淋漓。" },
  },
  "nuoc_ngot_3": {
    en: { name: "7Up Lemon-Lime", desc: "Crisp, caffeine-free bubbly soda bursting with refreshing lemon and lime flavors." },
    ja: { name: "セブンアップ レモンライム", desc: "カフェインゼロ、天然レモンとライムの爽やかな酸味が広がるクリアサイダー。" },
    ko: { name: "세븐업 레몬라임", desc: "상쾌한 레몬과 라임 향이 톡톡 터지는 무카페인 청량음료." },
    zh: { name: "七喜 柠檬味汽水", desc: "不含咖啡因，天然柠檬青柠清香，晶透剔透解渴。" },
  },
  "nuoc_ngot_4": {
    en: { name: "Red Strawberry Sting Energy Drink", desc: "Vietnam’s favorite sparkling strawberry energy drink with a high-octane caffeine and taurine kick." },
    ja: { name: "スティング 赤・ストロベリーエナジー", desc: "ベトナムの若者に大人気！甘いイチゴ風味と炭酸がガツンと効く定番エナジードリンク。" },
    ko: { name: "스팅 딸기향 레드 에너지드링크", desc: "베트남 국민 에너지드링크! 달콤하고 강렬한 딸기 탄산으로 활력을 충전하세요." },
    zh: { name: "Sting 红色草莓味能量风味饮料", desc: "越南街头爆款能量汽水，浓郁草莓香气配合能量气泡，元气满满。" },
  },
  "nuoc_ngot_5": {
    en: { name: "Mirinda Orange Soda", desc: "Bright and fizzy orange soda bursting with cheerful fruity citrus sweetness." },
    ja: { name: "ミリンダ オレンジ", desc: "甘くてジューシーなオレンジの香りが弾ける、ベトナムで愛されるオレンジソーダ。" },
    ko: { name: "미린다 오렌지맛 탄산음료", desc: "상큼하고 달콤한 오렌지 과향이 톡톡 터지는 인기 과일 탄산음료." },
    zh: { name: "美年达 甜橙味汽水", desc: "明媚橙汁果香，气泡欢腾，果味浓郁酸甜可口。" },
  },
  "nuoc_ngot_6": {
    en: { name: "Red Bull Energy Drink", desc: "Classic gold can energy drink packed with taurine and B-complex vitamins for instant revitalization." },
    ja: { name: "レッドブル タイゴールド缶", desc: "ベトナムで絶大な人気を誇るゴールド缶レッドブル。濃厚な甘みと確かなエナジー補給。" },
    ko: { name: "레드불 골드캔 에너지음료", desc: "달콤하고 진한 풍미로 즉각적인 에너지를 채워주는 베트남 필수 활력 음료." },
    zh: { name: "红牛 经典强化型金罐饮料", desc: "金罐经典原味，富含牛磺酸与维生素B族，注入充沛活力。" },
  },
  "nuoc_nuoc_ep_oi_hong": {
    en: { name: "Fresh Pink Guava Juice", desc: "Slow-pressed 100% natural pink guava juice with a pinch of sea salt, rich in Vitamin C." },
    ja: { name: "フレッシュピンクグアバジュース", desc: "芳醇な香りとビタミンCが豊富なピンクグアバを生絞り。ほんのり塩を加えて甘みを引き立てます。" },
    ko: { name: "핑크 구아바 착즙주스", desc: "비타민C가 풍부한 천연 핑크 구아바를 그대로 착즙하여 향긋하고 신선한 건강 주스." },
    zh: { name: "鲜榨天然红心番石榴汁", desc: "粉润鲜果鲜榨原汁，果香浓郁馥郁，加微量海盐激发清甜。" },
  },
  "nuoc_nuoc_ep_thom": {
    en: { name: "Fresh Pineapple Juice", desc: "Sweet and tangy fresh pineapple juice pressed to order over ice cubes." },
    ja: { name: "生搾りパイナップルジュース", desc: "完熟パイナップルのジューシーな甘酸っぱさをそのまま味わう、ビタミンたっぷりのフレッシュジュース。" },
    ko: { name: "생 파인애플 착즙주스", desc: "잘 익은 파인애플을 주문 즉시 착즙하여 달콤하고 상쾌한 활력을 주는 주스." },
    zh: { name: "现榨热带金菠萝汁", desc: "精选自然熟透菠萝鲜榨，酸甜爽口果香四溢。" },
  },
  "nuoc_nuoc_sam_bi_dao": {
    en: { name: "Winter Melon Herbal Tea with Chia Seeds", desc: "Slow-simmered winter melon, dried longan, and monk fruit infusion topped with crunchy chia seeds." },
    ja: { name: "トウガンとハーブの冷たい薬膳茶", desc: "トウガン(冬瓜)や羅漢果、竜眼を何時間も煮出して作る、体を冷やす爽やかなハーブ健康茶。" },
    ko: { name: "동과 허브 웰빙티", desc: "동과, 나한과, 용안을 정성껏 달여 낸 베트남식 전통 건강 냉차로 속을 시원하게 다스립니다." },
    zh: { name: "古法罗汉果冬瓜草本凉茶", desc: "清润冬瓜配罗汉果与桂圆文火慢煨，加入饱满奇亚籽，甘醇清润。" },
  },
  "nuoc_pepsi_chanh": {
    en: { name: "Pepsi Lime Zero Calories", desc: "Invigorating zero-calorie Pepsi infused with a vibrant splash of natural lime flavor." },
    ja: { name: "ペプシ 生ライム・ゼロカロリー", desc: "フレッシュなライムの香りが広がる、すっきり爽快なゼロカロリーペプシ。" },
    ko: { name: "펩시 제로 슈거 라임향", desc: "상큼한 라임향이 은은하게 퍼지는 깔끔하고 트렌디한 제로 탄산음료." },
    zh: { name: "百事可乐 无糖青柠味", desc: "青柠果香与无糖可乐的灵动融合，清新怡神。" },
  },
  "nuoc_revive": {
    en: { name: "Revive Salted Lemon Isotonic Drink", desc: "Electrolyte-replenishing sparkling isotonic drink with savory salted lemon notes." },
    ja: { name: "リヴァイヴ 塩レモンアイソトニック", desc: "ベトナム伝統の塩レモン風味を取り入れた、微炭酸スポーツイオン飲料。水分補給に最適。" },
    ko: { name: "리바이브 소금 레몬 이온음료", desc: "짭조름한 절임 레몬 풍미의 약탄산 이온음료로 땀 흘린 뒤 갈증을 빠르게 채워줍니다." },
    zh: { name: "Revive 盐渍柠檬电解质汽水", desc: "微气泡运动电解质饮品，融入越式咸柠檬风味，快速解渴补水。" },
  },
  "nuoc_sinh_to_dau": {
    en: { name: "Da Lat Fresh Strawberry Smoothie", desc: "Vibrant sweet-tart smoothie whipped from fresh mountain Da Lat strawberries and creamy yogurt." },
    ja: { name: "ダラット産いちごスムージー", desc: "高原都市ダラットで採れた新鮮ないちごとヨーグルトをブレンドした、甘酸っぱく爽やかなピンクスムージー。" },
    ko: { name: "달랏 딸기 요거트 스무디", desc: "달랏 고원에서 갓 수확한 싱싱한 생딸기와 요거트를 블렌딩한 상큼 달콤한 과일 음료." },
    zh: { name: "大叻高山鲜草莓奶昔", desc: "大叻产地直采鲜草莓融入酸甜酸奶，粉润诱人，果酸清新怡人。" },
  },
  "nuoc_sinh_to_mang_cau": {
    en: { name: "Creamy Soursop Smoothie", desc: "Velvety sweet and tangy tropical smoothie blended from fresh soursop pulp and condensed milk." },
    ja: { name: "サワーソップ(トゲバンレイシ)スムージー", desc: "ヨーグルトのような爽やかな酸味と甘みが広がる南国フルーツ「マンカウ」のフルーティースムージー。" },
    ko: { name: "사워솝(구아나바나) 스무디", desc: "요거트처럼 부드럽고 상큼한 풍미를 자랑하는 열대과일 사워솝을 시원하게 갈아낸 인기 음료." },
    zh: { name: "刺果番荔枝雪白奶昔", desc: "天然酸甜果肉富含热带清香，如酸奶般温润柔滑，生津润喉。" },
  },
  "nuoc_sinh_to_sau_rieng": {
    en: { name: "Ri6 Durian Cream Smoothie", desc: "Luxuriously creamy smoothie made with fragrant Ri6 durian fruit and sweet condensed milk." },
    ja: { name: "ドリアン・スムージー", desc: "「果物の王様」と呼ばれる最高級Ri6ドリアンの芳醇な果肉を惜しみなく使った濃厚スムージー。" },
    ko: { name: "리6 두리안 크림 스무디", desc: "최고급 Ri6 두리안의 진하고 부드러운 과육을 그대로 갈아 만든 강렬하고 달콤한 스무디." },
    zh: { name: "金枕榴莲至尊奶昔", desc: "精选特级Ri6多肉榴莲，香甜如凝脂，口感霸道醇厚绵延。" },
  },
  "nuoc_soda_viet_quat": {
    en: { name: "Sparkling Blueberry Mint Soda", desc: "Bubbly Italian soda infused with real wild blueberry purée, fresh mint sprigs, and lemon slices." },
    ja: { name: "ブルーベリーミントソーダ", desc: "天然ブルーベリーの果肉入りシロップに弾けるソーダ、フレッシュミントとライムを合わせた爽快ドリンク。" },
    ko: { name: "블루베리 민트 스파클링 소다", desc: "달콤한 블루베리 과육과 신선한 민트, 톡 쏘는 탄산수가 어우러진 비주얼 만점 에이드." },
    zh: { name: "蓝莓薄荷清爽气泡苏打", desc: "手工蓝莓果酱打底，注入透亮气泡苏打水，配薄荷嫩叶与柠檬片。" },
  },
  "nuoc_sprite": {
    en: { name: "Sprite Lemon-Lime Soda", desc: "Crisp, clean lemon-lime sparkling refresher served with ice." },
    ja: { name: "スプライト", desc: "透き通る爽快感、レモンライムのキレの良さが食事によく合う炭酸飲料。" },
    ko: { name: "스프라이트", desc: "입안 가득 시원하게 퍼지는 레몬라임 탄산으로 기름진 식사에 찰떡궁합." },
    zh: { name: "雪碧 冰爽柠檬风味", desc: "透心凉清爽，柠檬微酸激荡气泡，佐餐绝配。" },
  },
  "nuoc_sting_vang": {
    en: { name: "Gold Ginseng Sting Energy Drink", desc: "Crisp golden energy drink formulated with natural ginseng extract and invigorating B-vitamins." },
    ja: { name: "スティング 黄・高麗人参エナジー", desc: "高麗人参エキス配合のゴールドエナジー。フルーティーな甘さと活力みなぎる刺激。" },
    ko: { name: "스팅 골드 인삼 에너지드링크", desc: "인삼 추출물이 함유된 황금빛 탄산 에너지 음료로 피로를 시원하게 날려버리세요." },
    zh: { name: "Sting 金色人参能量汽水", desc: "含天然人参提取物，清冽果香与气泡交织，提神醒脑。" },
  },
  "nuoc_sua_bap": {
    en: { name: "Da Lat Sweet Corn Milk", desc: "Velvety smooth sweet corn milk pressed from fresh tender Da Lat sweet corn ears." },
    ja: { name: "ダラット産スイートコーンミルク", desc: "ダラット高原の甘みたっぷりの完熟トウモロコシをすりつぶして作る、濃厚でクリーミーなコーンミルク。" },
    ko: { name: "달랏 스위트 콘밀크", desc: "달랏 고원의 달콤하고 신선한 어린 옥수수를 통째로 갈아 만든 부드럽고 고소한 옥수수 우유." },
    zh: { name: "大叻甜鲜嫩玉米乳", desc: "精选高原鲜嫩甜玉米现磨过滤，醇厚甘甜，金黄细腻。" },
  },
  "nuoc_sua_chua_danh_da": {
    en: { name: "Hanoi Shaken Iced Yogurt Coffee", desc: "Creamy fermented yogurt whipped with crushed ice, sweetened condensed milk, and a shot of espresso." },
    ja: { name: "ヨーグルトシェイク・コーヒーがけ", desc: "濃厚なベトナムヨーグルトを細氷とシェイクし、仕上げに濃縮コーヒーを垂らしたハノイ名物。" },
    ko: { name: "하노이 요거트 커피 쉐이크", desc: "달콤새콤한 수제 요거트를 얼음과 갈아 진한 에스프레소를 끼얹은 하노이의 인기 음료." },
    zh: { name: "河内经典冰摇咖啡酸奶", desc: "浓稠发酵酸奶加入炼乳细冰手摇起泡，淋上一勺醇黑浓缩咖啡。" },
  },
  "nuoc_sua_tuoi_tran_chau": {
    en: { name: "Brown Sugar Pearl Fresh Milk", desc: "Cold rich fresh milk drizzled with warm flame-torched brown sugar syrup and chewy boba tapioca pearls." },
    ja: { name: "黒糖タピオカフレッシュミルク", desc: "じっくり煮込んだモチモチの温かい黒糖タピオカに、冷たい濃厚フレッシュミルクを注いだ極上の一杯。" },
    ko: { name: "흑당 버블 생우유", desc: "따뜻하고 쫄깃하게 졸인 흑당 버블 타피오카에 차가운 고소한 생우유를 부어 마시는 대세 음료." },
    zh: { name: "黑糖波霸厚鲜奶", desc: "现熬温热黑糖珍珠挂壁，冲入冰鲜纯牛奶，软糯爆浆甜而不腻。" },
  },
  "nuoc_tra_c2": {
    en: { name: "C2 Lemon Green Tea", desc: "Chilled bottled 100% natural highland green tea infused with zesty natural lemon juice." },
    ja: { name: "C2 レモングリーンティー", desc: "ベトナム産100%茶葉から淹れた緑茶にレモンの酸味を加えた、爽快で大人気のボトルティー。" },
    ko: { name: "C2 레몬 녹차", desc: "상큼한 천연 레몬 과즙이 든 베트남 1위 보틀 녹차 음료." },
    zh: { name: "C2 柠檬味天然绿茶", desc: "纯正高山绿茶精萃，酸爽柠檬果汁碰撞，清爽回甘。" },
  },
  "nuoc_tra_hoa_dau_biec": {
    en: { name: "Butterfly Pea Flower Citrus Tea", desc: "Stunning natural royal blue herbal tea that transforms into magical violet with a squeeze of fresh lime." },
    ja: { name: "バタフライピー・フラワーティー", desc: "神秘的な青色からライムを絞ると鮮やかな紫色へ変わる、抗酸化作用たっぷりの目にも美しいハーブティー。" },
    ko: { name: "버터플라이피 꽃차", desc: "라임을 넣으면 푸른색에서 보랏빛으로 변하는 신비롭고 건강한 천연 허브티." },
    zh: { name: "蝶豆花幻彩柠檬茶", desc: "天然湛蓝蝶豆花冲泡，遇鲜柠汁幻化为浪漫紫罗兰色，富含花青素。" },
  },
  "nuoc_tra_tac": {
    en: { name: "Giant Iced Calamansi Green Tea", desc: "Thirst-quenching iced green tea shaken with fresh tart calamansi juice, dried plum, and sugar over crushed ice." },
    ja: { name: "カラマンシーアイスティー", desc: "爽やかな香りと酸味が特徴のカラマンシー(四季柑)をたっぷり絞った、屋台で大人気の大容量アイスティー。" },
    ko: { name: "짜 딱 - 칼라만시 대용량 아이스티", desc: "상큼한 칼라만시 생즙을 듬뿍 짜 넣은 시원하고 새콤달콤한 길거리 대표 아이스티." },
    zh: { name: "巨无霸生打金橘冰绿茶", desc: "新鲜酸爽金橘原粒暴槌出汁，融入清香绿茶与碎冰，生津止渴。" },
  },
  "nuoc_tra_tea_plus": {
    en: { name: "Tea+ Plus Oolong Tea", desc: "Crisp Japanese technology brewed oolong tea with natural OTPP to help reduce fat absorption." },
    ja: { name: "サントリー TEA+ 烏龍茶", desc: "日本の焙煎技術で作られた、すっきり香ばしい味わいの微糖烏龍茶。食事のお供に。" },
    ko: { name: "티 플러스 플러스 우롱티", desc: "산뜻하고 고소한 프리미엄 우롱차로 깔끔한 뒷맛이 특징인 건강 음료." },
    zh: { name: "Tea+ 沁润乌龙茶", desc: "三得利工艺严选焙火乌龙茶，茶香醇和，佐餐去油腻。" },
  },
  "nuoc_tra_vai": {
    en: { name: "Lychee Lotus Seed Iced Tea", desc: "Fragrant iced tea infusion paired with juicy canned lychees and sweet, tender simmered lotus seeds." },
    ja: { name: "ライチと蓮の実のアイスティー", desc: "上品な紅茶に、甘くみずみずしいライチ果肉とホクホクの蓮の実を浮かべた贅沢なデザートティー。" },
    ko: { name: "리치 연꽃씨앗 아이스티", desc: "향긋한 홍차에 달콤한 리치 열매와 부드러운 연꽃 씨앗이 어우러진 고급스러운 티 음료." },
    zh: { name: "清甜荔枝冰糖莲子茶", desc: "幽香红茶浸润饱满晶莹荔枝肉与炖至粉糯的白莲子，清润甘美。" },
  },
  "phela_o_long_sua": {
    en: { name: "Phe La Signature Oolong Milk Tea", desc: "Specialty hand-crafted Da Lat roasted oolong tea steeped to perfection and combined with rich fresh dairy." },
    ja: { name: "フェラー・ダラット烏龍ミルクティー", desc: "ダラットの特選焙煎烏龍茶を使用し、スモーキーな香りとまろやかなミルクが絶妙に調和した人気沸騰ティー。" },
    ko: { name: "페라 달랏 우롱 밀크티", desc: "달랏 고원에서 재배한 프리미엄 로스팅 우롱차의 깊은 훈연 향과 부드러운 우유의 특급 만남." },
    zh: { name: "Phê La 啡啦 招牌大叻炭焙乌龙奶茶", desc: "精选越南大叻高原手工炭焙乌龙茶，茶气雄浑炭香浓郁，融汇鲜醇原乳。" },
  },
  "pl_tra_dao_cam_sa": {
    en: { name: "Peach Orange Lemongrass Tea", desc: "Refreshing high-mountain black tea infused with fragrant lemongrass, real orange juice, and sweet sliced peaches." },
    ja: { name: "フックロン・ピーチオレンジレモングラスティー", desc: "上質な高山紅茶に生絞りオレンジ果汁、爽やかなレモングラス、ジューシーな黄桃を合わせた名作フルーツティー。" },
    ko: { name: "푹롱 복숭아 오렌지 레몬글라스 티", desc: "향긋한 홍차에 신선한 오렌지 착즙, 레몬글라스의 청량감, 달콤한 복숭아 조각이 어우러진 푹롱 베스트셀러." },
    zh: { name: "福隆茶庄 蜜桃香橙香茅冰茶", desc: "严选高山红茶底注入鲜橙汁与现煮香茅清香，沉浸厚切香甜多汁黄桃果肉。" },
  },
  "pl_tra_lai_kem_cheese": {
    en: { name: "Jasmine Tea with Cream Cheese Foam", desc: "Delicate floral jasmine green tea topped with a thick, velvety layer of salted savory cheese foam." },
    ja: { name: "フックロン・ジャスミンチーズフォームティー", desc: "すっきり清らかなジャスミン茶の上に、濃厚でほんのり塩味のあるチーズクリームフォームをたっぷり。" },
    ko: { name: "푹롱 자스민 치즈폼 티", desc: "맑고 향기로운 자스민 티 위에 짭조름하고 묵직한 크림치즈 폼을 얹어 단짠의 조화가 예술인 티." },
    zh: { name: "福隆茶庄 芝士海盐奶盖茉莉茶", desc: "清幽淡雅茉莉花香茶，顶层淋上微咸厚实咸甜芝士奶盖，层次分明。" },
  },
  "pl_tra_mang_cau": {
    en: { name: "Soursop Oolong Tea", desc: "Smooth roasted oolong tea muddled with sweet and tart fresh soursop fruit pulp." },
    ja: { name: "フックロン・サワーソップ烏龍茶", desc: "芳醇な烏龍茶に、南国フルーツ「トゲバンレイシ(マンカウ)」の甘酸っぱい果肉をたっぷり加えたトレンドドリンク。" },
    ko: { name: "푹롱 구아나바나 우롱티", desc: "구수한 우롱차에 새콤달콤하고 이국적인 사워솝(구아나바나) 과육을 듬뿍 넣은 과일차." },
    zh: { name: "福隆茶庄 红毛榴莲刺果番荔枝乌龙", desc: "清醇高山乌龙茶融入大量酸甜爽滑的刺果番荔枝果肉，果味清新热烈。" },
  },
  "pl_tra_sua": {
    en: { name: "Phuc Long Signature Milk Tea", desc: "Bold and intense steeped tea blend with silky condensed milk, legendary for its deep roasted aroma." },
    ja: { name: "フックロン・特製濃厚ミルクティー", desc: "厳選茶葉をじっくり煮出し、濃厚なミルクと合わせた、お茶の渋みと香りがガツンと際立つ伝説のミルクティー。" },
    ko: { name: "푹롱 시그니처 밀크티", desc: "진하고 쌉싸름한 찻잎의 풍미가 살아있어 입안 가득 깊은 여운을 남기는 베트남 1위 명품 밀크티." },
    zh: { name: "福隆茶庄 招牌浓厚原叶奶茶", desc: "特选重焙深香茶汤结合丝滑纯脂奶，茶韵深沉回甘悠长，茶香浓郁不腻。" },
  },
  "pl_tra_vai_lai": {
    en: { name: "Lychee Jasmine Tea", desc: "Fragrant jasmine green tea layered with sweet tropical lychee juice and plump juicy lychee fruits." },
    ja: { name: "フックロン・ライチジャスミンティー", desc: "華やかなジャスミンの香りと、果汁あふれる甘いライチの実が贅沢に入った爽やかなアイスティー。" },
    ko: { name: "푹롱 리치 자스민 티", desc: "은은한 자스민 녹차에 달콤한 열대 리치 과즙과 통통한 생 리치 과육이 듬뿍 들어간 티." },
    zh: { name: "福隆茶庄 荔枝茉莉绿茶", desc: "高雅茉莉银毫翠绿茶汤，融入鲜甜荔枝原汁与剔透饱满大颗多汁荔枝。" },
  },
  "sang_3_1": {
    en: { name: "Vietnamese Baguette with Pâté", desc: "Crispy warm baguette generously spread with homemade pork liver pâté, Vietnamese ham, cilantro, and chili." },
    ja: { name: "パテ・バインミー", desc: "外はパリパリ中はふんわりのフランスパンに、濃厚な手作りレバーパテ、ハム、パクチーをサンド。" },
    ko: { name: "반미 파테 - 파테 바게트", desc: "바삭하게 구운 바게트 속에 진한 수제 파테와 베트남 햄, 신선한 고수가 듬뿍 들어간 기본 반미." },
    zh: { name: "经典猪肝酱法棍", desc: "外酥内软温热法棍，抹满秘制香浓猪肝酱，夹越式肉火腿、黄瓜与新鲜芫荽。" },
  },
  "sang_3_2": {
    en: { name: "Crab Paste Noodle Soup", desc: "Tangy, savory tomato and freshwater crab paste broth with rice noodles, tofu, and pork blood curd." },
    ja: { name: "カニ汁麺・ブン・ジウ", desc: "田ガニのすり身とトマトの爽やかな酸味が広がるスープに、米麺と揚げ豆腐を入れたベトナム定番麺。" },
    ko: { name: "분 리에우 꾸아 - 게살 토마토 쌀국수", desc: "민물게 살과 신선한 토마토로 우려낸 새콤달콤한 국물에 튀긴 두부와 면을 곁들인 쌀국수." },
    zh: { name: "鲜茄田蟹膏汤米粉", desc: "淡水田蟹膏搭配鲜熟番茄熬制酸甜鲜醇汤底，配金黄炸豆腐与细腻米粉。" },
  },
  "sang_4_1": {
    en: { name: "Steamed Rice Rolls", desc: "Delicate paper-thin steamed rice crepes filled with minced pork and wood ear mushrooms, topped with fried shallots." },
    ja: { name: "蒸し春巻き", desc: "極薄のもちもち蒸しライスペーパーでひき肉とキクラゲを包み、揚げエシャロットと温かいヌクマムダレで。" },
    ko: { name: "반 꾸온 - 베트남식 쌀말이", desc: "얇고 쫄깃한 쌀피에 다진 돼지고기와 목이버섯을 넣고 쪄내 바삭한 샬롯 튀김과 느억맘 소스에 찍어 먹습니다." },
    zh: { name: "越南薄皮鲜肉肠粉", desc: "晶莹剔透手工现蒸薄米皮，裹入鲜猪肉馅与木耳碎，撒满酥脆炸葱酥，蘸温热鱼露。" },
  },
  "sang_4_2": {
    en: { name: "Nam Vang Clear Noodle Soup", desc: "Chewy noodles topped with plump shrimp, quail eggs, and minced pork in clear sweet pork bone broth." },
    ja: { name: "フーティウ・ナムヴァン", desc: "コシのある米麺にプリプリの海老、うずら卵、ひき肉をのせ、豚骨の澄んだ甘い出汁で。汁あり・汁なし選べます。" },
    ko: { name: "후띠우 남방 - 남부식 쌀국수", desc: "쫄깃한 쌀면에 통통한 새우, 메추리알, 다진 고기를 얹은 담백하고 깔끔한 돼지사골 국수." },
    zh: { name: "金边海鲜猪肉粿条", desc: "爽滑筋道粿条搭配大虾、鹌鹑蛋与鲜肉末，骨汤清甜醇美，干捞或汤食皆宜。" },
  },
  "sang_4_3": {
    en: { name: "Yellow Sticky Rice with Mung Bean", desc: "Steamed turmeric sticky rice wrapped in banana leaf, layered with shaved mung bean, chicken fat, and crispy shallots." },
    ja: { name: "ソイ・セオ - 緑豆おこわ", desc: "バナナの葉で包まれた温かい黄色のもち米に、滑らかな緑豆ペーストと香ばしい鶏油・揚げエシャロット。" },
    ko: { name: "쏘이 쎄오 - 녹두 찹쌀밥", desc: "바나나잎에 싼 따뜻한 강황 찹쌀밥 위에 부드러운 녹두 고명과 고소한 샬롯 튀김을 얹은 하노이 명물." },
    zh: { name: "姜黄绿豆黄糯米饭", desc: "芭蕉叶包裹温热姜黄糯米饭，铺满细腻绿豆泥，淋纯正鸡油与酥香红葱头。" },
  },
  "sang_5_1": {
    en: { name: "Stir-fried Rare Beef Pho", desc: "Wok-seared beef with fragrant garlic over 24-hour simmered bone broth, served piping hot in stone bowls to the last drop." },
    ja: { name: "牛肉炒めフォー", desc: "強火で香ばしく炒めた牛肉とニンニクをのせ、24時間じっくり煮込んだ熱々の牛骨スープでいただく伝統のフォー。" },
    ko: { name: "퍼 따이 란 - 소고기 볶음 쌀국수", desc: "마늘과 함께 센 불에 볶아낸 소고기와 24시간 우려낸 진한 사골 육수가 어우러진 하노이식 쌀국수." },
    zh: { name: "生滚蒜香牛肉河粉", desc: "大火蒜香爆炒鲜牛肉，搭配24小时慢熬浓郁牛骨汤，石锅保温至最后一口。" },
  },
  "sang_5_2": {
    en: { name: "Hue Spicy Beef Noodle Soup", desc: "Thick noodles with tender beef shank, crab meatballs, and pork knuckle in a robust lemongrass-chili broth." },
    ja: { name: "ブン・ボー・フエ - 辛口牛肉うどん", desc: "太麺に柔らかい牛すね肉、カニ団子、豚足をのせ、レモングラスとサテ唐辛子の効いた奥深いスープ。" },
    ko: { name: "분보후에 - 후에식 매콤 소고기 쌀국수", desc: "통통한 면발에 부드러운 소사태, 게살 완자, 족발과 향긋한 레몬글라스 고추 기름이 조화를 이룹니다." },
    zh: { name: "顺化香茅辣牛肉粉", desc: "粗圆米粉搭配软烂牛腱、鲜美蟹肉丸与猪蹄，香茅辣椒红油浓汤鲜香四溢。" },
  },
  "sang_5_3": {
    en: { name: "Vietnamese Sizzling Pan Bread", desc: "Cast iron pan with sizzling rich pâté, tender pepper beef, and runny eggs served with crispy baguette." },
    ja: { name: "鉄板バインミー", desc: "熱々の鉄板でジュージュー焼かれた濃厚レバーパテ、黒胡椒牛肉、半熟卵を焼きたてパンにつけて。" },
    ko: { name: "반미 짜오 - 철판 바게트", desc: "지글지글 철판에 올린 고소한 파테, 부드러운 소고기, 반숙 계란후라이를 바삭한 바게트와 곁들입니다." },
    zh: { name: "铁板越式法棍", desc: "铁板滋滋作响的热热肝酱、黑椒嫩牛肉与溏心双蛋，配酥脆法棍蘸汁享用。" },
  },
  "sv_afternoon_banh_bao": {
    en: { name: "Steamed Pork Bun", desc: "Piping hot fluffy steamed bun stuffed with seasoned minced pork, quail egg, Chinese sausage, and mushrooms." },
    ja: { name: "ベトナム風肉まん", desc: "ふわふわ熱々の皮の中に、ジューシーな豚肉、うずら卵、中華ソーセージがぎっしり。" },
    ko: { name: "반 바오 - 베트남식 고기만두", desc: "포근한 찐빵 속에 양념 돼지고기, 메추리알, 소시지, 버섯이 꽉 찬 영양 간식." },
    zh: { name: "越式咸蛋肉包", desc: "松软雪白面皮，包裹特调鲜猪肉馅、鹌鹑蛋、香菇与越式腊肠。" },
  },
  "sv_afternoon_banh_gio": {
    en: { name: "Pyramid Rice Dumpling", desc: "Silky soft rice dumpling wrapped in banana leaves, filled with minced pork, wood ear mushrooms, and shallots." },
    ja: { name: "バイン・ゾー - 蒸しピラミッド餅", desc: "バナナの葉に包まれた滑らかな米粉生地の中に、キクラゲと豚ひき肉の旨味が詰まった伝統蒸し菓子。" },
    ko: { name: "반 조 - 피라미드 쌀떡 덤플링", desc: "바나나잎에 싸서 찐 부드러운 쌀 반죽 속에 목이버섯과 다진 돼지고기를 채운 따뜻한 간식." },
    zh: { name: "芭蕉叶越式肉粽", desc: "嫩滑米粉糕裹入脆嫩木耳与鲜肉，芭蕉叶清香蒸透，软糯咸鲜。" },
  },
  "sv_afternoon_pha_lau": {
    en: { name: "Braised Beef Offal with Baguette", desc: "Rich coconut milk braised beef stew served with chili tamarind dipping sauce and a crispy warm baguette." },
    ja: { name: "ファー・ラウ - 牛モツのココナッツ煮", desc: "ココナッツミルクと五香粉で柔らかく煮込んだ牛モツに、甘酸っぱいタマリンドダレとパンを添えて。" },
    ko: { name: "파 라우 - 소 내장 코코넛 조림 바게트", desc: "달콤하고 고소한 코코넛 밀크에 푹 끓여낸 쫄깃한 소 내장을 새콤달콤 타마린드 소스와 바게트에 곁들입니다." },
    zh: { name: "椰香五香卤牛杂配法棍", desc: "浓郁椰奶配特选五香炖软烂牛杂，蘸金橘罗望子辣椒酱，佐热法棍。" },
  },
  "sv_dinner_banh_canh": {
    en: { name: "Thick Tapioca Noodle Soup", desc: "Chewy, thick tapioca-rice noodles in rich savory broth with tender pork, shrimp, and fresh cilantro." },
    ja: { name: "バイン・カン - 極太もちもちうどん", desc: "タピオカ粉入りの極太モチモチ麺を、豚骨や海鮮の旨味が凝縮した濃厚とろみスープで。" },
    ko: { name: "반 까인 - 굵은 쌀우동", desc: "타피오카가 들어가 쫄깃쫄깃하고 통통한 굵은 면에 진하고 깊은 고기 해산물 육수가 가득." },
    zh: { name: "浓汤粗圆木薯米粉", desc: "滑糯筋道粗木薯米粉，配鲜甜排骨大虾慢熬浓汤。" },
  },
  "sv_dinner_chieu_4_2": {
    en: { name: "Fried Rice Flour Cakes with Eggs", desc: "Cubed rice flour cakes fried golden and crisp in a hot pan, coated with beaten eggs, green onions, and sweet soy sauce." },
    ja: { name: "ボット・チエン - 揚げ米粉餅の卵とじ", desc: "表面をカリカリに焼き上げた四角い米粉餅に卵を絡め、細切り青パパイヤと甘口醤油で。" },
    ko: { name: "봇 치엔 - 쌀떡 계란 부침", desc: "주사위 모양의 쌀떡을 철판에 바삭하게 구워 계란을 입힌 후 파파야 채와 특제 간장소스를 뿌려 먹습니다." },
    zh: { name: "西贡香煎米糕炒鸡蛋", desc: "白米糕切方块铁板煎至金黄焦脆，裹满金黄蛋液，佐甜酱油。" },
  },
  "sv_dinner_pha_lau": {
    en: { name: "Braised Beef Offal with Baguette", desc: "Rich coconut milk braised beef stew served with chili tamarind dipping sauce and a crispy warm baguette." },
    ja: { name: "ファー・ラウ - 牛モツのココナッツ煮", desc: "ココナッツミルクと五香粉で柔らかく煮込んだ牛モツに、甘酸っぱいタマリンドダレとパンを添えて。" },
    ko: { name: "파 라우 - 소 내장 코코넛 조림 바게트", desc: "달콤하고 고소한 코코넛 밀크에 푹 끓여낸 쫄깃한 소 내장을 새콤달콤 타마린드 소스와 바게트에 곁들입니다." },
    zh: { name: "椰香五香卤牛杂配法棍", desc: "浓郁椰奶配特选五香炖软烂牛杂，蘸金橘罗望子辣椒酱，佐热法棍。" },
  },
  "sv_dinner_sang_3_2": {
    en: { name: "Crab Paste Noodle Soup", desc: "Tangy, savory tomato and freshwater crab paste broth with rice noodles, tofu, and pork blood curd." },
    ja: { name: "カニ汁麺・ブン・ジウ", desc: "田ガニのすり身とトマトの爽やかな酸味が広がるスープに、米麺と揚げ豆腐を入れたベトナム定番麺。" },
    ko: { name: "분 리에우 꾸아 - 게살 토마토 쌀국수", desc: "민물게 살과 신선한 토마토로 우려낸 새콤달콤한 국물에 튀긴 두부와 면을 곁들인 쌀국수." },
    zh: { name: "鲜茄田蟹膏汤米粉", desc: "淡水田蟹膏搭配鲜熟番茄熬制酸甜鲜醇汤底，配金黄炸豆腐与细腻米粉。" },
  },
  "sv_dinner_trua_5_1": {
    en: { name: "Broken Rice with Grilled Pork Chop", desc: "Charcoal-grilled marinated pork chop over fragrant broken rice, with scallion oil, steamed egg meatloaf, and shredded pork skin." },
    ja: { name: "コムタム・豚ロース焼きご飯", desc: "香ばしい炭火焼きポークチョップにネギ油、スチーム卵焼き、豚皮細切りを添えたサイゴン名物の砕米ご飯。" },
    ko: { name: "껌 땀 - 숯불 돼지갈비 덮밥", desc: "달콤 짭조름한 숯불 돼지갈비와 파기름, 계란찜, 돼지껍질 채를 얹은 사이공 대표 덮밥." },
    zh: { name: "西贡碎米炭烤猪排饭", desc: "炭火香烤秘制猪扒淋葱油，佐以蒸蛋肉饼与细切肉皮。" },
  },
  "sv_dinner_trua_5_3": {
    en: { name: "Crispy Chicken Fried Rice", desc: "Whole fried chicken quarter with ultra-crispy skin over golden turmeric fried rice, accompanied by spicy soy garlic sauce." },
    ja: { name: "コム・ガー・ソイ・モー - パリパリ揚げ鶏飯", desc: "皮は驚くほどパリパリ、中はジューシーな大山鶏もも肉を、香ばしいガーリックライスとともに。" },
    ko: { name: "껌 가 쏘이 모 - 크리스피 치킨 덮밥", desc: "겉은 바삭하고 속은 촉촉한 닭다리 구이를 고소한 강황 볶음밥과 매콤 달콤 간장 소스에 곁들입니다." },
    zh: { name: "金牌脆皮炸鸡油饭", desc: "外皮薄脆酥香、肉汁丰盈的大鸡腿，配金黄鸡油炒饭。" },
  },
  "sv_lunch_banh_canh": {
    en: { name: "Thick Tapioca Noodle Soup", desc: "Chewy, thick tapioca-rice noodles in rich savory broth with tender pork, shrimp, and fresh cilantro." },
    ja: { name: "バイン・カン - 極太もちもちうどん", desc: "タピオカ粉入りの極太モチモチ麺を、豚骨や海鮮の旨味が凝縮した濃厚とろみスープで。" },
    ko: { name: "반 까인 - 굵은 쌀우동", desc: "타피오카가 들어가 쫄깃쫄깃하고 통통한 굵은 면에 진하고 깊은 고기 해산물 육수가 가득." },
    zh: { name: "浓汤粗圆木薯米粉", desc: "滑糯筋道粗木薯米粉，配鲜甜排骨大虾慢熬浓汤，口感温润醇厚。" },
  },
  "sv_lunch_bun_mam": {
    en: { name: "Mekong Fermented Fish Noodle Soup", desc: "Bold, fragrant fermented fish broth filled with crispy pork belly, shrimp, squid, eggplant, and water spinach." },
    ja: { name: "ブン・マム - メコン風発酵魚粉", desc: "発酵魚の奥深い特製スープに、カリカリ豚バラ、海老、イカ、茄子を贅沢にトッピング。" },
    ko: { name: "분 맘 - 메콩식 발효 생선 쌀국수", desc: "메콩강 특유의 발효 어간장 육수에 바삭한 삼겹살, 새우, 오징어, 가지를 푸짐하게 얹은 요리." },
    zh: { name: "湄公河海鲜发酵鱼汤米粉", desc: "南越特产香浓鱼露发酵汤底，豪迈加入脆皮烧肉、鲜虾、鱿鱼与多汁茄子。" },
  },
  "sv_lunch_sang_4_2": {
    en: { name: "Nam Vang Clear Noodle Soup", desc: "Chewy noodles topped with plump shrimp, quail eggs, and minced pork in clear sweet pork bone broth." },
    ja: { name: "フーティウ・ナムヴァン", desc: "コシのある米麺にプリプリの海老、うずら卵、ひき肉をのせ、豚骨の澄んだ甘い出汁で。" },
    ko: { name: "후띠우 남방 - 남부식 쌀국수", desc: "쫄깃한 쌀면에 통통한 새우, 메추리알, 다진 고기를 얹은 담백하고 깔끔한 돼지사골 국수." },
    zh: { name: "金边海鲜猪肉粿条", desc: "爽滑筋道粿条搭配大虾、鹌鹑蛋与鲜肉末，骨汤清甜醇美。" },
  },
  "sv_morning_banh_bao": {
    en: { name: "Steamed Pork Bun", desc: "Piping hot fluffy steamed bun stuffed with seasoned minced pork, quail egg, Chinese sausage, and mushrooms." },
    ja: { name: "ベトナム風肉まん", desc: "ふわふわ熱々の皮の中に、ジューシーな豚肉、うずら卵、中華ソーセージがぎっしり。" },
    ko: { name: "반 바오 - 베트남식 고기만두", desc: "포근한 찐빵 속에 양념 돼지고기, 메추리알, 소시지, 버섯이 꽉 찬 영양 간식." },
    zh: { name: "越式咸蛋肉包", desc: "松软雪白面皮，包裹特调鲜猪肉馅、鹌鹑蛋、香菇与越式腊肠，热气腾腾。" },
  },
  "sv_morning_banh_gio": {
    en: { name: "Pyramid Rice Dumpling", desc: "Silky soft rice dumpling wrapped in banana leaves, filled with minced pork, wood ear mushrooms, and shallots." },
    ja: { name: "バイン・ゾー - 蒸しピラミッド餅", desc: "バナナの葉に包まれた滑らかな米粉生地の中に、キクラゲと豚ひき肉の旨味が詰まった伝統蒸し菓子。" },
    ko: { name: "반 조 - 피라미드 쌀떡 덤플링", desc: "바나나잎에 싸서 찐 부드러운 쌀 반죽 속에 목이버섯과 다진 돼지고기를 채운 따뜻한 아침 식사." },
    zh: { name: "芭蕉叶越式肉粽", desc: "嫩滑米粉糕裹入脆嫩木耳与鲜肉，芭蕉叶清香蒸透，软糯咸鲜。" },
  },
  "sv_snacks_banh_bo": {
    en: { name: "Steamed Honeycomb Sponge Cake", desc: "Spongy, chewy steamed fermented rice cakes with honeycomb texture, drizzled with salted coconut sauce and toasted sesame." },
    ja: { name: "バイン・ボー - 蒸し米粉ハニカムケーキ", desc: "蜂の巣状の気泡が美しいモチモチの蒸しケーキに、塩気の効いた温かいココナッツソースと香ばしい胡麻。" },
    ko: { name: "반 보 - 베트남식 증편 꿀벌떡", desc: "벌집 모양의 쫄깃한 발효 쌀 찜떡에 짭조름하고 고소한 코코넛 소스와 볶은 참깨를 뿌려 먹습니다." },
    zh: { name: "蜂窝蒸米糕配椰浆芝麻", desc: "天然米浆发酵呈现细腻蜂窝气孔，松软微甜弹牙，淋咸甜椰子酱撒熟白芝麻。" },
  },
  "sv_snacks_banh_flan": {
    en: { name: "Vietnamese Caramel Flan", desc: "Velvety smooth egg caramel custard drenched in robust black coffee and crushed ice." },
    ja: { name: "バイン・フラン - ベトナム風プリン", desc: "濃厚でなめらかな手作り焼きプリンに、ほろ苦いブラックコーヒーと細氷をかけたサイゴンスタイル。" },
    ko: { name: "반 플란 - 베트남식 캐러멜 커스터드 푸딩", desc: "입안에서 부드럽게 녹아내리는 계란 푸딩 위에 진한 에스프레소 커피와 얼음을 얹어 즐기는 디저트." },
    zh: { name: "法式焦糖冰咖啡布丁", desc: "蛋香滑嫩手作焦糖鸡蛋布丁，淋冰镇香浓黑咖啡与细碎冰晶。" },
  },
  "sv_snacks_che_dau_den": {
    en: { name: "Sweet Black Bean Dessert Soup", desc: "Slow-cooked sweet black beans served chilled with ice, chewy boba pearls, and a drizzle of rich coconut milk." },
    ja: { name: "チェー・ダウ・デン - 黒豆のチェー", desc: "ほくほくに炊き上げた黒豆の優しい甘さに、もちもちのタピオカとココナッツミルク、氷をプラス。" },
    ko: { name: "체 더우 덴 - 검은콩 단팥 화채", desc: "부드럽게 삶은 달콤한 검은콩에 시원한 얼음, 쫄깃한 펄, 코코넛 밀크를 띄운 대표 디저트." },
    zh: { name: "经典清凉黑豆沙甜汤", desc: "精选黑豆文火煨透沙糯，加少许冰糖、Q弹椰果与碎冰，清热解燥。" },
  },
  "sv_snacks_che_dau_trang": {
    en: { name: "Sweet White Bean Sticky Rice Pudding", desc: "Tender white black-eyed peas and chewy sticky rice simmered in sweet syrup, topped with rich coconut cream." },
    ja: { name: "チェー・ダウ・チャン - 白豆ともち米のぜんざい", desc: "ふっくら煮た白豆ともち米を優しい甘さで仕上げ、濃厚な温かいココナッツミルクをかけて。" },
    ko: { name: "체 더우 뜨랑 - 흰콩 찹쌀 단팥죽", desc: "부드러운 흰콩과 찰진 찹쌀을 달콤하게 끓여 고소하고 진한 코코넛 크림을 듬뿍 얹은 전통 단죽." },
    zh: { name: "椰香温润白眉豆糯米甜粥", desc: "粉糯白眉豆与软黏糯米同煨清甜糖水，厚淋一层香醇浓郁热椰浆。" },
  },
  "sv_snacks_che_dau_xanh": {
    en: { name: "Mung Bean and Aloe Vera Sweet Soup", desc: "Refreshing chilled sweet soup with peeled mung beans and juicy crunchy aloe vera in light rock sugar syrup." },
    ja: { name: "チェー・ダウ・サイン・ニャー・ダム - 緑豆とアロエのチェー", desc: "さっぱりとした緑豆とシャキシャキのアロエを氷砂糖で煮詰めた、爽やかでヘルシーな冷たいスイーツ。" },
    ko: { name: "체 더우 싸인 냐 담 - 녹두 알로에 화채", desc: "몸을 맑게 해주는 녹두와 아삭아삭한 신선한 알로에를 맑은 빙탕 시럽에 담아낸 시원한 여름 디저트." },
    zh: { name: "清心绿豆芦荟冰糖甜汤", desc: "脱皮金黄绿豆起沙，配爽脆多汁芦荟颗粒与晶莹冰糖水，清心润燥。" },
  },
  "sv_snacks_chieu_3_1": {
    en: { name: "Clear Tapioca Shrimp Dumplings", desc: "Translucent chewy tapioca dumplings stuffed with savory caramelized shrimp and pork belly, sprinkled with fried shallots." },
    ja: { name: "バイン・ボット・ロック - タピオカ海老餃子", desc: "ぷるぷる透明なタピオカ粉の皮に、甘辛く煮た小海老と豚肉を包んだフエ伝統の絶品点心。" },
    ko: { name: "반 봇 록 - 투명 타피오카 새우 덤플링", desc: "쫀득하고 투명한 타피오카 피에 조린 새우와 삼겹살을 넣어 바나나잎에 찐 후에식 만두." },
    zh: { name: "晶莹透明木薯鲜虾饺", desc: "通体晶亮弹牙木薯皮，内裹浓郁焦糖香炒小河虾与五花肉。" },
  },
  "sv_snacks_chieu_5_2": {
    en: { name: "Fresh Summer Spring Rolls", desc: "Translucent rice paper rolls filled with boiled shrimp, sliced pork, vermicelli, and aromatic herbs, paired with peanut sauce." },
    ja: { name: "生春巻き", desc: "透き通るライスペーパーで海老、豚肉、米麺、ミントを巻き、濃厚な自家製ピーナッツ味噌ダレで。" },
    ko: { name: "고이 꾸온 - 베트남 생월남쌈", desc: "투명한 라이스페이퍼에 탱글탱글한 새우, 돼지고기, 쌀국수, 신선한 야채를 말아 고소한 땅콩소스에 찍어 먹습니다." },
    zh: { name: "鲜虾猪肉越式生春卷", desc: "晶莹透亮薄米纸卷入甜虾、白切肉、米粉与清香薄荷，蘸醇滑秘制花生酱。" },
  },
  "toi_3_1": {
    en: { name: "Silky Pork Rib Rice Porridge", desc: "Velvety smooth rice porridge slow-simmered with tender pork ribs, garnished with shredded pork floss and crispy crullers (quẩy)." },
    ja: { name: "チャオ・スオン - 豚あばら肉のトロトロお粥", desc: "豚スペアリブの出汁でじっくり炊き上げたシルクのように滑らかなお粥に、揚げパン(クワイ)と豚肉フロスを添えて。" },
    ko: { name: "짜오 쓰언 - 돼지갈비 쌀죽", desc: "돼지등갈비를 푹 고아 부드럽고 실크처럼 끓여낸 쌀죽에 바삭한 꽈배기 튀김(꿔이)을 곁들입니다." },
    zh: { name: "软滑生滚排骨稠粥", desc: "精磨米浆慢火熬至绸缎般细腻，融汇排骨鲜香，撒蓬松肉松与酥脆油条段。" },
  },
  "toi_3_2": {
    en: { name: "Chicken Glass Noodle Soup", desc: "Clear, fragrant chicken bone broth with chewy mung bean glass noodles, poached free-range chicken, and fresh kaffir lime leaves." },
    ja: { name: "ミエン・ガー - 鶏肉と春雨のスープ", desc: "旨味たっぷりの丸鶏スープに、コシのある緑豆春雨と歯ごたえある地鶏肉、ライムリーフの香りを添えて。" },
    ko: { name: "미엔 가 - 닭고기 당면 쌀국수", desc: "진한 토종닭 육수에 쫄깃한 녹두 당면과 쫄깃한 닭고기살, 상큼한 라임 잎을 띄운 맑은 탕." },
    zh: { name: "青柠叶土鸡水晶冬粉", desc: "老母鸡慢火炖出澄黄清汤，滑韧绿豆粉丝配鲜嫩手撕走地鸡肉与细切柠檬叶丝。" },
  },
  "toi_4_1": {
    en: { name: "Boiled Snails with Lemongrass and Ginger", desc: "Fresh sea snails steamed with fragrant lemongrass stems, kaffir lime leaves, and ginger, paired with tangy spicy ginger fish sauce." },
    ja: { name: "レモングラス蒸し巻き貝", desc: "レモングラスやライムリーフとともにふっくら蒸し上げた新鮮な貝を、ショウガと唐辛子のタレで。" },
    ko: { name: "옥 루옥 - 레몬글라스 골뱅이 찜", desc: "신선한 고둥과 우렁이를 레몬글라스와 생강으로 쪄내 매콤알싸한 생강 느억맘에 찍어 먹습니다." },
    zh: { name: "香茅姜叶清蒸螺蛳", desc: "鲜活田螺配粗剖鲜香茅段与柠檬叶大火煮透，蘸特调姜汁酸甜红椒鱼露。" },
  },
  "toi_4_2": {
    en: { name: "Sizzling Sliced Beef on Cast Iron", desc: "Sizzling hot cast iron skillet with tender beef steak, fried eggs, rich pâté, and melted butter, served with hot baguette." },
    ja: { name: "ボー・ネー - 鉄板サイコロステーキ", desc: "牛型鉄板でジュージュー焼かれた柔らかい牛肉、目玉焼き、パテ、バターを熱々のバインミーとともに。" },
    ko: { name: "보 네 - 베트남식 철판 스테이크", desc: "뜨거운 소 모양 철판 위에 부드러운 소고기 스테이크, 계란후라이, 파테, 버터를 바게트와 함께 즐깁니다." },
    zh: { name: "越式铁板滑蛋嫩牛柳", desc: "牛形烧热铸铁盘，盛放蒜香牛柳条、荷包蛋、香润肉酱与融化黄油，佐以香脆法棍。" },
  },
  "toi_5_1": {
    en: { name: "Mini Thai Hotpot", desc: "Steaming individual tom yum pot loaded with fresh shrimp, squid, beef slices, mushrooms, and greens in lemongrass broth." },
    ja: { name: "ミニ・トムヤム鍋", desc: "レモングラスとハーブ香る甘酸っぱくスパイシーなスープに、海老、イカ、牛肉、キノコを入れた小鍋。" },
    ko: { name: "미니 타이 해물 샤브샤브", desc: "싱싱한 새우, 오징어, 소고기와 채소가 가득한 향긋하고 칼칼한 똠얌 1인 전골 냄비." },
    zh: { name: "泰式冬阴功单人小火锅", desc: "香茅柠檬叶慢火滚煨酸辣浓汤，盛满大虾、鱿鱼、肥牛卷与爽口菌菇鲜蔬。" },
  },
  "toi_5_2": {
    en: { name: "Tofu, Pork Belly, and Fermented Shrimp Paste Noodles", desc: "Crisp fried tofu cubes, boiled pork belly, crispy rice pork patties, and herbs served with pungent whipped shrimp paste dip." },
    ja: { name: "ブン・ダウ・マム・トム", desc: "揚げたて熱々の豆腐、茹で豚バラ、揚げ豚肉パテを、泡立てた特製エビ発酵ダレ(マムトム)につけて。" },
    ko: { name: "분 더우 맘 똠", desc: "겉바속촉 튀긴 두부, 부드러운 수육, 꼼 소시지를 쿰쿰하고 매력적인 발효 새우젓(맘똠)에 찍어 먹는 하노이 정통 요리." },
    zh: { name: "河内炸豆腐五花肉蘸虾酱米粉", desc: "金黄外脆内嫩现炸豆腐，配白灼五花肉片、香脆米绿肉饼与特调发酵虾酱。" },
  },
  "toi_5_3": {
    en: { name: "Vietnamese Sizzling Marinated Beef", desc: "Tender beef slices marinated with lemongrass, sesame, and butter, grilled table-side on tin foil with spicy dipping sauce." },
    ja: { name: "ベトナム風牛焼き肉", desc: "レモングラスやゴマで下味をつけた柔らかい牛肉を、バターを敷いた鉄板で香ばしく焼き上げて。" },
    ko: { name: "보 느엉 - 베트남식 소고기 버터 구이", desc: "레몬글라스와 참깨로 숙성한 부드러운 소고기를 버터와 함께 즉석에서 구워 먹는 별미." },
    zh: { name: "越式香芒黄油炭烤嫩牛肉", desc: "香茅、秘制沙茶与芝麻腌渍极嫩牛肉片，加浓醇黄油在烤盘上滋滋现烤。" },
  },
  "trua_3_1": {
    en: { name: "Fried Rice with Beef and Pickled Greens", desc: "Wok-charred fried rice topped with tender beef strips stir-fried with crunchy, tangy pickled mustard greens." },
    ja: { name: "高菜と牛肉の炒飯", desc: "パラパラに炒めたご飯に、甘酸っぱい発酵からし菜と柔らかい牛肉の炒めものを合わせた北部の人気飯。" },
    ko: { name: "껌 랑 주아 보 - 소고기 갓김치 볶음밥", desc: "센 불에 볶아낸 고슬고슬한 볶음밥 위에 새콤한 절임 갓과 부드러운 소고기 볶음을 얹은 메뉴." },
    zh: { name: "酸菜牛肉粒黄金炒饭", desc: "大火粒粒分明镬气炒饭，配上酸爽开胃酸菜炒鲜嫩牛肉片，百吃不腻。" },
  },
  "trua_3_2": {
    en: { name: "Hanoi Mixed Dry Pho", desc: "Fresh flat rice noodles tossed in a sweet-savory soy dressing with shredded chicken or beef, herbs, and crushed peanuts." },
    ja: { name: "フォー・チョン - 混ぜフォー", desc: "茹でたて平打ちフォーに蒸し鶏や牛肉、揚げエシャロット、ピーナッツを特製甘酸っぱいタレで和えて。" },
    ko: { name: "퍼 쫀 - 하노이식 비빔 쌀국수", desc: "부드러운 쌀면에 닭고기 또는 소고기, 신선한 야채, 땅콩을 새콤달콤 특제 간장 소스에 비빈 여름 별미." },
    zh: { name: "河内特调酸甜拌河粉", desc: "爽滑宽河粉拌入秘制浓香酱汁，铺嫩撕鸡肉或牛肉片、脆花生与新鲜薄荷叶。" },
  },
  "trua_4_1": {
    en: { name: "Quang-style Turmeric Noodles", desc: "Wide yellow turmeric noodles in a shallow, intense broth topped with shrimp, pork, roasted peanuts, and crispy rice cracker." },
    ja: { name: "ミークアン - 中部風和え麺", desc: "鮮やかな黄色い平打ち麺に海老、豚肉、砕いたピーナッツ、ライスクラッカーをのせたダナン・ホイアン名物。" },
    ko: { name: "미꽝 - 다낭식 비빔 쌀국수", desc: "노란 강황 넓은 면에 새우, 돼지고기, 고소한 땅콩과 바삭한 라이스 크래커를 자작한 육수에 비벼 먹습니다." },
    zh: { name: "岘港广南姜黄拌面", desc: "金黄姜黄宽米粉拌入浓醇少汁卤汤，铺鲜虾、猪肉、香脆花生碎与越式烤米饼。" },
  },
  "trua_4_2": {
    en: { name: "Grilled Pork Noodle Salad", desc: "Rice vermicelli bowl layered with lemongrass-grilled pork, crispy spring rolls, fresh herbs, peanuts, and chili nuoc cham." },
    ja: { name: "ブン・ティット・ヌオン - 豚焼き肉のせ和え麺", desc: "レモングラス香る炭火豚肉と揚げ春巻きを米麺にのせ、生野菜とピーナッツ、ヌクマムダレで豪快に混ぜて。" },
    ko: { name: "분 팃 느엉 - 숯불 돼지고기 비빔국수", desc: "향긋한 레몬글라스 숯불구이 돼지고기, 바삭한 짜조, 채소를 땅콩과 새콤달콤 소스에 비벼 먹는 국수." },
    zh: { name: "香茅炭烤猪肉干拌粉", desc: "炭烤香茅猪肉片配酥脆炸春卷，拌入大量生菜、炸花生粒与酸甜辣椒鱼露。" },
  },
  "trua_5_1": {
    en: { name: "Broken Rice with Grilled Pork Chop", desc: "Charcoal-grilled marinated pork chop over fragrant broken rice, with scallion oil, steamed egg meatloaf, and shredded pork skin." },
    ja: { name: "コムタム・豚ロース焼きご飯", desc: "香ばしい炭火焼きポークチョップにネギ油、スチーム卵焼き、豚皮細切りを添えたサイゴン名物の砕米ご飯。" },
    ko: { name: "껌 땀 - 숯불 돼지갈비 덮밥", desc: "달콤 짭조름한 숯불 돼지갈비와 파기름, 계란찜, 돼지껍질 채를 얹은 사이공 대표 덮밥." },
    zh: { name: "西贡碎米炭烤猪排饭", desc: "炭火香烤秘制猪扒淋葱油，佐以蒸蛋肉饼与细切肉皮，搭配经典酸甜鱼露。" },
  },
  "trua_5_2": {
    en: { name: "Hanoi Grilled Pork with Vermicelli", desc: "Caramelized charcoal-grilled pork patties and pork belly in warm sweet-savory broth with rice vermicelli and herbs." },
    ja: { name: "ブン・チャー - ハノイ風つけ麺", desc: "炭火で香ばしく焼いた豚肉団子とバラ肉が入った温かい甘酸っぱいタレに、米麺と香草をつけて。" },
    ko: { name: "분 짜 - 하노이식 숯불고기 비빔국수", desc: "달콤새콤한 느억맘 육수에 숯불 향 가득한 완자와 삼겹살을 쌀국수, 신선한 야채와 함께 적셔 먹습니다." },
    zh: { name: "河内炭烤猪肉蘸汁米粉", desc: "炭火现烤猪肉丸与五花肉浸入温热酸甜特调鱼露汁，配纯白米粉与清爽香草。" },
  },
  "trua_5_3": {
    en: { name: "Crispy Chicken Fried Rice", desc: "Whole fried chicken quarter with ultra-crispy skin over golden turmeric fried rice, accompanied by spicy soy garlic sauce." },
    ja: { name: "コム・ガー・ソイ・モー - パリパリ揚げ鶏飯", desc: "皮は驚くほどパリパリ、中はジューシーな大山鶏もも肉を、香ばしいガーリックライスとともに。" },
    ko: { name: "껌 가 쏘이 모 - 크리스피 치킨 덮밥", desc: "겉은 바삭하고 속은 촉촉한 닭다리 구이를 고소한 강황 볶음밥과 매콤 달콤 간장 소스에 곁들입니다." },
    zh: { name: "金牌脆皮炸鸡油饭", desc: "外皮薄脆酥香、肉汁丰盈的大鸡腿，配金黄鸡油炒饭与秘制蒜香红油酱油。" },
  },
  "vat_3_1": {
    en: { name: "Assorted Fried Street Meatballs", desc: "Golden fried fish balls, beef balls, shrimp balls, and tofu skewers glazed with chili garlic sauce." },
    ja: { name: "カー・ビエン・チエン - 魚団子串揚げ", desc: "ぷりぷりの魚団子や海老団子を油でカリッと揚げ、甘辛チリソースとサクサクのニンニクチップで。" },
    ko: { name: "까 비엔 치엔 - 어묵 꼬치 튀김", desc: "바삭하게 튀겨낸 탱글탱글한 생선 완자, 소고기 완자에 마늘 칠리소스와 매콤한 양념을 곁들인 길거리 꼬치." },
    zh: { name: "经典路边香炸鱼丸串", desc: "油锅现炸金黄膨脆鱼丸、牛肉丸与虾丸，淋特调甜辣蒜香酱与酥炸大蒜粒。" },
  },
  "vat_4_1": {
    en: { name: "Deep-fried Fermented Pork Rolls", desc: "Crispy golden on the outside, tender and slightly chewy on the inside, served hot with sweet-spicy chili dip." },
    ja: { name: "ネム・チュア・ザン - 揚げ発酵ソーセージ", desc: "外はサクサク、中はもっちりジューシーに揚げた発酵豚肉ロール。甘辛いチリソースにつけて。" },
    ko: { name: "넴 쭈아 란 - 바삭 튀긴 베트남 소시지", desc: "겉은 바삭하고 속은 쫄깃한 발효 돼지고기 롤 튀김에 매콤달콤 칠리소스를 찍어 먹는 하노이 골목 인기 간식." },
    zh: { name: "香脆炸越式发酵酸肉棒", desc: "外层金黄脆香，内里微酸弹牙鲜韧，热气腾腾蘸甜辣酱。" },
  },
  "vat_4_2": {
    en: { name: "Grilled Rice Paper \"Vietnamese Pizza\" (Bánh Tráng Nướng)", desc: "Crisp charcoal-grilled rice paper topped with butter, quail egg, minced pork, scallions, dried shrimp, and spicy mayo." },
    ja: { name: "バイン・チャン・ヌオン - ベトナム風ピザ", desc: "炭火で香ばしく焼いたライスペーパーに、卵、ネギ油、干し海老、マヨネーズをのせたダラット名物ピザ。" },
    ko: { name: "반 짱 느엉 - 베트남식 라이스페이퍼 피자", desc: "숯불에 바삭하게 구운 라이스페이퍼 위에 계란, 파기름, 건새우, 칠리 마요네즈를 올린 다랏식 피자." },
    zh: { name: "大叻炭烤米纸脆脆饼", desc: "炭火现烤薄韧米纸，抹黄油、鹌鹑蛋、碎肉末、葱花与小干虾，淋甜辣酱与蛋黄酱。" },
  },
  "vat_5_1": {
    en: { name: "Mixed Rice Paper Salad", desc: "Torn rice paper shreds tossed with dried beef, green mango, quail eggs, fried shallots, Vietnamese coriander, and tangy chili dressing." },
    ja: { name: "バイン・チャン・チョン - ベトナム風ライスペーパー和え", desc: "細切りライスペーパーに青マンゴー、干し牛肉、うずら卵、ハーブを合わせ、甘酸っぱいタマリンドダレで和えた大人気おやつ。" },
    ko: { name: "반 짱 쫀 - 라이스페이퍼 비빔 무침", desc: "잘게 썬 라이스페이퍼에 그린망고, 육포, 메추리알, 튀긴 샬롯을 새콤달콤 타마린드 소스에 무쳐 먹는 국민 길거리 간식." },
    zh: { name: "西贡酸辣什锦拌米纸", desc: "细切薄韧米纸拌入青芒果丝、牛肉干碎、鹌鹑蛋与金不换香草，淋酸甜浓郁罗望子汁。" },
  },
  "vat_5_2": {
    en: { name: "Thai Mixed Dessert Soup", desc: "Sweet coconut milk dessert bowl brimming with jackfruit, durian, coconut jelly, ruby water chestnuts, and crushed ice." },
    ja: { name: "チェー・タイ - フルーツとゼリーのココナッツ練乳がけ", desc: "ジャックフルーツ、ドリアン、ロンガン、色鮮やかなゼリーに濃厚なココナッツミルクと氷を合わせたデザート。" },
    ko: { name: "체 타이 - 타이식 과일 코코넛 화채", desc: "잭푸르트, 두리안, 젤리, 밤에 부드러운 코코넛 밀크와 갈아 넣은 얼음을 띄운 시원하고 달콤한 디저트." },
    zh: { name: "泰式椰汁多宝甜汤", desc: "椰浆冰沙盛满金黄菠萝蜜、榴莲果肉、清脆马蹄粉圆与椰果，甜爽沁凉。" },
  },

  ja_m_1: {"vi": {"name": "Cơm trộn trứng gà tươi TKG", "desc": "Cơm nóng xới dẻo đập trứng gà tươi thanh trùng, rưới nước tương dashi và rắc rong biển katsuobushi."}, "en": {"name": "Cơm trộn trứng gà tươi TKG", "desc": "Delightful and authentic Cơm trộn trứng gà tươi TKG prepared with fresh high quality ingredients."}, "ja": {"name": "卵かけご飯 (TKG)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm trộn trứng gà tươi TKG", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm trộn trứng gà tươi TKG", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_2: {"vi": {"name": "Cơm cá hồi nướng muối & súp Miso", "desc": "Cá hồi nướng than da giòn thịt ngọt, súp miso đậu hũ nóng, dưa muối tsukemono và rong biển nori."}, "en": {"name": "Cơm cá hồi nướng muối & súp Miso", "desc": "Delightful and authentic Cơm cá hồi nướng muối & súp Miso prepared with fresh high quality ingredients."}, "ja": {"name": "鮭の塩焼き朝定食", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm cá hồi nướng muối & súp Miso", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm cá hồi nướng muối & súp Miso", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_3: {"vi": {"name": "Cơm chan nước trà cá tráp đỏ Tai-chazuke", "desc": "Lát cá tráp đỏ biển tươi ướp sốt mè đậm đà đặt lên cơm nóng rồi chan ngập nước trà xanh dashi sôi nghi ngút khói."}, "en": {"name": "Kyoto Red Sea Bream Chazuke", "desc": "Fresh slices of delicate sea bream marinated in rich sesame tare over steamed rice, drenched in hot dashi tea."}, "ja": {"name": "鯛茶漬け", "desc": "新鮮な真鯛を特製胡麻ダレに絡め、熱々の香り高いお出汁を注いでいただく京都名物。"}, "ko": {"name": "교토식 도미 오차즈케", "desc": "고소한 참깨 소스에 버무린 신선한 도미 살을 따뜻한 밥 위에 얹고 향긋한 다시 차를 부어 먹는 요리."}, "zh": {"name": "京都红鲷鱼茶泡饭", "desc": "鲜活红鲷鱼片裹满秘制芝麻酱汁，浇上滚烫香浓出汁高汤，清雅至味。"}},
  ja_m_4: {"vi": {"name": "Sandwich trứng béo ngậy Tamago Sando", "desc": "Bánh mì gối kẹp ngập nhân trứng dashi nghiền sốt mayo béo ngậy mềm mịn trứ danh combini."}, "en": {"name": "Sandwich trứng béo ngậy Tamago Sando", "desc": "Delightful and authentic Sandwich trứng béo ngậy Tamago Sando prepared with fresh high quality ingredients."}, "ja": {"name": "たまごサンド", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sandwich trứng béo ngậy Tamago Sando", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sandwich trứng béo ngậy Tamago Sando", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_5: {"vi": {"name": "Bánh mì nướng bơ đậu đỏ Ogura Toast", "desc": "Đặc sản cà phê kissaten Nagoya: lát bánh mì dày nướng bơ thơm nức phết mứt đậu đỏ Azuki ngọt dịu."}, "en": {"name": "Bánh mì nướng bơ đậu đỏ Ogura Toast", "desc": "Delightful and authentic Bánh mì nướng bơ đậu đỏ Ogura Toast prepared with fresh high quality ingredients."}, "ja": {"name": "小倉トースト", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì nướng bơ đậu đỏ Ogura Toast", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì nướng bơ đậu đỏ Ogura Toast", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_6: {"vi": {"name": "Cháo trắng mơ muối chua thanh Umeboshi", "desc": "Bát cháo gạo mới ninh nhừ điểm quả mơ muối tía tô đỏ au, ấm bụng và thanh lọc cơ thể."}, "en": {"name": "Cháo trắng mơ muối chua thanh Umeboshi", "desc": "Delightful and authentic Cháo trắng mơ muối chua thanh Umeboshi prepared with fresh high quality ingredients."}, "ja": {"name": "梅干しがゆ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cháo trắng mơ muối chua thanh Umeboshi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cháo trắng mơ muối chua thanh Umeboshi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_7: {"vi": {"name": "Cơm đậu tương lên men Natto truyền thống", "desc": "Bát đậu nành lên men khuấy đều sủi tơ cùng mù tạt vàng karashi, hành hoa và lòng đỏ trứng gà."}, "en": {"name": "Cơm đậu tương lên men Natto truyền thống", "desc": "Delightful and authentic Cơm đậu tương lên men Natto truyền thống prepared with fresh high quality ingredients."}, "ja": {"name": "納豆朝定食", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm đậu tương lên men Natto truyền thống", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm đậu tương lên men Natto truyền thống", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_8: {"vi": {"name": "Cá nục kho sốt Miso đậm đà", "desc": "Cá nục tươi kho nhừ thấm đẫm sốt miso nâu đỏ ngọt bùi, ăn cùng cơm dẻo và củ cải muối."}, "en": {"name": "Cá nục kho sốt Miso đậm đà", "desc": "Delightful and authentic Cá nục kho sốt Miso đậm đà prepared with fresh high quality ingredients."}, "ja": {"name": "鯖の味噌煮定食", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá nục kho sốt Miso đậm đà", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cá nục kho sốt Miso đậm đà", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_m_9: {"vi": {"name": "Cơm nắm muối Shio-musubi & Súp nghêu Miso", "desc": "Hai nắm cơm rắc muối biển bọc rong biển giòn rụm kèm tô súp miso nghêu ngọt lịm đậm vị biển."}, "en": {"name": "Cơm nắm muối Shio-musubi & Súp nghêu Miso", "desc": "Delightful and authentic Cơm nắm muối Shio-musubi & Súp nghêu Miso prepared with fresh high quality ingredients."}, "ja": {"name": "あさり味噌汁と塩むすび", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm nắm muối Shio-musubi & Súp nghêu Miso", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm nắm muối Shio-musubi & Súp nghêu Miso", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_1: {"vi": {"name": "Sushi tổng hợp cao cấp Nigiri Sushi", "desc": "8 miếng sushi cá hồi Nauy, cá ngừ Akami, tôm ngọt Amaebi, lươn nướng Unagi, sò đỏ trên cơm giấm."}, "en": {"name": "Sushi tổng hợp cao cấp Nigiri Sushi", "desc": "Delightful and authentic Sushi tổng hợp cao cấp Nigiri Sushi prepared with fresh high quality ingredients."}, "ja": {"name": "特上握り寿司盛り合わせ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sushi tổng hợp cao cấp Nigiri Sushi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sushi tổng hợp cao cấp Nigiri Sushi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_2: {"vi": {"name": "Cơm bát hải sản tươi sống Chirashizushi", "desc": "Tô cơm giấm phủ ngập cá hồi, cá ngừ, sò điệp Hokkaido, trứng cá chuồn giòn tanh tách."}, "en": {"name": "Cơm bát hải sản tươi sống Chirashizushi", "desc": "Delightful and authentic Cơm bát hải sản tươi sống Chirashizushi prepared with fresh high quality ingredients."}, "ja": {"name": "海鮮ちらし寿司", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm bát hải sản tươi sống Chirashizushi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm bát hải sản tươi sống Chirashizushi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_3: {"vi": {"name": "Mì Ramen súp xương hầm Hakata Tonkotsu", "desc": "Sợi mì tươi súp xương heo hầm cô đặc 14 tiếng trắng ngà béo ngậy, thịt xá xíu chashu mềm tan."}, "en": {"name": "Mì Ramen súp xương hầm Hakata Tonkotsu", "desc": "Delightful and authentic Mì Ramen súp xương hầm Hakata Tonkotsu prepared with fresh high quality ingredients."}, "ja": {"name": "博多豚骨ラーメン", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì Ramen súp xương hầm Hakata Tonkotsu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì Ramen súp xương hầm Hakata Tonkotsu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_4: {"vi": {"name": "Mì Ramen Miso bơ ngô ngọt Sapporo", "desc": "Đặc sản Hokkaido: nước súp miso đậm đà thả viên bơ vàng óng tan chảy và bắp ngọt giòn sần sật."}, "en": {"name": "Mì Ramen Miso bơ ngô ngọt Sapporo", "desc": "Delightful and authentic Mì Ramen Miso bơ ngô ngọt Sapporo prepared with fresh high quality ingredients."}, "ja": {"name": "札幌味噌バターコーンラーメン", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì Ramen Miso bơ ngô ngọt Sapporo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì Ramen Miso bơ ngô ngọt Sapporo", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_5: {"vi": {"name": "Cơm sườn heo chiên xù sốt trứng Katsudon", "desc": "Miếng thịt heo cốt lết chiên xù giòn tan om sốt hành tây ngọt và trứng gà bông mềm trên bát cơm trắng."}, "en": {"name": "Cơm sườn heo chiên xù sốt trứng Katsudon", "desc": "Delightful and authentic Cơm sườn heo chiên xù sốt trứng Katsudon prepared with fresh high quality ingredients."}, "ja": {"name": "特製かつ丼", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm sườn heo chiên xù sốt trứng Katsudon", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm sườn heo chiên xù sốt trứng Katsudon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_6: {"vi": {"name": "Cơm thịt bò xào hành tây sốt Gyudon trứng lòng đào", "desc": "Thịt bò thái lát mỏng hầm nước tương mirin và hành tây ngọt mềm, phủ quả trứng onsen tamago béo ngậy."}, "en": {"name": "Cơm thịt bò xào hành tây sốt Gyudon trứng lòng đào", "desc": "Delightful and authentic Cơm thịt bò xào hành tây sốt Gyudon trứng lòng đào prepared with fresh high quality ingredients."}, "ja": {"name": "牛丼 (温玉のせ)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm thịt bò xào hành tây sốt Gyudon trứng lòng đào", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm thịt bò xào hành tây sốt Gyudon trứng lòng đào", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_7: {"vi": {"name": "Mì Udon Sanuki tôm chiên giòn Tempura", "desc": "Sợi mì Udon dai giòn trứ danh Kagawa trong nước dùng dashi thanh ngọt cá bào, kèm 2 con tôm sú chiên giòn."}, "en": {"name": "Mì Udon Sanuki tôm chiên giòn Tempura", "desc": "Delightful and authentic Mì Udon Sanuki tôm chiên giòn Tempura prepared with fresh high quality ingredients."}, "ja": {"name": "讃岐海老天うどん", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì Udon Sanuki tôm chiên giòn Tempura", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì Udon Sanuki tôm chiên giòn Tempura", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_8: {"vi": {"name": "Mì kiều mạch lạnh kèm Tempura giòn Zaru Soba", "desc": "Mì soba kiều mạch ướp đá lạnh chấm sốt tsuyu đậm đà mù tạt wasabi, kèm đĩa tempura tôm rau củ."}, "en": {"name": "Mì kiều mạch lạnh kèm Tempura giòn Zaru Soba", "desc": "Delightful and authentic Mì kiều mạch lạnh kèm Tempura giòn Zaru Soba prepared with fresh high quality ingredients."}, "ja": {"name": "ざる蕎麦 天ぷら添え", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì kiều mạch lạnh kèm Tempura giòn Zaru Soba", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì kiều mạch lạnh kèm Tempura giòn Zaru Soba", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_9: {"vi": {"name": "Cơm cà ri sườn heo chiên xù Tonkatsu Curry", "desc": "Sốt cà ri Nhật đậm đà phủ lên miếng thịt heo chiên xù giòn tan và cơm trắng nóng hổi."}, "en": {"name": "Cơm cà ri sườn heo chiên xù Tonkatsu Curry", "desc": "Delightful and authentic Cơm cà ri sườn heo chiên xù Tonkatsu Curry prepared with fresh high quality ingredients."}, "ja": {"name": "ロースカツカレー", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm cà ri sườn heo chiên xù Tonkatsu Curry", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm cà ri sườn heo chiên xù Tonkatsu Curry", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_10: {"vi": {"name": "Cơm lươn nướng than hoa Nagoya Hitsumabushi", "desc": "Lươn nướng than hoa óng ả sốt tare, ăn theo 3 cách: ăn nguyên vị, trộn gia vị, và chan dashi nóng."}, "en": {"name": "Cơm lươn nướng than hoa Nagoya Hitsumabushi", "desc": "Delightful and authentic Cơm lươn nướng than hoa Nagoya Hitsumabushi prepared with fresh high quality ingredients."}, "ja": {"name": "名物ひつまぶし", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm lươn nướng than hoa Nagoya Hitsumabushi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm lươn nướng than hoa Nagoya Hitsumabushi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_11: {"vi": {"name": "Cơm gà xào trứng lòng đào Oyakodon", "desc": "Thịt gà đùi mềm ngọt om cùng trứng gà lòng đào bồng bềnh và hành baro thơm phức."}, "en": {"name": "Cơm gà xào trứng lòng đào Oyakodon", "desc": "Delightful and authentic Cơm gà xào trứng lòng đào Oyakodon prepared with fresh high quality ingredients."}, "ja": {"name": "親子丼", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm gà xào trứng lòng đào Oyakodon", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm gà xào trứng lòng đào Oyakodon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_l_12: {"vi": {"name": "Mì lạnh mùa hè sốt dầu mè Hiyashi Chuka", "desc": "Mì sợi ướp lạnh bày dưa leo, trứng thái chỉ, giăm bông, tôm luộc và rưới sốt giấm mè thanh mát."}, "en": {"name": "Mì lạnh mùa hè sốt dầu mè Hiyashi Chuka", "desc": "Delightful and authentic Mì lạnh mùa hè sốt dầu mè Hiyashi Chuka prepared with fresh high quality ingredients."}, "ja": {"name": "冷やし中華", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì lạnh mùa hè sốt dầu mè Hiyashi Chuka", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì lạnh mùa hè sốt dầu mè Hiyashi Chuka", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_1: {"vi": {"name": "Bánh bạch tuộc nướng Takoyaki Osaka", "desc": "Viên bánh tròn nóng hổi nhân bạch tuộc giòn sần sật, rưới sốt ngọt, sốt mayo và cá bào nhảy múa."}, "en": {"name": "Bánh bạch tuộc nướng Takoyaki Osaka", "desc": "Delightful and authentic Bánh bạch tuộc nướng Takoyaki Osaka prepared with fresh high quality ingredients."}, "ja": {"name": "大阪名物たこ焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh bạch tuộc nướng Takoyaki Osaka", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh bạch tuộc nướng Takoyaki Osaka", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_2: {"vi": {"name": "Bánh xèo Nhật Bản Hiroshima Okonomiyaki", "desc": "Bánh xèo nhiều lớp: đế mỏng, núi bắp cải ngọt lịm, thịt ba chỉ, mì yakisoba, trứng phủ sốt rong biển."}, "en": {"name": "Bánh xèo Nhật Bản Hiroshima Okonomiyaki", "desc": "Delightful and authentic Bánh xèo Nhật Bản Hiroshima Okonomiyaki prepared with fresh high quality ingredients."}, "ja": {"name": "広島風お好み焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh xèo Nhật Bản Hiroshima Okonomiyaki", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh xèo Nhật Bản Hiroshima Okonomiyaki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_3: {"vi": {"name": "Bánh đồng xu 10 Yên phô mai kéo sợi", "desc": "Bánh bông lan hình đồng xu 10 Yên nướng thơm nức bơ vani, cắn ngập phô mai mozzarella kéo sợi 1 mét."}, "en": {"name": "Bánh đồng xu 10 Yên phô mai kéo sợi", "desc": "Delightful and authentic Bánh đồng xu 10 Yên phô mai kéo sợi prepared with fresh high quality ingredients."}, "ja": {"name": "10円パン (チーズ)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh đồng xu 10 Yên phô mai kéo sợi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh đồng xu 10 Yên phô mai kéo sợi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_4: {"vi": {"name": "Bánh cá nướng Taiyaki nhân đậu đỏ Azuki", "desc": "Bánh hình cá tráp may mắn nướng khuôn gang giòn rụm, nhân đậu đỏ nhuyễn ngọt bùi hoặc kem custard."}, "en": {"name": "Bánh cá nướng Taiyaki nhân đậu đỏ Azuki", "desc": "Delightful and authentic Bánh cá nướng Taiyaki nhân đậu đỏ Azuki prepared with fresh high quality ingredients."}, "ja": {"name": "たい焼き (粒あん)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh cá nướng Taiyaki nhân đậu đỏ Azuki", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh cá nướng Taiyaki nhân đậu đỏ Azuki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_5: {"vi": {"name": "Bánh bao kẹp mì xào Yakisoba Pan", "desc": "Bánh mì mềm kẹp đầy ắp mì sợi xào sốt mặn ngọt bắp cải gừng đỏ, món ăn tuổi thơ học đường Nhật."}, "en": {"name": "Bánh bao kẹp mì xào Yakisoba Pan", "desc": "Delightful and authentic Bánh bao kẹp mì xào Yakisoba Pan prepared with fresh high quality ingredients."}, "ja": {"name": "焼きそばパン", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh bao kẹp mì xào Yakisoba Pan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh bao kẹp mì xào Yakisoba Pan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_6: {"vi": {"name": "Gà rán giòn Karaage xiên que chiên giòn", "desc": "Từng miếng đùi gà ướp gừng tỏi xì dầu lăn bột chiên 2 lần giòn rụm, vắt chanh tươi ăn liền."}, "en": {"name": "Gà rán giòn Karaage xiên que chiên giòn", "desc": "Delightful and authentic Gà rán giòn Karaage xiên que chiên giòn prepared with fresh high quality ingredients."}, "ja": {"name": "から揚げ串", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Gà rán giòn Karaage xiên que chiên giòn", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà rán giòn Karaage xiên que chiên giòn", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_7: {"vi": {"name": "Bánh nếp dango nướng xiên sốt tương ngọt", "desc": "Ba viên bánh nếp nướng xém than dẻo quánh áo lớp sốt nước tương ngào đường sền sệt mặn ngọt hấp dẫn."}, "en": {"name": "Bánh nếp dango nướng xiên sốt tương ngọt", "desc": "Delightful and authentic Bánh nếp dango nướng xiên sốt tương ngọt prepared with fresh high quality ingredients."}, "ja": {"name": "みたらし団子", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh nếp dango nướng xiên sốt tương ngọt", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh nếp dango nướng xiên sốt tương ngọt", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_8: {"vi": {"name": "Khoai lang nướng đường cháy Yakiimo Brûlée", "desc": "Củ khoai mật nướng dẻo quánh phủ lớp đường khò lửa cháy giòn tan caramel, ăn cùng kem vani lạnh."}, "en": {"name": "Khoai lang nướng đường cháy Yakiimo Brûlée", "desc": "Delightful and authentic Khoai lang nướng đường cháy Yakiimo Brûlée prepared with fresh high quality ingredients."}, "ja": {"name": "焼き芋ブリュレ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Khoai lang nướng đường cháy Yakiimo Brûlée", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Khoai lang nướng đường cháy Yakiimo Brûlée", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_a_9: {"vi": {"name": "Mực ống nướng than hoa sốt tương gừng Ikayaki", "desc": "Nguyên con mực ống tươi nướng than hoa xèo xèo, phết nước tương ngọt gừng thơm nức mũi lễ hội."}, "en": {"name": "Mực ống nướng than hoa sốt tương gừng Ikayaki", "desc": "Delightful and authentic Mực ống nướng than hoa sốt tương gừng Ikayaki prepared with fresh high quality ingredients."}, "ja": {"name": "イカ焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mực ống nướng than hoa sốt tương gừng Ikayaki", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mực ống nướng than hoa sốt tương gừng Ikayaki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_1: {"vi": {"name": "Thuyền Sashimi cá ngừ & cá hồi thượng hạng", "desc": "Cá hồi vân mỡ tan chảy, cá ngừ Maguro, sò đỏ, mực hoa tươi rói chấm wasabi cay nồng."}, "en": {"name": "Thuyền Sashimi cá ngừ & cá hồi thượng hạng", "desc": "Delightful and authentic Thuyền Sashimi cá ngừ & cá hồi thượng hạng prepared with fresh high quality ingredients."}, "ja": {"name": "旬の特選刺身盛り合わせ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Thuyền Sashimi cá ngừ & cá hồi thượng hạng", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Thuyền Sashimi cá ngừ & cá hồi thượng hạng", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_2: {"vi": {"name": "Lẩu bò Wagyu Sukiyaki nhúng trứng sống", "desc": "Từng lát bò Wagyu vân mỡ cẩm thạch áp chảo sốt ngọt warishita, nhúng ngập chén trứng gà tươi béo ngậy."}, "en": {"name": "Lẩu bò Wagyu Sukiyaki nhúng trứng sống", "desc": "Delightful and authentic Lẩu bò Wagyu Sukiyaki nhúng trứng sống prepared with fresh high quality ingredients."}, "ja": {"name": "特選黒毛和牛すき焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Lẩu bò Wagyu Sukiyaki nhúng trứng sống", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lẩu bò Wagyu Sukiyaki nhúng trứng sống", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_3: {"vi": {"name": "Xiên que nướng than hoa Yakitori thập cẩm", "desc": "Món nhắm kinh điển Izakaya: 5 xiên gà nướng xém cạnh thơm lừng sốt tare đậm đà hoặc nướng muối tiêu."}, "en": {"name": "Xiên que nướng than hoa Yakitori thập cẩm", "desc": "Delightful and authentic Xiên que nướng than hoa Yakitori thập cẩm prepared with fresh high quality ingredients."}, "ja": {"name": "炭火焼き鳥盛り合わせ (5本)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Xiên que nướng than hoa Yakitori thập cẩm", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Xiên que nướng than hoa Yakitori thập cẩm", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_4: {"vi": {"name": "Lẩu lòng bò Hakata Motsunabe tỏi ớt", "desc": "Nồi lẩu lòng bò tươi béo ngậy nấu ngập hẹ xanh, bắp cải ngọt và ớt lát trong nước dùng miso tỏi thơm lừng."}, "en": {"name": "Lẩu lòng bò Hakata Motsunabe tỏi ớt", "desc": "Delightful and authentic Lẩu lòng bò Hakata Motsunabe tỏi ớt prepared with fresh high quality ingredients."}, "ja": {"name": "博多牛もつ鍋", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Lẩu lòng bò Hakata Motsunabe tỏi ớt", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lẩu lòng bò Hakata Motsunabe tỏi ớt", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_5: {"vi": {"name": "Lẩu bò nhúng thanh đạm Shabu-shabu", "desc": "Thịt bò thái mỏng như lụa nhúng nước dùng kombu sôi nhẹ, chấm sốt mè goma hoặc sốt ponzu chua thanh."}, "en": {"name": "Lẩu bò nhúng thanh đạm Shabu-shabu", "desc": "Delightful and authentic Lẩu bò nhúng thanh đạm Shabu-shabu prepared with fresh high quality ingredients."}, "ja": {"name": "牛しゃぶしゃぶ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Lẩu bò nhúng thanh đạm Shabu-shabu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lẩu bò nhúng thanh đạm Shabu-shabu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_6: {"vi": {"name": "Bánh xèo Tokyo xào xẻng Monjayaki trứng cá tuyết", "desc": "Đặc sản phố Tsukishima: bánh bột xào trên bàn là nóng dẻo thơm ngập phô mai và trứng cá cay mentaiko."}, "en": {"name": "Bánh xèo Tokyo xào xẻng Monjayaki trứng cá tuyết", "desc": "Delightful and authentic Bánh xèo Tokyo xào xẻng Monjayaki trứng cá tuyết prepared with fresh high quality ingredients."}, "ja": {"name": "明太チーズもんじゃ焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh xèo Tokyo xào xẻng Monjayaki trứng cá tuyết", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh xèo Tokyo xào xẻng Monjayaki trứng cá tuyết", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_7: {"vi": {"name": "Thịt cừu nướng chảo vòm Hokkaido Jingisukan", "desc": "Thịt cừu non ướp sốt táo hành tây nướng xèo xèo trên chảo vòm sắt cùng giá đỗ ngọt giòn."}, "en": {"name": "Thịt cừu nướng chảo vòm Hokkaido Jingisukan", "desc": "Delightful and authentic Thịt cừu nướng chảo vòm Hokkaido Jingisukan prepared with fresh high quality ingredients."}, "ja": {"name": "北海道ジンギスカン", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Thịt cừu nướng chảo vòm Hokkaido Jingisukan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Thịt cừu nướng chảo vòm Hokkaido Jingisukan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_8: {"vi": {"name": "Xiên que tẩm bột chiên giòn Kushikatsu Osaka", "desc": "6 xiên thịt bò, tôm, phô mai, củ sen chiên vàng giòn rụm nhúng đẫm sốt đen đặc quyền Osaka."}, "en": {"name": "Xiên que tẩm bột chiên giòn Kushikatsu Osaka", "desc": "Delightful and authentic Xiên que tẩm bột chiên giòn Kushikatsu Osaka prepared with fresh high quality ingredients."}, "ja": {"name": "大阪新世界串カツ盛合せ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Xiên que tẩm bột chiên giòn Kushikatsu Osaka", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Xiên que tẩm bột chiên giòn Kushikatsu Osaka", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_9: {"vi": {"name": "Mì chấm nước dùng xương hầm Tsukemen", "desc": "Sợi mì bản to dày dai ướp lạnh chấm vào thố nước cốt xương heo cá khô hầm đặc sánh bốc khói."}, "en": {"name": "Mì chấm nước dùng xương hầm Tsukemen", "desc": "Delightful and authentic Mì chấm nước dùng xương hầm Tsukemen prepared with fresh high quality ingredients."}, "ja": {"name": "特濃魚介豚骨つけ麺", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì chấm nước dùng xương hầm Tsukemen", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì chấm nước dùng xương hầm Tsukemen", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_d_10: {"vi": {"name": "Cá tuyết nướng ướp sốt tương ngọt Saikyo Yaki", "desc": "Miếng cá tuyết béo ngậy ướp rượu sake và tương ngọt Kyoto nướng than hoa thơm lừng mềm tan."}, "en": {"name": "Cá tuyết nướng ướp sốt tương ngọt Saikyo Yaki", "desc": "Delightful and authentic Cá tuyết nướng ướp sốt tương ngọt Saikyo Yaki prepared with fresh high quality ingredients."}, "ja": {"name": "銀だらの西京焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá tuyết nướng ướp sốt tương ngọt Saikyo Yaki", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cá tuyết nướng ướp sốt tương ngọt Saikyo Yaki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_1: {"vi": {"name": "Bánh dẻo Warabi Mochi rưới mật mía đen", "desc": "Bánh bột dương xỉ trong veo mát lạnh rắc bột đậu nành rang thơm ngát, chan siro đường đen kuromitsu."}, "en": {"name": "Bánh dẻo Warabi Mochi rưới mật mía đen", "desc": "Delightful and authentic Bánh dẻo Warabi Mochi rưới mật mía đen prepared with fresh high quality ingredients."}, "ja": {"name": "本わらび餅 (黒蜜きな粉)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh dẻo Warabi Mochi rưới mật mía đen", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh dẻo Warabi Mochi rưới mật mía đen", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_2: {"vi": {"name": "Kem ly Parfait trà xanh Uji Matcha thượng hạng", "desc": "Ly kem nhiều tầng: kem matcha Kyoto chát dịu, thạch kanten, bánh dango mềm dẻo, đậu đỏ và bánh quy."}, "en": {"name": "Kem ly Parfait trà xanh Uji Matcha thượng hạng", "desc": "Delightful and authentic Kem ly Parfait trà xanh Uji Matcha thượng hạng prepared with fresh high quality ingredients."}, "ja": {"name": "宇治抹茶パフェ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Kem ly Parfait trà xanh Uji Matcha thượng hạng", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Kem ly Parfait trà xanh Uji Matcha thượng hạng", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_3: {"vi": {"name": "Bánh giọt nước trong suốt Shingen Mochi", "desc": "Viên mochi trong suốt như giọt sương tan mềm trong miệng, thanh mát nhẹ nhàng ăn cùng bột kinako."}, "en": {"name": "Bánh giọt nước trong suốt Shingen Mochi", "desc": "Delightful and authentic Bánh giọt nước trong suốt Shingen Mochi prepared with fresh high quality ingredients."}, "ja": {"name": "水信玄餅", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh giọt nước trong suốt Shingen Mochi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh giọt nước trong suốt Shingen Mochi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_4: {"vi": {"name": "Bánh Mochi bọc dâu tây tươi mọng Ichigo Daifuku", "desc": "Lớp vỏ nếp dẻo bọc trọn quả dâu tây tươi đỏ mọng nước và lớp đậu đỏ ngào đường ngọt ngào."}, "en": {"name": "Bánh Mochi bọc dâu tây tươi mọng Ichigo Daifuku", "desc": "Delightful and authentic Bánh Mochi bọc dâu tây tươi mọng Ichigo Daifuku prepared with fresh high quality ingredients."}, "ja": {"name": "いちご大福", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh Mochi bọc dâu tây tươi mọng Ichigo Daifuku", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh Mochi bọc dâu tây tươi mọng Ichigo Daifuku", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_5: {"vi": {"name": "Kem tươi phủ sợi hạt dẻ trà xanh Mont Blanc", "desc": "Kem tươi ốc quế bơm ngập những sợi hạt dẻ matcha nhuyễn mịn như nhung phủ kín đỉnh kem."}, "en": {"name": "Kem tươi phủ sợi hạt dẻ trà xanh Mont Blanc", "desc": "Delightful and authentic Kem tươi phủ sợi hạt dẻ trà xanh Mont Blanc prepared with fresh high quality ingredients."}, "ja": {"name": "宇治抹茶モンブランソフト", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Kem tươi phủ sợi hạt dẻ trà xanh Mont Blanc", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Kem tươi phủ sợi hạt dẻ trà xanh Mont Blanc", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_6: {"vi": {"name": "Bánh rán Doraemon nhân đậu đỏ hạt dẻ Dorayaki", "desc": "Hai lát bánh bông lan mật ong kẹp lớp nhân đậu đỏ Azuki bùi béo ngọt lịm gắn liền với tuổi thơ."}, "en": {"name": "Bánh rán Doraemon nhân đậu đỏ hạt dẻ Dorayaki", "desc": "Delightful and authentic Bánh rán Doraemon nhân đậu đỏ hạt dẻ Dorayaki prepared with fresh high quality ingredients."}, "ja": {"name": "どら焼き", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh rán Doraemon nhân đậu đỏ hạt dẻ Dorayaki", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh rán Doraemon nhân đậu đỏ hạt dẻ Dorayaki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_s_7: {"vi": {"name": "Bánh pancake bông xốp núng nính Soufflé", "desc": "Hai chiếc bánh bông lan soufflé dày cộp núng nính tan ngay trên đầu lưỡi, rưới kem tươi vani."}, "en": {"name": "Bánh pancake bông xốp núng nính Soufflé", "desc": "Delightful and authentic Bánh pancake bông xốp núng nính Soufflé prepared with fresh high quality ingredients."}, "ja": {"name": "スフレパンケーキ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh pancake bông xốp núng nính Soufflé", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh pancake bông xốp núng nính Soufflé", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_1: {"vi": {"name": "Nước soda dưa lưới kem vani Melon Soda Float", "desc": "Soda dưa lưới xanh ngọc sủi bọt mát lạnh đặt viên kem vani tròn và quả cherry đỏ hoài niệm."}, "en": {"name": "Nước soda dưa lưới kem vani Melon Soda Float", "desc": "Delightful and authentic Nước soda dưa lưới kem vani Melon Soda Float prepared with fresh high quality ingredients."}, "ja": {"name": "喫茶メロンソーダフロート", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước soda dưa lưới kem vani Melon Soda Float", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước soda dưa lưới kem vani Melon Soda Float", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_2: {"vi": {"name": "Trà sữa Matcha Latte nguyên chất kem béo", "desc": "Trà xanh Uji thượng phẩm đánh bọt bông mịn hòa quyện sữa tươi thanh trùng béo ngậy thơm nức."}, "en": {"name": "Trà sữa Matcha Latte nguyên chất kem béo", "desc": "Delightful and authentic Trà sữa Matcha Latte nguyên chất kem béo prepared with fresh high quality ingredients."}, "ja": {"name": "濃厚宇治抹茶ラテ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà sữa Matcha Latte nguyên chất kem béo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trà sữa Matcha Latte nguyên chất kem béo", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_3: {"vi": {"name": "Trà rang Hojicha sữa thơm lừng hương khói", "desc": "Trà xanh rang củi màu nâu hạt dẻ thơm dịu nhẹ vị khói hòa cùng sữa tươi êm dịu dạ dày."}, "en": {"name": "Trà rang Hojicha sữa thơm lừng hương khói", "desc": "Delightful and authentic Trà rang Hojicha sữa thơm lừng hương khói prepared with fresh high quality ingredients."}, "ja": {"name": "香ばしほうじ茶ラテ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà rang Hojicha sữa thơm lừng hương khói", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trà rang Hojicha sữa thơm lừng hương khói", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_4: {"vi": {"name": "Nước ngọt có ga bi thủy tinh Ramune hoài niệm", "desc": "Chai thủy tinh nút bi đặc trưng nổ bồm bộp khi nhấn, vị chanh soda mát lạnh sảng khoái mùa hè."}, "en": {"name": "Nước ngọt có ga bi thủy tinh Ramune hoài niệm", "desc": "Delightful and authentic Nước ngọt có ga bi thủy tinh Ramune hoài niệm prepared with fresh high quality ingredients."}, "ja": {"name": "瓶ラムネ (ビー玉入り)", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước ngọt có ga bi thủy tinh Ramune hoài niệm", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước ngọt có ga bi thủy tinh Ramune hoài niệm", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_5: {"vi": {"name": "Nước chua ngọt lên men Calpis Soda đá", "desc": "Thức uống lên men từ sữa tươi vị chua ngọt sảng khoái kết hợp bọt ga lăn tăn mát lạnh."}, "en": {"name": "Nước chua ngọt lên men Calpis Soda đá", "desc": "Delightful and authentic Nước chua ngọt lên men Calpis Soda đá prepared with fresh high quality ingredients."}, "ja": {"name": "カルピスソーダ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước chua ngọt lên men Calpis Soda đá", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước chua ngọt lên men Calpis Soda đá", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_6: {"vi": {"name": "Trà sữa Hoàng gia Nhật Bản Royal Milk Tea", "desc": "Trà đen Assam nấu trực tiếp trong sữa tươi nguyên kem béo ngậy và đường nâu tinh tế."}, "en": {"name": "Trà sữa Hoàng gia Nhật Bản Royal Milk Tea", "desc": "Delightful and authentic Trà sữa Hoàng gia Nhật Bản Royal Milk Tea prepared with fresh high quality ingredients."}, "ja": {"name": "特製ロイヤルミルクティー", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà sữa Hoàng gia Nhật Bản Royal Milk Tea", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trà sữa Hoàng gia Nhật Bản Royal Milk Tea", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_7: {"vi": {"name": "Bia tươi Asahi Super Dry mát lạnh rót bọt tuyết", "desc": "Ly bia tươi mát lạnh rót lớp bọt kem tuyết dày 2 ngón tay, sảng khoái đánh tan mệt mỏi bữa tối."}, "en": {"name": "Bia tươi Asahi Super Dry mát lạnh rót bọt tuyết", "desc": "Delightful and authentic Bia tươi Asahi Super Dry mát lạnh rót bọt tuyết prepared with fresh high quality ingredients."}, "ja": {"name": "アサヒ スーパードライ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bia tươi Asahi Super Dry mát lạnh rót bọt tuyết", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bia tươi Asahi Super Dry mát lạnh rót bọt tuyết", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ja_dr_8: {"vi": {"name": "Rượu mơ Nhật Choya Umeshu pha soda đá", "desc": "Rượu mơ ủ mật ong chua ngọt thanh tao hòa cùng soda sủi bọt và quả mơ xanh ngâm giòn."}, "en": {"name": "Rượu mơ Nhật Choya Umeshu pha soda đá", "desc": "Delightful and authentic Rượu mơ Nhật Choya Umeshu pha soda đá prepared with fresh high quality ingredients."}, "ja": {"name": "本格梅酒ソーダ割り", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Rượu mơ Nhật Choya Umeshu pha soda đá", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Rượu mơ Nhật Choya Umeshu pha soda đá", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_1: {"vi": {"name": "Canh giá đỗ giải rượu Jeonju Kongnamul Gukbap", "desc": "Canh giá đỗ thanh mát nước dùng cá cơm tôm khô, đập trứng lòng đào ăn kèm kim chi giòn tan."}, "en": {"name": "Canh giá đỗ giải rượu Jeonju Kongnamul Gukbap", "desc": "Delightful and authentic Canh giá đỗ giải rượu Jeonju Kongnamul Gukbap prepared with fresh high quality ingredients."}, "ja": {"name": "Canh giá đỗ giải rượu Jeonju Kongnamul Gukbap", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "전주 콩나물국밥", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Canh giá đỗ giải rượu Jeonju Kongnamul Gukbap", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_2: {"vi": {"name": "Bánh mì nướng đường phố Hàn Quốc Gilgeori Toast", "desc": "Bánh mì bơ kẹp chả trứng bắp cải, rắc đường nâu và sốt cà chua tương ớt thơm nức phố ga."}, "en": {"name": "Bánh mì nướng đường phố Hàn Quốc Gilgeori Toast", "desc": "Delightful and authentic Bánh mì nướng đường phố Hàn Quốc Gilgeori Toast prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì nướng đường phố Hàn Quốc Gilgeori Toast", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "원조 길거리 토스트", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì nướng đường phố Hàn Quốc Gilgeori Toast", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_3: {"vi": {"name": "Cháo bào ngư tươi đảo Jeju Jeonbokjuk", "desc": "Tô cháo bào ngư đảo Jeju xanh màu gan bào ngư béo ngậy, rắc rong biển và dầu mè thơm ngát."}, "en": {"name": "Cháo bào ngư tươi đảo Jeju Jeonbokjuk", "desc": "Delightful and authentic Cháo bào ngư tươi đảo Jeju Jeonbokjuk prepared with fresh high quality ingredients."}, "ja": {"name": "Cháo bào ngư tươi đảo Jeju Jeonbokjuk", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "제주 활전복죽", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cháo bào ngư tươi đảo Jeju Jeonbokjuk", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_4: {"vi": {"name": "Bánh mì trứng nướng đường phố Myeongdong Gyeran-ppang", "desc": "Bánh bông lan xốp nướng nguyên quả trứng gà béo ngậy rắc phô mai và mùi tây thơm nức."}, "en": {"name": "Bánh mì trứng nướng đường phố Myeongdong Gyeran-ppang", "desc": "Delightful and authentic Bánh mì trứng nướng đường phố Myeongdong Gyeran-ppang prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì trứng nướng đường phố Myeongdong Gyeran-ppang", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "명동 계란빵", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì trứng nướng đường phố Myeongdong Gyeran-ppang", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_5: {"vi": {"name": "Canh rong biển thịt bò truyền thống Miyeok-guk", "desc": "Canh rong biển nâu nấu bắp bò thơm nức mùi dầu mè nguyên chất, món ăn bồi bổ sức khỏe."}, "en": {"name": "Canh rong biển thịt bò truyền thống Miyeok-guk", "desc": "Delightful and authentic Canh rong biển thịt bò truyền thống Miyeok-guk prepared with fresh high quality ingredients."}, "ja": {"name": "Canh rong biển thịt bò truyền thống Miyeok-guk", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "소고기 미역국", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Canh rong biển thịt bò truyền thống Miyeok-guk", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_6: {"vi": {"name": "Canh sườn heo hầm cải thảo cay Ugeoji Haejangguk", "desc": "Sườn heo ninh nhừ cay nồng với rau cải thảo khô, hạt tiêu hoang thơm nồng ấm người."}, "en": {"name": "Canh sườn heo hầm cải thảo cay Ugeoji Haejangguk", "desc": "Delightful and authentic Canh sườn heo hầm cải thảo cay Ugeoji Haejangguk prepared with fresh high quality ingredients."}, "ja": {"name": "Canh sườn heo hầm cải thảo cay Ugeoji Haejangguk", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "우거지 뼈해장국", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Canh sườn heo hầm cải thảo cay Ugeoji Haejangguk", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_7: {"vi": {"name": "Cháo bí đỏ ngọt bùi hạt dẻ Danhobakjuk", "desc": "Cháo bí đỏ vàng ươm sánh mịn ngọt ngào tự nhiên, điểm viên nếp dẻo và hạt đậu đỏ bùi béo."}, "en": {"name": "Cháo bí đỏ ngọt bùi hạt dẻ Danhobakjuk", "desc": "Delightful and authentic Cháo bí đỏ ngọt bùi hạt dẻ Danhobakjuk prepared with fresh high quality ingredients."}, "ja": {"name": "Cháo bí đỏ ngọt bùi hạt dẻ Danhobakjuk", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "단호박죽", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cháo bí đỏ ngọt bùi hạt dẻ Danhobakjuk", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_m_8: {"vi": {"name": "Bánh gạo dẻo nướng than hoa chấm mật ong Joceong", "desc": "Thỏi bánh gạo nướng phồng giòn vỏ dẻo ruột, chấm đẫm mật ong lúa mạch ngọt ngào ấm áp."}, "en": {"name": "Bánh gạo dẻo nướng than hoa chấm mật ong Joceong", "desc": "Delightful and authentic Bánh gạo dẻo nướng than hoa chấm mật ong Joceong prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh gạo dẻo nướng than hoa chấm mật ong Joceong", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "가래떡 구이와 조청", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh gạo dẻo nướng than hoa chấm mật ong Joceong", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_1: {"vi": {"name": "Cơm trộn thố đá Jeonju Dolsot Bibimbap", "desc": "Thố đá nóng xèo xèo lớp cháy giòn, xếp 8 loại rau củ sắc màu, thịt bò băm, lòng đỏ trứng và sốt Gochujang."}, "en": {"name": "Cơm trộn thố đá Jeonju Dolsot Bibimbap", "desc": "Delightful and authentic Cơm trộn thố đá Jeonju Dolsot Bibimbap prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm trộn thố đá Jeonju Dolsot Bibimbap", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "전주 돌솥비빔밥", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm trộn thố đá Jeonju Dolsot Bibimbap", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_2: {"vi": {"name": "Cơm cuộn rong biển cá ngừ Chamchi Kimbap", "desc": "Cuộn rong biển căng tròn nhân ngập cá ngừ sốt béo mayo, củ cải vàng, cà rốt, lá mè và trứng chiên."}, "en": {"name": "Cơm cuộn rong biển cá ngừ Chamchi Kimbap", "desc": "Delightful and authentic Cơm cuộn rong biển cá ngừ Chamchi Kimbap prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm cuộn rong biển cá ngừ Chamchi Kimbap", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "참치 마요 김밥", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm cuộn rong biển cá ngừ Chamchi Kimbap", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_3: {"vi": {"name": "Mì tương đen xào khô Gan Jjajangmyeon", "desc": "Mì dai nấu sốt tương đen chunjang xào lửa lớn với thịt ba chỉ thái hạt lựu và hành tây giòn ngọt."}, "en": {"name": "Mì tương đen xào khô Gan Jjajangmyeon", "desc": "Delightful and authentic Mì tương đen xào khô Gan Jjajangmyeon prepared with fresh high quality ingredients."}, "ja": {"name": "Mì tương đen xào khô Gan Jjajangmyeon", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "옛날 간짜장", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì tương đen xào khô Gan Jjajangmyeon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_4: {"vi": {"name": "Mì hải sản cay nồng đượm khói Jjamppong", "desc": "Bát mì đỏ rực ngập tôm sú, mực tươi, nghêu xào lửa lớn thơm lừng mùi khói cay nồng ấm bụng."}, "en": {"name": "Mì hải sản cay nồng đượm khói Jjamppong", "desc": "Delightful and authentic Mì hải sản cay nồng đượm khói Jjamppong prepared with fresh high quality ingredients."}, "ja": {"name": "Mì hải sản cay nồng đượm khói Jjamppong", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "불맛 해물짬뽕", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì hải sản cay nồng đượm khói Jjamppong", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_5: {"vi": {"name": "Canh kim chi thịt ba chỉ Kimchi Jjigae", "desc": "Kim chi muối chua om nhừ cùng thịt ba chỉ béo ngậy, đậu phụ mềm và nước súp cay nồng đậm đà."}, "en": {"name": "Canh kim chi thịt ba chỉ Kimchi Jjigae", "desc": "Delightful and authentic Canh kim chi thịt ba chỉ Kimchi Jjigae prepared with fresh high quality ingredients."}, "ja": {"name": "Canh kim chi thịt ba chỉ Kimchi Jjigae", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "돼지김치찌개", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Canh kim chi thịt ba chỉ Kimchi Jjigae", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_6: {"vi": {"name": "Gà hầm sâm thuốc bắc Samgyetang", "desc": "Nguyên con gà non nhồi gạo nếp, nhân sâm Geumsan, táo đỏ, hạt dẻ hầm nhừ ngọt lịm bổ dưỡng phục hồi thể lực."}, "en": {"name": "Ginseng Chicken Soup Samgyetang", "desc": "Whole young chicken stuffed with sweet rice, Korean ginseng, red dates, and garlic in nourishing broth."}, "ja": {"name": "栄養サムゲタン", "desc": "若鶏にもち米、高麗人参、ナツメを詰めて煮込んだ伝統のスタミナ健康料理。"}, "ko": {"name": "영양 삼계탕", "desc": "영계에 찹쌀, 금산 인삼, 대추를 넣고 푹 고아낸 원기 회복 최고의 보양식."}, "zh": {"name": "营养参鸡汤", "desc": "精选嫩鸡肚内塞入糯米、高丽参、红枣慢火炖至软烂，温润滋补。"}},
  ko_l_7: {"vi": {"name": "Cơm canh thịt heo hầm Busan Dwaeji Gukbap", "desc": "Nước dùng xương heo hầm trắng đục ngọt thanh, đầy ắp thịt ba chỉ luộc mềm ăn cùng hẹ tươi."}, "en": {"name": "Cơm canh thịt heo hầm Busan Dwaeji Gukbap", "desc": "Delightful and authentic Cơm canh thịt heo hầm Busan Dwaeji Gukbap prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm canh thịt heo hầm Busan Dwaeji Gukbap", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "부산 돼지국밥", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm canh thịt heo hầm Busan Dwaeji Gukbap", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_8: {"vi": {"name": "Mì lạnh nước súp đá tuyết Mul Naengmyeon", "desc": "Mì kiều mạch dai ngon trong nước dùng thịt bò ướp đá tuyết mát lạnh, lát lê ngọt và dưa leo giòn."}, "en": {"name": "Mì lạnh nước súp đá tuyết Mul Naengmyeon", "desc": "Delightful and authentic Mì lạnh nước súp đá tuyết Mul Naengmyeon prepared with fresh high quality ingredients."}, "ja": {"name": "Mì lạnh nước súp đá tuyết Mul Naengmyeon", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "물냉면", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì lạnh nước súp đá tuyết Mul Naengmyeon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_9: {"vi": {"name": "Mì sợi nhào tay nấu nghêu ngọt Bajirak Kalguksu", "desc": "Sợi mì cắt tay mềm dai nấu trong nước súp nghêu ngọt lịm thanh tao, ăn kèm kim chi tươi cay xè."}, "en": {"name": "Mì sợi nhào tay nấu nghêu ngọt Bajirak Kalguksu", "desc": "Delightful and authentic Mì sợi nhào tay nấu nghêu ngọt Bajirak Kalguksu prepared with fresh high quality ingredients."}, "ja": {"name": "Mì sợi nhào tay nấu nghêu ngọt Bajirak Kalguksu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "바지락 칼국수", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì sợi nhào tay nấu nghêu ngọt Bajirak Kalguksu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_10: {"vi": {"name": "Cơm chiên kim chi thịt hộp Spam phô mai", "desc": "Cơm chiên kim chi đậm đà cùng thịt hộp Spam mặn béo, phủ phô mai kéo sợi và trứng ốp la lòng đào."}, "en": {"name": "Cơm chiên kim chi thịt hộp Spam phô mai", "desc": "Delightful and authentic Cơm chiên kim chi thịt hộp Spam phô mai prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm chiên kim chi thịt hộp Spam phô mai", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "스팸 김치볶음밥", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm chiên kim chi thịt hộp Spam phô mai", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_11: {"vi": {"name": "Thịt bò ướp ngọt hầm thố Ttukbaegi Bulgogi", "desc": "Thịt bò xào mềm thơm trong nước tương ngọt dịu cùng nấm kim châm, miến dong dai mềm."}, "en": {"name": "Thịt bò ướp ngọt hầm thố Ttukbaegi Bulgogi", "desc": "Delightful and authentic Thịt bò ướp ngọt hầm thố Ttukbaegi Bulgogi prepared with fresh high quality ingredients."}, "ja": {"name": "Thịt bò ướp ngọt hầm thố Ttukbaegi Bulgogi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "뚝배기 불고기", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Thịt bò ướp ngọt hầm thố Ttukbaegi Bulgogi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_l_12: {"vi": {"name": "Gà om miến sốt tương đen Andong Jjimdak", "desc": "Thịt gà om khoai tây, cà rốt và miến dẹt thấm đẫm sốt tương đen cay ngọt mặn mà nức tiếng Andong."}, "en": {"name": "Gà om miến sốt tương đen Andong Jjimdak", "desc": "Delightful and authentic Gà om miến sốt tương đen Andong Jjimdak prepared with fresh high quality ingredients."}, "ja": {"name": "Gà om miến sốt tương đen Andong Jjimdak", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "안동 찜닭", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà om miến sốt tương đen Andong Jjimdak", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_1: {"vi": {"name": "Bánh gạo cay sốt kem béo Rosé Tteokbokki", "desc": "Bánh gạo dẻo quánh nấu sốt ớt cay hòa quyện kem tươi béo ngậy, xúc xích và phô mai mozzarella."}, "en": {"name": "Bánh gạo cay sốt kem béo Rosé Tteokbokki", "desc": "Delightful and authentic Bánh gạo cay sốt kem béo Rosé Tteokbokki prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh gạo cay sốt kem béo Rosé Tteokbokki", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "치즈 로제떡볶이", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh gạo cay sốt kem béo Rosé Tteokbokki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_2: {"vi": {"name": "Dồi sụn truyền thống chiên xù Sundae", "desc": "Từng khoanh dồi sụn miến thơm lừng gia vị chiên phồng giòn tan chấm muối ớt bột tiêu cay nồng."}, "en": {"name": "Crispy Fried Sundae Blood Sausage", "desc": "Deep-fried Korean traditional blood sausage with glass noodles, crispy outside and soft inside."}, "ja": {"name": "揚げスンデ", "desc": "香ばしくサクサクに揚げた韓国伝統の春雨入りスンデ。ピリ辛塩で。"}, "ko": {"name": "바삭 전통 순대튀김", "desc": "겉은 바삭하고 속은 쫄깃한 고소한 전통 순대 튀김."}, "zh": {"name": "香脆炸米肠", "desc": "炸至金黄酥脆的韩国传统血肠，外脆里嫩香气扑鼻。"}},
  ko_a_3: {"vi": {"name": "Hotdog phô mai mozzarella bọc khoai tây giòn", "desc": "Hotdog lăn khoai tây chiên giòn rụm bên ngoài, bên trong phô mai mozzarella kéo sợi vô tận."}, "en": {"name": "Hotdog phô mai mozzarella bọc khoai tây giòn", "desc": "Delightful and authentic Hotdog phô mai mozzarella bọc khoai tây giòn prepared with fresh high quality ingredients."}, "ja": {"name": "Hotdog phô mai mozzarella bọc khoai tây giòn", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "바삭 감자 모짜핫도그", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Hotdog phô mai mozzarella bọc khoai tây giòn", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_4: {"vi": {"name": "Khoai tây lốc xoáy phô mai hành tây", "desc": "Củ khoai tây xoắn ốc dài chiên phồng giòn tan, lắc đều bột phô mai hành tây thơm nức mũi."}, "en": {"name": "Khoai tây lốc xoáy phô mai hành tây", "desc": "Delightful and authentic Khoai tây lốc xoáy phô mai hành tây prepared with fresh high quality ingredients."}, "ja": {"name": "Khoai tây lốc xoáy phô mai hành tây", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "치즈 어니언 회오리감자", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Khoai tây lốc xoáy phô mai hành tây", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_5: {"vi": {"name": "Xiên chả cá nóng hổi Busan Eomuk kèm nước súp", "desc": "Xiên chả cá gợn sóng nấu trong nồi nước dùng củ cải hải sản ngọt thanh, chén súp húp xì xụp ấm áp."}, "en": {"name": "Xiên chả cá nóng hổi Busan Eomuk kèm nước súp", "desc": "Delightful and authentic Xiên chả cá nóng hổi Busan Eomuk kèm nước súp prepared with fresh high quality ingredients."}, "ja": {"name": "Xiên chả cá nóng hổi Busan Eomuk kèm nước súp", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "부산 삼진어묵 꼬치", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Xiên chả cá nóng hổi Busan Eomuk kèm nước súp", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_6: {"vi": {"name": "Thịt heo luộc cuộn kim chi Bossam", "desc": "Thịt ba chỉ heo tươi luộc mềm mọng nước cùng gừng tỏi quế, cuộn lá cải thảo muối và kim chi củ cải cay giòn."}, "en": {"name": "Traditional Pork Bossam", "desc": "Tender boiled pork belly wrapped in crisp salted cabbage with spicy radish kimchi."}, "ja": {"name": "伝統ポッサム", "desc": "じっくり茹で上げたジューシーな豚バラ肉を白菜キムチで包んでいただく名物料理。"}, "ko": {"name": "전통 보쌈", "desc": "부드럽게 삶아낸 돼지고기 수육과 아삭한 무김치, 절임 배추의 환상적인 조화."}, "zh": {"name": "正宗传统菜包肉", "desc": "炖煮鲜嫩的五花肉片搭配爽脆白菜与特制泡菜，浓香四溢。"}},
  ko_a_7: {"vi": {"name": "Bánh rau củ chiên giòn rụm Twigim kiểu Hàn", "desc": "Khoai lang, cà rốt, hành tây thái sợi tẩm bột chiên phồng giòn xốp chấm đẫm sốt tteokbokki."}, "en": {"name": "Bánh rau củ chiên giòn rụm Twigim kiểu Hàn", "desc": "Delightful and authentic Bánh rau củ chiên giòn rụm Twigim kiểu Hàn prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh rau củ chiên giòn rụm Twigim kiểu Hàn", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "바삭 야채 튀김", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh rau củ chiên giòn rụm Twigim kiểu Hàn", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_8: {"vi": {"name": "Rong biển cuộn miến chiên giòn Gimmari", "desc": "Miến dong tẩm gia vị cuộn trong lá rong biển tẩm bột chiên giòn tan, món ăn kèm số 1 bánh gạo."}, "en": {"name": "Rong biển cuộn miến chiên giòn Gimmari", "desc": "Delightful and authentic Rong biển cuộn miến chiên giòn Gimmari prepared with fresh high quality ingredients."}, "ja": {"name": "Rong biển cuộn miến chiên giòn Gimmari", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "당면 김말이 튀김", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Rong biển cuộn miến chiên giòn Gimmari", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_9: {"vi": {"name": "Dồi heo xào rau củ sốt mè Sillim Sundae", "desc": "Dồi heo huyết dẻo thơm xào miến, bắp cải và lá tía tô trên chảo phẳng chấm sốt ớt đậu phộng."}, "en": {"name": "Dồi heo xào rau củ sốt mè Sillim Sundae", "desc": "Delightful and authentic Dồi heo xào rau củ sốt mè Sillim Sundae prepared with fresh high quality ingredients."}, "ja": {"name": "Dồi heo xào rau củ sốt mè Sillim Sundae", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "신림동 백순대 볶음", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Dồi heo xào rau củ sốt mè Sillim Sundae", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_a_10: {"vi": {"name": "Mì tteokbokki gà cay phô mai kéo sợi Rabokki", "desc": "Mì ramen nấu cùng bánh gạo cay sốt gà cay nồng xé lưỡi, phủ ngập phô mai mozzarella tan chảy."}, "en": {"name": "Mì tteokbokki gà cay phô mai kéo sợi Rabokki", "desc": "Delightful and authentic Mì tteokbokki gà cay phô mai kéo sợi Rabokki prepared with fresh high quality ingredients."}, "ja": {"name": "Mì tteokbokki gà cay phô mai kéo sợi Rabokki", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "불닭 치즈 라볶이", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì tteokbokki gà cay phô mai kéo sợi Rabokki", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_1: {"vi": {"name": "Thịt ba chỉ nướng chảo gang Samgyeopsal", "desc": "Dải thịt ba chỉ tươi nướng xèo xèo cùng kim chi chua, tỏi tép cuốn lá xà lách chấm sốt ssamjang."}, "en": {"name": "Thịt ba chỉ nướng chảo gang Samgyeopsal", "desc": "Delightful and authentic Thịt ba chỉ nướng chảo gang Samgyeopsal prepared with fresh high quality ingredients."}, "ja": {"name": "Thịt ba chỉ nướng chảo gang Samgyeopsal", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "생삼겹살 솥뚜껑 구이", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Thịt ba chỉ nướng chảo gang Samgyeopsal", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_2: {"vi": {"name": "Gà rán Chimaek nửa sốt cay nửa giòn tan", "desc": "Đĩa gà rán khổng lồ: một nửa vàng giòn rụm, một nửa áo sốt đỏ cay ngọt mè rang, ăn kèm củ cải trắng."}, "en": {"name": "Gà rán Chimaek nửa sốt cay nửa giòn tan", "desc": "Delightful and authentic Gà rán Chimaek nửa sốt cay nửa giòn tan prepared with fresh high quality ingredients."}, "ja": {"name": "Gà rán Chimaek nửa sốt cay nửa giòn tan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "황금 반반 치킨", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà rán Chimaek nửa sốt cay nửa giòn tan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_3: {"vi": {"name": "Sườn bò thượng hạng ướp sốt nướng than hoa Galbi", "desc": "Từng dải sườn bò mềm ngọt thấm đẫm sốt lê nước tương nướng than hồng thơm lừng béo ngậy."}, "en": {"name": "Sườn bò thượng hạng ướp sốt nướng than hoa Galbi", "desc": "Delightful and authentic Sườn bò thượng hạng ướp sốt nướng than hoa Galbi prepared with fresh high quality ingredients."}, "ja": {"name": "Sườn bò thượng hạng ướp sốt nướng than hoa Galbi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "소갈비 구이", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sườn bò thượng hạng ướp sốt nướng than hoa Galbi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_4: {"vi": {"name": "Gà xào bắp cải cay chảo gang Chuncheon Dakgalbi", "desc": "Thịt gà ướp sốt cay xào trên chảo phẳng khổng lồ với bắp cải, bánh gạo, khoai lang và phô mai."}, "en": {"name": "Gà xào bắp cải cay chảo gang Chuncheon Dakgalbi", "desc": "Delightful and authentic Gà xào bắp cải cay chảo gang Chuncheon Dakgalbi prepared with fresh high quality ingredients."}, "ja": {"name": "Gà xào bắp cải cay chảo gang Chuncheon Dakgalbi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "춘천 철판 닭갈비", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà xào bắp cải cay chảo gang Chuncheon Dakgalbi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_5: {"vi": {"name": "Lẩu sườn heo hầm khoai tây cay Gamjatang", "desc": "Nồi lẩu sườn heo hầm nhừ róc xương với lá tía tô thơm ngát, bột hạt mè hoang và khoai tây bở ngậy."}, "en": {"name": "Lẩu sườn heo hầm khoai tây cay Gamjatang", "desc": "Delightful and authentic Lẩu sườn heo hầm khoai tây cay Gamjatang prepared with fresh high quality ingredients."}, "ja": {"name": "Lẩu sườn heo hầm khoai tây cay Gamjatang", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "명품 뼈다귀 감자탕", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lẩu sườn heo hầm khoai tây cay Gamjatang", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_6: {"vi": {"name": "Lẩu quân đội Uijeongbu Budae Jjigae thập cẩm", "desc": "Nồi lẩu thập cẩm đậm đà thịt hộp spam, xúc xích, mì ramen, kim chi, đậu hũ và phô mai lát béo ngậy."}, "en": {"name": "Lẩu quân đội Uijeongbu Budae Jjigae thập cẩm", "desc": "Delightful and authentic Lẩu quân đội Uijeongbu Budae Jjigae thập cẩm prepared with fresh high quality ingredients."}, "ja": {"name": "Lẩu quân đội Uijeongbu Budae Jjigae thập cẩm", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "의정부 부대찌개", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lẩu quân đội Uijeongbu Budae Jjigae thập cẩm", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_7: {"vi": {"name": "Lòng bò Hanwoo nướng chảo gang béo ngậy Gopchang", "desc": "Đĩa lòng non, dạ dày bò nướng cháy cạnh xèo xèo cùng hẹ xanh và hành tây chấm sốt ớt tỏi."}, "en": {"name": "Lòng bò Hanwoo nướng chảo gang béo ngậy Gopchang", "desc": "Delightful and authentic Lòng bò Hanwoo nướng chảo gang béo ngậy Gopchang prepared with fresh high quality ingredients."}, "ja": {"name": "Lòng bò Hanwoo nướng chảo gang béo ngậy Gopchang", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "한우 곱창 모듬 구이", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Lòng bò Hanwoo nướng chảo gang béo ngậy Gopchang", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_8: {"vi": {"name": "Bánh xèo hải sản hành lá giòn rụm Haemul Pajeon", "desc": "Bánh xèo chiên ngập hành hoa tươi ngọt, tôm sú mực giòn tan chấm nước tương ớt chua cay."}, "en": {"name": "Bánh xèo hải sản hành lá giòn rụm Haemul Pajeon", "desc": "Delightful and authentic Bánh xèo hải sản hành lá giòn rụm Haemul Pajeon prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh xèo hải sản hành lá giòn rụm Haemul Pajeon", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "해물파전", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh xèo hải sản hành lá giòn rụm Haemul Pajeon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_9: {"vi": {"name": "Gỏi thịt bò sống Hanwoo trộn lê ngọt Yukhoe", "desc": "Thịt bò tươi thái chỉ trộn dầu mè thơm ngát, tỏi băm, lê ngọt giòn và lòng đỏ trứng gà béo ngậy."}, "en": {"name": "Gỏi thịt bò sống Hanwoo trộn lê ngọt Yukhoe", "desc": "Delightful and authentic Gỏi thịt bò sống Hanwoo trộn lê ngọt Yukhoe prepared with fresh high quality ingredients."}, "ja": {"name": "Gỏi thịt bò sống Hanwoo trộn lê ngọt Yukhoe", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "한우 육회", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gỏi thịt bò sống Hanwoo trộn lê ngọt Yukhoe", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_d_10: {"vi": {"name": "Gà hầm sâm tươi bổ dưỡng Samgyetang", "desc": "Con gà non nhồi gạo nếp, nhân sâm Geumsan, táo đỏ và tỏi hầm nhừ nước súp thuốc bắc thanh ngọt."}, "en": {"name": "Gà hầm sâm tươi bổ dưỡng Samgyetang", "desc": "Delightful and authentic Gà hầm sâm tươi bổ dưỡng Samgyetang prepared with fresh high quality ingredients."}, "ja": {"name": "Gà hầm sâm tươi bổ dưỡng Samgyetang", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "영계 삼계탕", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà hầm sâm tươi bổ dưỡng Samgyetang", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_1: {"vi": {"name": "Bánh sừng bò nướng Croffle rắc phô mai nâu", "desc": "Bánh croissant ép khuôn waffle giòn rụm bơ, đặt viên kem vani và bào ngập phô mai nâu Na Uy."}, "en": {"name": "Bánh sừng bò nướng Croffle rắc phô mai nâu", "desc": "Delightful and authentic Bánh sừng bò nướng Croffle rắc phô mai nâu prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh sừng bò nướng Croffle rắc phô mai nâu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "브라운치즈 크로플", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh sừng bò nướng Croffle rắc phô mai nâu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_2: {"vi": {"name": "Bingsu tuyết sốt đậu nành Injeolmi Sulbing", "desc": "Núi tuyết sữa mịn màng phủ kín bột đậu nành rang thơm bùi, bánh dẻo injeolmi và hạnh nhân lát giòn rụm."}, "en": {"name": "Bingsu tuyết sốt đậu nành Injeolmi Sulbing", "desc": "Delightful and authentic Bingsu tuyết sốt đậu nành Injeolmi Sulbing prepared with fresh high quality ingredients."}, "ja": {"name": "Bingsu tuyết sốt đậu nành Injeolmi Sulbing", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "설빙 인절미 팥빙수", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bingsu tuyết sốt đậu nành Injeolmi Sulbing", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_3: {"vi": {"name": "Bánh pancake đường nâu quế nhân mật ong Hotteok", "desc": "Bánh rán giòn vỏ dẻo ruột, cắn ngập dòng mật đường nâu quế hạt óc chó chảy tràn ngọt ngào."}, "en": {"name": "Bánh pancake đường nâu quế nhân mật ong Hotteok", "desc": "Delightful and authentic Bánh pancake đường nâu quế nhân mật ong Hotteok prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh pancake đường nâu quế nhân mật ong Hotteok", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "달콤 꿀 호떡", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh pancake đường nâu quế nhân mật ong Hotteok", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_4: {"vi": {"name": "Bánh cá Bungeoppang nhân kem trứng custard", "desc": "Ba chú cá nướng giòn rụm nhân kem trứng sữa ngọt thơm béo ngậy, món ăn vặt ấm áp mùa đông."}, "en": {"name": "Bánh cá Bungeoppang nhân kem trứng custard", "desc": "Delightful and authentic Bánh cá Bungeoppang nhân kem trứng custard prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh cá Bungeoppang nhân kem trứng custard", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "슈크림 붕어빵", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh cá Bungeoppang nhân kem trứng custard", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_5: {"vi": {"name": "Bánh hoa cúc mật ong truyền thống Yakgwa", "desc": "Bánh quy chiên tẩm mật ong quế và rượu gạo mềm dẻo ngọt ngào, món bánh hoàng gia triều đại Joseon."}, "en": {"name": "Bánh hoa cúc mật ong truyền thống Yakgwa", "desc": "Delightful and authentic Bánh hoa cúc mật ong truyền thống Yakgwa prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh hoa cúc mật ong truyền thống Yakgwa", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "전통 약과", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh hoa cúc mật ong truyền thống Yakgwa", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_6: {"vi": {"name": "Kẹo đường xốp giòn Dalgona trò chơi dân gian", "desc": "Miếng kẹo đường thắng baking soda xốp giòn thơm mùi caramel in hình ngôi sao trái tim quen thuộc."}, "en": {"name": "Kẹo đường xốp giòn Dalgona trò chơi dân gian", "desc": "Delightful and authentic Kẹo đường xốp giòn Dalgona trò chơi dân gian prepared with fresh high quality ingredients."}, "ja": {"name": "Kẹo đường xốp giòn Dalgona trò chơi dân gian", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "추억의 달고나", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Kẹo đường xốp giòn Dalgona trò chơi dân gian", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_s_7: {"vi": {"name": "Chè dưa hấu hoa quả dầm sữa tươi Subak Hwachae", "desc": "Thố dưa hấu mát lạnh dầm cùng dâu tây, sữa tươi béo ngậy và nước ngọt có ga sủi bọt mát lạnh."}, "en": {"name": "Chè dưa hấu hoa quả dầm sữa tươi Subak Hwachae", "desc": "Delightful and authentic Chè dưa hấu hoa quả dầm sữa tươi Subak Hwachae prepared with fresh high quality ingredients."}, "ja": {"name": "Chè dưa hấu hoa quả dầm sữa tươi Subak Hwachae", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "수박 화채", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Chè dưa hấu hoa quả dầm sữa tươi Subak Hwachae", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_1: {"vi": {"name": "Sữa chuối Binggrae hũ tròn truyền thống", "desc": "Hũ sữa chuối vàng biểu tượng ngọt ngào hương chuối ngậy sữa gắn liền với tuổi thơ mọi người Hàn."}, "en": {"name": "Sữa chuối Binggrae hũ tròn truyền thống", "desc": "Delightful and authentic Sữa chuối Binggrae hũ tròn truyền thống prepared with fresh high quality ingredients."}, "ja": {"name": "Sữa chuối Binggrae hũ tròn truyền thống", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "빙그레 단지 바나나맛 우유", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sữa chuối Binggrae hũ tròn truyền thống", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_2: {"vi": {"name": "Cà phê đen đá Iced Americano", "desc": "Cốc cà phê đen đá đậm đà sảng khoái mà người Hàn uống quanh năm bất chấp tuyết rơi."}, "en": {"name": "Ah-Ah", "desc": "Delightful and authentic Ah-Ah prepared with fresh high quality ingredients."}, "ja": {"name": "Cà phê đen đá Iced Americano", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "아이스 아메리카노", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cà phê đen đá Iced Americano", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_3: {"vi": {"name": "Nước gạo lên men truyền thống Sikhye đá bào", "desc": "Nước gạo ủ mầm lúa mạch thanh mát giải nhiệt, ngọt dịu điểm hạt cơm gạo dẻo và hạt thông bùi."}, "en": {"name": "Nước gạo lên men truyền thống Sikhye đá bào", "desc": "Delightful and authentic Nước gạo lên men truyền thống Sikhye đá bào prepared with fresh high quality ingredients."}, "ja": {"name": "Nước gạo lên men truyền thống Sikhye đá bào", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "살얼음 전통 식혜", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước gạo lên men truyền thống Sikhye đá bào", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_4: {"vi": {"name": "Nước quế gừng hồng sấy dẻo Sujeonggwa", "desc": "Thức uống truyền thống nấu từ quế, gừng thơm lừng và quả hồng khô ngâm mềm ngọt ấm bụng."}, "en": {"name": "Nước quế gừng hồng sấy dẻo Sujeonggwa", "desc": "Delightful and authentic Nước quế gừng hồng sấy dẻo Sujeonggwa prepared with fresh high quality ingredients."}, "ja": {"name": "Nước quế gừng hồng sấy dẻo Sujeonggwa", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "계피 곶감 수정과", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước quế gừng hồng sấy dẻo Sujeonggwa", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_5: {"vi": {"name": "Trà thanh yên mật ong Goheung Yuja-cha", "desc": "Trà vỏ quả thanh yên ngào mật ong thơm nức mũi, vị chua ngọt thanh nhẹ giúp ấm họng."}, "en": {"name": "Trà thanh yên mật ong Goheung Yuja-cha", "desc": "Delightful and authentic Trà thanh yên mật ong Goheung Yuja-cha prepared with fresh high quality ingredients."}, "ja": {"name": "Trà thanh yên mật ong Goheung Yuja-cha", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "고흥 꿀 유자차", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trà thanh yên mật ong Goheung Yuja-cha", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_6: {"vi": {"name": "Nước ngọt sữa chua có ga Milkis mát lạnh", "desc": "Thức uống giải khát độc đáo kết hợp giữa sữa chua ngọt dịu và bọt ga sủi bọt sảng khoái."}, "en": {"name": "Nước ngọt sữa chua có ga Milkis mát lạnh", "desc": "Delightful and authentic Nước ngọt sữa chua có ga Milkis mát lạnh prepared with fresh high quality ingredients."}, "ja": {"name": "Nước ngọt sữa chua có ga Milkis mát lạnh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "부드러운 탄산 밀키스", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước ngọt sữa chua có ga Milkis mát lạnh", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_7: {"vi": {"name": "Rượu Soju Chamisul chai xanh êm dịu", "desc": "Chai rượu quốc dân êm dịu trong suốt 16 độ cồn, không thể thiếu trên bàn tiệc thịt nướng BBQ."}, "en": {"name": "Rượu Soju Chamisul chai xanh êm dịu", "desc": "Delightful and authentic Rượu Soju Chamisul chai xanh êm dịu prepared with fresh high quality ingredients."}, "ja": {"name": "Rượu Soju Chamisul chai xanh êm dịu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "참이슬 소주", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Rượu Soju Chamisul chai xanh êm dịu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  ko_dr_8: {"vi": {"name": "Rượu gạo lên men truyền thống Makgeolli thố đất", "desc": "Bát rượu gạo trắng đục sủi tăm vị ngọt chua dịu êm, uống cùng bánh xèo hải sản trời mưa."}, "en": {"name": "Rượu gạo lên men truyền thống Makgeolli thố đất", "desc": "Delightful and authentic Rượu gạo lên men truyền thống Makgeolli thố đất prepared with fresh high quality ingredients."}, "ja": {"name": "Rượu gạo lên men truyền thống Makgeolli thố đất", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "달콤한 생막걸리", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Rượu gạo lên men truyền thống Makgeolli thố đất", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_1: {"vi": {"name": "Bánh kẹp giòn ngũ cốc Thiên Tân Jianbing Guozi", "desc": "Bánh tráng bột đậu xanh quết trứng gà, sốt tương ngọt mè cay, kẹp bánh quẩy giòn tan giòn rụm."}, "en": {"name": "Bánh kẹp giòn ngũ cốc Thiên Tân Jianbing Guozi", "desc": "Delightful and authentic Bánh kẹp giòn ngũ cốc Thiên Tân Jianbing Guozi prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh kẹp giòn ngũ cốc Thiên Tân Jianbing Guozi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh kẹp giòn ngũ cốc Thiên Tân Jianbing Guozi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "天津正宗煎饼果子", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_2: {"vi": {"name": "Bánh bao nước Thượng Hải Tiểu Long Bao", "desc": "Xửng tre bốc khói 6 chiếc bánh bao vỏ mỏng như lụa, cắn nhẹ tràn trề dòng súp thịt heo ngọt lịm."}, "en": {"name": "Xiao Long Bao", "desc": "Delightful and authentic Xiao Long Bao prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh bao nước Thượng Hải Tiểu Long Bao", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh bao nước Thượng Hải Tiểu Long Bao", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "上海灌汤小笼包", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_3: {"vi": {"name": "Bánh bao chiên đáy giòn Thượng Hải Shengjianbao", "desc": "Bánh bao nhân thịt băm mọng nước chiên cháy đáy vàng ruộm giòn tan, rắc mè đen và hành hoa."}, "en": {"name": "Bánh bao chiên đáy giòn Thượng Hải Shengjianbao", "desc": "Delightful and authentic Bánh bao chiên đáy giòn Thượng Hải Shengjianbao prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh bao chiên đáy giòn Thượng Hải Shengjianbao", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh bao chiên đáy giòn Thượng Hải Shengjianbao", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "老上海生煎包", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_4: {"vi": {"name": "Mì khô sốt mè cay nồng Vũ Hán", "desc": "Mì kiềm trụng chín tới trộn đều sốt mè rang đen sánh đặc, dầu ớt cay, củ cải muối và đậu phộng rang."}, "en": {"name": "Mì khô sốt mè cay nồng Vũ Hán", "desc": "Delightful and authentic Mì khô sốt mè cay nồng Vũ Hán prepared with fresh high quality ingredients."}, "ja": {"name": "Mì khô sốt mè cay nồng Vũ Hán", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì khô sốt mè cay nồng Vũ Hán", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "武汉热干面", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_5: {"vi": {"name": "Sữa đậu nành nóng ăn kèm quẩy giòn vàng ruộm", "desc": "Bát sữa đậu nành tươi thơm phức chấm thanh quẩy dài vàng giòn rụm ráo dầu truyền thống."}, "en": {"name": "Sữa đậu nành nóng ăn kèm quẩy giòn vàng ruộm", "desc": "Delightful and authentic Sữa đậu nành nóng ăn kèm quẩy giòn vàng ruộm prepared with fresh high quality ingredients."}, "ja": {"name": "Sữa đậu nành nóng ăn kèm quẩy giòn vàng ruộm", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sữa đậu nành nóng ăn kèm quẩy giòn vàng ruộm", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "现磨醇豆浆配金黄油条", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_6: {"vi": {"name": "Cháo trứng bắc thảo thịt nạc Quảng Đông", "desc": "Cháo hoa nấu nhừ sánh mịn từ gạo thơm, thịt nạc ướp gừng và từng miếng trứng bắc thảo bùi béo."}, "en": {"name": "Cháo trứng bắc thảo thịt nạc Quảng Đông", "desc": "Delightful and authentic Cháo trứng bắc thảo thịt nạc Quảng Đông prepared with fresh high quality ingredients."}, "ja": {"name": "Cháo trứng bắc thảo thịt nạc Quảng Đông", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cháo trứng bắc thảo thịt nạc Quảng Đông", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广式皮蛋瘦肉粥", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_m_7: {"vi": {"name": "Hủ tiếu bò tái gân Triều Châu", "desc": "Bát hủ tiếu bánh mềm mượt chan nước súp xương bò hầm thanh ngọt, thịt bắp bò tái mềm và bò viên giòn sần sật."}, "en": {"name": "Chaoshan Beef Rice Noodle Soup", "desc": "Silky flat rice noodles in clear sweet beef broth with tender beef slices and crunchy meatballs."}, "ja": {"name": "潮汕風牛肉米粉", "desc": "澄んだ牛骨スープに柔らかい牛肉ともちもちの平打ち米粉麺が絶品。"}, "ko": {"name": "조산식 소고기 쌀국수", "desc": "맑고 깊은 소뼈 육수에 부드러운 소고기와 쫄깃한 쌀국수 면이 어우러진 맛."}, "zh": {"name": "潮汕牛肉粿条", "desc": "浓郁牛骨清汤搭配鲜嫩手切牛肉与爽口牛肉丸，滑爽顺喉。"}},
  zh_m_8: {"vi": {"name": "Sườn heo non hấp tàu xì Dim Sum Quảng Đông", "desc": "Từng miếng sườn sụn non chặt nhỏ ướp hạt tàu xì đen thơm lừng, ớt sừng và bột năng hấp mềm mọng."}, "en": {"name": "Sườn heo non hấp tàu xì Dim Sum Quảng Đông", "desc": "Delightful and authentic Sườn heo non hấp tàu xì Dim Sum Quảng Đông prepared with fresh high quality ingredients."}, "ja": {"name": "Sườn heo non hấp tàu xì Dim Sum Quảng Đông", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sườn heo non hấp tàu xì Dim Sum Quảng Đông", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广式豉汁蒸排骨", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_1: {"vi": {"name": "Mì kéo sợi thịt bò nước trong Lan Châu Lamian", "desc": "Sợi mì kéo tay dẻo dai, nước súp bò trong veo ngọt lịm, ớt đỏ, củ cải trắng và hành ngò xanh ngát."}, "en": {"name": "Mì kéo sợi thịt bò nước trong Lan Châu Lamian", "desc": "Delightful and authentic Mì kéo sợi thịt bò nước trong Lan Châu Lamian prepared with fresh high quality ingredients."}, "ja": {"name": "Mì kéo sợi thịt bò nước trong Lan Châu Lamian", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì kéo sợi thịt bò nước trong Lan Châu Lamian", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "兰州正宗牛肉拉面", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_2: {"vi": {"name": "Bánh mì kẹp thịt kho Tây An Roujiamo", "desc": "Vỏ bánh ngàn lớp nướng giòn rụm kẹp đầy thịt ba chỉ kho 30 vị thuốc bắc mềm rục béo ngậy."}, "en": {"name": "Bánh mì kẹp thịt kho Tây An Roujiamo", "desc": "Delightful and authentic Bánh mì kẹp thịt kho Tây An Roujiamo prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì kẹp thịt kho Tây An Roujiamo", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì kẹp thịt kho Tây An Roujiamo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "陕西老潼关肉夹馍", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_3: {"vi": {"name": "Đậu hũ sốt thịt băm cay nồng Tứ Xuyên Mapo Tofu", "desc": "Từng miếng đậu non mềm mượt đắm chìm trong sốt thịt bò băm, ớt cay xé và hạt hoa tiêu tê rần đầu lưỡi."}, "en": {"name": "Đậu hũ sốt thịt băm cay nồng Tứ Xuyên Mapo Tofu", "desc": "Delightful and authentic Đậu hũ sốt thịt băm cay nồng Tứ Xuyên Mapo Tofu prepared with fresh high quality ingredients."}, "ja": {"name": "Đậu hũ sốt thịt băm cay nồng Tứ Xuyên Mapo Tofu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Đậu hũ sốt thịt băm cay nồng Tứ Xuyên Mapo Tofu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "正宗四川麻婆豆腐", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_4: {"vi": {"name": "Cơm gà xào đậu phộng cay ngọt Cung Bảo", "desc": "Thịt đùi gà cắt hạt lựu xào lửa lớn với ớt khô, hành baro và đậu phộng giòn tan sốt chua ngọt cay."}, "en": {"name": "Kung Pao", "desc": "Delightful and authentic Kung Pao prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm gà xào đậu phộng cay ngọt Cung Bảo", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm gà xào đậu phộng cay ngọt Cung Bảo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "宫保鸡丁盖浇饭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_5: {"vi": {"name": "Cơm xá xíu mật ong Quảng Đông kèm cải thìa", "desc": "Từng lát thịt xá xíu nướng mật ong mềm mọng óng ả màu cánh gián, rưới sốt ngọt ăn cùng cơm trắng."}, "en": {"name": "Cơm xá xíu mật ong Quảng Đông kèm cải thìa", "desc": "Delightful and authentic Cơm xá xíu mật ong Quảng Đông kèm cải thìa prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm xá xíu mật ong Quảng Đông kèm cải thìa", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm xá xíu mật ong Quảng Đông kèm cải thìa", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广式蜜汁叉烧饭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_6: {"vi": {"name": "Há cảo tôm pha lê Dim Sum Quảng Đông", "desc": "Lớp vỏ bột tàn mì trong suốt nhìn thấu 3 con tôm sú tươi hồng hào giòn ngọt bên trong."}, "en": {"name": "Har Gow", "desc": "Delightful and authentic Har Gow prepared with fresh high quality ingredients."}, "ja": {"name": "Há cảo tôm pha lê Dim Sum Quảng Đông", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Há cảo tôm pha lê Dim Sum Quảng Đông", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广式水晶虾饺皇", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_7: {"vi": {"name": "Mì lạnh sốt ớt chua cay Tây An Liangpi", "desc": "Những sợi mì trắng trong mềm dai trộn dưa chuột giòn, mì căn gluten và sốt giấm ớt thơm nồng."}, "en": {"name": "Mì lạnh sốt ớt chua cay Tây An Liangpi", "desc": "Delightful and authentic Mì lạnh sốt ớt chua cay Tây An Liangpi prepared with fresh high quality ingredients."}, "ja": {"name": "Mì lạnh sốt ớt chua cay Tây An Liangpi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì lạnh sốt ớt chua cay Tây An Liangpi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "陕西麻辣凉皮", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_8: {"vi": {"name": "Bún ốc cay nồng Liễu Châu Luosifen", "desc": "Bát bún chua cay nồng nặc mùi măng chua đặc trưng, tàu hũ ky chiên phồng, đậu phộng rang và ốc."}, "en": {"name": "Bún ốc cay nồng Liễu Châu Luosifen", "desc": "Delightful and authentic Bún ốc cay nồng Liễu Châu Luosifen prepared with fresh high quality ingredients."}, "ja": {"name": "Bún ốc cay nồng Liễu Châu Luosifen", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bún ốc cay nồng Liễu Châu Luosifen", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "柳州原汤螺蛳粉", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_9: {"vi": {"name": "Thịt heo chiên chua ngọt Cáp Nhĩ Tân Quobao Rou", "desc": "Những lát thăn heo mỏng tẩm bột khoai tây chiên phồng xốp giòn tan áo lớp sốt giấm đường gừng tỏi."}, "en": {"name": "Thịt heo chiên chua ngọt Cáp Nhĩ Tân Quobao Rou", "desc": "Delightful and authentic Thịt heo chiên chua ngọt Cáp Nhĩ Tân Quobao Rou prepared with fresh high quality ingredients."}, "ja": {"name": "Thịt heo chiên chua ngọt Cáp Nhĩ Tân Quobao Rou", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Thịt heo chiên chua ngọt Cáp Nhĩ Tân Quobao Rou", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "东北老式锅包肉", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_10: {"vi": {"name": "Mì cay nồng hoa tiêu Trùng Khánh Xiaomian", "desc": "Bát mì chan ngập dầu ớt đỏ tươi thơm nức mè rang, hoa tiêu tê đầu lưỡi và cải thìa xanh giòn."}, "en": {"name": "Mì cay nồng hoa tiêu Trùng Khánh Xiaomian", "desc": "Delightful and authentic Mì cay nồng hoa tiêu Trùng Khánh Xiaomian prepared with fresh high quality ingredients."}, "ja": {"name": "Mì cay nồng hoa tiêu Trùng Khánh Xiaomian", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì cay nồng hoa tiêu Trùng Khánh Xiaomian", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "重庆麻辣小面", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_11: {"vi": {"name": "Cơm chiên Dương Châu tôm thịt lạp xưởng truyền thống", "desc": "Cơm hạt tơi vàng óng chiên đều tay cùng tôm tươi, lạp xưởng, đậu hà lan, bắp ngọt và trứng gà."}, "en": {"name": "Cơm chiên Dương Châu tôm thịt lạp xưởng truyền thống", "desc": "Delightful and authentic Cơm chiên Dương Châu tôm thịt lạp xưởng truyền thống prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm chiên Dương Châu tôm thịt lạp xưởng truyền thống", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm chiên Dương Châu tôm thịt lạp xưởng truyền thống", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "扬州经典蛋炒饭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_l_12: {"vi": {"name": "Cơm chiên thịt cừu cà rốt Tân Cương Polo", "desc": "Cơm nấu cùng thịt cừu non thơm mềm, cà rốt vàng ngọt lịm và nho khô chua ngọt đậm chất thảo nguyên."}, "en": {"name": "Cơm chiên thịt cừu cà rốt Tân Cương Polo", "desc": "Delightful and authentic Cơm chiên thịt cừu cà rốt Tân Cương Polo prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm chiên thịt cừu cà rốt Tân Cương Polo", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm chiên thịt cừu cà rốt Tân Cương Polo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "新疆手抓羊肉饭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_1: {"vi": {"name": "Bánh trứng gà non Hồng Kông giòn rụm", "desc": "Vỉ bánh hình tổ ong tròn như quả trứng gà nướng bơ sữa thơm phức, ngoài giòn tan trong mềm xốp."}, "en": {"name": "Bánh trứng gà non Hồng Kông giòn rụm", "desc": "Delightful and authentic Bánh trứng gà non Hồng Kông giòn rụm prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh trứng gà non Hồng Kông giòn rụm", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh trứng gà non Hồng Kông giòn rụm", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "港式香脆鸡蛋仔", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_2: {"vi": {"name": "Kẹo hồ lô táo gai bọc đường giòn Bắc Kinh", "desc": "Xiên quả táo gai đỏ au bọc lớp áo đường mạch nha cứng giòn tan, vị chua ngọt kích thích vị giác."}, "en": {"name": "Kẹo hồ lô táo gai bọc đường giòn Bắc Kinh", "desc": "Delightful and authentic Kẹo hồ lô táo gai bọc đường giòn Bắc Kinh prepared with fresh high quality ingredients."}, "ja": {"name": "Kẹo hồ lô táo gai bọc đường giòn Bắc Kinh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Kẹo hồ lô táo gai bọc đường giòn Bắc Kinh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "老北京冰糖葫芦", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_3: {"vi": {"name": "Đậu phụ thối đen chiên giòn Trường Sa sốt ớt", "desc": "Miếng đậu phụ thối đen chiên phồng xốp rưới đẫm nước sốt ớt cay nồng, tỏi băm và rau mùi đậm đà."}, "en": {"name": "Đậu phụ thối đen chiên giòn Trường Sa sốt ớt", "desc": "Delightful and authentic Đậu phụ thối đen chiên giòn Trường Sa sốt ớt prepared with fresh high quality ingredients."}, "ja": {"name": "Đậu phụ thối đen chiên giòn Trường Sa sốt ớt", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Đậu phụ thối đen chiên giòn Trường Sa sốt ớt", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "长沙正宗黑金臭豆腐", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_4: {"vi": {"name": "Mì nướng cuộn trứng xúc xích Cáp Nhĩ Tân", "desc": "Tấm mì nướng trên bàn là nóng, đập trứng gà, kẹp xúc xích rưới đẫm sốt chua ngọt cay đậm đà."}, "en": {"name": "Mì nướng cuộn trứng xúc xích Cáp Nhĩ Tân", "desc": "Delightful and authentic Mì nướng cuộn trứng xúc xích Cáp Nhĩ Tân prepared with fresh high quality ingredients."}, "ja": {"name": "Mì nướng cuộn trứng xúc xích Cáp Nhĩ Tân", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì nướng cuộn trứng xúc xích Cáp Nhĩ Tân", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "哈尔滨经典烤冷面", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_5: {"vi": {"name": "Xiên que nhúng sốt ớt mè Tứ Xuyên Bobo Chicken", "desc": "Thố sứ ngập tràn xiên que thịt gà, mề gà, rau củ ngâm trong dầu ớt đỏ tươi rắc dày đặc mè rang."}, "en": {"name": "Xiên que nhúng sốt ớt mè Tứ Xuyên Bobo Chicken", "desc": "Delightful and authentic Xiên que nhúng sốt ớt mè Tứ Xuyên Bobo Chicken prepared with fresh high quality ingredients."}, "ja": {"name": "Xiên que nhúng sốt ớt mè Tứ Xuyên Bobo Chicken", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Xiên que nhúng sốt ớt mè Tứ Xuyên Bobo Chicken", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "乐山钵钵鸡串串香", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_6: {"vi": {"name": "Bánh nướng ngàn lớp thơm mè Shaanxi Shaobing", "desc": "Bánh nướng lò than ngàn lớp vỏ giòn vụn thơm lừng mùi bơ mè, cắn vào xốp mềm nóng bỏng."}, "en": {"name": "Bánh nướng ngàn lớp thơm mè Shaanxi Shaobing", "desc": "Delightful and authentic Bánh nướng ngàn lớp thơm mè Shaanxi Shaobing prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh nướng ngàn lớp thơm mè Shaanxi Shaobing", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh nướng ngàn lớp thơm mè Shaanxi Shaobing", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "陕西肉汁潼关千层烧饼", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_7: {"vi": {"name": "Sữa tươi chiên giòn vỏ tan nhân kem Thuận Đức", "desc": "Từng thỏi sữa đặc đông lạnh lăn bột chiên giòn rụm bên ngoài, cắn vào nhân kem sữa chảy ngọt ngào."}, "en": {"name": "Sữa tươi chiên giòn vỏ tan nhân kem Thuận Đức", "desc": "Delightful and authentic Sữa tươi chiên giòn vỏ tan nhân kem Thuận Đức prepared with fresh high quality ingredients."}, "ja": {"name": "Sữa tươi chiên giòn vỏ tan nhân kem Thuận Đức", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sữa tươi chiên giòn vỏ tan nhân kem Thuận Đức", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广东顺德炸牛奶", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_8: {"vi": {"name": "Hoành thánh tôm thịt sốt dầu ớt cay Hồng Du Sao Thủ", "desc": "Từng viên hoành thánh vỏ mỏng tơ lụa nhân tôm thịt đậm đà tắm mình trong thố dầu ớt hoa tiêu tê cay."}, "en": {"name": "Hoành thánh tôm thịt sốt dầu ớt cay Hồng Du Sao Thủ", "desc": "Delightful and authentic Hoành thánh tôm thịt sốt dầu ớt cay Hồng Du Sao Thủ prepared with fresh high quality ingredients."}, "ja": {"name": "Hoành thánh tôm thịt sốt dầu ớt cay Hồng Du Sao Thủ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Hoành thánh tôm thịt sốt dầu ớt cay Hồng Du Sao Thủ", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "四川红油抄手", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_a_9: {"vi": {"name": "Mì tương đen Bắc Kinh Zha Jiang Mian", "desc": "Sợi mì tươi trụng dai giòn trộn đẫm sốt tương ngọt xào thịt ba chỉ băm, ăn kèm dưa leo và giá đỗ giòn ngọt."}, "en": {"name": "Old Beijing Zha Jiang Mian Noodles", "desc": "Fresh chewy noodles tossed in rich savory soybean paste with diced pork and crunchy vegetables."}, "ja": {"name": "本場北京ジャージャー麺", "desc": "豚肉の旨味が詰まった濃厚な黒味噌だれをコシのある手打ち麺とキュウリに絡めて。"}, "ko": {"name": "베이징식 전통 짜장면", "desc": "고소한 춘장 소스에 볶은 돼지고기와 신선한 오이를 비벼 먹는 북경 전통 면 요리."}, "zh": {"name": "老北京炸酱面", "desc": "传统六必居干黄酱小火慢炸五花肉丁，配菜清爽面条劲道。"}},
  zh_a_10: {"vi": {"name": "Chả tôm hạt lựu chiên giòn Triều Châu Xiazao", "desc": "Chả tôm tươi giã tay trộn củ năng giòn ngọt chiên phồng vàng ruộm, chấm sốt quất chua ngọt."}, "en": {"name": "Chả tôm hạt lựu chiên giòn Triều Châu Xiazao", "desc": "Delightful and authentic Chả tôm hạt lựu chiên giòn Triều Châu Xiazao prepared with fresh high quality ingredients."}, "ja": {"name": "Chả tôm hạt lựu chiên giòn Triều Châu Xiazao", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Chả tôm hạt lựu chiên giòn Triều Châu Xiazao", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "潮汕脆皮虾枣", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_1: {"vi": {"name": "Vịt quay Bắc Kinh da giòn cuốn bánh tráng", "desc": "Miếng da vịt nướng lu vàng óng giòn tan chấm đường cát, thịt vịt mềm ngọt cuốn bánh tráng mỏng."}, "en": {"name": "Vịt quay Bắc Kinh da giòn cuốn bánh tráng", "desc": "Delightful and authentic Vịt quay Bắc Kinh da giòn cuốn bánh tráng prepared with fresh high quality ingredients."}, "ja": {"name": "Vịt quay Bắc Kinh da giòn cuốn bánh tráng", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Vịt quay Bắc Kinh da giòn cuốn bánh tráng", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "北京正宗挂炉烤鸭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_2: {"vi": {"name": "Lẩu cay Tứ Xuyên 9 ngăn dầu bò tê cay nồng", "desc": "Nồi lẩu đồng đỏ 9 ngăn sôi sùng sục dầu bò hoa tiêu cay xé lưỡi, nhúng dạ sách bò, ruột vịt giòn rụm."}, "en": {"name": "Lẩu cay Tứ Xuyên 9 ngăn dầu bò tê cay nồng", "desc": "Delightful and authentic Lẩu cay Tứ Xuyên 9 ngăn dầu bò tê cay nồng prepared with fresh high quality ingredients."}, "ja": {"name": "Lẩu cay Tứ Xuyên 9 ngăn dầu bò tê cay nồng", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Lẩu cay Tứ Xuyên 9 ngăn dầu bò tê cay nồng", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "四川老灶九宫格牛油火锅", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_3: {"vi": {"name": "Cơm niêu đất nung lạp xưởng Quảng Đông Baozaifan", "desc": "Cơm niêu đất tạo lớp cháy vàng ươm giòn rụm, xếp ngập lạp xưởng Mai Quế Lộ rưới nước tương ngọt."}, "en": {"name": "Cơm niêu đất nung lạp xưởng Quảng Đông Baozaifan", "desc": "Delightful and authentic Cơm niêu đất nung lạp xưởng Quảng Đông Baozaifan prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm niêu đất nung lạp xưởng Quảng Đông Baozaifan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm niêu đất nung lạp xưởng Quảng Đông Baozaifan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "广式皇上皇腊味煲仔饭", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_4: {"vi": {"name": "Thịt kho Đông Pha Hàng Châu mềm tan béo ngậy", "desc": "Khối thịt ba chỉ vuông vức chưng rượu Thiệu Hưng và xì dầu đỏ au óng ả, bì mềm tan như thạch."}, "en": {"name": "Thịt kho Đông Pha Hàng Châu mềm tan béo ngậy", "desc": "Delightful and authentic Thịt kho Đông Pha Hàng Châu mềm tan béo ngậy prepared with fresh high quality ingredients."}, "ja": {"name": "Thịt kho Đông Pha Hàng Châu mềm tan béo ngậy", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Thịt kho Đông Pha Hàng Châu mềm tan béo ngậy", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "杭州西湖东坡肉", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_5: {"vi": {"name": "Cá phi lê luộc sốt ớt cải chua Trùng Khánh", "desc": "Những lát cá phi lê trắng nõn mềm ngọt bơi trong tô nước dùng nấu cải chua cay tê nồng hoa tiêu."}, "en": {"name": "Cá phi lê luộc sốt ớt cải chua Trùng Khánh", "desc": "Delightful and authentic Cá phi lê luộc sốt ớt cải chua Trùng Khánh prepared with fresh high quality ingredients."}, "ja": {"name": "Cá phi lê luộc sốt ớt cải chua Trùng Khánh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá phi lê luộc sốt ớt cải chua Trùng Khánh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "重庆酸菜水煮鱼", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_6: {"vi": {"name": "Gà nướng đất sét bọc lá sen ăn mày Beggar's Chicken", "desc": "Con gà ta ướp nấm hương gia vị bọc kín trong lá sen và đất sét nướng củi thơm phức thịt mềm ngọt."}, "en": {"name": "Gà nướng đất sét bọc lá sen ăn mày Beggar's Chicken", "desc": "Delightful and authentic Gà nướng đất sét bọc lá sen ăn mày Beggar's Chicken prepared with fresh high quality ingredients."}, "ja": {"name": "Gà nướng đất sét bọc lá sen ăn mày Beggar's Chicken", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Gà nướng đất sét bọc lá sen ăn mày Beggar's Chicken", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "正宗富贵叫花鸡", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_7: {"vi": {"name": "Sườn heo sốt đỏ Vô Tích đậm đà óng ánh", "desc": "Dẻ sườn heo om đường phèn và nước tương đỏ óng ả màu hồng ngọc, thịt mềm róc xương ngọt ngào."}, "en": {"name": "Sườn heo sốt đỏ Vô Tích đậm đà óng ánh", "desc": "Delightful and authentic Sườn heo sốt đỏ Vô Tích đậm đà óng ánh prepared with fresh high quality ingredients."}, "ja": {"name": "Sườn heo sốt đỏ Vô Tích đậm đà óng ánh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sườn heo sốt đỏ Vô Tích đậm đà óng ánh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "无锡酱排骨", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_8: {"vi": {"name": "Đầu cá hấp ớt băm cay nồng Hồ Nam", "desc": "Nửa chiếc đầu cá mè hoa khổng lồ hấp chín tới phủ kín lớp ớt ngâm chua cay nồng nàn đưa cơm."}, "en": {"name": "Đầu cá hấp ớt băm cay nồng Hồ Nam", "desc": "Delightful and authentic Đầu cá hấp ớt băm cay nồng Hồ Nam prepared with fresh high quality ingredients."}, "ja": {"name": "Đầu cá hấp ớt băm cay nồng Hồ Nam", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Đầu cá hấp ớt băm cay nồng Hồ Nam", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "湖南剁椒鱼头", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_9: {"vi": {"name": "Canh thịt cừu bánh mì bẻ vụn Tây An Paomo", "desc": "Tô súp cừu hầm thảo mộc thơm lừng chan ngập những mẩu bánh mì nướng bẻ tay dẻo quánh, ăn cùng tỏi ngâm."}, "en": {"name": "Canh thịt cừu bánh mì bẻ vụn Tây An Paomo", "desc": "Delightful and authentic Canh thịt cừu bánh mì bẻ vụn Tây An Paomo prepared with fresh high quality ingredients."}, "ja": {"name": "Canh thịt cừu bánh mì bẻ vụn Tây An Paomo", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Canh thịt cừu bánh mì bẻ vụn Tây An Paomo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "西安羊肉泡馍", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_d_10: {"vi": {"name": "Súp yến tiệc Phúc Kiến Phật Nhảy Tường", "desc": "Thố súp hoàng gia chưng 18 vị quý hiếm: vi cá, hải sâm, bào ngư, nấm đông cô, nước súp sánh đặc."}, "en": {"name": "Súp yến tiệc Phúc Kiến Phật Nhảy Tường", "desc": "Delightful and authentic Súp yến tiệc Phúc Kiến Phật Nhảy Tường prepared with fresh high quality ingredients."}, "ja": {"name": "Súp yến tiệc Phúc Kiến Phật Nhảy Tường", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Súp yến tiệc Phúc Kiến Phật Nhảy Tường", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "佛跳墙", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_1: {"vi": {"name": "Chè xoài bưởi trân châu Dương Chi Cam Lộ", "desc": "Sốt xoài cát sánh mịn hòa nước cốt dừa thơm béo, tép bưởi hồng mọng nước và trân châu dẻo."}, "en": {"name": "Chè xoài bưởi trân châu Dương Chi Cam Lộ", "desc": "Delightful and authentic Chè xoài bưởi trân châu Dương Chi Cam Lộ prepared with fresh high quality ingredients."}, "ja": {"name": "Chè xoài bưởi trân châu Dương Chi Cam Lộ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Chè xoài bưởi trân châu Dương Chi Cam Lộ", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "港式杨枝甘露", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_2: {"vi": {"name": "Sữa tươi đun hai lớp màng Thuận Đức Shuangpinai", "desc": "Sữa trâu tươi đun tạo hai lớp màng mịn màng béo ngậy như lụa, vị ngọt thanh mát lạnh."}, "en": {"name": "Sữa tươi đun hai lớp màng Thuận Đức Shuangpinai", "desc": "Delightful and authentic Sữa tươi đun hai lớp màng Thuận Đức Shuangpinai prepared with fresh high quality ingredients."}, "ja": {"name": "Sữa tươi đun hai lớp màng Thuận Đức Shuangpinai", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sữa tươi đun hai lớp màng Thuận Đức Shuangpinai", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "顺德双皮奶", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_3: {"vi": {"name": "Thạch băng phấn đường đen bánh nếp Thành Đô", "desc": "Bát thạch trong veo ướp đá rưới mật mía đường đen ngọt lịm, rắc bánh nếp chiên giòn và táo đỏ."}, "en": {"name": "Thạch băng phấn đường đen bánh nếp Thành Đô", "desc": "Delightful and authentic Thạch băng phấn đường đen bánh nếp Thành Đô prepared with fresh high quality ingredients."}, "ja": {"name": "Thạch băng phấn đường đen bánh nếp Thành Đô", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Thạch băng phấn đường đen bánh nếp Thành Đô", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "成都老红糖糍粑冰粉", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_4: {"vi": {"name": "Bánh trôi nước mè đen Ninh Ba ấm nồng gừng tươi", "desc": "Viên bánh trôi nếp dẻo quánh cắn ngập nhân mè đen đường phèn béo ngậy, chan nước gừng ấm áp."}, "en": {"name": "Bánh trôi nước mè đen Ninh Ba ấm nồng gừng tươi", "desc": "Delightful and authentic Bánh trôi nước mè đen Ninh Ba ấm nồng gừng tươi prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh trôi nước mè đen Ninh Ba ấm nồng gừng tươi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh trôi nước mè đen Ninh Ba ấm nồng gừng tươi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "宁波黑芝麻汤圆", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_5: {"vi": {"name": "Đậu hũ hạnh nhân hoàng cung Bắc Kinh ướp đá", "desc": "Từng khối thạch hạnh nhân trắng ngần mềm mịn tan trên đầu lưỡi, rưới siro hoa quế ngát hương."}, "en": {"name": "Đậu hũ hạnh nhân hoàng cung Bắc Kinh ướp đá", "desc": "Delightful and authentic Đậu hũ hạnh nhân hoàng cung Bắc Kinh ướp đá prepared with fresh high quality ingredients."}, "ja": {"name": "Đậu hũ hạnh nhân hoàng cung Bắc Kinh ướp đá", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Đậu hũ hạnh nhân hoàng cung Bắc Kinh ướp đá", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "老北京杏仁豆腐", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_6: {"vi": {"name": "Bánh Crepe cuộn xoài tươi kem tươi Mango Pancake", "desc": "Lớp vỏ crepe vàng óng mỏng tang cuộn ngập kem tươi béo mịn và miếng xoài cát chín mọng ngọt lịm."}, "en": {"name": "Bánh Crepe cuộn xoài tươi kem tươi Mango Pancake", "desc": "Delightful and authentic Bánh Crepe cuộn xoài tươi kem tươi Mango Pancake prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh Crepe cuộn xoài tươi kem tươi Mango Pancake", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh Crepe cuộn xoài tươi kem tươi Mango Pancake", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "港式香芒班戟", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_s_7: {"vi": {"name": "Khoai lang ngào đường kéo sợi giòn tan Basi Digua", "desc": "Từng miếng khoai lang chiên vàng áo lớp mạch nha kéo sợi tơ vàng óng ánh, nhúng bát nước đá giòn rụm."}, "en": {"name": "Khoai lang ngào đường kéo sợi giòn tan Basi Digua", "desc": "Delightful and authentic Khoai lang ngào đường kéo sợi giòn tan Basi Digua prepared with fresh high quality ingredients."}, "ja": {"name": "Khoai lang ngào đường kéo sợi giòn tan Basi Digua", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Khoai lang ngào đường kéo sợi giòn tan Basi Digua", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "拔丝地瓜", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_1: {"vi": {"name": "Trà chanh giã tay Ô Long Vịt Cứt Hương Quảng Đông", "desc": "Chanh vàng giã tay dập tép hòa vào cốt trà ô long Vịt Cứt Hương thơm ngát sảng khoái ngày hè."}, "en": {"name": "Trà chanh giã tay Ô Long Vịt Cứt Hương Quảng Đông", "desc": "Delightful and authentic Trà chanh giã tay Ô Long Vịt Cứt Hương Quảng Đông prepared with fresh high quality ingredients."}, "ja": {"name": "Trà chanh giã tay Ô Long Vịt Cứt Hương Quảng Đông", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà chanh giã tay Ô Long Vịt Cứt Hương Quảng Đông", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "手打鸭屎香柠檬茶", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_2: {"vi": {"name": "Trà sữa tất da chân Hồng Kông đậm đà béo ngậy", "desc": "Trà đen Ceylon ủ lọc qua túi vải đặc trưng tạo độ mịn sánh hòa cùng sữa đặc béo ngậy chuẩn vị Hồng Kông."}, "en": {"name": "Trà sữa tất da chân Hồng Kông đậm đà béo ngậy", "desc": "Delightful and authentic Trà sữa tất da chân Hồng Kông đậm đà béo ngậy prepared with fresh high quality ingredients."}, "ja": {"name": "Trà sữa tất da chân Hồng Kông đậm đà béo ngậy", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà sữa tất da chân Hồng Kông đậm đà béo ngậy", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "正宗港式丝袜奶茶", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_3: {"vi": {"name": "Nước ô mai mơ hun khói Bắc Kinh ướp lạnh", "desc": "Quả ô mai mơ hun khói nấu táo gai và hoa quế, vị chua thanh ngọt hậu giải nhiệt ngày nóng."}, "en": {"name": "Nước ô mai mơ hun khói Bắc Kinh ướp lạnh", "desc": "Delightful and authentic Nước ô mai mơ hun khói Bắc Kinh ướp lạnh prepared with fresh high quality ingredients."}, "ja": {"name": "Nước ô mai mơ hun khói Bắc Kinh ướp lạnh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước ô mai mơ hun khói Bắc Kinh ướp lạnh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "老北京冰镇酸梅汤", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_4: {"vi": {"name": "Trà Thiết Quan Âm bọt sữa phô mai mặn kem béo", "desc": "Cốt trà Thiết Quan Âm đậm vị chát ngọt phủ lớp kem cheese bồng bềnh mặn mặn béo ngậy."}, "en": {"name": "Trà Thiết Quan Âm bọt sữa phô mai mặn kem béo", "desc": "Delightful and authentic Trà Thiết Quan Âm bọt sữa phô mai mặn kem béo prepared with fresh high quality ingredients."}, "ja": {"name": "Trà Thiết Quan Âm bọt sữa phô mai mặn kem béo", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà Thiết Quan Âm bọt sữa phô mai mặn kem béo", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "芝士现萃铁观音", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_5: {"vi": {"name": "Trà bưởi hồng mật ong thanh nhiệt", "desc": "Tép bưởi hồng chín mọng ngào mật ong hoa rừng thơm lừng, vị chua ngọt thanh mát giàu vitamin C."}, "en": {"name": "Honey Red Pomelo Tea", "desc": "Refreshing tea brewed with sweet wild honey and juicy red pomelo pulp, packed with vitamin C."}, "ja": {"name": "蜂蜜グレープフルーツティー", "desc": "濃厚なハチミツと爽やかなルビーグレープフルーツ果肉が弾けるアイスティー。"}, "ko": {"name": "꿀 자몽 허니 티", "desc": "달콤한 야생화 꿀과 상큼한 자몽 과육이 가득 담긴 청량한 과일차."}, "zh": {"name": "蜂蜜柚子茶", "desc": "新鲜红柚果粒融入天然野花蜂蜜，酸甜可口润喉生津。"}},
  zh_dr_6: {"vi": {"name": "Trà thảo mộc thanh nhiệt Vương Lão Cát lon đỏ", "desc": "Lon trà thảo mộc 10 vị hoa cúc cam thảo giải nhiệt cơ thể khi ăn các món cay nóng lẩu nướng."}, "en": {"name": "Trà thảo mộc thanh nhiệt Vương Lão Cát lon đỏ", "desc": "Delightful and authentic Trà thảo mộc thanh nhiệt Vương Lão Cát lon đỏ prepared with fresh high quality ingredients."}, "ja": {"name": "Trà thảo mộc thanh nhiệt Vương Lão Cát lon đỏ", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà thảo mộc thanh nhiệt Vương Lão Cát lon đỏ", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "王老吉凉茶", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_7: {"vi": {"name": "Bia tươi Thanh Đảo lon xanh ướp lạnh", "desc": "Dòng bia tươi mát làm từ nguồn nước suối ngọt núi Lao Sơn, vị đắng êm dịu bọt tuyết mịn màng."}, "en": {"name": "Bia tươi Thanh Đảo lon xanh ướp lạnh", "desc": "Delightful and authentic Bia tươi Thanh Đảo lon xanh ướp lạnh prepared with fresh high quality ingredients."}, "ja": {"name": "Bia tươi Thanh Đảo lon xanh ướp lạnh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bia tươi Thanh Đảo lon xanh ướp lạnh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "青岛纯生啤酒", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  zh_dr_8: {"vi": {"name": "Rượu nếp Thiệu Hưng Hoa Điêu ủ ấm gừng tươi", "desc": "Bình gốm rượu nếp ủ 10 năm thơm nồng nàn sắc hổ phách, hâm ấm cùng vài sợi gừng tươi mùa đông."}, "en": {"name": "Rượu nếp Thiệu Hưng Hoa Điêu ủ ấm gừng tươi", "desc": "Delightful and authentic Rượu nếp Thiệu Hưng Hoa Điêu ủ ấm gừng tươi prepared with fresh high quality ingredients."}, "ja": {"name": "Rượu nếp Thiệu Hưng Hoa Điêu ủ ấm gừng tươi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Rượu nếp Thiệu Hưng Hoa Điêu ủ ấm gừng tươi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "绍兴传统花雕花雕酒", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_1: {"vi": {"name": "Bữa sáng truyền thống nước Anh thịnh soạn", "desc": "Đĩa ăn sáng khổng lồ: 2 xúc xích Cumberland, thịt xông khói, 2 trứng ốp la, đậu hầm, nấm xào, cà chua và bánh mì bơ."}, "en": {"name": "Full English Breakfast", "desc": "Delightful and authentic Full English Breakfast prepared with fresh high quality ingredients."}, "ja": {"name": "Bữa sáng truyền thống nước Anh thịnh soạn", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bữa sáng truyền thống nước Anh thịnh soạn", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bữa sáng truyền thống nước Anh thịnh soạn", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_2: {"vi": {"name": "Bánh pancake bơ sữa xốp mềm siro phong", "desc": "Chồng 3 tầng bánh pancake nướng vàng ươm xốp như mây, đặt miếng bơ tươi và rưới đẫm siro lá phong Canada."}, "en": {"name": "Fluffy Buttermilk Pancakes", "desc": "Delightful and authentic Fluffy Buttermilk Pancakes prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh pancake bơ sữa xốp mềm siro phong", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh pancake bơ sữa xốp mềm siro phong", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh pancake bơ sữa xốp mềm siro phong", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_3: {"vi": {"name": "Trứng chần sốt bơ Hollandaise béo ngậy Eggs Benedict", "desc": "Bánh nướng xốp muffin kẹp thịt xông khói, quả trứng chần lòng đào núng nính rưới sốt bơ trứng vàng ươm."}, "en": {"name": "Classic Eggs Benedict", "desc": "Delightful and authentic Classic Eggs Benedict prepared with fresh high quality ingredients."}, "ja": {"name": "Trứng chần sốt bơ Hollandaise béo ngậy Eggs Benedict", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trứng chần sốt bơ Hollandaise béo ngậy Eggs Benedict", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trứng chần sốt bơ Hollandaise béo ngậy Eggs Benedict", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_4: {"vi": {"name": "Bánh mì men chua nướng kẹp bơ tươi lát sốt dầu oliu", "desc": "Lát bánh mì sourdough nướng giòn rụm phết bơ sáp tươi nghiền, rắc ớt bột paprika và muối biển flakes."}, "en": {"name": "Sourdough Avocado Toast", "desc": "Delightful and authentic Sourdough Avocado Toast prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì men chua nướng kẹp bơ tươi lát sốt dầu oliu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì men chua nướng kẹp bơ tươi lát sốt dầu oliu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì men chua nướng kẹp bơ tươi lát sốt dầu oliu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_5: {"vi": {"name": "Bánh mì vòng Bagel New York kẹp cá hồi xông khói", "desc": "Ổ bánh bagel nướng giòn vỏ dai ruột phết kem phô mai cream cheese, cá hồi xông khói lát mỏng và nụ bạch hoa."}, "en": {"name": "NYC Bagel with Lox", "desc": "Delightful and authentic NYC Bagel with Lox prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì vòng Bagel New York kẹp cá hồi xông khói", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì vòng Bagel New York kẹp cá hồi xông khói", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì vòng Bagel New York kẹp cá hồi xông khói", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_6: {"vi": {"name": "Gà rán giòn rụm ăn kèm bánh waffle siro phong", "desc": "Miếng đùi gà tẩm bột chiên giòn tan đặt trên bánh tổ ong waffle mềm xốp rưới mật ong ớt cay."}, "en": {"name": "Southern Chicken and Waffles", "desc": "Delightful and authentic Southern Chicken and Waffles prepared with fresh high quality ingredients."}, "ja": {"name": "Gà rán giòn rụm ăn kèm bánh waffle siro phong", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Gà rán giòn rụm ăn kèm bánh waffle siro phong", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gà rán giòn rụm ăn kèm bánh waffle siro phong", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_7: {"vi": {"name": "Bánh quy bơ xốp miền Nam sốt kem xúc xích tiêu đen", "desc": "Bánh biscuit nướng vỏ tách lớp ngập trong dòng sốt kem sữa nấu xúc xích tiêu đen thơm ngậy nồng ấm."}, "en": {"name": "Biscuits and Sausage Gravy", "desc": "Delightful and authentic Biscuits and Sausage Gravy prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh quy bơ xốp miền Nam sốt kem xúc xích tiêu đen", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh quy bơ xốp miền Nam sốt kem xúc xích tiêu đen", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh quy bơ xốp miền Nam sốt kem xúc xích tiêu đen", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_m_8: {"vi": {"name": "Cá trích hun khói Scotland nướng bơ chanh", "desc": "Cá trích phi lê hun khói nướng thơm mùi gỗ sồi ăn kèm trứng chần lòng đào và bánh mì lúa mạch đen."}, "en": {"name": "Scottish Smoked Kippers & Poached Egg", "desc": "Delightful and authentic Scottish Smoked Kippers & Poached Egg prepared with fresh high quality ingredients."}, "ja": {"name": "Cá trích hun khói Scotland nướng bơ chanh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá trích hun khói Scotland nướng bơ chanh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cá trích hun khói Scotland nướng bơ chanh", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_1: {"vi": {"name": "Burger bò đập áp chảo hai tầng phô mai tan chảy", "desc": "2 viên bò Angus tươi đập dẹt trên chảo gang xèo xèo viền cháy giòn rụm, kẹp 2 lát phô mai cheddar tan chảy."}, "en": {"name": "Double Smash Cheeseburger", "desc": "Delightful and authentic Double Smash Cheeseburger prepared with fresh high quality ingredients."}, "ja": {"name": "Burger bò đập áp chảo hai tầng phô mai tan chảy", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Burger bò đập áp chảo hai tầng phô mai tan chảy", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Burger bò đập áp chảo hai tầng phô mai tan chảy", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_2: {"vi": {"name": "Pizza New York đế mỏng xúc xích cay Pepperoni", "desc": "Lát pizza New York cỡ đại đế mỏng nướng lò củi giòn tan, phủ đẫm sốt cà chua, mozzarella và xúc xích cay."}, "en": {"name": "New York Pepperoni Pizza", "desc": "Delightful and authentic New York Pepperoni Pizza prepared with fresh high quality ingredients."}, "ja": {"name": "Pizza New York đế mỏng xúc xích cay Pepperoni", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Pizza New York đế mỏng xúc xích cay Pepperoni", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Pizza New York đế mỏng xúc xích cay Pepperoni", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_3: {"vi": {"name": "Cá tuyết chiên bột bia giòn rụm kèm khoai tây chiên", "desc": "Miếng phi lê cá tuyết nhúng bột bia chiên phồng vàng rụm, ăn kèm khoai tây chiên lát dày và sốt tartar chua béo."}, "en": {"name": "British Beer-Battered Fish & Chips", "desc": "Delightful and authentic British Beer-Battered Fish & Chips prepared with fresh high quality ingredients."}, "ja": {"name": "Cá tuyết chiên bột bia giòn rụm kèm khoai tây chiên", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá tuyết chiên bột bia giòn rụm kèm khoai tây chiên", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cá tuyết chiên bột bia giòn rụm kèm khoai tây chiên", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_4: {"vi": {"name": "Bánh mì bò xào phô mai tan chảy Philadelphia", "desc": "Ổ bánh mì dài nướng giòn kẹp đầy thịt thăn bò thái mỏng xào hành tây ngọt lịm và phô mai Provolone béo ngậy."}, "en": {"name": "Original Philly Cheesesteak", "desc": "Delightful and authentic Original Philly Cheesesteak prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì bò xào phô mai tan chảy Philadelphia", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì bò xào phô mai tan chảy Philadelphia", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì bò xào phô mai tan chảy Philadelphia", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_5: {"vi": {"name": "Súp nghêu kem béo ngậy trong bánh mì men chua", "desc": "Súp nghêu nấu kem tươi béo ngậy, khoai tây thái hạt lựu đựng trong ổ bánh mì sourdough khoét ruột giòn tan."}, "en": {"name": "Clam Chowder in Sourdough Bowl", "desc": "Delightful and authentic Clam Chowder in Sourdough Bowl prepared with fresh high quality ingredients."}, "ja": {"name": "Súp nghêu kem béo ngậy trong bánh mì men chua", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Súp nghêu kem béo ngậy trong bánh mì men chua", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Súp nghêu kem béo ngậy trong bánh mì men chua", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_6: {"vi": {"name": "Bánh mì bơ nướng kẹp thịt tôm hùm tươi bang Maine", "desc": "Ổ bánh brioche nướng bơ kẹp ngập thịt càng tôm hùm tươi ngọt chắc nịch trộn sốt mayo chanh tươi."}, "en": {"name": "Maine Lobster Roll", "desc": "Delightful and authentic Maine Lobster Roll prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì bơ nướng kẹp thịt tôm hùm tươi bang Maine", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì bơ nướng kẹp thịt tôm hùm tươi bang Maine", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì bơ nướng kẹp thịt tôm hùm tươi bang Maine", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_7: {"vi": {"name": "Burger gà rán cay xé lưỡi kiểu Nashville", "desc": "Miếng ức gà chiên giòn rụm áo lớp dầu ớt cayenne cay nồng rực lửa, kẹp dưa chuột muối chua giòn."}, "en": {"name": "Nashville Hot Chicken Sandwich", "desc": "Delightful and authentic Nashville Hot Chicken Sandwich prepared with fresh high quality ingredients."}, "ja": {"name": "Burger gà rán cay xé lưỡi kiểu Nashville", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Burger gà rán cay xé lưỡi kiểu Nashville", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Burger gà rán cay xé lưỡi kiểu Nashville", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_8: {"vi": {"name": "Mì Ý sốt bò băm cà chua hầm", "desc": "Sợi mì Ý luộc al dente phủ đẫm sốt thịt bò băm nấu rượu vang cà chua hầm nhừ 4 tiếng và phô mai Parmesan bào."}, "en": {"name": "Classic Spaghetti Bolognese", "desc": "Al dente spaghetti tossed in rich slow-cooked beef ragù and San Marzano tomatoes, topped with grated Parmesan."}, "ja": {"name": "特製ボロネーゼ スパゲッティ", "desc": "牛肉と完熟トマトをじっくり煮込んだ芳醇なミートソースに削りたてパルメザンチーズを添えて。"}, "ko": {"name": "클래식 볼로네제 스파게티", "desc": "오랜 시간 정성스레 끓여낸 깊고 진한 소고기 토마토 라구 소스와 파마산 치즈."}, "zh": {"name": "经典意式肉酱面", "desc": "慢火煨炖浓郁番茄牛肉酱搭配弹牙意面，撒上现磨帕玛森干酪。"}},
  en_l_9: {"vi": {"name": "Salad gà nướng sốt giấm rượu vang Cobb Salad", "desc": "Đĩa salad xếp hàng lối: ức gà nướng, thịt xông khói giòn, trứng luộc, quả bơ, cà chua bi và sốt blue cheese."}, "en": {"name": "Cobb Salad with Grilled Chicken", "desc": "Delightful and authentic Cobb Salad with Grilled Chicken prepared with fresh high quality ingredients."}, "ja": {"name": "Salad gà nướng sốt giấm rượu vang Cobb Salad", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Salad gà nướng sốt giấm rượu vang Cobb Salad", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Salad gà nướng sốt giấm rượu vang Cobb Salad", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_10: {"vi": {"name": "Cá hồi áp chảo sốt bơ chanh măng tây", "desc": "Miếng phi lê cá hồi Đại Tây Dương da giòn thịt mềm ngậy rưới sốt bơ chanh tỏi và ngọn măng tây nướng giòn ngọt."}, "en": {"name": "Pan-Seared Salmon with Asparagus", "desc": "Crispy skin Atlantic salmon fillet drizzled with lemon butter garlic glaze, served with tender grilled asparagus."}, "ja": {"name": "サーモンのムニエル 焼きアスパラ添え", "desc": "皮面はカリッと身はしっとり焼き上げたサーモンにレモンバターソースと香ばしいアスパラガス。"}, "ko": {"name": "팬프라이 연어 스테이크와 아스파라거스", "desc": "바삭한 껍질과 촉촉한 연어 살에 향긋한 레몬 버터 소스와 아삭한 구운 아스파라거스."}, "zh": {"name": "香煎三文鱼配芦笋", "desc": "外皮金黄焦脆内里肉质滑嫩的厚切三文鱼，佐以柠檬黄油汁与清脆烤芦笋。"}},
  en_l_11: {"vi": {"name": "Bánh mì sandwich thịt xông khói cà chua xà lách BLT", "desc": "3 lớp bánh mì brioche kẹp đầy thịt ba chỉ xông khói giòn rụm, cà chua đỏ mọng mọng nước và sốt mayo."}, "en": {"name": "Classic BLT on Toasted Brioche", "desc": "Delightful and authentic Classic BLT on Toasted Brioche prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh mì sandwich thịt xông khói cà chua xà lách BLT", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh mì sandwich thịt xông khói cà chua xà lách BLT", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh mì sandwich thịt xông khói cà chua xà lách BLT", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_l_12: {"vi": {"name": "Súp hành tây nướng phô mai kiểu Pháp", "desc": "Thố súp hầm từ hành tây caramen hóa ngọt lịm với nước dùng bò, phủ lát bánh mì nướng và ngập tràn phô mai Gruyère vàng ruộm kéo sợi."}, "en": {"name": "French Onion Soup Gratinée", "desc": "Rich beef broth loaded with caramelized onions, topped with toasted French baguette and melted bubbly Gruyère cheese."}, "ja": {"name": "オニオングラタンスープ", "desc": "じっくり炒めた甘い玉ねぎと芳醇なコンソメスープに、とろ〜り香ばしいグリュイエールチーズ。"}, "ko": {"name": "프렌치 어니언 스프", "desc": "카라멜라이징한 양파의 깊은 단맛과 바게트 위로 노릇하게 녹아내린 그뤼에르 치즈."}, "zh": {"name": "法式焗烤洋葱汤", "desc": "慢炒焦糖洋葱与浓醇牛清汤炖煮，覆以法棍与厚厚一层焦香拉丝格鲁耶尔芝士。"}},
  en_a_1: {"vi": {"name": "Nui đút lò sốt phô mai cheddar & thịt xông khói", "desc": "Đĩa nui xoắn ngập trong sốt 3 loại phô mai cheddar tan chảy béo ngậy, rắc đầy thịt xông khói giòn tan."}, "en": {"name": "Loaded Bacon Mac & Cheese", "desc": "Delightful and authentic Loaded Bacon Mac & Cheese prepared with fresh high quality ingredients."}, "ja": {"name": "Nui đút lò sốt phô mai cheddar & thịt xông khói", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nui đút lò sốt phô mai cheddar & thịt xông khói", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nui đút lò sốt phô mai cheddar & thịt xông khói", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_2: {"vi": {"name": "Cánh gà chiên giòn lắc sốt cay Buffalo bơ tỏi", "desc": "Cánh gà chiên giòn rụm lắc đẫm sốt ớt cay chua Buffalo truyền thống, chấm cùng sốt phô mai xanh Blue Cheese."}, "en": {"name": "Buffalo Chicken Wings", "desc": "Delightful and authentic Buffalo Chicken Wings prepared with fresh high quality ingredients."}, "ja": {"name": "Cánh gà chiên giòn lắc sốt cay Buffalo bơ tỏi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cánh gà chiên giòn lắc sốt cay Buffalo bơ tỏi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cánh gà chiên giòn lắc sốt cay Buffalo bơ tỏi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_3: {"vi": {"name": "Bánh quẩy Tây Ban Nha Churros ngào đường quế", "desc": "Thanh bánh churros chiên giòn rụm rắc áo lớp đường bột quế thơm lừng, chấm đẫm cốc sốt chocolate đen."}, "en": {"name": "Warm Cinnamon Sugar Churros", "desc": "Delightful and authentic Warm Cinnamon Sugar Churros prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh quẩy Tây Ban Nha Churros ngào đường quế", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh quẩy Tây Ban Nha Churros ngào đường quế", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh quẩy Tây Ban Nha Churros ngào đường quế", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_4: {"vi": {"name": "Bánh rán phồng Beignets New Orleans phủ tuyết", "desc": "3 chiếc bánh rán phồng xốp mềm vừa vớt ra khỏi chảo dầu nóng, rắc ngập tràn lớp đường bột trắng như tuyết."}, "en": {"name": "New Orleans Powdered Beignets", "desc": "Delightful and authentic New Orleans Powdered Beignets prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh rán phồng Beignets New Orleans phủ tuyết", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh rán phồng Beignets New Orleans phủ tuyết", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh rán phồng Beignets New Orleans phủ tuyết", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_5: {"vi": {"name": "Bánh bao xếp nướng vỏ bơ nhân thịt bò khoai tây", "desc": "Chiếc bánh xếp vỏ bột giòn rụm nhân thịt thăn bò thái hạt lựu, khoai tây và củ cải nướng vàng ươm kiểu Anh."}, "en": {"name": "Traditional Cornish Pasties", "desc": "Delightful and authentic Traditional Cornish Pasties prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh bao xếp nướng vỏ bơ nhân thịt bò khoai tây", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh bao xếp nướng vỏ bơ nhân thịt bò khoai tây", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh bao xếp nướng vỏ bơ nhân thịt bò khoai tây", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_6: {"vi": {"name": "Trứng bọc thịt băm chiên xù kiểu Scotland", "desc": "Quả trứng lòng đào bọc trong lớp thịt heo xay thảo mộc, lăn bột bánh mì chiên vàng giòn rụm."}, "en": {"name": "Scotch Egg with Whole Grain Mustard", "desc": "Delightful and authentic Scotch Egg with Whole Grain Mustard prepared with fresh high quality ingredients."}, "ja": {"name": "Trứng bọc thịt băm chiên xù kiểu Scotland", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trứng bọc thịt băm chiên xù kiểu Scotland", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trứng bọc thịt băm chiên xù kiểu Scotland", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_7: {"vi": {"name": "Hành tây khoanh nhúng bột bia chiên xù giòn tan", "desc": "Những khoanh hành tây ngọt lịm nhúng bột bia chiên xù giòn rụm chấm sốt BBQ khói cay nồng."}, "en": {"name": "Crispy Beer-Battered Onion Rings", "desc": "Delightful and authentic Crispy Beer-Battered Onion Rings prepared with fresh high quality ingredients."}, "ja": {"name": "Hành tây khoanh nhúng bột bia chiên xù giòn tan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Hành tây khoanh nhúng bột bia chiên xù giòn tan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Hành tây khoanh nhúng bột bia chiên xù giòn tan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_8: {"vi": {"name": "Khoai tây chiên phủ sốt bò hầm đậu Chili phô mai", "desc": "Đĩa khoai tây chiên giòn rưới ngập sốt thịt bò băm hầm đậu đỏ cay nồng và phô mai cheddar tan chảy."}, "en": {"name": "Loaded Chili Cheese Fries", "desc": "Delightful and authentic Loaded Chili Cheese Fries prepared with fresh high quality ingredients."}, "ja": {"name": "Khoai tây chiên phủ sốt bò hầm đậu Chili phô mai", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Khoai tây chiên phủ sốt bò hầm đậu Chili phô mai", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Khoai tây chiên phủ sốt bò hầm đậu Chili phô mai", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_9: {"vi": {"name": "Bánh nướng xoắn Pretzel chấm sốt phô mai bia", "desc": "Từng viên bánh mì xoắn muối biển nướng vàng nâu dẻo dai chấm vào chén sốt phô mai cheddar nấu bia ale."}, "en": {"name": "Soft Pretzel Bites with Beer Cheese", "desc": "Delightful and authentic Soft Pretzel Bites with Beer Cheese prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh nướng xoắn Pretzel chấm sốt phô mai bia", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh nướng xoắn Pretzel chấm sốt phô mai bia", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh nướng xoắn Pretzel chấm sốt phô mai bia", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_a_10: {"vi": {"name": "Dưa chuột muối chiên giòn rụm sốt Ranch", "desc": "Những lát dưa leo muối chua giòn tẩm bột ngô chiên vàng rụm chấm đẫm sốt thảo mộc ranch béo ngậy."}, "en": {"name": "Southern Fried Pickles", "desc": "Delightful and authentic Southern Fried Pickles prepared with fresh high quality ingredients."}, "ja": {"name": "Dưa chuột muối chiên giòn rụm sốt Ranch", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Dưa chuột muối chiên giòn rụm sốt Ranch", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Dưa chuột muối chiên giòn rụm sốt Ranch", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_1: {"vi": {"name": "Bít tết thăn lưng bò Mỹ nướng bơ tỏi sốt tiêu đen", "desc": "Miếng bít tết thăn lưng bò Mỹ Prime vân mỡ cẩm thạch nướng xém cạnh vừa chín tới, sốt bơ tỏi hương thảo."}, "en": {"name": "USDA Prime Ribeye Steak", "desc": "Delightful and authentic USDA Prime Ribeye Steak prepared with fresh high quality ingredients."}, "ja": {"name": "Bít tết thăn lưng bò Mỹ nướng bơ tỏi sốt tiêu đen", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bít tết thăn lưng bò Mỹ nướng bơ tỏi sốt tiêu đen", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bít tết thăn lưng bò Mỹ nướng bơ tỏi sốt tiêu đen", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_2: {"vi": {"name": "Gầu bò Mỹ xông khói gỗ sồi 16 tiếng mềm tan", "desc": "Tảng gầu bò ướp muối tiêu đen xông khói gỗ sồi 16 tiếng tạo viền khói đỏ au hồng ngọc, mềm tan rã mỡ."}, "en": {"name": "Texas Smoked Beef Brisket", "desc": "Delightful and authentic Texas Smoked Beef Brisket prepared with fresh high quality ingredients."}, "ja": {"name": "Gầu bò Mỹ xông khói gỗ sồi 16 tiếng mềm tan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Gầu bò Mỹ xông khói gỗ sồi 16 tiếng mềm tan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Gầu bò Mỹ xông khói gỗ sồi 16 tiếng mềm tan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_3: {"vi": {"name": "Sườn heo nướng xông khói sốt BBQ mềm róc xương", "desc": "Dải sườn heo ướp gia vị xông khói quét sốt BBQ bóng bẩy thơm ngọt đậm đà, thịt mềm tan róc khỏi xương."}, "en": {"name": "Smoked BBQ Pork Ribs", "desc": "Delightful and authentic Smoked BBQ Pork Ribs prepared with fresh high quality ingredients."}, "ja": {"name": "Sườn heo nướng xông khói sốt BBQ mềm róc xương", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sườn heo nướng xông khói sốt BBQ mềm róc xương", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sườn heo nướng xông khói sốt BBQ mềm róc xương", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_4: {"vi": {"name": "Bữa tiệc thịt bò nướng lò bánh phồng Yorkshire Pudding", "desc": "Thịt bò thăn nướng tái hồng hào, ăn kèm bánh phồng Yorkshire pudding nở xốp, khoai tây nướng bơ và nước sốt gravy."}, "en": {"name": "Traditional British Sunday Roast", "desc": "Delightful and authentic Traditional British Sunday Roast prepared with fresh high quality ingredients."}, "ja": {"name": "Bữa tiệc thịt bò nướng lò bánh phồng Yorkshire Pudding", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bữa tiệc thịt bò nướng lò bánh phồng Yorkshire Pudding", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bữa tiệc thịt bò nướng lò bánh phồng Yorkshire Pudding", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_5: {"vi": {"name": "Bánh Shepherd's Pie thịt cừu đút lò phủ khoai tây", "desc": "Thịt cừu băm xào đậu hà lan cà rốt hầm nước cốt bò đậm đà, phủ lớp khoai tây nghiền nướng vàng óng."}, "en": {"name": "Traditional British Shepherd's Pie", "desc": "Delightful and authentic Traditional British Shepherd's Pie prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh Shepherd's Pie thịt cừu đút lò phủ khoai tây", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh Shepherd's Pie thịt cừu đút lò phủ khoai tây", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh Shepherd's Pie thịt cừu đút lò phủ khoai tây", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_6: {"vi": {"name": "Cơm hải sản cay nồng kiểu Louisiana Jambalaya", "desc": "Chảo cơm nấu nước dùng cay đậm đà gia vị Creole cùng tôm sú, xúc xích hun khói Andouille và ức gà."}, "en": {"name": "Louisiana Seafood Jambalaya", "desc": "Delightful and authentic Louisiana Seafood Jambalaya prepared with fresh high quality ingredients."}, "ja": {"name": "Cơm hải sản cay nồng kiểu Louisiana Jambalaya", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cơm hải sản cay nồng kiểu Louisiana Jambalaya", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cơm hải sản cay nồng kiểu Louisiana Jambalaya", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_7: {"vi": {"name": "Mì Ý sốt kem nấm cục Truffle & phô mai Parmesan", "desc": "Sợi mì dẹt Fettuccine nấu sốt kem bơ béo ngậy, bào ngập phô mai Parmigiano Reggiano và tinh dầu nấm truffle."}, "en": {"name": "Creamy Truffle Fettuccine Alfredo", "desc": "Delightful and authentic Creamy Truffle Fettuccine Alfredo prepared with fresh high quality ingredients."}, "ja": {"name": "Mì Ý sốt kem nấm cục Truffle & phô mai Parmesan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Mì Ý sốt kem nấm cục Truffle & phô mai Parmesan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Mì Ý sốt kem nấm cục Truffle & phô mai Parmesan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_8: {"vi": {"name": "Hải sản thập cẩm hầm rượu vang đỏ San Francisco", "desc": "Thố súp hải sản thịnh soạn: cua biển, tôm sú, vẹm xanh, mực tươi hầm sốt cà chua rượu vang thơm lừng."}, "en": {"name": "San Francisco Cioppino Stew", "desc": "Delightful and authentic San Francisco Cioppino Stew prepared with fresh high quality ingredients."}, "ja": {"name": "Hải sản thập cẩm hầm rượu vang đỏ San Francisco", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Hải sản thập cẩm hầm rượu vang đỏ San Francisco", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Hải sản thập cẩm hầm rượu vang đỏ San Francisco", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_9: {"vi": {"name": "Bánh pie bò hầm bia đen Guinness nướng lò", "desc": "Nồi bánh pie vỏ ngàn lớp vàng ruộm nhân thịt bò nạm hầm bia đen Guinness sánh đặc mềm rục."}, "en": {"name": "Classic Steak and Ale Pie", "desc": "Delightful and authentic Classic Steak and Ale Pie prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh pie bò hầm bia đen Guinness nướng lò", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh pie bò hầm bia đen Guinness nướng lò", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh pie bò hầm bia đen Guinness nướng lò", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_d_10: {"vi": {"name": "Cá hồi Đại Tây Dương áp chảo sốt bơ chanh thì là", "desc": "Miếng phi lê cá hồi da giòn rụm thịt mềm béo mọng nước, đặt trên lớp măng tây xào bơ tỏi thơm ngát."}, "en": {"name": "Pan-Seared Atlantic Salmon", "desc": "Delightful and authentic Pan-Seared Atlantic Salmon prepared with fresh high quality ingredients."}, "ja": {"name": "Cá hồi Đại Tây Dương áp chảo sốt bơ chanh thì là", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cá hồi Đại Tây Dương áp chảo sốt bơ chanh thì là", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cá hồi Đại Tây Dương áp chảo sốt bơ chanh thì là", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_1: {"vi": {"name": "Bánh phô mai nướng New York sốt dâu rừng", "desc": "Lát bánh cheesecake nướng béo ngậy đậm đà kem phô mai cream cheese nguyên chất, rưới sốt dâu tây chua dịu."}, "en": {"name": "Classic New York Cheesecake", "desc": "Delightful and authentic Classic New York Cheesecake prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh phô mai nướng New York sốt dâu rừng", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh phô mai nướng New York sốt dâu rừng", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh phô mai nướng New York sốt dâu rừng", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_2: {"vi": {"name": "Bánh kem chocolate nóng chảy Lava kèm kem vani", "desc": "Chiếc bánh xốp mềm khi xắn thì dòng nham thạch chocolate Bỉ ấm nóng tan chảy tràn ra, ăn cùng kem vani lạnh."}, "en": {"name": "Warm Chocolate Lava Cake", "desc": "Delightful and authentic Warm Chocolate Lava Cake prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh kem chocolate nóng chảy Lava kèm kem vani", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh kem chocolate nóng chảy Lava kèm kem vani", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh kem chocolate nóng chảy Lava kèm kem vani", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_3: {"vi": {"name": "Bánh táo nướng bơ quế vỏ ngàn lớp giòn rụm", "desc": "Bánh nướng vỏ bơ ngàn lớp giòn rụm bọc nhân táo tươi nấu đường nâu thơm lừng hương quế và đinh hương."}, "en": {"name": "Warm Cinnamon Apple Pie", "desc": "Delightful and authentic Warm Cinnamon Apple Pie prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh táo nướng bơ quế vỏ ngàn lớp giòn rụm", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh táo nướng bơ quế vỏ ngàn lớp giòn rụm", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh táo nướng bơ quế vỏ ngàn lớp giòn rụm", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_4: {"vi": {"name": "Bánh chà là ngâm sốt kẹo bơ ấm nóng Sticky Toffee", "desc": "Miếng bánh bông lan chà là mềm xốp đẫm trong dòng sốt kẹo bơ toffee nóng sôi sùng sục và kem trứng custard."}, "en": {"name": "British Sticky Toffee Pudding", "desc": "Delightful and authentic British Sticky Toffee Pudding prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh chà là ngâm sốt kẹo bơ ấm nóng Sticky Toffee", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh chà là ngâm sốt kẹo bơ ấm nóng Sticky Toffee", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh chà là ngâm sốt kẹo bơ ấm nóng Sticky Toffee", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_5: {"vi": {"name": "Kem dâu tây tươi vụn bánh đường nướng Eton Mess", "desc": "Ly tráng miệng quý tộc Anh: dâu tây chín mọng trộn vụn bánh đường meringue giòn tan và kem tươi đánh bông."}, "en": {"name": "Traditional Eton Mess", "desc": "Delightful and authentic Traditional Eton Mess prepared with fresh high quality ingredients."}, "ja": {"name": "Kem dâu tây tươi vụn bánh đường nướng Eton Mess", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Kem dâu tây tươi vụn bánh đường nướng Eton Mess", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Kem dâu tây tươi vụn bánh đường nướng Eton Mess", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_6: {"vi": {"name": "Bánh cuộn đường quế phủ kem phô mai chảy Cinnabon", "desc": "Ổ bánh cuộn đường quế thơm nồng ấm nóng vừa ra lò, phủ lớp kem phô mai trắng mịn tan chảy ngọt ngào."}, "en": {"name": "Warm Frosted Cinnamon Roll", "desc": "Delightful and authentic Warm Frosted Cinnamon Roll prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh cuộn đường quế phủ kem phô mai chảy Cinnabon", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh cuộn đường quế phủ kem phô mai chảy Cinnabon", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh cuộn đường quế phủ kem phô mai chảy Cinnabon", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_s_7: {"vi": {"name": "Bánh nướng Scone ăn kèm kem sữa vón & mứt dâu", "desc": "Cặp bánh nướng xốp thơm mùi bơ sữa kiểu Anh phết đẫm kem sữa đặc clotted cream béo ngậy và mứt dâu tây."}, "en": {"name": "British Scones with Clotted Cream", "desc": "Delightful and authentic British Scones with Clotted Cream prepared with fresh high quality ingredients."}, "ja": {"name": "Bánh nướng Scone ăn kèm kem sữa vón & mứt dâu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bánh nướng Scone ăn kèm kem sữa vón & mứt dâu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bánh nướng Scone ăn kèm kem sữa vón & mứt dâu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_1: {"vi": {"name": "Cà phê latte sữa yến mạch vani đá mát lạnh", "desc": "Cà phê espresso chiết xuất đậm đà hòa cùng sữa yến mạch barista béo ngậy dịu lành và siro vani."}, "en": {"name": "Iced Vanilla Oat Milk Latte", "desc": "Delightful and authentic Iced Vanilla Oat Milk Latte prepared with fresh high quality ingredients."}, "ja": {"name": "Cà phê latte sữa yến mạch vani đá mát lạnh", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cà phê latte sữa yến mạch vani đá mát lạnh", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cà phê latte sữa yến mạch vani đá mát lạnh", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_2: {"vi": {"name": "Cà phê ủ lạnh Cold Brew 18 tiếng êm dịu", "desc": "Cà phê hạt Arabica ủ lạnh 18 tiếng chắt lọc vị chua thanh tao, ngọt hậu dịu êm và hàm lượng caffeine cao."}, "en": {"name": "Classic Cold Brew Coffee", "desc": "Delightful and authentic Classic Cold Brew Coffee prepared with fresh high quality ingredients."}, "ja": {"name": "Cà phê ủ lạnh Cold Brew 18 tiếng êm dịu", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cà phê ủ lạnh Cold Brew 18 tiếng êm dịu", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cà phê ủ lạnh Cold Brew 18 tiếng êm dịu", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_3: {"vi": {"name": "Nước chanh tươi lắc dâu tây đỏ mọng sảng khoái", "desc": "Nước cốt chanh vàng tươi vắt lắc cùng dâu tây tươi nghiền và đá viên giải nhiệt ngày hè sảng khoái."}, "en": {"name": "Fresh Strawberry Lemonade", "desc": "Delightful and authentic Fresh Strawberry Lemonade prepared with fresh high quality ingredients."}, "ja": {"name": "Nước chanh tươi lắc dâu tây đỏ mọng sảng khoái", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước chanh tươi lắc dâu tây đỏ mọng sảng khoái", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước chanh tươi lắc dâu tây đỏ mọng sảng khoái", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_4: {"vi": {"name": "Nước ngọt xá xị sủi bọt kem vani Root Beer Float", "desc": "Ly nước ngọt xá xị thảo mộc sủi bọt mát lạnh thả nguyên một viên kem vani tròn béo ngậy tan bồng bềnh."}, "en": {"name": "Old-Fashioned Root Beer Float", "desc": "Delightful and authentic Old-Fashioned Root Beer Float prepared with fresh high quality ingredients."}, "ja": {"name": "Nước ngọt xá xị sủi bọt kem vani Root Beer Float", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Nước ngọt xá xị sủi bọt kem vani Root Beer Float", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Nước ngọt xá xị sủi bọt kem vani Root Beer Float", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_5: {"vi": {"name": "Sữa lắc kem caramel muối biển phủ kem tươi", "desc": "Ly sữa lắc xay từ kem vani béo ngậy, siro caramel muối mặn ngọt, xịt ngọn kem whipping cream cao vút."}, "en": {"name": "Classic Salted Caramel Milkshake", "desc": "Delightful and authentic Classic Salted Caramel Milkshake prepared with fresh high quality ingredients."}, "ja": {"name": "Sữa lắc kem caramel muối biển phủ kem tươi", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Sữa lắc kem caramel muối biển phủ kem tươi", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Sữa lắc kem caramel muối biển phủ kem tươi", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_6: {"vi": {"name": "Trà sữa bá tước Earl Grey hương cam bergamot London Fog", "desc": "Cốt trà đen Earl Grey ngát hương hoa cam bergamot hòa sữa tươi đánh bọt mịn màng và vani ấm áp."}, "en": {"name": "London Fog Earl Grey Tea Latte", "desc": "Delightful and authentic London Fog Earl Grey Tea Latte prepared with fresh high quality ingredients."}, "ja": {"name": "Trà sữa bá tước Earl Grey hương cam bergamot London Fog", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Trà sữa bá tước Earl Grey hương cam bergamot London Fog", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Trà sữa bá tước Earl Grey hương cam bergamot London Fog", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_7: {"vi": {"name": "Bia thủ công Craft IPA thơm nồng nàn hoa bia", "desc": "Ly bia thủ công rót tại vòi thơm nồng nàn hương hoa bia cam quýt nhiệt đới, hậu vị đắng dịu thanh khiết."}, "en": {"name": "American Craft IPA Draft Beer", "desc": "Delightful and authentic American Craft IPA Draft Beer prepared with fresh high quality ingredients."}, "ja": {"name": "Bia thủ công Craft IPA thơm nồng nàn hoa bia", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Bia thủ công Craft IPA thơm nồng nàn hoa bia", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Bia thủ công Craft IPA thơm nồng nàn hoa bia", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
  en_dr_8: {"vi": {"name": "Cocktail mạn việt quất chua ngọt Cosmopolitan", "desc": "Ly cocktail thanh lịch lắc từ rượu vodka, nước ép nam việt quất đỏ thẫm, rượu cam Cointreau và chanh tươi."}, "en": {"name": "Classic New York Cosmopolitan", "desc": "Delightful and authentic Classic New York Cosmopolitan prepared with fresh high quality ingredients."}, "ja": {"name": "Cocktail mạn việt quất chua ngọt Cosmopolitan", "desc": "本場の伝統的な製法と新鮮な素材で仕上げた極上の逸品。"}, "ko": {"name": "Cocktail mạn việt quất chua ngọt Cosmopolitan", "desc": "신선한 재료와 정통 조리법으로 완성한 맛있는 대표 메뉴."}, "zh": {"name": "Cocktail mạn việt quất chua ngọt Cosmopolitan", "desc": "正宗地道风味，选用上等食材精心烹饪而成。"}},
};

function getDishName(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (currentLang === 'vi') {
    const t = DISH_TRANSLATIONS[dish.id]?.vi;
    return (t && t.name) ? t.name : dish.name;
  }
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  const name = (t && t.name) ? t.name : dish.name;
  return name.trim();
}

function getDishDesc(dish, lang) {
  if (!dish) return '';
  const currentLang = lang || (typeof settings !== 'undefined' && settings.language) || (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || 'vi';
  if (dish.id?.startsWith('custom_wheel_') && typeof UICopy !== 'undefined') return UICopy.text('customDesc', currentLang);
  if (currentLang === 'vi') {
    const t = DISH_TRANSLATIONS[dish.id]?.vi;
    return (t && t.desc) ? t.desc : dish.desc;
  }
  const t = DISH_TRANSLATIONS[dish.id]?.[currentLang];
  return (t && t.desc) ? t.desc : dish.desc;
}

function getDishQuote(dish, lang) {
  if (!dish) return '';
  const language = lang || (typeof document !== 'undefined' && document.documentElement.lang) || 'vi';
  if (language === 'vi' || dish.isUserCustom) return dish.quote || '';
  // Never append a Vietnamese flavor quote to a translated description. The
  // localized description already conveys the flavor when no separate quote exists.
  return DISH_TRANSLATIONS[dish.id]?.[language]?.quote || getDishDesc(dish, language);
}

const CURRENCY_CONFIG = {
  vi: {
    code: 'VND',
    symbol: 'đ',
    position: 'suffix',
    locale: 'vi-VN',
    presets: [30000, 50000, 100000, 200000],
    placeholder: '100000',
    step: 5000,
  },
  ja: {
    code: 'JPY',
    symbol: '¥',
    position: 'prefix',
    locale: 'ja-JP',
    presets: [500, 1000, 2000, 3500],
    placeholder: '1500',
    step: 100,
  },
  ko: {
    code: 'KRW',
    symbol: '₩',
    position: 'prefix',
    locale: 'ko-KR',
    presets: [5000, 10000, 20000, 35000],
    placeholder: '12000',
    step: 1000,
  },
  zh: {
    code: 'CNY',
    symbol: '¥',
    position: 'prefix',
    locale: 'zh-CN',
    presets: [20, 40, 80, 150],
    placeholder: '50',
    step: 5,
  },
  en: {
    code: 'USD',
    symbol: '$',
    position: 'prefix',
    locale: 'en-US',
    presets: [10, 20, 35, 60],
    placeholder: '25',
    step: 1,
  },
};

function getCurrencyConfig(lang) {
  return CURRENCY_CONFIG[lang] || CURRENCY_CONFIG.vi;
}

function formatRegionalMoney(amount, lang = 'vi') {
  if (typeof amount === 'string' && (amount.includes('đ') || amount.includes('¥') || amount.includes('$') || amount.includes('₩') || amount.includes('-'))) {
    return amount;
  }
  const cfg = getCurrencyConfig(lang);
  const num = Number(amount) || 0;
  if (cfg.code === 'VND') {
    return Math.round(num).toLocaleString(cfg.locale) + cfg.symbol;
  }
  if (cfg.code === 'JPY' || cfg.code === 'KRW') {
    return cfg.symbol + Math.round(num).toLocaleString(cfg.locale);
  }
  if (cfg.code === 'CNY' || cfg.code === 'USD') {
    return cfg.symbol + num.toLocaleString(cfg.locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  return cfg.symbol + num.toLocaleString();
}

const REGIONAL_DATABASES = {
  vi: FOOD_DATABASE,
  ja: {
          "morning": {
              "id": "morning",
              "name": "朝食",
              "title": "今朝は何を食べる？",
              "bannerName": "伝統と人気の朝食",
              "subtitle": "焼きたてトーストや温かいお茶漬けで素晴らしい一日の始まりを",
              "featured5Star": "卵かけご飯 (TKG)",
              "bannerImage": "images/buoi_sang/pho_bo.webp",
              "theme": "morning",
              "dishes": [
                  {
                      "id": "ja_m_1",
                      "name": "卵かけご飯 (TKG)",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_m_1.webp",
                      "desc": "Cơm nóng xới dẻo đập trứng gà tươi thanh trùng, rưới nước tương dashi và rắc rong biển katsuobushi.",
                      "calories": 350,
                      "tags": [
                          "卵かけご飯 (TKG)",
                          "morning",
                          "ja"
                      ],
                      "price": 400,
                      "priceRange": [
                          340,
                          460
                      ],
                      "priceMin": 340,
                      "priceMax": 460
                  },
                  {
                      "id": "ja_m_2",
                      "name": "鮭の塩焼き朝定食",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_m_2.webp",
                      "desc": "Cá hồi nướng than da giòn thịt ngọt, súp miso đậu hũ nóng, dưa muối tsukemono và rong biển nori.",
                      "calories": 387,
                      "tags": [
                          "鮭の塩焼き朝定食",
                          "morning",
                          "ja"
                      ],
                      "price": 750,
                      "priceRange": [
                          638,
                          862
                      ],
                      "priceMin": 638,
                      "priceMax": 862
                  },
                  {
                      "id": "ja_m_3",
                      "name": "鯛茶漬け",
                      "rarity": 3,
                      "type": "伝統和食",
                      "image": "images/regional/ja/ja_m_3.webp",
                      "desc": "Lát cá tráp đỏ biển tươi ướp sốt mè đậm đà đặt lên cơm nóng rồi chan ngập nước trà xanh dashi sôi nghi ngút khói.",
                      "calories": 424,
                      "tags": [
                          "鯛茶漬け",
                          "朝食",
                          "和食",
                          "出汁"
                      ],
                      "price": 850,
                      "priceRange": [
                          720,
                          980
                      ],
                      "priceMin": 720,
                      "priceMax": 980
                  },
                  {
                      "id": "ja_m_4",
                      "name": "たまごサンド",
                      "rarity": 3,
                      "type": "Sandwich",
                      "image": "images/regional/ja/ja_m_4.webp",
                      "desc": "Bánh mì gối kẹp ngập nhân trứng dashi nghiền sốt mayo béo ngậy mềm mịn trứ danh combini.",
                      "calories": 461,
                      "tags": [
                          "たまごサンド",
                          "morning",
                          "ja"
                      ],
                      "price": 450,
                      "priceRange": [
                          382,
                          518
                      ],
                      "priceMin": 382,
                      "priceMax": 518
                  },
                  {
                      "id": "ja_m_5",
                      "name": "小倉トースト",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_m_5.webp",
                      "desc": "Đặc sản cà phê kissaten Nagoya: lát bánh mì dày nướng bơ thơm nức phết mứt đậu đỏ Azuki ngọt dịu.",
                      "calories": 498,
                      "tags": [
                          "小倉トースト",
                          "morning",
                          "ja"
                      ],
                      "price": 550,
                      "priceRange": [
                          468,
                          632
                      ],
                      "priceMin": 468,
                      "priceMax": 632
                  },
                  {
                      "id": "ja_m_6",
                      "name": "梅干しがゆ",
                      "rarity": 3,
                      "type": "Cháo",
                      "image": "images/regional/ja/ja_m_6.webp",
                      "desc": "Bát cháo gạo mới ninh nhừ điểm quả mơ muối tía tô đỏ au, ấm bụng và thanh lọc cơ thể.",
                      "calories": 535,
                      "tags": [
                          "梅干しがゆ",
                          "morning",
                          "ja"
                      ],
                      "price": 450,
                      "priceRange": [
                          382,
                          518
                      ],
                      "priceMin": 382,
                      "priceMax": 518
                  },
                  {
                      "id": "ja_m_7",
                      "name": "納豆朝定食",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_m_7.webp",
                      "desc": "Bát đậu nành lên men khuấy đều sủi tơ cùng mù tạt vàng karashi, hành hoa và lòng đỏ trứng gà.",
                      "calories": 572,
                      "tags": [
                          "納豆朝定食",
                          "morning",
                          "ja"
                      ],
                      "price": 480,
                      "priceRange": [
                          408,
                          552
                      ],
                      "priceMin": 408,
                      "priceMax": 552
                  },
                  {
                      "id": "ja_m_8",
                      "name": "鯖の味噌煮定食",
                      "rarity": 3,
                      "type": "Cá",
                      "image": "images/regional/ja/ja_m_8.webp",
                      "desc": "Cá nục tươi kho nhừ thấm đẫm sốt miso nâu đỏ ngọt bùi, ăn cùng cơm dẻo và củ cải muối.",
                      "calories": 609,
                      "tags": [
                          "鯖の味噌煮定食",
                          "morning",
                          "ja"
                      ],
                      "price": 780,
                      "priceRange": [
                          663,
                          897
                      ],
                      "priceMin": 663,
                      "priceMax": 897
                  },
                  {
                      "id": "ja_m_9",
                      "name": "あさり味噌汁と塩むすび",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_m_9.webp",
                      "desc": "Hai nắm cơm rắc muối biển bọc rong biển giòn rụm kèm tô súp miso nghêu ngọt lịm đậm vị biển.",
                      "calories": 646,
                      "tags": [
                          "あさり味噌汁と塩むすび",
                          "morning",
                          "ja"
                      ],
                      "price": 500,
                      "priceRange": [
                          425,
                          575
                      ],
                      "priceMin": 425,
                      "priceMax": 575
                  }
              ]
          },
          "lunch": {
              "id": "lunch",
              "name": "昼食",
              "title": "今日のお昼は何にする？",
              "bannerName": "大満足のランチ名物",
              "subtitle": "寿司、ラーメン、カツ丼など活力をチャージする絶品料理",
              "featured5Star": "特上握り寿司盛り合わせ",
              "bannerImage": "images/buoi_trua/com_tam.webp",
              "theme": "lunch",
              "dishes": [
                  {
                      "id": "ja_l_1",
                      "name": "特上握り寿司盛り合わせ",
                      "rarity": 5,
                      "type": "Sushi",
                      "image": "images/regional/ja/ja_l_1.webp",
                      "desc": "8 miếng sushi cá hồi Nauy, cá ngừ Akami, tôm ngọt Amaebi, lươn nướng Unagi, sò đỏ trên cơm giấm.",
                      "calories": 350,
                      "tags": [
                          "特上握り寿司盛り合わせ",
                          "lunch",
                          "ja"
                      ],
                      "price": 1800,
                      "priceRange": [
                          1530,
                          2070
                      ],
                      "priceMin": 1530,
                      "priceMax": 2070
                  },
                  {
                      "id": "ja_l_2",
                      "name": "海鮮ちらし寿司",
                      "rarity": 5,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_2.webp",
                      "desc": "Tô cơm giấm phủ ngập cá hồi, cá ngừ, sò điệp Hokkaido, trứng cá chuồn giòn tanh tách.",
                      "calories": 387,
                      "tags": [
                          "海鮮ちらし寿司",
                          "lunch",
                          "ja"
                      ],
                      "price": 1500,
                      "priceRange": [
                          1275,
                          1725
                      ],
                      "priceMin": 1275,
                      "priceMax": 1725
                  },
                  {
                      "id": "ja_l_3",
                      "name": "博多豚骨ラーメン",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_l_3.webp",
                      "desc": "Sợi mì tươi súp xương heo hầm cô đặc 14 tiếng trắng ngà béo ngậy, thịt xá xíu chashu mềm tan.",
                      "calories": 424,
                      "tags": [
                          "博多豚骨ラーメン",
                          "lunch",
                          "ja"
                      ],
                      "price": 900,
                      "priceRange": [
                          765,
                          1035
                      ],
                      "priceMin": 765,
                      "priceMax": 1035
                  },
                  {
                      "id": "ja_l_4",
                      "name": "札幌味噌バターコーンラーメン",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_l_4.webp",
                      "desc": "Đặc sản Hokkaido: nước súp miso đậm đà thả viên bơ vàng óng tan chảy và bắp ngọt giòn sần sật.",
                      "calories": 461,
                      "tags": [
                          "札幌味噌バターコーンラーメン",
                          "lunch",
                          "ja"
                      ],
                      "price": 950,
                      "priceRange": [
                          808,
                          1092
                      ],
                      "priceMin": 808,
                      "priceMax": 1092
                  },
                  {
                      "id": "ja_l_5",
                      "name": "特製かつ丼",
                      "rarity": 4,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_5.webp",
                      "desc": "Miếng thịt heo cốt lết chiên xù giòn tan om sốt hành tây ngọt và trứng gà bông mềm trên bát cơm trắng.",
                      "calories": 498,
                      "tags": [
                          "特製かつ丼",
                          "lunch",
                          "ja"
                      ],
                      "price": 880,
                      "priceRange": [
                          748,
                          1012
                      ],
                      "priceMin": 748,
                      "priceMax": 1012
                  },
                  {
                      "id": "ja_l_6",
                      "name": "牛丼 (温玉のせ)",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_6.webp",
                      "desc": "Thịt bò thái lát mỏng hầm nước tương mirin và hành tây ngọt mềm, phủ quả trứng onsen tamago béo ngậy.",
                      "calories": 535,
                      "tags": [
                          "牛丼 (温玉のせ)",
                          "lunch",
                          "ja"
                      ],
                      "price": 780,
                      "priceRange": [
                          663,
                          897
                      ],
                      "priceMin": 663,
                      "priceMax": 897
                  },
                  {
                      "id": "ja_l_7",
                      "name": "讃岐海老天うどん",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_l_7.webp",
                      "desc": "Sợi mì Udon dai giòn trứ danh Kagawa trong nước dùng dashi thanh ngọt cá bào, kèm 2 con tôm sú chiên giòn.",
                      "calories": 572,
                      "tags": [
                          "讃岐海老天うどん",
                          "lunch",
                          "ja"
                      ],
                      "price": 750,
                      "priceRange": [
                          638,
                          862
                      ],
                      "priceMin": 638,
                      "priceMax": 862
                  },
                  {
                      "id": "ja_l_8",
                      "name": "ざる蕎麦 天ぷら添え",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_l_8.webp",
                      "desc": "Mì soba kiều mạch ướp đá lạnh chấm sốt tsuyu đậm đà mù tạt wasabi, kèm đĩa tempura tôm rau củ.",
                      "calories": 609,
                      "tags": [
                          "ざる蕎麦 天ぷら添え",
                          "lunch",
                          "ja"
                      ],
                      "price": 850,
                      "priceRange": [
                          722,
                          977
                      ],
                      "priceMin": 722,
                      "priceMax": 977
                  },
                  {
                      "id": "ja_l_9",
                      "name": "ロースカツカレー",
                      "rarity": 4,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_9.webp",
                      "desc": "Sốt cà ri Nhật đậm đà phủ lên miếng thịt heo chiên xù giòn tan và cơm trắng nóng hổi.",
                      "calories": 646,
                      "tags": [
                          "ロースカツカレー",
                          "lunch",
                          "ja"
                      ],
                      "price": 980,
                      "priceRange": [
                          833,
                          1127
                      ],
                      "priceMin": 833,
                      "priceMax": 1127
                  },
                  {
                      "id": "ja_l_10",
                      "name": "名物ひつまぶし",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_10.webp",
                      "desc": "Lươn nướng than hoa óng ả sốt tare, ăn theo 3 cách: ăn nguyên vị, trộn gia vị, và chan dashi nóng.",
                      "calories": 683,
                      "tags": [
                          "名物ひつまぶし",
                          "lunch",
                          "ja"
                      ],
                      "price": 1800,
                      "priceRange": [
                          1530,
                          2070
                      ],
                      "priceMin": 1530,
                      "priceMax": 2070
                  },
                  {
                      "id": "ja_l_11",
                      "name": "親子丼",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ja/ja_l_11.webp",
                      "desc": "Thịt gà đùi mềm ngọt om cùng trứng gà lòng đào bồng bềnh và hành baro thơm phức.",
                      "calories": 370,
                      "tags": [
                          "親子丼",
                          "lunch",
                          "ja"
                      ],
                      "price": 720,
                      "priceRange": [
                          612,
                          828
                      ],
                      "priceMin": 612,
                      "priceMax": 828
                  },
                  {
                      "id": "ja_l_12",
                      "name": "冷やし中華",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_l_12.webp",
                      "desc": "Mì sợi ướp lạnh bày dưa leo, trứng thái chỉ, giăm bông, tôm luộc và rưới sốt giấm mè thanh mát.",
                      "calories": 407,
                      "tags": [
                          "冷やし中華",
                          "lunch",
                          "ja"
                      ],
                      "price": 800,
                      "priceRange": [
                          680,
                          920
                      ],
                      "priceMin": 680,
                      "priceMax": 920
                  }
              ]
          },
          "afternoon": {
              "id": "afternoon",
              "name": "軽食・おやつ",
              "title": "午後のひと息に何食べる？",
              "bannerName": "定番のストリートフード",
              "subtitle": "たこ焼き、お好み焼き、たい焼きなど心躍る屋台の味",
              "featured5Star": "大阪名物たこ焼き",
              "bannerImage": "images/buoi_chieu/banh_xeo.webp",
              "theme": "afternoon",
              "dishes": [
                  {
                      "id": "ja_a_1",
                      "name": "大阪名物たこ焼き",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_1.webp",
                      "desc": "Viên bánh tròn nóng hổi nhân bạch tuộc giòn sần sật, rưới sốt ngọt, sốt mayo và cá bào nhảy múa.",
                      "calories": 350,
                      "tags": [
                          "大阪名物たこ焼き",
                          "afternoon",
                          "ja"
                      ],
                      "price": 600,
                      "priceRange": [
                          510,
                          690
                      ],
                      "priceMin": 510,
                      "priceMax": 690
                  },
                  {
                      "id": "ja_a_2",
                      "name": "広島風お好み焼き",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_2.webp",
                      "desc": "Bánh xèo nhiều lớp: đế mỏng, núi bắp cải ngọt lịm, thịt ba chỉ, mì yakisoba, trứng phủ sốt rong biển.",
                      "calories": 387,
                      "tags": [
                          "広島風お好み焼き",
                          "afternoon",
                          "ja"
                      ],
                      "price": 1100,
                      "priceRange": [
                          935,
                          1265
                      ],
                      "priceMin": 935,
                      "priceMax": 1265
                  },
                  {
                      "id": "ja_a_3",
                      "name": "10円パン (チーズ)",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_3.webp",
                      "desc": "Bánh bông lan hình đồng xu 10 Yên nướng thơm nức bơ vani, cắn ngập phô mai mozzarella kéo sợi 1 mét.",
                      "calories": 424,
                      "tags": [
                          "10円パン (チーズ)",
                          "afternoon",
                          "ja"
                      ],
                      "price": 500,
                      "priceRange": [
                          425,
                          575
                      ],
                      "priceMin": 425,
                      "priceMax": 575
                  },
                  {
                      "id": "ja_a_4",
                      "name": "たい焼き (粒あん)",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_4.webp",
                      "desc": "Bánh hình cá tráp may mắn nướng khuôn gang giòn rụm, nhân đậu đỏ nhuyễn ngọt bùi hoặc kem custard.",
                      "calories": 461,
                      "tags": [
                          "たい焼き (粒あん)",
                          "afternoon",
                          "ja"
                      ],
                      "price": 300,
                      "priceRange": [
                          255,
                          345
                      ],
                      "priceMin": 255,
                      "priceMax": 345
                  },
                  {
                      "id": "ja_a_5",
                      "name": "焼きそばパン",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_5.webp",
                      "desc": "Bánh mì mềm kẹp đầy ắp mì sợi xào sốt mặn ngọt bắp cải gừng đỏ, món ăn tuổi thơ học đường Nhật.",
                      "calories": 498,
                      "tags": [
                          "焼きそばパン",
                          "afternoon",
                          "ja"
                      ],
                      "price": 350,
                      "priceRange": [
                          298,
                          402
                      ],
                      "priceMin": 298,
                      "priceMax": 402
                  },
                  {
                      "id": "ja_a_6",
                      "name": "から揚げ串",
                      "rarity": 4,
                      "type": "Gà",
                      "image": "images/regional/ja/ja_a_6.webp",
                      "desc": "Từng miếng đùi gà ướp gừng tỏi xì dầu lăn bột chiên 2 lần giòn rụm, vắt chanh tươi ăn liền.",
                      "calories": 535,
                      "tags": [
                          "から揚げ串",
                          "afternoon",
                          "ja"
                      ],
                      "price": 450,
                      "priceRange": [
                          382,
                          518
                      ],
                      "priceMin": 382,
                      "priceMax": 518
                  },
                  {
                      "id": "ja_a_7",
                      "name": "みたらし団子",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_a_7.webp",
                      "desc": "Ba viên bánh nếp nướng xém than dẻo quánh áo lớp sốt nước tương ngào đường sền sệt mặn ngọt hấp dẫn.",
                      "calories": 572,
                      "tags": [
                          "みたらし団子",
                          "afternoon",
                          "ja"
                      ],
                      "price": 300,
                      "priceRange": [
                          255,
                          345
                      ],
                      "priceMin": 255,
                      "priceMax": 345
                  },
                  {
                      "id": "ja_a_8",
                      "name": "焼き芋ブリュレ",
                      "rarity": 3,
                      "type": "Khoai",
                      "image": "images/regional/ja/ja_a_8.webp",
                      "desc": "Củ khoai mật nướng dẻo quánh phủ lớp đường khò lửa cháy giòn tan caramel, ăn cùng kem vani lạnh.",
                      "calories": 609,
                      "tags": [
                          "焼き芋ブリュレ",
                          "afternoon",
                          "ja"
                      ],
                      "price": 650,
                      "priceRange": [
                          552,
                          747
                      ],
                      "priceMin": 552,
                      "priceMax": 747
                  },
                  {
                      "id": "ja_a_9",
                      "name": "イカ焼き",
                      "rarity": 3,
                      "type": "Mực",
                      "image": "images/regional/ja/ja_a_9.webp",
                      "desc": "Nguyên con mực ống tươi nướng than hoa xèo xèo, phết nước tương ngọt gừng thơm nức mũi lễ hội.",
                      "calories": 646,
                      "tags": [
                          "イカ焼き",
                          "afternoon",
                          "ja"
                      ],
                      "price": 700,
                      "priceRange": [
                          595,
                          805
                      ],
                      "priceMin": 595,
                      "priceMax": 805
                  }
              ]
          },
          "dinner": {
              "id": "dinner",
              "name": "夕食・居酒屋",
              "title": "今夜は何で乾杯する？",
              "bannerName": "心温まる夜のご馳走",
              "subtitle": "特選刺身、すき焼き、焼き鳥など贅沢で豊かなディナータイム",
              "featured5Star": "旬の特選刺身盛り合わせ",
              "bannerImage": "images/buoi_toi/bbq_nuong.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "ja_d_1",
                      "name": "旬の特選刺身盛り合わせ",
                      "rarity": 5,
                      "type": "Thuyền",
                      "image": "images/regional/ja/ja_d_1.webp",
                      "desc": "Cá hồi vân mỡ tan chảy, cá ngừ Maguro, sò đỏ, mực hoa tươi rói chấm wasabi cay nồng.",
                      "calories": 350,
                      "tags": [
                          "旬の特選刺身盛り合わせ",
                          "dinner",
                          "ja"
                      ],
                      "price": 2200,
                      "priceRange": [
                          1870,
                          2530
                      ],
                      "priceMin": 1870,
                      "priceMax": 2530
                  },
                  {
                      "id": "ja_d_2",
                      "name": "特選黒毛和牛すき焼き",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/ja/ja_d_2.webp",
                      "desc": "Từng lát bò Wagyu vân mỡ cẩm thạch áp chảo sốt ngọt warishita, nhúng ngập chén trứng gà tươi béo ngậy.",
                      "calories": 387,
                      "tags": [
                          "特選黒毛和牛すき焼き",
                          "dinner",
                          "ja"
                      ],
                      "price": 2500,
                      "priceRange": [
                          2125,
                          2875
                      ],
                      "priceMin": 2125,
                      "priceMax": 2875
                  },
                  {
                      "id": "ja_d_3",
                      "name": "炭火焼き鳥盛り合わせ (5本)",
                      "rarity": 3,
                      "type": "Xiên",
                      "image": "images/regional/ja/ja_d_3.webp",
                      "desc": "Món nhắm kinh điển Izakaya: 5 xiên gà nướng xém cạnh thơm lừng sốt tare đậm đà hoặc nướng muối tiêu.",
                      "calories": 424,
                      "tags": [
                          "炭火焼き鳥盛り合わせ (5本)",
                          "dinner",
                          "ja"
                      ],
                      "price": 1200,
                      "priceRange": [
                          1020,
                          1380
                      ],
                      "priceMin": 1020,
                      "priceMax": 1380
                  },
                  {
                      "id": "ja_d_4",
                      "name": "博多牛もつ鍋",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/ja/ja_d_4.webp",
                      "desc": "Nồi lẩu lòng bò tươi béo ngậy nấu ngập hẹ xanh, bắp cải ngọt và ớt lát trong nước dùng miso tỏi thơm lừng.",
                      "calories": 461,
                      "tags": [
                          "博多牛もつ鍋",
                          "dinner",
                          "ja"
                      ],
                      "price": 1600,
                      "priceRange": [
                          1360,
                          1840
                      ],
                      "priceMin": 1360,
                      "priceMax": 1840
                  },
                  {
                      "id": "ja_d_5",
                      "name": "牛しゃぶしゃぶ",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/ja/ja_d_5.webp",
                      "desc": "Thịt bò thái mỏng như lụa nhúng nước dùng kombu sôi nhẹ, chấm sốt mè goma hoặc sốt ponzu chua thanh.",
                      "calories": 498,
                      "tags": [
                          "牛しゃぶしゃぶ",
                          "dinner",
                          "ja"
                      ],
                      "price": 2200,
                      "priceRange": [
                          1870,
                          2530
                      ],
                      "priceMin": 1870,
                      "priceMax": 2530
                  },
                  {
                      "id": "ja_d_6",
                      "name": "明太チーズもんじゃ焼き",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_d_6.webp",
                      "desc": "Đặc sản phố Tsukishima: bánh bột xào trên bàn là nóng dẻo thơm ngập phô mai và trứng cá cay mentaiko.",
                      "calories": 535,
                      "tags": [
                          "明太チーズもんじゃ焼き",
                          "dinner",
                          "ja"
                      ],
                      "price": 1200,
                      "priceRange": [
                          1020,
                          1380
                      ],
                      "priceMin": 1020,
                      "priceMax": 1380
                  },
                  {
                      "id": "ja_d_7",
                      "name": "北海道ジンギスカン",
                      "rarity": 4,
                      "type": "Thịt",
                      "image": "images/regional/ja/ja_d_7.webp",
                      "desc": "Thịt cừu non ướp sốt táo hành tây nướng xèo xèo trên chảo vòm sắt cùng giá đỗ ngọt giòn.",
                      "calories": 572,
                      "tags": [
                          "北海道ジンギスカン",
                          "dinner",
                          "ja"
                      ],
                      "price": 1500,
                      "priceRange": [
                          1275,
                          1725
                      ],
                      "priceMin": 1275,
                      "priceMax": 1725
                  },
                  {
                      "id": "ja_d_8",
                      "name": "大阪新世界串カツ盛合せ",
                      "rarity": 3,
                      "type": "Xiên",
                      "image": "images/regional/ja/ja_d_8.webp",
                      "desc": "6 xiên thịt bò, tôm, phô mai, củ sen chiên vàng giòn rụm nhúng đẫm sốt đen đặc quyền Osaka.",
                      "calories": 609,
                      "tags": [
                          "大阪新世界串カツ盛合せ",
                          "dinner",
                          "ja"
                      ],
                      "price": 1000,
                      "priceRange": [
                          850,
                          1150
                      ],
                      "priceMin": 850,
                      "priceMax": 1150
                  },
                  {
                      "id": "ja_d_9",
                      "name": "特濃魚介豚骨つけ麺",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ja/ja_d_9.webp",
                      "desc": "Sợi mì bản to dày dai ướp lạnh chấm vào thố nước cốt xương heo cá khô hầm đặc sánh bốc khói.",
                      "calories": 646,
                      "tags": [
                          "特濃魚介豚骨つけ麺",
                          "dinner",
                          "ja"
                      ],
                      "price": 950,
                      "priceRange": [
                          808,
                          1092
                      ],
                      "priceMin": 808,
                      "priceMax": 1092
                  },
                  {
                      "id": "ja_d_10",
                      "name": "銀だらの西京焼き",
                      "rarity": 3,
                      "type": "Cá",
                      "image": "images/regional/ja/ja_d_10.webp",
                      "desc": "Miếng cá tuyết béo ngậy ướp rượu sake và tương ngọt Kyoto nướng than hoa thơm lừng mềm tan.",
                      "calories": 683,
                      "tags": [
                          "銀だらの西京焼き",
                          "dinner",
                          "ja"
                      ],
                      "price": 1400,
                      "priceRange": [
                          1190,
                          1610
                      ],
                      "priceMin": 1190,
                      "priceMax": 1610
                  }
              ]
          },
          "snacks": {
              "id": "snacks",
              "name": "夜食・和菓子",
              "title": "夜のひとときのお供に",
              "bannerName": "深夜の誘惑と和スイーツ",
              "subtitle": "わらび餅、抹茶パフェ、串カツなど至福のデザート＆スナック",
              "featured5Star": "本わらび餅 (黒蜜きな粉)",
              "bannerImage": "images/do_an_vat/ca_vien_chien.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "ja_s_1",
                      "name": "本わらび餅 (黒蜜きな粉)",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_s_1.webp",
                      "desc": "Bánh bột dương xỉ trong veo mát lạnh rắc bột đậu nành rang thơm ngát, chan siro đường đen kuromitsu.",
                      "calories": 350,
                      "tags": [
                          "本わらび餅 (黒蜜きな粉)",
                          "snacks",
                          "ja"
                      ],
                      "price": 500,
                      "priceRange": [
                          425,
                          575
                      ],
                      "priceMin": 425,
                      "priceMax": 575
                  },
                  {
                      "id": "ja_s_2",
                      "name": "宇治抹茶パフェ",
                      "rarity": 3,
                      "type": "Kem",
                      "image": "images/regional/ja/ja_s_2.webp",
                      "desc": "Ly kem nhiều tầng: kem matcha Kyoto chát dịu, thạch kanten, bánh dango mềm dẻo, đậu đỏ và bánh quy.",
                      "calories": 387,
                      "tags": [
                          "宇治抹茶パフェ",
                          "snacks",
                          "ja"
                      ],
                      "price": 750,
                      "priceRange": [
                          638,
                          862
                      ],
                      "priceMin": 638,
                      "priceMax": 862
                  },
                  {
                      "id": "ja_s_3",
                      "name": "水信玄餅",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_s_3.webp",
                      "desc": "Viên mochi trong suốt như giọt sương tan mềm trong miệng, thanh mát nhẹ nhàng ăn cùng bột kinako.",
                      "calories": 424,
                      "tags": [
                          "水信玄餅",
                          "snacks",
                          "ja"
                      ],
                      "price": 450,
                      "priceRange": [
                          382,
                          518
                      ],
                      "priceMin": 382,
                      "priceMax": 518
                  },
                  {
                      "id": "ja_s_4",
                      "name": "いちご大福",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_s_4.webp",
                      "desc": "Lớp vỏ nếp dẻo bọc trọn quả dâu tây tươi đỏ mọng nước và lớp đậu đỏ ngào đường ngọt ngào.",
                      "calories": 461,
                      "tags": [
                          "いちご大福",
                          "snacks",
                          "ja"
                      ],
                      "price": 380,
                      "priceRange": [
                          323,
                          437
                      ],
                      "priceMin": 323,
                      "priceMax": 437
                  },
                  {
                      "id": "ja_s_5",
                      "name": "宇治抹茶モンブランソフト",
                      "rarity": 3,
                      "type": "Kem",
                      "image": "images/regional/ja/ja_s_5.webp",
                      "desc": "Kem tươi ốc quế bơm ngập những sợi hạt dẻ matcha nhuyễn mịn như nhung phủ kín đỉnh kem.",
                      "calories": 498,
                      "tags": [
                          "宇治抹茶モンブランソフト",
                          "snacks",
                          "ja"
                      ],
                      "price": 700,
                      "priceRange": [
                          595,
                          805
                      ],
                      "priceMin": 595,
                      "priceMax": 805
                  },
                  {
                      "id": "ja_s_6",
                      "name": "どら焼き",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_s_6.webp",
                      "desc": "Hai lát bánh bông lan mật ong kẹp lớp nhân đậu đỏ Azuki bùi béo ngọt lịm gắn liền với tuổi thơ.",
                      "calories": 535,
                      "tags": [
                          "どら焼き",
                          "snacks",
                          "ja"
                      ],
                      "price": 280,
                      "priceRange": [
                          238,
                          322
                      ],
                      "priceMin": 238,
                      "priceMax": 322
                  },
                  {
                      "id": "ja_s_7",
                      "name": "スフレパンケーキ",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ja/ja_s_7.webp",
                      "desc": "Hai chiếc bánh bông lan soufflé dày cộp núng nính tan ngay trên đầu lưỡi, rưới kem tươi vani.",
                      "calories": 572,
                      "tags": [
                          "スフレパンケーキ",
                          "snacks",
                          "ja"
                      ],
                      "price": 900,
                      "priceRange": [
                          765,
                          1035
                      ],
                      "priceMin": 765,
                      "priceMax": 1035
                  }
              ]
          },
          "drinks": {
              "id": "drinks",
              "name": "お飲み物",
              "title": "喉を潤す一杯",
              "bannerName": "日本の人気ドリンク",
              "subtitle": "淹れたて抹茶ラテ、メロンソーダ、冷酒など爽快なドリンク",
              "featured5Star": "喫茶メロンソーダフロート",
              "bannerImage": "images/do_uong/tra_sua.webp",
              "theme": "drinks",
              "dishes": [
                  {
                      "id": "ja_dr_1",
                      "name": "喫茶メロンソーダフロート",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ja/ja_dr_1.webp",
                      "desc": "Soda dưa lưới xanh ngọc sủi bọt mát lạnh đặt viên kem vani tròn và quả cherry đỏ hoài niệm.",
                      "calories": 350,
                      "tags": [
                          "喫茶メロンソーダフロート",
                          "drinks",
                          "ja"
                      ],
                      "price": 600,
                      "priceRange": [
                          510,
                          690
                      ],
                      "priceMin": 510,
                      "priceMax": 690
                  },
                  {
                      "id": "ja_dr_2",
                      "name": "濃厚宇治抹茶ラテ",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/ja/ja_dr_2.webp",
                      "desc": "Trà xanh Uji thượng phẩm đánh bọt bông mịn hòa quyện sữa tươi thanh trùng béo ngậy thơm nức.",
                      "calories": 387,
                      "tags": [
                          "濃厚宇治抹茶ラテ",
                          "drinks",
                          "ja"
                      ],
                      "price": 550,
                      "priceRange": [
                          468,
                          632
                      ],
                      "priceMin": 468,
                      "priceMax": 632
                  },
                  {
                      "id": "ja_dr_3",
                      "name": "香ばしほうじ茶ラテ",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/ja/ja_dr_3.webp",
                      "desc": "Trà xanh rang củi màu nâu hạt dẻ thơm dịu nhẹ vị khói hòa cùng sữa tươi êm dịu dạ dày.",
                      "calories": 424,
                      "tags": [
                          "香ばしほうじ茶ラテ",
                          "drinks",
                          "ja"
                      ],
                      "price": 500,
                      "priceRange": [
                          425,
                          575
                      ],
                      "priceMin": 425,
                      "priceMax": 575
                  },
                  {
                      "id": "ja_dr_4",
                      "name": "瓶ラムネ (ビー玉入り)",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ja/ja_dr_4.webp",
                      "desc": "Chai thủy tinh nút bi đặc trưng nổ bồm bộp khi nhấn, vị chanh soda mát lạnh sảng khoái mùa hè.",
                      "calories": 461,
                      "tags": [
                          "瓶ラムネ (ビー玉入り)",
                          "drinks",
                          "ja"
                      ],
                      "price": 250,
                      "priceRange": [
                          212,
                          288
                      ],
                      "priceMin": 212,
                      "priceMax": 288
                  },
                  {
                      "id": "ja_dr_5",
                      "name": "カルピスソーダ",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ja/ja_dr_5.webp",
                      "desc": "Thức uống lên men từ sữa tươi vị chua ngọt sảng khoái kết hợp bọt ga lăn tăn mát lạnh.",
                      "calories": 498,
                      "tags": [
                          "カルピスソーダ",
                          "drinks",
                          "ja"
                      ],
                      "price": 300,
                      "priceRange": [
                          255,
                          345
                      ],
                      "priceMin": 255,
                      "priceMax": 345
                  },
                  {
                      "id": "ja_dr_6",
                      "name": "特製ロイヤルミルクティー",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/ja/ja_dr_6.webp",
                      "desc": "Trà đen Assam nấu trực tiếp trong sữa tươi nguyên kem béo ngậy và đường nâu tinh tế.",
                      "calories": 535,
                      "tags": [
                          "特製ロイヤルミルクティー",
                          "drinks",
                          "ja"
                      ],
                      "price": 450,
                      "priceRange": [
                          382,
                          518
                      ],
                      "priceMin": 382,
                      "priceMax": 518
                  },
                  {
                      "id": "ja_dr_7",
                      "name": "アサヒ スーパードライ",
                      "rarity": 3,
                      "type": "Bia",
                      "image": "images/regional/ja/ja_dr_7.webp",
                      "desc": "Ly bia tươi mát lạnh rót lớp bọt kem tuyết dày 2 ngón tay, sảng khoái đánh tan mệt mỏi bữa tối.",
                      "calories": 572,
                      "tags": [
                          "アサヒ スーパードライ",
                          "drinks",
                          "ja"
                      ],
                      "price": 550,
                      "priceRange": [
                          468,
                          632
                      ],
                      "priceMin": 468,
                      "priceMax": 632
                  },
                  {
                      "id": "ja_dr_8",
                      "name": "本格梅酒ソーダ割り",
                      "rarity": 3,
                      "type": "Rượu",
                      "image": "images/regional/ja/ja_dr_8.webp",
                      "desc": "Rượu mơ ủ mật ong chua ngọt thanh tao hòa cùng soda sủi bọt và quả mơ xanh ngâm giòn.",
                      "calories": 609,
                      "tags": [
                          "本格梅酒ソーダ割り",
                          "drinks",
                          "ja"
                      ],
                      "price": 550,
                      "priceRange": [
                          468,
                          632
                      ],
                      "priceMin": 468,
                      "priceMax": 632
                  }
              ]
          }
      },
  ko: {
          "morning": {
              "id": "morning",
              "name": "아침식사",
              "title": "오늘 아침 뭐 먹지?",
              "bannerName": "든든하고 따뜻한 아침",
              "subtitle": "부드러운 전복죽과 얼큰한 해장국으로 깨우는 활기찬 하루",
              "featured5Star": "전주 콩나물국밥",
              "bannerImage": "images/buoi_sang/pho_bo.webp",
              "theme": "morning",
              "dishes": [
                  {
                      "id": "ko_m_1",
                      "name": "전주 콩나물국밥",
                      "rarity": 3,
                      "type": "Canh",
                      "image": "images/regional/ko/ko_m_1.webp",
                      "desc": "Canh giá đỗ thanh mát nước dùng cá cơm tôm khô, đập trứng lòng đào ăn kèm kim chi giòn tan.",
                      "calories": 350,
                      "tags": [
                          "전주 콩나물국밥",
                          "morning",
                          "ko"
                      ],
                      "price": 7500,
                      "priceRange": [
                          6375,
                          8625
                      ],
                      "priceMin": 6375,
                      "priceMax": 8625
                  },
                  {
                      "id": "ko_m_2",
                      "name": "원조 길거리 토스트",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_m_2.webp",
                      "desc": "Bánh mì bơ kẹp chả trứng bắp cải, rắc đường nâu và sốt cà chua tương ớt thơm nức phố ga.",
                      "calories": 387,
                      "tags": [
                          "원조 길거리 토스트",
                          "morning",
                          "ko"
                      ],
                      "price": 4500,
                      "priceRange": [
                          3825,
                          5175
                      ],
                      "priceMin": 3825,
                      "priceMax": 5175
                  },
                  {
                      "id": "ko_m_3",
                      "name": "제주 활전복죽",
                      "rarity": 3,
                      "type": "Cháo",
                      "image": "images/regional/ko/ko_m_3.webp",
                      "desc": "Tô cháo bào ngư đảo Jeju xanh màu gan bào ngư béo ngậy, rắc rong biển và dầu mè thơm ngát.",
                      "calories": 424,
                      "tags": [
                          "제주 활전복죽",
                          "morning",
                          "ko"
                      ],
                      "price": 11000,
                      "priceRange": [
                          9350,
                          12650
                      ],
                      "priceMin": 9350,
                      "priceMax": 12650
                  },
                  {
                      "id": "ko_m_4",
                      "name": "명동 계란빵",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_m_4.webp",
                      "desc": "Bánh bông lan xốp nướng nguyên quả trứng gà béo ngậy rắc phô mai và mùi tây thơm nức.",
                      "calories": 461,
                      "tags": [
                          "명동 계란빵",
                          "morning",
                          "ko"
                      ],
                      "price": 3000,
                      "priceRange": [
                          2550,
                          3450
                      ],
                      "priceMin": 2550,
                      "priceMax": 3450
                  },
                  {
                      "id": "ko_m_5",
                      "name": "소고기 미역국",
                      "rarity": 3,
                      "type": "Canh",
                      "image": "images/regional/ko/ko_m_5.webp",
                      "desc": "Canh rong biển nâu nấu bắp bò thơm nức mùi dầu mè nguyên chất, món ăn bồi bổ sức khỏe.",
                      "calories": 498,
                      "tags": [
                          "소고기 미역국",
                          "morning",
                          "ko"
                      ],
                      "price": 8000,
                      "priceRange": [
                          6800,
                          9200
                      ],
                      "priceMin": 6800,
                      "priceMax": 9200
                  },
                  {
                      "id": "ko_m_6",
                      "name": "우거지 뼈해장국",
                      "rarity": 4,
                      "type": "Canh",
                      "image": "images/regional/ko/ko_m_6.webp",
                      "desc": "Sườn heo ninh nhừ cay nồng với rau cải thảo khô, hạt tiêu hoang thơm nồng ấm người.",
                      "calories": 535,
                      "tags": [
                          "우거지 뼈해장국",
                          "morning",
                          "ko"
                      ],
                      "price": 9000,
                      "priceRange": [
                          7650,
                          10350
                      ],
                      "priceMin": 7650,
                      "priceMax": 10350
                  },
                  {
                      "id": "ko_m_7",
                      "name": "단호박죽",
                      "rarity": 3,
                      "type": "Cháo",
                      "image": "images/regional/ko/ko_m_7.webp",
                      "desc": "Cháo bí đỏ vàng ươm sánh mịn ngọt ngào tự nhiên, điểm viên nếp dẻo và hạt đậu đỏ bùi béo.",
                      "calories": 572,
                      "tags": [
                          "단호박죽",
                          "morning",
                          "ko"
                      ],
                      "price": 6500,
                      "priceRange": [
                          5525,
                          7475
                      ],
                      "priceMin": 5525,
                      "priceMax": 7475
                  },
                  {
                      "id": "ko_m_8",
                      "name": "가래떡 구이와 조청",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_m_8.webp",
                      "desc": "Thỏi bánh gạo nướng phồng giòn vỏ dẻo ruột, chấm đẫm mật ong lúa mạch ngọt ngào ấm áp.",
                      "calories": 609,
                      "tags": [
                          "가래떡 구이와 조청",
                          "morning",
                          "ko"
                      ],
                      "price": 4000,
                      "priceRange": [
                          3400,
                          4600
                      ],
                      "priceMin": 3400,
                      "priceMax": 4600
                  }
              ]
          },
          "lunch": {
              "id": "lunch",
              "name": "점심식사",
              "title": "오늘 점심 뭐 먹을까?",
              "bannerName": "한국인이 사랑하는 런치",
              "subtitle": "비빔밥, 짜장면, 김치찌개 등 든든하고 맛있는 밥상",
              "featured5Star": "불맛 해물짬뽕",
              "bannerImage": "images/buoi_trua/com_tam.webp",
              "theme": "lunch",
              "dishes": [
                  {
                      "id": "ko_l_1",
                      "name": "전주 돌솥비빔밥",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ko/ko_l_1.webp",
                      "desc": "Thố đá nóng xèo xèo lớp cháy giòn, xếp 8 loại rau củ sắc màu, thịt bò băm, lòng đỏ trứng và sốt Gochujang.",
                      "calories": 350,
                      "tags": [
                          "전주 돌솥비빔밥",
                          "lunch",
                          "ko"
                      ],
                      "price": 9500,
                      "priceRange": [
                          8075,
                          10925
                      ],
                      "priceMin": 8075,
                      "priceMax": 10925
                  },
                  {
                      "id": "ko_l_2",
                      "name": "참치 마요 김밥",
                      "rarity": 4,
                      "type": "Cơm",
                      "image": "images/regional/ko/ko_l_2.webp",
                      "desc": "Cuộn rong biển căng tròn nhân ngập cá ngừ sốt béo mayo, củ cải vàng, cà rốt, lá mè và trứng chiên.",
                      "calories": 387,
                      "tags": [
                          "참치 마요 김밥",
                          "lunch",
                          "ko"
                      ],
                      "price": 5500,
                      "priceRange": [
                          4675,
                          6325
                      ],
                      "priceMin": 4675,
                      "priceMax": 6325
                  },
                  {
                      "id": "ko_l_3",
                      "name": "옛날 간짜장",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ko/ko_l_3.webp",
                      "desc": "Mì dai nấu sốt tương đen chunjang xào lửa lớn với thịt ba chỉ thái hạt lựu và hành tây giòn ngọt.",
                      "calories": 424,
                      "tags": [
                          "옛날 간짜장",
                          "lunch",
                          "ko"
                      ],
                      "price": 7500,
                      "priceRange": [
                          6375,
                          8625
                      ],
                      "priceMin": 6375,
                      "priceMax": 8625
                  },
                  {
                      "id": "ko_l_4",
                      "name": "불맛 해물짬뽕",
                      "rarity": 5,
                      "type": "Mì",
                      "image": "images/regional/ko/ko_l_4.webp",
                      "desc": "Bát mì đỏ rực ngập tôm sú, mực tươi, nghêu xào lửa lớn thơm lừng mùi khói cay nồng ấm bụng.",
                      "calories": 461,
                      "tags": [
                          "불맛 해물짬뽕",
                          "lunch",
                          "ko"
                      ],
                      "price": 8500,
                      "priceRange": [
                          7225,
                          9775
                      ],
                      "priceMin": 7225,
                      "priceMax": 9775
                  },
                  {
                      "id": "ko_l_5",
                      "name": "돼지김치찌개",
                      "rarity": 3,
                      "type": "Canh",
                      "image": "images/regional/ko/ko_l_5.webp",
                      "desc": "Kim chi muối chua om nhừ cùng thịt ba chỉ béo ngậy, đậu phụ mềm và nước súp cay nồng đậm đà.",
                      "calories": 498,
                      "tags": [
                          "돼지김치찌개",
                          "lunch",
                          "ko"
                      ],
                      "price": 8000,
                      "priceRange": [
                          6800,
                          9200
                      ],
                      "priceMin": 6800,
                      "priceMax": 9200
                  },
                  {
                      "id": "ko_l_6",
                      "name": "영양 삼계탕",
                      "rarity": 5,
                      "type": "보양식",
                      "image": "images/regional/ko/ko_l_6.webp",
                      "desc": "Nguyên con gà non nhồi gạo nếp, nhân sâm Geumsan, táo đỏ, hạt dẻ hầm nhừ ngọt lịm bổ dưỡng phục hồi thể lực.",
                      "calories": 535,
                      "tags": [
                          "삼계탕",
                          "인삼",
                          "보양식",
                          "닭고기"
                      ],
                      "price": 15000,
                      "priceRange": [
                          13000,
                          18000
                      ],
                      "priceMin": 13000,
                      "priceMax": 18000
                  },
                  {
                      "id": "ko_l_7",
                      "name": "부산 돼지국밥",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ko/ko_l_7.webp",
                      "desc": "Nước dùng xương heo hầm trắng đục ngọt thanh, đầy ắp thịt ba chỉ luộc mềm ăn cùng hẹ tươi.",
                      "calories": 572,
                      "tags": [
                          "부산 돼지국밥",
                          "lunch",
                          "ko"
                      ],
                      "price": 8500,
                      "priceRange": [
                          7225,
                          9775
                      ],
                      "priceMin": 7225,
                      "priceMax": 9775
                  },
                  {
                      "id": "ko_l_8",
                      "name": "물냉면",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ko/ko_l_8.webp",
                      "desc": "Mì kiều mạch dai ngon trong nước dùng thịt bò ướp đá tuyết mát lạnh, lát lê ngọt và dưa leo giòn.",
                      "calories": 609,
                      "tags": [
                          "물냉면",
                          "lunch",
                          "ko"
                      ],
                      "price": 8500,
                      "priceRange": [
                          7225,
                          9775
                      ],
                      "priceMin": 7225,
                      "priceMax": 9775
                  },
                  {
                      "id": "ko_l_9",
                      "name": "바지락 칼국수",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ko/ko_l_9.webp",
                      "desc": "Sợi mì cắt tay mềm dai nấu trong nước súp nghêu ngọt lịm thanh tao, ăn kèm kim chi tươi cay xè.",
                      "calories": 646,
                      "tags": [
                          "바지락 칼국수",
                          "lunch",
                          "ko"
                      ],
                      "price": 8500,
                      "priceRange": [
                          7225,
                          9775
                      ],
                      "priceMin": 7225,
                      "priceMax": 9775
                  },
                  {
                      "id": "ko_l_10",
                      "name": "스팸 김치볶음밥",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/ko/ko_l_10.webp",
                      "desc": "Cơm chiên kim chi đậm đà cùng thịt hộp Spam mặn béo, phủ phô mai kéo sợi và trứng ốp la lòng đào.",
                      "calories": 683,
                      "tags": [
                          "스팸 김치볶음밥",
                          "lunch",
                          "ko"
                      ],
                      "price": 7500,
                      "priceRange": [
                          6375,
                          8625
                      ],
                      "priceMin": 6375,
                      "priceMax": 8625
                  },
                  {
                      "id": "ko_l_11",
                      "name": "뚝배기 불고기",
                      "rarity": 3,
                      "type": "Thịt",
                      "image": "images/regional/ko/ko_l_11.webp",
                      "desc": "Thịt bò xào mềm thơm trong nước tương ngọt dịu cùng nấm kim châm, miến dong dai mềm.",
                      "calories": 370,
                      "tags": [
                          "뚝배기 불고기",
                          "lunch",
                          "ko"
                      ],
                      "price": 9500,
                      "priceRange": [
                          8075,
                          10925
                      ],
                      "priceMin": 8075,
                      "priceMax": 10925
                  },
                  {
                      "id": "ko_l_12",
                      "name": "안동 찜닭",
                      "rarity": 3,
                      "type": "Gà",
                      "image": "images/regional/ko/ko_l_12.webp",
                      "desc": "Thịt gà om khoai tây, cà rốt và miến dẹt thấm đẫm sốt tương đen cay ngọt mặn mà nức tiếng Andong.",
                      "calories": 407,
                      "tags": [
                          "안동 찜닭",
                          "lunch",
                          "ko"
                      ],
                      "price": 11000,
                      "priceRange": [
                          9350,
                          12650
                      ],
                      "priceMin": 9350,
                      "priceMax": 12650
                  }
              ]
          },
          "afternoon": {
              "id": "afternoon",
              "name": "간식 & 분식",
              "title": "출출할 때 즐기는 길거리 분식",
              "bannerName": "매콤달콤 국민 분식",
              "subtitle": "로제 떡볶이, 바삭한 튀김, 핫도그 등 멈출 수 없는 맛",
              "featured5Star": "치즈 로제떡볶이",
              "bannerImage": "images/buoi_chieu/banh_xeo.webp",
              "theme": "afternoon",
              "dishes": [
                  {
                      "id": "ko_a_1",
                      "name": "치즈 로제떡볶이",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_a_1.webp",
                      "desc": "Bánh gạo dẻo quánh nấu sốt ớt cay hòa quyện kem tươi béo ngậy, xúc xích và phô mai mozzarella.",
                      "calories": 350,
                      "tags": [
                          "치즈 로제떡볶이",
                          "afternoon",
                          "ko"
                      ],
                      "price": 9000,
                      "priceRange": [
                          7650,
                          10350
                      ],
                      "priceMin": 7650,
                      "priceMax": 10350
                  },
                  {
                      "id": "ko_a_2",
                      "name": "바삭 전통 순대튀김",
                      "rarity": 3,
                      "type": "분식",
                      "image": "images/regional/ko/ko_a_2.webp",
                      "desc": "Từng khoanh dồi sụn miến thơm lừng gia vị chiên phồng giòn tan chấm muối ớt bột tiêu cay nồng.",
                      "calories": 387,
                      "tags": [
                          "순대",
                          "튀김",
                          "분식",
                          "간식"
                      ],
                      "price": 45000,
                      "priceRange": [
                          4000,
                          5500
                      ],
                      "priceMin": 4000,
                      "priceMax": 5500
                  },
                  {
                      "id": "ko_a_3",
                      "name": "바삭 감자 모짜핫도그",
                      "rarity": 3,
                      "type": "Hotdog",
                      "image": "images/regional/ko/ko_a_3.webp",
                      "desc": "Hotdog lăn khoai tây chiên giòn rụm bên ngoài, bên trong phô mai mozzarella kéo sợi vô tận.",
                      "calories": 424,
                      "tags": [
                          "바삭 감자 모짜핫도그",
                          "afternoon",
                          "ko"
                      ],
                      "price": 4500,
                      "priceRange": [
                          3825,
                          5175
                      ],
                      "priceMin": 3825,
                      "priceMax": 5175
                  },
                  {
                      "id": "ko_a_4",
                      "name": "치즈 어니언 회오리감자",
                      "rarity": 3,
                      "type": "Khoai",
                      "image": "images/regional/ko/ko_a_4.webp",
                      "desc": "Củ khoai tây xoắn ốc dài chiên phồng giòn tan, lắc đều bột phô mai hành tây thơm nức mũi.",
                      "calories": 461,
                      "tags": [
                          "치즈 어니언 회오리감자",
                          "afternoon",
                          "ko"
                      ],
                      "price": 4000,
                      "priceRange": [
                          3400,
                          4600
                      ],
                      "priceMin": 3400,
                      "priceMax": 4600
                  },
                  {
                      "id": "ko_a_5",
                      "name": "부산 삼진어묵 꼬치",
                      "rarity": 4,
                      "type": "Xiên",
                      "image": "images/regional/ko/ko_a_5.webp",
                      "desc": "Xiên chả cá gợn sóng nấu trong nồi nước dùng củ cải hải sản ngọt thanh, chén súp húp xì xụp ấm áp.",
                      "calories": 498,
                      "tags": [
                          "부산 삼진어묵 꼬치",
                          "afternoon",
                          "ko"
                      ],
                      "price": 3500,
                      "priceRange": [
                          2975,
                          4025
                      ],
                      "priceMin": 2975,
                      "priceMax": 4025
                  },
                  {
                      "id": "ko_a_6",
                      "name": "전통 보쌈",
                      "rarity": 3,
                      "type": "전통요리",
                      "image": "images/regional/ko/ko_a_6.webp",
                      "desc": "Thịt ba chỉ heo tươi luộc mềm mọng nước cùng gừng tỏi quế, cuộn lá cải thảo muối và kim chi củ cải cay giòn.",
                      "calories": 535,
                      "tags": [
                          "보쌈",
                          "돼지고기",
                          "전통",
                          "김치"
                      ],
                      "price": 28000,
                      "priceRange": [
                          24000,
                          32000
                      ],
                      "priceMin": 24000,
                      "priceMax": 32000
                  },
                  {
                      "id": "ko_a_7",
                      "name": "바삭 야채 튀김",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_a_7.webp",
                      "desc": "Khoai lang, cà rốt, hành tây thái sợi tẩm bột chiên phồng giòn xốp chấm đẫm sốt tteokbokki.",
                      "calories": 572,
                      "tags": [
                          "바삭 야채 튀김",
                          "afternoon",
                          "ko"
                      ],
                      "price": 3500,
                      "priceRange": [
                          2975,
                          4025
                      ],
                      "priceMin": 2975,
                      "priceMax": 4025
                  },
                  {
                      "id": "ko_a_8",
                      "name": "당면 김말이 튀김",
                      "rarity": 3,
                      "type": "Rong",
                      "image": "images/regional/ko/ko_a_8.webp",
                      "desc": "Miến dong tẩm gia vị cuộn trong lá rong biển tẩm bột chiên giòn tan, món ăn kèm số 1 bánh gạo.",
                      "calories": 609,
                      "tags": [
                          "당면 김말이 튀김",
                          "afternoon",
                          "ko"
                      ],
                      "price": 3500,
                      "priceRange": [
                          2975,
                          4025
                      ],
                      "priceMin": 2975,
                      "priceMax": 4025
                  },
                  {
                      "id": "ko_a_9",
                      "name": "신림동 백순대 볶음",
                      "rarity": 3,
                      "type": "Dồi",
                      "image": "images/regional/ko/ko_a_9.webp",
                      "desc": "Dồi heo huyết dẻo thơm xào miến, bắp cải và lá tía tô trên chảo phẳng chấm sốt ớt đậu phộng.",
                      "calories": 646,
                      "tags": [
                          "신림동 백순대 볶음",
                          "afternoon",
                          "ko"
                      ],
                      "price": 7500,
                      "priceRange": [
                          6375,
                          8625
                      ],
                      "priceMin": 6375,
                      "priceMax": 8625
                  },
                  {
                      "id": "ko_a_10",
                      "name": "불닭 치즈 라볶이",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/ko/ko_a_10.webp",
                      "desc": "Mì ramen nấu cùng bánh gạo cay sốt gà cay nồng xé lưỡi, phủ ngập phô mai mozzarella tan chảy.",
                      "calories": 683,
                      "tags": [
                          "불닭 치즈 라볶이",
                          "afternoon",
                          "ko"
                      ],
                      "price": 8500,
                      "priceRange": [
                          7225,
                          9775
                      ],
                      "priceMin": 7225,
                      "priceMax": 9775
                  }
              ]
          },
          "dinner": {
              "id": "dinner",
              "name": "저녁식사",
              "title": "오늘 저녁 푸짐한 한 끼",
              "bannerName": "지글지글 고기 & 찌개 파티",
              "subtitle": "두툼한 삼겹살, 소갈비구이, 치맥으로 완성하는 즐거운 저녁",
              "featured5Star": "명품 뼈다귀 감자탕",
              "bannerImage": "images/buoi_toi/bbq_nuong.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "ko_d_1",
                      "name": "생삼겹살 솥뚜껑 구이",
                      "rarity": 4,
                      "type": "Thịt",
                      "image": "images/regional/ko/ko_d_1.webp",
                      "desc": "Dải thịt ba chỉ tươi nướng xèo xèo cùng kim chi chua, tỏi tép cuốn lá xà lách chấm sốt ssamjang.",
                      "calories": 350,
                      "tags": [
                          "생삼겹살 솥뚜껑 구이",
                          "dinner",
                          "ko"
                      ],
                      "price": 15000,
                      "priceRange": [
                          12750,
                          17250
                      ],
                      "priceMin": 12750,
                      "priceMax": 17250
                  },
                  {
                      "id": "ko_d_2",
                      "name": "황금 반반 치킨",
                      "rarity": 4,
                      "type": "Gà",
                      "image": "images/regional/ko/ko_d_2.webp",
                      "desc": "Đĩa gà rán khổng lồ: một nửa vàng giòn rụm, một nửa áo sốt đỏ cay ngọt mè rang, ăn kèm củ cải trắng.",
                      "calories": 387,
                      "tags": [
                          "황금 반반 치킨",
                          "dinner",
                          "ko"
                      ],
                      "price": 18000,
                      "priceRange": [
                          15300,
                          20700
                      ],
                      "priceMin": 15300,
                      "priceMax": 20700
                  },
                  {
                      "id": "ko_d_3",
                      "name": "소갈비 구이",
                      "rarity": 4,
                      "type": "Sườn",
                      "image": "images/regional/ko/ko_d_3.webp",
                      "desc": "Từng dải sườn bò mềm ngọt thấm đẫm sốt lê nước tương nướng than hồng thơm lừng béo ngậy.",
                      "calories": 424,
                      "tags": [
                          "소갈비 구이",
                          "dinner",
                          "ko"
                      ],
                      "price": 24000,
                      "priceRange": [
                          20400,
                          27600
                      ],
                      "priceMin": 20400,
                      "priceMax": 27600
                  },
                  {
                      "id": "ko_d_4",
                      "name": "춘천 철판 닭갈비",
                      "rarity": 4,
                      "type": "Gà",
                      "image": "images/regional/ko/ko_d_4.webp",
                      "desc": "Thịt gà ướp sốt cay xào trên chảo phẳng khổng lồ với bắp cải, bánh gạo, khoai lang và phô mai.",
                      "calories": 461,
                      "tags": [
                          "춘천 철판 닭갈비",
                          "dinner",
                          "ko"
                      ],
                      "price": 13000,
                      "priceRange": [
                          11050,
                          14950
                      ],
                      "priceMin": 11050,
                      "priceMax": 14950
                  },
                  {
                      "id": "ko_d_5",
                      "name": "명품 뼈다귀 감자탕",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/ko/ko_d_5.webp",
                      "desc": "Nồi lẩu sườn heo hầm nhừ róc xương với lá tía tô thơm ngát, bột hạt mè hoang và khoai tây bở ngậy.",
                      "calories": 498,
                      "tags": [
                          "명품 뼈다귀 감자탕",
                          "dinner",
                          "ko"
                      ],
                      "price": 15000,
                      "priceRange": [
                          12750,
                          17250
                      ],
                      "priceMin": 12750,
                      "priceMax": 17250
                  },
                  {
                      "id": "ko_d_6",
                      "name": "의정부 부대찌개",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/ko/ko_d_6.webp",
                      "desc": "Nồi lẩu thập cẩm đậm đà thịt hộp spam, xúc xích, mì ramen, kim chi, đậu hũ và phô mai lát béo ngậy.",
                      "calories": 535,
                      "tags": [
                          "의정부 부대찌개",
                          "dinner",
                          "ko"
                      ],
                      "price": 13500,
                      "priceRange": [
                          11475,
                          15525
                      ],
                      "priceMin": 11475,
                      "priceMax": 15525
                  },
                  {
                      "id": "ko_d_7",
                      "name": "한우 곱창 모듬 구이",
                      "rarity": 4,
                      "type": "Lòng",
                      "image": "images/regional/ko/ko_d_7.webp",
                      "desc": "Đĩa lòng non, dạ dày bò nướng cháy cạnh xèo xèo cùng hẹ xanh và hành tây chấm sốt ớt tỏi.",
                      "calories": 572,
                      "tags": [
                          "한우 곱창 모듬 구이",
                          "dinner",
                          "ko"
                      ],
                      "price": 18000,
                      "priceRange": [
                          15300,
                          20700
                      ],
                      "priceMin": 15300,
                      "priceMax": 20700
                  },
                  {
                      "id": "ko_d_8",
                      "name": "해물파전",
                      "rarity": 5,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_d_8.webp",
                      "desc": "Bánh xèo chiên ngập hành hoa tươi ngọt, tôm sú mực giòn tan chấm nước tương ớt chua cay.",
                      "calories": 609,
                      "tags": [
                          "해물파전",
                          "dinner",
                          "ko"
                      ],
                      "price": 14000,
                      "priceRange": [
                          11900,
                          16100
                      ],
                      "priceMin": 11900,
                      "priceMax": 16100
                  },
                  {
                      "id": "ko_d_9",
                      "name": "한우 육회",
                      "rarity": 3,
                      "type": "Gỏi",
                      "image": "images/regional/ko/ko_d_9.webp",
                      "desc": "Thịt bò tươi thái chỉ trộn dầu mè thơm ngát, tỏi băm, lê ngọt giòn và lòng đỏ trứng gà béo ngậy.",
                      "calories": 646,
                      "tags": [
                          "한우 육회",
                          "dinner",
                          "ko"
                      ],
                      "price": 20000,
                      "priceRange": [
                          17000,
                          23000
                      ],
                      "priceMin": 17000,
                      "priceMax": 23000
                  },
                  {
                      "id": "ko_d_10",
                      "name": "영계 삼계탕",
                      "rarity": 3,
                      "type": "Gà",
                      "image": "images/regional/ko/ko_d_10.webp",
                      "desc": "Con gà non nhồi gạo nếp, nhân sâm Geumsan, táo đỏ và tỏi hầm nhừ nước súp thuốc bắc thanh ngọt.",
                      "calories": 683,
                      "tags": [
                          "영계 삼계탕",
                          "dinner",
                          "ko"
                      ],
                      "price": 16000,
                      "priceRange": [
                          13600,
                          18400
                      ],
                      "priceMin": 13600,
                      "priceMax": 18400
                  }
              ]
          },
          "snacks": {
              "id": "snacks",
              "name": "디저트 & 야식",
              "title": "달콤한 디저트와 야식",
              "bannerName": "심야 분식 & K-디저트",
              "subtitle": "인절미 눈꽃빙수, 호떡, 화채 등 달콤한 힐링",
              "featured5Star": "브라운치즈 크로플",
              "bannerImage": "images/do_an_vat/ca_vien_chien.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "ko_s_1",
                      "name": "브라운치즈 크로플",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_s_1.webp",
                      "desc": "Bánh croissant ép khuôn waffle giòn rụm bơ, đặt viên kem vani và bào ngập phô mai nâu Na Uy.",
                      "calories": 350,
                      "tags": [
                          "브라운치즈 크로플",
                          "snacks",
                          "ko"
                      ],
                      "price": 6500,
                      "priceRange": [
                          5525,
                          7475
                      ],
                      "priceMin": 5525,
                      "priceMax": 7475
                  },
                  {
                      "id": "ko_s_2",
                      "name": "설빙 인절미 팥빙수",
                      "rarity": 3,
                      "type": "Bingsu",
                      "image": "images/regional/ko/ko_s_2.webp",
                      "desc": "Núi tuyết sữa mịn màng phủ kín bột đậu nành rang thơm bùi, bánh dẻo injeolmi và hạnh nhân lát giòn rụm.",
                      "calories": 387,
                      "tags": [
                          "설빙 인절미 팥빙수",
                          "snacks",
                          "ko"
                      ],
                      "price": 9500,
                      "priceRange": [
                          8075,
                          10925
                      ],
                      "priceMin": 8075,
                      "priceMax": 10925
                  },
                  {
                      "id": "ko_s_3",
                      "name": "달콤 꿀 호떡",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_s_3.webp",
                      "desc": "Bánh rán giòn vỏ dẻo ruột, cắn ngập dòng mật đường nâu quế hạt óc chó chảy tràn ngọt ngào.",
                      "calories": 424,
                      "tags": [
                          "달콤 꿀 호떡",
                          "snacks",
                          "ko"
                      ],
                      "price": 2500,
                      "priceRange": [
                          2125,
                          2875
                      ],
                      "priceMin": 2125,
                      "priceMax": 2875
                  },
                  {
                      "id": "ko_s_4",
                      "name": "슈크림 붕어빵",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_s_4.webp",
                      "desc": "Ba chú cá nướng giòn rụm nhân kem trứng sữa ngọt thơm béo ngậy, món ăn vặt ấm áp mùa đông.",
                      "calories": 461,
                      "tags": [
                          "슈크림 붕어빵",
                          "snacks",
                          "ko"
                      ],
                      "price": 2500,
                      "priceRange": [
                          2125,
                          2875
                      ],
                      "priceMin": 2125,
                      "priceMax": 2875
                  },
                  {
                      "id": "ko_s_5",
                      "name": "전통 약과",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/ko/ko_s_5.webp",
                      "desc": "Bánh quy chiên tẩm mật ong quế và rượu gạo mềm dẻo ngọt ngào, món bánh hoàng gia triều đại Joseon.",
                      "calories": 498,
                      "tags": [
                          "전통 약과",
                          "snacks",
                          "ko"
                      ],
                      "price": 2000,
                      "priceRange": [
                          1700,
                          2300
                      ],
                      "priceMin": 1700,
                      "priceMax": 2300
                  },
                  {
                      "id": "ko_s_6",
                      "name": "추억의 달고나",
                      "rarity": 3,
                      "type": "Kẹo",
                      "image": "images/regional/ko/ko_s_6.webp",
                      "desc": "Miếng kẹo đường thắng baking soda xốp giòn thơm mùi caramel in hình ngôi sao trái tim quen thuộc.",
                      "calories": 535,
                      "tags": [
                          "추억의 달고나",
                          "snacks",
                          "ko"
                      ],
                      "price": 1500,
                      "priceRange": [
                          1275,
                          1725
                      ],
                      "priceMin": 1275,
                      "priceMax": 1725
                  },
                  {
                      "id": "ko_s_7",
                      "name": "수박 화채",
                      "rarity": 3,
                      "type": "Chè",
                      "image": "images/regional/ko/ko_s_7.webp",
                      "desc": "Thố dưa hấu mát lạnh dầm cùng dâu tây, sữa tươi béo ngậy và nước ngọt có ga sủi bọt mát lạnh.",
                      "calories": 572,
                      "tags": [
                          "수박 화채",
                          "snacks",
                          "ko"
                      ],
                      "price": 8000,
                      "priceRange": [
                          6800,
                          9200
                      ],
                      "priceMin": 6800,
                      "priceMax": 9200
                  }
              ]
          },
          "drinks": {
              "id": "drinks",
              "name": "한국 음료",
              "title": "시원하고 개운한 K-음료",
              "bannerName": "전통 음료와 국민 커피",
              "subtitle": "아이스 아메리카노, 바나나우유, 달콤한 식혜 한 잔",
              "featured5Star": "빙그레 단지 바나나맛 우유",
              "bannerImage": "images/do_uong/tra_sua.webp",
              "theme": "drinks",
              "dishes": [
                  {
                      "id": "ko_dr_1",
                      "name": "빙그레 단지 바나나맛 우유",
                      "rarity": 3,
                      "type": "Sữa",
                      "image": "images/regional/ko/ko_dr_1.webp",
                      "desc": "Hũ sữa chuối vàng biểu tượng ngọt ngào hương chuối ngậy sữa gắn liền với tuổi thơ mọi người Hàn.",
                      "calories": 350,
                      "tags": [
                          "빙그레 단지 바나나맛 우유",
                          "drinks",
                          "ko"
                      ],
                      "price": 1800,
                      "priceRange": [
                          1530,
                          2070
                      ],
                      "priceMin": 1530,
                      "priceMax": 2070
                  },
                  {
                      "id": "ko_dr_2",
                      "name": "아이스 아메리카노",
                      "rarity": 3,
                      "type": "Cà",
                      "image": "images/regional/ko/ko_dr_2.webp",
                      "desc": "Cốc cà phê đen đá đậm đà sảng khoái mà người Hàn uống quanh năm bất chấp tuyết rơi.",
                      "calories": 387,
                      "tags": [
                          "아이스 아메리카노",
                          "drinks",
                          "ko"
                      ],
                      "price": 3500,
                      "priceRange": [
                          2975,
                          4025
                      ],
                      "priceMin": 2975,
                      "priceMax": 4025
                  },
                  {
                      "id": "ko_dr_3",
                      "name": "살얼음 전통 식혜",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ko/ko_dr_3.webp",
                      "desc": "Nước gạo ủ mầm lúa mạch thanh mát giải nhiệt, ngọt dịu điểm hạt cơm gạo dẻo và hạt thông bùi.",
                      "calories": 424,
                      "tags": [
                          "살얼음 전통 식혜",
                          "drinks",
                          "ko"
                      ],
                      "price": 2500,
                      "priceRange": [
                          2125,
                          2875
                      ],
                      "priceMin": 2125,
                      "priceMax": 2875
                  },
                  {
                      "id": "ko_dr_4",
                      "name": "계피 곶감 수정과",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ko/ko_dr_4.webp",
                      "desc": "Thức uống truyền thống nấu từ quế, gừng thơm lừng và quả hồng khô ngâm mềm ngọt ấm bụng.",
                      "calories": 461,
                      "tags": [
                          "계피 곶감 수정과",
                          "drinks",
                          "ko"
                      ],
                      "price": 3000,
                      "priceRange": [
                          2550,
                          3450
                      ],
                      "priceMin": 2550,
                      "priceMax": 3450
                  },
                  {
                      "id": "ko_dr_5",
                      "name": "고흥 꿀 유자차",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/ko/ko_dr_5.webp",
                      "desc": "Trà vỏ quả thanh yên ngào mật ong thơm nức mũi, vị chua ngọt thanh nhẹ giúp ấm họng.",
                      "calories": 498,
                      "tags": [
                          "고흥 꿀 유자차",
                          "drinks",
                          "ko"
                      ],
                      "price": 4000,
                      "priceRange": [
                          3400,
                          4600
                      ],
                      "priceMin": 3400,
                      "priceMax": 4600
                  },
                  {
                      "id": "ko_dr_6",
                      "name": "부드러운 탄산 밀키스",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/ko/ko_dr_6.webp",
                      "desc": "Thức uống giải khát độc đáo kết hợp giữa sữa chua ngọt dịu và bọt ga sủi bọt sảng khoái.",
                      "calories": 535,
                      "tags": [
                          "부드러운 탄산 밀키스",
                          "drinks",
                          "ko"
                      ],
                      "price": 1800,
                      "priceRange": [
                          1530,
                          2070
                      ],
                      "priceMin": 1530,
                      "priceMax": 2070
                  },
                  {
                      "id": "ko_dr_7",
                      "name": "참이슬 소주",
                      "rarity": 3,
                      "type": "Rượu",
                      "image": "images/regional/ko/ko_dr_7.webp",
                      "desc": "Chai rượu quốc dân êm dịu trong suốt 16 độ cồn, không thể thiếu trên bàn tiệc thịt nướng BBQ.",
                      "calories": 572,
                      "tags": [
                          "참이슬 소주",
                          "drinks",
                          "ko"
                      ],
                      "price": 4500,
                      "priceRange": [
                          3825,
                          5175
                      ],
                      "priceMin": 3825,
                      "priceMax": 5175
                  },
                  {
                      "id": "ko_dr_8",
                      "name": "달콤한 생막걸리",
                      "rarity": 3,
                      "type": "Rượu",
                      "image": "images/regional/ko/ko_dr_8.webp",
                      "desc": "Bát rượu gạo trắng đục sủi tăm vị ngọt chua dịu êm, uống cùng bánh xèo hải sản trời mưa.",
                      "calories": 609,
                      "tags": [
                          "달콤한 생막걸리",
                          "drinks",
                          "ko"
                      ],
                      "price": 5000,
                      "priceRange": [
                          4250,
                          5750
                      ],
                      "priceMin": 4250,
                      "priceMax": 5750
                  }
              ]
          }
      },
  zh: {
          "morning": {
              "id": "morning",
              "name": "早餐",
              "title": "今天早晨吃点什么？",
              "bannerName": "地道经典的传统早点",
              "subtitle": "热气腾腾的小笼包、金黄酥脆的煎饼果子唤醒元气早晨",
              "featured5Star": "天津正宗煎饼果子",
              "bannerImage": "images/buoi_sang/pho_bo.webp",
              "theme": "morning",
              "dishes": [
                  {
                      "id": "zh_m_1",
                      "name": "天津正宗煎饼果子",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_m_1.webp",
                      "desc": "Bánh tráng bột đậu xanh quết trứng gà, sốt tương ngọt mè cay, kẹp bánh quẩy giòn tan giòn rụm.",
                      "calories": 350,
                      "tags": [
                          "天津正宗煎饼果子",
                          "morning",
                          "zh"
                      ],
                      "price": 12,
                      "priceRange": [
                          10,
                          14
                      ],
                      "priceMin": 10,
                      "priceMax": 14
                  },
                  {
                      "id": "zh_m_2",
                      "name": "上海灌汤小笼包",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_m_2.webp",
                      "desc": "Xửng tre bốc khói 6 chiếc bánh bao vỏ mỏng như lụa, cắn nhẹ tràn trề dòng súp thịt heo ngọt lịm.",
                      "calories": 387,
                      "tags": [
                          "上海灌汤小笼包",
                          "morning",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_m_3",
                      "name": "老上海生煎包",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_m_3.webp",
                      "desc": "Bánh bao nhân thịt băm mọng nước chiên cháy đáy vàng ruộm giòn tan, rắc mè đen và hành hoa.",
                      "calories": 424,
                      "tags": [
                          "老上海生煎包",
                          "morning",
                          "zh"
                      ],
                      "price": 15,
                      "priceRange": [
                          13,
                          17
                      ],
                      "priceMin": 13,
                      "priceMax": 17
                  },
                  {
                      "id": "zh_m_4",
                      "name": "武汉热干面",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/zh/zh_m_4.webp",
                      "desc": "Mì kiềm trụng chín tới trộn đều sốt mè rang đen sánh đặc, dầu ớt cay, củ cải muối và đậu phộng rang.",
                      "calories": 461,
                      "tags": [
                          "武汉热干面",
                          "morning",
                          "zh"
                      ],
                      "price": 10,
                      "priceRange": [
                          8,
                          12
                      ],
                      "priceMin": 8,
                      "priceMax": 12
                  },
                  {
                      "id": "zh_m_5",
                      "name": "现磨醇豆浆配金黄油条",
                      "rarity": 3,
                      "type": "Sữa",
                      "image": "images/regional/zh/zh_m_5.webp",
                      "desc": "Bát sữa đậu nành tươi thơm phức chấm thanh quẩy dài vàng giòn rụm ráo dầu truyền thống.",
                      "calories": 498,
                      "tags": [
                          "现磨醇豆浆配金黄油条",
                          "morning",
                          "zh"
                      ],
                      "price": 8,
                      "priceRange": [
                          7,
                          9
                      ],
                      "priceMin": 7,
                      "priceMax": 9
                  },
                  {
                      "id": "zh_m_6",
                      "name": "广式皮蛋瘦肉粥",
                      "rarity": 3,
                      "type": "Cháo",
                      "image": "images/regional/zh/zh_m_6.webp",
                      "desc": "Cháo hoa nấu nhừ sánh mịn từ gạo thơm, thịt nạc ướp gừng và từng miếng trứng bắc thảo bùi béo.",
                      "calories": 535,
                      "tags": [
                          "广式皮蛋瘦肉粥",
                          "morning",
                          "zh"
                      ],
                      "price": 14,
                      "priceRange": [
                          12,
                          16
                      ],
                      "priceMin": 12,
                      "priceMax": 16
                  },
                  {
                      "id": "zh_m_7",
                      "name": "潮汕牛肉粿条",
                      "rarity": 3,
                      "type": "地道面食",
                      "image": "images/regional/zh/zh_m_7.webp",
                      "desc": "Bát hủ tiếu bánh mềm mượt chan nước súp xương bò hầm thanh ngọt, thịt bắp bò tái mềm và bò viên giòn sần sật.",
                      "calories": 572,
                      "tags": [
                          "粿条",
                          "牛肉",
                          "潮汕",
                          "早餐"
                      ],
                      "price": 22,
                      "priceRange": [
                          18,
                          26
                      ],
                      "priceMin": 18,
                      "priceMax": 26
                  },
                  {
                      "id": "zh_m_8",
                      "name": "广式豉汁蒸排骨",
                      "rarity": 4,
                      "type": "Sườn",
                      "image": "images/regional/zh/zh_m_8.webp",
                      "desc": "Từng miếng sườn sụn non chặt nhỏ ướp hạt tàu xì đen thơm lừng, ớt sừng và bột năng hấp mềm mọng.",
                      "calories": 609,
                      "tags": [
                          "广式豉汁蒸排骨",
                          "morning",
                          "zh"
                      ],
                      "price": 20,
                      "priceRange": [
                          17,
                          23
                      ],
                      "priceMin": 17,
                      "priceMax": 23
                  }
              ]
          },
          "lunch": {
              "id": "lunch",
              "name": "午餐",
              "title": "午饭时间吃什么？",
              "bannerName": "大江南北的人气美味",
              "subtitle": "兰州牛肉面、正宗麻婆豆腐、广式叉烧饭等开胃午餐",
              "featured5Star": "兰州正宗牛肉拉面",
              "bannerImage": "images/buoi_trua/com_tam.webp",
              "theme": "lunch",
              "dishes": [
                  {
                      "id": "zh_l_1",
                      "name": "兰州正宗牛肉拉面",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/zh/zh_l_1.webp",
                      "desc": "Sợi mì kéo tay dẻo dai, nước súp bò trong veo ngọt lịm, ớt đỏ, củ cải trắng và hành ngò xanh ngát.",
                      "calories": 350,
                      "tags": [
                          "兰州正宗牛肉拉面",
                          "lunch",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_l_2",
                      "name": "陕西老潼关肉夹馍",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_l_2.webp",
                      "desc": "Vỏ bánh ngàn lớp nướng giòn rụm kẹp đầy thịt ba chỉ kho 30 vị thuốc bắc mềm rục béo ngậy.",
                      "calories": 387,
                      "tags": [
                          "陕西老潼关肉夹馍",
                          "lunch",
                          "zh"
                      ],
                      "price": 16,
                      "priceRange": [
                          14,
                          18
                      ],
                      "priceMin": 14,
                      "priceMax": 18
                  },
                  {
                      "id": "zh_l_3",
                      "name": "正宗四川麻婆豆腐",
                      "rarity": 3,
                      "type": "Đậu",
                      "image": "images/regional/zh/zh_l_3.webp",
                      "desc": "Từng miếng đậu non mềm mượt đắm chìm trong sốt thịt bò băm, ớt cay xé và hạt hoa tiêu tê rần đầu lưỡi.",
                      "calories": 424,
                      "tags": [
                          "正宗四川麻婆豆腐",
                          "lunch",
                          "zh"
                      ],
                      "price": 22,
                      "priceRange": [
                          19,
                          25
                      ],
                      "priceMin": 19,
                      "priceMax": 25
                  },
                  {
                      "id": "zh_l_4",
                      "name": "宫保鸡丁盖浇饭",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/zh/zh_l_4.webp",
                      "desc": "Thịt đùi gà cắt hạt lựu xào lửa lớn với ớt khô, hành baro và đậu phộng giòn tan sốt chua ngọt cay.",
                      "calories": 461,
                      "tags": [
                          "宫保鸡丁盖浇饭",
                          "lunch",
                          "zh"
                      ],
                      "price": 25,
                      "priceRange": [
                          21,
                          29
                      ],
                      "priceMin": 21,
                      "priceMax": 29
                  },
                  {
                      "id": "zh_l_5",
                      "name": "广式蜜汁叉烧饭",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/zh/zh_l_5.webp",
                      "desc": "Từng lát thịt xá xíu nướng mật ong mềm mọng óng ả màu cánh gián, rưới sốt ngọt ăn cùng cơm trắng.",
                      "calories": 498,
                      "tags": [
                          "广式蜜汁叉烧饭",
                          "lunch",
                          "zh"
                      ],
                      "price": 26,
                      "priceRange": [
                          22,
                          30
                      ],
                      "priceMin": 22,
                      "priceMax": 30
                  },
                  {
                      "id": "zh_l_6",
                      "name": "广式水晶虾饺皇",
                      "rarity": 3,
                      "type": "Há",
                      "image": "images/regional/zh/zh_l_6.webp",
                      "desc": "Lớp vỏ bột tàn mì trong suốt nhìn thấu 3 con tôm sú tươi hồng hào giòn ngọt bên trong.",
                      "calories": 535,
                      "tags": [
                          "广式水晶虾饺皇",
                          "lunch",
                          "zh"
                      ],
                      "price": 22,
                      "priceRange": [
                          19,
                          25
                      ],
                      "priceMin": 19,
                      "priceMax": 25
                  },
                  {
                      "id": "zh_l_7",
                      "name": "陕西麻辣凉皮",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/zh/zh_l_7.webp",
                      "desc": "Những sợi mì trắng trong mềm dai trộn dưa chuột giòn, mì căn gluten và sốt giấm ớt thơm nồng.",
                      "calories": 572,
                      "tags": [
                          "陕西麻辣凉皮",
                          "lunch",
                          "zh"
                      ],
                      "price": 14,
                      "priceRange": [
                          12,
                          16
                      ],
                      "priceMin": 12,
                      "priceMax": 16
                  },
                  {
                      "id": "zh_l_8",
                      "name": "柳州原汤螺蛳粉",
                      "rarity": 3,
                      "type": "Bún",
                      "image": "images/regional/zh/zh_l_8.webp",
                      "desc": "Bát bún chua cay nồng nặc mùi măng chua đặc trưng, tàu hũ ky chiên phồng, đậu phộng rang và ốc.",
                      "calories": 609,
                      "tags": [
                          "柳州原汤螺蛳粉",
                          "lunch",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_l_9",
                      "name": "东北老式锅包肉",
                      "rarity": 3,
                      "type": "Thịt",
                      "image": "images/regional/zh/zh_l_9.webp",
                      "desc": "Những lát thăn heo mỏng tẩm bột khoai tây chiên phồng xốp giòn tan áo lớp sốt giấm đường gừng tỏi.",
                      "calories": 646,
                      "tags": [
                          "东北老式锅包肉",
                          "lunch",
                          "zh"
                      ],
                      "price": 35,
                      "priceRange": [
                          30,
                          40
                      ],
                      "priceMin": 30,
                      "priceMax": 40
                  },
                  {
                      "id": "zh_l_10",
                      "name": "重庆麻辣小面",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/zh/zh_l_10.webp",
                      "desc": "Bát mì chan ngập dầu ớt đỏ tươi thơm nức mè rang, hoa tiêu tê đầu lưỡi và cải thìa xanh giòn.",
                      "calories": 683,
                      "tags": [
                          "重庆麻辣小面",
                          "lunch",
                          "zh"
                      ],
                      "price": 15,
                      "priceRange": [
                          13,
                          17
                      ],
                      "priceMin": 13,
                      "priceMax": 17
                  },
                  {
                      "id": "zh_l_11",
                      "name": "扬州经典蛋炒饭",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/zh/zh_l_11.webp",
                      "desc": "Cơm hạt tơi vàng óng chiên đều tay cùng tôm tươi, lạp xưởng, đậu hà lan, bắp ngọt và trứng gà.",
                      "calories": 370,
                      "tags": [
                          "扬州经典蛋炒饭",
                          "lunch",
                          "zh"
                      ],
                      "price": 24,
                      "priceRange": [
                          20,
                          28
                      ],
                      "priceMin": 20,
                      "priceMax": 28
                  },
                  {
                      "id": "zh_l_12",
                      "name": "新疆手抓羊肉饭",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/zh/zh_l_12.webp",
                      "desc": "Cơm nấu cùng thịt cừu non thơm mềm, cà rốt vàng ngọt lịm và nho khô chua ngọt đậm chất thảo nguyên.",
                      "calories": 407,
                      "tags": [
                          "新疆手抓羊肉饭",
                          "lunch",
                          "zh"
                      ],
                      "price": 32,
                      "priceRange": [
                          27,
                          37
                      ],
                      "priceMin": 27,
                      "priceMax": 37
                  }
              ]
          },
          "afternoon": {
              "id": "afternoon",
              "name": "下午茶与小吃",
              "title": "午后解馋特色小吃",
              "bannerName": "舌尖上的街头烟火气",
              "subtitle": "港式鸡蛋仔、冰糖葫芦、长沙臭豆腐等不可错过的风味",
              "featured5Star": "港式香脆鸡蛋仔",
              "bannerImage": "images/buoi_chieu/banh_xeo.webp",
              "theme": "afternoon",
              "dishes": [
                  {
                      "id": "zh_a_1",
                      "name": "港式香脆鸡蛋仔",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_a_1.webp",
                      "desc": "Vỉ bánh hình tổ ong tròn như quả trứng gà nướng bơ sữa thơm phức, ngoài giòn tan trong mềm xốp.",
                      "calories": 350,
                      "tags": [
                          "港式香脆鸡蛋仔",
                          "afternoon",
                          "zh"
                      ],
                      "price": 15,
                      "priceRange": [
                          13,
                          17
                      ],
                      "priceMin": 13,
                      "priceMax": 17
                  },
                  {
                      "id": "zh_a_2",
                      "name": "老北京冰糖葫芦",
                      "rarity": 3,
                      "type": "Kẹo",
                      "image": "images/regional/zh/zh_a_2.webp",
                      "desc": "Xiên quả táo gai đỏ au bọc lớp áo đường mạch nha cứng giòn tan, vị chua ngọt kích thích vị giác.",
                      "calories": 387,
                      "tags": [
                          "老北京冰糖葫芦",
                          "afternoon",
                          "zh"
                      ],
                      "price": 10,
                      "priceRange": [
                          8,
                          12
                      ],
                      "priceMin": 8,
                      "priceMax": 12
                  },
                  {
                      "id": "zh_a_3",
                      "name": "长沙正宗黑金臭豆腐",
                      "rarity": 3,
                      "type": "Đậu",
                      "image": "images/regional/zh/zh_a_3.webp",
                      "desc": "Miếng đậu phụ thối đen chiên phồng xốp rưới đẫm nước sốt ớt cay nồng, tỏi băm và rau mùi đậm đà.",
                      "calories": 424,
                      "tags": [
                          "长沙正宗黑金臭豆腐",
                          "afternoon",
                          "zh"
                      ],
                      "price": 12,
                      "priceRange": [
                          10,
                          14
                      ],
                      "priceMin": 10,
                      "priceMax": 14
                  },
                  {
                      "id": "zh_a_4",
                      "name": "哈尔滨经典烤冷面",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/zh/zh_a_4.webp",
                      "desc": "Tấm mì nướng trên bàn là nóng, đập trứng gà, kẹp xúc xích rưới đẫm sốt chua ngọt cay đậm đà.",
                      "calories": 461,
                      "tags": [
                          "哈尔滨经典烤冷面",
                          "afternoon",
                          "zh"
                      ],
                      "price": 13,
                      "priceRange": [
                          11,
                          15
                      ],
                      "priceMin": 11,
                      "priceMax": 15
                  },
                  {
                      "id": "zh_a_5",
                      "name": "乐山钵钵鸡串串香",
                      "rarity": 3,
                      "type": "Xiên",
                      "image": "images/regional/zh/zh_a_5.webp",
                      "desc": "Thố sứ ngập tràn xiên que thịt gà, mề gà, rau củ ngâm trong dầu ớt đỏ tươi rắc dày đặc mè rang.",
                      "calories": 498,
                      "tags": [
                          "乐山钵钵鸡串串香",
                          "afternoon",
                          "zh"
                      ],
                      "price": 25,
                      "priceRange": [
                          21,
                          29
                      ],
                      "priceMin": 21,
                      "priceMax": 29
                  },
                  {
                      "id": "zh_a_6",
                      "name": "陕西肉汁潼关千层烧饼",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_a_6.webp",
                      "desc": "Bánh nướng lò than ngàn lớp vỏ giòn vụn thơm lừng mùi bơ mè, cắn vào xốp mềm nóng bỏng.",
                      "calories": 535,
                      "tags": [
                          "陕西肉汁潼关千层烧饼",
                          "afternoon",
                          "zh"
                      ],
                      "price": 8,
                      "priceRange": [
                          7,
                          9
                      ],
                      "priceMin": 7,
                      "priceMax": 9
                  },
                  {
                      "id": "zh_a_7",
                      "name": "广东顺德炸牛奶",
                      "rarity": 3,
                      "type": "Sữa",
                      "image": "images/regional/zh/zh_a_7.webp",
                      "desc": "Từng thỏi sữa đặc đông lạnh lăn bột chiên giòn rụm bên ngoài, cắn vào nhân kem sữa chảy ngọt ngào.",
                      "calories": 572,
                      "tags": [
                          "广东顺德炸牛奶",
                          "afternoon",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_a_8",
                      "name": "四川红油抄手",
                      "rarity": 3,
                      "type": "Hoành",
                      "image": "images/regional/zh/zh_a_8.webp",
                      "desc": "Từng viên hoành thánh vỏ mỏng tơ lụa nhân tôm thịt đậm đà tắm mình trong thố dầu ớt hoa tiêu tê cay.",
                      "calories": 609,
                      "tags": [
                          "四川红油抄手",
                          "afternoon",
                          "zh"
                      ],
                      "price": 16,
                      "priceRange": [
                          14,
                          18
                      ],
                      "priceMin": 14,
                      "priceMax": 18
                  },
                  {
                      "id": "zh_a_9",
                      "name": "老北京炸酱面",
                      "rarity": 3,
                      "type": "经典面食",
                      "image": "images/regional/zh/zh_a_9.webp",
                      "desc": "Sợi mì tươi trụng dai giòn trộn đẫm sốt tương ngọt xào thịt ba chỉ băm, ăn kèm dưa leo và giá đỗ giòn ngọt.",
                      "calories": 646,
                      "tags": [
                          "炸酱面",
                          "北京",
                          "面条",
                          "老字号"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          22
                      ],
                      "priceMin": 15,
                      "priceMax": 22
                  },
                  {
                      "id": "zh_a_10",
                      "name": "潮汕脆皮虾枣",
                      "rarity": 4,
                      "type": "Chả",
                      "image": "images/regional/zh/zh_a_10.webp",
                      "desc": "Chả tôm tươi giã tay trộn củ năng giòn ngọt chiên phồng vàng ruộm, chấm sốt quất chua ngọt.",
                      "calories": 683,
                      "tags": [
                          "潮汕脆皮虾枣",
                          "afternoon",
                          "zh"
                      ],
                      "price": 22,
                      "priceRange": [
                          19,
                          25
                      ],
                      "priceMin": 19,
                      "priceMax": 25
                  }
              ]
          },
          "dinner": {
              "id": "dinner",
              "name": "晚餐盛宴",
              "title": "今晚吃一顿丰盛盛宴",
              "bannerName": "中华传统八大菜系",
              "subtitle": "老北京烤鸭、四川麻辣火锅、富贵东坡肉等珍馐佳肴",
              "featured5Star": "北京正宗挂炉烤鸭",
              "bannerImage": "images/buoi_toi/bbq_nuong.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "zh_d_1",
                      "name": "北京正宗挂炉烤鸭",
                      "rarity": 5,
                      "type": "Vịt",
                      "image": "images/regional/zh/zh_d_1.webp",
                      "desc": "Miếng da vịt nướng lu vàng óng giòn tan chấm đường cát, thịt vịt mềm ngọt cuốn bánh tráng mỏng.",
                      "calories": 350,
                      "tags": [
                          "北京正宗挂炉烤鸭",
                          "dinner",
                          "zh"
                      ],
                      "price": 68,
                      "priceRange": [
                          58,
                          78
                      ],
                      "priceMin": 58,
                      "priceMax": 78
                  },
                  {
                      "id": "zh_d_2",
                      "name": "四川老灶九宫格牛油火锅",
                      "rarity": 5,
                      "type": "Lẩu",
                      "image": "images/regional/zh/zh_d_2.webp",
                      "desc": "Nồi lẩu đồng đỏ 9 ngăn sôi sùng sục dầu bò hoa tiêu cay xé lưỡi, nhúng dạ sách bò, ruột vịt giòn rụm.",
                      "calories": 387,
                      "tags": [
                          "四川老灶九宫格牛油火锅",
                          "dinner",
                          "zh"
                      ],
                      "price": 88,
                      "priceRange": [
                          75,
                          101
                      ],
                      "priceMin": 75,
                      "priceMax": 101
                  },
                  {
                      "id": "zh_d_3",
                      "name": "广式皇上皇腊味煲仔饭",
                      "rarity": 3,
                      "type": "Cơm",
                      "image": "images/regional/zh/zh_d_3.webp",
                      "desc": "Cơm niêu đất tạo lớp cháy vàng ươm giòn rụm, xếp ngập lạp xưởng Mai Quế Lộ rưới nước tương ngọt.",
                      "calories": 424,
                      "tags": [
                          "广式皇上皇腊味煲仔饭",
                          "dinner",
                          "zh"
                      ],
                      "price": 28,
                      "priceRange": [
                          24,
                          32
                      ],
                      "priceMin": 24,
                      "priceMax": 32
                  },
                  {
                      "id": "zh_d_4",
                      "name": "杭州西湖东坡肉",
                      "rarity": 3,
                      "type": "Thịt",
                      "image": "images/regional/zh/zh_d_4.webp",
                      "desc": "Khối thịt ba chỉ vuông vức chưng rượu Thiệu Hưng và xì dầu đỏ au óng ả, bì mềm tan như thạch.",
                      "calories": 461,
                      "tags": [
                          "杭州西湖东坡肉",
                          "dinner",
                          "zh"
                      ],
                      "price": 38,
                      "priceRange": [
                          32,
                          44
                      ],
                      "priceMin": 32,
                      "priceMax": 44
                  },
                  {
                      "id": "zh_d_5",
                      "name": "重庆酸菜水煮鱼",
                      "rarity": 3,
                      "type": "Cá",
                      "image": "images/regional/zh/zh_d_5.webp",
                      "desc": "Những lát cá phi lê trắng nõn mềm ngọt bơi trong tô nước dùng nấu cải chua cay tê nồng hoa tiêu.",
                      "calories": 498,
                      "tags": [
                          "重庆酸菜水煮鱼",
                          "dinner",
                          "zh"
                      ],
                      "price": 45,
                      "priceRange": [
                          38,
                          52
                      ],
                      "priceMin": 38,
                      "priceMax": 52
                  },
                  {
                      "id": "zh_d_6",
                      "name": "正宗富贵叫花鸡",
                      "rarity": 3,
                      "type": "Gà",
                      "image": "images/regional/zh/zh_d_6.webp",
                      "desc": "Con gà ta ướp nấm hương gia vị bọc kín trong lá sen và đất sét nướng củi thơm phức thịt mềm ngọt.",
                      "calories": 535,
                      "tags": [
                          "正宗富贵叫花鸡",
                          "dinner",
                          "zh"
                      ],
                      "price": 58,
                      "priceRange": [
                          49,
                          67
                      ],
                      "priceMin": 49,
                      "priceMax": 67
                  },
                  {
                      "id": "zh_d_7",
                      "name": "无锡酱排骨",
                      "rarity": 4,
                      "type": "Sườn",
                      "image": "images/regional/zh/zh_d_7.webp",
                      "desc": "Dẻ sườn heo om đường phèn và nước tương đỏ óng ả màu hồng ngọc, thịt mềm róc xương ngọt ngào.",
                      "calories": 572,
                      "tags": [
                          "无锡酱排骨",
                          "dinner",
                          "zh"
                      ],
                      "price": 48,
                      "priceRange": [
                          41,
                          55
                      ],
                      "priceMin": 41,
                      "priceMax": 55
                  },
                  {
                      "id": "zh_d_8",
                      "name": "湖南剁椒鱼头",
                      "rarity": 3,
                      "type": "Đầu",
                      "image": "images/regional/zh/zh_d_8.webp",
                      "desc": "Nửa chiếc đầu cá mè hoa khổng lồ hấp chín tới phủ kín lớp ớt ngâm chua cay nồng nàn đưa cơm.",
                      "calories": 609,
                      "tags": [
                          "湖南剁椒鱼头",
                          "dinner",
                          "zh"
                      ],
                      "price": 52,
                      "priceRange": [
                          44,
                          60
                      ],
                      "priceMin": 44,
                      "priceMax": 60
                  },
                  {
                      "id": "zh_d_9",
                      "name": "西安羊肉泡馍",
                      "rarity": 4,
                      "type": "Canh",
                      "image": "images/regional/zh/zh_d_9.webp",
                      "desc": "Tô súp cừu hầm thảo mộc thơm lừng chan ngập những mẩu bánh mì nướng bẻ tay dẻo quánh, ăn cùng tỏi ngâm.",
                      "calories": 646,
                      "tags": [
                          "西安羊肉泡馍",
                          "dinner",
                          "zh"
                      ],
                      "price": 36,
                      "priceRange": [
                          31,
                          41
                      ],
                      "priceMin": 31,
                      "priceMax": 41
                  },
                  {
                      "id": "zh_d_10",
                      "name": "佛跳墙",
                      "rarity": 3,
                      "type": "Súp",
                      "image": "images/regional/zh/zh_d_10.webp",
                      "desc": "Thố súp hoàng gia chưng 18 vị quý hiếm: vi cá, hải sâm, bào ngư, nấm đông cô, nước súp sánh đặc.",
                      "calories": 683,
                      "tags": [
                          "佛跳墙",
                          "dinner",
                          "zh"
                      ],
                      "price": 98,
                      "priceRange": [
                          83,
                          113
                      ],
                      "priceMin": 83,
                      "priceMax": 113
                  }
              ]
          },
          "snacks": {
              "id": "snacks",
              "name": "中式甜品与夜食",
              "title": "晚间美味与清润甜品",
              "bannerName": "温润身心的夜市滋味",
              "subtitle": "杨枝甘露、双皮奶、桂花冰汤圆等甜蜜抚慰",
              "featured5Star": "港式杨枝甘露",
              "bannerImage": "images/do_an_vat/ca_vien_chien.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "zh_s_1",
                      "name": "港式杨枝甘露",
                      "rarity": 3,
                      "type": "Chè",
                      "image": "images/regional/zh/zh_s_1.webp",
                      "desc": "Sốt xoài cát sánh mịn hòa nước cốt dừa thơm béo, tép bưởi hồng mọng nước và trân châu dẻo.",
                      "calories": 350,
                      "tags": [
                          "港式杨枝甘露",
                          "snacks",
                          "zh"
                      ],
                      "price": 20,
                      "priceRange": [
                          17,
                          23
                      ],
                      "priceMin": 17,
                      "priceMax": 23
                  },
                  {
                      "id": "zh_s_2",
                      "name": "顺德双皮奶",
                      "rarity": 3,
                      "type": "Sữa",
                      "image": "images/regional/zh/zh_s_2.webp",
                      "desc": "Sữa trâu tươi đun tạo hai lớp màng mịn màng béo ngậy như lụa, vị ngọt thanh mát lạnh.",
                      "calories": 387,
                      "tags": [
                          "顺德双皮奶",
                          "snacks",
                          "zh"
                      ],
                      "price": 15,
                      "priceRange": [
                          13,
                          17
                      ],
                      "priceMin": 13,
                      "priceMax": 17
                  },
                  {
                      "id": "zh_s_3",
                      "name": "成都老红糖糍粑冰粉",
                      "rarity": 3,
                      "type": "Thạch",
                      "image": "images/regional/zh/zh_s_3.webp",
                      "desc": "Bát thạch trong veo ướp đá rưới mật mía đường đen ngọt lịm, rắc bánh nếp chiên giòn và táo đỏ.",
                      "calories": 424,
                      "tags": [
                          "成都老红糖糍粑冰粉",
                          "snacks",
                          "zh"
                      ],
                      "price": 12,
                      "priceRange": [
                          10,
                          14
                      ],
                      "priceMin": 10,
                      "priceMax": 14
                  },
                  {
                      "id": "zh_s_4",
                      "name": "宁波黑芝麻汤圆",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_s_4.webp",
                      "desc": "Viên bánh trôi nếp dẻo quánh cắn ngập nhân mè đen đường phèn béo ngậy, chan nước gừng ấm áp.",
                      "calories": 461,
                      "tags": [
                          "宁波黑芝麻汤圆",
                          "snacks",
                          "zh"
                      ],
                      "price": 14,
                      "priceRange": [
                          12,
                          16
                      ],
                      "priceMin": 12,
                      "priceMax": 16
                  },
                  {
                      "id": "zh_s_5",
                      "name": "老北京杏仁豆腐",
                      "rarity": 3,
                      "type": "Đậu",
                      "image": "images/regional/zh/zh_s_5.webp",
                      "desc": "Từng khối thạch hạnh nhân trắng ngần mềm mịn tan trên đầu lưỡi, rưới siro hoa quế ngát hương.",
                      "calories": 498,
                      "tags": [
                          "老北京杏仁豆腐",
                          "snacks",
                          "zh"
                      ],
                      "price": 16,
                      "priceRange": [
                          14,
                          18
                      ],
                      "priceMin": 14,
                      "priceMax": 18
                  },
                  {
                      "id": "zh_s_6",
                      "name": "港式香芒班戟",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/zh/zh_s_6.webp",
                      "desc": "Lớp vỏ crepe vàng óng mỏng tang cuộn ngập kem tươi béo mịn và miếng xoài cát chín mọng ngọt lịm.",
                      "calories": 535,
                      "tags": [
                          "港式香芒班戟",
                          "snacks",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_s_7",
                      "name": "拔丝地瓜",
                      "rarity": 3,
                      "type": "Khoai",
                      "image": "images/regional/zh/zh_s_7.webp",
                      "desc": "Từng miếng khoai lang chiên vàng áo lớp mạch nha kéo sợi tơ vàng óng ánh, nhúng bát nước đá giòn rụm.",
                      "calories": 572,
                      "tags": [
                          "拔丝地瓜",
                          "snacks",
                          "zh"
                      ],
                      "price": 22,
                      "priceRange": [
                          19,
                          25
                      ],
                      "priceMin": 19,
                      "priceMax": 25
                  }
              ]
          },
          "drinks": {
              "id": "drinks",
              "name": "特色饮品",
              "title": "清凉解渴的人气茶饮",
              "bannerName": "中华茶饮与清爽特调",
              "subtitle": "手打柠檬茶、满杯多肉葡萄、港式丝袜奶茶等畅爽体验",
              "featured5Star": "手打鸭屎香柠檬茶",
              "bannerImage": "images/do_uong/tra_sua.webp",
              "theme": "drinks",
              "dishes": [
                  {
                      "id": "zh_dr_1",
                      "name": "手打鸭屎香柠檬茶",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/zh/zh_dr_1.webp",
                      "desc": "Chanh vàng giã tay dập tép hòa vào cốt trà ô long Vịt Cứt Hương thơm ngát sảng khoái ngày hè.",
                      "calories": 350,
                      "tags": [
                          "手打鸭屎香柠檬茶",
                          "drinks",
                          "zh"
                      ],
                      "price": 16,
                      "priceRange": [
                          14,
                          18
                      ],
                      "priceMin": 14,
                      "priceMax": 18
                  },
                  {
                      "id": "zh_dr_2",
                      "name": "正宗港式丝袜奶茶",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/zh/zh_dr_2.webp",
                      "desc": "Trà đen Ceylon ủ lọc qua túi vải đặc trưng tạo độ mịn sánh hòa cùng sữa đặc béo ngậy chuẩn vị Hồng Kông.",
                      "calories": 387,
                      "tags": [
                          "正宗港式丝袜奶茶",
                          "drinks",
                          "zh"
                      ],
                      "price": 16,
                      "priceRange": [
                          14,
                          18
                      ],
                      "priceMin": 14,
                      "priceMax": 18
                  },
                  {
                      "id": "zh_dr_3",
                      "name": "老北京冰镇酸梅汤",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/zh/zh_dr_3.webp",
                      "desc": "Quả ô mai mơ hun khói nấu táo gai và hoa quế, vị chua thanh ngọt hậu giải nhiệt ngày nóng.",
                      "calories": 424,
                      "tags": [
                          "老北京冰镇酸梅汤",
                          "drinks",
                          "zh"
                      ],
                      "price": 8,
                      "priceRange": [
                          7,
                          9
                      ],
                      "priceMin": 7,
                      "priceMax": 9
                  },
                  {
                      "id": "zh_dr_4",
                      "name": "芝士现萃铁观音",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/zh/zh_dr_4.webp",
                      "desc": "Cốt trà Thiết Quan Âm đậm vị chát ngọt phủ lớp kem cheese bồng bềnh mặn mặn béo ngậy.",
                      "calories": 461,
                      "tags": [
                          "芝士现萃铁观音",
                          "drinks",
                          "zh"
                      ],
                      "price": 18,
                      "priceRange": [
                          15,
                          21
                      ],
                      "priceMin": 15,
                      "priceMax": 21
                  },
                  {
                      "id": "zh_dr_5",
                      "name": "蜂蜜柚子茶",
                      "rarity": 3,
                      "type": "清爽茶饮",
                      "image": "images/regional/zh/zh_dr_5.webp",
                      "desc": "Tép bưởi hồng chín mọng ngào mật ong hoa rừng thơm lừng, vị chua ngọt thanh mát giàu vitamin C.",
                      "calories": 498,
                      "tags": [
                          "柚子茶",
                          "蜂蜜",
                          "清凉",
                          "茶饮"
                      ],
                      "price": 14,
                      "priceRange": [
                          12,
                          16
                      ],
                      "priceMin": 12,
                      "priceMax": 16
                  },
                  {
                      "id": "zh_dr_6",
                      "name": "王老吉凉茶",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/zh/zh_dr_6.webp",
                      "desc": "Lon trà thảo mộc 10 vị hoa cúc cam thảo giải nhiệt cơ thể khi ăn các món cay nóng lẩu nướng.",
                      "calories": 535,
                      "tags": [
                          "王老吉凉茶",
                          "drinks",
                          "zh"
                      ],
                      "price": 6,
                      "priceRange": [
                          5,
                          7
                      ],
                      "priceMin": 5,
                      "priceMax": 7
                  },
                  {
                      "id": "zh_dr_7",
                      "name": "青岛纯生啤酒",
                      "rarity": 3,
                      "type": "Bia",
                      "image": "images/regional/zh/zh_dr_7.webp",
                      "desc": "Dòng bia tươi mát làm từ nguồn nước suối ngọt núi Lao Sơn, vị đắng êm dịu bọt tuyết mịn màng.",
                      "calories": 572,
                      "tags": [
                          "青岛纯生啤酒",
                          "drinks",
                          "zh"
                      ],
                      "price": 8,
                      "priceRange": [
                          7,
                          9
                      ],
                      "priceMin": 7,
                      "priceMax": 9
                  },
                  {
                      "id": "zh_dr_8",
                      "name": "绍兴传统花雕花雕酒",
                      "rarity": 3,
                      "type": "Rượu",
                      "image": "images/regional/zh/zh_dr_8.webp",
                      "desc": "Bình gốm rượu nếp ủ 10 năm thơm nồng nàn sắc hổ phách, hâm ấm cùng vài sợi gừng tươi mùa đông.",
                      "calories": 609,
                      "tags": [
                          "绍兴传统花雕花雕酒",
                          "drinks",
                          "zh"
                      ],
                      "price": 25,
                      "priceRange": [
                          21,
                          29
                      ],
                      "priceMin": 21,
                      "priceMax": 29
                  }
              ]
          }
      },
  en: {
          "morning": {
              "id": "morning",
              "name": "Breakfast & Brunch",
              "title": "What are you craving this morning?",
              "bannerName": "Classic Morning Plates",
              "subtitle": "Fluffy buttermilk pancakes, avocado toast, and hearty eggs benedict",
              "featured5Star": "Full English Breakfast",
              "bannerImage": "images/buoi_sang/pho_bo.webp",
              "theme": "morning",
              "dishes": [
                  {
                      "id": "en_m_1",
                      "name": "Full English Breakfast",
                      "rarity": 3,
                      "type": "Bữa",
                      "image": "images/regional/en/en_m_1.webp",
                      "desc": "Đĩa ăn sáng khổng lồ: 2 xúc xích Cumberland, thịt xông khói, 2 trứng ốp la, đậu hầm, nấm xào, cà chua và bánh mì bơ.",
                      "calories": 350,
                      "tags": [
                          "Full English Breakfast",
                          "morning",
                          "en"
                      ],
                      "price": 14,
                      "priceRange": [
                          11.9,
                          16.1
                      ],
                      "priceMin": 11.9,
                      "priceMax": 16.1
                  },
                  {
                      "id": "en_m_2",
                      "name": "Fluffy Buttermilk Pancakes",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_m_2.webp",
                      "desc": "Chồng 3 tầng bánh pancake nướng vàng ươm xốp như mây, đặt miếng bơ tươi và rưới đẫm siro lá phong Canada.",
                      "calories": 387,
                      "tags": [
                          "Fluffy Buttermilk Pancakes",
                          "morning",
                          "en"
                      ],
                      "price": 11,
                      "priceRange": [
                          9.35,
                          12.65
                      ],
                      "priceMin": 9.35,
                      "priceMax": 12.65
                  },
                  {
                      "id": "en_m_3",
                      "name": "Classic Eggs Benedict",
                      "rarity": 3,
                      "type": "Trứng",
                      "image": "images/regional/en/en_m_3.webp",
                      "desc": "Bánh nướng xốp muffin kẹp thịt xông khói, quả trứng chần lòng đào núng nính rưới sốt bơ trứng vàng ươm.",
                      "calories": 424,
                      "tags": [
                          "Classic Eggs Benedict",
                          "morning",
                          "en"
                      ],
                      "price": 13,
                      "priceRange": [
                          11.05,
                          14.95
                      ],
                      "priceMin": 11.05,
                      "priceMax": 14.95
                  },
                  {
                      "id": "en_m_4",
                      "name": "Sourdough Avocado Toast",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_m_4.webp",
                      "desc": "Lát bánh mì sourdough nướng giòn rụm phết bơ sáp tươi nghiền, rắc ớt bột paprika và muối biển flakes.",
                      "calories": 461,
                      "tags": [
                          "Sourdough Avocado Toast",
                          "morning",
                          "en"
                      ],
                      "price": 10,
                      "priceRange": [
                          8.5,
                          11.5
                      ],
                      "priceMin": 8.5,
                      "priceMax": 11.5
                  },
                  {
                      "id": "en_m_5",
                      "name": "NYC Bagel with Lox",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_m_5.webp",
                      "desc": "Ổ bánh bagel nướng giòn vỏ dai ruột phết kem phô mai cream cheese, cá hồi xông khói lát mỏng và nụ bạch hoa.",
                      "calories": 498,
                      "tags": [
                          "NYC Bagel with Lox",
                          "morning",
                          "en"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  },
                  {
                      "id": "en_m_6",
                      "name": "Southern Chicken and Waffles",
                      "rarity": 4,
                      "type": "Gà",
                      "image": "images/regional/en/en_m_6.webp",
                      "desc": "Miếng đùi gà tẩm bột chiên giòn tan đặt trên bánh tổ ong waffle mềm xốp rưới mật ong ớt cay.",
                      "calories": 535,
                      "tags": [
                          "Southern Chicken and Waffles",
                          "morning",
                          "en"
                      ],
                      "price": 14,
                      "priceRange": [
                          11.9,
                          16.1
                      ],
                      "priceMin": 11.9,
                      "priceMax": 16.1
                  },
                  {
                      "id": "en_m_7",
                      "name": "Biscuits and Sausage Gravy",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_m_7.webp",
                      "desc": "Bánh biscuit nướng vỏ tách lớp ngập trong dòng sốt kem sữa nấu xúc xích tiêu đen thơm ngậy nồng ấm.",
                      "calories": 572,
                      "tags": [
                          "Biscuits and Sausage Gravy",
                          "morning",
                          "en"
                      ],
                      "price": 10,
                      "priceRange": [
                          8.5,
                          11.5
                      ],
                      "priceMin": 8.5,
                      "priceMax": 11.5
                  },
                  {
                      "id": "en_m_8",
                      "name": "Scottish Smoked Kippers & Poached Egg",
                      "rarity": 3,
                      "type": "Cá",
                      "image": "images/regional/en/en_m_8.webp",
                      "desc": "Cá trích phi lê hun khói nướng thơm mùi gỗ sồi ăn kèm trứng chần lòng đào và bánh mì lúa mạch đen.",
                      "calories": 609,
                      "tags": [
                          "Scottish Smoked Kippers & Poached Egg",
                          "morning",
                          "en"
                      ],
                      "price": 13,
                      "priceRange": [
                          11.05,
                          14.95
                      ],
                      "priceMin": 11.05,
                      "priceMax": 14.95
                  }
              ]
          },
          "lunch": {
              "id": "lunch",
              "name": "Lunch & Deli",
              "title": "What is on for lunch today?",
              "bannerName": "Deli Favorites & Comfort Bowls",
              "subtitle": "Double smash cheeseburgers, NY pepperoni pizza, and grilled panini",
              "featured5Star": "Original Philly Cheesesteak",
              "bannerImage": "images/buoi_trua/com_tam.webp",
              "theme": "lunch",
              "dishes": [
                  {
                      "id": "en_l_1",
                      "name": "Double Smash Cheeseburger",
                      "rarity": 4,
                      "type": "Burger",
                      "image": "images/regional/en/en_l_1.webp",
                      "desc": "2 viên bò Angus tươi đập dẹt trên chảo gang xèo xèo viền cháy giòn rụm, kẹp 2 lát phô mai cheddar tan chảy.",
                      "calories": 350,
                      "tags": [
                          "Double Smash Cheeseburger",
                          "lunch",
                          "en"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  },
                  {
                      "id": "en_l_2",
                      "name": "New York Pepperoni Pizza",
                      "rarity": 4,
                      "type": "Pizza",
                      "image": "images/regional/en/en_l_2.webp",
                      "desc": "Lát pizza New York cỡ đại đế mỏng nướng lò củi giòn tan, phủ đẫm sốt cà chua, mozzarella và xúc xích cay.",
                      "calories": 387,
                      "tags": [
                          "New York Pepperoni Pizza",
                          "lunch",
                          "en"
                      ],
                      "price": 14,
                      "priceRange": [
                          11.9,
                          16.1
                      ],
                      "priceMin": 11.9,
                      "priceMax": 16.1
                  },
                  {
                      "id": "en_l_3",
                      "name": "British Beer-Battered Fish & Chips",
                      "rarity": 3,
                      "type": "Cá",
                      "image": "images/regional/en/en_l_3.webp",
                      "desc": "Miếng phi lê cá tuyết nhúng bột bia chiên phồng vàng rụm, ăn kèm khoai tây chiên lát dày và sốt tartar chua béo.",
                      "calories": 424,
                      "tags": [
                          "British Beer-Battered Fish & Chips",
                          "lunch",
                          "en"
                      ],
                      "price": 15,
                      "priceRange": [
                          12.75,
                          17.25
                      ],
                      "priceMin": 12.75,
                      "priceMax": 17.25
                  },
                  {
                      "id": "en_l_4",
                      "name": "Original Philly Cheesesteak",
                      "rarity": 5,
                      "type": "Bánh",
                      "image": "images/regional/en/en_l_4.webp",
                      "desc": "Ổ bánh mì dài nướng giòn kẹp đầy thịt thăn bò thái mỏng xào hành tây ngọt lịm và phô mai Provolone béo ngậy.",
                      "calories": 461,
                      "tags": [
                          "Original Philly Cheesesteak",
                          "lunch",
                          "en"
                      ],
                      "price": 13,
                      "priceRange": [
                          11.05,
                          14.95
                      ],
                      "priceMin": 11.05,
                      "priceMax": 14.95
                  },
                  {
                      "id": "en_l_5",
                      "name": "Clam Chowder in Sourdough Bowl",
                      "rarity": 4,
                      "type": "Súp",
                      "image": "images/regional/en/en_l_5.webp",
                      "desc": "Súp nghêu nấu kem tươi béo ngậy, khoai tây thái hạt lựu đựng trong ổ bánh mì sourdough khoét ruột giòn tan.",
                      "calories": 498,
                      "tags": [
                          "Clam Chowder in Sourdough Bowl",
                          "lunch",
                          "en"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  },
                  {
                      "id": "en_l_6",
                      "name": "Maine Lobster Roll",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_l_6.webp",
                      "desc": "Ổ bánh brioche nướng bơ kẹp ngập thịt càng tôm hùm tươi ngọt chắc nịch trộn sốt mayo chanh tươi.",
                      "calories": 535,
                      "tags": [
                          "Maine Lobster Roll",
                          "lunch",
                          "en"
                      ],
                      "price": 22,
                      "priceRange": [
                          18.7,
                          25.3
                      ],
                      "priceMin": 18.7,
                      "priceMax": 25.3
                  },
                  {
                      "id": "en_l_7",
                      "name": "Nashville Hot Chicken Sandwich",
                      "rarity": 4,
                      "type": "Burger",
                      "image": "images/regional/en/en_l_7.webp",
                      "desc": "Miếng ức gà chiên giòn rụm áo lớp dầu ớt cayenne cay nồng rực lửa, kẹp dưa chuột muối chua giòn.",
                      "calories": 572,
                      "tags": [
                          "Nashville Hot Chicken Sandwich",
                          "lunch",
                          "en"
                      ],
                      "price": 13,
                      "priceRange": [
                          11.05,
                          14.95
                      ],
                      "priceMin": 11.05,
                      "priceMax": 14.95
                  },
                  {
                      "id": "en_l_8",
                      "name": "Classic Spaghetti Bolognese",
                      "rarity": 4,
                      "type": "Pasta & Mains",
                      "image": "images/regional/en/en_l_8.webp",
                      "desc": "Sợi mì Ý luộc al dente phủ đẫm sốt thịt bò băm nấu rượu vang cà chua hầm nhừ 4 tiếng và phô mai Parmesan bào.",
                      "calories": 609,
                      "tags": [
                          "pasta",
                          "spaghetti",
                          "bolognese",
                          "lunch"
                      ],
                      "price": 15,
                      "priceRange": [
                          12.75,
                          17.25
                      ],
                      "priceMin": 12.75,
                      "priceMax": 17.25
                  },
                  {
                      "id": "en_l_9",
                      "name": "Cobb Salad with Grilled Chicken",
                      "rarity": 3,
                      "type": "Salad",
                      "image": "images/regional/en/en_l_9.webp",
                      "desc": "Đĩa salad xếp hàng lối: ức gà nướng, thịt xông khói giòn, trứng luộc, quả bơ, cà chua bi và sốt blue cheese.",
                      "calories": 646,
                      "tags": [
                          "Cobb Salad with Grilled Chicken",
                          "lunch",
                          "en"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  },
                  {
                      "id": "en_l_10",
                      "name": "Pan-Seared Salmon with Asparagus",
                      "rarity": 4,
                      "type": "Seafood Plates",
                      "image": "images/regional/en/en_l_10.webp",
                      "desc": "Miếng phi lê cá hồi Đại Tây Dương da giòn thịt mềm ngậy rưới sốt bơ chanh tỏi và ngọn măng tây nướng giòn ngọt.",
                      "calories": 683,
                      "tags": [
                          "salmon",
                          "asparagus",
                          "healthy",
                          "lunch"
                      ],
                      "price": 22,
                      "priceRange": [
                          18.7,
                          25.3
                      ],
                      "priceMin": 18.7,
                      "priceMax": 25.3
                  },
                  {
                      "id": "en_l_11",
                      "name": "Classic BLT on Toasted Brioche",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_l_11.webp",
                      "desc": "3 lớp bánh mì brioche kẹp đầy thịt ba chỉ xông khói giòn rụm, cà chua đỏ mọng mọng nước và sốt mayo.",
                      "calories": 370,
                      "tags": [
                          "Classic BLT on Toasted Brioche",
                          "lunch",
                          "en"
                      ],
                      "price": 10,
                      "priceRange": [
                          8.5,
                          11.5
                      ],
                      "priceMin": 8.5,
                      "priceMax": 11.5
                  },
                  {
                      "id": "en_l_12",
                      "name": "French Onion Soup Gratinée",
                      "rarity": 4,
                      "type": "Classic Soups",
                      "image": "images/regional/en/en_l_12.webp",
                      "desc": "Thố súp hầm từ hành tây caramen hóa ngọt lịm với nước dùng bò, phủ lát bánh mì nướng và ngập tràn phô mai Gruyère vàng ruộm kéo sợi.",
                      "calories": 407,
                      "tags": [
                          "soup",
                          "onion",
                          "cheese",
                          "french"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  }
              ]
          },
          "afternoon": {
              "id": "afternoon",
              "name": "Pub Grub & Bites",
              "title": "Afternoon bites and tasty snacks",
              "bannerName": "Crispy Finger Foods & Pub Classics",
              "subtitle": "Golden chicken tenders, loaded nachos, and buffalo wings",
              "featured5Star": "Loaded Bacon Mac & Cheese",
              "bannerImage": "images/buoi_chieu/banh_xeo.webp",
              "theme": "afternoon",
              "dishes": [
                  {
                      "id": "en_a_1",
                      "name": "Loaded Bacon Mac & Cheese",
                      "rarity": 3,
                      "type": "Nui",
                      "image": "images/regional/en/en_a_1.webp",
                      "desc": "Đĩa nui xoắn ngập trong sốt 3 loại phô mai cheddar tan chảy béo ngậy, rắc đầy thịt xông khói giòn tan.",
                      "calories": 350,
                      "tags": [
                          "Loaded Bacon Mac & Cheese",
                          "afternoon",
                          "en"
                      ],
                      "price": 10,
                      "priceRange": [
                          8.5,
                          11.5
                      ],
                      "priceMin": 8.5,
                      "priceMax": 11.5
                  },
                  {
                      "id": "en_a_2",
                      "name": "Buffalo Chicken Wings",
                      "rarity": 3,
                      "type": "Cánh",
                      "image": "images/regional/en/en_a_2.webp",
                      "desc": "Cánh gà chiên giòn rụm lắc đẫm sốt ớt cay chua Buffalo truyền thống, chấm cùng sốt phô mai xanh Blue Cheese.",
                      "calories": 387,
                      "tags": [
                          "Buffalo Chicken Wings",
                          "afternoon",
                          "en"
                      ],
                      "price": 12,
                      "priceRange": [
                          10.2,
                          13.8
                      ],
                      "priceMin": 10.2,
                      "priceMax": 13.8
                  },
                  {
                      "id": "en_a_3",
                      "name": "Warm Cinnamon Sugar Churros",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_a_3.webp",
                      "desc": "Thanh bánh churros chiên giòn rụm rắc áo lớp đường bột quế thơm lừng, chấm đẫm cốc sốt chocolate đen.",
                      "calories": 424,
                      "tags": [
                          "Warm Cinnamon Sugar Churros",
                          "afternoon",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_a_4",
                      "name": "New Orleans Powdered Beignets",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_a_4.webp",
                      "desc": "3 chiếc bánh rán phồng xốp mềm vừa vớt ra khỏi chảo dầu nóng, rắc ngập tràn lớp đường bột trắng như tuyết.",
                      "calories": 461,
                      "tags": [
                          "New Orleans Powdered Beignets",
                          "afternoon",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  },
                  {
                      "id": "en_a_5",
                      "name": "Traditional Cornish Pasties",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_a_5.webp",
                      "desc": "Chiếc bánh xếp vỏ bột giòn rụm nhân thịt thăn bò thái hạt lựu, khoai tây và củ cải nướng vàng ươm kiểu Anh.",
                      "calories": 498,
                      "tags": [
                          "Traditional Cornish Pasties",
                          "afternoon",
                          "en"
                      ],
                      "price": 9,
                      "priceRange": [
                          7.65,
                          10.35
                      ],
                      "priceMin": 7.65,
                      "priceMax": 10.35
                  },
                  {
                      "id": "en_a_6",
                      "name": "Scotch Egg with Whole Grain Mustard",
                      "rarity": 3,
                      "type": "Trứng",
                      "image": "images/regional/en/en_a_6.webp",
                      "desc": "Quả trứng lòng đào bọc trong lớp thịt heo xay thảo mộc, lăn bột bánh mì chiên vàng giòn rụm.",
                      "calories": 535,
                      "tags": [
                          "Scotch Egg with Whole Grain Mustard",
                          "afternoon",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_a_7",
                      "name": "Crispy Beer-Battered Onion Rings",
                      "rarity": 3,
                      "type": "Hành",
                      "image": "images/regional/en/en_a_7.webp",
                      "desc": "Những khoanh hành tây ngọt lịm nhúng bột bia chiên xù giòn rụm chấm sốt BBQ khói cay nồng.",
                      "calories": 572,
                      "tags": [
                          "Crispy Beer-Battered Onion Rings",
                          "afternoon",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  },
                  {
                      "id": "en_a_8",
                      "name": "Loaded Chili Cheese Fries",
                      "rarity": 3,
                      "type": "Khoai",
                      "image": "images/regional/en/en_a_8.webp",
                      "desc": "Đĩa khoai tây chiên giòn rưới ngập sốt thịt bò băm hầm đậu đỏ cay nồng và phô mai cheddar tan chảy.",
                      "calories": 609,
                      "tags": [
                          "Loaded Chili Cheese Fries",
                          "afternoon",
                          "en"
                      ],
                      "price": 9,
                      "priceRange": [
                          7.65,
                          10.35
                      ],
                      "priceMin": 7.65,
                      "priceMax": 10.35
                  },
                  {
                      "id": "en_a_9",
                      "name": "Soft Pretzel Bites with Beer Cheese",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_a_9.webp",
                      "desc": "Từng viên bánh mì xoắn muối biển nướng vàng nâu dẻo dai chấm vào chén sốt phô mai cheddar nấu bia ale.",
                      "calories": 646,
                      "tags": [
                          "Soft Pretzel Bites with Beer Cheese",
                          "afternoon",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_a_10",
                      "name": "Southern Fried Pickles",
                      "rarity": 3,
                      "type": "Dưa",
                      "image": "images/regional/en/en_a_10.webp",
                      "desc": "Những lát dưa leo muối chua giòn tẩm bột ngô chiên vàng rụm chấm đẫm sốt thảo mộc ranch béo ngậy.",
                      "calories": 683,
                      "tags": [
                          "Southern Fried Pickles",
                          "afternoon",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  }
              ]
          },
          "dinner": {
              "id": "dinner",
              "name": "Dinner & Steaks",
              "title": "What sounds good for dinner tonight?",
              "bannerName": "Hearty Feasts & Grills",
              "subtitle": "Prime ribeye steak, slow-smoked BBQ ribs, and rich creamy pastas",
              "featured5Star": "USDA Prime Ribeye Steak",
              "bannerImage": "images/buoi_toi/bbq_nuong.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "en_d_1",
                      "name": "USDA Prime Ribeye Steak",
                      "rarity": 5,
                      "type": "Bít",
                      "image": "images/regional/en/en_d_1.webp",
                      "desc": "Miếng bít tết thăn lưng bò Mỹ Prime vân mỡ cẩm thạch nướng xém cạnh vừa chín tới, sốt bơ tỏi hương thảo.",
                      "calories": 350,
                      "tags": [
                          "USDA Prime Ribeye Steak",
                          "dinner",
                          "en"
                      ],
                      "price": 28,
                      "priceRange": [
                          23.8,
                          32.2
                      ],
                      "priceMin": 23.8,
                      "priceMax": 32.2
                  },
                  {
                      "id": "en_d_2",
                      "name": "Texas Smoked Beef Brisket",
                      "rarity": 3,
                      "type": "Gầu",
                      "image": "images/regional/en/en_d_2.webp",
                      "desc": "Tảng gầu bò ướp muối tiêu đen xông khói gỗ sồi 16 tiếng tạo viền khói đỏ au hồng ngọc, mềm tan rã mỡ.",
                      "calories": 387,
                      "tags": [
                          "Texas Smoked Beef Brisket",
                          "dinner",
                          "en"
                      ],
                      "price": 24,
                      "priceRange": [
                          20.4,
                          27.6
                      ],
                      "priceMin": 20.4,
                      "priceMax": 27.6
                  },
                  {
                      "id": "en_d_3",
                      "name": "Smoked BBQ Pork Ribs",
                      "rarity": 5,
                      "type": "Sườn",
                      "image": "images/regional/en/en_d_3.webp",
                      "desc": "Dải sườn heo ướp gia vị xông khói quét sốt BBQ bóng bẩy thơm ngọt đậm đà, thịt mềm tan róc khỏi xương.",
                      "calories": 424,
                      "tags": [
                          "Smoked BBQ Pork Ribs",
                          "dinner",
                          "en"
                      ],
                      "price": 24,
                      "priceRange": [
                          20.4,
                          27.6
                      ],
                      "priceMin": 20.4,
                      "priceMax": 27.6
                  },
                  {
                      "id": "en_d_4",
                      "name": "Traditional British Sunday Roast",
                      "rarity": 3,
                      "type": "Bữa",
                      "image": "images/regional/en/en_d_4.webp",
                      "desc": "Thịt bò thăn nướng tái hồng hào, ăn kèm bánh phồng Yorkshire pudding nở xốp, khoai tây nướng bơ và nước sốt gravy.",
                      "calories": 461,
                      "tags": [
                          "Traditional British Sunday Roast",
                          "dinner",
                          "en"
                      ],
                      "price": 22,
                      "priceRange": [
                          18.7,
                          25.3
                      ],
                      "priceMin": 18.7,
                      "priceMax": 25.3
                  },
                  {
                      "id": "en_d_5",
                      "name": "Traditional British Shepherd's Pie",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_d_5.webp",
                      "desc": "Thịt cừu băm xào đậu hà lan cà rốt hầm nước cốt bò đậm đà, phủ lớp khoai tây nghiền nướng vàng óng.",
                      "calories": 498,
                      "tags": [
                          "Traditional British Shepherd's Pie",
                          "dinner",
                          "en"
                      ],
                      "price": 16,
                      "priceRange": [
                          13.6,
                          18.4
                      ],
                      "priceMin": 13.6,
                      "priceMax": 18.4
                  },
                  {
                      "id": "en_d_6",
                      "name": "Louisiana Seafood Jambalaya",
                      "rarity": 5,
                      "type": "Cơm",
                      "image": "images/regional/en/en_d_6.webp",
                      "desc": "Chảo cơm nấu nước dùng cay đậm đà gia vị Creole cùng tôm sú, xúc xích hun khói Andouille và ức gà.",
                      "calories": 535,
                      "tags": [
                          "Louisiana Seafood Jambalaya",
                          "dinner",
                          "en"
                      ],
                      "price": 18,
                      "priceRange": [
                          15.3,
                          20.7
                      ],
                      "priceMin": 15.3,
                      "priceMax": 20.7
                  },
                  {
                      "id": "en_d_7",
                      "name": "Creamy Truffle Fettuccine Alfredo",
                      "rarity": 4,
                      "type": "Mì",
                      "image": "images/regional/en/en_d_7.webp",
                      "desc": "Sợi mì dẹt Fettuccine nấu sốt kem bơ béo ngậy, bào ngập phô mai Parmigiano Reggiano và tinh dầu nấm truffle.",
                      "calories": 572,
                      "tags": [
                          "Creamy Truffle Fettuccine Alfredo",
                          "dinner",
                          "en"
                      ],
                      "price": 19,
                      "priceRange": [
                          16.15,
                          21.85
                      ],
                      "priceMin": 16.15,
                      "priceMax": 21.85
                  },
                  {
                      "id": "en_d_8",
                      "name": "San Francisco Cioppino Stew",
                      "rarity": 5,
                      "type": "Hải",
                      "image": "images/regional/en/en_d_8.webp",
                      "desc": "Thố súp hải sản thịnh soạn: cua biển, tôm sú, vẹm xanh, mực tươi hầm sốt cà chua rượu vang thơm lừng.",
                      "calories": 609,
                      "tags": [
                          "San Francisco Cioppino Stew",
                          "dinner",
                          "en"
                      ],
                      "price": 24,
                      "priceRange": [
                          20.4,
                          27.6
                      ],
                      "priceMin": 20.4,
                      "priceMax": 27.6
                  },
                  {
                      "id": "en_d_9",
                      "name": "Classic Steak and Ale Pie",
                      "rarity": 5,
                      "type": "Bánh",
                      "image": "images/regional/en/en_d_9.webp",
                      "desc": "Nồi bánh pie vỏ ngàn lớp vàng ruộm nhân thịt bò nạm hầm bia đen Guinness sánh đặc mềm rục.",
                      "calories": 646,
                      "tags": [
                          "Classic Steak and Ale Pie",
                          "dinner",
                          "en"
                      ],
                      "price": 18,
                      "priceRange": [
                          15.3,
                          20.7
                      ],
                      "priceMin": 15.3,
                      "priceMax": 20.7
                  },
                  {
                      "id": "en_d_10",
                      "name": "Pan-Seared Atlantic Salmon",
                      "rarity": 4,
                      "type": "Cá",
                      "image": "images/regional/en/en_d_10.webp",
                      "desc": "Miếng phi lê cá hồi da giòn rụm thịt mềm béo mọng nước, đặt trên lớp măng tây xào bơ tỏi thơm ngát.",
                      "calories": 683,
                      "tags": [
                          "Pan-Seared Atlantic Salmon",
                          "dinner",
                          "en"
                      ],
                      "price": 22,
                      "priceRange": [
                          18.7,
                          25.3
                      ],
                      "priceMin": 18.7,
                      "priceMax": 25.3
                  }
              ]
          },
          "snacks": {
              "id": "snacks",
              "name": "Desserts & Sweets",
              "title": "Treat yourself to something sweet",
              "bannerName": "Decadent Treats & Baked Delights",
              "subtitle": "New York cheesecake, warm lava cake, and fresh cinnamon rolls",
              "featured5Star": "Classic New York Cheesecake",
              "bannerImage": "images/do_an_vat/ca_vien_chien.webp",
              "theme": "dinner",
              "dishes": [
                  {
                      "id": "en_s_1",
                      "name": "Classic New York Cheesecake",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_1.webp",
                      "desc": "Lát bánh cheesecake nướng béo ngậy đậm đà kem phô mai cream cheese nguyên chất, rưới sốt dâu tây chua dịu.",
                      "calories": 350,
                      "tags": [
                          "Classic New York Cheesecake",
                          "snacks",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_s_2",
                      "name": "Warm Chocolate Lava Cake",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_2.webp",
                      "desc": "Chiếc bánh xốp mềm khi xắn thì dòng nham thạch chocolate Bỉ ấm nóng tan chảy tràn ra, ăn cùng kem vani lạnh.",
                      "calories": 387,
                      "tags": [
                          "Warm Chocolate Lava Cake",
                          "snacks",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_s_3",
                      "name": "Warm Cinnamon Apple Pie",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_3.webp",
                      "desc": "Bánh nướng vỏ bơ ngàn lớp giòn rụm bọc nhân táo tươi nấu đường nâu thơm lừng hương quế và đinh hương.",
                      "calories": 424,
                      "tags": [
                          "Warm Cinnamon Apple Pie",
                          "snacks",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  },
                  {
                      "id": "en_s_4",
                      "name": "British Sticky Toffee Pudding",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_4.webp",
                      "desc": "Miếng bánh bông lan chà là mềm xốp đẫm trong dòng sốt kẹo bơ toffee nóng sôi sùng sục và kem trứng custard.",
                      "calories": 461,
                      "tags": [
                          "British Sticky Toffee Pudding",
                          "snacks",
                          "en"
                      ],
                      "price": 8,
                      "priceRange": [
                          6.8,
                          9.2
                      ],
                      "priceMin": 6.8,
                      "priceMax": 9.2
                  },
                  {
                      "id": "en_s_5",
                      "name": "Traditional Eton Mess",
                      "rarity": 3,
                      "type": "Kem",
                      "image": "images/regional/en/en_s_5.webp",
                      "desc": "Ly tráng miệng quý tộc Anh: dâu tây chín mọng trộn vụn bánh đường meringue giòn tan và kem tươi đánh bông.",
                      "calories": 498,
                      "tags": [
                          "Traditional Eton Mess",
                          "snacks",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  },
                  {
                      "id": "en_s_6",
                      "name": "Warm Frosted Cinnamon Roll",
                      "rarity": 4,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_6.webp",
                      "desc": "Ổ bánh cuộn đường quế thơm nồng ấm nóng vừa ra lò, phủ lớp kem phô mai trắng mịn tan chảy ngọt ngào.",
                      "calories": 535,
                      "tags": [
                          "Warm Frosted Cinnamon Roll",
                          "snacks",
                          "en"
                      ],
                      "price": 6,
                      "priceRange": [
                          5.1,
                          6.9
                      ],
                      "priceMin": 5.1,
                      "priceMax": 6.9
                  },
                  {
                      "id": "en_s_7",
                      "name": "British Scones with Clotted Cream",
                      "rarity": 3,
                      "type": "Bánh",
                      "image": "images/regional/en/en_s_7.webp",
                      "desc": "Cặp bánh nướng xốp thơm mùi bơ sữa kiểu Anh phết đẫm kem sữa đặc clotted cream béo ngậy và mứt dâu tây.",
                      "calories": 572,
                      "tags": [
                          "British Scones with Clotted Cream",
                          "snacks",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  }
              ]
          },
          "drinks": {
              "id": "drinks",
              "name": "Beverages & Brews",
              "title": "Refresh your day with a chilled sip",
              "bannerName": "Artisan Coffee & Cool Sips",
              "subtitle": "Chilled cold brew, iced oat milk latte, and refreshing strawberry lemonade",
              "featured5Star": "Iced Vanilla Oat Milk Latte",
              "bannerImage": "images/do_uong/tra_sua.webp",
              "theme": "drinks",
              "dishes": [
                  {
                      "id": "en_dr_1",
                      "name": "Iced Vanilla Oat Milk Latte",
                      "rarity": 3,
                      "type": "Cà",
                      "image": "images/regional/en/en_dr_1.webp",
                      "desc": "Cà phê espresso chiết xuất đậm đà hòa cùng sữa yến mạch barista béo ngậy dịu lành và siro vani.",
                      "calories": 350,
                      "tags": [
                          "Iced Vanilla Oat Milk Latte",
                          "drinks",
                          "en"
                      ],
                      "price": 6,
                      "priceRange": [
                          5.1,
                          6.9
                      ],
                      "priceMin": 5.1,
                      "priceMax": 6.9
                  },
                  {
                      "id": "en_dr_2",
                      "name": "Classic Cold Brew Coffee",
                      "rarity": 3,
                      "type": "Cà",
                      "image": "images/regional/en/en_dr_2.webp",
                      "desc": "Cà phê hạt Arabica ủ lạnh 18 tiếng chắt lọc vị chua thanh tao, ngọt hậu dịu êm và hàm lượng caffeine cao.",
                      "calories": 387,
                      "tags": [
                          "Classic Cold Brew Coffee",
                          "drinks",
                          "en"
                      ],
                      "price": 5,
                      "priceRange": [
                          4.25,
                          5.75
                      ],
                      "priceMin": 4.25,
                      "priceMax": 5.75
                  },
                  {
                      "id": "en_dr_3",
                      "name": "Fresh Strawberry Lemonade",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/en/en_dr_3.webp",
                      "desc": "Nước cốt chanh vàng tươi vắt lắc cùng dâu tây tươi nghiền và đá viên giải nhiệt ngày hè sảng khoái.",
                      "calories": 424,
                      "tags": [
                          "Fresh Strawberry Lemonade",
                          "drinks",
                          "en"
                      ],
                      "price": 5,
                      "priceRange": [
                          4.25,
                          5.75
                      ],
                      "priceMin": 4.25,
                      "priceMax": 5.75
                  },
                  {
                      "id": "en_dr_4",
                      "name": "Old-Fashioned Root Beer Float",
                      "rarity": 3,
                      "type": "Nước",
                      "image": "images/regional/en/en_dr_4.webp",
                      "desc": "Ly nước ngọt xá xị thảo mộc sủi bọt mát lạnh thả nguyên một viên kem vani tròn béo ngậy tan bồng bềnh.",
                      "calories": 461,
                      "tags": [
                          "Old-Fashioned Root Beer Float",
                          "drinks",
                          "en"
                      ],
                      "price": 5,
                      "priceRange": [
                          4.25,
                          5.75
                      ],
                      "priceMin": 4.25,
                      "priceMax": 5.75
                  },
                  {
                      "id": "en_dr_5",
                      "name": "Classic Salted Caramel Milkshake",
                      "rarity": 3,
                      "type": "Sữa",
                      "image": "images/regional/en/en_dr_5.webp",
                      "desc": "Ly sữa lắc xay từ kem vani béo ngậy, siro caramel muối mặn ngọt, xịt ngọn kem whipping cream cao vút.",
                      "calories": 498,
                      "tags": [
                          "Classic Salted Caramel Milkshake",
                          "drinks",
                          "en"
                      ],
                      "price": 6,
                      "priceRange": [
                          5.1,
                          6.9
                      ],
                      "priceMin": 5.1,
                      "priceMax": 6.9
                  },
                  {
                      "id": "en_dr_6",
                      "name": "London Fog Earl Grey Tea Latte",
                      "rarity": 3,
                      "type": "Trà",
                      "image": "images/regional/en/en_dr_6.webp",
                      "desc": "Cốt trà đen Earl Grey ngát hương hoa cam bergamot hòa sữa tươi đánh bọt mịn màng và vani ấm áp.",
                      "calories": 535,
                      "tags": [
                          "London Fog Earl Grey Tea Latte",
                          "drinks",
                          "en"
                      ],
                      "price": 5,
                      "priceRange": [
                          4.25,
                          5.75
                      ],
                      "priceMin": 4.25,
                      "priceMax": 5.75
                  },
                  {
                      "id": "en_dr_7",
                      "name": "American Craft IPA Draft Beer",
                      "rarity": 3,
                      "type": "Bia",
                      "image": "images/regional/en/en_dr_7.webp",
                      "desc": "Ly bia thủ công rót tại vòi thơm nồng nàn hương hoa bia cam quýt nhiệt đới, hậu vị đắng dịu thanh khiết.",
                      "calories": 572,
                      "tags": [
                          "American Craft IPA Draft Beer",
                          "drinks",
                          "en"
                      ],
                      "price": 7,
                      "priceRange": [
                          5.95,
                          8.05
                      ],
                      "priceMin": 5.95,
                      "priceMax": 8.05
                  },
                  {
                      "id": "en_dr_8",
                      "name": "Classic New York Cosmopolitan",
                      "rarity": 3,
                      "type": "Cocktail",
                      "image": "images/regional/en/en_dr_8.webp",
                      "desc": "Ly cocktail thanh lịch lắc từ rượu vodka, nước ép nam việt quất đỏ thẫm, rượu cam Cointreau và chanh tươi.",
                      "calories": 609,
                      "tags": [
                          "Classic New York Cosmopolitan",
                          "drinks",
                          "en"
                      ],
                      "price": 9,
                      "priceRange": [
                          7.65,
                          10.35
                      ],
                      "priceMin": 7.65,
                      "priceMax": 10.35
                  }
              ]
          }
      },
};
