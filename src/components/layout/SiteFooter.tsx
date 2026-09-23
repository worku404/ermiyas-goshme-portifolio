"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { SocialLinks } from "@/components/contact/SocialLinks";
import portfolio from "@/../content/portfolio.json";



/**
 * Global site footer providing architectural attribution, secondary navigation,
 * and contact links.
 *
 * Acceptance criteria (docs/00-brief.md & docs/04-component-inventory.md):
 * - Semantic <footer> landmark.
 * - Phone rendered as an operable tel: link.
 * - Email obfuscated against scrapers.
 * - All interactive elements keyboard focusable.
 */
export function SiteFooter() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "var(--border-hairline)",
        paddingTop: "var(--space-12)",
        paddingBottom: "var(--space-12)",
        marginTop: "var(--space-16)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--bp-xl)",
          margin: "0 auto",
          padding: "0 clamp(var(--space-4), 4vw, var(--space-8))",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "var(--space-8)",
        }}
      >
        {/* Column 1: Identity & School */}
        <div>
          <h2
            style={{
              fontSize: "var(--fs-md)",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              marginBottom: "var(--space-2)",
            }}
          >
            {portfolio.owner.name}
          </h2>
          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
            }}
          >
            {t("role")} — {portfolio.owner.statusLine}
          </p>
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--color-text-muted)",
              marginTop: "var(--space-1)",
            }}
          >
            {t("school")}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3
            style={{
              fontSize: "var(--fs-sm)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-text-muted)",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("quickLinks")}
          </h3>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <li>
              <Link
                href="/"
                style={{ color: "var(--color-text)", fontSize: "var(--fs-sm)" }}
              >
                {tNav("home")}
              </Link>
            </li>
            <li>
              <Link
                href="/work"
                style={{ color: "var(--color-text)", fontSize: "var(--fs-sm)" }}
              >
                {tNav("work")}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                style={{ color: "var(--color-text)", fontSize: "var(--fs-sm)" }}
              >
                {tNav("about")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                style={{ color: "var(--color-text)", fontSize: "var(--fs-sm)" }}
              >
                {tNav("contact")}
              </Link>
            </li>
            <li>
              <Link
                href="/cv"
                style={{ color: "var(--color-text)", fontSize: "var(--fs-sm)" }}
              >
                {tNav("cv")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Direct Contact & Social Media */}
        <div>
          <h3
            style={{
              fontSize: "var(--fs-sm)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--color-text-muted)",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("contact")} & Socials
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <SocialLinks variant="pills" />
          </div>
        </div>

        {/* Column 4: Controls & Copyright */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              alignItems: "center",
            }}
          >
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
          <p
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--color-text-muted)",
              marginTop: "auto",
            }}
          >
            © {currentYear} {portfolio.owner.name}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
}
