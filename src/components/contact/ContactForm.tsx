"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

export interface ContactFormProps {
  accessKey?: string;
  embedded?: boolean;
}

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * Modern Accessible Web3Forms client-side contact form.
 *
 * Implements:
 * - Ultra-modern distraction-free architectural styling with interactive click and focus states.
 * - Client-side POST to https://api.web3forms.com/submit with honeypot anti-spam.
 * - Inline validation with error highlighting and aria-describedby accessibility.
 * - Support for standalone card and embedded (split-column) layouts.
 */
export function ContactForm({ accessKey, embedded = false }: ContactFormProps) {
  const t = useTranslations("contactPage");

  const [values, setValues] = React.useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    botcheck: false,
  });

  const [errors, setErrors] = React.useState<FormErrors>({});
  const [status, setStatus] = React.useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = React.useState<string>("");

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const messageInputRef = React.useRef<HTMLTextAreaElement>(null);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = t("requiredName");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = t("requiredEmail");
    }

    if (!values.message.trim()) {
      nextErrors.message = t("requiredMessage");
    }

    setErrors(nextErrors);

    if (nextErrors.name) {
      nameInputRef.current?.focus();
    } else if (nextErrors.email) {
      emailInputRef.current?.focus();
    } else if (nextErrors.message) {
      messageInputRef.current?.focus();
    }

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check: silent rejection for bots
    if (values.botcheck) {
      setStatus("success");
      setStatusMessage(t("successMessage"));
      return;
    }

    if (!validate()) {
      setStatusMessage("Form has validation errors. Please check the required fields.");
      return;
    }

    setStatus("submitting");
    setStatusMessage(t("submitting"));

    // If no access key is provided in dev, simulate successful submission
    const key = accessKey || process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      setTimeout(() => {
        setStatus("success");
        setStatusMessage(t("successMessage"));
      }, 700);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: key,
          name: values.name,
          email: values.email,
          subject: values.subject || "New Inquiry from Portfolio",
          message: values.message,
          from_name: "Ermiyas Goshme Portfolio",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setStatusMessage(t("successMessage"));
      } else {
        setStatus("error");
        setStatusMessage(result.message || t("errorMessage"));
      }
    } catch {
      setStatus("error");
      setStatusMessage(t("errorMessage"));
    }
  };

  const handleReset = () => {
    setValues({
      name: "",
      email: "",
      subject: "",
      message: "",
      botcheck: false,
    });
    setErrors({});
    setStatus("idle");
    setStatusMessage("");
  };

  return (
    <div
      style={
        embedded
          ? { width: "100%", boxSizing: "border-box" }
          : {
              padding: "clamp(var(--space-6), 4vw, var(--space-8))",
              backgroundColor: "var(--color-surface)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "var(--border-hairline)",
              borderRadius: "var(--radius-lg, 16px)",
              boxSizing: "border-box",
              width: "100%",
            }
      }
    >
      {/* Live Region for Screen Readers */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {statusMessage}
      </div>

      {/* Success State Screen */}
      {status === "success" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "var(--space-8) var(--space-4)",
            gap: "var(--space-4)",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "rgba(168, 83, 42, 0.12)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--fs-2xl)",
              border: "1px solid rgba(168, 83, 42, 0.3)",
            }}
            aria-hidden="true"
          >
            ✓
          </div>

          <h3
            style={{
              fontSize: "var(--fs-xl)",
              fontFamily: "var(--font-display), sans-serif",
              fontWeight: 700,
              color: "var(--color-text)",
              margin: 0,
            }}
          >
            {t("successTitle")}
          </h3>

          <p
            style={{
              fontSize: "var(--fs-sm)",
              color: "var(--color-text-muted)",
              maxWidth: "45ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {t("successMessage")}
          </p>

          {!accessKey && !process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY && (
            <p
              style={{
                fontSize: "var(--fs-xs)",
                color: "var(--color-accent)",
                backgroundColor: "var(--color-surface-2)",
                padding: "var(--space-2) var(--space-3)",
                borderRadius: "9999px",
                margin: 0,
                border: "var(--border-hairline)",
              }}
            >
              {t("mockNotice")}
            </p>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="modern-submit-btn"
            style={{ marginTop: "var(--space-2)" }}
          >
            <span>{t("sendAnother")}</span>
          </button>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {!embedded && (
            <div style={{ marginBottom: "var(--space-2)" }}>
              <h2
                style={{
                  fontSize: "var(--fs-xl)",
                  fontFamily: "var(--font-display), sans-serif",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  marginBottom: "var(--space-1)",
                }}
              >
                {t("formHeading")}
              </h2>
              <p style={{ fontSize: "var(--fs-sm)", color: "var(--color-text-muted)", margin: 0 }}>
                {t("formSubtitle")}
              </p>
            </div>
          )}

          {/* Error Notice if Submission Failed */}
          {status === "error" && (
            <div
              role="alert"
              style={{
                padding: "var(--space-3) var(--space-4)",
                backgroundColor: "rgba(220, 38, 38, 0.08)",
                border: "1px solid rgba(220, 38, 38, 0.4)",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#DC2626", fontSize: "var(--fs-base)" }} aria-hidden="true">
                ⚠️
              </span>
              <div>
                <strong style={{ color: "#DC2626", fontSize: "var(--fs-sm)", display: "block" }}>
                  {t("errorTitle")}
                </strong>
                <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-text)", margin: "var(--space-1) 0 0" }}>
                  {t("errorMessage")}
                </p>
              </div>
            </div>
          )}

          {/* Honeypot Field for anti-spam (invisible to users) */}
          <input
            type="checkbox"
            name="botcheck"
            checked={values.botcheck}
            onChange={(e) => setValues({ ...values, botcheck: e.target.checked })}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Name Input */}
          <div className="modern-field-group">
            <label htmlFor="contact-name" className="modern-field-label">
              <span>{t("nameLabel")}</span>
              <span style={{ color: "var(--color-accent)", fontSize: "12px" }}>*</span>
            </label>
            <input
              ref={nameInputRef}
              id="contact-name"
              name="name"
              type="text"
              required
              aria-required="true"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={values.name}
              onChange={(e) => {
                setValues({ ...values, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder={t("namePlaceholder")}
              className={`modern-input ${errors.name ? "is-error" : ""}`}
            />
            {errors.name && (
              <p id="name-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", margin: "2px 0 0" }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Input */}
          <div className="modern-field-group">
            <label htmlFor="contact-email" className="modern-field-label">
              <span>{t("emailLabel")}</span>
              <span style={{ color: "var(--color-accent)", fontSize: "12px" }}>*</span>
            </label>
            <input
              ref={emailInputRef}
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={values.email}
              onChange={(e) => {
                setValues({ ...values, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder={t("emailPlaceholder")}
              className={`modern-input ${errors.email ? "is-error" : ""}`}
            />
            {errors.email && (
              <p id="email-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", margin: "2px 0 0" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Quick-Select Inquiry Chips */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "11px",
                color: "var(--color-text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Quick Select Topic
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[
                "Architectural Internship",
                "Competition Collaboration",
                "3D Visualization / Rendering",
                "Academic Inquiry",
              ].map((topic) => {
                const isSelected = values.subject === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        subject: isSelected ? "" : topic,
                      }))
                    }
                    style={{
                      padding: "5px 12px",
                      borderRadius: "9999px",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      border: isSelected
                        ? "1px solid var(--color-accent)"
                        : "var(--border-hairline)",
                      backgroundColor: isSelected
                        ? "var(--color-surface-2)"
                        : "transparent",
                      color: isSelected ? "var(--color-accent)" : "var(--color-text)",
                      transition: "all var(--dur-fast) var(--ease-standard)",
                    }}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {topic}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Input */}
          <div className="modern-field-group">
            <label htmlFor="contact-subject" className="modern-field-label">
              <span>{t("subjectLabel")}</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={values.subject}
              onChange={(e) => setValues({ ...values, subject: e.target.value })}
              placeholder={t("subjectPlaceholder")}
              className="modern-input"
            />
          </div>

          {/* Message Textarea */}
          <div className="modern-field-group">
            <label htmlFor="contact-message" className="modern-field-label">
              <span>{t("messageLabel")}</span>
              <span style={{ color: "var(--color-accent)", fontSize: "12px" }}>*</span>
            </label>
            <textarea
              ref={messageInputRef}
              id="contact-message"
              name="message"
              required
              aria-required="true"
              rows={4}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              value={values.message}
              onChange={(e) => {
                setValues({ ...values, message: e.target.value });
                if (errors.message) setErrors({ ...errors, message: undefined });
              }}
              placeholder={t("messagePlaceholder")}
              className={`modern-textarea ${errors.message ? "is-error" : ""}`}
              style={{ resize: "vertical", minHeight: "120px" }}
            />
            {errors.message && (
              <p id="message-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", margin: "2px 0 0" }}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: "var(--space-4)" }}>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="modern-submit-btn"
            >
              {status === "submitting" ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: "13px",
                      height: "13px",
                      border: "2px solid currentColor",
                      borderRightColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                    }}
                    aria-hidden="true"
                  />
                  <span>{t("submitting")}</span>
                </>
              ) : (
                <>
                  <span>{t("submit")}</span>
                  <span className="send-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
