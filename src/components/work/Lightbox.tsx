"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PortfolioImage } from "./CaptionedImage";

export interface LightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  projectTitle: string;
  locale: string;
}

/**
 * Fullscreen architectural drawing lightbox dialog.
 *
 * Implements WCAG 2.1 AA dialog modal pattern (docs/04):
 * - Traps keyboard Tab focus within modal boundaries.
 * - Arrow keys (Left/Right, Up/Down) cycle through project images.
 * - Esc key dismisses dialog and restores focus to triggering element.
 * - Displays localized captions and image counter.
 */
export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  projectTitle,
  locale,
}: LightboxProps) {
  const t = useTranslations("lightbox");
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const total = images.length;
  const currentImage = images[currentIndex];

  // Focus management: move focus into dialog upon open, and prevent body scroll
  React.useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation & focus trap
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNavigate((currentIndex + 1) % total);
        return;
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onNavigate((currentIndex - 1 + total) % total);
        return;
      }

      // Focus trap within dialog
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleBackdropClick = (e: MouseEvent) => {
      if (dialogRef.current && e.target === dialogRef.current) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleBackdropClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleBackdropClick);
    };
  }, [isOpen, currentIndex, total, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  const captionText =
    locale === "am" && currentImage.captionAm
      ? currentImage.captionAm
      : currentImage.caption;

  const altText =
    (locale === "am" && currentImage.altAm ? currentImage.altAm : currentImage.alt) ||
    `${projectTitle} — Drawing ${currentIndex + 1}`;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} — ${t("counter", { current: currentIndex + 1, total })}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        backgroundColor: "rgba(18, 16, 14, 0.95)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "var(--space-4)",
      }}
    >
      {/* Lightbox Top Control Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#FFFFFF",
          paddingBottom: "var(--space-3)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)" }}>
          <span style={{ fontWeight: 600, fontSize: "var(--fs-sm)" }}>
            {projectTitle}
          </span>
          <span style={{ fontSize: "var(--fs-xs)", opacity: 0.75 }}>
            {t("counter", { current: currentIndex + 1, total })}
          </span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          style={{
            minWidth: "44px",
            minHeight: "44px",
            backgroundColor: "transparent",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "var(--radius-sm)",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Viewport with Image & Nav Buttons */}
      <div
        style={{
          position: "relative",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "var(--space-4) 0",
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          aria-label={t("prev")}
          onClick={() => onNavigate((currentIndex - 1 + total) % total)}
          style={{
            position: "absolute",
            left: "var(--space-2)",
            zIndex: 10,
            minWidth: "48px",
            minHeight: "48px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Center High-Res Image Display */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maxHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src={currentImage.src}
            alt={altText}
            fill={true}
            sizes="100vw"
            priority={true}
            style={{
              objectFit: "contain",
            }}
          />
        </div>

        {/* Next Button */}
        <button
          type="button"
          aria-label={t("next")}
          onClick={() => onNavigate((currentIndex + 1) % total)}
          style={{
            position: "absolute",
            right: "var(--space-2)",
            zIndex: 10,
            minWidth: "48px",
            minHeight: "48px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "#FFFFFF",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "50%",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Lightbox Footer Caption Bar */}
      <div
        style={{
          color: "#F2EEE6",
          textAlign: "center",
          paddingTop: "var(--space-2)",
          minHeight: "32px",
        }}
      >
        {captionText && (
          <p
            style={{
              fontSize: "var(--fs-sm)",
              opacity: 0.9,
              maxWidth: "70ch",
              margin: "0 auto",
            }}
          >
            {captionText}
          </p>
        )}
      </div>
    </div>
  );
}
