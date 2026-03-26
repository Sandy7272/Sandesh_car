import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import { ArrowUpRight, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Lenis from "lenis";

/* ─────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────────────────────
   3D RENDER DATA
   These are YOUR personal 3D artworks — props, scenes, renders.
   Replace `placeholder` gradient with real image paths once
   you export renders from Blender / Maya / Unreal.
   Format: /renders/filename.jpg  (drop into /public/renders/)
───────────────────────────────────────────────────────────── */
const renders = [
  {
    id: "r01",
    title: "Architectural Interior",
    category: "Scene Render",
    software: "Blender · Cycles",
    year: "2024",
    aspect: "landscape", // 16/9
    placeholder: "radial-gradient(ellipse at 35% 45%, #0d2340 0%, #071522 50%, #020810 100%)",
    accent: "#4a9eff",
    // image: "/renders/architectural-interior.jpg",
  },
  {
    id: "r02",
    title: "Product Hero Shot",
    category: "Product Viz",
    software: "Blender · EEVEE",
    year: "2024",
    aspect: "portrait", // 3/4
    placeholder: "radial-gradient(ellipse at 60% 30%, #1a0a00 0%, #2a1200 45%, #080400 100%)",
    accent: "#fb923c",
    // image: "/renders/product-hero.jpg",
  },
  {
    id: "r03",
    title: "Sci-Fi Environment",
    category: "Environment",
    software: "Blender · Cycles",
    year: "2023",
    aspect: "landscape",
    placeholder: "radial-gradient(ellipse at 50% 60%, #0a0020 0%, #140a30 45%, #05020f 100%)",
    accent: "#818cf8",
    // image: "/renders/scifi-env.jpg",
  },
  {
    id: "r04",
    title: "Automotive Lighting",
    category: "Product Viz",
    software: "3DS Max · V-Ray",
    year: "2024",
    aspect: "landscape",
    placeholder: "radial-gradient(ellipse at 40% 70%, #0d3320 0%, #051510 50%, #020806 100%)",
    accent: "#4ade80",
    // image: "/renders/automotive.jpg",
  },
  {
    id: "r05",
    title: "Luxury Interior",
    category: "Arch Viz",
    software: "Blender · Cycles",
    year: "2023",
    aspect: "portrait",
    placeholder: "radial-gradient(ellipse at 30% 50%, #1a1208 0%, #0e0c04 50%, #05040200 100%)",
    accent: "#fde68a",
    // image: "/renders/luxury-interior.jpg",
  },
  {
    id: "r06",
    title: "Character Study",
    category: "Character",
    software: "Maya · Arnold",
    year: "2023",
    aspect: "portrait",
    placeholder: "radial-gradient(ellipse at 55% 35%, #1a0a2e 0%, #0d0618 50%, #040209 100%)",
    accent: "#c084fc",
    // image: "/renders/character.jpg",
  },
  {
    id: "r07",
    title: "Material Study",
    category: "PBR Materials",
    software: "Substance · Blender",
    year: "2024",
    aspect: "landscape",
    placeholder: "radial-gradient(ellipse at 65% 55%, #0a1a0d 0%, #050f08 50%, #020604 100%)",
    accent: "#34d399",
    // image: "/renders/material-study.jpg",
  },
  {
    id: "r08",
    title: "Abstract Form",
    category: "Concept Art",
    software: "Blender · Geometry Nodes",
    year: "2024",
    aspect: "portrait",
    placeholder: "radial-gradient(ellipse at 45% 40%, #1a0000 0%, #2a0808 45%, #080202 100%)",
    accent: "#f87171",
    // image: "/renders/abstract.jpg",
  },
  {
    id: "r09",
    title: "Neon Cityscape",
    category: "Environment",
    software: "Blender · Cycles",
    year: "2023",
    aspect: "landscape",
    placeholder: "radial-gradient(ellipse at 50% 50%, #0a0015 0%, #15002a 40%, #050008 100%)",
    accent: "#e879f9",
    // image: "/renders/cityscape.jpg",
  },
];

/* ─────────────────────────────────────────────────────────────
   HERO THREE.JS — Rotating 3D props / geometry constellation
   This is purely decorative — shows 3D geometry/props
   floating in space to signal "3D artistry"
───────────────────────────────────────────────────────────── */
function HeroScene({
  scrollYProgress,
  onReady,
}: {
  scrollYProgress: MotionValue<number>;
  onReady: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const didInitRef = useRef(false);
  const scrollPRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const unsub = scrollYProgress.on("change", (v) => {
      scrollPRef.current = v;
    });

    const init = () => {
      if (didInitRef.current) return;

      const W = container.clientWidth;
      const H = container.clientHeight;

      const THREE = (window as unknown as { THREE?: typeof import("three") }).THREE;
      if (!THREE) return;
      didInitRef.current = true;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W, H);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      if (container.firstChild) container.removeChild(container.firstChild);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 120);
      camera.position.set(0, 0, 14);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.08));
      const l1 = new THREE.PointLight(0x4a9eff, 5, 30); l1.position.set(8, 8, 8); scene.add(l1);
      const l2 = new THREE.PointLight(0xff6b00, 3, 24); l2.position.set(-8, -4, 6); scene.add(l2);
      const l3 = new THREE.PointLight(0x4ade80, 2, 20); l3.position.set(0, 6, -8); scene.add(l3);
      const l4 = new THREE.PointLight(0xc084fc, 2, 18); l4.position.set(-6, 2, 4); scene.add(l4);

      // ── PROP OBJECTS — various 3D geometry types ──────────
      type PropObj = {
        mesh: import("three").Mesh;
        rotSpeed: [number, number, number];
        floatPhase: number;
        floatAmp: number;
        orbitR: number;
        orbitSpeed: number;
        orbitPhase: number;
      };
      const props: PropObj[] = [];

      const makeProp = (
        geo: import("three").BufferGeometry,
        color: number,
        metalness: number,
        roughness: number,
        pos: [number, number, number],
        rSpeed: [number, number, number],
        floatPhase = 0,
        floatAmp = 0.15,
        orbitR = 0,
        orbitSpeed = 0,
        orbitPhase = 0
      ) => {
        const mat = new THREE.MeshStandardMaterial({ color, metalness, roughness });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(...pos);
        scene.add(mesh);
        props.push({ mesh, rotSpeed: rSpeed, floatPhase, floatAmp, orbitR, orbitSpeed, orbitPhase });
        return mesh;
      };

      // Central large icosahedron (hero prop)
      makeProp(
        new THREE.IcosahedronGeometry(1.6, 0),
        0x0a0a14, 0.9, 0.1,
        [0, 0, 0], [0.12, 0.19, 0.07], 0, 0.08
      );

      // Wireframe shell over it
      const wireMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.68, 0),
        new THREE.MeshBasicMaterial({ color: 0x4a9eff, wireframe: true, transparent: true, opacity: 0.22 })
      );
      scene.add(wireMesh);

      // Orbiting torus ring
      const torusRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.2, 0.035, 6, 80),
        new THREE.MeshBasicMaterial({ color: 0x4a9eff, transparent: true, opacity: 0.35 })
      );
      torusRing.rotation.x = 1.1;
      scene.add(torusRing);

      // Orbiting torus ring 2
      const torusRing2 = new THREE.Mesh(
        new THREE.TorusGeometry(3.0, 0.018, 4, 80),
        new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.2 })
      );
      torusRing2.rotation.x = 0.4;
      torusRing2.rotation.z = 0.8;
      scene.add(torusRing2);

      // Floating props constellation
      const propDefs: [
        import("three").BufferGeometry,
        number,
        number,
        number,
        [number, number, number],
        [number, number, number],
        number,
        number,
        number,
        number,
        number,
      ][] = [
        // [geo, color, metal, rough, pos, rotSpeed, floatPhase, floatAmp, orbitR, orbitSpeed, orbitPhase]
        [new THREE.BoxGeometry(0.7, 0.7, 0.7),      0x1a1a2e, 0.9, 0.05, [-3.5, 2, -1],  [0.2, 0.3, 0.1], 0,    0.2, 0, 0, 0],
        [new THREE.OctahedronGeometry(0.55),         0x0d3320, 0.7, 0.2,  [3.2, -1.5, 0.5],[0.15, 0.1, 0.25],1.5, 0.18, 0, 0, 0],
        [new THREE.TetrahedronGeometry(0.7),         0x1a0d00, 0.5, 0.4,  [-2.5, -2.2, 1], [0.3, 0.15, 0.2],3,   0.22, 0, 0, 0],
        [new THREE.DodecahedronGeometry(0.5),        0x0a1a2e, 0.8, 0.15, [4.0, 1.2, -0.5],[0.1, 0.25, 0.15],0.8,0.16, 0, 0, 0],
        [new THREE.TorusGeometry(0.5, 0.18, 8, 18), 0x200a00, 0.85, 0.1, [-4.2, 0.5, 0.8],[0.25, 0.1, 0.3], 2.2, 0.19, 0, 0, 0],
        [new THREE.ConeGeometry(0.45, 0.9, 6),      0x0d2010, 0.6, 0.3,  [1.8, 3.0, -1],  [0.2, 0.2, 0.12],1.1, 0.14, 0, 0, 0],
        [new THREE.IcosahedronGeometry(0.4, 0),      0x1a0a2a, 0.75, 0.2, [-1.5, -3.2, 0.5],[0.18, 0.28, 0.14],4, 0.2, 0, 0, 0],
        [new THREE.CylinderGeometry(0.2, 0.35, 0.8, 6), 0x180a00, 0.9, 0.08, [2.8, 2.5, 1],[0.12, 0.35, 0.18], 3.5, 0.17, 0, 0, 0],
        // Far-field smaller props
        [new THREE.BoxGeometry(0.35, 0.35, 0.35),   0x0d0d1a, 0.8, 0.1,  [-5.5, 1.5, -2], [0.4, 0.2, 0.3], 0.5, 0.12, 0, 0, 0],
        [new THREE.OctahedronGeometry(0.3),          0x0d200a, 0.7, 0.2,  [5.2, -0.5, -1], [0.2, 0.4, 0.15],2.8, 0.1, 0, 0, 0],
        [new THREE.TetrahedronGeometry(0.38),        0x1a0800, 0.6, 0.3,  [0.5, -4.0, 0.5],[0.3, 0.2, 0.25],1.8, 0.13, 0, 0, 0],
        [new THREE.IcosahedronGeometry(0.28, 0),     0x0a0a20, 0.85, 0.1, [-3.0, 3.5, -1], [0.22, 0.32, 0.18],3.2, 0.11, 0, 0, 0],
      ];

      propDefs.forEach(([geo, col, met, rou, pos, rsp, fp, fa, or, os, op]) => {
        makeProp(geo, col, met, rou, pos, rsp, fp, fa, or, os, op);
      });

      // Particle star field
      const pCount = 1000;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const starCols = [[0.29, 0.61, 1.0], [1.0, 0.42, 0.0], [0.3, 0.87, 0.5], [0.76, 0.51, 0.99], [0.9, 0.87, 0.82]];
      for (let i = 0; i < pCount; i++) {
        const r = 6 + Math.random() * 18;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pPos[i * 3 + 2] = r * Math.cos(phi);
        const c = starCols[Math.floor(Math.random() * starCols.length)];
        pCol[i * 3] = c[0]; pCol[i * 3 + 1] = c[1]; pCol[i * 3 + 2] = c[2];
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const pts = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.55 }));
      scene.add(pts);

      // Mouse parallax
      let tx = 0, ty = 0;
      let pendingTx = 0, pendingTy = 0;
      let mouseRaf = 0;
      const onMouse = (e: MouseEvent) => {
        pendingTx = (e.clientX / window.innerWidth - 0.5) * 2.5;
        pendingTy = -(e.clientY / window.innerHeight - 0.5) * 1.8;
        if (mouseRaf) return;
        mouseRaf = requestAnimationFrame(() => {
          tx = pendingTx;
          ty = pendingTy;
          mouseRaf = 0;
        });
      };
      window.addEventListener("mousemove", onMouse, { passive: true });

      const onResize = () => {
        const nW = container.clientWidth;
        const nH = container.clientHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener("resize", onResize);

      const io = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = !!entry?.isIntersecting && !document.hidden;
        },
        { threshold: 0.08 }
      );
      io.observe(container);

      const onVisibilityChange = () => {
        visibleRef.current = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVisibilityChange);

      let animId: number;
      let elapsed = 0;
      let last = performance.now();
      let lastRender = 0;
      const FRAME_MS = 1000 / 60; // 60fps cap

      const animate = (now: number) => {
        animId = requestAnimationFrame(animate);
        if (!visibleRef.current) {
          last = now;
          return;
        }
        if (now - lastRender < FRAME_MS) return;
        lastRender = now;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        elapsed += dt;
        const t = elapsed;

        const s = scrollPRef.current;

        // Central geo
        wireMesh.rotation.y = t * 0.22;
        wireMesh.rotation.x = t * 0.11;

        // Rings
        torusRing.rotation.y = t * 0.13;
        torusRing.rotation.z = t * 0.07;
        torusRing2.rotation.y = -t * 0.09;
        torusRing2.rotation.x = t * 0.05;

        // Props
        props.forEach((p, i) => {
          p.mesh.rotation.x += p.rotSpeed[0] * dt;
          p.mesh.rotation.y += p.rotSpeed[1] * dt;
          p.mesh.rotation.z += p.rotSpeed[2] * dt;
          // Float
          const baseY = propDefs[i]?.[4]?.[1] ?? 0;
          p.mesh.position.y = baseY + Math.sin(t * 0.6 + p.floatPhase) * p.floatAmp;
        });

        // Stars slow drift
        pts.rotation.y = t * 0.012;

        // Camera parallax
        const targetX = tx + (s - 0.5) * 1.2;
        const targetY = ty + (s - 0.5) * 0.7;
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.position.z += (12 - s * 2.2 - camera.position.z) * 0.03;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(animate);

      onReady();

      return () => {
        unsub();
        cancelAnimationFrame(animId);
        if (mouseRaf) cancelAnimationFrame(mouseRaf);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        io.disconnect();
        renderer.dispose();
        if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      };
    };

    if ((window as unknown as { THREE?: unknown }).THREE) {
      return init();
    } else {
      const existing = document.querySelector("script[data-three]");
      if (existing) {
        const check = setInterval(() => {
          const w = window as unknown as { THREE?: unknown };
          if (w.THREE) {
            clearInterval(check);
            init();
          }
        }, 50);
        return () => clearInterval(check);
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.setAttribute("data-three", "1");
      let cleanup: (() => void) | undefined;
      script.onload = () => { cleanup = init() ?? undefined; };
      document.head.appendChild(script);
      return () => cleanup?.();
    }
  }, [onReady, scrollYProgress]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

/* ─────────────────────────────────────────────────────────────
   RENDER CARD PLACEHOLDER
   Shows the project category, gradient bg, accent.
   Drop in a real <img> once you have renders exported.
───────────────────────────────────────────────────────────── */
function RenderPlaceholder({ render, scale = 1 }: { render: (typeof renders)[0]; scale?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background — replace with real render */}
      <div
        className="absolute inset-0 transition-transform duration-700"
        style={{
          background: render.placeholder,
          transform: `scale(${scale})`,
        }}
      />

      {/* Simulated render grid lines — art direction cue */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(${render.accent}88 1px, transparent 1px), linear-gradient(90deg, ${render.accent}88 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Centre accent glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className="rounded-full blur-[80px] opacity-20"
          style={{
            width: "55%",
            height: "55%",
            background: render.accent,
          }}
        />
      </div>

      {/* "Add your render" instruction — only in dev */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p
          className="font-mono-custom text-[9px] uppercase tracking-[0.2em] opacity-20"
          style={{ color: render.accent }}
        >
          {render.software}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HORIZONTAL SCROLL GALLERY (matches video reference)
   — Full-viewport-height strip
   — Cards slide left/right
   — Drag or arrow nav
   — Parallax on inner render
───────────────────────────────────────────────────────────── */
function HorizontalGallery({ onOpen }: { onOpen: (r: typeof renders[0]) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const dragDelta = useRef(0);
  const dragLastX = useRef(0);
  const dragLastT = useRef(0);
  const dragVelocity = useRef(0);
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 18, mass: 0.8 });
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const parX = useMotionValue(0);
  const parY = useMotionValue(0);
  const sTiltX = useSpring(tiltX, { stiffness: 220, damping: 18, mass: 0.8 });
  const sTiltY = useSpring(tiltY, { stiffness: 220, damping: 18, mass: 0.8 });
  const sParX = useSpring(parX, { stiffness: 180, damping: 18, mass: 0.8 });
  const sParY = useSpring(parY, { stiffness: 180, damping: 18, mass: 0.8 });

  const CARD_W = typeof window !== "undefined"
    ? Math.min(window.innerWidth * 0.72, 900)
    : 720;
  const GAP = 24;
  const STEP = CARD_W + GAP;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(renders.length - 1, idx));
    setCurrent(clamped);
    x.set(-clamped * STEP);
  }, [x, STEP]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const onDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    dragDelta.current = 0;
    dragLastX.current = e.clientX;
    dragLastT.current = performance.now();
    dragVelocity.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    dragDelta.current = e.clientX - dragStart.current;
    x.set(-current * STEP + dragDelta.current * 0.6);

    const now = performance.now();
    const dt = now - dragLastT.current;
    if (dt > 0) {
      dragVelocity.current = (e.clientX - dragLastX.current) / dt; // px/ms
      dragLastX.current = e.clientX;
      dragLastT.current = now;
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
    const threshold = STEP * 0.22;

    // velocity assist: if user “flicked”, snap accordingly.
    const v = dragVelocity.current;
    const vThreshold = 0.35; // px/ms

    if (dragDelta.current < -threshold || v < -vThreshold) goTo(current + 1);
    else if (dragDelta.current > threshold || v > vThreshold) goTo(current - 1);
    else goTo(current);
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: "90vh" }}>

      {/* Track */}
      <motion.div
        ref={trackRef}
        className="absolute top-0 bottom-0 flex items-center"
        style={{
          x: springX,
          paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
          paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
          gap: GAP,
          cursor: isDragging ? "grabbing" : "grab",
          willChange: "transform",
        }}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        {renders.map((render, i) => {
          const isActive = i === current;
          const dist = Math.abs(i - current);
          const sideScale = Math.max(0.75, 0.85 - dist * 0.12);
          const blurPx = isActive ? 0 : 2;
          const brightness = isActive ? 1 : 0.72;

          return (
            <motion.div
              key={render.id}
              className="relative flex-shrink-0 overflow-hidden select-none"
              style={{
                width: CARD_W,
                height: render.aspect === "portrait" ? CARD_W * 0.78 : CARD_W * 0.58,
                borderRadius: 6,
                transformStyle: "preserve-3d",
                perspective: 1000,
                willChange: "transform, filter, opacity",
                rotateX: sTiltX,
                rotateY: sTiltY,
                translateZ: isActive ? 18 : 0,
              }}
              animate={{
                scale: isActive ? 1 : sideScale,
                opacity: isActive ? 1 : 0.5,
                filter: `blur(${blurPx}px) brightness(${brightness})`,
              }}
              transition={{ duration: 0.55, ease: EASE }}
              onPointerMove={(e) => {
                if (isDragging || !isActive) return;
                const r = e.currentTarget.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                tiltY.set(px * 10);
                tiltX.set(-py * 8);
                parX.set(px * 18);
                parY.set(py * 12);
              }}
              onPointerLeave={() => {
                if (isDragging) return;
                tiltX.set(0);
                tiltY.set(0);
                parX.set(0);
                parY.set(0);
              }}
              onClick={() => {
                if (Math.abs(dragDelta.current) < 8) {
                  if (isActive) onOpen(render);
                  else goTo(i);
                }
              }}
            >
              {/* Render / placeholder */}
              <motion.div className="absolute inset-0" style={{ x: sParX, y: sParY }}>
                <RenderPlaceholder render={render} scale={isActive ? 1 : 1.04} />
              </motion.div>

              {/* Cinematic overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Motion blur illusion */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ filter: "blur(10px)" }}
                animate={{ opacity: isDragging && isActive ? 0.22 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
              />

              {/* Accent border glow on active */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-[6px] pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${render.accent}40` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}

              {/* Top bar */}
              <div className="absolute top-4 left-5 right-5 flex items-start justify-between z-10 pointer-events-none">
                <span
                  className="font-mono-custom text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: isActive ? render.accent : "rgba(255,255,255,0.25)" }}
                >
                  {render.id}
                </span>
                <span
                  className="font-mono-custom text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border backdrop-blur-sm"
                  style={{
                    borderColor: `${render.accent}35`,
                    color: `${render.accent}bb`,
                    background: "rgba(0,0,0,0.45)",
                    opacity: isActive ? 1 : 0,
                  }}
                >
                  {render.year}
                </span>
              </div>

              {/* Bottom info */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 z-10 p-5"
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <p
                  className="font-mono-custom text-[9px] uppercase tracking-[0.2em] mb-2"
                  style={{ color: render.accent }}
                >
                  {render.category}
                </p>
                <p
                  className="font-display italic text-white leading-tight"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
                >
                  {render.title}
                </p>
                <p className="font-body text-[11px] text-white/35 mt-1">{render.software}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Arrow navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 disabled:opacity-20 transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {renders.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 24 : 6,
                height: 6,
                background: i === current ? renders[current].accent : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === renders.length - 1}
          className="w-10 h-10 rounded-full border border-white/15 bg-black/40 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 disabled:opacity-20 transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Counter */}
      <div className="absolute top-6 right-8 z-20">
        <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/25">
          {String(current + 1).padStart(2, "0")} / {String(renders.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LIGHTBOX MODAL
───────────────────────────────────────────────────────────── */
function Lightbox({ render, onClose }: { render: typeof renders[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
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
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      {/* Panel */}
      <motion.div
        className="relative w-full md:max-w-3xl rounded-t-2xl md:rounded-2xl overflow-hidden border border-white/[0.08]"
        style={{ background: "#0a0a0a" }}
        initial={{ y: 60, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Render preview */}
        <div className="relative overflow-hidden" style={{ aspectRatio: render.aspect === "portrait" ? "4/3" : "16/7" }}>
          <RenderPlaceholder render={render} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/20 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Info */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="flex-1 space-y-3">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em]" style={{ color: render.accent }}>
              {render.category} · {render.year}
            </p>
            <h2 className="font-display italic text-white" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
              {render.title}
            </h2>
            <p className="font-body text-[13px] text-white/40">{render.software}</p>
          </div>
          <a
            href="mailto:gadakhsandesh@gmail.com"
            className="self-start md:self-center inline-flex items-center gap-2 rounded-full px-6 py-3 font-body text-[13px] font-semibold hover:brightness-110 transition-[filter] whitespace-nowrap shrink-0"
            style={{ background: render.accent, color: "#0a0a0a" }}
          >
            Commission Similar
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero({ onThreeReady }: { onThreeReady: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <div ref={heroRef} className="relative h-screen overflow-hidden">
      {/* 3D scene — full background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <HeroScene scrollYProgress={scrollYProgress} onReady={onThreeReady} />
      </motion.div>

      {/* Left gradient so text is readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      {/* subtle vignette edges */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-16 max-w-5xl"
        style={{ opacity }}
      >
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          <span className="rounded-md bg-primary/15 text-primary px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.22em] border border-primary/20">
            Featured Project
          </span>
          <span className="h-px w-10 bg-white/15" aria-hidden />
          <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40">
            Hard Surface Art
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            className="font-hero font-extrabold tracking-tight uppercase leading-[0.92] text-white"
            style={{ fontSize: "clamp(3.2rem, 8.6vw, 6.6rem)" }}
            initial={{ y: "108%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
          >
            CYBERNETIC
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, rgba(255,169,255,1) 0%, rgba(177,37,192,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CHASSIS
            </span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-8 flex flex-wrap gap-10 md:gap-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.28 }}
        >
          {[
            { label: "Polygons", value: "1,240,500" },
            { label: "Renders", value: "4K" },
            { label: "Project Time", value: "120 Hours" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col">
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/35 mb-1">
                {s.label}
              </span>
              <span className="font-body font-semibold text-[18px] md:text-[20px] text-white/90">
                {s.value}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.p
          className="font-body text-[14px] text-white/45 max-w-[52ch] mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
        >
          High-fidelity hard-surface workflow with cinematic lighting, lookdev, and realtime-ready outputs.
          Built in Blender, Maya, 3DS Max, Substance, and Unreal Engine.
        </motion.p>

        <motion.div
          className="flex items-center gap-5 mt-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono-custom text-[11px] uppercase tracking-[0.15em] bg-primary text-primary-foreground hover:brightness-110 transition-[filter]"
          >
            View Gallery <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <span className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.15em] text-white/22">
            <span className="w-5 h-[1px] bg-white/20" /> Scroll
          </span>
        </motion.div>
      </motion.div>

      {/* Corner label */}
      <motion.div
        className="absolute top-[88px] right-6 md:right-12 z-20 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-white/20">Drag to explore</p>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
const Work3D = () => {
  const [lightbox, setLightbox] = useState<typeof renders[0] | null>(null);
  const [booting, setBooting] = useState(true);
  const threeReadyRef = useRef(false);
  const bootTimeoutRef = useRef<number | null>(null);

  const onThreeReady = useCallback(() => {
    if (threeReadyRef.current) return;
    threeReadyRef.current = true;
    if (bootTimeoutRef.current) window.clearTimeout(bootTimeoutRef.current);
    bootTimeoutRef.current = window.setTimeout(() => setBooting(false), 650);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setBooting(false);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (bootTimeoutRef.current) window.clearTimeout(bootTimeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden relative">
      {/* grain/noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
        }}
      />

      <AnimatePresence>
        {booting && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a0a0a]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-body text-white/80 text-[16px]">Loading Experience...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Nav (reference-style) */}
      <header className="fixed top-0 left-0 right-0 z-[200] bg-[#0a0a0a]/45 backdrop-blur-xl border-b border-white/[0.06]">
        <nav className="flex items-center justify-between h-16 md:h-20 px-6 md:px-10 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/55 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </Link>
            <span className="hidden md:inline font-body font-semibold tracking-tight text-white/90">
              ATRIUM_3D
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-body text-[13px] text-white/60">
            <a className="text-primary border-b border-primary pb-1" href="#gallery">
              Gallery
            </a>
            <a className="hover:text-white transition-colors" href="#showcase">
              Showcase
            </a>
            <a className="hover:text-white transition-colors" href="#archive">
              Archive
            </a>
            <a className="hover:text-white transition-colors" href="#about">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="h-10 w-10 rounded-full border border-white/[0.08] bg-white/[0.04] hover:bg-white/[0.07] transition-colors"
              aria-label="Menu"
            />
            <div className="h-10 w-10 rounded-full bg-white/[0.06] border border-white/[0.08]" aria-hidden />
          </div>
        </nav>
      </header>

      {/* Hero — 3D geometry constellation */}
      <Hero onThreeReady={onThreeReady} />

      {/* Interactive viewer + sidebar (reference layout) */}
      <section
        id="showcase"
        className="max-w-screen-2xl mx-auto px-6 md:px-16 py-16 md:py-24 flex flex-col lg:flex-row gap-10 lg:gap-12"
      >
        <div className="flex-1">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03]">
            {/* viewer placeholder */}
            <div className="absolute inset-0">
              <RenderPlaceholder render={renders[1]} scale={1.02} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />

            {/* overlays */}
            <div className="absolute top-5 left-5 flex gap-3">
              <button
                type="button"
                className="rounded-lg border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-primary"
              >
                Real‑Time
              </button>
            </div>
            <div className="absolute top-5 right-5 flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  className="h-11 w-11 rounded-xl border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl hover:bg-white/[0.08] transition-colors"
                  aria-label="Viewer control"
                />
              ))}
            </div>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl p-4 max-w-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/45">
                    Exposure Control
                  </span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-primary">
                    2.4 EV
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-2/3" style={{ background: "linear-gradient(135deg,#ffa9ff,#b125c0)" }} />
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-body font-semibold text-[13px] hover:brightness-110 transition-[filter,transform] active:scale-[0.98]"
              >
                Launch Interactive <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Process (reference: From Clay to Color) */}
          <div className="mt-14 md:mt-20">
            <div className="flex items-center gap-6 mb-10">
              <h2 className="font-body font-semibold text-[22px] md:text-[26px] tracking-tight text-white">
                From Clay to Color
              </h2>
              <div className="flex-1 h-px bg-white/10" aria-hidden />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { n: "01", t: "Blockout", d: "Establishing primary silhouettes and functional proportions using proxy geometry." },
                { n: "02", t: "Refinement", d: "Detailed surface sculpting and boolean operations for mechanical integrity." },
                { n: "03", t: "Texturing", d: "PBR material authoring with multi-layered weathering and emissive accents." },
              ].map((p) => (
                <div key={p.n} className="group cursor-pointer">
                  <div className="aspect-square rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.03] mb-4 relative">
                    <div className="absolute inset-0 opacity-80">
                      <RenderPlaceholder render={renders[Number(p.n) - 1]} />
                    </div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-body font-semibold text-[16px] text-white">
                    {p.n}. {p.t}
                  </h3>
                  <p className="font-body text-[13px] text-white/55 leading-relaxed mt-1">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[340px] shrink-0">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-primary mb-5">
                Tool Forge
              </p>
              <div className="space-y-4">
                {[
                  { k: "MY", t: "Autodesk Maya", s: "Rigging & Animation" },
                  { k: "ZB", t: "Pixologic ZBrush", s: "Organic Sculpting" },
                  { k: "SP", t: "Substance Painter", s: "PBR Texturing" },
                  { k: "UE", t: "Unreal Engine 5", s: "Cinematics & VFX" },
                ].map((it) => (
                  <div key={it.k} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-body font-semibold text-[12px] text-white/85">
                      {it.k}
                    </div>
                    <div>
                      <div className="font-body font-semibold text-[13px] text-white/90">{it.t}</div>
                      <div className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/45">{it.s}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-primary mb-5">
                Spec Sheet
              </p>
              <div className="space-y-5">
                {[
                  { l: "Triangle Count", v: "2.4M" },
                  { l: "Texture Sets", v: "12 × 4K" },
                  { l: "Workflow", v: "UDIM" },
                  { l: "Engine", v: "Lumen / Nanite" },
                ].map((row) => (
                  <div key={row.l} className="flex items-end justify-between border-b border-white/10 pb-2">
                    <span className="font-body text-[12px] text-white/55">{row.l}</span>
                    <span className="font-mono-custom text-[11px] uppercase tracking-[0.18em] text-white/85">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Gallery section */}
      <div id="gallery">
        {/* Section label */}
        <motion.div
          className="px-6 md:px-12 pt-16 pb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="section-label mb-2">Gallery</p>
          <h2 className="font-display italic text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            3D Renders
          </h2>
          <p className="font-body text-[13px] text-white/35 mt-2">
            Scroll to reveal · Click any render to expand
          </p>
        </motion.div>

        {/* Simple 3-column reveal grid */}
        <div className="px-6 md:px-12 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {renders.map((r, i) => (
              <motion.button
                key={r.id}
                type="button"
                onClick={() => setLightbox(r)}
                initial={{ opacity: 0, y: 18, scale: 0.985, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: Math.min(i * 0.04, 0.22),
                  ease: EASE,
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="group relative text-left overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                style={{ willChange: "transform, opacity, filter" }}
                aria-label={`Open ${r.title}`}
              >
                <div className="relative w-full aspect-[16/11]">
                  <RenderPlaceholder render={r} scale={1.04} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/75 via-transparent to-transparent" />
                  <div
                    className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-35 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle, ${r.accent} 0%, transparent 60%)` }}
                    aria-hidden
                  />
                </div>

                <div className="p-5">
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em]" style={{ color: r.accent }}>
                    {r.category} · {r.year}
                  </p>
                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="font-body font-semibold text-[16px] leading-tight text-white/90">
                      {r.title}
                    </h3>
                    <span className="shrink-0 mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.05] text-white/85 transition-[transform,filter] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:brightness-110">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="mt-2 font-body text-[12px] text-white/45">
                    {r.software}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Software strip marquee */}
      <div className="border-y border-white/[0.07] overflow-hidden py-3 my-16 md:my-24">
        <div className="whitespace-nowrap flex" style={{ animation: "marquee 18s linear infinite" }}>
          {[0, 1, 2, 3].map((rep) => (
            <span key={rep} className="inline-flex shrink-0">
              {["Blender", "Cycles", "EEVEE", "Maya", "Arnold", "3DS Max", "V-Ray", "Substance Painter",
                "Unreal Engine", "Marvelous Designer", "ZBrush", "Houdini"].map((item, i) => (
                <span key={i} className="inline-flex items-center gap-3 px-5">
                  <span
                    className="font-mono-custom uppercase text-[10px] tracking-[0.2em]"
                    style={{ color: i % 4 === 0 ? "hsl(var(--primary))" : i % 3 === 0 ? "#4a9eff" : "rgba(255,255,255,0.2)" }}
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

      {/* How to add renders — instruction card */}
      <motion.div
        className="px-6 md:px-12 max-w-[1100px] mx-auto mb-24"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div
          className="rounded-2xl border border-white/[0.07] p-6 md:p-8"
          style={{ background: "rgba(255,255,255,0.02)" }}
        >
          <p className="section-label mb-3">How to add your renders</p>
          <p className="font-body text-[14px] text-white/45 leading-relaxed max-w-[55ch]">
            Export renders from Blender, Maya, or Unreal as{" "}
            <span className="text-white/70 font-medium">.jpg</span> or{" "}
            <span className="text-white/70 font-medium">.webp</span>, drop them into{" "}
            <span className="font-mono-custom text-[11px] text-primary px-2 py-0.5 bg-primary/10 rounded">
              /public/renders/
            </span>{" "}
            and uncomment the <span className="text-white/70">image:</span> field in each render data entry.
            The placeholder gradient is replaced automatically.
          </p>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="text-center pb-28 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/22 mb-5">
          Want something built in 3D?
        </p>
        <a
          href="mailto:gadakhsandesh@gmail.com"
          className="inline-flex items-center gap-3 font-display italic text-white hover:text-primary transition-colors duration-300"
          style={{ fontSize: "clamp(1.8rem, 5vw, 4rem)" }}
        >
          Commission a render. <ArrowUpRight className="w-9 h-9 shrink-0" />
        </a>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox render={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default Work3D;