import * as React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export interface ProjectCardProps {
  slug: string;
  title: string;
  type: string;
  coverSrc: string;
  coverAlt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Architectural project summary card linking directly to /work/[slug].
 *
 * Strict accessibility rules:
 * - Entire card wraps in a single keyboard-focusable link with an accessible name.
 * - Real image loaded with accurate aspect ratio to prevent layout shifts.
 * - Title and project typology strictly verbatim from portfolio.json.
 */
export function ProjectCard({
  slug,
  title,
  type,
  coverSrc,
  coverAlt,
  width = 640,
  height = 480,
  priority = false,
}: ProjectCardProps) {
  return (
    <article
      className="project-card"
      style={{
        borderRadius: "var(--radius-md)",
        border: "var(--border-hairline)",
        backgroundColor: "transparent",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
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
              transition: "transform var(--dur-slow) var(--ease-standard)",
            }}
          />
        </div>

        {/* Card Body */}
        <div
          style={{
            padding: "var(--space-4)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1)",
            flexGrow: 1,
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--color-accent)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {type}
          </span>
          <h3
            style={{
              fontSize: "var(--fs-md)",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              lineHeight: 1.3,
            }}
          >
            {title}
          </h3>
        </div>
      </Link>
    </article>
  );
}
