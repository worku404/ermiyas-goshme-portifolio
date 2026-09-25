"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import portfolio from "@/../content/portfolio.json";

interface SoftwareItem {
  name: string;
  specialty: string;
  icon: React.ReactNode;
}

const SOFTWARE_ITEMS: SoftwareItem[] = [
  {
    name: "Revit",
    specialty: "BIM & Documentation",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#0696D7" />
        <path d="M6.5 17.5V6.5h6a3.5 3.5 0 0 1 2.47 5.97L17.5 17.5h-3.2l-2.1-5H9.5v5H6.5zm3-7.5h3a1.5 1.5 0 0 0 0-3h-3V10z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: "SketchUp",
    specialty: "3D Massing & Study",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#EA2127" />
        <path d="M12 4.5l6.5 3.75v7.5L12 19.5 5.5 15.75v-7.5L12 4.5z" fill="#B71C1C" />
        <path d="M12 4.5l6.5 3.75-6.5 3.75-6.5-3.75L12 4.5z" fill="#FFFFFF" />
        <path d="M5.5 8.25l6.5 3.75v7.5L5.5 15.75V8.25z" fill="rgba(255,255,255,0.75)" />
        <path d="M18.5 8.25v7.5L12 19.5v-7.5l6.5-3.75z" fill="rgba(255,255,255,0.9)" />
      </svg>
    ),
  },
  {
    name: "D5 Render",
    specialty: "Real-time Visualization",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#1A1816" stroke="rgba(255,107,0,0.4)" strokeWidth="1" />
        <path d="M7 6h5.5a5.5 5.5 0 0 1 5.5 5.5v1a5.5 5.5 0 0 1-5.5 5.5H7V6z" fill="url(#d5-summary-grad)" />
        <path d="M10 9h2.5a2.5 2.5 0 0 1 2.5 2.5v1a2.5 2.5 0 0 1-2.5 2.5H10V9z" fill="#1A1816" />
        <defs>
          <linearGradient id="d5-summary-grad" x1="7" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8A00" />
            <stop offset="1" stopColor="#E55300" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Illustrator",
    specialty: "Architectural Diagrams",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#330000" />
        <path d="M8.2 16.5h-1.5l2.4-7.2h1.7l2.4 7.2h-1.5l-.6-2h-2.4l-.6 2zm1.4-3.3h1.8L10.5 10l-.9 3.2zm6.2-4.6c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm-.6 7.9v-5.6h1.3v5.6h-1.3z" fill="#FF9A00" />
      </svg>
    ),
  },
];

/**
 * AboutSummary Component
 *
 * Full-viewport architectural overview with:
 * - Independent scroll-triggered down-to-top reveal transitions for each element
 * - Editorial link with animated left-to-right underline on hover
 * - Free-flowing curved pills for Core Architectural Focus (no numbers, flowing 1-2 lines)
 * - Responsive auto-fit grid for Architectural Tooling Stack without horizontal overflow
 * - Large Syne display typography for "About" matching owner name
 */
export function AboutSummary() {
  const t = useTranslations("about");
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const yearNumber = portfolio.owner.statusLine.match(/\d+/)?.[0];
  const stageFraction = yearNumber ? `0${yearNumber}/05` : "B.Arch";

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="about-summary-heading"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
        paddingBottom: "clamp(var(--space-8), 6vw, var(--space-16))",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "clamp(var(--space-8), 6vw, var(--space-16))",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Left Column: Heading, Academic Spine, Metrics & Editorial CTA */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
            minWidth: 0,
            maxWidth: "100%",
          }}
        >
          {/* 1. Large Display Title matching owner name styling */}
          <h2
            id="about-summary-heading"
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-1" : ""}`}
            style={{
              fontSize: "clamp(48px, 6vw, 78px)",
              fontFamily: "var(--font-display), sans-serif",
              color: "var(--color-text)",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {t("sectionTitle")}
          </h2>

          {/* 2. Academic Spine Credential Card */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-2" : ""}`}
            style={{
              padding: "var(--space-5) var(--space-6)",
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-md)",
              border: "var(--border-hairline)",
              borderLeft: "3px solid var(--color-accent)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <p style={{ fontWeight: 700, color: "var(--color-text)", margin: 0, fontSize: "var(--fs-base)" }}>
              {portfolio.owner.educationDegree}
            </p>
            <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "var(--fs-sm)", lineHeight: "var(--lh-body)" }}>
              {portfolio.owner.school}
            </p>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-accent)",
                fontWeight: 600,
                margin: 0,
                marginTop: "var(--space-1)",
                letterSpacing: "0.04em",
              }}
            >
              {portfolio.owner.educationYears}
            </p>
          </div>

          {/* 3. Key Metrics Strip */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-3" : ""}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            <div
              style={{
                padding: "var(--space-4) var(--space-3)",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-md)",
                border: "var(--border-hairline)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "var(--fs-xl)",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  marginBottom: "var(--space-1)",
                }}
              >
                {stageFraction}
              </div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", fontWeight: 500 }}>
                {t("metricsYear")}
              </div>
            </div>

            <div
              style={{
                padding: "var(--space-4) var(--space-3)",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-md)",
                border: "var(--border-hairline)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "var(--fs-xl)",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  lineHeight: 1,
                  marginBottom: "var(--space-1)",
                }}
              >
                10+
              </div>
              <div style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", fontWeight: 500 }}>
                {t("metricsProjects")}
              </div>
            </div>
          </div>

          {/* 4. Editorial Link with Left-to-Right Animated Underline */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-4" : ""}`}
            style={{ marginTop: "var(--space-2)" }}
          >
            <Link
              href="/about"
              className="about-editorial-link"
            >
              <span>{t("readMore")}</span>
              <span className="about-link-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Editorial Narrative, Tooling Grid & Focus Pills */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
            maxWidth: "76ch",
            minWidth: 0,
          }}
        >
          {/* 5. Editorial Lead Statement in Syne */}
          <blockquote
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-2" : ""}`}
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(22px, 2.5vw, 29px)",
              color: "var(--color-text)",
              lineHeight: 1.38,
              fontWeight: 700,
              letterSpacing: "-0.015em",
            }}
          >
            &ldquo;I am passionate about creating meaningful spaces that respond to people, culture, and the environment.&rdquo;
          </blockquote>

          {/* 6. Narrative Paragraphs */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-3" : ""}`}
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}
          >
            <p
              style={{
                fontSize: "var(--fs-base)",
                lineHeight: "var(--lh-body)",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              Through academic projects at EiABC and design explorations, I focus on{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                human-centered architecture
              </strong>
              ,{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                contextual understanding
              </strong>
              , and{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                sustainable spatial systems
              </strong>
              .
            </p>

            <p
              style={{
                fontSize: "var(--fs-base)",
                lineHeight: "var(--lh-body)",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              My design methodology combines rigorous site research, conceptual parti development, and digital modeling to transform spatial inquiries into buildable, culturally grounded architecture.
            </p>
          </div>

          {/* 7. Architectural Tooling Stack (Responsive Grid with no horizontal overflow) */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-4" : ""}`}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <div
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)",
              }}
            >
              {t("toolingHeading")}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: "var(--space-3)",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              {SOFTWARE_ITEMS.map((tool) => (
                <div
                  key={tool.name}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-md)",
                    border: "var(--border-hairline)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-3)",
                    minWidth: 0,
                    boxSizing: "border-box",
                    transition: "all var(--dur-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
                    {tool.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: 0, overflow: "hidden" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontWeight: 700,
                        fontSize: "var(--fs-sm)",
                        color: "var(--color-text)",
                        lineHeight: 1.2,
                      }}
                    >
                      {tool.name}
                    </span>
                    <span
                      style={{
                        fontSize: "var(--fs-xs)",
                        color: "var(--color-text-muted)",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        overflowWrap: "break-word",
                      }}
                    >
                      {tool.specialty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Core Architectural Focus (Free-flowing curved pills, no numbers) */}
          <div
            className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-5" : ""}`}
            style={{ width: "100%", maxWidth: "100%" }}
          >
            <div
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)",
              }}
            >
              {t("focusHeading")}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--space-2)",
                maxWidth: "100%",
              }}
            >
              {portfolio.owner.interests.map((interest) => (
                <span
                  key={interest}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--space-2) var(--space-4)",
                    backgroundColor: "var(--color-surface)",
                    borderRadius: "9999px",
                    border: "var(--border-hairline)",
                    fontSize: "var(--fs-xs)",
                    color: "var(--color-text)",
                    fontWeight: 600,
                    letterSpacing: "0.01em",
                    lineHeight: 1.4,
                    transition: "all var(--dur-fast) var(--ease-standard)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
