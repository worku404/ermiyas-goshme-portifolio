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
    title: isAm ? "ስራዎች — ኤርሚያስ ጎሽሜ" : "Work — Ermiyas Goshme",
    description: isAm
      ? "የተሟሉ 10 የስነ-ህንፃ ስቱዲዮ ፕሮጀክቶች፣ የውድድር ስራዎች እና የቁሳቁስ ምርምር ጥናቶች ማውጫ።"
      : "Complete catalog of 10 architectural studio projects, competition entries, and material research investigations by Ermiyas Goshme.",
  };
}

/**
 * Work catalog page (/work and /[locale]/work).
 *
 * Implements Prompt 2 requirements:
 * - Displays all 10 architectural projects with order strictly preserved from portfolio.json.
 * - Semantic header and responsive grid layout.
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
    <Container size="wide">
      <div
        style={{
          paddingTop: "clamp(var(--space-8), 6vw, var(--space-16))",
          paddingBottom: "var(--space-6)",
          borderBottom: "var(--border-hairline)",
        }}
      >
        <div
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
          {t("projectCount", { count: portfolio.projects.length })}
        </div>

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
          }}
        >
          {t("subtitle")}
        </p>
      </div>

      <HorizontalSpatialWalkthrough />
    </Container>
  );
}
