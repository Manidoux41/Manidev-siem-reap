"use client";

import { type FormEvent, useState } from "react";
import type { SiteLocale } from "@/lib/i18n";
import { readResponse } from "@/lib/read-response";
import { testimonialMessages } from "@/lib/testimonial-messages";

export function TestimonialForm({ locale, projects, available }: {
  locale: SiteLocale;
  projects: { id: string; title: string }[];
  available: boolean;
}) {
  const messages = testimonialMessages[locale];
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setFeedback("");
    setError(false);
    let status = 0;
    try {
      const response = await fetch("/api/v1/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: data.get("projectId"),
          displayName: data.get("displayName"),
          testimony: data.get("testimony"),
          publicationConsent: data.get("publicationConsent") === "on",
          website: data.get("website"),
        }),
      });
      status = response.status;
      const result = await readResponse<{ status: string }>(response);
      if (status !== 201 || result.status !== "PENDING") throw new Error("Unconfirmed submission");
      form.reset();
      setFeedback(messages.saved);
    } catch {
      setError(true);
      setFeedback(status === 429 ? messages.limited : status === 503 ? messages.unavailable
        : status >= 400 && status < 500 ? messages.rejected : messages.failed);
    } finally {
      setBusy(false);
    }
  }

  if (!available || !projects.length) return <p role="status">{messages.unavailable}</p>;
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={busy}>
      <div className="form-row">
        <label>{messages.name}<input name="displayName" required minLength={2} maxLength={100} autoComplete="nickname" /></label>
        <label>{messages.project}
          <select name="projectId" required defaultValue="">
            <option value="" disabled>{messages.choose}</option>
            {projects.map(project => <option key={project.id} value={project.id}>{project.title}</option>)}
          </select>
        </label>
      </div>
      <label>{messages.testimony}<textarea name="testimony" rows={5} required minLength={20} maxLength={2000} /></label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="testimonial-consent"><input type="checkbox" name="publicationConsent" required />{messages.consent}</label>
      <button className="button button-dark" type="submit" disabled={busy}>{busy ? messages.sending : messages.send}</button>
      <p className={`form-feedback${error ? " is-error" : ""}`} role="status" aria-live="polite">{feedback}</p>
    </form>
  );
}
