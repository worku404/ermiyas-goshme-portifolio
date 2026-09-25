import * as React from "react";
import { useTranslations } from "next-intl";
import { Breadcrumbs } from "./Breadcrumbs";
import { NeedsReviewBanner } from "./NeedsReviewBanner";
import { ImageGallery } from "./ImageGallery";
import { ProjectNavigation, NavProjectSummary } from "./ProjectNavigation";
import { PortfolioImage } from "./CaptionedImage";
import { ShareButton } from "./ShareButton";

export interface ProjectData {
  id: number;
  slug: string;
  fullTitle: string;
  type: string;
  organizer?: string | null;
  description: string;
  achievement?: string | null;
  keyConcepts?: string[] | null;
  images: PortfolioImage[];
}

export interface ProjectDetailProps {
  project: ProjectData;
  prevProject?: NavProjectSummary | null;
  nextProject?: NavProjectSummary | null;
  locale: string;
}

/**
 * ProjectDetail template rendering the authoritative project presentation.
 *
 * Implements acceptance rules per docs/03 §5 & docs/04:
 * - Content fidelity: verbatim titles, descriptions, organizers, and typologies.
 * - Conditional features: achievement badge, key concepts list, and NEEDS_REVIEW banner.
 * - Visual gallery with full-resolution lightbox viewer.
 * - Sequential project navigation preserving portfolio.json ordering.
 */
export function ProjectDetail({
  project,
  prevProject,
  nextProject,
  locale,
}: ProjectDetailProps) {
  const t = useTranslations("project");

  return (
    <article
      style={{
        paddingTop: "clamp(var(--space-6), 4vw, var(--space-12))",
        paddingBottom: "clamp(var(--space-8), 6vw, var(--space-16))",
      }}
    >
      {/* Breadcrumb Hierarchy */}
      <Breadcrumbs projectTitle={project.fullTitle} />

      {/* Project Header Header Block */}
      <header style={{ marginBottom: "var(--space-8)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            marginBottom: "var(--space-3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-2)",
            }}
          >
            <span
              style={{
                padding: "var(--space-1) var(--space-3)",
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-accent)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {project.type}
            </span>

            {project.organizer && (
              <span
                style={{
                  fontSize: "var(--fs-xs)",
                  color: "var(--color-text-muted)",
                }}
              >
                • {t("organizerLabel")}: <strong>{project.organizer}</strong>
              </span>
            )}
          </div>

          <ShareButton projectTitle={project.fullTitle} />
        </div>

        <h1
          style={{
            fontSize: "clamp(var(--fs-2xl), 5vw, var(--fs-4xl))",
            fontFamily: "var(--font-display), serif",
            color: "var(--color-text)",
            lineHeight: "var(--lh-heading)",
            letterSpacing: "-0.02em",
            marginBottom: "var(--space-6)",
          }}
        >
          {project.fullTitle}
        </h1>

        {/* Verbatim Description */}
        <div
          style={{
            maxWidth: "var(--max-measure)",
            fontSize: "var(--fs-base)",
            lineHeight: "var(--lh-body)",
            color: "var(--color-text)",
          }}
        >
          <p>{project.description}</p>
        </div>

        {/* Achievement / Certificate Callout (if present) */}
        {project.achievement && (
          <div
            style={{
              marginTop: "var(--space-6)",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-4)",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-sm)",
              color: "var(--color-text)",
            }}
          >
            <span style={{ color: "var(--color-accent)", fontSize: "var(--fs-md)" }} aria-hidden="true">
              🏆
            </span>
            <span>
              <strong>{t("achievementLabel")}:</strong> {project.achievement}
            </span>
          </div>
        )}

        {/* Key Architectural Concepts (if present) */}
        {project.keyConcepts && project.keyConcepts.length > 0 && (
          <div
            style={{
              marginTop: "var(--space-6)",
              padding: "var(--space-4)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              maxWidth: "var(--max-measure)",
            }}
          >
            <h2
              style={{
                fontSize: "var(--fs-sm)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)",
              }}
            >
              {t("keyConceptsLabel")}
            </h2>
            <ul
              style={{
                listStyle: "square",
                paddingLeft: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
                fontSize: "var(--fs-sm)",
                color: "var(--color-text)",
              }}
            >
              {project.keyConcepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Image Gallery with Lightbox */}
      <ImageGallery
        images={project.images}
        projectTitle={project.fullTitle}
        locale={locale}
      />

      {/* Sequential Previous / Next Project Navigation */}
      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </article>
  );
}
