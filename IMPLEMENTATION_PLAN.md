# Implementation Plan

## Current Product State

The site is a static Vue 3 single-page introduction for `双星幻夜 (TwinStar Fantasia)`. The incumbent visual system is documented in `DESIGN.md`, and canonical character and creation-rule content comes from the Notion page `孤之界的 OC 設定 & 立繪` with its character detail pages.

## 2026-07-28 Critique Remediation

The first Impeccable critique scored `29/36` and identified five priority issues. The implemented response preserves the existing visual world and official artwork while making these focused changes:

1. Creation guidance now opens with a quick decision summary for `可直接創作`, `需先詢問`, and `禁止內容`, followed by the complete original terms grouped for scanning.
2. The guidelines modal includes a rules version and direct Email and X contact routes; Discord remains visible as the preferred contact handle.
3. Public-setting summaries and website-only narrative copy remain structurally distinct without adding visible source labels to the interface.
4. The 320px portrait hero has a smaller, tighter title composition that leaves Koro's horns and both faces unobscured.
5. The mobile resonance control sits inside the energy visual so the action and resulting animation remain in the same viewport.
6. Label and metadata text use a 0.75rem or 0.8125rem role scale, muted text contrast is raised, and touch controls maintain at least 44px height.
7. The creation-guidelines dialog uses a constrained flex column: its header keeps its intrinsic height while the content fills and scrolls within the remaining viewport, without fixed header-height subtraction.

## 2026-07-28 Resonance Section Simplification

The interactive `雙星共鳴` block (energy circles, star marker, and the toggle button) was judged redundant and removed. `TwinStarResonance` is now a compact editorial text strip that keeps the canonical copy, the `#resonance` anchor, and the `雙星` navigation item. All related `.resonance-visual`, `.energy`, `.resonance-star`, and `.resonance-button` styles and their responsive overrides were deleted. Verified with `npm run build` and screenshots at `1440x900` and `390x844`.

## 2026-07-28 Canonical Copy Alignment

Website summaries were aligned with the revised setting already synchronized to the canonical Notion source. The public copy now establishes that `月之息` and `夜之息` are complementary forces without inherent good or evil, uses the canonical terms `世界裂縫`, `上古夜禍`, and `夜行步`, and accurately summarizes the Starfall Valley encounter and `雙星現象`. Unsupported resonance effects were removed while canonical accuracy remains enforced through the content source and project documentation.

## 2026-07-29 Visible Source Label Removal

Visible `公開設定摘要` and `敘事導語` labels were removed from the hero, world, character, resonance, and encounter sections at the owner's direction. Canonical and website-only copy remain separated through component structure, source data, and documentation rather than interface labels.

## Verification

- `npm run build`
- Visual inspection at `1440x900`, `390x844`, and `320x568`
- Verify Koro's horns, both faces, and Yoraya's visible silhouette remain unobscured
- Open the guidelines modal and verify scrolling, Escape, close-button focus return, and no horizontal overflow
- Verify the guidelines modal at `320x568` and 200% browser zoom; the dialog must stay within the viewport and expose the complete terms through its internal scroll area
- Re-run `$impeccable critique src/App.vue` after implementation and compare against the `29/36` baseline

## Guardrails

- Do not remove or weaken the full creation terms when refining the quick summary.
- Do not relabel narrative presentation copy as canonical setting.
- Preserve the 320px hero clearance around Koro's horns.
