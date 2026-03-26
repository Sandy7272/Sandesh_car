import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ArrowLeft, Eye, X } from "lucide-react";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

declare global {
  interface Window {
    THREE?: typeof import("three");
  }
}

/* ─────────────────────────────────────────────────────────────
   DATA — Sandesh's 3D work
   Each piece has a gradient that simulates a cinematic render.
   Swap `gradient` for a real image URL once you have renders.
───────────────────────────────────────────────────────────── */
const works = [
  {
    id: "lt-realty",
    index: "001",
    title: "L&T Realty",
    subtitle: "Sample Flat Walkthroughs",
    tags: ["Gaussian Splatting", "Real Estate", "NeRF"],
    client: "MetaShop AI × L&T Realty",
    year: "2024",
    size: "full",   // full-width hero
    aspect: "21/9",
    gradient: "radial-gradient(ellipse at 30% 55%, #0d2340 0%, #071522 45%, #030c14 100%)",
    accent: "#4a9eff",
    accentDark: "#0d2340",
    description: "Photorealistic Gaussian Splat walkthroughs of luxury sample flats in Thane and Noida. Delivered within 24 hours via MetaShop AI's automated NeRF pipeline.",
    spec: "Nerfstudio · Gaussian Splatting · Custom Viewer",
  },
  {
    id: "ultraviolette",
    index: "002",
    title: "Ultraviolette EV",
    subtitle: "Space Station Showroom",
    tags: ["AR Ready", "Automotive", "Real-time"],
    client: "Ultraviolette",
    year: "2024",
    size: "half-left",
    aspect: "3/4",
    gradient: "radial-gradient(ellipse at 60% 40%, #0d3320 0%, #051a10 45%, #020a06 100%)",
    accent: "#4ade80",
    accentDark: "#0d3320",
    description: "Full spatial reconstruction of the Ultraviolette EV showroom, enabling an interactive brand experience that mirrors the physical space with cinematic fidelity.",
    spec: "Gaussian Splatting · WebGL Viewer · AR Export",
  },
  {
    id: "kesari-weddings",
    index: "003",
    title: "Kesari Weddings",
    subtitle: "12 Goa Resort Properties",
    tags: ["Virtual Tour", "Events", "Video-to-3D"],
    client: "Kesari Awayddings",
    year: "2024",
    size: "half-right",
    aspect: "3/4",
    gradient: "radial-gradient(ellipse at 40% 65%, #2a0e0e 0%, #150606 45%, #080202 100%)",
    accent: "#ff6b6b",
    accentDark: "#2a0e0e",
    description: "12 resort villas and event venues reconstructed in 3D from drone and handheld footage — giving couples a cinematic walkthrough of their dream wedding location.",
    spec: "NeRF · Drone Capture · Real-time Viewer",
  },
  {
    id: "ibw-2025",
    index: "004",
    title: "India Bike Week",
    subtitle: "Event Environment Capture",
    tags: ["Live Event", "3D Capture", "Documentation"],
    client: "IBW 2025",
    year: "2025",
    size: "full",
    aspect: "21/9",
    gradient: "radial-gradient(ellipse at 70% 45%, #2d1a00 0%, #180d00 45%, #080400 100%)",
    accent: "#fb923c",
    accentDark: "#2d1a00",
    description: "Full 3D environment capture of the India Bike Week 2025 grounds in Pachgani — activation zones, stage areas, and brand installations reconstructed for post-event use.",
    spec: "Gaussian Splatting · Multi-point Capture · Export Pipeline",
  },
  {
    id: "italica",
    index: "005",
    title: "Italica Furniture",
    subtitle: "154 Products · 3D Pipeline",
    tags: ["E-commerce", "Product 3D", "Automation"],
    client: "Italica",
    year: "2023",
    size: "half-left",
    aspect: "4/3",
    gradient: "radial-gradient(ellipse at 50% 50%, #1a1a0d 0%, #0d0d06 45%, #050503 100%)",
    accent: "#fde68a",
    accentDark: "#1a1a0d",
    description: "Automated pipeline converting 154 furniture SKUs into real-time 3D assets — optimized for web viewers, AR try-ons, and e-commerce product pages.",
    spec: "Image-to-3D · LOD Optimization · AR Ready",
  },
  {
    id: "material-depot",
    index: "006",
    title: "Material Depot",
    subtitle: "Tile & Surface Library",
    tags: ["Materials", "3D Scanning", "E-commerce"],
    client: "Material Depot",
    year: "2023",
    size: "half-right",
    aspect: "4/3",
    gradient: "radial-gradient(ellipse at 35% 60%, #1a0d2e 0%, #0d0618 45%, #040209 100%)",
    accent: "#c084fc",
    accentDark: "#1a0d2e",
    description: "1000+ tile and surface SKUs digitized as PBR material assets — enabling customers to visualise products in their own spaces via an embedded AR viewer.",
    spec: "PBR Scanning · Material Library · WebXR",
  },
];

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Work = (typeof works)[0];

/* ─────────────────────────────────────────────────────────────
   THREE.JS HERO SPHERE (inline, no npm)
───────────────────────────────────────────────────────────── */
function HeroSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const init = () => {
      const THREE = window.THREE;
      if (!THREE || !container) return;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.z = 5;

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.2));
      const pl = new THREE.PointLight(0x4a9eff, 4, 14); pl.position.set(3, 3, 3); scene.add(pl);
      const pl2 = new THREE.PointLight(0xff6b6b, 2, 10); pl2.position.set(-3, -2, 2); scene.add(pl2);

      // Core sphere
      const geo = new THREE.IcosahedronGeometry(1.1, 4);
      const mat = new THREE.MeshPhongMaterial({ color: 0x0a0a0a, emissive: 0x1a3a5c, emissiveIntensity: 0.4, shininess: 200 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Wire
      const wGeo = new THREE.IcosahedronGeometry(1.14, 2);
      const wMat = new THREE.MeshBasicMaterial({ color: 0x4a9eff, wireframe: true, transparent: true, opacity: 0.18 });
      const wire = new THREE.Mesh(wGeo, wMat);
      scene.add(wire);

      // Rings
      [[1.6, 0.005, 0xff4a00, 0.35, 0.7, 0.2], [2.1, 0.003, 0x4a9eff, 0.18, -0.4, 1.1], [2.6, 0.002, 0xffffff, 0.07, 1.4, 0.4]]
        .forEach(([r, t, c, o, rx, rz]) => {
          const g = new THREE.TorusGeometry(r as number, t as number, 4, 80);
          const m = new THREE.MeshBasicMaterial({ color: c as number, transparent: true, opacity: o as number });
          const ring = new THREE.Mesh(g, m);
          ring.rotation.x = rx as number; ring.rotation.z = rz as number;
          scene.add(ring);
        });

      // Particles
      const pCount = 2000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        const r = 2 + Math.random() * 7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i*3+2] = r * Math.cos(phi);
        const isBlue = Math.random() > 0.6;
        pCol[i*3] = isBlue ? 0.29 : 0.85; pCol[i*3+1] = isBlue ? 0.6 : 0.82; pCol[i*3+2] = isBlue ? 1.0 : 0.8;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.028, vertexColors: true, transparent: true, opacity: 0.65 }));
      scene.add(pts);

      let tx = 0, ty = 0;
      const onMouse = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth - 0.5) * 1.2;
        ty = -(e.clientY / window.innerHeight - 0.5) * 1.0;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        if (!container.clientWidth) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };
      window.addEventListener("resize", onResize);

      let animId: number;
      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.004;
        mesh.rotation.y = t * 0.2; mesh.rotation.x = t * 0.1;
        wire.rotation.y = -t * 0.15; wire.rotation.x = t * 0.08;
        pts.rotation.y = t * 0.03;
        mesh.position.y = Math.sin(t * 0.7) * 0.08;
        camera.position.x += (tx - camera.position.x) * 0.04;
        camera.position.y += (ty - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    if (window.THREE) {
      const cleanup = init();
      return cleanup;
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      let cleanup: (() => void) | undefined;
      script.onload = () => { cleanup = init() ?? undefined; };
      document.head.appendChild(script);
      return () => { cleanup?.(); };
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="w-full h-full" style={{ background: "radial-gradient(ellipse at 50% 50%, #0d2340 0%, #030c14 100%)" }} />
    );
  }
  return <div ref={containerRef} className="absolute inset-0" />;
}

/* ─────────────────────────────────────────────────────────────
   RENDER CARD — simulates a cinematic 3D render
───────────────────────────────────────────────────────────── */
function RenderCard({
  work,
  onOpen,
  priority = false,
}: {
  work: Work;
  onOpen: (w: Work) => void;
  priority?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRX = useSpring(rotX, { stiffness: 160, damping: 22 });
  const sRY = useSpring(rotY, { stiffness: 160, damping: 22 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rotY.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    rotX.set(((e.clientY - r.top) / r.height - 0.5) * -5);
  }, [rotX, rotY]);

  const onLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, [rotX, rotY]);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden cursor-pointer group"
      style={{
        aspectRatio: work.aspect,
        rotateX: sRX,
        rotateY: sRY,
        transformStyle: "preserve-3d",
        perspective: "1200px",
        borderRadius: "4px",
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.9, ease: EASE, delay: priority ? 0 : 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); onLeave(); }}
      onMouseMove={onMove}
      onClick={() => onOpen(work)}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-[-6%]"
        style={{ background: work.gradient, y: bgY, willChange: "transform" }}
      />

      {/* Accent glow */}
      <div
        className="absolute -inset-16 opacity-25 blur-[80px] pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${work.accent} 0%, transparent 65%)`,
          opacity: hovered ? 0.4 : 0.2,
        }}
      />

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

      {/* Simulated 3D object in scene */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: hovered ? 1.08 : 1,
            opacity: hovered ? 0.9 : 0.55,
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Glassy floating object */}
          <div
            className="relative"
            style={{
              width: "clamp(80px, 12vw, 160px)",
              height: "clamp(80px, 12vw, 160px)",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl md:rounded-3xl"
              style={{
                background: `linear-gradient(145deg, ${work.accent}25 0%, transparent 50%, rgba(0,0,0,0.3) 100%)`,
                boxShadow: `inset 0 1px 0 ${work.accent}40, 0 24px 80px rgba(0,0,0,0.7), 0 0 60px ${work.accent}15`,
                border: `1px solid ${work.accent}20`,
                transform: "translateZ(24px)",
              }}
            />
            {/* Inner highlight */}
            <div
              className="absolute top-[15%] left-[15%] right-[40%] bottom-[40%] rounded-full blur-xl opacity-40"
              style={{ background: work.accent }}
            />
          </div>
        </motion.div>
      </div>

      {/* Horizontal scan line on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute left-0 right-0 h-[1px] pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${work.accent}70, transparent)` }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "105%", opacity: [0, 0.8, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
          />
        )}
      </AnimatePresence>

      {/* Top metadata */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
        <span className="font-mono-custom text-[9px] uppercase tracking-[0.22em] text-white/35">
          {work.index}
        </span>
        <span
          className="font-mono-custom text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border backdrop-blur-sm"
          style={{ borderColor: `${work.accent}30`, color: `${work.accent}bb`, background: `${work.accentDark}80` }}
        >
          {work.year}
        </span>
      </div>

      {/* Bottom info — slides up on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6"
        animate={{ y: hovered ? 0 : 6 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {/* Tags */}
        <motion.div
          className="flex flex-wrap gap-1.5 mb-3"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {work.tags.map((t) => (
            <span
              key={t}
              className="font-mono-custom text-[8px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border backdrop-blur-sm"
              style={{ borderColor: `${work.accent}25`, color: "rgba(255,255,255,0.5)" }}
            >
              {t}
            </span>
          ))}
        </motion.div>

        <div className="flex items-end justify-between">
          <div>
            <p className="font-body italic text-white leading-tight" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)" }}>
              {work.title}
            </p>
            <p className="font-body text-[12px] text-white/40 mt-0.5">{work.subtitle}</p>
          </div>

          {/* View button */}
          <motion.div
            className="flex items-center gap-1.5 ml-4 shrink-0"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <Eye className="w-3.5 h-3.5" style={{ color: work.accent }} />
            <span className="font-mono-custom text-[9px] uppercase tracking-[0.15em]" style={{ color: work.accent }}>
              View
            </span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DETAIL MODAL — full-screen cinematic lightbox
───────────────────────────────────────────────────────────── */
function DetailModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[500] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/92 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-4xl mx-4 md:mx-8 rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ background: "#0a0a0a" }}
        initial={{ scale: 0.94, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {/* Visual header */}
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/7" }}>
          <div className="absolute inset-0" style={{ background: work.gradient }} />
          <div
            className="absolute -inset-20 opacity-35 blur-[80px]"
            style={{ background: `radial-gradient(circle, ${work.accent} 0%, transparent 65%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          {/* Glassy object */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 md:w-32 md:h-32 rounded-3xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              style={{
                background: `linear-gradient(145deg, ${work.accent}20 0%, transparent 55%, rgba(0,0,0,0.3) 100%)`,
                boxShadow: `inset 0 1px 0 ${work.accent}45, 0 20px 60px rgba(0,0,0,0.6)`,
                border: `1px solid ${work.accent}25`,
              }}
            />
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors z-30"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>

          {/* Index */}
          <span className="absolute top-4 left-4 font-mono-custom text-[9px] uppercase tracking-[0.22em] text-white/25">
            {work.index}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 md:grid md:grid-cols-[1fr_auto] md:gap-12">
          <div className="space-y-5">
            <div>
              <p
                className="font-mono-custom text-[10px] uppercase tracking-[0.22em] mb-2"
                style={{ color: work.accent }}
              >
                {work.client} · {work.year}
              </p>
              <h2 className="font-body italic text-white leading-tight" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
                {work.title}{" "}
                <span className="text-white/35">{work.subtitle}</span>
              </h2>
            </div>

            <p className="font-body text-[14px] leading-[1.85] text-white/55">{work.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {work.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-3 py-1.5 font-mono-custom text-[9px] uppercase tracking-[0.13em]"
                  style={{ borderColor: `${work.accent}35`, color: `${work.accent}cc` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Specs sidebar */}
          <div className="mt-6 md:mt-0 md:w-48 shrink-0 space-y-5 border-t border-white/[0.06] pt-5 md:border-t-0 md:pt-0 md:border-l md:pl-8">
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-white/28 mb-1.5">Pipeline</p>
              <p className="font-body text-[13px] text-white/60 leading-relaxed">{work.spec}</p>
            </div>
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-white/28 mb-1.5">Client</p>
              <p className="font-body text-[13px] text-white/60">{work.client}</p>
            </div>
            <div>
              <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-white/28 mb-1.5">Year</p>
              <p className="font-body text-[13px] text-white/60">{work.year}</p>
            </div>

            <a
              href="mailto:gadakhsandesh@gmail.com"
              className="inline-flex items-center gap-2 w-full justify-center rounded-full py-3 font-body text-[13px] font-semibold transition-[filter] hover:brightness-110 mt-2"
              style={{ background: work.accent, color: "#0a0a0a" }}
            >
              Discuss Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MASONRY-STYLE GALLERY — Behance full-bleed editorial layout
───────────────────────────────────────────────────────────── */
function Gallery({ onOpen }: { onOpen: (w: Work) => void }) {
  // Row 1: full width
  const row1 = works.filter((w) => w.id === "lt-realty");
  // Row 2: two halves
  const row2 = works.filter((w) => w.id === "ultraviolette" || w.id === "kesari-weddings");
  // Row 3: full width
  const row3 = works.filter((w) => w.id === "ibw-2025");
  // Row 4: two halves
  const row4 = works.filter((w) => w.id === "italica" || w.id === "material-depot");

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Row 1 — cinematic full bleed */}
      <div className="w-full">
        {row1.map((w) => <RenderCard key={w.id} work={w} onOpen={onOpen} priority />)}
      </div>

      {/* Row 2 — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {row2.map((w) => <RenderCard key={w.id} work={w} onOpen={onOpen} />)}
      </div>

      {/* Row 3 — full bleed */}
      <div className="w-full">
        {row3.map((w) => <RenderCard key={w.id} work={w} onOpen={onOpen} />)}
      </div>

      {/* Row 4 — side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {row4.map((w) => <RenderCard key={w.id} work={w} onOpen={onOpen} />)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    { num: "50+", label: "3D Projects" },
    { num: "154", label: "Product Assets" },
    { num: "12", label: "Event Captures" },
    { num: "24h", label: "Delivery Time" },
  ];

  return (
    <motion.div
      className="border-y border-white/[0.07] grid grid-cols-2 md:grid-cols-4 my-16 md:my-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className={`py-8 text-center ${i < stats.length - 1 ? "border-r border-white/[0.07]" : ""}`}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } }}
        >
          <p className="font-body italic text-white leading-none mb-1" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            {s.num}
          </p>
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/30">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TECH STACK STRIP
───────────────────────────────────────────────────────────── */
function TechStrip() {
  const items = [
    "Gaussian Splatting", "Nerfstudio", "Blender", "3DS Max", "Maya",
    "Unreal Engine", "Three.js", "Substance Painter", "WebXR", "NeRF",
  ];

  return (
    <div className="border-y border-white/[0.07] overflow-hidden py-3 mb-16 md:mb-24">
      <div className="whitespace-nowrap flex" style={{ animation: "marquee 22s linear infinite" }}>
        {[0, 1, 2].map((rep) => (
          <span key={rep} className="inline-flex shrink-0">
            {items.map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-4">
                <span
                  className="font-mono-custom uppercase text-[10px] tracking-[0.2em]"
                  style={{
                    color: i % 4 === 0 ? "hsl(var(--primary))" : i % 4 === 2 ? "#4a9eff" : "rgba(255,255,255,0.22)",
                  }}
                >
                  {item}
                </span>
                <span className="text-white/10">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Work3D = () => {
  const [modal, setModal] = useState<Work | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* ── Nav bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 md:px-10 h-14 md:h-18"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)" }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>
        <span className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/20">
          3D Work
        </span>
      </div>

      {/* ── CINEMATIC HERO ── */}
      <div ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Three.js sphere — fills right half */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroY }}
        >
          <HeroSphere />
        </motion.div>

        {/* Left-side blackout gradient so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-14 md:pb-20 px-5 md:px-10 max-w-3xl"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.p
            className="section-label mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          >
            3D Work · Cinematic Renders
          </motion.p>

          {/* Title lines */}
          {["Spatial", "Experiences."].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h1
                className={`font-body italic leading-[0.88] ${i === 1 ? "text-primary" : "text-white"}`}
                style={{ fontSize: "clamp(4rem, 10vw, 9.5rem)" }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
              >
                {line}
              </motion.h1>
            </div>
          ))}

          {/* Supporting text */}
          <motion.p
            className="font-body text-[14px] md:text-[15px] text-white/45 max-w-[42ch] mt-6 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
          >
            Real estate walkthroughs, product visualisations, event reconstructions, and e-commerce 3D assets — built on Gaussian Splatting, NeRF, and real-time WebGL pipelines.
          </motion.p>

          {/* CTA + scroll hint */}
          <motion.div
            className="flex items-center gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.52 }}
          >
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono-custom text-[11px] uppercase tracking-[0.15em] bg-primary text-primary-foreground hover:brightness-110 transition-[filter]"
            >
              View All Work
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.15em] text-white/25">
              <div className="w-6 h-[1px] bg-white/20" />
              Scroll
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
        </motion.div>
      </div>

      {/* ── GALLERY ── */}
      <div id="gallery" className="px-3 md:px-5 pt-3 md:pt-5">
        <Gallery onOpen={setModal} />
      </div>

      {/* ── STATS STRIP ── */}
      <div className="px-5 md:px-10 max-w-[1200px] mx-auto">
        <StatsStrip />
      </div>

      {/* ── TECH STRIP ── */}
      <TechStrip />

      {/* ── CTA ── */}
      <motion.div
        className="px-5 md:px-10 max-w-[1200px] mx-auto text-center pb-28"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/25 mb-6">
          Have a spatial challenge?
        </p>
        <a
          href="mailto:gadakhsandesh@gmail.com"
          className="inline-flex items-center gap-3 font-body italic text-white hover:text-primary transition-colors duration-300"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Let's build it.
          <ArrowUpRight className="w-10 h-10 shrink-0" />
        </a>
      </motion.div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modal && <DetailModal work={modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Work3D;