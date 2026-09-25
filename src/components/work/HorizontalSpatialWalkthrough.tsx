"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ProjectCard } from "./ProjectCard";
import portfolio from "@/../content/portfolio.json";

export interface HorizontalSpatialWalkthroughProps {
  initialSlug?: string;
}

type ViewMode = "walkthrough" | "grid";

/**
 * HorizontalSpatialWalkthrough Component
 *
 * Streamlined Architectural Catalog Showcase:
 * - 2-Mode View Switcher: Spatial Walkthrough (Curatorial Stage) and Archive Grid.
 * - In-stage sheet switcher allowing visitors to cycle through project drawing sheets.
 * - Icon-only full-bleed Lightbox inspection trigger.
 * - Pure architectural specifications grid without PDF references or page numbers.
 * - Cleaned layout without bottom previewer dock or keyboard hint clutter.
 */
export function HorizontalSpatialWalkthrough({
  initialSlug,
}: HorizontalSpatialWalkthroughProps) {
  const t = useTranslations("workPage");
  const projects = portfolio.projects;

  const initialIndex = initialSlug
    ? Math.max(0, projects.findIndex((p) => p.slug === initialSlug))
    : 0;

  const [currentIndex, setCurrentIndex] = React.useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [viewMode, setViewMode] = React.useState<ViewMode>("walkthrough");
  const [activeSheetIndex, setActiveSheetIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Safe current project reference
  const safeIndex = Math.min(currentIndex, Math.max(0, projects.length - 1));
  const currentProject = projects[safeIndex] || projects[0];

  // Reset sheet index when switching projects
  React.useEffect(() => {
    setActiveSheetIndex(0);
  }, [safeIndex]);

  const currentSheet =
    currentProject.images[activeSheetIndex] ||
    currentProject.images.find((img) => img.isHero) ||
    currentProject.images[0];

  const formattedIndex =
    safeIndex + 1 < 10 ? `0${safeIndex + 1}` : `${safeIndex + 1}`;
  const totalCount =
    projects.length < 10 ? `0${projects.length}` : `${projects.length}`;

  const goToNextProject = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToPrevProject = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const goToNextSheet = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSheetIndex((prev) => (prev + 1) % currentProject.images.length);
  };

  const goToPrevSheet = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveSheetIndex(
      (prev) => (prev - 1 + currentProject.images.length) % currentProject.images.length
    );
  };

  // Keyboard navigation support for projects and sheets
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === "Escape") setIsModalOpen(false);
        if (e.key === "ArrowRight") goToNextSheet();
        if (e.key === "ArrowLeft") goToPrevSheet();
        return;
      }

      if (viewMode === "walkthrough") {
        if (e.key === "ArrowRight") goToNextProject();
        if (e.key === "ArrowLeft") goToPrevProject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isModalOpen, goToNextProject, goToPrevProject]);

  return (
    <div style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-16)" }}>
      {/* View Switcher Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          paddingBottom: "var(--space-6)",
          marginBottom: "var(--space-8)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        {/* Project Counter Index Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--color-accent)",
              backgroundColor: "rgba(168, 83, 42, 0.12)",
              padding: "4px 12px",
              borderRadius: "9999px",
              border: "1px solid rgba(168, 83, 42, 0.25)",
            }}
          >
            {formattedIndex} / {totalCount}
          </span>
        </div>

        {/* 2-Mode View Switcher (Spatial Walkthrough vs Archive Grid) */}
        <div
          role="group"
          aria-label="View Modes"
          style={{
            display: "inline-flex",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "9999px",
            padding: "3px",
            gap: "3px",
          }}
        >
          {/* 1. Walkthrough */}
          <button
            type="button"
            onClick={() => setViewMode("walkthrough")}
            aria-pressed={viewMode === "walkthrough"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor:
                viewMode === "walkthrough" ? "var(--color-accent)" : "transparent",
              color: viewMode === "walkthrough" ? "#FFFFFF" : "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span aria-hidden="true">⬌</span>
            <span>{t("viewModeWalkthrough")}</span>
          </button>

          {/* 2. Grid */}
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor:
                viewMode === "grid" ? "var(--color-accent)" : "transparent",
              color: viewMode === "grid" ? "#FFFFFF" : "var(--color-text-muted)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span aria-hidden="true">☵</span>
            <span>{t("viewModeGrid")}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          MODE 1: SPATIAL WALKTHROUGH (CURATORIAL STAGE)
          ========================================================================= */}
      {viewMode === "walkthrough" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Main Panoramic Card */}
          <div
            className="walkthrough-hero-card"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg, 20px)",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              boxShadow: "0 24px 64px -12px rgba(0, 0, 0, 0.45)",
              minHeight: "560px",
            }}
          >
            {/* Visual Stage (Left) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                minHeight: "440px",
                backgroundColor: "#0d0c0a",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Image Preview with Smooth Zoom */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => setIsModalOpen(true)}
                title="Click to inspect in fullscreen high-resolution"
              >
                <Image
                  src={currentSheet.src}
                  alt={currentSheet.alt || `${currentProject.fullTitle} - Sheet ${activeSheetIndex + 1}`}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 55vw"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>

              {/* Prev / Next Sheet Navigation Buttons: Vertically centered on left & right */}
              {currentProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevSheet();
                    }}
                    aria-label={t("prevSheet")}
                    title={t("prevSheet")}
                    style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.68)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
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
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNextSheet();
                    }}
                    aria-label={t("nextSheet")}
                    title={t("nextSheet")}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.68)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
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
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}

              {/* Top Overlay Badge Bar: Only sheet number on left */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "var(--space-4)",
                  background:
                    "linear-gradient(to bottom, rgba(10, 9, 8, 0.85) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    backgroundColor: "rgba(0, 0, 0, 0.65)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    pointerEvents: "auto",
                  }}
                >
                  {t("sheetLabel")} {activeSheetIndex + 1} / {currentProject.images.length}
                </span>
              </div>

              {/* Bottom In-Stage Inspect Trigger */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "var(--space-4)",
                  background:
                    "linear-gradient(to top, rgba(10, 9, 8, 0.88) 0%, transparent 100%)",
                  gap: "8px",
                }}
              >

                {/* Inspect in Fullscreen Button: Icon ONLY */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Inspect in wide view"
                  title="Inspect in wide view"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(0, 0, 0, 0.72)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginLeft: "auto",
                    transition: "all var(--dur-fast) var(--ease-standard)",
                  }}
                >
                  <svg
                    width="15"
                    height="15"
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
                </button>
              </div>
            </div>

            {/* Architectural Specification Panel (Right) */}
            <div
              style={{
                padding: "clamp(var(--space-6), 4vw, var(--space-8))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "var(--space-6)",
              }}
            >
              <div>
                {/* Project Index Top Line (No PDF reference or page numbers) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    PROJECT {formattedIndex} / {totalCount}
                  </span>
                </div>

                {/* Monumental Syne Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "clamp(24px, 2.5vw, 34px)",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    lineHeight: 1.15,
                    margin: "0 0 var(--space-3) 0",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {currentProject.fullTitle}
                </h2>

                {/* Narrative / Parti Statement */}
                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    margin: "0 0 var(--space-6) 0",
                  }}
                >
                  {currentProject.description}
                </p>

                {/* 2x2 Technical Specifications Grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "var(--space-4)",
                    padding: "var(--space-4)",
                    backgroundColor: "var(--color-surface-2, rgba(0, 0, 0, 0.04))",
                    borderRadius: "var(--radius-md)",
                    border: "var(--border-hairline)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono, monospace)",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      {t("studioOrganizer")}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {currentProject.organizer || "EiABC Academic Studio"}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono, monospace)",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      {t("drawingSheets")}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {t("drawingSheetCount", { count: currentProject.images.length })}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono, monospace)",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      Location
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-text)",
                      }}
                    >
                      {currentProject.slug.includes("debre-birhan")
                        ? "Debre Birhan, Ethiopia"
                        : "Addis Ababa, Ethiopia"}
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontFamily: "var(--font-mono, monospace)",
                        textTransform: "uppercase",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.06em",
                        marginBottom: "3px",
                      }}
                    >
                      {t("achievement")}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: currentProject.achievement
                          ? "var(--color-accent)"
                          : "var(--color-text-muted)",
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      {currentProject.achievement || "EiABC Studio Selection"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Primary Action and Glide Arrow Controls */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    flexWrap: "wrap",
                  }}
                >
                  <Link
                    href={`/work/${currentProject.slug}`}
                    className="editorial-link"
                    style={{
                      fontSize: "var(--fs-sm)",
                      fontWeight: 600,
                      color: "var(--color-text)",
                    }}
                  >
                    <span>{t("exploreProject")}</span>
                    <span className="editorial-arrow" aria-hidden="true">→</span>
                  </Link>

                  {/* Project Carousel Arrows */}
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      type="button"
                      onClick={goToPrevProject}
                      aria-label={t("prevProject")}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all var(--dur-fast) var(--ease-standard)",
                      }}
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={goToNextProject}
                      aria-label={t("nextProject")}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        border: "1px solid var(--color-border)",
                        backgroundColor: "var(--color-surface)",
                        color: "var(--color-text)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all var(--dur-fast) var(--ease-standard)",
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 2: ARCHIVE GRID (RESPONSIVE ARCHITECTURAL MASONRY)
          ========================================================================= */}
      {viewMode === "grid" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(var(--space-6), 3vw, var(--space-8))",
          }}
        >
          {projects.map((project) => {
            const heroImage =
              project.images.find((img) => img.isHero) || project.images[0];

            return (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                title={project.fullTitle}
                type={project.type}
                coverSrc={heroImage.src}
                coverAlt={heroImage.alt || project.fullTitle}
                drawingCount={project.images.length}
              />
            );
          })}
        </div>
      )}

      {/* =========================================================================
          FULLSCREEN WIDE-VIEW LIGHTBOX MODAL
          ========================================================================= */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentProject.fullTitle}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(8, 7, 6, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(12px, 3vw, 32px)",
          }}
        >
          {/* Backdrop Click Dismiss */}
          <button
            type="button"
            aria-label="Close wide viewer"
            onClick={() => setIsModalOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          />

          {/* Lightbox Inner Stage */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: "1400px",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              borderRadius: "var(--radius-lg, 16px)",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "#0d0c0a",
              boxShadow: "0 32px 80px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(18, 16, 14, 0.95)",
              }}
            >
              <div>
                <h3
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {currentProject.fullTitle}
                </h3>
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: "var(--color-accent)",
                  }}
                >
                  {t("sheetLabel")} {activeSheetIndex + 1} / {currentProject.images.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "36px",
                  height: "36px",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  transition: "background var(--dur-fast) var(--ease-standard)",
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Image View */}
            <div
              style={{
                position: "relative",
                flexGrow: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={currentSheet.src}
                alt={currentSheet.alt || currentProject.fullTitle}
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />

              {/* Prev / Next Sheet Navigation Buttons: Vertically centered on left & right in Zoomed State */}
              {currentProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPrevSheet}
                    aria-label={t("prevSheet")}
                    title={t("prevSheet")}
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                      transition: "all var(--dur-fast) var(--ease-standard)",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextSheet}
                    aria-label={t("nextSheet")}
                    title={t("nextSheet")}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      zIndex: 10,
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                      transition: "all var(--dur-fast) var(--ease-standard)",
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "14px 24px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(18, 16, 14, 0.95)",
              }}
            >

              <Link
                href={`/work/${currentProject.slug}`}
                onClick={() => setIsModalOpen(false)}
                style={{
                  color: "var(--color-accent)",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {t("exploreProject")} →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
