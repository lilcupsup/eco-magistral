"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { galleryImages } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function GallerySection() {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const showPrevious = () => {
    setActive((value) => (value - 1 + galleryImages.length) % galleryImages.length);
  };

  const showNext = () => {
    setActive((value) => (value + 1) % galleryImages.length);
  };

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") {
        const next = (selected + 1) % galleryImages.length;
        setSelected(next);
        setActive(next);
      }
      if (event.key === "ArrowLeft") {
        const previous = (selected - 1 + galleryImages.length) % galleryImages.length;
        setSelected(previous);
        setActive(previous);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="section-pad overflow-hidden bg-paper-deep/70">
      <div className="site-container flex items-end justify-between gap-8">
        <div>
          <h2 id="gallery-heading" className="display-md max-w-[12ch] text-balance">
            {t.gallery.title}
          </h2>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-accent hover:bg-forest hover:text-white sm:size-12"
            aria-label={t.gallery.previous}
          >
            <ArrowLeft className="size-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={showNext}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-accent hover:bg-forest hover:text-white sm:size-12"
            aria-label={t.gallery.next}
          >
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="site-container mt-12 md:mt-16">
        <button
          type="button"
          onClick={() => setSelected(active)}
          className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] bg-paper text-left sm:aspect-[16/9]"
          aria-label={`${t.gallery.open}: ${t.gallery.alts[active]}`}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={galleryImages[active].src}
              initial={reduce ? false : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[active].src}
                alt={t.gallery.alts[active]}
                fill
                sizes="(max-width: 640px) 100vw, 90vw"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgb(5_18_12_/_0.42)] to-transparent" />
          <span className="absolute bottom-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper text-ink shadow-lg transition-transform duration-300 group-hover:scale-105 sm:bottom-6 sm:right-6 sm:size-12">
            <Maximize2 className="size-4" aria-hidden="true" strokeWidth={1.6} />
          </span>
        </button>

        <div className="mt-4 flex items-start justify-between gap-6 border-b border-ink/15 pb-5">
          <p className="max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
            {t.gallery.alts[active]}
          </p>
          <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-ink-muted">
            {String(active + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-5 flex gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
          {galleryImages.map((image, index) => (
            <button
              type="button"
              key={image.src}
              onClick={() => setActive(index)}
              className={`relative aspect-[4/3] w-32 shrink-0 cursor-pointer overflow-hidden rounded-xl transition-[opacity,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper-deep sm:w-40 lg:w-auto ${
                active === index
                  ? "opacity-100 ring-2 ring-accent ring-offset-2 ring-offset-paper-deep"
                  : "opacity-55 hover:-translate-y-0.5 hover:opacity-100"
              }`}
              aria-label={`${t.gallery.open}: ${t.gallery.alts[index]}`}
              aria-current={active === index ? "true" : undefined}
            >
              <Image
                src={image.src}
                alt=""
                fill
                loading="eager"
                sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 15vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.viewer}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgb(5_9_7_/_0.95)] p-3 sm:p-8"
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setSelected(null);
            }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-[min(78vh,55rem)] w-full max-w-[88rem] overflow-hidden rounded-[var(--radius-card)] bg-[var(--surface-dark)]"
            >
              <Image
                src={galleryImages[selected].src}
                alt={t.gallery.alts[selected]}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>
            <button
              type="button"
              autoFocus
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-paper text-ink sm:right-7 sm:top-7"
              aria-label={t.gallery.close}
            >
              <X className="size-5" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => {
                const previous = (selected - 1 + galleryImages.length) % galleryImages.length;
                setSelected(previous);
                setActive(previous);
              }}
              className="absolute bottom-4 left-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-paper text-ink sm:bottom-auto sm:left-7 sm:top-1/2 sm:-translate-y-1/2"
              aria-label={t.gallery.previousImage}
            >
              <ArrowLeft className="size-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => {
                const next = (selected + 1) % galleryImages.length;
                setSelected(next);
                setActive(next);
              }}
              className="absolute bottom-4 right-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-paper text-ink sm:bottom-auto sm:right-7 sm:top-1/2 sm:-translate-y-1/2"
              aria-label={t.gallery.nextImage}
            >
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
