import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

const capabilities = [
  { num: "01", title: "3D Design & Rendering", tags: ["Blender", "3DS Max", "Maya", "Unreal", "Substance"] },
  { num: "02", title: "Video to 3D / NeRF", tags: ["Gaussian Splatting", "Nerfstudio", "Drone Capture"] },
  { num: "03", title: "Motion Graphics", tags: ["After Effects", "Premiere Pro", "2.5D Animation"] },
  { num: "04", title: "AR / VR Experiences", tags: ["WebXR", "Real-time 3D", "Unreal Engine"] },
  { num: "05", title: "3D Web Viewers", tags: ["Three.js", "View in AR", "Embeddable Widget"] },
  { num: "06", title: "UI/UX Design", tags: ["Figma", "Photoshop", "Illustrator", "Motion UI"] },
];

const CountUpNumber = ({ target, prefix }: { target: string; prefix: string }) => {
  const [display, setDisplay] = useState(prefix);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (reducedMotion) {
            setDisplay(target);
            return;
          }
          const numPart = parseInt(target);
          const suffix = target.replace(/\d+/, "");
          const duration = 800;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numPart);
            setDisplay(String(current).padStart(2, "0"));
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplay(target);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
};

const CapabilityCard = ({
  cap,
  index,
  active,
  onActivate,
  onDeactivate,
}: {
  cap: (typeof capabilities)[0];
  index: number;
  active: boolean;
  onActivate: (index: number) => void;
  onDeactivate: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rxRef = useRef(0);
  const ryRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const setTilt = useCallback((rx: number, ry: number) => {
    const el = cardRef.current;
    if (!el) return;
    rxRef.current = rx;
    ryRef.current = ry;
    el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
  }, []);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!active) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const nextRy = (px - 0.5) * 8; // rotateY
    const nextRx = (0.5 - py) * 6; // rotateX

    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = window.requestAnimationFrame(() => setTilt(nextRx, nextRy));
  }, [active, setTilt]);

  const onLeave = useCallback(() => {
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    setTilt(0, 0);
    onDeactivate();
  }, [onDeactivate, setTilt]);

  return (
    <div className="relative h-full">
      <motion.div
        layout
        ref={cardRef}
        onMouseEnter={() => onActivate(index)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full rounded-2xl border border-white/[0.10] bg-white/[0.03] p-7 md:p-8 overflow-hidden flex flex-col"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          boxShadow: active
            ? "0 30px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 24px 70px rgba(0,0,0,0.45)",
          willChange: "transform",
        }}
      >
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.14) 0%, transparent 55%), radial-gradient(circle at 70% 70%, hsl(var(--primary) / 0.2) 0%, transparent 60%)",
          }}
        />

        {/* border highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: "inset 0 0 0 1px hsl(var(--primary) / 0.32)",
          }}
        />

        {/* number */}
        <div className="flex items-start justify-between gap-4">
          <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/30">
            <CountUpNumber target={cap.num} prefix="00" />
          </span>
          <motion.span
            className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40"
            initial={false}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            View →
          </motion.span>
        </div>

        {/* title */}
        <h3 className="mt-4 font-body text-[18px] md:text-[19px] font-semibold tracking-tight text-white">
          {cap.title}
        </h3>

        {/* tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {cap.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1.5 font-mono-custom text-[10px] uppercase tracking-[0.14em] text-white/55"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Active indicator line */}
      {active && (
        <motion.div
          layoutId="capActiveLine"
          className="pointer-events-none absolute left-5 right-5 -bottom-2 h-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0) 0%, hsl(var(--primary) / 0.8) 35%, rgba(255,255,255,0) 100%)",
            filter: "blur(0px)",
          }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
    </div>
  );
};

const Capabilities = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : true),
    []
  );

  return (
    <section className="section-padding relative overflow-hidden">
      {/* background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 20%, hsl(var(--primary) / 0.12) 0%, transparent 60%), radial-gradient(1000px 520px at 80% 70%, rgba(120, 80, 255, 0.10) 0%, transparent 65%)",
        }}
      />
      <div className="container-custom relative">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="section-label mb-3">Capabilities</p>
          <h2 className="font-body text-[clamp(2.1rem,5.6vw,4.1rem)] font-semibold leading-[1.05] tracking-tight text-white mb-3">
            What I Build
          </h2>
          <p className="font-body text-[14px] leading-relaxed text-white/55">
            End-to-end 3D production, realtime experiences, and product-ready visuals — optimized for web and motion.
          </p>
        </div>

        <div
          className="relative"
          style={{
            perspective: reduceMotion ? "none" : "1200px",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 auto-rows-fr">
            {capabilities.map((cap, i) => (
              <CapabilityCard
                key={cap.num}
                cap={cap}
                index={i}
                active={activeIndex === i}
                onActivate={(idx) => setActiveIndex(idx)}
                onDeactivate={() => setActiveIndex(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
