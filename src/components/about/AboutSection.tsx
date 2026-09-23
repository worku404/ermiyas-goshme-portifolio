import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SkillsList } from "./SkillsList";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";
import portfolio from "@/../content/portfolio.json";

export interface AboutSectionProps {
  variant?: "summary" | "full";
}

/**
 * AboutSection component presenting the author's academic identity and architectural philosophy.
 *
 * Implements acceptance rules per docs/04-component-inventory.md:
 * - Content fidelity: renders biography verbatim from portfolio.json.
 * - Full variant lists education, architectural interests, software tools, and languages — nothing omitted.
 * - Displays official profile portrait with explicit dimensions to prevent CLS.
 */
export function AboutSection({
  variant = "full",
}: AboutSectionProps) {
  const t = useTranslations("aboutPage");
  const isFull = variant === "full";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(var(--space-8), 6vw, var(--space-16))",
        paddingTop: isFull ? "clamp(var(--space-6), 4vw, var(--space-10))" : 0,
        paddingBottom: isFull ? "clamp(var(--space-10), 8vw, var(--space-20))" : 0,
      }}
    >
      {/* Top Section: Portrait & Verbatim Biography */}
      <section
        aria-labelledby="about-bio-heading"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
          gap: "clamp(var(--space-6), 5vw, var(--space-12))",
          alignItems: "start",
        }}
      >
        {/* Owner Portrait Column */}
        <div
          style={{
            maxWidth: "380px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: "var(--border-hairline)",
              backgroundColor: "var(--color-surface-2)",
              boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Image
              src="/images/owner/profile.png"
              alt={`${portfolio.owner.name} — ${portfolio.owner.role}`}
              fill={true}
              priority={true}
              sizes="(max-width: 768px) 100vw, 380px"
              style={{
                objectFit: "cover",
              }}
            />
          </div>

          {/* Quick Info Card Below Image */}
          <div
            style={{
              marginTop: "var(--space-4)",
              padding: "var(--space-4)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "var(--fs-xs)",
                  color: "var(--color-accent)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {portfolio.owner.statusLine}
              </span>
              <h2
                id="about-bio-heading"
                style={{
                  fontSize: "var(--fs-lg)",
                  fontFamily: "var(--font-display), serif",
                  color: "var(--color-text)",
                  marginTop: "var(--space-1)",
                }}
              >
                {portfolio.owner.name}
              </h2>
            </div>

            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--lh-body)",
                margin: 0,
              }}
            >
              {portfolio.owner.school}
            </p>

            {isFull && (
              <div style={{ marginTop: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <CVDownloadButton variant="compact" />

                {/* Currently Seeking Status Badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "var(--space-2)",
                    padding: "var(--space-2) var(--space-3)",
                    backgroundColor: "var(--color-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    border: "var(--border-hairline)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--fs-xs)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--color-accent)",
                      whiteSpace: "nowrap",
                      lineHeight: 1.6,
                    }}
                  >
                    {t("currentStatusLabel")}
                  </span>
                  <span
                    style={{
                      fontSize: "var(--fs-xs)",
                      color: "var(--color-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {portfolio.owner.currentStatus}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verbatim Biography Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                padding: "var(--space-1) var(--space-3)",
                backgroundColor: "var(--color-surface-2)",
                color: "var(--color-accent)",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "var(--space-3)",
              }}
            >
              {t("bioHeading")}
            </span>
            <h1
              style={{
                fontSize: "clamp(var(--fs-2xl), 4vw, var(--fs-4xl))",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                lineHeight: "var(--lh-heading)",
                letterSpacing: "-0.02em",
                marginBottom: "var(--space-4)",
              }}
            >
              {t("title")}
            </h1>
            <p
              style={{
                fontSize: "var(--fs-md)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--lh-body)",
                maxWidth: "60ch",
              }}
            >
              {t("subtitle")}
            </p>
          </div>

          <div
            style={{
              padding: "var(--space-6) var(--space-8)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            }}
          >
            {/* Sentence 1: Lead Statement */}
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontSize: "clamp(18px, 2vw, 22px)",
                color: "var(--color-text)",
                lineHeight: 1.45,
                fontWeight: 600,
                borderBottom: "var(--border-hairline)",
                paddingBottom: "var(--space-3)",
              }}
            >
              I am a 3rd year architecture student passionate about creating meaningful spaces that respond to people, culture, and the environment.
            </div>

            {/* Sentence 2 */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              Through academic projects and design explorations, I focus on{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                human-centered architecture
              </strong>
              ,{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                contextual understanding
              </strong>
              , and{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                sustainable design approaches
              </strong>
              .
            </p>

            {/* Sentence 3 */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              My design process combines{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                research, conceptual thinking, digital modeling
              </strong>
              , and{" "}
              <strong style={{ color: "var(--color-text)", fontWeight: 600 }}>
                architectural representation
              </strong>{" "}
              to transform ideas into functional and engaging spaces.
            </p>

            {/* Sentence 4 */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              I have developed skills in architectural visualization, 3D modeling, and technical documentation using{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  backgroundColor: "rgba(168, 83, 42, 0.12)",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 83, 42, 0.25)",
                  fontSize: "13px",
                }}
              >
                Revit
              </span>
              ,{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  backgroundColor: "rgba(168, 83, 42, 0.12)",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 83, 42, 0.25)",
                  fontSize: "13px",
                }}
              >
                SketchUp
              </span>
              ,{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  backgroundColor: "rgba(168, 83, 42, 0.12)",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 83, 42, 0.25)",
                  fontSize: "13px",
                }}
              >
                Illustrator
              </span>{" "}
              and{" "}
              <span
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  backgroundColor: "rgba(168, 83, 42, 0.12)",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  border: "1px solid rgba(168, 83, 42, 0.25)",
                  fontSize: "13px",
                }}
              >
                D5 Render
              </span>
              .
            </p>

            {/* Sentence 5 */}
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.75,
                color: "var(--color-text)",
                fontWeight: 500,
                margin: 0,
              }}
            >
              I am eager to learn from professional practice and contribute creative and thoughtful design solutions to real world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Extended Academic & Studio Details (Full Variant) */}
      {isFull && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "clamp(var(--space-6), 4vw, var(--space-8))",
          }}
        >
          {/* Education Block */}
          <div
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <h3
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
              }}
            >
              {t("educationHeading")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              <strong
                style={{
                  fontSize: "var(--fs-base)",
                  color: "var(--color-text)",
                }}
              >
                {portfolio.owner.educationDegree}
              </strong>
              <span
                style={{
                  fontSize: "var(--fs-sm)",
                  color: "var(--color-text-muted)",
                }}
              >
                {portfolio.owner.school}
              </span>
              <span
                style={{
                  fontSize: "var(--fs-xs)",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  marginTop: "var(--space-1)",
                }}
              >
                {portfolio.owner.educationYears}
              </span>
            </div>
          </div>

          {/* Software Skills Block */}
          <div
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <SkillsList
              items={portfolio.owner.software}
              label={t("softwareHeading")}
            />
          </div>

          {/* Architectural Interests Block */}
          <div
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <h3
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
              }}
            >
              {t("interestsHeading")}
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-2)",
              }}
            >
              {portfolio.owner.interests.map((interest) => (
                <li
                  key={interest}
                  style={{
                    fontSize: "var(--fs-sm)",
                    color: "var(--color-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                  }}
                >
                  <span style={{ color: "var(--color-accent)" }} aria-hidden="true">
                    ◈
                  </span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spoken Languages Block */}
          <div
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            <h3
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
              }}
            >
              {t("languagesHeading")}
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                gap: "var(--space-4)",
              }}
            >
              {portfolio.owner.languages.map((language) => (
                <li
                  key={language}
                  style={{
                    padding: "var(--space-2) var(--space-4)",
                    backgroundColor: "var(--color-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "var(--fs-sm)",
                    color: "var(--color-text)",
                    fontWeight: 500,
                  }}
                >
                  {language}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Design Process Section */}
      {isFull && (
        <section
          aria-labelledby="design-process-heading"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <h3
            id="design-process-heading"
            style={{
              fontSize: "var(--fs-xs)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-accent)",
            }}
          >
            {t("processHeading")}
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {portfolio.owner.designProcess.map(
              (item: { step: string; description: string }, idx: number) => (
                <div
                  key={item.step}
                  style={{
                    padding: "var(--space-4) var(--space-5)",
                    backgroundColor: "var(--color-surface)",
                    border: "var(--border-hairline)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      fontSize: "var(--fs-3xl)",
                      fontFamily: "var(--font-display), serif",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      opacity: 0.15,
                      position: "absolute",
                      top: "var(--space-2)",
                      right: "var(--space-3)",
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <strong
                    style={{
                      fontSize: "var(--fs-base)",
                      color: "var(--color-text)",
                      fontWeight: 600,
                    }}
                  >
                    {item.step}
                  </strong>
                  <span
                    style={{
                      fontSize: "var(--fs-sm)",
                      color: "var(--color-text-muted)",
                      lineHeight: "var(--lh-body)",
                    }}
                  >
                    {item.description}
                  </span>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Studio Photo Gallery */}
      {isFull && (
        <section
          aria-labelledby="gallery-heading"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <div>
            <h3
              id="gallery-heading"
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "var(--space-1)",
              }}
            >
              {t("galleryHeading")}
            </h3>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              {t("gallerySubtitle")}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "var(--space-4)",
            }}
          >
            {portfolio.owner.studioGallery.map(
              (photo: { src: string; caption: string }, idx: number) => (
                <div key={`gallery-${idx}`}>
                  {/* Placeholder box — will become next/image when real files are added */}
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      borderRadius: "var(--radius-md)",
                      border: "2px dashed var(--color-border)",
                      backgroundColor: "var(--color-surface-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "var(--space-4)",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "var(--fs-xs)",
                        color: "var(--color-text-muted)",
                        lineHeight: "var(--lh-body)",
                      }}
                    >
                      {t("galleryPlaceholder")}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: "var(--space-2)",
                      fontSize: "var(--fs-xs)",
                      color: "var(--color-text-muted)",
                      lineHeight: "var(--lh-body)",
                      margin: "var(--space-2) 0 0 0",
                    }}
                  >
                    {photo.caption}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Achievements & Certificates */}
      {isFull && (
        <section
          aria-labelledby="achievements-heading"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <div>
            <h3
              id="achievements-heading"
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
                marginBottom: "var(--space-1)",
              }}
            >
              {t("achievementsHeading")}
            </h3>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              {t("achievementsSubtitle")}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-3)",
            }}
          >
            {portfolio.owner.achievements.map(
              (
                item: {
                  title: string;
                  issuer: string;
                  year: string;
                  description: string;
                },
                idx: number
              ) => (
                <div
                  key={`achievement-${idx}`}
                  style={{
                    padding: "var(--space-5) var(--space-6)",
                    backgroundColor: "var(--color-surface)",
                    border: "var(--border-hairline)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--space-2)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "var(--space-2)",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "var(--fs-base)",
                        color: "var(--color-text)",
                        fontWeight: 600,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.title}
                    </strong>
                    <span
                      style={{
                        fontSize: "var(--fs-xs)",
                        color: "var(--color-accent)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "var(--fs-xs)",
                      color: "var(--color-text-muted)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item.issuer}
                  </span>
                  <p
                    style={{
                      fontSize: "var(--fs-sm)",
                      color: "var(--color-text-muted)",
                      lineHeight: "var(--lh-body)",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* CV CTA Bottom Prompt */}
      {isFull && (
        <section
          style={{
            padding: "var(--space-8)",
            backgroundColor: "var(--color-surface)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-md)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "var(--fs-lg)",
                fontFamily: "var(--font-display), serif",
                color: "var(--color-text)",
                marginBottom: "var(--space-1)",
              }}
            >
              {t("cvPrompt")}
            </h3>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              {portfolio.owner.name} • {portfolio.owner.statusLine} • {portfolio.owner.school}
            </p>
          </div>

          <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
            <Link
              href="/cv"
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-accent)",
                textDecoration: "underline",
                fontWeight: 600,
                padding: "var(--space-2) var(--space-3)",
              }}
            >
              View CV Details →
            </Link>
            <CVDownloadButton variant="primary" label={t("downloadCv")} />
          </div>
        </section>
      )}
    </div>
  );
}
