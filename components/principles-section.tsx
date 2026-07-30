"use client";

import { Reveal } from "@/components/reveal";
import { principles } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function PrinciplesSection() {
  const { t } = useLanguage();
  return (
    <section id="why-us" aria-labelledby="principles-heading" className="section-pad-compact border-y border-ink/10 bg-[var(--section-tint)]">
      <div className="site-container grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <h2
            id="principles-heading"
            className="principles-heading display-md max-w-[11ch] text-balance"
          >
            {t.principles.title}
          </h2>
          <p className="mt-7 max-w-md text-base leading-7 text-ink-muted">
            {t.principles.intro}
          </p>
        </Reveal>

        <div className="grid border-t border-ink/15 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <Reveal
                key={index}
                delay={index * 0.04}
                className="border-b border-ink/15 py-7 sm:min-h-64 sm:border-r sm:p-7 sm:odd:pl-0 sm:even:border-r-0 lg:min-h-72"
              >
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-accent/30 text-accent">
                  <Icon className="size-5" aria-hidden="true" strokeWidth={1.5} />
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.04em]">
                  {t.principles.items[index].title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-ink-muted">
                  {t.principles.items[index].description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
