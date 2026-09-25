import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PortfolioAssistant } from "@/components/ai/PortfolioAssistant";
import { ArchitecturalBackground } from "@/components/background/ArchitecturalBackground";
import portfolio from "@/../content/portfolio.json";
import "@/app/globals.css";

/**
 * Self-hosted architectural typography via next/font/local:
 *
 * 1. Syne: structural, tectonic architectural display font (--font-display).
 * 2. Plus Jakarta Sans: refined, highly legible contemporary body font (--font-body).
 * 3. Noto Sans Ethiopic: native Amharic rendering without tofu boxes (--font-am).
 */
const fontDisplay = localFont({
  src: [
    {
      path: "../../../public/fonts/syne-700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/syne-800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const fontBody = localFont({
  src: [
    {
      path: "../../../public/fonts/plus-jakarta-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/plus-jakarta-sans-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const fontAm = localFont({
  src: [
    {
      path: "../../../public/fonts/noto-sans-ethiopic-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/noto-sans-ethiopic-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-am",
  display: "swap",
  preload: false,
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ermiyas-goshme.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Ermiyas Goshme",
    default: "Ermiyas Goshme — Architecture Portfolio",
  },
  description:
    `Static architecture portfolio of ${portfolio.owner.name}, ${portfolio.owner.statusLine} at AAU (EiABC/SBE). Human-centered design, cultural heritage, and contextual architecture.`,
  alternates: {
    canonical: "/",
    languages: {
      en: "/en/",
      am: "/am/",
      "x-default": "/en/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["am_ET"],
    siteName: "Ermiyas Goshme Architecture Portfolio",
    title: "Ermiyas Goshme — Architecture Portfolio",
    description:
      `Static architecture portfolio of ${portfolio.owner.name}, ${portfolio.owner.statusLine} at AAU (EiABC/SBE).`,
    images: [
      {
        url: "/images/work/ethiopian-orthodox-church-design/ethiopian-orthodox-church-design-01.png",
        width: 1200,
        height: 630,
        alt: "Ermiyas Goshme — Architecture Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ermiyas Goshme — Architecture Portfolio",
    description:
      `Static architecture portfolio of ${portfolio.owner.name}, ${portfolio.owner.statusLine} at AAU (EiABC/SBE).`,
    images: [
      "/images/work/ethiopian-orthodox-church-design/ethiopian-orthodox-church-design-01.png",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

/**
 * Pre-generate static routes for all configured locales at build time.
 */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Localized root layout for each language segment.
 *
 * Configured with:
 * - suppressHydrationWarning on <html> to prevent next-themes hydration attribute warnings.
 * - ThemeProvider with class attribute driving CSS custom properties.
 * - NextIntlClientProvider for client-side localized message access.
 * - SiteHeader and SiteFooter chrome.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Required by next-intl for static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontAm.variable}`}
      suppressHydrationWarning
    >
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <ArchitecturalBackground />
            <SiteHeader />
            <main
              style={{
                flexGrow: 1,
                width: "100%",
                position: "relative",
                zIndex: 10,
                paddingTop: "clamp(92px, 9vw, 116px)",
              }}
            >
              {children}
            </main>
            <SiteFooter />
            <PortfolioAssistant />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
