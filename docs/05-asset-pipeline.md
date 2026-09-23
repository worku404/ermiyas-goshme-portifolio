# 05 — Asset Pipeline

> Part of the **BroPortfolio spec repo**. Index: [`README.md`](./README.md).
> This is **the real first build task** — performance and color correctness are won here.

## 1. The Situation

The images are currently **embedded in the PDF** (`ERMIYAS_GOSHME_Portfolio_2026.pdf`) as **presentation-resolution rasters**, not build-ready originals. They are a **placeholder foundation**: good enough to lay out and ship, replaced later 1:1 by high-res originals via the stable contract in §5.

**Do not trust PDF order or the Table of Contents page numbers** for mapping images to projects — the ToC even mislabels Project 10. Mapping is done **visually**.

## 2. Pipeline Steps

1. **Extract** every image per page with PyMuPDF (script in §6) into a review folder organized by PDF page.
2. **Deduplicate** — the same render often repeats across pages; keep one copy.
3. **Discard non-hero fragments** — e.g. **PDF page 5 has ~40 plan/section fragments**; most are not portfolio images. **Curate heavily.**
4. **Visually map** each surviving image to the correct project slug (see §3). Do **not** rely on PDF order/ToC.
5. **Crop** to remove page margins, bleed, stray linework, or adjacent captions baked into the raster.
6. **Resize** to responsive widths (see §4).
7. **Convert** to **AVIF + WebP**, each tagged with the **sRGB** color profile (color correctness).
8. **Name** using the stable contract (§5).
9. **Write captions** — bilingual EN/AM where the PDF has Amharic (e.g. church site-plan legend, section names). Record them back in `content/portfolio.json` (§5.2).

## 3. Visual Mapping Reference (from the content model)

| slug                               | PDF pages (hint only — verify visually)        |
| ---------------------------------- | ---------------------------------------------- |
| `ethiopian-orthodox-church-design` | 4, 5, 6, 7 (page 5 = ~40 fragments, curate)    |
| `enda-mikael-palace-reimagination` | 8, 9                                           |
| `climate-responsive-high-school`   | 10                                             |
| `street-playground`                | 11                                             |
| `adaptive-corridor-residential`    | 12                                             |
| `adaptive-corridor-community-hall` | 13                                             |
| `eiabc-football-field-landscape`   | 14                                             |
| `compact-climate-responsive-house` | 15                                             |
| `urban-spine-revitalization`       | 16                                             |
| `breathable-clay-wall-system`      | 17 (ToC mislabeled "Compacted kitchen design") |

Pages are **hints**, not truth. Confirm each image by eye before assigning it.

## 4. Responsive Widths

Generate these widths per image (skip widths larger than the source): **`320, 640, 960, 1280, 1920`**.

- Hero/LCP: ensure a 1280–1920 variant exists; mark `priority`, no lazy.
- Provide accurate `sizes` in `next/image` so the browser fetches the smallest sufficient variant.
- Per-image delivered weight budget in [`01-tech-stack.md`](./01-tech-stack.md) §3.

## 5. Stable Folder & Filename Contract

Later high-res swaps must be **1:1 drop-ins** — same paths, no code changes.

```
public/
  images/
    work/
      <project-slug>/
        <project-slug>-01.avif
        <project-slug>-01.webp
        <project-slug>-02.avif
        <project-slug>-02.webp
        ...
```

Rules:

- Folder name = the project `slug` (identical to `portfolio.json` and `/work/[slug]`).
- Sequence numbers are **zero-padded, stable** (`-01`, `-02`, …). Index 01 is the cover/hero.
- Provide both `.avif` and `.webp` per image; the `<picture>`/`next/image` layer prefers AVIF.
- Optionally keep responsive widths as `<slug>-01-640.avif` etc., or let the build generate them — but the **base name is the contract**.
- To swap in a high-res original later: replace the file(s) at the same path. Done.

### 5.2 Where captions live

Captions and dimensions live back in **`content/portfolio.json`** under each project's `images[]` array. Each entry:

```json
{
  "src": "/images/work/ethiopian-orthodox-church-design/ethiopian-orthodox-church-design-01.avif",
  "alt": "Church nave interior with directed natural light",
  "altAm": "የቤተ ክርስቲያን ውስጠኛ ክፍል በተፈጥሮ ብርሃን",
  "caption": "Interior — light and procession",
  "captionAm": "ውስጣዊ — ብርሃንና ጉዞ",
  "width": 1600,
  "height": 1067
}
```

- `alt` required; `altAm` where an Amharic audience benefits.
- `caption`/`captionAm` optional; add `captionAm` wherever the PDF had Ge'ez text.
- `width`/`height` required (prevents CLS).

## 6. PyMuPDF Extraction Script (ready to run)

Dumps every embedded image to a review folder organized by PDF page, for the user to **curate manually**. It does not decide mapping — that is a human/visual step.

> Prereqs: `pip install pymupdf`. Run from the project root; the PDF is at the repo root.

```python
#!/usr/bin/env python3
"""Extract every embedded image from the portfolio PDF, organized by page,
into a review folder for manual curation. Does NOT map images to projects.
Usage: python scripts/extract_pdf_images.py
"""
import hashlib
from pathlib import Path
import fitz  # PyMuPDF

PDF_PATH = Path("ERMIYAS_GOSHME_Portfolio_2026.pdf")
OUT_DIR = Path("asset-review")  # NOT public/ — curate first, then move.

def main() -> None:
    if not PDF_PATH.exists():
        raise SystemExit(f"PDF not found: {PDF_PATH.resolve()}")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PDF_PATH)
    seen_hashes: dict[str, str] = {}
    total, duplicates = 0, 0

    for page_index in range(len(doc)):
        page_no = page_index + 1  # 1-based, matches portfolio.json pdfPages
        page_dir = OUT_DIR / f"page-{page_no:02d}"
        images = doc.get_page_images(page_index, full=True)
        if images:
            page_dir.mkdir(parents=True, exist_ok=True)

        for img_ix, img in enumerate(images, start=1):
            xref = img[0]
            base = doc.extract_image(xref)
            data = base["image"]
            ext = base.get("ext", "png")

            digest = hashlib.sha1(data).hexdigest()
            if digest in seen_hashes:
                duplicates += 1
                # Note the duplicate but keep one copy only.
                print(f"  dup on page {page_no} -> already saved as {seen_hashes[digest]}")
                continue

            out_name = f"p{page_no:02d}-img{img_ix:02d}-{digest[:8]}.{ext}"
            out_path = page_dir / out_name
            out_path.write_bytes(data)
            seen_hashes[digest] = out_name
            total += 1

    print(f"\nDone. Saved {total} unique images ({duplicates} duplicates skipped) to {OUT_DIR}/")
    print("Next: curate by eye, discard non-hero fragments (esp. page-05),")
    print("map to project slugs, then crop/resize/convert per docs/05-asset-pipeline.md.")

if __name__ == "__main__":
    main()
```

After curation, run crop/resize/convert (any tool: `sharp` CLI, ImageMagick, `cwebp`/`avifenc`) to produce the responsive AVIF/WebP variants — **each tagged sRGB** — and place them under the stable contract in §5. Then record captions/dimensions in `content/portfolio.json`.

## 7. Why This Matters

- **Performance:** correct sizing + AVIF/WebP + lazy/eager decisions are the biggest lever on LCP and total weight ([`00-brief.md`](./00-brief.md) §6).
- **Color correctness:** tagging every delivered image **sRGB** makes colors render consistently across browsers — the image half of rule #10 (the text half is contrast in [`02-design-system.md`](./02-design-system.md)).
