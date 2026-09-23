import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Localized navigation utilities wrapping Next.js navigation primitives.
 *
 * Ensures Link, redirect, usePathname, and useRouter automatically preserve
 * or switch locale prefixes consistently across static routes.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
