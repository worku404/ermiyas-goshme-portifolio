"use client";

import * as React from "react";

export interface SoftwareMeta {
  name: string;
  provider: string;
  url: string;
  category: string;
  brandColor: string;
  icon: React.ReactNode;
}

export const SOFTWARE_REGISTRY: Record<string, SoftwareMeta> = {
  Revit: {
    name: "Autodesk Revit",
    provider: "Autodesk",
    url: "https://www.autodesk.com/products/revit/overview",
    category: "BIM & Architectural Modeling",
    brandColor: "#0696D7",
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0696D7" />
        <path
          d="M9 7h8.5a5.5 5.5 0 0 1 4.2 9.04L24 25h-4.3l-2.1-7.5H13v7.5H9V7zm4 3.5v4h4.2a2 2 0 0 0 0-4H13z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  SketchUp: {
    name: "Trimble SketchUp",
    provider: "Trimble",
    url: "https://www.sketchup.com/",
    category: "3D Spatial Design & Conceptual Modeling",
    brandColor: "#005F9E",
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#EA212D" />
        <path
          d="M8 8h16v16H8V8zm4 4v8h8v-8h-8z"
          fill="#FFFFFF"
          fillRule="evenodd"
        />
        <path
          d="M12 12h8v3h-5v5h-3v-8z"
          fill="#EA212D"
        />
      </svg>
    ),
  },
  "D5 Render": {
    name: "D5 Render",
    provider: "Dimension 5",
    url: "https://www.d5render.com/",
    category: "Real-Time Raytracing & Photorealistic ArchViz",
    brandColor: "#2F54EB",
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#18181B" />
        <path
          d="M9 8h7a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7H9V8zm4 4v8h3a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-3z"
          fill="#3B82F6"
        />
        <circle cx="21" cy="11" r="2.5" fill="#60A5FA" />
      </svg>
    ),
  },
  Illustrator: {
    name: "Adobe Illustrator",
    provider: "Adobe",
    url: "https://www.adobe.com/products/illustrator.html",
    category: "Architectural Diagrams & Vector Post-Production",
    brandColor: "#FF9A00",
    icon: (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#330000" />
        <rect x="1" y="1" width="30" height="30" rx="6" stroke="#FF9A00" strokeWidth="1.5" />
        <text
          x="7"
          y="22"
          fill="#FF9A00"
          fontSize="15"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Ai
        </text>
      </svg>
    ),
  },
};

export interface SkillsListProps {
  items: string[];
  label?: string;
}

/**
 * Architectural Software & Digital Tools Showcase
 *
 * Implements user requirements:
 * - Real official icons for Revit, SketchUp, D5 Render, Illustrator.
 * - Big, prominent typographic hierarchy (18px heading, category details).
 * - Official provider names and verified outbound links with accessible target="_blank".
 * - Glassmorphic architectural card design with interactive hover lift.
 */
export function SkillsList({ items, label }: SkillsListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {label && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-accent)",
              margin: 0,
            }}
          >
            {label}
          </h3>
          <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
            Official Providers ↗
          </span>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {items.map((skill) => {
          const meta = SOFTWARE_REGISTRY[skill] || {
            name: skill,
            provider: "Software",
            url: "#",
            category: "Digital Design Tool",
            brandColor: "var(--color-accent)",
            icon: (
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "7px",
                  backgroundColor: "var(--color-accent-subtle, rgba(168,83,42,0.15))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                }}
              >
                {skill.slice(0, 2).toUpperCase()}
              </div>
            ),
          };

          return (
            <a
              key={skill}
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${meta.name} by ${meta.provider} (${meta.category}) — Opens official site`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-4)",
                padding: "var(--space-4) var(--space-5)",
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "inherit",
                transition:
                  "transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--border-hairline)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Real Official Brand Icon */}
              <div style={{ flexShrink: 0 }}>{meta.icon}</div>

              {/* Big Text & Provider Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 700,
                      fontSize: "17px",
                      color: "var(--color-text)",
                      lineHeight: 1.2,
                    }}
                  >
                    {meta.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--color-accent)",
                      opacity: 0.8,
                    }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "var(--fs-xs)",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.3,
                  }}
                >
                  {meta.category}
                </span>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    marginTop: "2px",
                  }}
                >
                  by {meta.provider}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
