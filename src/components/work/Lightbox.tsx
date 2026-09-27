"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
 * - Portaled to document.body to break free from any stacking contexts (header/AI assistant).
 * - True 100dvh fit with overflow: hidden — absolutely zero page scrolling or viewport overflow.
 * - Flex child with minHeight: 0 guarantees image fits strictly within window bounds.
 * - Traps keyboard Tab focus within modal boundaries.
 * - Arrow keys (Left/Right) and touch swipe navigation.
 * - Esc key dismisses dialog and restores focus.
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
  const [mounted, setMounted] = React.useState(false);
  const total = images.length;
  const currentImage = images[currentIndex];

  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock both html and body scroll while lightbox is open
  React.useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyTouch = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.touchAction = originalBodyTouch;
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

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, total, onClose, onNavigate]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Minimum swipe threshold of 45px, predominantly horizontal
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        onNavigate((currentIndex + 1) % total);
      } else {
        onNavigate((currentIndex - 1 + total) % total);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!isOpen || !currentImage || !mounted) return null;

  const captionText =
    locale === "am" && currentImage.captionAm
      ? currentImage.captionAm
      : currentImage.caption;

  const altText =
    (locale === "am" && currentImage.altAm ? currentImage.altAm : currentImage.alt) ||
    `${projectTitle} — Drawing ${currentIndex + 1}`;

  const lightboxContent = (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} — ${t("counter", { current: currentIndex + 1, total })}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        maxHeight: "100dvh",
        zIndex: 100000,
        backgroundColor: "rgba(10, 9, 8, 0.98)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Completely prevents scrollbars on modal
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
        touchAction: "none",
      }}
    >
      {/* Lightbox Top Control Bar */}
      <div
        style={{
          flex: "0 0 auto",
          height: "clamp(52px, 7vh, 64px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(16px, 3vw, 28px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          backgroundColor: "rgba(18, 16, 14, 0.95)",
          color: "#FFFFFF",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 1.5vw, 16px)",
            minWidth: 0,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: "clamp(13px, 1.6vw, 16px)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "clamp(180px, 50vw, 540px)",
            }}
          >
            {projectTitle}
          </span>
          <span
            style={{
              fontSize: "12px",
              fontFamily: "var(--font-mono, monospace)",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              padding: "3px 10px",
              borderRadius: "9999px",
              color: "var(--color-accent, #e08b57)",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {t("counter", { current: currentIndex + 1, total })}
          </span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          style={{
            width: "40px",
            height: "40px",
            minWidth: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginLeft: "12px",
            transition: "all var(--dur-fast) var(--ease-standard)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Viewport Stage with Image & Nav Buttons */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          flex: "1 1 0%",
          minHeight: 0, // CRITICAL: Allows flex child to shrink properly without overflowing!
          minWidth: 0,
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "clamp(8px, 2vw, 24px)",
          boxSizing: "border-box",
        }}
      >
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            aria-label={t("prev")}
            onClick={() => onNavigate((currentIndex - 1 + total) % total)}
            style={{
              position: "absolute",
              left: "clamp(12px, 2.5vw, 28px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: "clamp(44px, 5vw, 54px)",
              height: "clamp(44px, 5vw, 54px)",
              borderRadius: "50%",
              backgroundColor: "rgba(18, 16, 14, 0.78)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Center High-Res Image Display Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
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
              objectPosition: "center",
            }}
          />
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            aria-label={t("next")}
            onClick={() => onNavigate((currentIndex + 1) % total)}
            style={{
              position: "absolute",
              right: "clamp(12px, 2.5vw, 28px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 30,
              width: "clamp(44px, 5vw, 54px)",
              height: "clamp(44px, 5vw, 54px)",
              borderRadius: "50%",
              backgroundColor: "rgba(18, 16, 14, 0.78)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              color: "#FFFFFF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Lightbox Footer Caption Bar */}
      {captionText ? (
        <div
          style={{
            flex: "0 0 auto",
            padding: "clamp(8px, 1.2vh, 14px) clamp(16px, 3vw, 28px)",
            color: "#F2EEE6",
            textAlign: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "rgba(18, 16, 14, 0.95)",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontSize: "clamp(12px, 1.4vw, 14px)",
              lineHeight: 1.4,
              opacity: 0.9,
              maxWidth: "80ch",
              margin: "0 auto",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {captionText}
          </p>
        </div>
      ) : null}
    </div>
  );

  return createPortal(lightboxContent, document.body);
}
