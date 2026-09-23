"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

export interface ContactFormProps {
  accessKey?: string;
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
 * Accessible Web3Forms client-side contact form.
 *
 * Implements acceptance rules per docs/04-component-inventory.md:
 * - Client-side POST to https://api.web3forms.com/submit with honeypot anti-spam protection.
 * - Inline validation with aria-invalid + aria-describedby.
 * - Accessible live region (aria-live="polite") announcing errors and submission progress.
 * - Graceful mock fallback in development if NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is empty.
 */
export function ContactForm({ accessKey }: ContactFormProps) {
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
      style={{
        padding: "clamp(var(--space-6), 4vw, var(--space-8))",
        backgroundColor: "var(--color-surface)",
        border: "var(--border-hairline)",
        borderRadius: "var(--radius-md)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
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
              backgroundColor: "var(--color-surface-2)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--fs-2xl)",
            }}
            aria-hidden="true"
          >
            ✓
          </div>

          <h3
            style={{
              fontSize: "var(--fs-xl)",
              fontFamily: "var(--font-display), serif",
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
              lineHeight: "var(--lh-body)",
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
                borderRadius: "var(--radius-sm)",
                margin: 0,
              }}
            >
              {t("mockNotice")}
            </p>
          )}

          <button
            type="button"
            onClick={handleReset}
            style={{
              marginTop: "var(--space-4)",
              padding: "var(--space-3) var(--space-6)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-on-accent)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontSize: "var(--fs-sm)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t("sendAnother")}
          </button>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h2
              style={{
                fontSize: "var(--fs-xl)",
                fontFamily: "var(--font-display), serif",
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

          {/* Error Notice if Submission Failed */}
          {status === "error" && (
            <div
              role="alert"
              style={{
                marginBottom: "var(--space-6)",
                padding: "var(--space-4)",
                backgroundColor: "var(--color-surface-2)",
                border: "1px solid #DC2626",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "flex-start",
              }}
            >
              <span style={{ color: "#DC2626", fontSize: "var(--fs-lg)" }} aria-hidden="true">
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-5)",
            }}
          >
            {/* Name Input */}
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("nameLabel")} <span style={{ color: "var(--color-accent)" }}>*</span>
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
                style={{
                  width: "100%",
                  padding: "var(--space-3) var(--space-4)",
                  backgroundColor: "var(--color-surface-2)",
                  border: errors.name ? "1px solid #DC2626" : "var(--border-hairline)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  fontSize: "var(--fs-sm)",
                  outline: "none",
                }}
              />
              {errors.name && (
                <p id="name-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", marginTop: "var(--space-1)", margin: "var(--space-1) 0 0" }}>
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: "block",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("emailLabel")} <span style={{ color: "var(--color-accent)" }}>*</span>
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
                style={{
                  width: "100%",
                  padding: "var(--space-3) var(--space-4)",
                  backgroundColor: "var(--color-surface-2)",
                  border: errors.email ? "1px solid #DC2626" : "var(--border-hairline)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  fontSize: "var(--fs-sm)",
                  outline: "none",
                }}
              />
              {errors.email && (
                <p id="email-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", margin: "var(--space-1) 0 0" }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject Input */}
            <div>
              <label
                htmlFor="contact-subject"
                style={{
                  display: "block",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("subjectLabel")}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                value={values.subject}
                onChange={(e) => setValues({ ...values, subject: e.target.value })}
                placeholder={t("subjectPlaceholder")}
                style={{
                  width: "100%",
                  padding: "var(--space-3) var(--space-4)",
                  backgroundColor: "var(--color-surface-2)",
                  border: "var(--border-hairline)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  fontSize: "var(--fs-sm)",
                  outline: "none",
                }}
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: "block",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {t("messageLabel")} <span style={{ color: "var(--color-accent)" }}>*</span>
              </label>
              <textarea
                ref={messageInputRef}
                id="contact-message"
                name="message"
                required
                aria-required="true"
                rows={5}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                value={values.message}
                onChange={(e) => {
                  setValues({ ...values, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: undefined });
                }}
                placeholder={t("messagePlaceholder")}
                style={{
                  width: "100%",
                  padding: "var(--space-3) var(--space-4)",
                  backgroundColor: "var(--color-surface-2)",
                  border: errors.message ? "1px solid #DC2626" : "var(--border-hairline)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text)",
                  fontSize: "var(--fs-sm)",
                  fontFamily: "inherit",
                  outline: "none",
                  resize: "vertical",
                }}
              />
              {errors.message && (
                <p id="message-error" style={{ color: "#DC2626", fontSize: "var(--fs-xs)", margin: "var(--space-1) 0 0" }}>
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "var(--space-2)",
                  padding: "var(--space-3) var(--space-8)",
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-on-accent)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "var(--fs-sm)",
                  fontWeight: 600,
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  opacity: status === "submitting" ? 0.8 : 1,
                  transition: "opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
                }}
              >
                {status === "submitting" ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "14px",
                        height: "14px",
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
                  <span>{t("submit")}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
