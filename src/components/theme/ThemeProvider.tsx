"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Suppress React 19 / Next.js 16 development overlay error:
 * "Encountered a script tag while rendering React component..."
 *
 * Why this is necessary:
 * next-themes injects a blocking script to detect the system theme and prevent
 * flash-of-unstyled-theme (FOUC). During client-side transitions between locales
 * (e.g. /en to /am), the localized layout remounts, causing React 19 in development
 * to log a console error that triggers Next.js's dev overlay.
 * The script is intentional, benign, and only active for theme initialization.
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

/**
 * ThemeProvider wrapping next-themes.
 *
 * Configured to drive the '.dark' CSS class on <html>, which activates
 * the dark theme CSS variables defined in globals.css.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
