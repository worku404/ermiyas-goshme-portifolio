"use client";

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
  totalImages?: number;
  projectTitle: string;
  onSelect: (index: number) => void;
  priority?: boolean;
  variant?: "hero" | "pair" | "feature" | "grid";
}

/**
 * Editorial architectural drawing plate with adaptive natural framing,
 * eliminating awkward empty black bars and preserving 100% drawing fidelity.
 */
export function CaptionedImage({
  image,
  locale,
  index,
  totalImages,
  projectTitle,
  onSelect,
  priority = false,
  variant = "grid",
}: CaptionedImageProps) {
  const t = useTranslations("lightbox");
  const [isHovered, setIsHovered] = React.useState(false);

  const captionText =
    locale === "am" && image.captionAm ? image.captionAm : image.caption;
  const altText =
    (locale === "am" && image.altAm ? image.altAm : image.alt) ||
    `${projectTitle} — Drawing ${index + 1}`;

  const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
  const formattedTotal = totalImages
    ? totalImages < 10
      ? `0${totalImages}`
      : `${totalImages}`
    : undefined;

  // Aspect ratio calculation to balance card width
  const isCompactRatio =
    Boolean(image.width && image.height && image.width / image.height < 1.45);

  const figureStyle: React.CSSProperties = {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth:
      (variant === "hero" || variant === "feature") && isCompactRatio
        ? "940px"
        : "100%",
    marginLeft:
      (variant === "hero" || variant === "feature") && isCompactRatio
        ? "auto"
        : undefined,
    marginRight:
      (variant === "hero" || variant === "feature") && isCompactRatio
        ? "auto"
        : undefined,
  };

  return (
    <figure style={figureStyle}>
      <div
        id={`thumbnail-${index}`}
        role="button"
        tabIndex={0}
        aria-label={`${t("openHint")}: ${altText}`}
        aria-haspopup="dialog"
        onClick={() => onSelect(index)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(index);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: isHovered
            ? "1px solid rgba(168, 83, 42, 0.55)"
            : "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg, 16px)",
          overflow: "hidden",
          backgroundColor: "#0d0c0a",
          cursor: "pointer",
          position: "relative",
          width: "100%",
          boxShadow: isHovered
            ? "0 20px 40px -10px rgba(0, 0, 0, 0.65)"
            : "0 4px 16px -4px rgba(0, 0, 0, 0.3)",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
          transform: isHovered ? "translateY(-2px)" : "translateY(0)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Header Plate Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            backgroundColor: "rgba(18, 16, 14, 0.9)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.06em",
              }}
            >
              DRAWING {formattedIndex}
              {formattedTotal ? ` / ${formattedTotal}` : ""}
            </span>
            {variant === "hero" && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#FFFFFF",
                  backgroundColor: "rgba(168, 83, 42, 0.25)",
                  padding: "2px 8px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(168, 83, 42, 0.4)",
                }}
              >
                Lead Masterplan
              </span>
            )}
          </div>

          {/* Inspect in Fullscreen Button: Icon ONLY */}
          <div
            title="Inspect in high-resolution"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "30px",
              height: "30px",
              backgroundColor: isHovered
                ? "var(--color-accent)"
                : "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#FFFFFF",
              borderRadius: "50%",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </div>
        </div>

        {/* Adaptive Drawing Viewport: Zero letterboxing, image hugs frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "#0d0c0a",
          }}
        >
          <Image
            src={image.src}
            alt={altText}
            width={image.width || 800}
            height={image.height || 600}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={
              variant === "hero" || variant === "feature"
                ? "(max-width: 960px) 100vw, 960px"
                : "(max-width: 900px) 100vw, 50vw"
            }
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: isHovered ? "scale(1.015)" : "scale(1)",
            }}
          />
        </div>

        {/* Editorial Caption Strip */}
        {captionText && (
          <div
            style={{
              padding: "12px 18px",
              backgroundColor: "rgba(18, 16, 14, 0.95)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                lineHeight: 1.5,
                color: "var(--color-text-muted)",
                fontFamily: "var(--font-sans), sans-serif",
              }}
            >
              {captionText}
            </p>
          </div>
        )}
      </div>
    </figure>
  );
}
