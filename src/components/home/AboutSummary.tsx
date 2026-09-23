"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import portfolio from "@/../content/portfolio.json";

/**
 * AboutSummary Component (Option 1: Modern Editorial Architecture Monograph)
 *
 * Implements user requirements:
 * - Separates the owner's biography sentences into distinct, breathable paragraphs (as in the PDF).
 * - Prominent editorial lead statement for Sentence 1.
 * - Architectural keyword emphasis on competencies, design process, and digital tools.
 * - Sophisticated architectural palette (paper ivory, muted taupe, Aksumite terracotta).
 * - No dead code, single source of truth from portfolio.json.
 */
export function AboutSummary() {
  const t = useTranslations("about");

  return (
    <section
      aria-labelledby="about-summary-heading"
      style={{
        paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
        paddingBottom: "clamp(var(--space-8), 6vw, var(--space-16))",
        borderBottom: "var(--border-hairline)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(var(--space-6), 5vw, var(--space-12))",
          alignItems: "start",
        }}
      >
        {/* Left Column: Heading, Academic Badges & Credentials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
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
              <span>{portfolio.owner.statusLine}</span>
            </div>

            <h2
              id="about-summary-heading"
              style={{
                fontSize: "clamp(var(--fs-2xl), 4vw, var(--fs-4xl))",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {t("sectionTitle")}
            </h2>
          </div>

          {/* Academic Spine Credential Block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              color: "var(--color-text-muted)",
              fontSize: "var(--fs-sm)",
              borderLeft: "2px solid var(--color-accent)",
              paddingLeft: "var(--space-4)",
              marginTop: "var(--space-2)",
            }}
          >
            <p style={{ fontWeight: 700, color: "var(--color-text)", margin: 0, fontSize: "15px" }}>
              {portfolio.owner.educationDegree}
            </p>
            <p style={{ margin: 0, color: "var(--color-text-muted)", lineHeight: 1.4 }}>
              {portfolio.owner.school}
            </p>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                fontFamily: "var(--font-mono, monospace)",
                color: "var(--color-accent)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {portfolio.owner.educationYears}
            </p>
          </div>

          <div style={{ marginTop: "var(--space-2)" }}>
            <Link
              href="/about"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--color-accent)",
                fontWeight: 600,
                fontSize: "var(--fs-sm)",
                textDecoration: "none",
                transition: "color var(--dur-fast) var(--ease-standard)",
              }}
            >
              <span>{t("readMore")}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Modern Editorial Monograph Layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
            maxWidth: "72ch",
          }}
        >
          {/* Sentence 1: Prominent Editorial Lead */}
          <div
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: "clamp(19px, 2.2vw, 24px)",
              color: "var(--color-text)",
              lineHeight: 1.45,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              borderBottom: "var(--border-hairline)",
              paddingBottom: "var(--space-4)",
              marginBottom: "var(--space-1)",
            }}
          >
            I am a 3rd year architecture student passionate about creating meaningful spaces that respond to people, culture, and the environment.
          </div>

          {/* Sentence 2: Design Philosophy & Context */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            Through academic projects and design explorations, I focus on{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
              human-centered architecture
            </strong>
            ,{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
              contextual understanding
            </strong>
            , and{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
              sustainable design approaches
            </strong>
            .
          </p>

          {/* Sentence 3: Methodology & Digital Process */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            My design process combines{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
              research, conceptual thinking, digital modeling
            </strong>
            , and{" "}
            <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
              architectural representation
            </strong>{" "}
            to transform ideas into functional and engaging spaces.
          </p>

          {/* Sentence 4: Technical Competencies & Software Tools */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text-muted)",
              margin: 0,
            }}
          >
            I have developed skills in architectural visualization, 3D modeling, and technical documentation using{" "}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                color: "var(--color-accent)",
                backgroundColor: "rgba(168, 83, 42, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                border: "1px solid rgba(168, 83, 42, 0.25)",
                fontSize: "14px",
              }}
            >
              Revit
            </span>
            ,{" "}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                color: "var(--color-accent)",
                backgroundColor: "rgba(168, 83, 42, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                border: "1px solid rgba(168, 83, 42, 0.25)",
                fontSize: "14px",
              }}
            >
              SketchUp
            </span>
            ,{" "}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                color: "var(--color-accent)",
                backgroundColor: "rgba(168, 83, 42, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                border: "1px solid rgba(168, 83, 42, 0.25)",
                fontSize: "14px",
              }}
            >
              Illustrator
            </span>{" "}
            and{" "}
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 600,
                color: "var(--color-accent)",
                backgroundColor: "rgba(168, 83, 42, 0.12)",
                padding: "2px 7px",
                borderRadius: "4px",
                border: "1px solid rgba(168, 83, 42, 0.25)",
                fontSize: "14px",
              }}
            >
              D5 Render
            </span>
            .
          </p>

          {/* Sentence 5: Professional Objective & Aspiration */}
          <p
            style={{
              fontSize: "16px",
              lineHeight: 1.75,
              color: "var(--color-text)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            I am eager to learn from professional practice and contribute creative and thoughtful design solutions to real world challenges.
          </p>
        </div>
      </div>
    </section>
  );
}
