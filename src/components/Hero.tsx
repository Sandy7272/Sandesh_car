import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";

const FRAME_COUNT = 120;
const frames: HTMLImageElement[] = [];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

const getFramePath = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.066s.png`;

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 50, filter: "blur(12px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, delay, ease: EASE },
});

const lineReveal = (delay: number) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: 1.4, delay, ease: EASE },
});

function useSmoothMouse(enabled: boolean) {
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetRef.current.x = clamp(x, -1, 1);
      targetRef.current.y = clamp(y, -1, 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  return { targetRef, smoothRef };
}

function useImageSequence({
  scrollYProgress,
  canvasRef,
  loaded,
  mouseTargetRef,
  mouseSmoothRef,
}: {
  scrollYProgress: MotionValue<number>;
  canvasRef: RefObject<HTMLCanvasElement>;
  loaded: boolean;
  mouseTargetRef: RefObject<{ x: number; y: number }>;
  mouseSmoothRef: RefObject<{ x: number; y: number }>;
}) {
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const canvasSizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const baseDrawRef = useRef({ w: 0, h: 0, x: 0, y: 0 });
  const lastDrawnFrameRef = useRef(-1);
  const lastTickRef = useRef(0);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const recalcBaseDraw = () => {
    const { w, h } = canvasSizeRef.current;
    const img = frames[0];
    if (!w || !h || !img?.complete) return;
    const overscan = 1.08;
    const baseScale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * overscan;
    const drawW = img.naturalWidth * baseScale;
    const drawH = img.naturalHeight * baseScale;
    baseDrawRef.current = { w: drawW, h: drawH, x: (w - drawW) / 2, y: (h - drawH) / 2 };
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    const prev = canvasSizeRef.current;
    if (prev.w === w && prev.h === h && prev.dpr === dpr) return;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvasSizeRef.current = { w, h, dpr };
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d");
      if (ctxRef.current) {
        ctxRef.current.imageSmoothingEnabled = true;
        ctxRef.current.imageSmoothingQuality = "high";
      }
    }
    recalcBaseDraw();
  };

  const drawFrame = (frameIndex: number) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const img = frames[frameIndex];
    if (!img || !img.complete) return;
    const { w, h } = canvasSizeRef.current;
    if (!w || !h) return;
    const targetMouse = mouseTargetRef.current;
    const smoothMouse = mouseSmoothRef.current;
    smoothMouse.x = lerp(smoothMouse.x, targetMouse.x, 0.06);
    smoothMouse.y = lerp(smoothMouse.y, targetMouse.y, 0.06);
    const parallaxX = smoothMouse.x * 20;
    const parallaxY = smoothMouse.y * 14;
    const base = baseDrawRef.current;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, base.x - parallaxX, base.y - parallaxY, base.w, base.h);
  };

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    resizeCanvas();
    drawFrame(0);

    const unsub = scrollYProgress.on("change", (v) => {
      const p = clamp(v, 0, 1);
      targetFrameRef.current = easeInOut(p) * (FRAME_COUNT - 1);
    });

    const animate = (time: number) => {
      if (!lastTickRef.current) lastTickRef.current = time;
      const delta = time - lastTickRef.current;
      if (delta >= 16.67) {
        lastTickRef.current = time - (delta % 16.67);
        currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
        const frame = clamp(Math.round(currentFrameRef.current), 0, FRAME_COUNT - 1);
        const sm = mouseSmoothRef.current;
        const lm = lastMouseRef.current;
        const mouseDelta = Math.abs(sm.x - lm.x) + Math.abs(sm.y - lm.y);
        if (frame !== lastDrawnFrameRef.current || mouseDelta > 0.002) {
          drawFrame(frame);
          lastDrawnFrameRef.current = frame;
          lm.x = sm.x;
          lm.y = sm.y;
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onResize = () => {
      resizeCanvas();
      drawFrame(clamp(Math.round(currentFrameRef.current), 0, FRAME_COUNT - 1));
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      unsub();
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [loaded, scrollYProgress, canvasRef, mouseTargetRef, mouseSmoothRef]);
}

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(1);
  const { targetRef: mouseTargetRef, smoothRef: mouseSmoothRef } = useSmoothMouse(true);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const alreadyReady = frames.length === FRAME_COUNT && frames.every((f) => f?.complete);
    if (alreadyReady) { setProgress(100); setLoaded(true); return; }
    let loadedCount = 0;
    let lastProgress = 1;
    setProgress(1);
    const updateProgress = () => {
      const pct = Math.min(100, Math.max(1, Math.floor((loadedCount / FRAME_COUNT) * 100)));
      if (pct - lastProgress >= 2 || pct === 100) { lastProgress = pct; setProgress(pct); }
      if (loadedCount === FRAME_COUNT) setLoaded(true);
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const existing = frames[i];
      if (existing?.complete) { loadedCount++; updateProgress(); continue; }
      const img = existing || new Image();
      img.src = img.src || getFramePath(i);
      img.onload = () => { loadedCount++; updateProgress(); };
      img.onerror = () => { loadedCount++; updateProgress(); };
      frames[i] = img;
    }
  }, []);

  useImageSequence({ scrollYProgress, canvasRef, loaded, mouseTargetRef, mouseSmoothRef });

  return (
    <section ref={sectionRef} id="home" className="relative isolate h-[220vh] w-full bg-[#090909]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 z-0 bg-[#090909]" />

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] w-full h-full"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease" }}
        />

        {/* Cinematic overlays */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[#090909]/50" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#090909] via-transparent to-[#090909]/40" />
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#090909]/60 via-transparent to-transparent" />

        {/* Content — editorial asymmetric layout */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24">
          <div className="container-custom">
            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0.3)}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
              <span className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-white/50">
                Creative Technologist · 3D Product Builder
              </span>
            </motion.div>

            {/* Giant editorial name */}
            <div className="overflow-hidden">
              <motion.h1
                {...fadeUp(0.5)}
                className="font-display font-black text-white leading-[0.88] lowercase"
                style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}
              >
                sandesh
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                {...fadeUp(0.65)}
                className="font-display font-black leading-[0.88] lowercase"
                style={{
                  fontSize: "clamp(3.5rem, 13vw, 12rem)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
                }}
              >
                gadakh
              </motion.h1>
            </div>

            {/* Decorative line */}
            <motion.div
              {...lineReveal(1)}
              className="mt-8 h-[1px] w-full max-w-[320px] bg-gradient-to-r from-[hsl(var(--primary))] to-transparent origin-left"
            />

            {/* Bottom row: status + CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <motion.div {...fadeUp(0.9)} className="max-w-[380px]">
                <p className="font-body text-[15px] text-white/45 leading-relaxed">
                  Building production-grade 3D viewers, automated pipelines, and immersive web experiences at MetaShop AI.
                </p>
              </motion.div>

              <motion.div {...fadeUp(1)} className="flex items-center gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 font-body text-[13px] font-medium text-white border border-white/15 px-7 py-3.5 rounded-full hover:bg-white hover:text-[#090909] transition-all duration-500"
                >
                  View Selected Work
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        )}

        {/* Loading */}
        {!loaded && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#090909]">
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border border-white/10" />
                <motion.div
                  className="absolute inset-0 rounded-full border-t border-white/60"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
              </div>
              <div className="w-48">
                <div className="h-[2px] w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    className="h-full bg-white/60"
                    initial={{ width: "1%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2, ease: EASE }}
                  />
                </div>
                <p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/30 text-center">
                  {progress}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
