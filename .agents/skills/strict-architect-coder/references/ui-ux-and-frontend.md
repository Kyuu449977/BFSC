# Playbook: UI/UX Usability Auditing & Frontend Engineering (v3.0)

Use this playbook whenever the user asks to create, fix, or optimize user interfaces, user flows, buttons, forms, or visual interactions.

---

## 1. Cognitive Load & User Flow Audit (`[MODE: DISCOVERY]`)

When a user says *"This UI is confusing/hard to use"* or questions a specific UI element (e.g., *"Why is there a Complete button here when I don't know if this step needs code?"*):

1. **Explain the UX Friction in Plain Client Language:**
   - Do not dump component code or state hook names on the user.
   - Clearly state: *"Hiện tại màn hình đang gây khó hiểu vì [lý do trải nghiệm], khiến người dùng không biết khi nào nên bấm [Tên nút]."*
2. **Audit Action Clarity (Button & Control Rules):**
   - **No Blind Actions:** Never show a primary action button (like *"Hoàn thành"*, *"Submit"*, or *"Next"*) without making the current step's prerequisite state and consequence obvious.
   - **Contextual Labeling:** Replace vague labels (*"Hoàn thành"*, *"OK"*, *"Run"*) with specific, state-aware labels (e.g., *"Đã xem xong (Bước này không cần Code)"*, *"Tạo Code cho Bước 2"*, *"Duyệt & Sang Bước 3"*).
   - **Visual Status Badges:** Clearly badge whether a step or card is `[Cần viết Code]`, `[Chỉ đọc hướng dẫn]`, `[Đang chạy...]`, or `[Đã hoàn tất]`.

---

## 2. Presenting UI Changes in Part 1 vs. Part 2 of the Plan

1. **In Part 1 (Client View):**
   - Show the **Before vs. After comparison table**.
   - Draw an **ASCII Wireframe** showing exact button labels, badges, and placement.
   - Write the **Step-by-Step User Journey** (*"Khi bạn mở màn hình -> Khi bạn bấm nút -> Khi hoàn tất"*).
2. **In Part 2 (Collapsed `<details>` AI Technical Spec):**
   - Map all 5 UI states (`Empty/Initial`, `Loading/Pending + Cancel button`, `Partial/In-Progress`, `Error`, `Completed/Success`) to their exact component props and state variables.

---

## 3. Frontend Execution Guardrails

- **Preserve Layout & Responsive Integrity:** Check flex/grid containers, overflow behavior (`min-w-0`, text truncation/wrapping), and mobile/desktop breakpoints.
- **Zero Backend Drift:** Never touch backend APIs or run CLI benchmarks when solving a frontend usability problem unless explicitly approved in the Blueprint.
