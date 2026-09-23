import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAm = locale === "am";

  const title = isAm
    ? `ሲቪ — ${portfolio.owner.name}`
    : `Curriculum Vitae — ${portfolio.owner.name}`;

  const description = isAm
    ? "የኤርሚያስ ጎሽሜ የትምህርት ታሪክ፣ የሶፍትዌር ክህሎቶች እና የስነ-ህንፃ ስራዎች ማጠቃለያ ሲቪ ሰነድ።"
    : "Official curriculum vitae of Ermiyas Goshme, 3rd-year architecture student at AAU (EiABC/SBE).";

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
          alt: `${portfolio.owner.name} — CV`,
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
 * Curriculum Vitae page (/cv and /[locale]/cv).
 *
 * Implements Prompt 3 requirements:
 * - Direct download affordance with CVDownloadButton pointing to /cv/Ermiyas-Goshme-CV.pdf.
 * - Concise summary of academic education, software proficiencies, and architectural focus.
 * - Interactive embedded PDF viewer with fallback download affordance.
 */
export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cvPage");

  return (
    <Container size="default">
      <div
        style={{
          paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
          paddingBottom: "clamp(var(--space-10), 8vw, var(--space-20))",
        }}
      >
        {/* Header Block with Primary Download CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--space-6)",
            paddingBottom: "var(--space-8)",
            borderBottom: "var(--border-hairline)",
            marginBottom: "var(--space-8)",
          }}
        >
          <div>
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
              Curriculum Vitae
            </span>
            <h1
              style={{
                fontSize: "clamp(var(--fs-2xl), 5vw, var(--fs-4xl))",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                lineHeight: "var(--lh-heading)",
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-2)",
              }}
            >
              {portfolio.owner.name}
            </h1>
            <p
              style={{
                fontSize: "var(--fs-md)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--lh-body)",
                maxWidth: "60ch",
                margin: 0,
              }}
            >
              {portfolio.owner.statusLine} • {portfolio.owner.school}
            </p>
          </div>

          <div>
            <CVDownloadButton variant="primary" label={t("downloadCta")} />
          </div>
        </div>

        {/* CV Summary Highlights Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: "var(--space-4)",
            marginBottom: "var(--space-10)",
          }}
        >
          {/* Education Highlight */}
          <div
            style={{
              padding: "var(--space-5)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-accent)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {t("education")}
            </span>
            <strong style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)" }}>
              {portfolio.owner.educationDegree}
            </strong>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              {portfolio.owner.school} ({portfolio.owner.educationYears})
            </span>
          </div>

          {/* Software Proficiency Highlight */}
          <div
            style={{
              padding: "var(--space-5)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-accent)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {t("skills")}
            </span>
            <strong style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)" }}>
              {portfolio.owner.software.join(" • ")}
            </strong>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              3D Modeling, BIM & Architectural Rendering
            </span>
          </div>

          {/* Languages Highlight */}
          <div
            style={{
              padding: "var(--space-5)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-1)",
            }}
          >
            <span
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-accent)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {t("languages")}
            </span>
            <strong style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)" }}>
              {portfolio.owner.languages.join(" & ")}
            </strong>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              Bilingual Fluency
            </span>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <section aria-labelledby="cv-preview-heading">
          <div style={{ marginBottom: "var(--space-4)" }}>
            <h2
              id="cv-preview-heading"
              style={{
                fontSize: "var(--fs-xl)",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                marginBottom: "var(--space-1)",
              }}
            >
              {t("previewHeading")}
            </h2>
            <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", margin: 0 }}>
              {t("previewNotice")}
            </p>
          </div>

          <div
            style={{
              width: "100%",
              height: "clamp(600px, 80vh, 960px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              backgroundColor: "var(--color-surface-2)",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            }}
          >
            <object
              data="/cv/Ermiyas-Goshme-CV.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            >
              <div
                style={{
                  padding: "var(--space-12) var(--space-6)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-4)",
                }}
              >
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                  Your browser does not support inline PDF viewing. Please download the document directly:
                </p>
                <CVDownloadButton variant="primary" label={t("downloadCta")} />
              </div>
            </object>
          </div>
        </section>
      </div>
    </Container>
  );
}
