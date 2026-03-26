import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const frames: HTMLImageElement[] = [];

const getFramePath = (index: number) =>
  `/sequence/frame_${String(index).padStart(3, "0")}_delay-0.066s.png`;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);
  const currentFrame = useRef(0);

  // Preload all frames
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) setLoaded(true);
      };
      frames[i] = img;
    }
  }, []);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = frames[index];
    if (!img || !img.complete) return;

    canvas.width = window.innerWidth * Math.min(window.devicePixelRatio, 2);
    canvas.height = window.innerHeight * Math.min(window.devicePixelRatio, 2);
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  };

  // GSAP ScrollTrigger for image sequence
  useEffect(() => {
    if (!loaded || !sectionRef.current || !canvasRef.current) return;

    drawFrame(0);

    const obj = { frame: 0 };
    const tl = gsap.to(obj, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 0.5,
      },
      onUpdate: () => {
        const newFrame = Math.round(obj.frame);
        if (newFrame !== currentFrame.current) {
          currentFrame.current = newFrame;
          drawFrame(newFrame);
        }
      },
    });

    const onResize = () => drawFrame(currentFrame.current);
    window.addEventListener("resize", onResize);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", onResize);
    };
  }, [loaded]);

  return (
    <div ref={sectionRef} className="relative h-screen w-full overflow-hidden">
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40 z-10" />

      {/* Purple/blue ambient glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[60vw] h-[60vw] rounded-full z-[5] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120,80,255,0.06) 0%, rgba(60,130,255,0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-custom">
          <div className="max-w-2xl space-y-8">
            <motion.div
              {...fadeUp(0)}
              className="flex items-center gap-3 font-mono-custom text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span className="inline-block w-8 h-[1px] bg-primary" />
              Available for work
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-blink" />
            </motion.div>

            <div>
              <motion.h1
                {...fadeUp(0.1)}
                className="font-display italic text-foreground leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                Sandesh
              </motion.h1>
              <motion.h1
                {...fadeUp(0.2)}
                className="font-display italic text-primary leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                Gadakh.
              </motion.h1>
            </div>

            <motion.p
              {...fadeUp(0.3)}
              className="font-mono-custom text-[13px] uppercase tracking-[0.12em] text-muted-foreground"
            >
              Creative Technologist · 3D Product Builder
            </motion.p>

            <motion.p
              {...fadeUp(0.35)}
              className="font-body text-base text-muted-foreground/80 max-w-lg leading-relaxed"
            >
              Building AI-powered 3D systems, cinematic experiences, and scalable pipelines
            </motion.p>

            <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4 pt-2">
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

            {/* Stats row */}
            <motion.div
              {...fadeUp(0.55)}
              className="flex items-center gap-0 font-mono-custom text-[11px] uppercase tracking-[0.15em] pt-4"
            >
              {[
                { num: "4+", label: "Years" },
                { num: "50+", label: "Projects" },
                { num: "3×", label: "Best Employee" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1 ${i > 0 ? "border-l border-foreground/[0.07] pl-6 ml-6" : ""}`}
                >
                  <span className="text-foreground text-lg font-display italic">{stat.num}</span>
                  <span className="text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="font-mono-custom text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
              Loading Experience
            </p>
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
  );
};

export default Hero;
