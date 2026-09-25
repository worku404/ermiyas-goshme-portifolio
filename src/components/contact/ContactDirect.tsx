"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/contact/SocialLinks";
import portfolio from "@/../content/portfolio.json";

/**
 * Direct Contact & Social Channels Showcase
 *
 * Implements user requirements:
 * - Prominent interactive action buttons for Phone and Email (replacing passive text).
 * - Social media section including X, Telegram, and LinkedIn.
 * - Architectural studio location and affiliation badge.
 */
export function ContactDirect() {
  const t = useTranslations("contactPage");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-6)",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "var(--fs-xl)",
            fontFamily: "var(--font-display), serif",
            color: "var(--color-text)",
            marginBottom: "var(--space-2)",
          }}
        >
          {t("directHeading")}
        </h2>
        <p
          style={{
            fontSize: "var(--fs-sm)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--lh-body)",
            margin: 0,
          }}
        >
          {t("directSubtitle")}
        </p>
      </div>

      {/* Prominent Action Buttons for Phone, Email, Telegram, LinkedIn, X */}
      <SocialLinks variant="buttons" />

      {/* Studio Location & University Affiliation Card */}
      <div
        style={{
          padding: "var(--space-4) var(--space-5)",
          backgroundColor: "var(--color-surface)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "var(--border-hairline)",
          borderRadius: "var(--radius-md, 12px)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 21h18M5 21V7l8-4 8 4v14M9 10a2 2 0 0 1 4 0v11" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              Academic Studio & Location
            </span>
            <span style={{ fontSize: "var(--fs-sm)", fontWeight: 600, color: "var(--color-text)" }}>
              {portfolio.owner.school}
            </span>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              Addis Ababa, Ethiopia · {portfolio.owner.educationYears}
            </span>
          </div>
        </div>

        {/* Local Working Timezone Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "9999px",
            backgroundColor: "var(--color-surface-2)",
            border: "var(--border-hairline)",
            fontSize: "11px",
            fontFamily: "var(--font-mono, monospace)",
            color: "var(--color-accent)",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-accent)" }} />
          <span>UTC+3 · Addis Ababa</span>
        </div>
      </div>
    </div>
  );
}
