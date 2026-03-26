import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Play, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   DESIGN TOKENS (matches global design system)
───────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   DATA — motion graphics projects
───────────────────────────────────────────────────────────── */
const pieces = [
  {
    id: "byjus-stem",
    index: "01",
    title: "Byju's STEM",
    subtitle: "Motion System",
    client: "Byju's",
    year: "2022",
    duration: "2:40",
    tags: ["After Effects", "3D Animation", "Template System"],
    description:
      "Reusable motion template system for large-scale animated STEM education. 100+ modules delivered across science, math, and physics — each rendered for millions of students.",
    impact: "Best Employee Award 3× · +40% production efficiency",
    gradient: "radial-gradient(ellipse at 40% 60%, #1a0d2e 0%, #0d0618 55%, #040209 100%)",
    accent: "#c084fc",
    // Animated lines simulating motion graphic content
    lines: [
      { w: "72%", delay: 0 }, { w: "55%", delay: 0.08 }, { w: "88%", delay: 0.16 },
      { w: "40%", delay: 0.24 }, { w: "66%", delay: 0.32 },
    ],
  },
  {
    id: "product-reveals",
    index: "02",
    title: "Product Reveals",
    subtitle: "3D Motion",
    client: "MetaShop AI",
    year: "2024",
    duration: "0:45",
    tags: ["Blender", "After Effects", "Product Viz"],
    description:
      "Cinematic 3D product reveal animations for e-commerce brands — combining Gaussian Splatting renders with motion-designed overlays and kinetic typography.",
    impact: "50+ product assets · Real-time AR integration",
    gradient: "radial-gradient(ellipse at 65% 35%, #1a0a00 0%, #2a1000 50%, #080400 100%)",
    accent: "#fb923c",
    lines: [
      { w: "60%", delay: 0 }, { w: "80%", delay: 0.1 }, { w: "45%", delay: 0.2 },
      { w: "70%", delay: 0.3 }, { w: "55%", delay: 0.4 },
    ],
  },
  {
    id: "event-montages",
    index: "03",
    title: "Event Montages",
    subtitle: "Live Capture",
    client: "IBW · Tata · Kesari",
    year: "2025",
    duration: "3:12",
    tags: ["Premiere Pro", "Color Grading", "Motion Design"],
    description:
      "High-energy event recap videos for India Bike Week, Tata automotive activations, and Kesari Weddings — combining drone footage, motion graphics overlays, and branded typography.",
    impact: "12 events documented · Multi-platform delivery",
    gradient: "radial-gradient(ellipse at 30% 70%, #1e3a5f 0%, #0a1628 55%, #060c16 100%)",
    accent: "#4a9eff",
    lines: [
      { w: "85%", delay: 0 }, { w: "50%", delay: 0.07 }, { w: "75%", delay: 0.14 },
      { w: "62%", delay: 0.21 }, { w: "90%", delay: 0.28 },
    ],
  },
  {
    id: "brand-idents",
    index: "04",
    title: "Brand Idents",
    subtitle: "Identity in Motion",
    client: "Various",
    year: "2023",
    duration: "0:08–0:15",
    tags: ["Cinema 4D", "After Effects", "Logo Animation"],
    description:
      "Short-form animated brand identities and logo reveals for startups and agencies — crafted with layered motion, precise timing, and sound design alignment.",
    impact: "15+ brands · Delivered in 5-day turnaround",
    gradient: "radial-gradient(ellipse at 70% 40%, #0d2818 0%, #051510 50%, #020806 100%)",
    accent: "#4ade80",
    lines: [
      { w: "65%", delay: 0 }, { w: "90%", delay: 0.09 }, { w: "48%", delay: 0.18 },
      { w: "77%", delay: 0.27 }, { w: "58%", delay: 0.36 },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   ANIMATED REEL THUMBNAIL (simulates motion graphic content)
───────────────────────────────────────────────────────────── */
function ReelThumbnail({
  piece,
  isHovered,
  isActive,
}: {
  piece: (typeof pieces)[0];
  isHovered: boolean;
  isActive: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-[-4%]"
        style={{ background: piece.gradient }}
        animate={{ scale: isHovered ? 1.04 : 1 }}
        transition={{ duration: 0.7, ease: EASE }}
      />

      {/* Accent glow */}
      <div
        className="absolute -inset-12 opacity-30 blur-[60px] pointer-events-none"
        style={{ background: `radial-gradient(circle, ${piece.accent} 0%, transparent 65%)` }}
      />

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {/* Animated motion lines — simulate timeline / waveform */}
      <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 space-y-2.5">
        {piece.lines.map((line, i) => (
          <motion.div
            key={i}
            className="h-[2px] rounded-full"
            style={{ background: `${piece.accent}60` }}
            animate={{
              width: isActive || isHovered ? line.w : "0%",
              opacity: isActive || isHovered ? 1 : 0,
            }}
            transition={{
              duration: 0.6,
              delay: line.delay,
              ease: EASE,
            }}
          />
        ))}
      </div>

      {/* Scan-line animation when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${piece.accent}80, transparent)` }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      {/* Play button */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md border"
              style={{ background: `${piece.accent}22`, borderColor: `${piece.accent}55` }}
            >
              <Play className="w-5 h-5 ml-0.5" style={{ color: piece.accent }} fill="currentColor" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Duration badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: piece.accent }} />
        <span className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-white/60">
          {piece.duration}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED REEL CARD (large, top hero)
───────────────────────────────────────────────────────────── */
function FeaturedCard({ piece }: { piece: (typeof pieces)[0] }) {
  const [hovered, setHovered] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRX = useSpring(rotX, { stiffness: 180, damping: 20 });
  const sRY = useSpring(rotY, { stiffness: 180, damping: 20 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 8);
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * -6);
  }, [rotX, rotY]);

  const onLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] cursor-pointer"
      style={{
        aspectRatio: "16/7",
        rotateX: sRX,
        rotateY: sRY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { onLeave(); setHovered(false); }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      <ReelThumbnail piece={piece} isHovered={hovered} isActive />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-20">
        <div>
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] mb-2" style={{ color: piece.accent }}>
            {piece.client} · {piece.year}
          </p>
          <h3 className="font-body italic text-white leading-[0.95]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
            {piece.title}{" "}
            <span className="text-white/45">{piece.subtitle}</span>
          </h3>
        </div>
        <div className="flex gap-2 shrink-0 ml-4">
          {piece.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="rounded-full border bg-black/30 px-3 py-1 font-mono-custom text-[9px] uppercase tracking-[0.12em] text-white/65 backdrop-blur-sm"
              style={{ borderColor: `${piece.accent}30` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   GRID CARD
───────────────────────────────────────────────────────────── */
function GridCard({
  piece,
  index,
  onExpand,
}: {
  piece: (typeof pieces)[0];
  index: number;
  onExpand: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] cursor-pointer"
      style={{ aspectRatio: "4/3" }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onExpand(piece.id)}
      whileHover={{ y: -5 }}
    >
      <ReelThumbnail piece={piece} isHovered={hovered} isActive={false} />

      {/* Bottom labels */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="font-mono-custom text-[9px] uppercase tracking-[0.18em] mb-1"
              style={{ color: piece.accent }}
            >
              {piece.index}
            </p>
            <p className="font-body font-medium text-[15px] text-white leading-tight">
              {piece.title}
            </p>
            <p className="font-body text-[12px] text-white/45 mt-0.5">{piece.subtitle}</p>
          </div>
          <motion.div
            className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
            style={{ borderColor: `${piece.accent}50` }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <ArrowUpRight className="w-3.5 h-3.5" style={{ color: piece.accent }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EXPAND MODAL / DETAIL OVERLAY
───────────────────────────────────────────────────────────── */
function ExpandedModal({
  piece,
  onClose,
}: {
  piece: (typeof pieces)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-end md:items-center justify-center p-0 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />

      {/* Panel */}
      <motion.div
        className="relative w-full md:max-w-3xl rounded-t-3xl md:rounded-3xl overflow-hidden border border-white/[0.1]"
        style={{ background: "#0e0e0e" }}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Thumbnail */}
        <div className="relative h-52 md:h-64 overflow-hidden">
          <div className="absolute inset-0" style={{ background: piece.gradient }} />
          <div className="absolute -inset-12 opacity-40 blur-[60px]" style={{ background: `radial-gradient(circle, ${piece.accent} 0%, transparent 65%)` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />

          {/* Animated lines always on in modal */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 space-y-2.5">
            {piece.lines.map((line, i) => (
              <motion.div
                key={i}
                className="h-[2px] rounded-full"
                style={{ background: `${piece.accent}70` }}
                initial={{ width: "0%" }}
                animate={{ width: line.w }}
                transition={{ duration: 0.8, delay: 0.2 + line.delay, ease: EASE }}
              />
            ))}
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/70" />
          </button>

          {/* Duration */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: piece.accent }} />
            <span className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-white/55">{piece.duration}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] mb-2" style={{ color: piece.accent }}>
                {piece.client} · {piece.year}
              </p>
              <h3 className="font-body italic text-white text-[1.8rem] leading-tight">
                {piece.title} <span className="text-white/45">{piece.subtitle}</span>
              </h3>
            </div>
            <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-white/35 shrink-0 mt-1">
              {piece.index}/{String(pieces.length).padStart(2, "0")}
            </span>
          </div>

          <p className="font-body text-[14px] leading-[1.85] text-white/60">{piece.description}</p>

          <div
            className="rounded-xl p-4 border"
            style={{ background: `${piece.accent}0a`, borderColor: `${piece.accent}25` }}
          >
            <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] mb-1" style={{ color: piece.accent }}>
              Impact
            </p>
            <p className="font-body text-[13px] text-white/75">{piece.impact}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {piece.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border px-3 py-1 font-mono-custom text-[9px] uppercase tracking-[0.12em]"
                style={{ borderColor: `${piece.accent}35`, color: `${piece.accent}cc` }}
              >
                {t}
              </span>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 rounded-full py-3.5 font-body text-[14px] font-semibold text-primary-foreground transition-[filter] hover:brightness-110"
            style={{ background: piece.accent, color: "#0a0a0a" }}
          >
            <Play className="w-4 h-4" fill="currentColor" />
            Play Reel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   KINETIC TICKER — motion design aesthetic
───────────────────────────────────────────────────────────── */
function KineticTicker() {
  const items = ["After Effects", "Motion Design", "3D Animation", "2.5D", "Visual Storytelling",
    "Blender", "Premiere Pro", "Kinetic Typography", "Color Grading", "Template Systems"];

  return (
    <div className="border-y border-white/[0.07] overflow-hidden py-3 my-16">
      <div
        className="whitespace-nowrap flex gap-8"
        style={{ animation: "marquee 18s linear infinite" }}
      >
        {[0, 1, 2].map((rep) => (
          <span key={rep} className="inline-flex gap-8 shrink-0">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4">
                <span
                  className="font-mono-custom uppercase text-[11px] tracking-[0.18em]"
                  style={{
                    color: i % 3 === 0 ? "hsl(var(--primary))" : "rgba(255,255,255,0.28)",
                    WebkitTextStroke: i % 3 === 1 ? "1px hsl(var(--primary))" : undefined,
                    WebkitTextFillColor: i % 3 === 1 ? "transparent" : undefined,
                  }}
                >
                  {item}
                </span>
                <span className="text-white/15">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROCESS ROW — how motion work is made
───────────────────────────────────────────────────────────── */
function ProcessRow() {
  const steps = [
    { num: "01", label: "Concept", desc: "Brief, storyboard, timing" },
    { num: "02", label: "Design", desc: "Frames, palette, type" },
    { num: "03", label: "Animate", desc: "Keyframes, easing, rigs" },
    { num: "04", label: "Render", desc: "Output, export, deliver" },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 border-t border-white/[0.07] mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {steps.map((s, i) => (
        <motion.div
          key={s.num}
          className="py-8 pr-6 border-r border-white/[0.07] last:border-r-0"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
          }}
        >
          <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/30">{s.num}</span>
          <p className="font-body italic text-white text-[1.3rem] mt-2 mb-1">{s.label}</p>
          <p className="font-body text-[12px] text-white/40 leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const WorkMotion = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], ["0%", "12%"]);

  const expandedPiece = pieces.find((p) => p.id === expanded) ?? null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* ── Back nav ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
        <span className="font-mono-custom text-[11px] uppercase tracking-[0.15em] text-white/25">
          Motion Graphics
        </span>
      </div>

      {/* ── HERO ── */}
      <div ref={heroRef} className="pt-28 md:pt-36 pb-8 px-6 md:px-12 max-w-[1200px] mx-auto">
        <motion.div style={{ opacity: heroOpacity, y: heroY }}>

          {/* Label + title */}
          <motion.p
            className="section-label mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Motion Graphics
          </motion.p>

          <div className="overflow-hidden mb-3">
            <motion.h1
              className="font-body italic text-white leading-[0.9]"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
            >
              Animated
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="font-body italic leading-[0.9]"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 8rem)",
                color: "hsl(var(--primary))",
              }}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.16 }}
            >
              Narratives.
            </motion.h1>
          </div>

          <motion.p
            className="font-body text-[15px] leading-relaxed text-white/50 max-w-[44ch] mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
          >
            Motion-focused work spanning education, products, events, and brand identity —
            each piece built with precise timing, kinetic typography, and visual storytelling.
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex items-center gap-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            {[
              { num: "100+", label: "Modules" },
              { num: "4+", label: "Years" },
              { num: "3×", label: "Awarded" },
            ].map((s, i) => (
              <div
                key={i}
                className={`flex flex-col gap-1 ${i > 0 ? "border-l border-white/[0.08] pl-6 ml-6" : ""}`}
              >
                <span className="font-body italic text-white/90 text-xl">{s.num}</span>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-white/35">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── FEATURED REEL ── */}
      <motion.div
        className="px-6 md:px-12 max-w-[1200px] mx-auto mb-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        <FeaturedCard piece={pieces[0]} />
      </motion.div>

      {/* ── KINETIC TICKER ── */}
      <KineticTicker />

      {/* ── GRID ── */}
      <div className="px-6 md:px-12 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10"
        >
          <p className="section-label mb-2">All Work</p>
          <h2 className="font-body italic text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            Full Reel
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pieces.map((piece, i) => (
            <GridCard
              key={piece.id}
              piece={piece}
              index={i}
              onExpand={setExpanded}
            />
          ))}
        </div>

        {/* Process row */}
        <ProcessRow />

        {/* CTA */}
        <motion.div
          className="text-center py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-white/35 mb-6">
            Need motion work?
          </p>
          <a
            href="mailto:gadakhsandesh@gmail.com"
            className="inline-flex items-center gap-3 font-body italic text-white hover:text-primary transition-colors duration-300"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
          >
            Let's collaborate
            <ArrowUpRight className="w-8 h-8 shrink-0" />
          </a>
        </motion.div>
      </div>

      {/* ── EXPAND MODAL ── */}
      <AnimatePresence>
        {expandedPiece && (
          <ExpandedModal piece={expandedPiece} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkMotion;