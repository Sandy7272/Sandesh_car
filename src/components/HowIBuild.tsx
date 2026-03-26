import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Capture",
    description: "Drone scanning, video recording, photogrammetry — collecting raw spatial data from the real world.",
    icon: "📸",
  },
  {
    num: "02",
    title: "Processing",
    description: "NeRF and Gaussian Splatting pipelines transform raw footage into dense 3D point clouds and meshes.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Optimization",
    description: "Mesh decimation, texture compression, and LOD generation for real-time web delivery at 60fps.",
    icon: "🔧",
  },
  {
    num: "04",
    title: "Delivery",
    description: "Production-grade 3D viewers, AR experiences, and embeddable widgets deployed at scale.",
    icon: "🚀",
  },
];

const HowIBuild = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(120,80,255,0.04) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container-custom relative z-10">
        <p className="section-label mb-4">Process</p>
        <h2 className="section-heading text-foreground mb-16">How I Build Systems</h2>

        {/* Horizontal flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="relative p-6 rounded-2xl border border-foreground/[0.07] bg-card/30 backdrop-blur-sm group hover:border-primary/30 transition-smooth"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 150}ms`,
              }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px] bg-foreground/10" />
              )}

              <div className="text-3xl mb-4">{step.icon}</div>
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-primary">
                Step {step.num}
              </span>
              <h3 className="font-display italic text-xl text-foreground mt-2 mb-3 group-hover:text-primary transition-smooth">
                {step.title}
              </h3>
              <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowIBuild;
