import * as React from "react";

export interface CVDownloadButtonProps {
  href?: string;
  variant?: "primary" | "compact" | "pill";
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Accessible CV download link pointing directly to the static CV asset.
 *
 * Why an <a> tag with download attribute:
 * As a pure static export, the CV is served directly from the CDN edge (/cv/Ermiyas-Goshme-CV.pdf).
 * Using a native download link guarantees immediate 1-click retrieval with zero server latency.
 * Colors strictly use design tokens meeting WCAG 2.1 AA contrast in both light and dark modes.
 */
export function CVDownloadButton({
  href = "/cv/Ermiyas-Goshme-CV.pdf",
  variant = "primary",
  label = "Download CV",
  className = "",
  style = {},
}: CVDownloadButtonProps) {
  const isPrimary = variant === "primary";
  const isPill = variant === "pill";

  const primaryStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    padding: "var(--space-3) var(--space-6)",
    backgroundColor: "var(--color-accent)",
    color: "var(--color-on-accent)",
    borderRadius: "var(--radius-sm)",
    fontWeight: 600,
    fontSize: "var(--fs-base)",
    textDecoration: "none",
    border: "1px solid transparent",
    transition:
      "background-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
  };

  const compactStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-1)",
    padding: "var(--space-2) var(--space-3)",
    backgroundColor: "transparent",
    color: "var(--color-text)",
    border: "var(--border-hairline)",
    borderRadius: "var(--radius-sm)",
    fontWeight: 500,
    fontSize: "var(--fs-sm)",
    textDecoration: "none",
    transition:
      "background-color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard)",
  };

  const pillStyles: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    padding: "6px 14px",
    backgroundColor: "var(--color-accent)",
    color: "#FFFFFF",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "12px",
    fontFamily: "var(--font-display), sans-serif",
    textDecoration: "none",
    border: "none",
    boxShadow: "0 2px 8px rgba(168, 83, 42, 0.25)",
    transition:
      "transform var(--dur-fast) var(--ease-standard), opacity var(--dur-fast) var(--ease-standard)",
  };

  const selectedStyles = isPill
    ? pillStyles
    : isPrimary
      ? primaryStyles
      : compactStyles;

  return (
    <a
      href={href}
      download="Ermiyas-Goshme-CV.pdf"
      aria-label={label}
      className={`cv-download-btn ${className}`.trim()}
      style={{
        ...selectedStyles,
        ...style,
      }}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      <span>{label}</span>
    </a>
  );
}
