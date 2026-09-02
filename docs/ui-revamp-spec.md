# UI Revamp Spec — Mofusand Theme

Status: planned, not started. Palette-only direction; no cat imagery.

## 1. Goal

Replace the current plain beige/earth-brown theme with a **mofusand-inspired palette**: soft pastel cream, sakura pink, powder blue, and mint — "sophisti-cute" (soft and rounded, but stylish, not childish).

## 2. Non-Goals

- No cat illustrations, mascots, or mofusand assets (user will source separately later).
- No layout/structure changes (grid, routing, masonry stay as-is).
- No new dependencies.

## 3. Design Tokens

Replace in `src/index.css` `:root`:

| Token | Current | New | Role |
| --- | --- | --- | --- |
| `--bg-color` | `#f5f5dc` beige | `#FFF8F2` cream | page background |
| `--bg-accent` | `#e8e4d9` darker beige | `#FDF0E7` warm shell | section/card fill |
| `--bg-pink` | — (new) | `#F9D7D3` | alternate section band, hover fills |
| `--bg-blue` | — (new) | `#D6EBF0` | alternate section band, badges |
| `--bg-mint` | — (new) | `#DFF0E2` | skeleton/empty-state fill |
| `--text-primary` | `#2d2d2d` | `#443A34` warm brown-gray | headings/body |
| `--text-secondary` | `#5a5a5a` | `#8A7A70` | meta text |
| `--accent-color` | `#8b7d6b` brown | `#E8A0A6` dusty rose | links, hovers, selection, focus |
| `--accent-deep` | — (new) | `#C97B84` | accent text on pastel fills |
| `--radius-soft` | — (new) | `12px` | inputs, chips, small cards |
| `--radius-round` | — (new) | `24px` | large cards, modal |
| `--shadow-soft` | — (new) | `0 8px 24px rgba(68, 58, 52, 0.08)` | card elevation |
| `--shadow-lift` | — (new) | `0 16px 40px rgba(68, 58, 52, 0.14)` | hover elevation |

Contrast (must pass WCAG AA at 4.5:1 for body text):
- `#443A34` on `#FFF8F2` ≈ 9.5:1 — pass.
- `#C97B84` (accent-deep) used for accent *text*, not `#E8A0A6` — `#E8A0A6` is decorative/fill only.
- White text is forbidden on pink/mint/blue fills; use `--text-primary` instead.

## 4. Typography

Keep a two-font library, consistent across all text:
- **Serif/display: Antic Didone** (Google Fonts, single weight) — replaces Playfair Display everywhere.
- **Sans: Inter** (300–600).

Hero composition: `mofu_header.png` cutout is fixed to the far left with a `10px` left overflow so it remains visible while the home page scrolls. It uses up to `760px` height on desktop and roughly `30vw` on mobile, where it stays top-left above centered text. The hero has a solid `--blue-brand` background and white Antic Didone title. Navbar switches to white text while over the hero, dark text on the cream glass when scrolled or on inner pages. The bottom curtain hem generates 6 scallops on mobile and up to 20 on wider screens.

## 5. Component Changes

All changes are restyling only; classNames and DOM stay the same.

- **Grain overlay** (`index.css`): keep, drop opacity 0.03 → 0.02 so pastels read clean.
- **Nav**: scrolled glass `rgba(245,245,220,.8)` → `rgba(255,248,242,.75)`; logo hover color `--accent-deep`.
- **Hero**: solid `--blue-brand` (`#70A2B6`, taken from mofusand.com) background; title and subtitle in white, mimicking the mofusand logo treatment. No gradients.
- **CategoriesSection**: cards get `--radius-round`, `--shadow-soft` → `--shadow-lift` on hover; no scroll reveal or scale transform, preserving the grid gaps.
- **CategoryPage project grid**: show all brand projects directly in compact, consistent 3:4 portrait tiles; group tiles under each brand heading.
- **FeaturedWorks**: item radius → `--radius-soft`; overlay gradient darkened slightly (text-primary at 70%) to keep AA on pastel images.
- **Carousel**: dots idle `rgba(255,255,255,.5)` → `rgba(68,58,52,.25)`; active dot `--accent-deep`; nav buttons keep dark glass (fine on pastel).
- **Modal**: image-first presentation with a lighter translucent overlay, compact floating header, transparent media background, and no side borders.
- **Skeleton**: fill `--bg-mint`, shimmer highlight `rgba(255,255,255,.6)`.
- **Contact**: contact-link cards → `--bg-blue` fill, `--radius-soft`, `--shadow-soft`; hover shadow-lift.
- **Buttons/links**: `:focus-visible` outline color `--accent-deep`, width 2px (keep existing offset).
- **Footer**: background band `--bg-accent`, text `--text-secondary`.
- **Selection**: `::selection` background `--accent-color` with `--text-primary` text.
- **Not-found page**: center card on `--bg-pink` with `--radius-round`.

## 6. Motion

Patterns selected from motion.dev docs (React animation + scroll animations guides). All available in the existing `framer-motion` dependency — imports below use `framer-motion`, not `motion/react`.

### 6.1 Softened springs (global feel)

Physical values (`x`, `scale`) default to springs in Motion; tune them plush rather than snappy. Wrap the app root in `MotionConfig` once:

```tsx
import { MotionConfig } from 'framer-motion';

<MotionConfig transition={{ type: 'spring', stiffness: 150, damping: 25 }}>
```

### 6.2 Hover/tap gestures on cards (replaces CSS translateY hovers)

Plush press feel via `whileHover`/`whileTap`; pair with the shadow tokens so elevation animates too:

```tsx
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
```

Remove the `translateY(-5px/-8px)` CSS hovers on category/featured cards — gesture scale + `--shadow-lift` reads softer.

### 6.3 Stagger via variants (replaces manual `delay: index * 0.1`)

Variants propagate down the tree; `delayChildren` + `stagger` orchestrate cleanly. Apply to category brand sections and featured masonry:

```tsx
const list = {
  visible: { transition: { staggerChildren: 0.08 } },
  hidden: {},
};
const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

<motion.ul initial="hidden" whileInView="visible" viewport={{ once: true }} variants={list}>
  <motion.li variants={item} />
</motion.ul>
```

### 6.4 Blur-to-sharp enter ("mofu-mofu" reveal)

Motion animates `filter`; a blur-in matches the fluffy theme for hero and page headers:

```tsx
<motion.div initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 0.8 }}>
```

### 6.5 Scroll progress bar (Nav)

`useScroll` + `useSpring` linked to `scaleX` — a brand-blue progress hairline under the nav:

```tsx
import { useScroll, useSpring, motion } from 'framer-motion';

const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

<motion.div style={{ scaleX, originX: 0 }} />
```

### 6.6 Category card scroll effects

Dropped. Category cards remain stable while scrolling so their borders, margins, and grid gaps stay visually intact.

### 6.7 Hero parallax wash

Dropped — the hero is now a solid brand-blue panel per §5, so there is no wash layer to parallax.

### Not adopted (with reasons)

- Horizontal scroll sections / text tickers — layout change, out of scope per §2.
- `arc()` path animations — no cart-fly-to style interaction here.
- Animated CSS variables — paint-heavy; no current need.
- Custom cursor — gimmicky for a portfolio, conflicts with pastel softness.

`prefers-reduced-motion` handling already in place; Motion's `useReducedMotion` can gate the progress bar and page reveals individually if needed.

## 7. Implementation Phases

1. Tokens + base styles (`index.css`) — everything else inherits.
2. Shared surfaces: cards, skeleton, modal, focus/selection.
3. Section accents: Nav, solid Hero, category project sections, Contact.
4. Motion pass.

Each phase is independently shippable and verifiable with `npm run lint && npm run build`.

## 8. Acceptance Criteria

- All text meets WCAG AA (4.5:1 body, 3:1 large) — spot-check hero, card overlays, modal header, footer.
- No hard-coded old hex values remain outside the token block (grep `#f5f5dc|#e8e4d9|#8b7d6b|#2d2d2d` → 0 in `src/`).
- Layout pixel-close to current (only color/radius/shadow differ).
- Reduced-motion and keyboard focus still work as shipped.
- Existing checks pass: `test:content`, `lint`, `build`, `audit`.

## 9. Open Items for User

- Final asset direction (deferred — this spec is palette-only).
- Whether a rounder sans (Quicksand) is wanted later.
- Brand-card color rotation: strict rotation vs. single pink fill.
