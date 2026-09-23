import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactDirect } from "@/components/contact/ContactDirect";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAm = locale === "am";

  const title = isAm
    ? `አግኙኝ — ${portfolio.owner.name}`
    : `Contact — ${portfolio.owner.name}`;

  const description = isAm
    ? "ለአካዳሚክ ውይይት፣ ለስራ ልምምድ ወይም ለጋራ የስነ-ህንፃ ስራዎች መልዕክት ይላኩ።"
    : "Get in touch with Ermiyas Goshme for academic inquiries, professional internships, and architectural collaborations.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/images/owner/profile.png",
          width: 800,
          height: 800,
          alt: `${portfolio.owner.name} — Contact`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/owner/profile.png"],
    },
  };
}

/**
 * Contact page (/contact and /[locale]/contact).
 *
 * Implements Prompt 3 requirements:
 * - Two-column responsive layout: direct contact (phone, obfuscated email) and Web3Forms submission.
 * - WCAG 2.1 AA accessible validation and states.
 */
export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("contactPage");

  return (
    <Container size="default">
      <div
        style={{
          paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
          paddingBottom: "clamp(var(--space-10), 8vw, var(--space-20))",
        }}
      >
        {/* Page Header */}
        <div style={{ marginBottom: "clamp(var(--space-8), 6vw, var(--space-12))" }}>
          <span
            style={{
              display: "inline-block",
              padding: "var(--space-1) var(--space-3)",
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-accent)",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("title")}
          </span>
          <h1
            style={{
              fontSize: "clamp(var(--fs-2xl), 5vw, var(--fs-4xl))",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              lineHeight: "var(--lh-heading)",
              letterSpacing: "-0.02em",
              marginBottom: "var(--space-3)",
            }}
          >
            {t("title")}
          </h1>
          <p
            style={{
              fontSize: "var(--fs-base)",
              color: "var(--color-text-muted)",
              maxWidth: "60ch",
              lineHeight: "var(--lh-body)",
              margin: 0,
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
            gap: "clamp(var(--space-8), 6vw, var(--space-16))",
            alignItems: "start",
          }}
        >
          {/* Column 1: Direct Contact Methods */}
          <ContactDirect />

          {/* Column 2: Interactive Contact Form */}
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
