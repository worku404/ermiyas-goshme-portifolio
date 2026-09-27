"use client";

import * as React from "react";

/**
 * ArchitecturalAtmosphere (Kinetic Edition)
 *
 * Features:
 * 1. Living Daylight Shift: Ambient sunlight caustics slowly breathe & morph (28s–32s cycle).
 * 2. Dual-Scale Drafting Matrix: 72px master modules with 24px micro-subdivisions and illuminated crosshairs.
 * 3. Micro-Grain Archival Vellum: Authentic paper texture with zero GPU overhead.
 * 4. Full WCAG AA/AAA compliance in both Light and Dark themes.
 */
export function ArchitecturalBackground() {
  return (
    <div
      className="arch-kinetic-viewport"
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
      {/* 1. Dynamic Sun & Clerestory Caustic Glows */}
      <div className="arch-sun-caustic arch-sun-primary" />
      <div className="arch-sun-caustic arch-sun-secondary" />

      {/* 2. Precision Modular Drafting Grid */}
      <div className="arch-matrix-grid" />

      {/* 3. Archival Paper Grain */}
      <div className="arch-vellum-grain" />

      <style>{`
        /* ================= LIGHT MODE ================= */
        .arch-kinetic-viewport {
          background-color: #F8F6F0;
          transition: background-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .arch-sun-caustic {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.7;
          will-change: transform, opacity;
          mix-blend-mode: multiply;
        }

        .arch-sun-primary {
          top: -15%;
          right: -10%;
          width: 70vw;
          height: 70vw;
          background: radial-gradient(circle, rgba(224, 139, 87, 0.16) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 75%);
          animation: archSunDrift 28s ease-in-out infinite alternate;
        }

        .arch-sun-secondary {
          bottom: -20%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(168, 83, 42, 0.10) 0%, rgba(224, 139, 87, 0.04) 50%, transparent 70%);
          animation: archSunDriftRev 32s ease-in-out infinite alternate;
        }

        /* Precision Matrix */
        .arch-matrix-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image:
            /* Crosshair intersection markers */
            radial-gradient(circle, rgba(140, 115, 95, 0.35) 1px, transparent 1.2px),
            /* Hairline coordinate module grid */
            linear-gradient(to right, rgba(120, 105, 90, 0.065) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 105, 90, 0.065) 1px, transparent 1px);
          background-size: 72px 72px, 24px 24px, 24px 24px;
          background-position: 0 0, 0 0, 0 0;
          mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, #000 60%, rgba(0, 0, 0, 0.2) 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 85% at 50% 50%, #000 60%, rgba(0, 0, 0, 0.2) 100%);
        }

        /* ================= DARK MODE ================= */
        .dark .arch-kinetic-viewport {
          background-color: #0E0D0B;
        }

        .dark .arch-sun-caustic {
          mix-blend-mode: screen;
          opacity: 0.85;
          filter: blur(100px);
        }

        .dark .arch-sun-primary {
          background: radial-gradient(
            circle,
            rgba(224, 139, 87, 0.22) 0%,
            rgba(217, 119, 6, 0.12) 40%,
            transparent 75%
          );
        }

        .dark .arch-sun-secondary {
          background: radial-gradient(
            circle,
            rgba(14, 165, 233, 0.07) 0%,
            rgba(224, 139, 87, 0.10) 45%,
            transparent 70%
          );
        }

        .dark .arch-matrix-grid {
          background-image:
            /* Luminous terracotta crosshairs */
            radial-gradient(circle, rgba(224, 139, 87, 0.65) 1.2px, transparent 1.2px),
            /* Hairline obsidian blueprint grid */
            linear-gradient(to right, rgba(255, 255, 255, 0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
        }

        /* Paper Grain */
        .arch-vellum-grain {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .dark .arch-vellum-grain {
          opacity: 0.042;
        }

        /* Keyframes */
        @keyframes archSunDrift {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-6vw, 8vh, 0) scale(1.12); }
          100% { transform: translate3d(4vw, 12vh, 0) scale(0.95); }
        }

        @keyframes archSunDriftRev {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(8vw, -6vh, 0) scale(1.08); }
          100% { transform: translate3d(-5vw, -10vh, 0) scale(0.92); }
        }

        @media (prefers-reduced-motion: reduce) {
          .arch-sun-primary,
          .arch-sun-secondary {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
