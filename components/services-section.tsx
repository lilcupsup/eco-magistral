"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { assetPath } from "@/lib/assets";
import { services } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const current = services[active];
  const currentCopy = t.services.items[active];

  return (
    <section id="services" aria-labelledby="services-heading" className="section-pad bg-paper-deep/75">
      <div className="site-container">
        <div className="max-w-4xl">
          <h2 id="services-heading" className="display-md text-balance">
            {t.services.title}
          </h2>
          <p className="body-lg mt-7 text-ink-muted">
            {t.services.intro}
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-12 md:gap-8">
          <div className="order-2 grid md:order-1 md:col-span-5">
            {services.map((service, index) => {
              const Icon = service.icon;
              const selected = index === active;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  aria-pressed={selected}
                  className="group grid min-h-[5.5rem] cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-ink/14 py-4 text-left transition-colors first:border-t hover:text-accent md:min-h-[6.4rem]"
                >
                  <span
                    className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 ${
                      selected ? "border-forest bg-forest text-white" : "border-ink/16 text-ink-muted"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-[1.1rem]" strokeWidth={1.55} />
                  </span>
                  <span className="pr-2 text-[clamp(1rem,1.35vw,1.22rem)] font-semibold tracking-[-0.025em]">
                    {t.services.items[index].title}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className={`size-4 transition-[transform,opacity] duration-300 ${
                      selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                    }`}
                    strokeWidth={1.6}
                  />
                </button>
              );
            })}
          </div>

          <div className="order-1 md:order-2 md:col-span-7 md:pl-4">
            <div className="relative aspect-[16/11] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-dark)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${active}-${t.services.items[active].title}`}
                  initial={reduce ? false : { opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={assetPath(current.image)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgb(7_13_10_/_0.88)] via-[rgb(7_13_10_/_0.38)] to-transparent p-6 pt-20 text-white sm:p-8 sm:pt-28">
                <p className="max-w-xl text-sm leading-6 text-white/82 sm:text-base sm:leading-7">
                  {currentCopy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
