import { useEffect, useRef, useState } from "react";

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

const CapabilityCard = ({ cap }: { cap: (typeof capabilities)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-t pt-8 pb-10 pr-6 transition-smooth"
      style={{
        borderColor: hovered ? "hsl(18 100% 50%)" : "hsl(0 0% 100% / 0.07)",
        backgroundColor: hovered ? "rgba(255,255,255,0.02)" : "transparent",
        boxShadow: hovered ? "0 0 40px -10px rgba(255, 69, 0, 0.15)" : "none",
      }}
    >
      <span className="font-mono-custom text-[11px] text-muted-foreground tracking-[0.15em]">
        <CountUpNumber target={cap.num} prefix="00" />
      </span>
      <div className="flex items-center gap-2 mt-3 mb-4">
        <h3
          className="font-body font-medium text-lg text-foreground transition-smooth"
          style={{ transform: hovered ? "translateX(8px)" : "translateX(0)" }}
        >
          {cap.title}
        </h3>
        <span
          className="text-primary transition-smooth text-sm"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
          }}
        >
          →
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {cap.tags.map((tag, i) => (
          <span
            key={tag}
            className="pill transition-smooth"
            style={{
              opacity: hovered ? 1 : 0.7,
              transitionDelay: hovered ? `${i * 40}ms` : "0ms",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Capabilities = () => (
  <section className="section-padding">
    <div className="container-custom">
      <p className="section-label mb-4">Capabilities</p>
      <h2 className="section-heading text-foreground mb-16">What I Build</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {capabilities.map((cap) => (
          <CapabilityCard key={cap.num} cap={cap} />
        ))}
      </div>
    </div>
  </section>
);

export default Capabilities;
