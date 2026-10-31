# Playbook: Spec-Driven Planning & Architecture (Dual-Layer + Graphify v3.5)

Use this playbook when executing **Tier 2** or **Tier 3** features, system design, or multi-file refactoring.

---

## 1. Dual-Layer Planning Rule (Client Top, Engineer Bottom)

Every plan must serve two audiences simultaneously without mixing their languages:
1. **Top Layer (For the Human Client / Product Owner):**
   - Explains **what changes in the product experience** using everyday language, Before/After tables, ASCII wireframes, and step-by-step user journeys (see [client-communication-and-plan-template.md](./client-communication-and-plan-template.md)).
2. **Bottom Collapsible Layer (`<details>` Technical Spec for the AI Engineer):**
   - Contains the exact engineering blueprint and **Graphify structural audit** described below so the coding phase is 100% deterministic.

---

## 2. Pre-Planning Dependency Audit (Powered by Graphify)

Before writing the collapsed Technical Spec, trace the 3-layer dependency chain of the target feature using `graphify-out/GRAPH_REPORT.md` and `graphify-out/graph.json` (if present) or targeted file inspection:

1. **Subsystem & God-Node Check (`GRAPH_REPORT.md`):**
   - Which **Leiden Community Cluster** owns this feature?
   - Does the change touch a **God Node** (a central file with high incoming/outgoing edges)? If yes, lock its existing public signatures and only extend backward-compatibly.
2. **Upstream Data Source (`EXTRACTED` Incoming Edges):**
   - Where does the data or state originate? (API response, database query, global store, URL params, parent props).
3. **Transformation Layer:**
   - How is the data validated, formatted, or computed?
4. **Downstream Consumers (`EXTRACTED` Outgoing Edges):**
   - Which UI components, API endpoints, or background workers consume this output?

> **Backward-Compatibility Rule:** If changing a shared interface/type or God Node breaks >2 downstream consumers, prefer extending the interface with optional fields rather than breaking existing callers.

---

## 3. Decomposition into Atomic Micro-Tasks

Inside the collapsed `<details>` Technical Spec, order tasks sequentially from **foundational contracts** to **surface integration**:

1. **Task 1: Types, Schemas & Data Contracts**
   - Define or update interfaces, types, and validation schemas first.
2. **Task 2: Pure Business Logic / State Store / Services**
   - Implement core state transitions or API handlers in isolation.
3. **Task 3: UI Components / Presentation Layer**
   - Wire the verified state/props into the visual components matching the ASCII wireframe from Part 1.
4. **Task 4: Cleanup & Edge-Case Hardening**
   - Remove dead code, unused imports, and verify boundary conditions (`null`, `undefined`, empty arrays, network timeouts).

---

## 4. Architecture Decision Ownership

- **Pure Engineering Choices = AI Decides Silently:** Match the project's existing folder structure, naming conventions, state management library, and styling system automatically without bothering the user.
- **Product & UX Trade-offs = Ask the User in Plain Language:** Only surface decisions to the user when they impact visible behavior, data persistence expectations, or workflow steps.
