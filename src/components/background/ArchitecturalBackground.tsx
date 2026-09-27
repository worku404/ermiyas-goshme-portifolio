"use client";

import * as React from "react";

/**
 * ArchitecturalBackground — Interactive Cursor Matrix Edition
 *
 * Features:
 * 1. Living Architectural Atmosphere: Subtle breathing daylight caustics.
 * 2. Purely Reactive Cursor Glow:
 *    - All automated sweeping waves are disabled.
 *    - Dots strictly react to mouse & touch pointer movement.
 *    - Moving the cursor creates an organic architectural light pool that smoothly trails and fades.
 *    - When stationary, dots remain in their clean resting state.
 * 3. Exact 72px Modular Grid Alignment with Retina (high-DPI) sharpness.
 * 4. Automatic Dark & Light theme synchronization.
 */
export function ArchitecturalBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const SPACING = 72; // Exact match to CSS 72px architectural module
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let totalDots = 0;
    let glowLevels: Float32Array = new Float32Array(0);

    // Track theme
    let isDark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Resize handling with high-DPI support
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 2;
      rows = Math.ceil(height / SPACING) + 2;
      totalDots = cols * rows;

      const newGlow = new Float32Array(totalDots);
      if (glowLevels.length > 0) {
        newGlow.set(glowLevels.subarray(0, Math.min(glowLevels.length, totalDots)));
      }
      glowLevels = newGlow;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Pointer tracking (supports mouse & touch)
    let pointerX = -1000;
    let pointerY = -1000;
    let isPointerActive = false;

    const handlePointerMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      isPointerActive = true;
    };

    const handlePointerLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
      isPointerActive = false;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    let animFrameId: number;
    let lastTime = performance.now();

    // Main animation loop
    const render = (now: number) => {
      animFrameId = requestAnimationFrame(render);

      // Pause rendering if tab is hidden to preserve battery
      if (document.hidden) return;

      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // 1. UPDATE GLOW: ONLY from cursor / pointer proximity
      if (isPointerActive && pointerX >= 0 && pointerY >= 0) {
        const pointerCol = pointerX / SPACING;
        const pointerRow = pointerY / SPACING;
        const radius = 2.8; // ~200px glow pool around cursor

        const minR = Math.max(0, Math.floor(pointerRow - radius));
        const maxR = Math.min(rows - 1, Math.ceil(pointerRow + radius));
        const minC = Math.max(0, Math.floor(pointerCol - radius));
        const maxC = Math.min(cols - 1, Math.ceil(pointerCol + radius));

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const d = Math.hypot(c - pointerCol, r - pointerRow);
            if (d < radius) {
              // Smooth cosine falloff for an organic soft light pool
              const intensity = Math.cos((d / radius) * (Math.PI / 2)) * 0.95;
              const idx = r * cols + c;
              if (intensity > glowLevels[idx]) {
                glowLevels[idx] = intensity;
              }
            }
          }
        }
      }

      // 2. RENDER CANVAS DOTS
      ctx.clearRect(0, 0, width, height);

      // Color tokens
      const baseDotColor = isDark
        ? "rgba(224, 139, 87, 0.40)"
        : "rgba(168, 83, 42, 0.32)";

      const activeGlowHaloColor = isDark
        ? (alpha: number) => `rgba(224, 139, 87, ${alpha * 0.5})`
        : (alpha: number) => `rgba(217, 131, 64, ${alpha * 0.42})`;

      const activeCoreColor = isDark
        ? (alpha: number) => `rgba(255, 205, 160, ${0.4 + alpha * 0.6})`
        : (alpha: number) => `rgba(168, 83, 42, ${0.35 + alpha * 0.65})`;

      const decay = Math.pow(0.89, delta * 60); // Smooth trailing decay

      for (let r = 0; r < rows; r++) {
        const y = r * SPACING;
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING;
          const idx = r * cols + c;
          const glow = glowLevels[idx];

          if (glow > 0.03) {
            // 1. Draw glowing outer halo
            ctx.beginPath();
            ctx.arc(x, y, 1.8 + glow * 5.2, 0, Math.PI * 2);
            ctx.fillStyle = activeGlowHaloColor(glow);
            ctx.fill();

            // 2. Draw illuminated core dot
            ctx.beginPath();
            ctx.arc(x, y, 1.3 + glow * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = activeCoreColor(glow);
            ctx.fill();

            // Decay smoothly
            glowLevels[idx] = glow * decay;
          } else {
            // Resting state dot
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = baseDotColor;
            ctx.fill();
            glowLevels[idx] = 0;
          }
        }
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      themeObserver.disconnect();
    };
  }, []);

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

      {/* 2. Hairline Drafting Grid Lines (CSS Module) */}
      <div className="arch-matrix-grid" />

      {/* 3. Interactive Dot Matrix Canvas (Reacts strictly to mouse movement) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* 4. Archival Paper Grain */}
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

        /* Precision Matrix Hairline Grid Lines */
        .arch-matrix-grid {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-image:
            linear-gradient(to right, rgba(120, 105, 90, 0.065) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 105, 90, 0.065) 1px, transparent 1px);
          background-size: 72px 72px, 72px 72px;
          background-position: 0 0, 0 0;
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
