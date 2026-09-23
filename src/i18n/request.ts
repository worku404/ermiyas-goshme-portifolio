import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Request-scoped configuration for next-intl.
 *
 * In static exports, requestLocale resolves to the static param provided
 * by generateStaticParams during build time.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Fallback to defaultLocale if an invalid or missing locale is passed
  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
