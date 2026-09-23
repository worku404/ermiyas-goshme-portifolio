import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { ProjectDetail } from "@/components/work/ProjectDetail";
import { routing } from "@/i18n/routing";
import portfolio from "@/../content/portfolio.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) return {};

  const isAm = locale === "am";
  const title = `${project.fullTitle} — ${isAm ? "ኤርሚያስ ጎሽሜ" : "Ermiyas Goshme"}`;
  const description = project.description.slice(0, 160);
  const heroImage =
    project.images.find((img) => img.isHero)?.src || project.images[0].src;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/work/${slug}/`,
      languages: {
        en: `/en/work/${slug}/`,
        am: `/am/work/${slug}/`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 800,
          alt: `${project.fullTitle} — ${project.type}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [heroImage],
    },
  };
}

/**
 * Pre-generate static parameters for all 10 project slugs across all locales.
 *
 * Required for static export (output: 'export') to emit individual static HTML
 * files (/en/work/<slug>/index.html, /am/work/<slug>/index.html).
 */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    portfolio.projects.map((project) => ({
      locale,
      slug: project.slug,
    }))
  );
}

/**
 * Project Detail page (/work/[slug] and /[locale]/work/[slug]).
 *
 * Implements Prompt 2 requirements:
 * - Authoritative content straight from portfolio.json.
 * - Sequential prev/next navigation preserving portfolio order.
 * - Composes Breadcrumbs, ProjectDetail, ImageGallery, Lightbox, and NeedsReviewBanner.
 */
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const currentIndex = portfolio.projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    notFound();
  }

  const project = portfolio.projects[currentIndex];

  const prevProject =
    currentIndex > 0
      ? {
          slug: portfolio.projects[currentIndex - 1].slug,
          title: portfolio.projects[currentIndex - 1].fullTitle,
        }
      : null;

  const nextProject =
    currentIndex < portfolio.projects.length - 1
      ? {
          slug: portfolio.projects[currentIndex + 1].slug,
          title: portfolio.projects[currentIndex + 1].fullTitle,
        }
      : null;

  return (
    <Container size="default">
      <ProjectDetail
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        locale={locale}
      />
    </Container>
  );
}
