import { defineRouting } from "next-intl/routing";

/**
 * Internationalization routing configuration for the static portfolio.
 *
 * Architecture rationale:
 * In static exports (output: 'export'), request-time middleware cannot run.
 * We define explicit locale segments ('en' and 'am') pre-rendered via generateStaticParams.
 */
export const routing = defineRouting({
  locales: ["en", "am"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
