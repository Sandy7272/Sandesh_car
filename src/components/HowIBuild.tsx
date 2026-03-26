"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Capture",
    description:
      "Drone scanning, video recording, photogrammetry — collecting raw spatial data from the real world.",
    icon: "📸",
  },
  {
    num: "02",
    title: "Processing",
    description:
      "NeRF and Gaussian Splatting pipelines transform raw footage into dense 3D point clouds and meshes.",
    icon: "⚡",
  },
  {
    num: "03",
    title: "Optimization",
    description:
      "Mesh decimation, texture compression, and LOD generation for real-time web delivery at 60fps.",
    icon: "🔧",
  },
  {
    num: "04",
    title: "Delivery",
    description:
      "Production-grade 3D viewers, AR experiences, and embeddable widgets deployed at scale.",
    icon: "🚀",
  },
];

export default function HowIBuild() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[#0a0a0a] py-20 text-white md:py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-22%] h-[320px] w-[640px] -translate-x-1/2 bg-primary/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[-18%] h-[240px] w-[420px] bg-primary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-primary/80 mb-3">
            Process
          </p>

          <h2 className="font-body text-[clamp(2.1rem,5.6vw,4.1rem)] font-semibold leading-[1.05] tracking-tight text-white">
            How I Build Systems
          </h2>
        </div>

        {/* Timeline line */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`
                  group relative rounded-2xl border border-white/[0.10] bg-white/[0.03] p-6 md:p-7
                  hover:border-primary/45
                  transition-[transform,border-color,background-color] duration-500
                  hover:scale-[1.03]
                `}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms`,
                }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/12 to-transparent blur-xl" />

                {/* Icon */}
                <div className="text-3xl md:text-4xl mb-4">{step.icon}</div>

                {/* Step label */}
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.24em] text-primary/75 mb-2">
                  Step {step.num}
                </p>

                {/* Title */}
                <h3 className="font-body text-[1.35rem] font-semibold leading-tight mb-2.5 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="font-body text-[14px] text-white/62 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector Dot */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-[-13px] h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)/0.6)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}