# 06 — Staged AI Build Prompts

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md).

These are **separable, individually runnable** prompts — **not** one mega-prompt. Run one, verify its Definition of Done, **stop for review**, then run the next. Copy-paste each block into your AI builder as-is.

**Global rules for every prompt (repeat to the agent):**

- Read the referenced docs and [`../content/portfolio.json`](../content/portfolio.json) before writing code.
- Content in `content/portfolio.json` is **GROUND TRUTH** — never invent, embellish, reorder, or drop it.
- **Use real images only** (`public/images/work/<slug>/`). Never generate or reimagine images.
- Static export only, deploy target Vercel, no server, no DB.
- **Stop at the end for human review.** Do not proceed to the next stage automatically.

---

## Prompt 0 — Project Scaffold

```
You are setting up a static Next.js portfolio. Read docs/00-brief.md, docs/01-tech-stack.md,
and docs/02-design-system.md first. Do not write feature code yet — only scaffold.

Tasks:
- Create a Next.js (App Router) + TypeScript project with next.config.js set to output: 'export'.
- Add next-themes (light/dark, system-aware, persisted, no theme flash).
- Add next-intl (or equivalent) with locales en (default) + am; wire <html lang>.
- Install ESLint + Prettier with sensible config.
- Implement the design tokens from docs/02-design-system.md as CSS custom properties for
  both light and dark themes (colors, type scale, spacing, breakpoints, motion, elevation).
- Self-host fonts: a display face, a body sans, and Noto Sans Ethiopic for Amharic; font-display: swap.
- Create the folder structure: content/ (place portfolio.json), public/images/work/<slug>/ dirs,
  public/cv/, components/, app/ routes stubbed per docs/03-information-architecture.md.
- Add env var placeholder NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.example.

Definition of Done / verify before continuing:
- `next build` produces a static export with no server functions.
- Toggling theme persists across reload with no flash; system preference respected.
- Tokens are live CSS variables; switching theme changes them.
- Both en and am locales resolve; <html lang> updates.
- ESLint + Prettier run clean.
STOP and wait for review.
```

## Prompt 1 — Design System, Primitives, Chrome & Home

```
Read docs/02-design-system.md, docs/03-information-architecture.md, docs/04-component-inventory.md,
and content/portfolio.json.

Build:
- Layout primitives: Container, Section (per docs/04).
- SiteHeader (with ThemeToggle + LocaleSwitcher + compact CV affordance), SiteFooter.
- ThemeToggle and LocaleSwitcher meeting their acceptance criteria in docs/04.
- Home page (/): Hero (name + statusLine from portfolio.json, CTAs "View Work" + "Download CV"),
  About summary, Featured work (ProjectCard/ProjectGrid subset), Contact CTA.
- Use only real images; hero image is the LCP element (priority/eager, blur placeholder).

Rules: content verbatim from portfolio.json; no invented copy; real images only.

Definition of Done / verify before continuing:
- Home renders with correct owner name, status line, and about text (verbatim).
- Header/footer nav works by keyboard; focus states visible; phone is a tel: link; email obfuscated.
- Theme + locale switches work from the header and persist.
- No CLS on hero; Lighthouse spot-check trending toward docs/00 targets.
STOP and wait for review.
```

## Prompt 2 — Project Template (/work + /work/[slug])

```
Read docs/03-information-architecture.md §5, docs/04-component-inventory.md, docs/05-asset-pipeline.md,
and content/portfolio.json.

Build:
- /work: ProjectGrid of all 10 projects, order preserved from portfolio.json.
- /work/[slug]: ProjectDetail for each slug (static params from portfolio.json). Show title, type,
  organizer (if present), description (verbatim), achievement (if non-null), keyConcepts (if present).
- ImageGallery/Lightbox (keyboard accessible per docs/04) driven by project.images[]; CaptionedImage
  with bilingual caption support. Prev/Next across projects. Breadcrumbs.
- Show a NEEDS_REVIEW banner on the breathable-clay-wall-system project until owner confirms.

Rules: real images only from public/images/work/<slug>/ using the stable contract; never generate images;
content verbatim.

Definition of Done / verify before continuing:
- All 10 /work/[slug] pages exist as static HTML and are deep-linkable.
- Descriptions/types/titles match portfolio.json exactly; no reordering.
- Lightbox: Enter/Space opens, arrows navigate, Esc closes, focus trapped + returned.
- Every image has alt text; captions render per locale where present.
STOP and wait for review.
```

## Prompt 3 — Remaining Pages, Contact, CV, SEO

```
Read docs/03-information-architecture.md, docs/04-component-inventory.md, docs/01-tech-stack.md,
and content/portfolio.json.

Build:
- /about: full AboutSection (bio verbatim), education, SkillsList (software order preserved),
  interests, languages — nothing dropped.
- /contact: ContactForm posting to Web3Forms using NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY, with validation
  and success/error states (per docs/04); plus tel: phone , obfuscated email,  X, telegram , whatsup, and linkedin Accounts (write placeholder if the link does not given so the developer put the exact link later.).put the additonal accounts in footer as well
- CV: /cv page and CVDownloadButton linking to public/cv/ file with download attribute.
- SEO/Meta component: per-route metadata + OpenGraph/Twitter, canonical, hreflang (en/am);
  per-project OG on detail pages. Generate sitemap.xml and robots.txt at build.

Definition of Done / verify before continuing:
- Contact form submits to Web3Forms; success and error states work; keyboard operable; a11y errors announced.
- CV downloads from both the primary CTA and /cv.
- About lists all skills/interests/languages with no omissions.
- Each route has correct title/description/OG; project pages have per-project OG; sitemap + robots present.
STOP and wait for review.
```

## Prompt 4 — QA & Polish Pass

```
Read docs/00-brief.md (acceptance criteria + content-accuracy checklist) and content/portfolio.json.

Do a full QA + polish pass:
- Run Lighthouse (mobile): Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95. Fix gaps.
- Verify Core Web Vitals budgets: LCP <2.5s, CLS <0.1, TBT <200ms. Fix regressions.
- Accessibility: keyboard nav, focus states, prefers-reduced-motion, semantic landmarks, WCAG AA contrast.
- Content accuracy: run the docs/00 checklist line-by-line against the live site (all 10 projects verbatim).
- Bilingual: EN/AM switch works everywhere; Amharic renders in Noto Sans Ethiopic; captions correct.
- Responsive: check 360/640/768/1024/1280/1536 breakpoints; no overflow or CLS.
- Confirm all images are real (never generated) and follow the stable filename contract.

Definition of Done:
- All docs/00 acceptance criteria pass; content-accuracy checklist fully ticked.
- Open issues from portfolio.json.openIssues are resolved or explicitly tracked (esp. Project 10 review).
STOP and report results with the checklist state.
```
