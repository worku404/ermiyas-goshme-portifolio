import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { AboutSection } from "@/components/about/AboutSection";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAm = locale === "am";

  const title = isAm
    ? `ስለ እኔ — ${portfolio.owner.name}`
    : `About — ${portfolio.owner.name}`;

  const description = portfolio.about.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      images: [
        {
          url: "/images/owner/profile.png",
          width: 800,
          height: 800,
          alt: `${portfolio.owner.name} — ${portfolio.owner.role}`,
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
 * About page (/about and /[locale]/about).
 *
 * Implements Prompt 3 requirements:
 * - Full AboutSection with verbatim biography, education, software tools,
 *   architectural interests, and spoken languages.
 * - Profile portrait display with zero CLS.
 */
export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container size="default">
      <AboutSection variant="full" />
    </Container>
  );
}
