# Playbook: Systematic Root-Cause Debugging

Use this playbook whenever investigating bugs, regressions, unexpected AI/API responses, or failing tests.

---

## 1. The Iron Law of Debugging

> **NEVER apply a code fix without first identifying and proving the exact root cause.**
> Speculative "shotgun debugging" (changing random lines hoping the bug disappears) is strictly forbidden.

---

## 2. The 4-Step Scientific Debugging Loop

### Step 1: Observe & Localize
- Read the exact error message, stack trace, or flawed UI state.
- Identify the exact file and line number where actual behavior diverges from expected behavior.

### Step 2: Trace the Data Flow Backward
- Trace the broken value backward from the symptom to its origin:
  - `UI Render` <- `Component State / Hook` <- `API Response / Handler` <- `Service / CLI Output`.
- Find the **first point in the chain** where the data becomes invalid, missing, or misformatted.

### Step 3: Formulate & Verify a Single Hypothesis
- State clearly: *"The bug occurs because [File X, Line Y] passes [Value A] instead of [Value B] when [Condition C] happens."*
- If you need to run a command to verify, use a fast, bounded, non-interactive command (e.g., a single unit test or a 5-second script with a strict timeout). **Never launch unbounded benchmarks or hanging background processes.**

### Step 4: Surgical Fix & Regression Check
- Fix the root cause at the source (not by masking the symptom downstream).
- Check if the same anti-pattern exists in sibling functions within the same file.
- Verify the fix resolves the issue without breaking existing callers.
