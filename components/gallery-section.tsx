"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";

import { galleryImages } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";

export function GallerySection() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((value) => value === null ? 0 : (value + 1) % galleryImages.length);
      if (event.key === "ArrowLeft") setSelected((value) => value === null ? 0 : (value - 1 + galleryImages.length) % galleryImages.length);
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
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-accent hover:bg-forest hover:text-white"
            aria-label={t.gallery.previous}
          >
            <ArrowLeft className="size-4" strokeWidth={1.6} />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-accent hover:bg-forest hover:text-white"
            aria-label={t.gallery.next}
          >
            <ArrowRight className="size-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="mt-12 pl-[max(0.625rem,calc((100vw-90rem)/2))] md:mt-16">
        <Swiper
          modules={[A11y, Keyboard]}
          onSwiper={setSwiper}
          slidesPerView="auto"
          spaceBetween={12}
          keyboard={{ enabled: true }}
          grabCursor
          breakpoints={{ 768: { spaceBetween: 20 } }}
          className="!overflow-visible"
        >
          {galleryImages.map((image, index) => (
            <SwiperSlide
              key={image.src}
              className={`!w-[84vw] sm:!w-[62vw] lg:!w-[46vw] ${index % 3 === 1 ? "lg:!w-[32vw]" : ""}`}
            >
              <button
                type="button"
                onClick={() => setSelected(index)}
                className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] bg-paper-deep text-left ${
                  index % 3 === 1 ? "aspect-[4/5]" : "aspect-[4/3]"
                }`}
                aria-label={`${t.gallery.open}: ${t.gallery.alts[index]}`}
              >
                <Image
                  src={image.src}
                  alt={t.gallery.alts[index]}
                  fill
                  sizes="(max-width: 640px) 84vw, (max-width: 1024px) 62vw, 46vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="size-4" aria-hidden="true" strokeWidth={1.6} />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
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
              onClick={() => setSelected((selected - 1 + galleryImages.length) % galleryImages.length)}
              className="absolute bottom-4 left-4 inline-flex size-12 cursor-pointer items-center justify-center rounded-full bg-paper text-ink sm:bottom-auto sm:left-7 sm:top-1/2 sm:-translate-y-1/2"
              aria-label={t.gallery.previousImage}
            >
              <ArrowLeft className="size-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setSelected((selected + 1) % galleryImages.length)}
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
