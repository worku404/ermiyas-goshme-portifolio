"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import portfolio from "@/../content/portfolio.json";

/**
 * KineticProjectReel
 *
 * Ultra-wide architectural filmstrip showcasing Ermiyas Goshme's projects:
 * - Monumental widescreen cards with rich architectural renders.
 * - Continuous smooth horizontal auto-glide.
 * - Silent pause-on-hover: hovering over cards smoothly pauses the animation
 *   without any distracting indicator text or buttons.
 * - Full widescreen stage extending across the screen for immersive visual impact.
 */
export function KineticProjectReel() {
  const t = useTranslations("featured");

  // All 10 projects from ground truth portfolio.json
  const projects = portfolio.projects;
  // Duplicate array once for seamless infinite CSS marquee loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section
      aria-labelledby="featured-work-heading"
      style={{
        paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
        paddingBottom: "clamp(var(--space-10), 8vw, var(--space-20))",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          maxWidth: "var(--bp-xl)",
          margin: "0 auto",
          padding: "0 clamp(var(--space-4), 4vw, var(--space-8))",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "var(--space-4)",
          marginBottom: "var(--space-8)",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 12px",
              borderRadius: "9999px",
              backgroundColor: "rgba(168, 83, 42, 0.12)",
              border: "1px solid rgba(168, 83, 42, 0.3)",
              color: "var(--color-accent)",
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontFamily: "var(--font-mono, monospace)",
              marginBottom: "var(--space-2)",
            }}
          >
            <span>Architectural Portfolio Reel</span>
          </div>

          <h2
            id="featured-work-heading"
            style={{
              fontSize: "clamp(var(--fs-2xl), 4vw, var(--fs-4xl))",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              marginBottom: "var(--space-2)",
              lineHeight: 1.15,
            }}
          >
            {t("sectionTitle")}
          </h2>

          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--color-text-muted)",
              maxWidth: "65ch",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {t("sectionSubtitle")}
          </p>
        </div>

        <div>
          <Link
            href="/work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-accent)",
              border: "var(--border-hairline)",
              fontSize: "var(--fs-sm)",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all var(--dur-fast) var(--ease-standard)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span>{t("viewAll")}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Monumental Panoramic Reel Stage (Expanded Height & Width) */}
      <div
        className="reel-stage"
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          overflow: "hidden",
          padding: "20px 0 32px",
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div
          className="reel-track"
          style={{
            display: "flex",
            gap: "clamp(20px, 2.5vw, 32px)",
            width: "max-content",
            animation: "kineticReel 48s linear infinite",
            willChange: "transform",
            padding: "0 clamp(24px, 4vw, 48px)",
          }}
        >
          {duplicatedProjects.map((project, index) => {
            const projectIndex = (index % projects.length) + 1;
            const formattedIndex =
              projectIndex < 10 ? `0${projectIndex}` : `${projectIndex}`;
            const heroImage =
              project.images.find((img) => img.isHero) || project.images[0];

            return (
              <article
                key={`${project.slug}-${index}`}
                className="reel-card"
                style={{
                  flex: "0 0 clamp(480px, 54vw, 800px)",
                  backgroundColor: "var(--color-surface)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  borderRadius: "var(--radius-lg, 20px)",
                  border: "var(--border-hairline)",
                  overflow: "hidden",
                  position: "relative",
                  boxShadow:
                    "0 24px 60px -12px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.08)",
                  transition:
                    "transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), filter var(--dur-fast) var(--ease-standard), opacity var(--dur-fast) var(--ease-standard)",
                }}
              >
                <Link
                  href={`/work/${project.slug}`}
                  aria-label={`${project.fullTitle} — ${project.type}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {/* High-Resolution Panoramic Stage (Substantially Increased Height) */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(340px, 44vh, 480px)",
                      backgroundColor: "var(--color-surface-2, #181613)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt || project.fullTitle}
                      width={1200}
                      height={700}
                      sizes="(max-width: 768px) 95vw, (max-width: 1400px) 60vw, 800px"
                      priority={index < 2}
                      loading={index < 2 ? "eager" : "lazy"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Gradient Overlay & Metadata Pill Cluster */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(14, 13, 11, 0.96) 0%, rgba(14, 13, 11, 0.35) 45%, transparent 100%)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: "clamp(18px, 2.5vw, 28px)",
                      }}
                    >
                      {/* Top Badges */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "12px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(8px)",
                            padding: "5px 12px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                          }}
                        >
                          {formattedIndex} / 10
                        </span>

                        <span
                          style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: "11px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            color: "#FFFFFF",
                            backgroundColor: "var(--color-accent)",
                            padding: "5px 12px",
                            borderRadius: "9999px",
                            boxShadow: "0 2px 10px rgba(168, 83, 42, 0.5)",
                          }}
                        >
                          {project.type}
                        </span>
                      </div>

                      {/* Bottom Content */}
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--font-display), serif",
                            fontSize: "clamp(20px, 2.4vw, 28px)",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "8px",
                            lineHeight: 1.25,
                          }}
                        >
                          {project.fullTitle}
                        </h3>

                        <p
                          style={{
                            fontSize: "clamp(13px, 1.1vw, 15px)",
                            color: "var(--color-text-muted, #C8C2B8)",
                            lineHeight: 1.5,
                            margin: 0,
                            marginBottom: "16px",
                            maxWidth: "75ch",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {project.description}
                        </p>

                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#FFFFFF",
                            backgroundColor: "rgba(255, 255, 255, 0.14)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            padding: "7px 16px",
                            borderRadius: "9999px",
                            transition: "all var(--dur-fast) var(--ease-standard)",
                          }}
                        >
                          <span>{t("viewProject")}</span>
                          <span aria-hidden="true">↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </div>

      {/* Scoped CSS for Keyframes and Smooth Hover Pausing */}
      <style>{`
        @keyframes kineticReel {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(calc(-50% - (clamp(20px, 2.5vw, 32px) / 2)), 0, 0);
          }
        }

        /* Seamless pause on hover over the entire stage or any card */
        .reel-stage:hover .reel-track {
          animation-play-state: paused !important;
        }

        .reel-track:hover .reel-card {
          opacity: 0.75;
          filter: brightness(0.9);
        }

        .reel-track .reel-card:hover {
          opacity: 1 !important;
          filter: brightness(1) !important;
          transform: translateY(-8px) scale(1.02);
          border-color: var(--color-accent) !important;
          box-shadow: 0 28px 72px -12px rgba(0, 0, 0, 0.85), 0 0 0 1px var(--color-accent);
          z-index: 10;
        }

        .reel-track .reel-card:hover img {
          transform: scale(1.05);
        }

        @media (prefers-reduced-motion: reduce) {
          .reel-track {
            animation: none !important;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
