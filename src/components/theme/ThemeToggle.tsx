"use client";

import * as React from "react";
import { useTheme } from "next-themes";

/**
 * Idiomatic client mount detector using useSyncExternalStore (React 18/19).
 *
 * Why useSyncExternalStore over useEffect + setState:
 * React 19's ESLint rules strictly flag synchronous setState inside useEffect
 * as causing cascading renders. useSyncExternalStore cleanly provides false during SSR
 * and true upon client hydration without triggering extra render cascades.
 */
const emptySubscribe = () => () => {};

function useIsMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Accessible theme toggle button for verifying system-aware, persisted theming.
 *
 * Cycles between light, dark, and system modes.
 * Avoids hydration mismatch by rendering a stable placeholder until hydrated.
 */
export function ThemeToggle({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useIsMounted();

  if (!mounted) {
    return (
      <button
        type="button"
        id="theme-toggle"
        aria-label="Toggle color theme"
        disabled
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "var(--border-hairline)",
          background: "transparent",
          color: "var(--color-text-muted)",
          cursor: "default",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          ...style,
        }}
      >
        ◐
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      id="theme-toggle"
      aria-label={
        isDark ? "Switch to light theme" : "Switch to dark theme"
      }
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={handleToggle}
      className={`theme-toggle-btn ${className}`.trim()}
      style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "var(--border-hairline)",
        background: "transparent",
        color: "var(--color-text)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "15px",
        lineHeight: 1,
        transition:
          "border-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-accent)";
        e.currentTarget.style.color = "var(--color-accent)";
        e.currentTarget.style.transform = "rotate(20deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hairline)";
        e.currentTarget.style.color = "var(--color-text)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
