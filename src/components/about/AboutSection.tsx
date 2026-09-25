"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SkillsList } from "./SkillsList";
import { CVDownloadButton } from "@/components/cv/CVDownloadButton";
import portfolio from "@/../content/portfolio.json";
import styles from "./AboutSection.module.css";

export interface AboutSectionProps {
  variant?: "summary" | "full";
}

/**
 * 4 Editorial Pillars deconstructing Ermiyas's architectural philosophy and values.
 */
const ARCHITECTURAL_PILLARS = [
  {
    index: "01 / HERITAGE",
    title: "Cultural Identity & Context",
    description:
      "Deeply rooted in East African spiritual traditions, vernacular craftsmanship, and the historical urban fabric of Addis Ababa.",
  },
  {
    index: "02 / CIVIC",
    title: "Human-Centered Spaces",
    description:
      "Designing responsive public environments prioritizing human scale, spatial dignity, accessibility, and intuitive social flow.",
  },
  {
    index: "03 / TECTONICS",
    title: "Sustainable Vernacular Logic",
    description:
      "Passive microclimatic strategies, natural ventilation, and honest local materiality responding to environmental realities.",
  },
  {
    index: "04 / COMPUTATION",
    title: "Advanced Digital Craft",
    description:
      "Iterative spatial investigation combining parametric BIM workflows, 3D massing, and real-time atmospheric visual communication.",
  },
];

/**
 * AboutSection component presenting Ermiyas Goshme's academic identity,
 * verbatim design philosophy, digital workflow pipeline, and architectural credentials.
 *
 * Publication-grade monograph layout:
 * - Unified Left Identity Monolith with live internship status badge and local timezone.
 * - Bold Editorial Lead Quote + 4 Architectural Pillars.
 * - Disciplined Software Capabilities (BIM, Parametric Massing, Atmospheric Raytracing).
 * - Connected 4-phase Architectural Methodology timeline.
 * - Zero raw placeholder wireframes or unfinished text boxes.
 */
export function AboutSection({ variant = "full" }: AboutSectionProps) {
  const t = useTranslations("aboutPage");
  const isFull = variant === "full";

  // Filter out any placeholder achievements to keep presentation 100% publication-grade
  const verifiedAchievements = portfolio.owner.achievements.filter(
    (item) => !item.title.toLowerCase().includes("placeholder")
  );

  return (
    <div
      className={styles.container}
      style={{
        paddingTop: isFull ? "clamp(var(--space-3), 2vw, var(--space-6))" : 0,
        paddingBottom: isFull ? "clamp(var(--space-10), 8vw, var(--space-20))" : 0,
      }}
    >
      {/* Top Section: Unified Left Identity Monolith & Editorial Narrative */}
      <section aria-labelledby="about-bio-heading" className={styles.topGrid}>
        {/* Left Column: Unified Identity Monolith */}
        <aside className={styles.monolith}>
          {/* Portrait Image Container with Live Status Badge */}
          <div className={styles.portraitWrap}>
            <div className={styles.liveBadge}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span>Available for Architecture Internship</span>
            </div>

            <Image
              src="/images/owner/ermiyas-goshme-hero.jpg"
              alt={`${portfolio.owner.name} — ${portfolio.owner.role}`}
              fill={true}
              priority={true}
              sizes="(max-width: 1024px) 100vw, 360px"
              className={styles.portraitImage}
            />
          </div>

          {/* Monolith Body Details */}
          <div className={styles.monolithBody}>
            <div className={styles.monolithHeader}>
              <span className={styles.roleTag}>{portfolio.owner.statusLine}</span>
              <h2 id="about-bio-heading" className={styles.monolithName}>
                {portfolio.owner.name}
              </h2>
              <p className={styles.schoolText}>{portfolio.owner.school}</p>
            </div>

            {/* Quick Metadata Rows */}
            <div className={styles.metaRows}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Degree</span>
                <span className={styles.metaValue}>{portfolio.owner.educationDegree}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Timeline</span>
                <span className={styles.metaValue}>{portfolio.owner.educationYears}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>Addis Ababa · UTC+3</span>
              </div>
            </div>

            {/* Seeking Status Callout */}
            <div className={styles.seekingBox}>
              <span className={styles.seekingLabel}>Internship Focus</span>
              <p className={styles.seekingText}>{portfolio.owner.currentStatus}</p>
            </div>

            {/* Action Buttons */}
            {isFull && (
              <div className={styles.monolithActions}>
                <CVDownloadButton variant="compact" />
                <Link href="/contact" className={styles.contactDirectLink}>
                  Contact Ermiyas →
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Editorial Architectural Monograph */}
        <div className={styles.editorialCol}>
          <div>
            <span className={styles.editorialPill}>{t("bioHeading")}</span>
            <h1 className={styles.editorialTitle}>{t("title")}</h1>
            <p className={styles.editorialSubtitle}>{t("subtitle")}</p>
          </div>

          {/* Editorial Lead Statement Card */}
          <div className={styles.leadQuoteCard}>
            <blockquote className={styles.leadQuoteText}>
              “I am {/^[aeiou]/i.test(portfolio.owner.statusLine) ? "an" : "a"} {portfolio.owner.statusLine} passionate about creating meaningful spaces that
              respond to people, culture, and the environment.”
            </blockquote>
          </div>

          {/* 4 Architectural Pillars Grid */}
          <div className={styles.pillarsGrid}>
            {ARCHITECTURAL_PILLARS.map((pillar) => (
              <div key={pillar.index} className={styles.pillarCard}>
                <span className={styles.pillarIndex}>{pillar.index}</span>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>

          {/* Verbatim Academic Narrative & Synthesis */}
          <div className={styles.narrativeBox}>
            <div
              style={{
                fontSize: "var(--fs-xs)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--color-accent)",
              }}
            >
              Academic Focus & Practice Statement
            </div>

            <p className={styles.narrativeText}>
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

            <p className={styles.narrativeText}>
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

            <p className={styles.narrativeText}>
              I have developed skills in architectural visualization, 3D modeling, and technical
              documentation using{" "}
              <strong style={{ color: "var(--color-accent)" }}>Revit</strong>,{" "}
              <strong style={{ color: "var(--color-accent)" }}>SketchUp</strong>,{" "}
              <strong style={{ color: "var(--color-accent)" }}>Illustrator</strong> and{" "}
              <strong style={{ color: "var(--color-accent)" }}>D5 Render</strong>.
            </p>

            <p
              className={styles.narrativeText}
              style={{ color: "var(--color-text)", fontWeight: 500 }}
            >
              I am eager to learn from professional practice and contribute creative and thoughtful
              design solutions to real world challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Connected Architectural Methodology Timeline */}
      {isFull && (
        <section aria-labelledby="design-process-heading" className={styles.processSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Methodology</span>
            <h2 id="design-process-heading" className={styles.sectionTitle}>
              {t("processHeading")}
            </h2>
            <p className={styles.sectionSubtitle}>
              An iterative 4-phase architectural workflow translating contextual investigations into
              realized spatial systems.
            </p>
          </div>

          <div className={styles.processTimeline}>
            {portfolio.owner.designProcess.map(
              (item: { step: string; description: string }, idx: number) => (
                <div key={item.step} className={styles.processStepCard}>
                  <div className={styles.processStepHeader}>
                    <span className={styles.processBadge}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    {idx < portfolio.owner.designProcess.length - 1 && (
                      <span className={styles.stepArrow} aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className={styles.stepTitle}>{item.step}</h3>
                  <p className={styles.stepDescription}>{item.description}</p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Software & Digital Production Pipeline */}
      {isFull && (
        <section aria-labelledby="software-pipeline-heading">
          <SkillsList
            items={portfolio.owner.software}
            label={t("softwareHeading")}
            subtitle="Core digital production pipeline for BIM coordination, volumetric massing, and photorealistic raytracing."
          />
        </section>
      )}

      {/* Credentials Grid: Academic Education + Focus Areas + Spoken Languages */}
      {isFull && (
        <section aria-labelledby="credentials-heading" className={styles.credentialsGrid}>
          {/* Education Card */}
          <div className={styles.credentialCard}>
            <h3 id="credentials-heading" className={styles.credentialCardHeader}>
              {t("educationHeading")}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
              <strong
                style={{
                  fontFamily: "var(--font-display), serif",
                  fontSize: "var(--fs-base)",
                  color: "var(--color-text)",
                  fontWeight: 700,
                }}
              >
                {portfolio.owner.educationDegree}
              </strong>
              <span style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)" }}>
                {portfolio.owner.school}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "var(--font-mono, monospace)",
                  color: "var(--color-accent)",
                  fontWeight: 600,
                  marginTop: "var(--space-1)",
                }}
              >
                {portfolio.owner.educationYears} · {portfolio.owner.statusLine}
              </span>
            </div>
            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-text-muted)",
                lineHeight: 1.5,
                margin: "var(--space-2) 0 0 0",
              }}
            >
              Academic coursework focused on architectural design studios, vernacular building
              technologies, urban design analysis, and structural mechanics.
            </p>
          </div>

          {/* Architectural Focus Card */}
          <div className={styles.credentialCard}>
            <h3 className={styles.credentialCardHeader}>{t("interestsHeading")}</h3>
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
                    fontSize: "var(--fs-xs)",
                    color: "var(--color-text)",
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--space-2)",
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: "var(--color-accent)", fontSize: "11px" }} aria-hidden="true">
                    ◈
                  </span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spoken Languages Card */}
          <div className={styles.credentialCard}>
            <h3 className={styles.credentialCardHeader}>{t("languagesHeading")}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <div
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: "var(--color-surface-2)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ fontSize: "var(--fs-xs)", color: "var(--color-text)" }}>
                  English
                </strong>
                <span style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 600 }}>
                  Professional Working
                </span>
              </div>
              <div
                style={{
                  padding: "var(--space-2) var(--space-3)",
                  backgroundColor: "var(--color-surface-2)",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong style={{ fontSize: "var(--fs-xs)", color: "var(--color-text)" }}>
                  Amharic
                </strong>
                <span style={{ fontSize: "11px", color: "var(--color-accent)", fontWeight: 600 }}>
                  Native / Fluent
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recognition & Competition Milestones */}
      {isFull && verifiedAchievements.length > 0 && (
        <section aria-labelledby="achievements-heading" style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Recognition</span>
            <h2 id="achievements-heading" className={styles.sectionTitle}>
              {t("achievementsHeading")}
            </h2>
            <p className={styles.sectionSubtitle}>{t("achievementsSubtitle")}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
            {verifiedAchievements.map((item, idx) => (
              <div key={`achievement-${idx}`} className={styles.recognitionCard}>
                <div className={styles.recognitionHeader}>
                  <h3 className={styles.recognitionTitle}>{item.title}</h3>
                  <span className={styles.recognitionYear}>{item.year}</span>
                </div>
                <span className={styles.recognitionIssuer}>{item.issuer}</span>
                <p className={styles.recognitionDescription}>{item.description}</p>
                <div style={{ marginTop: "var(--space-1)" }}>
                  <Link
                    href="/work/ethiopian-orthodox-church-design"
                    style={{
                      fontSize: "var(--fs-xs)",
                      color: "var(--color-accent)",
                      fontWeight: 600,
                      textDecoration: "underline",
                    }}
                  >
                    View Competition Project Entry in Works →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Architectural Monograph CV CTA */}
      {isFull && (
        <section className={styles.cvCtaSection}>
          <div>
            <h3 className={styles.cvCtaTitle}>{t("cvPrompt")}</h3>
            <p className={styles.cvCtaSubtitle}>
              {portfolio.owner.name} • {portfolio.owner.statusLine} • {portfolio.owner.school}
            </p>
          </div>

          <div className={styles.cvCtaActions}>
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
              Explore Web CV →
            </Link>
            <CVDownloadButton variant="primary" label={t("downloadCv")} />
          </div>
        </section>
      )}
    </div>
  );
}
