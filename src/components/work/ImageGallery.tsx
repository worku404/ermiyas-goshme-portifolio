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
 * Architectural image gallery managing thumbnail layout and modal lightbox states.
 *
 * Implements keyboard interaction contract per docs/04-component-inventory.md:
 * - Enter/Space on any thumbnail opens the lightbox at that specific image index.
 * - Restores focus to the active thumbnail button upon lightbox closure.
 */
export function ImageGallery({ images, projectTitle, locale }: ImageGalleryProps) {
  const t = useTranslations("project");
  const [activeLightboxIndex, setActiveLightboxIndex] = React.useState<number | null>(null);
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const handleOpen = (index: number) => {
    triggerRef.current = document.getElementById(`thumbnail-${index}`);
    setActiveLightboxIndex(index);
  };

  const handleClose = () => {
    setActiveLightboxIndex(null);
    // Focus restoration per accessibility criteria
    setTimeout(() => {
      triggerRef.current?.focus();
    }, 50);
  };

  return (
    <section
      aria-labelledby="project-gallery-heading"
      style={{
        marginTop: "var(--space-12)",
        paddingTop: "var(--space-8)",
        borderTop: "var(--border-hairline)",
      }}
    >
      <div style={{ marginBottom: "var(--space-6)" }}>
        <h2
          id="project-gallery-heading"
          style={{
            fontSize: "var(--fs-xl)",
            fontFamily: "var(--font-display), serif",
            color: "var(--color-text)",
            marginBottom: "var(--space-1)",
          }}
        >
          {t("galleryHeading")}
        </h2>
        <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-muted)" }}>
          {t("gallerySubtitle")}
        </p>
      </div>

      {/* Responsive Thumbnail Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          gap: "clamp(var(--space-4), 3vw, var(--space-6))",
        }}
      >
        {images.map((img, idx) => (
          <CaptionedImage
            key={img.src}
            image={img}
            index={idx}
            locale={locale}
            projectTitle={projectTitle}
            onSelect={handleOpen}
            priority={idx < 2}
          />
        ))}
      </div>

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
