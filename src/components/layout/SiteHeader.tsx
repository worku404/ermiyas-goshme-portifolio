"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";

/**
 * Global site header providing responsive navigation, theme, and locale controls.
 *
 * Implements WCAG 2.1 AA keyboard accessibility:
 * - Desktop nav links exposed in <nav aria-label="Main Navigation">.
 * - Active route marked with aria-current="page".
 * - Fullscreen mobile menu with focus trap, Esc key listener, and focus return.
 *
 * CSS Architecture Note:
 * Backdrop-filter is intentionally omitted from the sticky header container
 * because backdrop-filter creates a new containing block for position: fixed descendants,
 * which would inadvertently clip the fullscreen mobile drawer to the header's height.
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const drawerCloseRef = React.useRef<HTMLButtonElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  // Close mobile menu on route change during render (per React 19 guidelines)
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle Esc key and focus trap when mobile menu is open
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    // Focus the close button when the drawer opens
    drawerCloseRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/cv", label: t("cv") },
  ];

  return (
    <>
      <header
        className="site-header-wrapper"
        style={{
          position: "fixed",
          top: "clamp(12px, 2vw, 18px)",
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 clamp(12px, 3vw, 24px)",
          pointerEvents: "none",
        }}
      >
        <div
          className="site-header-pill"
          style={{
            pointerEvents: "auto",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "var(--border-hairline)",
            borderRadius: "9999px",
            boxShadow:
              "0 12px 36px -4px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)",
            padding: "6px 10px 6px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(14px, 2.5vw, 28px)",
            maxWidth: "1020px",
            width: "100%",
            transition:
              "border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
          }}
        >
          {/* Brand / Logo */}
          <Link
            href="/"
            aria-label="Ermiyas Goshme — Home"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              color: "var(--color-text)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              Ermiyas Goshme
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "10px",
                padding: "2px 6px",
                borderRadius: "4px",
                backgroundColor: "rgba(168, 83, 42, 0.18)",
                color: "var(--color-accent)",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              ARCH
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="desktop-nav"
            aria-label="Main Navigation"
            style={{
              display: "none",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {navLinks.slice(1).map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    color: isActive ? "#FFFFFF" : "var(--color-text-muted)",
                    backgroundColor: isActive
                      ? "var(--color-accent)"
                      : "transparent",
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "13px",
                    fontFamily: "var(--font-body), sans-serif",
                    textDecoration: "none",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    transition:
                      "background-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard)",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div
            className="desktop-actions"
            style={{
              display: "none",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <LocaleSwitcher />
            <ThemeToggle />
            <CVDownloadButton variant="pill" label="CV" />
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div
            className="mobile-toggle"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
            }}
          >
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
              onClick={() => setMobileMenuOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                backgroundColor: "transparent",
                border: "var(--border-hairline)",
                borderRadius: "50%",
                color: "var(--color-text)",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Responsive CSS helper */}
        <style>{`
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
            .desktop-actions { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>
      </header>

      {/* Fullscreen Mobile Drawer (rendered outside sticky header container to prevent any clipping) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            backgroundColor: "var(--color-bg)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {/* Drawer Header Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding:
                "var(--space-3) clamp(var(--space-4), 4vw, var(--space-8))",
              borderBottom: "var(--border-hairline)",
              minHeight: "64px",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display), serif",
                fontWeight: 700,
                fontSize: "var(--fs-md)",
                color: "var(--color-text)",
                textDecoration: "none",
              }}
            >
              Ermiyas Goshme
            </Link>

            <button
              ref={drawerCloseRef}
              type="button"
              aria-label={t("closeMenu")}
              onClick={() => {
                setMobileMenuOpen(false);
                menuButtonRef.current?.focus();
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "44px",
                minHeight: "44px",
                backgroundColor: "transparent",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-text)",
                cursor: "pointer",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Drawer Body with Navigation Links */}
          <div
            style={{
              padding: "var(--space-8) clamp(var(--space-4), 6vw, var(--space-8))",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              flexGrow: 1,
            }}
          >
            <nav
              aria-label="Mobile Navigation"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text)",
                      fontWeight: isActive ? 700 : 500,
                      fontSize: "var(--fs-xl)",
                      textDecoration: "none",
                      padding: "var(--space-3) 0",
                      borderBottom: "var(--border-hairline)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{link.label}</span>
                    <span
                      style={{
                        fontSize: "var(--fs-sm)",
                        color: "var(--color-text-muted)",
                      }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div style={{ marginTop: "var(--space-6)" }}>
              <CVDownloadButton
                variant="primary"
                label={t("downloadCv")}
                style={{ width: "100%", justifyContent: "center" }}
              />
            </div>
          </div>

          {/* Drawer Footer with Locale and Theme Controls */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--space-6) clamp(var(--space-4), 6vw, var(--space-8))",
              borderTop: "var(--border-hairline)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
