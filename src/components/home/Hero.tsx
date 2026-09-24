import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";
import portfolio from "@/../content/portfolio.json";

/**
 * Home Hero section.
 *
 * Core acceptance criteria:
 * - Exactly one <h1> element on the page for SEO hierarchy.
 * - Sourced verbatim from portfolio.json (owner.name, owner.statusLine, owner.school).
 * - The hero image is the Largest Contentful Paint (LCP) element:
 *   Uses next/image with priority={true}, explicit width/height to eliminate CLS,
 *   and responsive sizes preventing overfetching.
 */
export function Hero() {
  const t = useTranslations("hero");
  const heroImageSrc = "/images/owner/ermiyas-goshme-hero.jpg";

  return (
    <section
      aria-label="Introduction"
      style={{
        minHeight: "calc(100dvh - clamp(64px, 8vw, 88px))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-8)",
        borderBottom: "var(--border-hairline)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
          gap: "clamp(var(--space-6), 6vw, var(--space-16))",
          alignItems: "center",
        }}
      >
        {/* Left Column: Heading & CTAs */}
        <div>
          <div
            style={{
              display: "inline-block",
              padding: "var(--space-1) var(--space-3)",
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-text-muted)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-xs)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "var(--space-4)",
            }}
          >
            {portfolio.owner.school}
          </div>

          <h1
            style={{
              fontSize: "clamp(var(--fs-2xl), 5vw, var(--fs-4xl))",
              lineHeight: "var(--lh-heading)",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              marginBottom: "var(--space-3)",
              letterSpacing: "-0.02em",
            }}
          >
            {portfolio.owner.name}
          </h1>

          <p
            style={{
              fontSize: "clamp(var(--fs-md), 2.5vw, var(--fs-lg))",
              color: "var(--color-accent)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            {portfolio.owner.statusLine}
          </p>

          <p
            style={{
              fontSize: "var(--fs-base)",
              color: "var(--color-text-muted)",
              lineHeight: "var(--lh-body)",
              maxWidth: "50ch",
              marginBottom: "var(--space-8)",
            }}
          >
            Crafting architectural proposals that bridge Ethiopian cultural
            identity, contextual rigor, and sustainable spatial systems.
          </p>

          {/* Primary CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              alignItems: "center",
            }}
          >
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-3) var(--space-6)",
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "var(--fs-base)",
                textDecoration: "none",
                transition:
                  "background-color var(--dur-fast) var(--ease-standard)",
              }}
            >
              {t("viewWork")}
            </Link>

            <CVDownloadButton variant="primary" label={t("downloadCv")} />
          </div>
        </div>

        {/* Right Column: LCP Hero Project Image */}
        <div
          style={{
            position: "relative",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
            border: "var(--border-hairline)",
            backgroundColor: "var(--color-surface-2)",
            boxShadow: "var(--shadow-md)",
            aspectRatio: "4 / 3",
          }}
        >
          <Image
            src={heroImageSrc}
            alt={`${portfolio.owner.name} — ${portfolio.owner.statusLine} at ${portfolio.owner.school}`}
            priority={true}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
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
              left: 0,
              right: 0,
              padding: "var(--space-2) var(--space-4)",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
              color: "#FFFFFF",
              fontSize: "var(--fs-xs)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontWeight: 600 }}>{portfolio.owner.name}</span>
            <span>{portfolio.owner.statusLine}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
