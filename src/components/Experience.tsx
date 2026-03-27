import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const experiences = [
  {
    company: "MetaShop AI",
    role: "Product Builder & Creative Operations Lead",
    period: "Jan 2023 — Present",
    location: "Pune, India",
    badge: "Equity Award",
    highlights: [
      "Architected company's first client-facing self-service product — AI-powered website with integrated custom 3D viewer using React, Three.js & AI-assisted tools",
      "Transformed early-stage video-to-3D pipeline into enterprise-grade production system using Gaussian Splatting, NeRF & Image-to-3D techniques within 12 months",
      "Automated complete 3D model generation pipeline — reducing manual workload by 70% and scaling team output 3×",
      "Managed and delivered 50+ client projects end-to-end across real estate & manufacturing — including L&T Realty and Kesari Weddings",
      "Awarded equity stake by founder for exceptional product and operational contributions",
    ],
  },
  {
    company: "Byju's (Think & Learn)",
    role: "Motion Graphics Artist & 3D Specialist",
    period: "Oct 2021 — Jan 2023",
    location: "Bangalore, India",
    badge: "Best Employee 3×",
    highlights: [
      "Developed high-quality motion graphics and 3D educational content consumed by millions of students across India",
      "Designed reusable animation systems and template libraries — improving production efficiency by 40% across 100+ modules",
      "Received Best Employee Award 3 consecutive times among 400+ design team members",
    ],
  },
  {
    company: "Global Studio",
    role: "Freelance 3D Assets & VFX Specialist",
    period: "Jan 2020 — Sep 2021",
    location: "Pune, India",
    badge: "Freelance",
    highlights: [
      "Created versatile 3D models, VFX assets, and motion graphics for gaming and commercial clients using Blender, 3DS Max & Maya",
      "Managed end-to-end freelance pipeline with 100% on-time delivery record",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      fillRef.current && (fillRef.current.style.transform = "scaleY(1)");
      return;
    }

    const update = () => {
      const fill = fillRef.current;
      if (!fill) return;
      const rect = line.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh - rect.top) / (vh + rect.height);
      fill.style.transform = `scaleY(${Math.max(0.001, Math.min(1, raw))})`;
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="experience" className="relative bg-background py-24 md:py-32 lg:py-40">
      <div className="container-custom">
        <AnimatedSection className="mb-16 md:mb-24">
          <p className="section-label mb-4">Experience</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-foreground">
            Career<br />
            <span className="text-foreground/30">trajectory</span>
          </h2>
        </AnimatedSection>

        <div ref={lineRef} className="relative">
          <div className="absolute left-4 md:left-0 top-0 h-full w-[1px] bg-foreground/[0.08]" />
          <div
            ref={fillRef}
            className="absolute left-4 md:left-0 top-0 h-full w-[1px] bg-primary origin-top"
            style={{ transform: "scaleY(0.001)", willChange: "transform" }}
          />

          <StaggerContainer className="space-y-12 md:space-y-16" staggerDelay={0.12}>
            {experiences.map((exp, i) => (
              <StaggerItem key={i}>
                <div className="relative pl-12 md:pl-16">
                  <div className="absolute left-[9px] md:left-[-5px] top-2 w-3 h-3 rounded-full border-2 border-primary bg-background" />

                  <div className="rounded-2xl border border-foreground/[0.06] bg-foreground/[0.02] p-6 md:p-8 hover:border-foreground/[0.12] hover:bg-foreground/[0.03] transition-all duration-500 group"
                    style={{ willChange: "border-color, background-color" }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">
                          {exp.company}
                        </h3>
                        <p className="font-body text-[13px] text-foreground/45 mt-1">{exp.role}</p>
                        <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-foreground/25 mt-1">
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-foreground/30">
                          {exp.period}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 font-mono-custom text-[9px] uppercase tracking-[0.12em] text-primary">
                          {exp.badge}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {exp.highlights.map((point, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <div className="w-1 h-1 rounded-full bg-foreground/20 mt-2 shrink-0" />
                          <p className="font-body text-[14px] text-foreground/50 leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
