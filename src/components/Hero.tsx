import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";

const FRAME_COUNT = 120;
const frames: HTMLImageElement[] = [];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);

const getFramePath = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.066s.png`;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
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
    const overscan = 1.06;
    const baseScale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * overscan;
    const drawW = img.naturalWidth * baseScale;
    const drawH = img.naturalHeight * baseScale;
    baseDrawRef.current = {
      w: drawW,
      h: drawH,
      x: (w - drawW) / 2,
      y: (h - drawH) / 2,
    };
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

    // Smooth mouse lag (Apple-like delayed response)
    const targetMouse = mouseTargetRef.current;
    const smoothMouse = mouseSmoothRef.current;
    smoothMouse.x = lerp(smoothMouse.x, targetMouse.x, 0.08);
    smoothMouse.y = lerp(smoothMouse.y, targetMouse.y, 0.08);

    const parallaxX = smoothMouse.x * 18;
    const parallaxY = smoothMouse.y * 12;

    const base = baseDrawRef.current;
    const x = base.x - parallaxX;
    const y = base.y - parallaxY;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, x, y, base.w, base.h);
  };

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    resizeCanvas();
    drawFrame(0);

    const unsub = scrollYProgress.on("change", (v) => {
      const p = clamp(v, 0, 1);
      const eased = easeInOut(p);
      targetFrameRef.current = eased * (FRAME_COUNT - 1);
    });

    const fps = 60;
    const frameInterval = 1000 / fps;

    const animate = (time: number) => {
      if (!lastTickRef.current) lastTickRef.current = time;
      const delta = time - lastTickRef.current;

      if (delta >= frameInterval) {
        // preserve fractional remainder for steadier frame pacing
        lastTickRef.current = time - (delta % frameInterval);

        currentFrameRef.current = lerp(currentFrameRef.current, targetFrameRef.current, 0.08);
        const frame = clamp(Math.round(currentFrameRef.current), 0, FRAME_COUNT - 1);
        const sm = mouseSmoothRef.current;
        const lm = lastMouseRef.current;
        const mouseDelta = Math.abs(sm.x - lm.x) + Math.abs(sm.y - lm.y);

        // Redraw if frame changed or mouse parallax moved enough.
        if (frame !== lastDrawnFrameRef.current || mouseDelta > 0.002) {
          drawFrame(frame);
          lastDrawnFrameRef.current = frame;
          lm.x = sm.x;
          lm.y = sm.y;
        }
      };

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
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(1);
  const { targetRef: mouseTargetRef, smoothRef: mouseSmoothRef } = useSmoothMouse(true);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    // Reuse preloaded frames across mounts/hot-reloads.
    const alreadyReady = frames.length === FRAME_COUNT && frames.every((f) => f?.complete);
    if (alreadyReady) {
      setProgress(100);
      setLoaded(true);
      return;
    }

    let loadedCount = 0;
    let lastProgress = 1;
    setProgress(1);

    const updateProgress = () => {
      const pct = Math.min(100, Math.max(1, Math.floor((loadedCount / FRAME_COUNT) * 100)));
      // Reduce React work: only publish meaningful progress steps.
      if (pct - lastProgress >= 2 || pct === 100) {
        lastProgress = pct;
        setProgress(pct);
      }
      if (loadedCount === FRAME_COUNT) setLoaded(true);
    };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const existing = frames[i];
      if (existing?.complete) {
        loadedCount++;
        updateProgress();
        continue;
      }

      const img = existing || new Image();
      img.src = img.src || getFramePath(i);
      img.onload = () => {
        loadedCount++;
        updateProgress();
      };
      img.onerror = () => {
        loadedCount++;
        updateProgress();
      };
      frames[i] = img;
    }
  }, []);

  useImageSequence({
    scrollYProgress,
    canvasRef,
    loaded,
    mouseTargetRef,
    mouseSmoothRef,
  });

  return (
    <section ref={sectionRef} id="home" className="relative isolate h-[220vh] w-full bg-background">
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
      {/* Opaque base to prevent next section bleeding through */}
      <div className="absolute inset-0 z-0 bg-background" />

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1] w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      />

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-background/40 z-10" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/30 z-10" />

      {/* Content — centered like reference */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
        {/* Currently at badge */}
        <motion.div
          {...fadeUp(0)}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-full bg-card border border-foreground/10 flex items-center justify-center overflow-hidden">
            <span className="font-display italic text-sm text-foreground">S</span>
          </div>
          <div className="text-left">
            <p className="font-body text-[12px] text-muted-foreground leading-tight">Currently at</p>
            <p className="font-hero text-[15px] text-foreground font-black leading-tight">MetaShop AI.</p>
          </div>
        </motion.div>

        {/* Giant name */}
        <motion.h1
          {...fadeUp(0.1)}
          className="font-hero font-black text-foreground leading-[0.88] lowercase tracking-tight"
          style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
        >
          sandesh
        </motion.h1>
        <motion.h1
          {...fadeUp(0.2)}
          className="font-hero font-black text-foreground leading-[0.88] lowercase tracking-tight"
          style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
        >
          gadakh
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.3)}
          className="font-body text-lg md:text-xl text-muted-foreground mt-6"
        >
          Creative Technologist · 3D Product Builder
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.45)} className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 font-mono-custom text-[12px] uppercase tracking-[0.15em] bg-primary text-primary-foreground px-8 py-4 rounded-full hover:brightness-110 transition-smooth"
          >
            View Work
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center font-mono-custom text-[12px] uppercase tracking-[0.15em] border border-foreground/[0.15] text-foreground px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-smooth backdrop-blur-sm"
          >
            Let's Talk
          </a>
        </motion.div>
      </div>

      {/* Loading */}
      {!loaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="font-mono-custom text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Loading Experience
            </p>
            <div className="w-72 max-w-[82vw]">
              <div className="h-[3px] w-full rounded-full bg-foreground/[0.12] overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "1%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="mt-2 font-mono-custom text-[10px] uppercase tracking-[0.15em] text-muted-foreground text-center">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      )}
      </div>
    </section>
  );
};

export default Hero;
