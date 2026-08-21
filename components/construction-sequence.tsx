"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/lib/i18n";
import { setProcessNavigationHidden } from "@/lib/process-navigation";

gsap.registerPlugin(ScrollTrigger);

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const sequenceSource = `${assetBase}/video/construction-sequence.mp4`;
const mobileSequenceSource = `${assetBase}/video/construction-sequence-mobile.mp4`;
const sequencePoster = `${assetBase}/images/hero/construction-sequence-poster.jpg`;
const MOBILE_FRAME_COUNT = 80;
const MOBILE_CACHE_SIZE = 14;
const DESKTOP_FRAME_COUNT = 192;
const DESKTOP_CACHE_SIZE = 32;

function mobileFrameSource(index: number) {
  return `${assetBase}/video/construction-sequence-mobile-frames/frame-${String(index + 1).padStart(3, "0")}.webp`;
}

function desktopFrameSource(index: number) {
  return `${assetBase}/video/construction-sequence-desktop-frames/frame-${String(index + 1).padStart(3, "0")}.webp`;
}

export function ConstructionSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!section || !video || !canvas) return;
    const videoElement = video;
    const canvasElement = canvas;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const firefox = /firefox/i.test(window.navigator.userAgent);
    const useFrameSequence = mobile || firefox;
    const frameCount = mobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;
    const lastFrame = frameCount - 1;
    const cacheSize = mobile ? MOBILE_CACHE_SIZE : DESKTOP_CACHE_SIZE;
    const frameSource = mobile ? mobileFrameSource : desktopFrameSource;

    let currentStep = 0;
    let targetProgress = reduce ? 1 : 0;
    let renderMedia: (progress: number) => void = () => undefined;
    let cleanupMedia: () => void = () => undefined;

    const renderProgress = (progress: number) => {
      targetProgress = Math.max(0, Math.min(1, progress));

      if (introRef.current) {
        const visibility = Math.max(0, Math.min(1, (0.32 - targetProgress) / 0.22));
        introRef.current.style.opacity = String(visibility);
        introRef.current.style.transform = `translateY(${-18 * (1 - visibility)}px)`;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.01, targetProgress)})`;
      }

      const nextStep = Math.min(3, Math.floor(targetProgress * 4));
      if (nextStep !== currentStep) {
        currentStep = nextStep;
        setActiveStep(nextStep);
      }

      renderMedia(targetProgress);
    };

    if (useFrameSequence) {
      const context = canvasElement.getContext("2d", { alpha: false });
      if (!context) return;

      const cache = new Map<number, HTMLImageElement>();
      const pending = new Map<number, Promise<HTMLImageElement>>();
      let disposed = false;
      let requestedFrame = reduce ? lastFrame : 0;
      let displayedFrame = -1;

      videoElement.pause();
      videoElement.preload = "none";
      videoElement.style.display = "none";
      videoElement.setAttribute("aria-hidden", "true");
      canvasElement.style.display = "block";
      canvasElement.removeAttribute("aria-hidden");

      const drawCover = (image: HTMLImageElement) => {
        const width = canvasElement.width;
        const height = canvasElement.height;
        const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const drawWidth = image.naturalWidth * scale;
        const drawHeight = image.naturalHeight * scale;
        context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
      };

      const pruneCache = (keepIndex: number) => {
        if (cache.size <= cacheSize) return;
        const candidates = [...cache.keys()].sort(
          (first, second) => Math.abs(second - keepIndex) - Math.abs(first - keepIndex),
        );
        while (cache.size > cacheSize && candidates.length) {
          const candidate = candidates.shift();
          if (candidate !== undefined && candidate !== keepIndex) cache.delete(candidate);
        }
      };

      const loadFrame = (index: number) => {
        const safeIndex = Math.max(0, Math.min(lastFrame, index));
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

      const resizeCanvas = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
        const bounds = canvasElement.getBoundingClientRect();
        canvasElement.width = Math.max(1, Math.round(bounds.width * ratio));
        canvasElement.height = Math.max(1, Math.round(bounds.height * ratio));
        const current = cache.get(displayedFrame);
        if (current) drawCover(current);
      };

      renderMedia = (progress: number) => {
        const nextFrame = Math.max(0, Math.min(lastFrame, Math.round(progress * lastFrame)));
        const direction = nextFrame >= requestedFrame ? 1 : -1;
        requestedFrame = nextFrame;

        const exact = cache.get(nextFrame);
        if (exact) {
          drawCover(exact);
          displayedFrame = nextFrame;
          canvasElement.dataset.frame = String(nextFrame);
        }

        void loadFrame(nextFrame)
          .then((image) => {
            if (disposed || requestedFrame !== nextFrame) return;
            drawCover(image);
            displayedFrame = nextFrame;
            canvasElement.dataset.frame = String(nextFrame);
          })
          .catch(() => undefined);

        const prefetchOffsets = mobile
          ? [direction, direction * 2, -direction]
          : [direction, direction * 2, direction * 3, direction * 4, -direction, -direction * 2];
        prefetchOffsets.forEach((offset) => {
          const nearby = nextFrame + offset;
          if (nearby >= 0 && nearby <= lastFrame) void loadFrame(nearby).catch(() => undefined);
        });
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      cleanupMedia = () => {
        disposed = true;
        window.removeEventListener("resize", resizeCanvas);
        cache.clear();
        pending.clear();
      };
    } else {
      let animationFrame = 0;
      let seekQueued = false;

      const scheduleVideoUpdate = () => {
        if (videoElement.seeking) {
          seekQueued = true;
          return;
        }
        if (!animationFrame) animationFrame = window.requestAnimationFrame(updateVideoTime);
      };

      function updateVideoTime() {
        animationFrame = 0;
        const duration = videoElement.duration;
        if (!Number.isFinite(duration) || duration <= 0) return;
        if (videoElement.seeking) {
          seekQueued = true;
          return;
        }

        const lastFrameTime = Math.max(0, duration - 1 / 24);
        const nextTime = targetProgress * lastFrameTime;
        if (Math.abs(videoElement.currentTime - nextTime) > 1 / 48) {
          seekQueued = false;
          videoElement.currentTime = nextTime;
        }
      }

      const syncAfterSeek = () => {
        if (!seekQueued) return;
        seekQueued = false;
        scheduleVideoUpdate();
      };
      const syncAfterMetadata = () => renderProgress(targetProgress);
      const primeMobileVideo = () => {
        const playback = videoElement.play();
        if (!playback) return;
        void playback.then(() => {
          videoElement.pause();
          scheduleVideoUpdate();
        }).catch(() => undefined);
      };
      renderMedia = () => scheduleVideoUpdate();
      videoElement.preload = "auto";
      videoElement.pause();
      if (videoElement.readyState === HTMLMediaElement.HAVE_NOTHING) videoElement.load();
      videoElement.addEventListener("loadedmetadata", syncAfterMetadata);
      videoElement.addEventListener("canplay", syncAfterMetadata);
      videoElement.addEventListener("seeked", syncAfterSeek);
      if (mobile) window.addEventListener("touchstart", primeMobileVideo, { once: true, passive: true });
      cleanupMedia = () => {
        videoElement.removeEventListener("loadedmetadata", syncAfterMetadata);
        videoElement.removeEventListener("canplay", syncAfterMetadata);
        videoElement.removeEventListener("seeked", syncAfterSeek);
        window.removeEventListener("touchstart", primeMobileVideo);
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
      };
    }

    if (reduce) {
      setProcessNavigationHidden(false);
      renderProgress(1);
      return () => {
        setProcessNavigationHidden(false);
        cleanupMedia();
      };
    }

    const sequence = { progress: 0 };

    const tween = gsap.to(sequence, {
      progress: 1,
      ease: "none",
      onUpdate: () => {
        renderProgress(sequence.progress);
      },
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.18,
        invalidateOnRefresh: true,
        onToggle: (trigger) => setProcessNavigationHidden(trigger.isActive),
      },
    });

    renderProgress(0);

    return () => {
      setProcessNavigationHidden(false);
      tween.scrollTrigger?.kill();
      tween.kill();
      cleanupMedia();
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
      >
        <video
          ref={videoRef}
          poster={sequencePoster}
          muted
          playsInline
          preload="metadata"
          aria-label={t.process.canvasAlt}
          className="absolute inset-0 size-full object-cover"
        >
          <source media="(max-width: 767px)" src={mobileSequenceSource} type="video/mp4" />
          <source src={sequenceSource} type="video/mp4" />
        </video>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={t.process.canvasAlt}
          aria-hidden="true"
          className="absolute inset-0 hidden size-full"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,9,.58)_0%,rgba(6,12,9,.05)_40%,rgba(6,12,9,.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,11,8,.56)_0%,transparent_55%,rgba(5,11,8,.12)_100%)]" />

        <div className="site-container relative z-10 flex h-full flex-col justify-between pb-7 pt-28 text-white sm:pb-9 sm:pt-32">
          <div ref={introRef} className="flex items-start justify-between gap-6 will-change-[opacity,transform]">
            <div>
              <p className="eyebrow text-white/66">{t.process.eyebrow}</p>
              <h2 id="process-heading" className="process-heading mt-5 max-w-[11ch] text-[clamp(2.3rem,5vw,6rem)] font-medium leading-[0.94] tracking-[-0.055em] text-balance">
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
                  <h3 className="mt-3 text-[clamp(1.625rem,3vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
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
