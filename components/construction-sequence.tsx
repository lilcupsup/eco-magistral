"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const LAST_FRAME = FRAME_COUNT - 1;
const MAX_CACHE_SIZE = 28;
const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function frameSource(index: number) {
  return `${assetBase}/video/construction-sequence/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

export function ConstructionSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const cache = new Map<number, HTMLImageElement>();
    const pending = new Map<number, Promise<HTMLImageElement>>();
    let disposed = false;
    let requestedFrame = reduce ? LAST_FRAME : 0;
    let displayedFrame = -1;
    let currentStep = 0;

    const pruneCache = (keepIndex: number) => {
      if (cache.size <= MAX_CACHE_SIZE) return;

      const candidates = [...cache.keys()].sort(
        (first, second) => Math.abs(second - keepIndex) - Math.abs(first - keepIndex),
      );

      while (cache.size > MAX_CACHE_SIZE && candidates.length) {
        const candidate = candidates.shift();
        if (candidate !== undefined && candidate !== keepIndex) cache.delete(candidate);
      }
    };

    const loadFrame = (index: number) => {
      const safeIndex = Math.max(0, Math.min(LAST_FRAME, index));
      const cached = cache.get(safeIndex);
      if (cached) return Promise.resolve(cached);

      const existing = pending.get(safeIndex);
      if (existing) return existing;

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new window.Image();
        image.decoding = "async";
        image.onload = () => {
          cache.set(safeIndex, image);
          pending.delete(safeIndex);
          pruneCache(safeIndex);
          resolve(image);
        };
        image.onerror = () => {
          pending.delete(safeIndex);
          reject(new Error(`Unable to load construction frame ${safeIndex + 1}`));
        };
        image.src = frameSource(safeIndex);
      });

      pending.set(safeIndex, promise);
      return promise;
    };

    const drawCover = (image: HTMLImageElement) => {
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;

      context.drawImage(
        image,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight,
      );
    };

    const renderFrame = async (index: number) => {
      const safeIndex = Math.max(0, Math.min(LAST_FRAME, index));
      requestedFrame = safeIndex;

      try {
        const image = await loadFrame(safeIndex);
        if (disposed || requestedFrame !== safeIndex) return;

        const direction = safeIndex >= displayedFrame ? 1 : -1;
        drawCover(image);
        displayedFrame = safeIndex;

        const progress = safeIndex / LAST_FRAME;
        if (introRef.current) {
          const visibility = Math.max(0, Math.min(1, (0.32 - progress) / 0.22));
          introRef.current.style.opacity = String(visibility);
          introRef.current.style.transform = `translateY(${-18 * (1 - visibility)}px)`;
        }
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${Math.max(0.01, progress)})`;
        }

        const nextStep = Math.min(3, Math.floor(progress * 4));
        if (nextStep !== currentStep) {
          currentStep = nextStep;
          setActiveStep(nextStep);
        }

        [direction, -direction, direction * 2, -direction * 2, direction * 3].forEach((offset) => {
          const nearby = safeIndex + offset;
          if (nearby >= 0 && nearby <= LAST_FRAME) void loadFrame(nearby).catch(() => undefined);
        });
      } catch {
        // Keep the last successfully rendered frame if a neighboring asset is unavailable.
      }
    };

    const resizeCanvas = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const bounds = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));

      const current = cache.get(displayedFrame);
      if (current) drawCover(current);
      else void renderFrame(requestedFrame);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (reduce) {
      void renderFrame(LAST_FRAME);
      return () => {
        disposed = true;
        window.removeEventListener("resize", resizeCanvas);
      };
    }

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const sequence = { frame: 0 };
    const sequenceEnd = mobile ? Math.floor(LAST_FRAME / 2) : LAST_FRAME;

    const tween = gsap.to(sequence, {
      frame: sequenceEnd,
      ease: "none",
      onUpdate: () => {
        const nextFrame = mobile
          ? Math.min(LAST_FRAME, Math.round(sequence.frame) * 2)
          : Math.round(sequence.frame);
        void renderFrame(nextFrame);
      },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.18,
        invalidateOnRefresh: true,
      },
    });

    void renderFrame(0);

    return () => {
      disposed = true;
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [reduce]);

  const step = t.process.stages[activeStep];

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className={reduce ? "relative h-[100svh] bg-[var(--surface-dark)]" : "relative h-[300svh] bg-[var(--surface-dark)] md:h-[360svh]"}
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--surface-dark)] bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSource(0)})` }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t.process.canvasAlt}
          className="absolute inset-0 size-full"
        >
          {t.process.canvasAlt}
        </canvas>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,9,.58)_0%,rgba(6,12,9,.05)_40%,rgba(6,12,9,.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,8,.56)_0%,transparent_55%,rgba(5,11,8,.12)_100%)]" />

        <div className="site-container relative z-10 flex h-full flex-col justify-between pb-7 pt-28 text-white sm:pb-9 sm:pt-32">
          <div ref={introRef} className="flex items-start justify-between gap-6 will-change-[opacity,transform]">
            <div>
              <p className="eyebrow text-white/66">{t.process.eyebrow}</p>
              <h2 id="process-heading" className="process-heading mt-5 max-w-[11ch] text-[clamp(2.5rem,5vw,6rem)] font-medium leading-[0.94] tracking-[-0.055em] text-balance">
                {t.process.title}
              </h2>
            </div>
            <div className="hidden max-w-[22rem] items-center justify-end gap-3 text-right text-xs font-semibold leading-5 tracking-[0.08em] text-white/62 uppercase 2xl:flex">
              <ArrowDown className="size-4" aria-hidden="true" strokeWidth={1.6} />
              {t.process.scroll}
            </div>
          </div>

          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={step.title}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-mono text-xs tracking-[0.14em] text-white/58">
                    {String(activeStep + 1).padStart(2, "0")} / 04
                  </p>
                  <h3 className="mt-3 text-[clamp(1.75rem,3vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-6 text-white/72 sm:text-base sm:leading-7">
                    {step.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="md:col-span-5 md:col-start-8">
              <div className="h-px overflow-hidden bg-white/24">
                <span ref={progressRef} className="block h-full origin-left scale-x-[0.01] bg-white" />
              </div>
              <div className="mt-4 flex justify-between text-[0.65rem] font-semibold tracking-[0.08em] text-white/56 uppercase">
                {t.process.stages.map((stage, index) => (
                  <span key={stage.title} className={index === activeStep ? "text-white" : undefined}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
