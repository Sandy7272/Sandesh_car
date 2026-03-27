import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";

const projects = [
  {
    id: "3d",
    num: "01",
    title: "3D Spatial Work",
    subtitle: "Immersive environments and product visualization",
    tags: ["Blender", "Three.js", "WebXR", "Unreal"],
    href: "/work/3d",
    gradient: "radial-gradient(ellipse at 20% 50%, rgba(96,180,255,0.2) 0%, transparent 60%)",
    accent: "#60b4ff",
  },
  {
    id: "motion",
    num: "02",
    title: "Motion Graphics",
    subtitle: "Cinematic animation and visual storytelling",
    tags: ["After Effects", "Premiere", "2.5D Animation"],
    href: "/work/motion",
    gradient: "radial-gradient(ellipse at 80% 30%, rgba(162,155,254,0.2) 0%, transparent 60%)",
    accent: "#a29bfe",
  },
  {
    id: "uiux",
    num: "03",
    title: "UI/UX Design",
    subtitle: "Product interfaces and design systems",
    tags: ["Figma", "Photoshop", "Motion UI"],
    href: "/work/uiux",
    gradient: "radial-gradient(ellipse at 50% 70%, rgba(255,107,107,0.15) 0%, transparent 60%)",
    accent: "#ff6b6b",
  },
  {
    id: "video-to-3d",
    num: "04",
    title: "Video → 3D Pipeline",
    subtitle: "Automated capture-to-delivery systems",
    tags: ["Gaussian Splatting", "NeRF", "Nerfstudio"],
    href: "/work/video-to-3d",
    gradient: "radial-gradient(ellipse at 70% 40%, rgba(251,146,60,0.18) 0%, transparent 60%)",
    accent: "#fb923c",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const Work = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="work" className="relative bg-background py-24 md:py-32 lg:py-40">
      <div className="container-custom">
        <AnimatedSection className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="section-label mb-4">Selected Work</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.95] text-foreground">
              Work that<br />
              <span className="text-foreground/30">speaks volumes</span>
            </h2>
          </div>
          <p className="font-body text-[14px] text-foreground/40 max-w-[320px] leading-relaxed">
            Explore by category — each opens a focused workspace with projects and deeper detail.
          </p>
        </AnimatedSection>

        <StaggerContainer className="space-y-[1px]" staggerDelay={0.08}>
          {projects.map((project) => {
            const isHovered = hoveredId === project.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <StaggerItem key={project.id}>
                <Link
                  to={project.href}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative block overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: project.gradient }}
                  />

                  <div
                    className="relative flex items-center gap-6 py-8 md:py-10 border-t border-foreground/[0.06] transition-all duration-500"
                    style={{
                      opacity: isDimmed ? 0.3 : 1,
                      willChange: "opacity",
                    }}
                  >
                    <span className="font-mono-custom text-[11px] text-foreground/20 w-8 shrink-0">
                      {project.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-[clamp(1.5rem,3vw,2.8rem)] font-bold text-foreground leading-[1] tracking-tight group-hover:translate-x-2 transition-transform duration-500"
                        style={{ willChange: "transform" }}>
                        {project.title}
                      </h3>
                      <p className="mt-2 font-body text-[13px] text-foreground/35 group-hover:text-foreground/55 transition-colors duration-500">
                        {project.subtitle}
                      </p>
                    </div>

                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-foreground/[0.08] bg-foreground/[0.03] px-3 py-1.5 font-mono-custom text-[9px] uppercase tracking-[0.12em] text-foreground/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-center w-12 h-12 rounded-full border border-foreground/[0.08] shrink-0 group-hover:border-foreground/20 group-hover:bg-foreground/[0.05] transition-all duration-500">
                      <ArrowUpRight
                        className="w-4 h-4 text-foreground/40 group-hover:text-foreground transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] origin-left"
                    style={{ background: project.accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <div className="border-t border-foreground/[0.06] mt-0" />
      </div>
    </section>
  );
};

export default Work;
