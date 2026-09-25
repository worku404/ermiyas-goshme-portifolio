import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Hero } from "@/components/home/Hero";
import { AboutSummary } from "@/components/home/AboutSummary";
import { KineticProjectReel } from "@/components/home/KineticProjectReel";
import { ContactCta } from "@/components/home/ContactCta";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAm = locale === "am";

  const title = isAm
    ? `${portfolio.owner.name} — የስነ-ህንፃ ፖርትፎሊዮ`
    : `${portfolio.owner.name} — Architecture Portfolio`;

  const description = isAm
    ? `${portfolio.owner.name} — የስነ-ህንፃ ተማሪ በአዲስ አበባ ዩኒቨርሲቲ (EiABC/SBE)።`
    : `Official architecture portfolio of ${portfolio.owner.name}, ${portfolio.owner.statusLine} at ${portfolio.owner.school}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        am: "/am/",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/images/work/ethiopian-orthodox-church-design/ethiopian-orthodox-church-design-01.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

/**
 * Home page component (/ and /[locale]/).
 *
 * Implements Prompt 1 structure per docs/03-information-architecture.md §4:
 * 1. Hero: name, status line, primary CTAs ("View Work" + "Download CV"), LCP project render.
 * 2. AboutSummary: verbatim bio from portfolio.json, credentials, link to /about.
 * 3. Featured Work: ProjectGrid with limit={4} curated projects, link to /work.
 * 4. Contact CTA: invitation and direct contact affordances.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Container size="wide">
        <AboutSummary />
        <KineticProjectReel />
        <ContactCta />
      </Container>
    </>
  );
}
