"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Language, useLanguage } from "@/lib/i18n";

const languages: Language[] = ["en", "ru", "hy"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { language, setLanguage, t } = useLanguage();
  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="light-glass-surface mx-auto flex h-14 max-w-[90rem] items-center justify-between rounded-full px-4 text-ink sm:h-16 sm:px-5">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center rounded-full px-1"
          aria-label={t.header.home}
        >
          <BrandLockup compact className="text-lg" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.header.primary}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.8rem] font-medium text-ink-muted transition-colors duration-300 hover:bg-[rgba(18,61,44,0.07)] hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex h-10 items-center rounded-full border border-line bg-white/[0.58] p-1"
            role="group"
            aria-label={t.language.label}
          >
            {languages.map((item) => {
              const active = language === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  aria-label={t.language.names[item]}
                  aria-pressed={active}
                  className={`min-h-8 min-w-9 cursor-pointer rounded-full px-2 text-[0.65rem] font-bold tracking-[0.08em] transition-colors duration-300 sm:min-w-10 ${
                    active ? "bg-forest text-white shadow-sm" : "text-ink-muted hover:bg-[rgba(18,61,44,0.07)] hover:text-ink"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              );
            })}
          </div>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "hidden h-11 min-h-11 px-5 text-[0.78rem] sm:inline-flex",
            )}
          >
            {t.header.start}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
          </a>
          <button
            type="button"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-[rgba(18,61,44,0.07)] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.close : t.header.open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" strokeWidth={1.7} /> : <Menu className="size-5" strokeWidth={1.7} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label={t.header.mobile}
            initial={reduce ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="light-glass-surface mx-auto mt-2 grid max-w-[90rem] rounded-[1rem] p-3 text-ink lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-between border-b border-line px-3 text-base last:border-0"
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-4 text-ink-muted" strokeWidth={1.6} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "primary" }), "mt-3 w-full")}
            >
              {t.header.start}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
