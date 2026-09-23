# 00 — Project Brief

> Part of the **BroPortfolio spec repo**. Read order and index: [`README.md`](./README.md).
> Content ground truth: [`../content/portfolio.json`](../content/portfolio.json).

## 1. Goal

Build a **static architecture portfolio website** for a 3rd-year architecture student. The site is a **general portfolio shown to people** (not a private link), and it includes a **CV download feature**.

- **Primary CTAs:** **"View Work"** and **"Download CV"**.
- The site must present the owner's real academic projects and let a visitor download the CV in one click.

## 2. Audience

- **Recruiters / firms** scanning quickly for competence and range.
- **Professors / academics** evaluating design thinking and rigor.
- **General viewers** (peers, family, network) browsing casually.

Design for the recruiter's 20-second scan first, then reward deeper reading.

## 3. Owner

- **Name:** Ermiyas Goshme
- **Role:** Architecture Student (3rd year), Addis Ababa University (EiABC/SBE)
- **Contact:** email `ermiermiyas000@gmail.com` (obfuscated on page), phone `+251996631973` (as a `tel:` link)

All owner data is authoritative in [`../content/portfolio.json`](../content/portfolio.json) under `owner`.

## 4. Non-Goals

- **No CMS.** Content lives in `content/portfolio.json`, edited by hand.
- **No database.** Nothing server-side; fully static.
- **No blog.**
- **No AI-generated images.** The builder must **display the owner's real images** as content only.
- **No server / backend.** Contact form uses Web3Forms (third-party POST). Static export deployed to Vercel.

## 5. Core Rules (encode everywhere)

1. **Content is GROUND TRUTH** from the PDF via `content/portfolio.json`. Never invent, embellish, reorder, or drop content.
2. **Display real images only.** Never generate or "reimagine" imagery.
3. **Current PDF-extracted images are placeholder foundation** — swapped later via a stable folder/filename contract (see [`05-asset-pipeline.md`](./05-asset-pipeline.md)).
4. **Static export only** (`output: 'export'`), deploy to **Vercel**, **no DB**.
5. **Bilingual** English + Amharic.
6. **Light + dark theme**, system-aware, persisted.
7. **Phone** rendered as a `tel:` link; **email obfuscated**.
8. **Contact** via **Web3Forms**.
9. **Deep-linkable projects** at `/work/[slug]`.
10. **Color correctness = BOTH** WCAG AA text contrast **AND** sRGB color-profile handling on images.

## 6. Measurable Acceptance Criteria (stated up front)

The build is **not done** until all of the below pass. These are the target from day one, not an afterthought.

### 6.1 Lighthouse (mobile, mid-range device throttling)

| Category       | Minimum score |
| -------------- | ------------- |
| Performance    | **≥ 90**      |
| Accessibility  | **≥ 95**      |
| Best Practices | **≥ 95**      |
| SEO            | **≥ 95**      |

### 6.2 Core Web Vitals (mid-range mobile)

| Metric                         | Budget       |
| ------------------------------ | ------------ |
| LCP (Largest Contentful Paint) | **< 2.5 s**  |
| CLS (Cumulative Layout Shift)  | **< 0.1**    |
| TBT (Total Blocking Time)      | **< 200 ms** |

### 6.3 Accessibility

- **WCAG 2.1 AA** contrast on all text/background pairs (verified in [`02-design-system.md`](./02-design-system.md)).
- Every image has meaningful **alt text** (bilingual where relevant).
- Full **keyboard navigation** and visible focus states.

### 6.4 Functional

- **Bilingual EN/AM** works (locale switch persists; Amharic renders with an Amharic-capable font).
- **Phone is a `tel:` link**; email obfuscated but reachable.
- **CV downloads** from the primary CTA and `/cv`.
- **All 10 projects** are deep-linkable at `/work/[slug]`.

## 7. Content-Accuracy QA Checklist (run line-by-line at the very end)

Open [`../content/portfolio.json`](../content/portfolio.json) side-by-side with the live site and confirm **each** row. Content wins over layout; if anything mismatches, fix the site, never the JSON (except approved `NEEDS_REVIEW` edits).

- [ ] `owner.name` = "Ermiyas Goshme" shown correctly.
- [ ] `owner.statusLine`, `school`, `educationDegree`, `educationYears` match.
- [ ] `owner.email` obfuscated but correct; `owner.phoneTelHref` is `tel:+251996631973`.
- [ ] `owner.interests`, `owner.software`, `owner.languages` all present, none dropped.
- [ ] `about` paragraph verbatim (no rewrites).
- [ ] **Project 1** — title "Ethiopian Orthodox Church Design", type "Design Competition", organizer "Mahibere Kidusan (MK)", description verbatim, achievement (certificate) shown.
- [ ] **Project 2** — "Enda Mikael Palace Re-imagination", type "Historical Architectural Interpretation", description verbatim.
- [ ] **Project 3** — "Climate Responsive High School Design – Debre Birhan", type + 4 `keyConcepts` shown, description verbatim.
- [ ] **Project 4** — "Street Playground – Seminar Week Project", type, description verbatim.
- [ ] **Project 5** — "Adaptive Corridor – Residential Buildings", type "Residential Design", description verbatim.
- [ ] **Project 6** — "Adaptive Corridor – Community Hall", type "Community Facility", description verbatim.
- [ ] **Project 7** — "Football Field Landscape Design – At EIABC", type, description verbatim.
- [ ] **Project 8** — "Compact Climate Responsive House – Debre Birhan", type, description verbatim.
- [ ] **Project 9** — "Urban Spine Revitalization Project", type, description verbatim.
- [ ] **Project 10** — "Breathable Clay Wall System" (NOT "Compacted kitchen design"); description carries the `NEEDS_REVIEW` flag until owner confirms.
- [ ] Every project detail uses **real images** from `public/images/work/<slug>/`, never generated.
- [ ] Each image has `alt` (and `altAm` where relevant); captions bilingual where the PDF had Amharic.
- [ ] No project reordered relative to `portfolio.json`.
- [ ] Open issues in `portfolio.json.openIssues` are still visible/tracked (esp. Project 10 review).
