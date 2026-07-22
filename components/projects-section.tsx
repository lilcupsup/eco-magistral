"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { projects } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectsSection() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { t, language } = useLanguage();

  useGSAP(
    () => {
      if (reduce || !wrap.current || !track.current) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 768px)", () => {
        const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);

        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: wrap, dependencies: [reduce, language], revertOnUpdate: true },
  );

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-pad pb-0">
      <div className="site-container">
        <p className="eyebrow mb-8 text-accent">{t.projects.eyebrow}</p>
        <h2 id="projects-heading" className="display-md max-w-[13ch] text-balance">
          {t.projects.title}
        </h2>
        <p className="body-lg mt-7 text-ink-muted">
          {t.projects.intro}
        </p>
      </div>

      <div ref={wrap} className="mt-14 overflow-hidden md:mt-20 md:flex md:min-h-[100dvh] md:items-center">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:w-max md:snap-none md:gap-6 md:overflow-visible md:px-[5vw] md:pb-0"
        >
          {projects.map((project, index) => (
            <article
              key={`${language}-${index}`}
              className="w-[88vw] shrink-0 snap-center sm:w-[72vw] md:w-[min(76vw,72rem)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-paper-deep md:aspect-[16/9] md:h-[65vh] md:max-h-[46rem] md:w-full">
                <Image
                  src={project.image}
                  alt={`${t.projects.items[index].title} ${t.projects.imageSuffix}`}
                  fill
                  sizes="(max-width: 767px) 88vw, 76vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.015]"
                />
              </div>
              <div className="grid gap-3 py-5 sm:grid-cols-[minmax(0,1fr)_minmax(16rem,28rem)] sm:items-start sm:gap-8 sm:py-6">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  {t.projects.items[index].title}
                </h3>
                <p className="text-sm leading-6 text-ink-muted sm:text-base sm:leading-7">
                  {t.projects.items[index].description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
