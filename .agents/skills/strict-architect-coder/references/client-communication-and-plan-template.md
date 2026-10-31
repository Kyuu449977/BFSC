# Playbook: Client-First Communication & Jargon Translation

Use this playbook during `[MODE: DISCOVERY]` (`/grill-me`), `[MODE: BLUEPRINT]` (`/plan`), and `[MODE: VERIFY]` so the human user can effortlessly understand and approve every design decision without needing software engineering jargon.

---

## 1. The Jargon-to-Client Translation Dictionary

Never expose raw programming terms in **Part 1 (Client View)** or in user interview questions. Translate them into user-visible behavior:

| ❌ Technical Jargon (Hide in Part 2) | ✅ Client / Product Language (Use in Part 1 & Questions) |
| :--- | :--- |
| *"Update `disabled` prop based on `step.requiresCode` boolean state"* | *"Chỉ bật sáng nút bấm khi bước này thực sự cần viết code; nếu không cần code thì hiện nhãn báo rõ cho người dùng biết"* |
| *"Persist state in `localStorage` vs. SQLite backend database"* | *"Lưu tạm trên trình duyệt hiện tại (nhanh, nhưng xóa lịch sử web sẽ mất) hay lưu vĩnh viễn vào máy tính (mở lại lúc nào cũng còn)"* |
| *"Add loading spinner and `AbortController` to async handler"* | *"Hiển thị vòng xoay báo đang xử lý kèm theo nút [Dừng lại] để bạn có thể hủy ngay nếu chờ lâu"* |
| *"Refactor component tree and lift state up to parent provider"* | *"Đồng bộ dữ liệu giữa các khung màn hình để khi bạn bấm ở khung bên trái, khung bên phải cập nhật ngay lập tức"* |
| *"Add Zod schema validation and error toast on form submit"* | *"Kiểm tra thông tin nhập vào ngay khi bạn bấm gửi; nếu thiếu hoặc sai sẽ hiện thông báo nhắc cụ thể ở ô đó"* |
| *"Implement optimistic UI update with rollback on 500 error"* | *"Cập nhật giao diện ngay lập tức khi bạn bấm nút để tạo cảm giác mượt mà; nếu mạng lỗi sẽ tự động hoàn tác và báo cho bạn biết"* |

---

## 2. How to Ask High-Value Product Questions (`/grill-me`)

When a requirement has multiple valid product designs, frame your question around **User Scenarios**, not code implementation:

### Bad Question (Technical & Confusing):
> *"Bạn muốn tôi xử lý sự kiện `onClick` của nút Complete bằng cách kiểm tra trường `hasCodeBlock` trong `message.metadata` hay tách thành 2 component `CodeStepActions` và `TextStepActions`?"*

### Good Question (Product Consultant Style):
> *"Ở những bước chỉ cần đọc hướng dẫn (không cần viết code), bạn muốn khu vực nút bấm ở cuối bước hiển thị như thế nào để người dùng không bị bối rối?"*
> - **`(Recommended)` Đổi tên nút thành `[Đã đọc hiểu — Chuyển sang bước tiếp]` kèm nhãn nhỏ báo `"Bước này không cần viết code"`:** Giúp người dùng yên tâm bấm tiếp mà không sợ bỏ sót việc.
> - **Tự động đánh dấu hoàn thành ngay khi chuyển bước (Ẩn luôn nút bấm):** Giao diện gọn nhất, nhưng người dùng mới có thể không biết mình đã xong bước đó chưa.

---

## 3. Visual ASCII Wireframe Patterns for Part 1

Always include a quick ASCII wireframe in **Part 1** of your plan whenever UI layout, buttons, badges, or modals are involved:

### Pattern A:Before vs. After Control Bar
```text
[TRƯỚC ĐÂY — Gây bối rối vì không rõ bước này có cần code không]
┌──────────────────────────────────────────────────────────────┐
│ Bước 2: Thiết kế cấu trúc dữ liệu                            │
│                                              [ Hoàn thành ]  │
└──────────────────────────────────────────────────────────────┘

[SAU KHI NÂNG CẤP — Rõ ràng trạng thái & hành động tương ứng]
┌──────────────────────────────────────────────────────────────┐
│ Bước 2: Thiết kế cấu trúc dữ liệu   [🏷️ Bước này cần Code]   │
│ 💡 Bạn hãy tạo hoặc kiểm tra đoạn code bên dưới trước.       │
│                         [⚡ Tạo Code mẫu]   [✓ Đã kiểm tra]  │
└──────────────────────────────────────────────────────────────┘
```

### Pattern B: Step-by-Step Interactive Flow
```text
[Bạn bấm nút "Chạy thử"]
       │
       ▼
┌──────────────────────────────────────────────────────────────┐
│ ⏳ Đang kiểm tra kết quả... (Đã chạy 3 giây)   [ ⏹️ Dừng ]  │
└──────────────────────────────────────────────────────────────┘
       │
       ├──► (Nếu thành công) ──► ✅ Hiện kết quả + Mở khóa nút [Bước tiếp theo]
       └──► (Nếu quá 10 giây hoặc lỗi) ──► ⚠️ Tự động dừng + Hiện nút [Thử lại]
```
