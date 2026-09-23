import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

/**
 * Static portfolio Next.js configuration.
 *
 * Why output: 'export':
 * Pure static HTML/CSS/JS export deployed to Vercel/CDN with no Node.js server.
 *
 * Why images.unoptimized: true:
 * In static exports, Next.js has no server-side image optimization service
 * (/_next/image). Per docs/01-tech-stack.md and docs/05-asset-pipeline.md,
 * image optimization is handled ahead-of-time in the pipeline.
 *
 * Why trailingSlash: true:
 * Emits directory-based static files (/en/work/slug/index.html) so static CDNs
 * resolve deep links without server URL-rewriting rules.
 */
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
