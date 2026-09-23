"use client";

import * as React from "react";
import portfolio from "@/../content/portfolio.json";

/**
 * Curated Pool of the Top 9 Most Frequent Architecture Portfolio Questions
 *
 * Sourced from architectural recruiter and visitor interaction patterns:
 * 1. Background & Identity
 * 2. Academic Institution & Degree
 * 3. Software & BIM Tooling
 * 4. Star Competition Project (Church)
 * 5. Heritage Architecture (Palace)
 * 6. Sustainable & Climate-Responsive Design
 * 7. Internship & Collaboration Availability
 * 8. Direct Contact & CV
 * 9. Architectural Wit & Jokes
 */
const FAQ_PROMPT_POOL = [
  "Who is Ermiyas and what is his design philosophy?",
  "Where does Ermiyas study and what is his degree?",
  "What architecture software and BIM tools does he use?",
  "Tell me about his Ethiopian Orthodox Church competition project.",
  "What heritage architecture projects has he worked on?",
  "How does he approach sustainable & climate-responsive design?",
  "Is Ermiyas available for internships or collaborations?",
  "How can I contact Ermiyas directly or view his CV?",
  "Tell me an architectural joke or design quote!",
];

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/**
 * Parses inline markdown (bold, italic, links) into React nodes.
 * Handles: **bold**, *italic*, [text](url)
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
      parts.push(
        <strong key={`${keyPrefix}-b-${match.index}`}>{match[2]}</strong>
      );
    } else if (match[3] !== undefined) {
      // *italic*
      parts.push(
        <em key={`${keyPrefix}-i-${match.index}`}>{match[3]}</em>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      // [text](url)
      parts.push(
        <a
          key={`${keyPrefix}-a-${match.index}`}
          href={match[5]}
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
          <span>{match[4]}</span>
          <span style={{ fontSize: "11px", opacity: 0.8 }} aria-hidden="true">
            ↗
          </span>
        </a>
      );
    }

    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

/**
 * Converts markdown text from the AI into structured React nodes.
 * Handles paragraphs (double newlines), bullet lists (* / -),
 * and inline formatting (bold, italic, links).
 */
function renderMarkdown(text: string): React.ReactNode {
  const blocks = text.split(/\n{2,}/);

  return blocks.map((block, blockIdx) => {
    const lines = block.split("\n");

    // Detect if every line in this block is a bullet item
    const isList = lines.length > 0 && lines.every(
      (line) => /^\s*[*\-]\s+/.test(line) || line.trim() === ""
    );

    if (isList) {
      const items = lines.filter((line) => /^\s*[*\-]\s+/.test(line));
      return (
        <ul
          key={`bl-${blockIdx}`}
          style={{
            margin: "6px 0",
            paddingLeft: "18px",
            listStyleType: "disc",
          }}
        >
          {items.map((item, itemIdx) => (
            <li key={`li-${blockIdx}-${itemIdx}`} style={{ marginBottom: "3px" }}>
              {parseInlineMarkdown(
                item.replace(/^\s*[*\-]\s+/, ""),
                `li-${blockIdx}-${itemIdx}`
              )}
            </li>
          ))}
        </ul>
      );
    }

    // Regular paragraph — join lines with <br /> for single newlines
    return (
      <p key={`p-${blockIdx}`} style={{ margin: "4px 0" }}>
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

export function PortfolioAssistant() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>(() => [
    {
      id: "initial-welcome",
      role: "assistant",
      content: `Hello! I am **Ask Ermiyas AI**, the architectural assistant for **${portfolio.owner.name}** (${portfolio.owner.statusLine} at ${portfolio.owner.school}). How can I assist you with his projects, design philosophy, or skills today?`,
    },
  ]);
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const idCounter = React.useRef(0);
  const [prompts, setPrompts] = React.useState<string[]>(() => FAQ_PROMPT_POOL.slice(0, 3));
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const randomizePrompts = React.useCallback(() => {
    const shuffled = [...FAQ_PROMPT_POOL].sort(() => 0.5 - Math.random());
    setPrompts(shuffled.slice(0, 3));
  }, []);

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

  return (
    <>
      {/* Floating Trigger Badge on Right Edge (Like Next.js N Badge) */}
      <div
        style={{
          position: "fixed",
          bottom: "clamp(20px, 3vw, 28px)",
          right: "clamp(20px, 3vw, 28px)",
          zIndex: 990,
          pointerEvents: "auto",
        }}
      >
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Ask Ermiyas AI Assistant" : "Open Ask Ermiyas AI Assistant"}
          onClick={() => {
            setIsOpen((prev) => {
              const next = !prev;
              if (next) {
                randomizePrompts();
              }
              return next;
            });
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 18px",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: isOpen
              ? "1px solid var(--color-accent)"
              : "1px solid var(--border-hairline)",
            borderRadius: "9999px",
            boxShadow: "var(--shadow-lg)",
            color: "var(--color-text)",
            cursor: "pointer",
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "13px",
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
          {/* Pulsing Status Dot */}
          <span
            style={{
              width: "9px",
              height: "9px",
              borderRadius: "50%",
              backgroundColor: "var(--color-accent)",
              boxShadow: "0 0 10px var(--color-accent)",
              animation: "aiPulse 2s infinite ease-in-out",
            }}
          />

          <span>Ask Ermiyas AI</span>

          <span
            style={{
              fontSize: "12px",
              color: "var(--color-accent)",
              opacity: 0.8,
            }}
            aria-hidden="true"
          >
            {isOpen ? "✕" : "✦"}
          </span>
        </button>
      </div>

      {/* Floating Chat Drawer with Down-to-Up Transition */}
      <div
        className="ai-chat-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Ask Ermiyas AI Studio Assistant"
        style={{
          position: "fixed",
          bottom: "clamp(80px, 9vw, 92px)",
          right: "clamp(16px, 3vw, 28px)",
          zIndex: 995,
          width: "min(calc(100vw - 32px), 430px)",
          height: "min(630px, calc(100dvh - 120px))",
          backgroundColor: "var(--color-bg)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid var(--border-hairline)",
          borderRadius: "var(--radius-lg, 20px)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          pointerEvents: isOpen ? "auto" : "none",
          visibility: isOpen ? "visible" : "hidden",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "translate3d(0, 0, 0) scale(1)"
            : "translate3d(0, 24px, 0) scale(0.96)",
          transition:
            "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.35s",
          willChange: "transform, opacity",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "var(--border-hairline)",
            backgroundColor: "var(--color-surface-2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--color-surface-2)",
                border: "var(--border-hairline)",
                color: "var(--color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: 700,
              }}
            >
              ✦
            </div>
            <div>
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
                Ermiyas ArchAI
              </h3>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-mono, monospace)",
                }}
              >
                Studio Assistant · AAU EiABC
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <button
              type="button"
              aria-label="Clear chat messages"
              onClick={() =>
                setMessages([
                  {
                    id: "initial-welcome",
                    role: "assistant",
                    content: `Hello! I am **Ask Ermiyas AI**, the architectural assistant for **${portfolio.owner.name}**. How can I help you today?`,
                  },
                ])
              }
              title="Restart conversation"
              style={{
                background: "transparent",
                border: "none",
                color: "var(--color-text-muted)",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            >
              ↺
            </button>

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
            flexGrow: 1,
            overflowY: "auto",
            padding: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
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
                    maxWidth: "88%",
                    padding: "10px 14px",
                    borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                    backgroundColor: isUser
                      ? "var(--color-accent)"
                      : "var(--color-surface)",
                    color: isUser ? "var(--color-on-accent)" : "var(--color-text)",
                    border: isUser ? "none" : "var(--border-hairline)",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                    boxShadow: "var(--shadow-md)",
                    wordBreak: "break-word",
                  }}
                >
                  {isUser ? (
                    msg.content
                  ) : (
                    <div>{renderMarkdown(msg.content)}</div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
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

        {/* Dynamic 3-Prompt Callouts (Randomized from 9 FAQ items) */}
        {prompts.length > 0 && messages.length <= 3 && !isLoading && (
          <div
            style={{
              padding: "8px 16px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              borderTop: "var(--border-hairline)",
              backgroundColor: "var(--color-surface-2)",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-mono, monospace)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                fontWeight: 700,
              }}
            >
              Suggested Questions:
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
              {prompts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  style={{
                    textAlign: "left",
                    padding: "7px 11px",
                    borderRadius: "8px",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--border-hairline)",
                    color: "var(--color-text-muted)",
                    fontSize: "12px",
                    fontFamily: "var(--font-sans)",
                    cursor: "pointer",
                    transition: "all var(--dur-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.color = "var(--color-text)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-hairline)";
                    e.currentTarget.style.color = "var(--color-text-muted)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                  }}
                >
                  ✦ {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div
          style={{
            padding: "12px 16px",
            borderTop: "var(--border-hairline)",
            backgroundColor: "var(--color-surface-2)",
            display: "flex",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about projects, skills, philosophy..."
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
              backgroundColor: inputValue.trim() ? "var(--color-accent)" : "var(--color-surface-2)",
              color: inputValue.trim() ? "var(--color-on-accent)" : "var(--color-text-muted)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: inputValue.trim() ? "pointer" : "default",
              transition: "all var(--dur-fast) var(--ease-standard)",
              flexShrink: 0,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scoped CSS for Keyframes and Dots */}
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
      `}</style>
    </>
  );
}
