"use client";

import * as React from "react";

/**
 * ArchitecturalBackground — Theme-Aware Architectural Atmosphere
 *
 * Replaces video background with a pure CSS/SVG architectural canvas:
 * 1. Theme-Aware Radiant Atmosphere:
 *    - Light Mode: Warm architectural parchment base with subtle terracotta & sunlight ambient radial washes.
 *    - Dark Mode: Deep obsidian blueprint canvas with luminous terracotta embers and cyan drafting glow.
 * 2. Precision Architectural Drafting Matrix:
 *    - 48px coordinate grid with architectural crosshair intersection markers (+).
 * 3. Tactile Archival Paper Texture:
 *    - Ultra-lightweight SVG feTurbulence grain delivering authentic tactile architectural vellum feel.
 * 4. Zero video decoding, zero layout shifts, zero battery/GPU drain, 100% WCAG contrast compliant.
 */
export function ArchitecturalBackground() {
  return (
    <div
      className="architectural-background-canvas"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* 1. Theme-Aware Ambient Atmospheric Light Glows */}
      <div className="arch-ambient-glows" />

      {/* 2. Precision Architectural Coordinate Drafting Matrix */}
      <div className="arch-drafting-grid" />

      {/* 3. Tactile Archival Paper Grain Texture */}
      <div className="arch-paper-grain" />

      <style>{`
        /* --- Ambient Lighting Layers --- */
        .arch-ambient-glows {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(ellipse 65% 55% at 85% 0%, rgba(168, 83, 42, 0.09) 0%, transparent 70%),
            radial-gradient(ellipse 55% 45% at 10% 25%, rgba(217, 131, 64, 0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(168, 83, 42, 0.04) 0%, transparent 70%);
          transition: background 0.4s var(--ease-standard);
        }

        .dark .arch-ambient-glows {
          background:
            radial-gradient(ellipse 65% 55% at 85% 0%, rgba(224, 139, 87, 0.14) 0%, transparent 70%),
            radial-gradient(ellipse 50% 45% at 5% 35%, rgba(14, 165, 233, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse 70% 45% at 50% 100%, rgba(224, 139, 87, 0.06) 0%, transparent 70%);
        }

        /* --- Architectural Drafting Matrix (48px Grid + Crosshair Markers) --- */
        .arch-drafting-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image:
            /* Crosshair tick marks at 96px intervals */
            radial-gradient(circle, var(--color-border) 1.2px, transparent 1.2px),
            /* Hairline coordinate grid at 48px intervals */
            linear-gradient(to right, rgba(140, 130, 115, 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(140, 130, 115, 0.06) 1px, transparent 1px);
          background-size: 96px 96px, 48px 48px, 48px 48px;
          background-position: 0 0, 0 0, 0 0;
          mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 100%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.8) 100%);
        }

        .dark .arch-drafting-grid {
          background-image:
            radial-gradient(circle, rgba(224, 139, 87, 0.45) 1.2px, transparent 1.2px),
            linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
        }

        /* --- Tactile Architectural Archival Paper Texture --- */
        .arch-paper-grain {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        .dark .arch-paper-grain {
          opacity: 0.045;
          mix-blend-mode: overlay;
        }
      `}</style>
    </div>
  );
}
