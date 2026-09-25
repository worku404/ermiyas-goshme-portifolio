import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";
import { Container } from "@/components/layout/Container";
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
  const heroImageSrc = "/images/owner/ermiyas-goshme-hero.webp";

  return (
    <section
      aria-label="Introduction"
      style={{
        width: "100%",
        minHeight: "calc(100dvh - clamp(64px, 8vw, 88px))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "var(--space-4)",
        paddingBottom: "var(--space-8)",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Hero Content aligned to layout Container */}
      <Container size="wide" style={{ position: "relative", zIndex: 10 }}>
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
              padding: "6px 14px",
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-text-muted)",
              borderRadius: "var(--radius-sm)",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-4)",
              border: "var(--border-hairline)",
            }}
          >
            {portfolio.owner.school}
          </div>

          <h1
            style={{
              fontSize: "clamp(48px, 6vw, 78px)",
              lineHeight: 1.05,
              fontFamily: "var(--font-display), sans-serif",
              color: "var(--color-text)",
              marginBottom: "var(--space-4)",
              letterSpacing: "-0.03em",
              fontWeight: 700,
            }}
          >
            {portfolio.owner.name}
          </h1>

          <p
            style={{
              fontSize: "clamp(20px, 2.3vw, 26px)",
              color: "var(--color-accent)",
              fontWeight: 600,
              marginBottom: "var(--space-4)",
              letterSpacing: "-0.01em",
            }}
          >
            {portfolio.owner.statusLine}
          </p>

          <p
            style={{
              fontSize: "clamp(16px, 1.2vw, 19px)",
              color: "var(--color-text-muted)",
              lineHeight: 1.68,
              maxWidth: "52ch",
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
              gap: "var(--space-4)",
              alignItems: "center",
            }}
          >
            <Link
              href="/work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 32px",
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                fontSize: "16px",
                textDecoration: "none",
                transition:
                  "background-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
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
            aspectRatio: "1 / 1",
            maxHeight: "min(640px, 68vh)",
            width: "100%",
          }}
        >
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/images/owner/ermiyas-goshme-hero-480.webp"
              type="image/webp"
            />
            <source
              srcSet="/images/owner/ermiyas-goshme-hero.webp"
              type="image/webp"
            />
            <img
              src="/images/owner/ermiyas-goshme-hero.webp"
              alt={`${portfolio.owner.name} — ${portfolio.owner.statusLine} at ${portfolio.owner.school}`}
              fetchPriority="high"
              width={800}
              height={800}
              decoding="async"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 22%",
                display: "block",
              }}
            />
          </picture>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "var(--space-3) var(--space-5)",
              color: "#FFFFFF",
              fontSize: "13px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              letterSpacing: "0.02em",
            }}
          >
            <span style={{ fontWeight: 600 }}>{portfolio.owner.name}</span>
            <span style={{ opacity: 0.85 }}>{portfolio.owner.statusLine}</span>
          </div>
        </div>
      </div>
    </Container>
  </section>
);
}
