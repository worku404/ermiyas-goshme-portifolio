import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ermiyas Goshme — Architecture Portfolio",
  description: "Redirecting to default locale...",
};

/**
 * Root layout for the root redirect route (/).
 *
 * Partitioned via route group (root) so that src/app/[locale]/layout.tsx
 * can independently serve as the root layout with dynamic <html lang={locale}>
 * for all localized pages without colliding or nesting <html> tags.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
