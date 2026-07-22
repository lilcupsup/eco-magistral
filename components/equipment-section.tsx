"use client";

import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { equipmentGroups } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function EquipmentSection() {
  const { t } = useLanguage();
  return (
    <section id="equipment" aria-labelledby="equipment-heading" className="section-pad">
      <div className="site-container">
        <Reveal className="max-w-4xl">
          <h2 id="equipment-heading" className="display-md text-balance">
            {t.equipment.title}
          </h2>
          <p className="body-lg mt-7 text-ink-muted">
            {t.equipment.intro}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-14 md:mt-20">
          <div className="relative min-h-[35rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-dark)] md:min-h-[44rem]">
            <Image
              src="/images/equipment/equipment.avif"
              alt={t.equipment.imageAlt}
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(7_13_10_/_0.78)] via-transparent to-[rgb(7_13_10_/_0.1)]" />
            <div className="glass-surface absolute bottom-4 left-4 right-4 rounded-[0.9rem] p-5 text-white sm:bottom-6 sm:left-6 sm:right-6 sm:p-7 md:max-w-[36rem]">
              <p className="text-pretty text-base leading-7 text-white/84">
                {t.equipment.caption}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-7 grid grid-cols-2 border-t border-ink/15 sm:grid-cols-3 lg:grid-cols-5">
          {equipmentGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={index} className="flex min-h-28 items-center gap-3 border-b border-r border-ink/15 p-4 last:border-r-0 sm:p-5 lg:border-b-0">
                <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" strokeWidth={1.5} />
                <span className="min-w-0 [overflow-wrap:anywhere] text-sm font-semibold leading-5 tracking-[-0.02em]">{t.equipment.groups[index]}</span>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
