"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

/**
 * Accessible locale switcher preserving the active route.
 *
 * Switches between English ('en') and Amharic ('am') by replacing
 * the current route's locale parameter using next-intl navigation.
 */
export function LocaleSwitcher({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: "en" | "am") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`locale-switcher-pill ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        borderRadius: "9999px",
        border: "var(--border-hairline)",
        backgroundColor: "transparent",
        gap: "6px",
        fontSize: "12px",
        fontFamily: "var(--font-display), sans-serif",
        lineHeight: 1,
        ...style,
      }}
    >
      <button
        type="button"
        id="locale-switch-en"
        aria-label="Switch to English"
        aria-pressed={locale === "en"}
        onClick={() => handleSwitch("en")}
        style={{
          background: "none",
          border: "none",
          color:
            locale === "en" ? "var(--color-text)" : "var(--color-text-muted)",
          fontWeight: locale === "en" ? 700 : 500,
          cursor: "pointer",
          padding: "2px 0",
          fontSize: "12px",
          transition: "color var(--dur-fast) var(--ease-standard)",
        }}
      >
        EN
      </button>
      <span
        style={{
          color: "var(--color-text-muted)",
          opacity: 0.35,
          fontSize: "11px",
          userSelect: "none",
        }}
      >
        |
      </span>
      <button
        type="button"
        id="locale-switch-am"
        aria-label="ወደ አማርኛ ቀይር (Switch to Amharic)"
        aria-pressed={locale === "am"}
        onClick={() => handleSwitch("am")}
        style={{
          background: "none",
          border: "none",
          color:
            locale === "am" ? "var(--color-text)" : "var(--color-text-muted)",
          fontWeight: locale === "am" ? 700 : 500,
          cursor: "pointer",
          padding: "2px 0",
          fontSize: "12px",
          fontFamily: locale === "am" ? "var(--font-am), sans-serif" : "system-ui, sans-serif",
          transition: "color var(--dur-fast) var(--ease-standard)",
        }}
      >
        አማ
      </button>
    </div>
  );
}
