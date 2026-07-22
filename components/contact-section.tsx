"use client";

import { AlertCircle, ArrowUpRight, Check } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

type SubmitState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialState: SubmitState = { status: "idle", message: "" };

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>(initialState);
  const { t } = useLanguage();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState({ status: "submitting", message: t.contact.sending });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      await response.json();

      if (!response.ok) {
        throw new Error(t.contact.error);
      }

      form.reset();
      setSubmitState({
        status: "success",
        message: t.contact.successMessage,
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error instanceof Error ? error.message : t.contact.error,
      });
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad">
      <div className="site-container grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-8 text-accent">{t.contact.eyebrow}</p>
          <h2 id="contact-heading" className="display-md max-w-[10ch] text-balance">
            {t.contact.title}
          </h2>
          <p className="body-lg mt-8 text-ink-muted">
            {t.contact.intro}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {submitState.status === "success" ? (
            <div className="flex min-h-[30rem] flex-col justify-between rounded-[var(--radius-card)] bg-forest p-7 text-white sm:p-10" role="status">
              <span className="inline-flex size-14 items-center justify-center rounded-full border border-white/25">
                <Check className="size-5" aria-hidden="true" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="max-w-lg text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
                  {t.contact.successTitle}
                </h3>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/74">
                  {submitState.message}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitState(initialState)}
                  className="mt-8 min-h-12 cursor-pointer rounded-full border border-white/35 px-6 text-sm font-semibold transition-colors hover:bg-white hover:text-forest"
                >
                  {t.contact.another}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
              <div className="field-group">
                <label htmlFor="name">{t.contact.fields.name}</label>
                <input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="field-group">
                <label htmlFor="company">{t.contact.fields.company}</label>
                <input id="company" name="company" autoComplete="organization" />
              </div>
              <div className="field-group">
                <label htmlFor="email">{t.contact.fields.email}</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>
              <div className="field-group">
                <label htmlFor="phone">{t.contact.fields.phone}</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className="field-group">
                <label htmlFor="projectType">{t.contact.fields.type}</label>
                <select id="projectType" name="projectType" defaultValue="" required>
                  <option value="" disabled>{t.contact.fields.selectType}</option>
                  {t.services.items.map((service, index) => <option key={index} value={service.title}>{service.title}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label htmlFor="location">{t.contact.fields.location}</label>
                <input id="location" name="location" autoComplete="address-level2" required />
              </div>
              <div className="field-group sm:col-span-2">
                <label htmlFor="message">{t.contact.fields.message}</label>
                <textarea id="message" name="message" rows={5} required />
              </div>
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">{t.contact.fields.website}</label>
                <input id="website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="sm:col-span-2">
                {submitState.status === "error" ? (
                  <p className="mb-5 flex items-start gap-2 text-sm leading-6 text-[#a23333]" role="alert">
                    <AlertCircle className="mt-1 size-4 shrink-0" aria-hidden="true" strokeWidth={1.7} />
                    {submitState.message}
                  </p>
                ) : null}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-xs leading-5 text-ink-muted">
                    {t.contact.privacy}
                  </p>
                  <Button type="submit" size="large" disabled={submitState.status === "submitting"}>
                    {submitState.status === "submitting" ? t.contact.sending : t.contact.send}
                    <ArrowUpRight className="size-4" aria-hidden="true" strokeWidth={1.7} />
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
