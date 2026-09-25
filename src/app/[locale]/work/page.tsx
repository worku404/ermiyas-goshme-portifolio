import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { HorizontalSpatialWalkthrough } from "@/components/work/HorizontalSpatialWalkthrough";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAm = locale === "am";
  return {
    title: isAm ? "ስራዎች — ኤርሚያስ ጎሽሜ" : "Selected Architecture — Ermiyas Goshme",
    description: isAm
      ? "የተሟሉ 10 የስነ-ህንፃ ስቱዲዮ ፕሮጀክቶች፣ የውድድር ስራዎች እና የቁሳቁስ ምርምር ጥናቶች ማውጫ።"
      : "Complete catalog of 10 architectural studio projects, competition entries, and material research investigations by Ermiyas Goshme.",
  };
}

/**
 * Work catalog page (/work and /[locale]/work).
 *
 * Implements:
 * - Solid architectural canvas (backgroundColor: var(--color-bg)) eliminating background video interference.
 * - Monumental Syne display typography matching Hero, About, and Contact.
 * - Architectural colophon strip with live project counter and academic affiliation.
 * - 3-mode curatorial showcase (Spatial Walkthrough, Archive Grid, Index Table).
 */
export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("workPage");

  return (
    <div
      style={{
        position: "relative",
        zIndex: 10,
        backgroundColor: "var(--color-bg)",
        minHeight: "100vh",
        width: "100%",
        paddingBottom: "var(--space-16)",
      }}
    >
      <Container size="wide">
        {/* Editorial Header Section */}
        <div
          style={{
            paddingTop: "clamp(var(--space-8), 5vw, var(--space-14))",
            paddingBottom: "var(--space-8)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {/* Monumental Syne Title */}
          <h1
            style={{
              fontSize: "clamp(46px, 5.5vw, 76px)",
              fontFamily: "var(--font-display), sans-serif",
              color: "var(--color-text)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 700,
              margin: "0 0 var(--space-3) 0",
            }}
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "var(--fs-base)",
              color: "var(--color-text-muted)",
              maxWidth: "68ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {t("subtitle")}
          </p>
        </div>

        {/* 3-Mode Architectural Showcase */}
        <HorizontalSpatialWalkthrough />
      </Container>
    </div>
  );
}
