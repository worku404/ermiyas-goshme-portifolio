"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import portfolio from "@/../content/portfolio.json";

/**
 * KineticProjectReel
 *
 * Full-viewport architectural filmstrip showcasing Ermiyas Goshme's projects:
 * - Full-window height (100dvh) matching Hero and About sections.
 * - Monumental widescreen cards with rich architectural renders (height clamp(420px, 58vh, 620px)).
 * - Left-to-right animated editorial link for [View All 10 Projects →].
 * - Syne display font matching owner name and About section.
 * - Perfect container alignment with same margins and padding as About section.
 * - Balanced margin between subtitle and image reel without excessive padding.
 * - Smooth scroll-triggered reveal transitions.
 * - Seamless pause-on-hover with interactive card hover lift and micro-actions.
 */
export function KineticProjectReel() {
  const t = useTranslations("featured");
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // All 10 projects from ground truth portfolio.json
  const projects = portfolio.projects;
  // Duplicate array once for seamless infinite CSS marquee loop
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-work-heading"
      style={{
        minHeight: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "clamp(var(--space-6), 4vw, var(--space-10))",
        paddingBottom: "clamp(var(--space-3), 2vw, var(--space-5))",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
      }}
    >
      {/* Section Header: perfectly aligned with container grid */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "var(--space-6)",
          marginBottom: "clamp(var(--space-6), 3vw, var(--space-8))",
        }}
      >
        <div style={{ maxWidth: "68ch" }}>
          <h2
            id="featured-work-heading"
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-1" : ""}`}
            style={{
              fontSize: "clamp(48px, 6vw, 78px)",
              fontFamily: "var(--font-display), sans-serif",
              color: "var(--color-text)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              margin: 0,
              marginBottom: "var(--space-3)",
            }}
          >
            {t("sectionTitle")}
          </h2>

          <p
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-2" : ""}`}
            style={{
              fontSize: "var(--fs-base)",
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {t("sectionSubtitle")}
          </p>
        </div>

        <div
          className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-2" : ""}`}
          style={{ paddingBottom: "var(--space-1)" }}
        >
          <Link
            href="/work"
            className="editorial-link"
          >
            <span>{t("viewAll")}</span>
            <span className="editorial-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* Monumental Panoramic Reel Stage (Expanded Height to Cover Full Window) */}
      <div
        className={`reel-stage scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-3" : ""}`}
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          overflow: "hidden",
          padding: "var(--space-4) 0 var(--space-6)",
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
            gap: "clamp(var(--space-5), 2.5vw, var(--space-8))",
            width: "max-content",
            animation: "kineticReel 48s linear infinite",
            animationPlayState: isVisible ? "running" : "paused",
            willChange: isVisible ? "transform" : "auto",
            padding: "0 clamp(var(--space-6), 4vw, var(--space-12))",
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
                  flex: "0 0 clamp(360px, 56vw, 840px)",
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
                    "transform var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard), filter var(--dur-base) var(--ease-standard), opacity var(--dur-base) var(--ease-standard)",
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
                  {/* High-Resolution Monumental Stage */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "clamp(420px, 58vh, 620px)",
                      backgroundColor: "var(--color-surface-2, #181613)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt || project.fullTitle}
                      width={1200}
                      height={700}
                      sizes="(max-width: 768px) 92vw, (max-width: 1400px) 60vw, 840px"
                      priority={false}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />

                    {/* Gradient Overlay & Metadata Pill Cluster */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(14, 13, 11, 0.96) 0%, rgba(14, 13, 11, 0.4) 48%, transparent 100%)",
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
                            backgroundColor: "rgba(0, 0, 0, 0.65)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            padding: "5px 12px",
                            borderRadius: "9999px",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            letterSpacing: "0.04em",
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
                            fontFamily: "var(--font-display), sans-serif",
                            fontSize: "clamp(20px, 2.4vw, 28px)",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: 0,
                            marginBottom: "8px",
                            lineHeight: 1.25,
                            letterSpacing: "-0.02em",
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
                          className="reel-view-btn"
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
                            border: "1px solid rgba(255, 255, 255, 0.22)",
                            padding: "7px 18px",
                            borderRadius: "9999px",
                            transition: "all var(--dur-fast) var(--ease-standard)",
                          }}
                        >
                          <span>{t("viewProject")}</span>
                          <span className="reel-view-arrow" style={{ transition: "transform var(--dur-fast) var(--ease-standard)" }} aria-hidden="true">↗</span>
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
            transform: translate3d(calc(-50% - (clamp(var(--space-5), 2.5vw, var(--space-8)) / 2)), 0, 0);
          }
        }

        /* Seamless pause on hover over the entire stage or any card */
        .reel-stage:hover .reel-track {
          animation-play-state: paused !important;
        }

        .reel-track:hover .reel-card {
          opacity: 0.72;
          filter: brightness(0.88);
        }

        .reel-track .reel-card:hover {
          opacity: 1 !important;
          filter: brightness(1) !important;
          transform: translateY(-8px) scale(1.018);
          border-color: var(--color-accent) !important;
          box-shadow: 0 32px 80px -16px rgba(0, 0, 0, 0.85), 0 0 0 1px var(--color-accent);
          z-index: 10;
        }

        .reel-track .reel-card:hover img {
          transform: scale(1.05);
        }

        .reel-track .reel-card:hover .reel-view-btn {
          background-color: var(--color-accent) !important;
          border-color: var(--color-accent) !important;
          box-shadow: 0 4px 16px rgba(168, 83, 42, 0.4);
        }

        .reel-track .reel-card:hover .reel-view-arrow {
          transform: translate(3px, -3px);
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
