# 01 — Tech Stack & Budgets

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md). Acceptance targets: [`00-brief.md`](./00-brief.md).

## 1. Exact Stack

| Concern     | Choice                                             | Notes                                              |
| ----------- | -------------------------------------------------- | -------------------------------------------------- |
| Framework   | **Next.js (App Router)**                           | `output: 'export'` — fully static HTML/CSS/JS.     |
| Language    | **TypeScript**                                     | Strict mode on.                                    |
| Images      | **`next/image`**                                   | With `sizes`/`srcset`, AVIF + WebP, sRGB handling. |
| Theming     | **next-themes**                                    | Light/dark, system-aware, persisted (see §5).      |
| i18n        | **next-intl** (or equivalent, e.g. `next-i18next`) | English + Amharic (see §6).                        |
| Lint/format | **ESLint + Prettier**                              | Enforced pre-commit / in CI.                       |
| Deploy      | **Vercel**                                         | Static output; no server functions required.       |

### `next.config.js` essentials

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static export — no Node server at runtime
  images: {
    unoptimized: false, // pre-generate AVIF/WebP at build; see asset pipeline
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true, // stable static paths for /work/[slug]/
};
module.exports = nextConfig;
```

> With `output: 'export'`, `next/image` cannot use the on-demand optimizer. Either pre-optimize assets in the pipeline ([`05-asset-pipeline.md`](./05-asset-pipeline.md)) and serve them directly, or use a static loader. Responsive `sizes`/`srcset` still apply to the pre-generated variants.

## 2. Why Static Export over an SPA

- **SEO:** Fully-rendered HTML per route (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`) means crawlers and social scrapers get real content and per-project OpenGraph — critical for a recruiter-facing portfolio. An SPA ships an empty shell first.
- **Performance:** No client-side hydration waterfall to render content; HTML is on the CDN edge. Directly supports LCP < 2.5s and TBT < 200ms ([`00-brief.md`](./00-brief.md) §6.2).
- **No server:** Nothing to run, patch, or pay for. Vercel serves static files; the only dynamic dependency is the Web3Forms POST from the browser.

## 3. Performance Budget

| Budget                                             | Target                                                     |
| -------------------------------------------------- | ---------------------------------------------------------- |
| First-load JS (per route)                          | **≤ 130 KB gzip** ideally; hard ceiling 170 KB.            |
| Per-image weight (delivered variant)               | **≤ 150 KB** for standard, ≤ 250 KB for the LCP hero.      |
| Total images per project-detail (initial viewport) | Load only above-fold eagerly; rest lazy.                   |
| Fonts                                              | Self-hosted, subset, **`font-display: swap`**.             |
| Third-party JS                                     | None beyond Web3Forms POST (no analytics unless approved). |

### Font strategy

- Self-host and **subset** fonts; `font-display: swap` to avoid invisible text.
- Latin faces for EN; **Noto Sans Ethiopic** (Amharic-capable) for AM content.
- Preload only the display face used by the LCP hero.

## 4. Image Strategy

- **Placeholder foundation now:** the PDF-extracted rasters are low/presentation resolution. They are foundation only.
- **Drop-in replacement later:** high-res originals replace them 1:1 via the stable filename contract in [`05-asset-pipeline.md`](./05-asset-pipeline.md) — no code changes needed.
- **Blur placeholders** (`placeholder="blur"`) to protect CLS.
- **Responsive sizes:** generate multiple widths; supply accurate `sizes`.
- **Lazy load below the fold**; **eager + `priority`** for the LCP hero only.
- **sRGB:** convert/tag every delivered image to the sRGB color profile so colors are correct across browsers (see color-correctness rule in [`00-brief.md`](./00-brief.md) and [`02-design-system.md`](./02-design-system.md)).

## 5. Theming Requirements

- `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`.
- Persist choice in `localStorage`; respect `prefers-color-scheme` when unset.
- No flash of wrong theme (inline theme script before paint).
- Tokens for both themes defined in [`02-design-system.md`](./02-design-system.md).

## 6. Internationalization (EN / AM)

- Two locales: `en` (default) and `am`.
- Route strategy documented in [`03-information-architecture.md`](./03-information-architecture.md).
- Amharic content (incl. bilingual captions) renders in Noto Sans Ethiopic.
- Locale choice persisted; `<html lang>` updated per locale.

## 7. Accessibility Bar

- Full **keyboard navigation**; every interactive element reachable and operable.
- Visible **focus states** (never `outline: none` without a replacement).
- Honor **`prefers-reduced-motion`** (motion tokens in [`02-design-system.md`](./02-design-system.md)).
- **Semantic landmarks:** `header`, `nav`, `main`, `footer`, headings in order.
- Targets in [`00-brief.md`](./00-brief.md) §6.3 (Lighthouse a11y ≥ 95, WCAG 2.1 AA).

## 8. Environment Variables

| Var                                | Purpose                                   | Notes                                                                         |
| ---------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------- |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms access key for the contact form | Public by design (client POST). Store in `.env.local` and Vercel project env. |

No secrets require a server; the Web3Forms key is a public access key scoped to the form endpoint.
