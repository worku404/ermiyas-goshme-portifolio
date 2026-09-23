# BroPortfolio — Spec Repo

A **documentation-first "spec repo"** for a static Next.js architecture portfolio website for **Ermiyas Goshme** (3rd-year architecture student). This repo defines _what_ to build and _how_ to build it, before any code exists. An AI builder (or human) executes the staged prompts against these specs.

> **Prime directive:** the content in [`../content/portfolio.json`](../content/portfolio.json) is **GROUND TRUTH** extracted from the source PDF. Never invent, embellish, reorder, or drop content. **Display the owner's real images only** — never generate or reimagine imagery.

## What each document is

| File                                                                 | Purpose                                                                                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [`../content/portfolio.json`](../content/portfolio.json)             | **Content model / ground truth.** Owner, about, all 10 projects, image slots, open issues.                                     |
| [`00-brief.md`](./00-brief.md)                                       | Goals, audience, owner, non-goals, and **measurable acceptance criteria** + content-accuracy QA checklist.                     |
| [`01-tech-stack.md`](./01-tech-stack.md)                             | Exact stack (Next.js static export, TS, next/image, next-themes, i18n), performance budgets, env vars, why static over SPA.    |
| [`02-design-system.md`](./02-design-system.md)                       | Design **tokens** — palette (light+dark, WCAG-verified), type scale, spacing, layout, breakpoints, motion, elevation.          |
| [`03-information-architecture.md`](./03-information-architecture.md) | Sitemap, routes, all 10 slugs, navigation, project-detail template, deep-linking + OG, locale routing.                         |
| [`04-component-inventory.md`](./04-component-inventory.md)           | Every component with props + states + acceptance criteria.                                                                     |
| [`05-asset-pipeline.md`](./05-asset-pipeline.md)                     | The **first real build task**: extract/dedupe/curate/map/crop/resize/convert images; stable filename contract; PyMuPDF script. |
| [`06-ai-build-prompts.md`](./06-ai-build-prompts.md)                 | Staged, **separable** build prompts (Prompt 0–4), each with its own Definition of Done.                                        |

## Recommended reading / execution order

1. **Content model** — [`../content/portfolio.json`](../content/portfolio.json) (know the truth first)
2. **Brief** — [`00-brief.md`](./00-brief.md) (goals + acceptance criteria)
3. **Tech** — [`01-tech-stack.md`](./01-tech-stack.md)
4. **Design** — [`02-design-system.md`](./02-design-system.md)
5. **IA** — [`03-information-architecture.md`](./03-information-architecture.md)
6. **Components** — [`04-component-inventory.md`](./04-component-inventory.md)
7. **Asset pipeline** — [`05-asset-pipeline.md`](./05-asset-pipeline.md)
8. **Staged prompts** — [`06-ai-build-prompts.md`](./06-ai-build-prompts.md)
9. **QA** — back to [`00-brief.md`](./00-brief.md) content-accuracy checklist

## SDLC workflow summary

1. **Specify** — this repo (done): content model + specs.
2. **Assets** — run the asset pipeline ([`05`](./05-asset-pipeline.md)) to turn PDF-embedded placeholders into curated, sRGB-tagged, responsive AVIF/WebP under the stable contract.
3. **Build in stages** — execute Prompt 0 → 4 ([`06`](./06-ai-build-prompts.md)); **verify each Definition of Done and stop for review** before the next.
4. **QA** — run the acceptance criteria + content-accuracy checklist ([`00`](./00-brief.md)).
5. **Deploy** — static export to Vercel.
6. **Swap images later** — drop high-res originals into the same stable paths ([`05`](./05-asset-pipeline.md) §5); no code changes.

## Open issues (track to closure)

- **Project 10 (`breathable-clay-wall-system`)** — description is a factual placeholder marked `NEEDS_REVIEW`; the PDF ToC mislabels it "Compacted kitchen design". **Awaiting author review** before final publish.
- **Image → project mapping** is done **visually** during the asset pipeline; PDF order/ToC page numbers are hints only, not truth.
- **Bilingual captions (EN/AM)** — keep Amharic where the PDF has it (e.g. church site-plan legend, section names) and provide English alongside; recorded in `portfolio.json` `images[]`.
