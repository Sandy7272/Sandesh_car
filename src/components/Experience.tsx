"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "MetaShop AI",
    role: "Product Builder & Creative Ops Lead",
    period: "2023 — Present",
    badge: "Equity Award",
    highlights: [
      "Built AI-powered 3D viewer platform — React + Three.js",
      "Automated full 3D pipeline, scaling output 3× and cutting manual work 70%",
      "Delivered 50+ client projects including L&T Realty & Kesari Weddings",
    ],
  },
  {
    company: "Byju's",
    role: "Motion Graphics Artist & 3D Specialist",
    period: "2021 — 2023",
    badge: "Best Employee 3×",
    highlights: [
      "Created 3D and motion content consumed by millions of students",
      "Built reusable animation systems improving production efficiency 40%",
      "Awarded Best Employee 3× among 400+ designers",
    ],
  },
  {
    company: "Global Studio",
    role: "3D Artist & VFX Specialist",
    period: "2020 — 2021",
    badge: "Freelance",
    highlights: [
      "Delivered 3D assets, environments, and VFX for gaming & commercial projects",
      "100% on-time delivery across all freelance engagements",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const update = () => {
      const fill = fillRef.current;
      if (!fill) return;
      const rect = line.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh - rect.top) / (vh + rect.height);
      const p = Math.max(0, Math.min(1, raw));
      fill.style.transform = `scaleY(${Math.max(0.001, p)})`;
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
    <section ref={sectionRef} id="experience" className="relative bg-[#090909] py-24 md:py-32 lg:py-40">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-16 md:mb-24"
        >
          <p className="section-label mb-4">Experience</p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-white">
            Career<br />
            <span className="text-white/30">trajectory</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* Vertical line — center on desktop, left on mobile */}
          <div className="absolute left-4 md:left-0 top-0 h-full w-[1px] bg-white/[0.08]" />
          <div
            ref={fillRef}
            className="absolute left-4 md:left-0 top-0 h-full w-[1px] bg-[hsl(var(--primary))] origin-top"
            style={{ transform: "scaleY(0.001)" }}
          />

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                className="relative pl-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-[9px] md:left-[-5px] top-2 w-3 h-3 rounded-full border-2 border-[hsl(var(--primary))] bg-[#090909]" />

                {/* Card */}
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-500 group">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-[hsl(var(--primary))] transition-colors duration-500">
                        {exp.company}
                      </h3>
                      <p className="font-body text-[13px] text-white/45 mt-1">{exp.role}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-white/30">
                        {exp.period}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[hsl(var(--primary))]/10 font-mono-custom text-[9px] uppercase tracking-[0.12em] text-[hsl(var(--primary))]">
                        {exp.badge}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    {exp.highlights.map((point, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                        <p className="font-body text-[14px] text-white/50 leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
