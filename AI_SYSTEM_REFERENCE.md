# BFSC — Hợp đồng kỹ thuật hiện hành

Đặc tả triển khai sau nâng cấp 29/10/2026. Mã nguồn là nguồn sự thật; báo cáo lịch sử có thể mô tả phiên bản cũ.

## Kiến trúc

Frontend HTML/CSS/JavaScript classic scripts; không ES Modules, framework hoặc bundler. theme-init chạy đồng bộ trước CSS. Các script defer đọc dữ liệu/money/catalog/settings trước gacha và app. Thứ tự chính xác nằm trong src/index.html và phải được giữ khi thêm module.

Mã ở src là nguồn; public là output. Backend Python chỉ phục vụ allowlist và API. Không import backend.server để build; entrypoint preview/build chịu trách nhiệm rõ ràng.

## Danh mục, tiền và chọn món

- Giữ 382 ID tĩnh. Catalog.getAllDishes trả mọi vùng; engine.getAllDishesList chỉ trả vùng active.
- Catalog.getRegion merge custom theo ID, không thay danh mục gốc. upsertCustom tăng revision. Region custom cũ mặc định vi.
- Money giữ integer minor units nội bộ; ngân sách API engine/settings giữ major units tương thích dữ liệu cũ. parseBudget rỗng là null, lỗi throw; getRange trả khoảng minor units.
- PreparedSelection giữ pools.single/main/snacks/drinks, availability, minimumsMinor, minimums (major), eligibleSingleCount và signature. Không có mảng triples/combos eager.
- drawDishes/drawCombo là async. Kết quả gồm dish/source/sourceName. Chờ Promise trước animation.
- Random xét recent khi bật, overlap và exposure, rồi reservoir sampling; yield event loop khi xử lý dài. Revision cũ bị từ chối.
- main gom bốn bữa; combo main+snacks+drinks. Ngân sách tính tổng minimum, không bảo đảm giá thật.
- commitResults cùng mảng chỉ một lần. Không clone mảng rồi commit lại nếu vẫn là cùng lượt.

## Lưu trữ

Giữ IndexedDB food_case_data version1, store state, key collection. Transaction tăng counts; BroadcastChannel/storage báo tab khác refresh. localStorage food_case_collection chỉ migration/mirror, không ghi đè state mới. Unknown positive legacy counts được giữ; registerIds trước khi tăng món mới.

Settings food*case_setting*_ là các khóa độc lập, food*case_settings là bản tương thích. Session history food_case_draw_history. Sở thích food_case_personal*_ dùng canonical tên gốc. Không thay origin hoặc tên storage để né lỗi.

## UI và API

app điều phối DOM, không sửa FOOD_DATABASE trực tiếp. money/catalog/settings/custom-dishes xử lý dữ liệu. UICopy và DISH_TRANSLATIONS cung cấp copy bổ sung. Theme system theo OS; auto theo timezone; giữ màu custom và điều chỉnh màu tương tác đủ tương phản. Experience dùng WAAPI native.

Custom POST /api/custom-dishes giới hạn2MiB, UUID stable và region. Cùng ID nội dung khác trả409. GET dùng JSON chung; frontend static fallback lưu local. Validation4xx không fallback. Server ghi lock+atomic replace, test dùng data root tạm.

## Xuất bản và kiểm chứng

scripts/public_files.py là allowlist. Build ghép CSS đúng STYLE_SOURCES, sinh sw-assets.js, assets/attribution-data.js và credits từ audit metadata. Không xuất bản reports/backend/data/private. Thêm asset phải đăng ký allowlist và metadata; cache list sinh tự động. Tăng cache version khi release.

Attribution.imageFor chọn ảnh có metadata phù hợp hoặc placeholder; không bịa quyền ảnh. DISH_TRANSLATIONS được mở rộng qua dish-i18n.js, giữ bản dịch cũ.

Chạy unit Node/Python và browser upgrade scripts như README. Các test ghi dùng fixture tạm; không chạy script nghiên cứu/patch lịch sử hàng loạt. Không suy từ emulator thành chứng nhận iOS/Android thật. Không tự deploy.
