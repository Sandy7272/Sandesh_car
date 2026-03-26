"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
  {
    company: "MetaShop AI",
    location: "Pune, India",
    role: "Product Builder & Creative Operations Lead",
    period: "Jan 2023 — Present",
    badge: "Equity Award",
    points: [
      "Built company’s first AI-powered 3D viewer platform using React + Three.js, enabling real-time product interaction",
      "Transformed video-to-3D pipeline into a production-grade system using Gaussian Splatting & Nerfstudio",
      "Automated full 3D processing pipeline (data → training → export), reducing manual work by 70% and scaling output 3×",
      "Led end-to-end delivery of 50+ client projects including Kesari Weddings & L&T Realty",
      "Managed full production lifecycle from capture to final 3D delivery, coordinating on-ground teams",
      "Enhanced UI/UX and built internal tools using AI-assisted workflows",
    ],
  },
  {
    company: "Byju’s (Think & Learn Pvt. Ltd.)",
    location: "Bangalore, India",
    role: "Motion Graphics Artist & 3D Specialist",
    period: "Oct 2021 — Jan 2023",
    badge: "Best Employee — 3×",
    points: [
      "Created high-quality 3D and motion graphics content consumed by millions of students",
      "Built reusable animation systems improving production efficiency by 40% across 100+ modules",
      "Collaborated with product and design teams to enhance storytelling and engagement",
      "Awarded Best Employee 3× among 400+ designers for performance and innovation",
    ],
  },
  {
    company: "Global Studio (Freelance)",
    location: "Pune, India",
    role: "3D Artist & VFX Specialist",
    period: "Jan 2020 — Sep 2021",
    badge: "Freelance",
    points: [
      "Delivered 3D assets, environments, and VFX for gaming and commercial projects",
      "Handled full freelance pipeline with 100% on-time delivery",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const centerFillRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    const update = () => {
      const fillEl = centerFillRef.current;
      if (!fillEl) return;

      const rect = tl.getBoundingClientRect();
      const viewportH = window.innerHeight || 1;

      // progress from when section top hits viewport bottom -> section bottom hits viewport top
      const start = viewportH; // rect.top === viewportH => 0
      const end = -rect.height; // rect.top === -rect.height => 1
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));

      fillEl.style.transform = `scaleY(${Math.max(0.001, p)})`;
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const nodes = cardRefs.current.filter(Boolean);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length === 0) return;

        // Pick the most "engaged" card to reduce flicker/delays.
        const best = visibleEntries.reduce((acc, cur) =>
          (cur.intersectionRatio ?? 0) > (acc.intersectionRatio ?? 0) ? cur : acc
        );

        const el = best.target as HTMLDivElement;
        const idx = nodes.indexOf(el);
        if (idx >= 0) setActiveIndex(idx);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-10% 0px -55% 0px" }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative bg-[#0a0a0a] py-28 text-white font-body">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-24">
          <h2 className="text-5xl font-bold tracking-tight font-body">
            Experience
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto font-body">
            Building scalable AI-powered 3D systems, cinematic experiences, and production pipelines.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          {/* Scroll fill overlay */}
          <div
            ref={centerFillRef}
            className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 origin-top bg-[#ff6b6b]"
            style={{ transform: "scaleY(0.001)" }}
            aria-hidden
          />

          <div className="space-y-24">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline marker (aligned to card top; fills when reached) */}
                  <div
                    className={`absolute left-1/2 top-7 -translate-x-1/2 z-10 h-5 w-5 rounded-full ring-1 transition-colors ${
                      isActive
                        ? "bg-[#ff6b6b] ring-[#ff6b6b]/40 shadow-[0_0_25px_rgba(255,107,107,0.55)]"
                        : "bg-white/20 ring-white/15"
                    }`}
                    aria-hidden
                  />

                  {/* Card */}
                  <div
                    className={`
                      w-full md:w-[45%]
                      ${isLeft ? "md:pr-12" : "md:pl-12"}
                    `}
                  >
                    <div
                      ref={(el) => {
                        if (el) cardRefs.current[i] = el;
                      }}
                      className={`
                        p-7 rounded-2xl
                        bg-white/5 backdrop-blur-xl
                        border border-white/10
                        shadow-[0_20px_60px_rgba(0,0,0,0.6)]
                        transition-all duration-700
                        ${
                          visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-16"
                        }
                      `}
                    >
                      {/* Period */}
                      <p className="text-xs text-white/40 uppercase tracking-widest">
                        {exp.period}
                      </p>

                      {/* Title */}
                      <h3 className="text-xl font-semibold mt-2">
                        {exp.company}
                        <span className="text-white/50 text-sm font-normal">
                          {" "}· {exp.location}
                        </span>
                      </h3>

                      {/* Role */}
                      <p className="text-white/60 text-sm mt-1">
                        {exp.role}
                      </p>

                      {/* Badge */}
                      <div className="mt-2 text-xs text-[#ff6b6b]">
                        {exp.badge}
                      </div>

                      {/* Points */}
                      <ul className="mt-5 space-y-2">
                        {exp.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2 text-sm text-white/70 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[#ff6b6b]" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}