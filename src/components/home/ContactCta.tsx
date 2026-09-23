import * as React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SocialLinks } from "@/components/contact/SocialLinks";
import portfolio from "@/../content/portfolio.json";

/**
 * Contact CTA section on the Home page.
 *
 * Prompts recruiters, academics, and collaborators to initiate contact.
 * Links to /contact for Web3Forms messaging while providing direct phone/email links.
 */
export function ContactCta() {
  const t = useTranslations("contactCta");

  return (
    <section
      aria-labelledby="contact-cta-heading"
      style={{
        paddingTop: "clamp(var(--space-12), 8vw, var(--space-20))",
        paddingBottom: "clamp(var(--space-12), 8vw, var(--space-20))",
        backgroundColor: "transparent",
        borderRadius: "var(--radius-lg)",
        border: "var(--border-hairline)",
        marginTop: "var(--space-12)",
        marginBottom: "var(--space-12)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "60ch",
          margin: "0 auto",
          padding: "0 var(--space-4)",
        }}
      >
        <h2
          id="contact-cta-heading"
          style={{
            fontSize: "clamp(var(--fs-xl), 4vw, var(--fs-3xl))",
            fontFamily: "var(--font-display), serif",
            color: "var(--color-text)",
            marginBottom: "var(--space-3)",
          }}
        >
          {t("sectionTitle")}
        </h2>

        <p
          style={{
            fontSize: "var(--fs-base)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--lh-body)",
            marginBottom: "var(--space-8)",
          }}
        >
          {t("description")}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "var(--space-3)",
            alignItems: "center",
            marginBottom: "var(--space-6)",
          }}
        >
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--space-3) var(--space-8)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-on-accent)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 600,
              fontSize: "var(--fs-base)",
              textDecoration: "none",
              transition:
                "background-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
            }}
          >
            {t("button")}
          </Link>

          <a
            href={portfolio.owner.phoneTelHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-5)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 500,
              fontSize: "var(--fs-sm)",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>{portfolio.owner.phone}</span>
          </a>

          <a
            href={`mailto:${portfolio.owner.email}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "var(--space-3) var(--space-5)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              fontWeight: 500,
              fontSize: "var(--fs-sm)",
              textDecoration: "none",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>{portfolio.owner.email}</span>
          </a>
        </div>

        {/* Social media direct links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "var(--space-3)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "var(--fs-xs)",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            Connect on:
          </span>
          <SocialLinks variant="compact" showSocialsOnly={true} />
        </div>
      </div>
    </section>
  );
}
