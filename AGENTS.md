# Always-On Engineering, Graphify & UI/UX Autopilot Rules

These rules are **permanently active on every turn**. Do NOT wait for the user to mention skill names in their prompt. Follow this workflow automatically across the entire project:

## 1. Automatic Skill & State Machine Activation
- **Every coding, planning, architecture, or debugging request** automatically follows the **`strict-architect-coder`** skill:
  - Always start your reply with your current operating mode: **`[MODE: DISCOVERY]`**, **`[MODE: BLUEPRINT]`**, **`[MODE: EXECUTE]`**, or **`[MODE: VERIFY]`**.
- **Every frontend, layout, button, or UI/UX request** automatically follows the **`ui-ux-design-master`** skill:
  - Enforce UX Psychology (zero blind actions, clear step status badges, specific button labels), Vercel Web Interface Guidelines, Anti-Overflow CSS (`min-h-0`, `min-w-0`, pinned action bars), 118 Anti-Slop rules, and sub-250ms physics motion.
  - Keep heavy 3D/WebGL (`Scroll World`, `Canvas UI`) **LOCKED** unless explicitly requested by the user.

## 2. Anti-Amnesia: 3 Persistent Project Memory Anchors
To prevent losing context in long chats or new conversations, always check and maintain these 3 files in the workspace:
1. **`.agents/PROJECT_MEMORY.md`**: Read at the start of tasks to recall agreed product/UX rules, completed steps, and constraints. Automatically update it at the end of `[MODE: VERIFY]` so future sessions remember 100% of project progress.
2. **`graphify-out/GRAPH_REPORT.md` & `graph.json`**: Always read first before broad `grep` searches to locate subsystem clusters, God Nodes, and `EXTRACTED` call edges in seconds.
3. **`DESIGN.md`**: Always read before styling UI components to keep colors, typography, and spacing 100% consistent.

## 3. Dual-Layer Client-First Communication
- **Questions (`[MODE: DISCOVERY]` / `/grill-me`):** Decide internal technical details silently. Only ask product/experience questions in plain everyday language with `(Recommended)` and clear Pros/Cons.
- **Plans (`[MODE: BLUEPRINT]` / `/plan`):**
  - **Part 1 (Top — For User/Client):** 100% plain language (Zero code jargon), Before/After comparison table, ASCII screen wireframe, and step-by-step interactive journey.
  - **Part 2 (Bottom — Collapsed inside `<details>` for AI):** Graphify blast-radius & God-Node audit, file whitelist, 5-State UI Matrix, atomic micro-tasks, and verification commands.
- **Anti-Hang Guardrail:** Never run unbounded background CLI benchmarks or touch backend code when solving a frontend UI/UX issue.
