"use client";

import { useEffect, useRef, useState } from "react";

/**
 * BackgroundVideo — Architectural Ambient Video Canvas
 *
 * Implements:
 * 1. Autonomous continuous loop of Ermiyas's architectural screen recording.
 * 2. WCAG 2.1 Success Criterion 2.2.2 (Pause, Stop, Hide) compliance:
 *    - Discreet toggle button in the bottom corner so visitors can pause/play motion.
 *    - Automatically pauses when user prefers reduced motion (prefers-reduced-motion).
 * 3. Mobile resilience: muted, playsInline, autoplay with fallback promise catching.
 * 4. Architectural Drafting Grid overlay above the video layer.
 */
export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Respect user's reduced-motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay was prevented by browser policy
      });
    }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <>
      {/* Fixed Fullscreen Ambient Video Layer */}
      <div
        className="site-video-background"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center center",
            opacity: "0.5",
            filter: "var(--bg-video-filter, none)",
            mixBlendMode:
              "var(--bg-video-blend, normal)" as React.CSSProperties["mixBlendMode"],
            transition: "opacity 0.4s ease, filter 0.4s ease",
          }}
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Architectural Drafting Grid Overlay */}
      <div
        className="site-grid-overlay"
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage:
            "linear-gradient(to right, rgba(128, 128, 128, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Discreet Pause/Play Control (WCAG 2.2.2 Compliant) */}
      <div
        style={{
          position: "fixed",
          bottom: "var(--space-4)",
          left: "var(--space-4)",
          zIndex: 90,
        }}
      >
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={
              isPlaying
                ? "Pause ambient background video"
                : "Play ambient background video"
            }
            title={
              isPlaying
                ? "Pause background motion"
                : "Play background motion"
            }
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              border: "var(--border-hairline)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text-muted)",
              fontSize: "var(--fs-xs)",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: "var(--shadow-sm)",
              transition:
                "background-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-text)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: isPlaying ? "var(--color-accent)" : "#9E9E9E",
                animation: isPlaying ? "pulse 2s infinite" : "none",
              }}
            />
            <span>{isPlaying ? "Motion: ON" : "Motion: OFF"}</span>
          </button>
        </div>
    </>
  );
}
