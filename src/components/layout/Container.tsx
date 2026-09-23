import * as React from "react";

export interface ContainerProps {
  as?: React.ElementType;
  size?: "default" | "wide" | "full";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Layout primitive providing consistent horizontal max-widths and gutters.
 *
 * Implements architectural grid alignment per docs/02-design-system.md §5.
 * Uses CSS variables for responsive margins and max-width thresholds
 * without hardcoding arbitrary pixel values.
 */
export function Container({
  as: Component = "div",
  size = "default",
  children,
  className = "",
  style = {},
}: ContainerProps) {
  const maxWidthMap: Record<string, string> = {
    default: "var(--bp-xl)",
    wide: "var(--bp-2xl)",
    full: "100%",
  };

  return (
    <Component
      className={`site-container page-enter ${className}`.trim()}
      style={{
        maxWidth: maxWidthMap[size] || maxWidthMap.default,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(var(--space-4), 4vw, var(--space-8))",
        paddingRight: "clamp(var(--space-4), 4vw, var(--space-8))",
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
