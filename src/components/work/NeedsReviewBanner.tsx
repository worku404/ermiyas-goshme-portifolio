import * as React from "react";
import { useTranslations } from "next-intl";

/**
 * Editorial review alert banner for Project 10 (Breathable Clay Wall System).
 *
 * Background context (docs/00-brief.md §7 & docs/03 §5):
 * The source PDF Table of Contents erroneously listed this project as 'Compacted kitchen design'.
 * The actual body page (PDF p. 17) demonstrates material-science research on clay walls with no
 * kitchen program. This banner tracks transparency pending author's final text refinement.
 */
export function NeedsReviewBanner() {
  const t = useTranslations("project");

  return (
    <aside
      aria-label={t("needsReviewTitle")}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
        backgroundColor: "var(--color-surface-2)",
        border: "1px solid var(--color-accent)",
        borderRadius: "var(--radius-sm)",
        marginBottom: "var(--space-8)",
      }}
    >
      <div
        style={{
          color: "var(--color-accent)",
          fontSize: "var(--fs-lg)",
          lineHeight: 1,
          flexShrink: 0,
          marginTop: "2px",
        }}
        aria-hidden="true"
      >
        ⚠️
      </div>
      <div>
        <h3
          style={{
            fontSize: "var(--fs-sm)",
            fontWeight: 700,
            color: "var(--color-accent)",
            marginBottom: "var(--space-1)",
          }}
        >
          {t("needsReviewTitle")}
        </h3>
        <p
          style={{
            fontSize: "var(--fs-xs)",
            lineHeight: "var(--lh-body)",
            color: "var(--color-text)",
          }}
        >
          {t("needsReviewText")}
        </p>
      </div>
    </aside>
  );
}
