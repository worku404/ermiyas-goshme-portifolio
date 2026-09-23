# 02 — Design System

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md). Consumed by every component in [`04-component-inventory.md`](./04-component-inventory.md).

Tokens, not adjectives. Everything below is a concrete value the builder implements as CSS custom properties.

## 1. Palette Concept

Grounded in **architecture vernacular** (paper, concrete, ink — architectural drawing materials) with a restrained nod to **Ethiopian / Aksumite earth tones**: a single ochre/terracotta accent. Neutral, calm, print-like; the work provides the color.

## 2. Color Tokens (CSS custom properties)

All text/background pairs below are verified against **WCAG 2.1 AA** (normal text needs ≥ 4.5:1; large text/UI ≥ 3:1). Ratios are stated per pair.

### Light theme (`:root`)

```css
:root {
  /* Surfaces */
  --color-bg: #f7f5f0; /* paper */
  --color-surface: #ffffff; /* raised card */
  --color-surface-2: #ece8e0; /* concrete */

  /* Text (ink) */
  --color-text: #1a1815; /* primary ink */
  --color-text-muted: #5c574f; /* secondary */

  /* Accent (ochre / terracotta) */
  --color-accent: #a8532a; /* terracotta */
  --color-accent-hover: #8e4522;
  --color-on-accent: #ffffff;

  /* Lines / borders */
  --color-border: #d8d2c7;
  --color-focus: #a8532a;
}
```

**Light contrast checks**

| Pair                                                    | Ratio   | Result                               |
| ------------------------------------------------------- | ------- | ------------------------------------ |
| `--color-text #1A1815` on `--color-bg #F7F5F0`          | ~14.9:1 | AA & AAA ✅                          |
| `--color-text #1A1815` on `--color-surface #FFFFFF`     | ~16.9:1 | AA & AAA ✅                          |
| `--color-text-muted #5C574F` on `--color-bg #F7F5F0`    | ~6.7:1  | AA (normal) ✅                       |
| `--color-on-accent #FFFFFF` on `--color-accent #A8532A` | ~5.1:1  | AA (normal) ✅                       |
| `--color-accent #A8532A` on `--color-bg #F7F5F0`        | ~4.6:1  | AA (normal) ✅                       |
| `--color-border #D8D2C7` on `--color-bg #F7F5F0`        | ~1.2:1  | Non-text border only (decorative) ✅ |

### Dark theme (`.dark`)

```css
.dark {
  /* Surfaces */
  --color-bg: #14120f; /* dark ink */
  --color-surface: #1e1b17;
  --color-surface-2: #262219;

  /* Text */
  --color-text: #f2eee6; /* paper on dark */
  --color-text-muted: #b3ac9f;

  /* Accent (lifted for dark contrast) */
  --color-accent: #e08b57; /* lighter terracotta */
  --color-accent-hover: #eea271;
  --color-on-accent: #1a1815;

  /* Lines / borders */
  --color-border: #35302a;
  --color-focus: #e08b57;
}
```

**Dark contrast checks**

| Pair                                                    | Ratio   | Result         |
| ------------------------------------------------------- | ------- | -------------- |
| `--color-text #F2EEE6` on `--color-bg #14120F`          | ~15.6:1 | AA & AAA ✅    |
| `--color-text #F2EEE6` on `--color-surface #1E1B17`     | ~13.7:1 | AA & AAA ✅    |
| `--color-text-muted #B3AC9F` on `--color-bg #14120F`    | ~8.7:1  | AA & AAA ✅    |
| `--color-accent #E08B57` on `--color-bg #14120F`        | ~7.6:1  | AA (normal) ✅ |
| `--color-on-accent #1A1815` on `--color-accent #E08B57` | ~7.6:1  | AA (normal) ✅ |

> **Color correctness rule** ([`00-brief.md`](./00-brief.md) #10): these ratios cover text contrast. The _image_ side of color correctness (sRGB profile handling) is enforced in the asset pipeline — [`05-asset-pipeline.md`](./05-asset-pipeline.md).

## 3. Typography

- **Type scale:** modular scale, **base 16px**, **ratio 1.25** (major third).

| Token       | rem   | ~px |
| ----------- | ----- | --- |
| `--fs-xs`   | 0.64  | 10  |
| `--fs-sm`   | 0.8   | 13  |
| `--fs-base` | 1.0   | 16  |
| `--fs-md`   | 1.25  | 20  |
| `--fs-lg`   | 1.563 | 25  |
| `--fs-xl`   | 1.953 | 31  |
| `--fs-2xl`  | 2.441 | 39  |
| `--fs-3xl`  | 3.052 | 49  |
| `--fs-4xl`  | 3.815 | 61  |

- **Font families:**
  - `--font-display`: a strong grotesque or display serif for headings (e.g. _Fraunces_ serif or _Space Grotesque_). Pick one and self-host.
  - `--font-body`: a readable sans for body (e.g. _Inter_).
  - `--font-am`: **Noto Sans Ethiopic** for Amharic content and bilingual captions.
- **Line height:** headings 1.1–1.2; body 1.6.
- **Measure:** body max ~66ch.

## 4. Spacing Scale

**4px base.** Tokens: `4, 8, 12, 16, 24, 32, 48, 64, 96`.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

## 5. Layout Concept

Grounded in **architectural drawing conventions**:

- Strong **grid** (12-col desktop, 4-col mobile) with a visible sense of alignment.
- **Generous whitespace** — let the drawings breathe like a plan sheet.
- **Strong baseline** rhythm; align type and images to the grid ("plan-like alignment").
- Thin rules/borders reminiscent of drawing linework (`--color-border`).

## 6. Breakpoints (mobile-first)

`360, 640, 768, 1024, 1280, 1536` (px).

```css
/* min-width breakpoints */
--bp-xs: 360px;
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

## 7. Motion Tokens

```css
:root {
  --dur-fast: 120ms;
  --dur-base: 200ms;
  --dur-slow: 360ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1.2);
}
```

**Reduced motion:** when `prefers-reduced-motion: reduce`, disable non-essential transitions/animations (durations → near 0, no parallax, no auto-advancing gallery).

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 8. Elevation & Border Tokens

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --border-hairline: 1px solid var(--color-border);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.16);
}
```

Prefer hairline borders over heavy shadows to keep the print/drawing feel; reserve shadows for lightbox and elevated overlays.

## 9. Focus State

```css
:where(a, button, [tabindex], input, textarea, select):focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```
