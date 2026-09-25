"use client";

import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface ProjectCardProps {
  slug: string;
  title: string;
  type: string;
  coverSrc: string;
  coverAlt: string;
  drawingCount?: number;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Architectural project summary card linking directly to /work/[slug].
 *
 * Implements:
 * - Solid architectural surface (var(--color-surface)) eliminating background noise.
 * - Image scale hover micro-interaction.
 * - Syne display typography for project title.
 * - Drawing sheet count pill and arrow link indicator.
 * - Complete keyboard accessibility.
 */
export function ProjectCard({
  slug,
  title,
  type,
  coverSrc,
  coverAlt,
  drawingCount,
  width = 640,
  height = 480,
  priority = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <article
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "var(--radius-lg, 16px)",
        border: isHovered
          ? "1px solid var(--color-accent)"
          : "1px solid var(--color-border)",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: isHovered
          ? "0 20px 40px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px var(--color-accent)"
          : "0 4px 16px rgba(0, 0, 0, 0.12)",
        transform: isHovered ? "translateY(-4px)" : "none",
        transition:
          "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
      }}
    >
      <Link
        href={`/work/${slug}`}
        aria-label={`${title} — ${type}`}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          textDecoration: "none",
          color: "inherit",
        }}
      >
        {/* Cover Image Container */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            backgroundColor: "var(--color-surface-2)",
            overflow: "hidden",
          }}
        >
          <Image
            src={coverSrc}
            alt={coverAlt || title}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Top Sheet Count Pill if available */}
          {drawingCount && (
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "rgba(0, 0, 0, 0.72)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#FFFFFF",
                fontSize: "11px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              {drawingCount} Sheets
            </div>
          )}
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: "var(--space-5)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                fontSize: "11px",
                color: "var(--color-accent)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.07em",
                marginBottom: "var(--space-1)",
              }}
            >
              {type}
            </span>
            <h3
              style={{
                fontSize: "clamp(18px, 1.6vw, 22px)",
                fontFamily: "var(--font-display), sans-serif",
                fontWeight: 700,
                color: isHovered ? "var(--color-accent)" : "var(--color-text)",
                lineHeight: 1.25,
                margin: 0,
                letterSpacing: "-0.015em",
                transition: "color var(--dur-fast) var(--ease-standard)",
              }}
            >
              {title}
            </h3>
          </div>

          {/* Bottom Card Action */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "var(--space-3)",
              fontSize: "var(--fs-xs)",
              fontWeight: 600,
              color: isHovered ? "var(--color-accent)" : "var(--color-text-muted)",
              transition: "color var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span>Explore Case Study</span>
            <span
              style={{
                display: "inline-block",
                transform: isHovered ? "translateX(4px)" : "none",
                transition: "transform var(--dur-fast) var(--ease-standard)",
              }}
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
