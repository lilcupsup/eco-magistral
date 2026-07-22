"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Language, useLanguage } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

const languages: Language[] = ["en", "ru", "hy"];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass-surface mx-auto flex h-14 max-w-[90rem] items-center justify-between rounded-full px-4 text-white sm:h-16 sm:px-5">
        <a
          href="#top"
          className="inline-flex min-h-11 items-center rounded-full px-1 text-[0.85rem] sm:text-sm"
          aria-label={t.header.home}
        >
          <BrandLockup compact />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.header.primary}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.8rem] font-medium text-white/78 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="flex h-10 items-center rounded-full border border-white/20 bg-black/10 p-1"
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
                    active ? "bg-[#f2f4ef] text-[#171d1a] shadow-sm" : "text-white/65 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.toUpperCase()}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/10 text-white transition-[background-color,transform] duration-300 hover:bg-white/12 active:scale-[0.96]"
            aria-label={theme === "dark" ? t.theme.light : t.theme.dark}
            aria-pressed={theme === "dark"}
          >
            {theme === "dark" ? (
              <Sun className="size-[1.05rem]" aria-hidden="true" strokeWidth={1.7} />
            ) : (
              <Moon className="size-[1.05rem]" aria-hidden="true" strokeWidth={1.7} />
            )}
          </button>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "light" }),
              "hidden h-11 min-h-11 px-5 text-[0.78rem] sm:inline-flex",
            )}
          >
            {t.header.start}
            <ArrowUpRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
          </a>
          <button
            type="button"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
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
            className="glass-surface mx-auto mt-2 grid max-w-[90rem] rounded-[1rem] p-3 text-white lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-between border-b border-white/10 px-3 text-base last:border-0"
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" className="size-4 text-white/55" strokeWidth={1.6} />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: "light" }), "mt-3 w-full")}
            >
              {t.header.start}
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
