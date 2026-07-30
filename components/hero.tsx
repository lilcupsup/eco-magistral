"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (reduce && videoRef.current) {
      videoRef.current.pause();
      setPaused(true);
    }
  }, [reduce]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setPaused(false);
      return;
    }

    video.pause();
    setPaused(true);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#18211c] px-4 pb-10 pt-24 text-white"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/eco-magistral-hero.avif"
        aria-hidden="true"
      >
        <source src="/video/eco-magistral-hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,14,11,.44)_0%,rgba(8,14,11,.15)_42%,rgba(8,14,11,.58)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(4,9,7,.24)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[88rem] flex-col items-center text-center">
        <motion.h1
          id="hero-title"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.2rem,9.4vw,9.75rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-balance"
        >
          <span className="block font-light text-white/82">ECO</span>
          <span className="block">MAGISTRAL</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 text-[clamp(1rem,1.45vw,1.35rem)] font-medium tracking-[-0.025em] text-white/86"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.a
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: reduce ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
          href="#services"
          className={cn(buttonVariants({ variant: "glass", size: "large" }), "mt-8")}
        >
          {t.hero.cta}
          <ArrowDownRight aria-hidden="true" className="size-4" strokeWidth={1.7} />
        </motion.a>
      </div>

      <button
        type="button"
        onClick={togglePlayback}
        className="glass-surface absolute bottom-5 right-5 z-10 inline-flex size-12 cursor-pointer items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98] sm:bottom-7 sm:right-7"
        aria-label={paused ? t.hero.play : t.hero.pause}
      >
        {paused ? <Play className="size-4 fill-current" strokeWidth={1.5} /> : <Pause className="size-4 fill-current" strokeWidth={1.5} />}
      </button>
    </section>
  );
}
