"use client";

import * as React from "react";
import portfolio from "@/../content/portfolio.json";

export interface SocialItem {
  id: string;
  name: string;
  label: string;
  handle: string;
  href: string;
  isExternal: boolean;
  color: string;
  icon: React.ReactNode;
}

export const SOCIAL_CONTACT_ITEMS: SocialItem[] = [
  {
    id: "phone",
    name: "Phone / Direct Call",
    label: portfolio.owner.phone,
    handle: "Call directly",
    href: portfolio.owner.phoneTelHref,
    isExternal: false,
    color: "var(--color-accent)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "email",
    name: "Direct Email",
    label: portfolio.owner.email,
    handle: "Send message",
    href: `mailto:${portfolio.owner.email}`,
    isExternal: false,
    color: "var(--color-accent)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: "telegram",
    name: "Telegram",
    label: "Telegram",
    handle: "@ermidart",
    href: "https://t.me/ermidart",
    isExternal: true,
    color: "#229ED9",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    label: "LinkedIn",
    handle: "Ermiyas Goshme",
    href: "https://linkedin.com/in/ermiyas-goshme",
    isExternal: true,
    color: "#0A66C2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.3a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
      </svg>
    ),
  },
  {
    id: "x",
    name: "X (Twitter)",
    label: "X (Twitter)",
    handle: "@ermiyas_goshme",
    href: "https://x.com/ermiyas_goshme",
    isExternal: true,
    color: "currentColor",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export interface SocialLinksProps {
  variant?: "buttons" | "pills" | "compact";
  showSocialsOnly?: boolean;
}

export function SocialLinks({
  variant = "buttons",
  showSocialsOnly = false,
}: SocialLinksProps) {
  const items = showSocialsOnly
    ? SOCIAL_CONTACT_ITEMS.filter((item) => ["telegram", "linkedin", "x"].includes(item.id))
    : SOCIAL_CONTACT_ITEMS;

  if (variant === "compact" || variant === "pills") {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {items.map((item) => (
          <a
            key={item.id}
            href={item.href}
            target={item.isExternal ? "_blank" : undefined}
            rel={item.isExternal ? "noopener noreferrer" : undefined}
            aria-label={`${item.name}: ${item.label}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "9999px",
              border: "var(--border-hairline)",
              backgroundColor: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transition:
                "all var(--dur-fast) var(--ease-standard)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-accent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hairline)";
              e.currentTarget.style.color = "var(--color-text)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <span style={{ display: "inline-flex" }}>{item.icon}</span>
            <span>{item.label}</span>
            {item.isExternal && (
              <span style={{ fontSize: "10px", opacity: 0.6 }} aria-hidden="true">
                ↗
              </span>
            )}
          </a>
        ))}
      </div>
    );
  }

  // Large prominent action buttons (used in /contact page)
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap: "var(--space-3)",
      }}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target={item.isExternal ? "_blank" : undefined}
          rel={item.isExternal ? "noopener noreferrer" : undefined}
          aria-label={`${item.name}: ${item.label}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-3)",
            padding: "var(--space-4) var(--space-5)",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            color: "inherit",
            transition:
              "all var(--dur-fast) var(--ease-standard)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-hairline)";
            e.currentTarget.style.transform = "none";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(168, 83, 42, 0.12)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {item.icon}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2px", flexGrow: 1 }}>
            <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
              {item.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "var(--fs-base)",
                fontWeight: 600,
                color: "var(--color-text)",
                lineHeight: 1.2,
                wordBreak: "break-all",
              }}
            >
              {item.label}
            </span>
            <span style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 600 }}>
              {item.handle} {item.isExternal ? "↗" : "→"}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
