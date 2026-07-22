"use client";

import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function PrinciplesSection() {
  const { t } = useLanguage();
  return (
    <section id="why-us" aria-labelledby="principles-heading" className="section-pad border-y border-ink/10 bg-[var(--section-tint)]">
      <div className="site-container grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2
                id="principles-heading"
                className="display-md max-w-[11ch] hyphens-auto [overflow-wrap:anywhere] text-balance"
              >
                {t.principles.title}
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-ink-muted">
                {t.principles.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <Reveal
                key={index}
                delay={index * 0.04}
                className="grid gap-6 border-b border-ink/15 py-9 first:border-t sm:grid-cols-[4rem_1fr] sm:py-11"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/30 text-accent">
                  <Icon className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    {t.principles.items[index].title}
                  </h3>
                  <p className="mt-4 max-w-lg text-base leading-7 text-ink-muted">
                    {t.principles.items[index].description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
