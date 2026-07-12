# 双星幻夜 OC Introduction Website

## Project Goal

Build a single-page character introduction website for Cloudflare Pages based on the Notion documents:

- `孤之界的 OC 設定 & 立繪`
- `皎朧詳細文字設定`
- `夜綾詳細文字設定`

The site introduces 皎朧 (Koro) and 夜綾 (Yoraya) through a Japanese fantasy visual language centered on moonlight, night, boundary guardians, world fractures, and their shared `雙星現象`.

## Source And Rights Constraints

- Character design and illustration credit: 九櫻 (`@9saki_000`).
- Character owner/contact: 孤之界 (`@Kon_no_kai`).
- Use only the official transparent character images supplied in `src/assets/characters/`.
- Do not generate, redraw, extend, or modify character artwork with AI.
- Do not imply that this website is an official artwork created by the character illustrator.
- Do not use imagery involving damage to 皎朧's dragon horns.
- Keep the creation guidelines and contact route visible on the page.

## Design Direction

### Design Read

A narrative one-page OC introduction for character and Japanese fantasy audiences, using an asymmetric moon-boundary composition rather than a generic cherry-blossom template.

### Design Dials

- `DESIGN_VARIANCE: 8`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 4`

### Shared Visual Spine

- Core idea: `月與夜跨越界線`.
- Global palette: moon white, indigo, ink violet, and one restrained vermilion accent.
- One locked dark theme across the full page.
- Visual motifs: moon rings, shoji proportions, shrine boundary lines, braided cords, ink grain, and a vertical world fracture.
- Heading copy uses line breaks instead of punctuation to create rhythm.
- Avoid generic glass cards, AI-purple gradients, excessive glow, repeated three-column cards, and centered section headers.
- Do not use snow, snowflakes, or ice crystal motifs.
- Do not use Unicode emoji. Interface icons must use Font Awesome.

### 皎朧

- Motifs: moon ring, bamboo shadow, dragon horns, moon-breath markings, spiritual blade.
- Composition: stable vertical axis with controlled spacing.
- Character tone: restrained, quiet, protective, and action-oriented.
- Palette emphasis: moon white, silver, indigo, with restrained vermilion garment details.

### 夜綾

- Motifs: fox fire, night wind, cherry shadow, night brand, flowing ribbons.
- Composition: diagonal movement and more active negative space.
- Character tone: playful, perceptive, outwardly light, inwardly responsible.
- Palette emphasis: night violet, ink black, muted cherry, and shared vermilion details.

### Shared Story Beats

- The world fracture and ancient night calamity establish the conflict.
- The encounter at 星降之谷 is the central narrative turn.
- The `雙星現象` is the main interactive visual moment.
- Shared birthday `10/12` appears as a subtle paired detail.

## Page Structure

1. Sticky single-line navigation.
2. Initial-viewport hero using `background/Fanhua.webp` as a full-width scene, with typography placed in the darker left-side safe area.
3. World introduction explaining 幻月界, the growing fracture, and the two guardian roles.
4. 皎朧 profile with visual traits, personality, and combat language.
5. 夜綾 profile with visual traits, personality, and combat language.
6. Interactive `雙星現象` section where moon and night energies visually converge.
7. `星降之谷` encounter story in a concise three-part sequence.
8. Creation tags, condensed guidelines, contact information, and credits.

The creation-guidelines CTA opens an in-page modal containing the canonical Notion rules instead of navigating away. The modal traps keyboard focus, closes with Escape or the backdrop, locks background scrolling, and returns focus to its trigger.

The closing section uses an asymmetric rules-ledger composition: important boundaries occupy the dominant column, while creation tags and contact routes form the supporting column. The footer pairs a large group signature with a three-row credit ledger and includes the hero background credit.

On the `resonance-option-3` branch, the resonance statement uses an editorial hierarchy instead of two equal headings. `靠近彼此時` becomes a restrained lead-in, while the single semantic heading is split into two offset lines to give the copy more breathing room and visual movement.

## Technical Stack

- Vue 3 with Composition API.
- Vite.
- Tailwind CSS v4 through `@tailwindcss/vite`.
- Font Awesome Vue integration using individually imported icons.
- Native Intersection Observer for reveal states.
- CSS transforms and opacity only for animated movement.
- No Vue Router for the first release; navigation uses section anchors.
- No SSR, Workers, or Pages Functions.

## Project Structure

```text
public/
  _headers
  robots.txt
src/
  assets/characters/
  components/
    CharacterKoro.vue
    CharacterYoraya.vue
    CreationGuidelines.vue
    EncounterStory.vue
    HeroBoundary.vue
    SiteNavigation.vue
    TwinStarResonance.vue
    WorldIntroduction.vue
  data/characters.js
  App.vue
  main.js
  style.css
index.html
package.json
vite.config.js
```

## Responsive Strategy

- Desktop hero uses the full-width `Fanhua.webp` scene with an asymmetric dark text scrim on the left.
- Landscape tablet and mobile preserve the complete artwork above the copy.
- Portrait layouts use a centered full-height crop and split the hero copy into top and bottom groups, leaving the middle clear for both characters.
- All multi-column sections collapse to a strict single column below `768px`.
- Navigation becomes a compact accessible menu below `900px`.
- No `100vh`; use dynamic viewport units for the hero.

## Accessibility And Motion

- Semantic landmarks and heading order.
- Visible keyboard focus states.
- Accessible navigation menu and resonance toggle state.
- Meaningful image alt text.
- Body and control contrast meet WCAG AA.
- All nonessential motion stops under `prefers-reduced-motion: reduce`.
- No scroll event listener; Intersection Observer handles section reveals.

## Cloudflare Pages Deployment

- Framework preset: Vue.
- Build command: `npm run build`.
- Output directory: `dist`.
- Node.js: 22.
- `.nvmrc` and `package.json#engines` pin a compatible Node runtime.
- Static deployment only.
- `public/_headers` defines security headers and long-lived asset caching.
- HTML remains revalidatable so new deployments appear immediately.
- If Vue Router is added later, add a `public/_redirects` SPA fallback at that time.

## Asset Performance

- Original transparent PNG files remain the source of truth.
- Character images declare intrinsic dimensions to prevent layout shift.
- Character images appear below the fold and use lazy loading where applicable.
- Transparent WebP derivatives are included for delivery, with the original PNG files retained as fallback and source of truth.
- The hero scene is loaded eagerly with high fetch priority because it is the LCP image.
- Target LCP below 2.5 seconds and CLS below 0.1.

## Verification Checklist

- `npm run build` succeeds.
- No broken asset paths in `dist`.
- Desktop navigation stays on one line.
- Mobile menu works with pointer and keyboard.
- Hero CTA remains visible within the initial laptop viewport.
- Both character sections are readable at 375px width.
- Reduced-motion mode removes automatic movement.
- No emoji or hand-drawn icon SVG appears in the interface.
- Credits and AI-use restriction remain visible.
- Lighthouse and real-device checks are recommended before public launch.

## Session Continuation Notes

When continuing in a new session, read this file first, then inspect `src/data/characters.js` and `src/App.vue`. Preserve the official artwork and the no-AI-art constraint. Prefer small changes and keep the shared theme locked to moon white, indigo, ink violet, and restrained vermilion.
