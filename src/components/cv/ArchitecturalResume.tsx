"use client";

import * as React from "react";
import Link from "next/link";
import { CVDownloadButton } from "./CVDownloadButton";

export interface ArchitecturalResumeProps {
  owner: {
    name: string;
    role: string;
    statusLine: string;
    school: string;
    educationDegree: string;
    educationYears: string;
    email: string;
    phone: string;
    phoneTelHref: string;
    languages: string[];
    interests: string[];
    software: string[];
    currentStatus: string;
    awards?: Array<{
      title: string;
      issuer: string;
      year: string;
      description?: string;
    }>;
    designProcess?: Array<{
      step: string;
      description: string;
    }>;
    about: string;
  };
  projects: Array<{
    id: number;
    slug: string;
    fullTitle: string;
    type: string;
  }>;
  locale: string;
  downloadLabel: string;
}

export function ArchitecturalResume({
  owner,
  projects,
  locale,
  downloadLabel,
}: ArchitecturalResumeProps) {
  const isAm = locale === "am";
  const [showPdfViewer, setShowPdfViewer] = React.useState(false);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
      {/* =========================================================================
          1. RESUME HEADER & PRIMARY CTAs
          ========================================================================= */}
      <div
        className="resume-card"
        style={{
          padding: "clamp(var(--space-6), 4vw, var(--space-8))",
          backgroundColor: "var(--color-surface)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "var(--border-hairline)",
          borderRadius: "var(--radius-lg, 16px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "var(--space-6)",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "var(--space-3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "11px",
                fontWeight: 700,
                color: "var(--color-accent)",
                backgroundColor: "var(--color-surface-2)",
                padding: "3px 10px",
                borderRadius: "9999px",
                border: "var(--border-hairline)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Curriculum Vitae
            </span>

            {/* Availability Status Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "3px 12px",
                borderRadius: "9999px",
                backgroundColor: "var(--color-surface-2)",
                border: "var(--border-hairline)",
                color: "#10b981",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#10b981",
                  boxShadow: "0 0 8px #10b981",
                }}
              />
              <span style={{ color: "var(--color-text)", fontSize: "11px", fontWeight: 600 }}>
                {isAm
                  ? "ለ2027 የስነ-ህንፃ ስራ ልምምድ ዝግጁ"
                  : "Available for Summer 2027 Internships"}
              </span>
            </div>
          </div>

          <h1
            style={{
              fontSize: "clamp(var(--fs-2xl), 5vw, var(--fs-4xl))",
              fontFamily: "var(--font-display), serif",
              color: "var(--color-text)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 var(--space-2) 0",
            }}
          >
            {owner.name}
          </h1>

          <p
            style={{
              fontSize: "var(--fs-md)",
              color: "var(--color-text-muted)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {owner.statusLine} • <strong style={{ color: "var(--color-text)" }}>{owner.school}</strong>
          </p>

          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--color-accent)",
              fontFamily: "var(--font-mono, monospace)",
              marginTop: "var(--space-2)",
            }}
          >
            Addis Ababa, Ethiopia · UTC+3 (East Africa Time)
          </p>
        </div>

        {/* Action Button Strip (No-print) */}
        <div
          className="no-print"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2)",
            alignItems: "flex-end",
          }}
        >
          <CVDownloadButton variant="primary" label={downloadLabel} />

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print or save as PDF"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "var(--color-surface-2)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-sm, 8px)",
              color: "var(--color-text)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all var(--dur-fast) var(--ease-standard)",
            }}
          >
            <span aria-hidden="true">🖨️</span>
            <span>{isAm ? "ሲቪውን አትም / አስቀምጥ" : "Print / Save Clean Resume"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. TWO-COLUMN ARCHITECTURAL MONOGRAPH RESUME
          ========================================================================= */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "var(--space-8)",
          alignItems: "start",
        }}
      >
        {/* =========================================================================
            LEFT COLUMN: STATEMENT, EDUCATION, COMPETITIONS & FEATURED PROJECTS
            ========================================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Architectural Philosophy & Candidate Statement */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              {isAm ? "የንድፍ ፍልስፍና እና ራዕይ" : "Architectural Philosophy & Focus"}
            </h2>
            <p
              style={{
                fontSize: "var(--fs-sm)",
                color: "var(--color-text)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {owner.about}
            </p>
          </section>

          {/* Academic Education */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              {isAm ? "የትምህርት ደረጃ" : "Academic Education"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                <strong style={{ fontSize: "var(--fs-md)", color: "var(--color-text)", fontFamily: "var(--font-display), serif" }}>
                  {owner.educationDegree}
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                  }}
                >
                  {owner.educationYears}
                </span>
              </div>

              <span style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-muted)" }}>
                {owner.school}
              </span>

              <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", lineHeight: 1.5, marginTop: "var(--space-1)" }}>
                {isAm
                  ? "የ5 አመት ፕሮፌሽናል የስነ-ህንፃ ፕሮግራም · በአካባቢ-ተስማሚ ንድፍ፣ በባህላዊ ቅርስ ጥበቃ እና በቴክኖሎጂ ላይ ያተኮረ።"
                  : "5-Year Professional Architecture Curriculum covering Contextual Design, Climate-Responsive Systems, Heritage Conservation & Advanced BIM."}
              </p>
            </div>
          </section>

          {/* Design Competitions & Honors */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              {isAm ? "የውድድር እና የእውቅና መዛግብት" : "Design Competitions & Awards"}
            </h2>

            {owner.awards && owner.awards.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                {owner.awards
                  .filter((a) => !a.title.includes("PLACEHOLDER"))
                  .map((award, idx) => (
                    <div
                      key={idx}
                      style={{
                        paddingBottom: idx === 0 ? "var(--space-3)" : 0,
                        borderBottom: idx === 0 ? "var(--border-hairline)" : "none",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                        <strong style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)" }}>
                          🏆 {award.title}
                        </strong>
                        <span style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", color: "var(--color-accent)" }}>
                          {award.year}
                        </span>
                      </div>
                      <span style={{ fontSize: "12px", color: "var(--color-text-muted)", display: "block", marginTop: "2px" }}>
                        Issued by: {award.issuer}
                      </span>
                      {award.description && (
                        <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text-muted)", margin: "var(--space-1) 0 0", lineHeight: 1.5 }}>
                          {award.description}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </section>

          {/* Selected Architectural Projects Highlight */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              {isAm ? "ተለይተው የቀረቡ የስቱዲዮ ስራዎች" : "Selected Architectural Case Studies"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {projects.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm, 8px)",
                    backgroundColor: "var(--color-surface-2)",
                    border: "var(--border-hairline)",
                    textDecoration: "none",
                    transition: "all var(--dur-fast) var(--ease-standard)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.backgroundColor = "var(--color-surface-2)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text)" }}>
                      {p.fullTitle}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                      {p.type}
                    </span>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--color-accent)", fontWeight: 600 }}>
                    Inspect →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: TECHNICAL STACK, DISCIPLINES, WORKFLOW & CONTACT
            ========================================================================= */}
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          {/* Software & Digital Stack */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              {isAm ? "የዲጂታል እና የሶፍትዌር ክህሎቶች" : "Digital & Technical Software Stack"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {[
                { name: "Revit", category: "BIM & Technical Documentation", icon: "📐" },
                { name: "SketchUp", category: "3D Massing & Spatial Form Finding", icon: "🏢" },
                { name: "D5 Render", category: "Photorealistic Raytraced Lighting & Visualization", icon: "✨" },
                { name: "Adobe Illustrator", category: "Architectural Diagrams & Editorial Boards", icon: "🎨" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm, 8px)",
                    backgroundColor: "var(--color-surface-2)",
                    border: "var(--border-hairline)",
                  }}
                >
                  <span style={{ fontSize: "16px" }} aria-hidden="true">
                    {tool.icon}
                  </span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-text)" }}>
                      {tool.name}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                      {tool.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Architectural Core Disciplines & Interests */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-4) 0",
              }}
            >
              {isAm ? "የስነ-ህንፃ ዋና ዘርፎች" : "Core Architectural Focus & Research"}
            </h2>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {owner.interests.map((interest) => (
                <span
                  key={interest}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "9999px",
                    backgroundColor: "var(--color-surface-2)",
                    border: "var(--border-hairline)",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--color-text)",
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Design Workflow & Methodology */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              {isAm ? "የስራ ሂደት እና ቅደም-ተከተል" : "Design Methodology"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {(owner.designProcess || [
                { step: "Research", description: "Site analysis, precedent investigation, cultural context" },
                { step: "Concept", description: "Parti diagrams, spatial narratives, programmatic form" },
                { step: "Modeling", description: "3D massing in SketchUp & Revit, technical detailing" },
                { step: "Representation", description: "D5 raytraced visualization, architectural boards" },
              ]).map((proc, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono, monospace)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      marginTop: "1px",
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <div>
                    <strong style={{ fontSize: "12px", color: "var(--color-text)", display: "block" }}>
                      {proc.step}
                    </strong>
                    <span style={{ fontSize: "11px", color: "var(--color-text-muted)", lineHeight: 1.4 }}>
                      {proc.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Languages & Communication */}
          <section
            className="resume-card"
            style={{
              padding: "var(--space-6)",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontSize: "12px",
                fontFamily: "var(--font-mono, monospace)",
                fontWeight: 700,
                color: "var(--color-accent)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 var(--space-3) 0",
              }}
            >
              {isAm ? "ቋንቋዎች" : "Languages & Communication"}
            </h2>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div>
                <strong style={{ fontSize: "13px", color: "var(--color-text)", display: "block" }}>
                  Amharic
                </strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                  Native Fluency
                </span>
              </div>
              <div style={{ borderLeft: "var(--border-hairline)", paddingLeft: "16px" }}>
                <strong style={{ fontSize: "13px", color: "var(--color-text)", display: "block" }}>
                  English
                </strong>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)" }}>
                  Professional Working Fluency
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================================================
          3. COLLAPSIBLE SOURCE DOCUMENT VIEWER (PREVENTS BROKEN MOBILE IFRAMES)
          ========================================================================= */}
      <section className="no-print" style={{ marginTop: "var(--space-6)" }}>
        <button
          type="button"
          onClick={() => setShowPdfViewer((prev) => !prev)}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            backgroundColor: "var(--color-surface)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "var(--border-hairline)",
            borderRadius: "var(--radius-md, 12px)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
            color: "var(--color-text)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            transition: "all var(--dur-fast) var(--ease-standard)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span>📄</span>
            <span>
              {showPdfViewer
                ? isAm
                  ? "የፒዲኤፍ ሰነዱን መመልከቻ ደብቅ"
                  : "Hide Source PDF Document Viewer"
                : isAm
                  ? "የሙሉ ፒዲኤፍ ሰነዱን መመልከቻ ክፈት (18 ገጾች)"
                  : "Preview Full Source PDF Document (18 Pages)"}
            </span>
          </div>
          <span style={{ color: "var(--color-accent)", fontSize: "14px" }}>
            {showPdfViewer ? "▲" : "▼"}
          </span>
        </button>

        {showPdfViewer && (
          <div
            style={{
              marginTop: "var(--space-3)",
              width: "100%",
              height: "clamp(550px, 75vh, 850px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-md, 12px)",
              overflow: "hidden",
              backgroundColor: "var(--color-surface-2)",
            }}
          >
            <object
              data="/cv/Ermiyas-Goshme-CV.pdf"
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ display: "block" }}
            >
              <div
                style={{
                  padding: "var(--space-12) var(--space-6)",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--space-4)",
                }}
              >
                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
                  Your device browser does not support inline PDF viewing. Please download directly:
                </p>
                <CVDownloadButton variant="primary" label={downloadLabel} />
              </div>
            </object>
          </div>
        )}
      </section>
    </div>
  );
}
