"use client";

import { ArrowUpRight } from "lucide-react";

import { BrandLockup } from "@/components/brand-lockup";
import { useLanguage } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLanguage();
  const footerLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.principles, href: "#why-us" },
    { label: t.nav.equipment, href: "#equipment" },
    { label: t.nav.contact, href: "#contact" },
  ];
  return (
    <footer className="bg-[var(--footer-shell)] px-3 pb-3 text-white sm:px-5 sm:pb-5">
      <div className="mx-auto max-w-[90rem] rounded-[var(--radius-card)] bg-forest px-5 py-8 sm:px-8 sm:py-10">
        <div className="grid gap-14 border-b border-white/15 pb-16 md:grid-cols-12 md:pb-24">
          <div className="md:col-span-7">
            <BrandLockup inverse className="text-lg" />
            <p className="footer-statement mt-8 max-w-3xl break-words text-[clamp(2.05rem,5.5vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-balance">
              {t.footer.statement}
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-x-6 gap-y-1 md:col-span-3 md:col-start-10" aria-label={t.footer.navigation}>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex min-h-12 min-w-0 items-center justify-between gap-2 break-words border-b border-white/15 text-sm leading-5 text-white/74 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" strokeWidth={1.6} />
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/58 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ECO MAGISTRAL. {t.footer.rights}</p>
          <p>{t.footer.descriptor}</p>
        </div>
      </div>
    </footer>
  );
}
