# Core Module 01: Smart Override & Divergence Protocol

**Version:** 1.0  
**Target Archetype:** `{{ARCHETYPE_NAME}}`  
**Token Contract:** `{{TOKENS_PATH}}`  
**Design Specification:** `{{DESIGN_DOC_PATH}}`

---

## 0. The 3-Tier Priority Hierarchy ("The User Is Always in the Driver's Seat")

Every blueprint, archetype rule, dial, and anti-slop constraint in `agent-design-skills` follows a strict 3-tier hierarchy:
1. **Priority #1 (Highest) — User's Live Chat Prompt & Explicit Instructions:** If the user asks for a specific layout, section, animation, color, font, badge, or component in their prompt, execute it 100% faithfully with zero pushback. Explicit user intent always overrides default rules.
2. **Priority #2 — User's Custom Creative Direction (`customPrompt` / Section 0 of `DESIGN.md`):** Overrides any conflicting archetype or domain default.
3. **Priority #3 (Fallback Only) — Archetype Rules, Domain Blueprints & Anti-Slop Defaults:** These govern the UI **ONLY where the user's prompt is silent or vague** (e.g., on a short 1-sentence prompt), filling in missing architectural decisions so the agent never falls back to generic AI slop.

---

## 1. Intent Detection: Singular vs. Plural Overrides

When the user requests an aesthetic, geometric, or stylistic modification during development, parse the linguistic intent before touching code:

### Case A: Singular Intent (Scoped Local Exception)
- **Linguistic Markers:** *"make this button pill"*, *"give this card an amber border"*, *"widen this specific modal"*, *"override margin on that header"*.
- **Action Required:**
  1. Apply the style override locally using CSS or utility classes.
  2. Annotate the override inline with the mandatory design exception tag:
     ```css
     /* @design-exception: [Succinct business or ergonomic justification] */
     ```
  3. Immediately record the exception in `{{DESIGN_DOC_PATH}}` under `## 7. Intentional Local Exceptions`:
     ```markdown
     | Component / File | Selector | Rule Diverged From | Business Justification | Source Marker |
     | DataTable.tsx | .btn-primary | Pill border-radius | High-priority primary trigger | `/* @design-exception: High-priority trigger */` |
     ```

### Case B: Plural Intent (Global Token Update)
- **Linguistic Markers:** *"make buttons pill"*, *"cards should have 12px radii"*, *"lighten secondary text"*, *"tighten section spacing"*.
- **Action Required:**
  1. Open `{{TOKENS_PATH}}` and modify the underlying CSS Custom Property (e.g., update `--radius-inner` or `--text-muted`).
  2. Do **not** apply ad-hoc styles inside individual component files.
  3. All components consuming that token will inherit the change globally, maintaining systemic unity.

---

## 2. Divergence Resolution Protocol (The 3-Choice Gate)

If you encounter an unlogged divergence during a refactor, or if the user's change request is grammatically ambiguous (e.g., *"change border to 2px"*):

**Stop and present the user with the 3-choice protocol before making modifications:**

```text
A divergence from the design token contract was detected: [describe selector or property].
How would you like to handle this change?

1. Promote to Global Token: Update canonical custom property in {{TOKENS_PATH}}.
2. Scoped Local Exception: Apply inline with /* @design-exception */ and log in {{DESIGN_DOC_PATH}}.
3. Revert to Spec: Align element back to the existing token contract.
```

---

## 3. Zero Silent Drift Mandate

- Never silently introduce an inline style (`style="..."`) or arbitrary CSS class that bypasses `{{TOKENS_PATH}}`.
- Any style rule diverging from the token contract that lacks both an inline `/* @design-exception */` comment and a matching entry in `{{DESIGN_DOC_PATH}}` is classified as **design drift** and must be flagged or reverted.

---

## 4. User Font & Style Supremacy

Default bans on commodity fonts (`Roboto`, `Inter`, `Plus Jakarta Sans`) or styles apply ONLY to unprompted AI defaults. If the user explicitly requests `Roboto`, `Inter`, or any custom font/color in chat, obey immediately by updating `tokens.css` (if global) or tagging `/* @design-exception */` (if local) with zero pushback.


