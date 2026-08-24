"use client";

import {
  ArrowUpRight,
  Building2,
  Camera,
  Clock3,
  Mail,
  Phone,
} from "lucide-react";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/lib/i18n";

// Temporary demonstration details. Replace these values when the final contacts are available.
const contactDetails = {
  phone: { display: "+374 10 58 24 24", href: "tel:+37410582424" },
  whatsapp: { display: "+374 95 58 24 24", href: "https://wa.me/37495582424" },
  email: { display: "hello@ecomagistral.am", href: "mailto:hello@ecomagistral.am" },
  instagram: { display: "@ecomagistral", href: "https://instagram.com/ecomagistral" },
  linkedin: { display: "ECO MAGISTRAL", href: "https://linkedin.com/company/eco-magistral" },
} as const;

export function ContactSection() {
  const { t } = useLanguage();

  const contactRows = [
    { label: t.contact.labels.email, ...contactDetails.email, icon: Mail },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-pad">
      <div className="site-container grid gap-16 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-8 text-accent">{t.contact.eyebrow}</p>
          <h2 id="contact-heading" className="display-md max-w-[11ch] text-balance">
            {t.contact.title}
          </h2>
          <p className="body-lg mt-8 text-ink-muted">{t.contact.intro}</p>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.08}>
          <div className="border-t border-line">
            <div className="group grid min-h-28 grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-4 border-b border-line py-5 sm:min-h-32 sm:grid-cols-[3.5rem_minmax(0,1fr)_3rem] sm:gap-6">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent/45 sm:size-14">
                <Phone className="size-4.5" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                  {t.contact.labels.phoneWhatsapp}
                </span>
                <span className="mt-2 flex flex-wrap items-baseline gap-x-2 text-xl font-semibold tracking-[-0.035em] sm:text-3xl">
                  <a
                    href={contactDetails.phone.href}
                    className="transition-colors hover:text-accent"
                    aria-label={`${t.contact.labels.phone}: ${contactDetails.phone.display}`}
                  >
                    {contactDetails.phone.display}
                  </a>
                  <span className="text-ink-muted/60" aria-hidden="true">/</span>
                  <a
                    href={contactDetails.whatsapp.href}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                    aria-label={`${t.contact.labels.whatsapp}: ${contactDetails.whatsapp.display}`}
                  >
                    WhatsApp
                  </a>
                </span>
              </span>
              <span className="inline-flex size-11 items-center justify-center rounded-full border border-line transition-all group-hover:border-accent/45 group-hover:bg-accent group-hover:text-paper">
                <ArrowUpRight className="size-4" aria-hidden="true" strokeWidth={1.7} />
              </span>
            </div>

            {contactRows.map(({ label, display, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group grid min-h-28 grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-4 border-b border-line py-5 transition-colors hover:text-accent sm:min-h-32 sm:grid-cols-[3.5rem_minmax(0,1fr)_3rem] sm:gap-6"
                aria-label={`${label}: ${display}`}
              >
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-line transition-colors group-hover:border-accent/45 sm:size-14">
                  <Icon className="size-4.5" aria-hidden="true" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                    {label}
                  </span>
                  <span className="mt-2 block [overflow-wrap:anywhere] text-xl font-semibold tracking-[-0.035em] sm:text-3xl">
                    {display}
                  </span>
                </span>
                <span className="inline-flex size-11 items-center justify-center rounded-full border border-line transition-all group-hover:border-accent/45 group-hover:bg-accent group-hover:text-paper">
                  <ArrowUpRight className="size-4" aria-hidden="true" strokeWidth={1.7} />
                </span>
              </a>
            ))}

            <div className="grid min-h-28 grid-cols-[3rem_minmax(0,1fr)_2.75rem] items-center gap-4 border-b border-line py-5 sm:min-h-32 sm:grid-cols-[3.5rem_minmax(0,1fr)_3rem] sm:gap-6">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-line sm:size-14">
                <Clock3 className="size-4.5 text-accent" aria-hidden="true" strokeWidth={1.6} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase">
                  {t.contact.labels.hours}
                </span>
                <span className="mt-2 block text-xl font-semibold tracking-[-0.035em] sm:text-3xl">
                  {t.contact.hours}
                </span>
              </span>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-ink-muted">{t.contact.socialTitle}</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={contactDetails.instagram.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-accent/45 hover:bg-accent hover:text-paper"
              >
                <Camera className="size-4" aria-hidden="true" strokeWidth={1.7} />
                Instagram
              </a>
              <a
                href={contactDetails.linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-accent/45 hover:bg-accent hover:text-paper"
              >
                <Building2 className="size-4" aria-hidden="true" strokeWidth={1.7} />
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
