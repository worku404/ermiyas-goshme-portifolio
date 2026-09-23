import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export interface BreadcrumbsProps {
  projectTitle: string;
}

/**
 * Accessible Breadcrumbs navigation component.
 *
 * Provides orientation hierarchy (Home / Work / <Project Title>) per docs/03 §6.
 * Implements WAI-ARIA breadcrumb pattern using an ordered list with aria-current="page".
 */
export function Breadcrumbs({ projectTitle }: BreadcrumbsProps) {
  const t = useTranslations("breadcrumbs");

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        marginBottom: "var(--space-6)",
        fontSize: "var(--fs-sm)",
        color: "var(--color-text-muted)",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          listStyle: "none",
          gap: "var(--space-2)",
          padding: 0,
          margin: 0,
        }}
      >
        <li>
          <Link
            href="/"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            {t("home")}
          </Link>
        </li>
        <li aria-hidden="true" style={{ opacity: 0.5 }}>
          /
        </li>
        <li>
          <Link
            href="/work"
            style={{
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            {t("work")}
          </Link>
        </li>
        <li aria-hidden="true" style={{ opacity: 0.5 }}>
          /
        </li>
        <li
          aria-current="page"
          style={{
            color: "var(--color-text)",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "36ch",
          }}
        >
          {projectTitle}
        </li>
      </ol>
    </nav>
  );
}
