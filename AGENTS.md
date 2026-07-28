# AGENTS.md

## Project Overview

This project is a single-page character introduction website for `双星幻夜 (TwinStar Fantasia)`, featuring `皎朧 (Koro)` and `夜綾 (Yoraya)`.

The canonical content source is the Notion document `孤之界的 OC 設定 & 立繪`, including the child pages `皎朧詳細文字設定` and `夜綾詳細文字設定`.

`PRODUCT.md` records durable product truth, audience priorities, capabilities, constraints, and brand commitments. Read it before product or design decisions and keep visual-system choices in their own design documentation.

`DESIGN.md` records the incumbent visual system and is the authority for visual tokens, layout grammar, depth, shapes, components, and design guardrails. `.impeccable/design.json` is its generated extension for design-tool previews and must be regenerated whenever `DESIGN.md` is regenerated.

Read `IMPLEMENTATION_PLAN.md` before making substantial design, content, architecture, or deployment changes.

## Working Directory

Use the mapped project path for all commands:

```text
W:\網站\OC-Intro
```

Do not use the underlying IP or UNC path in instructions, documentation, or commands unless the mapped drive is unavailable.

## Technology

- Vue 3 with Composition API
- Vite
- Tailwind CSS v4 through `@tailwindcss/vite`
- Font Awesome Vue components
- Static deployment on Cloudflare Pages
- Node.js 22, recorded in `.nvmrc`

Common commands:

```powershell
npm install
npm run dev
npm run build
npm run preview
```

Cloudflare Pages settings:

```text
Build command: npm run build
Build output directory: dist
Node.js version: 22
```

## Design Direction

Follow the installed taste/design skills for visually significant frontend work. The result must feel intentionally art-directed rather than like a generic anime, portfolio, or AI-generated landing-page template.

Core direction:

- Japanese-inspired dark fantasy and restrained wa-fu visual language
- Asymmetric editorial composition
- Moonlit boundary imagery connecting both characters
- Strong typography, negative space, and controlled layering
- Heading text uses line breaks for pauses and does not include punctuation marks
- Mobile and desktop layouts must both feel composed
- Preserve the existing visual system unless a redesign is explicitly requested

Current hero direction:

- `HeroBoundary` uses `src/assets/background/Fanhua.webp` as the official full-width scene artwork.
- Desktop places the title in the darker left side of the artwork and preserves the characters and moon at center-right.
- Portrait mobile uses a centered crop with the title above and supporting copy plus CTA below, leaving the middle of the scene clear for both characters.
- Preserve clear space around the hero title and CTA; overlays must not obscure faces, Koro's horns, or Yoraya's tail.

Avoid:

- Generic card grids and excessive rounded containers
- Glassmorphism used as a default visual treatment
- Repeated feature-card layouts
- Decorative elements without narrative purpose
- Excessive gradients, glows, badges, pills, or microcopy
- Unicode emoji in the interface

Use Font Awesome for interface icons. Decorative motifs should preferably be implemented through CSS or existing visual assets rather than emoji.

## Character Direction

### 皎朧 / Koro

- Themes: moon wheel, bamboo shadow, boundary, stillness, protection
- Palette: moon white, silver, indigo
- Composition: stable and predominantly vertical
- Personality: quiet, restrained, protective through action
- Weapon and abilities: `月影`, moon breathing, `崩月斬`, `鏡花水月`, barriers
- Do not use snow imagery. Snow was removed from the approved visual direction even if older source material mentions it.
- Never damage, remove, or obscure the character's horns in artwork treatment.

### 夜綾 / Yoraya

- Themes: night fox, cherry blossom, wind, illusion, fox fire
- Palette: night purple, cherry pink, ink black
- Composition: more kinetic and playful than Koro's sections
- Personality: playful, perceptive, emotionally observant
- Abilities: `狐火`, `幻影分身`, `夜行步`
- The left-hand night mark is a meaningful character detail.

### Shared Narrative

- Both characters are boundary guardians.
- Their relationship should be expressed through contrast and resonance rather than mirrored profile cards.
- Important concepts include `世界裂縫`, `上古夜禍`, `星降之谷`, and `雙星現象`.

## Assets

Character artwork is stored in:

```text
src/assets/characters/
src/assets/background/
```

The character PNG files are the user-provided transparent source illustrations. WebP variants are optimized delivery assets. `background/Fanhua.webp` is the approved hero scene. Preserve PNG fallbacks when changing character image rendering.

Do not regenerate, redraw, retouch, or replace official character artwork with generative AI. Do not use the artwork for AI training or other AI-derived asset generation.

## Content And Rights

Keep visible credit and usage guidance accurate:

- Group: `双星幻夜 (TwinStar Fantasia)`
- Character owner/contact: `孤之界 (@Kon_no_kai)`
- Design and illustration: `九櫻 (@9saki_000)`
- Hero background: `凡椛落盡 (@fanhua37)`
- Contact email: `contact@konnokai.me`
- Discord: `konnokai`
- Creation tags: `綾朧來跨麥`, `綾朧有致`

Explicit restrictions include no AI generation/training/use, no damage to Koro's horns, and no harmful or illegal content.

Do not invent new canonical biography, abilities, relationships, or world events. Clearly separate non-canonical presentation copy from established settings.

Character and setting introductions may intentionally use poetic exaggeration, dramatic declarations, and heightened fantasy language. Do not treat those forms as AI-writing defects by themselves; review them for canonical accuracy, provenance, and readability instead.

## Implementation Rules

- Prefer small, focused changes that preserve the existing component structure.
- Keep content data in `src/data/characters.js` when practical.
- Keep canonical summaries accurate and website-only prose structurally distinct, but do not add visible source labels such as `公開設定摘要` or `敘事導語` to the interface.
- Maintain semantic HTML, keyboard accessibility, useful alternative text, and visible focus states.
- Keep the full creation rules in the accessible in-page modal opened by `CreationGuidelines`; do not restore the CTA as a new-tab Notion link.
- Keep the creation-guidelines quick check in the modal before the full terms, including `可直接創作`, `需先詢問`, `禁止內容`, the rules version, and direct contact routes.
- Respect `prefers-reduced-motion` for all new animations.
- Avoid adding dependencies when CSS or an existing package can solve the problem cleanly.
- Use responsive image formats and avoid increasing initial page weight unnecessarily.
- Do not introduce Unicode emoji as icons.
- Verify both desktop and mobile layouts after visual changes.

## Documentation Maintenance

- Treat `AGENTS.md` as a living source of project instructions, not a static handoff file.
- Automatically update `AGENTS.md` in the same change whenever implementation work alters project structure, key files, technology, commands, design direction, canonical content rules, asset handling, accessibility requirements, deployment behavior, or verification steps.
- Do not wait for a separate user request when an implemented change makes any instruction in this file outdated or incomplete.
- Keep updates concise and factual. Remove or revise obsolete instructions instead of only appending new ones.
- Continue recording detailed implementation history and significant architecture, content, or deployment decisions in `IMPLEMENTATION_PLAN.md`; keep `AGENTS.md` focused on current operating rules.

## Cloudflare Pages

The site is a static Vite application. Deployment-specific files are under `public/`, including `_headers` and `robots.txt`.

`src/assets/OGImage.webp` is the source social-sharing image. Keep `public/OGImage.webp` synchronized as its deployable copy and reference `/OGImage.webp` from page metadata.

Keep long-lived immutable caching limited to fingerprinted assets. Keep `index.html` revalidated so new deployments become visible promptly.

Before considering a task complete, run:

```powershell
npm run build
```

The build must produce `dist/` without errors.

## Key Files

```text
AGENTS.md                    Current project instructions; update automatically when they change
PRODUCT.md                   Durable product truth and constraints
DESIGN.md                    Incumbent visual-system authority
.impeccable/design.json      Design-system preview metadata and component snippets
.impeccable/live/config.json Impeccable Live entry and CSP-check configuration
IMPLEMENTATION_PLAN.md       Project plan and continuation notes
src/App.vue                  Page composition and reveal behavior
src/style.css                Design system and responsive styling
src/data/characters.js       Character and world content data
src/components/              Page sections and navigation
src/assets/OGImage.webp      Source social-sharing image
src/assets/characters/       Official character artwork
public/OGImage.webp          Stable deployed social-sharing image
public/_headers              Cloudflare response headers and caching
vite.config.js               Vue and Tailwind Vite integration
```

## Session Handoff

When continuing in a new session:

1. Read this file, `PRODUCT.md`, `DESIGN.md`, and `IMPLEMENTATION_PLAN.md`.
2. Inspect the current files before proposing or making changes.
3. Preserve the no-snow Koro direction and the contrast between Koro and Yoraya.
4. Use Font Awesome rather than Unicode emoji.
5. Run the production build after implementation.
6. Record significant architecture, content, or deployment decisions in `IMPLEMENTATION_PLAN.md`.
