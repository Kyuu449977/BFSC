# Playbook: Graphify Knowledge Graph Engine (`Graphify-Labs/graphify`)

Use this playbook at the start of **`[MODE: DISCOVERY]`** and **`[MODE: BLUEPRINT]`** to understand project architecture, trace dependencies, and calculate blast radius **5x faster** without blindly grepping dozens of files.

---

## 1. Why Graphify Is Your Primary Architectural Map

Instead of reading raw files one by one (which wastes context tokens and makes AI responses slow), **Graphify** (`https://github.com/Graphify-Labs/graphify`) parses the codebase locally via **Tree-sitter** into a deterministic Knowledge Graph stored in `graphify-out/`:

- **`graphify-out/GRAPH_REPORT.md`**: High-level plain-language architectural summary, **God Nodes** (central hub files that everything depends on), and **Leiden Community Clusters** (logical subsystems).
- **`graphify-out/graph.json`**: Machine-queryable graph of nodes and edges tagged as:
  - `EXTRACTED`: Deterministic relationships proven in source code (imports, calls, inheritance, schemas).
  - `INFERRED`: Semantic relationships across docs, configs, and modules.
- **`graphify-out/graph.html`**: Interactive visual architecture map that the user can open in a browser.

---

## 2. Mandatory Graph-First Workflow (Before Broad File Searches)

### Step 1: Check for Existing Graphify Artifacts
At the beginning of any Tier 2 or Tier 3 task in a project:
1. Check if `graphify-out/GRAPH_REPORT.md` exists in the workspace root.
2. **If `GRAPH_REPORT.md` exists:**
   - Read `graphify-out/GRAPH_REPORT.md` **FIRST** before running broad `grep` or directory scans.
   - Identify which **Subsystem / Community Cluster** owns the feature requested by the user.
   - Identify any **God Nodes** in that path so you treat them with extreme caution (never break a God Node's existing contract).
3. **If you need exact caller/callee paths:**
   - Query `graphify-out/graph.json` for the target symbol/file node to list all `EXTRACTED` incoming and outgoing edges.
   - Only read the specific source files connected by those edges!

### Step 2: When `graphify-out/` Does Not Exist Yet
- If the project has >15 files and no `graphify-out/` directory:
  - Check swiftly if the `graphify` CLI is available (`graphify --version`).
  - For fast, deterministic code mapping without spending LLM tokens or hanging the terminal, prefer running Graphify's local AST scan or suggest to the user in Part 1:
    > *"💡 Mẹo tăng tốc: Dự án này có thể bật bản đồ kiến trúc Graphify (`/graphify .`) để AI nắm toàn bộ cấu trúc file ngay lập tức mà không cần quét từng file."*
  - **Anti-Hang Guardrail:** Never run a heavy multi-modal LLM semantic pass on hundreds of PDFs/videos silently in the background without telling the user first.

---

## 3. Integrating Graphify into the Dual-Layer Plan

### In Part 1 (Client View — Zero Jargon):
- Translate Graphify's findings into reassuring, everyday product insights:
  - *Instead of:* `"Node AuthController.ts is a God Node with degree 18 in Community 2."`
  - *Say:* `"Khu vực Đăng nhập đang là trục chính kết nối tới 18 màn hình khác, nên tôi sẽ giữ nguyên luồng cũ và chỉ gắn thêm tính năng mới ở nhánh phụ để đảm bảo không ảnh hưởng các trang đang chạy tốt."`
- If the user wants to see the whole project visually, point them to `graphify-out/graph.html`.

### In Part 2 (Collapsed `<details>` AI Technical Spec):
Include the **Graphify Structural Audit** block:
```markdown
### Graphify Structural & Blast-Radius Audit
- **Target Community / Subsystem:** `[Cluster Name from GRAPH_REPORT.md]`
- **Direct Edges (`EXTRACTED`):** `[Upstream callers] -> [Target File] -> [Downstream consumers]`
- **God Nodes Protected:** `[List any high-centrality nodes that must remain backward-compatible]`
```
