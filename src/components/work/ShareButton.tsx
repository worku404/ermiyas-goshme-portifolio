"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

export interface ShareButtonProps {
  projectTitle: string;
}

/**
 * Accessible architectural project share button with native Web Share API
 * support, 1-click clipboard copy, and direct links to Telegram, WhatsApp,
 * LinkedIn, and X/Twitter.
 */
export function ShareButton({ projectTitle }: ShareButtonProps) {
  const t = useTranslations("share");
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: projectTitle,
          text: `${projectTitle} — Architecture Portfolio of Ermiyas Goshme`,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to menu if user cancels or share fails
      }
    }
    setIsOpen((prev) => !prev);
  };

  const getShareUrl = (platform: "telegram" | "whatsapp" | "linkedin" | "twitter") => {
    if (typeof window === "undefined") return "#";
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `${projectTitle} — Architecture Portfolio of Ermiyas Goshme`
    );

    switch (platform) {
      case "telegram":
        return `https://t.me/share/url?url=${url}&text=${text}`;
      case "whatsapp":
        return `https://api.whatsapp.com/send?text=${text}%20${url}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      case "twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Live Region for Screen Readers */}
      <span
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {copied ? t("copied") : ""}
      </span>

      {/* Main Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleNativeShare}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`${t("shareProject")}: ${projectTitle}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "var(--space-2)",
          padding: "var(--space-1) var(--space-3)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
          border: "var(--border-hairline)",
          borderRadius: "var(--radius-sm)",
          fontSize: "var(--fs-xs)",
          fontWeight: 600,
          cursor: "pointer",
          transition:
            "border-color var(--dur-fast) var(--ease-standard), background-color var(--dur-fast) var(--ease-standard)",
        }}
      >
        {/* Share Icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{t("button")}</span>
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          aria-label={t("shareProject")}
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + var(--space-2))",
            zIndex: 100,
            minWidth: "200px",
            backgroundColor: "var(--color-surface)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 10px 30px -4px rgba(0, 0, 0, 0.2)",
            padding: "var(--space-2)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
          }}
        >
          {/* 1-Click Copy Link Option */}
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              width: "100%",
              padding: "var(--space-2) var(--space-3)",
              backgroundColor: copied ? "var(--color-surface-2)" : "transparent",
              border: "none",
              borderRadius: "var(--radius-sm)",
              color: copied ? "var(--color-accent)" : "var(--color-text)",
              fontSize: "var(--fs-xs)",
              fontWeight: 500,
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {copied ? (
              <>
                <span aria-hidden="true" style={{ fontSize: "14px", color: "var(--color-accent)" }}>
                  ✓
                </span>
                <span>{t("copied")}</span>
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{t("copyLink")}</span>
              </>
            )}
          </button>

          <hr
            style={{
              border: "none",
              borderTop: "var(--border-hairline)",
              margin: "var(--space-1) 0",
            }}
          />

          {/* Telegram */}
          <a
            role="menuitem"
            href={getShareUrl("telegram")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-2) var(--space-3)",
              color: "var(--color-text)",
              textDecoration: "none",
              fontSize: "var(--fs-xs)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span aria-hidden="true">✈️</span>
            <span>{t("telegram")}</span>
          </a>

          {/* WhatsApp */}
          <a
            role="menuitem"
            href={getShareUrl("whatsapp")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-2) var(--space-3)",
              color: "var(--color-text)",
              textDecoration: "none",
              fontSize: "var(--fs-xs)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span aria-hidden="true">💬</span>
            <span>{t("whatsapp")}</span>
          </a>

          {/* LinkedIn */}
          <a
            role="menuitem"
            href={getShareUrl("linkedin")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-2) var(--space-3)",
              color: "var(--color-text)",
              textDecoration: "none",
              fontSize: "var(--fs-xs)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span aria-hidden="true">💼</span>
            <span>{t("linkedin")}</span>
          </a>

          {/* X / Twitter */}
          <a
            role="menuitem"
            href={getShareUrl("twitter")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: "var(--space-2) var(--space-3)",
              color: "var(--color-text)",
              textDecoration: "none",
              fontSize: "var(--fs-xs)",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span aria-hidden="true">𝕏</span>
            <span>{t("twitter")}</span>
          </a>
        </div>
      )}
    </div>
  );
}
