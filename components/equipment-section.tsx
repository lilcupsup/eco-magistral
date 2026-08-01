"use client";

import Image from "next/image";

import { Reveal } from "@/components/reveal";
import { assetPath } from "@/lib/assets";
import { equipmentGroups } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function EquipmentSection() {
  const { t } = useLanguage();
  return (
    <section id="equipment" aria-labelledby="equipment-heading" className="section-pad-compact">
      <div className="site-container">
        <Reveal className="grid items-end gap-7 lg:grid-cols-12 lg:gap-8">
          <h2 id="equipment-heading" className="display-md text-balance">
            {t.equipment.title}
          </h2>
          <p className="body-lg text-ink-muted lg:col-span-5 lg:col-start-8">
            {t.equipment.intro}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          <Reveal delay={0.08} className="lg:col-span-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-dark)] sm:aspect-[16/10] sm:min-h-[25rem]">
            <Image
              src={assetPath("/images/equipment/equipment.avif")}
              alt={t.equipment.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 68vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(7_13_10_/_0.78)] via-transparent to-[rgb(7_13_10_/_0.1)]" />
            <div className="glass-surface absolute bottom-4 left-4 right-4 rounded-[0.9rem] p-5 text-white sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[34rem] sm:p-6">
              <p className="text-pretty text-base leading-7 text-white/84">
                {t.equipment.caption}
              </p>
            </div>
          </div>
          </Reveal>

          <Reveal delay={0.12} className="grid grid-cols-2 overflow-hidden rounded-[var(--radius-card)] border border-ink/15 bg-[var(--section-tint)] lg:col-span-4 lg:grid-cols-1">
          {equipmentGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <div key={index} className="flex min-h-24 items-center gap-4 border-b border-r border-ink/15 p-4 last:border-b-0 even:border-r-0 sm:p-5 lg:min-h-0 lg:border-r-0">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/25 text-accent">
                  <Icon className="size-4.5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 [overflow-wrap:anywhere] text-sm font-semibold leading-5 tracking-[-0.02em]">{t.equipment.groups[index]}</span>
              </div>
            );
          })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
