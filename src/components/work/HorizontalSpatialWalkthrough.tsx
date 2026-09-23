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

/**
 * HorizontalSpatialWalkthrough
 *
 * Implements the user's requested high-end architectural interaction pattern for the /work catalog:
 * - Panoramic widescreen project visualizer with curatorial architectural narrative.
 * - Interactive navigation: Next/Prev arrows, keyboard arrow keys, progress bar, and 10-item thumbnail strip.
 * - Widescreen Lightbox: 1-click full-bleed inspection of architectural renders and drawings.
 * - Dual-view switcher: Seamless toggle between "Spatial Walkthrough" and "Archive Grid".
 */
export function HorizontalSpatialWalkthrough({
  initialSlug,
}: HorizontalSpatialWalkthroughProps) {
  const t = useTranslations("workPage");
  const tFeatured = useTranslations("featured");
  const projects = portfolio.projects;

  const initialIndex = initialSlug
    ? Math.max(0, projects.findIndex((p) => p.slug === initialSlug))
    : 0;

  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [viewMode, setViewMode] = React.useState<"walkthrough" | "grid">("walkthrough");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const currentProject = projects[currentIndex];

  const currentHeroImage =
    currentProject.images.find((img) => img.isHero) || currentProject.images[0];

  const formattedIndex =
    currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`;
  const totalCount = projects.length < 10 ? `0${projects.length}` : `${projects.length}`;
  const progressPercent = ((currentIndex + 1) / projects.length) * 100;

  const goToNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const goToPrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Keyboard navigation support
  React.useEffect(() => {
    if (viewMode !== "walkthrough" || isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isModalOpen, goToNext, goToPrev]);

  // Modal ESC key listener
  React.useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  return (
    <div style={{ marginTop: "var(--space-6)", marginBottom: "var(--space-16)" }}>
      {/* View Switcher Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          marginBottom: "var(--space-8)",
        }}
      >
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
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
            {viewMode === "walkthrough"
              ? "Use keyboard arrows (← / →) or click to browse"
              : "Complete 10-Project Catalog"}
          </span>
        </div>

        {/* View Mode Segmented Pill */}
        <div
          style={{
            display: "inline-flex",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "var(--border-hairline)",
            borderRadius: "9999px",
            padding: "4px",
            gap: "4px",
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode("walkthrough")}
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
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span>⬌</span>
            <span>{t("viewModeWalkthrough")}</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode("grid")}
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
              fontFamily: "var(--font-mono, monospace)",
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span>☵</span>
            <span>{t("viewModeGrid")}</span>
          </button>
        </div>
      </div>

      {/* WALKTHROUGH MODE */}
      {viewMode === "walkthrough" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Main Panoramic Walkthrough Card */}
          <div
            className="walkthrough-hero-card"
            style={{
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 20px)",
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
              boxShadow:
                "0 24px 64px -12px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.08)",
              minHeight: "540px",
            }}
          >
            {/* Visual Stage */}
            <button
              type="button"
              className="walkthrough-visual-container"
              style={{
                position: "relative",
                width: "100%",
                minHeight: "380px",
                backgroundColor: "var(--color-surface-2, #14120F)",
                overflow: "hidden",
                cursor: "pointer",
                border: "none",
                padding: 0,
                textAlign: "left",
                display: "block",
              }}
              onClick={() => setIsModalOpen(true)}
              aria-label={`Open wide view for ${currentProject.fullTitle}`}
            >
              <Image
                src={currentHeroImage.src}
                alt={currentHeroImage.alt || currentProject.fullTitle}
                width={1200}
                height={800}
                sizes="(max-width: 900px) 100vw, 60vw"
                priority
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Blueprint & Fullscreen Hint Badge */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(14, 13, 11, 0.85) 0%, transparent 40%, rgba(14, 13, 11, 0.4) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "var(--space-4)",
                  pointerEvents: "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      backdropFilter: "blur(6px)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                    }}
                  >
                    Drawing Sheet 01 / {currentProject.images.length}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      backgroundColor: "var(--color-accent)",
                      padding: "4px 10px",
                      borderRadius: "9999px",
                      boxShadow: "0 2px 8px rgba(168, 83, 42, 0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {currentProject.type}
                  </span>
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    alignSelf: "flex-end",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "6px 14px",
                    borderRadius: "9999px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="15 3 21 3 21 9" />
                    <polyline points="9 21 3 21 3 15" />
                    <line x1="21" y1="3" x2="14" y2="10" />
                    <line x1="3" y1="21" x2="10" y2="14" />
                  </svg>
                  <span>{tFeatured("wideView")}</span>
                </div>
              </div>
            </button>

            {/* Narrative & Architectural Metadata Stage */}
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
                      letterSpacing: "0.05em",
                    }}
                  >
                    PROJECT {formattedIndex} / {totalCount}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--color-text-muted)",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    PDF p. {currentProject.pdfPages.join(", ")}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "clamp(22px, 3vw, 30px)",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    lineHeight: 1.2,
                    margin: 0,
                    marginBottom: "var(--space-3)",
                  }}
                >
                  {currentProject.fullTitle}
                </h2>

                <p
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    margin: 0,
                    marginBottom: "var(--space-6)",
                  }}
                >
                  {currentProject.description}
                </p>

                {/* Architectural Specifications Table */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "var(--space-3)",
                    paddingTop: "var(--space-4)",
                    borderTop: "var(--border-hairline)",
                    marginBottom: "var(--space-4)",
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
                        letterSpacing: "0.05em",
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
                      {currentProject.organizer || "AAU EiABC Studio"}
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
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t("achievement")}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--color-accent)",
                      }}
                    >
                      {currentProject.achievement || "Studio Design Project"}
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
                        letterSpacing: "0.05em",
                      }}
                    >
                      Location
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-text)",
                      }}
                    >
                      Addis Ababa, Ethiopia
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
                        letterSpacing: "0.05em",
                      }}
                    >
                      Drawings & Renders
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--color-text)",
                      }}
                    >
                      {currentProject.images.length} High-Res Sheets
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Cluster & Navigation Arrows */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    flexWrap: "wrap",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  <Link
                    href={`/work/${currentProject.slug}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 22px",
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-on-accent)",
                      borderRadius: "var(--radius-sm)",
                      fontWeight: 600,
                      fontSize: "var(--fs-sm)",
                      textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(168, 83, 42, 0.35)",
                      transition: "all var(--dur-fast) var(--ease-standard)",
                    }}
                  >
                    <span>{t("exploreProject")}</span>
                    <span aria-hidden="true">→</span>
                  </Link>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      type="button"
                      aria-label="Previous Project (Left Arrow)"
                      onClick={goToPrev}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-surface)",
                        border: "var(--border-hairline)",
                        color: "var(--color-text)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        transition: "all var(--dur-fast) var(--ease-standard)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-accent)";
                        e.currentTarget.style.color = "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-hairline)";
                        e.currentTarget.style.color = "var(--color-text)";
                      }}
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      aria-label="Next Project (Right Arrow)"
                      onClick={goToNext}
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-surface)",
                        border: "var(--border-hairline)",
                        color: "var(--color-text)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        transition: "all var(--dur-fast) var(--ease-standard)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--color-accent)";
                        e.currentTarget.style.color = "var(--color-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-hairline)";
                        e.currentTarget.style.color = "var(--color-text)";
                      }}
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Spatial Progress Track */}
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${progressPercent}%`,
                      backgroundColor: "var(--color-accent)",
                      borderRadius: "9999px",
                      transition: "width 0.35s ease",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 10-Project Interactive Thumbnail Jump Strip */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "8px",
              scrollbarWidth: "thin",
            }}
          >
            {projects.map((p, idx) => {
              const isActive = idx === currentIndex;
              const thumbImg = p.images.find((img) => img.isHero) || p.images[0];
              const pNum = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Jump to Project ${pNum}: ${p.fullTitle}`}
                  style={{
                    flex: "0 0 clamp(110px, 12vw, 150px)",
                    borderRadius: "var(--radius-sm)",
                    border: isActive
                      ? "2px solid var(--color-accent)"
                      : "1px solid var(--border-hairline)",
                    backgroundColor: "var(--color-surface)",
                    overflow: "hidden",
                    cursor: "pointer",
                    padding: 0,
                    position: "relative",
                    opacity: isActive ? 1 : 0.65,
                    transform: isActive ? "scale(1.03)" : "none",
                    transition: "all var(--dur-fast) var(--ease-standard)",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "70px" }}>
                    <Image
                      src={thumbImg.src}
                      alt={p.fullTitle}
                      width={200}
                      height={120}
                      sizes="150px"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        insetInline: 0,
                        background: "rgba(0, 0, 0, 0.75)",
                        padding: "2px 6px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-mono, monospace)",
                          color: isActive ? "var(--color-accent)" : "#FFFFFF",
                          fontWeight: 700,
                        }}
                      >
                        {pNum}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          color: "#FFFFFF",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "80px",
                        }}
                      >
                        {p.tocTitle}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* ARCHIVE GRID MODE */
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "clamp(var(--space-4), 3vw, var(--space-6))",
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
              />
            );
          })}
        </div>
      )}

      {/* FULLSCREEN WIDE-VIEW LIGHTBOX MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentProject.fullTitle}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            backgroundColor: "rgba(8, 7, 6, 0.94)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(12px, 3vw, 32px)",
          }}
        >
          {/* Transparent Backdrop Click Button */}
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

          <div
            style={{
              maxWidth: "1100px",
              width: "100%",
              maxHeight: "92vh",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-accent)",
              borderRadius: "var(--radius-lg, 20px)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 32px 80px rgba(0, 0, 0, 0.9)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              aria-label="Close wide viewer (Esc)"
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 10,
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                fontSize: "18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all var(--dur-fast) var(--ease-standard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
              }}
            >
              ✕
            </button>

            {/* Modal Image Viewport */}
            <div
              style={{
                width: "100%",
                height: "62vh",
                backgroundColor: "#000",
                position: "relative",
              }}
            >
              <Image
                src={currentHeroImage.src}
                alt={currentHeroImage.alt || currentProject.fullTitle}
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "contain",
                }}
              />
            </div>

            {/* Modal Footer Drawer */}
            <div
              style={{
                padding: "clamp(16px, 2.5vw, 24px) clamp(20px, 3vw, 32px)",
                backgroundColor: "var(--color-surface)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                borderTop: "var(--border-hairline)",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                  }}
                >
                  PROJECT {formattedIndex} / {totalCount} · {currentProject.type.toUpperCase()}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "var(--fs-lg)",
                    color: "var(--color-text)",
                    margin: "4px 0 0 0",
                  }}
                >
                  {currentProject.fullTitle}
                </h3>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Link
                  href={`/work/${currentProject.slug}`}
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-on-accent)",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  {t("exploreProject")} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoped CSS for Hover Transitions */}
      <style>{`
        .walkthrough-visual-container:hover img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
