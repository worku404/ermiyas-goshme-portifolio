"use client";

import * as React from "react";
import portfolio from "@/../content/portfolio.json";

/**
 * Curated Quick-Inquiry Chips for Architectural Recruiters and Visitors
 */
const QUICK_INQUIRY_CHIPS = [
  {
    label: "🏛️ Design Philosophy",
    query: "Who is Ermiyas and what is his architectural design philosophy?",
  },
  {
    label: "📐 Software & BIM Stack",
    query: "What architecture software and BIM tools does Ermiyas use?",
  },
  {
    label: "⛪ Church Competition",
    query: "Tell me about his Ethiopian Orthodox Church competition project.",
  },
  {
    label: "🌿 Sustainable Vernacular",
    query: "How does he approach sustainable & climate-responsive design?",
  },
  {
    label: "💼 2027 Internships",
    query: "Is Ermiyas available for internships or collaborations?",
  },
  {
    label: "📄 Contact & CV",
    query: "How can I contact Ermiyas directly or view his CV?",
  },
  {
    label: "✨ Architectural Wit",
    query: "Tell me an architectural joke or design quote!",
  },
];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/**
 * Parses inline markdown (bold, italic, links) into rich architectural nodes.
 * Automatically decorates project monograph links with an architectural badge.
 */
function parseInlineMarkdown(text: string, keyPrefix: string): React.ReactNode[] {
  const inlineRegex = /(\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      // **bold**
      parts.push(<strong key={`${keyPrefix}-b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3] !== undefined) {
      // *italic*
      parts.push(<em key={`${keyPrefix}-i-${match.index}`}>{match[3]}</em>);
    } else if (match[4] !== undefined && match[5] !== undefined) {
      const linkText = match[4];
      const linkUrl = match[5];
      const isProjectLink = linkUrl.includes("/work/");

      if (isProjectLink) {
        // Tectonic Project Micro-Badge
        parts.push(
          <a
            key={`${keyPrefix}-proj-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "2px 8px",
              margin: "2px 2px",
              borderRadius: "4px",
              backgroundColor: "var(--color-surface-2)",
              border: "1px solid rgba(168, 83, 42, 0.3)",
              color: "var(--color-accent)",
              fontWeight: 600,
              fontSize: "12px",
              textDecoration: "none",
              transition: "all var(--dur-fast) var(--ease-standard)",
              verticalAlign: "baseline",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-surface)";
              e.currentTarget.style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
              e.currentTarget.style.borderColor = "rgba(168, 83, 42, 0.3)";
            }}
          >
            <span style={{ fontSize: "11px" }}>🏛️</span>
            <span>{linkText}</span>
            <span style={{ fontSize: "10px", opacity: 0.8 }} aria-hidden="true">
              ↗
            </span>
          </a>
        );
      } else {
        // Standard External / Monograph Link
        parts.push(
          <a
            key={`${keyPrefix}-a-${match.index}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-accent)",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              wordBreak: "break-word",
            }}
          >
            <span>{linkText}</span>
            <span style={{ fontSize: "11px", opacity: 0.8 }} aria-hidden="true">
              ↗
            </span>
          </a>
        );
      }
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Converts markdown text from Ermi Arch AI into structured React nodes.
 * Handles paragraphs, lists with architectural glyphs, and inline tokens.
 */
function renderMarkdown(text: string): React.ReactNode {
  const blocks = text.split(/\n{2,}/);

  return blocks.map((block, blockIdx) => {
    const lines = block.split("\n");

    const isList =
      lines.length > 0 &&
      lines.every((line) => /^\s*[*\-]\s+/.test(line) || line.trim() === "");

    if (isList) {
      const items = lines.filter((line) => /^\s*[*\-]\s+/.test(line));
      return (
        <ul
          key={`bl-${blockIdx}`}
          style={{
            margin: "6px 0",
            paddingLeft: "18px",
            listStyleType: "square",
          }}
        >
          {items.map((item, itemIdx) => (
            <li
              key={`li-${blockIdx}-${itemIdx}`}
              style={{
                marginBottom: "4px",
                lineHeight: 1.5,
              }}
            >
              {parseInlineMarkdown(
                item.replace(/^\s*[*\-]\s+/, ""),
                `li-${blockIdx}-${itemIdx}`
              )}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={`p-${blockIdx}`} style={{ margin: "5px 0", lineHeight: 1.6 }}>
        {lines.map((line, lineIdx) => (
          <React.Fragment key={`ln-${blockIdx}-${lineIdx}`}>
            {lineIdx > 0 && <br />}
            {parseInlineMarkdown(line, `ln-${blockIdx}-${lineIdx}`)}
          </React.Fragment>
        ))}
      </p>
    );
  });
}

/**
 * Ermi Arch AI — Floating Studio Intelligence Console
 *
 * Implements architectural monograph intelligence:
 * - Named strictly as Ermi Arch AI.
 * - Fluid mobile responsiveness (auto-adjusts to full mobile viewport with 100dvh).
 * - Desktop expandable console mode (420px compact ↔ 640px wide workstation).
 * - Horizontal swipeable quick-inquiry chips saving vertical chat space.
 * - Interactive architectural project micro-cards for linked case studies.
 * - Live studio status indicator (AAU EiABC · UTC+3).
 */
export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hello! I am **Ermi Arch AI**, the architectural studio assistant for **${portfolio.owner.name}** (${portfolio.owner.statusLine} at ${portfolio.owner.school}). How can I assist you with his projects, design philosophy, or skills today?`,
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const idCounter = React.useRef(0);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  React.useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputValue).trim();
    if (!message || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${++idCounter.current}`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${++idCounter.current}`,
            role: "assistant",
            content: data.reply,
          },
        ]);
      } else {
        const errorMsg =
          data.error ||
          "I apologize, but I am temporarily unable to answer. Please try again shortly.";
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-err-${++idCounter.current}`,
            role: "assistant",
            content: errorMsg,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-neterr-${++idCounter.current}`,
          role: "assistant",
          content:
            "A network issue occurred while connecting to the studio assistant. Please check your connection and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        id: "initial-welcome",
        role: "assistant",
        content: `Hello! I am **Ermi Arch AI**, the architectural studio assistant for **${portfolio.owner.name}**. How can I help you today?`,
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Badge on Bottom-Right */}
      <div
        style={{
          position: "fixed",
          bottom: "clamp(16px, 2.5vw, 24px)",
          right: "clamp(16px, 2.5vw, 24px)",
          zIndex: 990,
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Ermi Arch AI Assistant" : "Open Ermi Arch AI Assistant"}
          onClick={() => setIsOpen((prev) => !prev)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            padding: "9px 18px",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: isOpen
              ? "1px solid var(--color-accent)"
              : "var(--border-hairline)",
            borderRadius: "9999px",
            boxShadow: "0 8px 24px -4px rgba(0, 0, 0, 0.18)",
            color: "var(--color-text)",
            cursor: "pointer",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "12.5px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            transition:
              "all var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-accent)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            if (!isOpen) {
              e.currentTarget.style.borderColor = "var(--border-hairline)";
            }
            e.currentTarget.style.transform = "none";
          }}
        >
          {/* Pulsing Status Indicator Dot */}
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 0 8px var(--color-accent)",
              animation: "aiPulse 2s infinite ease-in-out",
            }}
          />

          <span>Ermi Arch AI</span>

          <span
            style={{
              fontSize: "11px",
              color: "var(--color-accent)",
              opacity: 0.85,
            }}
            aria-hidden="true"
          >
            {isOpen ? "✕" : "✦"}
          </span>
        </button>
      </div>

      {/* Floating Chat Drawer Console */}
      <div
        className={`ai-chat-drawer ${isExpanded ? "is-expanded" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Ermi Arch AI Studio Assistant"
        style={{
          position: "fixed",
          bottom: "clamp(76px, 8vw, 84px)",
          right: "clamp(16px, 2.5vw, 24px)",
          zIndex: 995,
          width: isExpanded
            ? "min(calc(100vw - 32px), 640px)"
            : "min(calc(100vw - 32px), 420px)",
          height: "min(630px, calc(100dvh - 110px))",
          backgroundColor: "var(--color-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "var(--border-hairline)",
          borderRadius: "var(--radius-lg, 16px)",
          boxShadow: "0 20px 48px -8px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "translate3d(0, 0, 0) scale(1)"
            : "translate3d(0, 20px, 0) scale(0.97)",
          transition:
            "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.3s",
          willChange: "width, transform, opacity",
        }}
      >
        {/* Console Header */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "var(--border-hairline)",
            backgroundColor: "var(--color-surface-2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
            {/* Architectural Compass / Caliper Icon */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                backgroundColor: "var(--color-surface)",
                border: "var(--border-hairline)",
                color: "var(--color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="4" r="2" />
                <path d="M12 6L4 21" />
                <path d="M12 6L20 21" />
                <path d="M7 16h10" />
              </svg>
            </div>

            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display), serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  Ermi Arch AI
                </h3>
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    boxShadow: "0 0 6px #10b981",
                  }}
                  title="Studio Intelligence Online"
                />
              </div>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono, monospace)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Studio Intelligence · AAU EiABC · UTC+3
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "4px", alignItems: "center", flexShrink: 0 }}>
            {/* Expand / Minimize Toggle (Hidden on Mobile via CSS) */}
            <button
              type="button"
              className="ai-expand-btn"
              onClick={() => setIsExpanded((prev) => !prev)}
              title={isExpanded ? "Collapse console width" : "Expand console width"}
              aria-label={isExpanded ? "Collapse width" : "Expand width"}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: "6px 8px",
                borderRadius: "6px",
                fontSize: "14px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color var(--dur-fast) var(--ease-standard)",
              }}
            >
              {isExpanded ? "⤡" : "⤢"}
            </button>

            {/* Restart Conversation */}
            <button
              type="button"
              aria-label="Restart conversation"
              onClick={handleRestart}
              title="Restart conversation"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: "6px 8px",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              ↺
            </button>

            {/* Close Assistant */}
            <button
              type="button"
              aria-label="Close Assistant"
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text)",
                cursor: "pointer",
                padding: "6px 8px",
                borderRadius: "6px",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages Scroll Area */}
        <div
          style={{
            flex: "1 1 auto",
            minHeight: 0,
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            scrollbarWidth: "thin",
          }}
        >
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: isExpanded ? "80%" : "88%",
                    padding: "10px 14px",
                    borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    backgroundColor: isUser ? "var(--color-accent)" : "var(--color-surface)",
                    color: isUser ? "var(--color-on-accent)" : "var(--color-text)",
                    border: isUser ? "none" : "var(--border-hairline)",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                    wordBreak: "break-word",
                  }}
                >
                  {isUser ? msg.content : <div>{renderMarkdown(msg.content)}</div>}
                </div>
              </div>
            );
          })}

          {/* Typing Drafting Indicator */}
          {isLoading && (
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: "16px 16px 16px 2px",
                  backgroundColor: "var(--color-surface)",
                  border: "var(--border-hairline)",
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                }}
              >
                <span className="ai-dot" />
                <span className="ai-dot" />
                <span className="ai-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Fluid Horizontal Quick-Inquiry Chips */}
        <div
          className="ai-chips-scroll"
          style={{
            padding: "6px 12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
            flexShrink: 0,
            minHeight: "44px",
            height: "44px",
            boxSizing: "border-box",
          }}
        >
          {QUICK_INQUIRY_CHIPS.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleSendMessage(chip.query)}
              disabled={isLoading}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0 12px",
                height: "28px",
                lineHeight: "26px",
                borderRadius: "9999px",
                backgroundColor: "var(--color-surface)",
                border: "var(--border-hairline)",
                color: "var(--color-text)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
                transition: "all var(--dur-fast) var(--ease-standard)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hairline)";
                e.currentTarget.style.color = "var(--color-text)";
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: "10px 14px",
            borderTop: "var(--border-hairline)",
            backgroundColor: "var(--color-surface-2)",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about projects, BIM workflows, philosophy..."
            disabled={isLoading}
            maxLength={600}
            style={{
              flexGrow: 1,
              padding: "10px 14px",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "9999px",
              color: "var(--color-text)",
              fontSize: "13px",
              outline: "none",
              transition: "border-color var(--dur-fast) var(--ease-standard)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border-hairline)";
            }}
          />

          <button
            type="button"
            aria-label="Send message"
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: inputValue.trim() ? "var(--color-accent)" : "var(--color-surface)",
              color: inputValue.trim() ? "var(--color-on-accent)" : "var(--color-text-muted)",
              border: "var(--border-hairline)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: inputValue.trim() ? "pointer" : "default",
              transition: "all var(--dur-fast) var(--ease-standard)",
              flexShrink: 0,
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scoped CSS for Keyframes, Scrollbar & Mobile Responsiveness */}
      <style>{`
        @keyframes aiPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.6;
          }
        }

        .ai-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--color-accent);
          display: inline-block;
          animation: dotBlink 1.4s infinite ease-in-out both;
        }

        .ai-dot:nth-child(1) { animation-delay: -0.32s; }
        .ai-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes dotBlink {
          0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }

        .ai-chips-scroll {
          flex-shrink: 0 !important;
          min-height: 44px !important;
          height: 44px !important;
        }

        .ai-chips-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Mobile viewport responsiveness */
        @media (max-width: 640px) {
          .ai-chat-drawer {
            left: 12px !important;
            right: 12px !important;
            bottom: 68px !important;
            width: auto !important;
            height: min(560px, calc(100dvh - 84px)) !important;
          }
          .ai-expand-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
