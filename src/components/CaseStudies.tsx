import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const caseStudies = [
  {
    id: "metashop",
    title: "MetaShop AI\n3D Viewer",
    problem:
      "Enterprise clients needed an embeddable, real-time 3D viewer that loads fast and works across devices — no plugins, no downloads.",
    solution:
      "Built a production-grade 3D viewer using React + Three.js with progressive loading, AR preview, and a customizable embed widget.",
    techStack: ["React", "Three.js", "WebXR", "Node.js", "AWS"],
    impact: [
      { num: "50+", label: "Enterprise Clients" },
      { num: "<3s", label: "Load Time" },
      { num: "100%", label: "Cross-device" },
    ],
    gradient:
      "radial-gradient(ellipse at 30% 70%, rgba(120,80,255,0.15) 0%, rgba(60,130,255,0.05) 40%, transparent 70%)",
    accent: "rgba(120,80,255,0.6)",
  },
  {
    id: "video-to-3d",
    title: "Video-to-3D\nPipeline",
    problem:
      "Converting video footage into production-quality 3D assets was manual, slow, and expensive — taking days per asset.",
    solution:
      "Engineered an automated pipeline using Gaussian Splatting and NeRF techniques, reducing production time by 70%.",
    techStack: ["Gaussian Splatting", "NeRF", "Python", "Nerfstudio", "CUDA"],
    impact: [
      { num: "70%", label: "Time Saved" },
      { num: "50+", label: "Projects Processed" },
      { num: "4K", label: "Output Quality" },
    ],
    gradient:
      "radial-gradient(ellipse at 70% 30%, rgba(255,69,0,0.12) 0%, rgba(255,120,50,0.04) 40%, transparent 70%)",
    accent: "rgba(255,69,0,0.6)",
  },
  {
    id: "real-estate",
    title: "Real Estate\n3D Projects",
    problem:
      "Real estate companies needed immersive virtual tours but existing solutions were expensive, slow, and didn't scale.",
    solution:
      "Created a complete 3D capture-to-viewer pipeline for real estate, including drone scanning, processing, and interactive web delivery.",
    techStack: ["Drone Capture", "Photogrammetry", "Three.js", "React", "Unreal Engine"],
    impact: [
      { num: "3×", label: "Engagement Lift" },
      { num: "L&T", label: "Enterprise Client" },
      { num: "360°", label: "Virtual Tours" },
    ],
    gradient:
      "radial-gradient(ellipse at 50% 80%, rgba(60,180,255,0.12) 0%, rgba(30,90,128,0.04) 40%, transparent 70%)",
    accent: "rgba(60,180,255,0.6)",
  },
];

const CaseStudyCard = ({
  study,
  index,
}: {
  study: (typeof caseStudies)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center py-20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(60px)",
        transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Info */}
          <div className="space-y-8">
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-primary">
              Case Study {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="font-display italic text-foreground leading-[0.95] whitespace-pre-line"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {study.title}
            </h3>

            <div className="space-y-6">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
                  Problem
                </p>
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
                  {study.problem}
                </p>
              </div>
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-primary mb-2">
                  Solution
                </p>
                <p className="font-body text-[15px] text-muted-foreground leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span key={tech} className="pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Impact + Visual */}
          <div className="space-y-8">
            {/* Visual placeholder */}
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/[0.07]"
              style={{ background: study.gradient }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${study.accent} 0%, transparent 60%)`,
                  filter: "blur(80px)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-foreground/10 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.15em] text-foreground/60">
                    View
                  </span>
                </div>
              </div>
            </div>

            {/* Impact metrics */}
            <div className="grid grid-cols-3 gap-4">
              {study.impact.map((item, i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-xl border border-foreground/[0.07] bg-card/50 backdrop-blur-sm"
                >
                  <p className="font-display italic text-2xl text-foreground mb-1">
                    {item.num}
                  </p>
                  <p className="font-mono-custom text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudies = () => (
  <section id="work" className="relative">
    <div className="container-custom pt-32 pb-16">
      <p className="section-label mb-4">Featured Work</p>
      <h2 className="section-heading text-foreground">Case Studies</h2>
    </div>
    {caseStudies.map((study, i) => (
      <CaseStudyCard key={study.id} study={study} index={i} />
    ))}
  </section>
);

export default CaseStudies;
