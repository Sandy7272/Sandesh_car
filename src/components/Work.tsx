import { useState, useRef } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    name: "L&T Realty Virtual Tour",
    category: "Real Estate · 3D",
    year: "2024",
    gradient: "radial-gradient(ellipse at 30% 70%, #1e3a5f 0%, #0a1628 50%, #060c16 100%)",
    accent: "#4a9eff",
  },
  {
    name: "Kesari Weddings",
    category: "Events · Venue Viz",
    year: "2024",
    gradient: "radial-gradient(ellipse at 70% 30%, #3d1a1a 0%, #1a0808 50%, #080404 100%)",
    accent: "#ff6b6b",
  },
  {
    name: "Ultraviolette EV Showroom",
    category: "Automotive · AR",
    year: "2024",
    gradient: "radial-gradient(ellipse at 50% 80%, #0d2818 0%, #051510 50%, #020806 100%)",
    accent: "#4ade80",
  },
  {
    name: "India Bike Week 2025",
    category: "Live Event · 3D Capture",
    year: "2025",
    gradient: "radial-gradient(ellipse at 20% 60%, #2d1a00 0%, #180d00 50%, #080400 100%)",
    accent: "#fb923c",
  },
  {
    name: "Byju's Motion System",
    category: "Education · Motion",
    year: "2022",
    gradient: "radial-gradient(ellipse at 60% 40%, #1a0d2e 0%, #0d0618 50%, #040209 100%)",
    accent: "#c084fc",
  },
];

const Work = () => (
  <section id="work" className="section-padding">
    <div className="container-custom">
      <p className="section-label mb-4">Selected Work</p>
      <h2 className="section-heading text-foreground mb-16">Projects</h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ProjectCard project={projects[0]} className="md:col-span-7" aspect="aspect-[16/10]" />
        <ProjectCard project={projects[1]} className="md:col-span-5" aspect="aspect-[3/4]" />
      </div>
      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ProjectCard project={projects[2]} className="md:col-span-5" aspect="aspect-[3/4]" />
        <ProjectCard project={projects[3]} className="md:col-span-7" aspect="aspect-[16/10]" />
      </div>
      {/* Row 3 — full width */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProjectCard project={projects[4]} className="md:col-span-12" aspect="aspect-[21/9]" />
      </div>
    </div>
  </section>
);

interface ProjectCardProps {
  project: (typeof projects)[0];
  className?: string;
  aspect: string;
}

const ProjectCard = ({ project, className = "", aspect }: ProjectCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left + 20, y: e.clientY - rect.top + 20 });
  };

  return (
    <motion.a
      ref={cardRef}
      href="#"
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-lg border border-foreground/[0.07] bg-card block ${aspect} ${className}`}
      style={{
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 40px 80px rgba(0,0,0,0.6)" : "none",
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-smooth"
        style={{
          background: project.gradient,
          transform: hovered ? "scale(1.04)" : "scale(1)",
        }}
      />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 animate-gradient-shift opacity-40" />

      {/* Glowing dot light source */}
      <div
        className="absolute w-32 h-32 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${project.accent}22 0%, transparent 70%)`,
          top: "20%",
          left: "30%",
        }}
      />

      {/* Shimmer on hover */}
      {hovered && (
        <div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 60%)",
            animation: "shimmer 0.6s ease forwards",
          }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-10" />
      <span className="absolute top-4 right-4 z-20 pill">{project.year}</span>
      <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
        <p className="font-body text-[15px] text-foreground">{project.name}</p>
        <span
          className="pill shrink-0 ml-3 transition-smooth"
          style={{ borderColor: hovered ? project.accent : undefined, color: hovered ? project.accent : undefined }}
        >
          {project.category}
        </span>
      </div>

      {/* Floating cursor label — desktop only */}
      {hovered && (
        <div
          className="absolute z-40 pointer-events-none font-mono-custom text-[10px] uppercase tracking-[0.15em] text-foreground/80 hidden md:block"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          Explore →
        </div>
      )}
    </motion.a>
  );
};

export default Work;
