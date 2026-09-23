# 03 — Information Architecture

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md). Content source: [`../content/portfolio.json`](../content/portfolio.json).

## 1. Sitemap

```
/                     Home — hero, about summary, featured work, contact CTA
/work                 All projects grid (all 10)
/work/[slug]          Deep-linkable project detail
/about                Full bio, education, skills, interests, languages
/contact              Web3Forms form + tel: / obfuscated email
/cv                   CV download (page or direct file link)
```

Locale-aware variants of every route (see §7).

## 2. Project Slugs (all 10, from the content model)

`/work/[slug]` where `slug` is one of:

1. `ethiopian-orthodox-church-design`
2. `enda-mikael-palace-reimagination`
3. `climate-responsive-high-school`
4. `street-playground`
5. `adaptive-corridor-residential`
6. `adaptive-corridor-community-hall`
7. `eiabc-football-field-landscape`
8. `compact-climate-responsive-house`
9. `urban-spine-revitalization`
10. `breathable-clay-wall-system`

Slugs are the **stable contract**. They match `projects[].slug` in `portfolio.json` and the image folder names in [`05-asset-pipeline.md`](./05-asset-pipeline.md) (`public/images/work/<slug>/`). Never rename a slug without updating all three.

## 3. Navigation

**Header (`SiteHeader`):** logo/name → Home; nav links: Work, About, Contact; `ThemeToggle`; `LocaleSwitcher`; a compact "Download CV" affordance. Collapses to a menu below `md`.

**Footer (`SiteFooter`):** name, obfuscated email, `tel:` phone, quick links (Work / About / Contact / CV), locale + theme mirror, copyright.

## 4. Home Page Sections (`/`)

1. **Hero** — name, status line ("3rd year architecture student"), primary CTAs **View Work** + **Download CV**, one strong LCP image (eager).
2. **About summary** — trimmed intro; link to `/about`.
3. **Featured work** — a curated subset of `ProjectCard`s; link to `/work`.
4. **Contact CTA** — invitation + link to `/contact`.

## 5. Project Detail Template (`/work/[slug]`)

Rendered from a single project object in `portfolio.json`:

- **Title** (`fullTitle`) and **type** (`type`); `organizer` if present.
- **Description** (`description`, verbatim).
- **Achievement** — shown only if `achievement` is non-null (e.g. Project 1 certificate).
- **Key concepts** — bullet list if `keyConcepts` present (e.g. Project 3).
- **Image gallery / lightbox** — from `images[]`; keyboard accessible (see [`04-component-inventory.md`](./04-component-inventory.md)). Real images only.
- **Bilingual captions** — `caption` / `captionAm` where present.
- **Prev / Next** navigation across projects in `portfolio.json` order.
- **`NEEDS_REVIEW` banner** for Project 10 until owner confirms.

## 6. Breadcrumbs, Deep-Linking & Social Meta

- **Breadcrumbs:** `Home / Work / <project title>` on detail pages.
- **Deep-linking:** every `/work/[slug]` is a real static HTML file (static export) — shareable and directly crawlable.
- **OpenGraph per project:** each detail page emits per-project `og:title`, `og:description` (from `description`), `og:image` (project hero), `og:url`, plus Twitter card tags. Handled by the SEO/Meta component ([`04-component-inventory.md`](./04-component-inventory.md)).
- **Home/other routes:** site-level default OG image and metadata.
- **sitemap.xml + robots.txt** generated at build (see Prompt 3 in [`06-ai-build-prompts.md`](./06-ai-build-prompts.md)).

## 7. Locale Routing (EN / AM)

- Default locale `en`; second locale `am`.
- **Approach:** prefixed routing via next-intl — `en` may be unprefixed (default) while `am` is served under `/am/...` (e.g. `/am/work/ethiopian-orthodox-church-design`). Alternatively use prefix-for-all if the i18n lib requires it; document the final choice in the scaffold.
- `<html lang>` reflects the active locale; `LocaleSwitcher` preserves the current route when switching.
- Amharic content uses Noto Sans Ethiopic ([`02-design-system.md`](./02-design-system.md)).
- Add `hreflang` alternate links per route for SEO.

## 8. CV

- `/cv` either presents a download page or redirects to the static CV file (e.g. `public/cv/Ermiyas-Goshme-CV.pdf`).
- The `CVDownloadButton` (primary CTA) links directly to the file with a `download` attribute.
