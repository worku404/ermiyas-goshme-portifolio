import * as React from "react";

export interface SectionProps {
  as?: React.ElementType;
  spacing?: "sm" | "md" | "lg";
  children: React.ReactNode;
  id?: string;
  ariaLabelledby?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Section primitive providing consistent vertical rhythm across page sections.
 *
 * Grounded in architectural drawing plan rhythm per docs/02-design-system.md §5.
 * Enforces vertical padding derived from the spacing scale tokens, ensuring
 * content breathes uniformly while supporting accessible landmark labeling.
 */
export function Section({
  as: Component = "section",
  spacing = "md",
  children,
  id,
  ariaLabelledby,
  className = "",
  style = {},
}: SectionProps) {
  const paddingMap: Record<string, string> = {
    sm: "var(--space-8) 0",
    md: "clamp(var(--space-8), 6vw, var(--space-16)) 0",
    lg: "clamp(var(--space-12), 8vw, var(--space-24)) 0",
  };

  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={`site-section ${className}`.trim()}
      style={{
        padding: paddingMap[spacing] || paddingMap.md,
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
