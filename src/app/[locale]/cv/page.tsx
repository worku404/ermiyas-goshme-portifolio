import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ArchitecturalResume } from "@/components/cv/ArchitecturalResume";
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
    : `Official architectural curriculum vitae of ${portfolio.owner.name}, ${portfolio.owner.statusLine} at AAU (EiABC/SBE).`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/images/owner/ermiyas-goshme-hero.jpg",
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
      images: ["/images/owner/ermiyas-goshme-hero.jpg"],
    },
  };
}

/**
 * Curriculum Vitae page (/cv and /[locale]/cv).
 *
 * Implements architectural monograph resume:
 * - Native HTML-first publication-grade resume with fluid mobile responsiveness.
 * - Categorized digital stack, studio timeline, and competition honors.
 * - Clean print-to-PDF support and optional collapsible source document preview.
 */
export default async function CvPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("cvPage");

  const selectedProjects = portfolio.projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    fullTitle: p.fullTitle,
    type: p.type,
  }));

  return (
    <Container size="default">
      <div
        style={{
          paddingTop: "clamp(var(--space-3), 2vw, var(--space-6))",
          paddingBottom: "clamp(var(--space-10), 8vw, var(--space-20))",
        }}
      >
        <ArchitecturalResume
          owner={{
            ...portfolio.owner,
            about: portfolio.about,
          }}
          projects={selectedProjects}
          locale={locale}
          downloadLabel={t("downloadCta")}
        />
      </div>
    </Container>
  );
}
