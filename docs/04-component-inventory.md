# 04 — Component Inventory

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md).
> Tokens: [`02-design-system.md`](./02-design-system.md). Routes: [`03-information-architecture.md`](./03-information-architecture.md). Content: [`../content/portfolio.json`](../content/portfolio.json).

Props are TypeScript-ish. Every component honors theme + locale + reduced-motion. **Real images only** — never generate imagery.

---

## Container / Section (layout primitives)

- **Purpose:** consistent max-width, gutters, and vertical rhythm from the spacing scale.
- **Props:** `Container { as?: ElementType; size?: 'default' | 'wide' | 'full'; children }` · `Section { as?: ElementType; spacing?: 'sm' | 'md' | 'lg'; children }`
- **States:** none.
- **Acceptance:**
  - Uses spacing/breakpoint tokens; no hard-coded px in consumers.
  - `Section` renders as a semantic landmark or region when appropriate (`aria-labelledby`).

## SiteHeader

- **Purpose:** top navigation with theme + locale controls and CV affordance.
- **Props:** `{ locale: 'en' | 'am' }`
- **Composes:** `ThemeToggle`, `LocaleSwitcher`, `CVDownloadButton` (compact).
- **States:** default, scrolled (optional condensed), mobile-menu open/closed.
- **Acceptance:**
  - Rendered inside `<header>` with a `<nav>` landmark.
  - Mobile menu fully keyboard operable; focus trapped while open; `Esc` closes.
  - Current route link marked `aria-current="page"`.

## SiteFooter

- **Purpose:** secondary nav, obfuscated contact, copyright.
- **Props:** `{ locale }`
- **States:** none.
- **Acceptance:**
  - Rendered in `<footer>`; phone is a `tel:` link; email obfuscated.
  - All links keyboard reachable with visible focus.

## ThemeToggle

- **Purpose:** switch light/dark, system-aware, persisted.
- **Props:** none (reads/writes next-themes).
- **States:** light, dark, system; hover/focus/pressed.
- **Acceptance:**
  - Has accessible name (e.g. `aria-label="Toggle color theme"`); state exposed via `aria-pressed` or equivalent.
  - No flash of wrong theme on load; choice persists across reloads.
  - Operable by keyboard.

## LocaleSwitcher

- **Purpose:** switch EN ↔ AM, preserving the current route.
- **Props:** `{ locale }`
- **States:** en active, am active; hover/focus.
- **Acceptance:**
  - Switching keeps the user on the same page (equivalent localized route).
  - Updates `<html lang>`; persists choice.
  - Accessible name; keyboard operable.

## Hero

- **Purpose:** home headline, status line, primary CTAs, LCP image.
- **Props:** `{ name: string; statusLine: string; ctaPrimaryHref: string; cvHref: string; image: ImageRef }`
- **States:** default.
- **Acceptance:**
  - Contains exactly one `<h1>`.
  - Hero image is the LCP element: `priority`/eager, correct `sizes`, blur placeholder — supports LCP < 2.5s ([`00-brief.md`](./00-brief.md)).
  - CTAs are real links ("View Work", "Download CV") reachable by keyboard.

## AboutSection

- **Purpose:** bio + education + interests + languages (full on `/about`, trimmed on home).
- **Props:** `{ about: string; owner: Owner; variant: 'summary' | 'full' }`
- **States:** summary, full.
- **Acceptance:**
  - Renders `about` text verbatim from `portfolio.json`.
  - `full` variant lists education, interests, software, languages — none dropped.

## SkillsList

- **Purpose:** display software/skills.
- **Props:** `{ items: string[]; label?: string }`
- **States:** none.
- **Acceptance:**
  - Semantic list markup.
  - Order matches `owner.software` in the content model.

## ProjectCard

- **Purpose:** summary tile linking to `/work/[slug]`.
- **Props:** `{ slug: string; title: string; type: string; cover: ImageRef; locale }`
- **States:** default, hover, focus.
- **Acceptance:**
  - Entire card is a single, keyboard-focusable link with a discernible name.
  - Cover image has alt text; lazy-loaded (unless above fold).
  - Title/type come straight from content; no invented copy.

## ProjectGrid

- **Purpose:** responsive grid of `ProjectCard`s (`/work` and featured section).
- **Props:** `{ projects: Project[]; locale; limit?: number }`
- **States:** default.
- **Acceptance:**
  - Preserves `portfolio.json` project order.
  - Responsive columns per breakpoint tokens; no layout shift on image load.

## ProjectDetail

- **Purpose:** full project page template ([`03-information-architecture.md`](./03-information-architecture.md) §5).
- **Props:** `{ project: Project; prev?: NavRef; next?: NavRef; locale }`
- **States:** with/without `achievement`, with/without `keyConcepts`, `NEEDS_REVIEW` present.
- **Acceptance:**
  - Renders title, type, description verbatim; shows achievement/keyConcepts only when present.
  - Shows a `NEEDS_REVIEW` banner for Project 10 until owner confirms.
  - Composes `ImageGallery` with real images; prev/next are keyboard links.

## ImageGallery / Lightbox

- **Purpose:** browse a project's real images; open enlarged view.
- **Props:** `{ images: PortfolioImage[]; locale }`
- **States:** closed, open, current index; loading.
- **Acceptance:**
  - Fully keyboard accessible: open on `Enter`/`Space`, arrows change image, `Esc` closes, focus trapped, focus returns to trigger on close.
  - `role="dialog"` + `aria-modal="true"` + labelled; images have alt text.
  - Honors `prefers-reduced-motion` (no auto-advance / heavy transitions).

## CaptionedImage

- **Purpose:** an image with a bilingual caption.
- **Props:** `{ image: PortfolioImage; locale }` where `PortfolioImage = { src; alt; altAm?; caption?; captionAm?; width; height }`
- **States:** with/without caption.
- **Acceptance:**
  - Uses `next/image` with `width`/`height` (no CLS) and correct `sizes`.
  - Shows `caption`/`captionAm` per active locale; `alt`/`altAm` chosen per locale.
  - Never a generated image — `src` resolves under `public/images/work/<slug>/`.

## ContactForm

- **Purpose:** send a message via Web3Forms (client POST).
- **Props:** `{ accessKey: string; locale }`
- **States:** idle, validating, submitting, success, error.
- **Acceptance:**
  - POSTs to Web3Forms with `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; includes honeypot.
  - Inline validation with `aria-invalid` + `aria-describedby`; errors announced via a live region.
  - Success and error states clearly communicated; no page reload; keyboard operable.

## CVDownloadButton

- **Purpose:** download the CV.
- **Props:** `{ href: string; variant?: 'primary' | 'compact'; label?: string }`
- **States:** default, hover, focus.
- **Acceptance:**
  - Real link to the static CV file with `download`; accessible name "Download CV".
  - Meets AA contrast in both themes (see [`02-design-system.md`](./02-design-system.md)).

## SEO / Meta

- **Purpose:** per-route metadata + OpenGraph/Twitter, `hreflang`, canonical.
- **Props:** `{ title; description; ogImage; url; locale; type?: 'website' | 'article' }`
- **States:** none.
- **Acceptance:**
  - Emits title, description, canonical, OG + Twitter tags, and `hreflang` alternates.
  - Project pages use per-project title/description/hero ([`03-information-architecture.md`](./03-information-architecture.md) §6).
