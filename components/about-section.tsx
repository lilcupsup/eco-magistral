"use client";

import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { useLanguage } from "@/lib/i18n";

export function AboutSection() {
  const { t } = useLanguage();
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad overflow-hidden">
      <div className="site-container">
        <div className="grid items-start gap-14 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7 md:pt-8">
            <Reveal>
              <p className="eyebrow mb-8 text-accent">{t.about.eyebrow}</p>
              <h2 id="about-heading" className="display-lg text-balance">
                {t.about.title}
              </h2>
            </Reveal>

            <Reveal delay={0.08} className="mt-12 grid gap-8 sm:grid-cols-2 md:mt-20">
              <p className="text-pretty text-base leading-7 text-ink-muted">
                {t.about.first}
              </p>
              <p className="text-pretty text-base leading-7 text-ink-muted">
                {t.about.second}
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-14 hidden items-center gap-5 text-sm font-semibold text-accent md:flex">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-accent/30">
                <ArrowDownRight className="size-4" aria-hidden="true" strokeWidth={1.7} />
              </span>
              {t.about.note}
            </Reveal>
          </div>

          <Reveal className="md:col-span-5 md:ml-auto md:w-[92%]" delay={0.12}>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
              <Image
                src="/images/projects/landscaping.avif"
                alt={t.about.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <figcaption className="glass-surface absolute bottom-4 left-4 right-4 rounded-[0.8rem] p-5 text-white sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[18rem]">
                <p className="text-sm font-medium leading-6 text-white/82">
                  {t.about.caption}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
