"use client";

import * as React from "react";

export interface SoftwareMeta {
  name: string;
  shortName: string;
  provider: string;
  url: string;
  category: string;
  role: string;
  capabilities: string[];
  brandColor: string;
  icon: React.ReactNode;
}

export const SOFTWARE_REGISTRY: Record<string, SoftwareMeta> = {
  Revit: {
    name: "Autodesk Revit",
    shortName: "Revit",
    provider: "Autodesk",
    url: "https://www.autodesk.com/products/revit/overview",
    category: "BIM & Working Drawings",
    role: "Parametric BIM & Construction Documentation",
    capabilities: [
      "Parametric Modeling",
      "Floor Plans & Sections",
      "Schedules & Detailing",
    ],
    brandColor: "#0696D7",
    icon: (
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#0696D7" />
        <path
          d="M9 7h8.5a5.5 5.5 0 0 1 4.2 9.04L24 25h-4.3l-2.1-7.5H13v7.5H9V7zm4 3.5v4h4.2a2 2 0 0 0 0-4H13z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  SketchUp: {
    name: "Trimble SketchUp",
    shortName: "SketchUp",
    provider: "Trimble",
    url: "https://www.sketchup.com/",
    category: "3D Massing & Spatial Concept",
    role: "Volumetric Exploration & Urban Massing",
    capabilities: [
      "Rapid Spatial Prototyping",
      "Context & Site Topography",
      "Iterative Massing",
    ],
    brandColor: "#005F9E",
    icon: (
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#EA212D" />
        <path
          d="M8 8h16v16H8V8zm4 4v8h8v-8h-8z"
          fill="#FFFFFF"
          fillRule="evenodd"
        />
        <path d="M12 12h8v3h-5v5h-3v-8z" fill="#EA212D" />
      </svg>
    ),
  },
  "D5 Render": {
    name: "D5 Render",
    shortName: "D5 Render",
    provider: "Dimension 5",
    url: "https://www.d5render.com/",
    category: "Real-Time Raytracing & ArchViz",
    role: "Atmospheric Illumination & Cinematic Renders",
    capabilities: [
      "Real-Time Raytracing",
      "PBR Material Craft",
      "Daylight & Sun Studies",
    ],
    brandColor: "#2F54EB",
    icon: (
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#18181B" />
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
    shortName: "Illustrator",
    provider: "Adobe",
    url: "https://www.adobe.com/products/illustrator.html",
    category: "Vector Graphics & Diagrams",
    role: "Axonometric Representation & Presentation",
    capabilities: [
      "Axonometric Linework",
      "Concept Diagrammatics",
      "Portfolio Presentation",
    ],
    brandColor: "#FF9A00",
    icon: (
      <svg width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#261300" stroke="#FF9A00" strokeWidth="1.2" />
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
  subtitle?: string;
}

/**
 * Architectural Software & Digital Production Pipeline
 *
 * Highlights architectural capabilities (BIM, Parametric Massing, Atmospheric Raytracing, Diagrams)
 * rather than vendor commercial listings.
 */
export function SkillsList({ items, label, subtitle }: SkillsListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      {label && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "var(--space-2)",
            borderBottom: "var(--border-hairline)",
            paddingBottom: "var(--space-3)",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--color-accent)",
                margin: 0,
              }}
            >
              {label}
            </h3>
            {subtitle && (
              <p
                style={{
                  fontSize: "var(--fs-xs)",
                  color: "var(--color-text-muted)",
                  margin: "var(--space-1) 0 0 0",
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <span
            style={{
              fontSize: "11px",
              fontFamily: "var(--font-mono, monospace)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text-subtle, rgba(255,255,255,0.4))",
            }}
          >
            Digital Pipeline
          </span>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          gap: "var(--space-4)",
        }}
      >
        {items.map((skill) => {
          const meta = SOFTWARE_REGISTRY[skill] || {
            name: skill,
            shortName: skill,
            provider: "Digital Tool",
            url: "#",
            category: "Design Software",
            role: "Digital Modeling & Spatial Investigation",
            capabilities: ["3D Spatial Modeling", "Technical Documentation"],
            brandColor: "var(--color-accent)",
            icon: (
              <div
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(168, 83, 42, 0.15)",
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
              aria-label={`${meta.name} — ${meta.role}. Opens official site.`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
                padding: "var(--space-5)",
                backgroundColor: "var(--color-surface)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "var(--border-hairline)",
                borderRadius: "var(--radius-md)",
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                overflow: "hidden",
                transition:
                  "transform var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.boxShadow = "0 12px 28px -8px rgba(0, 0, 0, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.borderColor = "var(--border-hairline)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Header: Icon + Title + Outbound link arrow */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "var(--space-3)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                  <div style={{ flexShrink: 0 }}>{meta.icon}</div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
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
                        fontSize: "11px",
                        color: "var(--color-text-muted)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {meta.category}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color: "var(--color-accent)",
                    opacity: 0.7,
                    padding: "4px",
                  }}
                  aria-hidden="true"
                >
                  ↗
                </span>
              </div>

              {/* Architectural Role */}
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1.4,
                  marginTop: "2px",
                }}
              >
                {meta.role}
              </div>

              {/* Architectural Capabilities Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "auto",
                  paddingTop: "var(--space-2)",
                  borderTop: "1px dashed rgba(255, 255, 255, 0.07)",
                }}
              >
                {meta.capabilities.map((cap) => (
                  <span
                    key={cap}
                    style={{
                      fontSize: "11px",
                      fontFamily: "var(--font-mono, monospace)",
                      color: "var(--color-text-muted)",
                      backgroundColor: "var(--color-surface-2)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
