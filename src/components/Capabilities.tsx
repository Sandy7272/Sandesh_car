import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const capabilities = [
  { num: "01", title: "3D Design & Rendering", tags: ["Blender", "3DS Max", "Maya", "Unreal", "Substance"] },
  { num: "02", title: "Video to 3D / NeRF", tags: ["Gaussian Splatting", "Nerfstudio", "Drone Capture"] },
  { num: "03", title: "Motion Graphics", tags: ["After Effects", "Premiere Pro", "2.5D Animation"] },
  { num: "04", title: "AR / VR Experiences", tags: ["WebXR", "Real-time 3D", "Unreal Engine"] },
  { num: "05", title: "3D Web Viewers", tags: ["Three.js", "View in AR", "Embeddable Widget"] },
  { num: "06", title: "UI/UX Design", tags: ["Figma", "Photoshop", "Illustrator", "Motion UI"] },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "4+", label: "Years Experience" },
  { value: "70%", label: "Pipeline Automated" },
  { value: "3×", label: "Best Employee" },
];

const CapabilityCard = ({ cap, index }: { cap: (typeof capabilities)[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - py) * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 8).toFixed(2)}deg`);
  }, []);

  const onLeave = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  return (
    <StaggerItem>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative h-full rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-7 md:p-8 overflow-hidden hover:border-foreground/[0.12] transition-all duration-500 cursor-default"
        style={{
          transformStyle: "preserve-3d",
          transform: "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          willChange: "transform",
          transition: "transform 0.15s ease-out, border-color 0.5s",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: "radial-gradient(circle at 40% 30%, hsl(var(--foreground) / 0.06) 0%, transparent 50%)",
          }}
        />
        <span className="font-mono-custom text-[10px] text-foreground/15 tracking-[0.2em]">
          {cap.num}
        </span>
        <h3 className="mt-4 font-display text-[18px] md:text-[20px] font-bold text-foreground tracking-tight">
          {cap.title}
        </h3>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {cap.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/[0.06] bg-foreground/[0.02] px-3 py-1.5 font-mono-custom text-[9px] uppercase tracking-[0.12em] text-foreground/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </StaggerItem>
  );
};

const Capabilities = () => (
  <section className="relative bg-background py-24 md:py-32 lg:py-40 overflow-hidden">
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background: "radial-gradient(900px 500px at 20% 50%, hsl(var(--primary) / 0.06) 0%, transparent 60%)",
      }}
    />

    <div className="container-custom relative">
      <AnimatedSection className="mb-16 md:mb-20">
        <p className="section-label mb-4">Capabilities</p>
        <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-foreground">
          What I<br />
          <span className="text-foreground/30">build</span>
        </h2>
      </AnimatedSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {capabilities.map((cap, i) => (
          <CapabilityCard key={cap.num} cap={cap} index={i} />
        ))}
      </StaggerContainer>

      <AnimatedSection delay={0.2} className="mt-16 md:mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-foreground/[0.06]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-foreground/[0.02] p-6 md:p-8 text-center hover:bg-foreground/[0.04] transition-colors duration-500"
            >
              <p className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-foreground leading-none">
                {stat.value}
              </p>
              <p className="mt-2 font-mono-custom text-[9px] uppercase tracking-[0.18em] text-foreground/30">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mt-12 md:mt-16">
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-foreground/20 mb-5 text-center">
          Trusted By
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["L&T Realty", "Kesari Weddings", "Ultraviolette", "Byju's", "Tata", "IBW 2025", "Italica", "Material Depot"].map((name) => (
            <span
              key={name}
              className="font-body text-[12px] border border-foreground/[0.06] text-foreground/25 px-4 py-2 rounded-full hover:border-foreground/15 hover:text-foreground/45 transition-all duration-400 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </section>
);

export default Capabilities;
