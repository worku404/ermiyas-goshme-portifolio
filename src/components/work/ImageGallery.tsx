"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { PortfolioImage, CaptionedImage } from "./CaptionedImage";
import { Lightbox } from "./Lightbox";

export interface ImageGalleryProps {
  images: PortfolioImage[];
  projectTitle: string;
  locale: string;
}

/**
 * Architectural image gallery featuring a Curated Editorial Monograph layout
 * with rhythmic hero spreads, paired drawing duos, and quick grid fallback.
 */
export function ImageGallery({ images, projectTitle, locale }: ImageGalleryProps) {
  const t = useTranslations("project");
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);
  const [layoutMode, setLayoutMode] = React.useState<"monograph" | "grid">("monograph");
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const handleOpen = (index: number) => {
    triggerRef.current = document.getElementById(`thumbnail-${index}`);
    setActiveLightboxIndex(index);
  };

  const handleClose = () => {
    setActiveLightboxIndex(null);
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  // Group images into an editorial rhythmic monograph
  const { hero, rows } = React.useMemo(() => {
    if (images.length === 0) return { hero: null, rows: [] };

    const heroItem = { image: images[0], index: 0 };
    const remaining = images.slice(1).map((img, i) => ({ image: img, index: i + 1 }));

    const editorialRows: Array<{ type: "pair" | "feature"; items: typeof remaining }> = [];
    let i = 0;
    let rhythm = 0;

    while (i < remaining.length) {
      const left = remaining.length - i;
      if (left === 1) {
        editorialRows.push({ type: "feature", items: [remaining[i]] });
        i += 1;
      } else if (left === 2) {
        editorialRows.push({ type: "pair", items: [remaining[i], remaining[i + 1]] });
        i += 2;
      } else {
        if (rhythm % 2 === 0) {
          editorialRows.push({ type: "pair", items: [remaining[i], remaining[i + 1]] });
          i += 2;
        } else {
          editorialRows.push({ type: "feature", items: [remaining[i]] });
          i += 1;
        }
        rhythm += 1;
      }
    }

    return { hero: heroItem, rows: editorialRows };
  }, [images]);

  const totalCount = images.length < 10 ? `0${images.length}` : `${images.length}`;

  return (
    <section
      aria-labelledby="project-gallery-heading"
      style={{
        marginTop: "var(--space-12)",
        paddingTop: "var(--space-8)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Editorial Gallery Header & Mode Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          marginBottom: "var(--space-8)",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "var(--space-2)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "12px",
                fontWeight: 700,
                color: "var(--color-accent)",
                backgroundColor: "rgba(168, 83, 42, 0.12)",
                padding: "3px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(168, 83, 42, 0.25)",
              }}
            >
              {totalCount} {locale === "am" ? "ንድፎች እና ስዕሎች" : "SHEETS & RENDERS"}
            </span>
          </div>

          <h2
            id="project-gallery-heading"
            style={{
              fontSize: "clamp(22px, 2.5vw, 30px)",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            {t("galleryHeading")}
          </h2>
          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--color-text-muted)",
              marginTop: "var(--space-1)",
              marginBottom: 0,
            }}
          >
            {t("gallerySubtitle")}
          </p>
        </div>

        {/* View Mode Switcher: Monograph vs Grid */}
        <div
          role="group"
          aria-label="Gallery View Mode"
          style={{
            display: "inline-flex",
            alignItems: "center",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "9999px",
            padding: "3px",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => setLayoutMode("monograph")}
            aria-pressed={layoutMode === "monograph"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor:
                layoutMode === "monograph" ? "var(--color-accent)" : "transparent",
              color: layoutMode === "monograph" ? "#FFFFFF" : "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span aria-hidden="true">▥</span>
            <span>{locale === "am" ? "ሞኖግራፍ" : "Monograph"}</span>
          </button>

          <button
            type="button"
            onClick={() => setLayoutMode("grid")}
            aria-pressed={layoutMode === "grid"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor:
                layoutMode === "grid" ? "var(--color-accent)" : "transparent",
              color: layoutMode === "grid" ? "#FFFFFF" : "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span aria-hidden="true">☵</span>
            <span>{locale === "am" ? "ፍርግርግ" : "Grid"}</span>
          </button>
        </div>
      </div>

      {/* RENDER MODE 1: CURATED EDITORIAL MONOGRAPH */}
      {layoutMode === "monograph" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          {/* Lead Hero Spread */}
          {hero && (
            <CaptionedImage
              image={hero.image}
              index={hero.index}
              totalImages={images.length}
              projectTitle={projectTitle}
              locale={locale}
              variant="hero"
              priority={true}
              onSelect={handleOpen}
            />
          )}

          {/* Rhythmic Spreads (Alternating Pairs & Wide Features) */}
          {rows.map((row, rowIdx) => {
            if (row.type === "pair") {
              return (
                <div
                  key={`editorial-row-${rowIdx}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                    gap: "var(--space-6)",
                    alignItems: "start",
                  }}
                >
                  {row.items.map(({ image, index }) => (
                    <CaptionedImage
                      key={image.src}
                      image={image}
                      index={index}
                      totalImages={images.length}
                      projectTitle={projectTitle}
                      locale={locale}
                      variant="pair"
                      onSelect={handleOpen}
                    />
                  ))}
                </div>
              );
            }

            return (
              <div key={`editorial-row-${rowIdx}`}>
                {row.items.map(({ image, index }) => (
                  <CaptionedImage
                    key={image.src}
                    image={image}
                    index={index}
                    totalImages={images.length}
                    projectTitle={projectTitle}
                    locale={locale}
                    variant="feature"
                    onSelect={handleOpen}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        /* RENDER MODE 2: COMPACT ARCHIVE GRID */
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 380px), 1fr))",
            gap: "var(--space-6)",
            alignItems: "start",
          }}
        >
          {images.map((img, idx) => (
            <CaptionedImage
              key={img.src}
              image={img}
              index={idx}
              totalImages={images.length}
              projectTitle={projectTitle}
              locale={locale}
              variant="grid"
              onSelect={handleOpen}
              priority={idx < 2}
            />
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      {activeLightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={activeLightboxIndex}
          isOpen={true}
          onClose={handleClose}
          onNavigate={(newIdx) => setActiveLightboxIndex(newIdx)}
          projectTitle={projectTitle}
          locale={locale}
        />
      )}
    </section>
  );
}
