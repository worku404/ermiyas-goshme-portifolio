import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import portfolio from "@/../content/portfolio.json";

export interface ProjectGridProps {
  limit?: number;
  showSectionHeader?: boolean;
}

/**
 * Responsive architectural project grid.
 *
 * Implements 12-col / modular responsive layout per docs/02-design-system.md §5.
 * Strictly preserves project ordering defined in portfolio.json ground truth.
 */
export function ProjectGrid({
  limit,
  showSectionHeader = true,
}: ProjectGridProps) {
  const t = useTranslations("featured");
  const projectsToDisplay = limit
    ? portfolio.projects.slice(0, limit)
    : portfolio.projects;

  return (
    <section
      aria-labelledby="featured-work-heading"
      style={{
        paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
        paddingBottom: "clamp(var(--space-8), 6vw, var(--space-16))",
        borderBottom: "var(--border-hairline)",
      }}
    >
      {showSectionHeader && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "var(--space-4)",
            marginBottom: "var(--space-8)",
          }}
        >
          <div>
            <h2
              id="featured-work-heading"
              style={{
                fontSize: "var(--fs-2xl)",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                marginBottom: "var(--space-2)",
              }}
            >
              {t("sectionTitle")}
            </h2>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text-muted)",
                maxWidth: "60ch",
              }}
            >
              {t("sectionSubtitle")}
            </p>
          </div>

          {limit && (
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-1)",
                color: "var(--color-accent)",
                fontWeight: 600,
                fontSize: "var(--fs-sm)",
                textDecoration: "underline",
              }}
            >
              <span>{t("viewAll")}</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}

      {/* Responsive Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(var(--space-4), 3vw, var(--space-6))",
        }}
      >
        {projectsToDisplay.map((project) => {
          const heroImage =
            project.images.find((img) => img.isHero) || project.images[0];

          return (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.fullTitle}
              type={project.type}
              coverSrc={heroImage.src}
              coverAlt={`${project.fullTitle} — ${project.type}`}
            />
          );
        })}
      </div>
    </section>
  );
}
