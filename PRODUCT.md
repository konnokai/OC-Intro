# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary users are fans and fan creators encountering or returning to `双星幻夜 (TwinStar Fantasia)`. They use the site to understand 皎朧 (Koro), 夜綾 (Yoraya), their shared world and relationship, and the boundaries that apply before publishing derivative work.

## Product Purpose

This site is the curated public introduction to TwinStar Fantasia. It presents the two characters, essential world and story context, ownership and illustration credits, contact routes, creation tags, and the complete creation guidelines in one accessible experience.

Success means a visitor can understand who the characters are, why their pairing matters, and how to create or ask permission without mistaking non-canonical presentation copy for official setting material.

## Positioning

The product combines a creator-owned character introduction with an authoritative, directly accessible creation and usage reference. Its value comes from connecting the characters and world to the actual owner, credited artists, approved assets, contact routes, and owner-controlled creation boundaries rather than acting as an unofficial fan summary.

## Operating Context

- Visitors browse a single public page on desktop or mobile, moving through the world introduction, individual character sections, the shared TwinStar phenomenon, encounter story, and creation guidance.
- The complete creation rules open in an in-page dialog so visitors can consult them without leaving the character experience.
- Fan creators use the published tags on social platforms and can contact 孤之界 through Discord, email, or X when a use is commercial, unclear, or requires approval.
- The Notion document `孤之界的 OC 設定 & 立繪`, including `皎朧詳細文字設定` and `夜綾詳細文字設定`, is the canonical source. The website is a selected public presentation of that material.

## Capabilities and Constraints

- The product is a static Vue single-page website deployed for public access through Cloudflare.
- It provides character and world introductions, responsive official artwork, an interactive TwinStar resonance moment, social-sharing metadata, ownership credits, contact details, creation tags, and an accessible creation-guidelines dialog.
- It has no accounts, private workflows, commerce, community posting, or user-generated content.
- Future work must not invent canonical biography, abilities, relationships, or world events. Non-canonical presentation copy must remain clearly distinguishable from established settings.
- Official character artwork must not be regenerated, redrawn, retouched, replaced, used for AI generation or training, or used in other AI-derived applications.
- Koro's horns must never be damaged, removed, or obscured. Snow imagery is not part of the approved Koro direction.
- Harmful or illegal content, misleading claims of official endorsement, and unapproved commercial or merchandise use are prohibited as specified in the creation guidelines.
- Full creation rules must remain available in the accessible in-page dialog rather than being replaced by an external-link-only flow.

## Brand Commitments

- Product and group name: `双星幻夜 (TwinStar Fantasia)`.
- Featured characters: `皎朧 (Koro)` and `夜綾 (Yoraya)`, presented as contrasting boundary guardians whose relationship is expressed through resonance rather than interchangeable profiles.
- Character owner and contact: `孤之界 (@Kon_no_kai)`.
- Character design and illustration: `九櫻 (@9saki_000)`.
- Hero background: `凡椛落盡 (@fanhua37)`.
- Contact email: `contact@konnokai.me`; Discord: `konnokai`.
- Creation tags: `綾朧來跨麥` and `綾朧有致`. The complete guidelines also define the R18 tag and allowed or prohibited content.
- Public-facing content uses Traditional Chinese, with established English or romanized names retained where useful.

## Evidence on Hand

- Canonical source: the Notion document `孤之界的 OC 設定 & 立繪` and its character detail pages.
- Curated character and story content: `src/data/characters.js` and `src/components/`.
- Complete creation boundaries and contact routes: `src/components/CreationGuidelines.vue`.
- Official character artwork and optimized delivery variants: `src/assets/characters/`.
- Approved hero artwork: `src/assets/background/Fanhua.webp`.
- Social-sharing source and deployable copy: `src/assets/OGImage.webp` when present and `public/OGImage.webp`.
- Public metadata and machine-readable summary: `index.html` and `public/llms.txt`.
- There are no testimonials, audience metrics, press claims, commercial results, or other proof assets in the repository; future work must not fabricate them.

## Product Principles

1. Canonical truth comes before promotional invention.
2. Character discovery and creation boundaries belong in the same public experience.
3. Ownership, artist credit, contact routes, and usage restrictions must remain explicit and accurate.
4. Koro and Yoraya should be understood through their contrast, shared guardianship, and TwinStar resonance.
5. The site should remain usable as an open, responsive, accessible reference without requiring an account or external document for essential rules.

## Accessibility & Inclusion

The public experience must preserve semantic structure, keyboard navigation, visible focus states, useful alternative text, a skip link, dialog focus management, and reduced-motion behavior. Both desktop and mobile layouts must keep character information and creation guidance readable and operable.
