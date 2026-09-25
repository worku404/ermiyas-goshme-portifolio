"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import portfolio from "@/../content/portfolio.json";

/**
 * SiteFooter Component
 *
 * Editorial Architectural Footer:
 * - Solid architectural background (var(--color-bg)) eliminating awkward image blur clashes.
 * - Syne display signature matching owner identity across Hero, About, and Contact.
 * - 4-column architectural colophon: Identity & Live Location, Quick Navigation, Platforms & Socials, Studio Stage.
 * - Left-to-right animated underline interactions on navigation links (.footer-link).
 * - Diagonal directional arrow micro-interactions on external platform links.
 * - Bottom utility bar with copyright, locale switcher, theme toggle, and smooth "Back to Top" trigger.
 */
export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        paddingTop: "clamp(var(--space-12), 7vw, var(--space-16))",
        paddingBottom: "clamp(var(--space-8), 4vw, var(--space-12))",
        marginTop: "var(--space-12)",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      <div
        style={{
          maxWidth: "var(--bp-2xl)",
          margin: "0 auto",
          padding: "0 clamp(var(--space-4), 4vw, var(--space-8))",
          boxSizing: "border-box",
        }}
      >
        {/* Top 4-Column Architectural Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: "clamp(var(--space-8), 5vw, var(--space-12))",
            alignItems: "start",
          }}
        >
          {/* Column 1: Identity & Live Location */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(22px, 2vw, 26px)",
                fontWeight: 700,
                color: "var(--color-text)",
                letterSpacing: "-0.025em",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {portfolio.owner.name}
            </h2>

            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {t("role")}
            </p>

            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                margin: 0,
                opacity: 0.85,
              }}
            >
              {t("school")}
            </p>

            {/* Live Location / Timezone Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "var(--space-2)",
                padding: "4px 10px",
                borderRadius: "9999px",
                backgroundColor: "var(--color-surface)",
                border: "var(--border-hairline)",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  boxShadow: "0 0 6px var(--color-accent)",
                  display: "inline-block",
                }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.02em",
                }}
              >
                {t("location")}
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-4)",
                marginTop: 0,
              }}
            >
              {t("quickLinks")}
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <li>
                <Link href="/" className="footer-link">
                  <span>{tNav("home")}</span>
                </Link>
              </li>
              <li>
                <Link href="/work" className="footer-link">
                  <span>{tNav("work")}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  <span>{tNav("about")}</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  <span>{tNav("contact")}</span>
                </Link>
              </li>
              <li>
                <Link href="/cv" className="footer-link">
                  <span>{tNav("cv")}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platforms & Social Channels */}
          <div>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-4)",
                marginTop: 0,
              }}
            >
              {t("platforms")}
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              }}
            >
              <li>
                <a
                  href="https://t.me/ermidart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span>Telegram</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ermiyas-goshme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span>LinkedIn</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ermiyas_goshme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span>X (Twitter)</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${portfolio.owner.email}`}
                  className="footer-link"
                >
                  <span>Email</span>
                  <span className="footer-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio Stage & Academic Focus */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <h3
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-1)",
                marginTop: 0,
              }}
            >
              {t("studioHeading")}
            </h3>

            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {portfolio.owner.statusLine}
            </p>

            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {t("availability")}
            </p>

            {/* Focus Tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "var(--space-2)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-surface)",
                  border: "var(--border-hairline)",
                  color: "var(--color-text-muted)",
                }}
              >
                Human-Centered
              </span>
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-surface)",
                  border: "var(--border-hairline)",
                  color: "var(--color-text-muted)",
                }}
              >
                Sustainable Systems
              </span>
              <span
                style={{
                  fontSize: "11px",
                  padding: "3px 8px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--color-surface)",
                  border: "var(--border-hairline)",
                  color: "var(--color-text-muted)",
                }}
              >
                Digital BIM
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar / Utility Row */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "var(--space-6)",
            marginTop: "clamp(var(--space-8), 5vw, var(--space-12))",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          {/* Copyright notice */}
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            © {currentYear} {portfolio.owner.name}. {t("allRightsReserved")}
          </p>

          {/* Right utility cluster: Locale, Theme, and Back to Top */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
              <LocaleSwitcher />
              <ThemeToggle />
            </div>

            <button
              type="button"
              onClick={handleBackToTop}
              className="footer-back-to-top"
              aria-label="Scroll back to top of page"
            >
              <span aria-hidden="true">↑</span>
              <span>{t("backToTop")}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
