import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface PortfolioImage {
  src: string;
  alt?: string;
  altAm?: string;
  caption?: string;
  captionAm?: string;
  isHero?: boolean;
  width?: number | null;
  height?: number | null;
}

export interface CaptionedImageProps {
  image: PortfolioImage;
  locale: string;
  index: number;
  projectTitle: string;
  onSelect: (index: number) => void;
  priority?: boolean;
}

/**
 * Captioned architectural image with bilingual captioning support and lightbox trigger.
 *
 * Implements acceptance criteria per docs/04-component-inventory.md:
 * - Next/image with explicit aspect ratio preventing Cumulative Layout Shift (CLS).
 * - Bilingual captioning (renders captionAm for Amharic or caption for English).
 * - Accessible keyboard trigger opening the full-resolution lightbox on Enter/Space.
 */
export function CaptionedImage({
  image,
  locale,
  index,
  projectTitle,
  onSelect,
  priority = false,
}: CaptionedImageProps) {
  const t = useTranslations("lightbox");
  const captionText = locale === "am" && image.captionAm ? image.captionAm : image.caption;
  const altText =
    (locale === "am" && image.altAm ? image.altAm : image.alt) ||
    `${projectTitle} — Drawing ${index + 1}`;

  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      }}
    >
      <button
        type="button"
        id={`thumbnail-${index}`}
        aria-label={`${t("openHint")}: ${altText}`}
        aria-haspopup="dialog"
        onClick={() => onSelect(index)}
        style={{
          border: "var(--border-hairline)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          backgroundColor: "var(--color-surface-2)",
          cursor: "pointer",
          padding: 0,
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 11",
          display: "block",
          textAlign: "left",
          transition:
            "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
        }}
      >
        <Image
          src={image.src}
          alt={altText}
          width={image.width || 800}
          height={image.height || 550}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* Expand overlay badge */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "var(--space-2)",
            right: "var(--space-2)",
            backgroundColor: "rgba(0,0,0,0.65)",
            color: "#FFFFFF",
            padding: "var(--space-1) var(--space-2)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--fs-xs)",
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1)",
            backdropFilter: "blur(4px)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          <span>{index + 1}</span>
        </div>
      </button>

      {captionText && (
        <figcaption
          style={{
            fontSize: "var(--fs-xs)",
            color: "var(--color-text-muted)",
            lineHeight: 1.4,
            paddingLeft: "var(--space-1)",
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}
