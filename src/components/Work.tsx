import { motion } from "framer-motion";

const projects = [
  { name: "L&T Realty Virtual Tour", category: "Real Estate · 3D", year: "2024", gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" },
  { name: "Kesari Weddings", category: "Events · Venue Viz", year: "2024", gradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1515 100%)" },
  { name: "Ultraviolette EV Showroom", category: "Automotive · AR", year: "2024", gradient: "linear-gradient(135deg, #0a0a1a 0%, #0d1a0d 100%)" },
  { name: "India Bike Week 2025", category: "Live Event · 3D Capture", year: "2025", gradient: "linear-gradient(135deg, #1a0a00 0%, #2a1400 100%)" },
  { name: "Byju's Motion System", category: "Education · Motion", year: "2022", gradient: "linear-gradient(135deg, #001a0a 0%, #001a1a 100%)" },
];

const Work = () => (
  <section id="work" className="section-padding">
    <div className="container-custom">
      <p className="section-label mb-4">Selected Work</p>
      <h2 className="section-heading text-foreground mb-16">Projects</h2>

      {/* Row 1: large + small */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ProjectCard project={projects[0]} className="md:col-span-7" aspect="aspect-[16/10]" />
        <ProjectCard project={projects[1]} className="md:col-span-5" aspect="aspect-[3/4]" />
      </div>
      {/* Row 2: small + large */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <ProjectCard project={projects[2]} className="md:col-span-5" aspect="aspect-[3/4]" />
        <ProjectCard project={projects[3]} className="md:col-span-7" aspect="aspect-[16/10]" />
      </div>
      {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <ProjectCard project={projects[4]} className="md:col-span-7" aspect="aspect-[16/10]" />
      </div>
    </div>
  </section>
);

interface ProjectCardProps {
  project: (typeof projects)[0];
  className?: string;
  aspect: string;
}

const ProjectCard = ({ project, className = "", aspect }: ProjectCardProps) => (
  <motion.a
    href="#"
    whileHover={{ y: -4 }}
    className={`group relative overflow-hidden rounded-lg border border-foreground/[0.07] bg-card block ${aspect} ${className}`}
  >
    <div
      className="absolute inset-0 transition-smooth group-hover:scale-105 group-hover:brightness-110"
      style={{ background: project.gradient }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent z-10" />
    <span className="absolute top-4 right-4 z-20 pill">{project.year}</span>
    <div className="absolute bottom-5 left-5 right-5 z-20 flex items-end justify-between">
      <p className="font-body text-[15px] text-foreground">{project.name}</p>
      <span className="pill shrink-0 ml-3">{project.category}</span>
    </div>
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth shadow-[0_32px_64px_rgba(0,0,0,0.5)] pointer-events-none z-0" />
  </motion.a>
);

export default Work;
