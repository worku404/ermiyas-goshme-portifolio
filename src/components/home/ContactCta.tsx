"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import portfolio from "@/../content/portfolio.json";

/**
 * ContactCta ("Let's Connect") Component
 *
 * Full-viewport architectural contact centerpiece with:
 * - 100dvh full window coverage, boundless layout with zero outer border line
 * - Top header row with "Let's Connect" title on the left and [Full Contact Page →] on the right in equal line
 * - Left Column: One-line Phone and Email links with accent terracotta SVG icons, copy actions, and left-to-right animated hover underlines (hidden on mobile)
 * - Right Column: Compact, streamlined underline-only Web3Forms submission form
 * - Staggered scroll-triggered reveal transitions
 */
export function ContactCta() {
  const t = useTranslations("contactCta");
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [copiedField, setCopiedField] = React.useState<"phone" | "email" | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopy = (text: string, field: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-cta-heading"
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        paddingTop: "clamp(var(--space-4), 3vw, var(--space-8))",
        paddingBottom: "clamp(var(--space-8), 5vw, var(--space-12))",
      }}
    >
      {/* Split Two-Column Grid mirroring AboutSummary architecture */}
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
          gap: "clamp(var(--space-6), 4.5vw, var(--space-10))",
          alignItems: "flex-start",
          boxSizing: "border-box",
        }}
      >
        {/* Left Column: Heading, Subtitle, Direct Links & Editorial CTA below them */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
            minWidth: 0,
            maxWidth: "540px",
            paddingTop: "clamp(10px, 1.2vw, 18px)",
            
          }}
        >
          {/* 1. Large Display Title & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            <h2
              id="contact-cta-heading"
              className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-1" : ""}`}
              style={{
                fontSize: "clamp(48px, 6vw, 78px)",
                fontFamily: "var(--font-display), sans-serif",
                color: "var(--color-text)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                margin: 0,
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
                maxWidth: "48ch",
              }}
            >
              {t("description")}
            </p>
          </div>

          {/* 2. Direct Contact Links: Phone and Email in One Line each with accent icon and copy */}
          <div
            className={`contact-cta-desktop-links scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-3" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            }}
          >
            {/* Phone */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a
                href={portfolio.owner.phoneTelHref}
                className="editorial-link"
                style={{
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  fontFamily: "var(--font-mono, monospace)",
                  letterSpacing: "0.02em",
                }}
              >
                <span>{portfolio.owner.phone}</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(portfolio.owner.phone, "phone")}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  borderRadius: "9999px",
                  padding: "2px 9px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: copiedField === "phone" ? "var(--color-accent)" : "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "all var(--dur-fast) var(--ease-standard)",
                }}
              >
                {copiedField === "phone" ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Email */}
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <a
                href={`mailto:${portfolio.owner.email}`}
                className="editorial-link"
                style={{
                  fontSize: "clamp(15px, 1.3vw, 18px)",
                  wordBreak: "break-all",
                }}
              >
                <span>{portfolio.owner.email}</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy(portfolio.owner.email, "email")}
                style={{
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  borderRadius: "9999px",
                  padding: "2px 9px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: copiedField === "email" ? "var(--color-accent)" : "var(--color-text-muted)",
                  cursor: "pointer",
                  transition: "all var(--dur-fast) var(--ease-standard)",
                }}
              >
                {copiedField === "email" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* 3. Editorial CTA Link: Placed BELLOW the phone and email links (mirroring About section) */}
          <div
            className={`contact-cta-desktop-links scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-4" : ""}`}
            style={{ marginTop: "var(--space-2)" }}
          >
            <Link href="/contact" className="editorial-link">
              <span>{t("fullContactPage")}</span>
              <span className="editorial-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Web3Forms Submission Form with constrained line width and generous height */}
        <div
          className={`scroll-reveal ${isVisible ? "is-visible scroll-reveal-delay-2" : ""}`}
          style={{
            width: "100%",
            maxWidth: "460px",
            justifySelf: "start",
          }}
        >
          <ContactForm embedded={true} />
        </div>
      </div>
    </section>
  );
}
