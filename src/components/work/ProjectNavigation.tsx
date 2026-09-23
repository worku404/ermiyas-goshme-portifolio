import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface NavProjectSummary {
  slug: string;
  title: string;
}

export interface ProjectNavigationProps {
  prevProject?: NavProjectSummary | null;
  nextProject?: NavProjectSummary | null;
}

/**
 * Sequential Prev/Next navigation bar for project detail pages.
 *
 * Honors chronological portfolio.json order per docs/03 §5.
 * Provides accessible keyboard transitions to adjacent projects and
 * a return pathway to the full /work index.
 */
export function ProjectNavigation({
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  const t = useTranslations("project");

  return (
    <nav
      aria-label="Adjacent Projects"
      style={{
        marginTop: "var(--space-16)",
        paddingTop: "var(--space-8)",
        borderTop: "var(--border-hairline)",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "var(--space-4)",
        alignItems: "center",
      }}
    >
      {/* Previous Project Link */}
      <div style={{ justifySelf: "start" }}>
        {prevProject ? (
          <Link
            href={`/work/${prevProject.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              textDecoration: "none",
              color: "var(--color-text)",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
              }}
            >
              <span aria-hidden="true">←</span> {t("prevProject")}
            </span>
            <span
              style={{
                fontWeight: 600,
                fontSize: "var(--fs-sm)",
                color: "var(--color-accent)",
              }}
            >
              {prevProject.title}
            </span>
          </Link>
        ) : null}
      </div>

      {/* Return to All Projects Index */}
      <div style={{ justifySelf: "center", textAlign: "center" }}>
        <Link
          href="/work"
          style={{
            fontSize: "var(--fs-xs)",
            color: "var(--color-text-muted)",
            textDecoration: "underline",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            fontWeight: 600,
            padding: "var(--space-2) var(--space-3)",
            borderRadius: "var(--radius-sm)",
          }}
        >
          {t("backToWork")}
        </Link>
      </div>

      {/* Next Project Link */}
      <div style={{ justifySelf: "end", textAlign: "right" }}>
        {nextProject ? (
          <Link
            href={`/work/${nextProject.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              textDecoration: "none",
              color: "var(--color-text)",
              alignItems: "flex-end",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-1)",
              }}
            >
              {t("nextProject")} <span aria-hidden="true">→</span>
            </span>
            <span
              style={{
                fontWeight: 600,
                fontSize: "var(--fs-sm)",
                color: "var(--color-accent)",
              }}
            >
              {nextProject.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
