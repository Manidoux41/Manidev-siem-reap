"use client";

import { FormEvent, useState } from "react";
import { getMessages, type SiteLocale } from "@/lib/i18n";

export function ContactForm({ locale }: { locale: SiteLocale }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const messages = getMessages(locale);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setMessage("");
    setIsError(false);
    setIsSubmitting(true);

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setIsError(true);
        setMessage(
          response.status === 429
            ? messages.contact.errors.rateLimit
            : response.status === 503
              ? messages.contact.errors.unavailable
              : response.status >= 500
                ? messages.contact.errors.failed
                : messages.contact.errors.rejected,
        );
        return;
      }
      form.reset();
      setMessage(messages.contact.sent);
    } catch {
      setIsError(true);
      setMessage(messages.contact.errors.network);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          {messages.contact.yourName}
          <input name="name" autoComplete="name" required minLength={2} maxLength={100} />
        </label>
        <label>
          {messages.contact.yourEmail}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        {messages.contact.subject}
        <input name="subject" required minLength={3} maxLength={160} />
      </label>
      <label>
        {messages.contact.yourMessage}
        <textarea name="message" rows={5} required minLength={20} maxLength={5000} />
      </label>
      <label className="honeypot" aria-hidden="true">
        Site web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="contact-submit-row">
        <p>{messages.contact.privacy}</p>
        <button className="button button-dark" type="submit" disabled={isSubmitting}>
          {isSubmitting ? messages.contact.sending : messages.contact.send}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className={`form-feedback${isError ? " is-error" : ""}`} role="status" aria-live="polite">
        {message}
      </p>
    </form>
  );
}
