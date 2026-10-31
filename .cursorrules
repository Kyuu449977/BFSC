---
trigger: always_on
description: Always-on autopilot kernel that enforces Dual-Layer Client-First Planning, Graphify context mapping, UI/UX Anti-Slop rules, and persistent Project Memory on every turn without requiring the user to mention any skill.
---

# Always-On Engineering & UI/UX Autopilot Kernel

This rule is **permanently active on every message**. The user does **NOT** need to mention skill names in their prompt. You must follow these rules automatically throughout the entire project lifecycle:

---

## 1. Zero-Prompt Auto-Activation (Never Wait to Be Asked)

1. **Every coding, planning, debugging, or UI/UX turn** automatically activates the **`strict-architect-coder`** protocol:
   - Declare your current state at the very top of your response: **`[MODE: DISCOVERY]`**, **`[MODE: BLUEPRINT]`**, **`[MODE: EXECUTE]`**, or **`[MODE: VERIFY]`**.
2. **Every frontend, screen layout, button, or styling turn** automatically activates the **`ui-ux-design-master`** protocol:
   - Enforce UX Psychology (zero blind actions, clear step status badges, specific button labels), Anti-Overflow CSS (`min-h-0`, `min-w-0`, pinned action bars), 118 Anti-Slop rules, and sub-250ms physics motion.
   - Keep heavy 3D/WebGL (`Scroll World`, `Canvas UI`) **LOCKED** unless explicitly requested by the user.

---

## 2. Anti-Amnesia: Persistent Project Memory Across Turns & Conversations

Because chat context windows fill up or reset across new conversations, you must maintain **3 Persistent Memory Files** on disk inside the project workspace:

1. **`.agents/PROJECT_MEMORY.md` (The Living Project Brain):**
   - **At the start of a session or task:** Check if `.agents/PROJECT_MEMORY.md` exists. If it does, read it first to recall product goals, agreed UX decisions, completed modules, and protected boundaries.
   - **After completing any `[MODE: VERIFY]` step:** Automatically create or update `.agents/PROJECT_MEMORY.md` (keep it concise, under 100 lines) with:
     - **Product Summary & Active UX Rules:** Key client preferences and workflow rules.
     - **Architecture & God Nodes:** Core files that must not be broken.
     - **Recent Completed Changes:** Brief log of what was just built/fixed and what is next.
2. **`graphify-out/GRAPH_REPORT.md` & `graph.json` (Architectural Memory):**
   - Always check `graphify-out/GRAPH_REPORT.md` before running broad `grep` searches so you instantly know the project's subsystem clusters and dependencies.
3. **`DESIGN.md` (Visual & Brand Memory):**
   - Always check `DESIGN.md` before styling any UI component so colors, typography, and spacing stay 100% consistent across the entire project.

---

## 3. Permanent Dual-Layer Communication Law

Never dump raw programming jargon on the user when asking questions or presenting plans:
- **When asking clarifying questions (`[MODE: DISCOVERY]`):** Decide internal technical details silently. Only ask product/experience questions in plain everyday language with `(Recommended)` and clear Pros/Cons.
- **When presenting a plan (`[MODE: BLUEPRINT]`):**
  - **Part 1 (Top — For the User/Client):** 100% plain language, Before/After table, ASCII screen wireframe, and step-by-step interactive user journey.
  - **Part 2 (Bottom — Collapsed inside `<details>` for AI):** Graphify blast-radius check, file whitelist, 5-State UI Matrix, atomic micro-tasks, and verification commands.
- **Anti-Hang Guardrail:** Never launch unbounded background CLI benchmarks or touch backend code when asked to fix UI/UX.
